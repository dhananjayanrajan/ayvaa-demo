import { CheckCheck } from 'lucide-react'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'

export function MarkAllReadButton({
  unreadCount,
  onPress,
}: {
  unreadCount: number
  onPress: () => void
}) {
  const done = unreadCount === 0
  return (
    <IconLifecycleButton
      phase={done ? 'done' : 'idle'}
      icon={CheckCheck}
      rounded="xl"
      revert={false}
      ariaLabel={done ? 'All caught up' : 'Mark all read'}
      onPress={done ? undefined : onPress}
    />
  )
}
