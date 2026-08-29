# Đặc Tả Bản Đồ, Kẻ Địch & 10 Wave Trận Đấu: ARC-CP-01

**Chương**: `ARC-CP-01 — Bình Chiêm Phạt Bạo (Nam Chinh 982)`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-cp-01/enemy-wave-map-spec.md`
**Trạng thái**: Official Map & Wave Progression Spec (Single-Path MVP Aligned)

---

## 1. Đặc Tả Bản Đồ Chiến Trường (Tower Defense Map Spec — Single-Path MVP)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ (0,0)                                                               (800,0) │
│       [Bãi Cát Duyên Hải Phía Bắc]                 [Đền Tháp Gạch Nung]     │
│                                                                             │
│                                                                             │
│ S (0, 300) ─── P1 (180, 300) ─── P2 (320, 300) ── P3 (520, 300) ── E (800,300)│
│ [Bến Đổ Bộ]     [Rừng Dừa]       [CHOKE POINT]   [HÀO NƯỚC THÀNH] [DOANH TRẠI] │
│                                                                             │
│                                                                             │
│       [Vùng Cồn Cát Nam Tuyến]                     [Tường Đá Ong Indrapura] │
│ (0,600)                                                             (800,600)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.1. Thông Số Cơ Bản & Cảm Hứng Lịch Sử
* **Mã Bản Đồ (`mapId`)**: `map-cp-indrapura-01`
* **Tên hiển thị (`displayName`)**: `Cửa Biển & Thành Lũy Indrapura`
* **Cảm hứng lịch sử & Bản sắc Champa**:
  - Tái hiện trận địa công phá thành trì Indrapura (vùng Đồng Dương, Quảng Nam) năm 982: quân Đại Cồ Việt sau khi đổ bộ đường biển đã tiến quân qua các cồn cát trắng duyên hải, rừng dừa nhiệt đới và vượt hào nước tấn công vào trung tâm thành quách Champa.
  - Bàn cờ mang đậm dấu ấn kiến trúc văn hóa Champa thế kỷ X: các tháp gạch nung đỏ rực không mạch vữa, phù điêu thần hộ pháp Dvarapala chạm nổi trên đá sa thạch, hào nước thành sâu bọc đá ong, và rặng dừa xanh mướt đung đưa trong gió biển miền Trung.

### 1.2. Kích Thước & Tuyến Đường Hành Quân Chuẩn MVP (`fixedPath`)
* **Kích thước chuẩn**: Rộng $800\text{ px} \times$ Cao $600\text{ px}$ (Tỷ lệ 4:3).
* **Lưới ô bàn cờ (Grid)**: $10\text{ Cột (Columns)} \times 8\text{ Hàng (Rows)}$ ($80\text{ px} \times 75\text{ px}$ mỗi ô).
* **Tuyến đường cố định duy nhất (`fixedPath`)**:
  1. **Điểm Xuất Phát (Start - S)**: `(x: 0, y: 300)` — Bến đổ bộ ven bãi cát duyên hải phía Tây.
  2. **Mốc 1 (P1)**: `(x: 180, y: 300)` — Rừng dừa rậm rạp và bãi sậy cửa sông.
  3. **Mốc 2 (P2 - Choke Point)**: `(x: 320, y: 300)` — Khúc eo thắt cổ chai giữa hai đồi cát đỏ.
  4. **Mốc 3 (P3 - Hào nước thành)**: `(x: 520, y: 300)` — Cầu gỗ bắc qua hào nước thành Indrapura `[SOURCE-BACKED: Toàn Thư]`.
  5. **Điểm Đích (End - E)**: `(x: 800, y: 300)` — Cổng Doanh Trại / Căn Cứ Tiền Tiêu Đại Cồ Việt (Thành trì bảo vệ).

### 1.3. Danh Sách Ô Triển Khai Tướng (Placement Tiles Layout)
Bố trí 8 ô cắm tướng chiến thuật hai bên sườn tuyến đường:

| Mã Ô (Slot ID) | Vị Trí Lưới (Col, Row) | Tọa Độ Tâm (Center X, Y) | Địa Hình Chiếm Giữ | Ý Đồ Bố Trí Chiến Thuật |
|---|:---:|:---:|---|---|
| `slot-1-1` | Cột 1, Hàng 1 | $(120, 112.5)$ | Gò cát phía Bắc | Đặt tướng đón đánh quân địch vừa xuất hiện từ bến S. |
| `slot-1-6` | Cột 1, Hàng 6 | $(120, 487.5)$ | Bờ rặng dừa phía Nam | Đặt tướng tầm xa khống chế khúc vào P1. |
| `slot-3-2` | Cột 3, Hàng 2 | $(280, 187.5)$ | Mỏm đá ngắm ngã rẽ | Bao quát toàn bộ đoạn tiếp cận Choke Point P2. |
| `slot-3-5` | Cột 3, Hàng 5 | $(280, 412.5)$ | Bãi cát ngắm ngã rẽ | Đặt xạ thủ hỗ trợ tầm xa bao trùm P2. |
| `slot-5-2` | Cột 5, Hàng 2 | $(440, 187.5)$ | Chân tháp gạch trung tâm | Vị trí đắc địa đặt tướng AoE bao trùm cầu vượt hào nước P3. |
| `slot-5-5` | Cột 5, Hàng 5 | $(440, 412.5)$ | Bờ hào đá ong | Đặt đấu sĩ cận chiến chém dồn sát thương tại P3. |
| `slot-7-3` | Cột 7, Hàng 3 | $(600, 262.5)$ | Tiền đồn cửa lũy | Trạm chốt chặn chính trước cổng bảo vệ điểm đích. |
| `slot-7-4` | Cột 7, Hàng 4 | $(600, 337.5)$ | Trạm gác doanh trại | Tuyến phòng thủ cuối cùng dứt điểm các quái vật lọt qua. |

---

## 2. Đặc Tả Hệ Thống Kẻ Địch (Enemy Archetypes)

Hệ thống quân Champa gồm 3 Archetype lính thường và 1 Boss chỉ huy tối cao, khớp 100% với schema `EnemyDefinition`:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HỆ THỐNG KẺ ĐỊCH QUÂN ĐỘI CHAMPA 982               │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] ĐAO KHIÊN CHAMPA │ [2] XẠ THỦ CUNG MÂY  │ [3] VOI CHIẾN BỌC GIÁP        │
│ Category: sword      │ Category: archer     │ Category: other               │
│ HP: 150 · Spd: 80    │ HP: 95 · Spd: 95     │ HP: 350 · Spd: 70 · Dmg: 2    │
│ Màu: Đỏ gạch (#dc2626│ Màu: Cam sa mạc (#ea5│ Màu: Nâu voi (#7c2d12)        │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### 2.1. Quái 1: Chiến Binh Đao Khiên Champa (Cham Swordsman)
* **Mã định danh (`id`)**: `cham-dao-khien`
* **Tên hiển thị (`name`)**: `Chiến Binh Champa`
* **Phân loại (`category`)**: `'sword'`
* **Chỉ số định hướng**:
  - `maxHp: 150` (Máu vừa phải, lính bộ binh xung kích)
  - `moveSpeed: 80` (Hành quân cơ động trên cát)
  - `cityDamage: 1`
  - `color: 0xdc2626` (Màu đỏ gạch nung truyền thống Champa)
* **Mô tả thị giác**: Chiến binh mặc váy sarong dệt hoa văn lửa, quấn khăn đầu màu đỏ, tay cầm đoản đao cong kris và khiên mây đan tròn bọc da.
* **Nhãn phân loại**: `[SOURCE-BACKED: Phù điêu Champa thế kỷ X / Đồng Dương]`.

### 2.2. Quái 2: Xạ Thủ Cung Mây Champa (Cham Archer)
* **Mã định danh (`id`)**: `cham-cung-thu`
* **Tên hiển thị (`name`)**: `Nỏ Thủ Champa`
* **Phân loại (`category`)**: `'archer'`
* **Chỉ số định hướng**:
  - `maxHp: 95` (Máu mỏng)
  - `moveSpeed: 95` (Di chuyển nhanh nhẹn, phân tán)
  - `cityDamage: 1`
  - `color: 0xea580c` (Cam sa mạc)
* **Mô tả thị giác**: Cung thủ vóc dáng thanh mảnh, đeo bao tên sau lưng, tay cầm cánh cung uốn từ mây rừng dẻo dai, bắn tên tẩm nhựa cây dẫn lửa.
* **Nhãn phân loại**: `[SOURCE-BACKED: Khảo cứu quân sự Champa thế kỷ X]`.

### 2.3. Quái 3: Voi Chiến Champa (Cham War Elephant)
* **Mã định danh (`id`)**: `cham-tuong-binh`
* **Tên hiển thị (`name`)**: `Voi Chiến Champa`
* **Phân loại (`category`)**: `'other'`
* **Chỉ số định hướng**:
  - `maxHp: 350` (Máu rất dày, sức chống chịu phi thường)
  - `moveSpeed: 70` (Hành quân lầm lũi, không thể bị đẩy lùi)
  - `cityDamage: 2` (Gây gấp đôi sát thương nếu thoát vào thành)
  - `color: 0x7c2d12` (Nâu sẫm voi chiến bọc giáp đồng)
* **Mô tả thị giác**: Thớt voi chiến khổng lồ đeo bản giáp trán đúc đồng chạm hoa văn Makara, trên lưng có bành voi chở quản tượng cầm trường thương.
* **Nhãn phân loại**: `[SOURCE-BACKED: Toàn Thư / Tống Sử ghi nhận tượng binh Champa]`.

---

## 3. Đặc Tả Trùm Cuối: Vua Chiêm Bê Mê Thuế (Final Boss Concept)

* **Mã định danh (`id`)**: `boss-be-me-thue`
* **Tên hiển thị (`name`)**: `Vua Bê Mê Thuế`
* **Danh xưng lịch sử**: `Quốc Vương Chiêm Thành — Paramesvaravarman I` `[SOURCE-BACKED: Toàn Thư / Tống Sử / Văn bia Mỹ Sơn]`
* **Căn cứ lịch sử**:
  - `[SOURCE-BACKED: Toàn Thư]`: Vua Chiêm bắt giam sứ thần Đại Cồ Việt; khi Lê Hoàn đem quân đến kinh đô Indrapura đã đích thân giao chiến và bị chém chết ngay tại trận tiền.
* **Phân loại (`category`)**: `'other'`
* **Chỉ số định hướng**:
  - `maxHp: 1600` (Lượng máu khổng lồ, gấp $\approx 11$ lần lính thường)
  - `moveSpeed: 60` (Hành quân uy nghi, áp lực chậm rãi)
  - `cityDamage: 5` (Mối đe dọa hủy diệt nếu lọt vào doanh trại chỉ huy)
  - `color: 0xd97706` (Màu vàng kim quý tộc hoàng gia Champa)
* **Mô tả thị giác & Quy mô**:
  - Thể hình to lớn vượt bậc ($1.4\times$ so với lính thường), đội vương miện Mukuta dát vàng lấp lánh, khoác áo choàng lụa đỏ thẫm thêu kim tuyến, tay vung trường giáo dát ngọc.
  - Vòng chân đế phát ánh hào quang màu vàng hổ phách cảnh báo nguy hiểm cấp cao nhất.
* **Đội hình hộ vệ đi kèm ở Wave 10**: Xuất hiện cùng $4\times$ Voi Chiến Champa đi bọc lót hai bên và $8\times$ Xạ Thủ Cung Mây dọn đường.

---

## 4. Tiến Trình 10 Đợt Tác Chiến (10-Wave Progression)

| Wave | Tên Đợt & Bối Cảnh Chiến Thuật | Thành Phần Quân Địch Xuất Hiện | Tổng Quái | Nhịp Ra Quái (Interval) | Mục Tiêu & Thách Thức Gameplay |
|:---:|---|---|:---:|:---:|---|
| **1** | *Tiền Tiêu Bãi Cát* | $6\times$ `cham-dao-khien` | $6$ | $1,200\text{ ms}$ | **Khởi động**: Bố trí Hero làm quen địa hình cửa bến S. |
| **2** | *Cung Thủ Rừng Dừa* | $4\times$ `cham-dao-khien`, $4\times$ `cham-cung-thu` | $8$ | $1,100\text{ ms}$ | **Dễ**: Cung thủ xuất hiện xen kẽ, kiểm tra khả năng đón đầu tại P1. |
| **3** | *Mưa Tên Đồi Cát* | $4\times$ `cham-dao-khien`, $8\times$ `cham-cung-thu` | $12$ | $950\text{ ms}$ | **Trung bình**: Số lượng cung thủ tăng nhanh, cần tầm đánh rộng của Từ Mục. |
| **4** | *Thiết Tượng Xuất Kích* | $2\times$ `cham-tuong-binh`, $6\times$ `cham-dao-khien` | $8$ | $1,100\text{ ms}$ | **Trung bình**: Xuất hiện voi chiến máu dày $350\text{ HP}$, cần đòn chém dứt điểm. |
| **5** | *Hợp Lực Indrapura* | $6\times$ `cham-dao-khien`, $6\times$ `cham-cung-thu`, $2\times$ `cham-tuong-binh` | $14$ | $850\text{ ms}$ | **Khá**: Quân địch dồn về Choke Point P2 đông đúc, tạo áp lực tắc nghẽn. |
| **6** | *Đột Kích Chân Tháp* | $4\times$ `cham-tuong-binh`, $8\times$ `cham-cung-thu` | $12$ | $800\text{ ms}$ | **Khá**: Nhịp ra quái dồn dập, đòi hỏi chiêu làm chậm của Phạm Cự Lạng. |
| **7** | *Cấm Vệ Sarong Đỏ* | $12\times$ `cham-dao-khien`, $4\times$ `cham-tuong-binh` | $16$ | $750\text{ ms}$ | **Khó**: Đội hình bộ binh và voi chiến tiến thành cụm đặc, cần sát thương AoE dọn dẹp. |
| **8** | *Mưa Hỏa Tiễn Sa Mạc* | $14\times$ `cham-cung-thu`, $4\times$ `cham-tuong-binh` | $18$ | $700\text{ ms}$ | **Khó**: Cung thủ tràn ngập bản đồ với số lượng lớn, thử thách khả năng dứt điểm. |
| **9** | *Đại Đội Tượng Binh* | $6\times$ `cham-tuong-binh`, $8\times$ `cham-dao-khien`, $6\times$ `cham-cung-thu` | $20$ | $650\text{ ms}$ | **Cực Khó**: Đợt tổng công kích dữ dội nhất dọn đường cho Vua Chiêm Bê Mê Thuế. |
| **10** | **QUYẾT CHIẾN BÊ MÊ THUẾ** | **$1\times$ `boss-be-me-thue`** + $4\times$ `cham-tuong-binh` + $8\times$ `cham-cung-thu` | **$13$** | Boss ra đầu tiên, quân hộ vệ theo sau $900\text{ ms}$ | **ĐỈNH CAO (BOSS CLIMAX)**: Dồn toàn bộ hỏa lực đòn chém bộc phá của Lê Hoàn kết hợp khống chế bất động để tiêu diệt Bê Mê Thuế. |
