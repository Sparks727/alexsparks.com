import { internationalTrips } from '@/data/travel'

export function VisitedList() {
  return (
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
  )
}
