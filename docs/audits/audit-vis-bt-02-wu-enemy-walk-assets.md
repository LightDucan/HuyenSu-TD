# Báo Cáo Kiểm Tra & Đóng Cổng Tài Nguyên: VIS-BT-02-FIX1 Distinct Eastern Wu Enemy Walk Assets

**Task ID**: VIS-BT-02-FIX1
**Tiêu đề**: Rework & Distinct Visual Identity for 4 Eastern Wu Enemy Walk Sprite Sheets
**Giai đoạn**: Bà Triệu Chapter II — Final Enemy Walk Asset Production Gate
**Trạng thái Cổng Kỹ Thuật (Technical PNG Gate)**: **PASS**
**Trạng thái Độ Độc Bản Thị Giác (Visual Originality Gate)**: **PASS**
**Repository**: LightDucan/HuyenSu-TD
**Branch**: ntigravity/vis-bt-02-fix1-distinct-wu-silhouettes
**Base Commit**: 705c0c5b117b03ace3bebb8afbc7d77b3dbcc49a

---

## 1. Danh Mục 4 Tập Tin Sprite Sheet Hoàn Chỉnh (Output Files)

| STT | Enemy ID | Đường Dẫn Tập Tin (Exact Path) | Kích Thước | Số Frame | Kênh Alpha | Foot Baseline | Visual Originality |
|:---:|---|---|:---:|:---:|:---:|:---:|:---:|
| 1 | wu-sword-infantry | src/assets/enemies/wu-sword-infantry/walk.png | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **111 px (PASS)** | **PASS (>10% Alpha Diff)** |
| 2 | wu-crossbow-soldier | src/assets/enemies/wu-crossbow-soldier/walk.png | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **111 px (PASS)** | **PASS (>11% Alpha Diff)** |
| 3 | wu-armored-guard | src/assets/enemies/wu-armored-guard/walk.png | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **111 px (PASS)** | **PASS (>11% Alpha Diff)** |
| 4 | wu-field-commander | src/assets/enemies/wu-field-commander/walk.png | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **111 px (PASS)** | **PASS (>11% Alpha Diff)** |

---

## 2. Kết Quả Kiểm Chứng Độ Độc Bản So Với Quân Hán (Visual Originality Metrics)

Đã đo đạc và tính toán chính xác sai khác pixel và silhouette (mặt nạ alpha) giữa 4 đơn vị Đông Ngô và các đơn vị quân Hán tương ứng:

### 1. han-sword-infantry vs wu-sword-infantry (Bộ Binh Đông Ngô)
* **Khác biệt Silhouette & Trang bị**:
  - Nón chiến chóp nan tre sơn then Đông Ngô (*conical lacquered war hat*) với vành rộng vát nghiêng và chóp đồng nhọn (thay thế búi tóc nhỏ của quân Hán).
  - Giáp mây đan (*rattan cuirass*) phối đai thắt lưng đỏ thẫm và dải tua rủ.
  - Khiên mây tròn (*rattan buckler*) cầm bên tay trái sau lưng tạo khối silhouette rộng về phía sau.
  - Hoàn thủ đao (*Wu ring-pommel sabre*) cầm chúc xuống phía trước trong tư thế chém lướt linh hoạt.
* **Đo lường từng frame**:
  - Frame 0: Alpha diff: **1916 px (11.69%)** | RGB diff: **3043 px (18.57%)** | H_bounds: (43..107, 20..111) vs W_bounds: (30..116, 16..111)
  - Frame 1: Alpha diff: **1902 px (11.61%)** | RGB diff: **3037 px (18.54%)** | H_bounds: (45..108, 21..111) vs W_bounds: (29..114, 14..111)
  - Frame 2: Alpha diff: **2052 px (12.52%)** | RGB diff: **3104 px (18.95%)** | H_bounds: (41..110, 19..111) vs W_bounds: (28..112, 16..111)
  - Frame 3: Alpha diff: **1932 px (11.79%)** | RGB diff: **3065 px (18.71%)** | H_bounds: (44..112, 17..111) vs W_bounds: (27..110, 14..111)
  - Frame 4: Alpha diff: **1910 px (11.66%)** | RGB diff: **3028 px (18.48%)** | H_bounds: (43..113, 20..111) vs W_bounds: (26..108, 16..111)
  - Frame 5: Alpha diff: **1769 px (10.80%)** | RGB diff: **2880 px (17.58%)** | H_bounds: (45..112, 21..111) vs W_bounds: (27..110, 14..111)
  - Frame 6: Alpha diff: **1760 px (10.74%)** | RGB diff: **2912 px (17.77%)** | H_bounds: (41..110, 19..111) vs W_bounds: (28..112, 16..111)
  - Frame 7: Alpha diff: **1743 px (10.64%)** | RGB diff: **2937 px (17.93%)** | H_bounds: (44..108, 17..111) vs W_bounds: (29..114, 14..111)
* **Kết luận Sword Originality**: **PASS**

### 2. han-crossbow-soldier vs wu-crossbow-soldier (Nỏ Thủ Đông Ngô — TRỌNG TÂM FIX)
* **Khác biệt Silhouette & Trang bị**:
  - Phá bỏ hoàn toàn 100% mặt nạ alpha cũ (trước đây trùng khớp 0 px).
  - Tư thế trinh sát khom người (*scout crouched stance*) dồn trọng tâm về trước.
  - Khăn quấn đầu trinh sát thắt dải đuôi dài sau gáy cùng lông vũ trinh sát cắm nghiêng.
  - Ống tên lớn đeo chéo lưng với các đuôi tên lông vũ trắng nhô cao về sau gáy.
  - Nỏ liên châu / nỏ gá bàn đạp Đông Ngô cầm ngang thắt lưng với hộp tiếp tiễn phía trên và cánh nỏ vòm mở rộng theo phương thẳng đứng/chéo phía trước.
* **Đo lường từng frame**:
  - Frame 0: Alpha diff: **2257 px (13.78%)** | RGB diff: **3493 px (21.32%)** | H_bounds: (42..92, 21..111) vs W_bounds: (23..110, 22..111)
  - Frame 1: Alpha diff: **2161 px (13.19%)** | RGB diff: **3361 px (20.51%)** | H_bounds: (44..92, 22..111) vs W_bounds: (23..110, 20..111)
  - Frame 2: Alpha diff: **2337 px (14.26%)** | RGB diff: **3508 px (21.41%)** | H_bounds: (40..92, 20..111) vs W_bounds: (23..110, 22..111)
  - Frame 3: Alpha diff: **2200 px (13.43%)** | RGB diff: **3462 px (21.13%)** | H_bounds: (43..92, 18..111) vs W_bounds: (23..110, 20..111)
  - Frame 4: Alpha diff: **2159 px (13.18%)** | RGB diff: **3418 px (20.86%)** | H_bounds: (42..92, 21..111) vs W_bounds: (23..110, 22..111)
  - Frame 5: Alpha diff: **1978 px (12.07%)** | RGB diff: **3246 px (19.81%)** | H_bounds: (44..92, 22..111) vs W_bounds: (23..110, 20..111)
  - Frame 6: Alpha diff: **1985 px (12.12%)** | RGB diff: **3283 px (20.04%)** | H_bounds: (40..92, 20..111) vs W_bounds: (23..110, 22..111)
  - Frame 7: Alpha diff: **1935 px (11.81%)** | RGB diff: **3274 px (19.98%)** | H_bounds: (43..92, 18..111) vs W_bounds: (23..110, 20..111)
* **Kết luận Crossbow Originality**: **PASS**

### 3. han-armored-guard vs wu-armored-guard (Hộ Vệ Giáp Sắt Đông Ngô)
* **Khác biệt Silhouette & Trang bị**:
  - Giáp vai đầu hổ (*tiger pauldrons*) mở rộng bề ngang tạo khối thân hình hộ pháp lực lưỡng (W=89 px vs Hán W=55 px).
  - Nón sắt vòm che gáy với chỏm nhọn cao cắm túm lông ngọc bích (*emerald plume*) bay ngược chiều di chuyển.
  - Giáp vảy cá nhiều tầng kết hợp giáp che đùi (*thigh flaps*) phân đoạn dày dặn.
  - Đại kích Nguyệt Nha Đông Ngô (*crescent polearm*) lưỡi bán nguyệt lớn sắc bén vươn cao với túm lụa đỏ/ngọc bích.
* **Đo lường từng frame**:
  - Frame 0: Alpha diff: **2032 px (12.40%)** | RGB diff: **4016 px (24.51%)** | H_bounds: (38..93, 13..111) vs W_bounds: (30..118, 8..111)
  - Frame 1: Alpha diff: **1989 px (12.14%)** | RGB diff: **3970 px (24.23%)** | H_bounds: (40..93, 14..111) vs W_bounds: (30..118, 6..111)
  - Frame 2: Alpha diff: **2260 px (13.79%)** | RGB diff: **4171 px (25.46%)** | H_bounds: (36..95, 12..111) vs W_bounds: (30..118, 8..111)
  - Frame 3: Alpha diff: **2290 px (13.98%)** | RGB diff: **4154 px (25.35%)** | H_bounds: (39..96, 10..111) vs W_bounds: (30..118, 6..111)
  - Frame 4: Alpha diff: **2172 px (13.26%)** | RGB diff: **4076 px (24.88%)** | H_bounds: (38..96, 13..111) vs W_bounds: (30..118, 8..111)
  - Frame 5: Alpha diff: **2070 px (12.63%)** | RGB diff: **3948 px (24.10%)** | H_bounds: (40..96, 14..111) vs W_bounds: (30..118, 6..111)
  - Frame 6: Alpha diff: **1978 px (12.07%)** | RGB diff: **3920 px (23.93%)** | H_bounds: (36..95, 12..111) vs W_bounds: (30..118, 8..111)
  - Frame 7: Alpha diff: **1939 px (11.83%)** | RGB diff: **3927 px (23.97%)** | H_bounds: (39..93, 10..111) vs W_bounds: (30..118, 6..111)
* **Kết luận Armored Originality**: **PASS**

### 4. oss-ma-vien vs wu-field-commander (Tướng Lĩnh Dã Chiến Đông Ngô)
* **Khác biệt Silhouette & Nhân vật**:
  - Hoàn toàn loại bỏ danh tính Mã Viện (không dùng chân dung lão tướng râu bạc, không dùng giáp đại tướng quân Hán).
  - Tướng lĩnh Đông Ngô trung niên tuấn kiệt với ria mép đen gọn gàng, khuôn mặt kiên nghị.
  - Khôi giáp Phượng Dực (*phoenix-wing helmet*) nạm vàng rực rỡ với chùm lông chỉ huy đỏ thẫm.
  - Tâm kính giáp thếp vàng (*mirror plate armor*) và đai lưng phù điêu rồng vàng.
  - Áo choàng tím chàm hoàng gia xẻ vạt viền vàng bay lượn sau lưng khi hành quân (đỉnh vạt áo Y=86..96, giữ chân Y=111 không bị che khuất).
  - Tay phải cầm Bảo Kiếm Lệnh vung chỉ huy về phía trước góc 45 độ, tay trái nắm chặt bao kiếm nạm ngọc bên hông.
* **Đo lường từng frame**:
  - Frame 0: Alpha diff: **1972 px (12.04%)** | RGB diff: **3941 px (24.05%)** | H_bounds: (28..120, 12..111) vs W_bounds: (18..118, 9..111)
  - Frame 1: Alpha diff: **1832 px (11.18%)** | RGB diff: **3815 px (23.28%)** | H_bounds: (30..119, 13..111) vs W_bounds: (23..118, 7..111)
  - Frame 2: Alpha diff: **1896 px (11.57%)** | RGB diff: **3772 px (23.02%)** | H_bounds: (31..119, 11..111) vs W_bounds: (28..118, 9..111)
  - Frame 3: Alpha diff: **1901 px (11.60%)** | RGB diff: **3803 px (23.21%)** | H_bounds: (30..118, 9..111) vs W_bounds: (28..118, 7..111)
  - Frame 4: Alpha diff: **1874 px (11.44%)** | RGB diff: **3801 px (23.20%)** | H_bounds: (28..117, 12..111) vs W_bounds: (28..118, 9..111)
  - Frame 5: Alpha diff: **1832 px (11.18%)** | RGB diff: **3774 px (23.03%)** | H_bounds: (25..118, 13..111) vs W_bounds: (25..118, 7..111)
  - Frame 6: Alpha diff: **1869 px (11.41%)** | RGB diff: **3889 px (23.74%)** | H_bounds: (24..119, 11..111) vs W_bounds: (20..118, 9..111)
  - Frame 7: Alpha diff: **1936 px (11.82%)** | RGB diff: **3922 px (23.94%)** | H_bounds: (25..119, 9..111) vs W_bounds: (17..118, 7..111)
* **Kết luận Commander Originality**: **PASS**

---

## 3. Minh Chứng Thị Giác Đầy Đủ (Visual Evidence Artifacts)

- **EVIDENCE 1 (HBT vs Wu Comparison)**: docs/audits/evidence/vis-bt-02-fix1/01-hbt-vs-wu-comparison.png (1200 × 760 px, so sánh trực quan từng cặp đơn vị 4 frame trên nền caro minh bạch).
- **EVIDENCE 2 (Wu Pack Contact Sheet)**: docs/audits/evidence/vis-bt-02-fix1/02-wu-pack.png (1100 × 680 px, hiển thị đầy đủ 4 sprite sheet 1024x128 8 frame).
- **EVIDENCE 3 (Fresh Runtime Gameplay)**: docs/audits/evidence/vis-bt-02-fix1/03-wu-runtime.png (1248 × 720 px, chụp thực tế màn chơi Bà Triệu Núi Nưa Stage 06 với các đơn vị quân Ngô di chuyển, Hero deployed, HUD, x3 speed và Auto Wave).

---

## 4. Kết Quả Kiểm Thử & Đóng Gói Hệ Thống (Build & Test Verification)

* **Git Tracked Test Baseline**:
  - Số tập tin kiểm thử được theo dõi trong Git (git ls-files tests/unit/*.test.ts): **43 files**
  - Số bài kiểm thử chính thức chạy qua Vitest (	ests/unit/**): **291 tests passed (100% GREEN)**
  - *Lưu ý về workspace count*: Khi chạy
pm test mặc định, Vitest quét toàn bộ workspace bao gồm các worktree phụ trong thư mục work/ (chưa commit/untracked), đạt 120 files / 654 tests. Trong phạm vi repository gốc, 43 files / 291 tests đều vượt qua hoàn hảo.
* **Vite Production Build**:
pm run build (	sc -b && vite build) $
ightarrow$ **PASS (141 modules transformed, 0 error)**.
* **Git Diff Check**: git diff --check $
ightarrow$ **PASS (0 whitespace error)**.
* **Gameplay & Narrative Code**: **ZERO CHANGES** trong gameplay, combat, maps, waves, rewards.
* **Resolver Architecture**: src/data/assets/enemyVisualAssets.ts giữ nguyên 100% hợp đồng phân giải và cơ chế an toàn
allback: 'primitive'.

---

## 5. Kết Luận (Final Verdict)

* **VIS-BT-02-FIX1**: **READY_FOR_AUDIT / PASS** (Đã giải quyết triệt để rủi ro tái sử dụng mặt nạ alpha / recolor, 4 đơn vị Đông Ngô đạt chuẩn mỹ thuật độc bản).
