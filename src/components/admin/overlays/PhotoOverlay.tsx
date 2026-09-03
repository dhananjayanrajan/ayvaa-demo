import { motion } from 'motion/react'
import { PhotoViewSheet } from '@/components/admin/sheets/PhotoViewSheet'

type Props = {
  open: boolean
  onClose: () => void
  notify: (n: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void
}

export function PhotoOverlay({ open, onClose, notify }: Props) {
  if (!open) return null
  return (
    <motion.div
      key="photo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col bg-[rgba(10,18,15,0.94)] p-5 pb-7 backdrop-blur-sm"
    >
      <PhotoViewSheet onClose={onClose} notify={notify} />
    </motion.div>
  )
}
