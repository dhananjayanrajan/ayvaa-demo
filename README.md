# Ayvaa: Caregiver

**In-house on-demand long-term homecare service booking platform**  
Connected to the Ayvaa healthcare ecosystem, enabling patients and guardians to book certified healthcare professionals for short-term, long-term, recurring, and ongoing care across elderly, pediatric, disability, post-operative, chronic, palliative, and special-needs categories.

## Core Commitments

1. **Patient safety first** – Checks and gates cannot be weakened by convenience.  
2. **Legal credibility** – Every consequential action leaves an immutable, auditable record.  
3. **Reliability over reach** – Scheduled care must happen, be verified, and be followed up when it doesn’t.

---

## User Groups

| Group | Description |
|-------|-------------|
| **Patients / Families** | Book and manage care, view plans, sessions, consent, incidents, documents, and payments. |
| **Healthcare Professionals** | Hold credentials, accept assignments, deliver care, record tasks, and receive payments. |
| **Partners (Hospitals / Agencies)** | Employ/contract professionals, refer patients, and manage corporate plans. |
| **Administrators / Staff** | Platform oversight, compliance, support, and analytics. |

---

## Key Features

- Recurring and one-time bookings with caregiver matching and live dispatch.
- Care plans with goals, progress tracking, and periodic reports.
- Session execution with checklists, vitals, medication verification, and notes.
- Consent management with signing, renewal, withdrawal, and audit trail.
- Incident reporting with severity, photos, and escalation workflows.
- Payment capture linked to session completion.
- Real-time event propagation and notifications.
- Strict role-based and consent-gated access to sensitive data.
- Immutable audit logging for all state changes and document access.
- Retention policy enforcement per record type.

---

## Workflow Summary

**Example: Patient books recurring care**  
1. Request submitted from patient app.  
2. Backend validates care category, consent, and available credentialed professionals.  
3. Booking + recurring series created transactionally; audit event written; dispatch offers emitted.  
4. Professionals receive offers; acceptance checked against current availability.  
5. Sessions generated; professional executes checklist, records medications/tasks.  
6. State changes audited; events update real-time views, analytics, and notifications.  
7. Payment captured against session records.  
8. Incidents (if any) linked back to care plan.

---

## Product Coverage

The platform currently defines **65 primary UI surfaces** (62 role-specific screens + 3 system surfaces) covering **77 workflows** across all user groups.  
An additional **~75 screen templates** are planned to handle minor actions, edge states, and secondary flows, bringing the total to approximately **140 distinct UI surfaces**.

Detailed documentation:

- [Complete Workflow List](./docs/workflow-list.md)  
- [Complete Screen Plan (64 screens)](./docs/screen-plan.md)  
- [Workflow / Screen Coverage Matrix](./docs/coverage-matrix.md)

---

## Technology Stack

- **Frontend**: React, Vite, TypeScript (assumed, based on repo structure)  
- **Backend**: [To be defined] – event-driven, transactional, with audit and encryption services.  
- **Database**: [To be defined] – supports immutable audit logs and role-based access.  
- **Real-time**: WebSockets / SSE for live updates and dispatch.  

---

## Getting Started

### Prerequisites

- Node.js (≥ 18.x)  
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd ayvaa-caregiver
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
src/
  components/       # Reusable UI components (modals, states, forms)
  features/         # Feature modules by user group / domain
  services/         # API clients, event handlers, audit logging
  store/            # State management (Redux / Context / Zustand)
  utils/            # Helpers, validators, security utilities
  styles/           # Global styles and theme
docs/               # Product and workflow documentation
```

---

## Security & Compliance

- Encryption at rest and in transit (AES-256, TLS 1.3).  
- Role-based access control (RBAC) with consent-gated document access.  
- Every access to sensitive documents is audited.  
- Retention periods defined per record type and enforced by the system.  
- Audit trail supports immutable record (hash-chaining or append-only log).

---

## Contributing

This project is currently in early development. Contribution guidelines will be published as the team grows.

---

## License

Proprietary – © Ayvaa Healthcare. All rights reserved.
