# Equipment Audit

Ngày audit: 2026-08-24  
Kết quả: **PASS**

## Kiểm tra

- [x] Mỗi Hero chỉ có một Weapon slot và một Gem slot.
- [x] Equipment chỉ có modifier `atk`, `range`, `attackSpeed`; không có DEF hoặc chỉ số ngoài scope.
- [x] Data boundary từ chối modifier rỗng, không hợp lệ hoặc không dương.
- [x] Không thể đặt Gem vào Weapon slot, Weapon vào Gem slot, hoặc dùng ID không tồn tại.
- [x] Loadout đi qua shared stat calculator; crit, crit damage và HP không bị Equipment thay đổi.
- [x] Equipment được lưu local, có version và khôi phục an toàn khi save bị hỏng.
- [x] Battle Scene đọc loadout đã lưu khi đặt Hero; range, normal attack và skill dùng cùng bộ stats đã tính.
- [x] Không có rarity, random affix, enchant, reforging, backend hoặc dependency mới.
- [x] 23/23 unit tests pass; production build pass.

## Quyết định

Phase 6 đạt checkpoint `hero/equipment-v1`. Bàn giao Figma `P6-A02` của Antigravity vẫn được audit độc lập nếu có thay đổi repo.
