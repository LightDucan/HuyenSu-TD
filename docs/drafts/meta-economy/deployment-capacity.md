# Giới Hạn Triển Khai Hero (Deployment Capacity & Slot Limit)

## 1. Yêu Cầu Đã Khóa (Locked Rules)
Hệ thống giới hạn số lượng Hero xuất trận (Deployment Capacity) tuân thủ các quy tắc sau:
1. **Giới hạn cơ bản**: Dự kiến bắt đầu ở mức **7 Hero** (hoặc mở khóa từng bước đạt 7 Hero).
2. **Nâng cấp giới hạn qua Cấp người chơi (Player Level)**: Đạt các mốc Cấp độ tài khoản chỉ định sẽ mở rộng thêm vị trí xuất trận.
3. **Mở rộng vĩnh viễn qua Lệnh Hiệu Triệu**: Sử dụng vật phẩm đặc biệt *Lệnh Hiệu Triệu* tăng trực tiếp **+1 Slot xuất trận vĩnh viễn** cho tài khoản.
4. **Quy tắc di chuyển Hero (Reposition)**: Việc nhấc và di chuyển một Hero đang có mặt trên sân sang vị trí ô đặt khác **hoàn toàn không tiêu tốn thêm giới hạn triển khai**.
5. **Mức trần thực tế (Absolute Map Cap)**: Tổng số Hero tối đa được phép đặt trên bản đồ **không bao giờ được vượt quá tổng số ô đặt (Placement Tiles)** của bản đồ đó.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **PlacementManager (`src/game/placement/PlacementManager.ts`)**: Cần cập nhật `maxSlots` theo công thức động:
  $$\text{EffectiveLimit} = \min(\text{PlayerDeploymentCapacity}, \text{MapPlacementTilesCount})$$
* **PlayerProfileState**: Lưu trữ tổng số slot đã mở khóa (`unlockedDeploymentSlots`).
* **BottomPlayerHUD (Tab Đội Hình)**: Hiển thị bộ đếm tướng đã đặt (`placedCount / effectiveLimit`).

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Hiển thị trên Tab Đội Hình**:
   * Tiêu đề góc phải Tab: `Triển khai: 4 / 7 Tướng`.
   * Các ô Hero:
     * Ô 1 đến 7: Đã mở khóa, sẵn sàng gán tướng.
     * Ô thứ 8 trở đi (nếu chưa mở): Hiển thị icon Ổ Khóa màu xám kèm nhãn *"Mở bằng Lệnh Hiệu Triệu / Cấp 25"*.
2. **Hành vi kéo thả / đặt tướng**:
   * Khi `placedCount < effectiveLimit`: Cho phép nhấp chọn tướng trong Deck và đặt lên bất kỳ ô trống hợp lệ nào trên Map.
   * Khi `placedCount >= effectiveLimit`: Nếu nhấp vào một tướng chưa ra trận, hệ thống hiển thị cảnh báo: *"Đã đạt giới hạn triển khai (X/X tướng)! Hãy thu hồi hoặc di chuyển tướng hiện có."*.
   * Khi chọn tướng **đang có trên sân**: Người chơi nhấp vào ô trống khác $\rightarrow$ Thực hiện di chuyển vị trí (Reposition) thành công mà không bị chặn bởi giới hạn slot.

---

## 4. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type DeploymentCapacityData = {
  baseCapacity: number; // Mặc định: 7
  bonusFromLevel: number;
  bonusFromDecrees: number; // Số Lệnh Hiệu Triệu đã dùng
  totalUnlockedCapacity: number; // base + level + decrees
};
```

* **Logic xác thực phía Core**:
  ```ts
  function canDeployNewHero(placedHeroesCount: number, capacity: DeploymentCapacityData, mapTileCount: number): boolean {
    const maxAllowed = Math.min(capacity.totalUnlockedCapacity, mapTileCount);
    return placedHeroesCount < maxAllowed;
  }
  ```

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Xung đột khi Map nhỏ**: Nếu người chơi đã mở khóa 7 slot, nhưng Map chỉ có 6 ô Placement Tiles, hệ thống phải tự động gán trần là 6 để tránh lỗi kéo thả vào vị trí không hợp lệ.
* **Xử lý Collision khi đặt đè**: Khi di chuyển tướng A vào ô đang có tướng B, hệ thống thực hiện thu hồi tướng B về Deck và đặt tướng A vào ô đó (giữ nguyên tổng số tướng trên sân).

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Số lượng ô Placement Tiles chuẩn trên Map**: Map chuẩn ở các Chapter có bao nhiêu ô đặt tướng (ví dụ: 8, 10 hay 12 ô)?
2. **Mức trần tối đa của Lệnh Hiệu Triệu**: Người chơi có thể sử dụng tối đa bao nhiêu Lệnh Hiệu Triệu cho một tài khoản (ví dụ: tối đa 3 lần, nâng trần từ 7 lên 10)?
