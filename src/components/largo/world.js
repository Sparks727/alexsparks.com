export const COLS = 42
export const ROWS = 28
export const TILE = 16
export const VIEW_COLS = 20
export const VIEW_ROWS = 14

const SOLID = new Set([
  'tree',
  'water',
  'reed',
  'road',
  'roof',
  'libWall',
  'libWin',
  'libDoor',
  'artWall',
  'artWin',
  'artDoor',
  'pavilion',
])

export function isSolidTile(tile) {
  return SOLID.has(tile)
}

function fill(tiles, x, y, w, h, tile) {
  for (let row = y; row < y + h; row++) {
    for (let col = x; col < x + w; col++) {
      if (row >= 0 && col >= 0 && row < ROWS && col < COLS) {
        tiles[row][col] = tile
      }
    }
  }
}

function plant(tiles, x, y) {
  let tile = tiles[y]?.[x]
  if (tile === 'grass' || tile === 'lawn') tiles[y][x] = 'tree'
}

export function buildTiles() {
  let tiles = Array.from({ length: ROWS }, () => Array(COLS).fill('grass'))

  fill(tiles, 0, 0, COLS, 1, 'tree')
  fill(tiles, 0, ROWS - 1, COLS, 1, 'tree')
  fill(tiles, 0, 0, 1, ROWS, 'tree')
  fill(tiles, COLS - 1, 0, 1, ROWS, 'tree')

  fill(tiles, 2, 2, 12, 13, 'reed')
  fill(tiles, 4, 4, 7, 8, 'water')
  for (let x = 3; x <= 11; x++) {
    tiles[3][x] = 'board'
    tiles[12][x] = 'board'
  }
  for (let y = 3; y <= 12; y++) {
    tiles[y][3] = 'board'
    tiles[y][11] = 'board'
  }
  fill(tiles, 4, 4, 7, 8, 'water')

  fill(tiles, 12, 8, 3, 1, 'path')
  fill(tiles, 14, 8, 1, 9, 'path')
  fill(tiles, 2, 16, 33, 1, 'path')
  fill(tiles, 21, 16, 1, 4, 'path')
  fill(tiles, 30, 16, 1, 3, 'path')

  fill(tiles, 19, 5, 8, 4, 'lawn')
  for (let x = 18; x <= 27; x++) {
    tiles[4][x] = 'track'
    tiles[9][x] = 'track'
  }
  for (let y = 4; y <= 9; y++) {
    tiles[y][18] = 'track'
    tiles[y][27] = 'track'
  }

  fill(tiles, 16, 11, 14, 5, 'lawn')
  fill(tiles, 18, 19, 8, 5, 'play')
  fill(tiles, 28, 19, 5, 4, 'pavilion')

  fill(tiles, 30, 3, 8, 2, 'roof')
  fill(tiles, 30, 5, 8, 3, 'artWall')
  for (let x = 31; x <= 36; x++) tiles[6][x] = 'artWin'
  tiles[7][33] = 'artDoor'
  fill(tiles, 33, 8, 1, 9, 'path')

  fill(tiles, 35, 1, 1, 26, 'road')
  fill(tiles, 36, 1, 1, 26, 'walk')
  tiles[16][35] = 'cross'

  fill(tiles, 37, 10, 4, 2, 'roof')
  fill(tiles, 37, 12, 4, 6, 'libWall')
  tiles[13][38] = 'libWin'
  tiles[13][39] = 'libWin'
  tiles[14][38] = 'libWin'
  tiles[14][39] = 'libWin'
  tiles[15][37] = 'libDoor'

  ;[
    [5, 18],
    [8, 21],
    [4, 22],
    [12, 20],
    [12, 23],
    [16, 24],
    [27, 12],
    [20, 18],
    [31, 18],
    [8, 24],
    [24, 24],
  ].forEach(([x, y]) => plant(tiles, x, y))

  return tiles
}

export function buildEntities() {
  return [
    {
      id: 'librarian',
      kind: 'librarian',
      x: 36,
      y: 15,
      solid: true,
      name: 'Librarian',
    },
    {
      id: 'heron',
      kind: 'heron',
      x: 7,
      y: 12,
      solid: true,
      name: 'Heron',
    },
    {
      id: 'volunteer',
      kind: 'volunteer',
      x: 22,
      y: 10,
      solid: true,
      name: 'Railroad volunteer',
    },
    {
      id: 'kid',
      kind: 'kid',
      x: 21,
      y: 21,
      solid: true,
      name: 'Kid',
    },
    {
      id: 'manager',
      kind: 'manager',
      x: 33,
      y: 8,
      solid: true,
      name: 'Stage manager',
    },
    {
      id: 'plaque',
      kind: 'plaque',
      x: 24,
      y: 14,
      solid: false,
      name: 'Court of Honor',
    },
    { id: 'card', kind: 'card', x: 7, y: 3, solid: false, name: 'Library card' },
    { id: 'flag', kind: 'flag', x: 22, y: 6, solid: false, name: 'Railroad flag' },
    { id: 'page-1', kind: 'page', x: 22, y: 20, solid: false, name: 'Setlist page' },
    { id: 'page-2', kind: 'page', x: 26, y: 21, solid: false, name: 'Setlist page' },
    { id: 'page-3', kind: 'page', x: 33, y: 12, solid: false, name: 'Setlist page' },
  ]
}

export const TRAIN_LOOP = (() => {
  let cells = []
  for (let x = 18; x <= 27; x++) cells.push([x, 4])
  for (let y = 5; y <= 9; y++) cells.push([27, y])
  for (let x = 26; x >= 18; x--) cells.push([x, 9])
  for (let y = 8; y >= 5; y--) cells.push([18, y])
  return cells
})()

export function createInitialState() {
  return {
    tiles: buildTiles(),
    entities: buildEntities(),
    player: {
      x: 36,
      y: 18,
      dir: 'up',
      moving: false,
      tx: 36,
      ty: 18,
      step: 0,
      held: null,
      queued: null,
    },
    inventory: { card: false, flag: false, pages: 0 },
    returned: { card: false, flag: false, pages: false },
    dialogue: null,
    queueEnding: false,
    endingPlayed: false,
    fanfare: false,
    note: '',
    noteUntil: 0,
  }
}

const DIRS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}

export function isWalkable(state, x, y) {
  if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return false
  if (isSolidTile(state.tiles[y][x])) return false
  if (state.entities.some((entity) => entity.solid && entity.x === x && entity.y === y)) {
    return false
  }
  return true
}

export function tryMove(state, dir) {
  if (state.dialogue) return
  state.player.dir = dir
  if (state.player.moving) {
    state.player.queued = dir
    return
  }
  let [dx, dy] = DIRS[dir]
  let nx = state.player.x + dx
  let ny = state.player.y + dy
  if (!isWalkable(state, nx, ny)) return
  state.player.moving = true
  state.player.tx = nx
  state.player.ty = ny
  state.player.step = 0
}

export function advancePlayer(state, speed = 4) {
  let player = state.player
  if (!player.moving) {
    if (player.held) tryMove(state, player.held)
    return
  }
  player.step += speed
  if (player.step < TILE) return
  player.x = player.tx
  player.y = player.ty
  player.step = 0
  player.moving = false
  pickupAtFeet(state)
  if (player.queued) {
    let next = player.queued
    player.queued = null
    tryMove(state, next)
  } else if (player.held) {
    tryMove(state, player.held)
  }
}

export function playerPixel(player) {
  let x = player.x * TILE
  let y = player.y * TILE
  if (player.moving) {
    let [dx, dy] = DIRS[player.dir]
    x += dx * player.step
    y += dy * player.step
  }
  return { x, y }
}

function say(state, speaker, lines) {
  state.dialogue = { speaker, lines, index: 0 }
}

function markNote(state, text, now) {
  state.note = text
  state.noteUntil = now + 2200
}

function allReturned(state) {
  return state.returned.card && state.returned.flag && state.returned.pages
}

function checkEnding(state) {
  if (allReturned(state) && !state.endingPlayed) state.queueEnding = true
}

function pickupEntity(state, entity, now) {
  state.entities = state.entities.filter((item) => item.id !== entity.id)
  if (entity.kind === 'card') {
    state.inventory.card = true
    markNote(state, 'A damp library card.', now)
  } else if (entity.kind === 'flag') {
    state.inventory.flag = true
    markNote(state, 'The railroad flag.', now)
  } else if (entity.kind === 'page') {
    state.inventory.pages += 1
    markNote(state, `A setlist page. ${state.inventory.pages} of 3.`, now)
  }
}

function pickupAtFeet(state, now = performance.now()) {
  let found = state.entities.find(
    (entity) =>
      !entity.solid &&
      entity.kind !== 'plaque' &&
      entity.x === state.player.x &&
      entity.y === state.player.y,
  )
  if (found) pickupEntity(state, found, now)
}

function linesFor(state, entity) {
  switch (entity.kind) {
    case 'librarian':
      if (state.returned.card) {
        return ['The preserve is the windy side. Enjoy the park.']
      }
      if (state.inventory.card) {
        state.inventory.card = false
        state.returned.card = true
        checkEnding(state)
        return ['That is the one. Damp, but it still scans. Thank you.']
      }
      return [
        'The wind took a library card off the steps.',
        'It will be on the boardwalk in the nature preserve.',
      ]
    case 'volunteer':
      if (state.returned.flag) {
        return ['The loop is a short one. We ride the first weekend of the month.']
      }
      if (state.inventory.flag) {
        state.inventory.flag = false
        state.returned.flag = true
        checkEnding(state)
        return ['You found it. The little train can roll on time.']
      }
      return [
        'The weekend train lost its flag.',
        'It came off on the grass inside the track loop.',
      ]
    case 'manager':
      if (state.returned.pages) {
        return ['Stick around. It is a short tune.']
      }
      if (state.inventory.pages >= 3) {
        state.inventory.pages = 0
        state.returned.pages = true
        checkEnding(state)
        return ['That is all three pages. The lawn has a show again.']
      }
      return [
        'Three pages of the setlist blew off the stage.',
        'Try the playground, the grass by the pavilion, and this walk.',
        `You are holding ${state.inventory.pages} of 3.`,
      ]
    case 'kid':
      return ['Race you to the slide. A paper snagged on it.']
    case 'heron':
      return ['...', 'The heron does not move.']
    case 'plaque':
      return ['James S. Miles and Richard A. Leandri Military Court of Honor.']
    default:
      return []
  }
}

export function interact(state, now = performance.now()) {
  if (state.dialogue) {
    state.dialogue.index += 1
    if (state.dialogue.index >= state.dialogue.lines.length) {
      state.dialogue = null
      if (state.queueEnding) {
        state.queueEnding = false
        state.endingPlayed = true
        state.fanfare = true
        say(state, 'The lawn', [
          'The speakers on the lawn wake up.',
          'Four notes drift over the grass, then the park goes quiet.',
          'West Bay Drive is the next walk.',
        ])
      }
    }
    return
  }

  let [dx, dy] = DIRS[state.player.dir]
  let fx = state.player.x + dx
  let fy = state.player.y + dy
  let faced = state.entities.find((entity) => entity.x === fx && entity.y === fy)
  let here = state.entities.find(
    (entity) => entity.x === state.player.x && entity.y === state.player.y,
  )

  if (faced && (faced.kind === 'card' || faced.kind === 'flag' || faced.kind === 'page')) {
    pickupEntity(state, faced, now)
    return
  }
  if (here && (here.kind === 'card' || here.kind === 'flag' || here.kind === 'page')) {
    pickupEntity(state, here, now)
    return
  }

  let npc = faced || (here && here.kind === 'plaque' ? here : null)
  if (!npc) return
  let lines = linesFor(state, npc)
  if (lines.length) say(state, npc.name, lines)
}

export function hudSnapshot(state, now = 0) {
  return {
    speaker: state.dialogue?.speaker ?? '',
    line: state.dialogue ? state.dialogue.lines[state.dialogue.index] : '',
    note: now < state.noteUntil ? state.note : '',
    card: state.returned.card ? 'returned' : state.inventory.card ? 'carried' : 'missing',
    flag: state.returned.flag ? 'returned' : state.inventory.flag ? 'carried' : 'missing',
    pagesHeld: state.inventory.pages,
    pagesReturned: state.returned.pages,
    ending: state.endingPlayed,
  }
}

function neighborsReachable(visited, x, y) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].some(([nx, ny]) => visited.has(`${nx},${ny}`))
}

export function findProblems(state) {
  let start = `${state.player.x},${state.player.y}`
  if (!isWalkable(state, state.player.x, state.player.y)) {
    return ['player start is blocked']
  }
  let queue = [[state.player.x, state.player.y]]
  let visited = new Set([start])
  while (queue.length) {
    let [x, y] = queue.shift()
    for (let [dx, dy] of Object.values(DIRS)) {
      let nx = x + dx
      let ny = y + dy
      let key = `${nx},${ny}`
      if (visited.has(key) || !isWalkable(state, nx, ny)) continue
      visited.add(key)
      queue.push([nx, ny])
    }
  }

  let problems = []
  for (let entity of state.entities) {
    if (entity.solid) {
      if (!neighborsReachable(visited, entity.x, entity.y)) {
        problems.push(`${entity.id} cannot be reached`)
      }
    } else if (!visited.has(`${entity.x},${entity.y}`)) {
      problems.push(`${entity.id} is not on a walkable tile`)
    }
  }
  return problems
}

let mapProblems = findProblems(createInitialState())
if (mapProblems.length) {
  throw new Error(`Largo map: ${mapProblems.join('; ')}`)
}
