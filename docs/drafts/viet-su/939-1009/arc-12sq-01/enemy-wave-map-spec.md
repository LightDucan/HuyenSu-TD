# Đặc Tả Bản Đồ, Kẻ Địch & 10 Wave Trận Đấu: ARC-12SQ-01

**Chương**: `ARC-12SQ-01 — Vạn Thắng Hoa Lư`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-12sq-01/enemy-wave-map-spec.md`
**Trạng thái**: Official Map & Wave Progression Spec (Locked)

---

## 1. Đặc Tả Bản Đồ Chiến Trường (Tower Defense Map Spec)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ (0,0)                                                               (800,0) │
│       [Núi Đá Hoa Lư]                      [Núi Đá Vôi Hang Quật]          │
│                                                                             │
│                   P2 (240, 150) ─────────────── P3 (480, 150)               │
│                      /                             \                        │
│                     /                               \                       │
│ S (0, 300) ── P1 (160, 300)                          \                      │
│ [Bãi Bồi]        [Bãi Lau Sậy]                        \                     │
│                                                        \                    │
│                                                  P4 (560, 450) ── E (800,450)│
│       [Sông Hoàng Long]                                      [Cổng Hoa Lư]  │
│ (0,600)                                                             (800,600)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.1. Thông Số Hình Học Bản Đồ
* **Tên Bản Đồ**: `Thung Lũng Cờ Lau — Động Hoa Lư`
* **Mã Bản Đồ (Map ID)**: `map-12sq-thung-lau-01`
* **Kích thước chuẩn**: Rộng $800\text{ px} \times$ Cao $600\text{ px}$ (Tỷ lệ 4:3).
* **Lưới ô bàn cờ (Grid)**: $10\text{ Cột (Columns)} \times 8\text{ Hàng (Rows)}$ ($80\text{ px} \times 75\text{ px}$ mỗi ô).
* **Màu sắc nền & Thổ nhưỡng**: Nền đất phù sa thung lũng xen lẫn đá vôi xám rêu (`#1a3325`), sông Hoàng Long uốn lượn nước xanh sẫm (`#0f2e3d`), các bụi cỏ lau vàng ngà dã chiến (`#786b43`).

### 1.2. Tọa Độ Đường Đi Cố Định (Fixed Path Waypoints)
Đường di chuyển của quân địch gồm $6$ mốc tọa độ chính xác:
1. **Điểm Xuất Phát (Start)**: `(x: 0, y: 300)` — Bìa rừng Thung Lau.
2. **Mốc 1 (P1)**: `(x: 160, y: 300)` — Khúc cua bãi bồi ven sông.
3. **Mốc 2 (P2)**: `(x: 240, y: 150)` — Khe núi hẹp phía Bắc.
4. **Mốc 3 (P3)**: `(x: 480, y: 150)` — Đoạn chạy dọc vách đá vôi.
5. **Mốc 4 (P4)**: `(x: 560, y: 450)` — Khúc lội qua bãi sậy phía Nam.
6. **Điểm Đích (End / Citadel Gate)**: `(x: 800, y: 450)` — Cổng thành lũy Hoa Lư (Thành trì phòng thủ).

### 1.3. Danh Sách Ô Triển Khai Tướng (Placement Tiles Layout)
Bố trí 8 ô đặt tướng chiến lược dọc theo hai bên tuyến hành quân:

| Mã Ô (Slot ID) | Vị Trí Lưới (Col, Row) | Tọa Độ Tâm (Center X, Y) | Địa Hình Chiếm Giữ | Ý Đồ Chiến Thuật |
|---|:---:|:---:|---|---|
| `slot-1-2` | Cột 1, Hàng 2 | $(120, 187.5)$ | Mỏm đá ngắm cổng vào | Đặt tướng tầm xa chặn đường xuất quân đầu tiên. |
| `slot-2-5` | Cột 2, Hàng 5 | $(200, 412.5)$ | Bãi sậy ven sông | Đặt tướng khống chế chặn ngã ba sông P1. |
| `slot-3-1` | Cột 3, Hàng 1 | $(280, 112.5)$ | Vách núi phía Bắc | Đặt xạ thủ bao quát đoạn cua P2–P3. |
| `slot-5-3` | Cột 5, Hàng 3 | $(440, 262.5)$ | Gò đất trung tâm | Vị trí trung tâm bao quát cả hai nhánh đường đi. |
| `slot-6-1` | Cột 6, Hàng 1 | $(520, 112.5)$ | Cửa hang đá vôi | Đặt tướng DPS cao đón đầu quái vượt qua P3. |
| `slot-6-6` | Cột 6, Hàng 6 | $(520, 487.5)$ | Bờ lau Nam thung lũng | Đặt đấu sĩ cận chiến khống chế khúc rẽ P4. |
| `slot-8-4` | Cột 8, Hàng 4 | $(680, 337.5)$ | Chốt tiền tiêu cửa thành | Đặt tướng chủ lực phòng thủ tuyến cuối trước cổng thành. |
| `slot-8-6` | Cột 8, Hàng 6 | $(680, 487.5)$ | Trạm gác lũy Hoa Lư | Tuyến chốt chặn dứt điểm các quái vật thoát qua. |

---

## 2. Đặc Tả Hệ Thống Kẻ Địch (Enemy Archetypes)

Chapter sử dụng 3 Archetype quái vật cơ bản và 1 Trùm Sứ Quân (Boss), tương thích hoàn toàn với hệ thống thuộc tính chuẩn của engine:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            HỆ THỐNG QUÁI VẬT SỨ QUÂN                        │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] ĐAO KHIÊN SỨ QUÂN │ [2] NỎ THỦ SỨ QUÂN   │ [3] CHIẾN THUYỀN / THIẾT KỴ   │
│ Category: sword      │ Category: archer     │ Category: other               │
│ HP: 140 · Spd: 80    │ HP: 90 · Spd: 95     │ HP: 260 · Spd: 110 · Dmg: 2   │
│ Màu: Đỏ sẫm (#dc2626)│ Màu: Cam đất (#ea580c)│ Màu: Tím sẫm (#9333ea)        │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### 2.1. Quái 1: Sứ Quân Đao Khiên (Sword Raider)
* **Mã định danh**: `sq-bo-binh`
* **Tên hiển thị**: `Sứ Quân Đao Khiên`
* **Phân loại (`category`)**: `'sword'`
* **Chỉ số chuẩn**:
  - `maxHp: 140`
  - `moveSpeed: 80` (Tốc độ hành quân trung bình)
  - `cityDamage: 1`
  - `color: 0xdc2626` (Đỏ sẫm)
* **Mô tả thị giác**: Binh sĩ sứ quân mặc áo giáp bạt, cầm đao ngắn và khiên liễu gai dã chiến.

### 2.2. Quái 2: Nỏ Thủ Sứ Quân (Archer Scout)
* **Mã định danh**: `sq-no-thu`
* **Tên hiển thị**: `Nỏ Thủ Sứ Quân`
* **Phân loại (`category`)**: `'archer'`
* **Chỉ số chuẩn**:
  - `maxHp: 90` (Máu giấy)
  - `moveSpeed: 95` (Di chuyển nhanh nhẹn)
  - `cityDamage: 1`
  - `color: 0xea580c` (Cam đất)
* **Mô tả thị giác**: Toán cung nỏ cơ động của các sứ quân vùng bãi sậy, trang bị nỏ nhẹ bắn nhanh.

### 2.3. Quái 3: Thiết Kỵ / Chiến Thuyền Ba Bế (Heavy Vanguard / Fast Raider)
* **Mã định danh**: `sq-thiet-ky`
* **Tên hiển thị**: `Thiết Kỵ Sứ Quân`
* **Phân loại (`category`)**: `'other'`
* **Chỉ số chuẩn**:
  - `maxHp: 260` (Máu dày)
  - `moveSpeed: 110` (Rất nhanh, lao thẳng)
  - `cityDamage: 2` (Gây sát thương gấp đôi lên thành)
  - `color: 0x9333ea` (Tím sẫm)
* **Mô tả thị giác**: Toán kỵ binh bọc giáp hoặc chiến thuyền nhẹ vượt thác ghềnh của các sứ quân thiện chiến.

---

## 3. Đặc Tả Trùm Cuối: Đỗ Động Tướng Công (Final Boss Concept)

* **Mã định danh**: `boss-do-canh-thac`
* **Tên hiển thị**: `Đỗ Cảnh Thạc`
* **Danh xưng lịch sử**: `Đỗ Động Tướng Công` `[SOURCE-BACKED: T2 Toàn Thư]`
* **Căn cứ lịch sử**:
  - `[SOURCE-BACKED: T2 Toàn Thư]`: Tướng lĩnh họ Ngô cát cứ Đỗ Động Giang (Quốc Oai/Thanh Oai), có thực lực quân sự mạnh và thành lũy vững chắc bậc nhất trong 12 sứ quân, giao tranh quyết liệt với quân Hoa Lư trước khi bị dẹp yên.
* **Phân loại (`category`)**: `'other'`
* **Chỉ số chuẩn**:
  - `maxHp: 1200` (Lượng máu cực lớn, gấp $\approx 9$ lần lính thường)
  - `moveSpeed: 65` (Hành quân chậm rãi, uy nghi)
  - `cityDamage: 5` (Mối đe dọa chí mạng nếu lọt vào thành lũy)
  - `color: 0xfbbf24` (Vàng hổ phách rực rỡ)
* **Mô tả thị giác & Quy mô**:
  - Thể hình to lớn vượt trội ($1.35\times$ so với quái thường), khoác giáp tướng màu vàng đồng có áo choàng tím; cầm đại đao hoa văn cổ đại.
  - Khi di chuyển có hào quang cảnh báo màu hổ phách dưới chân đế.

---

## 4. Tiến Trình 10 Đợt Tác Chiến (10-Wave Sequence)

| Wave | Tên Đợt & Bối Cảnh Chiến Thuật | Thành Phần Quân Địch Xuất Hiện | Tổng Số Quái | Nhịp Xuất Hiện (Interval) | Đánh Giá Độ Khó & Gợi Ý Chiến Thuật |
|:---:|---|---|:---:|:---:|---|
| **1** | *Trinh Sát Bãi Bồi* | $6\times$ `sq-bo-binh` | $6$ | $1,200\text{ ms}$ | **Dễ**: Làm quen bản đồ, đặt tướng đón đầu tại ngã rẽ đầu tiên. |
| **2** | *Đội Tiền Tiêu Đỗ Động* | $8\times$ `sq-bo-binh`, $3\times$ `sq-no-thu` | $11$ | $1,000\text{ ms}$ | **Dễ**: Bổ sung tướng tầm xa để dọn dẹp nỏ thủ máu mỏng. |
| **3** | *Cung Nỏ Bãi Sậy* | $4\times$ `sq-bo-binh`, $8\times$ `sq-no-thu` | $12$ | $900\text{ ms}$ | **Trung bình**: Đợt nỏ thủ tốc độ cao, cần sát thương AoE của Đinh Bộ Lĩnh. |
| **4** | *Kỵ Binh Tiên Phong* | $3\times$ `sq-thiet-ky`, $6\times$ `sq-bo-binh` | $9$ | $1,100\text{ ms}$ | **Trung bình**: Xuất hiện thiết kỵ chạy nhanh, cần khống chế làm chậm. |
| **5** | *Liên Quân Phong Châu* | $8\times$ `sq-bo-binh`, $6\times$ `sq-no-thu`, $2\times$ `sq-thiet-ky` | $16$ | $850\text{ ms}$ | **Khá**: Quân địch đông đúc, chia nhóm luồn lách qua các khúc cua. |
| **6** | *Đột Kích Sông Hoàng Long* | $6\times$ `sq-thiet-ky`, $6\times$ `sq-no-thu` | $12$ | $750\text{ ms}$ | **Khá**: Nhịp ra quái dồn dập, thiết kỵ lao nhanh gây áp lực lớn. |
| **7** | *Đại Đội Thiết Binh* | $10\times$ `sq-bo-binh`, $6\times$ `sq-thiet-ky` | $16$ | $800\text{ ms}$ | **Khó**: Tuyến quái máu dày đi thành cụm, cần kích hoạt Địa Chấn Nguyễn Bặc. |
| **8** | *Mưa Tên Vách Đá* | $14\times$ `sq-no-thu`, $4\times$ `sq-thiet-ky` | $18$ | $700\text{ ms}$ | **Khó**: Số lượng quái lớn nhất, đòi hỏi tướng DPS đơn mục tiêu dứt điểm nhanh. |
| **9** | *Tiền Đạo Tướng Công* | $8\times$ `sq-bo-binh`, $8\times$ `sq-no-thu`, $6\times$ `sq-thiet-ky` | $22$ | $650\text{ ms}$ | **Cực Khó**: Đợt tổng lực dọn đường trước khi Boss xuất trận. |
| **10** | **ĐẠI CHIẾN ĐỖ ĐỘNG GIANG** | **$1\times$ `boss-do-canh-thac`** + $6\times$ `sq-thiet-ky` (Hộ vệ) + $8\times$ `sq-no-thu` | **$15$** | Boss ra đầu tiên, quân hộ vệ theo sau $1,000\text{ ms}$ | **ĐỈNH CAO (BOSS WAVE)**: Dồn toàn bộ hỏa lực Đinh Liễn chém trảm tướng, phối hợp làm chậm và địa chấn. |
