import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Card } from '@/components/phone/kit'
import { formatFileSize } from '@/data/patientIdentity'
import type { CapturePhase } from '@/data/patientIdentity'
import { CaptureTile } from './CaptureTile'
import { CaptureFileTile } from './CaptureFileTile'
import { ConfidencePanel } from './ConfidencePanel'

type CapturedFile = { name: string; size: string; url: string }

export function SelfieCaptureCard({
  phase,
  onCaptured,
}: {
  phase: CapturePhase
  onCaptured: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<CapturedFile | null>(null)

  useEffect(
    () => () => {
      if (file) URL.revokeObjectURL(file.url)
    },
    [file],
  )

  function handleFile(selected: File | null) {
    if (!selected) return
    if (file) URL.revokeObjectURL(file.url)
    setFile({
      name: selected.name,
      size: formatFileSize(selected.size),
      url: URL.createObjectURL(selected),
    })
    onCaptured()
  }

  const copy: Record<CapturePhase, { title: string; body: string }> = {
    idle: {
      title: 'Take a live selfie',
      body: 'Look straight ahead in good light. We compare it with your ID and delete the selfie right after.',
    },
    scanning: {
      title: 'Matching with your ID',
      body: 'Hold still while we check face geometry against your Aadhaar photo.',
    },
    done: {
      title: 'Selfie matched',
      body: 'Your ID and selfie match. Verification is complete.',
    },
  }

  return (
    <Card>
      <div className="flex flex-col items-center gap-4 p-6">
        <CaptureTile phase={phase} onPress={() => inputRef.current?.click()} />

        <div className="text-center">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
            {copy[phase].title}
          </div>
          <p className="mx-auto mt-1 max-w-[260px] text-pretty text-[12px] font-medium leading-relaxed text-[#0B211B]/50">
            {copy[phase].body}
          </p>
        </div>

        {phase === 'scanning' && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
            className="h-1 overflow-hidden rounded-full bg-[#0B211B]/[0.07]"
          >
            <span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </motion.div>
        )}

        {phase === 'done' && <ConfidencePanel />}

        {file && (
          <CaptureFileTile
            name={file.name}
            size={file.size}
            onReplace={() => inputRef.current?.click()}
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0] ?? null)
          e.target.value = ''
        }}
      />
    </Card>
  )
}
