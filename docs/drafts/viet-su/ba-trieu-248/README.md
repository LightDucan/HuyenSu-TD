# Bộ Tư Liệu Lịch Sử & Kịch Bản Sản Xuất: Khởi Nghĩa Bà Triệu (248 SCN)

**Chương Lịch Sử (Working Arc)**: `ARC-BT-01: Bà Triệu — Khởi Nghĩa Núi Nưa` (Working Title — Not Locked)
**Giai đoạn Lịch sử**: Năm 248 SCN (Thời kỳ Bắc thuộc lần 2 — Nhà Đông Ngô thời Tam Quốc cai trị Giao Châu)
**Phạm vi**: Tư liệu Lịch sử & Thiết Kế Kịch Bản Narrative cho Sản Xuất (History & Narrative Foundation Only — No Runtime Code)
**Vị trí Biên Niên**: Chương lịch sử sản xuất tiếp theo theo dòng thời gian sau Khởi Nghĩa Hai Bà Trưng (40–43 SCN)

---

## 1. Mục Tiêu & Tôn Chỉ Học Thuật (Mission Statement)

Tập tài liệu này xây dựng nền tảng tư liệu lịch sử chuẩn mực và có kỷ luật học thuật cao cho chiến dịch **Khởi Nghĩa Bà Triệu (Triệu Thị Trinh / Triệu Quốc Đạt) năm 248 SCN** chống lại ách thống trị của triều đình Đông Ngô.

### 1.1. Nguyên Tắc Cốt Lõi (Core Principles):
1. **Nghiêm Ngặt Phân Tầng Nguồn Sử Liệu**: Duy trì hệ thống 4 tầng nguồn (**T1 / T2 / T3 / T4**) xuyên suốt toàn bộ các tài liệu; mọi nhân vật, sự kiện, câu nói và địa danh đều được gắn nhãn độ tin cậy.
2. **Tách Bạch Lịch Sử Thực Chứng vs Dã Sử Dân Gian**:
   - Phân biệt rõ danh tính, anh trai Triệu Quốc Đạt, căn cứ Cửu Chân và viên tướng Đông Ngô Lục Dận (**T1/T2**) với các hình tượng huyền thoại hóa như "ngực dài ba thước", voi trắng một ngà, guốc ngà (**T3/Dân gian**).
   - Câu nói nổi tiếng *"Tôi muốn cưỡi cơn gió mạnh..."* được ghi nhận sớm nhất trong văn bản trung đại T2/T3 (*Toàn Thư*, *Lĩnh Nam Chích Quái*), là biểu tượng khí phách độc lập dân tộc cần được thể hiện đúng bản chất văn hóa / văn học.
3. **Phân Định Rõ Giới Hạn Sử Liệu Trận Đánh**:
   - Thư tịch sơ cấp (*Tam Quốc Chí* - *Ngô Thư*) chỉ ghi nhận quy mô: *"Năm 248, quân khởi nghĩa Giao Chỉ, Cửu Chân công hãm thành ấp, chấn động giao giới, Tôn Quyền sai Lục Dận sang dẹp"*.
   - Mọi diễn biến chiến thuật chi tiết, trận địa từng màn chơi Tower Defense đều được định danh minh bạch là **Phục Dựng Kịch Bản Gameplay (`COMPOSITE GAMEPLAY RECONSTRUCTION`)**.
4. **Ngôn Từ Kết Cục An Toàn (Historically Safe Outcome Wording)**:
   - Ghi nhận cái chết tuẫn tiết của Bà Triệu tại núi Tùng (Hậu Lộc, Thanh Hóa) theo truyền thống dã sử và quốc sử trung đại (T2/T3).
   - Không sáng tác sai lệch số phận lịch sử của các nhân vật có thật ở cả hai chiến tuyến (Bà Triệu, Triệu Quốc Đạt, Lục Dận).
5. **Tuyệt Đối Độc Lập Với Runtime Game**: Không can thiệp mã nguồn trò chơi (`src/**`), không chỉnh sửa test suite, không sửa đổi `PROJECT_PLAN.md` hay `task-board.md`.

---

## 2. Cấu Trúc Thư Mục Tư Liệu (Directory Index)

```
docs/drafts/viet-su/ba-trieu-248/
├── README.md                           # Tổng quan, tôn chỉ học thuật và cấu trúc thư mục (File này)
├── historical-context-and-timeline.md  # Bối cảnh thời Đông Ngô, diễn biến năm 248 và niên biểu
├── factions-and-commanders.md          # Danh mục phe Khởi nghĩa Cửu Chân vs Phe Đông Ngô đô hộ
├── hero-candidates.md                  # Khảo cứu ứng viên Tướng phe khởi nghĩa (Lịch sử & Khuyến nghị)
├── stage-candidates.md                 # 4–6 Ứng viên màn chơi chiến thuật, mục tiêu & ranh giới
├── historical-guardrails.md            # Rào chắn sử học bắt buộc cho Narrative, Game Design & Art
└── sources.md                          # Thư mục thư tịch T1–T4, đối chiếu thư tịch Hán - Việt
```

---

## 3. Hệ Thống Phân Tầng Nguồn (Source-Tier System)

* **Tầng 1 (T1 — Primary / Epigraphy / 3rd-Century Near-Source Records)**:
  - Thư tịch Tam Quốc — Lục Triều: *Tam Quốc Chí* (Trần Thọ — *Ngô Thư* Q47 *Tôn Quyền truyện*, Q60 *Lục Dận truyện*); trích dẫn cổ tịch trong *Giao Châu ký* (Lưu Hân Kỳ), *Nam Việt chí* (Thẩm Hoài Viễn).
  - Khảo cổ học thế kỷ III: Di tích mộ táng, thành lũy, đồ đồng Đông Sơn muộn / đồ sắt và đồ gốm thời Hán – Lục Triều tại lưu vực sông Mã, sông Chu (Thanh Hóa).
* **Tầng 2 (T2 — Medieval National Historiography)**:
  - Chính sử trung đại Việt Nam: *Đại Việt Sử Lược* (thế kỷ XIV), *Đại Việt Sử Ký Toàn Thư* (Ngô Sĩ Liên, 1479), *Khâm Định Việt Sử Thông Giám Cương Mục* (1884), *Việt Sử Tiêu Án* (1775).
* **Tầng 3 (T3 — Local Folklore / Thần Phả / Dã Sử)**:
  - Dã sử và thần tích địa phương: *Lĩnh Nam Chích Quái* (Truyện *Lệ Hải Bà Vương*), Thần tích đền Phú Điền (Hậu Lộc), Thần tích Đền Nưa (Am Tiên, Triệu Sơn), Thần tích đình làng vùng Thanh Hóa.
* **Tầng 4 (T4 — Modern Scholarship & Archaeology)**:
  - Nghiên cứu sử học thực chứng hiện đại của Viện Sử học, Đào Duy Anh, Trần Quốc Vượng, Phan Huy Lê, Hà Văn Tấn, Keith W. Taylor...
