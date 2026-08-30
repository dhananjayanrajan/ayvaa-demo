import { ShieldCheck } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function ReliabilityNotice({ message }: { message: string }) {
  return (
    <NoteStrip intent="warning" icon={ShieldCheck}>
      {message}
    </NoteStrip>
  )
}
