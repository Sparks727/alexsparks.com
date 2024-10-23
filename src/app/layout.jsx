import { Analytics } from "@vercel/analytics/react"
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { GoogleTagManager } from '@next/third-parties/google'; // Import GoogleTagManager

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Alex Sparks',
    default:
      'Alex Sparks - Founder & Autonomous Problem Solver.',
  },
  description:
    'I’m Alex - Founder & Autonomous Problem Solver.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <>
      {/* Google Tag Manager */}
      <GoogleTagManager containerId="GTM-MVPCHBDG" /> {/* Replace with your GTM container ID */}
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className="flex h-full bg-zinc-50 dark:bg-black">
          <Providers>
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
          </Providers>
          <Analytics />
        </body>
      </html>
    </>
  )
}
