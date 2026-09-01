import { useState } from 'react'
import { motion } from 'motion/react'
import { SlidersHorizontal, Zap, Gauge } from 'lucide-react'
import { Screen, BodyArea } from '@/components/phone/Screen'
import { AppBar } from '@/components/phone/AppBar'
import { DialInput } from '@/components/phone/DialInput'
import { rise } from '@/components/phone/kit'
import { FrameworkProvider } from '@/components/phone/FrameworkRuntime'

export function P99() {
  const [hours, setHours] = useState(4)
  const [minutes, setMinutes] = useState(30)
  const [dose, setDose] = useState(2)

  return (
    <FrameworkProvider>
      <Screen>
        <AppBar title="Dial Lab · P99" subtitle="L2 exemplar calibration — inertial dial, odometer, rubber-clamp" />
        <BodyArea>
          <motion.div variants={rise} initial="hidden" animate="show" className="space-y-4 p-4">
            <div className="rounded-2xl bg-[#0B211B]/[0.04] p-3">
              <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/45">
                <Zap className="h-3 w-3" aria-hidden />
                Calibration exemplar — DialInput
              </div>
              <div className="mt-1.5 text-[12px] font-medium leading-snug text-[#0B211B]/60">
                Drag spokes → velocity projects inertial spin → spring snap to spoke. Detent bar stretches while dragging. Hue flips emerald → amber at max. Keyboard: Arrow/Home/End. Edge fades + rubber clamp at bounds.
              </div>
            </div>

            <DialInput value={hours} onChange={setHours} min={1} max={12} step={1} label="Hours" unit="h" id="dial-hours" />
            <DialInput value={minutes} onChange={setMinutes} min={0} max={55} step={5} label="Minutes" unit="min" id="dial-min" />
            <DialInput value={dose} onChange={setDose} min={0} max={10} step={1} label="Dose" unit="mg" id="dial-dose" />

            <div className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
                <Gauge className="h-3.5 w-3.5" aria-hidden /> Live derived facts
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0B211B]/[0.04] px-3 py-2.5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">Total time</div>
                  <div className="mt-1 text-[14px] font-extrabold tabular-nums text-[#0B211B]">{hours}h {String(minutes).padStart(2, '0')}m</div>
                </div>
                <div className="rounded-xl bg-emerald-500/[0.08] px-3 py-2.5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700/60">Dose</div>
                  <div className="mt-1 text-[14px] font-extrabold tabular-nums text-emerald-700">{dose} mg</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-[#0B211B]/45">
                <SlidersHorizontal className="h-3 w-3" aria-hidden /> Controlled API: value/onChange/min/max/step/label/unit — zero domain knowledge
              </div>
            </div>
          </motion.div>
        </BodyArea>
      </Screen>
    </FrameworkProvider>
  )
}
