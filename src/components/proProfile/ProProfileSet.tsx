import type { LucideIcon } from 'lucide-react'
import { Award, BadgeCheck, CalendarDays, Check, Eye, FileImage, FileText, Landmark, Lock, Pencil, Plus, ShieldCheck, Upload } from 'lucide-react'
import { Row } from '@/components/phone/Row'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { SheetShell } from '@/components/phone/SheetShell'
import { CtaNote, LifecycleButton } from '@/components/phone/LifecycleButton'
import { cn } from '@/lib/utils'
import type { TileTone } from '@/components/phone/kit'
import { Card, Chip, Kicker } from '@/components/phone/kit'
import { Input } from '@/components/ui/input'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { PUBLIC_FACTS } from '@/data/profileData'

// ── AddCertificationRow.tsx ──
type Props_AddCertificationRow = {
  onPress: () => void
}

export function AddCertificationRow({ onPress }: Props_AddCertificationRow) {
  return (
    <Row
      icon={Plus}
      tone="ink"
      title="Add a certification"
      titleClassName="text-[13px] font-extrabold"
      subtitle="Unlocks new care categories once verified"
      subtitleClassName="truncate text-[10.5px] font-semibold text-[#0B211B]/45"
      bodyClassName="pt-0.5"
      surface="inset"
      padding="inset"
      hoverClassName="hover:bg-[#0B211B]/[0.06]"
      onClick={onPress}
    />
  )
}

// ── CertificationRow.tsx ──
type Props_CertificationRow = {
  name: string
  valid: boolean
  isNew?: boolean
}

const statusText = (valid: boolean) =>
  valid ? 'Verified by Ayvaa, currently valid' : 'Uploaded, review completes within 2 days'

export function CertificationRow({ name, valid, isNew }: Props_CertificationRow) {
  return (
    <Row
      icon={Award}
      tone={isNew ? 'success' : 'neutral'}
      title={name}
      titleClassName="text-[13px] font-extrabold"
      subtitle={statusText(valid)}
      subtitleClassName="truncate text-[10.5px] font-semibold text-[#0B211B]/45"
      chip={{
        label: isNew ? 'Just added' : valid ? 'Valid' : 'In review',
        intent: isNew ? 'live' : valid ? 'success' : 'warning',
        dot: isNew || !valid,
      }}
      bodyClassName="pt-0.5"
      fresh={isNew}
      surface={isNew ? 'tint' : 'none'}
      surfaceTone={isNew ? 'rounded-2xl bg-emerald-500/[0.06]' : undefined}
      className={isNew ? undefined : 'rounded-2xl px-2 py-3'}
      showChevron={false}
    />
  )
}

// ── CertificationUploadSheet.tsx ──
type Status_CertificationUploadSheet = 'idle' | 'verifying' | 'added'

type PickedFile = { name: string; size: string; kind: 'image' | 'pdf' }

type Props_CertificationUploadSheet = {
  category: string | null
  onClose: () => void
  onAdded: (category: string | null, certName: string) => void
}

export function CertificationUploadSheet({ category, onClose, onAdded }: Props_CertificationUploadSheet) {
  const [file, setFile] = useState<PickedFile | null>(null)
  const [status, setStatus] = useState<Status_CertificationUploadSheet>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    const size = f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`
    setFile({ name: f.name, size, kind: isPdf ? 'pdf' : 'image' })
    setStatus('idle')
    e.target.value = ''
  }

  const verify = () => {
    if (!file || status !== 'idle') return
    setStatus('verifying')
    timers.current.push(
      setTimeout(() => {
        setStatus('added')
        const certName = category ?? file.name.replace(/\.[^.]+$/, '')
        timers.current.push(setTimeout(() => onAdded(category, certName), 1100))
      }, 1200),
    )
  }

  const FileIcon = file?.kind === 'pdf' ? FileText : FileImage

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <SheetShell
        icon={Award}
        tone="info"
        title={category ? `Certify ${category}` : 'Upload certification'}
        subtitle="Ayvaa verifies within two working days"
        onClose={onClose}
        footer={
          <div className="flex flex-col gap-2.5">
            <LifecycleButton
              phase={status === 'idle' ? 'idle' : status === 'added' ? 'done' : 'working'}
              tone="accent"
              idleIcon={Upload}
              gated={!file}
              idleLabel={file ? 'Verify certification' : 'Choose a file first'}
              workingLabel="Verifying with Ayvaa…"
              doneLabel="Submitted for review"
              onPress={verify}
            />
            <CtaNote className="font-semibold">Photo or PDF. Documents stay sealed with Ayvaa.</CtaNote>
          </div>
        }
      >
        <div className="flex flex-col gap-3.5">
          {category && (
            <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Category</span>
              <span className="min-w-0 truncate text-right text-[12.5px] font-bold text-[#0B211B]">{category}</span>
            </div>
          )}

          <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={onFile} aria-label="Certification file" />

          {file ? (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors',
                status === 'added' ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.035]',
              )}
            >
              <span
                className={cn(
                  'grid h-12 w-12 shrink-0 place-items-center rounded-2xl',
                  status === 'added' ? 'bg-emerald-500/[0.12] text-emerald-700' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/60',
                )}
              >
                <FileIcon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]',
                    status === 'added' ? 'text-emerald-700/80' : 'text-[#0B211B]/40',
                  )}
                >
                  {status === 'added' ? (
                    <>
                      File submitted
                      <Check className="h-2.5 w-2.5 shrink-0" strokeWidth={4} aria-hidden />
                    </>
                  ) : (
                    'File attached'
                  )}
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] font-bold text-[#0B211B]/75">{file.name}</span>
                <span className="mt-0.5 block text-[10.5px] font-semibold text-[#0B211B]/45">
                  {file.size} · tap to replace
                </span>
              </span>
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => inputRef.current?.click()}
              className="flex h-[96px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.035] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.06]"
            >
              <Upload className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              <span className="text-[13px] font-bold">Tap to attach a photo or PDF</span>
            </motion.button>
          )}
        </div>
      </SheetShell>
    </>
  )
}

// ── CertificationsCard.tsx ──
export type CertRecord = {
  name: string
  valid: boolean
  isNew?: boolean
}

type Props_CertificationsCard = {
  items: CertRecord[]
  onAdd: () => void
}

export function CertificationsCard({ items, onAdd }: Props_CertificationsCard) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-3">
        {items.map((c) => (
          <CertificationRow key={c.name} name={c.name} valid={c.valid} isNew={c.isNew} />
        ))}
        <div className="mt-1">
          <AddCertificationRow onPress={onAdd} />
        </div>
      </div>
    </Card>
  )
}

// ── EditProfileSheet.tsx ──
type Status_EditProfileSheet = 'idle' | 'saving' | 'saved'

type Props_EditProfileSheet = {
  name: string
  role: string
  onClose: () => void
  onSave: (name: string, role: string) => void
}

export function EditProfileSheet({ name, role, onClose, onSave }: Props_EditProfileSheet) {
  const [draftName, setDraftName] = useState(name)
  const [draftRole, setDraftRole] = useState(role)
  const [status, setStatus] = useState<Status_EditProfileSheet>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const dirty = (draftName.trim() !== name || draftRole.trim() !== role) && draftName.trim().length > 0

  const save = () => {
    if (!dirty || status !== 'idle') return
    setStatus('saving')
    timers.current.push(
      setTimeout(() => {
        setStatus('saved')
        onSave(draftName.trim(), draftRole.trim())
        timers.current.push(setTimeout(onClose, 900))
      }, 1000),
    )
  }

  const inputClass =
    'mt-2 w-full rounded-2xl border-0 bg-white p-3.5 text-[13px] font-medium text-[#0B211B] shadow-inner placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B211B]/15'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <SheetShell
        icon={Pencil}
        tone="info"
        title="Edit profile details"
        subtitle="Families see these on your public card"
        onClose={onClose}
        footer={
          <LifecycleButton
            phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'}
            tone="accent"
            gated={!dirty}
            idleLabel="Save changes"
            workingLabel="Saving…"
            doneLabel="Profile updated"
            onPress={save}
          />
        }
      >
        <div className="flex flex-col gap-3.5">
          <div className="rounded-2xl bg-[#0B211B]/[0.035] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Full name</div>
            <Input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div className="rounded-2xl bg-[#0B211B]/[0.035] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Professional role</div>
            <Input
              value={draftRole}
              onChange={(e) => setDraftRole(e.target.value)}
              placeholder="Your role"
              className={inputClass}
            />
            <p className="mt-2.5 text-[10px] font-bold text-[#0B211B]/40">
              Changing your role may require re-verification of matching certifications.
            </p>
          </div>
        </div>
      </SheetShell>
    </>
  )
}

// ── PreferenceRow.tsx ──
type Props_PreferenceRow = {
  icon: LucideIcon
  tone: TileTone
  title: string
  metaLabel: string
  metaValue: string
  onPress: () => void
}

export function PreferenceRow({ icon, tone, title, metaLabel, metaValue, onPress }: Props_PreferenceRow) {
  return (
    <Row
      icon={icon}
      tone={tone}
      title={title}
      titleClassName="text-[13px] font-extrabold"
      metaLabel={metaLabel}
      metaValue={metaValue}
      metaInline
      bodyClassName="pt-0.5"
      className="rounded-2xl px-2 py-3"
      onClick={onPress}
      showChevron={false}
      trailing={<ChevronRightLegacy />}
    />
  )
}

function ChevronRightLegacy() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B211B]/20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

// ── PreferencesCard.tsx ──
type Props_PreferencesCard = {
  openDays: number
  firstOpenDay: string | null
  firstOpenHours: string | null
  bankName: string
  bankLast4: string
  onPressAvailability: () => void
  onPressPayout: () => void
}

export function PreferencesCard({
  openDays,
  firstOpenDay,
  firstOpenHours,
  bankName,
  bankLast4,
  onPressAvailability,
  onPressPayout,
}: Props_PreferencesCard) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-3">
        <PreferenceRow
          icon={CalendarDays}
          tone="info"
          title="Availability"
          metaLabel={`${openDays} days open`}
          metaValue={firstOpenDay ? `${firstOpenDay}, ${firstOpenHours}` : 'No days open'}
          onPress={onPressAvailability}
        />
        <PreferenceRow
          icon={Landmark}
          tone="neutral"
          title="Payout account"
          metaLabel="Default"
          metaValue={`${bankName}, ${bankLast4}`}
          onPress={onPressPayout}
        />
      </div>
    </Card>
  )
}

// ── ProfileHero.tsx ──
type Props_ProfileHero = {
  name: string
  role: string
  initials: string
  rating: number
  visits: number
  years: number
  openDays: number
}

export function ProfileHero({ name, role, initials, rating, visits, years, openDays }: Props_ProfileHero) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-14 h-44 w-44 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />

      <div className="relative p-6 pb-5">
        <Kicker>Verified professional</Kicker>

        <div className="mt-5 flex items-start gap-4">
          <span className="relative shrink-0">
            <span className="grid h-24 w-24 place-items-center rounded-[26px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[24px] font-black tabular-nums tracking-tight text-emerald-100 ring-1 ring-emerald-300/20">
              {initials}
            </span>
            <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-emerald-400 ring-4 ring-[#0B231C]">
              <BadgeCheck className="h-4 w-4 text-[#062419]" strokeWidth={2.8} aria-hidden />
            </span>
          </span>
          <div className="min-w-0 flex-1 pt-1.5">
            <h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">{name}</h2>
            <p className="mt-1.5 text-[12px] font-medium leading-snug text-emerald-100/55">{role}</p>
          </div>
        </div>

        <div className="mt-7 flex items-start justify-between gap-4 px-1">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">{rating}</span>
              <span className="text-[11px] leading-none text-amber-400" aria-hidden>
                ★
              </span>
            </div>
            <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Rating</div>
          </div>
          <div className="min-w-0">
            <div className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">
              {visits.toLocaleString('en-IN')}
            </div>
            <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Visits</div>
          </div>
          <div className="min-w-0 text-right">
            <div className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">
              <span className="tabular-nums">{years}</span>
              <span className="ml-1 text-[13px] font-extrabold tracking-tight text-emerald-100/70">yrs</span>
            </div>
            <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Experience</div>
          </div>
        </div>
      </div>

      <div aria-hidden className="relative h-px bg-white/[0.08]" />

      <div className="relative flex items-center gap-3 px-6 py-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-200">
          <CalendarDays className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Offer matching</div>
          <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">
            {openDays > 0 ? `Live on ${openDays} open days` : 'Paused, no open days'}
          </div>
        </div>
        <Chip
          intent={openDays > 0 ? 'live' : 'neutral'}
          light
          dot={openDays > 0}
          className={cn('shrink-0 border-transparent')}
        >
          {openDays > 0 ? 'Matching' : 'Off'}
        </Chip>
      </div>
    </div>
  )
}

// ── ProfilePreviewSheet.tsx ──
type Props_ProfilePreviewSheet = {
  name: string
  role: string
  initials: string
  onClose: () => void
  onConfirm: () => void
}

export function ProfilePreviewSheet({ name, role, initials, onClose, onConfirm }: Props_ProfilePreviewSheet) {
  return (
    <SheetShell
      open
      height="full"
      icon={Eye}
      tone="ink"
      title="What families see"
      subtitle="Your public card on every offer they receive"
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onConfirm}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Looks right, keep it live
        </button>
      }
    >
      <PhaseHero theme={PHASE_THEME.emerald}>
        <div className="relative">
          <div className="flex items-center gap-3.5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[16px] font-black tracking-tight text-emerald-100">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[16px] font-extrabold tracking-tight text-white">{name}</div>
              <div className="mt-0.5 truncate text-[11px] font-semibold text-emerald-100/55">{role}</div>
            </div>
            <Chip intent="success" light icon={ShieldCheck} className="shrink-0 border-transparent">
              Verified
            </Chip>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            {PUBLIC_FACTS.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.key} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-400/15 text-emerald-200">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">{f.key}</div>
                    <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">{f.value}</div>
                    <div className="mt-0.5 text-pretty text-[10.5px] font-semibold leading-relaxed text-emerald-100/50">{f.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-white/[0.06] p-3">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
            <span className="min-w-0 flex-1 text-pretty text-[10.5px] font-semibold leading-relaxed text-emerald-100/60">
              Documents stay sealed. Families never see files, only these facts.
            </span>
          </div>
        </div>
      </PhaseHero>
    </SheetShell>
  )
}

// ── SkillsCloud.tsx ──
export type Skill = {
  label: string
  matched: boolean
}

type Props_SkillsCloud = {
  skills: Skill[]
  addLabel: string
  onPressSkill: (skill: Skill) => void
  onPressAdd: () => void
}

export function SkillsCloud({ skills, addLabel, onPressSkill, onPressAdd }: Props_SkillsCloud) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <motion.button
          key={s.label}
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => onPressSkill(s)}
          aria-pressed={s.matched}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
            s.matched ? 'bg-emerald-500/[0.12] text-emerald-700' : 'bg-amber-500/[0.12] text-amber-700',
          )}
        >
          {s.matched ? (
            <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
          ) : (
            <Plus className="h-3 w-3" strokeWidth={3} aria-hidden />
          )}
          {s.label}
        </motion.button>
      ))}
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onPressAdd}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#0B211B]/[0.045] px-3.5 py-2 text-[12px] font-bold text-[#0B211B]/55 transition-colors hover:bg-[#0B211B]/[0.08]"
      >
        <Plus className="h-3 w-3" strokeWidth={3} aria-hidden />
        {addLabel}
      </motion.button>
    </div>
  )
}
