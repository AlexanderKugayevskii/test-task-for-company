import type { AccountLabel } from '../types'

export function parseLabels(input?: string | null): AccountLabel[] {
  if (!input || !input.trim()) return []
  return input
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

export function labelsToString(labels: AccountLabel[] | undefined | null): string {
  return (labels ?? []).map((l) => l.text).join('; ')
}
