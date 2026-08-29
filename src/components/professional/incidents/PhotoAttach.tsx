import { useRef } from 'react'
import { motion } from 'motion/react'
import { Camera, Check, FileImage } from 'lucide-react'
import type { SeverityConfig } from './incidentData'
import { cn } from '@/lib/utils'

type Props = {
  photo: { name: string; size: string } | null
  config: SeverityConfig
  onAttach: (file: { name: string; size: string; url: string }) => void
}

export function PhotoAttach({ photo, config, onAttach }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const pick = () => inputRef.current?.click()

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const size = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`
    onAttach({ name: file.name, size, url: URL.createObjectURL(file) })
    e.target.value = ''
  }

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} aria-label="Attach photo of the area" />
      {photo ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.985 }}
          onClick={pick}
          className={cn('flex w-full items-center gap-3 rounded-2xl p-3 text-left', config.attach.activeBg)}
        >
          <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-2xl', config.attach.photoBg)}>
            <FileImage className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]', config.attach.overline)}>
              Photo attached
              <Check className="h-2.5 w-2.5 shrink-0" strokeWidth={4} aria-hidden />
            </span>
            <span className="mt-0.5 block truncate text-[12.5px] font-bold text-[#0B211B]/75">{photo.name}</span>
            <span className={cn('mt-0.5 block text-[10.5px] font-semibold', config.attach.sub)}>
              {photo.size} · tap to replace · access is logged
            </span>
          </span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={pick}
          className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#0B211B]/[0.05] px-4 text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.08]"
        >
          <Camera className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate text-[13px] font-bold">Attach photo of the area</span>
        </motion.button>
      )}
    </>
  )
}
