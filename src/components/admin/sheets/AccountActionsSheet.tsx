import { AlertTriangle, MapPin, SlidersHorizontal } from 'lucide-react'
import { BottomSheet } from '@/components/phone/SheetShell'
import { Row } from '@/components/phone/Row'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface AccountActionsSheetProps {
  open: boolean
  onClose: () => void
  notify: NotifyFn
  accountName: string
}

export function AccountActionsSheet({ open, onClose, notify, accountName }: AccountActionsSheetProps) {
  const actions = [
    {
      key: 'area',
      label: 'Adjust care area',
      sub: 'Widen service area and re-dispatch offers',
      icon: MapPin,
      tone: 'neutral' as const,
      onSelect: () => {
        notify({ title: 'Area adjusted', body: 'Care area widened · new offers will reach more professionals', kind: 'info' })
        onClose()
      },
    },
    {
      key: 'pause',
      label: 'Pause account',
      sub: 'Stop new offers until manually reactivated',
      icon: AlertTriangle,
      tone: 'warning' as const,
      onSelect: () => {
        notify({ title: 'Account paused', body: 'No new offers until reactivated', kind: 'warn' })
        onClose()
      },
    },
  ]

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      icon={SlidersHorizontal}
      title="Manage account"
      subtitle={`Choose an action for ${accountName}`}
    >
      <div className="flex flex-col gap-2">
        {actions.map((a) => (
          <Row
            key={a.key}
            icon={a.icon}
            tone={a.tone}
            tileSize="sm"
            title={a.label}
            subtitle={a.sub}
            showChevron={false}
            surface="inset"
            padding="even"
            hoverClassName="hover:bg-[#0B211B]/[0.06]"
            onClick={a.onSelect}
          />
        ))}
      </div>
    </BottomSheet>
  )
}
