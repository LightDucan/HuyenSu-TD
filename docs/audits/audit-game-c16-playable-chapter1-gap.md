# GAME-C16 — Playable Chapter 1 Completion Audit

## Scope and baseline

- Branch: `codex/game-c16-playable-chapter1-gap-audit`
- Exact parent: `antigravity/vis-bt-02-fix2-period-safe-crossbow` @ `42dc6b4abe1468be1a8c725c9f701a843db050b7`
- This is an audit and production blueprint only. No `src/**`, `tests/**`, package, Vite, combat, balance, or save changes were made.
- Screenshots were captured from a fresh browser origin and are committed under `docs/audits/evidence/game-c16/`.

## Executive finding

Chapter I (`chapter-i-hai-ba-trung`) currently exposes **exactly one production stage**: `hbt-lang-bac-stage-01` — Huyết Chiến Lãng Bạc. It has 24 waves and is playable end-to-end. Chapter I is **not complete** as a campaign: there is no second production stage or chapter-completion arc yet. Bà Triệu is a separate locked Chapter II and is not counted as Chapter I content.

The current HBT runtime is healthy enough for a vertical slice: a fresh save entered Campaign, showed the one stage, deployed production HBT Heroes, ran waves, updated HUD/energy, and completed a real 24-wave run. The most important known functional debt is equipment effect presentation: an equipped Gem persisted and the inventory reflected it, but Hero Detail still displayed empty equipment/zero bonus. This audit records the gap; it does not fix it.

## Evidence

- [Chapter I current state](evidence/game-c16/01-chapter1-current-state.png) — real Campaign UI showing one production stage and 24 waves.
- [Chapter I runtime](evidence/game-c16/02-chapter1-runtime.png) — real HBT battle with Trưng Trắc, Han enemy sprite, HUD, and active wave.

## Current content classification

| Area | Production | Prototype / legacy | Missing for Chapter I completion |
|---|---|---|---|
| Chapter catalog | HBT Chapter I plus locked Bà Triệu Chapter II | Legacy Tam Quốc IDs remain for tests | Additional Chapter I stages and completion semantics |
| Stage | `hbt-lang-bac-stage-01` (`map-lang-bac-marsh`), 24 waves / 292 scheduled enemies | Older 10-wave outline in draft docs | Stage 02+ production data |
| Waves | 24 waves; Mã Viện on Wave 24 | Draft outline describes 10-wave concept | Multi-stage unlock/replay arc |
| Enemies | Han sword, crossbow, armored guard, Mã Viện; walk assets available | — | Additional stage-specific mixes/maps |
| Heroes | Trưng Trắc, Trưng Nhị, Lê Chân (3 HBT production IDs) | Inactive Tam Quốc roster | More Chapter I roster breadth is optional, not a runtime blocker |
| Narrative | pre-battle, beats 1/6/12/18/24, victory/defeat | Draft historical framing | Stage-specific narratives for future stages |
| Rewards | HBT ordinary reward from Balance V1 (20 Gold / 1 KNB / 10 Anh Hồn) plus first-clear 100 / 50 / 100 | — | Per-stage reward contracts |

Historical boundary: the research drafts support a 42–43 CE campaign context involving Lãng Bạc and Cẩm Khê, while exact locations and chronology remain uncertain. Proposed stages below are reconstruction-safe gameplay candidates, not asserted historical battle facts.

## End-to-end journey audit (fresh local QA save)

| # | Journey step | Status | Evidence / note |
|---:|---|---|---|
| 1 | Launch app | PASS | Fresh browser origin rendered City without blank screen or uncaught error. |
| 2 | Open Đại Doanh | PASS | City shell, wallet, energy, roster, inventory and economy entry points visible. |
| 3 | View wallet/resources | PASS | Gold, KNB and Quân Lệnh visible in HUD/city. |
| 4 | See production Hero roster | PASS | Three HBT Heroes populated from bootstrap-owned data. |
| 5 | Inspect equipment/inventory | PARTIAL | Inventory/equip controls work; initial inventory is empty on a fresh save. |
| 6 | Recruitment/progression entry points | PARTIAL | Runtime entry points exist; progression mutation was blocked by stale city selection (see known debt). |
| 7 | Open Chinh Chiến | PASS | Campaign screen opened from City. |
| 8 | Select Chapter I | PASS | Chapter I selected; status shown as Sẵn sàng. |
| 9 | Select Stage | PASS | HBT Stage 01 selected; `24 Wave · 3 tướng khả dụng`. |
| 10 | Deploy Hero | PASS | Trưng Trắc deployed on a valid tile; extended smoke deployed all 3 HBT Heroes. |
| 11 | Enter battle | PASS | Pre-battle narrative shown for incomplete stage, then actual Battle created. |
| 12 | Start Wave manually | PASS | Energy decreased and running HUD/counter updated. |
| 13 | Auto Wave | PASS | Auto Wave exercised in x3 smoke; waves advanced. |
| 14 | x1 / x3 | PASS | x3 exercised in runtime; parity is covered by automated tests. |
| 15 | Skill activation | PASS | Shared skill/wave-beat runtime is covered by tests and beat overlay appeared; isolated visual skill capture was not performed. |
| 16 | Win lifecycle | PASS | Real 24-wave HBT run reached CHIẾN THẮNG. |
| 17 | Result screen | PASS | Result showed Wave 24/24, defeated/escaped counts and rewards. |
| 18 | Apply rewards | PASS | Gold/KNB changed and were visible after clear; idempotency is automated. |
| 19 | Unlock next Chapter I stage | NOT IMPLEMENTED | Chapter I has no next production stage. |
| 20 | Save mutation | PASS | Equipment and reward mutations persisted. |
| 21 | Reload | PASS | Wallet and equipment record persisted after reload. |
| 22 | Replay | PARTIAL | Replay semantics are automated; a second manual HBT replay was not repeated in this audit. |
| 23 | Defeat | PARTIAL | Lifecycle is covered by automated tests; defeat was not manually staged here. |
| 24 | Retry | PARTIAL | Automated journey/wave tests cover retry reset; not manually repeated here. |
| 25 | Chapter I completion | BROKEN | A one-stage Chapter cannot express the intended multi-stage completion arc. |

Overall end-to-end status: **PARTIAL**. Chapter I complete: **NO**.

## System gap matrix

| ID | System | Status | Priority | Owner | Verification / gap |
|---|---|---|---|---|---|
| A | Player Journey shell | PASS | P2 | Codex | City → Campaign → Battle → Result works. |
| B | Campaign navigation | PARTIAL | P0 | Codex | Generic chapter selector works, but Chapter I has one stage. |
| C | Battle runtime | PASS | P2 | Codex | Real HBT battle and 24-wave clear. |
| D | Deployment/reposition | PASS | P2 | Codex | Multi-hero placement and reposition covered by runtime/tests; only placement was manually exercised here. |
| E | Normal attacks | PASS | P2 | Codex | Shared single-target combat path. |
| F | Skills | PASS | P2 | Codex | Shared skill resolver and automated coverage; no Hero-specific combat code. |
| G | Enemy movement/death | PASS | P2 | Codex | Real Han sprites moved and died; automated pool/lifecycle tests. |
| H | Wave progression | PASS | P2 | Codex | 24 waves completed; counters advanced. |
| I | Win/Lose | PASS | P2 | Codex | Win manual, lose automated. |
| J | Results | PASS | P2 | Codex | Result screen and counts visible. |
| K | Rewards | PASS | P2 | Codex | Live reward update plus idempotency tests. |
| L | Wallet | PASS | P2 | Codex | Gold/KNB updated live after clear and purchases. |
| M | Command Energy | PASS | P2 | Codex | Energy spent and refreshed in runtime. |
| N | Auto Wave | PASS | P2 | Codex | Auto exercised at x3. |
| O | Deployment capacity | PASS | P2 | Codex | 3/7 shown; domain tests cover gate. |
| P | Equipment transactions | PASS | P2 | Codex | Equip/unequip persistence path works. |
| Q | Equipment runtime stat effects | BROKEN | P1 | Codex | Gem equipped/persisted, but Hero Detail showed empty slot and Bonus —. |
| R | Inventory | PARTIAL | P2 | Codex | Equipment inventory works; consumables are visible in City, not combat inventory. |
| S | Gacha | PARTIAL | P2 | Codex | 1x PASS; 10x safely rejected with insufficient Gold in this save. |
| T | Shop | PASS | P2 | Codex | Chiêu Hiền Lệnh and Lệnh Hiệu Triệu purchases updated HUD/inventory. |
| U | Consumables | PASS | P2 | Codex | Purchases visible; direct use was not manually exercised. |
| V | Recruitment | PARTIAL | P2 | Codex | Recruit 1 duplicate → shards PASS; Recruit 10 not manually exercised. |
| W | Stars | PARTIAL | P2 | Codex | Domain/tests pass; manual attempt hit stale city selection. |
| X | Evolution / Rebirth / Reincarnation / Legendary | PARTIAL | P2 | Codex | UI/domain paths exist, but no practical manual mutation without a controlled high-level save. |
| Y | Save/reload | PASS | P2 | Codex | Wallet/equipment persisted across reload. |
| Z | Chapter progression/replay | PARTIAL | P0 | Codex | Generic replay exists, but Chapter I cannot complete with one stage. |

## Known UX and architecture debt

1. **P0 — Chapter I breadth/completion:** only one production stage is visible/playable, so no meaningful stage unlock chain or Chapter I completion state can be reached.
2. **P1 — Equipment effect presentation:** after equipping a Gem, Inventory showed `Ngọc: Đã trang bị`, while Hero Detail still showed empty equipment and no bonus. Runtime transaction/persistence is not the same as user-visible stat proof.
3. **P1 — City Hero selection state:** clicking a different Hero in City did not refresh the React-selected Hero used by inventory/progression, producing an `Insufficient Hero shards` result for the wrong Hero.
4. **P1 — Cross-chapter fallback risk:** `App.tsx` retains a `stateStage` fallback to the first HBT stage when selected-stage resolution is absent. A chapter with no playable stage must not silently borrow HBT state.
5. **P2 — Controlled QA affordances:** Recruit 10x, evolution, defeat/retry and some inventory edge cases need a controlled test save or future manual pass; automated coverage exists where noted.
6. **P2 — Copy/flow polish:** future multi-stage Chapter I needs explicit next-stage navigation and a clear post-result continuation path.

Gap ownership: Codex owns domain/runtime/UI integration and documentation; Antigravity owns visual/UI verification only when explicitly assigned; Asset Pipeline remains **SUSPENDED** for Bà Triệu Hero production assets. No gap here authorizes an unscoped code change in C16.

### Priority counts

- **P0: 2** — Chapter I cannot yet complete; chapter progression is incomplete.
- **P1: 3** — equipment effect presentation, City Hero selection state, unsafe cross-chapter state fallback.
- **P2: 8** — bounded manual/UX/content breadth debt listed above and matrix items requiring future product work.

## Asset and visual gate

- HBT production Hero assets: **LOCKED / AVAILABLE** (idle, attack, portraits, skill VFX).
- HBT/Wu enemy walk assets: **LOCKED / AVAILABLE**.
- Bà Triệu Hero production assets: **PENDING / SUSPENDED**; not treated as a Chapter I blocker.
- C16 visual evidence: **PASS** for both required screenshots; no mock or terminal image used.

## Recommended Chapter I production blueprint

Recommend **six meaningful stages** as a planning target (not a locked count): this gives a readable Lãng Bạc → Cẩm Khê campaign arc, room for defensive variety, and a distinct closure without asserting uncertain chronology. The full candidate contract is in [chapter1-full-production-plan.md](../design/chapter1-full-production-plan.md). Exact count remains OPEN until the research/product gate.

## Ordered implementation roadmap

1. **GAME-C17 — Chapter I stage data and registry:** approve evidence tiers, IDs, maps, wave neighborhoods and reward contracts; no invented chronology.
2. **GAME-C18 — Stage 02/03 production slice:** implement the first unlockable stages and progression/replay semantics.
3. **GAME-C19 — Stage 04/05 production slice:** add varied maps/wave mixes while preserving fixed-path combat boundaries.
4. **GAME-C20 — Chapter I closure stage:** implement final narrative/result semantics without rewriting historical outcome.
5. **GAME-C21 — Equipment runtime/UI consistency:** make equipped modifiers visible and authoritative in Hero Detail/Battle snapshots.
6. **GAME-C22 — Journey hardening:** fix City Hero selection, remove unsafe cross-chapter fallback, and add Result/Retry continuation coverage.
7. **GAME-C23 — PLAYABLE-CH1-LOCK:** full six-stage browser smoke, save/reload/replay, reward and asset gates; only then lock Chapter I.

## Final handoff

- GAME-C16: **READY_FOR_AUDIT**
- No source or test files changed.
- No main merge performed.
