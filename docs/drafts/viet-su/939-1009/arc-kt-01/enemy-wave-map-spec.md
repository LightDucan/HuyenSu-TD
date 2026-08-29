# Đặc Tả Bản Đồ, Kẻ Địch & 10 Wave Trận Đấu: ARC-KT-01

**Chương**: `ARC-KT-01 — Long Cổn Cứu Quốc (Kháng Tống 981)`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-kt-01/enemy-wave-map-spec.md`
**Trạng thái**: Official Map & Wave Progression Spec (Single-Path MVP Aligned)

---

## 1. Đặc Tả Bản Đồ Chiến Trường (Tower Defense Map Spec — Single-Path MVP)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ (0,0)                                                               (800,0) │
│       [Núi Đá Chi Lăng Phía Bắc]                  [Vách Núi Trung Tâm]      │
│                                                                             │
│                                                                             │
│ S (0, 300) ─── P1 (180, 300) ─── P2 (320, 300) ── P3 (520, 300) ── E (800,300)│
│ [Cửa Ải]        [Bãi Sậy]        [CHOKE POINT]   [BÃI CỌC GỖ]   [ĐẠI BẢN DOANH]│
│                                                                             │
│                                                                             │
│       [Vùng Sông Nước Nam Tuyến]                  [Bờ Phù Sa Hạ Lưu]        │
│ (0,600)                                                             (800,600)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.1. Thông Số Cơ Bản & Cảm Hứng Lịch Sử
* **Mã Bản Đồ (`mapId`)**: `map-kt-chi-lang-luc-dau-01`
* **Tên hiển thị (`displayName`)**: `Phòng Tuyến Chi Lăng — Lục Đầu Giang`
* **Cảm hứng lịch sử & Bản sắc Việt**:
  - Tái hiện chiến trường phòng ngự liên hợp Thủy - Bộ của quân dân Đại Cồ Việt năm 981: Cản bước đạo quân bộ Lạng Sơn tại Chi Lăng và bẻ gãy đạo thủy quân Bạch Đằng trên vùng sông nước Lục Đầu Giang.
  - Bàn cờ mang đậm bản sắc quân sự Đại Cồ Việt thế kỷ X: chòi canh mái lá đính chuêng đồng báo hiệu, chiến lũy đất nện, bãi bồi lau sậy ngập nước, và hàng rào cọc gỗ ngăn sông kiên cố. Tuyệt đối không dùng phong cách tường thành gạch ngói phong kiến Trung Hoa.

### 1.2. Kích Thước & Tuyến Đường Hành Quân Chuẩn MVP (`fixedPath`)
* **Kích thước chuẩn**: Rộng $800\text{ px} \times$ Cao $600\text{ px}$ (Tỷ lệ 4:3).
* **Lưới ô bàn cờ (Grid)**: $10\text{ Cột (Columns)} \times 8\text{ Hàng (Rows)}$ ($80\text{ px} \times 75\text{ px}$ mỗi ô).
* **Tuyến đường cố định duy nhất (`fixedPath`)**:
  1. **Điểm Xuất Phát (Start - S)**: `(x: 0, y: 300)` — Cửa ải tiền tiêu phía Tây.
  2. **Mốc 1 (P1)**: `(x: 180, y: 300)` — Bãi sậy ven sông phù sa.
  3. **Mốc 2 (P2 - Choke Point)**: `(x: 320, y: 300)` — Điểm thắt cổ chai giữa hai mỏm đá hiểm trở.
  4. **Mốc 3 (P3 - Trận địa cọc gỗ)**: `(x: 520, y: 300)` — Khúc sông cắm cọc gỗ phòng thủ Chi Lăng `[SOURCE-BACKED: Toàn Thư]`.
  5. **Điểm Đích (End - E)**: `(x: 800, y: 300)` — Cổng Lũy Chỉ Huy / Đại Bản Doanh Tiền Lê (Thành trì bảo vệ).

> [!NOTE]
> **Thể Hiện Hai Mũi Tiến Công Lịch Sử (Thủy - Bộ) Trong Giới Hạn Single-Path**:
> Runtime hiện tại của engine hỗ trợ 1 tuyến đường cố định (`fixedPath`). Bản sắc hai cánh quân Thủy - Bộ của nhà Tống được tái hiện sinh động thông qua:
> - Tên gọi và chủ đề chiến thuật của từng đợt Wave (Wave 1: Tiền thám Chi Lăng $\leftrightarrow$ Wave 2: Thám báo Bạch Đằng).
> - Thành phần đan xen giữa **Tống Bộ Binh** (quân bộ tiến công) và **Tống Thủy Binh** (lính thủy chiến đổ bộ bứt tốc).

### 1.3. Danh Sách Ô Triển Khai Tướng (Placement Tiles Layout)
Bố trí 8 ô cắm tướng chiến thuật hai bên sườn tuyến đường:

| Mã Ô (Slot ID) | Vị Trí Lưới (Col, Row) | Tọa Độ Tâm (Center X, Y) | Địa Hình Chiếm Giữ | Ý Đồ Bố Trí Chiến Thuật |
|---|:---:|:---:|---|---|
| `slot-1-1` | Cột 1, Hàng 1 | $(120, 112.5)$ | Gò đồi phía Bắc | Đặt tướng đón đánh quân địch vừa xuất hiện tại cửa ải S. |
| `slot-1-6` | Cột 1, Hàng 6 | $(120, 487.5)$ | Bờ sông phía Nam | Đặt tướng tầm xa khống chế khúc vào P1. |
| `slot-3-2` | Cột 3, Hàng 2 | $(280, 187.5)$ | Mỏm đá ngắm ngã rẽ | Bao quát toàn bộ đoạn tiếp cận Choke Point P2. |
| `slot-3-5` | Cột 3, Hàng 5 | $(280, 412.5)$ | Bãi sậy ngắm ngã rẽ | Đặt xạ thủ hỗ trợ tầm xa bao trùm P2. |
| `slot-5-2` | Cột 5, Hàng 2 | $(440, 187.5)$ | Vách núi trung tâm | Vị trí đắc địa đặt tướng AoE bao trùm trận địa cọc gỗ P3. |
| `slot-5-5` | Cột 5, Hàng 5 | $(440, 412.5)$ | Đảo nổi ven bãi bồi | Đặt đấu sĩ cận chiến chém dồn sát thương tại P3. |
| `slot-7-3` | Cột 7, Hàng 3 | $(600, 262.5)$ | Tiền đồn cửa lũy | Trạm chốt chặn chính trước cổng thành bảo vệ điểm đích. |
| `slot-7-4` | Cột 7, Hàng 4 | $(600, 337.5)$ | Trạm gác doanh trại | Tuyến phòng thủ cuối cùng dứt điểm các quái vật lọt qua. |

---

## 2. Đặc Tả Hệ Thống Kẻ Địch (Enemy Archetypes)

Hệ thống quân xâm lược nhà Tống gồm 3 Archetype lính thường và 1 Boss chỉ huy tối cao, khớp hoàn toàn với schema `EnemyDefinition`:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HỆ THỐNG KẺ ĐỊCH QUÂN TỐNG 981                     │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] TỐNG BỘ BINH     │ [2] TỐNG NỎ THỦ      │ [3] TỐNG THỦY BINH (ĐỔ BỘ)    │
│ Category: sword      │ Category: archer     │ Category: other               │
│ HP: 160 · Spd: 75    │ HP: 100 · Spd: 95    │ HP: 280 · Spd: 115 · Dmg: 2   │
│ Màu: Đỏ tươi (#dc2626│ Màu: Cam đất (#ea580c│ Màu: Tím sẫm (#9333ea)        │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### 2.1. Quái 1: Tống Đao Khiên Binh (Song Swordsman)
* **Mã định danh (`id`)**: `tong-bo-binh`
* **Tên hiển thị (`name`)**: `Tống Bộ Binh`
* **Phân loại (`category`)**: `'sword'`
* **Chỉ số định hướng**:
  - `maxHp: 160` (Máu khá dày, lính bộ binh chính quy)
  - `moveSpeed: 75` (Hành quân bộ vừa phải, hàng ngũ chặt chẽ)
  - `cityDamage: 1`
  - `color: 0xdc2626` (Màu đỏ tươi đồng phục binh lính Tống)
* **Mô tả thị giác**: Binh sĩ Tống đội nón sắt tròn, khoác giáp bạt đỏ, tay cầm đao liễu lá và khiên gỗ bọc da.
* **Nhãn phân loại**: `[SOURCE-BACKED: Tống Sử / Đạo quân bộ Lạng Sơn]`.

### 2.2. Quái 2: Tống Nỏ Thủ Thần Tí (Song Crossbowman)
* **Mã định danh (`id`)**: `tong-cung-thu`
* **Tên hiển thị (`name`)**: `Tống Nỏ Thủ`
* **Phân loại (`category`)**: `'archer'`
* **Chỉ số định hướng**:
  - `maxHp: 100` (Máu mỏng)
  - `moveSpeed: 95` (Di chuyển nhanh nhẹn, phân tán)
  - `cityDamage: 1`
  - `color: 0xea580c` (Cam đất)
* **Mô tả thị giác**: Xạ thủ nỏ mang ống tên sau lưng, tay cầm nỏ thần cơ động, bước chân thoăn thoắt.
* **Nhãn phân loại**: `[SOURCE-BACKED: Tống Sử / Đội nỏ hộ tống]`.

### 2.3. Quái 3: Tống Thủy Binh Đổ Bộ (Song Naval Raider)
* **Mã định danh (`id`)**: `tong-thuy-binh`
* **Tên hiển thị**: `Tống Thủy Binh`
* **Phân loại (`category`)**: `'other'`
* **Chỉ số định hướng**:
  - `maxHp: 280` (Máu dày, sức chống chịu cao)
  - `moveSpeed: 115` (Tốc độ lao nhanh, xung kích bứt phá)
  - `cityDamage: 2` (Gây gấp đôi sát thương nếu thoát vào thành)
  - `color: 0x9333ea` (Tím sẫm)
* **Mô tả thị giác**: Lính thủy chiến tinh nhuệ đổ bộ từ hạm đội Lưu Trừng, trang bị câu liêm và giáp nhẹ cơ động, lao nhanh qua các bãi sậy.
* **Nhãn phân loại**: `[SOURCE-BACKED: Tống Sử / Đạo thủy quân Lưu Trừng]`.

---

## 3. Đặc Tả Trùm Cuối: Hầu Nhân Bảo (Final Boss Concept)

* **Mã định danh (`id`)**: `boss-hou-renbao`
* **Tên hiển thị (`name`)**: `Hầu Nhân Bảo`
* **Danh xưng lịch sử**: `Lĩnh Nam Đông Lộ Chuyển Vận Sứ` `[SOURCE-BACKED: Tống Sử / Toàn Thư]`
* **Căn cứ lịch sử**:
  - `[SOURCE-BACKED: Tống Sử / Toàn Thư]`: Thống lĩnh cánh quân bộ Tống, tính hiếu chiến, chủ quan tiến sâu vào trận địa phục kích của Lê Hoàn, bị giết vào tháng 4 năm 981, dẫn đến sự sụp đổ hoàn toàn của toàn bộ chiến dịch xâm lược.
* **Phân loại (`category`)**: `'other'`
* **Chỉ số định hướng**:
  - `maxHp: 1500` (Lượng máu khổng lồ, gấp $\approx 10$ lần lính thường)
  - `moveSpeed: 60` (Hành quân chậm rãi, uy nghiêm đầy áp lực)
  - `cityDamage: 5` (Mối đe dọa hủy diệt nếu lọt vào thành chỉ huy)
  - `color: 0xf59e0b` (Màu vàng kim quý tộc Bắc triều)
* **Mô tả thị giác & Quy mô**:
  - Thể hình to lớn vượt bậc ($1.4\times$ so với lính thường), khoác giáp tướng trụ bạc nẹp vàng rực rỡ, áo choàng gấm đỏ thẫm bay trong gió; tay vung thanh đại bảo đao tráng lệ.
  - Vòng chân đế phát ánh hào quang màu hổ phách cảnh báo nguy hiểm cấp cao nhất.
* **Đội hình hộ vệ đi kèm ở Wave 10**: Xuất hiện cùng $6\times$ Tống Thủy Binh hộ tống phía sau và $8\times$ Tống Nỏ Thủ dọn đường.

---

## 4. Tiến Trình 10 Đợt Tác Chiến (10-Wave Progression)

| Wave | Tên Đợt & Bối Cảnh Chiến Thuật | Thành Phần Quân Địch Xuất Hiện | Tổng Quái | Nhịp Ra Quái (Interval) | Mục Tiêu & Thách Thức Gameplay |
|:---:|---|---|:---:|:---:|---|
| **1** | *Tiền Thám Chi Lăng* | $6\times$ `tong-bo-binh` | $6$ | $1,200\text{ ms}$ | **Khởi động**: Bố trí Hero làm quen địa hình cửa ải S. |
| **2** | *Thám Báo Sông Bạch Đằng* | $4\times$ `tong-bo-binh`, $4\times$ `tong-cung-thu` | $8$ | $1,100\text{ ms}$ | **Dễ**: Thủy bộ kết hợp nhịp chậm, kiểm tra đón đầu tại P1. |
| **3** | *Nỏ Binh Áp Trận* | $4\times$ `tong-bo-binh`, $8\times$ `tong-cung-thu` | $12$ | $950\text{ ms}$ | **Trung bình**: Số lượng nỏ thủ tăng nhanh, cần tầm đánh của Dương Vân Nga. |
| **4** | *Thủy Binh Tiên Phong* | $3\times$ `tong-thuy-binh`, $6\times$ `tong-bo-binh` | $9$ | $1,000\text{ ms}$ | **Trung bình**: Xuất hiện thủy binh bứt tốc $115\text{ px/s}$, đe dọa lọt lưới. |
| **5** | *Hợp Binh Lục Đầu Giang* | $6\times$ `tong-bo-binh`, $6\times$ `tong-cung-thu`, $2\times$ `tong-thuy-binh` | $14$ | $850\text{ ms}$ | **Khá**: Quân địch dồn về Choke Point P2 đông đúc, tạo áp lực tắc nghẽn. |
| **6** | *Đột Phá Bãi Cọc* | $6\times$ `tong-thuy-binh`, $6\times$ `tong-cung-thu` | $12$ | $750\text{ ms}$ | **Khá**: Nhịp ra quái dồn dập, đòi hỏi kích hoạt chiêu làm chậm của Phạm Cự Lạng. |
| **7** | *Đại Quân Đao Khiên* | $12\times$ `tong-bo-binh`, $4\times$ `tong-thuy-binh` | $16$ | $800\text{ ms}$ | **Khó**: Đội hình máu dày tiến thành cụm đặc, cần sát thương AoE dọn dẹp. |
| **8** | *Mưa Tên Thần Tí* | $14\times$ `tong-cung-thu`, $4\times$ `tong-thuy-binh` | $18$ | $700\text{ ms}$ | **Khó**: Nỏ thủ tràn ngập bản đồ với số lượng lớn nhất, thử thách khả năng dứt điểm. |
| **9** | *Tổng Lực Tiền Triều* | $8\times$ `tong-bo-binh`, $8\times$ `tong-cung-thu`, $6\times$ `tong-thuy-binh` | $22$ | $650\text{ ms}$ | **Cực Khó**: Đợt tổng công kích dữ dội nhất dọn đường cho Chủ tướng Hầu Nhân Bảo. |
| **10** | **QUYẾT CHIẾN HẦU NHÂN BẢO** | **$1\times$ `boss-hou-renbao`** + $6\times$ `tong-thuy-binh` + $8\times$ `tong-cung-thu` | **$15$** | Boss ra đầu tiên, quân hộ vệ theo sau $900\text{ ms}$ | **ĐỈNH CAO (BOSS CLIMAX)**: Dồn toàn bộ hỏa lực đòn chém bộc phá của Lê Hoàn kết hợp khống chế bất động để tiêu diệt Hầu Nhân Bảo. |
