# Bộ Tư Liệu Khảo Cứu Lịch Sử & Phân Kỳ Chiến Dịch: Thời Kỳ Vạn Xuân (541/542–602 SCN)

**Giai đoạn Lịch sử**: 541/542 – 602 SCN (Từ cuộc khởi nghĩa Lý Bí, lập nước Vạn Xuân đến khi nhà Tùy đánh chiếm)
**Phạm vi**: Khảo Cứu Sử Học Thực Chứng & Đề Xuất Phân Kỳ Chương Sản Xuất (History & Production Foundation Only — No Runtime Code)
**Vị trí Biên Niên**: Kỷ nguyên độc lập - tự chủ tiếp theo sau Khởi nghĩa Bà Triệu (248 SCN)

---

## 1. Mục Tiêu & Tôn Chỉ Học Thuật (Mission Statement)

Tập tài liệu này xây dựng nền tảng khảo cứu sử học toàn diện, có kỷ luật học thuật nghiêm ngặt cho thời kỳ **60 năm Nhà Tiền Lý và Nước Vạn Xuân (541/542–602 SCN)**.

### 1.1. Nguyên Tắc Cốt Lõi (Core Principles):
1. **Nghiêm Ngặt Phân Tầng Nguồn Sử Liệu**:
   - Áp dụng hệ thống phân tầng nguồn chuẩn mực: **T1** (Thư tịch triều đại đương thời: *Lương Thư*, *Trần Thư*, *Nam Sử*, *Tùy Thư*), **T2** (Chính sử trung đại Việt Nam: *Đại Việt Sử Lược*, *Đại Việt Sử Ký Toàn Thư*, *Cương Mục*), **T3** (Dã sử, thần tích, truyền thuyết dân gian), **T4** (Khảo cổ học & Sử học hiện đại), và **COMPOSITE RECONSTRUCTION** (Phục dựng kịch bản gameplay).
2. **Cảnh Báo Nguồn Về Triệu Quang Phục & Dạ Trạch**:
   - Sử gia Ngô Sĩ Liên trong *Đại Việt Sử Ký Toàn Thư* (T2) đã thẳng thắn ghi chú: *"Sử cũ không chép tường tận chuyện Triệu Việt Vương và Đào Lang Vương, nay nhặt nhạnh từ dã sử và các sách khác chép vào..."*.
   - Do đó, mọi chi tiết về chiến thuật du kích Dạ Trạch, các trận đánh ban đêm, truyền thuyết "móng rồng thần" và bi kịch Nhã Lang – Cảo Nương đều thuộc tầng **Dã sử / Thần phả (T3)** hoặc **Mô-típ văn học**, tuyệt đối không biến thành T1/T2 fact.
3. **Phân Định Ranh Giới Khái Niệm "Vạn Xuân"**:
   - Quốc hiệu "Vạn Xuân" và niên hiệu "Thiên Đức" xuất hiện sớm nhất trong chính sử trung đại Việt Nam (T2), phản ánh khát vọng ngàn đời thái bình của dân tộc; thư tịch phong kiến phương Bắc (T1) chỉ chép "Lý Bôn tự xưng Hoàng đế".
4. **Không Gộp Cưỡng Ép 60 Năm Lịch Sử Thành Một Chương Đơn Lẻ**:
   - Đánh giá đa chiều và đề xuất phương án phân kỳ sản xuất hợp lý (**Option B — 3 Chapters: Lý Nam Đế $\rightarrow$ Triệu Việt Vương $\rightarrow$ Hậu Lý Nam Đế / Kháng Tùy**), đảm bảo tính mạch lạc của nhân vật chính, nhân vật đối kháng và nhịp độ lối chơi.
5. **Độc Lập Tuyệt Đối Với Runtime Game**:
   - Không can thiệp mã nguồn trò chơi (`src/**`), không sửa test suite, không sửa đổi `PROJECT_PLAN.md` hay `task-board.md`.

---

## 2. Cấu Trúc Thư Mục Tư Liệu (Directory Index)

```
docs/drafts/viet-su/van-xuan-541-602/
├── README.md                           # Tổng quan, tôn chỉ học thuật và cấu trúc tài liệu (File này)
├── historical-context-and-timeline.md  # Khảo cứu bối cảnh thế kỷ VI–VII, niên biểu và đối chiếu dị bản
├── chapter-segmentation-proposal.md   # Đánh giá các phương án phân kỳ Chapter (Option A/B/C) & Khuyến nghị
├── factions-and-commanders.md          # Danh mục phe Vạn Xuân vs Phe Đô hộ (Lương / Trần / Tùy)
├── hero-candidates.md                  # Khảo cứu ứng viên Tướng theo từng Chapter đề xuất (No mechanics)
├── stage-candidates.md                 # 4–6 Ứng viên màn chơi cho từng Chapter đề xuất & Ranh giới kết cục
├── historical-guardrails.md            # Rào chắn sử học bắt buộc cho Narrative, Game Design & Art
└── sources.md                          # Thư mục thư tịch T1–T4, Ma trận đối chiếu Luận điểm - Nguồn
```

---

## 3. Tóm Tắt Khung Phân Tầng Nguồn (Source-Tier Framework)

* **Tầng 1 (T1 — Contemporary Dynastic Histories)**:
  - *Lương Thư* (636 SCN), *Trần Thư* (636 SCN), *Nam Sử* (659 SCN), *Tùy Thư* (636 SCN). Ghi nhận biến cố Lý Bôn đánh đuổi Tiêu Tư, các chiến dịch của Trần Bá Tiên (545–548), và chiến dịch Lưu Phương bình định Giao Châu năm 602.
* **Tầng 2 (T2 — Medieval National Historiography)**:
  - *Đại Việt Sử Lược* (thế kỷ XIV), *Đại Việt Sử Ký Toàn Thư* (1479), *Khâm Định Việt Sử Thông Giám Cương Mục* (1884), *Việt Sử Tiêu Án* (1775).
* **Tầng 3 (T3 — Late Local Historiography / Folklore / Thần Phả)**:
  - Thần tích đền Dạ Trạch, đình Thanh Liệt (Phạm Tu), miếu Lý Nam Đế (Khuất Lão / Tam Nông), truyền thuyết móng rồng thần, dã sử Nhã Lang – Cảo Nương.
* **Tầng 4 (T4 — Modern Scholarship & Archaeology)**:
  - Nghiên cứu của Viện Sử học, Đào Duy Anh, Trần Quốc Vượng, Hà Văn Tấn, Keith W. Taylor (*The Birth of Vietnam*).
* **COMPOSITE RECONSTRUCTION**:
  - Phục dựng kịch bản gameplay Tower Defense dựa trên cơ sở địa bàn địa lý và bối cảnh lịch sử thực tế.
