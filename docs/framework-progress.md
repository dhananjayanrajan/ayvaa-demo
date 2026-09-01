# FRAMEWORK PROGRESS — LIVE LOG (mutable, gitignored in contract)

**This file is the mutable live log. `docs/framework-plan.md` is the immutable contract (changes only by user ruling). Do not edit the contract to log progress — edit this file.**

### 2026-09-01 — Pass 0 Census — COMPLETE
- Tree: 612 files (phone 34, patient 168, professional 80, admin 41, partner 46, system 30, ui 28, smoothui 185). Data 40 modules. Apps 85 screens.
- Diff vs baseline 75826d2^: 381 entries = 301 M + 49 D + 13 A + 18 R (16 R100 + R077/R097). Verified `git diff --name-status`.
- Phone baseline 17 → 34 (+17 promotions). Phone diff 2128 ins additive; drift register additive-only after Stage 17.3.

### 2026-09-01 — Pass 1 L2 fidelity + QoL — IN PROGRESS → CORE UPGRADE NEEDED per v2 §7 §10 §11
- Built FrameworkRuntime + DialInput exemplar (076e830, 03ee6c2) — only true L2. Rest phone 36 still L1 shells — additive audit done (OptionRow neutral/dark, SheetShell height, StepList 319, Field 170 etc) gate 0 but **not yet L2 machines** per §10 anatomy — missing state machines/bus/tone-map/butter/QoL per Laws 1-5. Need per-hub upgrade to L2 before certification.

### 2026-09-01 — Pass 2 continuation — IN PROGRESS (one-domain, no comments) → COMPLETE per v1 scaffold, UPGRADE PENDING per v2
- Added 45 L3 sets canonical (36 phone + 45 = 81 vs ~75 target) — bundles via concatenation, gate 0, per-file suffix hacks (now fixed 7875767), selective per-role alias repoint 59 apps eb88c51, 0 old imports, gate 0. But L3s are bundled old files, not thin compositions on upgraded L2s per §2 §10 — need rewire after L2 upgrade. Count correct, substance needs v2 hardening.

### 2026-09-01 — Pass 2 COMPLETE — HALT before Pass 3 per instruction (scaffold)
- Clean branch from 7d0ad04 → cherry-picked A17/A18 (883091e, 00a0ee3, b7cbcbc), pushed origin/clean, parity 85, back to main. Halt before restructure per user.
- Variant Props union fixed per-file suffix, per-role alias repoint 59 apps eb88c51, gate app 0 node 0, 45 sets + 36 phone = 81.

### NEXT — v2 HARDENING (awaiting instruction)
- Harden Pass 1: upgrade each phone hub to true L2 per §10 anatomy (state machine + bus + tone-map whole-surface + butter + QoL checklist + verification §11).
- Rewire Pass 2: re-derive L3s as thin compositions ON hardened L2s (variant Props union, slot composition, token customization) — not copy-paste.
- Then Pass 3 restructure + Pass 4 walkthrough certification per §11.
