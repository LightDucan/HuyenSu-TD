# VS-HBT-V02B — Real Hai Bà Trưng Asset Integration Audit

## Result

PASS — all 12 approved production PNGs are integrated at their canonical paths. No art was regenerated or modified; the source package was extracted without ZIP, preview sheet or source-sheet files.

## Binary contract

All 12 files are valid PNG, 128×128, alpha-capable and non-empty. Automated tests scan the actual repository binaries and verify signature, dimensions and alpha-capable color type. Visual inspection found transparent margins, visible content and no obvious canvas clipping; idle feet are approximately aligned to the Y=112 baseline. Front-view readability and exact baseline remain manual acceptance checks.

## Canonical mapping

| Hero | Portrait | Idle | Attack | Skill VFX |
|---|---|---|---|---|
| `trung-trac` | `portraits/trung-trac.png` | `heroes/trung-trac/idle.png` | `heroes/trung-trac/attack.png` | `vfx/trong-dong-lenh-vuong.png` |
| `trung-nhi` | `portraits/trung-nhi.png` | `heroes/trung-nhi/idle.png` | `heroes/trung-nhi/attack.png` | `vfx/lien-hoan-lac-tien.png` |
| `le-chan` | `portraits/le-chan.png` | `heroes/le-chan/idle.png` | `heroes/le-chan/attack.png` | `vfx/song-trao-hai-tan.png` |

Production uses the existing `haiBaTrungHeroVisuals` / `resolveHaiBaTrungHeroVisual` manifest. The active boundary contains exactly three HBT IDs; no resolver path falls back to Quan Vũ or another Tam Quốc asset. Portrait UI, idle/attack swap, VFX rendering and x1/x3 duration scaling remain unchanged. VFX remains visual-only; shared SkillResolver owns gameplay effects.

No shared display-size normalization was needed: existing 72×72 Hero display and 96×96 VFX display are retained. Remaining debt is manual interactive browser verification of placement/attack/VFX in the local preview environment.

Verification: 26 test files / 191 tests PASS, production build PASS, preview HTTP 200, `git diff --check` PASS.
