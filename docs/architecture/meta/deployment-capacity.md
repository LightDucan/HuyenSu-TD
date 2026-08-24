# Deployment Capacity Contract

## Luật đã khóa

- Tên item nâng giới hạn vĩnh viễn: **Lệnh Hiệu Triệu**.
- Giới hạn Hero cơ bản là `7` (**LOCKED**).
- Mỗi **Lệnh Hiệu Triệu** đã áp dụng tăng vĩnh viễn `+1 capacity` (**LOCKED**).
- Player Level có thể tăng giới hạn; công thức bonus theo Level còn mở.
- Giới hạn thực tế không vượt số placement slot của map.
- Reposition Hero đã đặt không tiêu thêm capacity.

## Derived value

```ts
effectiveCapacity = min(
  mapPlacementSlotCount,
  7 + playerLevelBonus + summonOrderCount,
)
```

Base capacity `7` và bonus `+1` cho mỗi Lệnh Hiệu Triệu là invariant. Chỉ công thức `playerLevelBonus` và số Lệnh Hiệu Triệu tối đa còn mở.

## Ownership và command

- Meta Domain tính entitlement/capacity từ Profile và config.
- Battle Domain tiếp tục sở hữu placement registry, slot hợp lệ, occupancy, recall và reposition.
- Command đặt Hero mới cần cả hai điều kiện: còn capacity và slot đích hợp lệ.
- Reposition cùng Hero không đổi số Hero đang đặt.
- Đặt lên slot có Hero khác vẫn theo luật recall hiện tại; số Hero cuối cùng không vượt capacity.
- Giảm capacity trong tương lai không được tự xóa Hero giữa battle. Chính sách xử lý save vượt cap là open decision trước Phase 13.
