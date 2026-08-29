# Đặc Tả Bản Đồ, Kẻ Địch & 10 Wave Trận Đấu: ARC-KT-01

**Chương**: `ARC-KT-01 — Long Cổn Cứu Quốc (Kháng Tống 981)`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-kt-01/enemy-wave-map-spec.md`
**Trạng thái**: Official Map & Wave Progression Spec (Locked)

---

## 1. Đặc Tả Bản Đồ Chiến Trường (Tower Defense Map Spec)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ (0,0)                                                               (800,0) │
│ S1 (0, 150) ─── P1 (180, 150)                                               │
│ [Bộ Binh Tống]        \                                                     │
│                        \                                                    │
│                         P3 (320, 300) ── P4 (520, 300) ── E (800, 300)      │
│                        /    [CHOKE POINT]  [BÃI CỌC GỖ]   [ĐẠI BẢN DOANH]   │
│                       /                                                     │
│ S2 (0, 450) ─── P2 (180, 450)                                               │
│ [Thủy Quân Tống]                                                            │
│ (0,600)                                                             (800,600)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.1. Thông Số Cơ Bản & Cảm Hứng Lịch Sử
* **Mã Bản Đồ (`mapId`)**: `map-kt-chi-lang-luc-dau-01`
* **Tên hiển thị (`displayName`)**: `Phòng Tuyến Chi Lăng — Lục Đầu Giang`
* **Cảm hứng lịch sử & Bản sắc Việt**:
  - Tái hiện sự kết hợp giữa **hai mũi tiến công Thủy - Bộ của quân Tống** năm 981: Cánh bộ binh Hầu Nhân Bảo từ ải Chi Lăng (Lạng Sơn) và cánh thủy quân Lưu Trừng từ sông Bạch Đằng cùng tiến về vùng châu thổ Lục Đầu Giang.
  - Bàn cờ mang đậm dấu ấn kiến trúc quân sự Đại Cồ Việt: chiến lũy đất nện, đồi lau sậy, dòng sông ngầu đỏ phù sa, hàng rào cọc gỗ ngăn sông kiên cố, chòi canh mái lá đính chuông đồng báo hiệu. Tuyệt đối không sử dụng kiến trúc tường gạch nguy nga kiểu thành trì Trung Hoa phong kiến.

### 1.2. Kích Thước & Cấu Trúc Tuyến Đường (Path Geometry)
* **Kích thước chuẩn**: Rộng $800\text{ px} \times$ Cao $600\text{ px}$ (Tỷ lệ khung nhìn 4:3).
* **Lưới ô bàn cờ (Grid)**: $10\text{ Cột (Columns)} \times 8\text{ Hàng (Rows)}$ ($80\text{ px} \times 75\text{ px}$ mỗi ô).
* **Cấu trúc tuyến đường hai nhánh hợp lưu**:
  1. **Nhánh 1 (Bộ binh Bắc - S1)**: Điểm xuất phát `(0, 150)` $\rightarrow$ Điểm chuyển hướng P1 `(180, 150)` $\rightarrow$ Hợp lưu tại P3 `(320, 300)`.
  2. **Nhánh 2 (Thủy quân Nam - S2)**: Điểm xuất phát `(0, 450)` $\rightarrow$ Điểm chuyển hướng P2 `(180, 450)` $\rightarrow$ Hợp lưu tại P3 `(320, 300)`.
  3. **Đoạn hợp lưu chính (P3 $\rightarrow$ P4 $\rightarrow$ E)**:
     - Mốc P3 `(320, 300)`: Điểm thắt cổ chai (Choke Point) nơi quân địch hai cánh giao nhau.
     - Mốc P4 `(520, 300)`: Trận địa cọc gỗ và bãi bồi phục kích.
     - Điểm đích E `(800, 300)`: Cổng Lũy Chỉ Huy / Doanh Trại Tiền Lê (Thành trì phòng thủ).

### 1.3. Danh Sách Ô Triển Khai Tướng (Placement Tiles Layout)
Bố trí 8 ô đặt tướng chiến lược tại các cao điểm và khúc cua hiểm:

| Mã Ô (Slot ID) | Vị Trí Lưới (Col, Row) | Tọa Độ Tâm (Center X, Y) | Địa Hình Chiếm Giữ | Ý Đồ Bố Trí Chiến Thuật |
|---|:---:|:---:|---|---|
| `slot-1-1` | Cột 1, Hàng 1 | $(120, 112.5)$ | Gò đồi phía Bắc | Đặt tướng đón đánh cánh bộ binh xuất phát S1. |
| `slot-1-6` | Cột 1, Hàng 6 | $(120, 487.5)$ | Bờ sông phía Nam | Đặt tướng tầm xa chặn đường thủy quân xuất phát S2. |
| `slot-3-2` | Cột 3, Hàng 2 | $(280, 187.5)$ | Mỏm đá ngắm ngã ba | Bao quát toàn bộ nhánh trên và khúc vào Choke Point P3. |
| `slot-3-5` | Cột 3, Hàng 5 | $(280, 412.5)$ | Bãi sậy ngắm ngã ba | Bao quát nhánh dưới và tiếp ứng khống chế P3. |
| `slot-5-2` | Cột 5, Hàng 2 | $(440, 187.5)$ | Vách núi trung tâm | Vị trí đắc địa đặt tướng AoE bao trùm trận địa cọc gỗ P4. |
| `slot-5-5` | Cột 5, Hàng 5 | $(440, 412.5)$ | Đảo nổi ven bãi bồi | Đặt đấu sĩ cận chiến chém dồn sát thương tại P4. |
| `slot-7-3` | Cột 7, Hàng 3 | $(600, 262.5)$ | Tiền đồn cửa lũy | Trạm chốt chặn chính trước cổng thành bảo vệ điểm đích. |
| `slot-7-4` | Cột 7, Hàng 4 | $(600, 337.5)$ | Trạm gác doanh trại | Tuyến phòng thủ cuối cùng dứt điểm các quái vật lọt qua. |

---

## 2. Đặc Tả Hệ Thống Kẻ Địch (Enemy Archetypes)

Hệ thống quân xâm lược nhà Tống gồm 3 Archetype lính thường và 1 Boss chỉ huy tối cao:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HỆ THỐNG KẺ ĐỊCH QUÂN TỐNG 981                     │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] TỐNG BỘ BINH     │ [2] TỐNG NỎ THỦ      │ [3] CHIẾN THUYỀN TỐNG QUÂN    │
│ Category: sword      │ Category: archer     │ Category: other               │
│ HP: 160 · Spd: 75    │ HP: 100 · Spd: 95    │ HP: 300 · Spd: 115 · Dmg: 2   │
│ Màu: Đỏ tươi (#dc2626│ Màu: Cam đất (#ea580c│ Màu: Tím sẫm (#9333ea)        │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### 2.1. Quái 1: Tống Đao Khiên Binh (Song Swordsman)
* **Mã định danh (`enemyId`)**: `tong-bo-binh`
* **Tên hiển thị**: `Tống Bộ Binh`
* **Phân loại (`category`)**: `'sword'`
* **Chỉ số định hướng**:
  - `maxHp: 160` (Máu khá dày, lính chính quy Bắc triều)
  - `moveSpeed: 75` (Hành quân bộ chậm rãi, hàng ngũ chặt chẽ)
  - `cityDamage: 1`
  - `color: 0xdc2626` (Màu đỏ tươi đồng phục binh lính Tống)
* **Mô tả thị giác**: Binh sĩ Tống đội nón sắt tròn, khoác giáp bạt đỏ thêu hoa văn chữ Tống, tay cầm đao liễu lá và khiên gỗ bọc da.
* **Nhãn phân loại**: `[SOURCE-BACKED: T1 Tống Sử / Đạo quân bộ Lạng Sơn]`.

### 2.2. Quái 2: Tống Nỏ Thủ Thần Tí (Song Crossbowman)
* **Mã định danh (`enemyId`)**: `tong-cung-thu`
* **Tên hiển thị**: `Tống Nỏ Thủ`
* **Phân loại (`category`)**: `'archer'`
* **Chỉ số định hướng**:
  - `maxHp: 100` (Máu mỏng)
  - `moveSpeed: 95` (Di chuyển nhanh nhẹn, tản bộ)
  - `cityDamage: 1`
  - `color: 0xea580c` (Cam đất)
* **Mô tả thị giác**: Xạ thủ nỏ mang ống tên sau lưng, tay cầm nỏ thần cơ động, bước chân thoăn thoắt lách qua đầm lầy.
* **Nhãn phân loại**: `[SOURCE-BACKED: T1 Tống Sử / Đội nỏ hộ tống]`.

### 2.3. Quái 3: Chiến Thuyền / Thiết Kỵ Tống Quân (Heavy Raider)
* **Mã định danh (`enemyId`)**: `tong-chien-thuyen`
* **Tên hiển thị**: `Chiến Thuyền Tống Quân`
* **Phân loại (`category`)**: `'other'`
* **Chỉ số định hướng**:
  - `maxHp: 300` (Máu rất dày, sức chống chịu cao)
  - `moveSpeed: 115` (Tốc độ lao cực nhanh, vượt thác ghềnh)
  - `cityDamage: 2` (Gây gấp đôi sát thương nếu thoát vào thành)
  - `color: 0x9333ea` (Tím sẫm)
* **Mô tả thị giác**: Thuyền chiến đáy nhọn bọc đồng hoặc kỵ binh thiết giáp Lĩnh Nam lao thẳng với tốc độ kinh hoàng.
* **Nhãn phân loại**: `[SOURCE-BACKED: T1 Tống Sử / Hạm đội thủy quân Lưu Trừng]`.

---

## 3. Đặc Tả Trùm Cuối: Hầu Nhân Bảo (Final Boss Concept)

* **Mã định danh (`enemyId`)**: `boss-hou-renbao`
* **Tên hiển thị**: `Hầu Nhân Bảo`
* **Danh xưng lịch sử**: `Lĩnh Nam Đông Lộ Chuyển Vận Sứ` `[SOURCE-BACKED: T1 Tống Sử + T2 Toàn Thư]`
* **Căn cứ lịch sử**:
  - `[SOURCE-BACKED: T1/T2]`: Thống lĩnh cánh quân bộ Tống, tính hiếu chiến, chủ quan tiến sâu vào trận địa phục kích của Lê Hoàn, bị giết vào tháng 4 năm 981, dẫn đến sự sụp đổ hoàn toàn của toàn bộ chiến dịch xâm lược.
* **Phân loại (`category`)**: `'other'`
* **Chỉ số định hướng**:
  - `maxHp: 1500` (Lượng máu khổng lồ, gấp $\approx 10$ lần lính thường)
  - `moveSpeed: 60` (Hành quân chậm rãi, uy nghiêm đầy áp lực)
  - `cityDamage: 5` (Mối đe dọa hủy diệt nếu lọt vào thành chỉ huy)
  - `color: 0xf59e0b` (Màu vàng kim quý tộc Bắc triều)
* **Mô tả thị giác & Quy mô**:
  - Thể hình to lớn vượt bậc ($1.4\times$ so với lính thường), khoác giáp tướng trụ bạc nẹp vàng rực rỡ, áo choàng gấm đỏ thẫm bay trong gió; tay vung thanh đại bảo đao tráng lệ.
  - Vòng chân đế phát ánh hào quang màu hổ phách cảnh báo nguy hiểm cấp cao nhất.
* **Đội hình hộ vệ đi kèm ở Wave 10**: Xuất hiện cùng $6\times$ Chiến Thuyền Tống Quân hộ tống phía sau và $8\times$ Tống Nỏ Thủ dọn đường.

---

## 4. Tiến Trình 10 Đợt Tác Chiến (10-Wave Progression)

| Wave | Tên Đợt & Bối Cảnh Chiến Thuật | Thành Phần Quân Địch Xuất Hiện | Tổng Quái | Nhịp Ra Quái (Interval) | Mục Tiêu & Thách Thức Gameplay |
|:---:|---|---|:---:|:---:|---|
| **1** | *Tiền Thám Chi Lăng* | $6\times$ `tong-bo-binh` (Nhánh S1) | $6$ | $1,200\text{ ms}$ | **Khởi động**: Bố trí Hero làm quen địa hình cửa ải phía Bắc. |
| **2** | *Thám Báo Sông Bạch Đằng* | $4\times$ `tong-bo-binh`, $4\times$ `tong-cung-thu` (Nhánh S2) | $8$ | $1,100\text{ ms}$ | **Dễ**: Thủy quân xuất hiện ở nhánh Nam, kiểm tra khả năng đón đầu 2 cánh. |
| **3** | *Nỏ Binh Áp Trận* | $4\times$ `tong-bo-binh`, $8\times$ `tong-cung-thu` (Cả 2 nhánh) | $12$ | $950\text{ ms}$ | **Trung bình**: Số lượng nỏ thủ tăng nhanh, cần tầm đánh rộng của Dương Vân Nga. |
| **4** | *Chiến Hạm Tiên Phong* | $3\times$ `tong-chien-thuyen`, $6\times$ `tong-bo-binh` | $9$ | $1,000\text{ ms}$ | **Trung bình**: Xuất hiện thuyền chiến tốc độ cao $115\text{ px/s}$, đe dọa lọt lưới. |
| **5** | *Hợp Binh Lục Đầu Giang* | $6\times$ `tong-bo-binh`, $6\times$ `tong-cung-thu`, $2\times$ `tong-chien-thuyen` | $14$ | $850\text{ ms}$ | **Khá**: Hai cánh quân dồn về Choke Point P3 cùng lúc, tạo áp lực tắc nghẽn. |
| **6** | *Đột Phá Bãi Cọc* | $6\times$ `tong-chien-thuyen`, $6\times$ `tong-cung-thu` | $12$ | $750\text{ ms}$ | **Khá**: Nhịp ra quái dồn dập, đòi hỏi kích hoạt chiêu làm chậm của Phạm Cự Lạng. |
| **7** | *Đại Quân Đao Khiên* | $12\times$ `tong-bo-binh`, $4\times$ `tong-chien-thuyen` | $16$ | $800\text{ ms}$ | **Khó**: Đội hình máu dày tiến thành cụm đặc, cần sát thương AoE dọn dẹp. |
| **8** | *Mưa Tên Thần Tí* | $14\times$ `tong-cung-thu`, $4\times$ `tong-chien-thuyen` | $18$ | $700\text{ ms}$ | **Khó**: Nỏ thủ tràn ngập bản đồ với số lượng lớn nhất, thử thách khả năng dứt điểm. |
| **9** | *Tổng Lực Tiền Triều* | $8\times$ `tong-bo-binh`, $8\times$ `tong-cung-thu`, $6\times$ `tong-chien-thuyen` | $22$ | $650\text{ ms}$ | **Cực Khó**: Đợt tổng công kích dữ dội nhất dọn đường cho Chủ tướng Hầu Nhân Bảo. |
| **10** | **QUYẾT CHIẾN HẦU NHÂN BẢO** | **$1\times$ `boss-hou-renbao`** + $6\times$ `tong-chien-thuyen` + $8\times$ `tong-cung-thu` | **$15$** | Boss ra đầu tiên, quân hộ vệ theo sau $900\text{ ms}$ | **ĐỈNH CAO (BOSS CLIMAX)**: Dồn toàn bộ hỏa lực đòn chém bộc phá của Lê Hoàn kết hợp khống chế bất động để tiêu diệt Hầu Nhân Bảo. |
