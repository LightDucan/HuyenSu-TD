# Audit P12-C02 — Wave Energy Gate & Auto Wave

## Kết luận

**PASS — chờ technical audit trước khi merge.**

P12-C02 nối Wave start với P12-C01 Command Energy qua một runtime controller dùng chung. Manual và Auto Wave không có đường spend riêng; React chỉ phát request/hiển thị snapshot, Phaser chỉ nhận approval và không đọc/ghi Meta save.

## Phạm vi triển khai

- `WaveManager` có lifecycle `waiting → running → waiting/won` và không spawn khi đang chờ.
- `BattleBridge` truyền Wave request/decision, Auto toggle, Battle snapshot và read-only Command Energy snapshot.
- `CommandEnergyRuntimeController` kiểm tra Battle/Hero eligibility, resolve/spend qua `LocalMetaRepository`, chống double spend theo `runId + waveNumber`, và dùng `Date.now()` cho refresh.
- `BattleScene` chỉ bắt đầu Wave sau approval đúng run/wave.
- HUD tối thiểu hiển thị `Quân Lệnh current / cap`, Start Wave và Auto Wave ON/OFF.

## Audit luật bắt buộc

- Mỗi Wave tốn đúng `COMMAND_ENERGY_WAVE_COST = 1`.
- Manual và Auto dùng cùng `attemptWaveStart` transaction path.
- Initial Wave 1 ở `waiting`; `update()` không spawn trước approval.
- Wave hoàn tất chuyển Wave kế tiếp sang `waiting`, không tự chạy.
- Không Hero: reject trước Meta transaction, không spend.
- Không đủ Quân Lệnh: giữ `waiting`, không tắt Auto.
- Auto refresh dùng persisted anchor + real wall clock; interval chỉ là trigger.
- x1/x3 không tham gia phép tính Quân Lệnh hoặc Auto eligibility time.
- Reposition chỉ cập nhật placement snapshot, không phát Wave spend.
- Double click, duplicate request và manual/auto race chỉ có một approval/spend cho mỗi `runId + waveNumber`.
- 10 Wave từ 60 còn 50 khi không regen/grant.
- Stage victory reward vẫn idempotent.

## Ownership và schema

- React không sở hữu Command Energy truth.
- Phaser không truy cập Meta localStorage.
- Meta Repository là write boundary; optimistic revision vẫn được giữ.
- Meta schema giữ nguyên V3; không thêm persistence key.
- Wallet vẫn chỉ gồm Gold và KNB; Command Energy là resource riêng.
- Không sửa Hero combat rules, fixed path hoặc thêm A*.

## Ngoài phạm vi được giữ nguyên

Không triển khai Binh Phù/UI Binh Phù, Player Level cap formula, Deployment Capacity, Shop, Gacha hoặc Equipment V2.

## Verification

- `npm test`: PASS — 16 files, 103 tests.
- `npm run build`: PASS.
- `npm run preview`: PASS — HTTP 200.
- `git diff --check`: PASS.

Vite vẫn cảnh báo bundle lớn như checkpoint trước; P12-C02 không làm thay đổi quyết định bundle hiện tại.

## Rủi ro còn lại

- Browser interval có thể bị throttle khi tab ẩn, nhưng lần trigger kế tiếp dùng `Date.now()` và persisted anchor nên không mất elapsed time.
- Auto Wave hiện chỉ tự bắt đầu Wave; không tự đặt Hero theo đúng contract.
- Binh Phù consumption và các capacity/economy extension thuộc checkpoint sau.
