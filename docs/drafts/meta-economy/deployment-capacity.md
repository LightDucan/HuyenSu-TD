# Giới Hạn Triển Khai Hero (Deployment Capacity & Slot Limit)

## 1. Yêu Cầu Đã Khóa (Locked Rules)
Hệ thống giới hạn số lượng Hero xuất trận (Deployment Capacity) tuân thủ các quy tắc sau:
1. **Giới hạn cơ bản (Base Capacity - LOCKED)**: **Cố định 7 Hero xuất trận** là mức trần cơ bản ban đầu cho toàn bộ tài khoản.
2. **Mở rộng qua Cấp người chơi (Player Level)**: Cơ chế và công thức tăng thêm slot khi tài khoản thăng cấp là **OPEN** (chờ Game Design & Codex phê duyệt).
3. **Mở rộng vĩnh viễn qua Lệnh Hiệu Triệu (LOCKED)**: Sử dụng vật phẩm đặc biệt *Lệnh Hiệu Triệu* tăng trực tiếp **+1 Slot xuất trận vĩnh viễn** cho tài khoản.
4. **Quy tắc di chuyển Hero (Reposition - LOCKED)**: Việc nhấc và di chuyển một Hero đang có mặt trên sân sang vị trí ô đặt khác **hoàn toàn không tiêu tốn thêm giới hạn triển khai**.
5. **Mức trần thực tế (Absolute Map Cap - LOCKED)**: Tổng số Hero tối đa được phép đặt trên bản đồ **không bao giờ được vượt quá tổng số ô đặt (Placement Tiles)** của bản đồ đó.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)
* **Module Quản Lý Triển Khai (Placement Management — Codex xác nhận)**: Cần cập nhật `maxSlots` theo công thức động:
  $$\text{EffectiveLimit} = \min(\text{PlayerDeploymentCapacity}, \text{MapPlacementTilesCount})$$
* **Trạng Thái Hồ Sơ Người Chơi (Player Profile State — Codex xác nhận)**: Lưu trữ tổng số slot đã mở khóa (`unlockedDeploymentSlots`).
* **Giao Diện Điều Khiển (Bottom Player HUD — Tab Đội Hình)**: Hiển thị bộ đếm tướng đã đặt (`placedCount / effectiveLimit`).

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Hiển thị trên Tab Đội Hình**:
   * Tiêu đề góc phải Tab: `Triển khai: 4 / 7 Tướng`.
   * Các ô Hero:
     * Ô 1 đến 7: Đã mở khóa, sẵn sàng gán tướng.
     * Ô thứ 8 trở đi (nếu chưa mở): Hiển thị icon Ổ Khóa màu xám kèm nhãn *"Mở bằng Lệnh Hiệu Triệu / Cấp Người Chơi"*.
2. **Hành vi kéo thả / đặt tướng**:
   * Khi `placedCount < effectiveLimit`: Cho phép nhấp chọn tướng trong Deck và đặt lên bất kỳ ô trống hợp lệ nào trên Map.
   * Khi `placedCount >= effectiveLimit`: Nếu nhấp vào một tướng chưa ra trận, hệ thống hiển thị cảnh báo: *"Đã đạt giới hạn triển khai (X/X tướng)! Hãy thu hồi hoặc di chuyển tướng hiện có."*.
   * Khi chọn tướng **đang có trên sân**: Người chơi nhấp vào ô trống khác $\rightarrow$ Thực hiện di chuyển vị trí (Reposition) thành công mà không bị chặn bởi giới hạn slot.

---

## 4. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type DeploymentCapacityData = {
  baseCapacity: 7; // Cố định 7 (LOCKED)
  bonusFromLevel: number; // Mở rộng theo Cấp (OPEN)
  bonusFromDecrees: number; // Số Lệnh Hiệu Triệu đã dùng (+1 mỗi cái - LOCKED)
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
1. **Công thức mở rộng Slot theo Cấp người chơi (Player Level)**: Các mốc Cấp độ mở thêm slot và số lượng slot cộng thêm từ Player Level (OPEN — chờ Game Design & Codex phê duyệt).
2. **Số lượng ô Placement Tiles chuẩn trên Map**: Số lượng ô đặt chuẩn theo từng Chapter/Bản đồ (OPEN).
3. **Mức trần tối đa của Lệnh Hiệu Triệu**: Người chơi có thể sử dụng tối đa bao nhiêu Lệnh Hiệu Triệu cho một tài khoản (OPEN — phải $\le$ tổng số ô đặt của bản đồ)?
