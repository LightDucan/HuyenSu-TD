# Đề Xuất Tuyển Chọn Roster: Chapter ARC-DT-01 "Quật Khởi Hoan Châu"

> [!IMPORTANT]
> **Ràng Buộc Tuyển Chọn Roster (Task `VS-MTL-01`)**:
> - Tài liệu này đề xuất danh sách **Playable Heroes** và **Enemy Opposition** cho Chapter `ARC-DT-01` ("Quật Khởi Hoan Châu — Mai Hắc Đế", ~713/722 SCN).
> - Sử dụng tài liệu nghiên cứu đã được Audit PASS `docs/drafts/viet-su/602-938/**` làm cơ sở sử liệu chuẩn (historical baseline).
> - **TUYỆT ĐỐI KHÔNG**:
>   - Không thiết kế Normal Attack, Skill, Passive, stats, Range, AttackSpeed hay class gameplay.
>   - Không tạo enemy attack mechanics (Enemy hiện chỉ di chuyển theo fixed path và có HP).
>   - Không tự invent nhân vật lịch sử hư cấu để lấp đầy slot nếu nguồn không hỗ trợ.

---

## 1. Cơ Sở Sử Liệu & Phân Tầng Học Thuật (Baseline)

Dựa trên kết quả khảo cứu tại `docs/drafts/viet-su/602-938/sources.md`:
* **T1 — Near-source Chinese Chronicles**: *Cựu Đường Thư* (Quyển 8, 109), *Tân Đường Thư* (Quyển 207), *Tư Trị Thông Giám* (Quyển 212) ghi nhận cuộc khởi nghĩa bùng nổ tại Hoan Châu, liên minh với các nước phía Nam (Lâm Ấp, Chân Lạp) và bị tướng Đường là Dương Tư Húc cùng Quang Sở Khách đàn áp vào năm Khai Nguyên thứ 10 (722 SCN).
* **T2 — Later Vietnamese Historiography**: *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục* ghi khởi sự từ năm 713 SCN, thủ lĩnh xưng là Mai Hắc Đế, xây thành Vạn An.
* **T3 — Local Tradition / Folklore**: Thần tích đền thờ Vua Mai (Nam Đàn, Nghệ An), thần phả làng Ngọc Sơn, đền thờ Hoàng hậu Phạm Thị Uyển (Yên Duyên, Hà Nội).
* **T4 — Modern Scholarship**: Công trình nghiên cứu của Đào Duy Anh, Phan Huy Lê, Hà Văn Tấn về địa bàn thành Vạn An, thung lũng Sa Nam và quy mô liên minh Đông Nam Á.

---

## 2. Đề Xuất Playable Hero Roster

```mermaid
graph TD
    subgraph ĐỀ XUẤT PLAYABLE HERO ROSTER (ARC-DT-01)
        H1["<b>Hero 1 (Bắt buộc)</b><br>Mai Thúc Loan (Mai Hắc Đế)<br><i>Nguồn: T1 + T2 + T3</i><br><b>STATUS: LOCK CANDIDATE</b>"]
        H2["<b>Hero 2 (Đề xuất chính)</b><br>Phạm Thị Uyển (Hoàng Hậu / Nữ Tướng)<br><i>Nguồn: T3 (Thần tích đền thờ Hà Nội)</i><br><b>STATUS: PROVISIONAL</b>"]
        H3["<b>Hero 3 (Đề xuất chính)</b><br>Mai Kỳ Sơn (Dũng Tướng Vạn An)<br><i>Nguồn: T3 (Thần phả đền Vua Mai)</i><br><b>STATUS: PROVISIONAL</b>"]

        F1["<b>Fallback 1 (Dự phòng Nữ tướng)</b><br>Mai Thị Cầu (Nữ Tướng Sa Nam)<br><i>Nguồn: T3</i><br><b>STATUS: FALLBACK</b>"]
        F2["<b>Fallback 2 (Dự phòng Thủy binh)</b><br>Đinh Thế Mỹ (Tướng Sông Lam)<br><i>Nguồn: T3</i><br><b>STATUS: FALLBACK</b>"]
    end

    H2 -.->|Nếu nguồn T3 chưa đủ| F1
    H3 -.->|Nếu cần thay đổi archetype| F2
```

---

### 2.1. Hero Slot 1 (Bắt Buộc): Mai Thúc Loan (Mai Hắc Đế)

* **Identity**: Thủ lĩnh tối cao của cuộc khởi nghĩa Hoan Châu, xưng Hoàng đế (Mai Hắc Đế), người sáng lập thành lũy Vạn An.
* **Historical Role**: Lãnh tụ phong trào nông dân chống ách cống nạp vải quả, liên minh 32 châu và các tiểu quốc phương Nam (Lâm Ấp, Chân Lạp), giải phóng toàn bộ An Nam đô hộ phủ trước khi đối đầu đại quân Dương Tư Húc năm 722.
* **Source Tier**: **T1** (*Cựu Đường Thư*, *Tư Trị Thông Giám*) + **T2** (*Toàn Thư*, *Cương Mục*) + **T3** (Thần tích đền Vua Mai) + **T4** (Khảo cổ cố đô Vạn An).
* **Vì sao phù hợp Playable Hero**:
  * Là linh hồn và biểu tượng tối cao của toàn bộ Chapter `ARC-DT-01`.
  * Visual silhouette mang tính biểu tượng dân tộc: vóc dáng vạm vỡ dũng mãnh, nước da ngăm đen đặc trưng, sắc áo chàm (đức Thủy), phong thái bậc đế vương quật khởi.
* **Rủi ro sử liệu & Historical Caveat**:
  * Niên đại dấy binh: `713–722 SCN (T2)` vs `722 SCN (T1)`.
  * Con số liên quân 30–40 vạn là ước lệ phóng đại trong thư tịch cổ phương Bắc nhằm cường điệu hóa chiến công của Dương Tư Húc.
* **Đề xuất quyết định**: **LOCK CANDIDATE**.

---

### 2.2. Hero Slot 2 (Đề Xuất Chính): Phạm Thị Uyển (Hoàng Hậu / Nữ Tướng Phòng Tuyến Phía Bắc)

* **Identity**: Hoàng hậu / Thứ phi của Mai Hắc Đế, nữ tướng chỉ huy cánh quân phòng ngự cửa ngõ Tống Bình (Hà Nội).
* **Historical Role**: Theo thần tích dân gian, bà phụ trách cánh quân đồn trú tại vùng sông Tô Lịch / sông Hồng để bảo vệ mặt Bắc của chính quyền khởi nghĩa. Khi Dương Tư Húc bất ngờ xua quân tràn xuống, bà chỉ huy quân sĩ chiến đấu anh dũng và tuẫn tiết trên dòng sông Tô Lịch.
* **Source Tier**: **T3** (Thần tích đền thờ thôn Yên Duyên, xã Yên Sở, Hoàng Mai, Hà Nội; sắc phong triều Nguyễn) + **T4** (Nghiên cứu văn hóa lịch sử Thăng Long - Hà Nội).
* **Vì sao phù hợp Playable Hero**:
  * Bổ sung nhân vật nữ tướng kiên cường đại diện cho phòng tuyến phía Bắc (Tống Bình/sông Tô Lịch), tạo sự cân bằng giới tính và đa dạng hóa đội ngũ tướng lĩnh.
  * Visual silhouette nữ tướng thanh nhã nhưng quyết đoán, gắn liền với sông nước và trận địa phòng ngự ven sông.
* **Rủi ro sử liệu & Historical Caveat**:
  * Nhân vật **hoàn toàn không xuất hiện trong T1 (*Cựu Đường Thư*) hay T2 (*Toàn Thư*)**, chỉ được bảo tồn qua hệ thống thần tích đền miếu địa phương tại Hà Nội (T3).
  * **Tuyệt đối không xem là T1 Historical Fact**. Cần gắn nhãn nguồn gốc dân gian T3 rõ ràng trong hồ sơ game.
* **Đề xuất quyết định**: **PROVISIONAL** (Ứng viên tiềm năng nhất cho Slot 2).

---

### 2.3. Hero Slot 3 (Đề Xuất Chính): Mai Kỳ Sơn (Dũng Tướng Trấn Thủ Thành Vạn An)

* **Identity**: Con trai / Dũng tướng thân tín của Mai Hắc Đế, phụ trách phòng thủ cứ điểm tiền tiêu núi Hùng Sơn.
* **Historical Role**: Theo thần tích đền thờ Vua Mai và thần phả làng Ngọc Sơn (Nam Đàn, Nghệ An), Mai Kỳ Sơn chỉ huy đội quân bộ tinh nhuệ bảo vệ mặt tiền và sườn núi Hùng Sơn, chặn đứng các đợt tiến công đầu tiên của giặc Đường.
* **Source Tier**: **T3** (Thần phả đền thờ Vua Mai, di tích mộ Hùng Sơn, Nam Đàn, Nghệ An).
* **Vì sao phù hợp Playable Hero**:
  * Đại diện cho lực lượng phòng thủ trực tiếp tại căn cứ địa Vạn An (Nghệ An), phối hợp tác chiến cận kề bên Mai Hắc Đế.
  * Visual silhouette dũng tướng trẻ tuổi, trang bị khiên gỗ và giáo mác truyền thống vùng thung lũng sông núi Hoan Châu.
* **Rủi ro sử liệu & Historical Caveat**:
  * Chỉ xuất hiện trong nguồn thần tích và ngọc phả địa phương (T3). T1 và T2 không chép danh tính cụ thể các tướng dưới quyền Mai Thúc Loan.
  * **Không biến thành T1 Fact**.
* **Đề xuất quyết định**: **PROVISIONAL** (Ứng viên tiềm năng nhất cho Slot 3).

---

### 2.4. Các Phương Án Hero Dự Phòng (Fallback Candidates)

#### Fallback 1: Mai Thị Cầu (Nữ Tướng Hậu Phương Sa Nam)
* **Identity**: Con gái của Mai Hắc Đế, chỉ huy đội nữ binh bảo vệ hậu cần và an ninh khu căn cứ Sa Nam.
* **Source Tier**: **T3** (Thần tích đền Vua Mai và đền thờ các liệt nữ Hoan Châu).
* **Vai trò dự phòng**: Thay thế cho Slot 2 nếu Codex/Design team muốn tập trung 100% nhân vật tại chiến trường Hoan Châu thay vì mở rộng ra phòng tuyến Tô Lịch của Phạm Thị Uyển.
* **Đề xuất quyết định**: **FALLBACK**.

#### Fallback 2: Đinh Thế Mỹ (Tướng Thủy Binh Sông Lam)
* **Identity**: Thổ hào danh tướng đất Sa Nam, phụ trách đội chiến thuyền trên sông Lam.
* **Source Tier**: **T3** (Thần phả địa phương Nam Đàn).
* **Vai trò dự phòng**: Thay thế cho Slot 3 nếu cần một archetype tướng chuyên trách sông nước / thủy trận để đa dạng hóa phong cách chiến đấu.
* **Đề xuất quyết định**: **FALLBACK**.

#### Đánh Giá Ứng Viên Bị Loại: Tướng Lĩnh Hư Cấu Lâm Ấp / Chân Lạp
* **Lý do loại**: T1 xác nhận sự tồn tại của liên quân Lâm Ấp / Chân Lạp, nhưng **hoàn toàn không có tên tướng lĩnh cụ thể**. Việc tự đặt tên và tạo một Hero ngoại bang hư cấu sẽ vi phạm nghiêm trọng nguyên tắc trung thực sử liệu. Lực lượng Lâm Ấp/Chân Lạp sẽ được thể hiện qua **Narrative Lore** và bối cảnh cốt truyện thay vì Playable Hero cá nhân.
* **Đề xuất quyết định**: **REJECT AS NAMED PLAYABLE HERO**.

---

## 3. Đề Xuất Enemy / Opposition Roster

> [!WARNING]
> **Quy Tắc Thiết Kế Enemy Hiện Tại**:
> - Enemy weapon chỉ là **visual identity** (nhận diện hình ảnh), không có cơ chế tấn công Hero.
> - Toàn bộ Enemy là các đơn vị di chuyển trên **fixed path** có thanh HP.

```mermaid
graph TD
    subgraph ENEMY OPPOSITION (QUÂN ĐÔ HỘ NHÀ ĐƯỜNG 722 SCN)
        E1["<b>Normal Enemy 1</b><br>Đường Binh Tiền Phong (Bộ Binh)<br><i>Generic Military Archetype</i>"]
        E2["<b>Normal Enemy 2</b><br>Đường Cung Nỏ Thủ (Cung Nỏ)<br><i>Generic Military Archetype</i>"]
        E3["<b>Normal Enemy 3</b><br>Đường Khinh Kỵ (Kỵ Binh Ven Biển)<br><i>Generic Military Archetype</i>"]

        EL["<b>Elite Unit</b><br>Phiêu Kỵ Đô Úy (Sĩ Quan Thiết Giáp)<br><i>Generic Military Archetype</i>"]

        B1["<b>Boss 1 (Chính)</b><br>Dương Tư Húc (Phiêu Kỵ Tướng Quân)<br><i>Historical Person (T1)</i>"]
        B2["<b>Boss 2 (Phụ / Giai đoạn)</b><br>Quang Sở Khách (Quang Lộc Khanh)<br><i>Historical Person (T1)</i>"]
    end
```

---

### 3.1. Phân Định Rạch Ròi Bản Chất Nhân Vật Đối Lập

| Tên Đơn Vị | Phân Loại Bản Chất | Tầng Nguồn | Nhận Diện Hình Ảnh (Visual Only) |
|---|:---:|:---:|---|
| **Đường Binh Tiền Phong** | **Generic Military Archetype** | **T1/T4** | Lính bộ binh Đường triều, áo giáp nhẹ, tay cầm đao/khiên liễu diệp. |
| **Đường Cung Nỏ Thủ** | **Generic Military Archetype** | **T1/T4** | Lính xạ thủ trang bị nỏ tay hoặc cung ngắn thời Đường. |
| **Đường Khinh Kỵ** | **Generic Military Archetype** | **T1/T4** | Lính kỵ binh nhẹ cưỡi ngựa di chuyển nhanh, trinh sát ven bờ biển. |
| **Phiêu Kỵ Đô Úy** | **Generic Military Archetype** | **T1/T4** | Sĩ quan cấm vệ quân thân tín của Dương Tư Húc, mặc Minh Quang Khải nặng, cầm trường kích. |
| **Dương Tư Húc (楊思勖)** | **Historical Person** | **T1** | Đại tướng quân hoạn quan nhà Đường, khét tiếng tàn bạo, sát khí ngút trời, chỉ huy tối cao chiến dịch 722. |
| **Quang Sở Khách (光楚客)** | **Historical Person** | **T1** | Quan đô hộ / tướng triều đình, trang phục áo quan văn võ kết hợp, phụ trách hậu cần và áp chế hành chính. |

> [!NOTE]
> **Về Trang Bị Quân Đội Nhà Đường Năm 722**:
> Các mô tả trang bị (giáp Minh Quang, nỏ tay, khiên liễu diệp) là **Artistic / Archaeological Reconstruction (T4)** dựa trên tư liệu hiện vật thời Đường Huyền Tông (thế kỷ VIII). Không khẳng định đây là phục dựng chính xác 100% từng chi tiết của đạo quân viễn chinh 722.

---

### 3.2. Đánh Giá Hai Ứng Viên Boss Chính

#### Boss 1: Dương Tư Húc (Yang Sixu, 659–740 SCN)
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Cựu Đường Thư* (Quyển 8, 109), *Tư Trị Thông Giám* (Quyển 212). Là viên tướng hoạn quan thiện chiến bậc nhất của Đường Huyền Tông, từng đàn áp nhiều cuộc khởi nghĩa ở Lĩnh Nam và An Nam; nổi tiếng với biện pháp chém giết tàn bạo để thị uy.
* **Visual Identity**: Tướng soái uy nghiêm tàn bạo, giáp trụ đại tướng quân màu sẫm viền kim sắc, đao dài trảm mã, thần thái sát phạt dữ dội.
* **Đề xuất quyết định**: **LOCK CANDIDATE (Main Chapter Boss)**.

#### Boss 2: Quang Sở Khách (Guang Chuke — 光楚客)
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Cựu Đường Thư* (Huyền Tông bản kỷ). Giữ chức Quang Lộc khanh, cùng Dương Tư Húc phụng chiếu nam chinh.
* **Chuẩn hóa danh xưng**: **Quang Sở Khách (光楚客)** là tên canonical chuẩn xác theo T1. Tuyệt đối không dùng dị bản "Nguyên Sở Khách".
* **Visual Identity**: Viên quan triều đình phương Bắc kiêm võ tướng đốc quân, giáp trụ quan lại thời Khai Nguyên.
* **Đề xuất quyết định**: **LOCK CANDIDATE / SECOND BOSS** (Có thể bố trí làm Boss giai đoạn giữa / Mid-boss trước khi Dương Tư Húc xuất hiện).

---

## 4. Ràng Buộc Sử Liệu Cốt Lõi (Historical Guardrails)

1. **Niên đại lịch sử**: Toàn bộ tài liệu tôn trọng sự khác biệt giữa `713–722 SCN (T2)` và `722 SCN (T1)`. Không khóa cứng một niên đại độc nhất.
2. **Quy mô quân số**: Ước tính 30–40 vạn quân trong sử thư cổ là con số ước lệ truyền thống (rhetorical exaggeration); trong game chỉ tái hiện áp lực chiến thuật của các đợt tấn công liên tiếp trên fixed path.
3. **Ý nghĩa chiến thắng trong màn chơi (Local Gameplay Victory)**:
   - Chiến thắng của người chơi trong Chapter `ARC-DT-01` là **chiến thắng phòng thủ cục bộ (tactical in-stage victory)**: bảo vệ thành công phòng tuyến Vạn An và bẻ gãy các đợt xung kích đầu tiên của quân xâm lược Đường.
   - Không viết kịch bản thay đổi kết cục lịch sử tổng thể năm 722 (sự kiện Mai Hắc Đế hy sinh anh dũng và thành Vạn An thất thủ bi tráng).

---

## 5. Bảng Quyết Định Tuyển Chọn Roster (Output Decision Table)

| Vị Trí / Hạng Mục | Tên Đề Xuất | Tầng Nguồn | Mức Độ Tin Cậy Sử Liệu | Quyết Định / Trạng Thái | Ghi Chú Ràng Buộc |
|---|---|:---:|:---:|:---:|---|
| **Hero Slot 1** | **Mai Thúc Loan (Mai Hắc Đế)** | **T1 + T2 + T3** | Rất cao (Fact lịch sử) | **LOCK CANDIDATE** | Nhân vật bắt buộc; thủ lĩnh tối cao. |
| **Hero Slot 2** | **Phạm Thị Uyển** | **T3** | Trung bình (Dân gian T3) | **PROVISIONAL** | Hoàng hậu / Nữ tướng phòng tuyến Tô Lịch; không biến T3 thành T1 fact. |
| **Hero Slot 3** | **Mai Kỳ Sơn** | **T3** | Trung bình (Dân gian T3) | **PROVISIONAL** | Dũng tướng trấn thủ Vạn An; không biến T3 thành T1 fact. |
| *Hero Fallback 1* | *Mai Thị Cầu* | *T3* | Trung bình (Dân gian T3) | *FALLBACK* | Dự phòng nếu cần phương án nữ tướng Sa Nam. |
| *Hero Fallback 2* | *Đinh Thế Mỹ* | *T3* | Trung bình (Dân gian T3) | *FALLBACK* | Dự phòng nếu cần phương án tướng thủy binh sông Lam. |
| **Normal Enemy 1** | **Đường Binh Tiền Phong** | **T1/T4** | Khảo cứu quân sự T4 | **LOCK CANDIDATE** | Generic infantry, đao/khiên (visual only). |
| **Normal Enemy 2** | **Đường Cung Nỏ Thủ** | **T1/T4** | Khảo cứu quân sự T4 | **LOCK CANDIDATE** | Generic ranged, nỏ/cung (visual only, không bắn Hero). |
| **Normal Enemy 3** | **Đường Khinh Kỵ** | **T1/T4** | Khảo cứu quân sự T4 | **LOCK CANDIDATE** | Generic cavalry ven biển, tốc độ nhanh. |
| **Elite Unit** | **Phiêu Kỵ Đô Úy** | **T1/T4** | Khảo cứu quân sự T4 | **LOCK CANDIDATE** | Sĩ quan thiết giáp Minh Quang Khải. |
| **Boss 1** | **Dương Tư Húc (楊思勖)** | **T1** | Tuyệt đối (T1 Fact) | **LOCK CANDIDATE** | Main Boss chương; Phiêu kỵ tướng quân tàn bạo. |
| **Boss 2 (Optional)**| **Quang Sở Khách (光楚客)** | **T1** | Tuyệt đối (T1 Fact) | **LOCK CANDIDATE** | Secondary Boss / Mid-boss; chuẩn hóa tên canonical. |
| **Map Direction** | **Phòng Tuyến Vạn An — Sông Lam** | **T1 + T2 + T4** | Rất cao (Địa danh học) | **LOCK CANDIDATE** | Thung lũng Sa Nam, tựa núi Hùng Sơn nhìn sông Lam. |
