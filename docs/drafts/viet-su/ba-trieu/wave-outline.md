# Phác Thảo 10 Wave Màn Chơi: Khởi Nghĩa Bà Triệu (Ten-Wave Chapter Outline)

> [!IMPORTANT]
> **Ràng Buộc Thiết Kế Wave (Task `VS-BT-04`)**:
> - Tài liệu này là **Bản Phác Thảo Cốt Truyện & Nhịp Độ Màn Chơi (10-Wave Conceptual Outline)**, chưa khóa thông số balance cụ thể.
> - **TUYỆT ĐỐI KHÔNG TẠO CHỈ SỐ PRODUCTION**: Không gán HP, Speed px/s, DEF, hay Damage cụ thể cho Enemy/Boss; số lượng Enemy trong từng đợt được ký hiệu dưới dạng `[N]` hoặc định tính.
> - **Ràng Buộc Narrative Chiến Thắng**: Kết thúc Wave 10 là **chiến thắng chiến thuật của màn chơi** (nghĩa quân đẩy lùi đợt tiến công hiện tại, giữ vững phòng tuyến căn cứ Bồ Điền, Lục Dận bị đánh lui phải tạm thời rút quân về hạm đội); không khẳng định thay đổi kết cục chung của lịch sử.
> - **Nhân vật Tiết Bính**: Được đưa vào Wave 5 như một **Optional Folklore / Game Interpretation Encounter** (đã ghi chú rõ ràng về tính chất truyền thuyết / sáng tạo game).

---

## 1. Tổng Quan Cấu Trúc Nhịp Độ 10 Wave

```mermaid
graph TD
    subgraph TIỀN TUYẾN THĂM DÒ (WAVE 1 - 3)
        W1["Wave 1: Thuyền Chiến Cập Bến<br><i>Warm-up</i>"] --> W2["Wave 2: Mưa Tên Đầm Lầy<br><i>Ramp-up</i>"]
        W2 --> W3["Wave 3: Thiết Giáp Xuất Trận<br><i>Armor Introduction</i>"]
    end
    subgraph GIAO TRANH DỮ DỘI (WAVE 4 - 6)
        W3 --> W4["Wave 4: Binh Chủng Phối Hợp<br><i>Tactical Pressure</i>"]
        W4 --> W5["Wave 5: Đột Phá Cứ Điểm (Mini-Boss Tiết Bính)<br><i>Mid-Boss Spike (Folklore Encounter)</i>"]
        W5 --> W6["Wave 6: Bão Táp Kỵ Binh<br><i>Speed Check Spike</i>"]
    end
    subgraph TỔNG LỰC TẤN CÔNG (WAVE 7 - 10)
        W6 --> W7["Wave 7: Gọng Kìm Thủy Bộ<br><i>Heavy Swarm & Armor</i>"]
        W7 --> W8["Wave 8: Tiên Phong Áp Đảo<br><i>Multi-Lane Rush</i>"]
        W8 --> W9["Wave 9: Trống Trận Giang Đông<br><i>Elite Vanguard Wave</i>"]
        W9 --> W10["Wave 10: Quyết Chiến Bồ Điền (Boss Lục Dận)<br><i>Climax Tactical Victory</i>"]
    end
```

---

## 2. Chi Tiết Từng Wave Màn Chơi (Wave 1 — 10)

### Wave 1: Thuyền Chiến Cập Bến (The Landfall)
* **Mục tiêu cảm xúc / Gameplay**: Làm quen nhịp độ (Warm-up); làm quen với lộ trình di chuyển (Fixed Path) của quân địch và thử nghiệm đòn đánh thường của các Hero ban đầu.
* **Thành phần kẻ địch (Composition)**:
  * `[N]` Thủy Binh & Dân Phu Giang Đông (`thuy-binh-dan-phu`) — Xuất hiện theo từng nhóm nhỏ, di chuyển nhanh.
* **Định hướng độ khó (Difficulty)**: `Rất Dễ` (Tutorial / Introduction).
* **Diễn biến cốt truyện (Narrative Beat)**: Hạm đội Đông Ngô thả neo tại cửa sông Lạch Trường, xua các toán lính thủy nhẹ và dân phu thăm dò bãi bồi ven sông để mở đường.

---

### Wave 2: Mưa Tên Đầm Lầy (Crossbow Skirmish)
* **Mục tiêu cảm xúc / Gameplay**: Gia tăng áp lực nhẹ; làm quen với đội hình có sự yểm trợ tầm xa của nỏ binh.
* **Thành phần kẻ địch (Composition)**:
  * `[N]` Thủy Binh & Dân Phu Giang Đông (`thuy-binh-dan-phu`) — Đi tiên phong.
  * `[N]` Ngô Nỏ Thủ Cơ Giới (`ngo-no-thu`) — Đi hộ tống phía sau theo nhịp ổn định.
* **Định hướng độ khó (Difficulty)**: `Dễ` (Steady Ramp-up).
* **Diễn biến cốt truyện (Narrative Beat)**: Quân Ngô triển khai các toán nỏ binh lẫy đồng bắn yểm trợ cho lính trinh sát vượt qua các con lạch nhỏ ven đầm lầy Bồ Điền.

---

### Wave 3: Thiết Giáp Xuất Trận (Iron Vanguard)
* **Mục tiêu cảm xúc / Gameplay**: Giới thiệu kẻ địch hạng nặng; kiểm tra khả năng dồn sát thương đơn mục tiêu và cản phá của Hero (đặc biệt là Triệu Quốc Đạt).
* **Thành phần kẻ địch (Composition)**:
  * `[N]` Ngô Thiết Giáp Sĩ (`ngo-thiet-giap`) — Bộ binh mang khiên lớn đi chậm, chống chịu tốt.
  * `[N]` Thủy Binh & Dân Phu Giang Đông (`thuy-binh-dan-phu`) — Bọc lót hai bên.
* **Định hướng độ khó (Difficulty)**: `Trung bình thấp` (Armor Introduction).
* **Diễn biến cốt truyện (Narrative Beat)**: Đội hình bộ binh mang giáp phiến sắt sơn then đen của nhà Ngô dàn hàng ngang vững chãi tiến vào trận địa ruộng lúa.

---

### Wave 4: Binh Chủng Phối Hợp (Combined Assault)
* **Mục tiêu cảm xúc / Gameplay**: Thử thách khả năng phân bổ mục tiêu và kích hoạt Active Skill (AoE / Stun / Slow) khi kẻ địch di chuyển theo khối liên hoàn.
* **Thành phần kẻ địch (Composition)**:
  * `[N]` Ngô Thiết Giáp Sĩ (`ngo-thiet-giap`) — Khối che chắn phía trước.
  * `[N]` Ngô Nỏ Thủ Cơ Giới (`ngo-no-thu`) — Đi sát phía sau.
  * `[N]` Thủy Binh & Dân Phu Giang Đông (`thuy-binh-dan-phu`) — Đột kích bất ngờ theo đàn.
* **Định hướng độ khó (Difficulty)**: `Trung bình` (Tactical Pressure).
* **Diễn biến cốt truyện (Narrative Beat)**: Quân Ngô phối hợp các binh chủng giáp sắt và nỏ binh, cố gắng đè bẹp các chiến lũy tre gai tiền tiêu của nghĩa quân.

---

### Wave 5: Đột Phá Cứ Điểm (Mid-Boss Encounter — Tiết Bính)
* **Mục tiêu cảm xúc / Gameplay**: **Mid-Chapter Spike (Cao trào giữa màn)**; thử thách khả năng dồn sát thương cực lớn lên một mục tiêu duy nhất có lượng máu dồi dào.
* **Thành phần kẻ địch (Composition)**:
  * **Mini-Boss (Optional Encounter)**: **Tiết Bính** (`boss-tiet-binh`) — *Folklore / Game Interpretation* (Chiến xa gỗ bọc sắt, di chuyển rất chậm, máu dày).
  * `[N]` Ngô Thiết Giáp Sĩ (`ngo-thiet-giap`) — Cận vệ hộ tống chiến xa.
  * `[N]` Ngô Nỏ Thủ Cơ Giới (`ngo-no-thu`) — Hỏa lực bọc hậu.
* **Định hướng độ khó (Difficulty)**: `Trung bình cao` (Mid-Boss Test).
* **Diễn biến cốt truyện (Narrative Beat)**: Viên quan trấn thủ thành Tư Phố thúc chiến xa bọc sắt lao thẳng vào tuyến phòng ngự nhằm phá vỡ cổng lũy, nhưng bị các Hero chặn đứng và đánh tan tác.

---

### Wave 6: Bão Táp Kỵ Binh (Cavalry Blitz)
* **Mục tiêu cảm xúc / Gameplay**: **Speed Check Spike**; kiểm tra phản xạ xử lý mục tiêu có tốc độ di chuyển cực cao (cần hiệu ứng Root của Triệu Quốc Đạt hoặc Slow của Sơn Nữ / MultiHit của Ba Vua).
* **Thành phần kẻ địch (Composition)**:
  * **Elite Enemy (Lần đầu xuất hiện)**: `[N]` Ngô Tiên Phong Kỵ Sĩ (`ngo-tien-phong-ky-si`) — Di chuyển rất nhanh qua đường cong.
  * `[N]` Thủy Binh & Dân Phu Giang Đông (`thuy-binh-dan-phu`) — Tràn theo sau kỵ binh.
* **Định hướng độ khó (Difficulty)**: `Khá Khó` (High Mobility Challenge).
* **Diễn biến cốt truyện (Narrative Beat)**: Đội kỵ binh chiến mã Giang Đông bất ngờ bứt tốc băng qua những thửa ruộng lúa chín nhằm đánh thọc sườn cứ điểm Bồ Điền.

---

### Wave 7: Gọng Kìm Thủy Bộ (Pincer Offensive)
* **Mục tiêu cảm xúc / Gameplay**: Quản lý đám đông (Crowd Control); đối mặt với số lượng kẻ địch lớn xuất hiện liên tục không ngừng nghỉ.
* **Thành phần kẻ địch (Composition)**:
  * `[N]` Thủy Binh & Dân Phu Giang Đông (`thuy-binh-dan-phu`) — Bầy đàn áp đảo.
  * `[N]` Ngô Thiết Giáp Sĩ (`ngo-thiet-giap`) — Dày đặc xen kẽ.
  * `[N]` Ngô Nỏ Thủ Cơ Giới (`ngo-no-thu`) — Dàn trận liên tục.
* **Định hướng độ khó (Difficulty)**: `Khó` (Sustained Heavy Wave).
* **Diễn biến cốt truyện (Narrative Beat)**: Quân Ngô dồn lực mở đợt tổng công kích hai mặt thủy bộ, bùn lầy sông Mã ngập tràn bóng áo xám và giáp đen.

---

### Wave 8: Tiên Phong Áp Đảo (Iron & Steed Rush)
* **Mục tiêu cảm xúc / Gameplay**: Kết hợp độ bền cao và tốc độ cao; đòi hỏi người chơi tối ưu hóa vị trí đặt Hero và căn nhịp kích hoạt kỹ năng chuẩn xác.
* **Thành phần kẻ địch (Composition)**:
  * `[N]` Ngô Tiên Phong Kỵ Sĩ (`ngo-tien-phong-ky-si`) — Xuất hiện thành từng cặp bứt tốc.
  * `[N]` Ngô Thiết Giáp Sĩ (`ngo-thiet-giap`) — Khối cản địa kiên cố.
  * `[N]` Ngô Nỏ Thủ Cơ Giới (`ngo-no-thu`) — Hỏa lực bọc sườn.
* **Định hướng độ khó (Difficulty)**: `Rất Khó` (High Pressure Rush).
* **Diễn biến cốt truyện (Narrative Beat)**: Kỵ binh và giáp sĩ Ngô dồn toàn lực đâm sầm vào trận địa chông tre, mặt đất Bồ Điền rung chuyển dữ dội.

---

### Wave 9: Trống Trận Giang Đông (The Grand Vanguard)
* **Mục tiêu cảm xúc / Gameplay**: Đợt dọn đường đỉnh điểm trước Boss; tiêu hao tài nguyên và thử thách sự bền bỉ của trận địa.
* **Thành phần kẻ địch (Composition)**:
  * `[N]` Ngô Tiên Phong Kỵ Sĩ (`ngo-tien-phong-ky-si`) — Dẫn đầu.
  * `[N]` Ngô Thiết Giáp Sĩ (`ngo-thiet-giap`) — Dày đặc làm lá chắn.
  * `[N]` Ngô Nỏ Thủ Cơ Giới (`ngo-no-thu`) — Hỏa lực tối đa.
  * `[N]` Thủy Binh & Dân Phu Giang Đông (`thuy-binh-dan-phu`) — Tràn ngập mọi ngả đường.
* **Định hướng độ khó (Difficulty)**: `Cực Kỳ Căng Thẳng` (Pre-Boss Climax).
* **Diễn biến cốt truyện (Narrative Beat)**: Tiếng trống trận Đông Ngô thúc vang rền cửa biển, soái hạm của Thứ sử Lục Dận chính thức áp sát bờ sông.

---

### Wave 10: Quyết Chiến Bồ Điền — Thống Soái Lục Dận (The Battle of Bồ Điền)
* **Mục tiêu cảm xúc / Gameplay**: **Grand Finale / Climax Boss Fight**; thử thách tối thượng về phối hợp toàn bộ kỹ năng của bộ 3 Hero để hạ gục viên Thống soái mưu mô.
* **Thành phần kẻ địch (Composition)**:
  * **BOSS CHÍNH**: **Lục Dận** (`boss-luc-dan`) — *Historical Fact* (Thứ Sử Giao Châu Đông Ngô; cẩm bào tím lót giáp vàng, thanh Hoàn Thủ đao nạm ngọc, lượng máu cực lớn, bước đi ung dung).
  * `[N]` Ngô Tiên Phong Kỵ Sĩ (`ngo-tien-phong-ky-si`) — Đội kỵ binh cận vệ danh dự.
  * `[N]` Ngô Thiết Giáp Sĩ (`ngo-thiet-giap`) — Hộ vệ thiết giáp tinh nhuệ.
  * `[N]` Ngô Nỏ Thủ Cơ Giới (`ngo-no-thu`) — Khối nỏ binh thân tín.
* **Định hướng độ khó (Difficulty)**: `Đỉnh Điểm Thử Thách` (Chapter Climax).
* **Diễn biến cốt truyện & Kết cục màn chơi (Narrative Beat & Victory)**:
  * Thứ sử Lục Dận đích thân chỉ huy đạo quân tinh nhuệ nhất xông vào phá lũy, toan dùng thế áp đảo để san bằng đại bản doanh Bồ Điền.
  * Bà Triệu cưỡi Bạch Tượng dũng mãnh dẫn đầu cùng các Hero đồng loạt tung chiêu xuất quỷ nhập thần, bẻ gãy khối giáp sĩ cận vệ và dồn sát thương đánh lui Lục Dận.
  * **Chiến thắng chiến thuật (Tactical Victory)**:
    * Lục Dận trúng đòn trọng thương, chống gươm quỳ gối rồi hạ lệnh lui quân tháo chạy về chiến hạm ngoài cửa biển để tái chỉnh đốn lực lượng.
    * Nghĩa quân giữ vững phòng tuyến căn cứ Bồ Điền và đỉnh núi Tùng trong trận đánh oanh liệt này.
    * *Ghi chú tôn trọng lịch sử*: Đây là chiến thắng chiến thuật hào hùng của màn chơi; cuộc kháng chiến của nhân dân ta chống ách đô hộ Đông Ngô vẫn tiếp diễn sau đó, không khẳng định thay đổi kết cục chung của lịch sử.
