# GAME-C10 — Bà Triệu Stage 03 audit

## Scope and lineage

- Parent: `codex/game-c09-fix1-c08-regression` @ `27774041f984d377763d4c8afd17c8a6a09e19c1`
- Branch: `codex/game-c10-ba-trieu-stage03-full-production`
- Historical reference: `antigravity/vs-ba-trieu-c01-history` @ `5f5c79eaf2947a2061da66557409cd4fe2221afe`
- Scope: productionize only `bt-03-ben-song-ma`; no main merge and no C11 work.

## Contract checks

- Stable Chapter/Stage/map/theme/faction/roster identity: PASS.
- Exactly 22 unique waves and 355 enemies: PASS.
- Generic commander only on Wave 22: PASS.
- Stage 03 timing isolated (600ms first group; 1100/1700/2300 offsets; bounded intervals): PASS.
- Dedicated 1024×768 map, axis-aligned fixed path and ten placements: PASS.
- Visual-only riverbank terrain decorations: PASS.
- Composite-reconstruction narrative and beats 1/8/15/22: PASS.
- Ordinary reward 24 Gold / 1 KNB / 10 Anh Hồn; no first-clear package: PASS.
- HBT → Stage 01 → Stage 02 → Stage 03 → Stage 04 progression: PASS.
- Stage 01 and Stage 02 timing/content regressions remain protected by their dedicated tests: PASS.
- Existing HBT/Wu visual resolver boundary remains unchanged: PASS.

## Automated verification

The final verification was run from the C10 branch after the Stage 03 tests were added.

- `npm test`: PASS — **40 files / 267 tests**.
- `npm run build`: PASS.
- `npm run preview`: PASS — Vite preview served on an available local port (4174 because 4173 was occupied).
- `git diff --check`: PASS.

## Manual and asset gates

- Manual Stage 03 browser smoke: **PARTIAL / BLOCKED** unless a save with Stage 02 completion is available; no unperformed PASS is claimed.
- Hero art: **PENDING** where external production PNGs are not present.
- Wu enemy art: existing primitive fallback contract retained; no new art added in this task.

## Classification

**GAME-C10: READY_FOR_AUDIT** after the automated verification results are filled with the actual test count and all required checks pass.
