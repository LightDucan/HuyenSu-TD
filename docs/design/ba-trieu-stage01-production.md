# Bà Triệu Stage 01 — Production Contract

## Identity and historical boundary

- Stage ID: `bt-01-tu-nghia-nui-nua`
- Display name: **Tụ Nghĩa Núi Nưa**
- Period: 248 CE, Cửu Chân / Thanh Hóa region
- Opposition: Đông Ngô
- Confidence: **LOCAL TRADITION / RECONSTRUCTION**
- Source reference: `antigravity/vs-ba-trieu-c01-history` @ `5f5c79e`

This stage is a **Production Reconstruction / Gameplay Reconstruction** inspired by the later local tradition associating the uprising with Núi Nưa. It does not claim that the exact layout, troop count, attack sequence, fortification or generic field commander is securely documented history. No real named commander is killed or defeated here.

## Production role

Stage 01 introduces the Bà Triệu chapter identity after the player has completed HBT Stage 01. It reuses learned deployment, speed, Auto Wave and equipment-lock systems without replaying the full tutorial chain. The target first-clear duration is approximately 12–18 minutes at x1, with x3 and Auto reducing practical session time.

## Four acts and 18 waves

| Act | Waves | Purpose |
|---|---:|---|
| I — Tập Hợp | 1–4 | Establish sword pressure and introduce crossbows. |
| II — Giữ Căn Cứ | 5–9 | Mix armored and ranged pressure around the first choke. |
| III — Sức Ép Đông Ngô | 10–14 | Sustain larger mixed formations. |
| IV — Đẩy Lùi Đợt Trấn Áp | 15–18 | Climax with a generic composite field commander. |

Wave IDs are exactly `bt-01-wave-01` through `bt-01-wave-18`. Wave 18 contains the only `wu-field-commander` in this stage. Spawn intervals remain within the locked per-archetype timing ranges and group offsets remain at or below 2400ms.

## Dedicated map

`map-bt-nui-nua` is a 1024×768, 12×10 production map with a single non-intersecting nine-segment earth route. Its route alternates between foothill lanes, a central tactical choke and a longer firing lane; it is visibly distinct from Lãng Bạc.

Ten placement tiles intentionally mix choke, long-range, central, flank and situational positions. Forest, hill, earthwork, camp, barrier, rock and reed zones are visual-only rectangles using the shared terrain contract. They provide no buffs, movement changes, elevation logic or pathfinding.

## Narrative

The generic stage narrative contract provides:

- pre-battle reconstruction/local-tradition framing;
- short Wave 1, 6, 12 and 18 beats;
- a victory that pushes back only the immediate suppressing force;
- a tactical defeat that asks the player to regroup.

No text claims that the whole Đông Ngô war is won or that Bà Triệu dies in Stage 01.

## Scope boundary

Stages 02–06 remain three-wave prototypes. No economy, combat math, save schema, terrain mechanics or Hero-specific combat code was added. Bà Triệu Hero production art and Wu enemy walk PNGs remain separate external asset gates; runtime uses the existing safe fallback.
