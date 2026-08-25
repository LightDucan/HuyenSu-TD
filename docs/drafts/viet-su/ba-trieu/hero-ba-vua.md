# Hero Concept: Ba Vua Bồ Điền (Tam Vị Dũng Tướng) — Phương Án A (Slot 3)

> [!IMPORTANT]
> **Ràng Buộc Thiết Kế Tuyệt Đối (Task `VS-BT-03`)**:
> - Đây là **Phương án đề xuất A cho Slot Hero thứ 3** (Song song với Phương án B: Sơn Nữ Ngàn Nưa). Chưa chốt roster chính thức.
> - Hero là Tower phòng thủ mang hình tượng dũng tướng, **không có chỉ số DEF**.
> - Đòn đánh thường (Normal Attack): Single-target duy nhất, không AoE, không Stun, không Slow, không Root.
> - Kỹ năng kích hoạt (Active Skill): Kích hoạt tự động sau **$N$ đòn đánh thường** ($N \in \{3, 5, 7, 10\}$); chỉ sử dụng các hiệu ứng dùng chung (Damage, AoE, Slow, Stun, Root, MultiHit) qua Core Skill System.
> - Cảnh giới Huyền Sử (Legendary Passive): Chỉ định hướng concept cơ chế, **chưa khóa số phần trăm (%) cụ thể**.
> - Asset Prompts: Chuẩn 128×128 px, Front View, 32-bit RGBA Transparent, Baseline tiếp đất cố định tại **Y = 112 px**.

---

## 1. Danh Tính & Bối Cảnh (Identity)

* **Tên hiển thị**: **Ba Vua Bồ Điền** *(Tam Vị Đại Vương / Tam Vị Tiên Phong Tướng)*
* **Thời kỳ**: Khởi nghĩa năm 248 SCN (Thời kỳ Đông Ngô đô hộ Giao Châu / Thời Tam Quốc).
* **Vai trò hình ảnh**: Bộ ba dũng tướng tiên phong dũng mãnh, nhanh nhẹn; trang phục chiến binh Lạc Việt áo chàm vạt ngắn túm gọn gàng, xăm mình giao long, dải khăn chàm thắt trán; tay sử dụng song đao đồng Lạc Việt sắc bén, chiến đấu linh hoạt và quả cảm.
* **Ghi chú truyền tích**:
  * Theo truyền thuyết dân gian và thần tích xứ Thanh, ba anh em dũng tướng làng Phú Điền đã đem gia binh hưởng ứng cờ nghĩa của Bà Triệu, được giao nhiệm vụ chỉ huy các mũi xung kích cảm tử bảo vệ đồn lũy Bồ Điền.
  * Trong trận quyết chiến chống quân Ngô, ba vị đã chiến đấu đến hơi thở cuối cùng và hy sinh anh dũng. Nhân dân lập đền thờ phụng tôn xưng là "Ba Vua" (Tam Vị Đại Vương).
* **Ranh giới lịch sử vs sáng tạo game**:
  * *Phần lịch sử/thần tích*: Tín ngưỡng dân gian địa phương tôn thờ ba vị tướng tại quần thể di tích đền Bà Triệu (Phú Điền - Hậu Lộc).
  * *Phần sáng tạo game*: Chuyển hóa hình tượng Tam Vị Tiên Phong thành vai trò *Rapid Multi-Striker Skirmisher* (Chiến binh cận chiến tốc độ cao) chuyên dồn sát thương liên hoàn (*MultiHit*) đơn mục tiêu cực mạnh trong Tower Defense.

---

## 2. Nguồn & Mức Độ Tin Cậy Lịch Sử (Source Classification)

* **Phân loại nguồn**: **Folklore / Local Legend Candidate** (Mức độ tin cậy: Thần tích địa phương)
* **Chi tiết nguồn sử liệu**:
  * Không xuất hiện trong chính sử thời gần (*Tam Quốc Chí*) cũng như chính sử trung đại (*Toàn Thư*).
  * Lưu truyền qua thần phả Đền Ba Vua (Đệ Nhất - Đệ Nhị - Đệ Tam) tại thôn Phú Điền, xã Triệu Lộc, huyện Hậu Lộc, tỉnh Thanh Hóa và được ghi chép trong *Đại Nam Nhất Thống Chí* (mục Đền Miếu tỉnh Thanh Hóa).

---

## 3. Tạo Hình Thị Giác & Silhouette (Visual Silhouette)

* **Silhouette**: Dáng chiến binh trẻ trung, cơ bắp cuồn cuộn, tư thế hạ thấp trọng tâm sẵn sàng bứt tốc; hai tay cầm song đao chéo ngực tạo đường nét chữ X sắc sảo.
* **Trang phục & Giáp trụ**:
  * Áo chàm ngắn tay vạt chéo để lộ hình xăm giao long truyền thống Lạc Việt trên hai cánh tay và ngực.
  * Quần cộc túm ống trên đầu gối, chân quấn xà cạp vải gai chắc chắn giúp lội bùn nhanh nhẹn.
  * Dải khăn vải chàm buộc trán có cài chiếc lông chim nhỏ; cổ đeo vòng nanh thú hộ mệnh.

---

## 4. Vũ Khí (Weapon)

* **Vũ khí chính**: **Song Đao Đồng Lạc Việt (Dual Dong Son Bronze Short Swords / Sabers)**.
* **Đặc điểm cấu tạo**: Cặp đao đồng bản dày hơi cong về phía mũi, cán đao đúc nguyên khối có khấc chống trơn; chuyên dùng chém phá nhanh ở cự ly gần.

---

## 5. Đánh Thường (Normal Attack Presentation)

* **Quy tắc bắt buộc**: Single-target duy nhất. Không AoE, không Stun, không Slow, không Root.
* **Tầm đánh tương đối (Range Identity)**: **Short-Melee** (Cận chiến cự ly gần, tầm với khoảng 135 – 145 px).
* **Tốc độ ra đòn (Attack Speed)**: Nhanh (`~1.30 – 1.40 đòn/giây`).
* **Animation Front View**:
  * *Tư thế Idle*: Hạ thấp trọng tâm, hai tay cầm song đao xuôi dọc theo thân mình, ánh mắt sắc bén quan sát đối thủ.
  * *Động tác Attack*: Bước lướt nhanh về phía trước, vung chéo song đao chém dứt khoát thành hai đường kiếm sắc lẹm vào mục tiêu đơn lẻ trước mặt.

---

## 6. Kỹ Năng Kích Hoạt (Active Skill Proposal)

* **Tên kỹ năng đề xuất**: **Tam Vị Liên Hoàn Trảm** *(hoặc Phú Điền Bôn Lôi)*
* **Cơ chế kích hoạt**: Tự động kích hoạt sau mỗi **3 đòn đánh thường** *(thuộc tập chuẩn: 3 / 5 / 7 / 10)*.
* **Hiệu ứng dùng chung đề xuất (Shared Skill Effects)**:
  * `{ type: 'multihit', hitCount: 3 }` — Thực hiện liên hoàn 3 nhát chém chớp nhoáng vào cùng một mục tiêu đơn lẻ.
  * `{ type: 'damage', atkMultiplier: 1.4 }` — Mỗi nhát chém gây sát thương bằng 140% ATK (tổng sát thương 420% ATK dồn đơn mục tiêu).
* **Ràng buộc hệ thống**: Hoàn toàn kế thừa framework Skill của Core, không tạo code riêng.

---

## 7. Các Giai Đoạn Tiến Hóa (Progression Stages)

* **Cảnh giới Thường (Normal, Lv 1–100)**: Dân binh dũng cảm làng Phú Điền; luyện tập đao pháp và phục kích phá rối các toán quân tuần tiễu giặc.
* **Cảnh giới Trùng Sinh (Rebirth, Lv 1–100)**: Tam Vị Tiên Phong Tướng; đao pháp xuất quỷ nhập thần, dẫn đầu các đợt tập kích tiêu diệt tướng lĩnh giặc.
* **Cảnh giới Tái Sinh (Reincarnation, Lv 1–100)**: Ba Vua Hiển Thánh; linh hồn bất tử hộ trì sông núi, tốc độ xuất chiêu đạt đỉnh phong.

---

## 8. Cảnh Giới Huyền Sử (Legendary Passive Concept)

* **Tên Passive Concept**: **Huyền Sử: Tam Vị Đồng Tâm**
* **Định hướng cơ chế (Chưa khóa số %)**:
  * Khi đạt cảnh giới Huyền Sử, mỗi đòn đánh thường liên tiếp vào cùng một mục tiêu sẽ tăng dần tốc độ tấn công (AttackSpeed) và tỷ lệ bạo kích (Crit) cho bản thân.
* **Tình trạng hệ thống**: *Chờ Core Shared Passive System*.

---

## 9. Đặc Tả Prompt Asset (Technical Pixel Art Prompts)

```text
Quy chuẩn kỹ thuật:
- Canvas: 128 × 128 px
- Format: 32-bit RGBA PNG, transparent background
- Perspective: Front-facing / Isometric 2D
- Baseline chân nhân vật: Y = 112 px
```

### 9.1. Portrait (128×128 px)
* **Prompt**:
  > `pixel art portrait bust of ancient Vietnamese skirmisher hero Ba Vua (Three Kings of Bo Dien), fierce young male warrior, indigo cloth headband with small eagle feather, dragon tattoo on neck and shoulder, intense focused combat expression, 128x128 pixels, transparent background, sharp pixel art lines, authentic prehistoric Dong Son aesthetic.`

### 9.2. Idle Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of ancient Vietnamese warrior Ba Vua, standing idle combat ready pose facing front view, holding dual bronze curved short swords in two hands at waist level, wearing short dark indigo tunic revealing dragon arm tattoos, feet planted firmly on baseline Y=112 with small contact shadow, 128x128 canvas, transparent background, crisp pixel art silhouette.`

### 9.3. Attack Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of Ba Vua in rapid dual-blade slashing attack pose facing front view, crossing dual bronze swords forward in dynamic X-slash with luminous cyan-bronze motion trails, feet grounded on baseline Y=112, 128x128 canvas, transparent background, energetic martial pose, crisp pixel details.`

### 9.4. Skill VFX — Tam Vị Liên Hoàn Trảm (128×128 px)
* **Prompt**:
  > `isolated pixel art visual effect of rapid triple slash burst, three overlapping sharp bronze blade energy arcs slashing down in quick succession with luminous spark particles, multi-hit impact VFX, 128x128 canvas, centered composition, transparent background, sharp glowing VFX sprite, no character.`
