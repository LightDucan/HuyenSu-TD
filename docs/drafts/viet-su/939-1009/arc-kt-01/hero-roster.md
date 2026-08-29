# Danh Sách Tướng Xuất Trận Khóa: ARC-KT-01 (Hero Roster Lock)

**Chương**: `ARC-KT-01 — Long Cổn Cứu Quốc (Kháng Tống 981)`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-kt-01/hero-roster.md`
**Trạng thái**: Official 3-Hero Roster Lock (Runtime-Aligned)

---

## 1. Cơ Sở Lựa Chọn Đội Hình & Khảo Cứu Học Thuật (Roster Audit & Selection)

Đội hình 3 Hero playable cho Chapter Kháng Tống 981 được tuyển chọn dựa trên 5 tiêu chí bắt buộc:
1. **Độ chắc chắn của nguồn sử liệu**: Có chứng thực rõ ràng từ các nguồn thư tịch xác định (*Tống Sử*, *Toàn Thư*).
2. **Vai trò then chốt trong chiến dịch 981**: Người lãnh đạo tối cao, tướng tiên phong dũng liệt và nhân vật trung tâm chuyển giao quyền bính quốc gia.
3. **Bổ trợ chiến thuật hoàn chỉnh**: Tạo nên tam giác sức mạnh (Sát thương đơn bộc phá + Khống chế diện rộng + Xạ thủ liên hoàn làm chậm).
4. **Tương thích tuyệt đối với Engine**: Khớp hoàn toàn với schema `HeroDefinition` và bộ xử lý `resolveSkill`.
5. **Đòn đánh thường đơn mục tiêu 100% (Single-Target Normal Attack)**: Không splash, không AoE, không CC ở đòn đánh cơ bản.

| Ứng Viên Khảo Sát | Tầng Nguồn & Độ Tin Cậy | Vai Trò Lịch Sử & Đánh Giá Gameplay | Quyết Định Lựa Chọn |
|---|:---:|---|:---:|
| **1. Lê Hoàn** | `[SOURCE-BACKED: Tống Sử / Toàn Thư]` | Hoàng đế, Tổng tư lệnh trực tiếp đốc chiến diệt giặc; Sát thủ cận chiến / Dồn sát thương đơn mục tiêu bộc phá. | **KHÓA CHÍNH THỨC (SLOT 1 - CORE COMMANDER)** |
| **2. Phạm Cự Lạng** | `[SOURCE-BACKED: Toàn Thư]` | Đại tướng cấm quân, người khởi xướng tôn vương và đốc chiến tiền phương; Đấu sĩ đỡ đòn, khống chế diện rộng. | **KHÓA CHÍNH THỨC (SLOT 2 - HEAVY DISRUPTOR)** |
| **3. Dương Vân Nga** | `[SOURCE-BACKED: Toàn Thư / Khảo cứu T4]` | Thái hậu trao áo Long Cổn, biểu tượng ý chí toàn dân; Xạ thủ hỗ trợ tầm xa, bắn liên hoàn đa kích và làm chậm. | **KHÓA CHÍNH THỨC (SLOT 3 - RANGED TACTICIAN)** |
| **Đỗ Thuận** (Pháp Thuận) | `[SOURCE-BACKED: Toàn Thư]` | Thiền sư cố vấn ngoại giao, nhà thơ "Vận nước"; thiên về đối ngoại bang giao sau chiến tranh. | **DỰ BỊ NARRATIVE / LORE NPC** |
| **Khuông Việt** (Ngô Chân Lưu) | `[SOURCE-BACKED: Toàn Thư]` | Tăng thống quốc sư, lập đàn cầu nguyện chiến thắng; thiên về tâm linh tôn giáo. | **DỰ BỊ NARRATIVE / LORE NPC** |

---

## 2. Đặc Tả Chi Tiết 3 Hero Playable Khóa

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TAM GIÁC CHIẾN THUẬT KHÁNG TỐNG 981                   │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] LÊ HOÀN          │ [2] PHẠM CỰ LẠNG     │ [3] DƯƠNG VÂN NGA             │
│ Chủ Tướng Tiên Phong │ Đấu Sĩ Khống Chế     │ Xạ Thủ Đa Kích Tầm Xa         │
│ Archetype: mid-melee │ Archetype: near-melee│ Archetype: bow                │
│ Range: Melee (80px)  │ Range: Short (70px)  │ Range: Long (160px)           │
│ Speed: Fast (1.25)   │ Speed: Slow (0.85)   │ Speed: Medium (1.05)          │
│ Role: Single Burst   │ Role: AoE Slow/Stun  │ Role: MultiHit Slow Support   │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

### 2.1. Hero 1: Lê Hoàn (Lê Đại Hành Hoàng Đế) — CORE COMMANDER

* **Định danh hệ thống (`id`)**: `le-hoan`
* **Tên hiển thị (`name`)**: `Lê Hoàn`
* **Phe phái (`faction`)**: `tien-le`
* **Mô thức chiến đấu (`archetype`)**: `mid-melee`
* **Ghi chú danh xưng lịch sử**: `Thập Đạo Tướng Quân` $\rightarrow$ `Lê Đại Hành Hoàng Đế` `[SOURCE-BACKED: Tống Sử / Toàn Thư]`
* **Vai trò lịch sử**: Tổng chỉ huy toàn quân Đại Cồ Việt, người trực tiếp bày binh bố trận, dùng kế trá hàng tiêu diệt đạo quân chủ lực của Hầu Nhân Bảo.
* **Vai trò gameplay**: **Cận chiến dồn sát thương bộc phá (Melee Single-Target Burst & Execute)**.
* **Vũ khí chủ đạo**: Trường kiếm thép thế kỷ X chuôi đúc đồng kèm đoản đao dắt hông.
* **Phong cách tấn công thường**: Đòn đánh cơ bản chém đơn mục tiêu (single-target), không hiệu ứng khống chế, không AoE.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `High` ($550$)
  - **ATK Intent**: `High` ($58$)
  - **Range Intent**: `Melee` ($80\text{ px}$)
  - **AttackSpeed Intent**: `Fast` ($1.25\text{ đòn/s}$)
  - **Crit Intent**: `High` ($0.20$)
  - **CritDamage Intent**: `High` ($1.80$)
* **Kỹ năng Chủ động (Active Skill — MVP REQUIRED)**:
  - **Mã kỹ năng (`activeSkillId`)**: `le-hoan-tra-hang-tram-tuong`
  - **Tên kỹ năng**: *Trá Hàng Trảm Tướng* `[GAMEPLAY ADAPTATION]`
  - **Số đòn đánh kích hoạt (`skillTriggerHits`)**: $5$ đòn đánh thường.
  - **Mô hình tác động**: Tấn công mục tiêu dẫn đầu trong phạm vi tầm đánh ($R=80\text{ px}$, `maxTargets: 1`), dồn sát thương bộc phá cực mạnh và trói chân mục tiêu mà không yêu cầu mở rộng runtime.
  - **Cấu trúc hiệu ứng (`effects`)**:
    ```ts
    effects: [
      { type: 'aoe', radius: 80, maxTargets: 1 },
      { type: 'damage', atkMultiplier: 3.5 },
      { type: 'root', durationMs: 1500 },
    ]
    ```
* **Kỹ năng Nội tại (Passive Concept — DEFERRED)**:
  - **Tên**: *Thập Đạo Nhuệ Khí* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $15\%$ tốc độ đánh nội tại khi có Hero đồng minh trong bán kính gần. *(Runtime-deferred)*.
* **Kỹ năng Huyền Sử (Huyền Sử Concept — DEFERRED)**:
  - **Tên**: *Bạch Đằng Trấn Ba* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $25\%$ sát thương gây ra lên các đơn vị Boss. *(Runtime-deferred)*.
* **Định danh hiển thị (`presentation`)**:
  - `skinId: 'skin-le-hoan-default'`
  - `animationSetId: 'anim-le-hoan-sword'`
* **Độ tin cậy nguồn**: `High (Tống Sử + Toàn Thư)`.
* **Ghi chú chuyển thể**: Biến đổi mưu kế dâng thư trá hàng trong sử liệu thành kỹ năng chém đoạt mạng mục tiêu.

---

### 2.2. Hero 2: Phạm Cự Lạng (Đại Tướng Quân) — HEAVY DISRUPTOR

* **Định danh hệ thống (`id`)**: `pham-cu-lang`
* **Tên hiển thị (`name`)**: `Phạm Cự Lạng`
* **Phe phái (`faction`)**: `tien-le`
* **Mô thức chiến đấu (`archetype`)**: `near-melee`
* **Ghi chú danh xưng lịch sử**: `Điện Tiền Đô Chỉ Huy Sứ` $\rightarrow$ `Đại Tướng Quân` `[SOURCE-BACKED: Toàn Thư]`
* **Vai trò lịch sử**: Thống lĩnh cấm vệ quân thời Đinh – Tiền Lê, người dũng cảm đứng ra trước ba quân đề xuất suy tôn Lê Hoàn lên làm vua để thống nhất quyền lực cứu quốc.
* **Vai trò gameplay**: **Đấu sĩ tiền tuyến khống chế diện rộng (Heavy Frontline Disruptor & Slow)**.
* **Vũ khí chủ đạo**: Đại thiết kích cán dài bịt đồng nặng nề.
* **Phong cách tấn công thường**: Đòn bổ kích đơn mục tiêu (single-target 100%), không gây sát thương lan (no splash/AoE on normal attack).
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `High` ($680$)
  - **ATK Intent**: `Medium` ($45$)
  - **Range Intent**: `Short Melee` ($70\text{ px}$)
  - **AttackSpeed Intent**: `Slow` ($0.85\text{ đòn/s}$)
  - **Crit Intent**: `Low` ($0.10$)
  - **CritDamage Intent**: `Standard` ($1.50$)
* **Kỹ năng Chủ động (Active Skill — MVP REQUIRED)**:
  - **Mã kỹ năng (`activeSkillId`)**: `pham-cu-lang-kich-tran-pha-lo`
  - **Tên kỹ năng**: *Kích Trận Phá Lỗ* `[GAMEPLAY ADAPTATION]`
  - **Số đòn đánh kích hoạt (`skillTriggerHits`)**: $7$ đòn đánh thường.
  - **Mô hình tác động**: Dộng mạnh cán kích tạo sóng chấn động diện rộng xung quanh vị trí bản thân, gây sát thương và làm chậm kẻ địch trong vùng.
  - **Cấu trúc hiệu ứng (`effects`)**:
    ```ts
    effects: [
      { type: 'aoe', radius: 125, maxTargets: 4 },
      { type: 'damage', atkMultiplier: 2.2 },
      { type: 'slow', ratio: 0.40, durationMs: 3000 },
    ]
    ```
* **Kỹ năng Nội tại (Passive Concept — DEFERRED)**:
  - **Tên**: *Điện Tiền Thiết Vệ* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $10\%$ HP tối đa cho bản thân. *(Runtime-deferred, xóa bỏ hoàn toàn cơ chế đánh lan ở đòn thường)*.
* **Kỹ năng Huyền Sử (Huyền Sử Concept — DEFERRED)**:
  - **Tên**: *Huyết Lời Thề Binh* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế thiết kế**: Giảm $1$ đòn đánh yêu cầu để kích hoạt kỹ năng chủ động cho tướng đứng cạnh. *(Runtime-deferred)*.
* **Định danh hiển thị (`presentation`)**:
  - `skinId: 'skin-pham-cu-lang-default'`
  - `animationSetId: 'anim-pham-cu-lang-spear'`
* **Độ tin cậy nguồn**: `High (Toàn Thư)`.
* **Ghi chú chuyển thể**: Khí thế quyết tử của vị tướng khởi xướng tôn vương được chuyển thành đòn dộng kích trấn áp đám đông.

---

### 2.3. Hero 3: Dương Vân Nga (Thái Hậu Long Cổn) — RANGED TACTICIAN

* **Định danh hệ thống (`id`)**: `duong-van-nga`
* **Tên hiển thị (`name`)**: `Dương Vân Nga`
* **Phe phái (`faction`)**: `tien-le`
* **Mô thức chiến đấu (`archetype`)**: `bow`
* **Ghi chú danh xưng lịch sử**: `Đại Thắng Minh Hoàng Hậu` $\rightarrow$ `Hoàng Thái Hậu` `[SOURCE-BACKED: Toàn Thư]`
* **Vai trò lịch sử**: Người phụ nữ quyết đoán trao áo Long Cổn cho Lê Hoàn để cố kết lòng dân, cứu vãn vận mệnh quốc gia trước nguy cơ xâm lăng.
* **Vai trò gameplay**: **Xạ thủ tầm xa đa kích và làm chậm (Long-Range Multi-Hit & Slow Support)**.
* **Vũ khí chủ đạo**: Cung lệnh hoàng gia khảm ngọc dã chiến.
* **Phong cách tấn công thường**: Bắn tên đơn mục tiêu tầm xa (single-target 100%), không gây hiệu ứng diện rộng.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `Low` ($380$)
  - **ATK Intent**: `Medium` ($38$)
  - **Range Intent**: `Long` ($160\text{ px}$)
  - **AttackSpeed Intent**: `Medium` ($1.05\text{ đòn/s}$)
  - **Crit Intent**: `Medium` ($0.15$)
  - **CritDamage Intent**: `Standard` ($1.50$)
* **Kỹ năng Chủ động (Active Skill — MVP REQUIRED)**:
  - **Mã kỹ năng (`activeSkillId`)**: `duong-van-nga-long-con-tran-quoc`
  - **Tên kỹ năng**: *Long Cổn Trấn Quốc* `[GAMEPLAY ADAPTATION]`
  - **Số đòn đánh kích hoạt (`skillTriggerHits`)**: $6$ đòn đánh thường.
  - **Mô hình tác động**: Tự động bắn chùm tên liên hoàn đa kích vào mục tiêu dẫn đầu trong tầm bắn, gây sát thương liên tiếp và làm chậm bước tiến của kẻ địch (không yêu cầu click chọn vùng thủ công).
  - **Cấu trúc hiệu ứng (`effects`)**:
    ```ts
    effects: [
      { type: 'multiHit', hits: 3, intervalMs: 140 },
      { type: 'damage', atkMultiplier: 1.2 },
      { type: 'slow', ratio: 0.35, durationMs: 2500 },
    ]
    ```
* **Kỹ năng Nội tại (Passive Concept — DEFERRED)**:
  - **Tên**: *Quốc Mẫu Tề Lực* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $10\%$ tầm bắn (`range`) cho bản thân khi bố trí trên các ô cao điểm. *(Runtime-deferred)*.
* **Kỹ năng Huyền Sử (Huyền Sử Concept — DEFERRED)**:
  - **Tên**: *Áo Gấm Trao Vương* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $10\%$ sát thương cho Hero đồng minh đứng trong phạm vi gần. *(Runtime-deferred)*.
* **Định danh hiển thị (`presentation`)**:
  - `skinId: 'skin-duong-van-nga-default'`
  - `animationSetId: 'anim-duong-van-nga-bow'`
* **Độ tin cậy nguồn**: `High (Toàn Thư / Khảo cứu T4)`.
* **Ghi chú chuyển thể**: Hình tượng trao áo Long Cổn cứu nước được chuyển thành kỹ năng xạ tiễn liên hoàn hỗ trợ ghìm chân quân địch.
