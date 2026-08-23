# Data Schema V1

Đây là contract khái niệm cho Phase 0. TypeScript schema thực thi sẽ được thêm cùng code ở phase tương ứng.

## Hero Definition

```ts
type HeroDefinition = {
  id: string
  name: string
  faction: string
  archetype: 'near-melee' | 'mid-melee' | 'bow' | 'magic'
  baseStats: {
    hp: number
    atk: number
    range: number
    attackSpeed: number
    crit: number
    critDamage: number
  }
  skillTriggerHits: number
  activeSkillId: string
  legendaryPassiveId?: string
  presentation: {
    skinId: string
    animationSetId: string
  }
}
```

`archetype` chỉ phục vụ phân nhóm content/cân bằng. Engine sử dụng `range` và `skillTriggerHits`, không hard-code hành vi theo archetype.

## Skill Definition

```ts
type SkillDefinition = {
  id: string
  name: string
  effects: SkillEffect[]
}

type SkillEffect =
  | { type: 'damage'; atkMultiplier: number }
  | { type: 'aoe'; radius: number; maxTargets?: number }
  | { type: 'slow'; ratio: number; durationMs: number }
  | { type: 'stun'; durationMs: number }
  | { type: 'root'; durationMs: number }
  | { type: 'multiHit'; hits: number; intervalMs: number }
```

Effect được resolve bởi framework dùng chung. Skill không chứa tên class hoặc đường dẫn code riêng của Hero.

## Enemy Definition

```ts
type EnemyDefinition = {
  id: string
  name: string
  category: 'sword' | 'archer' | 'other'
  maxHp: number
  moveSpeed: number
  cityDamage: number
  presentationId: string
}
```

Enemy chỉ đi theo fixed path trong MVP.

## Wave Definition

```ts
type WaveDefinition = {
  id: string
  groups: Array<{
    enemyId: string
    count: number
    spawnIntervalMs: number
    startDelayMs: number
  }>
}
```

Remaining counter được tính từ wave runtime theo `category`, không nhập tay vào HUD.

## Map Definition

```ts
type MapDefinition = {
  id: string
  width: number
  height: number
  grid: { columns: 12; rows: 10 }
  fixedPath: Array<{ x: number; y: number }>
  placementTiles: Array<{ column: number; row: number }>
}
```

## Hero Progression State

```ts
type HeroProgressionState = {
  heroId: string
  stage: 'normal' | 'rebirth' | 'reincarnation' | 'legendary'
  level: number
  upgradeReadyAt?: number
  weapon?: StatModifier
  gem?: StatModifier
}

type StatModifier = {
  atk?: number
  attackSpeed?: number
  range?: number
}
```

`level` phải nằm trong 1–100. Cooldown progression không sử dụng Battle Game Clock.
