import { motion } from 'motion/react'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { lovedOnes } from '@/data/seed'

export function WhoCard({ who, onOpen }: { who: number; onOpen: () => void }) {
  const person = lovedOnes[who]
  return (
    <Card intent="success">
      <div className="p-5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.99 }}
          onClick={onOpen}
          className="flex w-full items-center gap-3.5 text-left"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[16px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.7)]">
            {person.name.charAt(0)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                {person.name}
              </span>
              <Chip intent="success">Selected</Chip>
            </span>
            <span className="mt-0.5 block text-pretty text-xs font-semibold leading-snug text-[#0B211B]/50">
              Age {person.age}, {person.category}, consent on file
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
        </motion.button>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.06] px-4 py-3.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 flex-1 text-pretty text-[12px] font-semibold leading-snug text-[#0B211B]/70">
            Your confirmation becomes a signed consent record before any caregiver is dispatched.
          </span>
        </div>
      </div>
    </Card>
  )
}
