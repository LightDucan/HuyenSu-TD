# Hướng Dẫn Chuyển Giao Triển Khai Kỹ Thuật: ARC-KT-01 (Implementation Handoff for Codex)

**Mã Chapter**: `ARC-KT-01`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-kt-01/implementation-handoff.md`
**Đối tượng bàn giao**: Codex / Runtime Implementation Engineer
**Trạng thái**: Ready for Direct Data/Runtime Implementation (Contract-Aligned)

---

## 1. Bảng Phân Định Hỗ Trợ Runtime (Runtime Readiness Matrix)

Để đảm bảo tính trung thực và khả thi 100%, tài liệu phân định rõ ràng giữa các tính năng được engine hỗ trợ ngay trong giai đoạn MVP và các ý tưởng được thiết kế khóa nhưng hoãn triển khai:

| Nhóm Tính Năng | Hiện Trạng Runtime | Hành Động Dành Cho Codex |
|---|:---:|---|
| **1. HeroDefinition (Base Stats, Faction, Archetype, Presentation)** | **SUPPORTED NOW** | Nạp trực tiếp vào `src/data/heroes/` theo đúng TypeScript schema hiện hữu. |
| **2. Active Skill Execution (`effects: SkillEffect[]`)** | **SUPPORTED NOW** | Nạp trực tiếp vào `src/data/skills/` và giải quyết qua `resolveSkill`. |
| **3. EnemyDefinition (Base Stats, Color, Category)** | **SUPPORTED NOW** | Nạp trực tiếp vào `src/data/enemies/` (`tong-bo-binh`, `tong-cung-thu`, `tong-thuy-binh`, `boss-hou-renbao`). |
| **4. MapDefinition (Single `fixedPath`, `placementTiles`)** | **SUPPORTED NOW** | Nạp vào `src/data/maps/` với 1 tuyến đường cố định duy nhất. |
| **5. WaveDefinition (10 Waves Progression)** | **SUPPORTED NOW** | Nạp vào `src/data/waves/` và tương thích 100% với `WaveManager`. |
| **6. Shared Passive / Huyền Sử Combat System** | **DEFERRED** | Đã khóa ý niệm thiết kế; **hoãn triển khai** cho đến khi hệ thống Passive dùng chung được code. |

---

## 2. Bảng Đối Chiếu Ánh Xạ Hệ Thống (System Mapping Table)

| Thành Phần Nội Dung (CONTENT) | Hệ Thống Tiếp Nhận (EXISTING SYSTEM) | Cấu Trúc Dữ Liệu Yêu Cầu (REQUIRED DATA) | Tác Động Runtime (RUNTIME IMPACT) |
|---|---|---|:---:|
| **3 Hero Playable** (`le-hoan`, `pham-cu-lang`, `duong-van-nga`) | `src/data/heroes/definitions.ts` | `HeroDefinition` (id, name, faction, archetype, baseStats, skillTriggerHits, activeSkillId, presentation) | **None** (Tái sử dụng 100% `CombatController`) |
| **3 Active Skills** (`le-hoan-active`, `pham-cu-lang-active`, `duong-van-nga-active`) | `src/data/skills/definitions.ts` & `src/domain/skills/SkillResolver.ts` | `SkillDefinition` (`effects: readonly SkillEffect[]`) | **None** (Tái sử dụng 100% `resolveSkill`) |
| **3 Quái Vật Thường** (`tong-bo-binh`, `tong-cung-thu`, `tong-thuy-binh`) | `src/data/enemies/definitions.ts` | `EnemyDefinition` (id, name, maxHp, moveSpeed, cityDamage, category, color) | **None** (Tái sử dụng cơ chế di chuyển và nhận sát thương) |
| **1 Trùm Cuối (Boss)** (`boss-hou-renbao`) | `src/data/enemies/definitions.ts` | `EnemyDefinition` (id, name, maxHp: 1500, moveSpeed: 60, cityDamage: 5, category: 'other', color: 0xf59e0b) | **None** (Hiển thị quy mô lớn hơn $1.4\times$ qua visual container) |
| **10 Wave Trận Đấu** | `src/data/waves/` (Tạo file dữ liệu `khangTongWaves.ts`) | `readonly WaveDefinition[]` | **None** (Tương thích trực tiếp với `WaveManager`) |
| **Bản Đồ Chiến Trường TD** | `src/data/maps/` (Tạo file dữ liệu `khangTongMap.ts`) | `MapDefinition` (grid, single `fixedPath`, `placementTiles`) | **None** (Tương thích với renderer của `BattleScene.ts`) |
| **Tên Màn & Định Danh** | `src/game/bridge/BattleBridge.ts` / Stage Registry | `stageId: 'stage-kt-981-dai-thang-01'` | **None** |

---

## 3. Đặc Tả Dữ Liệu TypeScript Chuẩn Khớp Schema (Exact TypeScript Blueprints)

### 3.1. Định Nghĩa 3 Tướng Playable (`src/data/heroes/`)

```ts
import type { HeroDefinition } from './definitions'

export const leHoan: HeroDefinition = {
  id: 'le-hoan',
  name: 'Lê Hoàn',
  faction: 'tien-le',
  archetype: 'mid-melee',
  baseStats: {
    hp: 550,
    atk: 58,
    range: 80,
    attackSpeed: 1.25,
    crit: 0.20,
    critDamage: 1.80,
  },
  skillTriggerHits: 5,
  activeSkillId: 'le-hoan-tra-hang-tram-tuong',
  presentation: {
    skinId: 'skin-le-hoan-default',
    animationSetId: 'anim-le-hoan-sword',
  },
}

export const phamCuLang: HeroDefinition = {
  id: 'pham-cu-lang',
  name: 'Phạm Cự Lạng',
  faction: 'tien-le',
  archetype: 'near-melee',
  baseStats: {
    hp: 680,
    atk: 45,
    range: 70,
    attackSpeed: 0.85,
    crit: 0.10,
    critDamage: 1.50,
  },
  skillTriggerHits: 7,
  activeSkillId: 'pham-cu-lang-kich-tran-pha-lo',
  presentation: {
    skinId: 'skin-pham-cu-lang-default',
    animationSetId: 'anim-pham-cu-lang-spear',
  },
}

export const duongVanNga: HeroDefinition = {
  id: 'duong-van-nga',
  name: 'Dương Vân Nga',
  faction: 'tien-le',
  archetype: 'bow',
  baseStats: {
    hp: 380,
    atk: 38,
    range: 160,
    attackSpeed: 1.05,
    crit: 0.15,
    critDamage: 1.50,
  },
  skillTriggerHits: 6,
  activeSkillId: 'duong-van-nga-long-con-tran-quoc',
  presentation: {
    skinId: 'skin-duong-van-nga-default',
    animationSetId: 'anim-duong-van-nga-bow',
  },
}
```

---

### 3.2. Định Nghĩa 3 Kỹ Năng Tương Thích `SkillEffect[]` (`src/data/skills/`)

```ts
import type { SkillDefinition } from '../../domain/skills/SkillResolver'

export const khangTongSkills: Record<string, SkillDefinition> = {
  'le-hoan-tra-hang-tram-tuong': {
    id: 'le-hoan-tra-hang-tram-tuong',
    name: 'Trá Hàng Trảm Tướng',
    effects: [
      { type: 'aoe', radius: 80, maxTargets: 1 },
      { type: 'damage', atkMultiplier: 3.5 },
      { type: 'root', durationMs: 1500 },
    ],
  },
  'pham-cu-lang-kich-tran-pha-lo': {
    id: 'pham-cu-lang-kich-tran-pha-lo',
    name: 'Kích Trận Phá Lỗ',
    effects: [
      { type: 'aoe', radius: 125, maxTargets: 4 },
      { type: 'damage', atkMultiplier: 2.2 },
      { type: 'slow', ratio: 0.40, durationMs: 3000 },
    ],
  },
  'duong-van-nga-long-con-tran-quoc': {
    id: 'duong-van-nga-long-con-tran-quoc',
    name: 'Long Cổn Trấn Quốc',
    effects: [
      { type: 'multiHit', hits: 3, intervalMs: 140 },
      { type: 'damage', atkMultiplier: 1.2 },
      { type: 'slow', ratio: 0.35, durationMs: 2500 },
    ],
  },
}
```

---

### 3.3. Định Nghĩa Hệ Thống Kẻ Địch & Boss (`src/data/enemies/`)

```ts
import type { EnemyDefinition } from './definitions'

export const khangTongEnemies: Record<string, EnemyDefinition> = {
  'tong-bo-binh': {
    id: 'tong-bo-binh',
    name: 'Tống Bộ Binh',
    category: 'sword',
    maxHp: 160,
    moveSpeed: 75,
    cityDamage: 1,
    color: 0xdc2626,
  },
  'tong-cung-thu': {
    id: 'tong-cung-thu',
    name: 'Tống Nỏ Thủ',
    category: 'archer',
    maxHp: 100,
    moveSpeed: 95,
    cityDamage: 1,
    color: 0xea580c,
  },
  'tong-thuy-binh': {
    id: 'tong-thuy-binh',
    name: 'Tống Thủy Binh',
    category: 'other',
    maxHp: 280,
    moveSpeed: 115,
    cityDamage: 2,
    color: 0x9333ea,
  },
  'boss-hou-renbao': {
    id: 'boss-hou-renbao',
    name: 'Hầu Nhân Bảo',
    category: 'other',
    maxHp: 1500,
    moveSpeed: 60,
    cityDamage: 5,
    color: 0xf59e0b,
  },
}
```

---

### 3.4. Định Nghĩa Bản Đồ `map-kt-chi-lang-luc-dau-01` (`src/data/maps/`)

```ts
export const khangTongMap = {
  id: 'map-kt-chi-lang-luc-dau-01',
  name: 'Phòng Tuyến Chi Lăng — Lục Đầu Giang',
  width: 800,
  height: 600,
  grid: { columns: 10, rows: 8 },
  // Tuyến đường cố định duy nhất chuẩn MVP
  fixedPath: [
    { x: 0, y: 300 },   // Start (Cửa ải tiền tiêu)
    { x: 180, y: 300 }, // P1 (Bãi sậy)
    { x: 320, y: 300 }, // P2 (Choke point)
    { x: 520, y: 300 }, // P3 (Bãi cọc gỗ)
    { x: 800, y: 300 }, // End (Đại bản doanh)
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

* **RUNTIME EXTENSION REQUIRED FOR ARC-KT-01 MVP**: **`NONE`**.
  - Toàn bộ cơ chế chiến đấu của 3 Hero, 4 loại quái vật/boss, bản đồ single-path và 10 Wave đều ánh xạ hoàn hảo vào runtime hiện tại.
* **DEFERRED FUTURE REQUIREMENT**:
  - `Shared Legendary Passive System`: Khi hệ thống passive toàn game được triển khai, các hiệu ứng passive của Lê Hoàn, Phạm Cự Lạng và Dương Vân Nga sẽ được tích hợp mà không ảnh hưởng tới logic MVP ban đầu.
