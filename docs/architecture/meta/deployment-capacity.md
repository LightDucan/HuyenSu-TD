# Deployment Capacity Contract

## Luật đã khóa

- Tên item nâng giới hạn vĩnh viễn: **Lệnh Hiệu Triệu**.
- Giới hạn Hero cơ bản dự kiến `7`.
- Player Level và số Lệnh Hiệu Triệu đã áp dụng có thể tăng giới hạn.
- Giới hạn thực tế không vượt số placement slot của map.
- Reposition Hero đã đặt không tiêu thêm capacity.

## Derived value

```ts
effectiveCapacity = min(
  mapPlacementSlotCount,
  baseCapacity + playerLevelBonus + summonOrderBonus,
)
```

`baseCapacity` dự kiến là 7. Công thức `playerLevelBonus`, bonus mỗi Lệnh Hiệu Triệu và giới hạn tối đa còn mở.

## Ownership và command

- Meta Domain tính entitlement/capacity từ Profile và config.
- Battle Domain tiếp tục sở hữu placement registry, slot hợp lệ, occupancy, recall và reposition.
- Command đặt Hero mới cần cả hai điều kiện: còn capacity và slot đích hợp lệ.
- Reposition cùng Hero không đổi số Hero đang đặt.
- Đặt lên slot có Hero khác vẫn theo luật recall hiện tại; số Hero cuối cùng không vượt capacity.
- Giảm capacity trong tương lai không được tự xóa Hero giữa battle. Chính sách xử lý save vượt cap là open decision trước Phase 13.
