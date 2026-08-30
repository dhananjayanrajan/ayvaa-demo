import { Lock } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function SealedNotice() {
  return (
    <NoteStrip intent="info" icon={Lock}>
      Past records are sealed. Your evidence of care delivered, shareable with hospitals or partners only with consent.
    </NoteStrip>
  )
}
