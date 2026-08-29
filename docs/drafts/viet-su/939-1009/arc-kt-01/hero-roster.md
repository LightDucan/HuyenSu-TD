# Danh Sách Tướng Xuất Trận Khóa: ARC-KT-01 (Hero Roster Lock)

**Chương**: `ARC-KT-01 — Long Cổn Cứu Quốc (Kháng Tống 981)`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-kt-01/hero-roster.md`
**Trạng thái**: Official 3-Hero Roster Lock

---

## 1. Cơ Sở Lựa Chọn Đội Hình & Khảo Cứu Học Thuật (Roster Audit & Selection)

Đội hình 3 Hero playable cho Chapter Kháng Tống 981 được tuyển chọn dựa trên 5 tiêu chí bắt buộc:
1. **Độ chắc chắn của nguồn sử liệu**: Có chứng thực rõ ràng từ T1 (*Tống Sử*) và T2 (*Toàn Thư*).
2. **Vai trò then chốt trong chiến dịch 981**: Người lãnh đạo tối cao, tướng tiên phong dũng liệt và nhân vật trung tâm chuyển giao quyền bính quốc gia.
3. **Bổ trợ chiến thuật hoàn chỉnh**: Tạo nên tam giác sức mạnh (Sát thương bộc phá + Khống chế diện rộng + Hỗ trợ tầm xa).
4. **Tương thích tuyệt đối với Engine**: Hoạt động trơn tru trên kiến trúc `CombatController` và `resolveSkill`.
5. **Không thêm phân lớp nhân vật hay hệ thống chiến đấu mới**.

| Ứng Viên Khảo Sát | Tầng Nguồn & Độ Tin Cậy | Vai Trò Lịch Sử & Đánh Giá Gameplay | Quyết Định Lựa Chọn |
|---|:---:|---|:---:|
| **1. Lê Hoàn** | `[SOURCE-BACKED: T1 + T2]` | Hoàng đế, Tổng tư lệnh trực tiếp đốc chiến diệt giặc; Sát thủ cận chiến / Dồn sát thương đơn mục tiêu cực mạnh. | **KHÓA CHÍNH THỨC (SLOT 1 - CORE COMMANDER)** |
| **2. Phạm Cự Lạng** | `[SOURCE-BACKED: T2]` | Đại tướng cấm quân, người khởi xướng tôn vương và đốc chiến tiền phương; Đấu sĩ đỡ đòn, khống chế diện rộng. | **KHÓA CHÍNH THỨC (SLOT 2 - HEAVY DISRUPTOR)** |
| **3. Dương Vân Nga** | `[SOURCE-BACKED: T2/T4]` | Thái hậu trao áo Long Cổn, biểu tượng ý chí toàn dân; Xạ thủ / Hỗ trợ chiến lược tầm xa, làm chậm và xuyên phá. | **KHÓA CHÍNH THỨC (SLOT 3 - RANGED TACTICIAN)** |
| **Đỗ Thuận** (Pháp Thuận) | `[SOURCE-BACKED: T2]` | Thiền sư cố vấn ngoại giao, nhà thơ "Vận nước"; thiên về đối ngoại bang giao sau chiến tranh. | **DỰ BỊ NARRATIVE / LORE NPC** |
| **Khuông Việt** (Ngô Chân Lưu) | `[SOURCE-BACKED: T2]` | Tăng thống quốc sư, lập đàn cầu nguyện chiến thắng; thiên về tâm linh tôn giáo. | **DỰ BỊ NARRATIVE / LORE NPC** |

---

## 2. Đặc Tả Chi Tiết 3 Hero Playable Khóa

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TAM GIÁC CHIẾN THUẬT KHÁNG TỐNG 981                   │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] LÊ HOÀN          │ [2] PHẠM CỰ LẠNG     │ [3] DƯƠNG VÂN NGA             │
│ Chủ Tướng Tiên Phong │ Đấu Sĩ Khống Chế     │ Quốc Mẫu Hỗ Trợ Tầm Xa        │
│ ⚔ Trường Kiếm / Đao  │ 🔨 Đại Kích / Đao Dài│ 🏹 Cung Lệnh Hoàng Cổn        │
│ Range: Melee (80px)  │ Range: Short (70px)  │ Range: Long (160px)           │
│ Speed: Fast (1.25)   │ Speed: Slow (0.85)   │ Speed: Medium (1.00)          │
│ Role: Single DPS     │ Role: AoE Stun/Slow  │ Role: Piercing Slow Support   │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

### 2.1. Hero 1: Lê Hoàn (Lê Đại Hành Hoàng Đế) — CORE COMMANDER

* **Định danh hệ thống (`heroId`)**: `le-hoan`
* **Tên hiển thị (`displayName`)**: `Lê Hoàn`
* **Danh xưng lịch sử**: `Thập Đạo Tướng Quân` $\rightarrow$ `Lê Đại Hành Hoàng Đế` `[SOURCE-BACKED: T1/T2]`
* **Vai trò lịch sử**: Tổng chỉ huy toàn quân Đại Cồ Việt, người trực tiếp bày binh bố trận tại Bạch Đằng và sông Chi Lăng, dùng kế trá hàng tiêu diệt đạo quân chủ lực của Hầu Nhân Bảo.
* **Vai trò gameplay**: **Cận chiến dồn sát thương bộc phá (Melee Single-Target Burst & Execute)**.
* **Vũ khí chủ đạo**: Trường kiếm thép thế kỷ X chuôi đúc đồng kèm đoản đao dắt hông.
* **Phong cách tấn công thường**: Chém nhanh, dứt khoát vào 1 mục tiêu duy nhất trong tầm đánh.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `High`
  - **ATK Intent**: `High`
  - **Range Intent**: `Melee` ($\approx 80\text{ px}$)
  - **AttackSpeed Intent**: `Fast` ($\approx 1.25\text{ đòn/s}$)
  - **Crit Intent**: `High` ($\approx 20\%$)
  - **CritDamage Intent**: `High` ($\approx 180\%$)
* **Kỹ năng Chủ động (Active Skill Concept)**:
  - **Tên**: *Trá Hàng Trảm Tướng* (Ambush Strike) `[GAMEPLAY ADAPTATION]`
  - **Số đòn tích lũy kích hoạt (`skillTriggerHits`)**: $5$ đòn đánh thường.
  - **Cơ chế**: Tích tụ sát khí chém một nhát chí mạng cực mạnh gây $350\%$ ATK lên kẻ địch có lượng máu cao nhất trong tầm, đồng thời khiến mục tiêu bị bất động (`immobilize`) trong $1.5\text{ giây}$.
* **Kỹ năng Nội tại (Passive Concept)**:
  - **Tên**: *Thập Đạo Nhuệ Khí* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế**: Tăng $15\%$ tốc độ đánh nội tại khi đứng gần ít nhất một Hero đồng minh.
* **Kỹ năng Huyền Sử (Huyền Sử Concept)**:
  - **Tên**: *Bạch Đằng Trấn Ba* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế**: Tăng $25\%$ sát thương gây ra lên các đơn vị Quái vật thuộc loại Boss hoặc đơn vị có HP trên $500$.
* **Định hướng tạo hình (Visual Identity Notes)**:
  - Tướng lĩnh 40 tuổi uy dũng phi thường; khoác hoàng bào dã chiến viền vàng kim bên ngoài giáp phiến đồng sẫm màu; ánh mắt quyết đoán, phong thái hoàng đế trận tiền.
* **Độ tin cậy nguồn**: `High (T1 Song sources + T2 Toàn Thư)`.
* **Ghi chú chuyển thể**: Biến đổi mưu kế dâng thư trá hàng trong sử liệu thành kỹ năng chém đoạt mạng tướng địch.

---

### 2.2. Hero 2: Phạm Cự Lạng (Đại Tướng Quân) — HEAVY DISRUPTOR

* **Định danh hệ thống (`heroId`)**: `pham-cu-lang`
* **Tên hiển thị**: `Phạm Cự Lạng` (hoặc `Phạm Cự Lượng`)
* **Danh xưng lịch sử**: `Điện Tiền Đô Chỉ Huy Sứ` $\rightarrow$ `Đại Tướng Quân` `[SOURCE-BACKED: T2 Toàn Thư]`
* **Vai trò lịch sử**: Thống lĩnh cấm vệ quân thời Đinh – Tiền Lê, người dũng cảm đứng ra trước ba quân đề xuất suy tôn Lê Hoàn lên làm vua để cứu quốc trước khi xuất quân đánh Tống.
* **Vai trò gameplay**: **Đấu sĩ tiền tuyến khống chế diện rộng (Heavy Frontline Disruptor & Stunner)**.
* **Vũ khí chủ đạo**: Đại thiết kích cán dài bịt đồng nặng nề.
* **Phong cách tấn công thường**: Bổ kích lực mạnh vào 1 mục tiêu đơn lẻ phía trước.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `High`
  - **ATK Intent**: `Medium`
  - **Range Intent**: `Short Melee` ($\approx 70\text{ px}$)
  - **AttackSpeed Intent**: `Slow` ($\approx 0.85\text{ đòn/s}$)
  - **Crit Intent**: `Low` ($\approx 10\%$)
  - **CritDamage Intent**: `Standard` ($\approx 150\%$)
* **Kỹ năng Chủ động (Active Skill Concept)**:
  - **Tên**: *Kích Trận Phá Lỗ* (Vanguard Shockwave) `[GAMEPLAY ADAPTATION]`
  - **Số đòn tích lũy kích hoạt (`skillTriggerHits`)**: $7$ đòn đánh thường.
  - **Cơ chế**: Dộng mạnh cán thiết kích xuống đất tạo sóng chấn động gây $220\%$ ATK cho toàn bộ kẻ địch trong bán kính $R = 125\text{ px}$ và làm chậm $40\%$ tốc độ di chuyển (`slow`) trong $3.0\text{ giây}$.
* **Kỹ năng Nội tại (Passive Concept)**:
  - **Tên**: *Điện Tiền Thiết Vệ* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế**: Đòn đánh cơ bản tạo lực chém quét phụ lan $15\%$ sát thương sang các mục tiêu đứng sát bên mục tiêu chính.
* **Kỹ năng Huyền Sử (Huyền Sử Concept)**:
  - **Tên**: *Huyết Lời Thề Binh* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế**: Khi kỹ năng chủ động kích hoạt, hồi phục $10\%$ nhịp độ hồi chiêu cho các tướng đứng cạnh.
* **Định hướng tạo hình (Visual Identity Notes)**:
  - Đại tướng uy nghi lực lưỡng, râu quai nón cương trực; mặc chiến giáp hạng nặng đính giáp vai đầu thú bằng đồng; tay cầm đại kích dài hơn thân người.
* **Độ tin cậy nguồn**: `High (T2 Toàn Thư)`.
* **Ghi chú chuyển thể**: Khí thế quyết tử của vị tướng khởi xướng tôn vương được chuyển thành đòn dộng kích trấn áp đám đông.

---

### 2.3. Hero 3: Dương Vân Nga (Thái Hậu Long Cổn) — RANGED TACTICIAN

* **Định danh hệ thống (`heroId`)**: `duong-van-nga`
* **Tên hiển thị**: `Dương Vân Nga`
* **Danh xưng lịch sử**: `Đại Thắng Minh Hoàng Hậu` $\rightarrow$ `Hoàng Thái Hậu` `[SOURCE-BACKED: T2 Toàn Thư]`
* **Vai trò lịch sử**: Người phụ nữ quyền lực bậc nhất thế kỷ X, có quyết định mang tính bước ngoặt lịch sử khi đem áo Long Cổn trao cho Lê Hoàn để cố kết lòng dân, cứu vãn vận mệnh quốc gia trước họa xâm lăng.
* **Vai trò gameplay**: **Xạ thủ chiến lược tầm xa làm chậm diện rộng (Long-Range Piercing Support & Slow)**.
* **Vũ khí chủ đạo**: Cung lệnh hoàng gia khảm ngọc hoặc trượng phù trợ nghi lễ.
* **Phong cách tấn công thường**: Bắn tên tầm xa chính xác vào 1 mục tiêu duy nhất.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `Low`
  - **ATK Intent**: `Medium`
  - **Range Intent**: `Long` ($\approx 160\text{ px}$)
  - **AttackSpeed Intent**: `Medium` ($\approx 1.05\text{ đòn/s}$)
  - **Crit Intent**: `Medium` ($\approx 15\%$)
  - **CritDamage Intent**: `Standard` ($\approx 150\%$)
* **Kỹ năng Chủ động (Active Skill Concept)**:
  - **Tên**: *Long Cổn Trấn Quốc* (Royal Aegis Volley) `[GAMEPLAY ADAPTATION]`
  - **Số đòn tích lũy kích hoạt (`skillTriggerHits`)**: $6$ đòn đánh thường.
  - **Cơ chế**: Bắn một chùm tên lệnh linh thiêng lên bầu trời trút xuống khu vực chỉ định, gây $175\%$ ATK diện rộng ($R = 145\text{ px}$) và làm chậm $35\%$ tốc độ di chuyển (`slow`) của toàn bộ quái vật trúng tên trong $2.5\text{ giây}$.
* **Kỹ năng Nội tại (Passive Concept)**:
  - **Tên**: *Quốc Mẫu Tề Lực* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế**: Tăng $10\%$ tầm bắn (`range`) cho bản thân khi bố trí trên các điểm cao (đồi, mỏm đá).
* **Kỹ năng Huyền Sử (Huyền Sử Concept)**:
  - **Tên**: *Áo Gấm Trao Vương* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế**: Tăng $10\%$ sát thương cho mọi Hero đồng minh nằm trong vòng hào quang của bà.
* **Định hướng tạo hình (Visual Identity Notes)**:
  - Phụ nữ quý phái tuổi 35, ánh mắt uy nghiêm đượm vẻ kiên nghị; trang phục lụa gấm màu xanh ngọc viền hoa văn chim lạc, khoác áo choàng lụa đỏ thêu kim tuyến, tay giương cung lệnh hoàng cung thanh thoát.
* **Độ tin cậy nguồn**: `High (T2 Toàn Thư / Khảo cứu T4 hiện đại)`.
* **Ghi chú chuyển thể**: Hình tượng trao áo Long Cổn cứu nước được chuyển thành kỹ năng xạ tiễn tầm xa khích lệ sĩ khí và kiểm soát trận địa.
