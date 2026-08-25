# Meta Open Decisions

Các mục dưới đây chưa được phép hard-code. Mỗi mục phải có decision record trước phase phụ thuộc.

| ID | Quyết định còn mở | Cần khóa trước |
|---|---|---|
| OD-01 | Công thức bonus Quân Lệnh theo Player Level; base cap `60` đã LOCKED | Phase 12 |
| OD-02 | Công thức bonus deployment capacity theo Player Level; base `7` đã LOCKED | Phase 13 |
| OD-03 | Nguồn Player EXP và bảng Level | Phase 10/11 |
| OD-04 | Kim Nguyên Bảo có tiếp tục tính theo thời gian khi tab/app ẩn hay không | Phase 16 |
| OD-05 | Giá Gacha Gold, tỷ lệ từng reward và pity | Phase 15 |
| OD-06 | Flat bonus Equipment ở từng Level 1–10 | Phase 14 |
| OD-07 | Lượng Vàng trả lại từ reward Gacha | Phase 15 |
| OD-08 | Giới hạn tối đa số Lệnh Hiệu Triệu có thể áp dụng; mỗi item `+1` đã LOCKED | Phase 13/16 |

## Quy tắc đóng decision

- Ghi giá trị, lý do, tác động migration và test acceptance.
- Balance number phải qua simulation ở Phase 17; không lấy ví dụ trong tài liệu làm production value.
- Quyết định mới không được phá Core invariants, tạo Hero-specific combat hoặc đưa real-time Meta vào Battle GameClock.
