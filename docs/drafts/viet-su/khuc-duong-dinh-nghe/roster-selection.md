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
  - ***Tân Ngũ Đại Sử* (Âu Dương Tu, Quyển 65 — Nam Hán thế gia)**: Ghi chép chính xác việc vua Nam Hán Lưu Cung sai **Lý Khắc Chính**, Lý Tiến đánh chiếm Giao Châu; **Lý Khắc Chính** bắt Tiết độ sứ Khúc Thừa Mỹ (930). Sau đó tướng Ái Châu là Dương Đình Nghệ dấy quân vây Đại La; Lý Tiến thua chạy trốn về Quảng Châu. Lưu Cung sai Thừa chỉ **Trình Bảo (程寶)** đem quân sang cứu viện thì bị Dương Đình Nghệ đón đánh chém đầu tại trận (931). Năm 937 Kiều Công Tiễn giết Dương Đình Nghệ đoạt quyền.
  - ***Tư Trị Thông Giám* (Tư Mã Quang, Quyển 277)**: Xác nhận diễn biến chiến dịch 930–931 và 937 tương đồng với *Tân Ngũ Đại Sử*; đồng thời ghi chép Dương Đình Nghệ nuôi 3.000 giả tử (con nuôi — T1 + T2).
* **T2 — Later Vietnamese Historiography**:
  - ***Đại Việt Sử Ký Toàn Thư* (Ngoại kỷ Quyển 5) & *Khâm Định Việt Sử Thông Giám Cương Mục***: Ghi chép nguồn gốc họ Khúc đất Hồng Châu (Khúc Thừa Dụ 905, Khúc Hạo 907, Khúc Thừa Mỹ 917); cơ cấu nha tướng dưới trướng Dương Đình Nghệ (Ngô Quyền, Đinh Công Trứ, Kiều Công Tiễn...); narrative 937/938 của Ngô Quyền.
* **T3 — Local Tradition / Folklore**: Thần tích các làng xã vùng Ái Châu (Thanh Hóa), đền thờ Dương Đình Nghệ (làng Giàng, Thiệu Dương), đền thờ Ngô Quyền và Đinh Công Trứ.
* **T4 — Modern Scholarship**: Công trình của GS. Trần Quốc Vượng, Phan Huy Lê về thời kỳ quá độ xác lập nền tự chủ đầu thế kỷ X.

> [!CAUTION]
> **Tên chuẩn tắc T1 cho tướng cứu viện Nam Hán là Trình Bảo (程寶)**, theo *Tân Ngũ Đại Sử* và *Tư Trị Thông Giám*. Nếu gặp dạng "Trần Bảo (陳寶)" trong các tài liệu khác, đó là **biến thể văn bản muộn hơn** cần kèm exact source chứng minh mới được sử dụng.

---

## 2. Đánh Giá & Tuyển Chọn Playable Hero Roster

```mermaid
graph TD
    subgraph TIẾN TRÌNH HERO (NARRATIVE PRELUDE & 931 BATTLE)
        NP["<b>Narrative Prelude (905 - 930)</b><br>Khúc Thừa Dụ & Khúc Hạo & Khúc Thừa Mỹ<br><i>Vai trò: NPC / Lãnh đạo chính trị / Bối cảnh lịch sử</i><br><b>STATUS: NARRATIVE NPC (REJECT AS BATTLE HERO)</b>"]

        subgraph MAIN PLAYABLE HERO ROSTER (931 BATTLE)
            H1["<b>Hero 1 (Bắt buộc)</b><br>Dương Đình Nghệ<br><i>Nguồn: T1 + T2</i><br><b>STATUS: LOCK CANDIDATE</b>"]
            H2["<b>Hero 2 (Nha tướng thân cận)</b><br>Ngô Quyền (Giai đoạn 931)<br><i>Nguồn: T1 + T2 (association T1; direct 931 = not established)</i><br><b>STATUS: PROVISIONAL</b>"]
            H3["<b>Hero 3 (Nha tướng Ái Châu)</b><br>Đinh Công Trứ<br><i>Nguồn: T2</i><br><b>STATUS: PROVISIONAL</b>"]

            F1["<b>Fallback 1</b><br>Dương Tam Kha<br><i>Nguồn: T2 (Later-affiliated; no exact 931 citation)</i><br><b>STATUS: FALLBACK / LATER-AFFILIATED FIGURE</b>"]
            F2["<b>Fallback 2</b><br>Kiều Công Hãn<br><i>Nguồn: T2 + T3 (Later-affiliated; no exact 931 citation)</i><br><b>STATUS: FALLBACK / LATER-AFFILIATED FIGURE</b>"]
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
  - *Sử liệu*: T1 (*Tân Ngũ Đại Sử*) + T2 (*Toàn Thư*). Năm 930 bị quân Nam Hán đánh và **Lý Khắc Chính** bắt giải về Phiên Ngung (Quảng Châu).
  - *Đánh giá*: Là nhân vật xúc tác trực tiếp khơi dậy phong trào phục quốc của Dương Đình Nghệ, nhưng trong năm 931 đang bị giam cầm tại phương Bắc.
  - *Quyết định*: **REJECT AS BATTLE HERO (PRESERVED AS NARRATIVE PROLOGUE CATALYST)**.

---

### 2.2. Đánh Giá Chi Tiết Các Playable Hero Candidates

#### Hero Slot 1 (Bắt Buộc): Dương Đình Nghệ — `LOCK CANDIDATE`
* **Identity**: Hào trưởng Ái Châu (Thanh Hóa), Tiết độ sứ Tĩnh Hải quân (931–937), thủ lĩnh tối cao chiến dịch 931.
* **Historical Role**: Từ căn cứ Ái Châu, dấy binh chỉ huy quân dân tiến ra Bắc bao vây đánh chiếm thành Đại La, đánh đuổi Thứ sử Lý Tiến, đón đánh diệt tướng cứu viện Trình Bảo, quét sạch đạo quân xâm lược Nam Hán năm 931.
* **Source Tier**: **T1** (*Tân Ngũ Đại Sử* Q65, *Tư Trị Thông Giám* Q277) + **T2** (*Toàn Thư*, *Cương Mục*) + **T3** (Đền thờ làng Giàng, Thanh Hóa).
* **Lưu ý sử liệu về "3.000 con nuôi / giả tử"**:
  - Chi tiết Dương Đình Nghệ nuôi 3.000 giả tử được *Tư Trị Thông Giám* (T1) ghi chép; cũng có trong *Toàn Thư* (T2). Do đó đây là sự kiện có **T1 + T2 support**.
* **Mức độ tin cậy**: **Well-attested T1 / T2 Fact**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (Hero Slot 1)**.

---

#### Hero Slot 2: Ngô Quyền — `PROVISIONAL`
* **Identity**: Nha tướng tài ba kiêm con rể của Dương Đình Nghệ, hào trưởng đất Đường Lâm.
* **Historical Role & Bất định sử liệu**:
  - **Association with Dương Đình Nghệ (well-attested)**: T1 (*Tân Ngũ Đại Sử*) ghi rõ Ngô Quyền là former general / nha tướng của Dương Đình Nghệ trong narrative 937/938.
  - **Direct battlefield participation in 931 (not directly established)**: T1 passage hiện có không trực tiếp chứng minh Ngô Quyền tham chiến hoặc giữ vai trò tiên phong trong chiến dịch Đại La 931. T2 (*Toàn Thư*) ghi ông được Dương Đình Nghệ giao cai quản Ái Châu — song đây là ghi chép T2, và không làm rõ ông đã tham gia trận 931 hay chưa.
  - **Tuyệt đối không kéo chiến công 938 về 931**: Không đưa hình tượng cọc ngầm Bạch Đằng hay long bào Ngô Vương vào Chapter này.
* **Source Tier**: **T1** (association T2/T3 context; direct 931 = not established) + **T2** (*Toàn Thư*, *Cương Mục*).
* **Mức độ tin cậy**: **Well-attested association; 931 specific role = uncertain**.
* **Đề xuất quyết định**: **PROVISIONAL (Hero Slot 2)**.

---

#### Hero Slot 3: Đinh Công Trứ — `PROVISIONAL`
* **Identity**: Hào trưởng đất Hoa Lư (Ninh Bình), nha tướng thân cận của Dương Đình Nghệ, thân phụ của Vạn Thắng Vương Đinh Bộ Lĩnh sau này.
* **Historical Role & Bất định sử liệu**:
  - **T2 (*Toàn Thư*, *Cương Mục*) xác nhận**: Dương Đình Nghệ giao ông quản Hoan Châu (Nghệ An) sau chiến thắng 931 — đây là sự kiện T2 xác thực.
  - **Direct battlefield participation in 931**: T2 ghi nhận chức vụ hậu chiến, nhưng không có exact citation T1 hay T2 mô tả chi tiết ông tham chiến trực tiếp tại Đại La năm 931.
* **Source Tier**: **T2** (*Toàn Thư*, *Cương Mục*) + **T3** (Thần phả Hoa Lư, Ninh Bình).
* **Rủi ro sử liệu**: Sử liệu T2 ghi nhận chức vụ và vai trò tướng lĩnh thân tín nhưng không mô tả chi tiết hành trạng chiến đấu trực tiếp trong trận 931.
* **Mức độ tin cậy**: **T2 Historical Attestation (post-931 role); direct 931 = uncertain**.
* **Đề xuất quyết định**: **PROVISIONAL (Hero Slot 3)**.

---

### 2.3. Các Phương Án Hero Dự Phòng (Fallback Candidates)

#### Fallback 1: Dương Tam Kha — `FALLBACK / LATER-AFFILIATED FIGURE`
* **Identity**: Con trai thứ của Dương Đình Nghệ, em vợ Ngô Quyền.
* **Source Tier**: **T2** (*Toàn Thư*, *Cương Mục*).
* **Lý do giữ FALLBACK**: Không có exact source chứng minh Dương Tam Kha tham chiến trực tiếp tại Đại La năm 931. Việc ông là con trai Dương Đình Nghệ và sau này nằm trong mạng lưới quyền lực Dương–Ngô không đủ làm bằng chứng trực tiếp cho sự hiện diện trong trận 931.
* **Đề xuất quyết định**: **FALLBACK / LATER-AFFILIATED FIGURE**.

#### Fallback 2: Kiều Công Hãn — `FALLBACK / LATER-AFFILIATED FIGURE`
* **Identity**: Hào trưởng đất Phong Châu.
* **Source Tier**: **T2** (*Toàn Thư*) + **T3** (Thần phả Bạch Hạc / Phong Châu).
* **Lý do giữ FALLBACK**: Không có exact source chứng minh Kiều Công Hãn tham chiến 931. Hành trạng của ông được ghi nhận rõ nét hơn ở giai đoạn 937–938 và thời kỳ 12 Sứ Quân. Không suy luận từ mối quan hệ chính trị về sau.
* **Đề xuất quyết định**: **FALLBACK / LATER-AFFILIATED FIGURE**.

#### Đánh Giá Ứng Viên Bị Loại: Đỗ Cảnh Thạc — `REJECT FOR 931 ROSTER`
* **Lý do loại**: Chủ yếu xuất hiện trong thần tích và lịch sử giai đoạn Ngô Quyền 938 và Loạn 12 Sứ Quân; tư liệu xác thực về sự hiện diện trong trận 931 mờ nhạt.
* **Đề xuất quyết định**: **REJECT FOR 931 ROSTER (RESERVE FOR 12 SU QUAN)**.

---

## 3. Đề Xuất Enemy / Opposition Roster (Quân Nam Hán 931 SCN)

> [!WARNING]
> **Quy Tắc Thiết Kế Enemy Nam Hán**:
> - Enemy weapon chỉ là **visual identity**, không có cơ chế tấn công Hero.
> - Toàn bộ Enemy di chuyển trên **fixed path** có thanh HP.
> - Các đơn vị lính thông thường và tinh nhuệ là **Game / T4 Reconstruction**, tuyệt đối không tự gán nhãn T1/T2.

```mermaid
graph TD
    subgraph QUÂN XÂM LƯỢC NAM HÁN (931 SCN)
        E1["<b>Normal Enemy 1</b><br>Nam Hán Bộ Binh Tiền Phong<br><i>Game / T4 Reconstruction</i>"]
        E2["<b>Normal Enemy 2</b><br>Nam Hán Cung Nỏ Binh<br><i>Game / T4 Reconstruction</i>"]
        E3["<b>Normal Enemy 3</b><br>Nam Hán Xung Kích Khinh Binh<br><i>Game / T4 Reconstruction</i>"]

        EL["<b>Elite Unit</b><br>Nam Hán Cấm Quân Thiết Giáp<br><i>Game / T4 Reconstruction</i>"]

        B1["<b>Boss 1 (Thủ Thành Tướng)</b><br>Lý Tiến (Thứ Sử Giao Châu)<br><i>Historical Person (T1)</i>"]
        B2["<b>Boss 2 (Main Chapter Boss)</b><br>Trình Bảo 程寶 (Thống Lĩnh Viện Binh)<br><i>Historical Person (T1)</i>"]
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
| **Lý Tiến (李進)** | **Historical Person** | **T1** | Thứ sử Giao Châu do vua Nam Hán bổ nhiệm cố thủ thành Đại La; sau bị đánh bại phải bỏ thành chạy trốn về Quảng Châu. (Lý Tiến không phải người bắt Khúc Thừa Mỹ — đó là Lý Khắc Chính.) |
| **Trình Bảo (程寶)** | **Historical Person** | **T1** | Thừa chỉ / Thống lĩnh viện binh Nam Hán; thống lĩnh đạo quân sang giải cứu Đại La, bị Dương Đình Nghệ đón đánh chém đầu tại trận. |

---

### 3.2. Đánh Giá Hai Boss Lịch Sử Xác Thực (T1 Fact)

#### Boss 1: Lý Tiến (Li Jin / 李進 — Thứ Sử Giao Châu Của Nam Hán) — `LOCK BOSS CANDIDATE`
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Tân Ngũ Đại Sử* (Quyển 65), *Tư Trị Thông Giám* (Quyển 277), *Toàn Thư*.
* **Hành trạng**: Sau chiến dịch 930, Lưu Cung phong Lý Tiến làm Thứ sử Giao Châu đóng giữ thành Đại La. Năm 931, khi Dương Đình Nghệ đem quân vây thành, Lý Tiến chống cự không nổi, phá vây bỏ thành chạy tháo thân về Quảng Châu. T1 không ghi Lý Tiến là người bắt Khúc Thừa Mỹ — việc đó do **Lý Khắc Chính** thực hiện.
* **Vai trò gameplay**: **Boss Giai Đoạn 1 / Thủ Thành Tướng (Mid-boss)**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (First Boss)**.

#### Boss 2: Trình Bảo (程寶 — Thống Lĩnh Viện Binh Nam Hán) — `LOCK BOSS CANDIDATE`
* **Phân loại**: **HISTORICAL PERSON (Nhân vật lịch sử xác thực T1)**.
* **Sử liệu ghi nhận**: *Tân Ngũ Đại Sử* (Quyển 65), *Tư Trị Thông Giám* (Quyển 277), *Toàn Thư*.

> [!CAUTION]
> **Canonical T1 name**: **Trình Bảo (程寶)**. Đây là tên được *Tân Ngũ Đại Sử* và *Tư Trị Thông Giám* ghi chép. Dạng "Trần Bảo (陳寶)" nếu xuất hiện cần được xác định rõ là **biến thể văn bản muộn hơn (later Vietnamese textual variant)** và phải kèm exact source chứng minh; không được dùng mặc định thay thế tên T1 chuẩn tắc.

* **Hành trạng**: Là viên tướng giữ chức Thừa chỉ của Nam Hán, được Lưu Cung sai thống lĩnh đạo viện binh sang giải cứu Đại La. Khi quân Trình Bảo kéo đến thì Đại La đã thất thủ; Dương Đình Nghệ chủ động đem quân đón đánh tan tác viện binh và chém chết Trình Bảo tại trận.
* **Vai trò gameplay**: **Main Chapter Boss (Boss Cuối Chương 931)**.
* **Đề xuất quyết định**: **LOCK CANDIDATE (Main Boss)**.

---

## 4. Ràng Buộc Sử Liệu Cốt Lõi (Source Guardrails)

1. **Khúc gia (905–930)**: Được thể hiện qua phần dẫn truyện (Narrative Prelude), không tạo combat hero tham gia trận 931.
2. **Chiến dịch 931**: Bám sát ghi chép T1/T2: khởi binh từ Ái Châu → bao vây đánh tan thủ quân Lý Tiến → đón đánh chém tướng viện binh **Trình Bảo (程寶)**. Không tự ý bịa đặt chiến thuật chi tiết vượt ra ngoài khung sử liệu.
3. **Hình tượng Ngô Quyền**: T1 xác nhận là nha tướng / former general của Dương Đình Nghệ trong narrative 937/938. Tuy nhiên T1 không trực tiếp xác nhận Ngô Quyền tham chiến hay là tiên phong tại Đại La năm 931. Giữ nguyên **PROVISIONAL**; không kéo chiến tích Bạch Đằng 938 về chương này.
4. **Đinh Công Trứ**: T2 xác nhận ông là nha tướng nhận quản Hoan Châu sau 931, nhưng không có exact T1/T2 citation về sự tham chiến trực tiếp năm 931. Giữ **PROVISIONAL**.
5. **Dương Tam Kha & Kiều Công Hãn**: Không tự suy luận tham chiến 931 chỉ vì mối quan hệ chính trị/quân sự về sau. Giữ **FALLBACK / LATER-AFFILIATED FIGURE**.
6. **Biến cố 937 (Kiều Công Tiễn phản nghịch)**: Đóng vai trò **Epilogue / Narrative Bridge** ở đoạn kết chương nhằm mở ra bối cảnh xung đột dẫn thẳng tới chiến dịch Bạch Đằng 938.

---

## 5. Bảng Quyết Định Tuyển Chọn Roster (Output Decision Table)

| Vị Trí / Hạng Mục | Tên Đề Xuất | Tầng Nguồn | Mức Độ Tin Cậy Sử Liệu | Quyết Định / Trạng Thái | Ghi Chú Ràng Buộc Sử Liệu |
|---|---|:---:|:---:|:---:|---|
| **Hero Slot 1** | **Dương Đình Nghệ** | **T1 + T2** | Well-attested T1 / T2 Fact | **LOCK CANDIDATE** | Bắt buộc; thủ lĩnh tối cao chiến dịch 931. |
| **Hero Slot 2** | **Ngô Quyền** | **T1 + T2** | Association well-attested; direct 931 uncertain | **PROVISIONAL** | Nha tướng Ái Châu (T1 narrative 937/938); tham chiến 931 chưa được T1 trực tiếp xác nhận; không kéo chiến tích 938 về. |
| **Hero Slot 3** | **Đinh Công Trứ** | **T2** | T2 attestation (post-931 role); direct 931 uncertain | **PROVISIONAL** | Nha tướng Hoa Lư; T2 ghi nhận quản Hoan Châu sau 931; direct 931 = không có exact citation. |
| *Hero Fallback 1* | *Dương Tam Kha* | *T2* | Later-affiliated; no exact 931 citation | *FALLBACK / LATER-AFFILIATED FIGURE* | Con trai Dương Đình Nghệ; không có nguồn trực tiếp cho 931. |
| *Hero Fallback 2* | *Kiều Công Hãn* | *T2 + T3* | Later-affiliated; no exact 931 citation | *FALLBACK / LATER-AFFILIATED FIGURE* | Nha tướng họ Kiều; rõ nét hơn ở 937–938 / 12 Sứ Quân. |
| *Narrative NPC* | *Khúc Thừa Dụ / Khúc Hạo* | *T1/T2* | Well-attested T1 / T2 Fact | *NARRATIVE NPC* | Lãnh tụ mở đầu tự chủ (Prelude 905–917). |
| *Narrative Prologue*| *Khúc Thừa Mỹ* | *T1/T2* | Well-attested T1 / T2 Fact | *PROLOGUE NPC* | Bị Lý Khắc Chính bắt năm 930 (xúc tác chiến dịch). |
| **Normal Enemy 1** | **Nam Hán Bộ Binh Tiền Phong** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic infantry, đao/khiên nhẹ (visual only). |
| **Normal Enemy 2** | **Nam Hán Cung Nỏ Binh** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic ranged, nỏ/cung (visual only, không bắn Hero). |
| **Normal Enemy 3** | **Nam Hán Xung Kích Khinh Binh**| **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Generic light infantry, trảm mã đao/giáo ngắn. |
| **Elite Unit** | **Nam Hán Cấm Quân Thiết Giáp** | **Game / T4** | Game / T4 Reconstruction | **LOCK CANDIDATE** | Lính tinh nhuệ giáp phiến sẫm màu, trường kích nặng. |
| **Boss 1 (Mid-boss)**| **Lý Tiến (李進)** | **T1** | Well-attested T1 | **LOCK CANDIDATE** | Thứ sử Giao Châu thủ thành Đại La, thua chạy. (Không phải người bắt Khúc Thừa Mỹ.) |
| **Boss 2 (Main Boss)**| **Trình Bảo (程寶)** | **T1** | Well-attested T1 | **LOCK CANDIDATE** | Canonical T1 name; tướng viện binh Nam Hán; tử trận năm 931. |
| **Primary Map** | **Chiến Lũy Đại La (931 SCN)** | **T1/T2 + T4** | High (T1/T2 Toponym + T4 Artistic) | **LOCK CANDIDATE** | Chiến trường vây hãm và giải phóng thành Đại La. Chi tiết công trình cụ thể (cầu gỗ, bãi cọc...) là T4 Artistic Reconstruction. |
