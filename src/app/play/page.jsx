import { SimpleLayout } from '@/components/SimpleLayout'
import { LargoGame } from '@/components/largo/LargoGame'

export const metadata = {
  title: 'Largo, 2-bit',
  description:
    'A short pixel adventure across Largo Central Park. Find a library card, a railroad flag, and three pages of a setlist.',
}

export default function PlayPage() {
  return (
    <SimpleLayout
      title="Largo, 2-bit"
      intro="A short walk around Largo Central Park. The library is across Central Park Drive, the nature preserve is to the west, and the little railroad is missing its flag. The picture uses a small hand-drawn palette so the oaks, boardwalk, and buildings stay readable."
    >
      <LargoGame />
    </SimpleLayout>
  )
}
