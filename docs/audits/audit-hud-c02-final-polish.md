# HUD-C02 — Combat HUD Final Polish & Inventory Boundary Audit

## Kết quả

**PASS — chờ final audit/merge.** HUD V1 giữ nguyên ownership của Battle/Meta runtime; task chỉ thay composition và presentation của combat HUD.

## Acceptance Gate

| Gate | Kết quả | Bằng chứng |
|---|---|---|
| ĐỘI HÌNH ↔ HÀNH TRANG hoạt động | PASS | Hai tab chung một bottom HUD container; chuyển tab không remount canvas. |
| Battle state không reset | PASS | Cùng canvas và cùng battle state giữ deployment, Wave, speed, Auto Wave, Wallet và Quân Lệnh khi đổi tab. |
| Hành Trang không còn Gacha/Shop/Recruitment | PASS | `App.tsx` chỉ compose `EquipmentInventoryPanel`; `EconomyPanel` và runtime liên quan không bị xóa hoặc sửa. |
| Persistent combat controls | PASS | Quân Lệnh, deployment count, Start Wave, Auto Wave, x1/x3 và Chi Tiết Tướng hiện ở cả hai tab. |
| Equip/Unequip khóa khi Wave running | PASS | Lock notice và disabled actions dùng shared Wave state hiện có. |
| Merge vẫn hoạt động khi Wave running | PASS | `MetaTabState`/Equipment operation policy không đổi; `merge` vẫn được phép. |
| Only selected Hero range | PASS | Selected-only và default OFF giữ nguyên; move mode vẫn hiện range Hero active. |
| Range visual bớt chói | PASS | Stroke `1.5px`, alpha `0.35`; fill alpha `0.04`. |
| Placement tile polish | PASS | Amber/gold marker; selected origin dùng stronger border/fill. |
| Top HUD ba vùng | PASS | LEFT Map + Thành HP; CENTER Đợt X/Y; RIGHT Vàng/KNB + Quái còn lại. |
| No-scroll 1920×1080 | PASS | body `1920×1080`; top `89.25`, battlefield `780.58`, bottom HUD `144.25`. |
| No-scroll 1600×900 | PASS | body `1600×900`; top `86.38`, battlefield `613.44`, bottom HUD `141.38`. |
| No-scroll 1366×768 | PASS | body `1366×768`; top `84.28`, battlefield `519.80`, bottom HUD `111.25`; inventory dùng vùng scroll nội bộ khi cần. |

Battlefield là vùng lớn nhất ở cả ba viewport. Không có document-level vertical/horizontal scroll và không có uncaught console error trong interactive preview.

## Interactive evidence

- [Đội Hình — waiting](evidence/hud-c02/roster-waiting.png)
- [Hành Trang — waiting](evidence/hud-c02/inventory-waiting.png)
- [Hành Trang — Wave running](evidence/hud-c02/inventory-running.png)

Observed cùng một battle session:

- Waiting: 1 Hero deployed, Quân Lệnh `60/60`, Wave `1/10`.
- Inventory waiting: không có Gacha/Shop/Recruitment và không có equipment lock.
- Inventory running: Quân Lệnh `59/60`, Wave `1/10`, enemy counter live, equipment lock hiển thị, combat controls vẫn tồn tại.

## Architecture boundary

- Không sửa Economy runtime, Equipment math/balance, Hero progression, Recruitment rules, CombatController, Wave balance, HBT production art hoặc Meta schema.
- Không copy combat truth sang HUD state; tab tiếp tục là presentation state.
- Không xóa `EconomyPanel`; chỉ bỏ nó khỏi combat inventory composition.
- Không đổi selection safety: click deployed Hero chỉ select, explicit DI CHUYỂN mới vào move mode, click nền clear placement/move intent nhưng không clear selected Hero.

## Verification

- `npm test`: PASS — 27 files / 201 tests.
- `npm run build`: PASS.
- Production preview + interactive browser QA: PASS.
- `git diff --check`: PASS.
