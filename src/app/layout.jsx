import { Analytics } from "@vercel/analytics/react"

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { PersonSchema, LocalBusinessSchema, OrganizationSchema } from '@/components/StructuredData'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Alex Sparks',
    default: 'Alex Sparks - Founder & Autonomous Problem Solver',
  },
  description:
    'I\'m Alex Sparks, a junior web developer and entrepreneur based in Clearwater, FL. My latest project, OmniLocal, is an all-in-one software that helps businesses take control of their local online presence.',
  keywords: [
    'Alex Sparks',
    'Founder',
    'Autonomous Problem Solver',
    'Entrepreneur',
    'Clearwater',
    'Florida',
    'Local SEO',
    'OmniLocal',
    'Business Software',
    'Digital Marketing'
  ],
  authors: [{ name: 'Alex Sparks', url: 'https://alex-sparks.com' }],
  creator: 'Alex Sparks',
  publisher: 'Alex Sparks',
  icons: {
    icon: [
      { url: '/favicon2.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon2.ico', type: 'image/x-icon' },
    ],
  },
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: 'Alex Sparks - Founder & Autonomous Problem Solver',
    description: 'I\'m Alex Sparks, a junior web developer and entrepreneur based in Clearwater, FL. Creator of OmniLocal, helping businesses control their online presence.',
    url: 'https://alex-sparks.com',
    siteName: 'Alex Sparks',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Sparks - Founder & Autonomous Problem Solver',
    description: 'Junior web developer and entrepreneur based in Clearwater, FL. Creator of OmniLocal.',
    creator: '@AlexOmniLocal',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <PersonSchema />
        <LocalBusinessSchema />
        <OrganizationSchema />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
