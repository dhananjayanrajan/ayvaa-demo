import { ShieldAlert } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

type Props = {
  patientName: string
}

export function SafetyNotice({ patientName }: Props) {
  return (
    <Panel intent="warning" className="flex items-start gap-3 p-4">
      <Tile icon={ShieldAlert} tone="warning" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        Patient safety first. If anything looks wrong with {patientName}, use Report incident — care stops until it is handled.
      </p>
    </Panel>
  )
}
