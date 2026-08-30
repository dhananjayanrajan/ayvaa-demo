import { Star } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { StaticButton } from '@/components/phone/LifecycleButton'

export function RatingCta() {
  const { navigate } = useRouter()

  return (
    <StaticButton
      tone="amber"
      icon={Star}
      onClick={() => navigate('/patient/p18')}
    >
      Rate this visit
    </StaticButton>
  )
}
