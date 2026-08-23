# Hero Concept: Trưng Nhị (Tướng Tiên Phong / Nỏ Lạc Việt)

## 1. Danh Tính (Identity)
* **Tên**: Trưng Nhị (Chưng Nhị)
* **Danh hiệu truyền thống / Game**: Bình Khôi Tướng Quân *(Lưu ý: "Bình Khôi Tướng Quân" là danh hiệu lưu truyền trong dân gian, thần tích đền miếu hoặc định danh trong game, không coi là chức danh chính sử đã xác nhận)*.
* **Thời kỳ**: Thời Hai Bà Trưng (Khởi nghĩa năm 40 SCN – 43 SCN)
* **Vai trò hình ảnh**: Nữ tướng tiên phong cơ động, tài ba nhanh nhẹn; trang phục gọn gàng linh hoạt, giáp da nẹp đồng xanh ngọc bích, sử dụng Nỏ Lạc Việt bắn liên hoàn.
* **Ghi chú lịch sử ngắn**: 
  Trưng Nhị là em gái Trưng Trắc, người bạn chiến đấu thân thiết và đồng thủ lĩnh đắc lực nhất trong suốt quá trình chuẩn bị, phát động và chỉ huy cuộc khởi nghĩa năm 40 SCN. Cùng với Trưng Trắc, bà trực tiếp đốc chiến các cánh quân cơ động Lạc Việt đánh đuổi Tô Định và kiên cường chống trả cuộc xâm lược của quân Mã Viện tại Lãng Bạc, Cẩm Khê.
* **Ranh giới lịch sử vs sáng tạo game**:
  * *Phần lịch sử*: Ghi chép chính sử khẳng định vai trò đồng thủ lĩnh cùng chị lãnh đạo khởi nghĩa đánh đuổi quân đô hộ nhà Hán.
  * *Phần sáng tạo game*: Định hình phong cách chiến đấu tầm xa (Ranged/Bow) thuần túy sử dụng **Nỏ Lạc Việt** với cơ chế bắn nỏ liên hoàn, tạo thế đối trọng chiến thuật với lối đánh cận chiến của Trưng Trắc.

---

## 2. Đánh Thường (Normal Attack)
* **Quy tắc bắt buộc**: Single-target duy nhất. Không AoE, không Stun, không Slow, không Root.
* **Vũ khí**: **Nỏ Lạc Việt** (Nỏ thân gỗ bọc đồng, lẫy nỏ đồng Đông Sơn).
* **Tầm đánh**: Tầm xa (`bow/ranged`, tầm đánh khoảng 260 – 280 px).
* **Animation Front View**:
  * *Tư thế*: Đứng thế xạ thủ thanh thoát, giương nỏ Lạc Việt về phía trước, bắn mũi tên đồng xé gió chuẩn xác vào mục tiêu đơn lẻ.

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
* **Cơ chế kích hoạt**: Tự động kích hoạt sau mỗi **7 đòn đánh thường** *(thuộc mốc chuẩn: 3 / 5 / 7 / 10)*.
* **Hiệu ứng dùng chung (Shared Effects)**:
  * `{ type: 'multiHit', hits: 3, intervalMs: 140 }` — Bắn liên tiếp 3 đợt nỏ thần tốc.
  * `{ type: 'damage', atkMultiplier: 1.1 }` — Mỗi đợt gây 110% ATK (tổng sát thương chuỗi đạt 330% ATK đơn mục tiêu).
  * `{ type: 'slow', ratio: 0.35, durationMs: 2000 }` — Mũi tên định thân làm giảm 35% tốc độ di chuyển của địch trong 2000ms.
* **Ràng buộc kiến trúc**: Sử dụng hoàn toàn bộ SkillEffect dùng chung của hệ thống, không viết code riêng.

---

## 5. Tiến Hóa (Progression Stages)
* **Thường (Normal, Lv 1–100)**: Nữ xạ thủ Lạc Việt dẻo dai, thuần thục nỏ đồng sơ cấp.
* **Trùng Sinh (Rebirth, Lv 1–100)**: Nữ tướng tiên phong tung hoành tiền tuyến; tốc độ nạp nỏ và tầm bắn tăng tiến vượt bậc.
* **Tái Sinh (Reincarnation, Lv 1–100)**: Thần nỏ hộ quốc Mê Linh; đường tên ánh sáng ngọc bích xé tan mọi hàng ngũ tiến công của địch.

---

## 6. Huyền Sử (Legendary Passive)
* **Tên Passive Concept**: **Huyền Sử: Tiên Phong Lạc Tiễn**
* **Mô tả**: Khi đạt cảnh giới Huyền Sử, tăng thêm 35 tầm đánh (Range) và 15% tốc đánh (AttackSpeed); mỗi đòn chí mạng có khả năng kích hoạt thêm mũi tên phụ.
* **Tình trạng hệ thống**: *Chờ shared passive system của Core*.

---

## 7. Nguồn & Mức Độ Tin Cậy Lịch Sử (Sources & Reliability)
* **Mức độ tin cậy lịch sử**: **Có sử liệu chính thức & rõ ràng** (Ghi nhận đồng thủ lĩnh khởi nghĩa cùng Trưng Trắc trong chính sử Việt Nam và sử liệu cổ đại phương Bắc; danh hiệu "Bình Khôi" thuộc lớp thần tích dân gian).
* **Danh sách nguồn tham chiếu**:
  1. **Đại Việt Sử Ký Toàn Thư** (Ngoại kỷ, Quyển III: *Kỷ Trưng Nữ Vương*).
  2. **Khâm Định Việt Sử Thông Giám Cương Mục** (Tiền biên, Quyển II).
  3. **Hậu Hán Thư** (Phạm Diệp, Quyển 86: *Nam Man Tây Nam Di liệt truyện*).
  4. **Bảo tàng Lịch sử Quốc gia Việt Nam** — Bộ sưu tập lẫy nỏ đồng và mũi tên đồng Cổ Loa / Đông Sơn.
  5. **Di tích Đền Hát Môn** (Phúc Thọ, Hà Nội) & **Đền Đồng Nhân** (Hai Bà Trưng, Hà Nội).
