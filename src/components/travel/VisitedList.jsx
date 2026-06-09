import {
  internationalTrips,
  STATE_ABBREV_TO_NAME,
  visitedStates,
} from '@/data/travel'

export function VisitedList() {
  const sortedStates = [...visitedStates].sort((a, b) =>
    STATE_ABBREV_TO_NAME[a].localeCompare(STATE_ABBREV_TO_NAME[b]),
  )

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          International adventures
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Destinations explored outside the continental U.S.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {internationalTrips.map((trip) => (
            <li
              key={trip.country}
              className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-700/40"
            >
              <div className="text-2xl">{trip.flag}</div>
              <p className="mt-3 font-medium text-zinc-800 dark:text-zinc-100">
                {trip.country}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {trip.region}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Visited states
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Hover over the map to explore each state by name.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {sortedStates.map((abbrev) => (
            <li
              key={abbrev}
              className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"
              title={STATE_ABBREV_TO_NAME[abbrev]}
            >
              {abbrev}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
