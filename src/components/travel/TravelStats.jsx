import { getTravelStats } from '@/data/travel'

export function TravelStats() {
  const { visitedCount, totalStates, percent, remainingCount } = getTravelStats()

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            United States progress
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            {visitedCount}{' '}
            <span className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
              / {totalStates} states
            </span>
          </p>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {remainingCount} states left on the bucket list
        </p>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-teal-600 dark:text-teal-400">
            {percent}% explored
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500 dark:bg-teal-400"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
