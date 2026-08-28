# Audit VIS-HUD-01 — Playable HUD/UI Polish + Selection Safety

## Kết luận

**DONE — waiting audit.** Battle HUD Hai Bà Trưng now fits a supported desktop viewport without page-level scrolling, keeps the battlefield dominant, and no longer lets a stale Hero selection move a Hero on a later tile click.

## Thay đổi đã xác minh

- Main shell uses `100dvh`, bounded grid rows, `minmax()` and `clamp()`; top HUD, hint and controls are compact.
- The Phaser runtime remains 1024×768. CSS centers and fits its canvas without changing map geometry or placement coordinates.
- `ĐỘI HÌNH` and `HÀNH TRANG` are a real contextual switch. Inventory replaces the deck and receives its own bounded vertical scroll; global battle controls remain available.
- Active deck contains exactly `trung-trac`, `trung-nhi`, and `le-chan`.
- One shared `HERO_RUNTIME_VISUAL_SIZE = 90` increases runtime Hero display from 72 to 90 pixels (+25%). The 12 approved PNG files were not modified.
- Global `TẦM ĐÁNH` defaults to OFF. ON displays all placed-Hero ranges. OFF permits only the Hero with an active move intent to preview its range. Range fill/stroke alpha was softened; gameplay Range values are unchanged.
- Placement/move intent is owned by the BattleBridge contract, not React combat state. A deployed Hero is selected without entering move mode; the explicit `DI CHUYỂN` action is required.
- Successful placement or move clears intent, target highlighting and instruction copy. Clicking empty grass cancels pending placement/move. A later tile click while neutral is a no-op.
- Neutral copy is `Sẵn sàng chiến đấu`; Hero-specific placement/move copy appears only while the corresponding intent is active.
- `BẮT ĐẦU WAVE`, `AUTO WAVE`, x1/x3, range and Hero detail remain in the compact control group.
- Production visual specification now locks Front View and removes ambiguous isometric wording.

## Interactive production-preview evidence

The in-app browser opened the Vite production preview and interacted with the real React and Phaser surfaces.

| Check | Result | Observed action/result |
|---|---|---|
| 1920×1080 | PASS | `body.scrollHeight === innerHeight`; battlefield and HUD fully bounded. |
| 1600×900 | PASS | No horizontal or vertical page scroll; canvas centered and HUD readable. |
| 1366×768 | PASS | No page scroll; canvas 707.75×530.81 inside the battle region; controls remained bounded. |
| Tab switch | PASS | Clicking `HÀNH TRANG` hid the Hero deck and displayed the internal-scroll Inventory region; `ĐỘI HÌNH` restored the deck. |
| Initial placement | PASS | Selected Trưng Trắc, clicked a real Phaser placement tile, observed deployment 0→1 and instruction return to neutral. |
| Later neutral tile click | PASS | A second tile click after placement kept neutral state and did not start a move. |
| Background cancel | PASS | Entered explicit move mode, clicked empty battlefield grass, and observed immediate return to `Sẵn sàng chiến đấu`. |
| Explicit move | PASS | Clicked `DI CHUYỂN`, selected another valid tile, retained one deployed Hero and returned to neutral. |
| Range toggle | PASS | OFF default observed; toggle changed to ON and published the visible pressed state without touching stats. |
| x1/x3 | PASS | Clicked x3 and observed the selected speed class; existing GameClock regression remains green. |
| Battle smoke | PASS | Started a Wave after placement; Quân Lệnh changed 60→59, start control disabled during the active Wave, and no console error was recorded. |

## Automated verification

- `npm test`: **PASS — 27 files / 199 tests**.
- `npm run build`: **PASS**.
- `npm run preview`: **PASS**, production preview served and was used for the interaction checks above.
- `git diff --check`: **PASS**.
- Browser console during battle smoke: **no uncaught error**.

Focused tests cover tab selection, range OFF/ON and move preview, placement/move completion, background cancellation boundary, later neutral tile safety, neutral instruction copy and the exact active HBT roster. Existing GameClock x1/x3, combat, Meta and economy tests remain green.

## Scope integrity and remaining debt

- No combat, Hero/Enemy stats, economy, Meta schema, map geometry or approved art was changed.
- **KNOWN DEBT — Equipment Runtime/UI Effect Integration:** equipping Weapon/Gem may not visibly change Hero stats/effects. This task did not modify Equipment formulas or runtime integration.
- Remaining QA is optional art-direction review on additional physical monitors; the required viewport and interaction checks were completed in the production preview.
