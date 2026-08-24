# Meta Game Architecture Contract

## Mục đích

Thư mục này là contract thiết kế cho Meta Game sau vertical slice `v0.1.0-playable`. META-C00 chỉ khóa ranh giới, schema khái niệm, dependency và roadmap; không triển khai runtime, UI, Gacha, Wallet, Inventory, Quân Lệnh hoặc migration.

Thứ tự ưu tiên khi có mâu thuẫn:

1. yêu cầu META-C00 và quyết định Meta mới nhất;
2. `docs/PROJECT_PLAN.md`;
3. contract trong thư mục này;
4. kiến trúc/Core rules hiện có;
5. skill hoặc tài liệu cũ hơn.

## Ranh giới ownership

```text
React Meta UI
  -> command (spend, claim, equip, use item, start wave)
Meta Application Layer
  -> validate + transaction + domain event
Meta Domain
  -> Profile / Wallet / Inventory / Energy / Capacity / Equipment / Gacha
Meta Repository
  -> versioned local save + migration boundary

BattleBridge
  <- battle-safe snapshot/command only
Battle Domain + Phaser
  -> vẫn giữ combat truth, placement runtime và GameClock
```

- React không sở hữu wallet, inventory, energy, capacity hoặc combat truth.
- Meta Domain không import React hoặc Phaser.
- Battle GameClock chỉ điều khiển x1/x3. Mọi thời gian Meta dùng thời gian thực.
- Bắt đầu Wave là điểm tích hợp: Meta xác nhận/tiêu Quân Lệnh trước, sau đó mới phát command bắt đầu Wave.
- Deployment capacity giới hạn lệnh đặt mới; Battle Domain vẫn xác thực placement slot và occupancy.
- Mọi thay đổi nhiều miền phải là một transaction logic: hoặc tất cả thành công, hoặc không miền nào đổi.

## Tài liệu

- [Player Profile](player-profile.md)
- [Wallet & Inventory](wallet-and-inventory.md)
- [Quân Lệnh](command-energy.md)
- [Deployment Capacity](deployment-capacity.md)
- [Equipment V2](equipment-v2.md)
- [Gacha Gold](gacha-gold.md)
- [Save Migration](save-migration.md)
- [Open Decisions](open-decisions.md)

## Non-goals của META-C00

- Không chọn công thức balance đang để mở.
- Không thay save V1, Equipment V1, roster hoặc cooldown flag hiện tại.
- Không tạo dependency, source module, UI, localStorage key hoặc migration executable.
- Không thay luật Hero, combat, fixed path, skill framework hoặc x1/x3.
