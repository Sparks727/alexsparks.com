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
  title: 'Alex Sparks Clearwater - Web Developer & Entrepreneur in Clearwater, FL',
  description: 'Alex Sparks is a web developer and entrepreneur based in Clearwater, Florida. Learn about Alex Sparks Clearwater, his work in local SEO, and innovative business solutions for Clearwater businesses.',
  keywords: [
    'Alex Sparks Clearwater',
    'Alex Sparks Clearwater Florida',
    'web developer Clearwater',
    'entrepreneur Clearwater',
    'local SEO Clearwater',
    'Clearwater web developer',
    'business software Clearwater',
    'Alex Sparks Florida',
    'Alex Sparks Tampa Bay',
  ],
  openGraph: {
    title: 'Alex Sparks Clearwater - Web Developer & Entrepreneur',
    description: 'Web developer and entrepreneur in Clearwater, Florida specializing in local SEO and business software solutions for Clearwater businesses.',
    url: 'https://alex-sparks.com/alex-sparks-clearwater',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AlexSparksClearwater() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Alex Sparks Clearwater - Web Developer and Entrepreneur"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Alex Sparks Clearwater - Web Developer & Entrepreneur in Clearwater, Florida
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m Alex Sparks, a web developer and entrepreneur based in Clearwater, Florida. 
              As someone who calls Clearwater home, I&apos;m deeply committed to helping businesses in this 
              beautiful coastal community succeed online and connect with their local customers.
            </p>
            <p>
              Living and working in Clearwater since 1999, I&apos;ve grown to understand the unique character 
              of this Gulf Coast city and the businesses that call it home. Clearwater is a vibrant community 
              with a mix of tourism, healthcare, technology, and local service businesses, each with their own 
              digital marketing needs.
            </p>
            <p>
              My work as Alex Sparks Clearwater focuses on helping Clearwater businesses establish and grow 
              their online presence through strategic web development and local SEO. I specialize in creating 
              solutions that help Clearwater businesses rank higher in local search results and attract more 
              customers from the Clearwater area and beyond.
            </p>
            <p>
              Currently, I am developing OmniLocal, a local marketing and reputation software designed to help 
              Clearwater businesses simplify their digital marketing efforts. This platform helps Clearwater 
              business owners and marketing agencies manage their local online presence more effectively, 
              reducing the complexity of managing multiple platforms for local SEO.
            </p>
            <p>
              Through my work, I&apos;ve helped numerous businesses throughout Clearwater and the surrounding 
              Tampa Bay area optimize their online presence for better customer acquisition. My experience spans 
              various industries popular in Clearwater, including healthcare, real estate, legal services, 
              hospitality, retail, and professional services.
            </p>
            <p>
              Whether you&apos;re a small business owner in Clearwater looking to improve your local search rankings, 
              or a marketing agency serving Clearwater clients, I can help. As Alex Sparks Clearwater, I bring 
              both technical expertise and deep understanding of the Clearwater market to every project.
            </p>
            <p>
              If you&apos;re a business owner in Clearwater looking to improve your local online presence, or you&apos;re 
              interested in learning more about Alex Sparks Clearwater and the services I provide to Clearwater 
              businesses, I&apos;d love to connect and discuss how we can help grow your Clearwater business.
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

