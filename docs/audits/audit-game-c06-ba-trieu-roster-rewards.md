# GAME-C06 — Bà Triệu Roster, Reward & Production Identity Audit

## Hero identity and provenance

- HBT group: `trung-trac`, `trung-nhi`, `le-chan`.
- Bà Triệu group: `ba-trieu`, `trieu-quoc-dat`, `dinh-boi`.
- Bà Triệu is the CORE historical figure. Triệu Quốc Đạt is CONDITIONAL later/local T3 tradition. Đinh Bôi is CONDITIONAL local Bồ Điền T3 tradition.
- Fresh saves still own only the HBT group. All six are production/recruitment candidates; no schema migration or automatic Bà Triệu grant was added.
- Provisional gameplay-fiction skills: `gio-manh-nui-nua`, `hieu-trieu-quan-yen`, `giu-luy-bo-dien`. They use only existing shared effects and are not historical claims.

## Chapter, reward, and prerequisite boundary

- HBT stages allow only HBT Heroes; all six Bà Triệu stages allow only the Bà Triệu group.
- `createProductionRewardConfig` covers both Chapters. Wu kill Gold is `1/1/2/2` for sword/crossbow/armored/field commander.
- Stage rewards are provisional: BT-01 `20/1/10`, BT-02 `22/1/10`, BT-03 `24/1/10`, BT-04 `26/1/12`, BT-05 `30/2/15`, BT-06 `35/2/20` as Gold/KNB/Anh Hồn.
- Same-run reward receipts remain idempotent; a replay with a new run ID retains existing repeat-reward behavior.
- Chapter prerequisite now outranks stale stored Stage completion. Stored data is retained and becomes completed/replayable again when the prerequisite is restored.

## Visual boundary

- Application, Hero Detail, and Battle Scene use the generic `resolveProductionHeroVisual` boundary.
- Bà Triệu Heroes resolve valid identity/texture keys with undefined PNG URLs. Existing primitive/initial fallback renders without borrowing HBT portraits or art.
- Final portrait, idle, attack, and Skill VFX assets remain production debt; no image was generated.

## Historical guardrails

The source lock remains `5f5c79eaf2947a2061da66557409cd4fe2221afe`: uprising suppressed in 248, Núi Tùng/tuẫn tiết treated as local tradition, Lục Dận survives, and no 8,000-man Bồ Điền or confirmed Cửu Chân→Giao Chỉ route claim is introduced.

## Verification

- `npm test`: PASS — 34 test files, 227 tests.
- `npm run build`: PASS.
- `git diff --check`: PASS.
- Manual browser smoke: PARTIAL PASS. Production preview visibly rendered only the three HBT-owned starters, both Chapter cards, Bà Triệu as `Chưa mở`, all six BT stages disabled, and `VÀO TRẬN` disabled. Controlled prerequisite completion, recruitment, BT-01 entry, completion/replay, and persistence were not performed manually; those paths are covered by automated tests and are not claimed as browser PASS.
