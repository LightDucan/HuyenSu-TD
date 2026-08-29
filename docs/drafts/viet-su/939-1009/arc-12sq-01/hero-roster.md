# Danh Sách Tướng Xuất Trận Khóa: ARC-12SQ-01 (Hero Roster Lock)

**Chương**: `ARC-12SQ-01 — Vạn Thắng Hoa Lư`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-12sq-01/hero-roster.md`
**Trạng thái**: Official 3-Hero Roster Lock

---

## 1. Đánh Giá Học Thuật & Cơ Sở Lựa Chọn Đội Hình (Roster Audit & Selection)

Để đảm bảo nguyên tắc **"Tính chính xác của nguồn sử liệu + Tính đa dạng bổ trợ trong gameplay"**, hội đồng thiết kế đã tiến hành rà soát toàn bộ các nhân vật lịch sử thời kỳ 965–968 SCN:

| Ứng Viên Khảo Sát | Căn Cứ Nguồn Sử Liệu | Vai Trò Gameplay & Đánh Giá | Kết Luận Lựa Chọn |
|---|---|---|:---:|
| **1. Đinh Bộ Lĩnh** | `[SOURCE-BACKED: T1 Tống Sử + T2 Toàn Thư + T4 Khảo cổ]` | Thủ lĩnh tối cao, thao lược toàn quân; định hình phong cách Chủ Huy Tầm Xa & Nhuệ Khí AoE. | **KHÓA CHÍNH THỨC (HERO SLOT 1 - CORE)** |
| **2. Đinh Liễn** | `[SOURCE-BACKED: T1 Cột kinh 973/979 + T2 Toàn Thư]` | Con trưởng trực tiếp cầm quân tiên phong dẹp loạn; sát thủ cận chiến tốc độ cao, dồn sát thương đơn mục tiêu. | **KHÓA CHÍNH THỨC (HERO SLOT 2 - VANGUARD)** |
| **3. Nguyễn Bặc** | `[SOURCE-BACKED: T2 Toàn Thư]` | Tướng tiên phong thân tín nhất (Định Quốc Công); đấu sĩ hạng nặng, khống chế diện rộng (Stun/Immobilize). | **KHÓA CHÍNH THỨC (HERO SLOT 3 - DISRUPTOR)** |
| **Trần Lãm** | `[SOURCE-BACKED: T2 Toàn Thư]` | Sứ quân Bố Hải Khẩu, cha nuôi Đinh Bộ Lĩnh; mất sớm năm 967, vai trò thiên về hậu phương bảo trợ chính trị. | **DỰ BỊ NARRATIVE / NPC** |
| **Đinh Điền** | `[SOURCE-BACKED: T2 Toàn Thư]` | Thân tướng triều Đinh; vai trò trong chiến dịch 965–968 tương tự Nguyễn Bặc nhưng nguồn T2 ít nổi bật bằng. | **DỰ BỊ EXPANSION** |
| **Lưu Cơ** | `[SOURCE-BACKED: T2 Toàn Thư]` | Trấn thủ Đại La, quản lý tư pháp/an ninh nội địa; thiên về hành chính hơn tác chiến mặt trận. | **DỰ BỊ LORE / EXPANSION** |
| **Phạm Bạch Hổ** | `[SOURCE-BACKED: T2 Toàn Thư]` | Sứ quân Đằng Châu quy phục Đinh Bộ Lĩnh; phù hợp làm Hero chiêu mộ mở rộng ở các bản cập nhật sau. | **DỰ BỊ RECRUITMENT** |

> [!NOTE]
> **Bộ Ba Tam Giác Tác Chiến Cân Bằng (The Combat Triangle)**:
> 1. **Đinh Bộ Lĩnh**: Sát thương tầm xa xuyên phá + Kiểm soát tốc độ quái vật (`slow`).
> 2. **Đinh Liễn**: Sát thương cận chiến dồn dập + Trảm mục tiêu máu cao (`single-target burst`).
> 3. **Nguyễn Bặc**: Sát thương va đập diện rộng + Khống chế bất động cứng (`immobilize / crowd control`).

---

## 2. Đặc Tả Chi Tiết 3 Tướng Chính Thức

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ĐỘI HÌNH VẠN THẮNG HOA LƯ                        │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ [1] ĐINH BỘ LĨNH     │ [2] ĐINH LIỄN        │ [3] NGUYỄN BẶC                │
│ Chủ Huy Tầm Xa (AoE) │ Tiên Phong DPS (Burst)│ Đấu Sĩ Khống Chế (Disruptor)  │
│ 🏹 Cung Lệnh / Kiếm  │ ⚔ Song Đao / Kích    │ 🔨 Đại Trảm Đao / Thiết Kích  │
│ Range: 150px (Rộng)  │ Range: 90px (Vừa)    │ Range: 75px (Cận chiến)       │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

### 2.1. Hero Slot 1: Đinh Bộ Lĩnh (Vạn Thắng Vương) — CORE LEADER

* **Định danh hệ thống**: `heroId: 'dinh-bo-linh'`
* **Tên hiển thị**: `Đinh Bộ Lĩnh`
* **Danh hiệu**: `Vạn Thắng Vương` `[SOURCE-BACKED: T2 Toàn Thư]`
* **Căn cứ lịch sử**:
  - `[SOURCE-BACKED: T1 Tống Sử Q488]`: Khởi binh từ Giao Chỉ, xưng Đinh Luyện là con, nhận phong tiết độ sứ.
  - `[SOURCE-BACKED: T2 Toàn Thư Kỷ Nhà Đinh]`: Người động Hoa Lư, con Đinh Công Trứ, có tài thao lược, đánh đâu thắng đó nên xưng là Vạn Thắng Vương.
* **Phong cách tạo hình (Visual Prompt Direction)**:
  - `[PLAUSIBLE ADAPTATION]`: Nam nhân tráng kiện tuổi 40, ánh mắt sắc sảo đầy uy quyền; khoác chiến bào màu nâu sẫm dã chiến lót giáp đồng thế kỷ X; tay cầm trường kiếm lệnh đúc hoa văn Đông Sơn muộn, tay kia cầm cờ lệnh thêu chữ "Vạn Thắng".
* **Chỉ số cơ bản định hướng (Base Stats Profile)**:
  - `atk: 42`
  - `attackSpeed: 1.0` (1 đòn/giây)
  - `range: 150` (Tầm xa)
  - `critChance: 0.10`
* **Kỹ năng Nội tại (Passive Skill)**:
  - **Tên**: *Vạn Thắng Quân Uy* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế**: Đòn đánh cơ bản có khả năng xuyên thấu $1$ mục tiêu phụ đứng ngay phía sau mục tiêu chính, gây $50\%$ sát thương cho mục tiêu phụ.
* **Kỹ năng Chủ động (Active Skill)**:
  - **Tên**: *Lệnh Tiễn Hoa Lư* (Hoa Lu Command Salvo) `[GAMEPLAY ADAPTATION]`
  - **Số đòn tích lũy kích hoạt (`skillTriggerHits`)**: $6$ đòn đánh.
  - **Cơ chế tác động**: Bắn ra một loạt tên lệnh uy lực vào khu vực mục tiêu, gây $180\%$ sát thương cho toàn bộ kẻ địch trong bán kính $R = 140\text{ px}$ và làm chậm $35\%$ tốc độ di chuyển (`slow`) của chúng trong $2.5\text{ giây}$.

---

### 2.2. Hero Slot 2: Đinh Liễn (Nam Việt Vương) — VANGUARD SLAYER

* **Định danh hệ thống**: `heroId: 'dinh-lien'`
* **Tên hiển thị**: `Đinh Liễn`
* **Danh hiệu**: `Nam Việt Vương` `[SOURCE-BACKED: T1 Cột Kinh Hoa Lư + T2 Toàn Thư]`
* **Căn cứ lịch sử**:
  - `[SOURCE-BACKED: T1 Cột kinh Phật Đỉnh Tôn Thắng Đà-la-ni 973/979]`: Đệ tử Đinh Khuông Liễn, chức Tiết độ sứ, xưng hiệu Nam Việt Vương.
  - `[SOURCE-BACKED: T2 Toàn Thư]`: Cùng cha đi dẹp 12 sứ quân từ thuở hàn vi, lập nhiều chiến công hiển hách.
* **Phong cách tạo hình (Visual Prompt Direction)**:
  - `[PLAUSIBLE ADAPTATION]`: Tướng trẻ tuổi 20–25, vóc dáng linh hoạt, mặc giáp da thuộc bó sát đính đinh tán đồng; sử dụng song đoản kích hoặc song kiếm lưỡi cong cơ động, toát lên vẻ quả cảm và quyết liệt của dũng tướng tiên phong.
* **Chỉ số cơ bản định hướng (Base Stats Profile)**:
  - `atk: 56` (Sát thương cơ bản cao)
  - `attackSpeed: 1.35` (Tốc độ đánh nhanh)
  - `range: 90` (Tầm cận chiến trung bình)
  - `critChance: 0.20` (Chí mạng cao)
* **Kỹ năng Nội tại (Passive Skill)**:
  - **Tên**: *Tiên Phong Đoạt Kỳ* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế**: Tăng $25\%$ sát thương chí mạng khi tấn công các mục tiêu đang có lượng máu $>70\%$.
* **Kỹ năng Chủ động (Active Skill)**:
  - **Tên**: *Trảm Tướng Phá Trận* (Decisive Strike) `[GAMEPLAY ADAPTATION]`
  - **Số đòn tích lũy kích hoạt (`skillTriggerHits`)**: $5$ đòn đánh.
  - **Cơ chế tác động**: Tung chuỗi đòn chém dồn sát thương chớp nhoáng gây $320\%$ ATK vào kẻ địch có lượng máu cao nhất trong tầm đánh, đồng thời làm mục tiêu bị choáng/bất động (`immobilize`) trong $1.5\text{ giây}$.

---

### 2.3. Hero Slot 3: Nguyễn Bặc (Định Quốc Công) — HEAVY DISRUPTOR

* **Định danh hệ thống**: `heroId: 'nguyen-bac'`
* **Tên hiển thị**: `Nguyễn Bặc`
* **Danh hiệu**: `Định Quốc Công` `[SOURCE-BACKED: T2 Toàn Thư]`
* **Căn cứ lịch sử**:
  - `[SOURCE-BACKED: T2 Toàn Thư]`: Bạn đồng cam cộng khổ từ thời cờ lau tập trận, tướng lĩnh trụ cột hàng đầu giúp Đinh Bộ Lĩnh dẹp yên 12 sứ quân, được phong làm Định Quốc Công (Tể tướng đứng đầu triều thần).
* **Phong cách tạo hình (Visual Prompt Direction)**:
  - `[PLAUSIBLE ADAPTATION]`: Dũng tướng lực lưỡng, mặt vuông chữ điền cương nghị; khoác giáp hộ tâm bằng đồng nặng nề, cầm đại trảm đao cán dài uy dũng, tư thế vững chãi như bàn thạch.
* **Chỉ số cơ bản định hướng (Base Stats Profile)**:
  - `atk: 48`
  - `attackSpeed: 0.8` (Đánh chậm, lực nặng)
  - `range: 75` (Cận chiến ngắn)
  - `critChance: 0.08`
* **Kỹ năng Nội tại (Passive Skill)**:
  - **Tên**: *Thiết Bích Hoa Lư* `[PLAUSIBLE ADAPTATION]`
  - **Cơ chế**: Mỗi đòn đánh thường tạo lực chém quét lan $20\%$ sát thương cơ bản sang các kẻ địch đứng sát cạnh mục tiêu chính trong phạm vi $40\text{ px}$.
* **Kỹ năng Chủ động (Active Skill)**:
  - **Tên**: *Địa Chấn Trấn Thành* (Earthshaker Slam) `[GAMEPLAY ADAPTATION]`
  - **Số đòn tích lũy kích hoạt (`skillTriggerHits`)`: $7$ đòn đánh.
  - **Cơ chế tác động**: Dộng cực mạnh đại đao xuống đất tạo làn sóng địa chấn lan tỏa trong bán kính $R = 120\text{ px}$, gây $200\%$ sát thương và khóa chặt toàn bộ kẻ địch trong vùng ảnh hưởng ở trạng thái bất động (`immobilize`) trong $2.0\text{ giây}$.

---

## 3. Khả Năng Mở Rộng Roster Về Sau (Expansion Roadmap)

Khi dự án phát triển các màn chơi phụ hoặc hệ thống Chiêu Mộ Tướng (Hero Recruitment), các tướng sau sẽ được mở khóa:
1. **Trần Lãm**: Hỗ trợ kinh tế, tăng năng lượng Quân Lệnh khởi đầu.
2. **Đinh Điền**: Tướng phòng thủ bờ sông, kỹ năng làm chậm bằng lưới cản.
3. **Lưu Cơ**: Khống chế tư pháp, giảm tốc độ di chuyển toàn bản đồ.
4. **Phạm Bạch Hổ**: Xạ thủ cưỡi ngựa thần tốc, tấn công đa mục tiêu duyên hải.
