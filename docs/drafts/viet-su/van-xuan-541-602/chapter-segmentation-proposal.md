# Đề Xuất Phân Kỳ Chương Sản Xuất: Thời Kỳ Vạn Xuân (541/542–602 SCN)

**Tài liệu**: `docs/drafts/viet-su/van-xuan-541-602/chapter-segmentation-proposal.md`
**Giai đoạn Lịch sử**: 541/542 – 602 SCN (60 năm lịch sử)
**Trạng thái**: Production Chapter Architecture & Segmentation Analysis (Recommendation Only)

---

## 1. Đặt Vấn Đề & Thách Thức Phân Kỳ (Problem Statement)

Thời kỳ từ khi Lý Bí khởi nghĩa (541/542) đến khi nhà Tùy đánh chiếm Vạn Xuân (602) kéo dài tròn **60 năm lịch sử**, trải qua 3 giai đoạn chính trị — quân sự có tính chất và nhân vật trung tâm hoàn toàn khác nhau:
1. **Thời kỳ Khai quốc & Đối đầu Trần Bá Tiên (541/542–548)**: Nhân vật chính là Lý Bí (Lý Nam Đế); đối thủ là Thứ sử Tiêu Tư và danh tướng Trần Bá Tiên (nhà Lương).
2. **Thời kỳ Dạ Trạch Kháng Lương & Phân Liệt Nội Bộ (548–571)**: Nhân vật chính là Triệu Quang Phục (Triệu Việt Vương); đối thủ là tướng Lương Dương Sàn, sau đó là xung đột chính trị với thế lực Lý Thiên Bảo / Lý Phật Tử.
3. **Thời kỳ Hậu Lý Nam Đế & Đối Đầu Nhà Tùy (571–602)**: Nhân vật chính là Lý Phật Tử; đối thủ là Đại quân viễn chinh của tướng Tùy Lưu Phương.

> [!IMPORTANT]
> **NGUYÊN TẮC THIẾT KẾ TRÒ CHƠI**: Tuyệt đối không gộp toàn bộ 60 năm lịch sử này thành một "Chapter" đơn lẻ. Việc gộp chung sẽ làm loãng nhân vật chính, phá vỡ cấu trúc cây kỹ năng Hero, gây xung đột bối cảnh kẻ thù (quân Lương vs quân Tùy cách nhau nửa thế kỷ), và làm mất nhịp độ cốt truyện.

---

## 2. Đánh Giá Các Phương Án Phân Kỳ (Candidate Segmentation Options)

---

### 2.1. Phương Án A: Phân Kỳ 2 Chương (Two-Chapter Structure)
* **Chapter A1 (541/542–548)**: `Lý Nam Đế — Dựng Nước Vạn Xuân` (Khởi nghĩa $\rightarrow$ Lập nước $\rightarrow$ Đánh Lương $\rightarrow$ Khuất Lão).
* **Chapter A2 (548–602)**: `Vạn Xuân — Kháng Lương Đến Kháng Tùy` (Dạ Trạch $\rightarrow$ Triệu Việt Vương $\rightarrow$ Hậu Lý $\rightarrow$ Lưu Phương 602).
* **Ưu điểm**: Giảm số lượng Chapter tổng thể của dự án.
* **Nhược điểm nghiêm trọng**:
  - Chapter A2 kéo dài tới 54 năm, ôm đồm hai nhân vật chính xung đột nhau (Triệu Quang Phục và Lý Phật Tử) và hai đế chế xâm lược khác nhau (nhà Lương thế kỷ VI vs nhà Tùy thế kỷ VII).
  - Nhân vật phản diện bị xé lẻ, không có cao trào xuyên suốt.

---

### 2.2. Phương Án B: Phân Kỳ 3 Chương Chuẩn Tắc (Three-Chapter Structure — RECOMMENDED)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│               PHƯƠNG ÁN B: CẤU TRÚC 3 CHƯƠNG SẢN XUẤT CHUẨN TẮC             │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│ ARC-VX-01 (541/542–548)  │ ARC-VX-02 (548–571)      │ ARC-VX-03 (571–602)   │
│ Lý Nam Đế — Khai Sáng    │ Triệu Việt Vương — Dạ    │ Hậu Lý Nam Đế — Cố    │
│ Vạn Xuân                 │ Trạch Quật Khởi          │ Thành Kháng Tùy       │
├──────────────────────────┼──────────────────────────┼───────────────────────┤
│ • Nhân vật: Lý Nam Đế,   │ • Nhân vật: Triệu Việt   │ • Nhân vật: Hậu Lý Nam│
│   Phạm Tu, Tinh Thiều,   │   Vương (Triệu Quang     │   Đế (Lý Phật Tử), Đại│
│   Triệu Túc              │   Phục)                  │   Quyền, Lý Phổ Đỉnh  │
│ • Đối kháng: Tiêu Tư,    │ • Đối kháng: Trần Bá     │ • Đối kháng: Tướng Tùy│
│   Trần Bá Tiên (Lương)   │   Tiên, Dương Sàn (Lương)│   Lưu Phương (Tùy)    │
│ • Trọng tâm: Khởi nghĩa, │ • Trọng tâm: Du kích đầm │ • Trọng tâm: 30 năm trị│
│   lập nước, đối đầu Trần │   lầy Dạ Trạch, khôi phục│   vì, giữ 3 thành cổ, │
│   Bá Tiên                │   Long Biên, biến cố 571 │   đối đầu đại quân Tùy│
│ • Kết cục: Rút về Khuất  │ • Kết cục: Thống nhất độc│ • Kết cục: Đầu hàng   │
│   Lão, trao quyền kháng  │   lập (550), kết cục bi  │   Lưu Phương bảo toàn │
│   chiến                  │   tráng tại Đại Nha (571)│   dân chúng (602)     │
└──────────────────────────┴──────────────────────────┴───────────────────────┘
```

---

### 2.3. Phương Án C: Phân Kỳ 4 Chương Siêu Chi Tiết (Four-Chapter Structure)
* Chia nhỏ thêm thời kỳ Triệu Việt Vương (548–550) và Hậu Lý Nam Đế phân chia đất nước (550–571).
* **Nhược điểm**: Quá vụn vặt, giai đoạn 550–571 không đủ tư liệu chiến trận để xây dựng 4–6 màn chơi Tower Defense độc lập.

---

## 3. Ma Trận So Sánh Đa Tiêu Chí Các Phương Án

| Tiêu Chí Đánh Giá | Phương Án A (2 Chương) | Phương Án B (3 Chương — KHUYẾN NGHỊ) | Phương Án C (4 Chương) |
|---|:---:|:---:|:---:|
| **1. Tính Mạch Lạc Lịch Sử** | Trung bình (A2 bị ôm đồm) | **Rất cao (Phản ánh đúng 3 thời kỳ chính trị)** | Cao |
| **2. Độ Rõ Nét Của Nhân Vật Chính (Protagonist)** | Thấp ở Chapter A2 | **Rất cao (Lý Bí $\rightarrow$ Triệu Quang Phục $\rightarrow$ Lý Phật Tử)** | Cao |
| **3. Độ Rõ Nét Của Kẻ Thù (Antagonist)** | Xung đột quân Lương vs quân Tùy | **Tách bạch hoàn hảo (Tiêu Tư/Trần Bá Tiên $\rightarrow$ Dương Sàn $\rightarrow$ Lưu Phương)** | Rất cao |
| **4. Sức Mạnh Đội Hình Hero Roster** | Bị loãng và chồng chéo | **Rất mạnh (Mỗi chương có 2–3 tướng tiêu biểu)** | Bị phân tán |
| **5. Tính Đa Dạng Của Màn Chơi (Stage Diversity)** | Dồn nén quá tải | **Hoàn hảo (Thành thị $\rightarrow$ Đầm lầy Dạ Trạch $\rightarrow$ Cố thành Phong Châu)** | Trùng lặp địa bàn |
| **6. An Toàn Kết Cục Lịch Sử (Safe Endings)** | Khó xử lý kết cục kép | **Rõ ràng, an toàn học thuật cho từng mốc lịch sử** | Rõ ràng |
| **7. Tỷ Lệ T3 Cần Phục Dựng Gameplay** | Cao ở Chapter A2 | **Cân bằng, minh bạch nguồn gốc từng giai đoạn** | Rất cao |
| **8. Tương Thích Kiến Trúc Engine Hiện Tại** | Khó đóng gói | **Cực kỳ phù hợp mô hình Episode / Chapter độc lập** | Quá nhiều Chapter |

---

## 4. Đặc Tả Chi Tiết 3 Chương Sản Xuất Khuyến Nghị (Option B Details)

---

### 4.1. Chapter 1: `ARC-VX-01: Lý Nam Đế — Khai Sáng Vạn Xuân` (541/542–548 SCN)
* **Tên gọi chính thức**: `Lý Nam Đế — Khai Sáng Vạn Xuân`
* **Thời gian lịch sử**: 541/542 – 548 SCN (khoảng 7 năm).
* **Nhân vật chính diện tiêu biểu**: **Lý Nam Đế (Lý Bí)**, **Phạm Tu**, **Tinh Thiều**, **Triệu Túc**.
* **Phe đối kháng chính**: Thứ sử Tiêu Tư, tướng Lương Lư Tử Hùng, Giao Châu thứ sử Dương Phiêu, Tư mã **Trần Bá Tiên (Chen Baxian)**.
* **Chủ đề gameplay**:
  - Giai đoạn đầu: Đánh đuổi quan lại đô hộ, công phá thành Long Biên, phòng ngự chống viện binh Lương và đánh dẹp quân Lâm Ấp tại Cửu Đức.
  - Giai đoạn sau: Đối đầu với cuộc phản kích quy mô lớn của Trần Bá Tiên tại Chu Diên, thành Tô Lịch, thành Gia Ninh và hồ Điển Triệt.
* **Kết cục an toàn kịch bản**: Triều đình rút về căn cứ hiểm trở động Khuất Lão (Phú Thọ); Lý Nam Đế lâm bệnh nặng trao quyền bính và trao kiếm báu cho Tướng quân Triệu Quang Phục tiếp tục lãnh đạo cuộc kháng chiến.

---

### 4.2. Chapter 2: `ARC-VX-02: Triệu Việt Vương — Dạ Trạch Quật Khởi` (548–571 SCN)
* **Tên gọi chính thức**: `Triệu Việt Vương — Dạ Trạch Quật Khởi`
* **Thời gian lịch sử**: 548 – 571 SCN (khoảng 23 năm).
* **Nhân vật chính diện tiêu biểu**: **Triệu Việt Vương (Triệu Quang Phục)**. *(Bộ tướng dã sử hỗ trợ: Tướng giữ đầm lầy Dạ Trạch)*.
* **Phe đối kháng chính**: Tướng Lương **Trần Bá Tiên** (giai đoạn đầu), Thứ sử Lương **Dương Sàn** (Yang Chan), và thế lực tranh chấp nội bộ **Lý Phật Tử**.
* **Chủ đề gameplay**:
  - Chiến tranh du kích đầm lầy độc đáo tại Đầm Dạ Trạch (Hưng Yên): phòng thủ mê cung lau sậy, dùng thuyền độc mộc xuất kích ban đêm cướp lương phá trại giặc.
  - Chớp thời cơ Trần Bá Tiên bị triệu về Bắc, nghĩa quân tổng phản công giết chết Dương Sàn, khôi phục kinh đô Long Biên năm 550.
  - Phân chia quyền lực tại Bãi Quân và biến cố năm 571.
* **Kết cục an toàn kịch bản**: Khôi phục trọn vẹn chủ quyền đất nước năm 550; sau biến cố bị đánh úp năm 571, Triệu Việt Vương rút về cửa biển Đại Nha tuẫn tiết, để lại bài học lịch sử sâu sắc về tinh thần cảnh giác.

---

### 4.3. Chapter 3: `ARC-VX-03: Hậu Lý Nam Đế — Cố Thành Kháng Tùy` (571–602 SCN)
* **Tên gọi chính thức**: `Hậu Lý Nam Đế — Cố Thành Kháng Tùy`
* **Thời gian lịch sử**: 571 – 602 SCN (khoảng 31 năm).
* **Nhân vật chính diện tiêu biểu**: **Hậu Lý Nam Đế (Lý Phật Tử)**, tướng **Đại Quyền** (giữ Long Biên), tướng **Lý Phổ Đỉnh** (giữ thành Ô Diên).
* **Phe đối kháng chính**: Tổng quản hành quân nhà Tùy **Lưu Phương (Liu Fang)** cùng 27 doanh bộ kỵ viễn chinh.
* **Chủ đề gameplay**:
  - Phòng thủ hệ thống ba tòa thành cổ liên hoàn: Cố thành Phong Châu (Việt Vương cố thành), thành Long Biên và thành Ô Diên.
  - Trận kịch chiến chặn địch tại quan ải hiểm trở Đỗ Long (Đô Long).
* **Kết cục an toàn kịch bản**: Trước sức ép quân sự áp đảo và tối hậu thư của Lưu Phương, Lý Phật Tử chấp nhận đầu hàng để tránh nạn binh đao thảm sát cho muôn dân, khép lại 60 năm lịch sử của Nước Vạn Xuân.

---

## 5. Kết Luận & Đề Xuất Ưu Tiên Triển Khai

1. **Khuyến Nghị Kiến Trúc**: Lựa chọn **Phương Án B (3 Chương)** làm cấu trúc chuẩn mực cho toàn bộ thời kỳ Vạn Xuân (541/542–602 SCN).
2. **Chương Khởi Đầu Sản Xuất Đề Xuất (First Production Chapter after Bà Triệu)**:
   - **`ARC-VX-01: Lý Nam Đế — Khai Sáng Vạn Xuân (541/542–548 SCN)`** là chương lịch sử tiếp theo có đầy đủ độ vững chắc về nguồn sử liệu T1/T2, nhân vật trung tâm kiệt xuất, kẻ thù lịch sử có tầm vóc (Trần Bá Tiên), và không gian màn chơi đa dạng nhất.
