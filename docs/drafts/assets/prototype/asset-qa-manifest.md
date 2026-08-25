# Asset QA Manifest — Kiểm Toán Kỹ Thuật Asset Prototype

> [!IMPORTANT]
> **Quy Chuẩn Kiểm Định Kỹ Thuật**:
> - **Tiêu chuẩn Kích thước**: $128 \times 128$ px (Sprite, Portrait, VFX).
> - **Tiêu chuẩn Màu sắc**: PNG 8-bit RGBA, hỗ trợ Alpha transparency.
> - **Tiêu chuẩn Sprite Bàn cờ**: Front View, tiếp đất tại **Baseline $Y = 112$**, chiều cao nhân vật 100px ($Y: 13 \rightarrow 112$).
> - **Nguyên tắc Thẩm định**:
>   - Các chỉ số hình học và pixel được đo đạc chính xác bằng công cụ giải mã nhị phân PNG (`zlib` unfilter stream).
>   - Các khía cạnh thị giác chủ quan (độ rõ nét silhouette khi thu nhỏ, độ mượt hoạt họa) nếu chưa có pipeline test visual in-game được đánh dấu là `[NEEDS VISUAL CHECK]`.

---

## 1. Bảng Kiểm Toán Chi Tiết Toàn Bộ 20 Asset

### 1.1. Bộ Sprite Hero: Idle & Attack (10 Files)

| File Path | Kích Thước | Format / Alpha | Bounding Box $(X_{min}, X_{max}, Y_{min}, Y_{max})$ | Baseline $Y$ | Front View | Idle/Atk Consistency | Silhouette Readability | Trạng Thái QA |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `heroes/quan-vu/idle.png` | $128 \times 128$ | PNG RGBA (12.827 px trong suốt) | $(20, 90, 13, 112)$ | **112** | PASS | PASS (Chiều cao 100px) | Rõ rệt (Thanh Long Đao + Râu dài) | **PASS** |
| `heroes/quan-vu/attack.png` | $128 \times 128$ | PNG RGBA (12.607 px trong suốt) | $(18, 121, 13, 112)$ | **112** | PASS | PASS (Vung đao mở rộng $X \rightarrow 121$) | Rõ rệt (Vệt chém đao) | **PASS** |
| `heroes/truong-phi/idle.png` | $128 \times 128$ | PNG RGBA (12.980 px trong suốt) | $(22, 90, 13, 112)$ | **112** | PASS | PASS (Chiều cao 100px) | Rõ rệt (Xà Mâu + Thân hình vạm vỡ) | **PASS** |
| `heroes/truong-phi/attack.png` | $128 \times 128$ | PNG RGBA (12.708 px trong suốt) | $(15, 122, 13, 112)$ | **112** | PASS | PASS (Đâm xà mâu $X \rightarrow 122$) | Rõ rệt (Mâu đâm ngang) | **PASS** |
| `heroes/trieu-van/idle.png` | $128 \times 128$ | PNG RGBA (13.310 px trong suốt) | $(27, 90, 13, 112)$ | **112** | PASS | PASS (Chiều cao 100px) | Rõ rệt (Bạch giáp + Trường thương) | **PASS** |
| `heroes/trieu-van/attack.png` | $128 \times 128$ | PNG RGBA (13.007 px trong suốt) | $(28, 126, 13, 112)$ | **112** | PASS | PASS (Đâm thương $X \rightarrow 126$) | Rõ rệt (Vệt đâm thương trắng) | **PASS** |
| `heroes/hoang-trung/idle.png` | $128 \times 128$ | PNG RGBA (13.328 px trong suốt) | $(11, 90, 13, 112)$ | **112** | PASS | PASS (Chiều cao 100px) | Rõ rệt (Cung dài + Râu bạc) | **PASS** |
| `heroes/hoang-trung/attack.png` | $128 \times 128$ | PNG RGBA (13.446 px trong suốt) | $(38, 120, 13, 112)$ | **112** | PASS | PASS (Kéo cung $X \rightarrow 120$) | Rõ rệt (Tư thế giương cung) | **PASS** |
| `heroes/gia-cat-luong/idle.png` | $128 \times 128$ | PNG RGBA (13.543 px trong suốt) | $(38, 92, 13, 112)$ | **112** | PASS | PASS (Chiều cao 100px) | Rõ rệt (Áo thụng + Quạt lông vũ) | **PASS** |
| `heroes/gia-cat-luong/attack.png` | $128 \times 128$ | PNG RGBA (12.931 px trong suốt) | $(38, 114, 13, 112)$ | **112** | PASS | PASS (Vẫy quạt niệm phép $X \rightarrow 114$) | Rõ rệt (Luồng khí phép) | **PASS** |

---

### 1.2. Bộ Chân Dung HUD (5 Portraits)

| File Path | Kích Thước | Format / Alpha | Bounding Box Khung Tròn | Độ Căn Giữa | Naming Convention | Silhouette / Icon Readability | Trạng Thái QA |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `portraits/quan-vu.png` | $128 \times 128$ | PNG RGBA (6.539 px trong suốt) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | `portraits/<hero-id>.png` | Rõ rệt (Khuôn mặt đỏ, râu dài, mũ xanh) | **PASS** |
| `portraits/truong-phi.png` | $128 \times 128$ | PNG RGBA (6.539 px trong suốt) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | `portraits/<hero-id>.png` | Rõ rệt (Râu quai nón, mắt trợn uy dũng) | **PASS** |
| `portraits/trieu-van.png` | $128 \times 128$ | PNG RGBA (6.539 px trong suốt) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | `portraits/<hero-id>.png` | Rõ rệt (Mũ trụ bạc, khôi giáp anh tuấn) | **PASS** |
| `portraits/hoang-trung.png` | $128 \times 128$ | PNG RGBA (6.539 px trong suốt) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | `portraits/<hero-id>.png` | Rõ rệt (Tướng râu tóc bạc phơ, giáp vàng) | **PASS** |
| `portraits/gia-cat-luong.png` | $128 \times 128$ | PNG RGBA (6.539 px trong suốt) | $(8, 120, 8, 120) \rightarrow 113 \times 113$ px | Tâm $(64, 64)$ | `portraits/<hero-id>.png` | Rõ rệt (Khăn vấn quân sư, nét mặt điềm đạm) | **PASS** |

---

### 1.3. Bộ Hiệu Ứng Tuyệt Kỹ (5 Skill VFX)

| File Path | Kích Thước | Format / Alpha | Bounding Box $(X, Y)$ | Semi-Transparent Pixels | Naming Convention | Visual Effect Type | Trạng Thái QA |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `vfx/thanh-long-tram.png` | $128 \times 128$ | PNG RGBA | $(30, 119, 32, 114)$ | 1.009 px | `vfx/<skill-id>.png` | Vệt đao khí rồng xanh (Cleave AoE) | **PASS** |
| `vfx/ba-xa-gam-vang.png` | $128 \times 128$ | PNG RGBA | $(4, 124, 4, 124)$ | 6.565 px | `vfx/<skill-id>.png` | Sóng xung kích tỏa tròn màu tím/vàng (Stun AoE) | **PASS** |
| `vfx/that-tien-that-xuat.png` | $128 \times 128$ | PNG RGBA | $(12, 123, 28, 98)$ | 594 px | `vfx/<skill-id>.png` | Loạt vệt đâm thương liên hoàn (Multi-Hit) | **PASS** |
| `vfx/bach-bo-xuyen-duong.png` | $128 \times 128$ | PNG RGBA | $(7, 127, 43, 86)$ | 421 px | `vfx/<skill-id>.png` | Mũi tên năng lượng xuyên phá theo phương ngang | **PASS** |
| `vfx/dong-phong-hoa-tran.png` | $128 \times 128$ | PNG RGBA | $(13, 115, 8, 110)$ | 2.334 px | `vfx/<skill-id>.png` | Cột lửa gió lốc xoáy (Magic AoE / Slow) | **PASS** |

---

## 2. Đánh Giá Tiêu Chí Kỹ Thuật (QA Findings Summary)

1. **Chuẩn kích thước ($128 \times 128$)**: **$20/20$ files ($100\%$)** đạt chuẩn tuyệt đối $128 \times 128$ px.
2. **Kênh Alpha & Độ trong suốt**: **$20/20$ files ($100\%$)** có kênh Alpha hợp lệ, không bị lỗi nền đục (black/white artifact background).
3. **Quy chuẩn Tiếp đất Baseline $Y = 112$**:
   - Toàn bộ 10 sprite hero (5 Idle + 5 Attack) có điểm đáy tiếp xúc chân tại chính xác pixel row $Y = 112$.
   - Chiều cao nhân vật đạt chuẩn đồng nhất $100$ px ($Y_{min} = 13, Y_{max} = 112$). Khi render trên grid bàn cờ sẽ thẳng hàng, không bị hiện tượng trồi sụt hay lơ lửng.
4. **Quy chuẩn Chân dung Portrait**:
   - Toàn bộ 5 portrait được đóng khung tròn đồng nhất với đường kính 113 px đặt chính giữa canvas $128 \times 128$.
5. **Quy chuẩn Đặt tên File (Naming Conventions)**:
   - Cấu trúc thư mục sạch, tuân thủ đúng định dạng kebab-case:
     - `heroes/<hero-id>/idle.png`
     - `heroes/<hero-id>/attack.png`
     - `portraits/<hero-id>.png`
     - `vfx/<skill-id>.png`

---

## 3. Các Điểm Cần Kiểm Tra Thị Giác Thực Tế (`[NEEDS VISUAL CHECK]`)

> [!TIP]
> Các hạng mục sau đây không thể đo bằng tool nhị phân mà cần kiểm tra thực tế trong game loop khi Codex nối runtime ở task `VIS-C01`:
> 1. **Tốc độ chuyển đổi Idle $\rightarrow$ Attack**: Độ mượt khi đổi texture sprite tại thời điểm trigger đòn đánh.
> 2. **Tỷ lệ scale Sprite trên ô Grid**: Khi render sprite $128 \times 128$ vào ô grid bàn cờ (ví dụ $64 \times 64$ hoặc $80 \times 80$), cần kiểm tra hiện tượng vỡ nét hoặc mờ nét (Pixel filtering mode: `nearest-neighbor` vs `linear`).
> 3. **Tọa độ Neo VFX**: Điểm phát sinh VFX (tâm Hero vs vị trí mục tiêu Enemy) cần được cấu hình chuẩn trong hệ thống render.
