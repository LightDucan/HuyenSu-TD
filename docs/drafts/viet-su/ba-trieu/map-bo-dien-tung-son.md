# Đặc Tả Bối Cảnh Bản Đồ: Phòng Tuyến Bồ Điền — Tùng Sơn (Map Specification)

> [!IMPORTANT]
> **Tuyên Bố Ranh Giới Sáng Tạo Nghệ Thuật (Artistic Interpretation Disclaimer)**:
> - **Mọi chi tiết về cấu trúc lũy đất nện, bãi cọc tre ngầm, hào nước, hàng rào tre gai, tháp canh và lộ trình di chuyển chiến thuật trong bản đồ này là DIỄN GIẢI MỸ THUẬT GAME (Artistic Game Interpretation) nhằm phục vụ trải nghiệm lối chơi Tower Defense, KHÔNG PHẢI là sự phục dựng (reconstruction) lịch sử chính xác tuyệt đối.**
> - Nền tảng địa lý lịch sử dựa trên các ghi chép về căn cứ Bồ Điền (thôn Phú Điền, xã Triệu Lộc, huyện Hậu Lộc, tỉnh Thanh Hóa) và dãy núi Tùng Sơn trong *Đại Nam Nhất Thống Chí*, *Toàn Thư* và quần thể Di tích Quốc gia Đặc biệt Đền Bà Triệu.

---

## 1. Tổng Quan Không Gian Bản Đồ (Map Overview)

* **Tên Map**: **Phòng Tuyến Bồ Điền — Tùng Sơn** *(Bo Dien Defense & Tung Mountain Bastion)*
* **Loại địa hình**: Bán sơn địa nhiệt đới (Đầm lầy lau sậy $\rightarrow$ Ruộng lúa đồng bằng $\rightarrow$ Vách đá vôi Tùng Sơn).
* **Mục tiêu phòng thủ**: Bảo vệ Cổng lũy Đại bản doanh Bồ Điền và đường lên Đỉnh núi Tùng trước các đợt đổ bộ của quân Đông Ngô.
* **Quy mô Grid dự kiến**: Chuẩn màn hình 16:9 (hoặc isometric 2D viewport) với đường đi cố định (Fixed Path) cho Enemy và các ô đặt quân (Hero Placement Nodes) dọc hai bên đường.

---

## 2. Sơ Đồ Phân Vùng Chiến Thuật (Tactical Layout Diagram)

```text
+---------------------------------------------------------------------------------------------------+
|                        SƠ ĐỒ BẢN ĐỒ TOWER DEFENSE: BỒ ĐIỀN - TÙNG SƠN                             |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [VÙNG 1: BẾN THUYỀN ĐẦM LẦY]                                                                    |
|  (Điểm xuất phát của Enemy)                                                                      |
|  Thuyền chiến Ngô neo đậu ---> Bãi bồi lau sậy ngập nước ---> Cầu tre vạt nhọn                     |
|                                         |                                                         |
|                                         v                                                         |
|  [VÙNG 2: BÌNH NGUYÊN ĐỒNG LÚA & TRẬN ĐỊA CỌC CHÔNG]                                             |
|  (Khu vực chiến đấu trung tâm)                                                                    |
|  Đường đất đắp cao uốn lượn hình chữ S  <==== [Ô ĐẶT HERO 1] [Ô ĐẶT HERO 2]                       |
|  Hai bên là ruộng lúa vàng & bãi chông tre ngầm  <==== [Ô ĐẶT HERO 3]                             |
|                                         |                                                         |
|                                         v                                                         |
|  [VÙNG 3: CỔNG LŨY BỒ ĐIỀN & DÃY NÚI TÙNG SƠN]                                                   |
|  (Cứ điểm bảo vệ cốt lõi)                                                                         |
|  Cổng lũy gỗ lim ken đất nện ---> Tháp canh cau rừng cắm cờ vàng ---> Vách núi Tùng sừng sững    |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. Các Tầng Lớp Môi Trường Thị Giác (Environment Layers)

### 3.1. Layer 1: Tiền Tuyến Sông Nước & Bãi Bồi Lau Sậy (Entry Zone)
* **Yếu tố cảnh quan**:
  * Nhánh sông Lạch Trường sóng nước cuồn cuộn phù sa đỏ gạch, nơi các chiến hạm Đông Ngô (Lâu thuyền, Mông xung) thả neo.
  * Bãi lau sậy trắng bạc đung đưa trong gió biển; mặt nước phủ bèo tấm và bùn lầy nhiệt đới.
  * Cầu khỉ bằng thân tre ghép bắt qua lạch nước nhỏ để quân địch tiến lên bờ.

### 3.2. Layer 2: Trận Địa Trung Tâm — Ruộng Lúa & Hào Chông (Combat Path & Placement Nodes)
* **Đường di chuyển (Enemy Path)**: Tuyến đường đất đỏ đắp cao uốn khúc qua các thửa ruộng lúa chín vàng trĩu hạt; bề mặt đường có dấu bánh xe và rải rác những tảng đá cuội.
* **Chướng ngại vật & Điểm nhấn**:
  * Hào nước dẫn nước đầm lầy cắm cọc chông tre vạt nhọn ngầm bên dưới.
  * Rào chấn mộc (rào tre gai đan chéo) dựng bên lề đường để hướng kẻ địch đi vào vùng khống chế của các Hero.
* **Vị trí đặt Hero (Placement Nodes)**: Các bệ đá tự nhiên kê chân gỗ lim vững chãi đặt cạnh ruộng lúa, nơi Hero đứng bao quát tầm nhìn trên cao.

### 3.3. Layer 3: Cứ Điểm Hậu Phương — Đại Bản Doanh & Vách Núi Tùng (Core Bastion)
* **Yếu tố công trình**:
  * Tường lũy đắp bằng đất nện kết hợp ken cọc gỗ lim dày đặc; cổng chính làm bằng hai cánh gỗ dày buộc đai mây bện.
  * Chòi canh dựng bằng thân cau rừng cao vút trên ngọn cây, trang bị dàn nỏ lớn và phấp phới cờ tướng thêu chữ **"Triệu"** màu vàng rực rỡ.
* **Phông nền phía sau (Background Vista)**: Dãy núi đá vôi Tùng Sơn sừng sững với những vách đá cheo leo phủ đầy cây dương xỉ cổ thụ; mây chiều hoàng hôn buông ánh vàng kim tráng lệ.

---

## 4. Bảng Màu Thị Giác (Visual Palette)

| Mã Màu / Sắc Thái | Ứng Dụng Trong Bản Đồ | Ý Nghĩa Văn Hóa & Nghệ Thuật |
|---|---|---|
| **Vàng Lúa Chín & Kim Đồng** | Ruộng lúa, cờ phướn, ánh đồng hộ tâm phiến | Sự trù phú của đồng bằng Cửu Chân và tinh thần vương giả của Bà Triệu. |
| **Xanh Ngọc & Xanh Rêu** | Lau sậy ven đầm lầy, rừng cây núi Tùng | Sức sống bất diệt của thiên nhiên núi rừng Lạc Việt. |
| **Nâu Đất Nện & Nâu Gỗ Lim** | Tường lũy, cọc chông, mặt đường hành quân | Chất liệu mộc mạc, bền bỉ của kiến trúc quân sự cổ truyền. |
| **Đỏ Phù Sa & Cam Hoàng Hôn** | Mặt sông Lạch Trường, ánh nắng chiều | Khí thế bi tráng, hào hùng của chiến trận ngàn năm. |

---

## 5. Danh Mục Props & Chi Tiết Môi Trường Phục Vụ Pixel Art

1. **Tháp Canh Thân Cau Rừng**: Tháp gỗ 2 tầng mái lá cọ, đỉnh tháp cắm cờ vàng viền đỏ son.
2. **Rào Tre Gai Chấn Mộc**: Hàng rào tre vạt nhọn đan dây mây chéo hình chữ X.
3. **Bãi Chông Tre Ngầm**: Cọc tre già vạt nhọn cắm so le ngập nửa thân trong bùn nước.
4. **Nhà Sàn Mái Cong Đông Sơn**: Nhà sàn gỗ lim mái cong vút hình thuyền đặt thấp thoáng bên chân núi.
5. **Trống Đồng Bày Trận**: Trống đồng Đông Sơn loại I đặt trên bệ gỗ cạnh đài chỉ huy trung tâm.
