import { PhoneFrame } from '@/components/phone/PhoneFrame'
import { Board } from '@/presentation/Board'
import { S01 } from './S01'
import { S02 } from './S02'
import { S03 } from './S03'

const screens = [
  { id: 's01', caption: 'S01 · System event trail' },
  { id: 's02', caption: 'S02 · Dispatch engine' },
  { id: 's03', caption: 'S03 · Automated notifications' },
]

export function SystemApp({ path }: { path: string }) {
  const id = path.replace('/system/', '')
  const idx = Math.max(0, screens.findIndex((s) => s.id === id))
  const screen = screens[idx]
  const prev = idx > 0 ? `/system/${screens[idx - 1].id}` : undefined
  const next = idx < screens.length - 1 ? `/system/${screens[idx + 1].id}` : undefined
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EFF5F2] p-9">
      <Board caption={screen.caption} prev={prev} next={next}>
        <PhoneFrame>
          {screen.id === 's01' && <S01 />}
          {screen.id === 's02' && <S02 />}
          {screen.id === 's03' && <S03 />}
        </PhoneFrame>
      </Board>
    </div>
  )
}