import { useState } from 'react'
import { motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { Card, Chip, Section, rise } from '@/components/base/phone/kit'
import { Overline } from '@/components/base/phone/overline'
import { cn } from '@/lib/utils'

type NotifyFn = (payload: { title: string; body: string; kind: 'info' }) => void

interface CustomRangePickerProps {
  notify: NotifyFn
}

const presets = [
  { id: 'last7', label: 'Last 7 days', from: 'Mar 1', to: 'Mar 7' },
  { id: 'last30', label: 'Last 30 days', from: 'Feb 6', to: 'Mar 7' },
  { id: 'thisMonth', label: 'This month', from: 'Mar 1', to: 'Mar 31' },
]

export function CustomRangePicker({ notify }: CustomRangePickerProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [applied, setApplied] = useState<string | null>(null)

  const activePreset = presets.find((p) => p.id === selected)

  return (
    <>
      <motion.div variants={rise}>
        <Section label="Custom range" trailing={<Chip intent="info">Picker</Chip>} />
      </motion.div>

      <motion.div variants={rise}>
        <Card>
          <div className="p-4">
            <Overline>Pick a window</Overline>
            <div className="mt-3 grid gap-2.5">
              {presets.map((p) => {
                const isSelected = selected === p.id
                const isApplied = applied === p.id
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(p.id)}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-2xl px-3.5 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                      isSelected
                        ? 'bg-emerald-500/[0.08] ring-2 ring-emerald-500/40'
                        : 'bg-[#0B211B]/[0.04] hover:bg-[#0B211B]/[0.07]',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold text-[#0B211B]">{p.label}</span>
                      <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/45">
                        {p.from} – {p.to}
                      </span>
                    </span>
                    {isApplied && <Chip intent="success">Applied</Chip>}
                  </motion.button>
                )
              })}
            </div>

            {selected && activePreset && (
              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#0B211B]/50">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                <span>
                  {activePreset.from} – {activePreset.to}
                </span>
              </div>
            )}

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              disabled={!selected}
              onClick={() => {
                setApplied(selected)
                notify({
                  title: 'Range applied',
                  body: `${activePreset?.from} – ${activePreset?.to} · sealed entries loaded`,
                  kind: 'info',
                })
              }}
              className={cn(
                'mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60',
                selected
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105'
                  : 'cursor-not-allowed bg-[#0B211B]/[0.05] text-[#0B211B]/35',
              )}
            >
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Apply range
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </>
  )
}
