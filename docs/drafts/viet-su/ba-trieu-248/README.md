# Bộ Tư Liệu Lịch Sử & Kịch Bản Sản Xuất: Khởi Nghĩa Bà Triệu (248 SCN)

**Chương Lịch Sử (Working Arc)**: `ARC-BT-01: Bà Triệu — Khởi Nghĩa Núi Nưa` (Working Title — Not Locked)
**Giai đoạn Lịch sử**: Năm 248 SCN (Thời kỳ Bắc thuộc lần 2 — Nhà Đông Ngô thời Tam Quốc cai trị Giao Châu)
**Phạm vi**: Tư liệu Lịch sử & Thiết Kế Kịch Bản Narrative cho Sản Xuất (History & Narrative Foundation Only — No Runtime Code)
**Vị trí Biên Niên**: Chương lịch sử sản xuất tiếp theo theo dòng thời gian sau Khởi Nghĩa Hai Bà Trưng (40–43 SCN)

---

## 1. Mục Tiêu & Tôn Chỉ Học Thuật (Mission Statement)

Tập tài liệu này xây dựng nền tảng tư liệu lịch sử chuẩn mực và có kỷ luật học thuật cao cho chiến dịch **Khởi Nghĩa Bà Triệu năm 248 SCN** chống lại ách thống trị của triều đình Đông Ngô.

### 1.1. Nguyên Tắc Cốt Lõi (Core Principles):
1. **Nghiêm Ngặt Phân Tầng Nguồn Sử Liệu**: Duy trì hệ thống phân tầng nguồn học thuật (**T1 / NEAR-SOURCE / T2 / T3 / T4**); mọi nhân vật, sự kiện, câu nói và địa danh đều được gắn nhãn độ tin cậy.
2. **Khảo Cứu Thực Chứng Thư Tịch Sơ Cấp (*Tam Quốc Chí*)**:
   - *Tam Quốc Chí* (T1) ghi nhận năm Xích Ô thứ 11 (248 SCN), nghĩa quân Giao Chỉ, Cửu Chân công hãm thành ấp, toàn cõi tao loạn; Tôn Quyền cử Lục Dận sang bình định. Đoạn văn này **không ghi trực tiếp tên Bà Triệu / Triệu Ẩu**.
   - Danh xưng "Triệu Ẩu" cùng hình tượng cưỡi voi đánh trận xuất hiện trong các nguồn thứ cấp gần thời (Near-Source) thời Tấn – Lưu Tống (*Giao Châu ký*, *Nam Việt chí*) và chính sử trung đại Việt Nam (*Toàn Thư*, *Cương Mục*).
3. **Phân Định Ranh Giới Lịch Sử Thực Chứng vs Dã Sử & Truyền Thuyết Địa Phương**:
   - Tên gọi *Triệu Thị Trinh*, anh trai *Triệu Quốc Đạt*, và câu nói nổi tiếng *"Tôi muốn cưỡi cơn gió mạnh..."* gắn liền với các công trình địa chí, thần tích địa phương thời muộn (như *Thanh Hóa kỷ thắng*, thần phả đền miếu). Đây là các biểu tượng văn hóa quý giá được khuyến nghị cho kịch bản narrative nhưng không gán nhãn là văn bản xác thực thế kỷ III.
   - Thần thoại hóa thân thể (ngực dài ba thước ghi trong *Giao Châu ký*) là cái nhìn dị biệt của sử liệu phương Bắc thời Tấn, tuyệt đối bị loại bỏ khỏi mỹ thuật và kịch bản game.
4. **Hiệu Chỉnh Chuẩn Xác Về Tướng Đông Ngô Lục Dận (Lu Yin)**:
   - Lục Dận (tự Kính Tông) là tộc tử (con cháu trong họ / tộc nhân, em họ Lục Khải) của Thừa tướng Lục Tốn, không phải cháu ruột trực hệ.
   - Lục Dận giữ chức Giao Châu thứ sử kiêm An Nam hiệu úy, sau khi dẹp yên được gia phong **An Nam tướng quân** (không phải Bình Nam tướng quân).
   - Con số 8.000 quân trong *Lục Dận truyện* là số quân do Lục Dận chiêu mộ / thu nạp và điều động trong suốt quá trình bình định, **không phải quân số của một đạo quân viễn chinh ban đầu**.
5. **Ngôn Từ Kết Cục An Toàn & Độc Lập Với Runtime Game**:
   - Ghi nhận việc cuộc khởi nghĩa bị dẹp yên vào cuối năm 248 và truyền thuyết Bà Triệu tuẫn tiết tại núi Tùng. Không bịa đặt chiến thắng quân sự hay cái chết của Lục Dận.
   - Không can thiệp mã nguồn trò chơi (`src/**`), không chỉnh sửa test suite, không sửa đổi `PROJECT_PLAN.md` hay `task-board.md`.

---

## 2. Cấu Trúc Thư Mục Tư Liệu (Directory Index)

```
docs/drafts/viet-su/ba-trieu-248/
├── README.md                           # Tổng quan, tôn chỉ học thuật và cấu trúc thư mục (File này)
├── historical-context-and-timeline.md  # Bối cảnh thời Đông Ngô, diễn biến năm 248 và niên biểu
├── factions-and-commanders.md          # Danh mục phe Khởi nghĩa Cửu Chân vs Phe Đông Ngô đô hộ
├── hero-candidates.md                  # Khảo cứu ứng viên Tướng phe khởi nghĩa (Core 1 + Conditional)
├── stage-candidates.md                 # 4–6 Ứng viên màn chơi chiến thuật, mục tiêu & ranh giới
├── historical-guardrails.md            # Rào chắn sử học bắt buộc cho Narrative, Game Design & Art
└── sources.md                          # Thư mục thư tịch T1–T4, Ma trận đối chiếu Luận điểm - Nguồn
```

---

## 3. Hệ Thống Phân Tầng Nguồn (Source-Tier System)

* **Tầng 1 (T1 — Primary / Contemporary Records)**:
  - *Tam Quốc Chí* (Trần Thọ, thế kỷ III — *Ngô Thư* Q47 *Tôn Quyền truyện*, Q61 *Lục Khải truyện - phụ Lục Dận*).
  - Khảo cổ học thế kỷ III: Di tích thành lũy, mộ táng thời Hán – Lục Triều tại lưu vực sông Mã, sông Chu (Thanh Hóa).
* **Nguồn Thứ Cấp Gần Thời (Near-Source / Jin & Liu-Song Dynasties)**:
  - Các trích dẫn cổ tịch còn bảo lưu qua thư tịch đời sau: *Giao Châu ký* (Lưu Hân Kỳ, đời Tấn), *Nam Việt chí* (Thẩm Hoài Viễn, đời Lưu Tống).
* **Tầng 2 (T2 — Medieval National Historiography)**:
  - Chính sử trung đại Việt Nam: *Đại Việt Sử Lược* (thế kỷ XIV), *Đại Việt Sử Ký Toàn Thư* (Ngô Sĩ Liên, 1479), *Khâm Định Việt Sử Thông Giám Cương Mục* (1884), *Việt Sử Tiêu Án* (1775).
* **Tầng 3 (T3 — Late Local Historiography / Folklore / Thần Phả)**:
  - Địa chí và thần tích địa phương: *Thanh Hóa kỷ thắng*, *Lĩnh Nam Chích Quái*, Thần tích đền Phú Điền (Hậu Lộc), Thần tích Đền Nưa (Triệu Sơn).
* **Tầng 4 (T4 — Modern Scholarship & Archaeology)**:
  - Nghiên cứu sử học thực chứng hiện đại của Viện Sử học, Đào Duy Anh, Trần Quốc Vượng, Phan Huy Lê, Hà Văn Tấn, Keith W. Taylor...
