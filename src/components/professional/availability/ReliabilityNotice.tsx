import { ShieldCheck } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

type Props = {
  message: string
}

export function ReliabilityNotice({ message }: Props) {
  return (
    <Panel intent="warning" className="flex items-start gap-3 p-4">
      <Tile icon={ShieldCheck} tone="warning" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">{message}</p>
    </Panel>
  )
}
