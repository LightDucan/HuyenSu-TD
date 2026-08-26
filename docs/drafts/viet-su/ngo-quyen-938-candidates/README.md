# Khảo Cứu Bằng Chứng Phụ Tướng Trận Bạch Đằng 938 (Task `VS-NQ-02A`)

> [!IMPORTANT]
> **Mục Đích & Ràng Buộc Nhiệm Vụ (Task `VS-NQ-02A`)**:
> - Tài liệu này thực hiện thẩm định chuyên sâu và có hệ thống toàn bộ các ứng viên phụ tướng (Companion Heroes) tiềm năng nhằm xem xét khả năng đề xuất cho **Hero Slot 2** và **Hero Slot 3** của Chapter: **Đại Thắng Bạch Đằng Năm 938**.
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
| [candidate-evidence.md](candidate-evidence.md) | Thẩm định chi tiết từng ứng viên: **Dương Tam Kha**, **Đỗ Cảnh Thạc**, **Kiều Công Hãn**, **Đinh Công Trứ**, **Nguyễn Tất Tố**, **Đào Nhuận**, **Phạm Bạch Hổ** theo chuẩn 9 mục (Identity, T1, T2, T3 di tích cụ thể, T4, Direct 938 evidence, Contradictions, Confidence, Status). |
| [recommendation.md](recommendation.md) | Tổng hợp ma trận quyết định cuối cùng; đề xuất chính thức cho Hero Slot 2 và Hero Slot 3; xác lập các tiêu chí mở (`OPEN`), dự phòng (`FALLBACK`), và ứng viên tạm thời (`PROVISIONAL`). |

---

## 2. Phương Pháp Luận & Yêu Cầu Nguồn Trích Dẫn (Source Requirement)

Do thư tịch cổ chính quy **T1** (*Tân Ngũ Đại Sử* Q65, *Tư Trị Thông Giám* Q281) và **T2** (*Toàn Thư*, *Cương Mục*, *Việt Sử Lược*, *An Nam Chí Lược*) **hoàn toàn không chép tên các phụ tướng cụ thể trực tiếp tham chiến dưới trướng Ngô Quyền tại trận Bạch Đằng 938**, trọng tâm thẩm định chuyển sang phân tích tầng nguồn **T3 (Dã sử / Thần tích / Di tích đền miếu địa phương)** và **T4 (Khảo cứu thực địa / Hội thảo khoa học / Di sản)**.

### Quy chuẩn phân tầng nguồn nghiêm ngặt:
* **Tầng nguồn gốc T3**: Truyền thống văn hóa, thần tích, ngọc phả dân gian địa phương (như cụm di tích Gia Viên, Từ Lương Xâm tại Hải Phòng).
* **Tầng nguồn T4 hỗ trợ**: Các công trình nghiên cứu lịch sử địa phương, hồ sơ địa danh TP. Hải Phòng, tài liệu Thư viện Hải Phòng, hội thảo khoa học chuyên đề (như Hội thảo năm 2019 về Đào Nhuận).
* **Nguyên tắc học thuật**:
  - Không nâng kết luận của các hội thảo khoa học T4 hoặc thần tích T3 thành dữ kiện chính sử T1/T2.
  - Phân định rõ ràng giữa chứng cứ thực chiến trực tiếp 938 (nhóm D) với việc chỉ phụng sự Ngô Quyền thời kỳ sau (nhóm A/B/C).

---

## 3. Hệ Thống Trạng Thái Đánh Giá (Status Nomenclature)

* **`LOCK CANDIDATE`**: Nhân vật có chứng cứ sử liệu T1/T2 trực tiếp, xác thực tuyệt đối chỉ huy chiến dịch 938 (Duy nhất: **Ngô Quyền**).
* **`PROVISIONAL`**: Ứng viên có truyền thống địa phương T3 định danh rõ ràng, được các nghiên cứu/hội thảo T4 ghi nhận vai trò tác chiến cụ thể tại trận Bạch Đằng 938 (Chờ User/Lead phê duyệt cuối cùng).
* **`FALLBACK`**: Nhân vật lịch sử có thật (T2 xác thực) nhưng hành trạng chỉ thuộc nhóm A/B/C (đại thần triều Ngô, sứ quân, trấn thủ địa phương), **không có chứng cứ thực chiến trực tiếp cho trận Bạch Đằng 938**.
* **`OPEN`**: Trạng thái để trống slot khi chưa đủ căn cứ xác thực vững chắc hoặc khi ưu tiên độ chuẩn xác sử liệu chính quy.
