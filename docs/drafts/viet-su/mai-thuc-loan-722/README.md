# Bộ Tư Liệu Khảo Cứu Lịch Sử & Đặc Tả Chiến Dịch: Mai Thúc Loan / Mai Hắc Đế (722 SCN)

**Giai đoạn Lịch sử**: Năm Khai Nguyên thứ 10 đời Đường Huyền Tông (722 SCN)
**Phạm vi**: Khảo Cứu Sử Học Thực Chứng & Đề Xuất Quy Mô Chương Sản Xuất (History & Production Foundation Only — No Runtime Code)
**Vị trí Biên Niên**: Kỷ nguyên kháng Đường tiêu biểu thế kỷ VIII, nối tiếp thời kỳ Vạn Xuân (541–602) và mở đường cho các phong trào tự chủ Phùng Hưng, Khúc Thừa Dụ sau này.

---

## 1. Mục Tiêu & Tôn Chỉ Học Thuật (Mission Statement)

Tập tài liệu này xây dựng nền tảng khảo cứu sử học toàn diện, có kỷ luật học thuật nghiêm ngặt cho phong trào khởi nghĩa giải phóng dân tộc của **Mai Thúc Loan (Mai Hắc Đế) năm 722 SCN**.

### 1.1. Nguyên Tắc Cốt Lõi (Core Principles):
1. **Phân Tầng Nguồn Gốc Sử Liệu & Cảnh Báo Niên Đại Biên Soạn**:
   - Áp dụng hệ thống phân tầng chuẩn mực: **T1** (Thư tịch triều đại Trung Quốc: *Cựu Đường Thư* [945], *Tân Đường Thư* [1060], *Đường Hội Yếu* [961], *Tư Trị Thông Giám* [1084]), **T2** (Chính sử trung đại Việt Nam: *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục*), **T3** (Thần tích đền thờ Vạn An, rú Đụn, gia phả, dã sử dân gian), **T4** (Khảo cổ học & Sử học hiện đại), và **COMPOSITE RECONSTRUCTION** (Phục dựng gameplay).
   - *Lưu ý quan trọng*: Ngay cả các thư tịch triều đại T1 (*Cựu Đường Thư*, *Tân Đường Thư*) cũng được biên soạn cách biến cố năm 722 từ 2 đến 3 thế kỷ; do đó cần nêu rõ khoảng cách thời gian và thiên kiến của sử quan phong kiến phương Bắc.
2. **Khảo Cứu Niên Đại Thực Chứng (722 vs 713–722)**:
   - Mọi thư tịch chính sử cổ nhất (T1 *Cựu Đường Thư*, *Tân Đường Thư*, *Tư Trị Thông Giám* & T2 *Toàn Thư*, *Cương Mục*) đều đồng nhất ghi nhận cuộc nổi dậy bùng nổ, xưng Đế và bị đàn áp diễn ra trong **năm Khai Nguyên thứ 10 (722 SCN)**.
   - Thuyết "713–722" (10 năm độc lập) là suy đoán của một số học giả hiện đại thế kỷ XX; tài liệu học thuật không tự ý biến suy đoán này thành sự thật lịch sử xác thực.
3. **Phân Định Huyền Tích Dân Gian & Hiện Thực Lịch Sử**:
   - *Tích "Gánh vải cống rú Đụn"*: Là truyền thuyết dân gian T3 giàu ý nghĩa biểu tượng về gánh nặng lao dịch/cống nạp, không có ghi chép trong chính sử T1/T2.
   - *Tích "Mai Thiếu Đế (Mai Thúc Huy)"*: Là truyền thuyết thần tích địa phương và gia phả T3, không được chính sử T1/T2 xác nhận; không xếp vào Core Hero playable chính thức.
4. **Phê Phán Con Số Khoa Trương & Phạm Vi Lãnh Thổ**:
   - Con số "40 vạn quân" (*Tân Đường Thư* chép `衆號四十萬` - phao xưng 40 vạn) và "30 vạn quân" (*Toàn Thư*) là thủ pháp khoa trương ngôn từ cổ điển, không phải số liệu quân số thực tế trong gameplay.
   - Cụm từ "32 châu" biểu thị tầm ảnh hưởng và sự chấn động sâu rộng khắp vùng Lĩnh Nam, không phải bản đồ đế chế cố định với đường biên giới hiện đại.
5. **Rào Chắn Kết Cục Đối Kháng (Dương Tư Húc & Quang Sở Khách)**:
   - Đại tướng quân nhà Đường Dương Tư Húc (Yang Sixu) và Đô hộ Quang Sở Khách (Guang Chuke) sống sót sau chiến dịch năm 722; Dương Tư Húc tiếp tục chỉ huy nhiều chiến dịch khác ở phương Nam cho đến khi qua đời năm 740. Tuyệt đối không tạo kịch bản giết chết Dương Tư Húc trong game.
6. **Độc Lập Tuyệt Đối Với Runtime Game**:
   - Không can thiệp mã nguồn trò chơi (`src/**`), không sửa test suite, không sửa đổi `PROJECT_PLAN.md` hay `task-board.md`.

---

## 2. Cấu Trúc Thư Mục Tư Liệu (Directory Index)

```
docs/drafts/viet-su/mai-thuc-loan-722/
├── README.md                           # Tổng quan, tôn chỉ học thuật và cấu trúc tài liệu (File này)
├── historical-context-and-timeline.md  # Khảo cứu bối cảnh thế kỷ VIII, niên biểu 722 vs 713-722, và tiền đề 687
├── factions-and-commanders.md          # Danh mục phe Khởi nghĩa Hoan Châu vs Phe Đô hộ Nhà Đường
├── hero-candidates.md                  # Khảo cứu ứng viên Tướng (Core 1: Mai Thúc Loan + T3 Conditional)
├── stage-candidates.md                 # 4–5 Màn chơi ứng viên cho Chapter ARC-MTL-01 & Khung kết cục an toàn
├── chapter-scope-proposal.md          # Đề xuất quy mô Chapter (Option A: Full Chapter 4-5 Stages — Khuyến nghị)
├── historical-guardrails.md            # Rào chắn sử học bắt buộc cho Narrative, Game Design & Art
└── sources.md                          # Thư mục thư tịch T1–T4, Ma trận đối chiếu Luận điểm - Nguồn toàn diện
```

---

## 3. Tóm Tắt Khung Phân Tầng Nguồn (Source-Tier Framework)

* **Tầng 1 (T1 — Dynastic Histories / Early Documentary Sources)**:
  - *Cựu Đường Thư* (945 SCN), *Tân Đường Thư* (1060 SCN), *Đường Hội Yếu* (961 SCN), *Tư Trị Thông Giám* (1084 SCN). Ghi nhận cuộc dấy binh xưng Hắc Đế của Mai Thúc Loan năm Khai Nguyên thứ 10 (722), liên minh Lâm Ấp/Chân Lạp, và chiến dịch phản kích bất ngờ của Dương Tư Húc theo đường Mã Viện.
* **Tầng 2 (T2 — Medieval National Historiography)**:
  - *Đại Việt Sử Ký Toàn Thư* (1479), *Khâm Định Việt Sử Thông Giám Cương Mục* (1884), *Việt Sử Tiêu Án* (1775).
* **Tầng 3 (T3 — Late Local Historiography / Temple Records / Folklore)**:
  - Thần tích đền thờ Vạn An, rú Đụn (Nam Đàn, Nghệ An), truyền tích gánh vải cống nạp, thần tích Mai Thiếu Đế (Mai Thúc Huy), thần phả dòng họ Mai.
* **Tầng 4 (T4 — Modern Scholarship & Archaeology)**:
  - Khảo cổ học di tích thành Vạn An (Sa Nam, Hùng Sơn, Nam Đàn), các nghiên cứu của Viện Sử học, Đào Duy Anh, Phan Huy Lê, Keith W. Taylor.
* **COMPOSITE RECONSTRUCTION**:
  - Phục dựng kịch bản gameplay Tower Defense dựa trên không gian thung lũng sông Lam và căn cứ Hoan Châu.
