'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/Button'
import { drawWorld } from '@/components/largo/draw'
import {
  TILE,
  VIEW_COLS,
  VIEW_ROWS,
  advancePlayer,
  createInitialState,
  hudSnapshot,
  interact,
  tryMove,
} from '@/components/largo/world'

const SAVE_KEY = 'largo-central-park-v1'
const KEY_DIR = {
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right',
}

function loadState() {
  try {
    let raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return createInitialState()
    let saved = JSON.parse(raw)
    if (saved.v !== 1) return createInitialState()
    let state = createInitialState()
    state.player.x = saved.x
    state.player.y = saved.y
    state.player.tx = saved.x
    state.player.ty = saved.y
    state.player.dir = saved.dir || 'up'
    state.inventory = saved.inventory
    state.returned = saved.returned
    state.endingPlayed = Boolean(saved.endingPlayed)
    state.entities = state.entities.filter((entity) => !saved.gone?.includes(entity.id))
    return state
  } catch {
    return createInitialState()
  }
}

function saveState(state) {
  try {
    let freshIds = new Set(createInitialState().entities.map((entity) => entity.id))
    let present = new Set(state.entities.map((entity) => entity.id))
    let gone = [...freshIds].filter((id) => !present.has(id))
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        v: 1,
        x: state.player.x,
        y: state.player.y,
        dir: state.player.dir,
        inventory: state.inventory,
        returned: state.returned,
        endingPlayed: state.endingPlayed,
        gone,
      }),
    )
  } catch {
    // Progress still works for this visit if storage is blocked.
  }
}

function QuestRow({ label, status }) {
  return (
    <li className="flex items-center justify-between gap-3 text-sm">
      <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
      <span
        className={
          status === 'returned'
            ? 'font-medium text-teal-600 dark:text-teal-400'
            : 'text-zinc-500 dark:text-zinc-400'
        }
      >
        {status === 'returned' ? 'Done' : status === 'carried' ? 'Carrying' : 'Open'}
      </span>
    </li>
  )
}

export function LargoGame() {
  let canvasRef = useRef(null)
  let rootRef = useRef(null)
  let stateRef = useRef(null)
  let keysRef = useRef(new Set())
  let [hud, setHud] = useState(() => hudSnapshot(createInitialState()))

  useEffect(() => {
    let state = loadState()
    stateRef.current = state
    setHud(hudSnapshot(state, performance.now()))
    let canvas = canvasRef.current
    let ctx = canvas.getContext('2d')
    let frame = 0
    let running = true
    let lastHud = ''

    function focused() {
      return rootRef.current?.contains(document.activeElement)
    }

    function onKeyDown(event) {
      if (!focused() || event.repeat) return
      let dir = KEY_DIR[event.key.toLowerCase()]
      if (dir) {
        event.preventDefault()
        keysRef.current.add(dir)
        state.player.held = dir
        tryMove(state, dir)
      }
      if (event.key === 'z' || event.key === 'e' || event.key === ' ') {
        event.preventDefault()
        interact(state)
      }
    }

    function onKeyUp(event) {
      let dir = KEY_DIR[event.key.toLowerCase()]
      if (!dir) return
      keysRef.current.delete(dir)
      if (state.player.held === dir) {
        state.player.held = keysRef.current.values().next().value || null
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    function loop(time) {
      if (!running) return
      advancePlayer(state)
      if (state.fanfare) {
        state.fanfare = false
        playFanfare()
      }
      drawWorld(ctx, state, time)
      frame += 1
      let snap = hudSnapshot(state, time)
      let key = JSON.stringify(snap)
      if (key !== lastHud) {
        lastHud = key
        setHud(snap)
      }
      if (frame % 60 === 0) saveState(state)
      requestAnimationFrame(loop)
    }

    let raf = requestAnimationFrame(loop)
    rootRef.current?.focus()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      saveState(state)
    }
  }, [])

  function pressDir(dir) {
    let state = stateRef.current
    if (!state) return
    rootRef.current?.focus()
    state.player.held = dir
    tryMove(state, dir)
  }

  function releaseDir(dir) {
    let state = stateRef.current
    if (!state) return
    if (state.player.held === dir) state.player.held = null
  }

  function pressTalk() {
    let state = stateRef.current
    if (!state) return
    rootRef.current?.focus()
    interact(state)
    setHud(hudSnapshot(state, performance.now()))
  }

  function restart() {
    let state = stateRef.current
    if (!state) return
    let fresh = createInitialState()
    Object.keys(state).forEach((key) => delete state[key])
    Object.assign(state, fresh)
    try {
      localStorage.removeItem(SAVE_KEY)
    } catch {
      // Ignore storage failures and just reset the running game.
    }
    setHud(hudSnapshot(state, performance.now()))
  }

  let pageStatus = hud.pagesReturned
    ? 'returned'
    : hud.pagesHeld > 0
      ? 'carried'
      : 'missing'

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <div
          ref={rootRef}
          tabIndex={0}
          role="application"
          aria-label="Largo Central Park. Arrow keys or WASD to walk. Z to talk."
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-[#67a83f] outline-none ring-teal-500 focus-visible:ring-2 dark:border-zinc-700"
        >
          <canvas
            ref={canvasRef}
            width={VIEW_COLS * TILE}
            height={VIEW_ROWS * TILE}
            className="h-auto w-full [image-rendering:pixelated]"
          />
        </div>
        <div className="mt-4 min-h-[5.5rem] rounded-2xl border border-zinc-100 px-4 py-3 dark:border-zinc-700/40">
          {hud.line ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                {hud.speaker}
              </p>
              <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-100">{hud.line}</p>
            </>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {hud.note || 'Walk with the arrow keys or WASD. Press Z to talk and to pick up what is in front of you.'}
            </p>
          )}
        </div>
        <div className="mt-4 grid max-w-xs grid-cols-3 gap-2 sm:hidden">
          <span />
          <Pad
            label="North"
            onDown={() => pressDir('up')}
            onUp={() => releaseDir('up')}
          >
            ↑
          </Pad>
          <span />
          <Pad
            label="West"
            onDown={() => pressDir('left')}
            onUp={() => releaseDir('left')}
          >
            ←
          </Pad>
          <Pad
            label="South"
            onDown={() => pressDir('down')}
            onUp={() => releaseDir('down')}
          >
            ↓
          </Pad>
          <Pad
            label="East"
            onDown={() => pressDir('right')}
            onUp={() => releaseDir('right')}
          >
            →
          </Pad>
          <button
            type="button"
            className="col-span-3 rounded-md bg-zinc-800 py-2 text-sm font-semibold text-zinc-100"
            onClick={pressTalk}
          >
            Talk
          </button>
        </div>
      </div>
      <aside className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-700/40">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Central Park</h2>
        <ul className="mt-4 space-y-3">
          <QuestRow label="Library card" status={hud.card} />
          <QuestRow label="Railroad flag" status={hud.flag} />
          <QuestRow
            label={hud.pagesReturned ? 'Setlist' : `Setlist (${hud.pagesHeld}/3)`}
            status={pageStatus}
          />
        </ul>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {hud.ending
            ? 'The lawn already played its tune. West Bay Drive can be the next map.'
            : 'Gold sparkles are things you can pick up. A teal mark means someone still needs you.'}
        </p>
        <Button variant="secondary" className="mt-5" onClick={restart}>
          Start over
        </Button>
      </aside>
    </div>
  )
}

function Pad({ label, onDown, onUp, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-md bg-zinc-100 py-3 text-lg text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
      onPointerDown={(event) => {
        event.preventDefault()
        onDown()
      }}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      {children}
    </button>
  )
}

function playFanfare() {
  let AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return
  let ctx = new AudioCtx()
  let notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, index) => {
    let osc = ctx.createOscillator()
    let gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = freq
    let start = ctx.currentTime + index * 0.18
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.04, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28)
    osc.connect(gain).connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.3)
  })
}
