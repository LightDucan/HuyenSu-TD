# Chapter ARC-DT-03: Khúc Gia Tự Chủ & Dương Đình Nghệ Giải Phóng Đại La (905–937 SCN)

> [!IMPORTANT]
> **Ràng Buộc Nhiệm Vụ (Task `VS-KDN-01`)**:
> - Tài liệu này xác lập **Đề Xuất Tuyển Chọn Roster (Roster Selection Proposal)** và **Định Hướng Bối Cảnh Map (Chapter Direction)** cho chuỗi nội dung lịch sử từ thời Khúc gia tự chủ (905–930) đến chiến dịch giải phóng thành Đại La của Dương Đình Nghệ (931) và cầu nối sang biến cố 937.
> - **Phạm vi chương trình**:
>   - `905–930 SCN`: Khúc gia (Khúc Thừa Dụ, Khúc Hạo, Khúc Thừa Mỹ) đóng vai trò **Narrative Prelude / Prologue** (không ép thành combat hero của trận đánh 931).
>   - `931 SCN`: Chiến dịch Dương Đình Nghệ giải phóng thành Đại La, đánh tan quân Nam Hán (Lý Tiến, Trình Bảo) → **Main Battle Chapter**.
>   - `937 SCN`: Kiều Công Tiễn phản bội ám hại Dương Đình Nghệ → **Epilogue / Narrative Bridge** kết nối sang chương Ngô Quyền 938.
>   - **TUYỆT ĐỐI KHÔNG** đi sang trận Bạch Đằng 938 (dành riêng cho Chapter Ngô Quyền độc lập sau này).
> - **TUYỆT ĐỐI CHƯA LÀM**:
>   - Không thiết kế Normal Attack, Skill, Passive, stats, Range, AttackSpeed.
>   - Không viết Wave outline hay cơ chế Enemy combat.
>   - Không tạo prompt asset, sprite hay file PNG.
>   - Không sửa `src/**` hoặc `PROJECT_PLAN.md`.

---

## 1. Cấu Trúc Tiến Trình Lịch Sử Chương

```mermaid
graph TD
    subgraph TIẾN TRÌNH LỊCH SỬ CHƯƠNG (905 - 937 SCN)
        P1["<b>1. Narrative Prelude (905 - 930 SCN)</b><br>Khúc Thừa Dụ xưng Tiết độ sứ (905)<br>Khúc Hạo cải cách 'khoan giản an lạc' (907 - 917)<br>Khúc Thừa Mỹ bị Nam Hán bắt (930)"]

        P2["<b>2. Main Battle Chapter (931 SCN)</b><br>Dương Đình Nghệ dấy binh từ Ái Châu<br>Bao vây đánh đuổi Thứ sử Nam Hán Lý Tiến<br>Chém tướng tiếp viện Trình Bảo (程寶), giải phóng Đại La"]

        P3["<b>3. Epilogue / Narrative Bridge (937 SCN)</b><br>Dương Đình Nghệ làm Tiết độ sứ Tĩnh Hải quân (931 - 937)<br>Kiều Công Tiễn phản nghịch sát hại chủ tướng (937)<br><i>Cầu nối dẫn tới Chapter Ngô Quyền 938</i>"]

        P1 --> P2
        P2 --> P3
    end
```

---

## 2. Cấu Trúc Hồ Sơ Tài Liệu

Tập hồ sơ tuyển chọn nội dung cho Chapter Khúc Gia & Dương Đình Nghệ gồm 2 tài liệu thành phần chính:

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [roster-selection.md](roster-selection.md) | Khảo cứu và tuyển chọn Playable Heroes (Dương Đình Nghệ — LOCK; Ngô Quyền — PROVISIONAL; Đinh Công Trứ — PROVISIONAL), 2 Fallback candidates; đánh giá vai trò Narrative của dòng họ Khúc; đề xuất 3 Normal Enemies, 1 Elite và 2 Bosses lịch sử (Lý Tiến, Trình Bảo); phân tầng nguồn nghiêm ngặt. |
| [chapter-direction.md](chapter-direction.md) | Định hướng không gian chiến trường chính tại thành Đại La (931 SCN), phân tầng địa danh học T1/T2 vs T4; xác lập bối cảnh Ái Châu là Narrative Prelude và giới hạn chiến thắng chiến thuật trong gameplay. |

---

## 3. Nguyên Tắc Sử Liệu Cốt Lõi (Source Guardrails)

1. **Phân biệt Near-source (T1) vs Later Historiography (T2)**:
   - *T1 (*Tân Ngũ Đại Sử* Q65, *Tư Trị Thông Giám* Q277 / Q281)*:
     + *Tân Ngũ Đại Sử* (Q65 — Nam Hán thế gia) ghi nhận chiến dịch Nam Hán đánh chiếm Giao Chỉ năm 930 với các tướng mang tên **Lý Thủ Dung (李守鄘)** và **Lương Khắc Trinh (梁克貞)**, bắt Khúc Thừa Mỹ; đặt Lý Tiến làm Thứ sử Giao Châu; Dương Đình Nghệ dấy binh năm 931 vây Lý Tiến; Lý Tiến thua chạy trốn về Quảng Châu; tướng viện binh **Trình Bảo (程寶)** bị đón đánh giết chết; năm 937 Kiều Công Tiễn giết Dương Đình Nghệ.
     + *Tư Trị Thông Giám* (Q277) ghi nhận chiến dịch năm 931 (Dương Đình Nghệ, 3.000 giả tử, Lý Tiến, Trình Bảo 程寶 tử trận). Biến cố năm 937 (Kiều Công Tiễn giết Dương Đình Nghệ) được ghi nhận riêng biệt tại *Tư Trị Thông Giám* (Q281).
   - *T2 (*Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục*)*: Ghi chép chi tiết về nguồn gốc họ Khúc tại Hồng Châu, cải cách của Khúc Hạo, cơ chế "3.000 con nuôi / giả tử" của Dương Đình Nghệ và cơ cấu nha tướng; định danh tướng Nam Hán đánh bắt Khúc Thừa Mỹ năm 930 là **Lý Khắc Chính (李克正)**.
2. **Phân định tên gọi tướng đánh chiếm năm 930**:
   - T1 (*Tân Ngũ Đại Sử* Q65) ghi tướng Nam Hán đánh Giao Chỉ bắt Khúc Thừa Mỹ là **Lý Thủ Dung (李守鄘)** và **Lương Khắc Trinh (梁克貞)**.
   - Tên gọi **Lý Khắc Chính (李克正)** thuộc về truyền thống chính sử Việt Nam T2 (*Toàn Thư*), không quy trực tiếp cho T1 *Tân Ngũ Đại Sử*.
3. **Canonical T1 Boss: Trình Bảo (程寶)**:
   - T1 (*Tân Ngũ Đại Sử* Q65 và *Tư Trị Thông Giám* Q277) ghi tên tướng cứu viện Nam Hán là **Trình Bảo (程寶)**. Trong mọi tài liệu của project này, đây là tên chuẩn tắc. Dạng "Trần Bảo (陳寶)" trong *Toàn Thư* / biến thể văn bản sau được ghi nhận rõ là later textual variant.
4. **Chi tiết "3.000 con nuôi" (3.000 giả tử)**:
   - *Tư Trị Thông Giám* (Q277 — T1) ghi nhận Dương Đình Nghệ nuôi 3.000 giả tử (养子三千人); cũng được *Toàn Thư* (T2) ghi chép. Do đó đây là chi tiết có **T1 + T2 support**.
5. **Không suy đoán chiến thuật vượt quá sử liệu**:
   - Thư tịch cổ chỉ ghi nhận kết quả chiến dịch (tiến quân, bao vây Đại La, Lý Tiến trốn chạy, đón đánh diệt Trình Bảo); không tự bịa đặt các trận địa cụ thể ngoài khung sử liệu.
6. **Giới hạn không gian & nhân vật**:
   - Ái Châu đóng vai trò căn cứ khởi phát (Narrative Origin); không gian chiến đấu chính (Primary Map) là thành Đại La năm 931.
   - Không kéo các chiến tích và hình tượng năm 938 của Ngô Quyền về gán ghép cho năm 931.
   - **Lý Tiến**: Thứ sử Giao Châu đóng giữ, bị Dương Đình Nghệ vây và phải bỏ thành chạy về Quảng Châu. Không gán cho Lý Tiến vai trò bắt giữ Khúc Thừa Mỹ — việc đó do lực lượng Nam Hán năm 930 thực hiện (T1 ghi Lý Thủ Dung `李守鄘`, Lương Khắc Trinh `梁克貞`; T2 ghi Lý Khắc Chính).
   - **Ngô Quyền & Đinh Công Trứ**: T1 xác nhận Ngô Quyền là nha tướng của Dương Đình Nghệ (trong narrative 937/938), nhưng T1 không trực tiếp ghi rõ hai ông tham chiến tại Đại La năm 931. Giữ trạng thái **PROVISIONAL**.
   - **Dương Tam Kha & Kiều Công Hãn**: Không có exact source chứng minh tham chiến 931; không thể suy luận từ mối quan hệ chính trị/quân sự về sau. Giữ nguyên **FALLBACK / LATER-AFFILIATED FIGURE** — không tự khẳng định tham chiến 931.
