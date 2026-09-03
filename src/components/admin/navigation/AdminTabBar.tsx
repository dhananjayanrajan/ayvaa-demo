import { motion } from 'motion/react'
import { BarChart3, LayoutDashboard, ShieldCheck, Ticket, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Tab = { id: string; label: string; icon: LucideIcon }

export const tabs: Tab[] = [
  { id: 'a01', label: 'Console', icon: LayoutDashboard },
  { id: 'a04', label: 'Users', icon: Users },
  { id: 'a05', label: 'Compliance', icon: ShieldCheck },
  { id: 'a08', label: 'Tickets', icon: Ticket },
  { id: 'a09', label: 'Analytics', icon: BarChart3 },
]

export const withNav = ['a01', 'a03', 'a04', 'a05', 'a06', 'a08', 'a09', 'a10', 'a11', 'a16', 'a17']

export function AdminTabBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="relative z-10 shrink-0 border-t border-[#0B211B]/[0.06] bg-white/85 pb-2 pt-2 backdrop-blur-xl">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="flex items-stretch gap-1 px-4">
        {tabs.map((t) => {
          const isActive = active === t.id
          return (
            <motion.button key={t.id} type="button" whileTap={{ scale: 0.93 }} onClick={() => onSelect(t.id)} className="flex flex-1 flex-col items-center gap-1.5 py-1">
              <span className="relative flex h-8 w-16 items-center justify-center">
                {isActive && <motion.span layoutId="admin-tab-chip" transition={{ type: 'spring', stiffness: 480, damping: 36 }} className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]" />}
                <t.icon className={cn('relative h-[17px] w-[17px] transition-colors duration-200', isActive ? 'text-white' : 'text-[#0B211B]/35')} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              <span className={cn('text-[9.5px] font-extrabold uppercase tracking-[0.12em] transition-colors duration-200', isActive ? 'text-emerald-700' : 'text-[#0B211B]/35')}>{t.label}</span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
