import { Analytics } from "@vercel/analytics/react"

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import HiddenImageFeature from '@/components/HiddenImageFeature'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Alex Sparks',
    default:
      'Alex Sparks - Founder & Autonomous Problem Solver.',
  },
  description:
    'I’m Alex Sparks, a junior web developer and entrepreneur based in Clearwater, FL. My latest project, OmniLocal, is an all-in-one software that helps businesses take control of their local online presence.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>
              <HiddenImageFeature />
              {children}
            </Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
