import {
  ArrowRight, BadgeCheck, CheckCircle2, Download, Eye, Mail, MailCheck, Plus, Save, ShieldCheck,
  UserRound, Wallet, ListChecks,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'
import type {
  EmailSendState, SeenState, SendState, SignInState, VerifyState, ContinueState, ExportStatus,
  SaveStatus, WithdrawStatus, SignOffStatus,
} from './types'

type LifecycleButtonTone = 'success' | 'warning' | 'danger' | 'info' | 'accent'

type LifecycleButtonConfig<Props extends object> = {
  idleIcon: LucideIcon | ((props: Props) => LucideIcon)
  idleLabel: (props: Props) => string
  workingLabel: string
  doneLabel: string
  tone?: LifecycleButtonTone
  phase: (props: Props) => 'idle' | 'working' | 'done'
  gated?: (props: Props) => boolean
  className?: string
}

function makeLifecycleButton<Props extends object>(config: LifecycleButtonConfig<Props>) {
  return function ConfiguredLifecycleButton(props: Props & { onPress: () => void }) {
    const { onPress, ...rest } = props
    const typed = rest as Props
    const phase = config.phase(typed)
    const gated = config.gated?.(typed) ?? false
    const idleLabel = config.idleLabel(typed)
    const idleIcon = typeof config.idleIcon === 'function'
      ? (config.idleIcon as (props: Props) => LucideIcon)(typed)
      : (config.idleIcon as LucideIcon)

    return (
      <LifecycleButton
        phase={phase}
        gated={gated}
        idleIcon={idleIcon}
        idleLabel={idleLabel}
        workingLabel={config.workingLabel}
        doneLabel={config.doneLabel}
        tone={config.tone}
        className={config.className}
        onPress={onPress}
      />
    )
  }
}

type EmailCodeProps = { state: EmailSendState }
export const EmailCodeButton = makeLifecycleButton<EmailCodeProps>({
  idleIcon: Mail,
  idleLabel: () => 'Email me the code',
  workingLabel: 'Sending to your inbox',
  doneLabel: 'Code sent by email',
  phase: ({ state }) => state,
})

type MarkSeenProps = { state: SeenState }
export const MarkSeenButton = makeLifecycleButton<MarkSeenProps>({
  idleIcon: Eye,
  idleLabel: () => 'Open the full record',
  workingLabel: 'Fetching the record',
  doneLabel: 'Opened and reviewed',
  phase: ({ state }) => state,
})

type SendResetProps = { state: SendState }
export const SendResetButton = makeLifecycleButton<SendResetProps>({
  idleIcon: MailCheck,
  idleLabel: () => 'Send reset link',
  workingLabel: 'Sending your link',
  doneLabel: 'Link sent',
  phase: ({ state }) => state,
})

type SignInProps = { ready: boolean; state: SignInState }
export const SignInButton = makeLifecycleButton<SignInProps>({
  idleIcon: ArrowRight,
  idleLabel: ({ ready }) => ready ? 'Sign in' : 'Enter your password to continue',
  workingLabel: 'Signing you in',
  doneLabel: 'Signed in',
  phase: ({ state }) => state,
  gated: ({ ready }) => !ready,
})

type VerifyProps = { ready: boolean; state: VerifyState }
export const VerifyButton = makeLifecycleButton<VerifyProps>({
  idleIcon: BadgeCheck,
  idleLabel: ({ ready }) => ready ? 'Verify and continue' : 'Enter all six digits to continue',
  workingLabel: 'Matching your code',
  doneLabel: 'Phone verified',
  phase: ({ state }) => state,
  gated: ({ ready }) => !ready,
})

type ContinueProps = { blocked: boolean; state: ContinueState }
export const ContinueButton = makeLifecycleButton<ContinueProps>({
  idleIcon: ArrowRight,
  idleLabel: ({ blocked }) => blocked ? 'Pick at least one day to continue' : 'Continue to matching',
  workingLabel: 'Saving your details',
  doneLabel: 'Details saved',
  phase: ({ blocked, state }) => blocked ? 'idle' : state,
  gated: ({ blocked }) => blocked,
})

type ExportHistoryProps = { status: ExportStatus }
export const ExportHistoryButton = makeLifecycleButton<ExportHistoryProps>({
  idleIcon: Download,
  idleLabel: () => 'Export session records',
  workingLabel: 'Preparing export…',
  doneLabel: 'Export saved to downloads',
  phase: ({ status }) => status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working',
})

type SaveAvailabilityProps = { label: string; status: SaveStatus; disabled: boolean }
export const SaveAvailabilityButton = makeLifecycleButton<SaveAvailabilityProps>({
  idleIcon: Save,
  idleLabel: ({ label }) => label,
  workingLabel: 'Saving…',
  doneLabel: 'Saved · live now',
  phase: ({ status }) => status === 'saving' ? 'working' : status === 'saved' ? 'done' : 'idle',
  gated: ({ disabled, status }) => disabled && status === 'idle',
})

type SaveSheetProps = { label: string; disabled: boolean; status: SaveStatus }
export const SaveSheetButton = makeLifecycleButton<SaveSheetProps>({
  idleIcon: CheckCircle2,
  idleLabel: ({ label }) => label,
  workingLabel: 'Saving…',
  doneLabel: 'Saved · sealed at sign off',
  phase: ({ status }) => status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working',
  gated: ({ disabled, status }) => disabled && status === 'idle',
  className: 'mt-auto',
})

type SendLinkProps = { state: SendState; expired: boolean }
export const SendLinkButton = makeLifecycleButton<SendLinkProps>({
  idleIcon: MailCheck,
  idleLabel: ({ expired }) => expired ? 'Send a new link' : 'Send reset link',
  workingLabel: 'Generating your link',
  doneLabel: 'Link sent',
  phase: ({ state }) => state,
})

type WithdrawProps = { amount: string; status: WithdrawStatus }
export const WithdrawButton = makeLifecycleButton<WithdrawProps>({
  idleIcon: Wallet,
  idleLabel: ({ amount }) => `Withdraw ${amount} to bank`,
  workingLabel: 'Processing…',
  doneLabel: 'Withdrawal confirmed',
  tone: 'accent',
  phase: ({ status }) => status === 'processing' ? 'working' : status === 'confirmed' ? 'done' : 'idle',
})

type CaseAssignProps = { selectedId: string; assigning: boolean; assigned: boolean }
export const CaseAssignAction = makeLifecycleButton<CaseAssignProps>({
  idleIcon: UserRound,
  idleLabel: () => 'Assign investigator',
  workingLabel: 'Assigning…',
  doneLabel: 'Investigator assigned',
  phase: ({ assigned, assigning }) => assigned ? 'done' : assigning ? 'working' : 'idle',
  gated: ({ selectedId, assigned, assigning }) => !selectedId && !assigned && !assigning,
})

type ReportSaveProps = { isValid: boolean; saveState: 'idle' | 'working' | 'done' }
export const ReportSaveAction = makeLifecycleButton<ReportSaveProps>({
  idleIcon: Plus,
  idleLabel: ({ isValid }) => isValid ? 'Save report' : 'Select metrics to save',
  workingLabel: 'Saving…',
  doneLabel: 'Report saved',
  phase: ({ saveState }) => saveState,
  gated: ({ isValid, saveState }) => !isValid && saveState === 'idle',
})

type SignOffProps = { remaining: number; status: SignOffStatus }
export const SignOffButton = makeLifecycleButton<SignOffProps>({
  idleIcon: ShieldCheck,
  idleLabel: ({ remaining }) => remaining > 0 ? `${remaining} step${remaining === 1 ? '' : 's'} left` : 'Complete and sign off',
  workingLabel: 'Signing off…',
  doneLabel: 'Signed off',
  phase: ({ status }) => status === 'signing' ? 'working' : status === 'signed' ? 'done' : 'idle',
  gated: ({ remaining, status }) => remaining > 0 && status === 'idle',
})

type PrimaryActionProps = { ready: boolean }
export const PrimaryAction = makeLifecycleButton<PrimaryActionProps>({
  idleIcon: ({ ready }: PrimaryActionProps) => ready ? ArrowRight : ListChecks,
  idleLabel: ({ ready }) => ready ? 'Review & create' : 'Complete your details to continue',
  workingLabel: '',
  doneLabel: '',
  phase: () => 'idle',
  gated: ({ ready }) => !ready,
})
