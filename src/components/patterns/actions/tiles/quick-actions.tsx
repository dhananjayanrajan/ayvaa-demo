import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { quickActions } from '@/data/patientDashboard'

export function QuickActions({ onPress }: { onPress: (to: string) => void }) {
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-2 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.key}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onPress(action.to)}
              className={cn(
                'flex items-center gap-3 rounded-2xl p-3 text-left transition-colors',
                action.tileBg,
              )}
            >
              <span
                className={cn(
                  'grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white',
                  action.tileClass,
                  action.glow,
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn('block truncate text-[12.5px] font-extrabold tracking-tight', action.labelClass)}>
                  {action.label}
                </span>
                <span className={cn('mt-0.5 block truncate text-[9px] font-extrabold uppercase tracking-[0.1em]', action.subClass)}>
                  {action.sub}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
