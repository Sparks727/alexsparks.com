import { SimpleLayout } from '@/components/SimpleLayout'

const EMBED_URL = 'https://www.onlinegames.io/games/2023/unity2/cs-online/index.html'

export const metadata = {
  title: 'CS Online',
  description:
    'Play CS Online in the browser. A free multiplayer shooter hosted by OnlineGames.io.',
}

export default function PlayPage() {
  return (
    <SimpleLayout
      title="CS Online"
      intro="A free multiplayer shooter in the browser. Join a room as a terrorist or counter-terrorist and pick a weapon. The game is hosted by OnlineGames.io, so it can show their loading screen and ads."
    >
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black shadow-sm dark:border-zinc-700">
        <iframe
          src={EMBED_URL}
          title="CS Online"
          className="h-[70vh] min-h-[540px] w-full"
          allow="fullscreen; autoplay; gamepad; accelerometer; gyroscope"
          allowFullScreen
        />
      </div>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        If the frame stays blank,{' '}
        <a
          href="https://www.onlinegames.io/cs-online/"
          className="font-medium text-teal-600 underline decoration-teal-500/40 underline-offset-2 hover:text-teal-700 dark:text-teal-400"
        >
          open CS Online on OnlineGames.io
        </a>
        .
      </p>
    </SimpleLayout>
  )
}
