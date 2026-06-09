'use client'

import { TravelMap } from '@/components/travel/TravelMap'
import { TravelStats } from '@/components/travel/TravelStats'
import { VisitedList } from '@/components/travel/VisitedList'

export function TravelDashboard() {
  return (
    <div className="space-y-10">
      <TravelMap />
      <TravelStats />
      <VisitedList />
    </div>
  )
}
