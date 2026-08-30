import { Workflow } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function RecheckNote() {
  return (
    <NoteStrip intent="info" icon={Workflow}>
      When a caregiver accepts, we re-check their current availability before confirming your session.
    </NoteStrip>
  )
}
