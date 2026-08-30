import { ShieldCheck } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

export function VerificationNote() {
  return (
    <Panel intent="info" className="flex items-start gap-3 p-4">
      <Tile icon={ShieldCheck} tone="info" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        Every visit on this list is verified by GPS check-in. What happened is recorded, sealed and shared with you.
      </p>
    </Panel>
  )
}
