# Giới Hạn Xuất Trận (Deployment Limit & Slot Unlocks)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
* **Khái niệm**: Số lượng Hero tối đa được phép triển khai đồng thời trên bản đồ trong một trận đấu (`maxDeployableHeroes`).
* **Tiến trình mở khóa**:
  * Người chơi mới bắt đầu với số slot giới hạn (ví dụ: 1 hoặc 2 Hero).
  * Tăng dần số lượng slot mở khóa thông qua việc tăng Cấp người chơi (Player Level) hoặc nâng cấp Công trình Doanh trại ngoài Meta.
  * Tối đa đạt **5 Hero** (tương thích hoàn toàn với hệ thống Multi-Hero Placement hiện có của Core).
* **Trạng thái Deck vs Bản đồ**: Người chơi có thể sở hữu nhiều Hero, nhưng chỉ được đưa vào Deck và đặt lên Map số lượng tướng không vượt quá giới hạn đã mở khóa.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **PlacementManager (`src/game/placement/PlacementManager.ts`)**: Cần nhận giá trị `maxSlots` động từ snapshot hồ sơ người chơi thay vì cố định giá trị 5.
* **BottomPlayerHUD**: Hiển thị trạng thái các slot Hero khả dụng và các slot còn đang bị khóa.
* **PlayerProfileState**: Lưu trữ trường `unlockedDeploymentSlots` (từ 1 đến 5).

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **BottomPlayerHUD trong trận**:
   * Hiển thị 5 ô Hero:
     * *Ô đã mở khóa & có tướng*: Hiển thị avatar Hero, trạng thái Đang trên sân / Trong tay.
     * *Ô đã mở khóa & chưa gán tướng*: Hiển thị dấu `+` để chọn thêm tướng từ bộ sưu tập.
     * *Ô bị khóa*: Hiển thị biểu tượng Ổ Khóa màu xám kèm nhãn *"Mở ở Cấp X"*.
2. **Khi người chơi cố gắng kéo/đặt Hero vượt quá giới hạn**:
   * Hệ thống từ chối thao tác và phát cảnh báo Toast: *"Đã đạt giới hạn xuất trận (X/X tướng). Hãy nâng cấp tài khoản để mở thêm vị trí!"*.

---

## 4. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type DeploymentSlotConfig = {
  slotIndex: number; // 0 đến 4 (Tổng 5 slot)
  requiredPlayerLevel: number;
  unlockCost?: { gold?: number; food?: number };
};

export const DEFAULT_DEPLOYMENT_UNLOCK_TABLE: DeploymentSlotConfig[] = [
  { slotIndex: 0, requiredPlayerLevel: 1 },  // Slot 1: Luôn mở
  { slotIndex: 1, requiredPlayerLevel: 1 },  // Slot 2: Mở từ đầu hoặc Level 3
  { slotIndex: 2, requiredPlayerLevel: 5 },  // Slot 3: Cấp 5
  { slotIndex: 3, requiredPlayerLevel: 10 }, // Slot 4: Cấp 10
  { slotIndex: 4, requiredPlayerLevel: 20 }, // Slot 5: Cấp 20
];
```

* **Contract tích hợp với Bridge**:
  * `BattleBridge.setDeploymentLimit(maxSlots: number): void`
  * `BattleBridge.getDeploymentStatus(): { currentPlaced: number; maxAllowed: number }`

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Rủi ro không đồng bộ giữa UI và Placement Core**: Nếu UI hiển thị 4 slot nhưng `PlacementManager` trong Phaser lại kiểm tra theo hard-code 5 slot, người chơi có thể bypass giới hạn bằng phím tắt hoặc thao tác kéo thả trực tiếp.
* **Ràng buộc Domain**: Mọi quyết định hợp lệ về số lượng tướng trên sân phải được chặn ngay tại `PlacementManager.canPlace()` của Core.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Mốc cấp độ mở slot chính xác**: Cần thống nhất bảng mốc cấp độ mở khóa cho 5 slot (ví dụ: Slot 1-2 mở sẵn ở Lv 1; Slot 3: Lv 5; Slot 4: Lv 12; Slot 5: Lv 20).
2. **Chi phí mở slot**: Mở slot là tự động hoàn toàn khi đạt cấp, hay đạt cấp xong phải tiêu tốn thêm Vàng để tu sửa doanh trại?
3. **Giới hạn số tướng theo Chapter**: Một số màn chơi thử thách đặc biệt có bị ép cứng số lượng tướng xuất trận (ví dụ: Màn ải giới hạn chỉ cho dùng tối đa 2 Hero) hay không?
