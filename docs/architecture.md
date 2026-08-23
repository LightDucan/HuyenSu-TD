# Kiến trúc V1

## Mục tiêu

Giữ Combat Core nhỏ, kiểm thử được và data-driven; skin, VFX và UI có thể thay đổi mà không sửa luật chiến đấu.

## Ranh giới runtime

```text
React UI
  ↕ discrete commands / state snapshots
React–Phaser Bridge
  ↕ domain events
Phaser Battle Scene
  ↕ render adapters
Domain: clock, targeting, combat, skills, waves
  ↕ validated definitions
Hero / Enemy / Wave / Map / Skill Data
```

### React

Sở hữu menu, Hero detail, equipment, progression và Battle HUD. Chỉ nhận dữ liệu cần hiển thị theo event/snapshot; không đọc trực tiếp Phaser object.

### Phaser

Sở hữu scene, camera, input trên map, sprite, animation, VFX và object pool. Phaser không quyết định schema progression hoặc chứa code riêng cho từng Hero.

### Domain

Các module thuần TypeScript dự kiến gồm Game Clock, Target System, Normal Attack, Damage System, Attack Counter, Skill Effects, Wave Manager và stat calculator. Domain không import React hoặc Phaser.

## Cấu trúc thư mục mục tiêu

```text
src/
  app/                 React shell và routing
  ui/                  React screens/components
  game/
    bridge/            Command/event bridge
    scenes/            Phaser scenes
    rendering/         Sprite/VFX adapters và pools
  domain/
    clock/
    combat/
    skills/
    waves/
    progression/
  data/
    heroes/
    enemies/
    skills/
    waves/
    maps/
  shared/              Types/utilities thật sự dùng chung
tests/
  unit/
  integration/
public/
  assets/
docs/
```

Chỉ tạo thư mục khi có file thật thuộc phase đang làm; không tạo placeholder rỗng.

## Luồng combat

```text
Game Clock tick
  → chọn mục tiêu trong range
  → resolve normal attack
  → resolve crit và damage
  → tăng Attack Counter
  → đủ skillTriggerHits?
      → resolve danh sách Skill Effects
      → reset counter
```

## Quy tắc phụ thuộc

- `domain` không phụ thuộc `game`, `ui`, React hoặc Phaser.
- `data` tuân schema và chỉ tham chiếu ID ổn định.
- `game` chuyển trạng thái domain thành hình ảnh và input thành command.
- `ui` giao tiếp với battle qua bridge, không điều khiển scene object trực tiếp.
- Tất cả timer Battle lấy thời gian từ Game Clock để x1/x3 hoạt động nhất quán.
