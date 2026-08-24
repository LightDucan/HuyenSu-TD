# Player Profile Contract

## Vai trò

Player Profile giữ danh tính local và tiến trình tài khoản dùng chung cho các hệ Meta. Profile không chứa combat runtime, Hero stats đã tính, wallet balance hoặc inventory stack.

## Schema khái niệm

```ts
type PlayerProfile = {
  schemaVersion: number
  playerId: string
  playerLevel: number
  playerExp: number
  createdAtMs: number
  updatedAtMs: number
  summonOrderCount: number
}
```

- `playerId` là ID local ổn định; META-C00 không thêm account/server.
- `playerLevel >= 1`, `playerExp >= 0`, `summonOrderCount >= 0`.
- `summonOrderCount` là số **Lệnh Hiệu Triệu** đã áp dụng; mỗi điểm tăng vĩnh viễn `+1 deployment capacity`, không phải số item còn trong inventory.
- Profile chỉ lưu dữ liệu gốc. Command Energy cap và deployment cap được calculator riêng suy ra từ profile + config.

## Command/query dự kiến

- Query: đọc snapshot profile cho HUD và màn hình Đội Hình/Hành Trang.
- Command: nhận EXP, tăng Player Level khi đủ ngưỡng, áp dụng Lệnh Hiệu Triệu.
- Mọi command phải validate đầu vào, trả kết quả typed và phát snapshot mới sau commit save.

Nguồn Player EXP và công thức Level là quyết định mở; không suy đoán trong implementation Phase 10.
