# GAME-C13 — Bà Triệu Stage 06 audit

## Scope and lineage

- Parent: `codex/game-c12-ba-trieu-stage05-full-production` @ `540e58da1272b3e0edc4855974b4e0dcec6c5439`
- Branch: `codex/game-c13-ba-trieu-stage06-full-production`
- Scope: productionize only `bt-06-khuc-ca-nui-tung`; Stages 01–05 remain locked.

## Contract verification

- Identity `chapter-ba-trieu-248` / `bt-06-khuc-ca-nui-tung` / `map-bt-nui-tung`: PASS.
- Exactly 28 unique waves and 653 enemies: PASS.
- Generic `wu-field-commander` only on Wave 28: PASS.
- Stage 06 timing isolated at 600/1000/1550/2150ms with 750/875/1075/1450ms intervals: PASS.
- Dedicated 1024×768, 12×10 mountain map, bounded fixed path and ten placements: PASS.
- Terrain is presentation-only: PASS.
- Historical source layering is explicit: T1 suppression in 248 and Lục Dận survives; T2 records Bà Triệu tử trận; T3/local tradition associates Núi Tùng and tuẫn tiết: PASS.
- Final victory is a mechanical Last Stand completion, not military victory; no Lục Dận death/boss or graphic death mechanic: PASS.
- Reward remains **35 Gold / 2 KNB / 20 Anh Hồn**, with no first-clear package: PASS.
- BT05 → BT06 unlock and BT06 → completed chapter semantics: PASS.
- C08–C12 dedicated contracts retained: PASS.

## Automated verification

- `npm test`: PASS — **43 files / 291 tests**.
- `npm run build`: PASS.
- `git diff --check`: PASS.

## Manual and visual gates

- Full 28-wave manual clear: **PASS** — local QA save completed HBT and BT01–BT05, verified BT06 available and chapter incomplete, entered the pre-battle flow, deployed three fallback Heroes, enabled x3 and Auto Wave, completed all 28 waves with 653 defeated and 0 escaped, and confirmed the final historical epilogue. Replay remains available.
- Runtime evidence: **PASS** — real Wave 10 gameplay screenshot with Khúc Ca Núi Tùng, dedicated map, three deployed fallback Heroes, active enemies, HUD, x3 and Auto Wave.
- Runtime evidence file: `docs/audits/evidence/game-c13/01-stage06-runtime.png`.
- Ending evidence: **PASS** — real result screen showing Stage 06 victory, Wave 28/28, 653 defeated, 0 escaped, rewards and source-layered historical ending.
- Ending evidence file: `docs/audits/evidence/game-c13/02-stage06-ending.png`.
- Hero production art: PENDING.
- Wu enemy walk art: PENDING; primitive fallback remains authoritative.

## Classification

**GAME-C13: READY_FOR_AUDIT** — final-stage code/data, automated regression, full 28-wave manual clear and both visual evidence gates pass. Hero/Wu production art remains pending.
