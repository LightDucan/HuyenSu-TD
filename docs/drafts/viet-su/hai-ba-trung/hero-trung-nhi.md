# Hero Concept: Trưng Nhị (Bình Khôi Tướng Quân)

## 1. Danh Tính (Identity)
* **Tên**: Trưng Nhị (Chưng Nhị)
* **Thời kỳ**: Thời Hai Bà Trưng (Khởi nghĩa năm 40 SCN – 43 SCN)
* **Vai trò hình ảnh**: Nữ tướng tiên phong cơ động, tài ba nhanh nhẹn; trang phục gọn gàng linh hoạt, giáp da nẹp đồng xanh ngọc bích, sử dụng cung nỏ Lạc Việt và đoản kiếm.
* **Ghi chú lịch sử ngắn**: 
  Trưng Nhị là em gái Trưng Trắc, người bạn chiến đấu thân thiết và phó tướng đắc lực nhất trong suốt quá trình chuẩn bị, phát động và chỉ huy cuộc khởi nghĩa năm 40 SCN. Khi Trưng Trắc lên ngôi xưng vương, Trưng Nhị giữ trọng trách Phó tướng/Bình Khôi Tướng Quân, trực tiếp đốc chiến các cánh quân cơ động Lạc Việt bảo vệ non sông.
* **Ranh giới lịch sử vs sáng tạo game**:
  * *Phần lịch sử*: Ghi chép chính sử khẳng định vai trò đồng thủ lĩnh cùng chị lãnh đạo khởi nghĩa đánh đuổi Thái thú Tô Định và kháng cự quân Mã Viện tại Lãng Bạc, Cẩm Khê.
  * *Phần sáng tạo game*: Định hình phong cách chiến đấu tầm xa (Ranged/Bow) với nỏ đồng Cổ Loa/Lạc Việt bắn liên hoàn, tạo thế đối trọng chiến thuật với lối đánh cận chiến của Trưng Trắc.

---

## 2. Đánh Thường (Normal Attack)
* **Quy tắc bắt buộc**: Single-target duy nhất. Không AoE, không Stun, không Slow, không Root.
* **Vũ khí**: Cung tên đồng Lạc Việt / Nỏ Cổ Loa.
* **Tầm đánh**: Tầm xa (`bow/ranged`, tầm đánh khoảng 260 – 280 px).
* **Animation Front View**:
  * *Tư thế*: Đứng thế xạ thủ thanh thoát, giương cung/nỏ đồng về phía trước, bắn mũi tên đồng xé gió chuẩn xác vào mục tiêu đơn lẻ.

---

## 3. Chỉ Số Core (Core Stats)

*Theo nguyên tắc: Không có DEF. Đánh giá mức độ:*
* **HP**: Trung bình (Linh hoạt, cơ động cao)
* **ATK**: Trung bình – Cao (Sát thương tầm xa chuẩn xác)
* **Range**: Cao (`bow`, ~270 px)
* **AttackSpeed**: Cao (~1.35 – 1.45 đòn/giây)
* **Crit**: Cao (~20% – 25%)
* **CritDamage**: Cao (~165%)

---

## 4. Active Skill (Kỹ Năng Kích Hoạt)
* **Tên kỹ năng**: **Liên Hoàn Lạc Tiễn**
* **Cơ chế kích hoạt**: Tự động kích hoạt sau mỗi **4 đòn đánh thường**.
* **Hiệu ứng dùng chung (Shared Effects)**:
  * `{ type: 'multiHit', hits: 3, intervalMs: 140 }` — Bắn liên tiếp 3 đợt tên thần tốc.
  * `{ type: 'damage', atkMultiplier: 1.1 }` — Mỗi đợt gây 110% ATK (tổng sát thương chuỗi đạt 330% ATK đơn mục tiêu).
  * `{ type: 'slow', ratio: 0.35, durationMs: 2000 }` — Mũi tên định thân làm giảm 35% tốc độ di chuyển của địch trong 2000ms.
* **Ràng buộc kiến trúc**: Sử dụng hoàn toàn bộ SkillEffect dùng chung của hệ thống, không viết code riêng.

---

## 5. Tiến Hóa (Progression Stages)
* **Thường (Normal, Lv 1–100)**: Nữ xạ thủ Lạc Việt dẻo dai, thuần thục cung nỏ sơ cấp.
* **Trùng Sinh (Rebirth, Lv 1–100)**: Bình Khôi Tướng Quân tung hoành tiền tuyến; tốc độ nạp tên và tầm bắn tăng tiến vượt bậc.
* **Tái Sinh (Reincarnation, Lv 1–100)**: Thần tiễn hộ quốc Mê Linh; đường tên ánh sáng ngọc bích xé tan mọi hàng ngũ tiến công của địch.

---

## 6. Huyền Sử (Legendary Passive)
* **Tên Passive Concept**: **Huyền Sử: Tiên Phong Bình Khôi**
* **Mô tả**: Khi đạt cảnh giới Huyền Sử, tăng thêm 35 tầm đánh (Range) và 15% tốc đánh (AttackSpeed); mỗi đòn chí mạng có khả năng kích hoạt thêm mũi tên phụ.
* **Tình trạng hệ thống**: *Chờ shared passive system của Core*.

---

## 7. Nguồn Tham Chiếu Nghiên Cứu (References)
1. **Đại Việt Sử Ký Toàn Thư** (Ngoại kỷ, Quyển III: *Kỷ Trưng Nữ Vương*).
2. **Khâm Định Việt Sử Thông Giám Cương Mục** (Tiền biên, Quyển II).
3. **Hậu Hán Thư** (Phạm Diệp, Quyển 86: *Nam Man Tây Nam Di liệt truyện*).
4. **Bảo tàng Lịch sử Quốc gia Việt Nam** — Bộ sưu tập lẫy nỏ đồng và mũi tên đồng Cổ Loa / Đông Sơn.
5. **Di tích Đền Hát Môn** (Phúc Thọ, Hà Nội) & **Đền Đồng Nhân** (Hai Bà Trưng, Hà Nội).
