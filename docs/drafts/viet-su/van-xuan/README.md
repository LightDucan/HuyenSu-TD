# Gói Nghiên Cứu Lịch Sử: Thời Kỳ Nhà Tiền Lý & Nước Vạn Xuân (541–602 SCN)

> [!IMPORTANT]
> **Ràng Buộc Nghiên Cứu & Cách Ly Ngữ Cảnh (Task `VS-VX-01`)**:
> - Đây là **Gói Khảo Cứu Lịch Sử & Tư Liệu Thô (Raw Research Specification)** chuẩn bị cho việc xây dựng nội dung Playable thời Tiền Lý / Vạn Xuân.
> - **TUYỆT ĐỐI KHÔNG LÀM GAMEPLAY DESIGN TRONG TASK NÀY**:
>   - Không chọn Roster 3 Hero chính thức.
>   - Không thiết kế Skill, TriggerHits, hay Active Effects.
>   - Không tạo chỉ số Stats (HP, ATK, Range, AttackSpeed, Speed px/s).
>   - Không viết Waves outline.
>   - Không tạo Asset PNG.
>   - Không sửa `src/**` hoặc `PROJECT_PLAN.md`.
> - Mọi nhận định lịch sử, nhân vật, vũ khí và địa hình đều phải được phân loại nguồn gốc 4 cấp độ học thuật rõ ràng.

---

## 1. Mục Tiêu & Tổng Quan Gói Nghiên Cứu

Gói tài liệu `VS-VX-01` tập trung nghiên cứu toàn diện giai đoạn lịch sử khởi nghĩa Lý Bí, sự thành lập nước **Vạn Xuân (544 SCN)**, cuộc kháng chiến giữ nước hào hùng tại đầm Dạ Trạch của **Triệu Quang Phục (547–550 SCN)**, và giai đoạn hậu kỳ đầy biến động kéo dài đến năm 602 SCN.

```mermaid
graph TD
    subgraph TIẾN TRÌNH LỊCH SỬ NƯỚC VẠN XUÂN (541 - 602 SCN)
        P1["<b>1. Dấy Binh Khởi Nghĩa (541 - 543)</b><br>Lý Bí đánh đuổi Tiêu Tư, giải phóng Long Biên<br>Phạm Tu phá tan giặc Lâm Ấp phương Nam"]
        P2["<b>2. Khai Sinh Nước Vạn Xuân (544)</b><br>Lên ngôi Lý Nam Đế, đặt niên hiệu Thiên Đức<br>Dựng chùa Khai Quốc, đúc tiền đồng"]
        P3["<b>3. Kháng Chiến Chống Lương (545 - 547)</b><br>Trần Bá Tiên & Dương Phiêu tiến công<br>Phòng tuyến Tô Lịch, Chu Diên, Điển Triệt, Khuất Lão"]
        P4["<b>4. Dạ Trạch Vương Quật Khởi (547 - 550)</b><br>Triệu Quang Phục lập căn cứ đầm Dạ Trạch<br>Chiến thuật du kích đầm lầy, khôi phục độc lập"]
        P5["<b>5. Hậu Kỳ & Suy Tàn (551 - 602)</b><br>Lý Phật Tử tranh chấp quyền lực<br>Nhà Tùy (Lưu Phương) xâm lược"]
        
        P1 --> P2 --> P3 --> P4 --> P5
    end
```

---

## 2. Hệ Thống Phân Loại Nguồn Sử Liệu 4 Cấp Độ

Toàn bộ nhân vật, sự kiện và hiện vật trong gói nghiên cứu này được thẩm định nghiêm ngặt theo 4 cấp độ:

1. **Cấp 1: Historical near-source (Nguồn phương Bắc gần thời — Thế kỷ VI–VII)**:
   * *Lương Thư* (Vũ Đế bản kỷ, Trần Bá Tiên truyện), *Trần Thư* (Cao Tổ bản kỷ), *Nam Sử*, *Tùy Thư*.
   * Ghi nhận trung thực các diễn biến quân sự lớn, tên tuổi của Lý Bí (*Lý Bí* / *Lý Bí chi loạn*), Trần Bá Tiên, Dương Phiêu, Tiêu Tư, các trận đánh Chu Diên, Tô Lịch, Điển Triệt, Khuất Lão.
2. **Cấp 2: Later historiography (Chính sử trung đại Việt Nam — Thế kỷ XIII–XIX)**:
   * *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục*, *Việt Sử Lược*, *Việt Sử Tiêu Án*.
   * Ghi chép chi tiết về quốc hiệu Vạn Xuân, niên hiệu Thiên Đức, danh tính Triệu Quang Phục, Phạm Tu, Tinh Thiều, Triệu Túc, Lý Thiên Bảo, Lý Phật Tử, chùa Khai Quốc.
3. **Cấp 3: Folklore / Local Legend (Thần phả, truyền thuyết & Di tích dân gian)**:
   * *Lĩnh Nam Chích Quái* (Truyện Dạ Trạch Vương), thần phả đền thờ Dạ Trạch (Hưng Yên), đền thờ Lão tướng Phạm Tu (Thanh Liệt - Hà Nội), đền thờ Lý Nam Đế (Tam Nông, Hoài Đức, Thái Bình), truyền tích Móng Rồng Chử Đồng Tử.
4. **Cấp 4: Game Interpretation (Sáng tạo nghệ thuật & Cơ chế Game)**:
   * Chuyển hóa trang phục, phân định vai trò chiến thuật trong Tower Defense (Vanguard, Tanker, Ranged, Support), tái hiện mỹ thuật đầm lầy Dạ Trạch và chùa Khai Quốc.

---

## 3. Danh Mục Tài Liệu Chi Tiết Trong Gói Nghiên Cứu

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [sources.md](sources.md) | Khảo cứu chi tiết toàn bộ các nguồn sử liệu phương Bắc gần thời, chính sử trung đại Việt Nam, thần tích địa phương và đánh giá mức độ tin cậy học thuật. |
| [historical-context-and-timeline.md](historical-context-and-timeline.md) | Bối cảnh lịch sử, niên biểu chi tiết 541–602 SCN, diễn biến các chiến dịch lớn (Tô Lịch, Điển Triệt, Dạ Trạch, Khuất Lão) và ý nghĩa lập quốc Vạn Xuân. |
| [character-roster-and-sources.md](character-roster-and-sources.md) | Khảo cứu danh sách 15 nhân vật lịch sử và truyền thuyết (Lý Bí, Triệu Quang Phục, Phạm Tu, Tinh Thiều, Trần Bá Tiên, Tiêu Tư...) kèm phân loại nguồn gốc 4 cấp độ. |
| [military-and-material-culture.md](military-and-material-culture.md) | Khảo cứu văn hóa vật chất: Vũ khí (giáo, kiếm, nỏ, thuyền độc mộc), giáp trụ, trang phục áo chàm/gấm, kiến trúc thành Tô Lịch, đầm Dạ Trạch và chùa Khai Quốc. |

---

## 4. Nguyên Tắc Giới Hạn Của Task (Constraints Reminder)

* **Không viết code logic gameplay / Core / Stats / Skills**: Không tự ý gán chỉ số số học, không thiết kế kỹ năng hoặc passive.
* **Không sửa `src/**` hoặc `PROJECT_PLAN.md`**: Toàn bộ nghiên cứu độc lập trong `docs/drafts/viet-su/van-xuan/**`.
* **Phân định rạch ròi giữa Sử liệu chính thống và Huyền tích dân gian**: Đảm bảo tính khoa học lịch sử cao nhất cho dự án *Huyền Sử TD*.
