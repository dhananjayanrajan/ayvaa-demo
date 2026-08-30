import { ShieldAlert } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function SafetyNotice({ patientName }: { patientName: string }) {
  return (
    <NoteStrip intent="warning" icon={ShieldAlert}>
      Patient safety first. If anything looks wrong with {patientName}, use Report incident — care stops until it is handled.
    </NoteStrip>
  )
}
