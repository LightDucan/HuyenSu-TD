# Save Migration Contract

## Trạng thái hiện tại

META-C00 không thay save đang chạy:

- Progression V1: `huyen-su-td/progression-v1`
- Equipment V1: `huyen-su-td/equipment-v1`
- Meta V1 foundation: `huyen-su-td/meta-v1` (P10-C01; versioned envelope, chưa chạy migration)

Equipment V2 key/schema chỉ được tạo trong phase implementation tương ứng sau khi tên key được audit. Meta V1 loader không tự chuyển đổi hoặc overwrite save version khác.

## Envelope mục tiêu khái niệm

```ts
type VersionedSave<T> = {
  schemaVersion: number
  revision: number
  updatedAtMs: number
  data: T
}
```

Meta save dự kiến bao gồm Profile, Wallet, Inventory, Command Energy và entitlement; battle runtime không được serialize vào Meta save.

## Quy trình migration bắt buộc

1. Đọc raw V1 nhưng không sửa/xóa.
2. Parse và validate; dữ liệu hỏng phải trả lỗi typed, không âm thầm overwrite.
3. Chuyển đổi bằng hàm thuần, deterministic và idempotent.
4. Validate toàn bộ target schema và cross-reference.
5. Ghi target key mới.
6. Đọc lại target để xác nhận trước khi đánh dấu migration hoàn tất.
7. Giữ V1 làm rollback source trong ít nhất một release checkpoint; chính sách xóa cần task riêng.

## Equipment V1 -> V2

- Mỗi equipped definition ID hợp lệ tạo một Equipment instance và loadout reference tương ứng.
- Không suy diễn Level/bonus table chưa khóa; mặc định migration policy phải được duyệt ở Phase 14.
- Unknown definition, duplicate instance hoặc slot mismatch phải được báo và không commit partial migration.

## Test contract

- Fresh install, save V1 hợp lệ, save hỏng, migration retry, interrupted write và rollback.
- Không mất progression/equipment; không duplicate wallet, item hoặc instance.
- Upgrade cooldown flag hiện tại không bị bật lại bởi migration.
