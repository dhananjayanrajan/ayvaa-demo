import { ShieldCheck } from 'lucide-react'
import { Panel, Tile } from '@/components/phone/kit'

export function PayPolicyNotice() {
  return (
    <Panel intent="info" className="flex items-start gap-3 p-4">
      <Tile icon={ShieldCheck} tone="info" />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        A session pays only after sign-off. This keeps earnings honest for you and families alike — every rupee traces to a completed
        visit.
      </p>
    </Panel>
  )
}
