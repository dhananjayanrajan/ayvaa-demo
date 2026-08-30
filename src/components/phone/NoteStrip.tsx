import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Panel, Tile } from '@/components/phone/kit'

export function NoteStrip({
  intent = 'info',
  icon: Icon,
  children,
}: {
  intent?: 'info' | 'success' | 'warning' | 'danger'
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <Panel intent={intent} className="flex items-start gap-3 p-4">
      <Tile icon={Icon} tone={intent} />
      <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
        {children}
      </p>
    </Panel>
  )
}
