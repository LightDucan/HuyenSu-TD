# Huyền Sử TD — Project Plan

## Mục tiêu game

Tạo vertical slice **Huyền Sử TD — Tower Defense Việt Sử**: Hero là tower mang hình tướng, đứng cố định, tự đánh single-target và tự dùng Skill sau N đòn. Enemy đi fixed path theo wave; React phụ trách UI, Phaser phụ trách Battle Scene, domain giữ combat/progression độc lập.

Roster Tam Quốc hiện tại chỉ là **prototype test roster** dùng để kiểm thử vertical slice, data flow và combat boundary. Roster này sẽ được migrate sang roster Việt Sử theo roadmap content sau; không xem các Hero Tam Quốc prototype là roster sản phẩm cuối.

## WorkTree

- Repository: `HuyenSu-TD`
- Branch hiện tại: `codex/game-c14-ba-trieu-chapter-production-lock`
- Worktree Codex hiện tại: `C:\Users\PC\Documents\Codex\2026-08-23\referenced-chatgpt-conversation-this-is-an\work\game-c07-fix1`
- Quy tắc worker Antigravity: [ANTIGRAVITY_RULES.md](ANTIGRAVITY_RULES.md)

## Trạng thái hiện tại

- Current Phase: **BÀ TRIỆU CHAPTER PRODUCTION LOCK**
- Current Codex task: **GAME-C14 — Bà Triệu Chapter Production Lock** — branch `codex/game-c14-ba-trieu-chapter-production-lock`.
- Current Antigravity task: **NONE — awaiting an explicitly assigned task**.
- QA-C01A: **ENVIRONMENT-BLOCKED interactive portion**; automated regression PASS; manual QA debt retained.
- VS-HBT-V02B: **CODE/BINARY AUDIT PASS; MANUAL VISUAL QA PASS ENOUGH TO CONTINUE**; real HBT Hero assets 12/12 integrated.
- VIS-HUD-01: **DONE — waiting audit**; desktop one-viewport HUD, contextual tabs, range toggle và placement/move safety verified interactively.
- HUD-C01: **DONE — waiting audit**; two-tab bottom Combat HUD, persistent controls, Battle state preservation, selected-only range và Wave Equipment lock verified.
- HUD-C02: **DONE — waiting final audit**; Economy tách khỏi Hành Trang combat, top HUD ba vùng, range/placement/tab visual polish và responsive no-scroll verified.
- HUD-C03: **DONE — copy lock PASS**; combat Inventory dùng display name Việt hóa, không lộ technical/dev terminology.
- GAME-C01: **DONE — AUDIT CONDITIONAL PASS**; City → Campaign → Battle → Result shell đã tích hợp, các blocker re-entry/stage coupling được xử lý trong GAME-C02.
- GAME-C02: **DONE — waiting audit**; stage-aware Battle runtime, fresh run snapshot, generic map contract và capacity gate đã hoàn tất.
- GAME-C03: **DONE — waiting audit**; Meta V6 campaign progress, ordered stage unlock, idempotent victory completion và guarded Campaign UI đã hoàn tất.
- Known debt: **Equipment Runtime/UI Effect Integration** — equipping Weapon/Gem may not visibly change Hero stats/effects; explicitly out of scope for VIS-HUD-01.
- GAME-C04: **DONE — waiting audit**; generic catalog registry, safe chapter/stage selection, strict Meta V6 campaignProgress boundary, production HBT catalog only.
- GAME-C05: **DONE — waiting audit**; production catalog có Hai Bà Trưng → Bà Triệu 248, prerequisite stage tổng quát, 6 stage Bà Triệu structurally playable và Vietnamese Chapter status.
- GAME-C06: **DONE — waiting audit**; roster Bà Triệu tách khỏi HBT, recruitable qua hệ hiện có, production reward config, generic visual fallback và prerequisite hardening.
- Lần kiểm tra gần nhất: GAME-C14 — 43 test files/291 tests PASS, build/diff-check PASS; all six stages completed in Campaign UI and fresh chapter evidence captured.

## Phases và checkpoint

| Phase | Task ID | Nội dung | Trạng thái | Worker chính | Audit checkpoint | Commit checkpoint |
|---|---|---|---|---|---|---|
| 0 | P0 | Game rules, schema, kiến trúc, repo, task board | DONE | Codex | Audit #1 | `foundation/game-design-v1` |
| 1 | P1 | React/Vite, Phaser, Game Clock, grid, fixed path, 1 enemy | DONE | Codex | Audit #2 | `prototype/enemy-path` |
| 2 | P2 | Placement, targeting, normal attack, crit, HP/death | DONE | Codex | Audit #3 | `core/tower-defense-loop-v1` |
| 3 | P3 | Wave manager, 3 enemy, 10 wave, counter, Win/Lose | DONE | Codex | Wave Audit | `core/wave-v1` |
| 4 | P4 | Attack Counter và Skill Effects dùng chung | DONE | Codex | Audit #4 | `core/skill-system-v1` |
| 5 | P5 | Level, cooldown, Rebirth, Reincarnation, Legendary, stat calculator, local save | DONE | Codex + Antigravity UI | Progression Audit | `hero/progression-v1` |
| 6 | P6 | Weapon/Gem modifier và save equipment | DONE | Codex | Equipment Audit | `hero/equipment-v1` |
| 7 | P7 | Hero UI | DONE | Antigravity + Codex | UI Audit | `ui/hero-v1` |
| 8 | P8 | Battle HUD kết nối dữ liệu thật | DONE | Antigravity + Codex | HUD Audit | `ui/battle-v1` |
| 9 | P9 | Vertical slice: 5 Hero, 3 Enemy, 10 Wave, 5–8 Skill, local save, x1/x3, Win/Lose | DONE | Codex + Antigravity content | Full Audit #5 — PASS | `v0.1.0-playable` |

## Meta Game architecture checkpoint

| Task ID | Nội dung | Trạng thái | Worker chính | Audit checkpoint | Commit checkpoint |
|---|---|---|---|---|---|
| META-C00 | Architecture, schema và roadmap contract cho Meta Game | DONE — đã tích hợp | Codex | Docs-only boundary, locked/open decisions, Phase 10–18 dependency audit | `codex/meta-c00-architecture-plan` |
| META-A00 | Economy UI specification và consistency fix | PASS — đã tích hợp | Antigravity + Codex audit | Hai currency; Command Energy ngoài Wallet; UI chỉ dùng snapshot/request | `antigravity/meta-a00-economy-ui-spec` |
| HERO-A00 | Hero Recruitment & Ascension specification | PASS — đã tích hợp | Antigravity + Codex audit | Chiêu Hiền Lệnh item; duplicate thành Mảnh; Sao 1–5; Anh Hồn chung; shared progression | `antigravity/hero-a00-hero-recruitment` |
| VS-HBT-02 | Enemy/Chapter content Hai Bà Trưng | PASS — đã tích hợp | Antigravity + Codex audit | Docs-only, source notes và narrative consistency; không lọt vào Core | `antigravity/vs-hbt-02-enemy-chapter` |
| INT-C01 | Meta Foundation Integration Gate | PASS — merged vào `main` | Codex | Merge order, schema consistency, Core boundary, full test/build/preview — PASS | `meta/foundation-v1` |
| P11-C01 | Reward Transaction Core | DONE — merged vào `main` — PASS | Codex | Atomicity, idempotency persistence, V1→V2 migration, optimistic revision, no UI/Battle integration | `meta/reward-transaction-v1` |
| P11-C02 | Reward Sources | DONE — merged vào `main` — PASS | Codex | Config-driven kill/stage/time rewards, persistent cumulative anti-replay, V2→V3 migration, real wall-clock, visible-only/count-hidden boundary | `meta/reward-sources-v1` |
| P11-C03 | Reward Runtime Integration | PASS — merged vào `main` | Codex | Battle event bridge, kill/stage idempotency, locked KNB interval 60 giây, persistent reload checkpoint, fresh run ID, configurable hidden policy, playable ten-wave smoke | `meta/reward-economy-v1` |
| VIS-C01 | Prototype Runtime Asset Integration | DONE — merged vào `main` — PASS | Codex | 20 asset mapping, safe missing-asset fallbacks, preload, idle/attack, Skill VFX, portrait HUD/modal, x1/x3 visual timing, no combat ownership leak | `visual/runtime-assets-v1` |
| P12-C01 | Command Energy Domain & Persistence | DONE — merged — PASS | Codex | Cap 60, 120 giây/điểm real-time, overflow/no banking, partial remainder, clock safety, Meta V3 persistence và optimistic revision | `meta/command-energy-domain-v1` |
| P12-C02 | Wave Energy Gate & Auto Wave | DONE — merged — PASS | Codex | Explicit waiting/running/won lifecycle, manual/auto shared spend, double-spend guard, Hero gate, real-time refresh, minimal HUD và 10-Wave regression | `meta/command-energy-auto-wave-v1` |
| P13-C01 | Deployment Capacity Domain & Placement Gate | DONE / merged / PASS | Codex | Base 7, level bonus 0, Summon Order +1, effective map cap, guarded new placement, unrestricted reposition và read-only HUD projection | `meta/deployment-capacity-v1` |
| P13-C02 | Lệnh Hiệu Triệu Entitlement Transaction | FOLDED INTO PHASE 16 | Codex | Inventory consume + permanent entitlement vẫn là requirement; thực hiện cùng item/shop transactions trong FAST-02 | `codex/fast-p15-p16-economy` |
| FAST-01 | Phase 14 Inventory & Equipment V2 | PASS — waiting merge | Codex | Meta V4 migration, legacy import idempotent, unique instances, atomic equip/unequip/merge, placed-Hero refresh, minimal Inventory UI | `codex/fast-p14-equipment-v2` |
| FAST-02 | Phase 15–16 Gold Gacha, KNB Shop & Consumables | DONE — waiting final audit after integration fix | Codex | Deterministic/config Gacha; atomic 1x/10x; shared Energy regen+grant transaction; live Wallet snapshot for rewards/shop/gacha | `codex/fast-p15-p16-economy-fix` |

## Roadmap Phase 10–18

| Phase | Task ID | Nội dung | Trạng thái | Dependency | Worker chính | Audit checkpoint | Commit checkpoint | Rủi ro chính |
|---|---|---|---|---|---|---|---|---|
| 10 — Meta Foundation | P10 | Profile, Meta repository boundary, wallet/inventory/energy/capacity contracts tối thiểu | DONE — Integration Audit PASS | Phase 9 + META-C00 | Codex | Schema validation, ownership, local-save isolation, no Core regression; INT-C01 integration audit — PASS | `codex/p10-c01-meta-foundation`, `codex/int-c01-meta-foundation-integration` @ `599162a` | Nhiều nguồn truth và save không nhất quán |
| 11 — Reward Economy | P11 | Reward transaction, Wallet grant/spend, Inventory grant, reward sources và runtime integration | DONE — Integration Audit PASS | Phase 10 | Codex | Atomic grant/spend, event idempotency, wall-clock policy, playable reward smoke — PASS | `meta/reward-economy-v1` | Inflation, duplicate reward hoặc sai time policy |
| 12 — Quân Lệnh & Auto Wave | P12 | Real-time regen, overflow, Wave cost và Auto Wave gate | DONE — Integration Audit PASS | Phase 10–11 + OD-01 | Codex | Base cap 60, 2 phút/điểm, overflow, hidden time, x1/x3 independence, auto/manual parity | `meta/command-energy-auto-wave-v1` | Clock exploit, double spend hoặc auto-loop |
| 13 — Deployment Capacity & Lệnh Hiệu Triệu | P13 | Capacity calculator, permanent entitlement và placement gate | DONE — PASS; P13-C02 folded into Phase 16 | Phase 10–12 + OD-02/OD-08 | Codex | Base 7, mỗi Lệnh Hiệu Triệu +1, effective cap ≤ map slots, reposition free — PASS | `meta/deployment-capacity-v1` | Meta/Battle placement desync |
| 14 — Inventory & Equipment V2 | P14 | Equipment instances, Level 1–10, merge 3 và migration V1 | DONE / FINAL INTEGRATION PASS / merged main | Phase 10–11 + save contract + OD-06 | Codex + Antigravity UI | Migration/rollback, merge atomicity, signature weapon policy, shared stats — PASS | `main` | Mất/nhân đôi item khi migration |
| 15 — Gacha Gold | P15 | Gold pull transaction và reward pool đã khóa | DONE / FINAL INTEGRATION PASS / merged main | Phase 11 + Phase 14 + OD-05/OD-07 | Codex + Antigravity data/UI | Weighted pool, Gold spend, inventory grant, live Wallet, deterministic 1x/10x — PASS | `main` | Rate sai, inflation và duplicate grant |
| 16 — Kim Nguyên Bảo Shop & Cooldown | P16 | Premium earning/shop, Lệnh Hiệu Triệu, item đặc thù và cooldown shortening | DONE / FINAL INTEGRATION PASS / merged main | Phase 11–15 + OD-04/OD-08 | Codex + Antigravity UI | Atomic KNB purchase/item use, shared Energy regen+grant, live Wallet, capacity refresh — PASS | `main` | Premium economy hoặc timer bị khai thác |
| 17 — Hero Recruitment & Ascension | P17 | Chiêu Hiền Lệnh item; Hero trùng → Mảnh Danh Tướng; Sao 1–5; Anh Hồn chung; sau Normal tiến hóa Trùng Sinh → Tái Sinh → Huyền Sử | DONE / FINAL AUDIT PASS | Phase 11 + Phase 14 + Phase 16 + HERO-A00 | Codex + Antigravity UI/data | FAST-05A canonical V5 repository, runtime/UI cutover, migration-only legacy, paid evolution, shared stars/passive — PASS | `c4605cf` / `codex/fast-meta-v5-cutover` | Duplicate reward, mất mảnh hoặc tạo Hero-specific progression/combat |
| 18 — Economy Simulation & Balance | P18 | Simulation deterministic và khóa Balance V1 cho economy hiện tại | DONE / FINAL INTEGRATION PASS / merged main | Phase 11–17 | Codex | FAST-06 seeded weighted simulation, actual accounting, runtime-derived Balance V1, 9-row matrix — PASS | `main` | Balance assumptions không phản ánh gameplay thật |

## Phase 9 task tracker

| Task ID | Nội dung | Trạng thái | Worker chính | Audit checkpoint | Commit checkpoint |
|---|---|---|---|---|---|
| P9-01 | Tích hợp lựa chọn 5 Hero data-driven vào Bridge, HUD, Hero Detail và Battle Scene | DONE | Codex | 28/28 tests, build và UI interaction audit | `217a122` |
| P9-A01 | Chuẩn bị 5 Hero, 3 Enemy, 10 Wave, Skill combinations và asset checklist | DONE | Antigravity + Codex audit | Content/data contract audit | `cd43096` |
| P9-A02 | Bộ placeholder 5 portrait, 10 Hero sprite và 5 skill VFX | DONE | Antigravity + Codex audit | PNG/baseline audit, 28/28 tests và build | `169a88d`, `ef6bd59` |
| P9-02 | Audit toàn bộ MVP Vertical Slice và xác nhận playable checkpoint | DONE | Codex | Full Audit #5: 5 Hero, 10 Wave, x1/x3, HUD, architecture, test/build | `v0.1.0-playable` |
| P9-C02 | Multi-Hero Placement, runtime reposition và cấu hình upgrade cooldown | DONE | Codex | 5 Hero/reposition/skill/x1-x3/10 Wave/cooldown/test/build/preview — PASS | `5f72f4d`, merge `ab76e86` |
| P9-C03 | Refresh chỉ số runtime của Hero đang đặt sau Progression/Equipment save | DONE | Codex | ATK/Range/ASPD, giữ cooldown/skill charge, no-op unplaced, UI save commands, reposition/x1-x3/10 Wave/test/build/preview — PASS | `16f33f0`, merge `680854e` |

## GAME-C04 task tracker

| Task ID | Nội dung | Trạng thái | Worker chính | Audit checkpoint | Commit checkpoint |
|---|---|---|---|---|---|
| GAME-C04 | Multi-Chapter Campaign Catalog & Navigation; production catalog giữ duy nhất chapter Hai Bà Trưng, fixture 2 chapter chỉ dùng test | DONE — waiting audit | Codex | Catalog ID validation, safe selection fallback, strict Meta V6, chapter navigation, Reward + Campaign bridge integration — PASS; manual browser smoke debt retained | pending |
| GAME-C05 | Bà Triệu 248 production Chapter, 6 stage và chronological prerequisite sau stage cuối Hai Bà Trưng | DONE — waiting audit | Codex | Catalog order/unique IDs, prerequisite, replay, zero-playable, Vietnamese status, full regression — PASS | pending |
| GAME-C06 | Hoàn thiện production roster/recruitment/reward/visual identity cho Bà Triệu và harden corrupted prerequisite state | DONE — waiting audit | Codex | Starter-vs-production, recruit determinism, chapter Hero boundaries, Wu/Stage rewards, idempotency, fallback và prerequisite restore — PASS | pending |
| GAME-C07 | Hai Bà Trưng Stage 01 full production: story, terrain map, 24-wave onboarding, reward brief và enemy walk contract | **FULL PRODUCTION PASS / LOCKED** | Codex | Code/runtime PASS; 37 files/240 tests PASS; asset PASS; manual PASS | Code `d96ab451`; asset `01b7dd23`; manual `62d75e18` |
| GAME-C07-FIX1 | Runtime closure: generic terrain, enemy walk resolver, narrative/first-clear runtime và clean verification | DONE — included in locked C07 production gate | Codex | Covered by final C07 code/runtime and manual evidence gates | `d96ab451` |
| GAME-C08 | Bà Triệu Stage 01 full production: 18 waves, dedicated Núi Nưa map, reconstruction-safe narrative, reward/progression preservation và Wu visual fallback contract | DONE — production PASS | Codex | Included in locked six-stage chapter; 18 waves / 178 enemies; Hero/Wu art tracked separately | `codex/game-c08-ba-trieu-stage01-full-production` |
| GAME-C09 | Bà Triệu Stage 02 full production: 20 waves, dedicated Thành Ấp map, reconstruction-safe narrative, reward/progression preservation và Wu visual fallback contract | DONE — production PASS | Codex | Included in locked six-stage chapter; 20 waves / 268 enemies; C08 timing/test isolation retained | `codex/game-c09-ba-trieu-stage02-full-production` |
| GAME-C10 | Bà Triệu Stage 03 full production: Bến Sông Mã, 22 waves/355 enemies, dedicated riverbank map, reconstruction-safe narrative and progression | DONE — production PASS | Codex | Included in locked six-stage chapter; stage identity/composition/timing/map/narrative/reward/progression retained | `codex/game-c10-ba-trieu-stage03-full-production` |
| GAME-C11 | Bà Triệu Stage 04 full production: Lập Lũy Bồ Điền, 24 waves/419 enemies, dedicated fort map, reconstruction-safe narrative and progression | DONE — production PASS | Codex | Included in locked six-stage chapter; stage identity/composition/timing/map/narrative/reward/progression retained | `codex/game-c11-ba-trieu-stage04-full-production` |
| GAME-C12 | Bà Triệu Stage 05 full production: Đại Chiến Bồ Điền, 26 waves/539 enemies, dedicated open-field map, reconstruction-safe narrative and progression | DONE — production PASS | Codex | Included in locked six-stage chapter; stage identity/composition/timing/map/narrative/reward/progression retained | `codex/game-c12-ba-trieu-stage05-full-production` |
| GAME-C13 | Bà Triệu Stage 06 final chapter: Khúc Ca Núi Tùng, 28 waves/653 enemies, dedicated mountain last-stand map, source-layered ending and chapter completion | DONE — LOCKED @ `07cf346ee47e0d13da1c37fc7b85f5f1f36ae86a` | Codex | Included in locked six-stage chapter; full 28-wave runtime/manual/ending evidence retained | `codex/game-c13-ba-trieu-stage06-full-production` |
| GAME-C14 | Bà Triệu Chapter production lock: six stages, final regression and chapter-completion evidence | READY_FOR_AUDIT | Codex | 43 files/291 tests, build/diff-check PASS; all six stages completed in Campaign UI; BT06 replay PASS; fresh chapter evidence PASS | `codex/game-c14-ba-trieu-chapter-production-lock` |

## Quy tắc cập nhật

- Codex kiểm tra `git status` trước và sau mỗi task/commit.
- Khi có task Antigravity, cập nhật ngay `Current Antigravity task` với Task ID, branch và phạm vi file được phép sửa.
- Mỗi task hoàn tất phải cập nhật trạng thái `DONE / IN PROGRESS / TODO`, audit checkpoint và commit checkpoint tương ứng.
- Nếu xuất hiện thay đổi không rõ nguồn gốc hoặc xung đột với worker rules, dừng phần bị ảnh hưởng và báo người điều phối.
