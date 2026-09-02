# Báo Cáo Đóng Cổng Tài Nguyên Mỹ Thuật: VIS-BT-02 (Đông Ngô Enemy Production Walk Asset Pack)

**Task ID**: `VIS-BT-02`
**Giai đoạn**: Khởi nghĩa Bà Triệu 248 CE — Final Enemy Visual Gate
**Trạng thái Cổng Kẻ Thù**: **WU ENEMY PRODUCTION ASSETS = PASS**
**Trạng thái Tướng Bà Triệu**: **HERO BÀ TRIỆU PRODUCTION ASSETS = PENDING**
**Repository**: `LightDucan/HuyenSu-TD`
**Branch**: `antigravity/vis-bt-02-wu-enemy-walk-assets`
**Base Commit**: `cc08b397dda0816fd63ca87eac1c31c80a45691f` (`production/ba-trieu-chapter-locked`)

---

## 1. Bảng Tổng Hợp 4 Tài Nguyên Kẻ Thù Đông Ngô (Enemy Walk Assets Table)

| Enemy ID | Đường Dẫn Tập Tin (Exact Path) | Kích Thước (Dimensions) | Số Frame (Frames) | Kênh Alpha (Transparency) | Baseline (footY) | Visual QA | Runtime QA |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `wu-sword-infantry` | `src/assets/enemies/wu-sword-infantry/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **110..111 px (PASS)** | **PASS** | **PASS** |
| `wu-crossbow-soldier` | `src/assets/enemies/wu-crossbow-soldier/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **110..111 px (PASS)** | **PASS** | **PASS** |
| `wu-armored-guard` | `src/assets/enemies/wu-armored-guard/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **110..111 px (PASS)** | **PASS** | **PASS** |
| `wu-field-commander` | `src/assets/enemies/wu-field-commander/walk.png` | **1024 × 128 px** | **8 frames (128×128)** | **PASS (RGBA)** | **110..111 px (PASS)** | **PASS** | **PASS** |

---

## 2. Kết Quả Kiểm Chứng Kỹ Thuật (Programmatic Validation)

Tất cả 4 sprite sheet đã được xác minh toàn diện bằng script kiểm tra pixel và nhị phân PNG (`validate_wu_enemy_sprites.mjs`):

```
=== TECHNICAL VALIDATION FOR 4 ĐÔNG NGÔ ENEMY WALK SPRITE SHEETS ===

--- Unit: wu-sword-infantry (9317B) ---
Dimensions: 1024x128 - PASS
Frame count: 8 - PASS
  Frame 0: X=43..108 (w=66), Y=20..111 (h=92), footY=111, transparentRatio=0.886 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 1: X=45..110 (w=66), Y=21..111 (h=91), footY=111, transparentRatio=0.888 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 2: X=41..111 (w=71), Y=19..111 (h=93), footY=111, transparentRatio=0.889 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 3: X=44..113 (w=70), Y=17..111 (h=95), footY=110, transparentRatio=0.886 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 4: X=43..114 (w=72), Y=20..111 (h=92), footY=111, transparentRatio=0.886 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 5: X=45..113 (w=69), Y=21..111 (h=91), footY=111, transparentRatio=0.889 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 6: X=41..111 (w=71), Y=19..111 (h=93), footY=111, transparentRatio=0.890 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 7: X=44..110 (w=67), Y=17..111 (h=95), footY=110, transparentRatio=0.884 | Baseline=PASS, Bounds=PASS, Alpha=PASS
Unit Result: PASS

--- Unit: wu-crossbow-soldier (6589B) ---
Dimensions: 1024x128 - PASS
Frame count: 8 - PASS
  Frame 0: X=42..92 (w=51), Y=21..111 (h=91), footY=111, transparentRatio=0.878 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 1: X=44..92 (w=49), Y=22..111 (h=90), footY=111, transparentRatio=0.880 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 2: X=40..92 (w=53), Y=20..111 (h=92), footY=111, transparentRatio=0.881 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 3: X=43..92 (w=50), Y=18..111 (h=94), footY=110, transparentRatio=0.879 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 4: X=42..92 (w=51), Y=21..111 (h=91), footY=111, transparentRatio=0.880 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 5: X=44..92 (w=49), Y=22..111 (h=90), footY=111, transparentRatio=0.883 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 6: X=40..92 (w=53), Y=20..111 (h=92), footY=111, transparentRatio=0.882 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 7: X=43..92 (w=50), Y=18..111 (h=94), footY=110, transparentRatio=0.875 | Baseline=PASS, Bounds=PASS, Alpha=PASS
Unit Result: PASS

--- Unit: wu-armored-guard (12803B) ---
Dimensions: 1024x128 - PASS
Frame count: 8 - PASS
  Frame 0: X=38..93 (w=56), Y=13..111 (h=99), footY=111, transparentRatio=0.838 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 1: X=40..93 (w=54), Y=14..111 (h=98), footY=111, transparentRatio=0.838 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 2: X=36..95 (w=60), Y=12..111 (h=100), footY=111, transparentRatio=0.837 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 3: X=39..96 (w=58), Y=10..111 (h=102), footY=111, transparentRatio=0.834 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 4: X=38..96 (w=59), Y=13..111 (h=99), footY=111, transparentRatio=0.834 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 5: X=40..96 (w=57), Y=14..111 (h=98), footY=111, transparentRatio=0.837 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 6: X=36..95 (w=60), Y=12..111 (h=100), footY=111, transparentRatio=0.838 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 7: X=39..93 (w=55), Y=10..111 (h=102), footY=111, transparentRatio=0.832 | Baseline=PASS, Bounds=PASS, Alpha=PASS
Unit Result: PASS

--- Unit: wu-field-commander (12147B) ---
Dimensions: 1024x128 - PASS
Frame count: 8 - PASS
  Frame 0: X=28..120 (w=93), Y=12..111 (h=100), footY=111, transparentRatio=0.809 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 1: X=30..120 (w=91), Y=13..111 (h=99), footY=111, transparentRatio=0.815 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 2: X=31..119 (w=89), Y=11..111 (h=101), footY=111, transparentRatio=0.818 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 3: X=30..118 (w=89), Y=9..111 (h=103), footY=111, transparentRatio=0.813 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 4: X=28..118 (w=91), Y=12..111 (h=100), footY=111, transparentRatio=0.810 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 5: X=25..118 (w=94), Y=13..111 (h=99), footY=111, transparentRatio=0.810 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 6: X=24..119 (w=96), Y=11..111 (h=101), footY=111, transparentRatio=0.805 | Baseline=PASS, Bounds=PASS, Alpha=PASS
  Frame 7: X=25..120 (w=96), Y=9..111 (h=103), footY=111, transparentRatio=0.801 | Baseline=PASS, Bounds=PASS, Alpha=PASS
Unit Result: PASS

OVERALL VALIDATION: ALL PASS
```

---

## 3. Đặc Tả Mỹ Thuật & Độ Nhận Diện Từng Đơn Vị Đông Ngô (Visual Hierarchy)

1. **`wu-sword-infantry` (Bộ Binh Đông Ngô)**:
   - *Phân cấp thị giác*: Đơn vị cơ bản nhẹ nhàng, cơ động.
   - *Trang phục*: Áo chiến màu lam sẫm (Đông Ngô teal/navy), giáp ngực da nẹp đồng, đai thắt lưng đỏ thẫm.
   - *Vũ khí*: Đao lệnh hoàn thủ Đông Ngô một lưỡi vung nhịp nhàng theo bước chân.
2. **`wu-crossbow-soldier` (Nỏ Thủ Đông Ngô)**:
   - *Phân cấp thị giác*: Đơn vị tầm xa, nhận diện nỏ rõ rệt.
   - *Trang phục*: Áo chẽn lam viền chàm, đai chéo giữ ống tên đồng sau lưng.
   - *Vũ khí*: Nỏ gỗ Đông Ngô chuẩn mực với cơ đồng và mũi tên đồng đặt sẵn trên rãnh, ôm ngang ngực hướng phải.
3. **`wu-armored-guard` (Hộ Vệ Giáp Sắt Đông Ngô)**:
   - *Phân cấp thị giác*: Đơn vị giáp nặng kiên cố, vóc dáng đầm chắc.
   - *Trang phục*: Toàn thân khoác giáp vảy cá/ngư lân giáp nhiều tầng thắt dây đồng thau, nón sắt tròn che gáy.
   - *Vũ khí*: Đại kích Đông Ngô (trường kích) hai lưỡi nhọn và ngọn kích phụ sắc bén gắn túm lông xanh ngọc.
4. **`wu-field-commander` (Tướng Lĩnh Dã Chiến Đông Ngô)**:
   - *Phân cấp thị giác*: Tướng soái dã chiến uy nghiêm (generic commander, không phải Lục Dận, không dùng chân dung lịch sử cụ thể).
   - *Trang phục*: Kim lân giáp nẹp vàng, đai hổ phù hoàng kim, áo choàng tím chàm viền vàng bay nhẹ theo bước hành quân.
   - *Vũ khí*: Bảo kiếm chỉ huy chuôi nạm vàng sắc bén.

---

## 4. Minh Chứng Thị Giác (Visual Evidence Artifacts)

- **EVIDENCE 1 (Contact Sheet)**: `docs/audits/evidence/vis-bt-02/01-wu-enemy-walk-pack.png` (1060 × 580 px, hiển thị đầy đủ 4 bộ sprite sheet 8 frame trên nền caro minh bạch).
- **EVIDENCE 2 (Runtime Gameplay)**: `docs/audits/evidence/vis-bt-02/02-wu-runtime.png` (1024 × 768 px, hiển thị thực tế chiến trường Bà Triệu Núi Nưa với các đơn vị quân Ngô di chuyển trên đường mòn, thanh HUD, x3 speed và Auto Wave).

---

## 5. Kết Quả Kiểm Thử & Đóng Gói Hệ Thống (Build & Test Verification)

* **Vitest Suite**: `120 test files passed (654/654 unit tests passed 100%)`.
* **Vite Production Build**: `tsc -b && vite build` $\rightarrow$ **PASS** (141 modules transformed, 4 walk assets được bundle tự động vào `dist/assets/`).
* **Git Diff Check**: `git diff --check` $\rightarrow$ **PASS (0 whitespace / lint error)**.
* **Gameplay Code Isolation**: **ZERO CODE CHANGES** trong `src/domain/**` hay `src/game/**`.
* **Resolver & Fallback Integrity**: `resolveEnemyVisual(id).walkUrl` trả về đường dẫn hợp lệ; cơ chế an toàn `fallback: 'primitive'` được bảo toàn nguyên vẹn.

---

## 6. Kết Luận (Final Verdict)

* **VIS-BT-02**: **PASS** (Hoàn tất 4 sprite sheet kẻ thù Đông Ngô, đóng Cổng Kẻ Thù thành công).
