# Đề Xuất Tuyển Chọn Roster: Chapter ARC-DT-01 "Quật Khởi Hoan Châu"

> [!IMPORTANT]
> **Ràng Buộc Tuyển Chọn Roster (Task `VS-MTL-01`)**:
> - Tài liệu này đề xuất danh sách **Playable Heroes** và **Enemy Opposition** cho Chapter `ARC-DT-01` ("Quật Khởi Hoan Châu — Mai Hắc Đế", ~713/722 SCN).
> - **Phân định rạch ròi giữa VS-EA-00 Baseline và T3 Validation mới**:
>   - Baseline `VS-EA-00` đã thẩm định: Mai Thúc Loan, Dương Tư Húc, Quang Sở Khách, liên quân Lâm Ấp/Chân Lạp.
>   - Các nhân vật mở rộng (Phạm Thị Uyển, Mai Kỳ Sơn, Mai Thị Cầu) là **khảo cứu truyền thống địa phương T3 độc lập mới**, hoàn toàn không có trong baseline VS-EA-00 và không được nâng lên làm T1 fact.
> - **TUYỆT ĐỐI KHÔNG**:
>   - Không thiết kế Normal Attack, Skill, Passive, stats, Range, AttackSpeed hay class gameplay.
>   - Không tạo enemy attack mechanics (Enemy hiện chỉ di chuyển theo fixed path và có HP).
>   - Không tự invent nhân vật lịch sử hư cấu để lấp đầy slot nếu nguồn không hỗ trợ.

---

## 1. Cơ Sở Sử Liệu: Baseline VS-EA-00 & Khảo Sát T3 Mới

### 1.1. Baseline Sử Liệu Đã Xác Thực (VS-EA-00)
* **T1 — Near-source Chinese Chronicles**: *Cựu Đường Thư* (Quyển 8, 109), *Tân Đường Thư* (Quyển 207), *Tư Trị Thông Giám* (Quyển 212) xác thực cuộc khởi nghĩa bùng nổ tại Hoan Châu, liên minh với các nước phía Nam (Lâm Ấp, Chân Lạp) và bị tướng Đường là **Dương Tư Húc** cùng **Quang Sở Khách (光楚客)** đàn áp vào năm Khai Nguyên thứ 10 (722 SCN).
* **T2 — Later Vietnamese Historiography**: *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục* ghi khởi sự từ năm 713 SCN, thủ lĩnh xưng là Mai Hắc Đế, xây thành Vạn An.

### 1.2. Khảo Sát Bổ Sung Nguồn Dân Gian Địa Phương (T3 Validation Mới)
* Do chính sử T1 và T2 chỉ ghi nhận danh tính duy nhất của **Mai Thúc Loan** ở phía quân khởi nghĩa, việc tìm kiếm ứng viên cho Slot 2 và Slot 3 buộc phải dựa vào hệ thống thần tích đền miếu dân gian (T3).
* Các truyền thống T3 được khảo cứu độc lập:
  - Truyền tích đền Dục Anh (làng Hòa Mục, Cầu Giấy, Hà Nội) về Hoàng hậu Phạm Thị Uyển.
  - Thần tích đình/miếu Nhu Kiều — Nhu Điều (An Dương / Quốc Tuấn, Hải Phòng) về hai người con là Mai Kỳ Sơn và Mai Thị Cầu.
  - Các nhân vật không rõ nguồn gốc kiểm chứng (như Đinh Thế Mỹ) bị loại bỏ khỏi danh sách đề xuất.

---

## 2. Đề Xuất Playable Hero Roster

```mermaid
graph TD
    subgraph ĐỀ XUẤT PLAYABLE HERO ROSTER (ARC-DT-01)
        H1["<b>Hero 1 (Bắt buộc - Baseline)</b><br>Mai Thúc Loan (Mai Hắc Đế)<br><i>Nguồn: T1 + T2 + T3</i><br><b>STATUS: LOCK CANDIDATE</b>"]
        H2["<b>Hero 2 (Đề xuất chính - T3 Mới)</b><br>Phạm Thị Uyển (Hoàng Hậu / Nữ Tướng)<br><i>Nguồn: T3 (Đền Dục Anh, Hà Nội)</i><br><b>STATUS: PROVISIONAL</b>"]
        H3["<b>Hero 3 (Đề xuất chính - T3 Mới)</b><br>Mai Kỳ Sơn (Tướng Quân Nhu Kiều)<br><i>Nguồn: T3 (Thần tích Hải Phòng)</i><br><b>STATUS: PROVISIONAL</b>"]

        F1["<b>Fallback 1 (Dự phòng Nữ tướng)</b><br>Mai Thị Cầu (Nữ Tướng Nhu Kiều)<br><i>Nguồn: T3 (Thần tích Hải Phòng)</i><br><b>STATUS: FALLBACK</b>"]
        F2["<b>Fallback 2 (Vị trí mở)</b><br>[OPEN FALLBACK]<br><i>Chờ nghiên cứu thêm</i><br><b>STATUS: OPEN</b>"]
    end

    H2 -.->|Nếu nguồn T3 chưa đủ thỏa mãn| F1
```

---

### 2.1. Hero Slot 1 (Bắt Buộc): Mai Thúc Loan (Mai Hắc Đế)

* **Identity**: Thủ lĩnh tối cao của cuộc khởi nghĩa Hoan Châu, xưng Hoàng đế (Mai Hắc Đế), người sáng lập thành lũy Vạn An.
* **Historical Role**: Lãnh tụ phong trào nông dân chống ách cống nạp vải quả, liên minh 32 châu và các tiểu quốc phương Nam (Lâm Ấp, Chân Lạp), giải phóng toàn bộ An Nam đô hộ phủ trước khi đối đầu đại quân Dương Tư Húc năm 722.
* **Source Tier**: **T1** (*Cựu Đường Thư*, *Tư Trị Thông Giám*) + **T2** (*Toàn Thư*, *Cương Mục*) + **T3** (Thần tích đền Vua Mai, Nghệ An).
* **Vì sao phù hợp Playable Hero**:
  * Là linh hồn và biểu tượng tối cao của toàn bộ Chapter `ARC-DT-01`.
  * Visual silhouette mang tính biểu tượng dân tộc: vóc dáng vạm vỡ dũng mãnh, nước da ngăm đen đặc trưng, sắc áo chàm (đức Thủy), phong thái bậc đế vương quật khởi.
* **Rủi ro sử liệu & Historical Caveat**:
  * Niên đại dấy binh: `713–722 SCN (T2)` vs `722 SCN (T1)`.
  * Con số liên quân 30–40 vạn là ước lệ phóng đại trong thư tịch cổ phương Bắc nhằm cường điệu hóa chiến công của Dương Tư Húc.
* **Mức độ tin cậy**: **Well-attested T1 / T2 Fact**.
* **Đề xuất quyết định**: **LOCK CANDIDATE**.

---

### 2.2. Hero Slot 2 (Đề Xuất Chính): Phạm Thị Uyển (Hoàng Hậu / Nữ Tướng)

* **Identity**: Hoàng hậu / Thứ phi của Mai Hắc Đế, nữ tướng chỉ huy cánh quân phòng ngự cửa ngõ Tống Bình trên sông Tô Lịch.
* **Historical Role**: Theo truyền thuyết dân gian, bà phụ trách cánh quân đồn trú tại khu vực sông Tô Lịch (Hà Nội ngày nay) để bảo vệ mặt Bắc của chính quyền khởi nghĩa. Khi Dương Tư Húc bất ngờ xua quân tràn xuống, bà chỉ huy quân sĩ chiến đấu anh dũng và tuẫn tiết trên dòng sông Tô Lịch.
* **Source Tier**: **T3 (Local tradition only)** — Gắn với di tích **đền Dục Anh** (làng Hòa Mục, phường Trung Hòa, quận Cầu Giấy, Hà Nội) bên bờ sông Tô Lịch; sắc phong các triều đại sau.
* **Vì sao phù hợp Playable Hero**:
  * Bổ sung nhân vật nữ tướng kiên cường đại diện cho phòng tuyến phía Bắc (Tống Bình/sông Tô Lịch), tạo sự cân bằng và đa dạng hóa đội ngũ tướng lĩnh.
  * Visual silhouette nữ tướng thanh nhã nhưng quyết đoán, gắn liền với sông nước và trận địa phòng ngự ven sông.
* **Rủi ro sử liệu & Historical Caveat**:
  * Nhân vật **hoàn toàn không có trong baseline VS-EA-00**, không xuất hiện trong T1 (*Cựu Đường Thư*) hay T2 (*Toàn Thư*), chỉ được bảo tồn qua hệ thống thần tích đền Dục Anh (T3).
  * **Tuyệt đối không xem là T1 Historical Fact**.
* **Mức độ tin cậy**: **Moderate (T3 local tradition - Đền Dục Anh/Hòa Mục)**.
* **Đề xuất quyết định**: **PROVISIONAL** (Ứng viên tiềm năng nhất cho Slot 2).

---

### 2.3. Hero Slot 3 (Đề Xuất Chính): Mai Kỳ Sơn (Dũng Tướng Khởi Nghĩa)

* **Identity**: Con trai / Tướng lĩnh của Mai Hắc Đế, được thờ phụng tại vùng duyên hải Đông Bắc.
* **Historical Role**: Theo thần tích địa phương tại Hải Phòng, Mai Kỳ Sơn (cùng em gái Mai Thị Cầu) tham gia lãnh đạo nghĩa quân tại khu vực căn cứ ven biển phía Đông Bắc, bảo vệ các tuyến giao thông đường thủy và chống lại quân đô hộ Đường.
* **Source Tier**: **T3 (Local tradition only)** — Gắn với di tích đình/miếu làng Nhu Kiều (Nhu Điều), xã Quốc Tuấn, huyện An Dương / An Lão, thành phố Hải Phòng.
* **Vì sao phù hợp Playable Hero**:
  * Đại diện cho thế hệ tướng trẻ của phong trào khởi nghĩa, mở rộng không gian từ Hoan Châu ra vùng duyên hải Đông Bắc.
  * Visual silhouette dũng tướng trẻ tuổi, trang bị khiên gỗ và giáo mác truyền thống.
* **Rủi ro sử liệu & Historical Caveat**:
  * Nhân vật **không có trong baseline VS-EA-00**, chỉ tồn tại trong thần tích làng Nhu Kiều/Hải Phòng (T3).
  * Không tự ý gán ghép nhân vật về Vạn An/Hùng Sơn nếu nguồn không ghi nhận.
  * **Không biến thành T1 Fact**.
* **Mức độ tin cậy**: **Moderate (T3 local tradition - Nhu Kiều/Hải Phòng)**.
* **Đề xuất quyết định**: **PROVISIONAL** (Ứng viên tiềm năng nhất cho Slot 3).

---

### 2.4. Các Phương Án Dự Phòng (Fallback Candidates)

#### Fallback 1: Mai Thị Cầu (Nữ Tướng Nhu Kiều)
* **Identity**: Con gái của Mai Hắc Đế, em gái Mai Kỳ Sơn, cùng được thờ phụng tại đình Nhu Kiều (Hải Phòng).
* **Source Tier**: **T3** (Thần tích đình Nhu Kiều, Hải Phòng).
* **Vai trò dự phòng**: Thay thế cho Slot 2 hoặc Slot 3 nếu cần điều chỉnh nhân sự tướng nữ / tướng trẻ.
* **Mức độ tin cậy**: **Moderate (T3 local tradition - Nhu Kiều/Hải Phòng)**.
* **Đề xuất quyết định**: **FALLBACK**.

#### Fallback 2: [OPEN FALLBACK]
* **Ghi chú**: Ứng viên Đinh Thế Mỹ trước đây bị loại bỏ hoàn toàn do không có nguồn T3 cụ thể, có thể kiểm chứng. Slot này được để trạng thái **OPEN** nhằm tuân thủ nguyên tắc không tự invent nhân vật hư cấu.
* **Đề xuất quyết định**: **OPEN**.

#### Đánh Giá Ứng Viên Bị Loại: Tướng Lĩnh Hư Cấu Lâm Ấp / Chân Lạp
* **Lý do loại**: T1 xác nhận sự tồn tại của liên quân Lâm Ấp / Chân Lạp, nhưng **hoàn toàn không có tên tướng lĩnh cụ thể**. Việc tự đặt tên và tạo một Hero ngoại bang hư cấu sẽ vi phạm nguyên tắc trung thực sử liệu. Lực lượng Lâm Ấp/Chân Lạp sẽ được thể hiện qua **Narrative Lore** và bối cảnh cốt truyện thay vì Playable Hero cá nhân.
* **Đề xuất quyết định**: **REJECT AS NAMED PLAYABLE HERO**.

---

## 3. Đề Xuất Enemy / Opposition Roster

> [!WARNING]
> **Quy Tắc Thiết Kế Enemy**:
> - Enemy weapon chỉ là **visual identity** (nhận diện hình ảnh), không có cơ chế tấn công Hero.
> - Toàn bộ Enemy là các đơn vị di chuyển trên **fixed path** có thanh HP.
> - Toàn bộ các đơn vị lính thông thường và tinh nhuệ là **Game / T4 Reconstruction**, không khẳng định là biên chế chính xác 100% của năm 722.

```mermaid
graph TD
    subgraph ENEMY OPPOSITION (QUÂN ĐÔ HỘ NHÀ ĐƯỜNG 722 SCN)
        E1["<b>Normal Enemy 1</b><br>Đường Binh Tiền Phong<br><i>Game / T4 Reconstruction</i>"]
        E2["<b>Normal Enemy 2</b><br>Đường Cung Nỏ Binh<br><i>Game / T4 Reconstruction</i>"]
        E3["<b>Normal Enemy 3</b><br>Đường Kỵ Binh<br><i>Game / T4 Reconstruction</i>"]

        EL["<b>Elite Unit</b><br>Đường Quân Thiết Giáp<br><i>Game / T4 Reconstruction</i>"]

        B1["<b>Boss 1 (Chính)</b><br>Dương Tư Húc (Phiêu Kỵ Đại Tướng Quân)<br><i>Historical Person (T1)</i>"]
        B2["<b>Boss 2 (Phụ / Giai đoạn)</b><br>Quang Sở Khách (An Nam Đại Đô Hộ)<br><i>Historical Person (T1)</i>"]
    end
```

---

### 3.1. Phân Định Rạch Ròi Bản Chất Nhân Vật Đối Lập

| Tên Đơn Vị | Phân Loại Bản Chất | Tầng Nguồn | Nhận Diện Hình Ảnh (Visual Only) |
|---|:---:|:---:|---|
| **Đường Binh Tiền Phong** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính bộ binh Đường triều, giáp nhẹ, trang bị đao và khiên liễu diệp. |
| **Đường Cung Nỏ Binh** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính xạ thủ trang bị nỏ tay hoặc cung ngắn thời Đường (visual only, không bắn Hero). |
| **Đường Kỵ Binh** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính kỵ binh nhẹ cưỡi ngựa tuần tra, trang bị giáo ngắn. |
| **Đường Quân Thiết Giáp** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính tinh nhuệ mặc giáp trụ kim loại nặng (phỏng dựng Minh Quang Khải), cầm trường kích. |
| **Dương Tư Húc (楊思勖)** | **Historical Person** | **T1** | Đại tướng quân hoạn quan nhà Đường, khét tiếng tàn bạo, chỉ huy tối cao chiến dịch 722. |
| **Quang Sở Khách (光楚客)** | **Historical Person** | **T1** | An Nam Đại đô hộ / tướng triều đình, cùng Dương Tư Húc phụng chiếu nam chinh đàn áp Hoan Châu. |

> [!NOTE]
> **Về Phục Dựng Trang Bị Quân Đội Nhà Đường**:
> Các mô tả trang bị (giáp Minh Quang, nỏ tay, khiên liễu diệp) là **Artistic / Archaeological Reconstruction (T4)** dựa trên tư liệu hiện vật thời Đường Huyền Tông (thế kỷ VIII). Không khẳng định đây là mô hình chính xác của từng cánh quân cụ thể năm 722.

---

### 3.2. Đánh Giá Hai Ứng Viên Boss Chính

#### Boss 1: Dương Tư Húc (Yang Sixu, 659–740 SCN)
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Cựu Đường Thư* (Quyển 8, 109), *Tư Trị Thông Giám* (Quyển 212). Là viên tướng hoạn quan thiện chiến bậc nhất của Đường Huyền Tông, từng đàn áp nhiều cuộc khởi nghĩa ở Lĩnh Nam và An Nam; nổi tiếng với biện pháp chém giết tàn bạo để thị uy.
* **Chức vị lịch sử**: Phiêu kỵ đại tướng quân (chức võ quan cao cấp thời Đường).
* **Visual Identity**: Tướng soái uy nghiêm tàn bạo, giáp trụ đại tướng quân màu sẫm viền kim sắc, đao dài trảm mã, thần thái sát phạt dữ dội.
* **Mức độ tin cậy**: **Well-attested T1**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (Main Chapter Boss)**.

#### Boss 2: Quang Sở Khách (Guang Chuke — 光楚客)
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Cựu Đường Thư* (Huyền Tông bản kỷ), *Tân Đường Thư*.
* **Chuẩn hóa danh xưng & chức vụ**:
  - Tên canonical: **Quang Sở Khách (光楚客)** theo nguyên văn chữ Hán T1. Tuyệt đối không dùng dị bản chép sai "Nguyên Sở Khách".
  - Chức vụ ghi nhận trong sử sách: **An Nam Đại đô hộ** (安南大都護) / Lĩnh Nam Đô hộ. Không dùng danh xưng "Quang Lộc Khanh" do thiếu căn cứ xác thực trực tiếp.
* **Visual Identity**: Quan chức đô hộ phương Bắc kiêm võ tướng đốc quân, trang phục áo bào kết hợp giáp trụ quan lại thời Khai Nguyên.
* **Mức độ tin cậy**: **Well-attested T1**.
* **Đề xuất quyết định**: **LOCK CANDIDATE / SECOND BOSS** (Có thể bố trí làm Boss giai đoạn giữa / Mid-boss trước khi Dương Tư Húc xuất hiện).

---

## 4. Ràng Buộc Sử Liệu Cốt Lõi (Historical Guardrails)

1. **Niên đại lịch sử**: Toàn bộ tài liệu tôn trọng sự khác biệt giữa `713–722 SCN (T2)` và `722 SCN (T1)`. Không khóa cứng một niên đại độc nhất.
2. **Quy mô quân số**: Ước tính 30–40 vạn quân trong sử thư cổ là con số ước lệ truyền thống (rhetorical exaggeration); trong game chỉ tái hiện áp lực của các nhóm quân địch trên fixed path.
3. **Ý nghĩa chiến thắng trong màn chơi (Local Gameplay Victory)**:
   - Chiến thắng của người chơi trong Chapter `ARC-DT-01` là **chiến thắng phòng thủ cục bộ (tactical in-stage victory)**: bảo vệ thành công phòng tuyến Vạn An và đẩy lui các đợt xung kích ban đầu của quân xâm lược Đường.
   - Không viết kịch bản thay đổi kết cục lịch sử tổng thể năm 722 (sự hy sinh anh dũng của Mai Hắc Đế và thành Vạn An thất thủ trước sức ép đại quân của Dương Tư Húc).

---

## 5. Bảng Quyết Định Tuyển Chọn Roster (Output Decision Table)

| Vị Trí / Hạng Mục | Tên Đề Xuất | Tầng Nguồn | Mức Độ Tin Cậy Sử Liệu | Quyết Định / Trạng Thái | Ghi Chú Ràng Buộc |
|---|---|:---:|:---:|:---:|---|
| **Hero Slot 1** | **Mai Thúc Loan (Mai Hắc Đế)** | **T1 + T2 + T3** | Well-attested T1 / T2 Fact | **LOCK CANDIDATE** | Nhân vật bắt buộc; thủ lĩnh tối cao. |
| **Hero Slot 2** | **Phạm Thị Uyển** | **T3** | Moderate (T3 Local Tradition) | **PROVISIONAL** | Nữ tướng đền Dục Anh / Hòa Mục; không biến T3 thành T1 fact. |
| **Hero Slot 3** | **Mai Kỳ Sơn** | **T3** | Moderate (T3 Local Tradition) | **PROVISIONAL** | Tướng quân Nhu Kiều (Hải Phòng); không biến T3 thành T1 fact. |
| *Hero Fallback 1* | *Mai Thị Cầu* | *T3* | Moderate (T3 Local Tradition) | *FALLBACK* | Nữ tướng Nhu Kiều (Hải Phòng); dự phòng cho Slot 2/3. |
| *Hero Fallback 2* | *[OPEN FALLBACK]* | *OPEN* | N/A | *OPEN* | Đã loại Đinh Thế Mỹ; để ngỏ chờ nghiên cứu thêm. |
| **Normal Enemy 1** | **Đường Binh Tiền Phong** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic infantry, đao/khiên (visual only). |
| **Normal Enemy 2** | **Đường Cung Nỏ Binh** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic ranged, nỏ/cung (visual only, không bắn Hero). |
| **Normal Enemy 3** | **Đường Kỵ Binh** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic light cavalry trinh sát ven biển. |
| **Elite Unit** | **Đường Quân Thiết Giáp** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Lính tinh nhuệ giáp Minh Quang (Game reconstruction). |
| **Boss 1** | **Dương Tư Húc (楊思勖)** | **T1** | Well-attested T1 | **LOCK CANDIDATE** | Main Boss chương; Phiêu kỵ đại tướng quân tàn bạo. |
| **Boss 2 (Optional)**| **Quang Sở Khách (光楚客)** | **T1** | Well-attested T1 | **LOCK CANDIDATE** | Secondary Boss; chức An Nam Đại đô hộ; tên chuẩn T1. |
| **Map Direction** | **Phòng Tuyến Vạn An — Sông Lam** | **T1/T2/T4** | High (T1/T2 Toponym + T4 Geo) | **LOCK CANDIDATE** | Thung lũng Sa Nam, tựa núi Hùng Sơn nhìn sông Lam. |
