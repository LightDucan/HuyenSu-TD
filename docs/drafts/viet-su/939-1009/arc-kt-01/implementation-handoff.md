# Hướng Dẫn Chuyển Giao Triển Khai Kỹ Thuật: ARC-KT-01 (Implementation Handoff for Codex)

**Mã Chapter**: `ARC-KT-01`
**Tài liệu**: `docs/drafts/viet-su/939-1009/arc-kt-01/implementation-handoff.md`
**Đối tượng bàn giao**: Codex / Runtime Implementation Engineer
**Trạng thái**: Ready for Direct Data/Runtime Implementation

---

## 1. Bảng Đối Chiếu Ánh Xạ Hệ Thống (System Mapping Table)

Toàn bộ nội dung của Chapter `ARC-KT-01` được thiết kế để **tương thích 100% với Runtime hiện có của dự án Huyền Sử TD**, không yêu cầu tạo thêm hệ thống phụ (subsystem) mới:

| Thành Phần Nội Dung (CONTENT) | Hệ Thống Tiếp Nhận (EXISTING SYSTEM) | Cấu Trúc Dữ Liệu Yêu Cầu (REQUIRED DATA) | Tác Động Runtime (RUNTIME IMPACT) |
|---|---|---|:---:|
| **3 Hero Playable** (`le-hoan`, `pham-cu-lang`, `duong-van-nga`) | `src/data/heroes/definitions.ts` | `HeroDefinition` (id, name, baseStats, skillTriggerHits, activeSkillId) | **None** (Tái sử dụng 100% `CombatController`) |
| **3 Active Skills** (`le-hoan-active`, `pham-cu-lang-active`, `duong-van-nga-active`) | `src/data/skills/definitions.ts` & `src/domain/skills/SkillResolver.ts` | `SkillDefinition` (id, name, damageMultiplier, radius, slow, immobilize) | **None** (Tái sử dụng bộ giải quyết hiệu ứng `resolveSkill`) |
| **3 Quái Vật Thường** (`tong-bo-binh`, `tong-cung-thu`, `tong-chien-thuyen`) | `src/data/enemies/definitions.ts` | `EnemyDefinition` (id, name, maxHp, moveSpeed, cityDamage, category, color) | **None** (Tái sử dụng cơ chế di chuyển và nhận sát thương) |
| **1 Trùm Cuối (Boss)** (`boss-hou-renbao`) | `src/data/enemies/definitions.ts` | `EnemyDefinition` (id, name, maxHp: 1500, moveSpeed: 60, cityDamage: 5, category: 'other', color: 0xf59e0b) | **None** (Hiển thị quy mô lớn hơn $1.4\times$ qua visual container) |
| **10 Wave Trận Đấu** | `src/data/waves/` (Tạo file dữ liệu `khangTongWaves.ts`) | `readonly WaveDefinition[]` | **None** (Tương thích trực tiếp với `WaveManager`) |
| **Bản Đồ Chiến Trường TD** | `src/data/maps/` (Tạo file dữ liệu `khangTongMap.ts`) | `MapDefinition` (grid, fixedPath, placementTiles) | **None** (Tương thích với renderer của `BattleScene.ts`) |
| **Tên Màn & Định Danh** | `src/game/bridge/BattleBridge.ts` / Stage Registry | `stageId: 'stage-kt-981-dai-thang-01'` | **None** |

---

## 2. Đặc Tả Dữ Liệu TypeScript Mẫu Cho Codex (Data Implementation Blueprints)

### 2.1. Định Nghĩa 3 Tướng Playable (`src/data/heroes/`)

```ts
import type { HeroDefinition } from './definitions'

export const leHoan: HeroDefinition = {
  id: 'le-hoan',
  name: 'Lê Hoàn',
  title: 'Lê Đại Hành Hoàng Đế',
  baseStats: {
    hp: 550,
    atk: 58,
    range: 80,
    attackSpeed: 1.25,
    critChance: 0.20,
    critDamage: 1.80,
  },
  skillTriggerHits: 5,
  activeSkillId: 'le-hoan-tra-hang-tram-tuong',
}

export const phamCuLang: HeroDefinition = {
  id: 'pham-cu-lang',
  name: 'Phạm Cự Lạng',
  title: 'Điện Tiền Đô Chỉ Huy Sứ',
  baseStats: {
    hp: 680,
    atk: 45,
    range: 70,
    attackSpeed: 0.85,
    critChance: 0.10,
    critDamage: 1.50,
  },
  skillTriggerHits: 7,
  activeSkillId: 'pham-cu-lang-kich-tran-pha-lo',
}

export const duongVanNga: HeroDefinition = {
  id: 'duong-van-nga',
  name: 'Dương Vân Nga',
  title: 'Thái Hậu Long Cổn',
  baseStats: {
    hp: 380,
    atk: 38,
    range: 160,
    attackSpeed: 1.05,
    critChance: 0.15,
    critDamage: 1.50,
  },
  skillTriggerHits: 6,
  activeSkillId: 'duong-van-nga-long-con-tran-quoc',
}
```

---

### 2.2. Định Nghĩa 3 Kỹ Năng Tương Thích `resolveSkill` (`src/data/skills/`)

```ts
import type { SkillDefinition } from './definitions'

export const khangTongSkills: Record<string, SkillDefinition> = {
  'le-hoan-tra-hang-tram-tuong': {
    id: 'le-hoan-tra-hang-tram-tuong',
    name: 'Trá Hàng Trảm Tướng',
    description: 'Chém đòn chí mạng dồn sát thương cực lớn lên kẻ địch có HP cao nhất và làm bất động mục tiêu.',
    damageMultiplier: 3.5,
    radius: 0, // Đơn mục tiêu bộc phá
    immobilizeDurationMs: 1500,
  },
  'pham-cu-lang-kich-tran-pha-lo': {
    id: 'pham-cu-lang-kich-tran-pha-lo',
    name: 'Kích Trận Phá Lỗ',
    description: 'Dộng thiết kích tạo sóng chấn động gây sát thương diện rộng và làm chậm kẻ địch.',
    damageMultiplier: 2.2,
    radius: 125,
    slow: {
      ratio: 0.40,
      durationMs: 3000,
    },
  },
  'duong-van-nga-long-con-tran-quoc': {
    id: 'duong-van-nga-long-con-tran-quoc',
    name: 'Long Cổn Trấn Quốc',
    description: 'Bắn loạt tên lệnh linh thiêng trút xuống khu vực chỉ định gây sát thương diện rộng và làm chậm.',
    damageMultiplier: 1.75,
    radius: 145,
    slow: {
      ratio: 0.35,
      durationMs: 2500,
    },
  },
}
```

---

### 2.3. Định Nghĩa Hệ Thống Kẻ Địch & Boss (`src/data/enemies/`)

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
  'tong-chien-thuyen': {
    id: 'tong-chien-thuyen',
    name: 'Chiến Thuyền Tống Quân',
    category: 'other',
    maxHp: 300,
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

### 2.4. Định Nghĩa Bản Đồ `map-kt-chi-lang-luc-dau-01` (`src/data/maps/`)

```ts
export const khangTongMap = {
  id: 'map-kt-chi-lang-luc-dau-01',
  name: 'Phòng Tuyến Chi Lăng — Lục Đầu Giang',
  width: 800,
  height: 600,
  grid: { columns: 10, rows: 8 },
  // Tuyến đường hợp lưu chính
  fixedPath: [
    { x: 0, y: 300 },   // Start
    { x: 180, y: 300 }, // P1
    { x: 320, y: 300 }, // P3 (Choke point)
    { x: 520, y: 300 }, // P4 (Bãi cọc gỗ)
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

## 3. Khẳng Định Ràng Buộc Engine (Engine Constraint Verification)

* **Yêu Cầu Mở Rộng Runtime (RUNTIME EXTENSION REQUIRED)**: **`NONE`**.
  - Không cần sửa đổi kiến trúc `CombatController` hay `resolveSkill`.
  - Toàn bộ cơ chế sát thương bộc phá đơn mục tiêu, sóng chấn động làm chậm và trút mưa tên diện rộng đều nằm gọn trong các trường dữ liệu hiện hữu (`damageMultiplier`, `radius`, `slow`, `immobilizeDurationMs`).
* **Lưu ý triển khai cho Codex**:
  - Không tự ý thêm chỉ số phòng thủ (DEF) hay thanh nội lực/mana.
  - Sau khi các file dữ liệu data được nạp vào stage registry, Màn chơi có thể vận hành trơn tru ngay trên khung Battle HUD V1 hiện tại.
