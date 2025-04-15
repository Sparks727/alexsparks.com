import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'Thanks for Subscribing - Alex Sparks Newsletter',
  description: 'Thank you for subscribing to Alex Sparks\' newsletter. Stay updated with the latest insights on web development, local SEO, and business software.',
  robots: {
    index: false
  }
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Thanks for subscribing."
      intro="I'll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you'd want to hear about. You can unsubscribe at any time, no hard feelings."
    />
  )
}
