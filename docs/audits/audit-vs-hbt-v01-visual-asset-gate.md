# VS-HBT-V01 — Production HBT Visual Asset Gate

## Status

DONE — waiting audit. No HBT binary art is currently supplied; runtime remains safe and ready for automatic pickup when canonical files arrive.

## Asset checklist

| EXPECTED PATH | STATUS |
|---|---|
| `src/assets/portraits/trung-trac.png` | MISSING |
| `src/assets/heroes/trung-trac/idle.png` | MISSING |
| `src/assets/heroes/trung-trac/attack.png` | MISSING |
| `src/assets/vfx/trong-dong-lenh-vuong.png` | MISSING |
| `src/assets/portraits/trung-nhi.png` | MISSING |
| `src/assets/heroes/trung-nhi/idle.png` | MISSING |
| `src/assets/heroes/trung-nhi/attack.png` | MISSING |
| `src/assets/vfx/lien-hoan-lac-tien.png` | MISSING |
| `src/assets/portraits/le-chan.png` | MISSING |
| `src/assets/heroes/le-chan/idle.png` | MISSING |
| `src/assets/heroes/le-chan/attack.png` | MISSING |
| `src/assets/vfx/song-trao-hai-tan.png` | MISSING |

## Runtime contract

The canonical manifest is `haiBaTrungHeroVisuals` / `resolveHaiBaTrungHeroVisual`. It covers exactly `trung-trac`, `trung-nhi` and `le-chan`, with the matching shared skill VFX IDs. The injectable lookup resolves each canonical path independently, so a later PNG is picked up by Vite without Hero-specific BattleScene changes. Missing portrait/idle/attack assets remain safe through initials/neutral fallback; missing VFX skips only the image effect while skill resolution continues. No HBT visual falls back to a Tam Quốc asset.

Supplied PNG metadata can be checked by the lightweight validator: PNG signature, 128×128 dimensions and alpha-capable color type. Front View and baseline Y=112 remain manual art acceptance rules. Existing x1/x3 visual timing, attack swap and reposition runtime behavior are unchanged.

