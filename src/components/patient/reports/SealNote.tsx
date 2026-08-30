import { Lock } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

export function SealNote() {
  return (
    <Panel intent="info" className="flex items-start gap-3 p-4">
      <Tile icon={Lock} tone="info" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        Reports are sealed when written and can never be edited afterwards. Opening or downloading one is always logged
        in your audit record.
      </p>
    </Panel>
  )
}
