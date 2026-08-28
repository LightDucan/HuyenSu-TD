# VS-HBT-V01 — Production HBT Visual Asset Gate

## Status

FINAL AUDIT PASS — 12 production HBT binaries integrated on the V02B branch; runtime remains safe through the same fallback boundary.

## Asset checklist

| EXPECTED PATH | STATUS |
|---|---|
| `src/assets/portraits/trung-trac.png` | PRESENT |
| `src/assets/heroes/trung-trac/idle.png` | PRESENT |
| `src/assets/heroes/trung-trac/attack.png` | PRESENT |
| `src/assets/vfx/trong-dong-lenh-vuong.png` | PRESENT |
| `src/assets/portraits/trung-nhi.png` | PRESENT |
| `src/assets/heroes/trung-nhi/idle.png` | PRESENT |
| `src/assets/heroes/trung-nhi/attack.png` | PRESENT |
| `src/assets/vfx/lien-hoan-lac-tien.png` | PRESENT |
| `src/assets/portraits/le-chan.png` | PRESENT |
| `src/assets/heroes/le-chan/idle.png` | PRESENT |
| `src/assets/heroes/le-chan/attack.png` | PRESENT |
| `src/assets/vfx/song-trao-hai-tan.png` | PRESENT |

## Runtime contract

The canonical manifest is `haiBaTrungHeroVisuals` / `resolveHaiBaTrungHeroVisual`. It covers exactly `trung-trac`, `trung-nhi` and `le-chan`, with the matching shared skill VFX IDs. The injectable lookup resolves each canonical path independently, so a later PNG is picked up by Vite without Hero-specific BattleScene changes. Missing portrait/idle/attack assets remain safe through initials/neutral fallback; missing VFX skips only the image effect while skill resolution continues. No HBT visual falls back to a Tam Quốc asset.

Supplied PNG metadata can be checked by the lightweight validator: PNG signature, 128×128 dimensions and alpha-capable color type. Front View and baseline Y=112 remain manual art acceptance rules. Existing x1/x3 visual timing, attack swap and reposition runtime behavior are unchanged.
