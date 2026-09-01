import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { useFramework } from '@/components/phone/FrameworkRuntime'

export type DialInputProps = {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  unit?: string
  id?: string
}

const SPOKE_GAP = 22
const VISIBLE_SPOKES = 11
const CENTER_IDX = Math.floor(VISIBLE_SPOKES / 2)

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function rubberClamp(delta: number, over: number, factor = 0.35) {
  if (over === 0) return delta
  return delta * factor / (1 + Math.abs(over) * 0.02)
}

export function DialInput({ value, onChange, min = 0, max = 100, step = 1, label = 'Value', unit, id }: DialInputProps) {
  const { emit } = useFramework()
  const range = max - min
  const count = Math.floor(range / step) + 1
  const index = Math.round((clamp(value, min, max) - min) / step)
  const clamped = min + index * step

  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startIndexRef = useRef(index)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const offsetRef = useRef(0)

  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // motion for center detent bar stretch
  const dragMv = useMotionValue(0)
  const stretch = useTransform(dragMv, (v) => Math.min(18, Math.abs(v) * 0.18))
  const barWidth = useTransform(stretch, (s) => 36 + s)
  const barHeight = useTransform(stretch, (s) => 4 + s * 0.12)

  const hueAtMax = clamped >= max - step * 0.5
  const toneClasses = hueAtMax
    ? 'border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,42,8,0.7)]'
    : 'border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]'
  const orbA = hueAtMax ? 'bg-amber-400/25' : 'bg-emerald-400/25'
  const orbB = hueAtMax ? 'bg-orange-400/10' : 'bg-teal-300/15'
  const hairline = hueAtMax ? 'via-amber-200/40' : 'via-emerald-200/40'
  const detentBg = hueAtMax ? 'bg-amber-400' : 'bg-emerald-400'
  const valueColor = hueAtMax ? 'text-amber-200' : 'text-white'

  const springOffset = useSpring(dragOffset, { stiffness: 420, damping: 34 })
  const hasMountedRef = useRef(false)
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      emit('dial.mounted', { value: clamped, label, min, max })
    }
  }, [clamped, emit, label, max, min])

  useEffect(() => {
    dragMv.set(dragOffset)
  }, [dragOffset, dragMv])

  const commit = useCallback((idx: number) => {
    const v = clamp(min + idx * step, min, max)
    if (v !== clamped) {
      onChange(v)
      emit('dial.changed', { value: v, label })
    }
  }, [min, max, step, clamped, onChange, emit, label])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current
    if (!el) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    draggingRef.current = true
    setIsDragging(true)
    startXRef.current = e.clientX
    startIndexRef.current = index
    lastXRef.current = e.clientX
    lastTRef.current = performance.now()
    velocityRef.current = 0
    offsetRef.current = 0
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [index])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startXRef.current
    const now = performance.now()
    const dt = Math.max(1, now - lastTRef.current)
    const instVel = (e.clientX - lastXRef.current) / dt
    velocityRef.current = velocityRef.current * 0.6 + instVel * 0.4
    lastXRef.current = e.clientX
    lastTRef.current = now

    // translate pixels to spoke steps
    let rawOffset = -dx / SPOKE_GAP
    // rubber clamp at edges
    const projectedIdx = startIndexRef.current + rawOffset
    let over = 0
    if (projectedIdx < 0) over = projectedIdx
    else if (projectedIdx > count - 1) over = projectedIdx - (count - 1)
    if (over !== 0) {
      const sign = Math.sign(over)
      const mag = Math.abs(over)
      const clampedMag = Math.log1p(mag * 2) * 1.2
      rawOffset = (startIndexRef.current + sign * clampedMag) - startIndexRef.current
      // also ease drag
      rawOffset = rubberClamp(rawOffset, over)
    }
    offsetRef.current = rawOffset
    setDragOffset(rawOffset)
  }, [count])

  const animateInertia = useCallback(() => {
    const v = velocityRef.current // px/ms
    // project velocity to spokes/ms, then to distance
    const spokesPerMs = -v / SPOKE_GAP
    // inertial distance: ~ velocity * 180ms decay
    let projected = offsetRef.current + spokesPerMs * 160
    // spring snap to nearest spoke
    let targetIdx = Math.round(startIndexRef.current + projected)
    targetIdx = clamp(targetIdx, 0, count - 1)

    // animate offset to target with spring-like decay via rAF
    const start = offsetRef.current
    const target = targetIdx - startIndexRef.current
    const duration = 420
    const t0 = performance.now()
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = clamp((now - t0) / duration, 0, 1)
      const eased = easeOut(t)
      const cur = start + (target - start) * eased
      setDragOffset(cur)
      offsetRef.current = cur
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDragOffset(0)
        offsetRef.current = 0
        draggingRef.current = false
        setIsDragging(false)
        commit(targetIdx)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [count, commit])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
    // if small movement, treat as tap to nudge one step toward drag direction
    const moved = Math.abs(offsetRef.current)
    if (moved < 0.22) {
      setDragOffset(0)
      offsetRef.current = 0
      draggingRef.current = false
      setIsDragging(false)
      return
    }
    animateInertia()
  }, [animateInertia])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      commit(clamp(index + 1, 0, count - 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      commit(clamp(index - 1, 0, count - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      commit(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      commit(count - 1)
    }
  }, [index, count, commit])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const spokes = useMemo(() => {
    const arr: { key: number; idx: number; offset: number }[] = []
    for (let i = -CENTER_IDX - 2; i <= CENTER_IDX + 2; i++) {
      const idx = index + i
      if (idx < 0 || idx >= count) continue
      arr.push({ key: idx, idx, offset: i })
    }
    return arr
  }, [index, count])

  const displayValue = clamped

  return (
    <div
      className={cn('relative overflow-hidden rounded-[26px] border p-5 transition-colors duration-500', toneClasses)}
      role="group"
      aria-label={label}
    >
      <div aria-hidden className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500', orbA)} />
      <div aria-hidden className={cn('pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500', orbB)} />
      <div aria-hidden className={cn('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500', hairline)} />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/60">{label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <Odometer value={displayValue} className={cn('text-[38px] font-extrabold leading-none tracking-tight tabular-nums', valueColor)} />
              {unit && <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">{unit}</span>}
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white/[0.08] px-2.5 py-1 text-[10px] font-bold tabular-nums text-white/70">
            {index + 1} of {count}
          </span>
        </div>

        <div
          ref={containerRef}
          tabIndex={0}
          role="slider"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={clamped}
          aria-valuetext={`${clamped}${unit ? ` ${unit}` : ''}`}
          id={id}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            'relative mt-5 select-none rounded-2xl bg-white/[0.06] px-2 py-6 outline-none focus-visible:ring-2 focus-visible:ring-white/20',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
          )}
          style={{ touchAction: 'pan-y' }}
        >
          {/* edge fades */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#0B231C]/80 to-transparent" style={{ opacity: hueAtMax ? 0.9 : 1 }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#0B231C]/80 to-transparent" style={{ opacity: hueAtMax ? 0.9 : 1 }} />

          {/* center detent bar */}
          <motion.div
            aria-hidden
            className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full', detentBg)}
            style={{ width: barWidth, height: barHeight }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />

          {/* spokes rail */}
          <div className="relative flex h-14 items-center justify-center overflow-hidden">
            <motion.div className="flex items-center" style={{ x: useTransform(springOffset, (v) => -v * SPOKE_GAP) }}>
              {spokes.map((s) => {
                const dist = Math.abs(s.offset + dragOffset)
                const isCenter = dist < 0.35
                const isNear = dist < 1.2
                return (
                  <div key={s.key} className="flex w-[22px] shrink-0 flex-col items-center gap-1">
                    <span
                      aria-hidden
                      className={cn(
                        'rounded-full transition-all duration-200',
                        isCenter ? cn('h-10 w-[3px]', detentBg) : isNear ? 'h-7 w-px bg-white/55' : 'h-4 w-px bg-white/25',
                      )}
                    />
                    <span className={cn('text-[9px] font-bold tabular-nums', isCenter ? 'text-white' : 'text-white/35')}>
                      {s.idx * step + min}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          </div>

          <div className="pointer-events-none mt-2 flex items-center justify-between px-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
            <span>drag to spin</span>
            <span className="tabular-nums">{min} — {max}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => commit(clamp(index - 1, 0, count - 1))}
            disabled={index <= 0}
            aria-label="Decrease"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.08] text-white transition-colors hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div className={cn('h-full rounded-full', hueAtMax ? 'bg-amber-400' : 'bg-emerald-400')} animate={{ width: `${((clamped - min) / (max - min)) * 100}%` }} transition={{ duration: 0.35, ease: 'easeOut' }} />
            </div>
          </div>
          <button
            type="button"
            onClick={() => commit(clamp(index + 1, 0, count - 1))}
            disabled={index >= count - 1}
            aria-label="Increase"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.08] text-white transition-colors hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

function Odometer({ value, className }: { value: number; className?: string }) {
  const str = String(value)
  return (
    <span className={cn('inline-flex tabular-nums', className)} aria-live="polite" aria-atomic>
      {str.split('').map((ch, i) => (
        <span key={`${i}-${ch}`} className="relative inline-block overflow-hidden">
          <motion.span
            key={ch}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
