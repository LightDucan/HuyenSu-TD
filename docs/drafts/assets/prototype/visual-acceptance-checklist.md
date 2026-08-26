# Visual Acceptance Checklist: Runtime Asset Verification (Post VIS-C01)

> [!IMPORTANT]
> **Tài Liệu Kiểm Thử Thị Giác Bằng Mắt (Visual Acceptance Checklist)**:
> - **Mục đích**: Cung cấp danh mục kiểm tra toàn diện để người chơi, QA tester và designer có thể tự đánh giá bằng mắt (visual inspection) chất lượng hiển thị của bộ 20 asset prototype sau khi Codex hoàn thành tích hợp runtime (`VIS-C01`).
> - **Ràng buộc tham số**: Mọi giá trị cụ thể về thời lượng animation, hệ số scale, anchor point, độ trễ và kích thước ô đều ở trạng thái `[OPEN / CONFIG]`, được tinh chỉnh linh hoạt trong quá trình balance và visual tuning.
> - **Nguyên tắc thẩm định**: Đảm bảo tính rõ ràng (Clarity), tính mượt mà (Smoothness), tính đồng bộ (Synchronization) và tính thẩm mỹ thống nhất (Visual Cohesion) trong không gian trận đấu 2D Tower Defense.

---

## 1. Bảng Tổng Hợp Tiêu Chí Chấp Nhận Thị Giác (Acceptance Matrix)

```mermaid
graph TD
    subgraph TIÊU CHÍ KIỂM TRA THỊ GIÁC RUNTIME (POST VIS-C01)
        C1["<b>1. Phối Cảnh (Front View Only)</b><br>Góc nhìn trực diện chuẩn 2D"]
        C2["<b>2. Điểm Neo (Baseline Y=112)</b><br>Anchor [OPEN / CONFIG], không lún/lơ lửng"]
        C3["<b>3. Tỷ Lệ Grid (Grid Scale)</b><br>Kích thước scale [OPEN / CONFIG] cân đối"]
        C4["<b>4. Chuyển Động (Idle ↔ Attack)</b><br>Mượt mà, không giật/nhấp nháy"]
        C5["<b>5. Hiệu Ứng VFX (Readability)</b><br>Không che lấp quái & tướng quá mức"]
        C6["<b>6. Chân Dung (Portrait Clarity)</b><br>Sắc nét khi thu nhỏ trên giao diện HUD"]
        C7["<b>7. Thống Nhất Style (5 Heroes)</b><br>Đồng bộ nét vẽ & bảng màu"]
        C8["<b>8. Tốc Độ Trận Đấu (x1/x3)</b><br>Timing hình ảnh đồng bộ nhịp logic"]
        C9["<b>9. Đổi Chỗ Tướng (Reposition)</b><br>Giữ nguyên sprite & layering visually correct"]
    end
```

---

## 2. Chi Tiết Danh Mục Kiểm Tra (Checklist Details)

### 2.1. Phối Cảnh Nhân Vật (Perspective & Front View Only)
* [ ] **Góc nhìn trực diện đồng nhất (Front View Only)**: Tất cả Hero được render theo góc nhìn trực diện (Front View), mặt hướng về phía tiền tuyến đối đầu quái vật.
* [ ] **Không bị méo mó / lật hình bất thường**: Không có hiện tượng nhân vật bị nghiêng góc sai trục, méo tỉ lệ ngang/dọc (aspect ratio 1:1), hoặc lật ngược sprite sai quy cách.

### 2.2. Điểm Neo Chân & Tiếp Đất (Baseline Alignment & Ground Anchor)
* [ ] **Tiếp đất chính xác**: Chân của nhân vật đặt vừa khít lên bề mặt ô cờ (Anchor Y tại đường cơ sở Baseline `Y = 112` trên canvas $128 \times 128$; thông số neo chân là `[OPEN / CONFIG]`).
* [ ] **Không bay lơ lửng (Floating)**: Không có khoảng hở vô lý giữa bàn chân nhân vật và mặt đất.
* [ ] **Không thụt lún (Sunken)**: Bàn chân không bị chìm xuống dưới mép ô cờ hoặc bị che lấp bởi texture của ô gạch bên dưới.

### 2.3. Tỷ Lệ & Kích Thước Trên Ô Lưới (Grid Scale & Cell Proportions)
* [ ] **Tỷ lệ hiển thị cân đối (Grid Scale = [OPEN / CONFIG])**: Kích thước hiển thị của Hero sau khi áp dụng cấu hình scale vừa vặn trong không gian ô bàn cờ, không quá nhỏ tạo cảm giác lọt thỏm và không quá to.
* [ ] **Không lấn biên gây nghẽn thị giác**: Vũ khí và tà áo khi bung ra không tràn sang chiếm dụng quá nhiều diện tích của ô lân cận hoặc che lấp đường đi của Enemy.

### 2.4. Mượt Mà Khi Chuyển Trạng Thái (Idle $\leftrightarrow$ Attack Transition)
* [ ] **Không giật vị trí (Anchor Shift / Jitter)**: Khi đổi từ `idle.png` sang `attack.png` và ngược lại, tọa độ tâm chân không bị nhảy vị trí sang trái/phải/lên/xuống.
* [ ] **Không nhấp nháy (Flickering / Frame Tearing)**: Không có frame đen, frame trắng, hoặc hiện tượng biến mất trong tích tắc (1-frame disappear) giữa chu kỳ đánh.
* [ ] **Thời lượng vung đòn tự nhiên (Duration = [OPEN / CONFIG])**: Thời gian giữ frame `attack.png` tạo cảm giác vung đòn dứt khoát, sau đó hồi chiêu về `idle.png` nhịp nhàng.

### 2.5. Độ Rõ Ràng Khi Kích Hoạt Kỹ Năng (VFX Overlay & Readability)
* [ ] **Không che khuất toàn bộ mục tiêu**: Hiệu ứng VFX kỹ năng (`vfx/<skill-id>.png`) bung ra rõ nét nhưng có độ trong suốt và phân tầng hợp lý, không làm biến mất hoàn toàn thanh máu (HP bar) hoặc hình dáng (silhouette) của Enemy.
* [ ] **Định vị đúng trọng tâm**: VFX xuất hiện đúng vị trí dự kiến (tại chân/tay Hero, trên đường đạn, hoặc nổ tại vị trí nhóm mục tiêu tùy skill; vị trí và scale VFX là `[OPEN / CONFIG]`).
* [ ] **Hiệu ứng biến mất sạch sẽ (Clean Fadeout)**: VFX không bị kẹt lại trên màn hình sau khi thời lượng hiển thị (`[OPEN / CONFIG]`) kết thúc.

### 2.6. Độ Sắc Nét Của Chân Dung Thu Nhỏ (Portrait Scaledown & HUD Legibility)
* [ ] **Rõ nét ở kích thước icon**: Ảnh `portraits/<hero-id>.png` khi thu nhỏ về kích thước icon trên thanh chọn tướng, bảng chi tiết nhân vật, hoặc vòng chọn trên giao diện HUD vẫn rõ nét khuôn mặt.
* [ ] **Nhận diện nhanh tức thì**: Người chơi dễ dàng phân biệt được từng vị tướng qua màu tóc, trang phục, và thần thái đặc trưng mà không cần đọc tên chữ.

### 2.7. Tính Đồng Nhất Mỹ Thuật Toàn Bộ Roster (Art Style Consistency)
* [ ] **Độ dày đường viền (Line Weight)**: Nét viền ngoài (Outline stroke) của cả 5 Hero có độ dày tương đồng, không có nhân vật viền quá dày hoặc viền quá mỏng.
* [ ] **Bảng màu & Độ bão hòa (Color Palette & Saturation)**: Độ sáng, độ tương phản và phong cách đổ bóng (shading) thuộc cùng một ngôn ngữ thiết kế mỹ thuật.
* [ ] **Tỷ lệ cơ thể (Proportion Ratio)**: Chiều cao đầu / thân của cả 5 nhân vật đồng nhất, tạo cảm giác cùng thuộc một thế giới game.

### 2.8. Đồng Bộ Tốc Độ Trận Đấu (Game Speed Multipliers: x1 / x3)
* [ ] **Timing đồng bộ nhịp logic ở x1**: Nhịp vung đòn hình ảnh ăn khớp với thời điểm trừ máu của Enemy theo logic trận đấu.
* [ ] **Không lỗi frame ở tốc độ x3**: Khi chuyển sang tốc độ x3, animation chuyển đổi `idle` $\rightarrow$ `attack` tăng tốc tương ứng, không bị đơ frame tấn công vĩnh viễn hoặc bỏ qua hoàn toàn animation.

### 2.9. Đổi Vị Trí Tướng & Thứ Tự Lớp Vẽ (Hero Repositioning & Layering)
* [ ] **Duy trì đúng Sprite khi đổi vị trí**: Khi thực hiện reposition bằng interaction hiện có của runtime sang ô mới, sprite của Hero duy trì hiển thị ổn định, không bị méo hoặc mất texture.
* [ ] **Thứ tự lớp vẽ hiển thị đúng (Layering Visually Correct)**: Khi đặt nhiều Hero ở các vị trí khác nhau trên bàn cờ, thứ tự các lớp vẽ (Hero, quái vật, hiệu ứng ô cờ) hiển thị đúng mặt thị giác (layering visually correct), không bị chồng đè sai lệch.

---

## 3. Bảng Đánh Giá Kết Quả Kiểm Tra Từng Hero Prototype

| Hero Prototype | Front View | Baseline Y=112 | Grid Proportion | Idle $\leftrightarrow$ Attack | Skill VFX Readability | Portrait Clarity | Style Consistency |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Quan Vũ** (`quan-vu`) | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| **Trương Phi** (`truong-phi`) | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| **Triệu Vân** (`trieu-van`) | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| **Hoàng Trung** (`hoang-trung`) | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| **Gia Cát Lượng** (`gia-cat-luong`) | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` | `[ ]` |

---

## 4. Hướng Dẫn Xử Lý Khi Phát Hiện Lỗi Thị Giác (Defect Triage)

1. **Lỗi lệch chân / lơ lửng / lún đất**:
   * *Nguyên nhân*: Tham số Anchor Y trong renderer chưa khớp với Baseline $Y=112$.
   * *Giải pháp*: Điều chỉnh offset neo chân trong cấu hình render `[OPEN / CONFIG]`.
2. **Lỗi nhảy vị trí khi vung đòn (Jitter)**:
   * *Nguyên nhân*: Bounding box giữa `idle.png` và `attack.png` có độ lệch tâm.
   * *Giải pháp*: Cân chỉnh lại điểm neo chung giữa hai texture `[OPEN / CONFIG]`.
3. **Lỗi VFX che kín mục tiêu**:
   * *Nguyên nhân*: Layer hiển thị của VFX đặt quá cao hoặc độ mờ (Opacity) quá đặc.
   * *Giải pháp*: Điều chỉnh alpha blend mode hoặc giảm nhẹ scale VFX `[OPEN / CONFIG]`.
4. **Lỗi desync khi tua nhanh x3**:
   * *Nguyên nhân*: Logic thời gian trận đấu tăng tốc nhưng thời lượng animation giữ nguyên thời gian thực.
   * *Giải pháp*: Đồng bộ thời lượng hiển thị attack và VFX theo tốc độ trận đấu x1 / x3 `[OPEN / CONFIG]`.
