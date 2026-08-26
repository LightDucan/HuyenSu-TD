# Thiết Kế Ý Niệm Playable Hero: Ngô Quyền (Task `VS-NQ-02B`)

> [!IMPORTANT]
> **Ràng Buộc Thiết Kế Playable Hero Ngô Quyền**:
> - **Định vị đơn vị**: Ngô Quyền là một **Tower / Card phòng thủ trên grid cố định**, không di chuyển tự do (NOT a free-moving RPG unit).
> - **Normal Attack**: **Đơn mục tiêu (Single-target)**, **tuyệt đối không AoE, không Stun, không Slow, không Root, không Poison**.
> - **Active Skill**: Tuân thủ kiến trúc hệ thống dùng chung (*Shared Combat System*). **TriggerHits bắt buộc chọn một trong 4 mốc: 3 / 5 / 7 / 10**.
> - **Không tạo logic cơ học riêng**: Không tạo engine thủy triều, không tạo cơ chế cắm cọc tương tác hay vật lý tàu thuyền. Hương vị Bạch Đằng được thể hiện qua hiệu ứng hình ảnh (VFX) và các trạng thái khống chế dùng chung (*Shared Status Effects*).
> - **Mọi chỉ số cân bằng**: Để ở trạng thái **`[CONFIG / OPEN]`**.

---

## 1. Phân Tầng Nhận Diện Lịch Sử & Mỹ Thuật Nhân Vật

```mermaid
graph TD
    subgraph PHÂN TẦNG NHẬN DIỆN NGÔ QUYỀN (938 SCN)
        T1["<b>1. HISTORICAL CORE (T1/T2 Fact)</b><br>• Tướng lĩnh Ái Châu, thủ lĩnh tối cao trận Bạch Đằng 938<br>• Dáng vẻ khôi ngô, mắt sáng như chớp, dũng lược hơn người (Toàn Thư)<br>• Năm 938 giữ chức Tiết độ sứ / Chủ soái (chưa xưng Vương)"]

        T2["<b>2. T3/T4 HISTORIOGRAPHICAL INTERPRETATION</b><br>• Trang phục tướng soái người Việt thế kỷ X: Áo chiến bào vải thô/gấm chàm<br>• Giáp ngực da thuộc đính phiến đồng, đai lưng da có khóa đồng thời Ngũ Đại<br>• Khăn xếp đỏ hoặc chít khăn búi tóc truyền thống hào trưởng phương Nam"]

        T3["<b>3. GAME CREATIVE (Art Direction & VFX)</b><br>• Tư thế Front View oai nghiêm, tay cầm bảo kiếm chỉ huy (Chủ tướng)<br>• Khí chất lãnh đạo kiệt xuất: VFX sóng nước phù sa cuộn trào quanh đài chỉ huy<br>• Biểu tượng sóng ngầm và cọc bịt sắt thể hiện qua visual đòn đánh và kỹ năng"]

        T1 --> T2
        T2 --> T3
    end
```

### 1.1. Chi Tiết Phân Tầng Nhận Diện
1. **Historical Core (T1/T2 Fact)**:
   - Xuất thân đất Đường Lâm, nha tướng cai quản Ái Châu, con rể Dương Đình Nghệ.
   - Sử gia Ngô Sĩ Liên trong *Toàn Thư* mô tả: *"Vương khi mới sinh có ánh sáng lạ đầy nhà, dung mạo khác thường, lưng có 3 nốt ruồi... lớn lên khôi ngô tuấn tú, mắt như chớp, đi như cọp, có trí dũng, sức có thể nâng vạc"*.
   - *Lưu ý niên đại học thuật*: Năm 938 Ngô Quyền đang ở cương vị Chủ soái / Tiết độ sứ, chưa xưng Vương (đến mùa xuân 939 mới chính thức xưng Vương và định đô Cổ Loa). Do đó, tạo hình không mặc long bào hoàng đế hay đội mũ miện quân chủ thời sau.
2. **T3/T4 Historiographical Interpretation**:
   - Trang phục mang phong cách võ tướng thế kỷ X vùng Giao Châu: Áo bào chàm sẫm viền đỏ, giáp phiến da bọc ngực và vai chịu được môi trường sông nước ẩm ướt, đai thắt lưng da bò mặt khóa đồng hình giao long.
   - Đầu chít khăn quấn gấm màu sẫm hoặc đội mũ hộ đầu da thuộc ngắn, tóc búi gọn phía sau gáy.
3. **Game Creative (Tower Defense Visual Identity)**:
   - **Vũ khí nhận diện**: Trường kiếm lệnh bằng thép tôi (Command Longsword) — biểu trưng cho quyền uy chỉ huy toàn quân trên sóng nước.
   - **Tư thế chiến đấu**: Đứng vững chãi trên đài bãi bồi / sàn thuyền chỉ huy, tay phải nắm đốc kiếm, tay trái thủ thế điều động quân lệnh.

---

## 2. Thiết Kế Đòn Đánh Thường: Normal Attack (Single-Target)

* **Tên đòn đánh**: **Trảm Phong Kiếm (Commander's Slash)**.
* **Cơ chế chiến đấu**: **Đơn mục tiêu (Single-target direct attack)**.
* **Quy chuẩn hệ thống**:
  - Tấn công mục tiêu kẻ địch đơn lẻ đầu tiên lọt vào tầm đánh (theo cơ chế target ưu tiên mặc định: kẻ địch đi đầu trên tuyến đường).
  - Gây sát thương vật lý thuần túy (*Physical Damage*).
  - **TUYỆT ĐỐI KHÔNG CÓ**: Không sát thương lan (No AoE), không làm chậm (No Slow), không làm choáng (No Stun), không trói chân (No Root), không độc thương (No Poison).
* **Hiệu ứng mỹ thuật (Visual Presentation)**:
  - Vung trường kiếm chém một vệt sáng hình bán nguyệt màu lam bạc mang theo dư ảnh sóng nước về phía mục tiêu.
* **Thông số thiết kế**:
  - `AttackType`: `Physical / Melee-Range Hybrid`
  - `Targeting`: `Single-Target (First Enemy on Path)`
  - `BaseDamage`: `[CONFIG / OPEN]`
  - `AttackInterval`: `[CONFIG / OPEN]`
  - `Range`: `[CONFIG / OPEN]`

---

## 3. Thiết Kế Kỹ Năng Kích Hoạt: Active Skill

> [!IMPORTANT]
> **Ràng Buộc Kỹ Năng Kích Hoạt (Active Skill Architecture)**:
> - Chỉ sử dụng các hiệu ứng dùng chung có sẵn trong hệ thống: **Damage, AoE, Slow, Stun, Root, MultiHit**.
> - **TriggerHits** (số đòn đánh thường tích lũy để kích hoạt) chỉ được chọn từ tập hợp: **`[3, 5, 7, 10]`**.
> - Không tạo code cơ học riêng cho thủy triều hay tàu bè. Tính chất "trận địa cọc" và "triều rút" được tái hiện thông qua hiệu ứng trói chân (Root) / làm chậm (Slow) và sát thương diện rộng (AoE).

```mermaid
flowchart TD
    subgraph ACTIVE SKILL CYCLE (TRIGGER HITS = 5)
        A1["<b>Normal Attack 1-4</b><br>Tích lũy nộ khí chiến trận<br>(Single-target Hits)"]
        A2["<b>Normal Attack 5</b><br>Đạt mốc TriggerHits = 5"]
        A3["<b>KÍCH HOẠT SKILL: BẠCH ĐẰNG PHỤC KÍCH</b><br>AoE Damage + Root / Slow diện rộng trên đường di chuyển"]

        A1 --> A2 --> A3
    end
```

### 3.1. Phương Án Kỹ Năng Đề Xuất (Recommended Skill Concept)

* **Tên Kỹ Năng**: **Bạch Đằng Phục Kích (Bach Dang Ambush Strikes)**.
* **Mô tả cốt truyện / Flavor**: Ngô Quyền phất cờ lệnh, hiệu triệu sức mạnh quân dân và lợi thế địa hình cửa sông, phóng ra luồng kiếm khí ngập tràn sóng nước ép đoàn thuyền giặc mắc kẹt vào bãi cọc hiểm yếu.
* **Cơ chế kỹ thuật dùng chung (*Shared Mechanics*)**:
  - **TriggerHits**: **`5`** (Kích hoạt tự động sau mỗi 5 đòn đánh thường trúng đích).
  - **Primary Effect**: Gây sát thương vật lý diện rộng (**AoE Physical Damage**) lên toàn bộ kẻ địch trong bán kính ảnh hưởng quanh điểm va chạm.
  - **Secondary Effect**: Áp dụng hiệu ứng **Trói chân (Root)** hoặc **Làm chậm (Slow)** trong khoảng thời gian ngắn lên tất cả kẻ địch trúng đòn (mô phỏng hiệu ứng thuyền giặc vướng cọc cản trở chuyển động trên tuyến đường).
* **Hiệu ứng mỹ thuật (VFX)**:
  - Ngô Quyền cắm trường kiếm xuống đất, một vòng sáng phù sa đỏ lam bùng nổ quanh tâm mục tiêu; hình bóng rặng cọc gỗ nhọn nhô lên từ lòng sông giữ chặt lấy chân các đơn vị kẻ địch.
* **Thông số kỹ thuật**:
  - `TriggerHits`: `5`
  - `DamageType`: `Physical AoE`
  - `DamageMultiplier`: `[CONFIG / OPEN]`
  - `AoERadius`: `[CONFIG / OPEN]`
  - `StatusEffect`: `Root / Slow [CONFIG / OPEN]`
  - `StatusDuration`: `[CONFIG / OPEN]`

---

### 3.2. Phương Án Kỹ Năng Dự Phòng (Alternate Skill Concept)

* **Tên Kỹ Năng**: **Thiết Quyết Phá Trận (Iron-Spike Breaker)**.
* **Mô tả cốt truyện / Flavor**: Ngô Quyền dồn toàn lực tung chuỗi đòn chém dũng mãnh phá vỡ soái hạm địch, dồn ép chủ tướng đối phương vào thế hiểm.
* **Cơ chế kỹ thuật dùng chung (*Shared Mechanics*)**:
  - **TriggerHits**: **`5`** (hoặc `7`).
  - **Primary Effect**: Tấn công liên hoàn nhiều nhịp (**MultiHit Damage**) lên mục tiêu có lượng HP cao nhất hoặc kẻ địch đi đầu trong tầm đánh.
  - **Secondary Effect**: Gây hiệu ứng **Làm choáng (Stun)** ngắn trên nhịp chém cuối cùng.
* **Thông số kỹ thuật**:
  - `TriggerHits`: `5` (hoặc `7`)
  - `HitCount`: `3 hits`
  - `DamagePerHit`: `[CONFIG / OPEN]`
  - `StatusEffect`: `Stun [CONFIG / OPEN]`
  - `StunDuration`: `[CONFIG / OPEN]`

---

## 4. Thiết Kế Nội Tại Huyền Thoại: Legendary Passive

> [!NOTE]
> **Quy Chuẩn Passive System**:
> - Tuân thủ kiến trúc nội tại dùng chung (Shared Passive Architecture).
> - Cho phép áp dụng các hệ số điều chỉnh theo tỷ lệ phần trăm (Percentage Modifiers).
> - Mọi giá trị phần trăm cụ thể giữ ở trạng thái **`[OPEN]`**.

* **Tên Nội Tại**: **Quốc Chủ Thống Soái (Sovereign Commander)**.
* **Mô tả cốt truyện / Flavor**: Khí chất kiệt xuất của người khai mở nền độc lập muôn đời, khích lệ tinh thần chiến đấu quả cảm của quân dân và gia tăng uy lực sát thương lên những kẻ thù đang sa lầy.
* **Cơ chế kỹ thuật dùng chung (*Shared Passive Mechanics*)**:
  - **Hiệu ứng 1 (Tactical Command Aura)**: Tăng thêm **`+X%` Sát thương vật lý (*Physical Damage*)** cho bản thân và các Hero đồng minh được bố trí trong ô lân cận (Aura Radius 1 ô grid).
  - **Hiệu ứng 2 (Exploit Impairment)**: Đòn đánh của Ngô Quyền gây thêm **`+Y%` Sát thương cộng thêm** lên các mục tiêu đang chịu trạng thái khống chế bất lợi (Root / Slow / Stun).
* **Thông số kỹ thuật**:
  - `AuraRadius`: `1 Grid Cell (Adjacent Tiles)`
  - `AllyDamageBonusPercent`: `[OPEN / CONFIG %]`
  - `CrowdControlBonusDamagePercent`: `[OPEN / CONFIG %]`

---

## 5. Quy Chuẩn Kỹ Thuật Asset Sprite (Asset Contract)

Tài liệu này xác lập quy chuẩn thị giác cho các công đoạn sản xuất asset về sau:

| Thuộc Tính Kỹ Thuật | Quy Chuẩn Bắt Buộc | Ghi Chú Mỹ Thuật |
|---|:---:|---|
| **Góc nhìn (View Perspective)** | **Front View Only** | Trực diện $100\%$, nhìn thẳng, không quay nghiêng góc 2.5D, không góc nhìn từ trên cao (Isometric). |
| **Kích thước khung (Canvas)** | **$128 \times 128\text{ px}$** | Phù hợp độ phân giải pixel grid của dự án. |
| **Định dạng ảnh** | **PNG (RGBA 32-bit)** | Kênh Alpha trong suốt hoàn toàn ở vùng nền. |
| **Đường gióng chân (Baseline Y)** | **$Y = 112\text{ px}$** | Điểm tiếp xúc chân nhân vật trên mặt đất đặt chính xác tại tọa độ Y=112 để khớp lưới grid. |
| **Tỷ lệ cơ thể (Proportion)** | **Chibi / Semi-realistic Hero** | Chiều cao nhân vật chiếm khoảng 75–85% chiều cao canvas ($96 - 108\text{ px}$ tính từ đầu đến chân). |
| **Bảng màu nhận diện** | Chàm sẫm, Đỏ bầm, Đồng cổ, Lam sáng | Phản ánh màu áo vải thô chàm, viền đai đỏ hào trưởng, giáp da bọc đồng và ánh kiếm thép. |

> [!CAUTION]
> Tuyệt đối **không tự ý sinh file asset PNG** trong task này. Mọi thông số trên đóng vai trò là hợp đồng kỹ thuật cho bước sản xuất asset tiếp theo.
