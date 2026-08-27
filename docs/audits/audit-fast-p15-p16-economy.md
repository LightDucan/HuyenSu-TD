# Audit FAST-02 — Phase 15 Gold Gacha + Phase 16 KNB Shop & Consumables

## Kết quả

**PASS — waiting final audit after integration fix.**

## FAST-02A — Economy integration fixes

### Command Energy grant semantics

- `grant-command-energy` gọi shared Command Energy domain trong chính `EconomyTransaction`: resolve natural regeneration tại `committedAtMs`, sau đó mới cộng Binh Phù.
- Transaction persist đồng thời Inventory consume, `commandEnergy.current` và `regenAnchorAtMs` trong đúng một Meta V4 revision; không có repository commit trung gian.
- Overflow/no-banking và partial remainder dùng nguyên semantics hiện có. Backward clock reject toàn transaction nên Inventory, Energy và revision giữ nguyên.
- Regression cases đã khóa: `58 + 240000ms + Đại` thành `70`; cap/remainder cases tại `150000ms`; backward-clock atomic rejection.

### Live Meta / Wallet snapshot

- Mỗi Meta save thành công publish snapshot read-only từ authoritative repository/runtime qua `BattleBridge`; React chỉ subscribe/render, không đọc hoặc ghi Meta localStorage.
- Enemy Kill, Stage Clear và Active Play Time publish Wallet mới ngay sau reward transaction; Shop và Gacha dùng cùng publication path.
- Publication không chạy per-frame và không tạo reward transaction. Duplicate reward vẫn bị persistent idempotency receipt chặn, kể cả khi UI refresh snapshot.
- Regression tests xác nhận Gold/KNB cập nhật cho Enemy, Stage, 60-second Active Play, Shop và Gacha; manual snapshot refresh không cấp reward lần hai.

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

- `npm test`: PASS — 20 files, 144 tests.
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
