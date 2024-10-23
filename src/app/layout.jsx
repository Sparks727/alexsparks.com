import { Analytics } from "@vercel/analytics/react"
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import Script from 'next/script'

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
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MVPCHBDG');
            `
        }}
      />
      {/* End Google Tag Manager */}
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className="flex h-full bg-zinc-50 dark:bg-black">
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MVPCHBDG"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
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
