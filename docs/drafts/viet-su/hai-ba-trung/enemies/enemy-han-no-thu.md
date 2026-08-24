# Enemy Concept: Đông Hán Nỏ Thủ (`han-crossbow-soldier`)

## 1. Thông Tin Nhận Dạng (Identity & Gameplay Role)
* **ID Nháp**: `han-crossbow-soldier`
* **Tên hiển thị**: **Đông Hán Nỏ Thủ**
* **Category**: `archer`
* **Vai trò gameplay**: Đơn vị tốc độ cao, thân hình nhẹ nhàng, lượng HP mỏng; chuyên bứt tốc vượt qua tầm bắn của Hero hoặc luồn lách phía sau đội hình giáp binh. Yêu cầu người chơi sử dụng Hero có kỹ năng làm chậm (Slow) hoặc tầm đánh xa để kiểm soát.

---

## 2. Chỉ Số Đề Xuất (Concept Stats Mức Độ)
* **HP**: **Thấp** (Dự kiến tham chiếu: ~50 – 58)
* **MoveSpeed**: **Nhanh** (Dự kiến tham chiếu: ~62 – 68 px/s)
* **CityDamage**: **Thấp** (1 điểm máu thành trì)

---

## 3. Tạo Hình & Animation Front View
* **Vũ khí / Trang bị**:
  * Ôm trước ngực chiếc Nỏ đồng cơ khí thời Hán (có lẫy đồng bấm cò).
  * Đeo ống tên gỗ bọc da bên hông/sau lưng.
  * Trang phục áo vải nhẹ màu xám tím/đỏ nhạt, đai da quấn gọn gàng, đầu đội khăn xếp quân ngũ.
* **Mô tả Animation Front View**:
  * *Tư thế di chuyển*: Bước chạy nhanh nhẹn, thân người hơi cúi về phía trước ôm nỏ chạy trên baseline Y=112; ống tên rung nhẹ theo bước chạy.
  * *Tư thế ngã gục*: Đánh rơi nỏ, ngã trượt về phía trước khi bị tiêu diệt.

---

## 4. Căn Cứ Lịch Sử vs Sáng Tạo Game
* **Căn cứ lịch sử**:
  * Quân đội nhà Hán có binh chủng Nỏ binh (Nỏ thủ) vô cùng thiện chiến, sử dụng nỏ cơ khí có thước ngắm và lẫy đồng đúc tinh xảo, là lực lượng sát thương chủ lực thời Chiến Quốc – Hán.
* **Phần sáng tạo game**:
  * Thuộc Category `archer` để hiển thị trên bộ đếm HUD.
  * Tuân thủ luật Tower Defense: Nỏ thủ chỉ di chuyển theo tuyến đường cố định (`fixedPath`) và không bắn tên vào Hero hay chướng ngại vật.

---

## 5. Nguồn & Mức Độ Tin Cậy Lịch Sử
* **Mức độ tin cậy lịch sử**: **Có sử liệu chính thức & hiện vật khảo cổ học phong phú** (Hệ thống lẫy nỏ đồng thời Hán được khai quật tại nhiều di chỉ khảo cổ học ở Trung Quốc và miền Bắc Việt Nam).
* **Nguồn tham chiếu**:
  1. **Hậu Hán Thư** (Phạm Diệp: *Binh chí*, *Mã Viện liệt truyện*).
  2. **Bảo tàng Lịch sử Quốc gia Việt Nam** — Hiện vật lẫy nỏ cơ khí và mũi tên đồng/sắt thời Đông Hán.
  3. **Khảo cổ học Trung Quốc** — Các cuộc khai quật mộ táng nhà Hán (Mã Vương Đôi, Lăng Hán).
