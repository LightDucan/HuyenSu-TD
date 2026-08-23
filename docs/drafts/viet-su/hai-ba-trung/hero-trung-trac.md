# Hero Concept: Trưng Trắc (Trưng Nữ Vương)

## 1. Danh Tính (Identity)
* **Tên**: Trưng Trắc (Chưng Trắc / Trưng Vương)
* **Thời kỳ**: Thời Hai Bà Trưng (Khởi nghĩa năm 40 SCN – 43 SCN)
* **Vai trò hình ảnh**: Nữ vương thống lĩnh, uy nghiêm dũng mãnh; trang phục giáp đồng Đông Sơn ánh vàng kim và đỏ thẫm; chỉ huy toàn quân, hộ tâm phiến tròn mang hoa văn chim Lạc/mặt trời.
* **Ghi chú lịch sử ngắn**: 
  Trưng Trắc là con gái Lạc tướng huyện Mê Linh (vùng Hà Nội ngày nay), vợ của Thi Sách (con Lạc tướng huyện Chu Diên). Năm 40 SCN, trước ách áp bức tàn bạo của Thái thú Tô Định, Bà cùng em gái Trưng Nhị dựng cờ khởi nghĩa tại cửa sông Hát, thu phục 65 thành trì Giao Chỉ, Cửu Chân, Nhật Nam, Hợp Phố. Bà lên ngôi xưng Trưng Vương, đóng đô tại Mê Linh, miễn thuế hai năm cho nhân dân.
* **Ranh giới lịch sử vs sáng tạo game**:
  * *Phần lịch sử*: Thân thế dòng dõi Lạc tướng Mê Linh, vai trò lãnh đạo tối cao cuộc khởi nghĩa năm 40 SCN, xưng vương, định đô Mê Linh, truyền thống quân sự voi chiến và vũ khí thời kỳ Đông Sơn.
  * *Phần sáng tạo game*: Định hình hệ thống kỹ năng AoE chấn động bằng nhịp trống đồng Lạc Việt và uy lực đường kiếm lệnh trong khuôn khổ cơ chế Tower Defense.

---

## 2. Đánh Thường (Normal Attack)
* **Quy tắc bắt buộc**: Single-target duy nhất. Không AoE, không Stun, không Slow, không Root.
* **Vũ khí**: Gươm đồng Lạc Việt chuôi đúc tượng chim Lạc / Song kiếm đồng Đông Sơn.
* **Tầm đánh**: Cận chiến tầm trung (`mid-melee`, tầm đánh khoảng 160 – 175 px).
* **Animation Front View**:
  * *Tư thế*: Đứng thẳng uy nghi, tay cầm kiếm lệnh đồng sáng sắc nét, vung đường chém uy lực từ trên chéo xuống mục tiêu đơn lẻ phía trước.

---

## 3. Chỉ Số Core (Core Stats)

*Theo nguyên tắc: Không có DEF. Đánh giá mức độ:*
* **HP**: Cao (Độ bền bỉ vững vàng của thủ lĩnh tối cao)
* **ATK**: Trung bình – Cao (Đòn đánh sắc bén, uy lực chỉ huy)
* **Range**: Trung bình (`mid-melee`, ~170 px)
* **AttackSpeed**: Trung bình (~1.15 – 1.25 đòn/giây)
* **Crit**: Trung bình (~15%)
* **CritDamage**: Trung bình (~150%)

---

## 4. Active Skill (Kỹ Năng Kích Hoạt)
* **Tên kỹ năng**: **Trống Đồng Lệnh Vương** *(hoặc Hịch Truyền Mê Linh)*
* **Cơ chế kích hoạt**: Tự động kích hoạt sau mỗi **5 đòn đánh thường**.
* **Hiệu ứng dùng chung (Shared Effects)**:
  * `{ type: 'aoe', radius: 170, maxTargets: 4 }` — Sóng xung kích chấn động bán kính 170px lên tối đa 4 mục tiêu.
  * `{ type: 'damage', atkMultiplier: 2.2 }` — Gây sát thương bằng 220% ATK.
  * `{ type: 'stun', durationMs: 800 }` — Làm choáng kẻ địch trúng đòn trong 800ms.
* **Ràng buộc kiến trúc**: Sử dụng hoàn toàn bộ SkillEffect dùng chung của hệ thống, không viết code riêng.

---

## 5. Tiến Hóa (Progression Stages)
* **Thường (Normal, Lv 1–100)**: Tướng quân áo giáp vải bọc nẹp đồng sơ khởi, rèn luyện đòn kiếm và tăng trưởng ATK/HP cơ bản.
* **Trùng Sinh (Rebirth, Lv 1–100)**: Uy danh vang dội khắp 65 thành; mở rộng tầm ảnh hưởng của chiêu thức, hệ số tăng trưởng chỉ số tăng bậc.
* **Tái Sinh (Reincarnation, Lv 1–100)**: Trưng Vương xưng đế uy nghiêm, khoác hoàng bào giáp vàng rực rỡ; chỉ số đạt ngưỡng đỉnh phong.

---

## 6. Huyền Sử (Legendary Passive)
* **Tên Passive Concept**: **Huyền Sử: Trưng Vương Lĩnh Nam**
* **Mô tả**: Khi đạt cảnh giới Huyền Sử, tinh thần quật khởi của Trưng Nữ Vương gia tăng 25% sát thương toàn bộ kỹ năng AoE và tăng 15% tốc đánh cho bản thân khi thành trì bị đe dọa.
* **Tình trạng hệ thống**: *Chờ shared passive system của Core*.

---

## 7. Nguồn Tham Chiếu Nghiên Cứu (References)
1. **Đại Việt Sử Ký Toàn Thư** (Ngoại kỷ, Quyển III: *Kỷ Trưng Nữ Vương*).
2. **Khâm Định Việt Sử Thông Giám Cương Mục** (Tiền biên, Quyển II).
3. **Hậu Hán Thư** (Phạm Diệp, Quyển 86: *Nam Man Tây Nam Di liệt truyện*; Quyển 24: *Mã Viện liệt truyện*).
4. **Bảo tàng Lịch sử Quốc gia Việt Nam** — Tư liệu & hiện vật khảo cổ học Văn hóa Đông Sơn (Vũ khí đồng, Trống đồng Mê Linh/Cổ Loa).
5. **Di tích Quốc gia đặc biệt Đền Hai Bà Trưng** (Mê Linh, Hà Nội và Hát Môn, Phúc Thọ, Hà Nội).
