# Hệ Thống Kẻ Địch (Enemy Roster) — Thời Hai Bà Trưng (VS-HBT-02)

## 1. Nguyên Tắc Thiết Kế Kẻ Địch (Enemy Rules)

Tất cả các loại Kẻ Địch trong bộ Pack này tuân thủ nghiêm ngặt các giới hạn kiến trúc Tower Defense của dự án:
* **Di chuyển**: Chỉ di chuyển theo tuyến đường cố định (`fixedPath`) từ điểm xuất phát (Entrance) đến cổng thành (Exit).
* **Không tấn công Hero**: Không có cơ chế đánh Hero, không gây sát thương lên Hero, không có A* hay dynamic pathfinding.
* **Không có Mana / Kỹ năng độc lập**: Không có hệ thống phép thuật hay cơ chế hồi máu riêng.
* **Không có DEF**: Game tuân thủ luật cốt lõi *Không có DEF*; độ bền của kẻ địch biểu thị qua chỉ số sinh lực `maxHp`.
* **Boss quy chuẩn**: Boss (`Mã Viện`) tuân theo cùng hệ thống Enemy cơ bản, tạo sự khác biệt thông qua hình ảnh visual, lượng HP cực cao và CityDamage lớn, không thêm cơ chế AI hay hệ thống mới.

---

## 2. Danh Sách Kẻ Địch & Phân Bổ Category

| ID Nháp | Tên Hiển Thị | Category | Mức HP | Tốc Độ (MoveSpeed) | CityDamage | Vai Trò Gameplay |
|---|---|---|---|---|---|---|
| `han-sword-infantry` | **Đông Hán Bộ Binh** | `sword` | Trung bình (~80) | Trung bình (~50) | Thấp (1) | Lính xung kích cơ bản, số lượng đông đảo, di chuyển đều đặn. |
| `han-crossbow-soldier` | **Đông Hán Nỏ Thủ** | `archer` | Thấp (~55) | Nhanh (~64) | Thấp (1) | Lính tầm xa chạy nhanh, máu mỏng, gây áp lực khi bứt tốc theo đàn. |
| `han-armored-guard` | **Đông Hán Thiết Giáp Binh** | `other` | Cao (~145) | Chậm (~36) | Cao (2) | Lực sĩ khiên sắt lì đòn, làm lá chắn gánh chịu sát thương mở đường. |
| `boss-ma-vien` | **Boss: Mã Viện (Phục Ba Tướng Quân)** | `other` | Cực Cao (~1200) | Trung bình – Chậm (~38) | Cực Cao (10) | Boss tối cao Wave 10, đe dọa trực tiếp thành trì nếu lọt qua. |

---

## 3. Danh Mục Hồ Sơ Kẻ Địch Chi Tiết

* [enemy-han-bo-binh.md](enemy-han-bo-binh.md) — Đông Hán Bộ Binh (`sword`)
* [enemy-han-no-thu.md](enemy-han-no-thu.md) — Đông Hán Nỏ Thủ (`archer`)
* [enemy-han-giap-binh.md](enemy-han-giap-binh.md) — Đông Hán Thiết Giáp Binh (`other`)
* [boss-ma-vien.md](boss-ma-vien.md) — Boss: Mã Viện (`other`)
