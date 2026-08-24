# Tài Liệu Thiết Kế Chiêu Mộ & Tiến Hóa Tướng (Hero Recruitment & Ascension Spec — HERO-A00)

## 1. Tổng Quan & Mục Tiêu Hệ Thống

Tài liệu này đặc tả toàn bộ luồng thiết kế, kiến trúc dữ liệu và giao diện người dùng cho tính năng **Chiêu Mộ Danh Tướng (Chiêu Hiền Các), Phân Định Hero Mới/Trùng, Nâng Sao và Tiến Hóa Bậc (Anh Hồn)** trong dự án **Huyền Sử TD**.

### 1.1. Các Nguyên Tắc & Quy Chuẩn Đã Khóa (Locked Principles)

1. **Chiêu Hiền Lệnh là Vật Phẩm (Item)**:
   * Chiêu Hiền Lệnh là **Item trong Hành Trang (Inventory)**, **tuyệt đối không phải Currency**.
   * Game duy trì nghiêm ngặt **đúng 2 loại Tiền tệ (Currencies)**: **Vàng (Gold)** và **Kim Nguyên Bảo (KNB)**. Tuyệt đối **không thêm loại tiền tệ thứ 3**.
2. **Nguồn Tiếp Nhận Hero Cơ Bản**:
   * Hero được nhận từ phần thưởng cốt truyện: **Hoàn thành Chapter** và **Vượt Ải Lần Đầu (First Clear Reward)**.
   * Ngoài ra, người chơi có thể chiêu mộ thêm qua tính năng **Chiêu Hiền Các** bằng vật phẩm **Chiêu Hiền Lệnh**.
3. **Phân Định Hero Mới vs Hero Trùng (Duplicate Resolution)**:
   * **Hero Mới (Chưa sở hữu)** $\rightarrow$ Mở khóa Hero vào Deck/Bộ sưu tập (`unlocked: true`, khởi đầu 1★), sẵn sàng xuất trận.
   * **Hero Trùng (Đã sở hữu)** $\rightarrow$ Tự động chuyển đổi thành **Mảnh Danh Tướng** riêng của chính Hero đó (`shard_hero_<heroId>`).
4. **Phân Định Công Dụng Nguyên Liệu Nâng Cấp**:
   * **Mảnh Danh Tướng (`shard_hero_<heroId>`)**: Material riêng cho từng Hero, sử dụng **duy nhất** cho tính năng **Nâng Sao (Star Ascension: 1★ $\rightarrow$ 5★)** (không có 6★). Nâng sao chỉ tăng 6 Core Stats cộng thẳng (HP, ATK, Range, AttackSpeed, Crit, CritDamage) qua bảng tăng trưởng; không có DEF và không tạo % modifier.
   * **Anh Hồn (`anh-hon`)**: Material **CHUNG** cho toàn bộ Hero, sử dụng **duy nhất** cho tính năng **Tiến Hóa Bậc (Evolution / Ascension)** qua 4 tầng:
     $$\text{Phổ Thông (Normal Lv1-100)} \rightarrow \text{Trùng Sinh (Rebirth Lv1-100)} \rightarrow \text{Tái Sinh (Reincarnation Lv1-100)} \rightarrow \text{Huyền Sử (Legendary)}$$
     *(Tầng Huyền Sử mở khóa Passive đặc quyền qua shared passive system; modifier % chỉ dành riêng cho Passive Huyền Sử)*.
5. **Ràng Buộc Kỹ Thuật & Kiến Trúc**:
   * Không tạo hệ R/SR/SSR hay phẩm chất Hero (hệ rarity Hero hiện chưa tồn tại).
   * Không tự ý chốt tỷ lệ gacha (Drop Rates), số lượt bảo hiểm (Pity Counter), giá quy đổi, hay số liệu tăng trưởng; mọi thông số được định nghĩa là **tham số cấu hình mở (OPEN)** chờ Game Design & Codex phê duyệt.
   * Tuân thủ triệt để luật Combat Core: Hero là Tower đứng yên, không có DEF, đòn đánh thường single-target, skill kích hoạt sau $N$ đòn qua hệ Skill Effects chung, không viết code combat riêng cho từng Hero.
   * Không sửa mã nguồn `src/**` trong task này.

---

## 2. Danh Mục Tài Liệu Chi Tiết

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [recruitment-system.md](recruitment-system.md) | Cơ chế Chiêu Hiền Các, tiêu hao Chiêu Hiền Lệnh, phân định Hero mới / Hero trùng (`shard_hero_<heroId>`), kèm Wireframe Chiêu Hiền & Kết quả. |
| [star-ascension.md](star-ascension.md) | Hệ thống Nâng Sao (1★ $\rightarrow$ 5★) bằng Mảnh Danh Tướng riêng, cộng thẳng 6 Core Stats (không DEF, không %), kèm Wireframe UI Sao. |
| [hero-evolution-anh-hon.md](hero-evolution-anh-hon.md) | Hệ thống Tiến Hóa 4 Bậc bằng Anh Hồn chung (`anh-hon`), mở Passive Huyền Sử qua shared passive system, kèm Wireframe UI Anh Hồn. |
| [chieu-hien-lenh-sources.md](chieu-hien-lenh-sources.md) | Quy định nguồn nhận Chiêu Hiền Lệnh (First Clear, Chapter, Thành Tựu, Tiệm KNB), lưu kho Inventory, kèm Wireframe Tra Cứu Nguồn. |
| [open-decisions.md](open-decisions.md) | Ma trận thông số mở (Rates, Pity, chi phí nâng sao, mốc Anh Hồn), rủi ro kỹ thuật và lộ trình tích hợp Codex/Antigravity. |
