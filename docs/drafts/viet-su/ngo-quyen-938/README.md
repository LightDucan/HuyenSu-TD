# Chapter ARC-DT-04: Ngô Quyền & Đại Thắng Bạch Đằng (937–939 SCN)

> [!IMPORTANT]
> **Ràng Buộc Nhiệm Vụ (Task `VS-NQ-01` — Final Evidence Sync)**:
> - Tài liệu này xác lập **Đề Xuất Tuyển Chọn Roster (Roster Selection Proposal)** và **Định Hướng Bối Cảnh Map (Chapter Direction)** cho Flagship Chapter lịch sử: Chiến dịch đại phá quân xâm lược Nam Hán trên sông Bạch Đằng năm 938 của **Ngô Quyền**, mở đầu bằng biến cố 937 (Kiều Công Tiễn phản nghịch) và kết thúc bằng mốc 939 (Ngô Quyền xưng Vương, định đô Cổ Loa).
> - **Phạm vi chương trình**:
>   - `937 SCN`: Kiều Công Tiễn (`皎公羨` T1 / `矯公羨` T2) phản nghịch giết Dương Đình Nghệ, sai sứ sang Nam Hán cầu viện → **Narrative Prelude**.
>   - `938 SCN`: Ngô Quyền tiến quân ra Bắc diệt Kiều Công Tiễn tại Đại La; vua Nam Hán sai con đem thủy quân sang xâm lược; Ngô Quyền bố trí trận địa cọc đại phá quân giặc trên sông Bạch Đằng, chủ tướng Lưu Hoằng Thao (`弘操`) / Lưu Hồng Thao (`洪操`) tử trận → **Main Battle Chapter**.
>   - `939 SCN`: Ngô Quyền xưng Vương, bỏ chức Tiết độ sứ, định đô tại Cổ Loa → **Epilogue only** (không đi sâu sang thời Ngô sau 939).
> - **TUYỆT ĐỐI CHƯA LÀM**:
>   - Không thiết kế Normal Attack, Skill, Passive, stats, Range, AttackSpeed.
>   - Không viết Wave outline hay cơ chế Enemy combat (kẻ địch di chuyển trên fixed path và có HP, không tấn công Hero).
>   - Không tạo prompt asset, sprite hay file PNG.
>   - Không sửa `src/**` hoặc `PROJECT_PLAN.md`.

---

## 1. Cấu Trúc Tiến Trình Lịch Sử Chương

```mermaid
graph TD
    subgraph TIẾN TRÌNH LỊCH SỬ CHƯƠNG (937 - 939 SCN)
        P1["<b>1. Narrative Prelude (937 - Thu 938 SCN)</b><br>Kiều Công Tiễn phản bội giết Dương Đình Nghệ (937)<br>Ngô Quyền kéo quân từ Ái Châu ra Bắc diệt Kiều Công Tiễn tại Đại La (938)<br>Lưu Cung sai con đem thủy quân sang xâm lược"]

        P2["<b>2. Main Battle Chapter (Đông 938 SCN)</b><br>Trận thủy chiến lịch sử trên sông Bạch Đằng<br>Ngô Quyền bố trí trận địa cọc ngầm đón con nước triều<br>Quân Nam Hán đại bại, binh sĩ chết đuối quá nửa, chủ tướng Lưu Hoằng Thao tử trận"]

        P3["<b>3. Epilogue (939 SCN)</b><br>Ngô Quyền xưng Vương, bãi bỏ chức Tiết độ sứ phong kiến<br>Định đô Cổ Loa, đặt nền móng độc lập tự chủ lâu dài"]

        P1 --> P2
        P2 --> P3
    end
```

---

## 2. Cấu Trúc Hồ Sơ Tài Liệu

Tập hồ sơ tuyển chọn nội dung cho Chapter Ngô Quyền & Bạch Đằng 938 gồm 2 tài liệu thành phần chính:

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [roster-selection.md](roster-selection.md) | Khảo cứu và tuyển chọn Playable Heroes (Ngô Quyền — LOCK; Hero 2/3 — OPEN / FALLBACK UNVERIFIED); Khảo chính tự dạng Kiều Công Tiễn (`皎公羨` T1 vs `矯公羨` T2); Name Variant Matrix cho chủ tướng Nam Hán (`劉洪操` vs `劉弘操`); Cập nhật khảo cổ học 2026 (*The Holocene*); đánh giá 3 Normal Enemies, 1 Elite, 1 Main Boss (Lưu Hoằng Thao / Hồng Thao), 1 Narrative Boss (Kiều Công Tiễn); phân tầng nguồn nghiêm ngặt. |
| [chapter-direction.md](chapter-direction.md) | Định hướng không gian chiến trường duy nhất tại Cửa Biển Bạch Đằng (938 SCN), phân tầng địa danh học T1/T2 vs T4; cảnh báo học thuật về các bãi cọc khảo cổ học; xác lập bối cảnh Đại La là Narrative Prelude và ý nghĩa lịch sử của chiến thắng Bạch Đằng. |

---

## 3. Nguyên Tắc Sử Liệu Cốt Lõi (Source Guardrails)

1. **Phân biệt Near-source (T1) vs Later Historiography (T2)**:
   - *T1 (*Tân Ngũ Đại Sử* Q65, *Tư Trị Thông Giám* Q281)*: Ghi nhận sự kiện Ngô Quyền diệt Kiều Công Tiễn (`皎公羨`); vua Nam Hán Lưu Cung sai con sang đánh Giao Châu; Ngô Quyền đón đánh bằng trận địa cọc ở cửa biển, thừa lúc nước triều rút ép thuyền giặc vướng cọc lật úp, giết chết chủ tướng Nam Hán; Lưu Cung thu nhặt tàn quân rút về.
   - *T2 (*Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục*, *Việt Sử Lược*)*: Ghi nhận Kiều Công Tiễn (`矯公羨`); mô tả chi tiết: Ngô Quyền cho vạt nhọn cọc gỗ bịt sắt cắm ngầm dưới lòng sông, sai thuyền nhẹ ra khiêu chiến nhử giặc lúc triều lên, đợi triều rút thì dốc toàn lực phản công ép thuyền giặc vào bãi cọc.
2. **Khảo chính thuật ngữ cọc theo từng nguồn cụ thể (Source-Specific Stake Wording)**:
   - *Tân Ngũ Đại Sử* Q65 ghi: `植鐵橛海中` (cắm cọc sắt/bịt sắt ở biển/trong nước).
   - *Tư Trị Thông Giám* Q281 ghi chi tiết: cọc gỗ lớn, vạt nhọn đầu bịt sắt (`權先植大木于海門，闞其鋒以鐵`), dùng thuyền nhẹ (`以輕舟出迎戰`), nước triều lên ngập cọc (`潮滿漲，木溺不見`), giả thua chạy nhử giặc (`詐奔`), triều rút thuyền vướng cọc (`潮退，艦礙於木`), đâm lật thuyền giặc.
   - Tuyệt đối không gộp chi tiết của nguồn sau rồi gán ngược cho *Tân Ngũ Đại Sử*.
3. **Name Variant Matrix cho chủ tướng Nam Hán**:
   - *Tân Ngũ Đại Sử* (Q65) dùng chữ **Hồng Thao (洪操)** (`劉洪操`).
   - *Tư Trị Thông Giám* (Q281) dùng chữ **Hoằng Thao (弘操)** (`劉弘操`).
   - *Toàn Thư* (T2) ghi **Vạn Vương Hoằng Thao (萬王弘操)**.
   - Project ghi nhận đầy đủ ma trận biến thể văn bản, lấy **Lưu Hoằng Thao / Lưu Hồng Thao** làm định danh chuẩn hóa có đối chiếu chữ Hán.
4. **Cập nhật Khảo cổ học năm 2026 (*The Holocene*)**:
   - Nghiên cứu công bố ngày 26/05/2026 (*The Holocene*, DOI: `10.1177/09596836261450824`) xác định: 8 mẫu AMS $^{14}\text{C}$ tại **Cao Quỳ** và **Đầm Thượng** có niên đại tập trung khoảng **$2515 - 2301\text{ cal BP}$ (~$566 - 352\text{ TCN}$)**, là **dấu tích móng cọc nhà sàn thời Đông Sơn muộn**, KHÔNG PHẢI bãi cọc thủy chiến của các trận 938, 981 hay 1288.
   - Các bãi cọc thủy chiến thời trung đại (Yên Giang, Đồng Má Ngựa, Đồng Vạn Muối) có niên đại C14 thế kỷ XIII (thuộc trận 1288 thời Trần).
   - Khảo cổ học cung cấp bối cảnh môi trường tự nhiên và vật chất vùng cửa sông; **tuyệt đối không ngụ ý rằng các bãi cọc khảo cổ đã biết hiện nay là chứng tích vật thể trực tiếp của riêng trận 938**.
5. **Quy tắc tuyển chọn Playable Hero (Hero Roster Guardrail)**:
   - **Ngô Quyền** là **LOCK CANDIDATE** duy nhất bắt buộc (nhân vật duy nhất được T1/T2 xác nhận chỉ huy trận Bạch Đằng 938).
   - **Dương Tam Kha, Đỗ Cảnh Thạc, Kiều Công Hãn, Đinh Công Trứ**: T1/T2 không xác lập sự tham chiến trực tiếp tại trận Bạch Đằng 938 (Direct 938 participation = NOT ESTABLISHED). Xếp phân loại **`FALLBACK / UNVERIFIED 938 PARTICIPATION`** (hoặc để trống `OPEN` cho Slot 2/3).
   - Tuyệt đối **không tự invent thêm nhân vật** để lấp đầy 3 slot Hero.
6. **Định vị đối phương (Nam Hán & Kiều Công Tiễn)**:
   - **Lưu Hoằng Thao / Hồng Thao**: Người trực tiếp chỉ huy hạm đội và tử trận tại Bạch Đằng → **LOCK CANDIDATE (Main Battle Boss)**.
   - **Lưu Cung**: Đóng quân tại Hải Môn làm thanh viện, không trực tiếp vào sông Bạch Đằng → **NARRATIVE SUPREME ANTAGONIST**.
   - **Kiều Công Tiễn**: Bị diệt tại Đại La trước trận Bạch Đằng → **NARRATIVE ANTAGONIST / OPTIONAL PRELUDE BOSS**, không làm boss trên map Bạch Đằng.
