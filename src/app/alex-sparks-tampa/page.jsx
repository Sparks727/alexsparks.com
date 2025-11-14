import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  SteamIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.JPG'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata = {
  title: 'Alex Sparks Tampa - Web Developer & Entrepreneur in Tampa Bay',
  description: 'Alex Sparks is a web developer and entrepreneur based in the Tampa Bay area. Learn about Alex Sparks Tampa, his work in local SEO, and innovative business solutions for Tampa businesses.',
  keywords: [
    'Alex Sparks Tampa',
    'Alex Sparks Tampa Bay',
    'web developer Tampa',
    'entrepreneur Tampa',
    'local SEO Tampa',
    'Tampa web developer',
    'business software Tampa',
    'Alex Sparks Florida',
  ],
  openGraph: {
    title: 'Alex Sparks Tampa - Web Developer & Entrepreneur',
    description: 'Web developer and entrepreneur in Tampa Bay specializing in local SEO and business software solutions for Tampa businesses.',
    url: 'https://alex-sparks.com/alex-sparks-tampa',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AlexSparksTampa() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Alex Sparks Tampa - Web Developer and Entrepreneur"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Alex Sparks Tampa - Web Developer & Entrepreneur in Tampa Bay
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m Alex Sparks, a web developer and entrepreneur working in the Tampa Bay area. 
              Based in Clearwater, Florida, I serve businesses throughout Tampa, St. Petersburg, and the surrounding Tampa Bay region.
              My passion for technology and innovation drives me to help Tampa businesses succeed online.
            </p>
            <p>
              Living in the Tampa Bay area since 1999, I&apos;ve grown up in Florida and understand the unique needs of local businesses.
              The Tampa market is vibrant and competitive, which is why I focus on helping businesses in Tampa and the surrounding area 
              establish a strong online presence and connect with their local customers.
            </p>
            <p>
              As someone deeply involved in the Tampa tech scene, I&apos;ve built expertise in local SEO and digital marketing 
              specifically tailored for Tampa businesses. My work helps companies across Tampa Bay improve their visibility 
              in local search results and attract more customers in the Tampa area.
            </p>
            <p>
              Currently, I am developing OmniLocal, a local marketing and reputation software that greatly simplifies 
              the tools that Tampa marketing agencies and small business owners need for local SEO. 
              The platform helps Tampa businesses take control of their online presence across multiple channels.
            </p>
            <p>
              Through my work, I&apos;ve helped hundreds of businesses throughout Tampa and Florida optimize their online presence 
              for better customer acquisition through search engines and phone calls. My experience spans various industries 
              popular in Tampa including real estate, legal services, construction, dental practices, and more.
            </p>
            <p>
              If you&apos;re a business owner in Tampa looking to improve your local online presence, or you&apos;re interested 
              in learning more about Alex Sparks Tampa and the services I provide to Tampa Bay businesses, 
              I&apos;d love to connect and discuss how we can help grow your Tampa business.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/AlexOmniLocal" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://www.facebook.com/alex.sparks.96558" icon={FacebookIcon} className="mt-4">
              Follow on Facebook
            </SocialLink>
            <SocialLink href="https://github.com/Sparks727/" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/alex-sparks-%F0%9F%9A%80-41966a247/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink href="https://steamcommunity.com/id/Sparks_up/" icon={SteamIcon} className="mt-4">
              View Steam Profile
            </SocialLink>
            <SocialLink
              href="mailto:sparksstack@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              sparksstack@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}

