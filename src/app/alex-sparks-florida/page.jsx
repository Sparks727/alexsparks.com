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
  title: 'Alex Sparks Florida - Web Developer & Entrepreneur in Florida',
  description: 'Alex Sparks is a web developer and entrepreneur based in Florida. Learn about Alex Sparks Florida, his expertise in local SEO, and how he helps Florida businesses succeed online.',
  keywords: [
    'Alex Sparks Florida',
    'Alex Sparks Tampa',
    'web developer Florida',
    'entrepreneur Florida',
    'local SEO Florida',
    'Florida web developer',
    'business software Florida',
    'Clearwater Florida',
    'Tampa Bay',
  ],
  openGraph: {
    title: 'Alex Sparks Florida - Web Developer & Entrepreneur',
    description: 'Web developer and entrepreneur in Florida specializing in local SEO and business software solutions for Florida businesses.',
    url: 'https://alex-sparks.com/alex-sparks-florida',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AlexSparksFlorida() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Alex Sparks Florida - Web Developer and Entrepreneur"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Alex Sparks Florida - Web Developer & Entrepreneur
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m Alex Sparks, a web developer and entrepreneur based in Florida. 
              Since 1999, Florida has been my home, and I&apos;ve dedicated my career to helping businesses throughout 
              the Sunshine State succeed in the digital age. As Alex Sparks Florida, I bring innovative web solutions 
              and local SEO expertise to companies across Florida.
            </p>
            <p>
              Born in Ohio but raised in Florida, I understand the unique business landscape of the state. 
              From the bustling markets of Tampa and Orlando to the coastal communities along the Gulf and Atlantic, 
              Florida businesses face unique challenges and opportunities in the digital space.
            </p>
            <p>
              My work focuses on helping Florida businesses establish and grow their online presence through 
              strategic web development and local SEO. I&apos;ve worked with hundreds of businesses throughout Florida, 
              helping them improve their visibility in local search results and connect with customers across the state.
            </p>
            <p>
              Currently based in Clearwater, Florida, I&apos;m developing OmniLocal, a comprehensive local marketing 
              and reputation software designed to help Florida businesses simplify their digital marketing efforts. 
              This platform is built with Florida business owners in mind, addressing the specific needs of local 
              marketing and customer acquisition in the competitive Florida market.
            </p>
            <p>
              My experience spans multiple industries that are thriving in Florida, including real estate, 
              legal services, construction, healthcare, hospitality, and retail. I understand the seasonal 
              nature of many Florida businesses and how to optimize digital strategies accordingly.
            </p>
            <p>
              Whether you&apos;re a small business owner in Florida looking to improve your local search rankings, 
              or a marketing agency serving Florida clients, I can help. As Alex Sparks Florida, I bring 
              a combination of technical expertise and deep understanding of the Florida market to every project.
            </p>
            <p>
              If you&apos;re interested in learning more about how Alex Sparks Florida can help your Florida business 
              succeed online, I&apos;d love to hear from you. Let&apos;s discuss how we can grow your business 
              and reach more customers throughout Florida.
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

