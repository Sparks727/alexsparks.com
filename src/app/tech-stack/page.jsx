import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import {
  ReactIcon,
  NextJSIcon,
  VercelIcon,
  TailwindIcon,
  HeadlessUIIcon,
} from '@/components/icons/TechIcons'

const techCategories = [
  {
    title: 'JavaScript Frameworks',
    items: [
      {
        name: 'React',
        description: 'A JavaScript library for building user interfaces',
        icon: ReactIcon,
        color: 'text-[#61DAFB]',
      },
      {
        name: 'Next.js',
        description: 'The React framework for production',
        icon: NextJSIcon,
        color: 'text-black dark:text-white',
      },
    ],
  },
  {
    title: 'PaaS',
    items: [
      {
        name: 'Vercel',
        description: 'Cloud platform for static sites and Serverless Functions',
        icon: VercelIcon,
        color: 'text-black dark:text-white',
      },
    ],
  },
  {
    title: 'Web Servers',
    items: [
      {
        name: 'Next.js',
        description: 'Built-in server capabilities with API routes',
        icon: NextJSIcon,
        color: 'text-black dark:text-white',
      },
    ],
  },
  {
    title: 'Analytics',
    items: [
      {
        name: 'Vercel Analytics',
        description: 'Real-time analytics and performance monitoring',
        icon: VercelIcon,
        color: 'text-black dark:text-white',
      },
    ],
  },
  {
    title: 'UI Frameworks',
    items: [
      {
        name: 'Tailwind CSS',
        description: 'A utility-first CSS framework',
        icon: TailwindIcon,
        color: 'text-[#06B6D4]',
      },
      {
        name: 'Headless UI',
        description: 'Unstyled, accessible UI components',
        icon: HeadlessUIIcon,
        color: 'text-[#1A1A1A] dark:text-white',
      },
    ],
  },
]

function TechItem({ item }) {
  const Icon = item.icon
  return (
    <li className="flex gap-4">
      <div className={`relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 ${item.color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Technology</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {item.name}
        </dd>
        <dt className="sr-only">Description</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {item.description}
        </dd>
      </dl>
    </li>
  )
}

function TechCategory({ category }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span>{category.title}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {category.items.map((item) => (
          <TechItem key={item.name} item={item} />
        ))}
      </ol>
    </div>
  )
}

export const metadata = {
  title: 'Tech Stack - Alex Sparks',
  description: 'The technology stack powering my website and projects.',
}

export default function TechStack() {
  return (
    <SimpleLayout
      title="Tech Stack"
      intro="The modern web technologies that power my website and projects. Built with performance, accessibility, and developer experience in mind."
    >
      <div className="mt-16 sm:mt-20">
        <div className="space-y-10">
          {techCategories.map((category) => (
            <TechCategory key={category.title} category={category} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
} 