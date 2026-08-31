# Bộ Tư Liệu Khảo Cứu Lịch Sử & Đặc Tả Chiến Dịch: Mai Thúc Loan / Mai Hắc Đế (722 SCN)

**Giai đoạn Lịch sử**: Thời kỳ Khai Nguyên đời Đường Huyền Tông (Trọng tâm thực chứng: Năm 722 SCN)
**Phạm vi**: Khảo Cứu Sử Học Thực Chứng & Đề Xuất Quy Mô Chương Sản Xuất (History & Production Foundation Only — No Runtime Code)
**Vị trí Biên Niên**: Kỷ nguyên kháng Đường tiêu biểu thế kỷ VIII, nối tiếp thời kỳ Vạn Xuân (541–602) và mở đường cho các phong trào tự chủ Phùng Hưng, Khúc Thừa Dụ sau này.

---

## 1. Mục Tiêu & Tôn Chỉ Học Thuật (Mission Statement)

Tập tài liệu này xây dựng nền tảng khảo cứu sử học có kỷ luật học thuật nghiêm ngặt cho phong trào khởi nghĩa của **Mai Thúc Loan (Mai Hắc Đế) vào năm 722 SCN**.

### 1.1. Nguyên Tắc Cốt Lõi (Core Principles):
1. **Phân Định Nguồn Thư Tịch Triều Đại Thế Kỷ X–XI (T1)**:
   - Tách bạch chính xác văn bản từng quyển: *Cựu Đường Thư* (945 SCN), *Tân Đường Thư* (1060 SCN), *Đường Hội Yếu* (961 SCN), và *Tư Trị Thông Giám* (1084 SCN).
   - Nêu rõ các dị bản tên gọi trong văn bản cổ: **Mai Thúc Loan (梅叔鸞)**, **Mai Huyền Thành (梅玄成)**, và **Mai Thúc Yên (梅叔焉)** (kèm phần *Khảo dị* của Tư Mã Quang).
   - Nhấn mạnh khoảng cách thời gian biên soạn (thế kỷ X–XI, cách biến cố từ 2 đến hơn 3 thế kỷ) lưu giữ các truyền bản thời Đường, đi kèm thiên kiến cung đình của sử quan phong kiến phương Bắc.
2. **Khảo Cứu Phân Định Niên Đại & Bất Đồng Lịch Pháp**:
   - *Cựu Đường Thư* Q8 chép mùa thu, tháng 8 âm lịch năm Khai Nguyên thứ 10 (722 SCN); *Tân Đường Thư* Q5 và *Cương Mục* chép mùa thu, tháng 7 âm lịch (ngày Bính Tuất); *Tư Trị Thông Giám* Q212 ghi nhận sự mâu thuẫn lịch pháp trong phần *Khảo dị*.
   - Khuyến nghị quy chuẩn kịch bản trò chơi sử dụng an toàn: **"Năm 722 SCN"** mà không cưỡng ép một ngày tháng âm lịch duy nhất.
   - Các phần liệt truyện (*Cựu Đường Thư* Q184, *Tân Đường Thư* Q207) dùng khung thời gian **Khai Nguyên sơ (開元初)**; thuyết "713–722 (10 năm độc lập)" là suy đoán tổng hợp của sử học hiện đại thế kỷ XX (*Lịch sử Việt Nam* - 1971), không phải văn bản xác thực nguyên gốc của T1/T2.
3. **Phân Tách Văn Bản Quốc Sử Việt Nam (T2) & Tái Định Tầng Địa Danh**:
   - Tách bạch văn bản chính văn của *Toàn Thư* (1479) và *Cương Mục* (1884) với các lời khảo chú, trích dẫn dịch thuật.
   - *Hoan Châu*: Được xác nhận trong chính sử Việt Nam (*Cương Mục* T2).
   - *Sa Nam / Hùng Sơn / Vệ Sơn / Vạn An*: Thuộc tầng địa chí / truyền thống địa phương (T3) và nhận diện thực địa cận hiện đại; thư tịch T1 không ghi tên Sa Nam / Vạn An.
4. **Khóa Kiến Trúc Quy Mô 3 Màn Chơi Tinh Gọn (3-Stage Scope Lock)**:
   - Dựa trên 3 điểm tựa quân sự có ghi chép thư tịch: Khởi nghĩa Hoan Châu $\rightarrow$ Công hãm An Nam phủ (`hãm An Nam phủ` - *Cựu Đường Thư* Q184) $\rightarrow$ Đạo quân Phục Ba cố đạo tập kích và dập tắt năm 722.
   - Khóa cấu trúc: **Mini-Chapter 3 Màn Chơi Chuẩn Tắc (`ARC-MTL-01`)**.
5. **Độc Lập Tuyệt Đối Với Runtime Game**:
   - Không can thiệp mã nguồn trò chơi (`src/**`), không sửa test suite, không sửa đổi `PROJECT_PLAN.md` hay `task-board.md`.

---

## 2. Cấu Trúc Thư Mục Tư Liệu (Directory Index)

```
docs/drafts/viet-su/mai-thuc-loan-722/
├── README.md                           # Tổng quan, tôn chỉ học thuật và cấu trúc tài liệu (File này)
├── historical-context-and-timeline.md  # Khảo cứu bối cảnh thế kỷ VIII, niên biểu 722 vs Khai Nguyên sơ, và tiền đề 687
├── factions-and-commanders.md          # Danh mục phe Khởi nghĩa Hoan Châu vs Phe Đô hộ Nhà Đường
├── hero-candidates.md                  # Khảo cứu ứng viên Tướng (Core 1: Mai Thúc Loan + T3/Composite)
├── stage-candidates.md                 # Khóa cấu trúc 3 Màn chơi chuẩn cho Mini-Chapter ARC-MTL-01 & Khung kết cục an toàn
├── chapter-scope-proposal.md          # Đề xuất quy mô Chapter (Khóa Option B: Mini-Chapter 3 Stages)
├── historical-guardrails.md            # Rào chắn sử học bắt buộc cho Narrative, Game Design & Art
└── sources.md                          # Thư mục thư tịch T1–T4, Ma trận đối chiếu Luận điểm - Nguồn toàn diện
```

---

## 3. Tóm Tắt Khung Phân Tầng Nguồn (Source-Tier Framework)

* **Tầng 1 (T1 — Later Dynastic Histories Preserving Tang-Era Traditions)**:
  - *Cựu Đường Thư* (945 SCN), *Tân Đường Thư* (1060 SCN), *Đường Hội Yếu* (961 SCN), *Tư Trị Thông Giám* (1084 SCN). Biên soạn thế kỷ X–XI dựa trên hồ sơ triều trước.
* **Tầng 2 (T2 — Medieval National Historiography)**:
  - *Đại Việt Sử Ký Toàn Thư* (1479), *Khâm Định Việt Sử Thông Giám Cương Mục* (1884), *Việt Sử Tiêu Án* (1775).
* **Tầng 3 (T3 — Late Local Historiography / Temple Records / Folklore)**:
  - Thần tích đền thờ Vạn An, Sa Nam, Hùng Sơn, truyền tích gánh vải rú Đụn, thần tích Mai Thiếu Đế (Mai Thúc Huy), gia phả họ Mai.
* **Tầng 4 (T4 — Modern Scholarship & Field Topography)**:
  - Nhận diện thực địa Sa Nam / Hùng Sơn (Nam Đàn, Nghệ An), các công trình nghiên cứu của Viện Sử học, Đào Duy Anh, Phan Huy Lê, Keith W. Taylor.
* **COMPOSITE RECONSTRUCTION**:
  - Phục dựng kịch bản gameplay Tower Defense dựa trên các điểm tựa quân sự thực chứng.
