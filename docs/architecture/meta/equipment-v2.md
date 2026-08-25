# Equipment V2 Contract

## Luật đã khóa

- Equipment thường chỉ có flat bonus: `ATK +N`, `Range +N`, `AttackSpeed +N`.
- Không có modifier phần trăm trên Equipment thường; phần trăm dành cho Passive Huyền Sử.
- Equipment thường có Level `1–10`.
- Ghép đúng `3` item cùng definition ID và cùng Level để tạo `1` item Level kế.
- Vũ khí đặc thù Hero không nâng cấp và không ghép.
- Exact bonus table từng Level chưa khóa.

## Schema khái niệm

```ts
type EquipmentInstance = {
  instanceId: string
  definitionId: string
  level: number
}

type EquipmentV2Definition = {
  id: string
  slot: 'weapon' | 'gem'
  kind: 'normal' | 'hero-signature'
  heroId?: string
  flatBonusTableId: string
}

type HeroLoadoutV2 = {
  weaponInstanceId?: string
  gemInstanceId?: string
}
```

Instance ID cho phép equip/merge transaction không mơ hồ. Definition data quyết định slot, policy và bonus; không tạo code riêng theo Hero.

## Invariants

- `normal`: Level 1–10; chỉ merge khi Level < 10.
- `hero-signature`: không merge, không level-up; chỉ Hero được chỉ định có thể equip.
- Ba input instance phải còn trong inventory, không equipped và không trùng ID.
- Merge tiêu ba input và tạo output trong cùng transaction.
- Loadout vẫn chỉ có một Weapon và một Gem.
- Shared stat calculator nhận flat modifier đã resolve; CombatController không biết Equipment Level.

Equipment V1 và save hiện tại không đổi trong META-C00. Chuyển đổi chỉ diễn ra ở Phase 14 sau audit migration.
