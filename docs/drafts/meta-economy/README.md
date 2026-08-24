# Đặc Tả Thiết Kế Hệ Meta Game & Hành Trang (META-A00)

## 1. Tổng Quan & Mục Tiêu Hệ Thống

Tài liệu này đặc tả toàn bộ thiết kế hệ thống **Meta Game, Kinh Tế & Hành Trang (Meta Economy & Inventory)** cho dự án **Huyền Sử TD**. Hệ thống này quản lý vòng lặp phát triển ngoài trận (Out-of-run), ví tiền tệ, kho trang bị/vật phẩm, thể lực Quân Lệnh, và tính năng Chiêu Mộ Gacha bằng Vàng.

### 1.1. Ranh Giới Kiến Trúc Cốt Lõi
* **In-run (Domain Combat Core & Phaser Scene)**: Quản lý Game Clock, quái đi fixed path, single-target attack, skill trigger sau $N$ đòn, targeting và Win/Lose condition. Không can thiệp vào ví tiền tệ hay tính toán thể lực trong vòng lặp tick.
* **Out-of-run (Meta Economy & Inventory)**: Quản lý Player Wallet (Vàng, Kim Nguyên Bảo, Quân Lệnh), Inventory (Vũ Khí, Ngọc, Binh Phù), Nâng cấp/Ghép đồ (Merge 3 $\rightarrow$ 1), Gacha Gold và Lực lượng Triển khai (Deployment Capacity).
* **Passive React UI**: Giao diện React hiển thị snapshot dữ liệu và chỉ phát hành động qua callback yêu cầu (`onUseItemRequest`, `onMergeEquipmentRequest`, `onGachaPullRequest`). Không tự tính toán tỷ lệ, không tự trừ tiền, không giữ state ảo.
* **Nguyên tắc không tự chốt**: Bản nháp tuân thủ nghiêm ngặt các luật đã khóa và ghi nhận các thông số mở, không tự ý hard-code rate/cost chưa được phê duyệt.

---

## 2. Danh Mục Tài Liệu Chi Tiết

| File | Nội dung trọng tâm |
|---|---|
| [wallet-inventory-ui.md](wallet-inventory-ui.md) | Thiết kế Thanh Wallet, Bottom Bar 2 tab (Đội Hình / Hành Trang) kèm Wireframe văn bản. |
| [currencies.md](currencies.md) | Hệ thống tiền tệ (Vàng, Kim Nguyên Bảo, Quân Lệnh), nguyên tắc thu chi và quản lý ví. |
| [command-energy.md](command-energy.md) | Cơ chế Quân Lệnh: Tốn 1 điểm/Wave, hồi 1 điểm/2 phút thực, xử lý Overflow, ngắt hồi và Auto Wave. |
| [command-energy-items.md](command-energy-items.md) | Vật phẩm Binh Phù (Tiểu, Trung, Đại), cơ chế dùng nhiều (Batch Use) kèm Wireframe văn bản. |
| [deployment-capacity.md](deployment-capacity.md) | Giới hạn triển khai Hero (cơ bản 7 Hero, thăng cấp, di chuyển không tốn slot, trần ô map). |
| [summoning-decree.md](summoning-decree.md) | Vật phẩm Lệnh Hiệu Triệu (+1 Slot vĩnh viễn), giới hạn trần kèm Wireframe văn bản. |
| [equipment-flat-bonus.md](equipment-flat-bonus.md) | Quy tắc Equipment thường: Chỉ cộng thẳng (ATK, Range, ASPD), Lv1–10, ghép 3 $\rightarrow$ 1 kèm Wireframe văn bản. |
| [gacha-gold.md](gacha-gold.md) | Hệ thống Gacha Gold, danh mục Reward Pool (Vàng, Trang bị Lv1, Binh Phù) kèm Wireframe văn bản. |
| [open-decisions.md](open-decisions.md) | Bảng tổng hợp quyết định còn mở (giá quay, tỷ lệ, bảng bonus) và rủi ro kỹ thuật. |
