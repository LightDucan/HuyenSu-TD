# Thiết Kế Kinh Tế Meta (Meta Economy Design Draft — META-A00)

## 1. Tổng Quan & Mục Tiêu Kiến Trúc

Tài liệu này đặc tả bản nháp kiến trúc hệ thống Kinh Tế Meta (Out-of-run Meta Economy) cho dự án **Huyền Sử TD**. Hệ thống Meta phụ trách toàn bộ vòng lặp phát triển của người chơi bên ngoài trận đấu, tạo động lực chơi lâu dài và gắn kết chặt chẽ với hệ thống Hero Progression & Equipment hiện có.

### 1.1. Nguyên Tắc Ranh Giới Kiến Trúc (Architecture Boundaries)
* **Tách biệt hoàn toàn Out-of-run vs In-run**:
  * **Domain Combat Core (In-run)**: Quản lý Game Clock, di chuyển quái fixed path, single-target attack, skill trigger theo số đòn, targeting và win/lose condition. Không xử lý thể lực hay số dư ví người chơi trong vòng lặp tick.
  * **Meta Economy (Out-of-run)**: Quản lý Player Profile (Cấp độ, Exp), Ví tiền tệ (Vàng, Lương thực, Bảo thạch), Thể lực (Command Energy), Nâng cấp trang bị, và Chiêu mộ (Gacha).
* **UI Thụ Động (Passive React UI)**:
  * Toàn bộ UI (React screens, modals, HUD) chỉ hiển thị snapshot dữ liệu và phát sinh hành động thông qua callback (`requestUpgrade`, `requestGachaPull`, `requestEnterStage`).
  * Tuyệt đối không tự tính toán công thức tỉ lệ, không tự trừ tiền hay ghi đè save state tại UI.
* **Quy tắc không tự chốt thông số**: Bản nháp ghi nhận các yêu cầu đã duyệt và các quyết định còn mở, không tự ý hard-code rate/cost chưa được duyệt vào hệ thống.

---

## 2. Cấu Trúc Tài Liệu Chi Tiết

Thư mục `docs/drafts/meta-economy/` bao gồm các chuyên đề thiết kế sau:

| Tài liệu | Nội dung trọng tâm |
|---|---|
| [player-profile.md](player-profile.md) | Hồ sơ người chơi, cấp độ (Player Level), Exp, và tiến trình mở khóa tính năng. |
| [currencies.md](currencies.md) | Hệ thống tiền tệ meta (Vàng, Lương thực/Lúa, Bảo thạch), luồng thu chi và quản lý ví. |
| [command-energy.md](command-energy.md) | Hệ thống Thể Lực / Lực Lệnh (Command Energy), chi phí vào màn và cơ chế hồi phục thời gian thực. |
| [deployment-limit.md](deployment-limit.md) | Cơ chế giới hạn số lượng Hero xuất trận (Deployment Slot Limit) theo cấp độ người chơi. |
| [equipment-upgrade.md](equipment-upgrade.md) | Quy trình nâng cấp / cường hóa Trang bị (Vũ khí, Ngọc), tiêu hao tài nguyên và tăng trưởng chỉ số. |
| [gacha-gold.md](gacha-gold.md) | Hệ thống Chiêu Mộ / Mở Rương bằng Vàng in-game, bảng tỷ lệ rơi và cơ chế bảo hiểm. |
| [open-decisions.md](open-decisions.md) | Bảng tổng hợp các quyết định còn mở, rủi ro kỹ thuật và danh sách câu hỏi cần chốt từ Codex & Game Design. |
