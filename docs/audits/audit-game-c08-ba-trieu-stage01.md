# GAME-C08 — Bà Triệu Stage 01 Audit

## Baseline and scope

- Parent: `production/hbt-stage01-locked` @ `204443ef`
- Branch: `codex/game-c08-ba-trieu-stage01-full-production`
- Historical reference: `antigravity/vs-ba-trieu-c01-history` @ `5f5c79e`
- Only `bt-01-tu-nghia-nui-nua` was productionized; Stages 02–06 remain three-wave prototypes.

## Contract verification

- Stable Chapter/Stage/map/roster IDs: PASS.
- Exactly 18 unique waves with the locked composition: PASS.
- Generic `wu-field-commander` only on Wave 18: PASS.
- Dedicated 1024×768, 12×10 Núi Nưa map: PASS.
- Single non-intersecting nine-segment path and ten bounded placements: PASS.
- Visual-only terrain decorations: PASS.
- Pre-battle, Wave 1/6/12/18 beats, victory and defeat narrative: PASS.
- LOCAL TRADITION / RECONSTRUCTION language and safe historical outcome: PASS.
- Ordinary reward 20 Gold / 1 KNB / 10 Anh Hồn, no new first-clear package: PASS.
- HBT prerequisite and Stage 02 unlock behavior: PASS.
- Generic Wu visual contracts with safe primitive fallback: PASS.
- HBT visual resolver regression: PASS.
- Enemy counter labels derive from the active Chapter faction; Bà Triệu displays Đông Ngô rather than stale Đông Hán copy: PASS.

## Automated verification

- `npm test`: PASS — 38 files / 249 tests.
- `npm run build`: PASS.
- `git diff --check`: PASS.

## Practical browser smoke

PASS for the minimum C08 checkpoint:

- existing completed HBT state unlocked the Bà Triệu chapter;
- Stage 01 showed 18 waves and reconstruction-safe pre-battle text;
- a Bà Triệu roster Hero rendered via initials/fallback and deployed on the dedicated map;
- x3 and Auto Wave ran successfully;
- Wave progression advanced naturally from Wave 1 to Wave 3;
- Wave 1 narrative beat appeared;
- Gold, Command Energy and enemy counters updated live;
- browser console reported no warnings or errors.

A full 18-wave manual clear was not required and was not claimed at this first code checkpoint.

## Final classification

- CODE/RUNTIME: PASS
- TEST: PASS — 38 files / 249 tests
- HERO ASSET: PENDING — EXTERNAL ART BLOCKER
- WU ENEMY ASSET: PENDING
- MANUAL: PASS — minimum practical smoke; no full-clear claim
- GAME-C08: **CONDITIONAL PASS / READY_FOR_AUDIT**
