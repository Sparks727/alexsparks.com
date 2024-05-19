import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

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
  title: 'About',
  description:
    'I’m Alex Sparks. I live in Clearwater, FL, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Alex Sparks and Im helping design the
            future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
            I have a deep passion for technology and a lifelong curiosity about how computers tick.
            My fascination with technology began at a young age, fueled by gaming systems like the Nintendo 64 and Gameboys.
            In my free time as a kid I would disemble & help fix Microsoft system hardware’s such as consoles and controllers.
            </p>
            <p>
              While my upbringing involved frequent moves, Florida living is perfect for me, but the idea of a mountain cabin retreat is a long-term dream.
              When I'm not diving into the world of technology, I'm planning my next adventure. 
              Now a seasoned traveler, I have explored almost 20 states in the US and ventured abroad to destinations like Netherlands, Germany, and Puerto Rico.
              At home, I enjoy family time with my partner Jordan, son Easton, and our canine companions, Balto (a Blue Heeler) and Kylo (a Blue Heeler/Staffordshire Terrier mix).
            </p>
            <p>
              Currently, I am developing OmniLocal, a local marketing & reputation software  
              that greatly simplifies and reduces the number of platforms that marketing agencies and small business owners have to use for local SEO.
            </p>
            <p>
            Spearheading the implementation of cutting-edge features for businesses of all sizes, 
            I possess a deep understanding of emerging business software solutions and extensive experience managing diverse marketing advertising systems.
            My team has empowered over hundreds of local businesses to thrive by optimizing their online presence for customer acquisition through search engines and phone calls. 
            Our proven track record of success spans various industries including realtors, lawyers, contractors, dentists, and more.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://www.facebook.com/OmniLocalCo/" icon={XIcon}>
              Follow on Facebook
            </SocialLink>
            <SocialLink href="https://www.youtube.com/@OmniLocalai" icon={InstagramIcon} className="mt-4">
              Subscribe to Channel
            </SocialLink>
            <SocialLink href="https://github.com/Sparks727/" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/alex-sparks-%F0%9F%9A%80-41966a247/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
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
