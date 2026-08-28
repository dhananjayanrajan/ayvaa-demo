import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, Loader2 } from 'lucide-react'

interface PerformanceFooterProps {
  onExport: () => void
}

export function PerformanceFooter({ onExport }: PerformanceFooterProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleClick = () => {
    setLoading(true)
    onExport()
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  return (
    <motion.button
      type="button"
      whileTap={loading || success ? undefined : { scale: 0.97 }}
      onClick={handleClick}
      disabled={loading || success}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-opacity disabled:opacity-80"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : success ? (
        <Check className="h-4 w-4" aria-hidden />
      ) : (
        <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {loading ? 'Preparing report…' : success ? 'Report queued!' : 'Export performance report'}
    </motion.button>
  )
}
