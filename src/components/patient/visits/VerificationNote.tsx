import { ShieldCheck } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function VerificationNote() {
  return (
    <NoteStrip intent="info" icon={ShieldCheck}>
      Every visit on this list is verified by GPS check-in. What happened is recorded, sealed and shared with you.
    </NoteStrip>
  )
}
