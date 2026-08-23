# Battle HUD Contract

## Mục tiêu

Battle HUD là React UI. Nó chỉ nhận snapshot rời rạc đã được Phaser phát qua `BattleBridge`; không import `BattleScene`, không đọc Phaser object và không chạy combat logic.

## Data source

`BattleScene` → `BattleBridge.emitSnapshot()` → `App` state → `toBattleHudData(snapshot)` → `BattleHud` props.

Contract code: `src/game/bridge/BattleHudContract.ts`.

## `BattleHudData`

| Field | Ý nghĩa | Nguồn |
|---|---|---|
| `speed` | Tốc độ x1/x3 hiện hành | `GameClock` qua Bridge |
| `wave`, `totalWaves` | Tiến độ wave | `WaveManager` |
| `cityHp` | HP Thành hiện tại | Battle Scene |
| `battleStatus` | `running`, `won`, `lost` | Battle Scene |
| `heroPlaced` | Hero đã được đặt hay chưa | Battle Scene |
| `selectedHeroId` | Hero đang được chọn/đã triển khai | Battle Bridge + Battle Scene |
| `enemiesDefeated`, `enemiesEscaped` | Bộ đếm kết quả | Battle Scene |
| `remainingByCategory` | Số sword/archer/other đang active | Enemy state snapshot |

## Quy tắc cho Antigravity

- `BattleHud` chỉ nhận `data: BattleHudData` và callback speed nếu task yêu cầu.
- Không import `BattleScene`, `CombatController`, `GameClock`, `WaveManager`, local storage hoặc data combat trực tiếp.
- Không tính lại wave, enemy count, city HP hay trạng thái Win/Lose trong UI.
- UI gửi yêu cầu chọn Hero qua `BattleBridge.setSelectedHeroId`; Scene vẫn là nơi chốt Hero khi placement.
- Chỉ dùng các field trong contract; nếu thiếu field, báo Codex bổ sung Bridge contract.
- Không thêm gameplay, dependency hoặc sửa `src/game/**`.

## UI states phải thể hiện

- Trước khi đặt Hero: `heroPlaced = false`.
- Đang chiến đấu: `battleStatus = running`.
- Chiến thắng: `battleStatus = won`.
- Thất bại: `battleStatus = lost`.
