import { ShieldCheck } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function PayPolicyNotice() {
  return (
    <NoteStrip intent="info" icon={ShieldCheck}>
      A session pays only after sign-off. This keeps earnings honest for you and families alike — every rupee traces to a
      completed visit.
    </NoteStrip>
  )
}
