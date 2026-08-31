import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowUpRight,
  Building2,
  HeartHandshake,
  Inbox,
  Search,
  Stethoscope,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

const accounts: { id: string; name: string; sub: string; icon: LucideIcon; tone: TileTone }[] = [
  { id: 'rao', name: 'Mr. Ramesh Rao', sub: 'Patient · Banjara Hills', icon: HeartHandshake, tone: 'success' },
  { id: 'iyer', name: 'Mrs. Shanta Iyer', sub: 'Patient · Jubilee Hills', icon: HeartHandshake, tone: 'success' },
  { id: 'deshmukh', name: 'Arjun Deshmukh', sub: 'Professional · RN', icon: Stethoscope, tone: 'info' },
  { id: 'sunrise', name: 'Sunrise Multispeciality', sub: 'Partner · Begumpet', icon: Building2, tone: 'neutral' },
]

interface AccountSearchProps {
  onSelect: (name: string) => void
}

export function AccountSearch({ onSelect }: AccountSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const blurRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const q = query.trim().toLowerCase()
  const results = q ? accounts.filter((a) => `${a.name} ${a.sub}`.toLowerCase().includes(q)) : []

  const closeSoon = () => {
    blurRef.current = setTimeout(() => setOpen(false), 120)
  }
  const keepOpen = () => {
    if (blurRef.current) clearTimeout(blurRef.current)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
      return
    }
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = results[activeIndex]
      if (selected) {
        onSelect(selected.name)
        setQuery('')
        setOpen(false)
      }
    }
  }

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <div
        className={cn(
          'flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3.5 py-3 ring-1 ring-inset ring-white/10 transition-all duration-200 focus-within:ring-2 focus-within:ring-emerald-300/50',
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-emerald-200/60" aria-hidden />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIndex(0)
          }}
          onFocus={() => setOpen(true)}
          onBlur={closeSoon}
          placeholder="Search name, phone, licence…"
          aria-label="Search accounts"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-white placeholder:text-emerald-100/35 focus:outline-none"
        />
        {query && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onMouseDown={keepOpen}
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-100/70 transition-colors hover:bg-white/20"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" strokeWidth={3} aria-hidden />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && q && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseDown={keepOpen}
            className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-3xl border border-[#0B211B]/[0.07] bg-white shadow-[0_28px_56px_-24px_rgba(6,40,30,0.45)]"
          >
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-5 py-6 text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35">
                  <Inbox className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-[12.5px] font-bold text-[#0B211B]/60">No match for “{query}”</p>
                <p className="text-[11px] font-medium text-[#0B211B]/40">Try a name, phone or licence number</p>
              </div>
            ) : (
              results.map((a, i) => (
                <motion.button
                  key={a.id}
                  type="button"
                  onMouseDown={keepOpen}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    onSelect(a.name)
                    setQuery('')
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150',
                    i === activeIndex ? 'bg-emerald-500/[0.08]' : 'hover:bg-[#0B211B]/[0.03]',
                  )}
                >
                  <Tile icon={a.icon} tone={a.tone} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{a.name}</span>
                    <span className="block truncate text-[11px] font-medium text-[#0B211B]/50">{a.sub}</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-500/60" aria-hidden />
                </motion.button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
