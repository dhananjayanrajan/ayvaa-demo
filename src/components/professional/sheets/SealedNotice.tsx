import { Lock } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function SealedNotice() {
  return (
    <NoteStrip intent="info" icon={Lock}>
      Tap a sheet to record. Entries open as sheets and are sealed once the visit is signed off.
    </NoteStrip>
  )
}
