# Hệ Thống Chiêu Mộ Gacha Bằng Vàng (Gold Gacha Spec)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

### 1.1. Danh Mục Bể Thưởng (Reward Pool)
Bể thưởng của tính năng **Gacha Gold** chỉ bao gồm các nhóm vật phẩm sau:
1. **Vàng (Gold)**: Trúng thưởng lại một lượng Vàng.
2. **Vũ Khí Lv.1**: Các loại vũ khí thường cấp độ 1 có chỉ số Flat Bonus cơ bản.
3. **Ngọc Lv.1**: Các loại ngọc bổ trợ thường cấp độ 1 có chỉ số Flat Bonus cơ bản.
4. **Tiểu Binh Phù**: Vật phẩm hồi +1 Quân Lệnh.
5. **Trung Binh Phù**: Vật phẩm hồi +5 Quân Lệnh.
6. **Đại Binh Phù**: Vật phẩm hồi +10 Quân Lệnh.

### 1.2. Ràng Buộc Nghiêm Ngặt Về Thông Số (Không Tự Ý Chốt)
* **TUYỆT ĐỐI KHÔNG TỰ CHỐT**:
  * Giá quay 1 lần (1x) và 10 lần (10x).
  * Bảng tỷ lệ xuất hiện (Drop Rates) chi tiết.
  * Cơ chế bảo hiểm (Pity System) chính thức.
  * Lượng Vàng cụ thể trả lại khi quay trúng ô Vàng.
  * Bảng chỉ số Flat Bonus chi tiết của các trang bị Lv.1.
* Mọi thông số trên được ghi nhận ở dạng tham số cấu hình mở (`configurable parameters`) để Game Design và Codex thiết lập sau.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Gacha Domain Resolver**: Xử lý logic bốc thăm ngẫu nhiên (RNG Engine) trên Core/Domain.
* **Player Wallet**: Trừ số lượng Vàng khi người chơi xác nhận quay.
* **Inventory Store**: Tiếp nhận toàn bộ vật phẩm trúng thưởng (Trang bị, Binh Phù) vào kho đồ; cộng dồn Vàng trúng thưởng vào Wallet.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Truy cập Màn Chiêu Mộ (Gacha Screen)**:
   * Từ Main Menu hoặc Header Bar $\rightarrow$ Nhấp vào nút `[Chiêu Mộ / Bách Bảo Rương]`.
2. **Giao diện quay rương**:
   * Banner Rương Báu Hoàng Kim với các hiệu ứng hạt ánh sáng lấp lánh.
   * Hiển thị số dư Vàng hiện tại của người chơi.
   * Nút `[Chiêu Mộ 1 Lần]` và `[Chiêu Mộ 10 Lần]`.
   * Nút `[Xem Tỷ Lệ]` $\rightarrow$ Mở Popup hiển thị danh sách vật phẩm trong Pool.
3. **Hoạt cảnh mở rương & Màn hình Kết Quả (Result Screen)**:
   * Nhấp quay $\rightarrow$ Rương mở nắp, tỏa ánh hào quang $\rightarrow$ Có nút `[Bỏ Qua]` (Skip Animation).
   * Hiển thị lưới kết quả (1 thẻ bài với 1x, hoặc 10 thẻ bài xếp 2 hàng với 10x).
   * Phân loại viền màu theo nhóm vật phẩm (Vàng: Viền vàng, Trang bị: Viền xanh/tím, Binh Phù: Viền lam/lục).
   * Nút `[Thu Nhận]` (đóng về màn hình chính) hoặc `[Quay Tiếp 10 Lần]`.

---

## 4. Wireframe Văn Bản (Text-Based Wireframe)

### 4.1. Màn Hình Chiêu Mộ Gacha Gold (Gacha Main Screen)
```text
+---------------------------------------------------------------------------------------------------+
|  [ QUAY LẠI ]    |  BÁCH BẢO RƯƠNG (CHIÊU MỘ BẰNG VÀNG)  |  [💰 VÀNG SỞ HỮU]: 52,400              |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|                                     +-----------------------+                                     |
|                                     |                       |                                     |
|                                     |    [🎁 RƯƠNG HOÀNG]   |                                     |
|                                     |        [KIM BÁU]      |                                     |
|                                     |                       |                                     |
|                                     +-----------------------+                                     |
|                                                                                                   |
|                      Danh mục vật phẩm có thể nhận:                                                |
|            [💰 Thỏi Vàng]  •  [🗡️ Vũ Khí Lv1]  •  [🔮 Ngọc Lv1]  •  [📜 Các Loại Binh Phù]         |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|             [ ℹ️ XEM BẢNG TỶ LỆ ]                          [ TỰ ĐỘNG BỎ QUA HOẠT CẢNH: [X] ]      |
|                                                                                                   |
|          +-------------------------------+           +-------------------------------+            |
|          |       CHIÊU MỘ 1 LẦN          |           |       CHIÊU MỘ 10 LẦN         |            |
|          |        [💰 [Giá 1x]]          |           |        [💰 [Giá 10x]]         |            |
|          +-------------------------------+           +-------------------------------+            |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

---

### 4.2. Màn Hình Kết Quả Quay 10 Lần (Gacha 10x Result Screen)
```text
+---------------------------------------------------------------------------------------------------+
|                                     KẾT QUẢ CHIÊU MỘ (10 LẦN)                                     |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|   +---------------+  +---------------+  +---------------+  +---------------+  +---------------+   |
|   |  [🗡️ VŨ KHÍ]   |  | [📜 BINH PHÙ] |  |  [🔮 NGỌC]    |  |  [💰 THƯỞNG]  |  | [📜 BINH PHÙ] |   |
|   |Thanh Long Đao |  | Tiểu Binh Phù |  |  Huyết Ngọc   |  |   Túi Vàng     |  | Trung Binh Phù|   |
|   |     Lv. 1     |  |     (+1 📜)   |  |     Lv. 1     |  |   (+[Vàng])    |  |    (+5 📜)    |   |
|   +---------------+  +---------------+  +---------------+  +---------------+  +---------------+   |
|                                                                                                   |
|   +---------------+  +---------------+  +---------------+  +---------------+  +---------------+   |
|   | [📜 BINH PHÙ] |  |  [🗡️ VŨ KHÍ]   |  |  [🔮 NGỌC]    |  | [📜 BINH PHÙ] |  | [📜 BINH PHÙ] |   |
|   | Đại Binh Phù  |  | Bát Xà Mâu    |  |  Bạch Ngọc    |  | Tiểu Binh Phù |  | Trung Binh Phù|   |
|   |    (+10 📜)   |  |     Lv. 1     |  |     Lv. 1     |  |     (+1 📜)   |  |    (+5 📜)    |   |
|   +---------------+  +---------------+  +---------------+  +---------------+  +---------------+   |
|                                                                                                   |
|  * Tất cả vật phẩm đã được chuyển vào [Hành Trang]. Vàng trúng thưởng đã cộng trực tiếp vào ví.    |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|                     [ THU NHẬN TẤT CẢ ]             |         [ QUAY TIẾP 10 LẦN ]                |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type GachaPoolRewardItem =
  | { type: 'gold'; amount: number }
  | { type: 'weapon'; definitionId: string; level: 1 }
  | { type: 'gem'; definitionId: string; level: 1 }
  | { type: 'consumable'; itemId: 'tieu_binh_phu' | 'trung_binh_phu' | 'dai_binh_phu'; count: number };

export type GachaPullResult = {
  pullCount: 1 | 10;
  spentGold: number;
  newGoldBalance: number;
  rewards: GachaPoolRewardItem[];
};
```

* **Action Callback cần cung cấp**:
  * `onGachaGoldPull(pullCount: 1 | 10): GachaPullResult`

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Cấm viết RNG tại UI**: Tuyệt đối không dùng `Math.random()` trong React để sinh vật phẩm. UI chỉ gửi request `onGachaGoldPull(10)` và render chính xác mảng `rewards` trả về từ Core.
* **Xử lý ngắt kết nối / Thoát app giữa chừng**: Core phải trừ tiền và cộng vật phẩm vào kho ngay khi request được xử lý; nếu người chơi đóng app giữa chừng khi hoạt cảnh đang chạy, toàn bộ vật phẩm vẫn được bảo toàn trong Hành Trang.

---

## 7. Quyết Định Còn Mở (Open Decisions)
1. **Giá quay chuẩn**: Chi phí Vàng cho 1 lượt và 10 lượt quay (ví dụ: 1,000 Vàng / 9,000 Vàng hay mức khác)?
2. **Bảng tỷ lệ rơi (Drop Table Rates)**: Tỷ lệ phân bổ chính thức giữa các nhóm: Vàng, Vũ khí Lv.1, Ngọc Lv.1, Tiểu/Trung/Đại Binh Phù.
3. **Cơ chế Pity**: Có cần cơ chế đảm bảo trúng ít nhất 1 Đại Binh Phù hoặc 1 Vũ Khí sau $N$ lượt quay không?
