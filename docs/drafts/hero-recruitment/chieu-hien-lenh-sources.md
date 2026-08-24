# Nguồn Nhận Vật Phẩm Chiêu Hiền Lệnh (Recruitment Decree Sources Spec)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

Hệ thống phân phối và lưu trữ vật phẩm **Chiêu Hiền Lệnh** tuân thủ các quy tắc đã chốt:

1. **Bản Chất Lưu Trữ (Inventory Item)**:
   * Chiêu Hiền Lệnh được lưu trữ trong **Hành Trang (Inventory Tab - Tiêu Hao)** với định danh `item_chieu_hien_lenh`.
   * **Tuyệt đối không phải Currency**; không nằm trong thanh Tiền Tệ Wallet.
2. **Các Nguồn Tiếp Nhận Chiêu Hiền Lệnh (Acquisition Channels)**:
   * **Nguồn 1: Thưởng Vượt Ải Lần Đầu (First Clear Stage Reward)**:
     * Mỗi khi người chơi vượt qua một Ải chiến dịch mới lần đầu tiên $\rightarrow$ Nhận cố định Chiêu Hiền Lệnh.
   * **Nguồn 2: Thưởng Hoàn Thành Chương (Chapter Completion Milestone)**:
     * Vượt qua toàn bộ các Ải của một Chapter cốt truyện (ví dụ: Chapter Khởi Nghĩa Mê Linh) $\rightarrow$ Nhận rương thưởng mốc chứa gói Chiêu Hiền Lệnh.
   * **Nguồn 3: Hệ Thống Nhiệm Vụ & Thành Tựu (Quests & Achievements)**:
     * Đạt các cột mốc diệt quái, thu thập trang bị hoặc tích lũy số trận thắng.
   * **Nguồn 4: Đổi Bằng Kim Nguyên Bảo (KNB Exchange in Shop)**:
     * Người chơi có thể sử dụng **Kim Nguyên Bảo (KNB)** tích lũy được qua thời gian chơi và phần thưởng ải để mua Chiêu Hiền Lệnh trong Kỳ Trân Các.
     * **Không tạo thêm Currency thứ ba**: Cơ chế chỉ là giao dịch mua Item bằng Tiền tệ KNB có sẵn.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)

* **Module Phần Thưởng Chiến Dịch (Campaign Reward Engine — Codex xác nhận)**: Kiểm tra cờ `isFirstClear` và cấp phát Chiêu Hiền Lệnh vào kho đồ khi chiến thắng màn chơi.
* **Module Kỳ Trân Các / Cửa Hàng (Shop Service — Codex xác nhận)**: Xử lý giao dịch trừ KNB và cộng Chiêu Hiền Lệnh vào Inventory.
* **Module Quản Lý Kho (Inventory Management — Codex xác nhận)**: Cập nhật số lượng sở hữu `item_chieu_hien_lenh`.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)

1. **Truy cập Tra Cứu Nguồn Nhận**:
   * Khi đang ở màn **Chiêu Hiền Các** hoặc trong **Hành Trang** mà hết Chiêu Hiền Lệnh $\rightarrow$ Nhấp vào icon dấu cộng `[ + ]` cạnh số lượng hoặc nút `[Tìm Kiếm Chiêu Hiền Lệnh]`.
2. **Modal Nguồn Thu Thập (Acquisition Sources Modal)**:
   * Hiển thị danh sách các nguồn nhận đang khả dụng kèm tiến độ.
   * Mỗi dòng có nút **[Đi Tới]** dẫn trực tiếp đến màn chơi / tính năng tương ứng:
     * Dòng 1: *Ải Chiến Dịch 1-5 (Chưa Vượt Lần Đầu)* $\rightarrow$ Nút `[Vào Trận]`.
     * Dòng 2: *Rương Thưởng Mốc Chapter 1 (Đạt 12/15 Sao)* $\rightarrow$ Nút `[Nhận Thưởng]`.
     * Dòng 3: *Kỳ Trân Các (Mua bằng KNB)* $\rightarrow$ Nút `[Mua Ngay]`.

---

## 4. Wireframe Văn Bản (Text-Based Wireframe)

### Modal Nguồn Nhận Chiêu Hiền Lệnh (Recruitment Item Sources Modal)

```text
+---------------------------------------------------------------------------------------------------+
|                            NGUỒN NHẬN VẬT PHẨM: CHIÊU HIỀN LỆNH                                   |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|       [📜 ICON CHIÊU HIỀN LỆNH]                                                                   |
|       Tên vật phẩm: Chiêu Hiền Lệnh                                                               |
|       Công dụng: Dùng để chiêu mộ Danh Tướng tại Chiêu Hiền Các                                   |
|       Số lượng đang sở hữu: 2 cái                                                                 |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   DANH SÁCH NGUỒN NHẬN KHẢ DỤNG:                                                                  |
|                                                                                                   |
|   1. ẢI CHIẾN DỊCH CHƯA VƯỢT (First Clear)                                                        |
|      • Ải 1-8: Cửa Rừng Hát Môn  | Phần thưởng: +1 Chiêu Hiền Lệnh    ==>  [ ĐẾN ẢI NÀY ]         |
|      • Ải 1-10: Căn Cứ Mê Linh   | Phần thưởng: +2 Chiêu Hiền Lệnh    ==>  [ ĐẾN ẢI NÀY ]         |
|                                                                                                   |
|   2. RƯƠNG THƯỞNG HOÀN THÀNH CHƯƠNG (Chapter Milestone)                                           |
|      • Rương Chapter 1: Khởi Nghĩa Mê Linh (Đạt 30★)                 ==>  [ NHẬN RƯƠNG (+5 📜) ]  |
|                                                                                                   |
|   3. KỲ TRÂN CÁC (Đổi Bằng Kim Nguyên Bảo)                                                        |
|      • Giá bán: [💎 KNB] 150 KNB / 1 Chiêu Hiền Lệnh                  ==>  [ MUA NHANH ]          |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|                                         [ ĐÓNG LẠI ]                                              |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type ItemAcquisitionSourceType = 'first_clear' | 'chapter_milestone' | 'achievement' | 'knb_shop';

export type AcquisitionSourceItem = {
  sourceId: string;
  sourceType: ItemAcquisitionSourceType;
  title: string;
  description: string;
  rewardCount: number;
  isCompletedOrClaimed: boolean;
  navigationTarget: {
    screen: 'campaign' | 'chapter_select' | 'shop';
    params?: Record<string, string | number>;
  };
};

export type ChieuHienLenhShopConfig = {
  itemId: 'item_chieu_hien_lenh';
  costCurrency: 'knb';
  costPerItem: number; // Mức giá KNB (OPEN — chờ Game Design & Codex phê duyệt)
  dailyPurchaseLimit?: number;
};
```

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)

* **Cờ First Clear bất biến**: Hệ thống chỉ trao Chiêu Hiền Lệnh ở lần đầu tiên vượt ải; khi người chơi cày lại (Replay) ải cũ, phần thưởng chuyển sang Vàng/Nguyên liệu thông thường, không phát lặp lại Chiêu Hiền Lệnh.
* **Xác thực ví KNB khi mua**: Mua Chiêu Hiền Lệnh trong Shop phải thông qua `WalletTransactionRequest` với `currency: 'knb'`, trừ tiền thành công mới thêm item vào kho đồ.
