import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoOmniLocal from '@/images/logos/omnilocal.png'
import logoGGMS from '@/images/logos/ggms.png'
import logoBlueSkyRoofing from '@/images/logos/blueskyroofing.png'
import logoBusinessLocation from '@/images/logos/businesslocation.png'
import logoSparksStack from '@/images/logos/sparks-stack.png'

const projects = [
  {
    name: 'OmniLocal',
    description:
      'We help with Google Local Service Ads, Google Business Profile optimization, Local SEO, SEM/PPC, Reputation management, and Technical education.',
    link: { href: 'https://www.omnilocal.com/', label: 'omnilocal.com' },
    logo: logoOmniLocal,
  },
  {
    name: 'Sparks Stack',
    description:
      'Google Business Profile Management Software',
    link: { href: 'https://www.sparksstack.com/', label: 'sparksstack.com' },
    logo: logoSparksStack,
  },
  {
    name: 'Blue Sky Roofing',
    description:
      'We use modern technology to save you money, communicate proactively, and give you an amazing final product.',
    link: { href: 'https://www.blueskyroofing.com/', label: 'blueskyroofing.com' },
    logo: logoBlueSkyRoofing,
  },
  {
    name: 'BusinessLocation',
    description:
      'Optimal Location to Open a Google Business Profile',
    link: { href: 'https://www.businesslocation.us/', label: 'businesslocation.us' },
    logo: logoBusinessLocation,
  },
  {
    name: 'GGMS',
    description:
      'Follow up system designed for Sierra Interactive platform with video landing pages, automations, action plans, smart filters, tags, and contact templates.',
    link: { href: 'https://www.ggms.com/', label: 'ggms.com' },
    logo: logoGGMS,
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata = {
  title: 'Alex Sparks - Software & Web Development Portfolio',
  description: 'Explore Alex Sparks\' portfolio of software and web development projects. From OmniLocal to BusinessLocation.us, see how I help businesses succeed online.',
  openGraph: {
    title: 'Alex Sparks - Development Portfolio',
    description: 'Portfolio of web and software development projects by Alex Sparks.',
  }
}

export default function career() {
  return (
    <SimpleLayout
      title="Building the Future: My Experience in Tech"
      intro="I'm passionate about building user-centric software and websites that make a difference. Here are some of the projects I'm most proud of from my time at tech companies"
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
