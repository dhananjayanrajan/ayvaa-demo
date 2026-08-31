import type { invoices, usage } from '@/data/seed'

export type Invoice = (typeof invoices)[number]
export type UsageItem = (typeof usage)[number]
