import { COLS, ROWS, TILE, VIEW_COLS, VIEW_ROWS, TRAIN_LOOP, playerPixel } from './world'

const C = {
  outline: '#241c18',
  grass: '#67a83f',
  grassD: '#4c8730',
  grassL: '#b7d86a',
  lawn: '#8ec85c',
  lawnD: '#6eab40',
  dirt: '#d2ae78',
  dirtD: '#a67c45',
  dirtL: '#f0d7ad',
  water: '#3b92c4',
  waterD: '#1d628c',
  waterL: '#d5f3ff',
  wood: '#c48645',
  woodD: '#7c4e24',
  woodL: '#e8c48a',
  leaf: '#2f6d34',
  leafD: '#1b4422',
  leafL: '#9ccc5c',
  wall: '#f6f1e6',
  wallD: '#d5cbb8',
  roof: '#c2563a',
  roofD: '#7e3222',
  brick: '#a24b3c',
  brickD: '#6e2e28',
  asphalt: '#3c4450',
  asphaltL: '#66717e',
  concrete: '#d7d3cb',
  concreteD: '#b7b2a8',
  skin: '#f0c39a',
  skinD: '#d4976c',
  hair: '#3a2a22',
  hairL: '#6d4b36',
  teal: '#148f7c',
  tealD: '#0c5c52',
  ink: '#243044',
  white: '#f7f4ee',
  red: '#d24b4b',
  gold: '#e2b134',
  beak: '#f0b429',
  heron: '#f4f7f8',
  heronD: '#b7c4cc',
  reed: '#3e6a34',
  reedD: '#244422',
  turf: '#5ea34a',
  turfD: '#3f7c34',
}

function rect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

function hash(x, y) {
  return Math.abs((x * 73 + y * 37) % 97)
}

function fillDisc(ctx, cx, cy, r, color) {
  ctx.fillStyle = color
  let r2 = r * r
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x * x + y * y <= r2) ctx.fillRect(cx + x, cy + y, 1, 1)
    }
  }
}

function drawGrass(ctx, x, y, wx, wy, lawn, tiles) {
  rect(ctx, x, y, TILE, TILE, lawn ? C.lawn : C.grass)
  if (lawn && wy % 2 === 0) rect(ctx, x, y, TILE, TILE, '#7fbb50')
  let n = hash(wx, wy)
  rect(ctx, x + (n % 10), y + 3 + (n % 6), 2, 4, lawn ? '#5f9a38' : C.grassD)
  rect(ctx, x + ((n * 3) % 11), y + 8, 3, 2, C.grassL)
  if (n % 5 === 0) {
    rect(ctx, x + 4, y + 5, 3, 3, C.white)
    rect(ctx, x + 5, y + 6, 1, 1, C.gold)
  } else if (n % 7 === 0) {
    rect(ctx, x + 9, y + 7, 3, 3, '#d36b8f')
    rect(ctx, x + 10, y + 8, 1, 1, C.white)
  }
  let north = tiles?.[wy - 1]?.[wx]
  let south = tiles?.[wy + 1]?.[wx]
  if (north === 'path' || north === 'board') rect(ctx, x, y, TILE, 2, C.dirtD)
  if (south === 'path' || south === 'board') rect(ctx, x, y + 14, TILE, 2, C.dirtD)
}

function drawPath(ctx, x, y, wx, wy) {
  rect(ctx, x, y, TILE, TILE, C.dirt)
  rect(ctx, x, y, TILE, 1, C.dirtD)
  rect(ctx, x, y + 15, TILE, 1, C.dirtD)
  let n = hash(wx, wy)
  rect(ctx, x + 2, y + 3, 5, 4, C.dirtL)
  rect(ctx, x + 8, y + 8, 6, 4, n % 2 ? C.dirtL : C.dirtD)
  rect(ctx, x + 3, y + 4, 1, 1, C.white)
}

function drawBoard(ctx, x, y, wx) {
  rect(ctx, x, y, TILE, TILE, C.woodD)
  for (let i = 0; i < 4; i++) {
    rect(ctx, x, y + i * 4, TILE, 3, (wx + i) % 2 ? C.wood : C.woodL)
    rect(ctx, x + 3, y + i * 4 + 1, 1, 1, C.woodD)
    rect(ctx, x + 12, y + i * 4 + 1, 1, 1, C.woodD)
  }
}

function drawWater(ctx, x, y, wx, wy, time) {
  rect(ctx, x, y, TILE, TILE, C.waterD)
  let shift = Math.floor(time / 380) % 8
  for (let row = 0; row < 4; row++) {
    let yy = y + 2 + row * 4
    let xx = x + ((wx * 3 + wy + shift + row * 2) % 8)
    rect(ctx, xx, yy, 6, 1, C.water)
    rect(ctx, xx + 1, yy, 2, 1, C.waterL)
  }
}

function drawReed(ctx, x, y, wx, wy) {
  rect(ctx, x, y, TILE, TILE, C.grassD)
  for (let i = 0; i < 5; i++) {
    let xx = x + 1 + i * 3 + (hash(wx, wy + i) % 2)
    rect(ctx, xx, y + 4, 1, 10, i % 2 ? C.reed : C.reedD)
    rect(ctx, xx, y + 3, 2, 2, C.leafL)
  }
}

function drawRoad(ctx, x, y) {
  rect(ctx, x, y, TILE, TILE, C.asphalt)
  rect(ctx, x, y, 1, TILE, C.asphaltL)
  rect(ctx, x + 15, y, 1, TILE, C.outline)
}

function drawCross(ctx, x, y) {
  rect(ctx, x, y, TILE, TILE, C.asphalt)
  for (let i = 0; i < 4; i++) rect(ctx, x + 1, y + 1 + i * 4, 14, 2, C.white)
}

function drawWalk(ctx, x, y, wy, wx) {
  rect(ctx, x, y, TILE, TILE, C.concrete)
  rect(ctx, x, y, TILE, 1, C.concreteD)
  if (wy % 2 === 0) rect(ctx, x, y + 15, TILE, 1, C.concreteD)
  rect(ctx, x + 4, y + 6, 2, 1, C.concreteD)
  if (wx === 36) rect(ctx, x + 11, y, 5, TILE, 'rgba(36,28,24,0.18)')
}

function drawRoof(ctx, x, y, wx) {
  rect(ctx, x, y, TILE, TILE, C.roofD)
  for (let row = 0; row < 4; row++) {
    rect(ctx, x, y + row * 4, TILE, 3, C.roof)
    rect(ctx, x + ((wx + row) % 2) * 4, y + row * 4, 4, 1, C.roofD)
  }
  rect(ctx, x, y + 15, TILE, 1, C.outline)
}

function drawWall(ctx, x, y, windows, brick) {
  rect(ctx, x, y, TILE, TILE, brick ? C.brick : C.wall)
  rect(ctx, x, y + 15, TILE, 1, brick ? C.brickD : C.wallD)
  rect(ctx, x, y, 1, TILE, brick ? C.brickD : C.wallD)
  if (!windows) return
  rect(ctx, x + 4, y + 4, 8, 7, C.waterD)
  rect(ctx, x + 5, y + 5, 6, 5, C.waterL)
  rect(ctx, x + 8, y + 4, 1, 7, brick ? C.brick : C.wall)
  rect(ctx, x + 4, y + 7, 8, 1, brick ? C.brick : C.wall)
}

function drawDoor(ctx, x, y, brick) {
  drawWall(ctx, x, y, false, brick)
  rect(ctx, x + 4, y + 3, 8, 12, C.ink)
  rect(ctx, x + 5, y + 4, 6, 10, brick ? C.brickD : '#8d5a3c')
  rect(ctx, x + 6, y + 5, 2, 3, C.waterL)
  rect(ctx, x + 9, y + 9, 1, 1, C.gold)
}

function drawTrack(ctx, x, y, wx, wy) {
  rect(ctx, x, y, TILE, TILE, C.dirtD)
  let horizontal = wy === 4 || wy === 9
  if (horizontal) {
    rect(ctx, x, y + 4, TILE, 2, C.asphaltL)
    rect(ctx, x, y + 10, TILE, 2, C.asphaltL)
    rect(ctx, x + 2, y + 6, 3, 4, C.wood)
    rect(ctx, x + 11, y + 6, 3, 4, C.wood)
  } else {
    rect(ctx, x + 4, y, 2, TILE, C.asphaltL)
    rect(ctx, x + 10, y, 2, TILE, C.asphaltL)
    rect(ctx, x + 6, y + 2, 4, 3, C.wood)
    rect(ctx, x + 6, y + 11, 4, 3, C.wood)
  }
  if ((wx === 18 || wx === 27) && (wy === 4 || wy === 9)) {
    rect(ctx, x + 4, y + 4, 8, 8, C.dirtD)
    rect(ctx, x + 4, y + 4, 8, 2, C.asphaltL)
    rect(ctx, x + 4, y + 10, 8, 2, C.asphaltL)
  }
}

function drawPlay(ctx, x, y) {
  rect(ctx, x, y, TILE, TILE, C.turf)
  rect(ctx, x, y, TILE, 2, C.turfD)
  rect(ctx, x + 2, y + 10, 3, 2, C.grassL)
  rect(ctx, x + 11, y + 5, 2, 2, C.grassL)
}

function drawPavilionTile(ctx, x, y, wx, wy) {
  let top = wy === 19
  let edge = wx === 28 || wx === 32
  rect(ctx, x, y, TILE, TILE, C.dirtL)
  if (top) {
    rect(ctx, x, y, TILE, 8, C.roof)
    rect(ctx, x, y, TILE, 2, C.roofD)
    rect(ctx, x, y + 8, TILE, 2, C.white)
  }
  if (edge) {
    rect(ctx, x + (wx === 28 ? 3 : 11), y + 6, 2, 10, C.white)
    rect(ctx, x + (wx === 28 ? 2 : 10), y + 14, 4, 2, C.concreteD)
  }
  if (!top && !edge) rect(ctx, x + 6, y + 12, 4, 2, C.wood)
}

function drawPlaqueTile(ctx, x, y) {
  drawGrass(ctx, x, y, 24, 14, true)
  rect(ctx, x + 4, y + 3, 8, 10, C.asphalt)
  rect(ctx, x + 5, y + 4, 6, 8, C.gold)
  rect(ctx, x + 6, y + 6, 4, 1, C.outline)
  rect(ctx, x + 6, y + 8, 4, 1, C.outline)
}

function drawTree(ctx, x, y, wx, wy) {
  rect(ctx, x + 6, y + 9, 4, 6, C.woodD)
  rect(ctx, x + 7, y + 10, 1, 4, C.wood)
  fillDisc(ctx, x + 8, y + 7, 7, C.leafD)
  fillDisc(ctx, x + 7, y + 6, 5, C.leaf)
  fillDisc(ctx, x + 5, y + 5, 2, C.leafL)
  if (hash(wx, wy) % 2 === 0) {
    rect(ctx, x + 4, y + 8, 1, 3, C.leafD)
    rect(ctx, x + 11, y + 9, 1, 2, C.leafD)
  }
}

function drawSlide(ctx, x, y) {
  rect(ctx, x + 2, y + 4, 2, 10, C.asphaltL)
  rect(ctx, x + 4, y + 4, 8, 2, C.red)
  rect(ctx, x + 10, y + 6, 3, 2, C.red)
  rect(ctx, x + 11, y + 8, 3, 2, C.gold)
  rect(ctx, x + 12, y + 10, 2, 3, C.gold)
}

function drawSwings(ctx, x, y) {
  rect(ctx, x + 2, y + 3, 2, 12, C.asphalt)
  rect(ctx, x + 12, y + 3, 2, 12, C.asphalt)
  rect(ctx, x + 2, y + 3, 12, 2, C.asphalt)
  rect(ctx, x + 4, y + 5, 1, 5, C.outline)
  rect(ctx, x + 10, y + 5, 1, 5, C.outline)
  rect(ctx, x + 3, y + 10, 3, 2, C.red)
  rect(ctx, x + 9, y + 10, 3, 2, C.teal)
}

function drawHuman(ctx, x, y, frame, dir, colors, extras) {
  let bob = frame ? -1 : 0
  let flip = dir === 'left'
  ctx.save()
  if (flip) {
    ctx.translate(x + TILE, y)
    ctx.scale(-1, 1)
    x = 0
    y = 0
  }
  rect(ctx, x + 4, y + 14, 8, 2, 'rgba(36,28,24,0.28)')
  let foot = frame ? 1 : 0
  rect(ctx, x + 4, y + 13 + bob, 3, 2, C.outline)
  rect(ctx, x + 9 + foot, y + 13 + bob, 3, 2, C.outline)
  rect(ctx, x + 5, y + 10 + bob, 6, 3, colors.pants)
  rect(ctx, x + 5, y + 12 + bob, 2, 1, colors.pantsD)
  rect(ctx, x + 4, y + 6 + bob, 8, 4, colors.shirt)
  rect(ctx, x + 3, y + 7 + bob, 2, 3, colors.shirtD)
  rect(ctx, x + 11, y + 7 + bob, 2, 3, colors.shirtD)
  rect(ctx, x + 7, y + 5 + bob, 2, 2, C.skin)
  if (dir === 'up') {
    rect(ctx, x + 4, y + 1 + bob, 8, 5, colors.hair)
    rect(ctx, x + 5, y + 5 + bob, 6, 2, colors.hair)
  } else {
    rect(ctx, x + 5, y + 2 + bob, 6, 4, C.skin)
    rect(ctx, x + 5, y + 5 + bob, 6, 1, C.skinD)
    rect(ctx, x + 4, y + 1 + bob, 8, 3, colors.hair)
    rect(ctx, x + 4, y + 3 + bob, 2, 2, colors.hair)
    rect(ctx, x + 6, y + 4 + bob, 1, 1, C.outline)
    rect(ctx, x + 9, y + 4 + bob, 1, 1, C.outline)
  }
  if (extras) extras(ctx, x, y + bob, dir)
  ctx.restore()
}

function glasses(ctx, x, y, dir) {
  if (dir === 'up') return
  rect(ctx, x + 5, y + 4, 3, 1, C.outline)
  rect(ctx, x + 8, y + 4, 3, 1, C.outline)
}

function cap(ctx, x, y) {
  rect(ctx, x + 4, y + 1, 8, 2, C.gold)
  rect(ctx, x + 10, y + 2, 3, 1, C.gold)
}

function headset(ctx, x, y, dir) {
  if (dir === 'up') return
  rect(ctx, x + 4, y + 3, 1, 3, C.outline)
  rect(ctx, x + 11, y + 3, 1, 2, C.gold)
}

function drawHeron(ctx, x, y, time) {
  let bob = Math.floor(time / 500) % 2
  rect(ctx, x + 6, y + 14, 2, 2, C.outline)
  rect(ctx, x + 10, y + 14, 2, 2, C.outline)
  rect(ctx, x + 7, y + 8, 3, 6, C.heron)
  rect(ctx, x + 6, y + 9, 1, 4, C.heronD)
  rect(ctx, x + 8, y + 4 + bob, 2, 5, C.heron)
  rect(ctx, x + 7, y + 2 + bob, 3, 3, C.heron)
  rect(ctx, x + 5, y + 3 + bob, 3, 1, C.beak)
  rect(ctx, x + 8, y + 3 + bob, 1, 1, C.outline)
  rect(ctx, x + 9, y + 7, 4, 3, C.heronD)
}

function drawCard(ctx, x, y, time) {
  let bob = Math.floor(time / 280) % 2
  rect(ctx, x + 4, y + 5 + bob, 8, 6, C.white)
  rect(ctx, x + 4, y + 5 + bob, 8, 1, C.teal)
  rect(ctx, x + 5, y + 8 + bob, 5, 1, C.concreteD)
}

function drawFlag(ctx, x, y, time) {
  let wave = Math.floor(time / 200) % 2
  rect(ctx, x + 4, y + 3, 1, 11, C.woodD)
  rect(ctx, x + 5, y + 3, 6 + wave, 4, C.red)
  rect(ctx, x + 5, y + 3, 6 + wave, 1, C.white)
}

function drawPage(ctx, x, y, time) {
  let bob = Math.floor(time / 300) % 2
  rect(ctx, x + 5, y + 4 + bob, 6, 8, C.white)
  rect(ctx, x + 6, y + 6 + bob, 4, 1, C.concreteD)
  rect(ctx, x + 6, y + 8 + bob, 4, 1, C.concreteD)
  rect(ctx, x + 6, y + 10 + bob, 3, 1, C.teal)
}

function drawMarker(ctx, x, y, time, kind) {
  let bob = Math.floor(time / 250) % 2
  if (kind === 'item') {
    rect(ctx, x + 6, y - 6 - bob, 4, 4, C.gold)
    rect(ctx, x + 7, y - 5 - bob, 2, 2, C.white)
    return
  }
  rect(ctx, x + 6, y - 9 - bob, 4, 6, C.teal)
  rect(ctx, x + 7, y - 2 - bob, 2, 2, C.teal)
  rect(ctx, x + 6, y - 9 - bob, 4, 1, C.white)
}

function drawTrain(ctx, x, y) {
  rect(ctx, x + 1, y + 5, 14, 7, C.red)
  rect(ctx, x + 2, y + 3, 7, 4, C.white)
  rect(ctx, x + 3, y + 4, 2, 2, C.waterL)
  rect(ctx, x + 6, y + 4, 2, 2, C.waterL)
  rect(ctx, x + 11, y + 6, 3, 3, C.gold)
  rect(ctx, x + 3, y + 12, 3, 2, C.outline)
  rect(ctx, x + 10, y + 12, 3, 2, C.outline)
}

function drawNote(ctx, x, y) {
  rect(ctx, x, y, 3, 4, C.outline)
  rect(ctx, x + 2, y, 4, 1, C.outline)
}

function drawBench(ctx, x, y) {
  rect(ctx, x + 2, y + 7, 12, 3, C.wood)
  rect(ctx, x + 2, y + 6, 12, 1, C.woodL)
  rect(ctx, x + 3, y + 10, 2, 4, C.woodD)
  rect(ctx, x + 11, y + 10, 2, 4, C.woodD)
}

function drawLamp(ctx, x, y) {
  rect(ctx, x + 7, y + 6, 2, 9, C.asphalt)
  rect(ctx, x + 4, y + 3, 8, 4, C.gold)
  rect(ctx, x + 5, y + 4, 6, 2, '#fff4c4')
}

function drawSign(ctx, x, y) {
  rect(ctx, x + 7, y + 8, 2, 7, C.woodD)
  rect(ctx, x + 3, y + 3, 10, 6, C.white)
  rect(ctx, x + 3, y + 3, 10, 1, C.teal)
  rect(ctx, x + 4, y + 6, 6, 1, C.concreteD)
}

function drawDecor(ctx, camX, camY, x0, x1, y0, y1) {
  let pieces = [
    [32, 17, drawBench],
    [28, 15, drawBench],
    [18, 15, drawBench],
    [34, 17, drawLamp],
    [14, 17, drawLamp],
    [34, 14, drawSign],
  ]
  for (let [tx, ty, draw] of pieces) {
    if (tx < x0 || tx > x1 || ty < y0 || ty > y1) continue
    draw(ctx, tx * TILE - camX, ty * TILE - camY)
  }
}

export function drawWorld(ctx, state, time) {
  let { x: px, y: py } = playerPixel(state.player)
  let viewW = VIEW_COLS * TILE
  let viewH = VIEW_ROWS * TILE
  let camX = Math.max(0, Math.min(COLS * TILE - viewW, px - viewW / 2 + TILE / 2))
  let camY = Math.max(0, Math.min(ROWS * TILE - viewH, py - viewH / 2 + TILE / 2))

  ctx.imageSmoothingEnabled = false
  ctx.clearRect(0, 0, viewW, viewH)

  let x0 = Math.floor(camX / TILE)
  let y0 = Math.floor(camY / TILE)
  let x1 = Math.min(COLS - 1, Math.ceil((camX + viewW) / TILE))
  let y1 = Math.min(ROWS - 1, Math.ceil((camY + viewH) / TILE))

  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      let tile = state.tiles[ty][tx]
      let x = tx * TILE - camX
      let y = ty * TILE - camY
      if (tile === 'tree') drawGrass(ctx, x, y, tx, ty, false, state.tiles)
      else if (tile === 'grass') drawGrass(ctx, x, y, tx, ty, false, state.tiles)
      else if (tile === 'lawn') drawGrass(ctx, x, y, tx, ty, true, state.tiles)
      else if (tile === 'path') drawPath(ctx, x, y, tx, ty)
      else if (tile === 'board') drawBoard(ctx, x, y, tx)
      else if (tile === 'water') drawWater(ctx, x, y, tx, ty, time)
      else if (tile === 'reed') drawReed(ctx, x, y, tx, ty)
      else if (tile === 'road') drawRoad(ctx, x, y)
      else if (tile === 'cross') drawCross(ctx, x, y)
      else if (tile === 'walk') drawWalk(ctx, x, y, ty, tx)
      else if (tile === 'roof') drawRoof(ctx, x, y, tx)
      else if (tile === 'libWall') drawWall(ctx, x, y, false, false)
      else if (tile === 'libWin') drawWall(ctx, x, y, true, false)
      else if (tile === 'libDoor') drawDoor(ctx, x, y, false)
      else if (tile === 'artWall') drawWall(ctx, x, y, false, true)
      else if (tile === 'artWin') drawWall(ctx, x, y, true, true)
      else if (tile === 'artDoor') drawDoor(ctx, x, y, true)
      else if (tile === 'track') drawTrack(ctx, x, y, tx, ty)
      else if (tile === 'play') drawPlay(ctx, x, y)
      else if (tile === 'pavilion') drawPavilionTile(ctx, x, y, tx, ty)
      else drawGrass(ctx, x, y, tx, ty, false, state.tiles)
    }
  }

  drawDecor(ctx, camX, camY, x0, x1, y0, y1)

  if (y0 <= 20 && y1 >= 20 && x0 <= 20 && x1 >= 20) {
    drawSlide(ctx, 20 * TILE - camX, 20 * TILE - camY)
  }
  if (y0 <= 21 && y1 >= 21 && x0 <= 23 && x1 >= 23) {
    drawSwings(ctx, 23 * TILE - camX, 21 * TILE - camY)
  }

  let sprites = []
  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      if (state.tiles[ty][tx] !== 'tree') continue
      sprites.push({
        y: ty * TILE + 12,
        draw: () => drawTree(ctx, tx * TILE - camX, ty * TILE - camY, tx, ty),
      })
    }
  }

  for (let entity of state.entities) {
    sprites.push({
      y: entity.y * TILE + (entity.kind === 'heron' ? 14 : 12),
      draw: () => drawEntity(ctx, entity, camX, camY, time, state),
    })
  }

  let frame = state.player.moving ? Math.floor(state.player.step / 8) % 2 === 1 : false
  sprites.push({
    y: py + 12,
    draw: () =>
      drawHuman(
        ctx,
        px - camX,
        py - camY,
        frame,
        state.player.dir,
        { shirt: C.teal, shirtD: C.tealD, hair: C.hair, pants: C.ink, pantsD: '#18202c' },
      ),
  })

  let trainIndex = Math.floor(time / 140) % TRAIN_LOOP.length
  let [trainX, trainY] = TRAIN_LOOP[trainIndex]
  sprites.push({
    y: trainY * TILE + 10,
    draw: () => drawTrain(ctx, trainX * TILE - camX, trainY * TILE - camY - 2),
  })

  sprites.sort((a, b) => a.y - b.y)
  sprites.forEach((sprite) => sprite.draw())

  if (state.endingPlayed) {
    let age = (time / 180) % 8
    for (let i = 0; i < 4; i++) {
      drawNote(ctx, 24 * TILE - camX + i * 10, 13 * TILE - camY - ((age + i * 2) % 8) * 2)
    }
  }
}

function needsBang(state, entity) {
  if (entity.kind === 'librarian') return !state.returned.card
  if (entity.kind === 'volunteer') return !state.returned.flag
  if (entity.kind === 'manager') return !state.returned.pages
  if (entity.kind === 'card' || entity.kind === 'flag' || entity.kind === 'page') return true
  return false
}

function drawEntity(ctx, entity, camX, camY, time, state) {
  let x = entity.x * TILE - camX
  let y = entity.y * TILE - camY
  if (entity.kind === 'card') drawCard(ctx, x, y, time)
  else if (entity.kind === 'flag') drawFlag(ctx, x, y, time)
  else if (entity.kind === 'page') drawPage(ctx, x, y, time)
  else if (entity.kind === 'heron') drawHeron(ctx, x, y, time)
  else if (entity.kind === 'plaque') drawPlaqueTile(ctx, x, y)
  else if (entity.kind === 'librarian') {
    drawHuman(ctx, x, y, false, 'down', {
      shirt: C.wall,
      shirtD: C.wallD,
      hair: C.hairL,
      pants: C.ink,
      pantsD: '#18202c',
    }, glasses)
  } else if (entity.kind === 'volunteer') {
    drawHuman(ctx, x, y, false, 'down', {
      shirt: '#2f6d9a',
      shirtD: '#1d4c70',
      hair: C.hair,
      pants: C.ink,
      pantsD: '#18202c',
    }, cap)
  } else if (entity.kind === 'manager') {
    drawHuman(ctx, x, y, false, 'down', {
      shirt: C.outline,
      shirtD: '#120e0c',
      hair: C.hairL,
      pants: C.ink,
      pantsD: '#18202c',
    }, headset)
  } else if (entity.kind === 'kid') {
    drawHuman(ctx, x, y + 2, false, 'down', {
      shirt: C.red,
      shirtD: '#9d3030',
      hair: C.gold,
      pants: '#3d6b3a',
      pantsD: '#274826',
    })
  }

  if (needsBang(state, entity)) {
    drawMarker(
      ctx,
      x,
      y,
      time,
      entity.kind === 'card' || entity.kind === 'flag' || entity.kind === 'page' ? 'item' : 'talk',
    )
  }
}
