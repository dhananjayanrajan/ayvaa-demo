import { CtaNote } from '@/components/phone/LifecycleButton'

export function SheetFooterNote({ text }: { text: string }) {
  return <CtaNote className="text-[10.5px] font-semibold leading-relaxed">{text}</CtaNote>
}
