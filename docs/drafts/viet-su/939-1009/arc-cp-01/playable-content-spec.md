# Đặc Tả Nội Dung Playable Chapter: Bình Chiêm Phạt Bạo (ARC-CP-01)

**Mã Chapter**: `ARC-CP-01`
**Tên Chapter**: `Bình Chiêm Phạt Bạo — Nam Chinh 982`
**Mã Màn Chơi (Stage ID)**: `stage-cp-982-indrapura-01`
**Tên Màn Chơi (Stage Name)**: `Huyết Chiến Cửa Thành Indrapura`
**Giai đoạn Lịch sử**: 982 SCN (Chiến dịch Nam phạt Champa thời Tiền Lê)
**Trạng thái**: Official Playable Content Specification (Locked & Runtime-Aligned)

---

> [!IMPORTANT]
> **Ràng Buộc Phạm Vi & Kỷ Luật Ghi Nhãn Lịch Sử (Historiographical Discipline)**:
> Mọi chi tiết thiết kế gameplay và bối cảnh được phân loại minh bạch theo 3 nhãn chuẩn:
> - `[SOURCE-BACKED]`: Dữ kiện được ghi nhận trực tiếp trong nguồn thư tịch xác định (*Đại Việt Sử Ký Toàn Thư*, *Tống Sử*, *Đại Việt Sử Lược*, Văn bia Champa).
> - `[PLAUSIBLE ADAPTATION]`: Phục dựng bối cảnh quân sự miền duyên hải, thành lũy Indrapura và lộ trình viễn chinh thế kỷ X.
> - `[GAMEPLAY ADAPTATION]`: Trừu tượng hóa cơ chế Tower Defense (10 Waves, tầm đánh, chu kỳ đòn đánh kích hoạt kỹ năng, một tuyến đường hành quân chuẩn MVP).

---

## 1. Tóm Tắt Cốt Truyện Bối Cảnh (Narrative Framing)

### 1.1. Bối Cảnh Mở Đầu (Narrative Prelude — 2 đến 3 câu)
* **Câu 1**: `[SOURCE-BACKED: Toàn Thư]` Năm 981, vua Chiêm Thành bắt giam sứ giả Từ Mục và Ngô Tử Canh của Đại Cồ Việt, gây ra cuộc khủng hoảng ngoại giao nghiêm trọng ở biên giới phía Nam.
* **Câu 2**: `[SOURCE-BACKED: Toàn Thư]` Mùa hạ năm 982, Lê Hoàn tự mình thống suất đại quân thủy bộ vượt biển Nam chinh, quyết tâm trừng phạt hành vi bội ước và khẳng định uy thế quốc gia độc lập.

### 1.2. Bối Cảnh Kết Thúc / Đại Thắng (Narrative Epilogue — 2 đến 3 câu)
* **Câu 1**: `[SOURCE-BACKED: Toàn Thư / Tống Sử]` Tiến thẳng vào kinh đô Indrapura, quân Đại Cồ Việt giao chiến ác liệt, chém chết vua Chiêm Bê Mê Thuế ngay tại trận tiền và đập tan sức kháng cự của đối phương.
* **Câu 2**: `[SOURCE-BACKED: Toàn Thư]` Giải cứu thành công các sứ giả, thu về vô số chiến lợi phẩm, Lê Hoàn khải hoàn ca khúc, củng cố vững chắc bờ cõi phía Nam của non sông Đại Cồ Việt.

---

## 2. Mục Tiêu Người Chơi & Bản Sắc Trận Địa (Player Objective & Identity)

* **Mục tiêu chính (Primary Objective)**: Bảo vệ Căn Cứ Tiền Tiêu / Trại Quân Đại Cồ Việt, tiêu diệt toàn bộ 10 đợt phản kích của quân đội Champa, hạ gục Vua Chiêm Bê Mê Thuế ở đợt 10.
* **Điều kiện thất bại**: Máu doanh trại (`cityHp`) giảm về 0 (Khởi điểm: $10/10\text{ HP}$).
* **Bản sắc chiến trường (Battlefield Identity)**:
  - Tái hiện địa hình duyên hải miền Trung đặc trưng thế kỷ X: đồi cát trắng ven biển, rừng dừa rậm rạp, tháp gạch Champa nung đỏ (`#b45309`), hào nước sâu và thành đất bọc đá ong Indrapura.
  - Tông màu chủ đạo: Đất cát vàng nhạt (`#d97706`), tháp gạch nung đỏ rực (`#991b1b`), cây cối nhiệt đới xanh lục sẫm (`#14532d`), hào nước biển xanh ngọc (`#0e7490`).
  - Mang đậm dấu ấn đối đầu văn hóa: Quân Đại Cồ Việt (giáp đồng, áo bạt nâu sẫm, trường kiếm) đối đầu Quân đội Champa (sarong hoa văn lửa, khiên mây, kiếm cong kris và voi chiến bọc giáp).

---

## 3. Bảng Tổng Hợp Khung Playable Content Chapter

| Thành Phần Hệ Thống | Định Danh / Thông Số Khóa | Phân Cấp & Mô Tả Gameplay |
|---|---|---|
| **Mã Chapter / Stage** | `ARC-CP-01` / `stage-cp-982-indrapura-01` | Chiến dịch Nam phạt Champa 982 của Lê Hoàn. |
| **Mã Bản Đồ (Map ID)** | `map-cp-indrapura-01` | Bản đồ TD $800 \times 600\text{ px}$ (Lưới $10 \times 8$), **1 tuyến đường chuẩn MVP (`fixedPath`)**. |
| **Đội Hình 3 Tướng Chính Thức** | 1. **Lê Hoàn** (`le-hoan-nam-chinh` — Cận chiến Dồn Sát Thương & Trảm Tướng)<br>2. **Phạm Cự Lạng** (`pham-cu-lang-nam-chinh` — Đấu sĩ Tiền tuyến Khống chế Diện rộng)<br>3. **Từ Mục** (`tu-muc` — Xạ thủ Trinh sát Bắn tỉa & Làm chậm) | Tam giác chiến thuật chuẩn: Sát Thương Đơn Bộc Phá + Khống Chế AoE + Xạ Thủ Hoa Tiêu Tầm Xa. |
| **Hệ Thống Quái Vật Thường** | 1. `cham-dao-khien` (Chiến Binh Đao Khiên Champa — `sword`)<br>2. `cham-cung-thu` (Xạ Thủ Cung Mây Champa — `archer`)<br>3. `cham-tuong-binh` (Voi Chiến Champa — `other`) | 3 Archetype bộ binh cận chiến nhanh, cung thủ bắn tỉa cơ động và voi chiến bọc giáp cực kỳ bền bỉ. |
| **Trùm Cuối (Final Boss)** | `boss-be-me-thue` (Vua Chiêm Bê Mê Thuế / Paramesvaravarman I) | Trùm tượng binh hoàng gia (`category: other`), HP rất cao ($1,600$), City Damage 5, thể hình $1.4\times$. |
| **Tiến Trình 10 Wave** | 10 Wave phân bổ theo nhịp tăng tiến thành phần | Wave 1–3 (Tiền đồn duyên hải), Wave 4–6 (Xung kích cung thủ & tượng binh), Wave 7–9 (Cấm quân hoàng gia Indrapura), Wave 10 (Boss Bê Mê Thuế xuất trận). |
| **Ràng Buộc Combat Core** | Tuân thủ 100% schema và engine hiện có | **Đòn đánh thường single-target 100%**; không DEF; không mana; Active Skill dựa trên số đòn đánh (`skillTriggerHits`). |
| **Trạng Thái Passive / Huyền Sử** | **DESIGN-LOCKED BUT RUNTIME-DEFERRED** | Kỹ năng Active là yêu cầu bắt buộc cho MVP; Passive/Huyền Sử được khóa thiết kế và chờ hệ thống chia sẻ sau. |

---

## 4. Bậc Thang Tăng Tiến Gameplay (Gameplay Escalation Logic)

Trận đấu gồm 10 Wave được chia thành 4 giai đoạn chiến thuật rõ rệt trên tuyến đường hành quân duy nhất (`fixedPath`):

1. **Giai đoạn Khởi động (Wave 1 – 3: Đột Phá Bãi Cát Duyên Hải)**:
   - Chiến binh đao khiên và cung thủ Champa xuất hiện thưa thớt ($1,200\text{ ms} - 1,000\text{ ms}$).
   - Người chơi bố trí Lê Hoàn và Từ Mục kiểm soát ngã rẽ đầu tiên gần bến đổ bộ.
2. **Giai đoạn Tăng tốc (Wave 4 – 6: Tượng Binh Xuất Kích)**:
   - Xuất hiện Voi Chiến Champa (`cham-tuong-binh`) với lượng máu dày ($350\text{ HP}$) và gây $2$ sát thương thành trì, đòi hỏi kích hoạt làm chậm của Từ Mục.
3. **Giai đoạn Thử thách Đỉnh điểm (Wave 7 – 9: Vệ Binh Đền Tháp Indrapura)**:
   - Hỗn hợp cung thủ bắn nhanh và voi chiến đi thành cụm dày đặc ($16 - 22$ quân mỗi wave), thử thách khả năng khống chế diện rộng của Phạm Cự Lạng.
4. **Giai đoạn Quyết chiến (Wave 10: Trảm Tướng Đoạt Thành)**:
   - Vua Chiêm Bê Mê Thuế cưỡi voi chiến hoàng gia xuất trận cùng toán vệ binh tinh nhuệ. Người chơi cần dồn toàn bộ sát thương bộc phá của Lê Hoàn để dứt điểm Boss trước khi tiến sát trại quân.

---

## 5. Ranh Giới Kỹ Thuật & Tương Thích Runtime (Scope Boundaries)

### 5.1. Các Hệ Thống Tái Sử Dụng Hoàn Toàn (Zero Modification)
* **`CombatController`**: Cơ chế nhắm mục tiêu tự động (`target selection`), đếm số đòn đánh để kích hoạt kỹ năng (`skillTriggerHits`), tính sát thương cơ bản và chí mạng.
* **`resolveSkill`**: Bộ xử lý hiệu ứng mảng `effects: SkillEffect[]` chuẩn: Gây sát thương (`damage`), diện rộng (`aoe`), đa kích (`multiHit`), làm chậm (`slow`), làm bất động (`root`/`stun`).
* **`WaveManager` & `BattleBridge`**: Quản lý 10 đợt quái, phát tín hiệu snapshot, đồng bộ trạng thái trận đấu lên React HUD.
* **`HeroPlacementRegistry`**: Quản lý đặt và di chuyển 3 tướng trên các ô quy định.
* **`BattleScene`**: Render một tuyến đường cố định duy nhất (`fixedPath`).

### 5.2. Phân Định Rõ Ràng Về Runtime Requirement
* **RUNTIME EXTENSION REQUIRED FOR ARC-CP-01 MVP**: **`NONE`**.
* **DEFERRED FUTURE REQUIREMENT**: Hệ thống kích hoạt Passive / Huyền Sử tự động dùng chung cho toàn game.
