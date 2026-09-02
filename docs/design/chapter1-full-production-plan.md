# Chapter I — Hai Bà Trưng Full Production Blueprint

This document is a production blueprint, not runtime content. Only `hbt-lang-bac-stage-01` is currently production data. Candidate stages below must pass a future research/content gate before implementation.

## Design boundaries

The historical frame is the 42–43 CE resistance against Mã Viện, with Lãng Bạc and Cẩm Khê preserved as source-supported campaign locations. Exact geography, sequencing and battle details remain debated. Maps and victories therefore represent bounded gameplay reconstructions: a tactical objective is completed, while the known historical outcome is not rewritten. No candidate below adds new runtime IDs, waves, rewards, or assets in GAME-C16.

## Recommended shape

Six stages are recommended as a planning target because they cover an understandable arc (opening defense, retreat/pressure, final resistance, closure) without forcing a single disputed chronology. The final count is **OPEN** until evidence and product review.

| Candidate ID | Title | Period / location | Evidence tier | Gameplay reconstruction boundary | Safe victory semantics | Final historical outcome implication | Map identity | Enemy mix | Wave neighborhood |
|---|---|---|---|---|---|---|---|---|---|
| `hbt-lang-bac-stage-01` | Huyết Chiến Lãng Bạc | 42 CE; Lãng Bạc (exact site uncertain) | Strong campaign event evidence | Fixed-path marsh defense of a threatened line | Hold the line for this engagement | Tactical hold only; campaign continues | `map-lang-bac-marsh` | Han sword, crossbow, armored, Mã Viện | Existing 24-wave production neighborhood |
| `hbt-cam-khe-stage-02` | Phòng Tuyến Cẩm Khê | 42–43 CE; Cẩm Khê (site debated) | Strong event evidence; geography uncertain | Rearguard defense and controlled retreat | Preserve the retreat route | Does not claim a strategic defeat of Mã Viện | `map-cam-khe-frontier` | Han mixed formation plus commander pressure | 20–24 waves |
| `hbt-me-linh-stage-03` | Doanh Lũy Mê Linh | 42–43 CE; Mê Linh | Source-supported capital/base context | Abstract perimeter defense around a civic stronghold | Keep the perimeter intact for the night | No claim that the historical capital remained secure | `map-me-linh-rampart` | Han sword, crossbow, armored | 18–22 waves |
| `hbt-lac-viet-river-crossing-stage-04` | Hành Lang Thủy Bộ | 42–43 CE; river/wetland corridor | Campaign conditions supported; exact battle not fixed | Guard a crossing and protect civilian movement | Escort the crossing window | Tactical evacuation/holding action only | `map-lac-viet-river-corridor` | Han sword, crossbow, armored | 20–24 waves |
| `hbt-cam-khe-last-line-stage-05` | Tuyến Cuối Cẩm Khê | 43 CE; Cẩm Khê | Resistance endpoint supported; details uncertain | Last-line fixed-path defense under pressure | Delay the advance and preserve the legacy | Does not change the documented campaign result | `map-cam-khe-last-line` | Han mixed formation, commander pressure | 22–26 waves |
| `hbt-chapter-closure-stage-06` | Khói Lửa Khép Lại | 43 CE; campaign closure, not one asserted battle | Closure synthesis; low-to-medium specificity | Protect survivors, symbols and an evacuation route | Complete the closure objective | Explicitly preserves the historical outcome | `map-hbt-campaign-closure` | Han mixed formation | 18–22 waves |

## Stage contract for future implementation

Each approved stage must provide: stable ID, Vietnamese display name, map definition, fixed-path waves, allowed Hero IDs, enemy definition IDs, narrative pre-battle/wave beats/victory/defeat, ordinary reward and first-clear idempotency. The stage must remain selectable through the production campaign catalog and must not put Economy or Meta state into the battle definition.

## Unlock and replay intent

Stages should unlock in an ordered Chapter I chain after a completed predecessor. Replay of a completed stage enters directly, preserves the first-clear timestamp/reward, and may repeat ordinary clear rewards according to the shared reward source rules. A stage with no playable/unlocked option must resolve to `undefined`, never to another chapter's stage.

## Implementation sequence

1. Research/content gate and ID approval (GAME-C17).
2. Registry/schema tests with a two-chapter fixture, then Stage 02/03 runtime slices (GAME-C18).
3. Stage 04/05 maps, waves and narratives (GAME-C19).
4. Closure stage and full chapter completion/replay semantics (GAME-C20).
5. Equipment/UI and journey hardening (GAME-C21/C22).
6. Full browser, save/reload, reward and asset lock (GAME-C23).

All candidate maps, enemies and wave counts remain proposals until their individual production tasks are approved.
