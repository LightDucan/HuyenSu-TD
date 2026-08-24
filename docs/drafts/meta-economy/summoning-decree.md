# Vật Phẩm Lệnh Hiệu Triệu (Summoning Decree Spec)

## 1. Yêu Cầu Đã Khóa (Locked Rules)
* **Khái niệm**: *Lệnh Hiệu Triệu* là vật phẩm chiến lược quý hiếm bậc nhất trong hệ thống Meta Game.
* **Công dụng**: Khi sử dụng, tăng vĩnh viễn **+1 Vị trí triển khai Hero trên bản đồ** (`unlockedDeploymentSlots += 1`).
* **Hiệu lực**: Có giá trị vĩnh viễn cho toàn bộ tài khoản, áp dụng trên tất cả các Chapter và màn chơi.
* **Giới hạn sử dụng**: Bị khống chế bởi mức trần tối đa của hệ thống và số lượng ô đặt trên bản đồ.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Inventory Store**: Chứa vật phẩm `item_lenh_hieu_trieu`.
* **PlayerProfileState**: Lưu trữ số lượng Lệnh Hiệu Triệu đã sử dụng (`usedSummoningDecrees`).
* **PlacementManager**: Mở rộng thêm 1 slot khả dụng ngay sau khi giao dịch thành công.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Truy cập**:
   * Tại Tab Hành Trang $\rightarrow$ Nhấp vào **Lệnh Hiệu Triệu** $\rightarrow$ Nút `[Sử Dụng]`.
   * Hoặc nhấp trực tiếp vào ô Slot Hero bị khóa trên Tab Đội Hình $\rightarrow$ Nút `[Mở Bằng Lệnh Hiệu Triệu]`.
2. **Popup Xác Nhận Sử Dụng**:
   * Hiển thị hình ảnh Lệnh Bài Hoàng Kim tỏa sáng.
   * Thông báo rõ sự thay đổi: `Giới hạn xuất trận: 7 Tướng  ===>  8 Tướng`.
   * Cảnh báo: *"Vật phẩm sẽ bị tiêu hao vĩnh viễn sau khi xác nhận!"*.
   * Nhấn `[Xác Nhận Kích Hoạt]` $\rightarrow$ Trừ 1 vật phẩm $\rightarrow$ Cập nhật Profile $\rightarrow$ Phát hiệu ứng chấn động vương giả (Golden Flash VFX).

---

## 4. Wireframe Văn Bản (Text-Based Wireframe)

### Popup Dùng Lệnh Hiệu Triệu (Summoning Decree Activation Modal)
```text
+-------------------------------------------------------------------+
|                     KÍCH HOẠT LỆNH HIỆU TRIỆU                     |
+-------------------------------------------------------------------+
|                                                                   |
|                   [👑 ICON LỆNH HIỆU TRIỆU]                       |
|                   Tên: Lệnh Hiệu Triệu Hoàng Kim                  |
|                   Phẩm chất: Bảo Vật Trấn Quốc                    |
|                                                                   |
|  ---------------------------------------------------------------  |
|                                                                   |
|   Công dụng: Tăng vĩnh viễn +1 Vị Trí Xuất Trận Hero Trên Map    |
|                                                                   |
|   Tiến trình:                                                     |
|       [ 7 Tướng Xuất Trận ]   =====>   [ 8 Tướng Xuất Trận ]      |
|       (Hiện tại)                       (Sau khi kích hoạt)        |
|                                                                   |
|   Đang sở hữu: 1 cái                                              |
|   Giới hạn đã dùng: 0/3 cái                                       |
|                                                                   |
|  * Lưu ý: Hiệu quả có giá trị vĩnh viễn trên toàn bộ màn chơi.    |
|                                                                   |
+-------------------------------------------------------------------+
|             [ ĐÓNG LẠI ]           |      [ XÁC NHẬN MỞ KHÓA ]    |
+-------------------------------------------------------------------+
```

---

## 5. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type SummoningDecreeConfig = {
  itemId: 'item_lenh_hieu_trieu';
  maxAllowedPerAccount: number; // Mặc định: 3 cái
};

export type SummoningDecreeUseResult = {
  success: boolean;
  newUnlockedSlots: number;
  totalDecreesUsed: number;
  remainingDecreesInInventory: number;
  errorMessage?: string;
};
```

* **Action Callback cần cung cấp**:
  * `onUseSummoningDecree(): SummoningDecreeUseResult`

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Chặn vượt trần (Cap Overflow Check)**: Nếu người chơi đã đạt mức trần Lệnh Hiệu Triệu cho phép (`usedDecrees >= maxAllowed`), nút Sử Dụng phải chuyển sang trạng thái Disable và hiển thị: *"Đã đạt giới hạn sử dụng Lệnh Hiệu Triệu tối đa!"*.
* **Bảo toàn giao dịch**: Vì đây là vật phẩm cực kỳ giá trị, giao dịch phải được ghi nhận ngay vào hệ thống Save State đồng bộ.

---

## 7. Quyết Định Còn Mở (Open Decisions)
1. **Nguồn phân phối Lệnh Hiệu Triệu**: Được tặng qua mốc cốt truyện hoàn thành Chapter 1/2/3, hay bán trong tiệm KNB giới hạn 1 cái/tháng?
2. **Hiệu ứng đồ họa**: Có thêm hoạt cảnh hiệu triệu đặc biệt khi mở rộng slot hay dùng popup tiêu chuẩn?
