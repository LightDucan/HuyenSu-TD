# GAME-C02 — Stage Runtime Foundation Audit

## Scope

- Stage-aware journey re-entry and fresh battle snapshots.
- Generic `BattleMapDefinition` and stage-driven Phaser runtime.
- Stage-aware deployment capacity and allowed-hero intersection.
- No changes to combat math, save schema, economy, or content roster.

## Verification

- Baseline: 28 files / 203 tests passed.
- Final automated suite: 30 files / 206 tests passed.
- `npm run build`: PASS.
- `git diff --check`: PASS.
- Interactive smoke: PARTIAL. Production preview verified City → Campaign → Battle, fresh stage snapshot, 0/6 capacity, Hero placement (1/6), Wave start, second Battle entry and zero console errors. Full Result/Retry loop and Equip/Unequip lock could not be completed with the current save (no equipment instances and no practical fast-forward control), so those rows remain BLOCKED rather than claimed PASS.

Evidence captured:

- `docs/audits/evidence/game-c02/city-after-result.png` (City shell snapshot)
- `docs/audits/evidence/game-c02/battle-second-entry.png` (Battle entry)
- `docs/audits/evidence/game-c02/battle-running-lock.png` (Wave running HUD)

## Findings

Fresh `pending-*` snapshots are created on every City/Campaign → Battle entry and Retry, preventing terminal snapshot bounce. `BattleScene` and Phaser dimensions consume the selected stage contract; Huyền Sử/Hai Bà Trưng remains the default stage.
