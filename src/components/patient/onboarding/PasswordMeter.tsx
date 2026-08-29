import { cn } from '@/lib/utils'

const segmentFill = ['bg-rose-500', 'bg-amber-500', 'bg-emerald-500']
const labelTone = ['text-rose-500', 'text-amber-600', 'text-emerald-600']

export function PasswordMeter({ score, label }: { score: number; label: string }) {
  const s = Math.min(3, Math.max(1, score))
  return (
    <div className="flex items-center gap-3">
      <div aria-hidden className="flex flex-1 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i < s ? segmentFill[s - 1] : 'bg-[#0B211B]/[0.07]',
            )}
          />
        ))}
      </div>
      <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.16em]', labelTone[s - 1])}>
        {label}
      </span>
    </div>
  )
}
