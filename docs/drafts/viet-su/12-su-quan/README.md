# Bộ Tư Liệu Lịch Sử & Kịch Bản Sản Xuất: Loạn 12 Sứ Quân (965/966–968 SCN)

**Chương Lịch Sử (Working Arc)**: `ARC-12SQ-01: Vạn Thắng Hoa Lư — Dẹp Loạn Sứ Quân`
**Giai đoạn Lịch sử**: 965/966 – 968 SCN (Giai đoạn phân liệt sau thời Ngô đến khi thành lập Nước Đại Cồ Việt)
**Phạm vi**: Tư liệu Lịch sử & Thiết Kế Kịch Bản Narrative cho Sản Xuất (History & Narrative Content Only — No Runtime Code)
**Cơ sở nghiên cứu**: `docs/drafts/viet-su/939-1009/` (Commit `5686d7f`)

---

## 1. Mục Tiêu & Tôn Chỉ Học Thuật (Mission Statement)

Tập tài liệu này chuyển hóa toàn bộ nền tảng khảo cứu sử học giai đoạn 939–1009 thành **Gói Nội Dung Lịch Sử Chuẩn Bị Sản Xuất (Production-Ready Historical Content Pack)** cho chiến dịch *Vạn Thắng Hoa Lư — Dẹp Loạn 12 Sứ Quân*.

### 1.1. Nguyên Tắc Cốt Lõi (Core Principles):
1. **Nghiêm Ngặt Phân Tầng Nguồn Sử Liệu**: Duy trì hệ thống 4 tầng nguồn (**T1 / T2 / T3 / T4**); mọi chi tiết narrative và bối cảnh đều được gắn nhãn độ tin cậy.
2. **Bảo Tồn Danh Sách 12 Sứ Quân Chuẩn Tắc (*Toàn Thư* Canonical)**: Tuyệt đối không chèn Lý/Lã Xử Bình vào danh sách 12 sứ quân; xác định chuẩn xác vị thế của Trần Lãm là một trong 12 sứ quân.
3. **Phân Định Bản Chất Chiến Dịch**: Không mô tả chiến dịch một cách thô sơ như thể Đinh Bộ Lĩnh "đơn thương độc mã tiêu diệt lần lượt 12 sứ quân". Phân biệt rành mạch giữa **Liên minh kế thừa (Trần Lãm)**, **Đem quân hàng phục (Phạm Bạch Hổ)**, **Quy phục & Dung nạp (Ngô Xương Xí, Ngô Nhật Khánh)** với **Giao tranh quân sự đánh dẹp**.
4. **Không Quy Chụp Câu Văn Khái Quát Thành Bằng Chứng Từng Trận Riêng Lẻ**: *Toàn Thư* (T2) chỉ ghi nhận danh sách 12 sứ quân (966) và câu văn khái quát *"dẹp yên 12 sứ quân"* (968), không có ghi chép trận đánh cụ thể cho từng sứ quân. Mọi chi tiết về trận địa, tử trận, đắm thuyền, trúng tên, tự vẫn đều thuộc tầng dã sử/thần phả (T3) hoặc phục dựng kịch bản (`COMPOSITE RECONSTRUCTION`).
5. **Độc Lập Với Mã Nguồn Trò Chơi**: Tài liệu này không chỉnh sửa mã nguồn game (`src/**`), không sửa tests, không can thiệp vào lộ trình `PROJECT_PLAN.md` của Codex, đảm bảo an toàn tuyệt đối cho kiến trúc dự án.

---

## 2. Cấu Trúc Thư Mục Tư Liệu (Directory Index)

```
docs/drafts/viet-su/12-su-quan/
├── README.md                   # Tổng quan, tôn chỉ học thuật và cấu trúc tài liệu (File này)
├── chapter-outline.md          # Định danh chương, narrative mở đầu/kết thúc, khung cốt truyện
├── stage-candidates.md         # 4–6 Ứng viên màn chơi (Stage Candidates), mục tiêu & ranh giới
├── hero-candidates.md          # Đánh giá các ứng viên Hero xuất trận & Khuyến nghị TOP 3 (Chưa khóa)
├── factions-and-commanders.md  # Danh mục 12 sứ quân, phân loại Đồng minh / Quy phục / Đối địch
├── historical-guardrails.md    # Rào chắn sử học bắt buộc cho Narrative, Codex và Visual Pipeline
└── sources.md                  # Thư mục thư tịch, phân tầng sử liệu và đối chiếu dị bản
```

---

## 3. Hệ Thống Phân Tầng Nguồn (Source-Tier System)

* **Tầng 1 (T1 — Primary / Epigraphy / Near-Source Records)**: Hiện vật văn khắc khảo cổ đương đại thế kỷ X (Minh văn Cột kinh Hoa Lư 973, 979; tiền đồng khảo cổ) và thư tịch biên soạn thời Nguyên bảo lưu hồ sơ triều Tống / tư liệu gần thời về quan hệ Tống – Việt (*Tống Sử* Q488, *Tục Tư Trị Thông Giám Trường Biên*).
* **Tầng 2 (T2 — Medieval National Historiography)**: Chính sử trung đại Việt Nam (*Đại Việt Sử Lược*, *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục*, *Việt Sử Tiêu Án*). Xác nhận danh tính, tước hiệu, căn cứ 12 sứ quân, liên minh Bố Hải Khẩu, việc Phạm Bạch Hổ đem quân hàng phục, và tiến trình bình định đại cục thống nhất.
* **Tầng 3 (T3 — Local Folklore / Thần Phả)**: Dã sử, truyền thuyết dân gian, thần tích đình đền miếu mạo (*Lĩnh Nam Chích Quái*, thần phả địa phương: diễn biến chiến trận chi tiết, đắm thuyền, trúng tên, tự vẫn, đường rút chạy...).
* **Tầng 4 (T4 — Modern Scholarship & Archaeology)**: Nghiên cứu sử học thực chứng hiện đại và hiện vật khảo cổ học thế kỷ XX–XXI.

---

## 4. Tóm Tắt Các Điểm Đồng Thuận & Ranh Giới Sử Học Then Chốt

| Vấn Đề Lịch Sử | Căn Cứ Học Thuật | Quy Định Sản Xuất Narrative |
|---|---|---|
| **Mốc thời gian 965 vs 966** | 965: Ngô Xương Văn mất, triều Cổ Loa rối loạn.<br>966: 12 sứ quân chính thức cát cứ chia cắt. | Trình bày rành mạch 965 là biến cố triều đình, 966 là thời điểm cục diện 12 sứ quân định hình toàn diện. |
| **Biên niên 968 vs 970** | 968: Đinh Bộ Lĩnh xưng Hoàng đế, lập Nước Đại Cồ Việt, định đô Hoa Lư.<br>970: Chính thức đặt niên hiệu Thái Bình. | Tách bạch 968 khai quốc và 970 đặt niên hiệu Thái Bình. Tiền *Thái Bình Hưng Bảo* gắn liền với niên hiệu Thái Bình (từ khoảng năm 970 trở đi). |
| **Vị thế Trần Lãm (Bố Hải Khẩu)** | Một trong 12 sứ quân của *Toàn Thư* (T2); cha nuôi và đồng minh chiến lược trao việc quân cho Đinh Bộ Lĩnh. | **Tuyệt đối không biến Trần Lãm thành mục tiêu quân sự phải tiêu diệt**. Đây là căn cứ bàn đạp và liên minh tiếp nhận cơ nghiệp. |
| **Vị trí của Lý Xử Bình / Lã Xử Bình** | Tướng lĩnh nội loạn tại Cổ Loa năm 965. | **Không chèn vào danh sách 12 sứ quân**. Thể hiện là tàn dư nội loạn cung đình Cổ Loa. |
| **Bản chất giai thoại Cờ Lau** | Mô-típ huyền thoại (T3) được bảo lưu trong T2 nhằm thiêng hóa vị thế vua lập quốc. | Sử dụng như hình tượng văn hóa / mỹ thuật khích lệ tinh thần; **không mô tả như một đội quân trẻ em đánh thắng các sứ quân**. |
| **Phương thức thu phục các sứ quân** | Kết hợp thao lược quân sự, liên minh chính trị, hôn nhân ngoại giao và chiêu hàng. | Thể hiện sự đa dạng chiến lược: Phạm Bạch Hổ đem quân hàng phục, Ngô Xương Xí quy phục, Ngô Nhật Khánh kết hôn chính trị, Trần Lãm liên minh, Đỗ Cảnh Thạc/Nguyễn Siêu giao tranh quyết liệt. |
