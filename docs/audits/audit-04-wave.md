# Wave Audit

Ngày audit: 2026-08-23  
Kết quả: **PASS**

## Kiểm tra

- [x] Có 10 wave data-driven, không hard-code trong Scene.
- [x] Có ba enemy mẫu: sword, archer, brute.
- [x] Spawn theo group với start delay và interval riêng.
- [x] Wave chỉ bắt đầu sau khi người chơi đặt Hero.
- [x] Wave chỉ chuyển tiếp sau khi spawn xong và không còn enemy active.
- [x] Bộ đếm sword/archer lấy từ enemy active, không nhập tay vào HUD.
- [x] Enemy thoát fixed path gây damage cho Thành; HP Thành bằng 0 tạo Lose.
- [x] Wave cuối sạch enemy tạo Win.
- [x] Enemy visual được tái sử dụng qua pool khi có nhiều enemy spawn/despawn.
- [x] 10/10 unit tests pass; production build pass; không có lỗi console trong kiểm tra browser.

## Ranh giới được giữ

- Không có A*, dynamic path, Hero di chuyển hoặc enemy tấn công Hero.
- Normal attack vẫn single-target và Combat Core không bị đưa vào Phaser Scene.
- Không thêm backend, inventory hay feature ngoài MVP.

## Quyết định

Phase 3 đạt checkpoint `core/wave-v1`. Chuyển sang Phase 4 — Attack Counter và Skill Effects.
