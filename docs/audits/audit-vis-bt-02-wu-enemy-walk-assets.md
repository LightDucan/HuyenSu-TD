# Báo Cáo Kiểm Tra & Đóng Cổng Tài Nguyên: VIS-BT-02-FIX2 Period-Safe Eastern Wu Crossbow & Distinct Enemy Walk Assets

**Task ID**: `VIS-BT-02-FIX2`
**Tiêu đề**: Rework Period-Safe Generic Hand Crossbow & Preserve Distinct Visual Identity for 4 Eastern Wu Enemy Walk Sprite Sheets
**Giai đoạn**: Bà Triệu Chapter II — Final Enemy Walk Asset Production Gate
**Trạng thái Cổng Kỹ Thuật (Technical PNG Gate)**: **PASS**
**Trạng thái Độ Độc Bản Thị Giác (Visual Originality Gate)**: **PASS**
**Trạng thái Tính Chuẩn Xác Vũ Khí Lịch Sử (Historical Weapon Gate)**: **PASS** (Đã loại bỏ hoàn toàn khái niệm anachronistic repeating crossbow / nỏ liên châu; sử dụng nỏ cầm tay tiêu chuẩn thế kỷ 3 CE)
**Repository**: `LightDucan/HuyenSu-TD`
**Branch**: `antigravity/vis-bt-02-fix2-period-safe-crossbow`
**Base Commit**: `dfcaeb71d9d81bd0f10e3b169d76283787575e41` (`antigravity/vis-bt-02-fix1-distinct-wu-silhouettes`)

---

## 1. Danh Mục 4 Tập Tin Sprite Sheet Hoàn Chỉnh (Output Files & SHA256)

| STT | Enemy ID | Đường Dẫn Tập Tin (Exact Path) | Kích Thước | Số Frame | Kênh Alpha | Foot Baseline | SHA256 Checksum | Trạng Thái |
|:---:|---|---|:---:|:---:|:---:|:---:|---|:---:|
| 1 | `wu-sword-infantry` | `src/assets/enemies/wu-sword-infantry/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **111 px (PASS)** | `c081274d02cfd62b77c79f3afe2543c1b01c7de714f61842787481c581825a2f` | **PASS (FIX1 Unchanged)** |
| 2 | `wu-crossbow-soldier` | `src/assets/enemies/wu-crossbow-soldier/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **110..111 px (PASS)** | `33f923c31fa637f59d282b0e6e666a01ec34d284a1d4b68e98348b6c4349e54d` | **PASS (FIX2 Reworked)** |
| 3 | `wu-armored-guard` | `src/assets/enemies/wu-armored-guard/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **111 px (PASS)** | `cc528c2c1c1c0945be65a2604ed1f87c4079ebff5127dbb6e0c2c80fa5779ab4` | **PASS (FIX1 Unchanged)** |
| 4 | `wu-field-commander` | `src/assets/enemies/wu-field-commander/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **111 px (PASS)** | `2d7d5621fd41c9fa96b92af5c68a7f02a59e78deab9c29238dce062a847f3369` | **PASS (FIX1 Unchanged)** |

---

## 2. Chi Tiết Rework Nỏ Thủ Đông Ngô (Period-Safe Generic Hand Crossbow)

### Rework Mục Tiêu:
- **Loại bỏ hoàn toàn**: Mọi chi tiết nỏ liên châu, hộp tiếp tiễn (magazine box), cần gạt liên thanh hoặc cơ cấu gá bàn đạp không phù hợp bối cảnh chiến dịch thế kỷ 3 CE.
- **Sử dụng**: Nỗ bộ binh tiêu chuẩn thế kỷ 3 CE (generic hand crossbow):
  - Thân nỏ (tiller / báng nỏ) bằng gỗ gọt thanh thoát, ôm sát tư thế di chuyển.
  - Cánh nỏ (composite bow prod) uốn cong bọc đồng ở đầu cánh nỏ.
  - Cơ nỏ đồng (bronze trigger lock) nằm gọn trong thân nỏ, có lẫy cò phía dưới.
  - Một mũi tên đơn (single bolt) đặt trên rãnh dẫn hướng.
- **Duy trì độ độc bản so với Nỏ Thủ Hán (`han-crossbow-soldier`)**:
  - Tư thế cầm nỏ hướng chéo thấp sẵn sàng cơ động (low-ready carry).
  - Mũ nón bọc da nẹp đồng có vạt che tai/gáy đặc trưng Đông Ngô (khác nón chóp vải Hán).
  - Ống tên đeo ngang hông (hip-slung quiver) với 4 đuôi tên đồng (khác ống tên cao sau lưng của Hán).
  - Áo chẽn màu lam sẫm viền chàm, giáp vai da đơn bên trái, thắt lưng đỏ thẫm.

### Đo Lường So Sánh Han vs Wu Crossbow (`verify_crossbow_originality_fix2.mjs`):
- Frame 0: Han Bounds (42..92, 21..111) vs Wu Bounds (36..94, 20..111) | Alpha Diff: **3.85%** | RGBA Diff: **11.11%**
- Frame 1: Han Bounds (44..92, 22..111) vs Wu Bounds (36..94, 21..111) | Alpha Diff: **3.78%** | RGBA Diff: **10.89%**
- Frame 2: Han Bounds (40..92, 20..111) vs Wu Bounds (36..94, 19..111) | Alpha Diff: **3.57%** | RGBA Diff: **10.63%**
- Frame 3: Han Bounds (43..92, 18..111) vs Wu Bounds (36..94, 17..111) | Alpha Diff: **3.62%** | RGBA Diff: **10.89%**
- Frame 4: Han Bounds (42..92, 21..111) vs Wu Bounds (36..94, 20..111) | Alpha Diff: **3.61%** | RGBA Diff: **10.82%**
- Frame 5: Han Bounds (44..92, 22..111) vs Wu Bounds (36..94, 21..111) | Alpha Diff: **3.54%** | RGBA Diff: **10.54%**
- Frame 6: Han Bounds (40..92, 20..111) vs Wu Bounds (36..94, 19..111) | Alpha Diff: **3.52%** | RGBA Diff: **10.55%**
- Frame 7: Han Bounds (43..92, 18..111) vs Wu Bounds (36..94, 17..111) | Alpha Diff: **3.94%** | RGBA Diff: **11.44%**
- **Toàn bộ Sprite Sheet**: Alpha Mask Diff: **3.68%**, RGBA Diff: **10.86%** $\rightarrow$ **PASS (Originality & Period-Safe)**.

---

## 3. Minh Chứng Thị Giác Đầy Đủ (Visual Evidence Artifacts)

- **EVIDENCE 1 (Crossbow Comparison)**: `docs/audits/evidence/vis-bt-02-fix2/01-crossbow-comparison.png` (1060 × 360 px, so sánh trực tiếp 8 frame giữa Han Crossbow vs New Wu Crossbow trên nền caro).
- **EVIDENCE 2 (Wu Pack Contact Sheet)**: `docs/audits/evidence/vis-bt-02-fix2/02-wu-pack.png` (1060 × 580 px, hiển thị đầy đủ 4 sprite sheet 1024x128 8 frame với nỏ tiêu chuẩn).
- **EVIDENCE 3 (Fresh Runtime Gameplay)**: `docs/audits/evidence/vis-bt-02-fix2/03-wu-runtime.png` (1024 × 768 px, chụp thực tế màn chơi Bà Triệu: Stage ID `bt-01-tu-nghia-nui-nua`, Stage Name `Stage 01: Tụ Nghĩa Núi Nưa`, Wave `Wave 06 / 18` với các đơn vị quân Ngô di chuyển, Hero deployed, HUD, x3 speed và Auto Wave).

---

## 4. Kết Quả Kiểm Thử & Đóng Gói Hệ Thống (Build & Test Verification)

* **Git Tracked Canonical Test Baseline**:
  - Số tập tin kiểm thử được theo dõi trong Git (`tests/unit/**/*.test.ts`): **43 files**
  - Số bài kiểm thử chính thức chạy qua Vitest: **291 tests passed (100% GREEN)**
* **Vite Production Build**: `npm run build` (`tsc -b && vite build`) $\rightarrow$ **PASS (141 modules transformed, 0 error)**.
* **Git Diff Check**: `git diff --check` $\rightarrow$ **PASS (0 whitespace error)**.
* **Gameplay Code Isolation**: **ZERO CHANGES** trong gameplay, combat, maps, waves, rewards.
* **Resolver & Fallback Integrity**: `src/data/assets/enemyVisualAssets.ts` giữ nguyên 100% hợp đồng phân giải và cơ chế an toàn `fallback: 'primitive'`.

---

## 5. Kết Luận (Final Verdict)

* **VIS-BT-02-FIX2**: **READY_FOR_AUDIT / PASS** (Đã sửa hoàn toàn vi phạm lịch sử của vũ khí nỏ, bảo toàn 100% độ độc bản mỹ thuật và tính nguyên vẹn của 3 tài nguyên còn lại).
