# Chapter ARC-DT-03: Khúc Gia Tự Chủ & Dương Đình Nghệ Giải Phóng Đại La (905–937 SCN)

> [!IMPORTANT]
> **Ràng Buộc Nhiệm Vụ (Task `VS-KDN-01`)**:
> - Tài liệu này xác lập **Đề Xuất Tuyển Chọn Roster (Roster Selection Proposal)** và **Định Hướng Bối Cảnh Map (Chapter Direction)** cho chuỗi nội dung lịch sử từ thời Khúc gia tự chủ (905–930) đến chiến dịch giải phóng thành Đại La của Dương Đình Nghệ (931) và cầu nối sang biến cố 937.
> - **Phạm vi chương trình**:
>   - `905–930 SCN`: Khúc gia (Khúc Thừa Dụ, Khúc Hạo, Khúc Thừa Mỹ) đóng vai trò **Narrative Prelude / Prologue** (không ép thành combat hero của trận đánh 931).
>   - `931 SCN`: Chiến dịch Dương Đình Nghệ giải phóng thành Đại La, đánh tan quân Nam Hán (Lý Tiến, Trần Bảo) $\rightarrow$ **Main Battle Chapter**.
>   - `937 SCN`: Kiều Công Tiễn phản bội ám hại Dương Đình Nghệ $\rightarrow$ **Epilogue / Narrative Bridge** kết nối sang chương Ngô Quyền 938.
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

        P2["<b>2. Main Battle Chapter (931 SCN)</b><br>Dương Đình Nghệ dấy binh từ Ái Châu<br>Bao vây đánh đuổi Thứ sử Nam Hán Lý Tiến<br>Chém tướng tiếp viện Trần Bảo, giải phóng Đại La"]

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
| [roster-selection.md](roster-selection.md) | Khảo cứu và tuyển chọn 3 Playable Heroes (Dương Đình Nghệ, Ngô Quyền, Đinh Công Trứ), 2 Fallback candidates; đánh giá vai trò Narrative của dòng họ Khúc; đề xuất 3 Normal Enemies, 1 Elite và 2 Bosses lịch sử (Lý Tiến, Trần Bảo); phân tầng nguồn nghiêm ngặt. |
| [chapter-direction.md](chapter-direction.md) | Định hướng không gian chiến trường chính tại thành Đại La (931 SCN), phân tầng địa danh học T1/T2 vs T4; xác lập bối cảnh Ái Châu là Narrative Prelude và giới hạn chiến thắng chiến thuật trong gameplay. |

---

## 3. Nguyên Tắc Sử Liệu Cốt Lõi (Source Guardrails)

1. **Phân biệt Near-source (T1) vs Later Historiography (T2)**:
   - *T1 (*Tân Ngũ Đại Sử* Q65, *Tư Trị Thông Giám* Q277)*: Ghi nhận sự kiện Nam Hán đánh bắt Khúc Thừa Mỹ (930), Dương Đình Nghệ từ Giao Châu/Ái Châu dấy binh vây hạ Đại La, Thứ sử Lý Tiến thua chạy, tướng cứu viện Trần Bảo bị giết (931), Kiều Công Tiễn giết Dương Đình Nghệ (937).
   - *T2 (*Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục*)*: Ghi chép chi tiết về nguồn gốc họ Khúc tại Hồng Châu, cải cách của Khúc Hạo, cơ chế "3.000 con nuôi / giả tử" của Dương Đình Nghệ và cơ cấu nha tướng.
2. **Chi tiết "3.000 con nuôi" (3.000 giả tử)**:
   - Là chi tiết ghi nhận trong **chính sử trung đại T2**, phản ánh hình thái tổ chức lực lượng hào trưởng thời Ngũ Đại; **không phải T1 Fact**.
3. **Không suy đoán chiến thuật vượt quá sử liệu**:
   - Thư tịch cổ chỉ ghi nhận kết quả chiến dịch (tiến quân, bao vây Đại La, Lý Tiến trốn chạy, đón đánh diệt Trần Bảo); không tự bịa đặt các trận địa cụ thể ngoài khung sử liệu.
4. **Giới hạn không gian & nhân vật**:
   - Ái Châu đóng vai trò căn cứ khởi phát (Narrative Origin); không gian chiến đấu chính (Primary Map) là thành Đại La năm 931.
   - Không kéo các chiến tích và hình tượng năm 938 của Ngô Quyền về gán ghép cho năm 931.
