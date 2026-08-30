import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarPickerProps {
  value: number | null
  onChange: (stars: number) => void
}

export function StarPicker({ value, onChange }: StarPickerProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const on = value !== null && n <= value
        return (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.8 }}
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-pressed={value === n}
            className="grid h-10 w-10 place-items-center"
          >
            <motion.span
              animate={{ scale: on ? 1.05 : 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 16 }}
            >
              <Star
                className={cn(
                  'h-8 w-8 transition-colors duration-200',
                  on ? 'fill-amber-400 text-amber-400' : 'fill-[#0B211B]/[0.07] text-[#0B211B]/[0.07]',
                )}
                aria-hidden
              />
            </motion.span>
          </motion.button>
        )
      })}
    </div>
  )
}
