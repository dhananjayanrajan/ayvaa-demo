import { useCallback, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { motion } from 'motion/react'
import { Camera, Check, Loader2 } from 'lucide-react'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type VideoFrameCapable = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number
}

interface ScreenshotButtonProps {
  targetRef: RefObject<HTMLElement | null>
  fileName: string
  expandPx?: number
  cornerRadiusPx?: number
  className?: string
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.lineTo(width - r, 0)
  ctx.arcTo(width, 0, width, r, r)
  ctx.lineTo(width, height - r)
  ctx.arcTo(width, height, width - r, height, r)
  ctx.lineTo(r, height)
  ctx.arcTo(0, height, 0, height - r, r)
  ctx.lineTo(0, r)
  ctx.arcTo(0, 0, r, 0, r)
  ctx.closePath()
}

export function ScreenshotButton({
  targetRef,
  fileName,
  expandPx = 0,
  cornerRadiusPx = 0,
  className,
}: ScreenshotButtonProps) {
  const { notify } = useDemo()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')

  const capture = useCallback(async () => {
    if (state !== 'idle') return

    const target = targetRef.current
    if (!target) {
      notify({ title: 'Nothing to capture', body: 'The device frame is not mounted yet', kind: 'warn' })
      return
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      notify({ title: 'Not supported here', body: 'This browser cannot capture the screen', kind: 'warn' })
      return
    }

    let stream: MediaStream | null = null
    try {
      setState('busy')

      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        preferCurrentTab: true,
      } as DisplayMediaStreamOptions)

      const video = videoRef.current
      if (!video) throw new Error('no-video')
      video.srcObject = stream
      await video.play()

      await new Promise<void>((resolve) => {
        const capable = video as VideoFrameCapable
        if (typeof capable.requestVideoFrameCallback === 'function') {
          capable.requestVideoFrameCallback(() => resolve())
        } else {
          window.setTimeout(resolve, 300)
        }
      })

      const rect = target.getBoundingClientRect()
      const surfaceWidth = video.videoWidth || window.innerWidth
      const scale = surfaceWidth / window.innerWidth

      const left = (rect.left - expandPx) * scale
      const top = (rect.top - expandPx) * scale
      const width = (rect.width + expandPx * 2) * scale
      const height = (rect.height + expandPx * 2) * scale

      const sx = Math.max(0, Math.round(left))
      const sy = Math.max(0, Math.round(top))
      const sw = Math.min(video.videoWidth - sx, Math.round(width))
      const sh = Math.min(video.videoHeight - sy, Math.round(height))

      const radius = cornerRadiusPx * scale

      const canvas = document.createElement('canvas')
      canvas.width = sw
      canvas.height = sh
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('no-canvas')
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh)

      if (radius > 0) {
        const mask = document.createElement('canvas')
        mask.width = sw
        mask.height = sh
        const maskCtx = mask.getContext('2d')
        if (!maskCtx) throw new Error('no-mask')
        maskCtx.fillStyle = '#ffffff'
        roundedRectPath(maskCtx, sw, sh, radius)
        maskCtx.fill()

        ctx.globalCompositeOperation = 'destination-in'
        ctx.drawImage(mask, 0, 0)
        ctx.globalCompositeOperation = 'source-over'
      }

      const url = canvas.toDataURL('image/png')
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `${fileName}.png`
      anchor.click()

      setState('done')
      notify({
        title: 'Screenshot captured',
        body: `${fileName}.png saved to downloads`,
        kind: 'ok',
      })
      window.setTimeout(() => setState('idle'), 1800)
    } catch {
      setState('idle')
      notify({
        title: 'Capture cancelled',
        body: 'Screen permission was not granted',
        kind: 'info',
      })
    } finally {
      if (stream) stream.getTracks().forEach((track) => track.stop())
      const video = videoRef.current
      if (video) video.srcObject = null
    }
  }, [cornerRadiusPx, expandPx, fileName, notify, state, targetRef])

  return (
    <>
      <motion.button
        type="button"
        whileTap={state === 'idle' ? { scale: 0.94 } : undefined}
        whileHover={state === 'idle' ? { scale: 1.04 } : undefined}
        onClick={capture}
        disabled={state !== 'idle'}
        aria-label="Take screenshot of the device"
        className={cn(
          'group relative inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07130F] disabled:cursor-wait',
          state === 'done'
            ? 'bg-teal-600 shadow-[0_10px_28px_-8px_rgba(13,148,136,0.7)] focus-visible:ring-teal-400'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.75)] focus-visible:ring-emerald-400',
          className,
        )}
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 overflow-hidden rounded-full',
            state === 'done' ? 'opacity-0' : 'opacity-100',
          )}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-emerald-400/50"
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        {state === 'busy' ? (
          <Loader2 className="relative h-4 w-4 animate-spin" strokeWidth={2.6} aria-hidden />
        ) : state === 'done' ? (
          <Check className="relative h-4 w-4" strokeWidth={3} aria-hidden />
        ) : (
          <Camera className="relative h-4 w-4" strokeWidth={2.6} aria-hidden />
        )}
        <span className="relative">
          {state === 'busy' ? 'Capturing' : state === 'done' ? 'Saved' : 'Take screenshot'}
        </span>
      </motion.button>
      <video
        ref={videoRef}
        muted
        playsInline
        aria-hidden
        className="pointer-events-none absolute h-px w-px opacity-0"
      />
    </>
  )
}
