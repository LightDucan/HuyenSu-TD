# Báo Cáo Đóng Cổng Tài Nguyên Mỹ Thuật: VIS-BT-01 (Bà Triệu Production Hero Asset Pack)

**Task ID**: `VIS-BT-01`
**Giai đoạn**: Khởi nghĩa Bà Triệu 248 CE — Production Hero Visual Asset Pack
**Trạng thái Cổng Mỹ Thuật**: **ASSET GATE = PASS**
**Repository**: `LightDucan/HuyenSu-TD`
**Branch**: `antigravity/vis-bt-01-hero-assets`
**Base Commit**: `204443efb82db507d9b9118c577bd45c3c420165`
**Reference History Lock**: `antigravity/vs-ba-trieu-c01-history` @ `5f5c79eaf2947a2061da66557409cd4fe2221afe`

---

## 1. Danh Mục 12 Tập Tin Tài Nguyên Mỹ Thuật (Exact 12 Output Paths)

| STT | Hero / Skill ID | Loại Tài Nguyên | Đường Dẫn Tập Tin (Exact Path) | Kích Thước | Kênh Alpha | Trọng Số / Dung Lượng |
|:---:|---|---|---|:---:|:---:|:---:|
| 1 | `ba-trieu` | Portrait | `src/assets/portraits/ba-trieu.png` | **128 × 128 px** | **PASS (RGBA)** | 3.69 kB |
| 2 | `ba-trieu` | Combat Idle | `src/assets/heroes/ba-trieu/idle.png` | **128 × 128 px** | **PASS (RGBA)** | 1.05 kB |
| 3 | `ba-trieu` | Combat Attack | `src/assets/heroes/ba-trieu/attack.png` | **128 × 128 px** | **PASS (RGBA)** | 2.24 kB |
| 4 | `gio-manh-nui-nua` | Skill VFX | `src/assets/vfx/gio-manh-nui-nua.png` | **128 × 128 px** | **PASS (RGBA)** | 3.94 kB |
| 5 | `trieu-quoc-dat` | Portrait | `src/assets/portraits/trieu-quoc-dat.png` | **128 × 128 px** | **PASS (RGBA)** | 2.21 kB |
| 6 | `trieu-quoc-dat` | Combat Idle | `src/assets/heroes/trieu-quoc-dat/idle.png` | **128 × 128 px** | **PASS (RGBA)** | 0.94 kB |
| 7 | `trieu-quoc-dat` | Combat Attack | `src/assets/heroes/trieu-quoc-dat/attack.png` | **128 × 128 px** | **PASS (RGBA)** | 1.51 kB |
| 8 | `hieu-trieu-quan-yen` | Skill VFX | `src/assets/vfx/hieu-trieu-quan-yen.png` | **128 × 128 px** | **PASS (RGBA)** | 2.83 kB |
| 9 | `dinh-boi` | Portrait | `src/assets/portraits/dinh-boi.png` | **128 × 128 px** | **PASS (RGBA)** | 3.03 kB |
| 10 | `dinh-boi` | Combat Idle | `src/assets/heroes/dinh-boi/idle.png` | **128 × 128 px** | **PASS (RGBA)** | 1.32 kB |
| 11 | `dinh-boi` | Combat Attack | `src/assets/heroes/dinh-boi/attack.png` | **128 × 128 px** | **PASS (RGBA)** | 1.37 kB |
| 12 | `giu-luy-bo-dien` | Skill VFX | `src/assets/vfx/giu-luy-bo-dien.png` | **128 × 128 px** | **PASS (RGBA)** | 3.81 kB |

---

## 2. Kết Quả Kiểm Tra Kỹ Thuật Từng Tệp (Technical Validation Matrix)

Tất cả 12 tệp đã được kiểm chứng tự động bằng script phân tích nhị phân PNG và alpha channel (`validate_ba_trieu_hero_assets.mjs`):

```
=== TECHNICAL VALIDATION FOR 12 BÀ TRIỆU HERO ASSETS ===

[PASS] src/assets/portraits/ba-trieu.png (3696B)
       Dim: 128x128 | X: 0..127 | Y: 1..125 | footY: 124 | Transp: 21.6%
[PASS] src/assets/heroes/ba-trieu/idle.png (1047B)
       Dim: 128x128 | X: 39..85 | Y: 17..111 | footY: 110 | Transp: 85.5%
[PASS] src/assets/heroes/ba-trieu/attack.png (2238B)
       Dim: 128x128 | X: 30..127 | Y: 19..111 | footY: 110 | Transp: 83.2%
[PASS] src/assets/vfx/gio-manh-nui-nua.png (3935B)
       Dim: 128x128 | X: 14..110 | Y: 18..117 | footY: 117 | Transp: 90.5%
[PASS] src/assets/portraits/trieu-quoc-dat.png (2207B)
       Dim: 128x128 | X: 3..125 | Y: 3..125 | footY: 124 | Transp: 26.1%
[PASS] src/assets/heroes/trieu-quoc-dat/idle.png (943B)
       Dim: 128x128 | X: 35..97 | Y: 18..111 | footY: 110 | Transp: 83.9%
[PASS] src/assets/heroes/trieu-quoc-dat/attack.png (1513B)
       Dim: 128x128 | X: 28..127 | Y: 19..111 | footY: 110 | Transp: 83.0%
[PASS] src/assets/vfx/hieu-trieu-quan-yen.png (2832B)
       Dim: 128x128 | X: 4..124 | Y: 4..124 | footY: 124 | Transp: 39.0%
[PASS] src/assets/portraits/dinh-boi.png (3031B)
       Dim: 128x128 | X: 3..125 | Y: 3..125 | footY: 124 | Transp: 26.1%
[PASS] src/assets/heroes/dinh-boi/idle.png (1324B)
       Dim: 128x128 | X: 39..81 | Y: 14..111 | footY: 110 | Transp: 86.2%
[PASS] src/assets/heroes/dinh-boi/attack.png (1374B)
       Dim: 128x128 | X: 31..116 | Y: 18..111 | footY: 110 | Transp: 86.4%
[PASS] src/assets/vfx/giu-luy-bo-dien.png (3811B)
       Dim: 128x128 | X: 11..117 | Y: 11..117 | footY: 117 | Transp: 60.6%

OVERALL VALIDATION: ALL PASS
```

---

## 3. Phân Cấp & Đặc Tả Mỹ Thuật (Visual Identity & Historical Provenance)

### 3.1. Bà Triệu (`ba-trieu`)
* **Xuất xứ Lịch sử (Historical Provenance)**: **CORE HERO / T1 & T2 Xác Nhận**.
* **Định vị Thị giác**: Thủ lĩnh tối cao, tâm điểm thị giác của bộ ba tướng lĩnh Cửu Chân.
* **Hình tượng & Bảo vệ Ranh giới Lịch sử (Guardrails)**:
  - Nữ tướng trẻ tuổi (khoảng 20–23 tuổi), diện mạo trang nghiêm, dũng liệt, ánh mắt kiên định bất khuất.
  - Tuyệt đối bài trừ và không mô tả các truyền thuyết dị dạng, khiếm nhã mang tính hạ thấp trong các văn bản đời sau; không tình dục hóa nhân vật.
  - Trang phục: Chiến bào sắc vàng rực rỡ (*hoàng y / áo dải vàng Lạc tướng*), giáp ngực đồng Đông Sơn khắc họa tiết mặt trời/vòng xoắn ốc, khăn vấn vàng và trâm cài đồng/vàng.
  - Thích ứng Chiến tượng: Ảnh đại diện (*Portrait*) lồng ghép nhẹ nhàng bóng dáng ngà voi trắng (*bạch tượng*) và rặng núi Nưa linh thiêng phía sau; Sprite chiến đấu (*Idle/Attack*) tập trung toàn diện vào vóc dáng nữ tướng kiêu hãnh cầm trường kiếm thẳng sắc bén, chém ra phong kiếm uy mãnh.
* **Kỹ năng VFX (`gio-manh-nui-nua`)**: "Gió Mạnh Núi Nưa" — Luồng cuồng phong xoáy trôn ốc màu hoàng kim hòa quyện sắc xanh ngọc rừng núi, lá bay cuộn trào trong bão khí.

### 3.2. Triệu Quốc Đạt (`trieu-quoc-dat`)
* **Xuất xứ Lịch sử (Historical Provenance)**: **CONDITIONAL / T3 Truyền Thuyết Địa Phương Quan Yên**.
* **Định vị Thị giác**: Hào trưởng địa phương trưởng thành (~38 tuổi), người anh mẫu mực, lãnh đạo nghĩa binh thời kỳ đầu.
* **Hình tượng**: Gương mặt chững chạc, râu ngắn gọn gàng, chiến y xanh rừng/nâu đất thô mộc, giáp da đính đinh tán đồng, khăn vấn đầu đai trán đồng thau, tay cầm cự rìu chiến đồng Lạc Việt đầm chắc.
* **Kỹ năng VFX (`hieu-trieu-quan-yen`)**: "Hiệu Triệu Quan Yên" — Sóng lệnh phù bằng đồng và hoàng kim lan tỏa 8 hướng, vòng sóng âm lệnh bài thúc giục nghĩa binh đồng lòng tiến bước.

### 3.3. Đinh Bôi (`dinh-boi`)
* **Xuất xứ Lịch sử (Historical Provenance)**: **CONDITIONAL / T3 Truyền Thuyết Địa Phương Bồ Điền**.
* **Định vị Thị giác**: Tướng giữ lũy tiền phương, cung thủ / trinh sát nhanh nhẹn (~24 tuổi).
* **Hình tượng**: Gương mặt tinh anh, mắt nhắm chuẩn xác, chiến phục chàm viền sẫm, đai lưng mang ống tên đồng, trán đeo khăn cài lông chim Lạc Việt, tay giương cung gỗ uốn bắn tên thần tốc.
* **Kỹ năng VFX (`giu-luy-bo-dien`)**: "Giữ Lũy Bồ Điền" — Vòng phòng thủ lũy đất nén chặt với các cọc chông gỗ nhọn kiên cố vươn lên bảo vệ trận địa, chấn động đất đá bụi mù cản phá bước tiến quân thù.

---

## 4. Bảng Kiểm Tra Khả Dụng Runtime (Runtime Availability Matrix)

| Hero ID | Portrait Url | Idle Url | Attack Url | Skill VFX Url | Runtime Status |
|---|:---:|:---:|:---:|:---:|:---:|
| `ba-trieu` | `TRUE` | `TRUE` | `TRUE` | `TRUE` | **ALL TRUE (100%)** |
| `trieu-quoc-dat` | `TRUE` | `TRUE` | `TRUE` | `TRUE` | **ALL TRUE (100%)** |
| `dinh-boi` | `TRUE` | `TRUE` | `TRUE` | `TRUE` | **ALL TRUE (100%)** |

---

## 5. Kết Quả Kiểm Thử & Đóng Gói Hệ Thống (Build & Test Verification)

* **Vitest Suite**: `114 test files passed (603/603 unit tests)` $\rightarrow$ **PASS (100%)**.
* **Vite Production Build**: `tsc -b && vite build` $\rightarrow$ **PASS** (149 modules transformed, 12 hero assets tích hợp trơn tru vào `dist/assets/`).
* **Git Diff Check**: `git diff --check` $\rightarrow$ **PASS (0 whitespace / lint error)**.
* **Gameplay Code Isolation**: Hoàn toàn không sửa đổi mã logic trò chơi (`src/domain/**`, `src/game/**`, v.v.).

---

## 6. Kết Luận (Final Verdict)

* **VIS-BT-01**: **PASS** (12/12 tài nguyên đạt chuẩn sản xuất, đóng cổng tài nguyên mỹ thuật Bà Triệu thành công).
