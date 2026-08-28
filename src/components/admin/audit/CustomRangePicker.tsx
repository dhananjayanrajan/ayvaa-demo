import { motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { Card, Chip, Section, rise } from '@/components/phone/kit'
import { Overline } from '@/components/admin/ui/Overline'

type NotifyFn = (payload: { title: string; body: string; kind: 'info' }) => void

interface CustomRangePickerProps {
  notify: NotifyFn
}

export function CustomRangePicker({ notify }: CustomRangePickerProps) {
  return (
    <>
      <motion.div variants={rise}>
        <Section label="Custom range" trailing={<Chip intent="info">Picker</Chip>} />
      </motion.div>

      <motion.div variants={rise}>
        <Card>
          <div className="p-4">
            <Overline>Pick a window</Overline>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {[
                { k: 'From', v: 'Mar 1' },
                { k: 'To', v: 'Mar 7' },
              ].map((d) => (
                <button
                  key={d.k}
                  type="button"
                  onClick={() => notify({ title: 'Range picker', body: `${d.k} · ${d.v} · demo picker`, kind: 'info' })}
                  className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.07]"
                >
                  <span className="block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">{d.k}</span>
                  <span className="mt-0.5 block text-[13px] font-bold tabular-nums text-[#0B211B]">{d.v}</span>
                </button>
              ))}
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => notify({ title: 'Range applied', body: 'Mar 1 – Mar 7 · 42 sealed entries loaded', kind: 'info' })}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
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
