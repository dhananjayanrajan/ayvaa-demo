import { Lock } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

export function SealedNotice() {
  return (
    <Panel intent="info" className="flex items-start gap-3 p-4">
      <Tile icon={Lock} tone="info" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        Past records are sealed. Your evidence of care delivered, shareable with hospitals or partners only with consent.
      </p>
    </Panel>
  )
}
