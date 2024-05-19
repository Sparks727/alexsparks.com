import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Travel',
  description: 'My Travel Bucket List Progress',
}

export default function Travel() {
  return (
    <SimpleLayout
      title="My Travel Bucket List Progress"
      intro="Living the American Dream: One State at a Time! 🇺🇸  Check out how many incredible places I've explored so far. Any suggestions for my next adventure?"
    >
      <div className="space-y-20">
  <iframe src="https://visitedplaces.com/embed/?map=usa&projection=geoAlbersUsa&theme=dark-blue&water=0&graticule=0&names=1&duration=2000&placeduration=100&slider=0&autoplay=0&autozoom=none&autostep=0&home=US&places=~US-TX_US-AL_US-FL.41b975_US-GA_US-SC_US-NC_US-TN_US-KY_US-IN_US-IL_US-OH_US-MD_US-VA_US-PA_US-NJ_US-WV_US-DE_US-NV_US-CO_US-ME_US-ME%22%20style=%22width:%20100%;%20height:%20600px;" width="100%" height="500"></iframe>
</div>
    </SimpleLayout>
  )
}
