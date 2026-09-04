import { motion } from 'motion/react'
import { Hourglass, ShieldCheck, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, rise } from '@/components/base/phone/kit'
import type { TileTone } from '@/components/base/phone/kit'
import { adminAttention } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { ListRow } from '@/components/patterns/lists/list-row'

export function AttentionList() {
  const { notify, dispatch } = useDemo()
  const { navigate } = useRouter()

  const attention: { icon: LucideIcon; tone: TileTone; onClick: () => void }[] = [
    {
      icon: Hourglass,
      tone: 'warning',
      onClick: () =>
        notify({
          title: 'Dispatch round in progress',
          body: `Round ${dispatch.round} · ${dispatch.waiting} offers waiting · expires ${dispatch.expiresAt}`,
          kind: 'info',
        }),
    },
    { icon: UserCheck, tone: 'success', onClick: () => navigate('/admin/a03') },
    { icon: ShieldCheck, tone: 'ink', onClick: () => navigate('/admin/a06') },
  ]

  return (
    <motion.div variants={rise}>
      <Card>
        {attention.map((a, i) => (
          <div key={adminAttention[i].title}>
            <ListRow
              icon={a.icon}
              tone={a.tone}
              title={adminAttention[i].title}
              subtitle={adminAttention[i].body}
              onClick={a.onClick}
            />
          </div>
        ))}
      </Card>
    </motion.div>
  )
}
