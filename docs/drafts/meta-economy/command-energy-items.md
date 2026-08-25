# Vật Phẩm Quân Lệnh (Command Energy Items & Binh Phù)

## 1. Yêu Cầu Đã Khóa (Locked Rules)
Hệ thống vật phẩm hồi phục Quân Lệnh (Binh Phù) gồm 3 loại định danh rõ ràng:
1. **Tiểu Binh Phù**: Tăng trực tiếp **+1 Quân Lệnh**.
2. **Trung Binh Phù**: Tăng trực tiếp **+5 Quân Lệnh**.
3. **Đại Binh Phù**: Tăng trực tiếp **+10 Quân Lệnh**.

### 1.1. Quy Tắc Lưu Kho & Sử Dụng
* **Gacha trả vật phẩm vào Hành Trang**: Khi quay trúng Binh Phù từ Gacha Gold, vật phẩm được cộng vào kho Hành Trang (Tab Hành Trang), **tuyệt đối không tự động cộng thẳng vào thanh Quân Lệnh**.
* **Hỗ trợ Sử dụng nhiều (Batch Use)**: Cho phép người chơi chọn số lượng muốn dùng cùng lúc (thông qua thanh trượt Slider hoặc nút cộng/trừ / nút "Dùng Tối Đa").
* **Cho phép Overflow**: Khi sử dụng Binh Phù, nếu tổng điểm vượt quá giới hạn tối đa, hệ thống vẫn cộng đầy đủ (trạng thái Overflow).

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)
* **Module Quản Lý Kho (Inventory Management — Codex xác nhận)**: Quản lý số lượng từng loại Binh Phù (`item_binh_phu_tieu`, `item_binh_phu_trung`, `item_binh_phu_dai`).
* **Trạng Thái Quân Lệnh (Command Energy State — Codex xác nhận)**: Nhận giá trị cộng thêm và cập nhật trạng thái Quân Lệnh.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Mở từ Hành Trang**:
   * Tại Tab Hành Trang $\rightarrow$ Nhấp vào thẻ **Tiểu/Trung/Đại Binh Phù** $\rightarrow$ Nút `[Sử Dụng]`.
2. **Mở từ Thông báo hết Quân Lệnh**:
   * Khi cố gắng bắt đầu Wave mà hết Quân Lệnh $\rightarrow$ Popup gợi ý mở kho Binh Phù.
3. **Popup Sử Dụng Nhiều (Batch Use Modal)**:
   * Hiển thị: Icon vật phẩm, Tên vật phẩm, Số lượng đang sở hữu.
   * Thanh kéo chọn số lượng (1 đến $N$ món).
   * Dự tính kết quả: `Quân Lệnh hiện tại: 2/60 -> Sau khi dùng: 17/60 (+15 📜)`.
   * Nhấn `[Xác Nhận Sử Dụng]` $\rightarrow$ Trừ vật phẩm trong kho $\rightarrow$ Cộng điểm vào Command Energy $\rightarrow$ Phát hiệu ứng hoàn thành.

---

## 4. Wireframe Văn Bản (Text-Based Wireframe)

### Popup Sử Dụng Nhiều Binh Phù (Batch Use Modal)
```text
+-------------------------------------------------------------------+
|                     SỬ DỤNG VẬT PHẨM QUÂN LỆNH                    |
+-------------------------------------------------------------------+
|                                                                   |
|       [📜 ICON TRUNG BINH PHÙ]                                    |
|       Tên: Trung Binh Phù (Hiệu quả: +5 Quân Lệnh/cái)            |
|       Đang sở hữu: 14 cái                                         |
|                                                                   |
|       Chọn số lượng:                                              |
|       [ - ]  [====|============]  [ + ]   [ DÙNG HẾT (14) ]       |
|                       Số lượng chọn: 3 cái                        |
|                                                                   |
|  ---------------------------------------------------------------  |
|       Dự tính nhận: +15 Quân Lệnh                                 |
|       Quân Lệnh sau khi dùng: 52/60  ==>  67/60 (Tràn điểm)       |
|                                                                   |
+-------------------------------------------------------------------+
|             [ HỦY BỎ ]             |      [ XÁC NHẬN DÙNG ]       |
+-------------------------------------------------------------------+
```

---

## 5. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type EnergyItemType = 'tieu_binh_phu' | 'trung_binh_phu' | 'dai_binh_phu';

export type EnergyItemConfig = {
  itemId: EnergyItemType;
  name: string;
  energyBonus: number; // 1, 5, hoặc 10
  iconId: string;
};

export const ENERGY_ITEMS_DEFINITIONS: Record<EnergyItemType, EnergyItemConfig> = {
  tieu_binh_phu: { itemId: 'tieu_binh_phu', name: 'Tiểu Binh Phù', energyBonus: 1, iconId: 'icon_bp_small' },
  trung_binh_phu: { itemId: 'trung_binh_phu', name: 'Trung Binh Phù', energyBonus: 5, iconId: 'icon_bp_medium' },
  dai_binh_phu: { itemId: 'dai_binh_phu', name: 'Đại Binh Phù', energyBonus: 10, iconId: 'icon_bp_large' },
};
```

* **Action Callback cần cung cấp**:
  * `onUseEnergyItem(itemId: EnergyItemType, amount: number): { success: boolean; energyAdded: number; newEnergy: number }`

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Xác thực số lượng sở hữu**: Core phải kiểm tra `amount <= currentOwnedCount` trước khi trừ vật phẩm và cộng năng lượng.
* **Xử lý số lượng lớn**: Khi người chơi dùng số lượng lớn (ví dụ: dùng 100 cái Tiểu Binh Phù cùng lúc), giao dịch phải là 1 lệnh duy nhất (single atomic update), không gửi 100 request rời rạc.

---

## 7. Quyết Định Còn Mở (Open Decisions)
1. **Giới hạn Overflow tối đa**: Có đặt mức trần tối đa cho Overflow (ví dụ: tối đa không quá 999 Quân Lệnh) để tránh lưu trữ vô hạn không?
2. **Nguồn thu Binh Phù ngoài Gacha**: Binh Phù có được bán trực tiếp trong tiệm tạp hóa bằng Vàng/KNB không?
