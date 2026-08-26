# Định Hướng Cốt Truyện & Phân Cảnh: Thời Kỳ Phùng Hưng (Task `VS-PH-01`)

> [!IMPORTANT]
> **Đặc Tả Định Hướng Chapter (`VS-PH-01`)**:
> - **Mục đích**: Phác thảo cấu trúc cốt truyện (Narrative Arc), lộ trình phân cảnh chiến dịch và định hướng mỹ thuật không gian chiến địa cho Historical Arc **Phùng Hưng (Cuối thế kỷ VIII)**.
> - **Ràng buộc học thuật**:
>   - Bảo toàn phân tầng nguồn: T1 (*Đường Thư* — Đỗ Anh Hàn, Cao Chính Bình, Triệu Xương) vs T2/T3 (*Toàn Thư*, Thần phả — Phùng Hưng, Phùng Hải, Phùng Dĩnh, Phùng An).
>   - Ghi nhận vị trí địa danh Đường Lâm là `[DISPUTED / T4 interpretation]`, phục dựng cảnh quan mỹ thuật mang tính chất `[Artistic Interpretation]`.
> - **Ràng buộc Tower Defense**: Tuyệt đối không thiết kế Wave cụ thể, không gán chỉ số gameplay hay thiết kế skill.

---

## 1. Cấu Trúc Tuyến Tính Cốt Truyện (Campaign Narrative Arc)

```mermaid
graph TD
    subgraph TIẾN TRÌNH CHIẾN DỊCH KHỞI NGHĨA PHÙNG HƯNG
        P1["<b>Hồi 1: Hào Khí Đường Lâm (Dấy Binh Khởi Nghĩa)</b><br>• Bối cảnh: Sưu thuế hà khắc của Cao Chính Bình khiến dân chúng lầm than.<br>• Diễn biến: Ba anh em Phùng Hưng, Phùng Hải, Phùng Dĩnh tập hợp nghĩa sĩ tại Đường Lâm.<br>• Chiến trường: Map 1 — Căn cứ rừng núi Đường Lâm."]
        
        P2["<b>Hồi 2: Bão Lửa Tống Bình (Vây Hãm Phủ Thành)</b><br>• Bối cảnh: Nghĩa quân vượt sông tiến về thủ phủ Đô hộ phủ.<br>• Diễn biến: Phá tan các đồn bốt ngoại vi, bao vây thành Tống Bình; Cao Chính Bình lo sợ phát bệnh chết.<br>• Chiến trường: Map 2 — Phủ thành Tống Bình."]
        
        P3["<b>Hồi 3: Bố Cái Đại Vương (Nền Tự Chủ & Hậu Kỳ)</b><br>• Bối cảnh: Phùng Hưng làm chủ đất nước, nhân dân suy tôn Bố Cái Đại Vương.<br>• Hậu kỳ (Epilogue): Phùng An nối nghiệp; Đô hộ Triệu Xương sang vỗ về hòa giải chính trị."]
    end

    P1 --> P2
    P2 --> P3
```

---

## 2. Định Hướng Mỹ Thuật & Không Gian Địa Lý (Art & Environment Direction)

### 2.1. Phân Cảnh 1: Căn Cứ Rừng Núi Đường Lâm (Đường Lâm Forest & Base)

* **Bối cảnh không gian**:
  * Vùng đồi gò trung du với rừng cây rậm rạp, suối ngầm và đường mòn đất đỏ đặc trưng của châu thổ Bắc Bộ cổ.
  * Căn cứ của nghĩa quân gồm các hàng rào gỗ lũy tre, lều trại dã chiến, thao trường huấn luyện nghĩa binh và lò rèn vũ khí thô sơ.
* **Cảnh báo học thuật & Địa danh học**:
  * > [!WARNING]
    > Vị trí chính xác của đất Đường Lâm thời Phùng Hưng hiện vẫn là đề tài tranh luận sôi nổi giữa các nhà khảo cổ và sử học (`[DISPUTED / T4 interpretation]` — giữa giả thuyết Đường Lâm thuộc Sơn Tây, Hà Nội với các vùng thuộc Ái Châu / Hà Tĩnh).
    > Việc thiết kế bối cảnh căn cứ trong game được xác định theo hình thức **`[Artistic Interpretation]`**, tôn vinh nét mộc mạc, kiên cường của làng xóm người Việt cổ thời Bắc thuộc.
* **Định hướng thị giác 2D**:
  * Góc nhìn trực diện (Front View) chuẩn 2D Tower Defense.
  * Đường đi của địch (Enemy Path): Đường mòn xuyên qua các hẻm đồi và bìa rừng.
  * Vị trí đặt tướng (Hero Slots): Các mỏm đồi đất, chòi canh gỗ và điểm mai phục ven đường.

---

### 2.2. Phân Cảnh 2: Phủ Thành Tống Bình (Tống Bình Fortress Siege)

* **Bối cảnh không gian**:
  * Thủ phủ hành chính và quân sự tối cao của An Nam đô hộ phủ nhà Đường (khu vực nội thành Hà Nội ngày nay).
  * Kiến trúc mang đậm dấu ấn phong cách thành quách quan phủ trung kỳ Đường: Tường thành đất đắp cao kiên cố, cổng thành bọc sắt, hào nước bao quanh, nha môn và doanh trại cấm vệ quân.
* **Không khí trận chiến**:
  * Không khí khói lửa ngút trời của một cuộc công thành lịch sử. Nghĩa quân áo chàm từ khắp các châu huyện đổ về vây kín phủ thành, uy hiếp dinh Đô hộ của Cao Chính Bình.
* **Định hướng thị giác 2D**:
  * Góc nhìn trực diện (Front View).
  * Đường đi của địch: Cổng thành chính và các tuyến hào giao thông quanh chân thành.
  * Vị trí đặt tướng: Bờ lũy bao vây của nghĩa quân, các ụ đất cao và trận địa công thành.

---

## 3. Định Hướng Nhân Vật & Đối Kháng (Character Dynamics)

```mermaid
flowchart TD
    subgraph TRỤ CỘT TƯ TƯỞNG & ĐỐI KHÁNG
        subgraph PHE NGHĨA QUÂN ĐƯỜNG LÂM
            H1["<b>Phùng Hưng</b><br>Ý chí quật khởi, uy đức tập hợp lòng dân"]
            H2["<b>Phùng Hải</b><br>Dũng khí tiên phong, sức mạnh phá đồn bốt"]
            H3["<b>Phùng Dĩnh</b><br>Trấn giữ hậu phương, mưu lược bao vây"]
        end

        subgraph PHE QUAN ĐÔ HỘ ĐƯỜNG
            B1["<b>Cao Chính Bình</b><br>Đại diện ách đô hộ bóc lột, hoảng loạn cố thủ"]
            B2["<b>Triệu Xương</b><br>Đại diện ngoại giao ân uy mềm mỏng (Epilogue)"]
        end

        H1 ==>|Trực tiếp đối đầu & vây hãm| B1
        H2 ==>|Đột kích tiền tuyến| B1
        H3 ==>|Khóa chặt đường rút lui| B1
        B1 -.->|Lo sợ phát bệnh chết (791)| B2
    end
```

* **Thông điệp lịch sử trọng tâm**:
  * Khắc họa ý chí tự cường bền bỉ của người Việt thế kỷ VIII, dám đứng lên lật đổ ách cai trị của một đế chế phong kiến hùng mạnh.
  * Danh hiệu **Bố Cái Đại Vương** là minh chứng thiêng liêng cho tình cảm gắn bó máu thịt giữa thủ lĩnh khởi nghĩa và nhân dân, mở đường cho những bước chuyển mình quyết định tiến tới nền độc lập hoàn toàn ở thế kỷ X.
