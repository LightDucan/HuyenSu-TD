# Visual Prompts & Asset Technical Specifications (VS-HBT-01)

Tài liệu đặc tả Prompt đồ họa và thông số kỹ thuật chuẩn bị cho giai đoạn tạo asset bộ Hero Thời Hai Bà Trưng.

## Quy chuẩn kỹ thuật thống nhất
* **Canvas Size**: 128 × 128 px
* **Format**: 32-bit RGBA PNG, transparent background
* **Góc nhìn (Perspective)**: Front View (chính diện / isometric 2D chuẩn Tower Defense)
* **Baseline chân nhân vật**: Y = 112 px (tọa độ tiếp đất đồng nhất cho toàn bộ hệ thống Hero)
* **Quy tắc**: Không gắn UI/khung máu vào sprite; VFX hiệu ứng kỹ năng tách rời thành file độc lập.

---

## 1. Trưng Trắc (`trung-trac`)

### 1.1. Portrait (128×128 px)
* **Prompt**:
  > `pixel art portrait bust of ancient Vietnamese queen Trung Trac, majestic female ruler, golden bronze headband with Dong Son sun motif and crane feather accents, red and gold silk collar, noble and fierce determination, clear facial features, 128x128 pixels, transparent background, clean sharp outlines, highly detailed pixel art, vibrant historic colors, no modern anime tropes, original concept.`

### 1.2. Idle Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of ancient Vietnamese warrior queen Trung Trac, standing idle pose facing front view, holding upright bronze sword with lac bird hilt in right hand, wearing dark red tunic with golden bronze chestplate and lac viet engraved armor plates, red sash belt, feet grounded firmly on baseline Y=112, subtle contact shadow at Y=112, 128x128 canvas, transparent background, crisp pixel art, clean silhouette.`

### 1.3. Attack Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of queen Trung Trac in attack animation pose facing front view, swinging ancient Dong Son bronze sword diagonally downward with dynamic force, motion blur trail on bronze blade, fierce command gesture, feet firmly grounded on baseline Y=112, 128x128 canvas, transparent background, vibrant color palette, clear action pose, no UI elements.`

### 1.4. Skill VFX — Trống Đồng Lệnh Vương (128×128 px)
* **Prompt**:
  > `isolated pixel art visual effect of royal bronze drum shockwave blast, expanding golden-bronze radial soundwave ring with glowing ancient Lac Viet sun rays and celestial sparks, circular AoE shock burst, 128x128 canvas, centered composition, transparent background, glowing VFX sprite, no character included.`

---

## 2. Trưng Nhị (`trung-nhi`)

### 2.1. Portrait (128×128 px)
* **Prompt**:
  > `pixel art portrait bust of ancient Vietnamese female general Trung Nhi, agile archer commander, jade green headband with small bronze feather pin, dark cyan and jade tunic with leather trim, determined youthful expression, sharp observant eyes, 128x128 pixels, transparent background, crisp pixel art, authentic Dong Son cultural accents, original design.`

### 2.2. Idle Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of ancient Vietnamese female archer general Trung Nhi, standing idle pose facing front view, holding curved wooden recurve bow in left hand, quiver of bronze arrows on back, wearing jade green and navy combat attire with light leather and bronze armor, feet grounded on baseline Y=112, small contact shadow at Y=112, 128x128 canvas, transparent background, clean pixel edges.`

### 2.3. Attack Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of Trung Nhi in rapid shooting attack pose facing front view, drawing ancient bow to full draw aiming forward right, nocked glowing bronze arrow ready to release, dynamic archer posture, feet firmly grounded on baseline Y=112, 128x128 canvas, transparent background, crisp action silhouette.`

### 2.4. Skill VFX — Liên Hoàn Lạc Tiễn (128×128 px)
* **Prompt**:
  > `isolated pixel art visual effect of triple rapid arrow volley, three glowing jade-cyan energy projectile streaks flying forward with trailing wind lines and frost-slow sparks, high-speed piercing effect, 128x128 canvas, transparent background, bright luminous projectile VFX, no character.`

---

## 3. Lê Chân (`le-chan`)

### 3.1. Portrait (128×128 px)
* **Prompt**:
  > `pixel art portrait bust of legendary ancient Vietnamese female naval general Le Chan, fearless heroic commander, bronze scale-mail armor collar with dark iron accents, crimson headband tied tight, windblown hair, resolute commanding gaze, coastal guardian aesthetic, 128x128 pixels, transparent background, detailed pixel art, authentic historical aesthetic.`

### 3.2. Idle Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of female general Le Chan, standing idle pose facing front view, holding large heavy bronze broadsword / falchion resting near side, wearing fish-scale bronze armor over deep blue tunic with crimson waist sash, heavy combat boots, feet grounded firmly on baseline Y=112, contact shadow at Y=112, 128x128 canvas, transparent background, sturdy resolute stance.`

### 3.3. Attack Sprite (128×128 px, Baseline Y=112)
* **Prompt**:
  > `pixel art full-body character sprite of female general Le Chan in heavy slash attack pose facing front view, sweeping large bronze broadsword horizontally with overwhelming force, blue-white tidal energy trail following the blade, grounded heavy footwork on baseline Y=112, 128x128 canvas, transparent background, impactful combat frame.`

### 3.4. Skill VFX — Sóng Trào Hải Tần (128×128 px)
* **Prompt**:
  > `isolated pixel art visual effect of crashing ocean tidal wave slash and binding water vortex, crescent wave arc with white foam spray and water root tendrils grasping ground, coastal storm energy, 128x128 canvas, transparent background, dynamic water elemental VFX sprite, no character.`

---

## 4. Bảng Tổng Hợp Kiểm Tra Kỹ Thuật (Pre-Production Checklist)

| Hero | Portrait Check | Idle Baseline (Y=112) | Attack Baseline (Y=112) | VFX Tách Rời |
|---|---|---|---|---|
| **Trưng Trắc** | Concept Sẵn Sàng (128x128) | Chuẩn Y=112, Front View | Chuẩn Y=112, Front View | Trống Đồng Lệnh Vương (Tách riêng) |
| **Trưng Nhị** | Concept Sẵn Sàng (128x128) | Chuẩn Y=112, Front View | Chuẩn Y=112, Front View | Liên Hoàn Lạc Tiễn (Tách riêng) |
| **Lê Chân** | Concept Sẵn Sàng (128x128) | Chuẩn Y=112, Front View | Chuẩn Y=112, Front View | Sóng Trào Hải Tần (Tách riêng) |
