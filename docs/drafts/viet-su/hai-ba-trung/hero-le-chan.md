# Hero Concept: Lê Chân (Nữ Tướng An Biên)

## 1. Danh Tính (Identity)
* **Tên**: Lê Chân (Thánh Chân Công Chúa / Chưởng Quản Binh Quyền)
* **Thời kỳ**: Thời Hai Bà Trưng (Khởi nghĩa năm 40 SCN – 43 SCN)
* **Vai trò hình ảnh**: Nữ tướng dũng mãnh kiên cường vùng duyên hải; giáp vảy cá ánh đồng xám đen và dải lụa đỏ thắt eo; tay cầm vũ khí trảm đao/dao chiến đồng sắc lạnh, thể hiện khí phách nữ tướng khai hoang lập ấp kiêm thống lĩnh thủy bộ binh.
* **Ghi chú lịch sử ngắn**: 
  Nữ tướng Lê Chân quê gốc ở làng Vẻ Thủy (Đông Triều, Quảng Ninh). Do căm thù Thái thú Tô Định bức hại gia đình, bà đã cùng gia binh xuôi dòng xuống vùng ven biển khai khẩn đất hoang, lập nên trang An Biên (tiền thân của thành phố Hải Phòng ngày nay). Khi Hai Bà Trưng dấy binh, bà đem toàn bộ quân lính An Biên hưởng ứng, được phong làm Chưởng quản Binh quyền nội bộ, lập nhiều chiến công hiển hách đánh tan quân Tô Định và chặn đánh quyết liệt quân xâm lược Mã Viện.
* **Ranh giới lịch sử vs sáng tạo game**:
  * *Phần lịch sử*: Thân thế khai sáng vùng đất Hải Phòng, nữ tướng xuất sắc trong hàng ngũ tướng lĩnh Hai Bà Trưng, tài thao lược thủy bộ, trận chiến phòng thủ kiên cường trên sông và vùng ven biển.
  * *Phần sáng tạo game*: Định hình hình tượng nữ chiến binh dùng *đại đao / trảm mã đao* là tạo hình sáng tạo game nhằm gia tăng độ nhận diện và chất cản phá trong gameplay; mô tả nền tảng lịch sử thực tế của thời kỳ này là **dao chiến đồng / gươm đồng Đông Sơn**. Bộ kỹ năng cản phá và khống chế (Root / AoE Slash) mô phỏng những ngọn sóng triều duyên hải An Biên.

---

## 2. Đánh Thường (Normal Attack)
* **Quy tắc bắt buộc**: Single-target duy nhất. Không AoE, không Stun, không Slow, không Root.
* **Vũ khí**: Dao chiến đồng Lạc Việt / Gươm bản rộng (Tạo hình game: Trảm Đao Lạc Việt).
* **Tầm đánh**: Cận chiến tầm gần – trung (`near-melee / mid-melee`, tầm đánh khoảng 150 – 160 px).
* **Animation Front View**:
  * *Tư thế*: Đứng thế tấn vững chắc như bàn thạch, vung đường đao/dao chiến chém dứt khoát ngang ngực mục tiêu đơn lẻ phía trước.

---

## 3. Chỉ Số Core (Core Stats)

*Theo nguyên tắc: Không có DEF. Đánh giá mức độ:*
* **HP**: Rất Cao (Nữ tướng tiên phong phòng thủ kiên cố)
* **ATK**: Cao (Đòn trảm mã đao nặng đô, sát thương lớn)
* **Range**: Trung bình – Thấp (~155 px)
* **AttackSpeed**: Trung bình (~1.05 – 1.15 đòn/giây)
* **Crit**: Cao (~20%)
* **CritDamage**: Rất Cao (~175%)

---

## 4. Active Skill (Kỹ Năng Kích Hoạt)
* **Tên kỹ năng**: **Sóng Trào Hải Tần** *(hoặc Hải Tần Trảm)*
* **Cơ chế kích hoạt**: Tự động kích hoạt sau mỗi **5 đòn đánh thường** *(thuộc mốc chuẩn: 3 / 5 / 7 / 10)*.
* **Hiệu ứng dùng chung (Shared Effects)**:
  * `{ type: 'aoe', radius: 160, maxTargets: 3 }` — Quét đao hình vòng cung sóng cuộn bán kính 160px lên tối đa 3 mục tiêu.
  * `{ type: 'damage', atkMultiplier: 2.0 }` — Gây sát thương bằng 200% ATK.
  * `{ type: 'root', durationMs: 1500 }` — Trói chân kẻ địch tại chỗ trong 1500ms (mô phỏng sức kìm giữ của sóng ngầm duyên hải).
* **Ràng buộc kiến trúc**: Sử dụng hoàn toàn bộ SkillEffect dùng chung của hệ thống, không viết code riêng.

---

## 5. Tiến Hóa (Progression Stages)
* **Thường (Normal, Lv 1–100)**: Nữ thủ lĩnh khai hoang An Biên, tôi luyện đao pháp và rèn đúc vũ khí cho nghĩa quân.
* **Trùng Sinh (Rebirth, Lv 1–100)**: Chưởng Quản Binh Quyền thống lãnh thủy bộ; uy lực chém và khả năng trụ đường tăng mạnh.
* **Tái Sinh (Reincarnation, Lv 1–100)**: Thánh Chân Công Chúa hiển linh; khí thế sóng trào duyên hải trấn áp mọi kẻ thù.

---

## 6. Huyền Sử (Legendary Passive)
* **Tên Passive Concept**: **Huyền Sử: An Biên Trấn Hải**
* **Mô tả**: Khi đạt cảnh giới Huyền Sử, tăng thêm 20% tỷ lệ bạo kích (Crit) và 25% sát thương bạo kích (CritDamage); các đòn đánh trúng kẻ địch đang bị trói chân (Root) gây thêm 15% sát thương.
* **Tình trạng hệ thống**: *Chờ shared passive system của Core*.

---

## 7. Nguồn & Mức Độ Tin Cậy Lịch Sử (Sources & Reliability)
* **Mức độ tin cậy lịch sử**: **Có truyền thống lịch sử và di tích địa phương ghi nhận; nhiều chi tiết tiểu sử chủ yếu dựa trên thần tích/ngọc phả/truyền thuyết địa phương.**
* **Danh sách nguồn tham chiếu**:
  1. **Đại Nam Nhất Thống Chí** (Tập Hải Dương, tỉnh Hải Phòng).
  2. **Thần phả Nữ tướng Lê Chân** tại Đền Nghè (phường An Biên, quận Lê Chân, TP. Hải Phòng).
  3. **Bảo tàng Hải Phòng** & Các nghiên cứu của Hội Khoa học Lịch sử Hải Phòng.
  4. **Viện Sử học Việt Nam** — Các bài khảo cứu về khởi nghĩa Hai Bà Trưng và các nữ tướng thời Trưng Vương.
  5. **Di tích Đền Nghè & Đình An Biên** (Di tích Lịch sử cấp Quốc gia, Hải Phòng).
