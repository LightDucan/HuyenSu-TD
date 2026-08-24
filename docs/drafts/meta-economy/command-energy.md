# Hệ Thống Thể Lực / Lực Lệnh (Command Energy / Stamina)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
* **Khái niệm**: Lực Lệnh (Command Energy) là tài nguyên thể lực giới hạn số lượt tham chiến, ngăn ngừa lạm phát farm màn chơi quá nhanh và tạo nhịp độ chơi bền vững.
* **Chi phí vào màn (Entry Cost)**: Mỗi lần bắt đầu một màn chơi chiến dịch hoặc phó bản sẽ tiêu hao một lượng Lực Lệnh cố định (ví dụ: 5 hoặc 10 điểm).
* **Cơ chế hồi phục tự động**: Tự động hồi phục 1 điểm Lực Lệnh sau mỗi khoảng thời gian $T$ giây/phút thực tế (kể cả khi tắt game).
* **Giới hạn dung lượng**: Điểm Lực Lệnh tối đa (`maxEnergy`) tăng dần theo Cấp độ người chơi (`PlayerLevel`).

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Real-time Clock Service**: Dùng đồng hồ thời gian thực (Timestamp) để tính lượng thể lực hồi phục khi người chơi đăng nhập lại (Offline Energy Calculation).
* **Stage Gatekeeper**: Kiểm tra `currentEnergy >= stageCost` trước khi cho phép khởi tạo Phaser Battle Scene.
* **PlayerProfileState**: Chứa dữ liệu Lực Lệnh và mốc thời gian hồi phục gần nhất.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Hiển thị thường trực trên Header**:
   * Icon Lực Lệnh (Biểu tượng Lệnh Bài hoặc Tia Sét).
   * Text: `75 / 100`.
   * Khi chưa đầy: Hiển thị tooltip hoặc đếm ngược thời gian nhỏ bên dưới: *"Hồi 1 điểm sau: 03:45"*.
2. **Luồng Chọn Màn Chơi (Stage Selection)**:
   * Trên nút "Xuất Trận": Hiển thị rõ chi phí: `[Icon Lực Lệnh] 5 Xuất Trận`.
   * *Nếu đủ Lực Lệnh*: Trừ điểm ngay khi bắt đầu $\rightarrow$ Chuyển vào Battle Scene.
   * *Nếu không đủ Lực Lệnh*: Nút chuyển xám hoặc khi bấm hiện Modal: *"Không đủ Lực Lệnh! Cần 5 điểm, hiện có 2 điểm. Bạn có muốn dùng Vật phẩm Lương Khô để hồi phục không?"*.

---

## 4. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type CommandEnergyState = {
  current: number;
  max: number;
  lastRegenTimestamp: number; // Unix timestamp tính bằng miliseconds
  regenIntervalSeconds: number; // Thời gian hồi 1 điểm (ví dụ: 300s = 5 phút)
};
```

* **Phương thức và Callback cần cung cấp**:
  * `calculateCurrentEnergy(state: CommandEnergyState, currentTimestamp: number): { currentEnergy: number; secondsToNextRegen: number }`
  * `consumeEnergy(amount: number): { success: boolean; remainingEnergy: number }`
  * `refillEnergy(amount: number): { newEnergy: number }`

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Rủi ro chỉnh giờ hệ thống (Client Clock Manipulation)**: Nếu lưu trữ thuần túy ở local và dùng `Date.now()` của máy người dùng, người chơi có thể tua đồng hồ hệ điều hành để hồi đầy thể lực. 
  * *Giải pháp tạm thời cho Client-only*: Ghi nhận `lastSavedTimestamp`, nếu `currentTimestamp < lastSavedTimestamp` (phát hiện quay ngược giờ) thì dừng tính hồi phục.
* **Tách biệt với Game Clock**: Game Clock trong Battle Scene (x1, x3, pause) hoàn toàn độc lập và không được làm sai lệch thời gian hồi Thể Lực ngoài Meta.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Thời gian hồi phục chuẩn**: Chu kỳ hồi 1 điểm Lực Lệnh là bao nhiêu phút (3 phút, 5 phút, hay 10 phút)?
2. **Xử lý khi thất bại màn chơi (Defeat Refund)**: Nếu người chơi thua trận giữa chừng, có được hoàn lại một phần Lực Lệnh (ví dụ hoàn 50%) hay mất toàn bộ chi phí vào màn?
3. **Vật phẩm hồi phục**: Có thiết kế các bình Lương Khô / Lệnh Bài Hồi Phục để dùng khi hết thể lực không?
