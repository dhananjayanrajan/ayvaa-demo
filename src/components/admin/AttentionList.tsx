import { motion } from 'motion/react'
import { ChevronRight, Hourglass, ShieldCheck, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Tile, rise } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { adminAttention } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

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
            {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
            <motion.button
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={a.onClick}
              className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
            >
              <Tile icon={a.icon} tone={a.tone} />
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">
                  {adminAttention[i].title}
                </span>
                <span className="mt-0.5 block line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                  {adminAttention[i].body}
                </span>
              </span>
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                aria-hidden
              />
            </motion.button>
          </div>
        ))}
      </Card>
    </motion.div>
  )
}
