import { Plus } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { StaticButton } from '@/components/phone/LifecycleButton'

export function AddVisitButton() {
  const { navigate } = useRouter()

  return (
    <StaticButton tone="success" icon={Plus} onClick={() => navigate('/patient/p09')}>
      Book another service
    </StaticButton>
  )
}
