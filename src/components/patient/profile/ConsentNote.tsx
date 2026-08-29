import { Lock } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

export function ConsentNote({ firstName }: { firstName: string }) {
  return (
    <Panel intent="success" className="flex items-start gap-3 p-4">
      <Tile icon={Lock} tone="success" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        {firstName} delivers care only under your signed consent and care plan. Every visit is verified and logged.
      </p>
    </Panel>
  )
}
