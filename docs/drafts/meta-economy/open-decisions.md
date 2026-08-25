# Tổng Hợp Quyết Định Còn Mở & Rủi Ro Kỹ Thuật (Open Decisions — META-A00)

## 1. Bảng Tổng Hợp Thông Số & Quyết Định Còn Mở (Open Parameters Matrix)

> [!IMPORTANT]
> **Quy ước Placeholder & Ranh giới Quyết định**:
> - Các nội dung trong cột "Đề Xuất Khảo Sát / Placeholder" chỉ mang tính chất định hướng kiến trúc & giải pháp kỹ thuật, **tuyệt đối không phải số liệu balance thực tế và không dùng trực tiếp cho implementation** trước khi được Game Design & Codex phê duyệt.
> - Các cơ chế đã **LOCKED**: Base Deployment = 7 Hero, Lệnh Hiệu Triệu = +1 Slot vĩnh viễn, Base Quân Lệnh Cap = 60, KNB Source = 1 phút chơi + hoàn thành ải, Equipment = Flat Bonus Only (không % và không DEF), Gacha = Binh Phù là nhóm hiếm nhất.

| Hệ Thống | Thông Số / Quyết Định Còn Mở | Đề Xuất Khảo Sát / Placeholder | Trạng Thái & Ghi Chú |
|---|---|---|---|
| **1. Gacha Gold** | Giá quay 1x và 10x | • `[Placeholder: Mức giá thấp / trung bình theo kinh tế Wave]`<br>• Cân đối theo lượng Vàng thực tế thu được trong trận | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **2. Gacha Gold** | Bảng tỷ lệ xuất hiện (Drop Rates) | • `[Placeholder: Bảng phân bổ tỷ lệ theo tier/nhóm]`<br>• Binh Phù (Quân Lệnh) là nhóm hiếm nhất (LOCKED)<br>• Vũ Khí/Ngọc Lv1 và Vàng là nhóm cơ bản | **OPEN** — Chờ Game Design & Codex phê duyệt (Binh Phù là nhóm hiếm nhất, chưa có rate cụ thể). |
| **3. Gacha Gold** | Lượng Vàng trả lại khi trúng ô Vàng | • `[Placeholder: Tỷ lệ hoàn trả Vàng theo cấu hình]`<br>• Cơ chế hệ số nhân giá quay | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **4. Gacha Gold** | Cơ chế bảo hiểm (Pity) | • `[Placeholder: Bảo hiểm trang bị / Binh Phù sau N lượt]`<br>• Không có bảo hiểm (thuần RNG) | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **5. Equipment** | Bảng chỉ số Flat Bonus chuẩn (Lv1 – Lv10) | • `[Placeholder: Bảng chỉ số cộng thẳng theo tier]`<br>• ATK +N, Range +N, ASPD +N (Flat Bonus only)<br>• Tuyệt đối không % và không DEF | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **6. Equipment** | Phí khi ghép 3 $\rightarrow$ 1 (Merge Fee) | • `[Placeholder: Miễn phí ghép (0 Vàng)]`<br>• `[Placeholder: Phí Vàng tuyến tính hoặc cố định]` | **OPEN** — Chờ Game Design & Codex phê duyệt (ghép đồ không bắt buộc tốn Vàng). |
| **7. Deployment** | Công thức mở rộng Slot theo Cấp người chơi | • Base = 7 Hero (LOCKED)<br>• `[Placeholder: Mở thêm slot tại các mốc cấp]` | **OPEN** — Base 7 là LOCKED; công thức bonus từ Player Level là OPEN. |
| **8. Deployment** | Số lượng ô Placement Tiles chuẩn trên Map | • `[Placeholder: Định mức ô đặt theo từng Chapter/Map]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **9. Lệnh Hiệu Triệu** | Mức trần tối đa sử dụng cho 1 tài khoản | • +1 Slot vĩnh viễn (LOCKED)<br>• `[Placeholder: Giới hạn trần tối đa số lượng dùng]` | **OPEN** — Chờ Game Design & Codex phê duyệt (phải $\le$ trần ô Map). |
| **10. Lệnh Hiệu Triệu** | Nguồn phân phối Lệnh Hiệu Triệu | • `[Placeholder: Quà cốt truyện Chapter / Tiệm KNB]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **11. Quân Lệnh** | Tăng Max Energy theo Cấp người chơi | • Base Cap = 60 Quân Lệnh (LOCKED)<br>• `[Placeholder: Công thức tăng Max Energy theo Cấp]` | **OPEN** — Base cap 60 là LOCKED; công thức tăng cap theo Player Level là OPEN. |
| **12. Quân Lệnh** | Mức trần Overflow tối đa | • `[Placeholder: Giới hạn chặn Overflow / Không giới hạn trần]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **13. Binh Phù** | Nguồn thu Binh Phù ngoài Gacha Gold | • `[Placeholder: Tiệm Tạp Hóa / Nhiệm vụ / Chỉ qua Gacha]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **14. Tiền Tệ** | Giới hạn số dư Vàng tối đa (Gold Cap) | • `[Placeholder: Mức trần số dư Vàng / Không giới hạn]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **15. Tiền Tệ** | Nguồn thu nhàn rỗi (Offline Idle Rewards) | • `[Placeholder: Tích lũy Vàng offline / Thuần chơi tay]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **16. Hành Trang** | Dung lượng ô chứa tối đa (Inventory Slots) | • `[Placeholder: Giới hạn số ô chứa / Không giới hạn]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |
| **17. Hành Trang** | Quy tắc xếp chồng vật phẩm (Stacking) | • `[Placeholder: Quy tắc stack vật phẩm tiêu hao và trang bị]` | **OPEN** — Chờ Game Design & Codex phê duyệt. |

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
* **Bước 2 (Codex)**: Xây dựng các module nghiệp vụ Meta (Quản lý ví Vàng/KNB, Trạng thái Thể lực Quân Lệnh, Kho đồ, Binh Phù, Lệnh Hiệu Triệu, Logic ghép đồ, Xử lý Gacha Drop Table).
* **Bước 3 (Antigravity)**: Hiện thực hóa giao diện React UI (Header HUD, Bottom Bar 2 Tab, Merge Modal, Batch Use Modal, Gacha Screen) tích hợp trực tiếp với Callbacks do Codex cung cấp.
