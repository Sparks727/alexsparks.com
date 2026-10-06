import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  transpilePackages: ['react-simple-maps'],
  async redirects() {
    return [
      {
        source: '/career',
        destination: '/profilo',
        permanent: true,
      },
      {
        source: '/alex-sparks',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/alex-sparks-florida',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/alex-sparks-tampa',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/alex-sparks-clearwater',
        destination: '/about',
        permanent: true,
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
