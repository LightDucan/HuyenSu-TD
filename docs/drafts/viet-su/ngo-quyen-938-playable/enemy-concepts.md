# Thiết Kế Ý Niệm Tuyến Kẻ Địch: Quân Nam Hán (Task `VS-NQ-02B`)

> [!IMPORTANT]
> **Ràng Buộc Thiết Kế Kẻ Địch (Enemy & Boss Architecture)**:
> - **Cơ chế chiến đấu**: Toàn bộ Enemy di chuyển trên **tuyến đường cố định (Fixed-path)**, sở hữu lượng máu (**HP**), tốc độ di chuyển (**Move Speed**), sát thương thành lũy (**City Damage**), danh mục (**Category**) và nhận diện thị giác (**Visual identity**).
> - **TUYỆT ĐỐI KHÔNG TẤN CÔNG HERO**: Enemy không có đòn đánh, không có AI hải chiến hay cơ chế va chạm thuyền bè phức tạp.
> - **Không dùng cơ chế ngoài hệ thống chung**: Không có chỉ số Giáp (Armor stat), không có Kháng vật lý / Kháng phép (Physical / Magic Resistance), không có cơ chế giảm thời gian khống chế (CC Duration Reduction) hay trạng thái suy yếu riêng biệt (Boss vulnerability phase). Giáp trụ chỉ xuất hiện như mô tả trang phục thị giác (Visual costume), không làm thay đổi cách tính sát thương.
> - **Main Battle Boss (Lưu Hoằng Thao / Hồng Thao)**: Sử dụng hoàn toàn **hệ thống Boss dùng chung (*Shared Enemy/Boss System*)**, phân biệt qua:
>   - Lượng máu cao hơn (`HP` cấu hình cao).
>   - Tốc độ di chuyển (`Move Speed` cấu hình riêng).
>   - Kích thước hình thể lớn hơn (**Visual Scale $1.35\times$**, Front View).
>   - Các hiệu ứng khống chế dùng chung (Slow, Root, Stun) tác động bình thường lên Boss theo logic hệ thống.
> - **Quy tắc kết thúc ván đấu**: Enemy khi chạm đến điểm kết thúc (endpoint) sẽ gây lượng sát thương thành lũy (**`cityDamage`**) đã cấu hình. Ván đấu chỉ thất bại khi lượng máu thành lũy (**City HP**) giảm về 0.
> - **Phân định Boss cốt truyện (Narrative)**:
>   - **Lưu Cung**: Đóng quân ở Hải Môn làm thanh viện $\rightarrow$ **Narrative Supreme Antagonist**, không xuất hiện như đơn vị chiến đấu trên map Bạch Đằng.
>   - **Kiều Công Tiễn**: Bị diệt tại thành Đại La vào mùa thu 938 trước khi quân Nam Hán tới $\rightarrow$ **Narrative Prelude Antagonist / Optional Prelude Boss**, không xuất hiện trên map Bạch Đằng.
> - Mọi giá trị HP, Speed, City Damage cụ thể giữ ở trạng thái **`[CONFIG / OPEN]`**.

---

## 1. Cấu Trúc Tuyến Kẻ Địch Nam Hán

```mermaid
graph TD
    subgraph HỆ THỐNG KẺ ĐỊCH TRẬN BẠCH ĐẰNG 938 (SHARED ENGINE COMPATIBLE)
        N1["<b>1. Nam Hán Thủy Quân Tiền Phong</b><br>Normal Enemy (T4 Visual)<br>Thủy binh cơ động nhẹ, chèo xuồng thám thính"]
        N2["<b>2. Nam Hán Thủy Cung Trận Binh</b><br>Normal Enemy (T4 Visual)<br>Xạ thủ chiến thuyền trang bị nỏ/cung ngắn (Visual Only)"]
        N3["<b>3. Nam Hán Đột Kích Thủy Binh</b><br>Normal Enemy (T4 Visual)<br>Lính nhảy boong phá cọc, giáp da câu liêm"]

        EL["<b>Nam Hán Lâu Thuyền Vệ Sĩ</b><br>Elite Enemy (T4 Visual)<br>Cấm vệ soái hạm giáp sắt nặng, đại phủ (Visual Scale 1.15x)"]

        MB["<b>Lưu Hoằng Thao / Hồng Thao</b><br>Main Battle Boss (T1/T2 Historical Person)<br>Soái tướng hạm đội, HP cao, Visual Scale 1.35x"]

        N1 --> EL
        N2 --> EL
        N3 --> EL
        EL --> MB
    end
```

---

## 2. Thiết Kế Ý Niệm 3 Kẻ Địch Thường (Normal Enemies — `T4`)

### 2.1. Kẻ Địch 1: Nam Hán Thủy Quân Tiền Phong (Marine Vanguard)
* **Archetype**: Kẻ địch cơ động nhanh, máu mỏng (Fast / Swarm Runner).
* **Mô tả mỹ thuật (Visual Identity)**:
  - Lính thủy binh chèo xuồng nhẹ đi đầu thám thính luồng lạch. Mặc áo chẽn da thuộc chịu nước màu lam sẫm viền xám, đầu đội nón mây đan tròn hoặc chít khăn chàm, tay cầm đoản đao và khiên mây bọc da.
  - Chân đi hài vải chống trượt, động tác lướt nhanh trên mặt nước/bãi bồi.
* **Đặc tính gameplay (Shared Enemy Properties)**:
  - `Role`: Đơn vị đi đầu thử thách khả năng dọn dẹp mục tiêu nhanh của Hero.
  - `MovementSpeed`: Nhanh (`Fast`) `[CONFIG / OPEN]`.
  - `Health (HP)`: Thấp (`Low`) `[CONFIG / OPEN]`.
  - `CityDamage`: Cấu hình chuẩn `[CONFIG / OPEN]`.
  - `Behavior`: Di chuyển liên tục theo fixed-path, không dừng lại, không tấn công Hero.

---

### 2.2. Kẻ Địch 2: Nam Hán Thủy Cung Trận Binh (Naval Crossbowman)
* **Archetype**: Kẻ địch tầm trung, tốc độ trung bình (Standard Marcher).
* **Mô tả mỹ thuật (Visual Identity)**:
  - Xạ thủ đóng trên sàn thuyền chiến nhỏ, khoác áo giáp vải bồi chống ẩm màu lam pha đồng, lưng đeo ống tên gỗ, tay cầm nỏ gỗ kiểu Ngũ Đại.
  - *Lưu ý*: Nỏ và cung chỉ là nhận diện thị giác thẩm mỹ (Visual identity only), **đơn vị không thực hiện hành vi bắn hay tấn công Hero**.
* **Đặc tính gameplay (Shared Enemy Properties)**:
  - `Role`: Đơn vị bộ binh tiêu chuẩn xuất hiện với mật độ đều đặn trong các đợt tiến quân.
  - `MovementSpeed`: Trung bình (`Medium`) `[CONFIG / OPEN]`.
  - `Health (HP)`: Trung bình (`Medium`) `[CONFIG / OPEN]`.
  - `CityDamage`: Cấu hình chuẩn `[CONFIG / OPEN]`.
  - `Behavior`: Di chuyển theo tuyến đường cố định, không tấn công Hero.

---

### 2.3. Kẻ Địch 3: Nam Hán Đột Kích Thủy Binh (Boarding Raider)
* **Archetype**: Kẻ địch cận chiến áp sát, máu khá (Tough Infantry).
* **Mô tả mỹ thuật (Visual Identity)**:
  - Lính nhảy boong xung kích chuyên phá chướng ngại vật và mở đường cho hạm đội. Trang phục giáp da bò cứng đính đinh tán đồng (visual costume only), đầu đội mũ chóp đồng có che tai, tay cầm câu liêm sắt dài hoặc trường đao trảm mã.
  - Thể hình vạm vỡ, bước chân chắc nịch lội qua vùng phù sa bãi bồi.
* **Đặc tính gameplay (Shared Enemy Properties)**:
  - `Role`: Đơn vị chống chịu cơ bản, che chắn cho các đơn vị cơ động phía sau.
  - `MovementSpeed`: Trung bình - Chậm (`Medium-Slow`) `[CONFIG / OPEN]`.
  - `Health (HP)`: Khá cao (`Medium-High`) `[CONFIG / OPEN]`.
  - `CityDamage`: Cấu hình chuẩn `[CONFIG / OPEN]`.
  - `Behavior`: Di chuyển theo tuyến đường cố định, không tấn công Hero.

---

## 3. Thiết Kế Ý Niệm Kẻ Địch Tinh Anh: Nam Hán Lâu Thuyền Vệ Sĩ (Elite Enemy — `T4`)

* **Tên đơn vị**: **Nam Hán Lâu Thuyền Vệ Sĩ (Heavy Flagship Marine Guard)**.
* **Archetype**: Đơn vị chống chịu hạng nặng (Heavy Marine Elite).
* **Mô tả mỹ thuật (Visual Identity)**:
  - Sĩ quan cấm vệ trực tiếp bảo vệ soái hạm Lưu Hoằng Thao. Thể hình cao lớn vạm vỡ (**Visual scale $1.15\times$** so với lính thường).
  - Khoác bộ đại giáp phiến sắt màu đồng đen phủ kín thân mình (visual only, không tạo cơ chế kháng giáp), áo choàng ngắn màu đỏ thẫm xé rách dính bùn nước, mũ trụ sắt trang trí hình đầu rồng Nam Hán dữ tợn.
  - Tay cầm đại phủ (rìu chiến hai lưỡi lớn) hoặc thiết kích nặng nề vác trên vai (visual only).
* **Đặc tính gameplay (Shared Enemy Properties)**:
  - `Role`: Mini-boss / Elite unit xuất hiện ở các đợt cao trào, kiểm tra khả năng dồn sát thương của toàn bộ đội hình Hero.
  - `MovementSpeed`: Chậm (`Slow`) `[CONFIG / OPEN]`.
  - `Health (HP)`: Rất cao (`High`) `[CONFIG / OPEN]`.
  - `CityDamage`: Cấu hình cao hơn lính thường `[CONFIG / OPEN]`.
  - `Behavior`: Di chuyển vững chắc trên fixed-path, không có đòn tấn công Hero, chịu tác động của các hiệu ứng khống chế dùng chung bình thường.

---

## 4. Thiết Kế Ý Niệm Main Battle Boss: Lưu Hoằng Thao / Lưu Hồng Thao (`T1/T2`)

> [!IMPORTANT]
> **Quy Chuẩn Thiết Kế Main Boss Bạch Đằng**:
> - **Lưu Hoằng Thao (`劉弘操` T1/T2) / Lưu Hồng Thao (`劉洪操` T1)** là nhân vật lịch sử xác thực, hoàng tử Nam Hán được phong Giao Vương / Vạn Vương, trực tiếp chỉ huy hạm đội vượt biển và tử trận tại Bạch Đằng năm 938.
> - **Cơ chế Boss**: Vận hành hoàn toàn bằng **Shared Boss Concept**, sử dụng các thuộc tính dùng chung, tuyệt đối không tạo code riêng ngoài hệ thống.
> - **Không tấn công Hero**: Boss chỉ di chuyển từ điểm xuất phát (Cửa biển) đến điểm kết thúc (Thành lũy phòng thủ) trên tuyến đường cố định.
> - **Quy tắc City Damage**: Khi Boss chạm điểm kết thúc của tuyến đường, Boss gây sát thương thành lũy (`cityDamage`) đã cấu hình. Ván đấu chỉ thất bại khi lượng máu thành lũy (City HP) giảm về 0.

```mermaid
graph LR
    subgraph MAIN BOSS LIFECYCLE (SHARED ENGINE COMPATIBLE)
        B1["<b>Boss Xuất Hiện (Spawn)</b><br>Kích thước lớn (Scale 1.35x)<br>HP cao, Move Speed cấu hình riêng"]
        B2["<b>Di Chuyển Trên Tuyến Đường (Fixed Path)</b><br>Tiến dọc theo luồng sông Bạch Đằng<br>Chịu sát thương và hiệu ứng khống chế từ Hero"]
        B3["<b>Kết Cục Trận Đấu</b><br>• Bị hạ gục: Lưu Hoằng Thao tử trận → Chiến thắng<br>• Chạm đích: Gây cityDamage lên City HP"]

        B1 --> B2
        B2 --> B3
    end
```

* **Danh xưng & Tước hiệu**: **Vạn Vương Lưu Hoằng Thao / Giao Vương Lưu Hồng Thao (劉弘操 / 劉洪操)**.
* **Mô tả mỹ thuật (Visual Identity)**:
  - Soái tướng Nam Hán với khí thế ngạo mạn lúc đầu, hoảng loạn khi chiến thuyền sa lầy vào bãi cọc.
  - Thể hình uy dũng nổi bật (**Visual Scale $1.35\times$**, Front View).
  - Khoác áo chiến bào lụa tím thêu chỉ vàng bên trong, bên ngoài mặc đại giáp khảm vàng sáng loáng mang phong cách hoàng gia Nam Hán (visual identity only), thắt đai ngọc, mũ miện vương giả đính lông trĩ dài phấp phới.
  - Tay cầm bội kiếm mạ vàng chuôi ngọc (visual identity).
* **Đặc tính gameplay (Shared Boss Attributes)**:
  - `Health (HP)`: Cực cao (`Boss Tier HP`) `[CONFIG / OPEN]`.
  - `MovementSpeed`: Chậm rãi nhưng kiên định (`Slow-Steady`) `[CONFIG / OPEN]`.
  - `CityDamage`: Cực lớn nếu chạm đích `[CONFIG / OPEN]`.
  - `Status Interaction`: Chịu ảnh hưởng đầy đủ từ các hiệu ứng khống chế dùng chung (Slow, Root, Stun) theo logic hệ thống chung, không có pha suy yếu riêng biệt.
  - `Visual Scale`: $1.35\times$ so với kích thước tiêu chuẩn để người chơi dễ dàng nhận diện.

---

## 5. Phân Định Các Nhân Vật Phản Diện Dẫn Truyện (Narrative Antagonists)

| Nhân Vật | Tự Dạng Chữ Hán | Tầng Nguồn | Định Vị Trong Game | Lý Do Thiết Kế Học Thuật |
|---|:---:|:---:|---|---|
| **Lưu Cung (Nam Hán Hoàng Đế)** | `劉龑` (T1) / `劉龔` (T2) | **T1/T2** | **Narrative Supreme Antagonist** | Đóng quân tại Hải Môn làm thanh viện, không vượt biển vào sông Bạch Đằng. Chỉ xuất hiện trong lời thoại dẫn nhập mở đầu và hoạt cảnh kết thúc (khóc than thu tàn quân rút chạy). **Không xuất hiện như một đơn vị chiến đấu trên map**. |
| **Kiều Công Tiễn** | `皎公羨` (T1) / `矯公羨` (T2) | **T1/T2** | **Narrative Prelude Antagonist / Optional Prelude Boss** | Bị nghĩa quân Ngô Quyền tiêu diệt tại thành Đại La vào mùa thu năm 938 trước khi quân Nam Hán kéo sang. **Tuyệt đối không đưa vào map Bạch Đằng**; nếu có chỉ xuất hiện trong màn dẫn nhập (Prologue / Chapter 0) tại Đại La. |

---

## 6. Bảng Tổng Hợp Tuyến Kẻ Địch Chuẩn Hóa Engine

| Tên Đơn Vị Kẻ Địch | Loại Hình (Category) | Tốc Độ (Speed Profile) | Máu (HP Profile) | Sát Thương Thành (City Damage) | Tỷ Lệ Hình Thể (Visual Scale) | Ghi Chú Kỹ Thuật |
|---|:---:|:---:|:---:|:---:|:---:|---|
| **Nam Hán Thủy Quân Tiền Phong** | Normal Enemy (T4) | Fast | Low | Standard | $1.0\times$ (Standard) | Fixed-path, không tấn công Hero. |
| **Nam Hán Thủy Cung Trận Binh** | Normal Enemy (T4) | Medium | Medium | Standard | $1.0\times$ (Standard) | Nỏ/cung là visual only, không bắn Hero. |
| **Nam Hán Đột Kích Thủy Binh** | Normal Enemy (T4) | Med-Slow | Med-High | Standard | $1.05\times$ | Giáp da visual only, không có giáp cơ học. |
| **Nam Hán Lâu Thuyền Vệ Sĩ** | Elite Enemy (T4) | Slow | High | High | $1.15\times$ | HP cao, không có cơ chế kháng giáp riêng. |
| **Lưu Hoằng Thao / Hồng Thao** | Main Battle Boss (T1/T2) | Slow-Steady | Boss Tier | Boss Level | $1.35\times$ | Boss chính trận 938, không tấn công Hero, chịu status bình thường. |
