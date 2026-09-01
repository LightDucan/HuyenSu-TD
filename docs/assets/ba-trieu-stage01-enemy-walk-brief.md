# Bà Triệu Stage 01 — Wu Enemy Walk Asset Brief

## Status

**WU ENEMY ASSET GATE: PENDING.** No fake PNGs are bundled by GAME-C08. Until approved art exists, every Wu enemy uses the safe primitive fallback and battle gameplay remains functional.

## Required future files

- `src/assets/enemies/wu-sword-infantry/walk.png`
- `src/assets/enemies/wu-crossbow-soldier/walk.png`
- `src/assets/enemies/wu-armored-guard/walk.png`
- `src/assets/enemies/wu-field-commander/walk.png`

## Locked sheet contract

- 1024×128 PNG
- 8 horizontal frames
- 128×128 per frame
- RGBA transparent background
- character faces right
- stable ground baseline across all frames
- runtime uses `flipX` for left-facing movement

The generic production enemy visual manifest exposes all four IDs even while `walkUrl` is absent. Missing files must never throw during module initialization, preload or spawn. The generic `wu-field-commander` is a gameplay composite and must not be given a real historical commander identity.

## Regression boundary

The existing HBT sheets and IDs remain unchanged:

- `han-sword-infantry`
- `han-crossbow-soldier`
- `han-armored-guard`
- `boss-ma-vien`

All four continue to resolve their approved production walk sheets through the same resolver.
