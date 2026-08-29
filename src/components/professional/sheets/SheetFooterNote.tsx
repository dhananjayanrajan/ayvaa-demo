type Props = {
  text: string
}

export function SheetFooterNote({ text }: Props) {
  return (
    <p className="text-center text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/45">{text}</p>
  )
}
