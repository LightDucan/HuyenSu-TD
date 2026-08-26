# Đề Xuất Tuyển Chọn Roster: Chapter Khúc Gia & Dương Đình Nghệ (905–937 SCN)

> [!IMPORTANT]
> **Ràng Buộc Tuyển Chọn Roster (Task `VS-KDN-01`)**:
> - Tài liệu này đề xuất danh sách **Playable Heroes** và **Enemy Opposition** cho Chapter lịch sử tập trung vào chiến dịch giải phóng thành Đại La năm 931 của **Dương Đình Nghệ**, với phần dẫn truyện (Prelude) về **Khúc Gia (905–930)** và cầu nối (Epilogue) là biến cố phản loạn của **Kiều Công Tiễn (937)**.
> - **Tuyệt đối không lấn sang trận Bạch Đằng 938** (thuộc Chapter Ngô Quyền độc lập sau này).
> - **TUYỆT ĐỐI KHÔNG**:
>   - Không thiết kế Normal Attack, Skill, Passive, stats, Range, AttackSpeed hay gameplay class.
>   - Không tạo cơ chế Enemy tấn công Hero (Enemy di chuyển trên fixed path và có HP).
>   - Không tự invent nhân vật lịch sử hư cấu để lấp đầy slot nếu nguồn không hỗ trợ.

---

## 1. Cơ Sở Sử Liệu & Phân Tầng Học Thuật (Baseline)

Dựa trên kết quả khảo cứu tại `docs/drafts/viet-su/602-938/sources.md` và `historical-context-and-timeline.md`:
* **T1 — Near-source Chronicles**:
  - ***Tân Ngũ Đại Sử* (Âu Dương Tu, Quyển 65 — Nam Hán thế gia)**: Ghi chép chính xác việc vua Nam Hán Lưu Cung sai Lý Khắc Chính, Lý Tiến đánh chiếm Giao Châu, bắt Tiết độ sứ Khúc Thừa Mỹ (930); sau đó tướng Ái Châu là Dương Đình Nghệ dấy quân vây Đại La, Lý Tiến thua chạy trốn về Quảng Châu; Lưu Cung sai Thừa chỉ Trần Bảo đem quân sang cứu viện thì bị Dương Đình Nghệ đón đánh chém đầu tại trận (931); năm 937 Kiều Công Tiễn giết Dương Đình Nghệ đoạt quyền.
  - ***Tư Trị Thông Giám* (Tư Mã Quang, Quyển 277)**: Xác nhận diễn biến chiến dịch 930–931 và 937 tương đồng với *Tân Ngũ Đại Sử*.
* **T2 — Later Vietnamese Historiography**:
  - ***Đại Việt Sử Ký Toàn Thư* (Ngoại kỷ Quyển 5) & *Khâm Định Việt Sử Thông Giám Cương Mục***: Ghi chép nguồn gốc họ Khúc đất Hồng Châu (Khúc Thừa Dụ 905, Khúc Hạo 907, Khúc Thừa Mỹ 917); tổ chức "3.000 con nuôi / giả tử" và cơ cấu nha tướng dưới trướng Dương Đình Nghệ (Ngô Quyền, Đinh Công Trứ, Kiều Công Tiễn...).
* **T3 — Local Tradition / Folklore**: Thần tích các làng xã vùng Ái Châu (Thanh Hóa), đền thờ Dương Đình Nghệ (làng Giàng, Thiệu Dương), đền thờ Ngô Quyền và Đinh Công Trứ.
* **T4 — Modern Scholarship**: Công trình của GS. Trần Quốc Vượng, Phan Huy Lê về thời kỳ quá độ xác lập nền tự chủ đầu thế kỷ X.

---

## 2. Đánh Giá & Tuyển Chọn Playable Hero Roster

```mermaid
graph TD
    subgraph TIẾN TRÌNH HERO (NARRATIVE PRELUDE & 931 BATTLE)
        NP["<b>Narrative Prelude (905 - 930)</b><br>Khúc Thừa Dụ & Khúc Hạo & Khúc Thừa Mỹ<br><i>Vai trò: NPC / Lãnh đạo chính trị / Bối cảnh lịch sử</i><br><b>STATUS: NARRATIVE NPC (REJECT AS BATTLE HERO)</b>"]

        subgraph MAIN PLAYABLE HERO ROSTER (931 BATTLE)
            H1["<b>Hero 1 (Bắt buộc)</b><br>Dương Đình Nghệ<br><i>Nguồn: T1 + T2</i><br><b>STATUS: LOCK CANDIDATE</b>"]
            H2["<b>Hero 2 (Tướng chủ lực)</b><br>Ngô Quyền (Giai đoạn 931)<br><i>Nguồn: T1 + T2</i><br><b>STATUS: LOCK CANDIDATE</b>"]
            H3["<b>Hero 3 (Nha tướng Ái Châu)</b><br>Đinh Công Trứ<br><i>Nguồn: T2</i><br><b>STATUS: PROVISIONAL</b>"]

            F1["<b>Fallback 1</b><br>Dương Tam Kha<br><i>Nguồn: T2</i><br><b>STATUS: FALLBACK</b>"]
            F2["<b>Fallback 2</b><br>Kiều Công Hãn<br><i>Nguồn: T2 + T3</i><br><b>STATUS: FALLBACK</b>"]
        end

        NP -.->|Dẫn nhập bối cảnh| H1
    end
```

---

### 2.1. Đánh Giá Các Nhân Vật Dòng Họ Khúc (Narrative NPC / Prelude)

* **Khúc Thừa Dụ (Tiết độ sứ 905–907)**:
  - *Sử liệu*: T1 (*Tân Đường Thư*) + T2 (*Toàn Thư*). Hào trưởng Hồng Châu mở đầu nền tự chủ, mất năm 907.
  - *Đánh giá*: Đã qua đời trước trận đánh 931 hơn hai thập kỷ; phù hợp làm **Narrative Prologue Figure / NPC**.
  - *Quyết định*: **REJECT AS BATTLE HERO (PRESERVED AS NARRATIVE NPC)**.
* **Khúc Hạo (Tiết độ sứ 907–917)**:
  - *Sử liệu*: T2 (*Toàn Thư*, *Cương Mục*). Nhà cải cách hành chính kiệt xuất theo phương châm "khoan giản an lạc", mất năm 917.
  - *Đánh giá*: Không tham gia thực chiến 931; đóng vai trò biểu tượng xây dựng nền tảng quốc gia trong cốt truyện mở đầu.
  - *Quyết định*: **REJECT AS BATTLE HERO (PRESERVED AS NARRATIVE NPC)**.
* **Khúc Thừa Mỹ (Tiết độ sứ 917–930)**:
  - *Sử liệu*: T1 (*Tân Ngũ Đại Sử*) + T2 (*Toàn Thư*). Năm 930 bị quân Nam Hán đánh bắt giải về Phiên Ngung (Quảng Châu).
  - *Đánh giá*: Là nhân vật xúc tác trực tiếp khơi dậy phong trào phục quốc của Dương Đình Nghệ, nhưng trong năm 931 đang bị giam cầm tại phương Bắc.
  - *Quyết định*: **REJECT AS BATTLE HERO (PRESERVED AS NARRATIVE PROLOGUE CATALYST)**.

---

### 2.2. Đánh Giá Chi Tiết Các Playable Hero Candidates

#### Hero Slot 1 (Bắt Buộc): Dương Đình Nghệ
* **Identity**: Hào trưởng Ái Châu (Thanh Hóa), Tiết độ sứ Tĩnh Hải quân (931–937), thủ lĩnh tối cao chiến dịch 931.
* **Historical Role**: Tướng cũ của họ Khúc, dấy binh từ căn cứ Ái Châu, chỉ huy quân dân tiến ra Bắc bao vây đánh chiếm thành Đại La, quét sạch đạo quân xâm lược Nam Hán năm 931.
* **Source Tier**: **T1** (*Tân Ngũ Đại Sử* Q65, *Tư Trị Thông Giám* Q277) + **T2** (*Toàn Thư*, *Cương Mục*) + **T3** (Đền thờ làng Giàng, Thanh Hóa).
* **Lưu ý sử liệu về "3.000 con nuôi / giả tử"**:
  - Chi tiết Dương Đình Nghệ nuôi 3.000 con nuôi là ghi chép từ **chính sử trung đại T2 (*Toàn Thư*)**, phản ánh thiết chế quân sự liên kết hào tộc thời Ngũ Đại; **không phải T1 Fact**.
* **Vì sao phù hợp Playable Hero**:
  - Là linh hồn và chỉ huy tối cao của toàn bộ chiến dịch giải phóng Đại La năm 931.
  - Visual silhouette: Đại tướng quân oai phong, trang phục áo bào dũng tướng thế kỷ X, tay cầm đại đao / gươm lệnh, phong thái hào trưởng kiên cường.
* **Mức độ tin cậy**: **Well-attested T1 / T2 Fact**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (Hero Slot 1)**.

---

#### Hero Slot 2: Ngô Quyền (Giai Đoạn Dũng Tướng Ái Châu — 931 SCN)
* **Identity**: Nha tướng tài ba kiêm con rể của Dương Đình Nghệ, hào trưởng đất Đường Lâm.
* **Historical Role (trong bối cảnh 931)**: Là tướng tiên phong thân tín cùng Dương Đình Nghệ dấy binh từ Ái Châu ra Bắc giải phóng Đại La. Sau chiến thắng 931, ông được Dương Đình Nghệ gả con gái và giao quyền cai quản vùng đất Ái Châu trọng yếu.
* **Source Tier**: **T1** (*Tân Ngũ Đại Sử* ghi rõ Ngô Quyền là nha tướng của Dương Đình Nghệ) + **T2** (*Toàn Thư*, *Cương Mục*).
* **Ràng buộc sử liệu nghiêm ngặt**:
  - **Tuyệt đối không kéo các chiến tích năm 938 về năm 931**: Không đưa hình tượng cọc ngầm Bạch Đằng hay long bào Ngô Vương vào Chapter này.
  - Thể hiện hình tượng Ngô Quyền thời kỳ thanh xuân: một dũng tướng trẻ xuất chúng, thiện chiến, quyết đoán dưới trướng chủ tướng Dương Đình Nghệ.
* **Mức độ tin cậy**: **Well-attested T1 / T2 Fact**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (Hero Slot 2)**.

---

#### Hero Slot 3: Đinh Công Trứ
* **Identity**: Hào trưởng đất Hoa Lư (Ninh Bình), nha tướng thân cận của Dương Đình Nghệ, thân phụ của Vạn Thắng Vương Đinh Bộ Lĩnh sau này.
* **Historical Role**: Tham gia đạo quân Ái Châu tiến đánh giải phóng thành Đại La năm 931; sau chiến thắng được Dương Đình Nghệ phong chức Thứ sử Hoan Châu (Nghệ An).
* **Source Tier**: **T2** (*Toàn Thư*, *Cương Mục*) + **T3** (Thần phả Hoa Lư, Ninh Bình).
* **Vì sao phù hợp Playable Hero**:
  - Đại diện cho khối liên minh hào trưởng bản địa các vùng (Ái Châu — Trường Châu / Hoa Lư — Hoan Châu) đoàn kết quanh Dương Đình Nghệ.
  - Visual silhouette: Dũng tướng cận chiến dũng mãnh, phong trần miền sơn cước Hoa Lư, sử dụng giáo mác / khiên đồng.
* **Rủi ro sử liệu**:
  - Sử liệu T2 ghi nhận chức vụ và vai trò tướng lĩnh thân tín nhưng không mô tả chi tiết chiến thuật từng trận đánh cá nhân.
* **Mức độ tin cậy**: **High (T2 Historical Attestation)**.
* **Đề xuất quyết định**: **PROVISIONAL (Hero Slot 3)**.

---

### 2.3. Các Phương Án Hero Dự Phòng (Fallback Candidates)

#### Fallback 1: Dương Tam Kha
* **Identity**: Con trai thứ của Dương Đình Nghệ, em vợ Ngô Quyền.
* **Source Tier**: **T2** (*Toàn Thư*, *Cương Mục*).
* **Vai trò**: Dũng tướng dòng tộc họ Dương tham gia lực lượng Ái Châu năm 931.
* **Mức độ tin cậy**: **Moderate (T2 Attestation)**.
* **Đề xuất quyết định**: **FALLBACK**.

#### Fallback 2: Kiều Công Hãn
* **Identity**: Hào trưởng đất Phong Châu, cháu nội Kiều Công Tiễn; chính sử và thần phả ghi là nha tướng trung thành dưới trướng Dương Đình Nghệ (sau này theo Ngô Quyền trừng phạt phản tặc Kiều Công Tiễn).
* **Source Tier**: **T2** (*Toàn Thư*) + **T3** (Thần phả Bạch Hạc / Phong Châu).
* **Rủi ro sử liệu**: Hành trạng của Kiều Công Hãn được ghi nhận rõ nét hơn ở giai đoạn 937–938 và thời kỳ 12 Sứ Quân hơn là chi tiết năm 931.
* **Mức độ tin cậy**: **Moderate (T2 / T3 Attestation)**.
* **Đề xuất quyết định**: **FALLBACK**.

#### Đánh Giá Ứng Viên Bị Loại: Đỗ Cảnh Thạc
* **Lý do loại**: Đỗ Cảnh Thạc chủ yếu xuất hiện trong thần tích và lịch sử giai đoạn Ngô Quyền 938 và Loạn 12 Sứ Quân; tư liệu xác thực về sự hiện diện trực tiếp trong trận đánh 931 mờ nhạt.
* **Đề xuất quyết định**: **REJECT FOR 931 ROSTER (RESERVE FOR 12 SU QUAN)**.

---

## 3. Đề Xuất Enemy / Opposition Roster (Quân Nam Hán 931 SCN)

> [!WARNING]
> **Quy Tắc Thiết Kế Enemy Nam Hán**:
> - Enemy weapon chỉ là **visual identity**, không có cơ chế tấn công Hero.
> - Toàn bộ Enemy di chuyển trên **fixed path** có thanh HP.
> - Các đơn vị lính thông thường và tinh nhuệ là **Game / T4 Reconstruction**, tuyệt đối không tự gán nhãn T1/T2 chỉ vì Nam Hán có quân đội trong lịch sử.

```mermaid
graph TD
    subgraph QUÂN XÂM LƯỢC NAM HÁN (931 SCN)
        E1["<b>Normal Enemy 1</b><br>Nam Hán Bộ Binh Tiền Phong<br><i>Game / T4 Reconstruction</i>"]
        E2["<b>Normal Enemy 2</b><br>Nam Hán Cung Nỏ Binh<br><i>Game / T4 Reconstruction</i>"]
        E3["<b>Normal Enemy 3</b><br>Nam Hán Xung Kích Khinh Binh<br><i>Game / T4 Reconstruction</i>"]

        EL["<b>Elite Unit</b><br>Nam Hán Cấm Quân Thiết Giáp<br><i>Game / T4 Reconstruction</i>"]

        B1["<b>Boss 1 (Thủ Thành Tướng)</b><br>Lý Tiến (Thứ Sử Giao Châu)<br><i>Historical Person (T1)</i>"]
        B2["<b>Boss 2 (Main Chapter Boss)</b><br>Trần Bảo (Thống Lĩnh Viện Binh)<br><i>Historical Person (T1)</i>"]
    end
```

---

### 3.1. Phân Định Rạch Ròi Bản Chất Nhân Vật Đối Lập

| Tên Đơn Vị | Phân Loại Bản Chất | Tầng Nguồn | Nhận Diện Hình Ảnh (Visual Only) |
|---|:---:|:---:|---|
| **Nam Hán Bộ Binh Tiền Phong** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính bộ binh Nam Hán, giáp nhẹ, tay cầm đao và khiên gỗ bọc da. |
| **Nam Hán Cung Nỏ Binh** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính xạ thủ trang bị nỏ tay hoặc cung ngắn Nam Hán (visual only, không bắn Hero). |
| **Nam Hán Xung Kích Khinh Binh** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính xung kích cơ động, trang bị trảm mã đao hoặc giáo ngắn. |
| **Nam Hán Cấm Quân Thiết Giáp** | **Generic Military Archetype** | **Game / T4 Reconstruction** | Lính cận vệ thiết giáp của triều đình Quảng Châu, mặc giáp phiến sẫm màu, cầm trường kích nặng. |
| **Lý Tiến (李進)** | **Historical Person** | **T1** | Thứ sử Giao Châu do vua Nam Hán bổ nhiệm cố thủ thành Đại La; sau bị đánh bại phải chạy trốn về nước. |
| **Trần Bảo (陳寶)** | **Historical Person** | **T1** | Thừa chỉ / Thống lĩnh viện binh Nam Hán; kiêu ngạo đem quân sang cứu viện, bị Dương Đình Nghệ đón đánh chém đầu tại trận. |

---

### 3.2. Đánh Giá Hai Boss Lịch Sử Xác Thực (T1 Fact)

#### Boss 1: Lý Tiến (Li Jin / 李進 — Thứ Sử Giao Châu Của Nam Hán)
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Tân Ngũ Đại Sử* (Quyển 65), *Tư Trị Thông Giám* (Quyển 277), *Toàn Thư*.
* **Hành trạng**: Sau khi đánh bắt Khúc Thừa Mỹ năm 930, Lưu Cung phong Lý Tiến làm Thứ sử Giao Châu đóng giữ thành Đại La. Năm 931, khi Dương Đình Nghệ đem quân vây thành, Lý Tiến chống cự không nổi, phá vây bỏ thành chạy tháo thân về Quảng Châu (bị Lưu Cung trách phạt).
* **Vai trò gameplay**: **Boss Giai Đoạn 1 / Thủ Thành Tướng (Mid-boss)**.
* **Mức độ tin cậy**: **Well-attested T1**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (First Boss)**.

#### Boss 2: Trần Bảo (Chen Bao / 陳寶 — Thống Lĩnh Viện Binh Nam Hán)
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Tân Ngũ Đại Sử* (Quyển 65), *Tư Trị Thông Giám* (Quyển 277), *Toàn Thư*.
* **Hành trạng**: Là viên tướng giữ chức Thừa chỉ của Nam Hán, được Lưu Cung sai thống lĩnh đạo viện binh hùng hậu sang giải cứu Đại La. Khi quân Trần Bảo kéo đến chưa kịp hội quân thì Đại La đã mất; Dương Đình Nghệ chủ động đem quân đón đánh tan tác viện binh và chém chết Trần Bảo tại trận.
* **Vai trò gameplay**: **Main Chapter Boss (Boss Cuối Chương 931)**.
* **Mức độ tin cậy**: **Well-attested T1**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (Main Boss)**.

---

## 4. Ràng Buộc Sử Liệu Cốt Lõi (Source Guardrails)

1. **Khúc gia (905–930)**: Được thể hiện qua phần dẫn truyện (Narrative Prelude), không tạo combat hero tham gia trận 931.
2. **Chiến dịch 931**: Bám sát ghi chép T1/T2: khởi binh từ Ái Châu $\rightarrow$ bao vây đánh tan thủ quân Lý Tiến $\rightarrow$ đón đánh chém tướng viện binh Trần Bảo. Không tự ý bịa đặt chiến thuật chi tiết vượt ra ngoài khung sử liệu.
3. **Hình tượng Ngô Quyền**: Giữ đúng vai trò dũng tướng trẻ dưới quyền Dương Đình Nghệ trong năm 931; không đưa các yếu tố Bạch Đằng 938 vào chương này.
4. **Biến cố 937 (Kiều Công Tiễn phản nghịch)**: Đóng vai trò **Epilogue / Narrative Bridge** ở đoạn kết chương nhằm mở ra bối cảnh xung đột dẫn thẳng tới chiến dịch Bạch Đằng 938.

---

## 5. Bảng Quyết Định Tuyển Chọn Roster (Output Decision Table)

| Vị Trí / Hạng Mục | Tên Đề Xuất | Tầng Nguồn | Mức Độ Tin Cậy Sử Liệu | Quyết Định / Trạng Thái | Ghi Chú Ràng Buộc Sử Liệu |
|---|---|:---:|:---:|:---:|---|
| **Hero Slot 1** | **Dương Đình Nghệ** | **T1 + T2** | Well-attested T1 / T2 Fact | **LOCK CANDIDATE** | Bắt buộc; thủ lĩnh tối cao chiến dịch 931. |
| **Hero Slot 2** | **Ngô Quyền** | **T1 + T2** | Well-attested T1 / T2 Fact | **LOCK CANDIDATE** | Nha tướng Ái Châu 931; không kéo chiến tích 938 về. |
| **Hero Slot 3** | **Đinh Công Trứ** | **T2** | High (T2 Historical Attestation) | **PROVISIONAL** | Nha tướng Hoa Lư; sau làm Thứ sử Hoan Châu. |
| *Hero Fallback 1* | *Dương Tam Kha* | *T2* | Moderate (T2 Attestation) | *FALLBACK* | Con trai Dương Đình Nghệ. |
| *Hero Fallback 2* | *Kiều Công Hãn* | *T2 + T3* | Moderate (T2/T3 Attestation) | *FALLBACK* | Nha tướng họ Kiều; dự phòng thay thế. |
| *Narrative NPC* | *Khúc Thừa Dụ / Khúc Hạo* | *T1/T2* | Well-attested T1 / T2 Fact | *NARRATIVE NPC* | Lãnh tụ mở đầu tự chủ (Prelude 905–917). |
| *Narrative Prologue*| *Khúc Thừa Mỹ* | *T1/T2* | Well-attested T1 / T2 Fact | *PROLOGUE NPC* | Bị Nam Hán bắt 930 (xúc tác mở đầu chiến dịch). |
| **Normal Enemy 1** | **Nam Hán Bộ Binh Tiền Phong** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic infantry, đao/khiên nhẹ (visual only). |
| **Normal Enemy 2** | **Nam Hán Cung Nỏ Binh** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic ranged, nỏ/cung (visual only, không bắn Hero). |
| **Normal Enemy 3** | **Nam Hán Xung Kích Khinh Binh**| **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic light infantry, trảm mã đao/giáo ngắn. |
| **Elite Unit** | **Nam Hán Cấm Quân Thiết Giáp** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Lính tinh nhuệ giáp phiến sẫm màu, trường kích nặng. |
| **Boss 1 (Mid-boss)**| **Lý Tiến (李進)** | **T1** | Well-attested T1 | **LOCK CANDIDATE** | Thứ sử Giao Châu thủ thành Đại La, thua chạy. |
| **Boss 2 (Main Boss)**| **Trần Bảo (陳寶)** | **T1** | Well-attested T1 | **LOCK CANDIDATE** | Thống lĩnh viện binh Nam Hán; tử trận năm 931. |
| **Primary Map** | **Chiến Lũy Đại La (931 SCN)** | **T1/T2 + T4** | High (T1/T2 Toponym + T4 Geo) | **LOCK CANDIDATE** | Chiến trường vây hãm và giải phóng thành Đại La. |
