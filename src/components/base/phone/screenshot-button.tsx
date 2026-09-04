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
  /** Screen ID from the screen plan (e.g., "P01", "PR03", "A01"). */
  screenId?: string
  /** Fallback file name if screenId is not provided (for backward compatibility). */
  fileName?: string
  expandPx?: number
  cornerRadiusPx?: number
  className?: string
}

const SCREEN_NAMES: Record<string, string> = {
  "P01": "Welcome & Sign Up (guardian onboarding)",
  "P02": "Login",
  "P03": "Identity Verification — OTP code",
  "P04": "Identity Verification — ID photo + selfie",
  "P05": "Password Recovery",
  "P06": "Home Dashboard (incl. live care happening now state)",
  "P07": "Notifications List",
  "P08": "Search Results & Service Catalogue",
  "P09": "Booking — Create Request (category, schedule, times)",
  "P10": "Booking — Caregiver Matching",
  "P11": "Caregiver Detail Profile (credentials, licence, reviews)",
  "P12": "Booking — Review, Consent & Confirm (+ success state)",
  "P13": "Care Plan — Goals & Progress",
  "P14": "Care Plan — Reports List & Detail",
  "P15": "Visits List (upcoming / completed / missed tabs)",
  "P16": "Live Visit Tracking",
  "P17": "Visit Summary",
  "P18": "Rate Visit (modal sheet)",
  "P19": "Medication Daily Schedule",
  "P20": "Prescription Management (add / edit / upload)",
  "P21": "Records — Documents, Consent Records & Personal Audit Log",
  "P22": "Consent — Sign / Renew / Withdraw (modal or full screen)",
  "P23": "Payments — Billing History & Statements",
  "P24": "Payments — Manage Payment Methods",
  "P25": "Support — Tab & Open Requests",
  "P26": "Support — Ticket Creation (link session/incident)",
  "P27": "Support — Conversation",
  "P28": "Profile — Personal Info & Edit",
  "P29": "Profile — Notification & Privacy Settings",
  "P30": "Profile — Loved Ones Management",
  "P31": "Incident Report (modal) + Reliability/Re-dispatch State",
  "P32": "Emergency Action Screen",
  "P33": "Reschedule Visit (date/time picker)",
  "P34": "Manage Plan (change days/time, pause series, end series)",
  "P35": "Account Type Selection (Patient vs Guardian vs Both)",
  "P36": "Patient Profile Form",
  "P37": "Guardian Relationship & Legal Consent",
  "P38": "Care Needs Questionnaire",
  "P39": "Emergency Contact Form",
  "P40": "Terms & Privacy Acceptance (versioned)",
  "P41": "Referral Code / Partner Code Entry",
  "P42": "Onboarding Progress & Save/Continue",
  "P43": "Two-Factor Authentication Code Entry",
  "P44": "Biometric Setup & Device Verification",
  "P45": "Multi-Profile Switcher (family plan)",
  "P46": "Document Type Selector",
  "P47": "Camera Capture / Upload / Liveness Check",
  "P48": "Verification Pending / Rejection & Resubmit",
  "P49": "Recovery Method & Security Questions",
  "P50": "Reset Link Sent / New Password Creation",
  "P51": "Calendar View (Day/Week/Month)",
  "P52": "Live Session Detail / Caregiver Map",
  "P53": "Medication Due / Safety Alert Modal",
  "P54": "Notification Preferences & Filters",
  "P55": "Advanced Filters / Sort Options",
  "P56": "Service Detail Page / Area Check",
  "P57": "Multi-step Booking Form (schedule, address, instructions)",
  "P58": "Review & Cost Estimation",
  "P59": "Offer List with Expiry & Decline",
  "P60": "No Offers / Request Alternatives",
  "P61": "Credentials & Background Check Detail",
  "P62": "Reviews List & Report Professional",
  "P63": "Availability Calendar",
  "P64": "Consent Document Preview & Signature",
  "P65": "Booking Summary & Payment Authorisation",
  "P66": "Goal Detail & Progress Charts",
  "P67": "Care Team & Plan Version History",
  "P68": "Report Detail & Export",
  "P69": "Visit Filters & Cancellation/Missed Explanations",
  "P70": "Live Map & ETA / Safety Check",
  "P71": "Task Checklist & Vitals/Medication Summary",
  "P72": "Payment Breakdown & Dispute",
  "P73": "Medication Detail & Interaction Warning",
  "P74": "Refill Request & Missed Dose Alert",
  "P75": "Prescription Detail & Upload/OCR",
  "P76": "Expiry & Pharmacy Link",
  "P77": "Document Preview & Access History",
  "P78": "Audit Log Filter & Tags",
  "P79": "Consent Version History & Witness Signature",
  "P80": "Withdraw Confirmation & Renewal Reminders",
  "P81": "Invoice Detail & Tax Breakdown",
  "P82": "Add Payment Method & Wallet",
  "P83": "Ticket Detail & Status Timeline",
  "P84": "Chat & Escalation",
  "P85": "Change Password / Email / Phone",
  "P86": "Address & Emergency Contacts Management",
  "P87": "Data Export & Delete Account",
  "P88": "Granular Privacy & Marketing Consent",
  "P89": "Add Loved One & Permissions",
  "P90": "Incident Form (severity, photos, witness)",
  "P91": "Offer Expired / Missed Visit Follow-up",
  "P92": "Medical Info Card & Advance Directives",
  "P93": "Series Option & Fee Display",
  "P94": "Pause / End Series Confirmation & Reactivation",
  "PR01": "Login",
  "PR02": "Credential Verification & Terms Acceptance",
  "PR03": "Offers Inbox (dispatch, accept/reject, expiry, re-check notice)",
  "PR04": "Sessions List (upcoming / completed)",
  "PR05": "Availability Management (weekly editor)",
  "PR06": "Session Execution (check-in, checklist, actions)",
  "PR07": "Vitals / Medication / Notes Entry Sheets (states of PR06)",
  "PR08": "Incident Report & Escalation",
  "PR09": "Earnings Overview",
  "PR10": "Payout Detail & Withdrawal",
  "PR11": "Professional Profile (certifications, skills)",
  "PR12": "Session History & Past Notes",
  "PR13": "Two-Factor & Biometric Setup",
  "PR14": "Document Upload & Credential Status",
  "PR15": "Profile Completeness & Expiry Reminders",
  "PR16": "Offer Detail & Conflict Warning",
  "PR17": "Re-check Result & Block Time",
  "PR18": "Session Filters & Late/Cancelled States",
  "PR19": "Timezone & Exceptions",
  "PR20": "GPS Check-in / Check-out & Travel Info",
  "PR21": "Checklist Item Detail & Conditional Tasks",
  "PR22": "Vitals Input & Abnormal Alerts",
  "PR23": "Medication Verification & Refusal Recording",
  "PR24": "Notes & Photo Evidence",
  "PR25": "Incident Form & Notify Supervisor",
  "PR26": "Earnings Filters & Bonus/Tax Breakdown",
  "PR27": "Bank Account & Withdrawal Form",
  "PR28": "Certification Upload & Skills/Rates Editor",
  "PR29": "Patient-wise History & Filters",
  "PT01": "Institutional Login",
  "PT02": "Partner Dashboard (hub)",
  "PT03": "Referral Form",
  "PT04": "Referred Patient Progress",
  "PT05": "Staff Account Management",
  "PT06": "Staff Performance Tracking",
  "PT07": "Corporate Billing — Invoices & Usage Reports",
  "PT08": "SSO & Role Selection",
  "PT09": "Referral Consent & Code Entry",
  "PT10": "Patient Detail & Secure Communication",
  "PT11": "Add Staff & Permissions",
  "PT12": "Assignment Interface & Skill Matching",
  "PT13": "Performance Metrics & Export",
  "PT14": "Invoice Detail & Report Builder",
  "A01": "Platform Dashboard & Metrics",
  "A02": "Incident Queue & Detail",
  "A03": "User Management — Approve/Reject Professionals",
  "A04": "Patient & Partner Management",
  "A05": "Compliance — Audit Log",
  "A06": "Consent Tracking",
  "A07": "Retention Policy Management",
  "A08": "Escalated Ticket Handling",
  "A09": "Analytics — Revenue, Utilization, Quality",
  "A10": "Custom Dashboard & Drill-down",
  "A11": "Incident Detail & Assign Investigator",
  "A12": "Application Detail & Document Review",
  "A13": "User Edit & Suspend/Merge",
  "A14": "Audit Detail & Immutable Proof",
  "A15": "Consent Detail & Version History",
  "A16": "Policy Editor & Legal Hold",
  "A17": "Ticket Assign & SLA Timers",
  "A18": "Report Builder & Scheduled Reports",
  "S01": "Realtime Event Trail (booking → dispatch → audit → payment)",
  "S02": "Dispatch & Availability Re-check (surfaced inside PR03)",
  "S03": "Auto-Notification & Incident Linking (surfaced in P07, P31, A02)",
  "S04": "Transaction Status & Rollback",
  "S05": "Re-check Result & No Availability",
  "S06": "Access Log & Diff Viewer",
  "S07": "Payment Status & Retry/Refund",
  "S08": "Notification Delivery & Incident Timeline",
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
  screenId,
  fileName: fallbackFileName,
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

      // Determine download file name
      let fileName: string
      if (screenId) {
        const screenName = SCREEN_NAMES[screenId] || screenId
        fileName = `${screenId} - ${screenName}`
      } else if (fallbackFileName) {
        fileName = fallbackFileName
      } else {
        fileName = 'screenshot'
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
  }, [cornerRadiusPx, expandPx, notify, state, targetRef, screenId, fallbackFileName])

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
