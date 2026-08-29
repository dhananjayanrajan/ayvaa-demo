import { motion } from 'motion/react'
import { SearchX } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { MATCH_REQUEST } from '@/data/patientMatching'

interface EmptyMatchesProps {
  language: string
  onClear: () => void
}

export function EmptyMatches({ language, onClear }: EmptyMatchesProps) {
  return (
    <Card>
      <div className="p-5 text-center">
        <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-amber-500/[0.12]">
          <SearchX className="h-5 w-5 text-amber-600" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="mt-3 text-[14px] font-extrabold tracking-tight text-[#0B211B]">No one in range speaks {language}</div>
        <p className="mx-auto mt-1.5 max-w-[28ch] text-pretty text-[12px] font-medium leading-snug text-[#0B211B]/55">
          Your language filter is hiding every caregiver within {MATCH_REQUEST.radius}. Widen it to see the full match list.
        </p>
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onClear}
          className="mt-4 w-full rounded-2xl bg-amber-500/[0.12] py-3 text-[12.5px] font-extrabold text-amber-700"
        >
          Show any language
        </motion.button>
      </div>
    </Card>
  )
}
