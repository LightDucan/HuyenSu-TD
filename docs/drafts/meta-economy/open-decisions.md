# Tổng Hợp Quyết Định Còn Mở & Rủi Ro Kỹ Thuật (Open Decisions — META-A00)

## 1. Bảng Tổng Hợp Thông Số & Quyết Định Còn Mở (Open Parameters Matrix)

| Hệ Thống | Thông Số / Quyết Định Còn Mở | Đề Xuất Khảo Sát | Trạng Thái & Ghi Chú |
|---|---|---|---|
| **1. Gacha Gold** | Giá quay 1x và 10x | • 1,000 Vàng / 9,000 Vàng<br>• 2,000 Vàng / 18,000 Vàng | **Chờ Game Design & Codex chốt** (phải cân đối với lượng Vàng kiếm được sau 10 Wave). |
| **2. Gacha Gold** | Bảng tỷ lệ xuất hiện (Drop Rates) | • Vàng: 25%<br>• Vũ Khí Lv1: 20%<br>• Ngọc Lv1: 20%<br>• Tiểu Binh Phù (+1): 20%<br>• Trung Binh Phù (+5): 10%<br>• Đại Binh Phù (+10): 5% | **Chờ Game Design & Codex chốt**. |
| **3. Gacha Gold** | Lượng Vàng trả lại khi trúng ô Vàng | • Trả lại 50% giá quay<br>• Trả lại 100% (Hoàn tiền)<br>• Trúng rương lớn: x3 - x5 giá quay | **Chờ Game Design & Codex chốt**. |
| **4. Gacha Gold** | Cơ chế bảo hiểm (Pity) | • Đảm bảo 1 Trang bị sau mỗi 10 lượt quay<br>• Đảm bảo 1 Đại Binh Phù sau mỗi 20 lượt quay<br>• Không có bảo hiểm (thuần RNG) | **Chờ Game Design & Codex chốt**. |
| **5. Equipment** | Bảng chỉ số Flat Bonus chuẩn (Lv1 – Lv10) | • Lv.1: ATK+15, Range+10, ASPD+0.05<br>• Lv.2: ATK+28, Range+18, ASPD+0.09<br>• ... Lv.10: ATK+200, Range+120, ASPD+0.60 | **Chờ Game Design & Codex chốt** (Tuyệt đối không dùng % cho Equipment thường). |
| **6. Equipment** | Phí Vàng khi ghép 3 $\rightarrow$ 1 | • Tuyến tính: $100 \times \text{Level}$<br>• Cố định: 300 Vàng/lần ghép<br>• Miễn phí ghép (0 Vàng) | **Chờ Game Design & Codex chốt**. |
| **7. Deployment** | Mốc Cấp người chơi tăng thêm Slot Hero | • Cấp 15: Mở Slot 6 $\rightarrow$ Cấp 30: Mở Slot 7<br>• Mở sẵn 7 Slot từ đầu, Lệnh Hiệu Triệu mở lên 8, 9, 10 | **Chờ Game Design & Codex chốt**. |
| **8. Lệnh Hiệu Triệu** | Mức trần tối đa sử dụng cho 1 tài khoản | • Tối đa 3 cái (tăng từ 7 lên 10 Hero)<br>• Tối đa 5 cái (tăng từ 7 lên 12 Hero) | **Chờ Game Design & Codex chốt** (Phải $\le$ tổng số ô đặt của Map). |
| **9. Quân Lệnh** | Mức trần Overflow tối đa | • Tối đa 999 Quân Lệnh<br>• Tối đa 9,999 Quân Lệnh<br>• Không giới hạn trần | **Chờ Game Design & Codex chốt**. |
| **10. Hành Trang** | Dung lượng ô chứa tối đa (Inventory Slots) | • 50 ô (có thể mở rộng bằng Vàng/KNB)<br>• 100 ô cố định<br>• Không giới hạn số ô chứa | **Chờ Game Design & Codex chốt**. |

---

## 2. Rủi Ro Kỹ Thuật & Ràng Buộc Kiến Trúc (Architecture Constraints)

1. **Nguyên tắc "Không Game Logic tại React UI"**:
   * *Rủi ro*: React component tự sinh số ngẫu nhiên Gacha bằng `Math.random()`, tự tính toán chỉ số ghép đồ `flatBonus * 2`, hoặc tự tăng Quân Lệnh khi bấm nút Binh Phù.
   * *Ràng buộc*: Toàn bộ mutation state phải được xử lý và xác thực tại Domain Modules của Codex. UI chỉ phát sinh Request Actions và lắng nghe Event / State Snapshot trả về để hiển thị.

2. **Ranh giới Game Clock vs Real-time Timestamp**:
   * *Rủi ro*: Hệ thống hồi phục Quân Lệnh (2 phút / 1 điểm) bị tua nhanh $3\times$ khi người chơi bật tốc độ $3\times$ trong Battle Scene.
   * *Ràng buộc*: Timer hồi thể lực phải tách biệt hoàn toàn khỏi Battle Game Clock, sử dụng `performance.now()` hoặc Unix timestamp thời gian thực.

3. **Toàn vẹn dữ liệu khi ghép đồ và mở rương**:
   * *Rủi ro*: Lỗi duplicate item hoặc mất item nếu người chơi spam nhấp chuột nút Ghép Đồ hoặc Chiêu Mộ khi mạng/máy tính bị lag.
   * *Ràng buộc*: UI phải khóa nút (Debounce / Loading State) ngay khi phát request đầu tiên cho đến khi nhận kết quả phản hồi từ Core.

---

## 3. Lộ Trình Phối Hợp Đề Xuất (Next Steps for Codex & Antigravity)

* **Bước 1 (Codex)**: Đánh giá tài liệu thiết kế META-A00, phê duyệt các mốc thông số trong bảng quyết định mở.
* **Bước 2 (Codex)**: Xây dựng các Domain Services cốt lõi:
  * `WalletService` (Quản lý Vàng, KNB, Quân Lệnh, logic 2 phút hồi điểm, xử lý Overflow).
  * `InventoryService` (Quản lý kho đồ, Binh Phù, Lệnh Hiệu Triệu, logic ghép 3 $\rightarrow$ 1).
  * `GachaResolver` (Xử lý Pool Gacha Gold, Seeded RNG, Drop Table).
* **Bước 3 (Antigravity)**: Hiện thực hóa giao diện React UI (Header Wallet, Bottom Bar 2 Tab, Merge Modal, Batch Use Modal, Gacha Screen) tích hợp trực tiếp với Callbacks của Codex.
