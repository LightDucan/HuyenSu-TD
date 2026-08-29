# Đặc Tả Nội Dung Playable Chapter: Vạn Thắng Hoa Lư (ARC-12SQ-01)

**Mã Chapter**: `ARC-12SQ-01`
**Tên Màn Chơi (Stage Name)**: `Vạn Thắng Hoa Lư — Dẹp Loạn Sứ Quân`
**Mã Màn Chơi (Stage ID)**: `stage-12sq-hoa-lu-01`
**Giai đoạn Lịch sử**: 965/966 – 968 SCN (Thời kỳ Loạn 12 Sứ Quân)
**Trạng thái**: Official Playable Content Specification (Locked)

---

> [!IMPORTANT]
> **Quy Chuẩn Học Thuật & Kỷ Luật Ghi Nguồn (Historiographical Discipline)**:
> Mọi chi tiết trong tài liệu này đều được phân loại nghiêm ngặt theo 3 cấp độ:
> - `[SOURCE-BACKED]`: Dữ kiện được ghi nhận trực tiếp trong sử liệu T1 (*Tống Sử*, Minh văn Cột kinh) hoặc T2 (*Đại Việt Sử Ký Toàn Thư*, *Việt Sử Lược*).
> - `[PLAUSIBLE ADAPTATION]`: Phục dựng bối cảnh hợp lý dựa trên thực tế địa bàn châu thổ sông Hồng và quân sự thế kỷ X.
> - `[GAMEPLAY ADAPTATION]`: Quy ước cơ chế trò chơi (Tower Defense, 10 Waves, cooldown, phạm vi tầm đánh).

---

## 1. Tóm Tắt Cốt Truyện Bối Cảnh (Narrative Framing)

### 1.1. Bối Cảnh Mở Đầu (Narrative Prelude — 2 Câu Ngắn)
* **Câu 1**: `[SOURCE-BACKED]` Năm 965, Nam Tấn Vương Ngô Xương Văn tử trận, triều đình Cổ Loa sụp đổ, các thủ lĩnh địa phương đồng loạt dấy binh cát cứ lập nên thời kỳ Loạn 12 Sứ Quân.
* **Câu 2**: `[SOURCE-BACKED]` Từ căn cứ Động Hoa Lư hiểm trở, Đinh Bộ Lĩnh liên hiệp cùng sứ quân Trần Lãm tại Bố Hải Khẩu, giương cờ khởi nghĩa nhằm dẹp yên họa phân tranh, thống nhất giang sơn.

### 1.2. Bối Cảnh Kết Thúc / Đại Thắng (Narrative Epilogue — 2 Câu Ngắn)
* **Câu 1**: `[SOURCE-BACKED]` Trải qua các chiến dịch tiêu diệt và thu phục các sứ quân kiên cố nhất tại Đỗ Động Giang, Phong Châu và Siêu Loại, Đinh Bộ Lĩnh toàn thắng, bình định xong 12 sứ quân vào năm 968.
* **Câu 2**: `[SOURCE-BACKED]` Vạn Thắng Vương lên ngôi Hoàng đế, đặt quốc hiệu Đại Cồ Việt, định đô tại Hoa Lư, mở ra kỷ nguyên độc lập, tự chủ và thống nhất vững bền cho dân tộc.

---

## 2. Bảng Tổng Hợp Khung Playable Content Chapter

| Thành Phần Hệ Thống | Định Danh / Thông Số Khóa | Phân Cấp & Mô Tả Gameplay |
|---|---|---|
| **Mã Chapter** | `ARC-12SQ-01` | Chiến dịch dẹp loạn 12 sứ quân (965–968 SCN). |
| **Mã Màn Chơi (Stage ID)** | `stage-12sq-hoa-lu-01` | Khóa định danh cho hệ thống `BattleBridge` và `MetaState`. |
| **Mã Bản Đồ (Map ID)** | `map-12sq-thung-lau-01` | Bàn cờ Thung Lũng Cờ Lau (Động Hoa Lư), kích thước $800 \times 600\text{ px}$. |
| **Đội Hình Tướng Chính Thức** | 1. **Đinh Bộ Lĩnh** (Chủ lực AoE)<br>2. **Đinh Liễn** (Tiên phong DPS)<br>3. **Nguyễn Bặc** (Hộ vệ Khống chế) | Bộ ba tác chiến cân bằng: Chỉ Huy Xuyên Phá + Trảm Tướng Đơn Mục Tiêu + Địa Chấn Bất Động. |
| **Hệ Thống Quái Vật** | 1. `sq-bo-binh` (Sứ Quân Đao Khiên — `sword`)<br>2. `sq-no-thu` (Nỏ Thủ Sứ Quân — `archer`)<br>3. `sq-thiet-ky` (Chiến Thuyền / Thiết Kỵ — `other`) | 3 Archetype cơ bản đại diện cho bộ binh, tầm xa và đột kích cơ động. |
| **Trùm Cuối (Final Boss)** | `boss-do-canh-thac` (Đỗ Động Tướng Công) | Tướng sứ quân Đỗ Cảnh Thạc (`category: other`), HP $1,200$, City Damage 5, thể hình $1.35\times$. |
| **Tiến Trình Đợt Quái** | 10 Wave liên hoàn | Wave 1–3 (Trinh sát), Wave 4–6 (Liên quân phối hợp), Wave 7–9 (Thiết kỵ đột phá), Wave 10 (Boss tổng công kích). |
| **Điều Kiện Thắng / Thua** | Diệt sạch 10 Wave / Máu thành về 0 | Thành trì HP khởi điểm: 10/10. |

---

## 3. Tương Thích Kiến Trúc & Ràng Buộc Engine (Engine Guardrails)

1. **Không tạo cơ chế chỉ số mới**:
   - Tướng và Quái sử dụng hoàn toàn các thuộc tính hiện hữu trong runtime: `atk`, `attackSpeed`, `range`, `critChance`, `hp`, `moveSpeed`, `cityDamage`.
   - **Tuyệt đối không đưa vào các chỉ số ngoài runtime** như Giáp vật lý (Armor), Kháng phép (Magic Resist), Giảm thời gian khống chế (Tenacity) hay Khiên ảo bất tử.
2. **Kỹ năng tương thích với `resolveSkill`**:
   - Các hiệu ứng kỹ năng của tướng được ánh xạ vào bộ xử lý hiệu ứng chuẩn: Gây sát thương (`damage`), Làm chậm (`slow` với `ratio` và `durationMs`), Làm bất động (`immobilize` với `durationMs`).
3. **Phân loại quái chuẩn hóa theo `EnemyCategory`**:
   - `sword` (Bộ binh cận chiến)
   - `archer` (Xạ thủ tầm xa)
   - `other` (Đơn vị cơ giới / Thiết kỵ / Boss)
