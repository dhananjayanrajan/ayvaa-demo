import { ShieldCheck } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function PrivacyNotice() {
  return (
    <NoteStrip intent="info" icon={ShieldCheck}>
      Families see your verified facts only. Licence status, experience and rating. Documents stay sealed with Ayvaa.
    </NoteStrip>
  )
}
