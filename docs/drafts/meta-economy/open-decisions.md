# Tổng Hợp Quyết Định Còn Mở & Rủi Ro Kỹ Thuật (Open Decisions — META-A00)

## 1. Bảng Tổng Hợp Quyết Định Cần Phê Duyệt (Open Decisions Matrix)

| Hệ Thống | Câu Hỏi Thiết Kế / Quyết Định Mở | Các Lựa Chọn Đề Xuất | Tác Động & Lưu Ý |
|---|---|---|---|
| **1. Player Profile** | Công thức tăng trưởng Exp tài khoản (`expToNextLevel`) | • Tuyến tính: $1000 \times Level$<br>• Hàm mũ: $500 \times Level^{1.4}$ | Quyết định tốc độ thăng cấp và nhịp độ mở khóa tính năng của người chơi. |
| **2. Currencies** | Số lượng tiền tệ tối đa (Wallet Caps) | • Có giới hạn theo Cấp người chơi<br>• Không giới hạn tích lũy (Uncapped) | Có giới hạn giúp ngăn ngừa tích trữ quá nhiều vàng ở đầu game. |
| **3. Command Energy** | Chu kỳ hồi phục Thể lực tự nhiên | • 1 điểm / 3 phút (20 điểm/giờ)<br>• 1 điểm / 5 phút (12 điểm/giờ)<br>• 1 điểm / 8 phút (7.5 điểm/giờ) | Ảnh hưởng trực tiếp đến thời lượng phiên chơi (Session Length) mỗi ngày. |
| **4. Command Energy** | Hoàn trả Thể lực khi thua trận (Defeat Policy) | • Mất 100% chi phí vào màn<br>• Hoàn trả 50% chi phí<br>• Chỉ mất 1 Thể lực an ủi | Hoàn trả một phần giúp giảm ức chế cho người chơi khi thử nghiệm chiến thuật. |
| **5. Deployment Limit** | Mốc cấp độ mở khóa 5 Slot Hero | • Cấp 1 (Slot 1-2) $\rightarrow$ Cấp 5 (Slot 3) $\rightarrow$ Cấp 12 (Slot 4) $\rightarrow$ Cấp 20 (Slot 5)<br>• Cấp 1 $\rightarrow$ 3 $\rightarrow$ 6 $\rightarrow$ 10 $\rightarrow$ 15 | Cần cân đối với độ khó của các Chapter 1, 2, 3. |
| **6. Equipment Upgrade** | Tỷ lệ thành công khi cường hóa | • 100% thành công (chỉ tăng chi phí Vàng)<br>• Tỷ lệ giảm dần theo cấp (không rớt cấp)<br>• Tỷ lệ giảm dần + có rớt cấp | 100% thành công là lựa chọn an toàn, thân thiện nhất cho giai đoạn đầu. |
| **7. Gold Gacha** | Bảng tỷ lệ rơi (Drop Rate Table) | • Common: 70%, Rare: 22%, Epic: 7%, Legendary: 1%<br>• Common: 60%, Rare: 30%, Epic: 9%, Legendary: 1% | Cần phù hợp với nền kinh tế Vàng kiếm được từ chiến dịch. |
| **8. Gold Gacha** | Cơ chế bảo hiểm (Pity Counter) | • Đảm bảo 1 Rare+ sau 10 lần quay<br>• Đảm bảo 1 Epic sau 30 lần quay<br>• Không có bảo hiểm (thuần RNG) | Có bảo hiểm giúp tạo mục tiêu tích lũy rõ ràng cho người chơi. |

---

## 2. Rủi Ro Kỹ Thuật & Ràng Buộc Kiến Trúc (Architecture Constraints)

1. **Nguyên tắc "Không Game Logic tại React UI"**:
   * *Rủi ro*: React component tự tính toán số dư tiền, tự quyết định tỷ lệ Gacha bằng `Math.random()`, hoặc tự tăng cấp độ khi người chơi bấm nút.
   * *Ràng buộc*: Toàn bộ mutation state phải đi qua Service của Domain. UI chỉ phát sinh Request Actions (`requestUpgrade`, `requestGachaPull`) và lắng nghe Event / State Snapshot trả về.

2. **Đồng bộ hóa Save State (Meta vs Hero Progression)**:
   * *Rủi ro*: Bất đồng bộ dữ liệu nếu lưu `player_profile`, `hero_progression`, `equipment_state`, `wallet_state` ở các key riêng lẻ không có cơ chế migration phiên bản.
   * *Ràng buộc*: Cần thiết kế một cấu trúc `GameSaveDataV1` đồng nhất bao bọc toàn bộ các phân vùng dữ liệu meta và progression.

3. **Chống thao túng đồng hồ hệ thống (Anti-clock tampering)**:
   * *Rủi ro*: Người chơi tua nhanh thời gian trên máy tính để hồi phục Thể Lực tức thì.
   * *Ràng buộc*: Cần cơ chế kiểm tra tính liên tục của mốc thời gian lưu trữ (`lastKnownTimestamp`), chặn hồi phục nếu phát hiện thời gian hiện tại nhỏ hơn thời gian lưu lần trước.

---

## 3. Kế Hoạch Đề Xuất Các Bước Tiếp Theo (Proposed Roadmap)

* **Bước 1 (Codex)**: Đánh giá và phê duyệt các mốc thông số trong bảng quyết định mở.
* **Bước 2 (Codex)**: Xây dựng Meta Domain Modules (`PlayerProfileService`, `WalletService`, `GachaResolver`).
* **Bước 3 (Antigravity)**: Thiết kế giao diện UI React (Shop/Gacha Modal, Profile Screen, Top Header Currencies Bar, Level Up Screen) kết nối với các Callback chính thức từ Codex.
