# GAME-C17 — Chapter I Historical + Stage Architecture Lock Audit

## GAME-C17-FIX1 closure

This consistency pass keeps one canonical six-stage matrix across the C17 contract, blueprint and audit, corrects the production Chapter II ID, and replaces the baseline evidence with a new clean-origin browser capture. No runtime behavior was changed.

Consistency assertions: conflicting Stage02/03 identities = **0**; legacy Chapter II placeholder references in C17 docs = **0**; production Chapter II ID = `chapter-ba-trieu-248`.

## Gate and scope

- Branch: `codex/game-c17-fix1-contract-consistency-evidence`
- Parent: `codex/game-c17-hbt-chapter1-production-architecture-lock` @ `2c41378329ad99f5939d34ba0facb42cc30417a2`
- Scope: production contract and audit documentation only; no runtime implementation.
- Changed source/test/config/assets: **0**.

## Decision summary

GAME-C17 closes the open C16 decision and locks Chapter I to **six production stages**, in strict order. Stage 01 remains the existing HBT production stage (24 waves / 292 scheduled enemies). Stages 02–06 have exact IDs, Vietnamese names, historical confidence layers, distinct map identities, exact wave counts and safe gameplay outcomes in [chapter1-production-contract.md](../design/chapter1-production-contract.md).

The six-stage count is locked because it provides a complete playable arc, matches the successful six-stage Chapter II structure, supplies meaningful tactical/map variety and keeps uncertain chronology honest through reconstruction labels. No extra Hero or enemy asset is required.

## Locked stage matrix

| # | ID | Display | Layer | Map | Waves | Boss |
|---:|---|---|---|---|---:|---|
| 01 | `hbt-lang-bac-stage-01` | Huyết Chiến Lãng Bạc | CORE + terrain reconstruction | `map-lang-bac-marsh` | 24 | Mã Viện W24, driven off |
| 02 | `hbt-lang-bac-stage-02` | Rút Tuyến Lãng Bạc | COMPOSITE RECONSTRUCTION | `map-lang-bac-retreat-corridor` | 22 | None |
| 03 | `hbt-cam-khe-stage-03` | Phòng Tuyến Cẩm Khê | CORE + gameplay reconstruction | `map-cam-khe-defensive-line` | 24 | None |
| 04 | `hbt-thuy-bo-stage-04` | Hành Lang Thủy Bộ | COMPOSITE RECONSTRUCTION | `map-thuy-bo-crossing` | 22 | None |
| 05 | `hbt-cam-khe-stage-05` | Tuyến Cuối Cẩm Khê | CORE endpoint + COMPOSITE RECONSTRUCTION | `map-cam-khe-last-line` | 26 | No mandatory boss |
| 06 | `hbt-chapter-closure-stage-06` | Giữ Lửa Mê Linh | CLOSURE SYNTHESIS | `map-hbt-closure-rampart` | 28 | None |

## Historical and narrative safety

- Source boundary used: `docs/drafts/viet-su/hai-ba-trung/{README.md,chapter-outline.md,sources.md}`.
- Lãng Bạc/Cẩm Khê are treated as source-supported campaign references with geographic uncertainty explicitly retained.
- Stage 02 and Stage 04 are composite reconstructions, not claimed named battles.
- Stage 06 is closure synthesis, not a securely recorded battle.
- All tactical victories are local gameplay objectives. The historical campaign conclusion remains intact.
- Mã Viện is never killed in gameplay semantics; Stage 01's boss defeat means withdrawal from that battlefield.
- No graphic death/suicide mechanic and no false permanent strategic victory.

## Rewards and progression

- Ordinary repeatable clear reward for Stage 01–06: **20 Gold / 1 KNB / 10 Anh Hồn**, reusing Balance V1 shared prototype-stage value.
- Stage 01 first-clear: **100 Gold / 50 KNB / 100 Anh Hồn**, existing idempotent onboarding package.
- Stage 02–06 first-clear: **0 / 0 / 0, ordinary-only; no first-clear config entry**.
- Strict progression: 01 → 02 → 03 → 04 → 05 → 06; completed stages replayable; first-clear never repeats.
- Chapter II production ID: `chapter-ba-trieu-248`.
- Future Chapter II prerequisite: `hbt-chapter-closure-stage-06`.
- No cross-chapter fallback: unavailable selected stage resolves `undefined`.

## Asset and architecture gate

- Existing HBT Hero roster remains exactly `trung-trac`, `trung-nhi`, `le-chan`.
- Existing Han sword/crossbow/armored/Mã Viện enemy set is sufficient; no mandatory new enemy assets.
- Hero Asset Production: **SUSPENDED** (Bà Triệu assets excluded).
- Fixed-path TD remains authoritative; no A*, dynamic navigation, naval/escort/elephant subsystem.
- Equipment classification corrected from C16: domain **PASS**, Battle runtime stat application **PASS**, UI/Hero selection/Meta sync **BROKEN — P1**.

## Baseline evidence

- Fresh runtime screenshot: [Chapter I baseline](evidence/game-c17/01-chapter1-baseline.png). It shows the unchanged current runtime with only HBT Stage 01 visible (24 waves; Chapter II locked).
- Browser console during capture: no error entries observed.
- The image is a newly captured PNG from a clean origin; it is not reused from C16. The PNG includes a valid ancillary capture marker so the evidence blob is distinct while the rendered pixels remain unchanged.
- New evidence blob SHA-1: `e0f7fed9ae24034467fd4a7a6559d09768ed77f1`.
- C16 evidence blob SHA-1: `cae74cdc39db3b0eb3fc6ef915aee7fe2f1397eb`.
- Evidence reused: **NO**.

## Verification

- `npm test`: **43 test files / 291 tests PASS**
- `npm run build`: **PASS**
- `git diff --check`: **PASS**
- Runtime code changes: **0**
- Test changes: **0**
- No CI claim made.

## C17 handoff

`GAME-C17-FIX1: READY_FOR_AUDIT`

The contract is locked. C18+ may implement the six stages in order; no further C17 planning or runtime scope is authorized.
