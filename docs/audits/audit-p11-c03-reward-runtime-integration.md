# Audit P11-C03 — Reward Runtime Integration

## Result

PASS — ready for integration audit. The branch is not merged to `main`.

## Runtime flow

`Battle/Browser event → RewardSourceService → RewardTransaction → LocalMetaRepository`

- Phaser reports immutable enemy-defeated and stage-victory events through `BattleBridge`; it never mutates Wallet.
- A runtime controller owns Reward Source calls outside React and Phaser.
- Active play uses `Date.now()` wall-clock deltas through a standalone tracker; Battle `GameClock` and x1/x3 are not inputs.
- Hidden time remains configurable through `visible-only` or `count-hidden`.
- Prototype reward amounts live in data config and remain tuning values, not runtime hardcodes.

## Idempotency and persistence

- Enemy reward key: run ID + unique enemy instance ID.
- Stage reward key: run ID.
- Active play uses Meta V3 cumulative visible/hidden checkpoints plus interval remainder.
- Active checkpoint writes are atomic but do not accumulate unbounded reward receipts; kill/stage receipts remain persisted.
- V2→V3 migration is deterministic and invalid raw saves are preserved.

## Verification

- Duplicate enemy death: PASS — one Gold grant.
- Duplicate stage victory: PASS — one Gold/KNB grant.
- Real clock at Battle x3: PASS — no acceleration.
- `visible-only` and `count-hidden`: PASS.
- Ten-wave playable domain smoke: PASS.
- `npm test`: PASS (71/71).
- `npm run build`: PASS.
- `npm run preview -- --host 127.0.0.1`: PASS (HTTP 200).
- `git diff --check`: PASS.

## Scope audit

- No Gacha, Quân Lệnh, Shop, Equipment V2, or Hero Recruitment implementation.
- No dependency added and no file deleted.
- React and Phaser do not own Wallet truth.
