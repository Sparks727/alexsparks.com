import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import {
  ReactIcon,
  NextJSIcon,
  VercelIcon,
  TailwindIcon,
  HeadlessUIIcon,
} from '@/components/icons/TechIcons'

const technologies = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    icon: ReactIcon,
    color: 'text-[#61DAFB]',
    link: { href: 'https://reactjs.org/', label: 'reactjs.org' },
  },
  {
    name: 'Next.js',
    description: 'The React framework for production',
    icon: NextJSIcon,
    color: 'text-black dark:text-white',
    link: { href: 'https://nextjs.org/', label: 'nextjs.org' },
  },
  {
    name: 'Vercel',
    description: 'Cloud platform for static sites and Serverless Functions',
    icon: VercelIcon,
    color: 'text-black dark:text-white',
    link: { href: 'https://vercel.com/', label: 'vercel.com' },
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework',
    icon: TailwindIcon,
    color: 'text-[#06B6D4]',
    link: { href: 'https://tailwindcss.com/', label: 'tailwindcss.com' },
  },
  {
    name: 'Headless UI',
    description: 'Unstyled, accessible UI components',
    icon: HeadlessUIIcon,
    color: 'text-[#1A1A1A] dark:text-white',
    link: { href: 'https://headlessui.com/', label: 'headlessui.com' },
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
  title: 'Tech Stack - Alex Sparks',
  description: 'The technology stack powering my website and projects.',
}

export default function TechStack() {
  return (
    <SimpleLayout
      title="My Websites Tech Stack"
      intro="The modern web technologies that power my website and projects. Built with performance, accessibility, and developer experience in mind."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {technologies.map((tech) => {
          const Icon = tech.icon
          return (
            <Card as="li" key={tech.name}>
              <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 ${tech.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={tech.link.href}>{tech.name}</Card.Link>
              </h2>
              <Card.Description>{tech.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{tech.link.label}</span>
              </p>
            </Card>
          )
        })}
      </ul>
    </SimpleLayout>
  )
} 