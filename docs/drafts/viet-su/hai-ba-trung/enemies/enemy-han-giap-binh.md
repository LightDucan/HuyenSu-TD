# Enemy Concept: Đông Hán Thiết Giáp Binh (`han-armored-guard`)

## 1. Thông Tin Nhận Dạng (Identity & Gameplay Role)
* **ID Nháp**: `han-armored-guard`
* **Tên hiển thị**: **Đông Hán Thiết Giáp Binh**
* **Category**: `other`
* **Vai trò gameplay**: Đơn vị thiết giáp hạng nặng / "Tanker" gánh chịu sát thương; thân hình lực lưỡng đồ sộ, lượng máu rất cao, di chuyển chậm rãi; nếu để lọt vào thành sẽ gây tổn thất lớn (2 điểm máu thành). Yêu cầu người chơi dồn sát thương đơn mục tiêu hoặc sử dụng kỹ năng bạo kích (Crit).

---

## 2. Chỉ Số Đề Xuất (Concept Stats Mức Độ)
* **HP**: **Cao – Rất Cao** (Dự kiến tham chiếu: ~135 – 150)
* **MoveSpeed**: **Chậm** (Dự kiến tham chiếu: ~34 – 38 px/s)
* **CityDamage**: **Cao** (2 điểm máu thành trì)

---

## 3. Tạo Hình & Animation Front View
* **Vũ khí / Trang bị**:
  * Khiên sắt lớn hình chữ nhật (Đại Lã Khiên) che chắn từ vai xuống ống chân.
  * Mặc áo giáp sắt vảy cá bao phủ ngực, vai và đùi; hộ uyên bọc tay bằng sắt.
  * Tay phải cầm câu thương/giáo nẹp sắt ngắn.
  * Mũ sắt chụp kín tai, viền đỏ sẫm uy nghiêm nặng nề.
* **Mô tả Animation Front View**:
  * *Tư thế di chuyển*: Bước chân nặng nề, chắc nịch trên baseline Y=112; hai tay nâng khiên sắt vững chãi phía trước ngực; giáp sắt rung kêu leng keng theo từng nhịp dậm chân.
  * *Tư thế ngã gục*: Khiên sắt đổ ập xuống đất, thân người quỵ ngã nặng nề.

---

## 4. Căn Cứ Lịch Sử vs Sáng Tạo Game
* **Căn cứ lịch sử**:
  * Đạo quân của Mã Viện điều động các đội giáp sĩ ngự lâm và tiền phong mang khiên lớn để chống lại nỏ và voi chiến của Lạc Việt.
* **Phần sáng tạo game**:
  * Xếp vào Category `other` để đại diện cho nhóm quân đặc chủng / tanker.
  * Game giữ vững nguyên tắc *Không có DEF*, do đó đặc tính "thiết giáp" được chuyển hóa thuần túy thành chỉ số `maxHp` cao và tốc độ di chuyển chậm.

---

## 5. Nguồn & Mức Độ Tin Cậy Lịch Sử
* **Mức độ tin cậy lịch sử**: **Có sử liệu chính thức** (Ghi chép về tổ chức quân ngũ giáp binh và khiên trận thời Đông Hán).
* **Nguồn tham chiếu**:
  1. **Hậu Hán Thư** (Phạm Diệp: *Mã Viện liệt truyện* — Ghi chép về trang bị thiết giáp và lầu thuyền nam chinh).
  2. **Bảo tàng Lịch sử Quốc gia** — Mảnh giáp sắt và khiên đồng/sắt thời cổ.
  3. **Khảo cổ học quân sự phương Đông** — Tái dựng giáp vảy cá thời Hán.
