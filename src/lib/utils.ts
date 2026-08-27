import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

export function inrLakh(n: number) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " crore"
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + " lakh"
  return inr(n)
}