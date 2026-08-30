# GAME-C02 — Stage Runtime Foundation Audit

## Scope

- Stage-aware journey re-entry and fresh battle snapshots.
- Generic `BattleMapDefinition` and stage-driven Phaser runtime.
- Stage-aware deployment capacity and allowed-hero intersection.
- No changes to combat math, save schema, economy, or content roster.

## Verification

- Baseline: 28 files / 203 tests passed.
- Final automated suite: 29 files / 204 tests passed.
- `npm run build`: PASS.
- `git diff --check`: PASS.
- Interactive smoke: production preview verification pending after branch publish; no manual PASS claimed here.

## Findings

Fresh `pending-*` snapshots are created on every City/Campaign → Battle entry and Retry, preventing terminal snapshot bounce. `BattleScene` and Phaser dimensions consume the selected stage contract; Huyền Sử/Hai Bà Trưng remains the default stage.
