# Audit FAST-02 — Phase 15 Gold Gacha + Phase 16 KNB Shop & Consumables

## Kết quả

**PASS — waiting integration audit.**

## Transaction architecture

- `EconomyTransaction` commit Wallet, consumables, Equipment instances, Command Energy và Summon Order entitlement trong đúng một Meta V4 revision.
- Failure/revision conflict không ghi partial state; persistent receipt chặn duplicate retry và same-key/different-payload.
- Wallet vẫn có đúng hai currency `gold` + `knb`; Command Energy là resource riêng.
- React chỉ gửi action/render Meta snapshot; Phaser không mutate Meta.

## Phase 15 — Gold Gacha

- Config-driven weighted pool: Gold, normal Weapon Lv1, Gem Lv1, Tiểu/Trung/Đại Binh Phù.
- RNG được inject; weighted selector deterministic trong test, không có `Math.random` trong transaction logic.
- 1x và 10x là atomic batch; 10x không có hidden guarantee, pity mặc định OFF.
- Equipment reward tạo unique Lv1 instance; Binh Phù vào Inventory, không tự cộng Quân Lệnh; Gold return dùng cùng transaction.
- Nhóm Binh Phù có weights thấp nhất trong prototype pool.

## Phase 16 — KNB Shop & Consumables

- KNB Shop config-driven, hỗ trợ Chiêu Hiền Lệnh và Lệnh Hiệu Triệu.
- Chiêu Hiền Lệnh chỉ vào Inventory; không recruit Hero và không có direct KNB Hero pull.
- Lệnh Hiệu Triệu consume item + tăng `profile.summonOrderCount` atomically; không thêm capacity field; refresh shared Deployment Capacity projection.
- Tiểu/Trung/Đại Binh Phù cộng lần lượt `+1/+5/+10` Command Energy; batch use atomic; overflow được giữ, không clamp 60.
- Upgrade cooldown feature flag vẫn disabled; không có hidden KNB charge.

## UI tối thiểu

- Wallet Gold/KNB luôn hiển thị ở top HUD.
- Hành Trang có Gold Gacha 1x/10x, KNB Shop, consumable Use 1/Use all và Equipment V2 actions.
- Không thêm animation/polish ngoài phạm vi sprint.

## Verification

- `npm test`: PASS — 19 files, 135 tests.
- `npm run build`: PASS.
- `npm run preview`: PASS — HTTP 200.
- `git diff --check`: PASS.
- P12 ten-Wave regression: PASS trong full suite.
- P13 capacity/placement regressions: PASS.
- P14 Equipment V2 regressions: PASS.
- Dependency mới: NONE.
- File deleted: NONE.

## Non-final balance configs

- `prototypeGoldGachaConfig`: pull cost, weights, Gold return, pity OFF placeholder.
- `prototypeKnbShopConfig`: KNB prices.
- `prototypeEquipmentV2Definitions`: Equipment Lv1–10 values.

Các số trên được đánh dấu **PROTOTYPE / NON-FINAL**; Phase 18 sở hữu final balance.

## Rủi ro

- Economy UI hiện ưu tiên khả dụng; chưa có animation, confirmation hoặc localization hoàn chỉnh.
- Gacha result receipt bảo vệ grant; retry đã commit trả status `already-applied` nhưng không replay danh sách presentation reward cũ vì receipt không lưu UI presentation payload.

