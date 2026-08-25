# Đề Xuất Lựa Chọn Roster Hero, Enemy, Boss & Map — Gói Bà Triệu (Playable Pack Selection)

> [!IMPORTANT]
> **Ràng Buộc Phạm Vi Task `VS-BT-02`**:
> - Tài liệu này mang tính chất **Đề Xuất Lựa Chọn Roster (Roster Selection Proposal)** cho playable pack thời kỳ Bà Triệu.
> - **TUYỆT ĐỐI CHƯA**: Chốt chỉ số stats cụ thể (HP/ATK/Range), chốt công thức Active Skill / Passive, tạo Wave, tạo Asset sprite/vfx, hoặc sửa `src/**` và `PROJECT_PLAN.md`.
> - Mọi nhân vật đều được gắn nhãn mức độ tin cậy của nguồn theo 4 cấp độ: **Historical Fact** / **Later Source** / **Folklore** / **Game Interpretation**. Tuyệt đối không biến truyền thuyết hoặc sáng tạo game thành sự thật lịch sử.

---

## 1. Đề Xuất 3 Hero Chính Cho Playable Pack Bà Triệu

```mermaid
graph TD
    subgraph 3 HEROES CHÍNH (PLAYABLE PACK)
        H1["<b>1. Triệu Thị Trinh</b><br>(Nhụy Kiều Tướng Quân)<br><i>Role: Frontline Sweeper / Mounted Vanguard</i><br>Nguồn: Historical / Later / Folklore"]
        H2["<b>2. Triệu Quốc Đạt</b><br>(Hào Trưởng Quan Yên)<br><i>Role: Heavy Shield & Spear Guardian</i><br>Nguồn: Later source / Folklore"]
        H3["<b>3. Ba Vua Bồ Điền</b><br>(Tam Vị Dũng Tướng)<br><i>Role: Rapid Multi-Striker Skirmisher</i><br>Nguồn: Folklore / Local Legend"]
    end
    subgraph PHƯƠNG ÁN DỰ PHÒNG CHO HERO THỨ 3
        F1["<b>Phương án DP 1: Sơn Nữ Ngàn Nưa</b><br><i>Role: Ranged Archer & Trapper</i><br>Nguồn: Game interpretation / Folklore"]
        F2["<b>Phương án DP 2: Đỗ Thúc</b><br><i>Role: Allied Chieftain / Tactical Striker</i><br>Nguồn: Folklore / Unverified Candidate"]
    end
```

### 1.1. Hero 1 (Chủ tướng tối cao): Triệu Thị Trinh (Nhụy Kiều Tướng Quân / Lệ Hải Bà Vương)
* **Danh tính & Bối cảnh**: Nữ anh hùng dân tộc, linh hồn của phong trào khởi nghĩa năm 248 SCN tại quận Cửu Chân chống ách đô hộ của nhà Đông Ngô.
* **Phân loại nguồn & Mức độ tin cậy**:
  * *Nguồn Trung Hoa gần thời*: *Tam Quốc Chí* (Ngô Chí) xác nhận cuộc nổi dậy năm 248 tại Giao Chỉ–Cửu Chân và hoạt động của Lục Dận (đoạn sử này không trực tiếp gọi tên bà).
  * *Sử liệu trung đại & Địa phương*: *Giao Châu Ký* (thế kỷ IV), *Đại Việt Sử Ký Toàn Thư*, *Cương Mục*, *Việt Sử Tiêu Án*, Thần phả đền Phú Điền nhận diện và tôn vinh danh tính **Triệu Thị Trinh / Triệu Ẩu**, cùng các danh hiệu *Nhụy Kiều Tướng Quân*, *Lệ Hải Bà Vương*.
* **Vai trò Gameplay đề xuất**: **Mounted Vanguard / Frontline Sweeper** (Chiến tướng cưỡi voi càn quét tiền tuyến).
* **Vũ khí & Phong thái**:
  * Cưỡi Bạch Tượng (Voi trắng một ngà), mặc áo lụa gấm vàng bên trong giáp ngực da thuộc nẹp đồng thau, ngực đeo Hộ tâm phiến tròn Đông Sơn chạm hoa văn mặt trời, trâm vàng cài tóc.
  * Cầm gươm dài Đông Sơn lưỡi thẳng hai cạnh sắc bén; sải gươm dài và uy lực chấn động từ lưng voi.
* **Lý do chọn**: Nhân vật trung tâm không thể thay thế của toàn bộ gói nội dung, biểu tượng vĩ đại của khí phách quật khởi dân tộc Việt Nam.

---

### 1.2. Hero 2 (Hộ vệ trận địa): Triệu Quốc Đạt (Hào Trưởng Quan Yên)
* **Danh tính & Bối cảnh**: Anh trai Bà Triệu, Lạc tướng/Hào trưởng vùng Quan Yên (nay thuộc huyện Yên Định, Thanh Hóa); người đồng sáng lập phong trào và xây dựng căn cứ Ngàn Nưa.
* **Phân loại nguồn & Mức độ tin cậy**:
  * **Later source & Folklore** (Sử liệu trung đại *Toàn Thư*, *Cương Mục* và thần tích làng Quan Yên; không xuất hiện trong sử Ngô gần thời).
* **Vai trò Gameplay đề xuất**: **Heavy Shield & Spear Guardian** (Hộ vệ trận địa khiên giáo, cản phá bước tiến của kẻ địch).
* **Vũ khí & Phong thái**:
  * Thân hình cao lớn, tráng kiện; mặc áo da thú rừng nẹp viền đồng, hộ tâm phiến tròn trước ngực.
  * Tay trái mang Khiên gỗ bọc đồng chạm hoa văn thú dữ Đông Sơn kiên cố, tay phải cầm Giáo búp đa mũi đồng sáng quắc.
* **Lý do chọn**: Tạo nên bộ đôi chỉ huy cốt lõi (Bà Triệu - Triệu Quốc Đạt); đóng vai trò chốt chặn phòng ngự vững chắc bổ trợ cho sức càn quét tiền tuyến của Bà Triệu.

---

### 1.3. Hero 3 (Đề xuất chính): Ba Vua Bồ Điền (Tam Vị Dũng Tướng Tiên Phong)
* **Danh tính & Bối cảnh**: Ba anh em dũng tướng phò tá đắc lực cho Bà Triệu, chỉ huy các mũi xung kích phòng thủ căn cứ Bồ Điền; sau khi hy sinh được nhân dân lập đền thờ tôn xưng là "Ba Vua".
* **Phân loại nguồn & Mức độ tin cậy**:
  * **Folklore / Local Legend** (Thần tích đền Ba Vua thôn Phú Điền, xã Triệu Lộc, huyện Hậu Lộc; *Đại Nam Nhất Thống Chí*; hoàn toàn là truyền thuyết dân gian và di tích địa phương).
* **Vai trò Gameplay đề xuất**: **Rapid Multi-Striker / Skirmisher** (Bộ binh dũng cảm tấn công liên hoàn tốc độ cao).
* **Vũ khí & Phong thái**:
  * Chiến binh trang phục áo chàm vạt ngắn túm gọn gàng, xăm mình họa tiết giao long, quấn xà cạp vải gai, sử dụng song đao hoặc đoản kích linh hoạt.
* **Lý do chọn**: Đại diện sâu sắc cho tầng lớp tướng lĩnh địa phương gắn bó trực tiếp với di tích lịch sử đền Bà Triệu và căn cứ Bồ Điền; tạo lối chơi cận chiến tốc độ cao khác biệt với phong cách hộ vệ của Triệu Quốc Đạt.

---

## 2. Các Phương Án Dự Phòng Cho Hero Thứ Ba (Fallback Options)

Do **Ba Vua Bồ Điền** có nguồn gốc thuần túy từ thần tích địa phương, đề xuất 2 phương án dự phòng rõ ràng:

### 2.1. Phương Án Dự Phòng 1 (Khuyên Dùng Về Đa Dạng Lối Chơi): Sơn Nữ Ngàn Nưa
* **Danh tính & Bối cảnh**: Hình tượng đại diện cho tập thể nữ binh và dân binh thợ săn vùng núi rừng Ngàn Nưa tham gia khởi nghĩa.
* **Phân loại nguồn & Mức độ tin cậy**:
  * **Game Interpretation / Folklore Inspiration** (Nhân vật sáng tạo nghệ thuật của game nhằm đại diện cho lực lượng nhân dân du kích địa phương; không gán mác nhân vật lịch sử đơn lẻ).
* **Vai trò Gameplay đề xuất**: **Ranged Archer & Trapper** (Xạ thủ nỏ rừng cơ động, bắn tỉa và đặt bẫy cản bước quân địch).
* **Vũ khí & Phong thái**: Nữ thợ săn áo chàm, đội nón lá cọ nẹp mây, đeo ống tên nứa sau lưng, cầm cây Nỏ Lạc Việt thân gỗ nẹp gân trâu dẻo dai.
* **Lý do dự phòng**: Bổ sung mảnh ghép **Xạ Thủ Tầm Xa (Ranged)** cực kỳ cần thiết cho đội hình 3 Hero (nếu Hero 1 & 2 đều là cận chiến); hoàn toàn trong sáng về mặt lịch sử vì được công bố rõ là hình tượng nhân dân hóa thân trong game.

### 2.2. Phương Án Dự Phòng 2: Đỗ Thúc (Hào Trưởng Liên Minh)
* **Danh tính & Bối cảnh**: Vị hào trưởng tham gia liên minh các tù trưởng/hào trưởng bản địa theo cờ nghĩa Bà Triệu.
* **Phân loại nguồn & Mức độ tin cậy**:
  * **Folklore / Unverified Candidate** (Ghi chép dã sử địa phương và gia phả dòng họ cổ tại Thanh Hóa).
* **Vai trò Gameplay đề xuất**: **Allied Chieftain / Tactical Striker** (Thủ lĩnh bộ tộc miền núi, hỗ trợ trận địa).
* **Lý do dự phòng**: Có tên tuổi cụ thể trong dã sử địa phương đại diện cho khối liên minh các hào tộc Cửu Chân.

---

## 3. Bảng Phân Tích Lý Do Chọn & Bỏ Từng Ứng Viên Hero

| Ứng Viên | Mức Độ Nguồn | Đề Xuất Trong Gói | Lý Do Chọn / Bỏ |
|---|---|---|---|
| **Triệu Thị Trinh** | Historical / Later / Folklore | **Hero 1 (Chính)** | Nhân vật hạt nhân lịch sử bắt buộc phải có của thời kỳ. |
| **Triệu Quốc Đạt** | Later source / Folklore | **Hero 2 (Chính)** | Nhân vật đồng khởi xướng, bảo đảm thế công - thủ chỉ huy cân bằng. |
| **Ba Vua Bồ Điền** | Folklore / Local Legend | **Hero 3 (Đề xuất 1)** | Gắn bó trực tiếp với quần thể di tích Bồ Điền; tạo chất cận chiến tốc độ. |
| **Sơn Nữ Ngàn Nưa** | Game interpretation | **Hero 3 (Dự phòng 1)** | Tạo độ phong phú gameplay tầm xa (Ranged); đại diện cho nhân dân. |
| **Đỗ Thúc** | Folklore / Unverified | **Hero 3 (Dự phòng 2)** | Dự phòng phương án nhân vật cụ thể nếu Ba Vua bị đánh giá quá huyền tích. |
| **Lục Dận** | Historical Fact | **Chuyển sang Boss** | Tướng đối địch xâm lược, không thể làm Hero phe ta. |
| **Tiết Bính** | Folklore / Game interp. | **Chuyển sang Boss** | Quan chức đô hộ phương Bắc đối kháng, phù hợp vai trò Boss cứ điểm. |
| **Bùi Thị Trinh** | Folklore / Unverified | **Bỏ khỏi Roster** | Tư liệu dã sử truyền khẩu rất mờ nhạt, dễ trùng lặp tạo hình với Bà Triệu. |
| **Đinh Lôi, Cao Minh**| Folklore / Unverified | **Bỏ khỏi Roster** | Thần tích lẻ tẻ, độ nhận diện công chúng thấp, chưa đủ nổi bật cho 3 slot Hero. |
| **Vương Thị (Chị Dâu)**| Folklore / Legend | **Bỏ khỏi Roster** | Nhân vật trong câu chuyện đạo lý gia đình, không mang vai trò chiến trận. |
| **Bà Mẹ Phú Điền** | Folklore / Legend | **Bỏ khỏi Roster** | Hình tượng hậu phương nuôi quân, không phù hợp làm Hero tháp canh chiến đấu. |

---

## 4. Đề Xuất Enemy Roster Cho Playable Pack

### 4.1. 3 Normal Enemy (Kẻ Địch Thường)
1. **Ngô Thiết Giáp Sĩ (Heavy Armored Footman)**:
   * *Nguồn*: **Historical / Later source** (Bộ binh mang giáp phiến sắt sơn then đen, khiên chữ nhật gỗ bọc da nẹp sắt, tay cầm kích hoặc đao ngắn).
   * *Đặc trưng*: Bước đi chậm rãi, đĩnh đạc, khả năng chịu đòn vật lý tốt, đi tiên phong che chở tuyến sau.
2. **Ngô Nỏ Thủ Cơ Giới (Crossbow Soldier)**:
   * *Nguồn*: **Historical / Later source** (Nỏ binh quân dụng phương Bắc trang bị nỏ cơ khí lẫy đồng, mang ống tên sắt sau lưng).
   * *Đặc trưng*: Tốc độ di chuyển trung bình, tạo hỏa lực tầm xa uy hiếp trận địa.
3. **Thủy Binh & Dân Phu Giang Đông (Mariner / Runner)**:
   * *Nguồn*: **Historical / Later source** (Lính thủy hạng nhẹ và dân phu tạp dịch bị bắt ép phục dịch).
   * *Đặc trưng*: Mặc áo chẽn gọn gàng, cầm câu liêm hoặc giáo ngắn; di chuyển nhanh nhẹn theo từng nhóm đông đảo.

### 4.2. 1 Elite Enemy (Kẻ Địch Tinh Anh)
* **Ngô Tiên Phong Kỵ Sĩ (Shock Heavy Cavalry)**:
  * *Nguồn*: **Historical / Later source** (Kỵ binh nhẹ cơ động của quân đội Đông Ngô thời Tam Quốc).
  * *Tạo hình*: Cưỡi ngựa chiến trang bị giáp ngực, mang giáo dài, cờ hiệu ngũ sắc tung bay sau lưng.
  * *Đặc trưng*: Tốc độ di chuyển rất nhanh, đột phá chớp nhoáng qua các bãi bồi ven sông để tiếp cận trận địa phòng ngự.
  * *(Dự phòng Elite: Đốc Chiến Quan Đông Ngô mang cờ lệnh đốc thúc binh sĩ).*

---

## 5. Đề Xuất 1–2 Boss Candidates (Ứng Viên Boss)

### 5.1. Boss Chính Số 1: Lục Dận (Thứ Sử Giao Châu — Thống Soái Đông Ngô)
* **Phân loại nguồn & Mức độ tin cậy**: **Historical Fact** (*Tam Quốc Chí* - Ngô Chí: Lục Kháng phụ Lục Dận truyện).
* **Bối cảnh**: Viên tướng mưu mô được Tôn Quyền cử sang dẹp loạn năm 248 SCN; sử chép tổng quân lực thu phục/tập hợp trong toàn chiến dịch khoảng 8.000 người.
* **Tạo hình Visual**:
  * Mặc cẩm bào quý tộc Giang Đông bên trong giáp phiến sắt viền đồng mạ vàng lộng lẫy, đội mũ quan võ thời Tam Quốc, tay cầm kiếm Hoàn Thủ đao nạm ngọc.
  * Thần thái: Viên quan kinh lược thâm trầm, mưu lược, đại diện cho sức mạnh và thủ đoạn chia rẽ phân hóa của triều đình Đông Ngô.
* **Vai trò trong màn chơi**: Boss tối cao của chiến dịch, xuất hiện ở đợt tiến công quyết định.

### 5.2. Boss Phụ / Cứ Điểm Số 2: Tiết Bính (Quan Chức Đô Hộ Thành Tư Phố)
* **Phân loại nguồn & Mức độ tin cậy**: **Folklore / Game Interpretation** (Nhân vật giả định trong bối cảnh game đại diện cho tầng lớp quan lại đô hộ cố thủ trong thành Tư Phố; không phải nhân vật chính sử năm 248).
* **Tạo hình Visual**:
  * Tướng giáp sắt hộ tâm kính lớn, đứng trên Chiến xa gỗ bọc sắt nẹp cọc nhọn.
  * Thần thái: Tướng trấn thủ đồn lũy kiên cố, ngoan cố bám trụ trước đợt tấn công của nghĩa quân.
* **Vai trò trong màn chơi**: Boss mở màn tại cứ điểm tiền tiêu hoặc trận công thành Tư Phố.

---

## 6. Đề Xuất 1 Map / Bối Cảnh Chính Của Gói

* **Tên Map Đề Xuất**: **Phòng Tuyến Bồ Điền — Tùng Sơn (Bồ Điền Base & Tùng Mountain Defense)**
* **Phân loại nguồn địa lý**: **Later source & Local Geography** (*Đại Nam Nhất Thống Chí*, *Toàn Thư*, di tích lịch sử quốc gia đặc biệt đền Bà Triệu tại xã Triệu Lộc, huyện Hậu Lộc, tỉnh Thanh Hóa).
* **Mô tả không gian & Diễn giải mỹ thuật**:
  * *Bối cảnh*: Vùng bán sơn địa trù phú và hiểm trở: Phía trước là bình nguyên đồng lúa xen lẫn đầm lầy lau sậy ven sông Lạch Trường; phía sau tựa vào dãy núi đá vôi Tùng Sơn sừng sững.
  * *Công trình phòng thủ bản địa*: Hệ thống tường lũy đất nện ken cọc gỗ lim, hào sâu dẫn nước bùn cắm chông tre ngầm, tháp canh thân cau rừng cắm cờ vàng phấp phới.
  * *Đường tiến quân của địch*: Thuyền chiến Ngô đổ bộ từ cửa sông, lính bộ binh và kỵ binh dàn trận tiến qua bãi lau sậy và đường thiên lý áp sát căn cứ.
