# Danh Mục Kế Hoạch Sản Xuất Asset: Gói Khởi Nghĩa Bà Triệu (Asset Production Manifest)

> [!IMPORTANT]
> **Quy Chuẩn Kỹ Thuật Bắt Buộc Toàn Dự Án (Task `VS-BT-05`)**:
> - **Canvas Size**: `128 × 128 px`
> - **Color Format**: `32-bit RGBA PNG` với nền trong suốt (`transparent background`).
> - **Góc nhìn (Perspective)**: **Front View only** (chính diện đồng nhất toàn bộ hệ thống).
> - **Tọa độ tiếp đất (Baseline)**: **Y = 112 px** (điểm tiếp xúc mặt đất của chân nhân vật / voi / vó ngựa / bánh xe).
> - **VFX Hiệu ứng kỹ năng**: Tách rời thành sprite độc lập, không gắn dính liền vào sprite nhân vật.
> - **Trạng thái phê duyệt (Status)**:
>   * `[READY]`: Đã chuẩn hóa prompt và đặc tả kỹ thuật, sẵn sàng sinh asset.
>   * `[NEEDS HISTORICAL REVIEW]`: Cần hội đồng lịch sử / Lead thẩm định thêm chi tiết tạo hình trước khi render.
>   * `[OPTIONAL]`: Asset dự phòng hoặc biến thể mở rộng (chưa bắt buộc cho MVP).

---

## 1. Bảng Tổng Hợp Danh Mục Asset Cần Sản Xuất

| Mã Asset | Phân Loại | Tên Asset / Thực Thể | File Đích Dự Kiến | Trạng Thái | Ghi Chú Kỹ Thuật |
|---|---|---|---|:---:|---|
| `HERO-TTT-PORT` | Hero Portrait | Chân dung Triệu Thị Trinh | `portraits/trieu-thi-trinh.png` | `READY` | 128×128, áo gấm vàng, trâm vàng |
| `HERO-TTT-IDLE` | Hero Idle | Sprite Idle Bà Triệu cưỡi voi | `heroes/trieu-thi-trinh/idle.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `HERO-TTT-ATK`  | Hero Attack | Sprite Attack Bà Triệu chém gươm | `heroes/trieu-thi-trinh/attack.png`| `READY` | 128×128, Front View, Baseline Y=112 |
| `VFX-TTT-SKILL` | Skill VFX | VFX Bạch Tượng Nộ Hống | `skills/vfx-bach-tuong-no-hong.png`| `READY` | 128×128, AoE shockwave vàng đồng |
| `HERO-TQD-PORT` | Hero Portrait | Chân dung Triệu Quốc Đạt | `portraits/trieu-quoc-dat.png` | `READY` | 128×128, khăn chàm, giáp da thú |
| `HERO-TQD-IDLE` | Hero Idle | Sprite Idle Triệu Quốc Đạt | `heroes/trieu-quoc-dat/idle.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `HERO-TQD-ATK`  | Hero Attack | Sprite Attack Triệu Quốc Đạt | `heroes/trieu-quoc-dat/attack.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `VFX-TQD-SKILL` | Skill VFX | VFX Khiên Đồng Trấn Thủ | `skills/vfx-khien-dong-tran-thu.png`| `READY` | 128×128, Root earth fissure VFX |
| `HERO-BV-PORT`  | Hero Portrait | Chân dung Ba Vua Bồ Điền | `portraits/ba-vua.png` | `READY` | 128×128, xăm giao long, khăn chàm |
| `HERO-BV-IDLE`   | Hero Idle | Sprite Idle Ba Vua Bồ Điền | `heroes/ba-vua/idle.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `HERO-BV-ATK`    | Hero Attack | Sprite Attack Ba Vua Bồ Điền | `heroes/ba-vua/attack.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `VFX-BV-SKILL`   | Skill VFX | VFX Tam Vị Liên Hoàn Trảm | `skills/vfx-tam-vi-lien-hoan.png` | `READY` | 128×128, Multi-hit triple slash VFX |
| `HERO-SNN-PORT` | Hero Portrait | Chân dung Sơn Nữ Ngàn Nưa | `portraits/son-nu-ngan-nua.png` | `READY` | 128×128, nón lá cọ, áo chàm |
| `HERO-SNN-IDLE` | Hero Idle | Sprite Idle Sơn Nữ Ngàn Nưa | `heroes/son-nu-ngan-nua/idle.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `HERO-SNN-ATK`  | Hero Attack | Sprite Attack Sơn Nữ Ngàn Nưa | `heroes/son-nu-ngan-nua/attack.png`| `READY` | 128×128, Front View, Baseline Y=112 |
| `VFX-SNN-SKILL` | Skill VFX | VFX Mưa Tên Độc Ngàn Nưa | `skills/vfx-mua-ten-doc.png` | `READY` | 128×128, AoE poison rain VFX |
| `ENM-TG-WALK`   | Normal Enemy | Sprite Ngô Thiết Giáp Sĩ | `enemies/ngo-thiet-giap/walk.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `ENM-NT-WALK`   | Normal Enemy | Sprite Ngô Nỏ Thủ Cơ Giới | `enemies/ngo-no-thu/walk.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `ENM-TB-WALK`   | Normal Enemy | Sprite Thủy Binh & Dân Phu | `enemies/thuy-binh-dan-phu/walk.png`| `READY` | 128×128, Front View, Baseline Y=112 |
| `ELT-TPK-WALK`  | Elite Enemy | Sprite Ngô Tiên Phong Kỵ Sĩ | `enemies/ngo-tien-phong-ky-si/walk.png`| `READY`| 128×128, Front View, Baseline Y=112 |
| `BOSS-LD-WALK`  | Main Boss | Sprite Thống Soái Lục Dận | `bosses/luc-dan/walk.png` | `READY` | 128×128, Front View, Baseline Y=112 |
| `BOSS-TB-WALK`  | Mini-Boss | Sprite Tiết Bính (Chiến Xa) | `bosses/tiet-binh/walk.png` | `OPTIONAL` | Folklore/Game Interpretation |
| `MAP-BD-TILES`  | Map Assets | Bộ Tileset Bồ Điền — Tùng Sơn | `maps/bo-dien-tung-son/tileset.png`| `NEEDS HISTORICAL REVIEW` | Thẩm định hoa văn Đông Sơn muộn |
| `MAP-BD-PROPS`  | Map Assets | Bộ Props (Chông, Lũy, Tháp canh)| `maps/bo-dien-tung-son/props.png` | `READY` | Tháp cau, cọc tre, hàng rào gai |

---

## 2. Chi Tiết Đặc Tả Kỹ Thuật Từng Nhóm Asset

### 2.1. Nhóm Hero Playable (Trieu Thi Trinh, Trieu Quoc Dat, Ba Vua, Son Nu)
* **Kích thước canvas**: 128 × 128 pixels.
* **Quy chuẩn hiển thị**:
  * **Portrait**: Khung bán thân, biểu cảm uy nghiêm, tập trung vào phụ kiện tóc, hộ tâm phiến tròn và cổ áo.
  * **Idle Sprite**: Dáng đứng chính diện (`Front View only`), chân nhân vật/voi chạm mặt phẳng tọa độ Y = 112 px. Có bóng tiếp xúc nhẹ dưới chân.
  * **Attack Sprite**: Tư thế hành động vung kiếm/đâm giáo/chém đao/bắn nỏ chính diện, không vượt khỏi biên canvas 128×128 px, baseline Y = 112 px.

### 2.2. Nhóm Skill VFX (Tách Rời Độc Lập)
* **Quy chuẩn render**:
  * Đặt tại tâm canvas (Centered 128×128 px).
  * Nền trong suốt hoàn toàn, sử dụng dải màu ánh sáng phát quang (Luminous glow) theo tone màu văn hóa Đông Sơn (Vàng kim, Đồng thau, Lục ngọc).
  * Tuyệt đối không chứa hình ảnh nhân vật trong sprite VFX.

### 2.3. Nhóm Enemy & Elite (Quân Đội Đông Ngô)
* **Quy chuẩn sprite**:
  * Góc nhìn `Front View only` bước đi theo hướng màn hình.
  * Vũ khí mang tính nhận diện thị giác (Visual Identity), điểm tiếp đất cố định tại Y = 112 px.

### 2.4. Nhóm Boss (Lục Dận & Tiết Bính)
* **Lục Dận (`[READY]`)**: Tạo hình soái tướng quý tộc thời Tam Quốc, cẩm bào tím bên trong giáp sắt mạ vàng, kiếm Hoàn Thủ chuôi vàng, baseline Y = 112 px.
* **Tiết Bính (`[OPTIONAL]`)**: Tướng trấn thủ chiến xa gỗ bọc sắt nẹp cọc nhọn (Folklore/Game Interpretation encounter), baseline Y = 112 px.

### 2.5. Nhóm Bản Đồ & Môi Trường (Map & Props)
* **Props môi trường**: Tháp canh thân cau rừng cắm cờ vàng, cọc tre vạt nhọn ngập bùn, rào chấn mộc tre gai hình chữ X, nhà sàn mái cong Lạc Việt.
* **Trạng thái**: `[NEEDS HISTORICAL REVIEW]` đối với các chi tiết hoa văn trên trống đồng và thạp đồng trước khi đưa vào sản xuất texture chính thức.
