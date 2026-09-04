export function ResetInfo({ email, validity }: { email: string; validity: string }) {
  return (
    <div className="rounded-2xl bg-[#0B231C] p-4">
      <div className="flex flex-col gap-3.5">
        <div>
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
            Sending to
          </div>
          <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
            {email}
          </div>
        </div>
        <div>
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
            Link validity
          </div>
          <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
            {validity}
          </div>
        </div>
      </div>
    </div>
  )
}
