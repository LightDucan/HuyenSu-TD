# Nguồn Nhận Vật Phẩm Chiêu Hiền Lệnh (Recruitment Decree Sources Spec)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

Hệ thống phân phối và lưu trữ vật phẩm **Chiêu Hiền Lệnh** tuân thủ các quy tắc đã chốt:

1. **Bản Chất Lưu Trữ & Luồng Sử Dụng**:
   * Chiêu Hiền Lệnh được lưu trữ trong **Hành Trang (Inventory Tab - Tiêu Hao)** với định danh `item_chieu_hien_lenh`.
   * **Tuyệt đối không phải Currency**; không nằm trong thanh Tiền Tệ Wallet.
   * **Không cho phép Chiêu Hiền trực tiếp bằng KNB**: Luồng chuẩn là `KNB` $\rightarrow$ Mua Chiêu Hiền Lệnh trong Kỳ Trân Các (Shop) $\rightarrow$ Chiêu Hiền Các tiêu hao Chiêu Hiền Lệnh (`item_chieu_hien_lenh`). Request chiêu mộ chỉ tiêu duy nhất `item_chieu_hien_lenh`.
2. **Các Kênh Phân Phối Chiêu Hiền Lệnh (Reward Config Channels)**:
   * **Kênh 1: Thưởng Vượt Ải Lần Đầu (First Clear Stage Reward — Theo Cấu Hình)**:
     * Chiêu Hiền Lệnh có thể được cấu hình làm phần thưởng vượt ải lần đầu tại một số Ải chiến dịch chỉ định.
     * **Không khẳng định mọi ải First Clear đều nhận Chiêu Hiền Lệnh**: Danh sách ải nào nhận và số lượng nhận là tham số mở (**OPEN**), do Game Design & Codex cấu hình.
   * **Kênh 2: Thưởng Hoàn Thành Chương (Chapter Milestone — Theo Cấu Hình)**:
     * Hoàn thành các mốc Chapter cốt truyện có thể nhận rương thưởng chứa Chiêu Hiền Lệnh (mốc Chapter nào nhận là **OPEN**).
   * **Kênh 3: Hệ Thống Nhiệm Vụ & Thành Tựu (Quests & Achievements)**:
     * Đạt các cột mốc diệt quái, thu thập trang bị hoặc thành tựu đặc biệt theo cấu hình sự kiện.
   * **Kênh 4: Đổi Bằng Kim Nguyên Bảo Trong Kỳ Trân Các (Shop Service)**:
     * Người chơi sử dụng **Kim Nguyên Bảo (KNB)** tích lũy được trong game để mua Chiêu Hiền Lệnh vào Inventory.
     * **Không tạo thêm Currency thứ ba**: Cơ chế chỉ là mua Item trong Shop bằng Tiền tệ KNB có sẵn.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)

* **Module Phần Thưởng Chiến Dịch (Campaign Reward Engine — Codex xác nhận)**: Kiểm tra cờ `isFirstClear` và cấu hình phần thưởng của từng Ải để cấp phát Chiêu Hiền Lệnh vào kho đồ khi chiến thắng màn chơi.
* **Module Kỳ Trân Các / Cửa Hàng (Shop Service — Codex xác nhận)**: Xử lý giao dịch trừ KNB và cộng Chiêu Hiền Lệnh (`item_chieu_hien_lenh`) vào Inventory.
* **Module Quản Lý Kho (Inventory Management — Codex xác nhận)**: Cập nhật số lượng sở hữu `item_chieu_hien_lenh`.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)

1. **Truy cập Tra Cứu Nguồn Nhận**:
   * Khi đang ở màn **Chiêu Hiền Các** hoặc trong **Hành Trang** mà hết Chiêu Hiền Lệnh $\rightarrow$ Nhấp vào icon dấu cộng `[ + ]` cạnh số lượng hoặc nút `[Tìm Kiếm Chiêu Hiền Lệnh]`.
2. **Modal Nguồn Thu Thập (Acquisition Sources Modal)**:
   * Hiển thị danh sách các nguồn nhận đang khả dụng kèm tiến độ theo cấu hình hệ thống.
   * Mỗi dòng có nút **[Đi Tới]** dẫn trực tiếp đến màn chơi / tính năng tương ứng:
     * Dòng 1: *Ải Chiến Dịch chỉ định (Chưa Vượt Lần Đầu)* $\rightarrow$ Nút `[Vào Trận]`.
     * Dòng 2: *Rương Thưởng Mốc Chapter chỉ định* $\rightarrow$ Nút `[Nhận Thưởng]`.
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
|       Số lượng đang sở hữu: [Current] cái                                                         |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   DANH SÁCH NGUỒN NHẬN KHẢ DỤNG:                                                                  |
|                                                                                                   |
|   1. ẢI CHIẾN DỊCH CHƯA VƯỢT (First Clear)                                                        |
|      • [Tên Ải Chiến Dịch]  | Phần thưởng: +[N] Chiêu Hiền Lệnh        ==>  [ ĐẾN ẢI NÀY ]         |
|      • [Tên Ải Chiến Dịch]  | Phần thưởng: +[N] Chiêu Hiền Lệnh        ==>  [ ĐẾN ẢI NÀY ]         |
|                                                                                                   |
|   2. RƯƠNG THƯỞNG HOÀN THÀNH CHƯƠNG (Chapter Milestone)                                           |
|      • Rương [Tên Chapter] (Đạt [Current]/[Required]★)                ==>  [ NHẬN RƯƠNG (+[N] 📜) ]|
|                                                                                                   |
|   3. KỲ TRÂN CÁC (Đổi Bằng Kim Nguyên Bảo)                                                        |
|      • Giá bán: [💎 KNB] [Mức giá KNB theo cấu hình] / 1 Chiêu Hiền Lệnh ==> [ MUA NHANH ]       |
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

* **Cờ First Clear theo cấu hình phần thưởng**: Hệ thống chỉ trao Chiêu Hiền Lệnh ở lần đầu tiên vượt ải tại các Ải có chỉ định thưởng trong reward config; khi người chơi cày lại (Replay) ải cũ, phần thưởng chuyển sang Vàng/Nguyên liệu thông thường, không phát lặp lại Chiêu Hiền Lệnh.
* **Xác thực ví KNB khi mua**: Mua Chiêu Hiền Lệnh trong Shop phải thông qua `WalletTransactionRequest` với `currency: 'knb'`, trừ tiền thành công mới thêm item vào kho đồ. Request chiêu mộ tại Chiêu Hiền Các chỉ trừ `item_chieu_hien_lenh`.
