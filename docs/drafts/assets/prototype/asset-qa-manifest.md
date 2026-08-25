# Asset QA Manifest — Kiểm Toán Kỹ Thuật Asset Prototype

> [!IMPORTANT]
> **Quy Chuẩn Kiểm Định Kỹ Thuật (Objective Data vs Visual Check)**:
> - **Tiêu chuẩn Kích thước**: $128 \times 128$ px (Sprite, Portrait, VFX) — *Kiểm tra bằng tool: PASS*.
> - **Tiêu chuẩn Định dạng**: PNG 8-bit RGBA, kênh Alpha hợp lệ — *Kiểm tra bằng tool: PASS*.
> - **Tiêu chuẩn Tiếp đất**: Baseline $Y = 112$ đối với Sprite bàn cờ — *Kiểm tra bằng tool: PASS*.
> - **Quy ước Đặt tên**: Cấu trúc thư mục và tên file chuẩn `heroes/<id>/...`, `portraits/<id>.png`, `vfx/<id>.png` — *Kiểm tra bằng tool: PASS*.
> - **Khía cạnh Thị giác (Visual Check)**: Các yếu tố như Front View, Silhouette readability, tính mượt mà animation và độ đồng bộ nghệ thuật khi render in-game được gắn nhãn `[NEEDS VISUAL CHECK]` để kiểm tra trực tiếp bằng mắt khi chạy game, không kết luận PASS toàn diện chỉ từ phân tích nhị phân PNG.

---

## 1. Bảng Kiểm Toán Chi Tiết 20 Asset

### 1.1. Bộ Sprite Hero: Idle & Attack (10 Files)

| File Path | Kích Thước | Format (Alpha Pixels) | Bounding Box $(X_{min}, X_{max}, Y_{min}, Y_{max})$ | Baseline $Y$ | Naming | Front View | Idle/Atk Consistency | Silhouette Readability | Trạng Thái QA |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `heroes/quan-vu/idle.png` | $128 \times 128$ | PNG RGBA (12.827 px alpha=0) | $(20, 90, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/quan-vu/attack.png` | $128 \times 128$ | PNG RGBA (12.607 px alpha=0) | $(18, 121, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/truong-phi/idle.png` | $128 \times 128$ | PNG RGBA (12.980 px alpha=0) | $(22, 90, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/truong-phi/attack.png` | $128 \times 128$ | PNG RGBA (12.708 px alpha=0) | $(15, 122, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/trieu-van/idle.png` | $128 \times 128$ | PNG RGBA (13.310 px alpha=0) | $(27, 90, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/trieu-van/attack.png` | $128 \times 128$ | PNG RGBA (13.007 px alpha=0) | $(28, 126, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/hoang-trung/idle.png` | $128 \times 128$ | PNG RGBA (13.328 px alpha=0) | $(11, 90, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/hoang-trung/attack.png` | $128 \times 128$ | PNG RGBA (13.446 px alpha=0) | $(38, 120, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/gia-cat-luong/idle.png` | $128 \times 128$ | PNG RGBA (13.543 px alpha=0) | $(38, 92, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `heroes/gia-cat-luong/attack.png` | $128 \times 128$ | PNG RGBA (12.931 px alpha=0) | $(38, 114, 13, 112)$ | **112** | PASS | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |

---

### 1.2. Bộ Chân Dung HUD (5 Portraits)

| File Path | Kích Thước | Format (Alpha Pixels) | Bounding Box Khung Tròn | Độ Căn Giữa | Naming Convention | Icon Readability | Trạng Thái QA |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `portraits/quan-vu.png` | $128 \times 128$ | PNG RGBA (6.539 px alpha=0) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `portraits/truong-phi.png` | $128 \times 128$ | PNG RGBA (6.539 px alpha=0) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `portraits/trieu-van.png` | $128 \times 128$ | PNG RGBA (6.539 px alpha=0) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `portraits/hoang-trung.png` | $128 \times 128$ | PNG RGBA (6.539 px alpha=0) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `portraits/gia-cat-luong.png` | $128 \times 128$ | PNG RGBA (6.539 px alpha=0) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |

---

### 1.3. Bộ Hiệu Ứng Tuyệt Kỹ (5 Skill VFX)

| File Path | Kích Thước | Format (Alpha Pixels) | Bounding Box $(X, Y)$ | Semi-Transparent Pixels | Naming Convention | Visual Effect Quality | Trạng Thái QA |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `vfx/thanh-long-tram.png` | $128 \times 128$ | PNG RGBA (14.569 px alpha=0) | $(30, 119, 32, 114)$ | 1.009 px | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `vfx/ba-xa-gam-vang.png` | $128 \times 128$ | PNG RGBA (8.788 px alpha=0) | $(4, 124, 4, 124)$ | 6.565 px | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `vfx/that-tien-that-xuat.png` | $128 \times 128$ | PNG RGBA (13.230 px alpha=0) | $(12, 123, 28, 98)$ | 594 px | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `vfx/bach-bo-xuyen-duong.png` | $128 \times 128$ | PNG RGBA (14.771 px alpha=0) | $(7, 127, 43, 86)$ | 421 px | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |
| `vfx/dong-phong-hoa-tran.png` | $128 \times 128$ | PNG RGBA (13.159 px alpha=0) | $(13, 115, 8, 110)$ | 2.334 px | PASS | [NEEDS VISUAL CHECK] | **DATA PASS / [NEEDS VISUAL CHECK]** |

---

## 2. Tổng Hợp Các Tiêu Chí Đo Lường Khách Quan (Objective Verification)

1. **Chuẩn kích thước ($128 \times 128$)**: **$20/20$ files ($100\%$)** khớp chính xác $128 \times 128$ px.
2. **Kênh Alpha & Độ trong suốt**: **$20/20$ files ($100\%$)** có kênh Alpha hợp lệ, có vùng trong suốt bao quanh, không bị lỗi nền đục.
3. **Quy chuẩn Tiếp đất Baseline $Y = 112$**:
   - $10/10$ Hero sprites (5 Idle + 5 Attack) có điểm đáy tiếp xúc chân tại chính xác dòng pixel $Y = 112$.
   - Chiều cao nhân vật nằm trong khoảng $Y_{min} = 13 \rightarrow Y_{max} = 112$ (chiều cao hình học: 100 px).
4. **Quy chuẩn Chân dung Portrait**:
   - $5/5$ portraits có khung tròn đường kính 113 px căn giữa canvas $128 \times 128$.
5. **Quy chuẩn Đặt tên File**:
   - Tuân thủ đúng cấu trúc thư mục: `heroes/<id>/idle.png`, `heroes/<id>/attack.png`, `portraits/<id>.png`, `vfx/<id>.png`.

---

## 3. Danh Mục Hạng Mục Cần Kiểm Tra Thị Giác (`[NEEDS VISUAL CHECK]`)

> [!WARNING]
> Các hạng mục sau đây không thể đo đạc bằng tool giải mã nhị phân mà bắt buộc phải kiểm tra bằng mắt trong môi trường render thực tế:
> 1. **Front View**: Đánh giá góc nhìn có đồng nhất trực diện giữa các nhân vật khi đặt cạnh nhau hay không.
> 2. **Silhouette Readability**: Đánh giá khả năng phân biệt hình bóng của từng tướng khi thu nhỏ trên màn hình di động / bàn cờ trận đánh.
> 3. **Idle $\rightarrow$ Attack Transition**: Đánh giá độ giật / độ mượt khi chuyển đổi frame giữa tư thế đứng chờ và tư thế ra đòn.
> 4. **VFX Aesthetics**: Đánh giá độ hòa trộn màu sắc, độ sáng, và tỷ lệ kích thước hiệu ứng kỹ năng so với Hero và Enemy trên màn hình.
