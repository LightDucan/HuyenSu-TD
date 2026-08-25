# Gacha Gold Contract

## Scope đã khóa

- Chỉ tiêu **Vàng**.
- Reward pool: Gold, Weapon Lv1, Gem Lv1, Tiểu/Trung/Đại Binh Phù.
- Reward Quân Lệnh/Binh Phù có rate thấp nhất.
- Cost, rate và pity chưa khóa.

## Reward schema khái niệm

```ts
type GachaGoldReward =
  | { type: 'gold'; amount: number }
  | { type: 'equipment'; definitionId: string; level: 1 }
  | { type: 'consumable'; itemId: 'tieu-binh-phu' | 'trung-binh-phu' | 'dai-binh-phu'; quantity: number }

type GachaGoldRequest = {
  pullCount: number
  requestId: string
}
```

## Transaction flow

1. Validate config, pull count và Gold balance.
2. Reserve/spend Gold một lần theo `requestId`.
3. Resolve reward bằng shared weighted-pool resolver.
4. Grant Gold/equipment/consumable vào Wallet/Inventory.
5. Commit toàn bộ và trả receipt; retry cùng `requestId` không được grant lần hai.

Binh Phù chỉ vào Inventory, không tự dùng. Equipment reward luôn Level 1. Không tạo Hero-specific Gacha logic.

## Audit boundary Phase 15

- Rate tổng bằng 100% và mọi entry hợp lệ.
- Quân Lệnh/Binh Phù thật sự thuộc nhóm rate thấp nhất theo config đã duyệt.
- Simulation đủ lớn để phát hiện sai weighted pool, inflation và duplicate grant.
- Offline local RNG không chống gian lận; server/security là ngoài scope hiện tại.
