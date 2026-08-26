# Khảo Cứu & Đề Xuất Tuyển Chọn Roster: Thời Kỳ Phùng Hưng (Cuối Thế Kỷ VIII)

> [!IMPORTANT]
> **Tài Liệu Nghiên Cứu Lịch Sử & Tuyển Chọn Roster (`VS-PH-01`)**:
> - **Chủ đề**: Khảo cứu bối cảnh lịch sử, đánh giá tư liệu học thuật và đề xuất Roster Hero / Enemy / Map cho Historical Arc **Phùng Hưng** vào giai đoạn cuối thế kỷ VIII (với biến cố trọng tâm năm 791 SCN và giai đoạn hậu kỳ sau đó).
> - **Phân tầng nguồn nghiêm ngặt**:
>   - **T1 (Near-source)**: *Cựu Đường Thư*, *Tân Đường Thư*, *Tư Trị Thông Giám* — ghi nhận biến cố năm 791 SCN với các nhân vật **Đỗ Anh Hàn (杜英翰)**, **Cao Chính Bình (高正平)**, **Triệu Xương (趙昌)**. T1 **KHÔNG** trực tiếp ghi tên Phùng Hưng hay Phùng An.
>   - **T2 (Later Historiography)**: *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục* — ghi nhận về **Phùng Hưng (Đô Quân)**, **Phùng Hải (Đô Bảo)**, căn cứ Đường Lâm, cuộc vây hãm phủ thành Tống Bình khiến Cao Chính Bình lo sợ mà chết; sau khi Phùng Hưng mất, **Phùng An** / dân chúng truy tôn ông là **Bố Cái Đại Vương**.
>   - **T3 (Local Tradition / Folklore)**: *Việt Điện U Linh Tập*, Thần tích đền thờ Đường Lâm — lưu truyền truyền thuyết sức mạnh phi thường, truyện đánh hổ, nhân vật **Phùng Dĩnh** và hiển linh phù trợ.
>   - **T4 (Modern Scholarship / Game Reconstruction)**: Giải mã việc đồng nhất Đỗ Anh Hàn = Phùng Hưng (`[T4 interpretation / unverified]`), khảo đính địa danh học Đường Lâm cổ (`[DISPUTED / T4 interpretation]`), và phục dựng các archetype quân đội thời Đường phục vụ gameplay.
> - **Ràng buộc thiết kế**: Tuyệt đối **KHÔNG** gán số liệu stats, Skill/Passive, Range, AttackSpeed, Wave layout, hay code logic. Tuân thủ chuẩn 2D Tower Defense cố định đường đi và cơ chế chiến đấu.

---

## 1. Danh Mục Tài Liệu Trong Gói Nghiên Cứu

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [README.md](README.md) | Tổng quan gói nghiên cứu `VS-PH-01`, nguyên tắc bảo toàn tính chân thực lịch sử và bản đồ định vị tư liệu. |
| [roster-selection.md](roster-selection.md) | Đánh giá chuyên sâu 4 nhân vật (Phùng Hưng, Phùng Hải, Phùng Dĩnh, Phùng An), tuyển chọn 3 Hero (Hero 1–2 Lock, Hero 3 Provisional) + Fallback, đề xuất Archetypes Normal Enemy (T4), Elite (T4), Boss (Cao Chính Bình - T1/T2) và Optional Opponent (Triệu Xương - T1/T2). Bảng tổng hợp chuẩn hóa cuối tài liệu. |
| [chapter-direction.md](chapter-direction.md) | Định hướng phân cảnh chiến dịch: Primary Map là Phủ thành Tống Bình (Siege); Đường Lâm là Optional Prologue / Artistic environment. Cảnh báo địa danh học và định hướng mỹ thuật 2D Tower Defense. |

---

## 2. Bản Đồ Tư Liệu & Cảnh Báo Học Thuật Cốt Lõi

```mermaid
graph TD
    subgraph T1 - GHI CHÉP GẦN THỜI (ĐƯỜNG THƯ)
        T1_A["<b>Sự kiện năm 791 SCN</b><br>• Thủ lĩnh khởi nghĩa: <b>Đỗ Anh Hàn (杜英翰)</b><br>• Quan đô hộ: <b>Cao Chính Bình (高正平)</b> (lo sợ phát bệnh chết)<br>• Kinh lược sứ kế nhiệm: <b>Triệu Xương (趙昌)</b> (sang thu phục vỗ về)"]
    end

    subgraph T2 - CHÍNH SỬ ĐẠI VIỆT (TOÀN THƯ / CƯƠNG MỤC)
        T2_A["<b>Truyện Phùng Hưng Đường Lâm</b><br>• Phùng Hưng xưng <b>Đô Quân</b>, Phùng Hải xưng <b>Đô Bảo</b><br>• Vây hãm phủ thành Tống Bình, Cao Chính Bình chết<br>• Sau khi mất: Phùng An / dân chúng truy tôn <b>Bố Cái Đại Vương</b>"]
    end

    subgraph T3 - DÃ SỬ & THẦN TÍCH ĐỊA PHƯƠNG
        T3_A["<b>Truyền Tụng Dân Gian</b><br>• Nhân vật <b>Phùng Dĩnh</b> (không thấy trong T2 Toàn Thư)<br>• Truyền thuyết đánh hổ, gánh đá dời non<br>• Hiển linh đền miếu Đường Lâm"]
    end

    subgraph T4 - HỌC THUẬT & PHỤC DỰNG GAMEPLAY
        T4_A["<b>Giả Thuyết Đồng Nhất (Unverified)</b><br>Đỗ Anh Hàn (T1) có thể là tên Hán hóa / đồng minh của Phùng Hưng (T2)<br><i>[Tuyệt đối KHÔNG khẳng định là Fact lịch sử chắc chắn]</i>"]
        T4_B["<b>Địa Danh Học Đường Lâm (Disputed)</b><br>Vị trí Đường Lâm cổ còn tranh luận trong giới học thuật<br><i>[Gắn nhãn DISPUTED / T4 interpretation]</i>"]
    end

    T1_A -.->|Giả thuyết nghiên cứu T4| T4_A
    T2_A -.->|So sánh văn bản học| T4_A
    T3_A -.->|Tích hợp văn hóa| T2_A
    T2_A -.->|Khảo đính thực địa| T4_B
```
