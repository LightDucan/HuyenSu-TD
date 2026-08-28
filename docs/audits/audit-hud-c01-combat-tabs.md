# Audit HUD-C01 — Combat HUD Tab System & State Cleanup

## Kết luận

**DONE — waiting audit.** `ĐỘI HÌNH` and `HÀNH TRANG` now live inside one bottom Combat HUD container. Switching presentation tabs does not recreate Battle ownership or copy combat truth into React.

## Acceptance Gate

| Gate | Result | Evidence |
|---|---|---|
| `ĐỘI HÌNH ↔ HÀNH TRANG` | PASS | One `meta-content-region` owns both tab buttons; roster and inventory are mutually exclusive. |
| Battlefield does not reset | PASS | Phaser canvas stays outside conditional tab content; interactive switch retained Wave 1/10, deployment 1/6, energy 60/60, x1 and the placed Hero. |
| Combat controls persistent | PASS | Quân Lệnh, deployment count, Start, Auto, x1/x3, Range and Hero Detail remained present in both tabs. |
| Wave progress header-only | PASS | `Đợt X/Y` and enemy remaining stay in `TopCityBar`; `BottomPlayerHUD` has no Wave-progress duplicate. |
| Equip/Unequip Wave lock | PASS | UI disables Lắp/Gỡ and the App handler independently rejects those operations when `waveStatus === running`; waiting/won unlock. Inventory remains readable and merge behavior is unchanged. |
| Selected Hero range | PASS | Range resolution requires the placed Hero to equal `selectedHeroId`; changing selection hides the old range. Move intent previews only the active Hero and exposes placement markers only while an action is pending. |
| State preservation | PASS | Focused test retains selected Hero, placement/Wave snapshot, x3, Auto, Wallet and Command Energy across a presentation tab change. |

## Interactive verification

Production preview was exercised in one Battle session:

1. Placed Trưng Trắc, enabled selected range and captured `ĐỘI HÌNH`.
2. Switched directly to `HÀNH TRANG` without reload and captured the second tab.
3. Final screenshot pair retained identical Wave `1/10`, deployment `1/6`, Command Energy `59/60`, speed `x1`, and exactly one canvas before/after the tab switch.
4. Started the Wave while Inventory remained open; Command Energy changed `60 → 59`, persistent controls remained visible, and the combat-lock notice appeared.
5. Browser console contained no uncaught error.

Evidence:

- [ĐỘI HÌNH](evidence/hud-c01/roster-tab.png)
- [HÀNH TRANG](evidence/hud-c01/inventory-tab.png)

## Verification

- `npm test`: **PASS — 27 files / 201 tests**.
- `npm run build`: **PASS**.
- `npm run preview`: **PASS**, interactive checks completed.
- `git diff --check`: **PASS**.

No Equipment redesign, Progression, Economy, combat rule, map geometry, Meta schema or approved HBT art was changed.
