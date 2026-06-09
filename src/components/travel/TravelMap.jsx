'use client'

import { useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useTheme } from 'next-themes'

import {
  STATE_ABBREV_TO_NAME,
  visitedStateFips,
} from '@/data/travel'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const MAP_STYLES = {
  light: {
    visited: '#14b8a6',
    visitedHover: '#0d9488',
    unvisited: '#e4e4e7',
    unvisitedHover: '#d4d4d8',
    stroke: '#ffffff',
  },
  dark: {
    visited: '#2dd4bf',
    visitedHover: '#14b8a6',
    unvisited: '#3f3f46',
    unvisitedHover: '#52525b',
    stroke: '#27272a',
  },
}

export function TravelMap() {
  const { resolvedTheme } = useTheme()
  const [hoveredState, setHoveredState] = useState(null)
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'
  const colors = MAP_STYLES[theme]

  const hoveredLabel = useMemo(() => {
    if (!hoveredState) {
      return null
    }

    return STATE_ABBREV_TO_NAME[hoveredState] ?? hoveredState
  }, [hoveredState])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-700/40 dark:bg-zinc-900/50 sm:p-6">
        {hoveredLabel && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-zinc-800 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-100 dark:ring-white/10">
            {hoveredLabel}
          </div>
        )}
        <ComposableMap
          projection="geoAlbersUsa"
          className="h-auto w-full"
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = geo.id
                const isVisited = visitedStateFips.has(fips)
                const stateName = geo.properties.name
                const abbrev =
                  Object.entries(STATE_ABBREV_TO_NAME).find(
                    ([, name]) => name === stateName,
                  )?.[0] ?? null

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (abbrev) {
                        setHoveredState(abbrev)
                      }
                    }}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      default: {
                        fill: isVisited ? colors.visited : colors.unvisited,
                        stroke: colors.stroke,
                        strokeWidth: 0.75,
                        outline: 'none',
                        transition: 'fill 150ms ease',
                      },
                      hover: {
                        fill: isVisited
                          ? colors.visitedHover
                          : colors.unvisitedHover,
                        stroke: colors.stroke,
                        strokeWidth: 0.75,
                        outline: 'none',
                        cursor: 'pointer',
                      },
                      pressed: {
                        fill: isVisited
                          ? colors.visitedHover
                          : colors.unvisitedHover,
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: colors.visited }}
          />
          Visited
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: colors.unvisited }}
          />
          Not yet visited
        </div>
      </div>
    </div>
  )
}
