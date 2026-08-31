# Đề Xuất Quy Mô & Kiến Trúc Chương Sản Xuất: Mai Thúc Loan 722 (Chapter Scope Proposal)

**Tài liệu**: `docs/drafts/viet-su/mai-thuc-loan-722/chapter-scope-proposal.md`
**Giai đoạn Lịch sử**: Thời kỳ Khai Nguyên đời Đường Huyền Tông (Năm 722 SCN)
**Trạng thái**: Production Scope Architecture & Final Scope Lock (Khóa 3 Màn Chơi)

---

## 1. Đặt Vấn Đề & Tiêu Chí Khóa Quy Mô Thực Chứng (3-Stage Lock Criteria)

Việc xác định quy mô sản xuất cho cuộc khởi nghĩa Mai Thúc Loan phải căn cứ trên **3 điểm tựa quân sự thực chứng duy nhất có ghi chép trong thư tịch**:

### Ba Điểm Tựa Quân Sự Có Căn Cứ Thư Tịch / Khảo Cổ Thực Chứng:
1. **Khởi binh tại Hoan Châu**: Mai Thúc Loan chiếm giữ Hoan Châu xưng Hoàng đế (*Cương Mục* T2), tự xưng Hắc Đế (*Cựu Đường Thư* Q184, *Tân Đường Thư* Q207, *Toàn Thư* Q5). Địa danh Sa Nam / Vạn An là phục dựng địa phương mang tính truyền thống.
2. **Công hãm thủ phủ An Nam Đô hộ**: Ghi chép trực tiếp trong *Cựu Đường Thư* Q184 (`陷安南府` — hãm An Nam phủ) và *Tân Đường Thư* Q207 (`cử tam thập nhị châu chi chúng`).
3. **Quân Đường xuất kích theo đường cũ Phục Ba & Dập tắt năm 722**: Dương Tư Húc mộ hơn 10 vạn con em Lĩnh Nam tiến theo *Phục Ba cố đạo / Mã Viện cố đạo*, xuất kỳ bất ý đại phá nghĩa quân, thủ lĩnh bị chém/thua chết, đắp kinh quan năm 722 (*Cựu Đường Thư* Q8, Q184; *Tân Đường Thư* Q5, Q207; *Toàn Thư* Q5).

---

## 2. Khóa Cấu Trúc Mini-Chapter 3 Màn Chơi Chuẩn Tắc (Final 3-Stage Lock)

* **Mã Chapter chính thức**: `ARC-MTL-01: Mai Hắc Đế — Quật Khởi Hoan Châu (722 SCN)`.
* **Cấu trúc 3 màn chơi chuẩn tắc (3 Stages)**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│             CẤU TRÚC 3 MÀN CHƠI KHÓA CHÍNH THỨC CHO ARC-MTL-01 (722 SCN)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ STAGE 1: Khởi Nghĩa Hoan Châu — Hắc Đế Dấy Cờ                              │
│ • Cơ sở lịch sử: Tang texts (phản loạn An Nam) + Cương Mục T2 (Hoan Châu,  │
│   chiếm giữ châu, xưng Đế). Sa Nam / Vạn An là phục dựng địa chí dân gian.  │
│ • Trọng tâm: Dấy cờ tại Hoan Châu, quét sạch quân đồn trú địa phương.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ STAGE 2: Hãm An Nam Phủ — Phá Phủ Đô Hộ                                    │
│ • Cơ sở lịch sử: Cựu Đường Thư Q184 trực tiếp ghi chép "hãm An Nam phủ".   │
│ • Trọng tâm: Công phá thủ phủ An Nam Đô hộ phủ, làm rung chuyển phương Nam. │
├─────────────────────────────────────────────────────────────────────────────┤
│ STAGE 3: Đường Cũ Phục Ba — Cuộc Phản Kích 722                             │
│ • Cơ sở lịch sử: Dương Tư Húc mộ hơn 10 vạn quân theo Phục Ba cố đạo,      │
│   đánh úp bất ngờ, dập tắt khởi nghĩa năm 722, đắp kinh quan.              │
│ • Trọng tâm: Trận phòng ngự quyết chiến bi tráng, bảo vệ dân chúng sơ tán. │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Ma Trận Đánh Giá So Sánh Đa Tiêu Chí

| Tiêu Chí Đánh Giá | Phương Án Mini-Chapter (3 Stages — ĐÃ KHÓA) | Phương Án Kéo Dài (5–6 Stages — LOẠI BỎ) | Phương Án 1 Màn Đơn Lẻ (1 Stage — LOẠI BỎ) |
|---|:---:|:---:|:---:|
| **1. Mật Độ Điểm Tựa Sử Liệu** | **Tuyệt đối 100% (Khớp 3 mốc ghi chép T1/T2)** | Thấp (Phải bôi vẽ trận thủy chiến/đèo ải hư cấu) | Cao (Chỉ lấy 1 mốc) |
| **2. Độ Rõ Nét Của Nhân Vật** | **Tập trung tối đa vào Mai Hắc Đế** | Bị phân tán vào các tướng hư cấu | Tập trung |
| **3. Độ Xứng Tầm Của Kẻ Thù** | **Rất cao (Dương Tư Húc & Quang Sở Khách)** | Kéo dài lê thê | Vừa phải |
| **4. Gánh Nặng Hư Cấu (Fiction)** | **Tối thiểu, kiểm soát hoàn hảo** | Rất cao | Rất thấp |
| **5. Tính Mạch Lạc Narrative** | **Hoàn hảo (Khởi binh $\rightarrow$ Hãm phủ $\rightarrow$ Quyết chiến 722)** | Bị loãng nhịp độ | Quá ngắn |
| **6. Giá Trị Sản Xuất (Production Value)**| **Tối ưu nhất cho một Campaign lịch sử thực chứng** | Lãng phí tài nguyên | Thấp |

---

## 4. Kết Luận & Quyết Định Khóa Sản Xuất

1. **Khóa Chính Thức**: Chọn **Mini-Chapter 3 Màn Chơi (`ARC-MTL-01: Mai Hắc Đế — Quật Khởi Hoan Châu (722 SCN)`)**.
2. **Quy Chuẩn Hero**:
   - **Hero Lõi Lịch Sử Duy Nhất (Core 1)**: **Mai Thúc Loan (Mai Hắc Đế)**.
   - Nhân vật dã sử phụ trợ (Mai Thiếu Đế) xếp ở hàng điều kiện T3 (`Conditional Candidate`).
