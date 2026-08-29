# Đặc Tả Nội Dung Playable Chapter: Đại Thắng Kháng Tống 981 (ARC-KT-01)

**Mã Chapter**: `ARC-KT-01`
**Tên Chapter**: `Long Cổn Cứu Quốc — Đại Thắng Kháng Tống 981`
**Mã Màn Chơi (Stage ID)**: `stage-kt-981-dai-thang-01`
**Tên Màn Chơi (Stage Name)**: `Huyết Chiến Phòng Tuyến 981`
**Giai đoạn Lịch sử**: 980 – 981 SCN (Giai đoạn chuyển giao Tiền Lê & Kháng chiến chống Tống)
**Trạng thái**: Official Playable Content Specification (Locked)

---

> [!IMPORTANT]
> **Ràng Buộc Phạm Vi & Kỷ Luật Ghi Nhãn Lịch Sử (Historiographical Discipline)**:
> Mọi chi tiết thiết kế gameplay và bối cảnh được phân loại minh bạch theo 3 nhãn chuẩn:
> - `[SOURCE-BACKED]`: Dữ kiện được ghi nhận trực tiếp trong sử liệu T1 (*Tống Sử*, *Tục Tư Trị Thông Giám Trường Biên*) hoặc T2 (*Đại Việt Sử Ký Toàn Thư*, *Cương Mục*).
> - `[PLAUSIBLE ADAPTATION]`: Phục dựng bối cảnh quân sự, địa hình và liên kết hợp lý dựa trên thực tế thế kỷ X.
> - `[GAMEPLAY ADAPTATION]`: Trừu tượng hóa cơ chế Tower Defense (10 Waves, tầm đánh, chu kỳ đòn đánh kích hoạt kỹ năng).

---

## 1. Tóm Tắt Cốt Truyện Bối Cảnh (Narrative Framing)

### 1.1. Bối Cảnh Mở Đầu (Narrative Prelude — 2 đến 3 câu)
* **Câu 1**: `[SOURCE-BACKED: T2]` Năm 980, trước nguy cơ đại quân đế chế Tống chia hai ngả thủy bộ sang xâm lược, triều đình Hoa Lư rơi vào tình thế ngàn cân treo sợi tóc.
* **Câu 2**: `[SOURCE-BACKED: T2]` Thái hậu Dương Vân Nga cùng tướng sĩ đồng lòng trao áo Long Cổn tôn Thập đạo tướng quân Lê Hoàn lên ngôi Hoàng đế, thống nhất ý chí toàn dân bước vào cuộc quyết chiến vệ quốc.

### 1.2. Bối Cảnh Kết Thúc / Đại Thắng (Narrative Epilogue — 2 đến 3 câu)
* **Câu 1**: `[SOURCE-BACKED: T1/T2]` Bằng tài thao lược kiệt xuất, Lê Hoàn chỉ huy quân dân chặn đứng thủy quân Tống tại Bạch Đằng, dùng kế trá hàng chém chết chủ tướng Hầu Nhân Bảo vào tháng 4 năm 981.
* **Câu 2**: `[SOURCE-BACKED: T2]` Thừa thắng truy kích, quân Đại Cồ Việt phá tan tàn quân địch tại Tây Kết, bắt sống tướng giặc, đập tan hoàn toàn mưu đồ xâm lăng của nhà Tống, bảo vệ vững chắc nền độc lập non trẻ.

---

## 2. Mục Tiêu Người Chơi & Bản Sắc Trận Địa (Player Objective & Identity)

* **Mục tiêu chính (Primary Objective)**: Phòng thủ Căn cứ Chỉ Huy / Cửa Thành Đại Cồ Việt, tiêu diệt toàn bộ 10 đợt tiến công của liên quân bộ binh - thủy binh nhà Tống, hạ gục Chủ tướng Hầu Nhân Bảo ở đợt 10.
* **Điều kiện thất bại**: Máu thành trì (`cityHp`) giảm về 0 (Khởi điểm: $10/10\text{ HP}$).
* **Bản sắc chiến trường (Battlefield Identity)**:
  - Tái hiện phòng tuyến kết hợp sông ngòi - đồi núi hiểm trở thế kỷ X (Địa bàn sông Chi Lăng - sông Lục Đầu - sông Bạch Đằng).
  - Tông màu chủ đạo: Nước sông phù sa xanh sẫm (`#132b35`), bờ lũy đất nện xám nâu (`#4d3826`), rừng lau rậm rạp (`#2d402b`), công sự cọc gỗ phòng ngự (`#8c6239`).
  - Mang đậm dấu ấn Đại Cồ Việt thời sơ khởi: áo giáp bạt đính đồng, thuyền nan cơ động, cung nỏ dã chiến.

---

## 3. Bảng Tổng Hợp Khung Playable Content Chapter

| Thành Phần Hệ Thống | Định Danh / Thông Số Khóa | Phân Cấp & Mô Tả Gameplay |
|---|---|---|
| **Mã Chapter / Stage** | `ARC-KT-01` / `stage-kt-981-dai-thang-01` | Chiến dịch Kháng Tống 981 thời Lê Hoàn. |
| **Mã Bản Đồ (Map ID)** | `map-kt-chi-lang-luc-dau-01` | Bản đồ TD $800 \times 600\text{ px}$ (Lưới $10 \times 8$), 2 nhánh hợp lưu. |
| **Đội Hình 3 Tướng Chính Thức** | 1. **Lê Hoàn** (`le-hoan` — Chủ công Tiên phong)<br>2. **Phạm Cự Lạng** (`pham-cu-lang` — Đấu sĩ Khống chế)<br>3. **Dương Vân Nga** (`duong-van-nga` — Hỗ trợ Tầm xa) | Tam giác chiến thuật: Sát Thương Đơn Bộc Phá + Khống Chế Diện Rộng + Hỗ Trợ Tầm Xa Làm Chậm. |
| **Hệ Thống Quái Vật Thường** | 1. `tong-bo-binh` (Tống Đao Khiên Binh — `sword`)<br>2. `tong-cung-thu` (Tống Nỏ Thủ — `archer`)<br>3. `tong-chien-thuyen` (Chiến Thuyền / Thiết Kỵ — `other`) | 3 Archetype chuẩn hóa đại diện cho bộ binh giáp nặng, xạ thủ tầm xa và xung kích cơ động. |
| **Trùm Cuối (Final Boss)** | `boss-hou-renbao` (Lĩnh Nam Chuyển Vận Sứ Hầu Nhân Bảo) | Trùm bộ binh hạng nặng (`category: other`), HP cao ($1,500$), City Damage 5, thể hình $1.4\times$. |
| **Tiến Trình 10 Wave** | 10 Wave phân bổ theo nhịp tăng tiến chiến thuật | Wave 1–3 (Tiền thám thủy bộ), Wave 4–6 (Áp lực hợp đồng nỏ binh), Wave 7–9 (Thiết giáp đại quân), Wave 10 (Boss Hầu Nhân Bảo tổng tấn công). |
| **Ràng Buộc Combat Core** | Tuân thủ 100% engine hiện có | Không thêm chỉ số DEF, không mana, không manual ultimate, đòn đánh thường đơn mục tiêu. |

---

## 4. Bậc Thang Tăng Tiến Gameplay (Gameplay Escalation Logic)

Trận đấu gồm 10 Wave được chia thành 4 giai đoạn chiến thuật rõ rệt:

1. **Giai đoạn Khởi động (Wave 1 – 3: Tiền Thám Biên Ải)**:
   - Quái bộ binh và nỏ thủ thám thính di chuyển đơn lẻ với khoảng cách rộng ($1,200\text{ ms} - 1,000\text{ ms}$).
   - Người chơi bố trí 1–2 tướng kiểm soát ngã ba đường.
2. **Giai đoạn Tăng tốc (Wave 4 – 6: Hợp Lực Thủy Bộ Tống Quân)**:
   - Xuất hiện Chiến Thuyền / Thiết Kỵ tốc độ nhanh ($115\text{ px/s}$) đi xen kẽ nỏ thủ, đe dọa vượt qua phòng tuyến nếu không có kỹ năng làm chậm.
3. **Giai đoạn Thử thách Đỉnh điểm (Wave 7 – 9: Đại Quân Giáp Nặng)**:
   - Binh lính giáp nặng số lượng lớn ($16 - 22$ quân mỗi wave) đi thành cụm dày đặc, đòi hỏi kích hoạt chiêu thức khống chế của Phạm Cự Lạng và sát thương diện rộng của Dương Vân Nga.
4. **Giai đoạn Quyết chiến (Wave 10: Đại Thắng Hầu Nhân Bảo)**:
   - Boss Hầu Nhân Bảo xuất hiện cùng toán hộ vệ tinh nhuệ bọc lót. Người chơi cần dồn toàn lực đòn chém bộc phá của Lê Hoàn kết hợp khống chế để hạ gục Boss trước khi tiến sát cổng thành.

---

## 5. Ranh Giới Kỹ Thuật & Tương Thích Runtime (Scope Boundaries)

### 5.1. Các Hệ Thống Tái Sử Dụng Hoàn Toàn (Zero Modification)
* **`CombatController`**: Cơ chế nhắm mục tiêu (`target selection`), đếm số đòn đánh để kích hoạt kỹ năng (`skillTriggerHits`), tính sát thương cơ bản và chí mạng.
* **`resolveSkill`**: Bộ xử lý hiệu ứng diện rộng, gây sát thương (`damage`), làm chậm (`slow`), làm bất động (`immobilize`).
* **`WaveManager` & `BattleBridge`**: Quản lý 10 đợt quái, phát tín hiệu snapshot, đồng bộ trạng thái trận đấu lên React HUD.
* **`HeroPlacementRegistry`**: Quản lý đặt và di chuyển 3 tướng trên các ô quy định.

### 5.2. Các Yêu Cầu Dữ Liệu Cần Cung Cấp Cho Codex (Data-Only Scope)
* **`HeroDefinition`**: Thêm 3 định nghĩa tướng (`le-hoan`, `pham-cu-lang`, `duong-van-nga`).
* **`SkillDefinition`**: Thêm 3 kỹ năng chủ động tương ứng.
* **`EnemyDefinition`**: Thêm 3 quái thường (`tong-bo-binh`, `tong-cung-thu`, `tong-chien-thuyen`) và 1 Boss (`boss-hou-renbao`).
* **`MapDefinition` & `WaveDefinition`**: Thêm map 981 và danh sách 10 wave.
