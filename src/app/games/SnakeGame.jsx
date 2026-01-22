'use client'

import { useState, useEffect } from 'react'

export default function SnakeGame() {
  const GRID_SIZE = 20
  const CELL_SIZE = 20
  const INITIAL_SPEED = 150

  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(INITIAL_SPEED)

  const generateFood = (currentSnake = snake) => {
    let attempts = 0
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
      attempts++
    } while (
      currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y) &&
      attempts < 100
    )
    return newFood
  }

  const resetGame = () => {
    const initialSnake = [{ x: 10, y: 10 }]
    setSnake(initialSnake)
    setDirection({ x: 1, y: 0 })
    setFood(generateFood(initialSnake))
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
    setSpeed(INITIAL_SPEED)
  }

  useEffect(() => {
    if (gameOver || isPaused) return

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0]
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        }

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true)
          return prevSnake
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          const newFood = generateFood(newSnake)
          setFood(newFood)
          setScore(prev => {
            const newScore = prev + 1
            // Increase speed slightly every 5 points
            if (newScore % 5 === 0) {
              setSpeed(prevSpeed => Math.max(80, prevSpeed - 10))
            }
            return newScore
          })
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, speed)

    return () => clearInterval(gameLoop)
  }, [direction, food, gameOver, isPaused, speed, score])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return

      const key = e.key.toLowerCase()
      switch (key) {
        case 'w':
          if (direction.y === 0) {
            setDirection({ x: 0, y: -1 })
            setIsPaused(false)
          }
          break
        case 's':
          if (direction.y === 0) {
            setDirection({ x: 0, y: 1 })
            setIsPaused(false)
          }
          break
        case 'a':
          if (direction.x === 0) {
            setDirection({ x: -1, y: 0 })
            setIsPaused(false)
          }
          break
        case 'd':
          if (direction.x === 0) {
            setDirection({ x: 1, y: 0 })
            setIsPaused(false)
          }
          break
        case ' ':
          e.preventDefault()
          setIsPaused(prev => !prev)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameOver])

  const renderCell = (x, y) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y)
    const isFood = food.x === x && food.y === y

    let cellClass = 'w-5 h-5 border border-zinc-200 dark:border-zinc-700'
    
    if (isSnakeHead) {
      cellClass += ' bg-teal-600 dark:bg-teal-500'
    } else if (isSnakeBody) {
      cellClass += ' bg-teal-400 dark:bg-teal-600'
    } else if (isFood) {
      cellClass += ' bg-red-500 dark:bg-red-600 rounded-full'
    } else {
      cellClass += ' bg-white dark:bg-zinc-800'
    }

    return <div key={`${x}-${y}`} className={cellClass} />
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
          Score: {score}
        </div>
        {gameOver && (
          <p className="text-xl font-bold text-red-500 mb-4">
            Game Over! Final Score: {score}
          </p>
        )}
        {gameOver && (
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors mb-4"
          >
            Play Again
          </button>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div
          className="grid gap-0 border-2 border-zinc-300 dark:border-zinc-600 rounded-lg p-2 bg-zinc-100 dark:bg-zinc-900"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE
            const y = Math.floor(i / GRID_SIZE)
            return renderCell(x, y)
          })}
        </div>
        <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 text-center max-w-md">
          <p>Use WASD keys to control the snake</p>
          <p>Press Space to pause/resume</p>
        </div>
      </div>
    </div>
  )
}
