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

function TechCard({ item }) {
  const Icon = item.icon
  return (
    <Card className="flex items-center gap-4 p-6">
      <div className={`text-2xl ${item.color}`}>
        <Icon className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {item.name}
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>
      </div>
    </Card>
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
        <div className="space-y-12">
          {techCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                {category.title}
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {category.items.map((item) => (
                  <TechCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
} 