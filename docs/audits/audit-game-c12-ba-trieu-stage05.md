# GAME-C12 — Bà Triệu Stage 05 audit

## Scope and lineage

- Parent: `codex/game-c11-fix1-reward-visual-evidence` @ `5a29ba0aeabdab6d4f6642d47edfb130330811a4`
- Branch: `codex/game-c12-ba-trieu-stage05-full-production`
- Scope: productionize only `bt-05-dai-chien-bo-dien`; Stage 01–04 remain locked and Stage 06 remains a prototype.

## Contract verification

- Identity `chapter-ba-trieu-248` / `bt-05-dai-chien-bo-dien` / `map-bt-bo-dien-battle`: PASS.
- Exactly 26 unique waves and 539 enemies: PASS.
- Generic `wu-field-commander` only on Wave 26: PASS.
- Stage 05 timing isolated at 600/1050/1650/2250ms with 775/900/1125/1500ms intervals: PASS.
- Dedicated 1024×768, 12×10 open-field map, bounded fixed path and ten placements: PASS.
- Terrain decorations are presentation-only: PASS.
- Historical confidence is **COMPOSITE RECONSTRUCTION**; Lục Dận is only the historically supported campaign commander, not a boss or battlefield casualty: PASS.
- Narrative beats are exactly 1/9/18/26 with tactical, campaign-continuing outcomes: PASS.
- Reward remains **30 Gold / 2 KNB / 15 Anh Hồn**, with no first-clear reward: PASS.
- BT04 → BT05 → BT06 progression and Stage 06 three-wave prototype retained: PASS.
- C08–C11 dedicated contracts and fallback manifests retained: PASS.

## Automated verification

- `npm test`: PASS — **42 files / 284 tests**.
- `npm run build`: PASS.
- `git diff --check`: PASS.

## Manual and visual gates

- Manual Stage 05 smoke: **PARTIAL PASS** — a local QA save completed HBT and BT01–BT04; BT05 was available and BT06 remained locked. The pre-battle card appeared, Stage 05 loaded, a fallback Bà Triệu was deployed, x3 and Auto Wave were enabled, and the run advanced through Wave 3 with active enemies. A full 26-wave clear was not performed.
- Visual evidence: **PASS** — genuine runtime PNG captured during the Stage 05 run, showing the Đại Chiến Bồ Điền map, deployed fallback Hero, active enemies, Wave 3, x3 and Auto Wave.
- Evidence: `docs/audits/evidence/game-c12/01-stage05-runtime.png` (PNG signature verified).
- Hero production art: PENDING.
- Wu enemy walk art: PENDING; primitive fallback remains authoritative.

## Classification

**GAME-C12: READY_FOR_AUDIT** — code and automated contract are complete; manual smoke is a partial pass and visual evidence is present. Hero/Wu production art gates remain pending.
