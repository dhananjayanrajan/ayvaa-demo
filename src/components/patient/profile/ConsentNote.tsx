import { Lock } from 'lucide-react'
import { NoteStrip } from '@/components/phone/NoteStrip'

export function ConsentNote({ firstName }: { firstName: string }) {
  return (
    <NoteStrip intent="success" icon={Lock}>
      {firstName} delivers care only under your signed consent and care plan. Every visit is verified and logged.
    </NoteStrip>
  )
}
