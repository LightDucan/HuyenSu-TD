# Audit FAST-01 — Phase 14 Inventory & Equipment V2

## Kết quả

**PASS — waiting integration audit.**

## Phạm vi đã xác minh

- Meta schema hiện hành là V4; migration chain `V1 → V2 → V3 → V4` deterministic.
- V3 placeholder `equipmentInstanceIds` được giữ ở `unresolvedLegacyEquipmentInstanceIds`, không silently drop.
- Legacy `huyen-su-td/equipment-v1` được import nguyên loadout bằng deterministic instance IDs; retry/startup lặp không duplicate.
- Meta V4 là source of truth duy nhất cho Equipment V2; legacy storage không còn là write target.
- Mỗi instance có `instanceId`, `definitionId`, `slot`, `level`; equipped relationship chỉ nằm trong `inventory.equippedByHero`.
- Normal Equipment Lv1–10 dùng flat `ATK`, `Range`, `AttackSpeed`; không DEF/Crit/CritDamage/% modifier.
- Merge yêu cầu đúng 3 instance ID khác nhau, cùng definition + level, không equipped, không exclusive, không Lv10; commit atomic.
- Hero-exclusive Weapon được hỗ trợ data-driven với fixed Lv1 modifiers, không level/merge; prototype items hiện tại không bị tự gán exclusive.
- Equip/unequip phát shared `refreshPlacedHeroStats(heroId)`; Battle Scene đọc Meta V4 và shared calculator.
- UI tối thiểu có tab `ĐỘI HÌNH` / `HÀNH TRANG`, list instance, flat bonus, equipped state, Equip/Unequip/Merge.

## Balance boundary

`prototypeEquipmentV2Definitions` là **PROTOTYPE / NON-FINAL BALANCE CONFIG**. Bảng số Lv2–10 chỉ phục vụ functional/playable testing; Phase 18 sở hữu final balance.

## Verification

- `npm test`: PASS — 18 files, 123 tests.
- `npm run build`: PASS.
- `npm run preview`: PASS — HTTP 200.
- `git diff --check`: PASS.
- Dependency mới: NONE.
- File deleted: NONE.

## Rủi ro còn lại

- V3 placeholder instance IDs không có definition/slot/level nên được bảo toàn dạng unresolved; cần future reconciliation nếu từng có save tự ghi trường placeholder này.
- Inventory UI ưu tiên khả dụng, chưa có polish/VFX và không khóa balance numbers.

