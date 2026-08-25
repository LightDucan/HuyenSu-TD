# Cơ Chế Tài Nguyên Quân Lệnh (Command Energy Resource Mechanics)

## 1. Yêu Cầu Đã Khóa (Locked Rules)
Hệ thống Quân Lệnh (Tài nguyên Thể lực / Energy Resource) tuân thủ chặt chẽ các quy tắc đã được chốt:
1. **Mức Giới hạn cơ bản (Base Max Energy - LOCKED)**: **60 Quân Lệnh** là mức trần thể lực cơ bản ban đầu của tài khoản.
2. **Chi phí khởi động Wave**: Tốn chính xác **1 Quân Lệnh** để bắt đầu mỗi Wave chiến đấu.
3. **Tốc độ hồi phục tự nhiên**:
   * Tự động hồi **1 điểm Quân Lệnh sau mỗi 2 phút thực** (120 giây thực tế).
   * **Tốc độ trận đấu x1 / x3 hoàn toàn không ảnh hưởng** đến thời gian hồi phục (luôn sử dụng đồng hồ thời gian thực ngoài trận).
4. **Cơ chế Tràn Điểm (Overflow)**:
   * **Cho phép Overflow vượt giới hạn**: Khi người chơi sử dụng vật phẩm (Tiểu Binh Phù, Trung Binh Phù, Đại Binh Phù), Quân Lệnh có thể vượt quá `maxCommandEnergy` (ví dụ: `75 / 60`).
5. **Quy tắc Ngừng & Khởi Động Lại Chu Kỳ Hồi Phục**:
   * **Khi Quân Lệnh hiện tại $\ge$ Giới hạn (`current >= max`)**: Hệ thống **ngừng hồi phục tự nhiên hoàn toàn**.
   * **Không tích lũy thời gian ngầm**: Trong suốt thời gian bị Overflow hoặc đầy điểm, bộ đếm thời gian (Timer) không chạy ngầm.
   * **Khi tiêu hao xuống dưới giới hạn (`current < max`)**: Bắt đầu lại một chu kỳ hồi phục mới đủ 120 giây từ đầu (Reset timer về 120s).
6. **Cơ chế Tự Động Chiến Đấu (Auto Wave)**:
   * Tính năng Auto Wave chỉ tự động trừ 1 Quân Lệnh để bắt đầu Wave kế tiếp nếu số dư Quân Lệnh $\ge 1$.
   * Nếu hết Quân Lệnh (`current = 0`), Auto Wave tự động tắt/tạm dừng và hiển thị thông báo.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)
* **Module Đồng Hồ Thời Gian Thực (Real-time Clock Service — Codex xác nhận)**: Theo dõi `lastTimestamp` để tính toán thời gian hồi phục khi đang mở game hoặc khi mở lại game (Offline recovery calculation).
* **Module Quản Lý Wave (Wave Manager — Codex xác nhận)**: Trước khi kích hoạt `startWave()`, kiểm tra điều kiện trừ 1 Quân Lệnh.
* **Bộ Điều Khiển Auto Wave (Auto Wave Controller — Codex xác nhận)**: Giao tiếp với Command Energy State để xác định có tiếp tục kích hoạt đợt quái tiếp theo hay không.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Trạng thái trên Thanh Header HUD**:
   * Khi `current < max`: Hiển thị `58 / 60 (01:45)` kèm thanh tiến độ tròn hoặc thanh ngang nhỏ bên dưới.
   * Khi `current >= max`: Hiển thị `60 / 60 (Đầy)` hoặc `75 / 60 (Ngừng hồi)` với màu vàng cam nổi bật.
2. **Nút Bắt Đầu Wave / Auto Wave**:
   * Nút `[Bắt Đầu Wave - 1 📜]`:
     * *Đủ điểm*: Nhấp nút $\rightarrow$ Trừ 1 Quân Lệnh $\rightarrow$ Bắt đầu Wave.
     * *Hết điểm*: Nút đổi sang màu đỏ $\rightarrow$ Nhấp vào mở Modal gợi ý: *"Không đủ Quân Lệnh! Bạn có muốn sử dụng Binh Phù từ Hành Trang để hồi phục không?"*.

---

## 4. UI Projection Contract

*Meta V1 chỉ lưu `current` và `regenAnchorAtMs`. Các trường `max` và thời gian đếm ngược dưới đây phải được selector tính từ Player Profile, thời gian thực và config; không được lưu thành schema song song.*

```ts
export type CommandEnergySnapshot = {
  current: number;
  max: number; // Base là 60 (LOCKED) + bonus từ Player Level (OPEN)
  regenIntervalSeconds: 120; // Cố định 2 phút = 120s
  currentRegenTimerSeconds: number; // Đếm ngược từ 120 về 0
  regenAnchorAtMs: number; // Đọc từ Meta V1
};
```

* **Logic tính toán cập nhật (Algorithm Specification)**:
  * Khi `current >= max`: `currentRegenTimerSeconds = 120`, không trừ timer.
  * Khi `current < max`: Sau mỗi giây thực tế, `currentRegenTimerSeconds -= 1`. Khi timer chạm 0 $\rightarrow$ `current += 1` và reset timer về 120s.
  * Khi người chơi tiêu hao từ `current >= max` xuống `current < max`: `currentRegenTimerSeconds = 120` (bắt đầu chu kỳ 2 phút mới).

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Tuyệt đối không gắn với Game Clock của Phaser**: Game Clock có thể tua nhanh $3\times$ hoặc Pause giữa trận; nếu timer hồi thể lực ăn theo Game Clock sẽ dẫn đến việc hồi thể lực sai lệch nghiêm trọng.
* **Chống gian lận Client Clock**: Khi tính toán thời gian offline, kiểm tra nếu `currentTimestamp < lastUpdatedTimestamp` (phát hiện chỉnh lùi giờ) thì không cộng điểm.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Công thức tăng Max Energy theo Cấp người chơi (Player Level)**: Base cap cố định 60 (LOCKED); công thức tăng thêm Max Energy khi lên cấp (mỗi cấp hay theo mốc cấp độ) là tham số mở (**OPEN**), chờ Game Design & Codex phê duyệt.
2. **Mức trần Overflow tối đa**: Có đặt mức trần chặn Overflow (ví dụ: tối đa 999) hay không giới hạn trần?
