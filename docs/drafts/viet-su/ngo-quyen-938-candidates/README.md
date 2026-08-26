# Khảo Cứu Bằng Chứng Phụ Tướng Trận Bạch Đằng 938 (Task `VS-NQ-02A`)

> [!IMPORTANT]
> **Mục Đích & Ràng Buộc Nhiệm Vụ (Task `VS-NQ-02A`)**:
> - Tài liệu này thực hiện thẩm định chuyên sâu và có hệ thống toàn bộ các ứng viên phụ tướng (Companion Heroes) tiềm năng nhằm xem xét khả năng điền vào **Hero Slot 2** và **Hero Slot 3** cho Chapter Flagship: **Đại Thắng Bạch Đằng Năm 938**.
> - **Nguyên tắc học thuật tối thượng**:
>   - **Accuracy > Full Roster**: Không bắt buộc phải tìm đủ 2 phụ tướng. Nếu nguồn sử liệu không đủ chứng cứ xác thực thực chiến năm 938, **dứt khoát giữ Hero Slot ở trạng thái `OPEN`**.
>   - Tuyệt đối không tự sáng tác nhân vật hư cấu hoặc gán ghép võ đoán để lấp đầy 3 slot Hero.
>   - **Phân biệt rạch ròi 4 cấp độ hành trạng**:
>     - **A. Phục vụ Ngô Quyền**
>     - **B. Sống cùng thời**
>     - **C. Tướng lĩnh vương triều Ngô**
>     - **D. Trực tiếp tham chiến trận Bạch Đằng 938**
>     $$\text{Nhóm A/B/C KHÔNG TỰ ĐỘNG CHỨNG MINH D}$$
> - **TUYỆT ĐỐI CHƯA LÀM**:
>   - Không thiết kế Normal Attack, Skill, Passive, stats, Range, AttackSpeed.
>   - Không viết kịch bản Wave, Enemy, map mechanic hay asset prompts.
>   - Không sửa đổi code `src/**` hoặc `PROJECT_PLAN.md`.

---

## 1. Cấu Trúc Hồ Sơ Tài Liệu Thẩm Định

Tập hồ sơ khảo cứu gồm 3 tài liệu thành phần:

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [README.md](README.md) | Tổng quan mục tiêu, phương pháp luận thẩm định phụ tướng, quy chuẩn trích dẫn T3/T4 và phân loại tiêu chí đánh giá. |
| [candidate-evidence.md](candidate-evidence.md) | Thẩm định chi tiết từng ứng viên: **Dương Tam Kha**, **Đỗ Cảnh Thạc**, **Kiều Công Hãn**, **Đinh Công Trứ**, **Nguyễn Tất Tố**, **Phạm Bạch Hổ** theo chuẩn 9 mục (Identity, T1, T2, T3 di tích cụ thể, T4, Direct 938 evidence, Contradictions, Confidence, Status). |
| [recommendation.md](recommendation.md) | Tổng hợp ma trận quyết định cuối cùng; đề xuất chính thức cho Hero Slot 2 và Hero Slot 3; xác lập các tiêu chí mở (`OPEN`) và dự phòng (`FALLBACK`). |

---

## 2. Phương Pháp Luận & Yêu Cầu Nguồn Trích Dẫn (Source Requirement)

Do thư tịch cổ chính quy **T1** (*Tân Ngũ Đại Sử* Q65, *Tư Trị Thông Giám* Q281) và **T2** (*Toàn Thư*, *Cương Mục*, *Việt Sử Lược*, *An Nam Chí Lược*) **hoàn toàn không chép tên các phụ tướng cụ thể trực tiếp tham chiến dưới trướng Ngô Quyền tại trận Bạch Đằng 938**, trọng tâm thẩm định bắt buộc phải chuyển sang phân tích tầng nguồn **T3 (Dã sử / Thần phả / Di tích đền miếu)** và **T4 (Khảo cứu thực địa / Di sản)**.

### Quy chuẩn nghiêm ngặt đối với nguồn T3:
* **Bác bỏ hoàn toàn các cách diễn đạt mơ hồ**:
  - *"Một số thần phả ghi lại..."*
  - *"Truyền thuyết dân gian cho rằng..."*
  - *"Nhiều tài liệu khẳng định..."*
* **Mỗi trích dẫn T3 bắt buộc phải định danh chính xác 5 thông tin**:
  1. **Tên di tích / đền / đình / thần tích / ngọc phả cụ thể**.
  2. **Địa phương cụ thể** (làng/xã, quận/huyện, tỉnh/thành phố).
  3. **Cơ quan quản lý / Hồ sơ di sản / Tài liệu công bố** (Bộ VHTTDL, Cục Di sản Văn hóa, Sở VHTTDL địa phương, Viện Hán Nôm...).
  4. **Nội dung văn bản thực tế khẳng định điều gì**.
  5. **Có khẳng định trực tiếp tham chiến trận Bạch Đằng 938 hay chỉ chép phụng sự Ngô Quyền / vương triều Ngô**.

---

## 3. Hệ Thống Trạng Thái Đánh Giá (Status Nomenclature)

* **`LOCK CANDIDATE`**: Nhân vật có chứng cứ sử liệu T1/T2 trực tiếp, xác thực tuyệt đối chỉ huy/tham chiến chiến dịch 938 (Duy nhất: **Ngô Quyền**).
* **`PROVISIONAL`**: Ứng viên có di tích lịch sử / thần phả T3 định danh cụ thể, được xếp hạng di tích chính thức và có miêu tả vai trò tác chiến trực tiếp tại trận Bạch Đằng 938 (Cần user/lead phê duyệt nếu chấp nhận tướng T3).
* **`FALLBACK`**: Nhân vật lịch sử có thật (T2 xác thực) nhưng hành trạng chỉ thuộc nhóm A/B/C (tướng triều Ngô, hào trưởng cùng thời, cai trị địa phương), **không có bằng chứng thực chiến trực tiếp cho trận Bạch Đằng 938**.
* **`REJECT`**: Nhân vật hư cấu hoàn toàn, không có cơ sở di tích/văn bản hoặc mâu thuẫn thời gian niên đại không thể dung hòa.
