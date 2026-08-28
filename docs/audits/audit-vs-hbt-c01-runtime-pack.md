# VS-HBT-C01 — Hai Bà Trưng Runtime Pack Audit

## Status

**DONE — waiting FINAL audit after save compatibility fix.** Đây là content integration; Combat Core, Meta V5 schema, fixed-path geometry và Balance V1 toàn cục không được thiết kế lại.

## Active production roster

- `trung-trac` — Trưng Trắc: HP 1250, ATK 36, Range 170, AttackSpeed 1.20, Crit 15%, CritDamage 150%; trigger 5.
- `trung-nhi` — Trưng Nhị: HP 950, ATK 33, Range 270, AttackSpeed 1.40, Crit 23%, CritDamage 165%; trigger 7.
- `le-chan` — Lê Chân: HP 1450, ATK 40, Range 155, AttackSpeed 1.10, Crit 20%, CritDamage 175%; trigger 5.

Đánh thường của cả ba là single-target qua shared CombatController. Không có DEF hay Hero-specific resolver.

## Shared skills

- Trống Đồng Lệnh Vương: AoE 170 / 4 mục tiêu, Damage 2.2 ATK, Stun 800 ms.
- Liên Hoàn Lạc Tiễn: MultiHit 3 / 140 ms, Damage 1.1 ATK, Slow 35% / 2000 ms.
- Sóng Trào Hải Tần: AoE 160 / 3 mục tiêu, Damage 2.0 ATK, Root 1500 ms.

Legendary concepts trong content docs được giữ dưới dạng mô tả deferred. Không chuyển thành ATK% hoặc cơ chế khác: AoE modifier/condition city, Crit arrow, Range/AttackSpeed, Root bonus, Crit/CritDamage đều chờ shared passive support.

## Enemies

| ID | Tên | Category | HP | MoveSpeed | CityDamage |
|---|---|---|---:|---:|---:|
| `han-sword-infantry` | Đông Hán Bộ Binh | sword | 80 | 50 | 1 |
| `han-crossbow-soldier` | Đông Hán Nỏ Thủ | archer | 55 | 64 | 1 |
| `han-armored-guard` | Đông Hán Thiết Giáp Binh | other | 145 | 36 | 2 |
| `boss-ma-vien` | Mã Viện | other | 1200 | 38 | 10 |

Mã Viện dùng cùng Enemy engine, chỉ khác data/visual identity. Bị hạ trong màn nghĩa là rút khỏi trận đánh chiến thuật này, không phải tuyên bố tử trận lịch sử.

## Chapter and waves

Map content ID `map-lang-bac-marsh`, title **Chương I — Huyết Chiến Lãng Bạc**; giữ nguyên kích thước, fixed path và placement tiles đã test.

1. Bộ Binh ×2
2. Bộ Binh ×2 + Nỏ Thủ ×1
3. Bộ Binh ×3 + Nỏ Thủ ×1
4. Thiết Giáp ×1 + Bộ Binh ×2
5. Thiết Giáp ×2 + Nỏ Thủ ×2 + Bộ Binh ×2
6. Nỏ Thủ ×5
7. Thiết Giáp ×2 + Bộ Binh ×3 + Nỏ Thủ ×2
8. Thiết Giáp ×4 + Bộ Binh ×2
9. Bộ Binh ×5 + Nỏ Thủ ×4 + Thiết Giáp ×2
10. Mã Viện ×1 + Thiết Giáp ×2 + Nỏ Thủ ×3

## Meta, rewards and compatibility

- Fresh Meta V5 bootstrap: đúng ba active Vietnam Hero.
- Recruitment: ba Hero active, weight bằng nhau; duplicate tạo `shard_hero_<heroId>`.
- Existing Tam Quốc definitions/data vẫn được giữ để validate/load save cũ, nhưng không xuất hiện trong active selector, recruitment hoặc HBT waves.
- Reward map dùng bốn HBT enemy IDs; Wallet vẫn chỉ Gold và KNB, Anh Hồn vẫn là consumable.
- Không schema bump, không xóa hoặc rewrite progression legacy.

### Existing V5 compatibility: PASS

Fixture hồi quy là một save Meta V5 literal từ trước VS-HBT-C01, chỉ chứa năm Hero Tam Quốc và không gọi bootstrap hiện hành để dựng dữ liệu. Tại runtime startup sau load/migration, content bootstrap bổ sung starter `trung-trac`, `trung-nhi`, `le-chan` còn thiếu ở 1★ / Normal / Lv1 và persist đúng một revision.

Mọi Hero entry legacy được giữ byte-equivalent ở cấp entry; profile, Wallet, Inventory/equipment, shard consumables, Command Energy, reward receipts và active-play progress không đổi. Timestamp commit dùng giá trị lớn hơn giữa wall clock và `updatedAtMs`, nên không thể lùi. Startup kế tiếp là no-op, không tăng revision hay tạo duplicate. Save vẫn là schema V5; năm Hero Tam Quốc tiếp tục được lưu nhưng inactive, còn selector, placement gate và Recruitment chỉ dùng đúng ba Hero HBT.

## Assets

Chưa có real HBT art. Runtime sử dụng neutral missing-asset fallback/initials; không map sang portrait Tam Quốc và không có Hero-specific visual code.

## Verification

- `npm test`: 24 files, 180 tests PASS.
- `npm run build`: PASS (chỉ còn bundle-size warning đã biết).
- `npm run preview`: HTTP 200.
- `git diff --check`: PASS.
