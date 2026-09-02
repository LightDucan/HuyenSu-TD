# GAME-C14 — Bà Triệu Chapter Production Lock audit

## Scope and lineage

- Base: `codex/game-c13-ba-trieu-stage06-full-production` @ `07cf346ee47e0d13da1c37fc7b85f5f1f36ae86a`
- Branch: `codex/game-c14-ba-trieu-chapter-production-lock`
- Scope: documentation/evidence-only lock; no source, tests, runtime assets, gameplay or economy changes.

## Locked chapter contract

Chapter `chapter-ba-trieu-248` contains exactly six production stages and no prototype stage:

| Stage | ID | Waves | Enemies | Reward (Gold / KNB / Anh Hồn) |
|---|---|---:|---:|---:|
| 01 | `bt-01-tu-nghia-nui-nua` | 18 | 178 | 20 / 1 / 10 |
| 02 | `bt-02-cong-pha-thanh-ap` | 20 | 268 | 22 / 1 / 10 |
| 03 | `bt-03-ben-song-ma` | 22 | 355 | 24 / 1 / 10 |
| 04 | `bt-04-lap-luy-bo-dien` | 24 | 419 | 26 / 1 / 12 |
| 05 | `bt-05-dai-chien-bo-dien` | 26 | 539 | 30 / 2 / 15 |
| 06 | `bt-06-khuc-ca-nui-tung` | 28 | 653 | 35 / 2 / 20 |

All six dedicated production tests remain present. Stage 06 preserves the historical final lock: T1 records suppression in 248 and Lục Dận survives; T2 records Bà Triệu/Triệu Ẩu tử trận; Núi Tùng and tuẫn tiết are identified as T3/local tradition. Mechanical clear is not a military victory over Đông Ngô.

## Manual chapter completion gate

**PASS** — using a local QA state with all six stages completed, the Campaign UI showed the Bà Triệu chapter as **Đã hoàn thành**, each Stage 01–06 as **Đã hoàn thành**, no Stage 07, and BT06 remained enterable. Selecting BT06 and pressing `VÀO TRẬN` entered the replay directly without forcing pre-battle; no console errors were observed.

## Automated verification

- `npm test`: PASS — **43 files / 291 tests**.
- `npm run build`: PASS.
- `git diff --check`: PASS.

## Visual evidence

- Fresh real Campaign/Chapter screenshot: **PASS**.
- Evidence: `docs/audits/evidence/game-c14/01-ba-trieu-chapter-complete.png` (PNG signature verified).
- Hero production art: **PENDING**.
- Wu enemy production art: **PENDING**.

## Classification

**GAME-C14: READY_FOR_AUDIT** — Bà Triệu Chapter code/runtime/content lock verified with zero source/test/runtime changes.
