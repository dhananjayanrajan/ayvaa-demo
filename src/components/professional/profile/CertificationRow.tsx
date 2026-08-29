import { motion } from 'motion/react'
import { Award } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  valid: boolean
  isNew?: boolean
}

const statusText = (valid: boolean) =>
  valid ? 'Verified by Ayvaa, currently valid' : 'Uploaded, review completes within 2 days'

export function CertificationRow({ name, valid, isNew }: Props) {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 10, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'flex items-center gap-3 rounded-2xl px-2 py-3',
        isNew && 'bg-emerald-500/[0.06]',
      )}
    >
      <Tile icon={Award} tone={isNew ? 'success' : 'neutral'} />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{name}</div>
        <div className="mt-0.5 truncate text-[10.5px] font-semibold text-[#0B211B]/45">{statusText(valid)}</div>
      </div>
      <Chip
        intent={isNew ? 'live' : valid ? 'success' : 'warning'}
        dot={isNew || !valid}
        className="shrink-0 whitespace-nowrap"
      >
        {isNew ? 'Just added' : valid ? 'Valid' : 'In review'}
      </Chip>
    </motion.div>
  )
}
