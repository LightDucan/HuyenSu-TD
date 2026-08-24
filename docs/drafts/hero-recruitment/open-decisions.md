# Tổng Hợp Quyết Định Còn Mở & Rủi Ro Kỹ Thuật (Open Decisions — HERO-A00)

## 1. Bảng Tổng Hợp Thông Số & Quyết Định Còn Mở (Open Parameters Matrix)

> [!IMPORTANT]
> **Quy ước Placeholder & Ranh giới Quyết định**:
> - Các nội dung trong cột "Đề Xuất Khảo Sát / Placeholder" chỉ mang tính chất định hướng giải pháp kỹ thuật, **tuyệt đối không phải số liệu balance thực tế và không dùng trực tiếp cho implementation** trước khi được Game Design & Codex phê duyệt.
> - Các cơ chế đã **LOCKED**:
>   - Chiêu Hiền Lệnh là **Item trong Hành Trang**, không phải Currency.
>   - Hệ thống kinh tế duy trì **đúng 2 loại Tiền tệ** (Vàng & KNB), không thêm tiền tệ thứ 3.
>   - Nhận Hero từ **Hoàn thành Chapter / Vượt Ải Lần Đầu (First Clear)** và **Chiêu Hiền Các**.
>   - Hero mới $\rightarrow$ **Mở khóa Hero**.
>   - Hero trùng $\rightarrow$ Tự động chuyển đổi thành **Mảnh Danh Tướng của chính Hero đó**.
>   - Mảnh Danh Tướng dùng **duy nhất cho Nâng Sao (1★ $\rightarrow$ 6★)**.
>   - Anh Hồn dùng **duy nhất cho Tiến Hóa Bậc (Normal $\rightarrow$ Rebirth $\rightarrow$ Reincarnation $\rightarrow$ Legendary)**.
>   - Hero không có DEF, đòn đánh thường single-target, skill kích hoạt sau $N$ đòn qua hệ Skill Effects chung.

| Hệ Thống | Thông Số / Quyết Định Còn Mở | Đề Xuất Khảo Sát / Placeholder | Trạng Thái & Ghi Chú |
|---|---|---|---|
| **1. Chiêu Hiền Các** | Bảng tỷ lệ xuất hiện (Drop Rates) | • `[Placeholder: Tỷ lệ rơi theo nhóm phẩm chất Danh Tướng]`<br>• Tỷ lệ rơi Mảnh/Vật phẩm phụ trợ (nếu có) | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **2. Chiêu Hiền Các** | Số lượt bảo hiểm (Pity System) | • `[Placeholder: Đảm bảo Danh Tướng sau N lượt chiêu mộ]`<br>• Cơ chế Hard Pity / Soft Pity | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **3. Chiêu Hiền Các** | Số lượng Mảnh quy đổi khi quay trùng Hero | • `[Placeholder: Định mức số mảnh quy đổi khi trùng]`<br>• Quy đổi theo phẩm chất (R/SR/SSR hoặc Cốt Truyện) | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **4. Nâng Sao** | Bảng số lượng Mảnh Danh Tướng theo mốc Sao | • `[Placeholder: Mảnh cần cho 1★ -> 2★ -> 3★ -> 4★ -> 5★ -> 6★]`<br>• Tăng tuyến tính hoặc theo bậc thang | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **5. Nâng Sao** | Hệ số tăng trưởng chỉ số theo Sao | • `[Placeholder: % Khuếch đại chỉ số cơ bản HP, ATK, Range, ASPD theo sao]` | **OPEN** — Chờ Game Design & Codex phê duyệt (Tuyệt đối không có DEF). |
| **6. Tiến Hóa Bậc** | Số lượng Anh Hồn cần cho từng tầng | • `[Placeholder: Mức Anh Hồn cho Trùng Sinh / Tái Sinh / Huyền Sử]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **7. Tiến Hóa Bậc** | Nguồn thu thập Anh Hồn | • `[Placeholder: Rương cốt truyện / Tháp thử thách / Sự kiện danh tướng]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **8. Chiêu Hiền Lệnh** | Giá bán quy đổi bằng KNB trong Kỳ Trân Các | • `[Placeholder: Mức giá KNB cho 1 lệnh bài / gói 10 lệnh bài]` | **OPEN** — Chờ Game Design & Codex phê duyệt (Mua bằng KNB, không thêm currency). |
| **9. Chiêu Hiền Lệnh** | Định mức thưởng Chiêu Hiền Lệnh First Clear | • `[Placeholder: Số lượng lệnh bài thưởng tại các ải cốt truyện]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |

---

## 2. Rủi Ro Kỹ Thuật & Ràng Buộc Kiến Trúc (Architecture Constraints)

1. **Nguyên tắc "Không Game Logic tại React UI"**:
   * *Rủi ro*: React component tự sinh số ngẫu nhiên Gacha bằng `Math.random()`, tự phán đoán tướng trùng hay tự tăng sao trong state local.
   * *Ràng buộc*: Toàn bộ logic RNG, kiểm tra duplicate, trừ Chiêu Hiền Lệnh/Mảnh Tướng/Anh Hồn phải được thực thi tại Domain Core của Codex. UI chỉ gửi Request Actions và render State Snapshot nhận được.

2. **Phân Định Tuyệt Đối Mảnh Tướng vs Anh Hồn**:
   * *Rủi ro*: Sử dụng lẫn lộn giữa Mảnh Danh Tướng (dành cho Sao) và Anh Hồn (dành cho Tiến Hóa) gây sai lệch kinh tế tiến trình.
   * *Ràng buộc*: Schema dữ liệu phải tách biệt rõ: `shard_hero_<id>` cho Star Ascension và `soul_hero_<id>` cho Evolution Tier Ascension.

3. **Bảo Toàn Luật Chiến Đấu (Combat Core Immutability)**:
   * *Rủi ro*: Nâng sao hay tiến hóa tướng tự ý thêm chỉ số DEF, đòn đánh lan (AoE) vào Normal Attack, hoặc tạo skill hardcoded riêng cho từng tướng.
   * *Ràng buộc*: Mọi nâng cấp chỉ tác động vào Core Stats (`hp`, `atk`, `range`, `attackSpeed`, `crit`, `critDamage`) và Passive Huyền Sử thông qua framework Skill Effects dùng chung.

---

## 3. Lộ Trình Phối Hợp Đề Xuất (Next Steps for Codex & Antigravity)

* **Bước 1 (Codex)**: Đánh giá tài liệu thiết kế HERO-A00, phê duyệt các mốc thông số trong bảng quyết định mở.
* **Bước 2 (Codex)**: Xây dựng các module nghiệp vụ Core (Hero Roster Management, Duplicate Resolver, Star Ascension Calculator, Evolution Tier Manager, Seeded Recruitment RNG).
* **Bước 3 (Antigravity)**: Hiện thực hóa giao diện React UI (Màn Chiêu Hiền Các, Modal Kết quả tướng mới/trùng, Tab Nâng Sao, Tab Tiến Hóa & Anh Hồn, Modal Tra cứu Nguồn nhận) tích hợp trực tiếp với Callbacks do Codex cung cấp.
