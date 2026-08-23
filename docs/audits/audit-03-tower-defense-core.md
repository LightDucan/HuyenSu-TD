# Audit #3 — Tower Defense Core

Ngày audit: 2026-08-23  
Kết quả: **PASS**

## Kiểm tra tự động

- [x] TypeScript compilation và Vite production build thành công.
- [x] 6/6 unit tests pass.
- [x] Targeting chọn enemy còn sống, trong range và đi xa nhất trên path.
- [x] Normal attack xử lý damage, crit và death đúng.
- [x] Attack cooldown dùng delta từ Game Clock nên giữ đúng hành vi ở x1/x3.

## Kiểm tra kiến trúc

- [x] Hero definition là data; không có class combat riêng cho Quan Vũ.
- [x] Base stats chỉ gồm HP, ATK, Range, AttackSpeed, Crit và CritDamage.
- [x] Normal attack chỉ single-target, không chứa AoE hoặc crowd control.
- [x] Targeting, damage và combat cooldown là TypeScript domain thuần.
- [x] Phaser chỉ chuyển domain result thành HP bar, damage text và animation hook.
- [x] Placement chỉ cho phép các tile được map data khai báo.
- [x] React chỉ nhận snapshot khi trạng thái Battle thay đổi, không theo từng frame.
- [x] Enemy không target hoặc tấn công Hero.

## Kiểm tra trực quan

- [x] Tile hợp lệ hiển thị rõ và nhận click.
- [x] Quan Vũ được đặt đúng tâm tile, có range circle.
- [x] Hero tự tấn công khi enemy vào range.
- [x] HP bar giảm, damage/crit feedback xuất hiện và enemy chuyển trạng thái death.
- [x] Kịch bản x3 kết thúc với `Hạ: 1`, `Thoát: 0`.
- [x] Browser console không có lỗi runtime.

## Quyết định về pooling

Chưa tạo pool khi chỉ có một enemy và không có projectile object. Pooling được chuyển sang Phase 3/4 khi Wave hoặc VFX tạo object lặp lại; đây là tránh abstraction sớm, không phải bỏ yêu cầu performance.

## Quyết định

Combat Core đủ điều kiện tạo checkpoint `core/tower-defense-loop-v1` và chuyển sang Phase 3.
