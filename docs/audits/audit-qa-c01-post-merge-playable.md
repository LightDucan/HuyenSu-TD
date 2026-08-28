# QA-C01 — Post-Merge Meta Playable Gate

## Result

**QA-C01A — interactive smoke recorded.** Baseline `origin/main` is `fce54ab`. Automated integration remains green; browser actions below are recorded exactly and are not overstated.

## Flow report

| Flow | Status | Evidence |
|---|---|---|
| Fresh Meta V5 profile, Gold/KNB wallet, Energy 60 | BLOCKED | Preview rendered with wallet/energy HUD; clearing local storage is not permitted by browser safety boundary, so a fresh-save reset was not claimed |
| 10-wave placement/combat lifecycle and Energy spend | BLOCKED | Hero selector and Battle canvas were visible; coordinate interaction did not place a Hero, so Wave button remained disabled |
| Reward sources, live snapshot and idempotency | PASS | Covered by automated reward runtime tests; not claimed as manual UI PASS |
| x1/x3 economy parity | PASS | Runtime/simulation parity tests |
| Gacha, shop, consumables, equipment, recruitment, stars, evolution | BLOCKED | No controlled QA wallet/profile setup was available in the interactive session |
| Save/reload and V1→V5 migration safety | PASS | Repository migration tests; browser reload persistence not claimed manually |
| Production preview smoke | PASS | Vite preview HTTP 200; visible DOM rendered; console had no error/warn entries |

## Verification

- `npm test`: 173 tests passed.
- `npm run build`: passed (existing >500 kB chunk warning only).
- `npm run preview`: HTTP 200.
- `git diff --check`: passed.
- No new economy system, Meta V5 redesign, or Vietnam roster migration introduced.

Interactive actions performed: opened `http://127.0.0.1:4173/`; inspected visible HUD and five Hero selector cards; selected Quan Vũ; attempted placement on a visible placement tile; verified no console errors. Placement did not register in this browser viewport, so downstream battle/economy UI flows are **BLOCKED**, not falsely marked PASS. No source fix was made.
