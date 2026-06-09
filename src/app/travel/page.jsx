import { SimpleLayout } from '@/components/SimpleLayout'
import { TravelDashboard } from '@/components/travel/TravelDashboard'

export const metadata = {
  title: 'Alex Sparks - Travel Adventures & Experiences',
  description:
    "Follow Alex Sparks' travel adventures across America. Exploring new places, meeting new people, and finding inspiration for innovative solutions.",
  openGraph: {
    title: 'Alex Sparks - Travel Map',
    description: 'Join Alex Sparks on a journey across America.',
  },
}

export default function Travel() {
  return (
    <SimpleLayout
      title="My Travel Bucket List Progress"
      intro="Living the American Dream: One State at a Time! 🇺🇸 Check out how many incredible places I've explored so far. Any suggestions for my next adventure?"
    >
      <TravelDashboard />
    </SimpleLayout>
  )
}
