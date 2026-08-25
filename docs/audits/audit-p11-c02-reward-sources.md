# Audit P11-C02 — Reward Sources

## Scope

Implemented a domain-only reward source boundary over the P11-C01 atomic transaction repository. It supports configured Enemy Kill Gold, Stage Clear Gold/KNB, and Active Play Time KNB based on real wall-clock duration.

## Invariants checked

- Kill keys are `reward/kill/<runId>/<enemyInstanceId>`; duplicate death events are idempotent.
- Stage Clear keys are `reward/stage-clear/<runId>`; a run cannot claim twice.
- Active Play Time accepts wall-clock durations only and has no Battle GameClock dependency, so x3 cannot accelerate it.
- Amounts are supplied by configuration; no production reward amounts are hardcoded.
- Hidden-tab policy remains open through explicit `visible-only` and `count-hidden` configuration.
- P11-C01 persistence, atomicity, optimistic revision, and wallet boundaries remain the source of truth.
- No UI, Battle, Phaser, Gacha, Quân Lệnh, Shop, Equipment V2, or Hero Recruitment code was added.

## Verification

- `npm test` — PASS (58/58 tests)
- `npm run build` — PASS
- `npm run preview -- --host 127.0.0.1` — PASS (HTTP 200)
- `git diff --check` — PASS

## Files

- Added `src/domain/meta/RewardSources.ts`.
- Added `tests/unit/RewardSources.test.ts`.
- Updated `docs/PROJECT_PLAN.md`.

No files deleted and no dependencies added.
