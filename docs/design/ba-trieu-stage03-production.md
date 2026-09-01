# Bà Triệu — Stage 03: Bến Sông Mã

## Production identity

- Chapter: `chapter-ba-trieu-248` (Bà Triệu, 248 CE)
- Stage: `bt-03-ben-song-ma`
- Display name: **Bến Sông Mã**
- Map: `map-bt-song-ma`, theme `song-ma-riverbank`
- Faction: Đông Ngô
- Historical confidence: **COMPOSITE RECONSTRUCTION**
- Allowed production heroes: `ba-trieu`, `trieu-quoc-dat`, `dinh-boi`

The stage is a gameplay reconstruction of a riverbank reinforcement corridor. It does not assert a named naval operation or a specific commander identity. Enemy behavior remains the shared fixed-path battle system; there is no boat, naval, A* or dynamic-path mechanic.

## Battle content

Stage 03 contains exactly 22 waves (`bt-03-wave-01` through `bt-03-wave-22`) and 355 enemies. Waves use the shared Đông Ngô enemy definitions: sword infantry, crossbow soldier, armored guard and one generic field commander on Wave 22 only. The composition is data-owned in `src/data/waves/baTrieuWaves.ts`.

Spawn timing is isolated from the locked Stage 01 and Stage 02 helpers. Stage 03 uses first-group delay 600ms, additional offsets 1100/1700/2300ms, and intervals of 825ms (sword), 950ms (crossbow), 1250ms (armored) and 1600ms (commander).

## Map and visual language

The dedicated 1024×768, 12×10 map has one fixed, axis-aligned 11-segment path and ten unique bounded placement tiles. Water, reeds, mud, earth, forest, rock and camp are visual-only terrain decorations. They do not block placement or alter pathing.

## Narrative and outcomes

The pre-battle copy identifies the scene as a composite reconstruction. Lightweight narrative beats appear at Waves 1, 8, 15 and 22, with data-driven victory and defeat copy. Victory means the immediate reinforcement corridor is held temporarily; it is not a claim that all Đông Ngô forces were defeated.

## Rewards and scope

The ordinary Stage 03 clear reward is 24 Gold, 1 KNB and 10 Anh Hồn. No first-clear package is added. Progression unlocks Stage 03 after Stage 02 completion and leaves Stage 04–06 as three-wave prototypes. Existing Stage 01/02 gameplay, rewards, timing and visual fallback contracts remain unchanged.
