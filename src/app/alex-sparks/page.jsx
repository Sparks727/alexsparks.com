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
  title: 'Alex Sparks - Web Developer, Entrepreneur & Problem Solver',
  description: 'Alex Sparks is a web developer, entrepreneur, and founder based in Florida. Learn about Alex Sparks, his work in local SEO, web development, and innovative business solutions.',
  keywords: [
    'Alex Sparks',
    'Alex Sparks web developer',
    'Alex Sparks entrepreneur',
    'Alex Sparks Florida',
    'Alex Sparks Tampa',
    'founder Alex Sparks',
    'web developer',
    'entrepreneur',
    'local SEO',
    'OmniLocal',
    'Sparks Stack',
  ],
  openGraph: {
    title: 'Alex Sparks - Web Developer, Entrepreneur & Problem Solver',
    description: 'Web developer and entrepreneur specializing in local SEO, web development, and business software solutions. Founder of OmniLocal and Sparks Stack.',
    url: 'https://alex-sparks.com/alex-sparks',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AlexSparks() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Alex Sparks - Web Developer and Entrepreneur"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Alex Sparks - Founder, Web Developer & Autonomous Problem Solver
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m Alex Sparks, a web developer, entrepreneur, and founder passionate about solving complex problems 
              through technology and innovation. My journey in technology began at a young age, and today I&apos;m helping 
              businesses succeed in the digital landscape.
            </p>
            <p>
              With a deep passion for technology and a lifelong curiosity about how computers work, I&apos;ve built my career 
              on the foundation of continuous learning and problem-solving. My fascination with technology started with 
              gaming systems like the Nintendo 64 and Gameboy, and as a kid, I would disassemble and help fix Microsoft 
              hardware such as consoles and controllers in my free time.
            </p>
            <p>
              As an entrepreneur and founder, I&apos;m currently developing OmniLocal, a local marketing and reputation software 
              that simplifies the digital marketing process for businesses and agencies. OmniLocal helps companies take control 
              of their local online presence, reducing the complexity of managing multiple platforms for local SEO.
            </p>
            <p>
              I&apos;m also the founder of Sparks Stack, where I work on innovative solutions for businesses of all sizes. 
              Through my work, I&apos;ve helped hundreds of local businesses optimize their online presence for better customer 
              acquisition through search engines and phone calls. My track record spans various industries including real estate, 
              legal services, construction, healthcare, and more.
            </p>
            <p>
              Born in Ohio but raised in Florida since 1999, I bring a unique perspective to web development and digital marketing. 
              My experience managing diverse marketing and advertising systems has given me deep insights into what works 
              for businesses in today&apos;s competitive digital landscape.
            </p>
            <p>
              Beyond my work, I&apos;m an avid traveler who has explored almost 20 states in the US and traveled internationally 
              to destinations like the Netherlands, Germany, and Puerto Rico. At home, I enjoy spending time with my partner Jordan, 
              son Easton, and our two dogs, Balto and Kylo.
            </p>
            <p>
              Whether you&apos;re looking to understand more about Alex Sparks, my work in web development, or how I help businesses 
              succeed online, I&apos;m here to help. I believe in creating solutions that make a real difference for businesses 
              and their customers.
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

