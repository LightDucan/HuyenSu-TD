# Audit P13-C01 — Deployment Capacity Domain & Placement Gate

## Kết luận

**PASS — chờ technical audit trước khi merge.**

P13-C01 tạo một nguồn tính Deployment Capacity dùng chung từ `PlayerProfile` và map configuration, sau đó áp dụng qua capacity-aware placement operation. React và Phaser chỉ nhận projection; không persist `effectiveLimit` hoặc tạo entitlement field thứ hai.

## Luật đã khóa

- Base Deployment Capacity: `7`.
- Player Level bonus: `0` trong Phase 13; không invent milestone/formula.
- Mỗi `PlayerProfile.summonOrderCount`: `+1` capacity vĩnh viễn.
- Account capacity: `7 + 0 + summonOrderCount`.
- Effective limit: `min(account capacity, map placement tile count)`.
- Prototype map có 6 placement tiles nên profile mặc định nhận effective limit `6`.
- Safe-integer validation và overflow protection áp dụng tại selector boundary.

## Placement audit

- New Hero dưới cap: cho phép.
- New Hero ở cap vào ô trống: reject.
- New Hero ở cap đặt lên ô đang chiếm: reject, không thể dùng recall làm loophole.
- Existing Hero ở cap reposition sang ô trống: cho phép, không tăng count.
- Existing Hero ở cap reposition lên Hero khác: cho phép và giữ recall behavior hiện tại.
- Rejection không mutate registry.
- Rejection/reposition không gọi Command Energy transaction.
- x1/x3 không là input của capacity selector.

## Ownership và persistence

- `DeploymentCapacityRuntimeController` đọc Meta V3 profile và map tile count rồi phát read-only projection.
- `HeroPlacementRegistry.placeWithinCapacity` là guarded mutation boundary dùng chung.
- `BattleScene` không tự tính account capacity và không đọc Meta localStorage.
- React chỉ render `placedCount / effectiveLimit` cùng status rejection nhẹ.
- Không schema bump, migration, storage key hoặc persisted `effectiveLimit` mới.
- Không triển khai Lệnh Hiệu Triệu item consumption hoặc maximum Summon Orders.

## Integration regression

- P12 manual/Auto Wave vẫn dùng shared Command Energy spend và Hero placement gate.
- Mỗi Wave vẫn tốn đúng 1 Quân Lệnh.
- 10-Wave và victory reward regression vẫn PASS.
- Reward runtime vẫn PASS.
- Fixed path, combat ownership và Hero rules không thay đổi.

## Verification

- `npm test`: PASS — 17 files, 113 tests.
- `npm run build`: PASS.
- `npm run preview`: PASS — HTTP 200.
- `git diff --check`: PASS.

Vite tiếp tục cảnh báo chunk lớn đã có từ trước; không phải regression của P13-C01.

## Rủi ro còn lại

- Player Level capacity formula và maximum Summon Orders vẫn OPEN.
- Item-use transaction cho Lệnh Hiệu Triệu thuộc checkpoint sau.
- Khi entitlement thay đổi trong tương lai, runtime cần gọi lại projection refresh sau transaction thành công.
