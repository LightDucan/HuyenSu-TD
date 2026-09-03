# GAME-C18 — Hai Bà Trưng Stage 02 + Stage 03 Audit

## Scope

Stage 02 (`hbt-lang-bac-stage-02`) and Stage 03 (`hbt-cam-khe-stage-03`) are registered as data-driven production stage packs on the C17 baseline. Stage 01 remains the default battle stage and its content is unchanged.

## Automated verification

- Campaign registry contains exactly three ordered HBT stages.
- Stage 01: 24 waves / 292 scheduled enemies / Mã Viện on Wave 24.
- Stage 02: 22 waves / 324 scheduled enemies / Han sword, crossbow and armored roster only.
- Stage 03: 24 waves / 385 scheduled enemies / Han sword, crossbow and armored roster only.
- Stage 02 and Stage 03 have no first-clear reward and no boss group.
- Ordered progression is preserved: Stage 01 → Stage 02 → Stage 03.
- Chapter II temporary C18 frontier is Stage 03 completion; no Stage 04 placeholder was added.
- Campaign catalog validation returns no errors.

Test result: **PASS** — 44 test files / 296 tests.
Build result: **PASS**.
Diff check: **PASS**.

## Manual / visual gate

Status: **PARTIAL**. A fresh browser smoke entered Stage 02 and Stage 03 from the Campaign screen, deployed a Hero, enabled x3/Auto Wave, and observed live enemy movement/HUD updates. Stage 02 reached Wave 22/22 and victory. Stage 03 evidence was captured during Wave 2; a full 24-wave clear was not claimed.

Expected evidence:

- `docs/audits/evidence/game-c18/01-chapter1-three-stages.png`
- `docs/audits/evidence/game-c18/02-stage02-runtime.png`
- `docs/audits/evidence/game-c18/03-stage03-runtime.png`

Capture method: new real browser screenshots from the running local application; PNGs were converted from the captured screenshot bytes without metadata mutation or reuse of prior evidence.

Hero art status remains **SUSPENDED**; existing shared/fallback visuals are used by the runtime.

## Result

GAME-C18 is **READY FOR AUDIT** with automated verification PASS and manual/visual evidence PARTIAL.
