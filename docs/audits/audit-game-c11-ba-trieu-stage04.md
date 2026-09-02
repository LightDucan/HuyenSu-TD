# GAME-C11 — Bà Triệu Stage 04 audit

## Scope and lineage

- Parent: `codex/game-c10-ba-trieu-stage03-full-production` @ `e9a1c812c252f2eb2081d174b5b1af6ed0fd1816`
- Branch: `codex/game-c11-ba-trieu-stage04-full-production`
- Scope: productionize only `bt-04-lap-luy-bo-dien`; no main merge and no GAME-C12 work.

## Contract verification

- Stable Chapter/Stage/map/theme/faction/roster identity: PASS.
- Exactly 24 unique waves and 419 enemies: PASS.
- Generic field commander only on Wave 24: PASS.
- Stage 04 timing isolated from Stage 01–03: PASS.
- Dedicated 1024×768, 12×10 map, non-intersecting fixed path and ten bounded placements: PASS.
- Earthwork/fort terrain is presentation-only: PASS.
- Local-tradition/gameplay-reconstruction framing, beats 1/8/16/24, tactical outcomes: PASS.
- Ordinary reward 26 Gold / 1 KNB / 12 Anh Hồn; no first-clear package: PASS.
- BT03 completion unlocks BT04 and BT04 completion unlocks BT05: PASS.
- Stage 01–03 production contracts and dedicated tests retained; Stage 05–06 remain prototypes: PASS.
- Existing HBT/Wu visual fallback boundary unchanged: PASS.

## Automated verification

Final results recorded from the C11 branch:

- `npm test`: PASS — **41 files / 276 tests**.
- `npm run build`: PASS.
- `git diff --check`: PASS.

## Manual and visual gates

- Manual Stage 04 smoke: **PASS (partial run)** — QA save completed HBT/BT01/BT02/BT03; Stage 04 was available, BT05 remained locked, pre-battle copy appeared, a fallback Hero was deployed, Auto Wave and x3 were enabled, and runtime advanced through Wave 3. A full 24-wave clear was not performed.
- Visual evidence: **PASS** — real runtime screenshot captured at Wave 3 with the Bồ Điền map, deployed Hero, moving enemies and HUD controls.
- Evidence: `docs/audits/evidence/game-c11/01-stage04-runtime.png`
- Hero asset: **PENDING**.
- Wu enemy asset: **PENDING**; existing primitive fallback remains authoritative.

## Classification

**GAME-C11-FIX1: READY_FOR_AUDIT** — reward restored and visual evidence captured.
