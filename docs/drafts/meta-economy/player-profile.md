# Hồ Sơ Người Chơi (Player Profile & Account Progression)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
* **Cấp độ tài khoản (Player Level)**: Đại diện cho tiến trình tổng thể của người chơi (khác với cấp độ riêng của từng Hero).
* **Kinh nghiệm tài khoản (Player Exp)**: Tích lũy thông qua việc hoàn thành các màn chơi, vượt Wave, hoặc tiêu hao Thể Lực.
* **Thông tin định danh**: Tên người chơi, Avatar (chọn từ Hero sở hữu), Danh hiệu đạt được.
* **Mở khóa theo cấp**: Cấp người chơi quyết định giới hạn Thể lực tối đa (`maxCommandEnergy`) và số lượng vị trí Hero tối đa được phép đặt trên bản đồ (`maxDeployableHeroes`).
* **Lưu trữ tiến trình**: Đồng bộ trong hệ thống Save State của tài khoản (Meta Save Store).

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Save/Load System**: Cần một layer quản lý Meta Save Store độc lập hoặc bao bọc ngoài `HeroProgressionState`.
* **Battle Bridge / End-Game Handler**: Nhận kết quả từ Battle (số Wave vượt qua, thời gian trụ) để phân bổ Player Exp tương ứng.
* **BottomPlayerHUD & Main Menu UI**: Đọc snapshot `PlayerProfileState` để hiển thị Avatar, Level, Thanh tiến trình Exp.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Hiển thị thường trực**:
   * Trên Header / BottomPlayerHUD: Avatar tròn, Cấp độ hiện tại, Thanh Exp (% tiến độ đến cấp kế tiếp).
2. **Modal Hồ Sơ (Player Profile Modal)**:
   * Mở khi nhấp vào Avatar người chơi trên HUD/Menu.
   * Hiển thị: Tên người chơi, Cấp độ, Exp hiện tại / Exp yêu cầu, Số màn đã vượt, Số Hero đã sở hữu, Giới hạn xuất trận hiện tại.
   * Chức năng: Đổi Avatar (danh sách các Hero đã mở khóa).
3. **Màn hình Thăng Cấp (Level Up Pop-up)**:
   * Kích hoạt tự động sau khi kết thúc trận đấu nếu tích lũy đủ Exp.
   * Hiển thị: Cấp cũ $\rightarrow$ Cấp mới; Các quyền lợi mở khóa mới (Ví dụ: "+1 Vị trí xuất trận Hero", "+10 Thể Lực tối đa", "Hồi đầy Thể Lực").

---

## 4. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type PlayerProfileState = {
  playerId: string;
  displayName: string;
  avatarHeroId: string;
  level: number;
  currentExp: number;
  expToNextLevel: number;
  unlockedDeploymentSlots: number; // 1 đến 5
  stats: {
    totalBattlesPlayed: number;
    totalWavesCleared: number;
    highestChapterId: string;
  };
  createdAt: number;
  lastLoginAt: number;
};
```

* **Action Callbacks cần cung cấp**:
  * `onGainPlayerExp(amount: number): { newLevel: number; didLevelUp: boolean; rewards?: any }`
  * `onUpdateProfile(updates: Partial<Pick<PlayerProfileState, 'displayName' | 'avatarHeroId'>>): void`

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Rủi ro xung đột Save**: Nếu lưu Player Profile và Hero Progression vào các key rời rạc trong `localStorage`, có thể gây bất đồng bộ trạng thái khi reset game hoặc load bản lưu cũ.
* **Ràng buộc UI**: UI không được tự tính `currentExp >= expToNextLevel` để tự tăng cấp độ; việc tăng cấp phải được xác thực và cấp phát hoàn toàn từ Domain Service.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Đường cong kinh nghiệm (Exp Curve)**: Công thức tăng trưởng Exp yêu cầu cho mỗi cấp là tuyến tính ($Exp = Base \times Level$) hay hàm mũ ($Exp = Base \times Level^{1.5}$)?
2. **Giới hạn cấp độ tối đa (Max Player Level)**: Cấp độ tối đa của tài khoản ở giai đoạn V1 là bao nhiêu (Level 50 hay Level 100)?
3. **Phần thưởng thăng cấp cụ thể**: Mỗi lần thăng cấp ngoài tăng Thể lực tối đa có thưởng thêm Vàng/Lương thực hay không?
