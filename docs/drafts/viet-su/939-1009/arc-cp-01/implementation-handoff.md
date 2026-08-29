# Hướng Dẫn Chuyển Giao Triển Khai Kỹ Thuật: ARC-CP-01 (Implementation Handoff for Codex)

**Mã Chapter**: `ARC-CP-01`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-cp-01/implementation-handoff.md`
**Đối tượng bàn giao**: Codex / Runtime Implementation Engineer
**Trạng thái**: Ready for Direct Data/Runtime Implementation (Contract-Aligned)

---

## 1. Bảng Phân Định Hỗ Trợ Runtime (Runtime Readiness Matrix)

| Nhóm Tính Năng | Hiện Trạng Runtime | Hành Động Dành Cho Codex |
|---|:---:|---|
| **1. HeroDefinition (Base Stats, Faction, Archetype, Presentation)** | **SUPPORTED NOW** | Nạp trực tiếp vào `src/data/heroes/` theo đúng TypeScript schema hiện hữu. |
| **2. Active Skill Execution (`effects: SkillEffect[]`)** | **SUPPORTED NOW** | Nạp trực tiếp vào `src/data/skills/` và giải quyết qua `resolveSkill`. |
| **3. EnemyDefinition (Base Stats, Color, Category)** | **SUPPORTED NOW** | Nạp trực tiếp vào `src/data/enemies/` (`cham-dao-khien`, `cham-cung-thu`, `cham-tuong-binh`, `boss-be-me-thue`). |
| **4. MapDefinition (Single `fixedPath`, `placementTiles`)** | **SUPPORTED NOW** | Nạp vào `src/data/maps/` với 1 tuyến đường cố định duy nhất. |
| **5. WaveDefinition (10 Waves Progression)** | **SUPPORTED NOW** | Nạp vào `src/data/waves/` và tương thích 100% với `WaveManager`. |
| **6. Shared Passive / Huyền Sử Combat System** | **DEFERRED** | Đã khóa ý niệm thiết kế; **hoãn triển khai** cho đến khi hệ thống Passive dùng chung toàn game được xây dựng. |

---

## 2. Bảng Đối Chiếu Ánh Xạ Hệ Thống (System Mapping Table)

| Thành Phần Nội Dung (CONTENT) | Hệ Thống Tiếp Nhận (EXISTING SYSTEM) | Cấu Trúc Dữ Liệu Yêu Cầu (REQUIRED DATA) | Tác Động Runtime (RUNTIME IMPACT) |
|---|---|---|:---:|
| **3 Hero Playable** (`le-hoan-nam-chinh`, `pham-cu-lang-nam-chinh`, `tu-muc`) | `src/data/heroes/definitions.ts` | `HeroDefinition` (id, name, faction, archetype, baseStats, skillTriggerHits, activeSkillId, presentation) | **None** (Tái sử dụng 100% `CombatController`) |
| **3 Active Skills** (`le-hoan-active`, `pham-cu-lang-active`, `tu-muc-active`) | `src/data/skills/definitions.ts` & `src/domain/skills/SkillResolver.ts` | `SkillDefinition` (`effects: readonly SkillEffect[]`) | **None** (Tái sử dụng 100% `resolveSkill`) |
| **3 Quái Vật Thường** (`cham-dao-khien`, `cham-cung-thu`, `cham-tuong-binh`) | `src/data/enemies/definitions.ts` | `EnemyDefinition` (id, name, maxHp, moveSpeed, cityDamage, category, color) | **None** (Tái sử dụng cơ chế di chuyển và nhận sát thương) |
| **1 Trùm Cuối (Boss)** (`boss-be-me-thue`) | `src/data/enemies/definitions.ts` | `EnemyDefinition` (id, name, maxHp: 1600, moveSpeed: 60, cityDamage: 5, category: 'other', color: 0xd97706) | **None** (Hiển thị quy mô lớn hơn $1.4\times$ qua visual container) |
| **10 Wave Trận Đấu** | `src/data/waves/` (Tạo file dữ liệu `namChinhWaves.ts`) | `readonly WaveDefinition[]` | **None** (Tương thích trực tiếp với `WaveManager`) |
| **Bản Đồ Chiến Trường TD** | `src/data/maps/` (Tạo file dữ liệu `indrapuraMap.ts`) | `MapDefinition` (grid, single `fixedPath`, `placementTiles`) | **None** (Tương thích với renderer của `BattleScene.ts`) |
| **Tên Màn & Định Danh** | `src/game/bridge/BattleBridge.ts` / Stage Registry | `stageId: 'stage-cp-982-indrapura-01'` | **None** |

---

## 3. Đặc Tả Dữ Liệu TypeScript Chuẩn Khớp Schema (Exact TypeScript Blueprints)

### 3.1. Định Nghĩa 3 Tướng Playable (`src/data/heroes/`)

```ts
import type { HeroDefinition } from './definitions'

export const leHoanNamChinh: HeroDefinition = {
  id: 'le-hoan-nam-chinh',
  name: 'Lê Hoàn',
  faction: 'tien-le',
  archetype: 'mid-melee',
  baseStats: {
    hp: 560,
    atk: 60,
    range: 80,
    attackSpeed: 1.25,
    crit: 0.20,
    critDamage: 1.80,
  },
  skillTriggerHits: 5,
  activeSkillId: 'le-hoan-pha-thanh-tram-tuong',
  presentation: {
    skinId: 'skin-le-hoan-nam-chinh',
    animationSetId: 'anim-le-hoan-sword',
  },
}

export const phamCuLangNamChinh: HeroDefinition = {
  id: 'pham-cu-lang-nam-chinh',
  name: 'Phạm Cự Lạng',
  faction: 'tien-le',
  archetype: 'near-melee',
  baseStats: {
    hp: 700,
    atk: 46,
    range: 70,
    attackSpeed: 0.85,
    crit: 0.10,
    critDamage: 1.50,
  },
  skillTriggerHits: 7,
  activeSkillId: 'pham-cu-lang-chan-dia-quyet',
  presentation: {
    skinId: 'skin-pham-cu-lang-nam-chinh',
    animationSetId: 'anim-pham-cu-lang-spear',
  },
}

export const tuMuc: HeroDefinition = {
  id: 'tu-muc',
  name: 'Từ Mục',
  faction: 'tien-le',
  archetype: 'bow',
  baseStats: {
    hp: 390,
    atk: 37,
    range: 165,
    attackSpeed: 1.10,
    crit: 0.15,
    critDamage: 1.50,
  },
  skillTriggerHits: 6,
  activeSkillId: 'tu-muc-chi-dan-hoa-tiet',
  presentation: {
    skinId: 'skin-tu-muc-default',
    animationSetId: 'anim-tu-muc-bow',
  },
}
```

---

### 3.2. Định Nghĩa 3 Kỹ Năng Tương Thích `SkillEffect[]` (`src/data/skills/`)

```ts
import type { SkillDefinition } from '../../domain/skills/SkillResolver'

export const namChinhSkills: Record<string, SkillDefinition> = {
  'le-hoan-pha-thanh-tram-tuong': {
    id: 'le-hoan-pha-thanh-tram-tuong',
    name: 'Trảm Tướng Phá Thành',
    effects: [
      { type: 'aoe', radius: 80, maxTargets: 1 },
      { type: 'damage', atkMultiplier: 3.6 },
      { type: 'root', durationMs: 1500 },
    ],
  },
  'pham-cu-lang-chan-dia-quyet': {
    id: 'pham-cu-lang-chan-dia-quyet',
    name: 'Trấn Địa Phá Tượng',
    effects: [
      { type: 'aoe', radius: 130, maxTargets: 4 },
      { type: 'damage', atkMultiplier: 2.2 },
      { type: 'slow', ratio: 0.40, durationMs: 3000 },
    ],
  },
  'tu-muc-chi-dan-hoa-tiet': {
    id: 'tu-muc-chi-dan-hoa-tiet',
    name: 'Hoa Tiêu Hỏa Tiễn',
    effects: [
      { type: 'multiHit', hits: 3, intervalMs: 140 },
      { type: 'damage', atkMultiplier: 1.25 },
      { type: 'slow', ratio: 0.35, durationMs: 2500 },
    ],
  },
}
```

---

### 3.3. Định Nghĩa Hệ Thống Kẻ Địch & Boss (`src/data/enemies/`)

```ts
import type { EnemyDefinition } from './definitions'

export const namChinhEnemies: Record<string, EnemyDefinition> = {
  'cham-dao-khien': {
    id: 'cham-dao-khien',
    name: 'Chiến Binh Champa',
    category: 'sword',
    maxHp: 150,
    moveSpeed: 80,
    cityDamage: 1,
    color: 0xdc2626,
  },
  'cham-cung-thu': {
    id: 'cham-cung-thu',
    name: 'Nỏ Thủ Champa',
    category: 'archer',
    maxHp: 95,
    moveSpeed: 95,
    cityDamage: 1,
    color: 0xea580c,
  },
  'cham-tuong-binh': {
    id: 'cham-tuong-binh',
    name: 'Voi Chiến Champa',
    category: 'other',
    maxHp: 350,
    moveSpeed: 70,
    cityDamage: 2,
    color: 0x7c2d12,
  },
  'boss-be-me-thue': {
    id: 'boss-be-me-thue',
    name: 'Vua Bê Mê Thuế',
    category: 'other',
    maxHp: 1600,
    moveSpeed: 60,
    cityDamage: 5,
    color: 0xd97706,
  },
}
```

---

### 3.4. Định Nghĩa Bản Đồ `map-cp-indrapura-01` (`src/data/maps/`)

```ts
export const indrapuraMap = {
  id: 'map-cp-indrapura-01',
  name: 'Cửa Biển & Thành Lũy Indrapura',
  width: 800,
  height: 600,
  grid: { columns: 10, rows: 8 },
  // Tuyến đường cố định duy nhất chuẩn MVP
  fixedPath: [
    { x: 0, y: 300 },   // Start (Bến đổ bộ duyên hải)
    { x: 180, y: 300 }, // P1 (Rừng dừa ngập mặn)
    { x: 320, y: 300 }, // P2 (Choke point đồi cát đỏ)
    { x: 520, y: 300 }, // P3 (Hào nước thành Indrapura)
    { x: 800, y: 300 }, // End (Cổng Doanh trại Tiền Lê)
  ],
  placementTiles: [
    { column: 1, row: 1 }, // slot-1-1
    { column: 1, row: 6 }, // slot-1-6
    { column: 3, row: 2 }, // slot-3-2
    { column: 3, row: 5 }, // slot-3-5
    { column: 5, row: 2 }, // slot-5-2
    { column: 5, row: 5 }, // slot-5-5
    { column: 7, row: 3 }, // slot-7-3
    { column: 7, row: 4 }, // slot-7-4
  ],
}
```

---

## 4. Tuyên Bố Ràng Buộc Kỹ Thuật (Engine Constraint Declaration)

* **RUNTIME EXTENSION REQUIRED FOR ARC-CP-01 MVP**: **`NONE`**.
  - Toàn bộ cơ chế chiến đấu của 3 Hero, 4 loại quái vật/boss Champa, bản đồ single-path và 10 Wave đều ánh xạ 100% vào runtime hiện tại mà không cần tạo thêm subsystem mới.
* **DEFERRED FUTURE REQUIREMENT**:
  - `Shared Legendary Passive System`: Khi hệ thống passive toàn game được triển khai, các hiệu ứng passive của Lê Hoàn, Phạm Cự Lạng và Từ Mục sẽ được tích hợp mà không phá vỡ logic MVP.
