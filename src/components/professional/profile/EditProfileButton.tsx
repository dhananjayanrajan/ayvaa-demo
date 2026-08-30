import { Pencil } from 'lucide-react'
import { StaticButton } from '@/components/phone/LifecycleButton'

export function EditProfileButton({ onPress }: { onPress: () => void }) {
  return (
    <StaticButton tone="neutral" icon={Pencil} onClick={onPress}>
      Edit profile details
    </StaticButton>
  )
}
