# Wallet & Inventory Contract

## Wallet

Wallet có đúng hai currency đã khóa, không có currency thứ ba:

```ts
type CurrencyId = 'gold' | 'knb'
type Wallet = { balances: Record<CurrencyId, number> }
```

- **Gold (Vàng)** dùng cho Gacha Gold và các sink được duyệt sau.
- **KNB (Kim Nguyên Bảo)** nhận từ thời gian chơi/hoàn thành ải; dùng mua item đặc thù và Lệnh Hiệu Triệu. Tương lai có thể rút ngắn Hero upgrade cooldown.
- **Command Energy (Quân Lệnh) không phải currency và không thuộc Wallet**; đây là resource/state riêng. Wallet và Command Energy chỉ được hiển thị chung trên HUD qua các snapshot tách biệt.
- Balance là số nguyên không âm. Không cho phép spend khiến balance âm.
- Wallet tài nguyên luôn hiển thị trên HUD qua snapshot; UI không tự cộng/trừ.

## Inventory

Tab Hành Trang chứa Equipment và item tiêu hao. Tab Đội Hình/Hero Deck chỉ quản lý roster, loadout và deployment-facing state.

```ts
type ConsumableId =
  | 'tieu-binh-phu'
  | 'trung-binh-phu'
  | 'dai-binh-phu'

type ConsumableStack = { itemId: ConsumableId; quantity: number }

type Inventory = {
  consumables: Record<ConsumableId, ConsumableStack>
  equipment: EquipmentInstance[]
}
```

Giá trị Binh Phù đã khóa:

- Tiểu Binh Phù: `+1` Quân Lệnh.
- Trung Binh Phù: `+5` Quân Lệnh.
- Đại Binh Phù: `+10` Quân Lệnh.

Người chơi có thể dùng nhiều item trong một command. Item từ Gacha phải vào Hành Trang, không tự cộng Quân Lệnh. Khi dùng thành công, giảm stack và cộng energy trong cùng transaction; overflow được giữ nguyên.

## Transaction invariants

- Reward chỉ được materialize một lần theo transaction ID.
- Spend currency, consume item và grant reward không được cập nhật từng phần.
- Quantity và balance không âm; ID không biết phải bị reject thay vì bỏ qua.
- Lịch sử giao dịch chi tiết là non-goal cho tới khi được duyệt.
