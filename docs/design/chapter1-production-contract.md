# Chapter I — Hai Bà Trưng Production Contract (GAME-C17)

**Status: LOCKED.** This contract is the authoritative production boundary for Chapter I. It is a design decision, not runtime implementation. GAME-C18 and later may implement it but may not change the IDs, ordering, counts, reward policy, or historical semantics below without a new product decision.

## Historical frame and confidence model

The chapter covers the Hai Bà Trưng resistance against Mã Viện in 42–43 CE. Lãng Bạc and Cẩm Khê are source-supported campaign references; exact geography, intermediate movements and tactical sequence remain uncertain. Every stage therefore declares a confidence layer:

- **CORE + terrain reconstruction:** source-supported event/location with game terrain interpretation.
- **COMPOSITE RECONSTRUCTION:** historically plausible campaign conditions combined without claiming one recorded battle.
- **CLOSURE SYNTHESIS:** a gameplay closure scenario, not a securely named historical battle.

Gameplay victory means the player completed that stage's tactical objective. It never rewrites the historical strategic outcome.

## Locked six-stage order

| Order | Stage ID | Vietnamese display name | Period / place | Layer | Map identity | Exact waves | Enemy policy | Safe outcome |
|---:|---|---|---|---|---|---:|---|---|
| 01 | `hbt-lang-bac-stage-01` | Huyết Chiến Lãng Bạc | 42 CE; Lãng Bạc, location debated | CORE + terrain reconstruction | `map-lang-bac-marsh` | 24 | Han sword, crossbow, armored; `boss-ma-vien` at Wave 24 | Hold this engagement; Mã Viện is driven off, not killed. |
| 02 | `hbt-lang-bac-stage-02` | Rút Tuyến Lãng Bạc | 42 CE; pressure on the Lãng Bạc line | COMPOSITE RECONSTRUCTION | `map-lang-bac-retreat-corridor` | 22 | Reuse Han sword/crossbow/armored; no boss | Protect an orderly withdrawal and secondary line; no claimed named battle. |
| 03 | `hbt-cam-khe-stage-03` | Phòng Tuyến Cẩm Khê | 42–43 CE; Cẩm Khê, site debated | CORE location/event + gameplay reconstruction | `map-cam-khe-defensive-line` | 24 | Reuse Han sword/crossbow/armored; no boss | Hold a defensive line for the engagement; no false strategic victory. |
| 04 | `hbt-thuy-bo-stage-04` | Hành Lang Thủy Bộ | 42–43 CE; river/wetland corridor | COMPOSITE RECONSTRUCTION | `map-thuy-bo-crossing` | 22 | Reuse Han sword/crossbow/armored; no boss | Protect movement of people, forces and supplies; not a documented named battle. |
| 05 | `hbt-cam-khe-stage-05` | Tuyến Cuối Cẩm Khê | 43 CE; Cẩm Khê campaign endpoint | CORE campaign endpoint + COMPOSITE RECONSTRUCTION | `map-cam-khe-last-line` | 26 | Han mixed pressure; no fabricated commander or mandatory boss | Delay the advance and preserve the resistance legacy; historical outcome unchanged. |
| 06 | `hbt-chapter-closure-stage-06` | Giữ Lửa Mê Linh | 43 CE; campaign closure | CLOSURE SYNTHESIS | `map-hbt-closure-rampart` | 28 | Reuse Han sword/crossbow/armored; no boss | Preserve survivors, an escape corridor and the legacy; communicate the historical conclusion safely. |

Stage 01 remains exactly the existing production stage: 24 waves, 292 scheduled enemies, Mã Viện on Wave 24, map `map-lang-bac-marsh`, and HBT Heroes `trung-trac`, `trung-nhi`, `le-chan`. No Stage 01 gameplay is redesigned here.

## Roster and enemy asset boundary

Chapter I uses only the three existing production HBT Hero IDs: `trung-trac`, `trung-nhi`, `le-chan`. Bát Nàn, Thánh Thiên, Thi Sách and other Heroes are future roster expansion, not C18 prerequisites. The only mandatory enemy IDs are the existing Han sword, crossbow, armored guard and Mã Viện definitions. No new Hero or enemy visual asset is mandatory for PLAYABLE-CH1. Hero Asset Production remains **SUSPENDED**; Bà Triệu assets are outside this contract.

All stages remain fixed-path Tower Defense maps. No A*, dynamic pathfinding, navmesh, naval combat, escort AI or interactive elephant subsystem is introduced.

## Mã Viện semantics

Mã Viện is the historical campaign commander. A zero-HP boss sprite means **driven off / tactically defeated / leaves the current battlefield**. It never means killed. Stage 06 must not depict his death or claim that Hai Bà permanently defeated the Han expedition.

## Reward contract

The ordinary clear reward for every Chapter I stage is the existing Balance V1 shared prototype-stage value: **20 Gold / 1 KNB / 10 Anh Hồn**. It is repeatable on replay. No global economy rebalance is part of C17.

The one-time first-clear policy is separate:

| Stage | Ordinary repeat clear | First-clear reward |
|---|---|---|
| Stage 01 | 20 / 1 / 10 | **100 Gold / 50 KNB / 100 Anh Hồn** (existing onboarding package; idempotent) |
| Stage 02 | 20 / 1 / 10 | **0 / 0 / 0 — no first-clear package / no config entry** |
| Stage 03 | 20 / 1 / 10 | **0 / 0 / 0 — no first-clear package / no config entry** |
| Stage 04 | 20 / 1 / 10 | **0 / 0 / 0 — no first-clear package / no config entry** |
| Stage 05 | 20 / 1 / 10 | **0 / 0 / 0 — no first-clear package / no config entry** |
| Stage 06 | 20 / 1 / 10 | **0 / 0 / 0 — no first-clear package / no config entry** |

The zero rows are explicit “ordinary-only” policy, not an omitted decision. The reward validator applies to configured first-clear entries; future stages must not add an all-zero entry. Stage 01's stable key remains `reward/stage-first-clear/hbt-lang-bac-stage-01`.

## Progression, completion and Chapter II gate

The order is strict: Stage 01 → Stage 02 → Stage 03 → Stage 04 → Stage 05 → Stage 06. Each next stage unlocks only after its predecessor is completed. Completed stages remain replayable; replay does not relock later stages and first-clear remains idempotent across save/reload.

After Stage 06 completion, Chapter I becomes **Đã hoàn thành** and Chapter II (`chapter-ii-ba-trieu`) becomes **Sẵn sàng**. The future prerequisite is locked as:

`prerequisiteStageId = hbt-chapter-closure-stage-06`

Victory on a non-final stage shows results, persists completion, unlocks the next stage and may offer a next-stage CTA. Victory on Stage 06 shows the final historical epilogue and keeps Stage 06 replayable. If a selected chapter has no valid playable stage, selected stage is `undefined`; never borrow `productionCampaignCatalog.chapters[0].stages[0]` from another chapter.

## Equipment debt classification

- Equipment domain: **PASS**.
- Equipment Battle runtime stat application: **PASS**.
- Equipment UI / Hero selection / Meta synchronization: **BROKEN — P1**, carried from C16 and scheduled for GAME-C21/C22.

