# Khảo Cứu & Đề Xuất Tuyển Chọn Roster: Thời Kỳ Khởi Nghĩa Phùng Hưng (Cuối Thế Kỷ VIII)

> [!IMPORTANT]
> **Tài Liệu Nghiên Cứu Lịch Sử & Tuyển Chọn Roster (`VS-PH-01`)**:
> - **Chủ đề**: Khảo cứu bối cảnh lịch sử, đánh giá tư liệu học thuật và đề xuất Roster Hero / Enemy / Map cho Historical Arc **Phùng Hưng (Bố Cái Đại Vương)** vào cuối thế kỷ VIII (khoảng 766/791–802 SCN).
> - **Phân tầng nguồn nghiêm ngặt**:
>   - **T1 (Near-source)**: *Cựu Đường Thư*, *Tân Đường Thư*, *Tư Trị Thông Giám* — ghi nhận biến cố năm 791 với các nhân vật **Đỗ Anh Hàn**, **Cao Chính Bình**, **Triệu Xương**. T1 **KHÔNG** trực tiếp ghi tên Phùng Hưng hay Phùng An.
>   - **T2 (Later Historiography)**: *Đại Việt Sử Ký Toàn Thư*, *Việt Sử Lược*, *Khâm Định Việt Sử Thông Giám Cương Mục* — ghi nhận chi tiết về **Phùng Hưng**, **Phùng Hải**, **Phùng Dĩnh**, **Phùng An**, căn cứ Đường Lâm và phủ thành Tống Bình.
>   - **T3 (Local Tradition / Folklore)**: *Việt Điện U Linh Tập*, Thần phả đền thờ Đường Lâm — lưu truyền truyền thuyết Phùng Hưng đánh hổ, sức mạnh dời non và hiển linh phù trợ.
>   - **T4 (Modern Scholarship)**: Phân tích cấu trúc hào trưởng bản địa thời thuộc Đường, giải mã việc đồng nhất Đỗ Anh Hàn = Phùng Hưng (`[T4 interpretation / unverified]`) và khảo đính vị trí địa danh Đường Lâm (`[DISPUTED / T4 interpretation]`).
> - **Ràng buộc thiết kế**: Tuyệt đối **KHÔNG** gán số liệu stats, Skill/Passive, Range, AttackSpeed, Wave layout, hay code logic. Tuân thủ chuẩn 2D Tower Defense cố định đường đi và cơ chế chiến đấu.

---

## 1. Danh Mục Tài Liệu Trong Gói Nghiên Cứu

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [README.md](README.md) | Tổng quan gói nghiên cứu `VS-PH-01`, nguyên tắc bảo toàn tính chân thực lịch sử và bản đồ định vị tư liệu. |
| [roster-selection.md](roster-selection.md) | Đánh giá chuyên sâu tối thiểu 4 nhân vật (Phùng Hưng, Phùng Hải, Phùng Dĩnh, Phùng An), tuyển chọn 3 Hero + Fallback, đề xuất Archetypes Normal Enemy, Elite, Boss (Cao Chính Bình) và Optional Boss (Triệu Xương). Bảng tổng hợp chuẩn hóa cuối tài liệu. |
| [chapter-direction.md](chapter-direction.md) | Định hướng phân cảnh chiến dịch (Chapter Direction), phân tích không gian địa lý (Đường Lâm, Tống Bình), cảnh báo tranh luận khảo cổ và định hướng phục dựng mỹ thuật không gian 2D Tower Defense. |

---

## 2. Bản Đồ Tư Liệu & Cảnh Báo Học Thuật Cốt Lõi

```mermaid
graph TD
    subgraph T1 - GHI CHÉP GẦN THỜI (ĐƯỜNG THƯ)
        T1_A["<b>Sự kiện năm 791 SCN</b><br>• Thủ lĩnh khởi nghĩa: <b>Đỗ Anh Hàn (杜英翰)</b><br>• Quan đô hộ: <b>Cao Chính Bình (高正平)</b> (lo sợ phát bệnh chết)<br>• Kinh lược sứ: <b>Triệu Xương (趙昌)</b> (sang thu phục vỗ về)"]
    end

    subgraph T2 - CHÍNH SỬ ĐẠI VIỆT (TOÀN THƯ / CƯƠNG MỤC)
        T2_A["<b>Truyện Phùng Hưng Đường Lâm</b><br>• Thủ lĩnh: <b>Phùng Hưng (Bố Cái Đại Vương)</b><br>• Tướng đồng mưu: <b>Phùng Hải</b>, <b>Phùng Dĩnh</b><br>• Kế thừa & Quy phục: <b>Phùng An</b><br>• Địa bàn: Đường Lâm → Vây chiếm Tống Bình"]
    end

    subgraph T4 - HỌC THUẬT & KHẢO CHỨNG HIỆN ĐẠI
        T4_A["<b>Giải Thuyết Đồng Nhất (Unverified)</b><br>Đỗ Anh Hàn (T1) có thể là tên Hán hóa / đồng minh của Phùng Hưng (T2)<br><i>[Tuyệt đối KHÔNG khẳng định là Fact lịch sử chắc chắn]</i>"]
        T4_B["<b>Địa Danh Học Đường Lâm (Disputed)</b><br>Tranh luận vị trí: Đường Lâm (Sơn Tây, Hà Nội) vs Đường Lâm (Hà Tĩnh / Ái Châu)<br><i>[Gắn nhãn DISPUTED / Artistic Interpretation]</i>"]
    end

    T1_A -.->|Giả thuyết nghiên cứu T4| T4_A
    T2_A -.->|So sánh văn bản học| T4_A
    T2_A -.->|Khảo đính thực địa| T4_B
```
