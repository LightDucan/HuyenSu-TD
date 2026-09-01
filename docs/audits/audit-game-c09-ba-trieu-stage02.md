# GAME-C09 — Bà Triệu Stage 02 Audit

## Baseline and scope

- Parent: `codex/game-c08-ba-trieu-stage01-full-production` @ `5a7f106`
- Branch: `codex/game-c09-ba-trieu-stage02-full-production`
- Historical reference: `antigravity/vs-ba-trieu-c01-history` @ `5f5c79e`
- Only `bt-02-cong-pha-thanh-ap` was productionized; Stages 03–06 remain three-wave prototypes.

## Contract verification

- Stable Chapter/Stage/map/theme/faction/roster IDs: PASS.
- Exactly 20 unique waves with the locked composition: PASS.
- Total enemy count: PASS — 268.
- Generic `wu-field-commander` only on Wave 20: PASS.
- Spawn intervals and group offsets within the production timing neighborhood: PASS.
- Dedicated 1024×768, 12×10 settlement map: PASS.
- Single non-intersecting ten-segment path and ten bounded placements: PASS.
- Visual-only settlement/earth/barrier/forest/rock/camp terrain: PASS.
- Pre-battle, Wave 1/7/14/20 beats, victory and defeat narrative: PASS.
- General city-attack history vs specific Tư Phố reconstruction distinction: PASS.
- Ordinary reward 22 Gold / 1 KNB / 10 Anh Hồn; no new first-clear package: PASS.
- HBT completion → Stage 01 → Stage 02 → Stage 03 progression: PASS.
- Wu visual fallback resolver and all HBT visual assets: PASS.
- C08 Stage 01 18-wave/map/narrative/reward and locked first-group timing regression: PASS.

## Automated verification

- `npm test`: PASS — 39 files / 258 tests.
- `npm run build`: PASS.
- `git diff --check`: PASS.

## Manual smoke

Classification: **PARTIAL / PENDING**. The preview loaded cleanly and the Bà Triệu Chapter was visible, but this QA save had not completed Stage 01, so Stage 02 correctly remained locked and could not be entered without first running the preceding stage. No manual Stage 02 claims are made; a later smoke should verify chapter selection, settlement map, fallback Hero deployment, Wave 1, x3, Auto and faction copy after Stage 01 completion.

## Asset gates

- HERO ASSET: PENDING — external art blocker.
- WU ENEMY ASSET: PENDING — no fake PNGs added; primitive fallback remains authoritative.

## Final classification

- CODE/RUNTIME: PASS
- TEST: PASS — 39 files / 258 tests
- HISTORICAL: PASS
- HERO ASSET: PENDING
- WU ENEMY ASSET: PENDING
- MANUAL: PARTIAL / PENDING
- GAME-C09: **CONDITIONAL PASS / READY_FOR_AUDIT**
