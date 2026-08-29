# Danh Sách Tướng Xuất Trận Khóa: ARC-CP-01 (Hero Roster Lock)

**Chương**: `ARC-CP-01 — Bình Chiêm Phạt Bạo (Nam Chinh 982)`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-cp-01/hero-roster.md`
**Trạng thái**: Official 3-Hero Roster Lock (Runtime-Aligned)

---

## 1. Cơ Sở Lựa Chọn Đội Hình & Khảo Cứu Học Thuật (Roster Audit & Selection)

Đội hình 3 Hero playable cho Chapter Nam Chinh 982 được tuyển chọn dựa trên 5 tiêu chí bắt buộc:
1. **Độ chắc chắn của nguồn sử liệu**: Có chứng thực rõ ràng từ các nguồn thư tịch xác định (*Toàn Thư*, *Cương Mục*, *Tống Sử*).
2. **Vai trò then chốt trong chiến dịch 982**: Vị vua đích thân cầm quân xuất trận, vị đại tướng quân tiên phong và viên sứ thần trung kiên nắm giữ chìa khóa địa hình.
3. **Bổ trợ chiến thuật hoàn chỉnh**: Tạo nên tam giác sức mạnh (Sát thương đơn bộc phá + Khống chế diện rộng + Xạ thủ trinh sát làm chậm tầm xa).
4. **Tương thích tuyệt đối với Engine**: Khớp 100% schema `HeroDefinition` và bộ xử lý `resolveSkill`.
5. **Đòn đánh thường đơn mục tiêu 100% (Single-Target Normal Attack)**: Không splash, không AoE, không CC ở đòn cơ bản.

| Ứng Viên Khảo Sát | Tầng Nguồn & Độ Tin Cậy | Vai Trò Lịch Sử & Đánh Giá Gameplay | Quyết Định Lựa Chọn |
|---|:---:|---|:---:|
| **1. Lê Hoàn** | `[SOURCE-BACKED: Toàn Thư / Tống Sử]` | Hoàng đế thân chinh đốc chiến, trực tiếp chém vua Chiêm tại trận; Cận chiến sát thương bộc phá cực mạnh. | **KHÓA CHÍNH THỨC (SLOT 1 - CORE COMMANDER)** |
| **2. Phạm Cự Lạng** | `[SOURCE-BACKED: Toàn Thư]` | Đại tướng quân chỉ huy tiền phương, công phá trận địa tượng binh; Đấu sĩ đỡ đòn, dộng kích khống chế diện rộng. | **KHÓA CHÍNH THỨC (SLOT 2 - HEAVY DISRUPTOR)** |
| **3. Từ Mục** | `[SOURCE-BACKED: Toàn Thư]` | Sứ giả bị giam cầm được giải cứu, nắm rõ địa hình đồn lũy đối phương; Xạ thủ hoa tiêu tầm xa, bắn đa kích và làm chậm. | **KHÓA CHÍNH THỨC (SLOT 3 - RANGED SCOUT)** |
| **Ngô Tử Canh** | `[SOURCE-BACKED: Toàn Thư]` | Đồng sứ giả cùng Từ Mục; vai trò tương đồng Từ Mục nhưng ít đất diễn gameplay hơn. | **DỰ BỊ NARRATIVE / NPC** |
| **Lê Long Việt / Lê Long Đĩnh** | `[SOURCE-BACKED: Toàn Thư]` | Các hoàng tử nhà Tiền Lê; giai đoạn 982 còn quá nhỏ tuổi. | **KHÔNG PHÙ HỢP TIMELINE 982** |

---

## 2. Đặc Tả Chi Tiết 3 Hero Playable Khóa

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TAM GIÁC CHIẾN THUẬT NAM CHINH 982                    │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] LÊ HOÀN          │ [2] PHẠM CỰ LẠNG     │ [3] TỪ MỤC                    │
│ Chủ Tướng Thân Chinh │ Đại Tướng Tiền Tuyến │ Sứ Giả Hoa Tiêu               │
│ Archetype: mid-melee │ Archetype: near-melee│ Archetype: bow                │
│ Range: Melee (80px)  │ Range: Short (70px)  │ Range: Long (165px)           │
│ Speed: Fast (1.25)   │ Speed: Slow (0.85)   │ Speed: Medium (1.10)          │
│ Role: Single Burst   │ Role: AoE Slow/Stun  │ Role: MultiHit Slow Scout     │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

### 2.1. Hero 1: Lê Hoàn (Lê Đại Hành Hoàng Đế) — CORE COMMANDER

* **Định danh hệ thống (`id`)**: `le-hoan-nam-chinh`
* **Tên hiển thị (`name`)**: `Lê Hoàn`
* **Phe phái (`faction`)**: `tien-le`
* **Mô thức chiến đấu (`archetype`)**: `mid-melee`
* **Ghi chú danh xưng lịch sử**: `Lê Đại Hành Hoàng Đế — Thân Chinh Nam Phạt` `[SOURCE-BACKED: Toàn Thư / Tống Sử]`
* **Vai trò lịch sử**: Vị hoàng đế đích thân thống lĩnh đại quân vượt biển phạt Chiêm, chém chết vua Chiêm Bê Mê Thuế tại trận tiền, san phẳng thành quách Indrapura.
* **Vai trò gameplay**: **Cận chiến dồn sát thương bộc phá (Melee Single-Target Burst & Execute)**.
* **Vũ khí chủ đạo**: Trường kiếm thép thế kỷ X chuôi đúc đồng kèm đoản đao dắt hông.
* **Phong cách tấn công thường**: Đòn đánh cơ bản chém đơn mục tiêu (single-target 100%), không hiệu ứng khống chế, không AoE.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `High` ($560$)
  - **ATK Intent**: `High` ($60$)
  - **Range Intent**: `Melee` ($80\text{ px}$)
  - **AttackSpeed Intent**: `Fast` ($1.25\text{ đòn/s}$)
  - **Crit Intent**: `High` ($0.20$)
  - **CritDamage Intent**: `High` ($1.80$)
* **Kỹ năng Chủ động (Active Skill — MVP REQUIRED)**:
  - **Mã kỹ năng (`activeSkillId`)**: `le-hoan-pha-thanh-tram-tuong`
  - **Tên kỹ năng**: *Trảm Tướng Phá Thành* `[GAMEPLAY ADAPTATION]`
  - **Số đòn đánh kích hoạt (`skillTriggerHits`)**: $5$ đòn đánh thường.
  - **Mô hình tác động**: Tấn công mục tiêu dẫn đầu trong phạm vi tầm đánh ($R=80\text{ px}$, `maxTargets: 1`), dồn nhát kiếm chí mạng cực lớn và trói chân mục tiêu.
  - **Cấu trúc hiệu ứng (`effects`)**:
    ```ts
    effects: [
      { type: 'aoe', radius: 80, maxTargets: 1 },
      { type: 'damage', atkMultiplier: 3.6 },
      { type: 'root', durationMs: 1500 },
    ]
    ```
* **Kỹ năng Nội tại (Passive Concept — DEFERRED)**:
  - **Tên**: *Quân Uy Nam Phạt* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $15\%$ tốc độ đánh nội tại khi có Hero đồng minh trong bán kính gần. *(Runtime-deferred)*.
* **Kỹ năng Huyền Sử (Huyền Sử Concept — DEFERRED)**:
  - **Tên**: *Bình Chiêm Đại Định* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $25\%$ sát thương gây ra lên các đơn vị Boss hoặc Voi Chiến. *(Runtime-deferred)*.
* **Định danh hiển thị (`presentation`)**:
  - `skinId: 'skin-le-hoan-nam-chinh'`
  - `animationSetId: 'anim-le-hoan-sword'`
* **Độ tin cậy nguồn**: `High (Toàn Thư + Tống Sử)`.
* **Ghi chú chuyển thể**: Hình tượng chém vua Chiêm tại trận được chuyển thành kỹ năng dứt điểm mục tiêu uy lực cao nhất đội hình.

---

### 2.2. Hero 2: Phạm Cự Lạng (Đại Tướng Quân) — HEAVY DISRUPTOR

* **Định danh hệ thống (`id`)**: `pham-cu-lang-nam-chinh`
* **Tên hiển thị (`name`)**: `Phạm Cự Lạng`
* **Phe phái (`faction`)**: `tien-le`
* **Mô thức chiến đấu (`archetype`)**: `near-melee`
* **Ghi chú danh xưng lịch sử**: `Đại Tướng Quân` `[SOURCE-BACKED: Toàn Thư]`
* **Vai trò lịch sử**: Vị đại tướng tiên phong dũng cảm của triều Tiền Lê, thống lĩnh đội quân xung kích công phá các cứ điểm đền tháp và trận địa tượng binh Champa.
* **Vai trò gameplay**: **Đấu sĩ tiền tuyến khống chế diện rộng (Heavy Frontline Disruptor & Slow)**.
* **Vũ khí chủ đạo**: Đại thiết kích cán dài bịt đồng nặng nề.
* **Phong cách tấn công thường**: Đòn bổ kích đơn mục tiêu (single-target 100%), không gây sát thương lan.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `High` ($700$)
  - **ATK Intent**: `Medium` ($46$)
  - **Range Intent**: `Short Melee` ($70\text{ px}$)
  - **AttackSpeed Intent**: `Slow` ($0.85\text{ đòn/s}$)
  - **Crit Intent**: `Low` ($0.10$)
  - **CritDamage Intent**: `Standard` ($1.50$)
* **Kỹ năng Chủ động (Active Skill — MVP REQUIRED)**:
  - **Mã kỹ năng (`activeSkillId`)**: `pham-cu-lang-chan-dia-quyet`
  - **Tên kỹ năng**: *Trấn Địa Phá Tượng* `[GAMEPLAY ADAPTATION]`
  - **Số đòn đánh kích hoạt (`skillTriggerHits`)**: $7$ đòn đánh thường.
  - **Mô hình tác động**: Dộng mạnh cán thiết kích xuống đất tạo làn sóng địa chấn diện rộng, gây sát thương và làm chậm kẻ địch trong vùng.
  - **Cấu trúc hiệu ứng (`effects`)**:
    ```ts
    effects: [
      { type: 'aoe', radius: 130, maxTargets: 4 },
      { type: 'damage', atkMultiplier: 2.2 },
      { type: 'slow', ratio: 0.40, durationMs: 3000 },
    ]
    ```
* **Kỹ năng Nội tại (Passive Concept — DEFERRED)**:
  - **Tên**: *Thiết Giáp Tiên Phong* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $10\%$ HP tối đa cho bản thân. *(Runtime-deferred)*.
* **Kỹ năng Huyền Sử (Huyền Sử Concept — DEFERRED)**:
  - **Tên**: *Huyết Chiến Biên Cương* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế thiết kế**: Giảm $1$ đòn đánh yêu cầu để kích hoạt kỹ năng chủ động cho tướng đứng cạnh. *(Runtime-deferred)*.
* **Định danh hiển thị (`presentation`)**:
  - `skinId: 'skin-pham-cu-lang-nam-chinh'`
  - `animationSetId: 'anim-pham-cu-lang-spear'`
* **Độ tin cậy nguồn**: `High (Toàn Thư)`.
* **Ghi chú chuyển thể**: Khí phách phá vỡ phòng tuyến đối phương được chuyển thành đòn dộng kích trấn áp đám đông.

---

### 2.3. Hero 3: Từ Mục (Sứ Giả Hoa Tiêu) — RANGED SCOUT

* **Định danh hệ thống (`id`)**: `tu-muc`
* **Tên hiển thị (`name`)**: `Từ Mục`
* **Phe phái (`faction`)**: `tien-le`
* **Mô thức chiến đấu (`archetype`)**: `bow`
* **Ghi chú danh xưng lịch sử**: `Đại Cồ Việt Điển Sứ` `[SOURCE-BACKED: Toàn Thư]`
* **Vai trò lịch sử**: Sứ giả Đại Cồ Việt bị vua Chiêm bắt giữ năm 981, sau khi được đại quân Lê Hoàn giải cứu đã am hiểu sâu sắc địa hình hiểm trở, hỗ trợ đắc lực cho công tác trinh sát và chỉ dẫn lộ trình tấn công.
* **Vai trò gameplay**: **Xạ thủ trinh sát tầm xa đa kích và làm chậm (Long-Range Multi-Hit & Slow Scout)**.
* **Vũ khí chủ đạo**: Cung dài dã chiến tẩm nhựa thông dẫn lửa.
* **Phong cách tấn công thường**: Bắn tên đơn mục tiêu tầm xa (single-target 100%), không gây hiệu ứng diện rộng.
* **Định hướng chỉ số cơ bản (Stat Intent)**:
  - **HP Intent**: `Low` ($390$)
  - **ATK Intent**: `Medium` ($37$)
  - **Range Intent**: `Long` ($165\text{ px}$)
  - **AttackSpeed Intent**: `Medium` ($1.10\text{ đòn/s}$)
  - **Crit Intent**: `Medium` ($0.15$)
  - **CritDamage Intent**: `Standard` ($1.50$)
* **Kỹ năng Chủ động (Active Skill — MVP REQUIRED)**:
  - **Mã kỹ năng (`activeSkillId`)**: `tu-muc-chi-dan-hoa-tiet`
  - **Tên kỹ năng**: *Hoa Tiêu Hỏa Tiễn* `[GAMEPLAY ADAPTATION]`
  - **Số đòn đánh kích hoạt (`skillTriggerHits`)**: $6$ đòn đánh thường.
  - **Mô hình tác động**: Tự động bắn chùm hỏa tiễn liên hoàn $3$ phát trúng mục tiêu dẫn đầu trong tầm bắn, gây sát thương liên tiếp và thiêu đốt làm chậm bước tiến của quân địch.
  - **Cấu trúc hiệu ứng (`effects`)**:
    ```ts
    effects: [
      { type: 'multiHit', hits: 3, intervalMs: 140 },
      { type: 'damage', atkMultiplier: 1.25 },
      { type: 'slow', ratio: 0.35, durationMs: 2500 },
    ]
    ```
* **Kỹ năng Nội tại (Passive Concept — DEFERRED)**:
  - **Tên**: *Trinh Sát Duyên Hải* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $10\%$ tầm bắn (`range`) cho bản thân khi bố trí trên các ô đồi cát cao điểm. *(Runtime-deferred)*.
* **Kỹ năng Huyền Sử (Huyền Sử Concept — DEFERRED)**:
  - **Tên**: *Sứ Giả Bất Khuất* `[GAMEPLAY ADAPTATION]`
  - **Cơ chế thiết kế**: Tăng $10\%$ sát thương cho Hero đồng minh đứng trong phạm vi gần. *(Runtime-deferred)*.
* **Định danh hiển thị (`presentation`)**:
  - `skinId: 'skin-tu-muc-default'`
  - `animationSetId: 'anim-tu-muc-bow'`
* **Độ tin cậy nguồn**: `High (Toàn Thư)`.
* **Ghi chú chuyển thể**: Vai trò nắm rõ địa đồ của viên sứ thần được chuyển thành kỹ năng bắn tên hoa tiêu dẫn đường làm chậm quân giặc.
