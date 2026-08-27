# AYVAA CAREGIVER — WORKFLOW / SCREEN COVERAGE MATRIX

Legend: ✔ Covered  ◐ Partially covered  ✘ Not covered (screen must be built)

## Patient / Guardian
| #   | Workflow                                   | Covering Screens | Status |
|-----|--------------------------------------------|------------------|--------|
| 1.1 | Sign up / onboarding                       | P01              | ✔ built |
| 1.2 | Login                                      | P02              | ✔ built |
| 1.3 | Identity verify (OTP)                      | P03              | ✔ built |
| 1.4 | Identity verify (ID + selfie)              | P04              | ✔ built |
| 1.5 | Password recovery                          | P05              | ✔ built |
| 1.6 | Today's timeline / live state              | P06              | ✔ built |
| 1.7 | Upcoming visits                            | P06, P15         | ✔ built |
| 1.8 | Quick actions                              | P06              | ✔ built |
| 1.9 | Notifications                              | P07              | ✔ built |
| 1.10| Search & service catalogue                 | P08              | ✔ built |
| 1.11| Create booking request                     | P09              | ✔ built |
| 1.12| Caregiver matching                         | P10              | ✔ built |
| 1.13| Caregiver detail profile                   | P11              | ✔ built |
| 1.14| Review, consent & confirm                  | P12              | ✔ built |
| 1.15| Care plan goals & progress                 | P13              | ✔ built |
| 1.16| Reports list & detail                      | P14              | ✔ built |
| 1.17| Visits list (3 states)                     | P15              | ✔ built |
| 1.18| Live tracking                              | P16              | ✔ built |
| 1.19| Visit summary                              | P17              | ✔ built |
| 1.20| Rate visit                                 | P18              | ✔ built |
| 1.21| Reschedule visit                           | P33              | ✔ built |
| 1.22| Medication daily schedule                  | P19              | ✔ built |
| 1.23| Prescription management                    | P20              | ✔ built |
| 1.24| Documents, consent, audit log              | P21              | ✔ built |
| 1.25| Consent sign / renew / withdraw            | P22              | ✔ built |
| 1.26| Billing history & statements               | P23              | ✔ built |
| 1.27| Payment methods management                 | P24              | ✔ built |
| 1.28| Support tab & open requests                | P25              | ✔ built |
| 1.29| Ticket creation (link session/incident)    | P26              | ✔ built |
| 1.30| Support conversation                       | P27              | ✔ built |
| 1.31| Personal info & edit                       | P28              | ✔ built |
| 1.32| Notification & privacy settings            | P29              | ✔ built |
| 1.33| Loved ones management                      | P30              | ✔ built |
| 1.34| Incident report (severity, photos)         | P31              | ✔ built |
| 1.35| Offer-expired / re-dispatch state          | P31 (state 2)    | ✔ built |
| 1.36| Emergency destination                      | P32              | ✔ built |
| 1.37| Plan lifecycle (pause/change/end series)   | P34              | ✔ built |

## Healthcare Professional
| #   | Workflow                                   | Covering Screens | Status |
|-----|--------------------------------------------|------------------|--------|
| 2.1 | Login                                      | PR01             | ✔ built |
| 2.2 | Credential verification & terms            | PR02             | ✔ built |
| 2.3 | Accept/reject offers with expiry           | PR03             | ✔ built |
| 2.4 | Availability re-check on acceptance        | PR03, S02        | ✔ built |
| 2.5 | Set availability                           | PR05             | ✔ built |
| 2.6 | Sessions list                              | PR04             | ✔ built |
| 2.7 | GPS check-in / start visit                 | PR06             | ✔ built |
| 2.8 | Complete checklist                         | PR06             | ✔ built |
| 2.9 | Record vitals                              | PR06, PR07       | ✔ built |
| 2.10| Medication with verification               | PR06, PR07       | ✔ built |
| 2.11| Add notes                                  | PR06, PR07       | ✔ built |
| 2.12| Incident report & escalation               | PR08             | ✔ built |
| 2.13| Earnings overview                          | PR09             | ✔ built |
| 2.14| Payout history & withdrawal                | PR10             | ✔ built |
| 2.15| Manage certifications                      | PR11             | ✔ built |
| 2.16| Update skills & availability               | PR11, PR05       | ✔ built |
| 2.17| Session history & past notes               | PR12             | ✔ built |

## Partner
| #   | Workflow                                   | Covering Screens | Status |
|-----|--------------------------------------------|------------------|--------|
| 3.1 | Institutional login                        | PT01             | ✔ built |
| 3.2 | Manage staff accounts                      | PT05             | ✔ built |
| 3.3 | Refer a patient                            | PT03             | ✔ built |
| 3.4 | Referred patient progress                  | PT04             | ✔ built |
| 3.5 | Assign professionals                       | PT05             | ✔ built |
| 3.6 | Track performance                          | PT06             | ✔ built |
| 3.7 | Corporate invoices                         | PT07             | ✔ built |
| 3.8 | Usage reports                              | PT07             | ✔ built |

## Administrator
| #   | Workflow                                   | Covering Screens | Status |
|-----|--------------------------------------------|------------------|--------|
| 4.1 | Platform metrics                           | A01              | ✔ built |
| 4.2 | Active sessions                            | A01              | ✔ built |
| 4.3 | Incident queue                             | A02              | ✔ built |
| 4.4 | Approve/reject professionals               | A03              | ✔ built |
| 4.5 | Manage patients & partners                 | A04              | ✔ built |
| 4.6 | Audit logs                                 | A05              | ✔ built |
| 4.7 | Consent tracking                           | A06              | ✔ built |
| 4.8 | Retention policies                         | A07              | ✔ built |
| 4.9 | Escalated tickets                          | A08              | ✔ built |
| 4.10| Analytics                                  | A09              | ✔ built |

## System (automated)
| #   | Workflow                                   | Covering Screens | Status |
|-----|--------------------------------------------|------------------|--------|
| 5.1 | Transactional booking creation             | S01              | ✔ built |
| 5.2 | Dispatch & availability re-check           | S01, PR03, S02   | ✔ built |
| 5.3 | Audit logging                              | S01, P21, A05    | ✔ built |
| 5.4 | Payment capture after completion           | S01, P17, P23    | ✔ built |
| 5.5 | Realtime notifications                     | P07, S03         | ✔ built |
| 5.6 | Incident linking & supervisor notify       | P31, A01, S03    | ✔ built |

## SUMMARY
| Group | Workflows | Fully ✔ | Partial ◐ | Missing ✘ |
|---|---|---|---|---|
| Patient | 36 | 36 | 0 | 0 |
| Professional | 17 | 17 | 0 | 0 |
| Partner | 8 | 8 | 0 | 0 |
| Administrator | 10 | 10 | 0 | 0 |
| System | 6 | 6 | 0 | 0 |
| **TOTAL** | **77** | **77** | **0** | **0** |
