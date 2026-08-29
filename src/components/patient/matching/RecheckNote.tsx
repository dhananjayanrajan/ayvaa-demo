import { Workflow } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

export function RecheckNote() {
  return (
    <Panel intent="info" className="flex items-start gap-3 p-4">
      <Tile icon={Workflow} tone="info" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        When a caregiver accepts, we re-check their current availability before confirming your session.
      </p>
    </Panel>
  )
}
