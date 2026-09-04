# Refactor Progression

## Completed Pages

- `src/apps/admin/A01.tsx` — Operations console
  - Extracted `src/components/admin/dashboard/OperationsHero.tsx`
  - Reused existing admin dashboard components (`IncidentOverviewCard`, `AttentionList`, `LiveSessionsCard`)
  - Preserved all data and state wiring

- `src/apps/admin/A02.tsx` — Incident detail
  - Extracted `src/components/admin/incident/IncidentActionBar.tsx`
  - Switched to dedicated admin incident components under `src/components/admin/incident/`
  - Switched to dedicated admin sheet components under `src/components/admin/sheets/`
  - Preserved all incident state, routing, and notification flows

- `src/apps/admin/A03.tsx` — Professional approvals
  - Extracted `src/components/admin/approvals/ApprovalsHero.tsx`
  - Switched to dedicated admin approval components under `src/components/admin/approvals/`
  - Switched to dedicated admin UI component under `src/components/admin/ui/`
  - Preserved all approval decision, filter, and notification flows
