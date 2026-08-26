# Audit P12-C01 — Command Energy Domain & Persistence

## Kết luận

**PASS — chờ technical audit trước khi merge.**

P12-C01 triển khai Quân Lệnh bằng pure domain functions và `LocalMetaRepository`; không đưa ownership sang React/Phaser, không nối Wave deduction hoặc Auto Wave, và không thay Meta schema V3.

## Phạm vi thay đổi

- `src/domain/meta/CommandEnergy.ts`: shared resolve/spend/grant domain boundary.
- `src/domain/meta/MetaRepository.ts`: persistence operations dùng save hiện tại và optimistic revision.
- `tests/unit/CommandEnergy.test.ts`: domain, persistence, reload, clock và Wallet boundary tests.
- `docs/PROJECT_PLAN.md`: trạng thái P12-C01.

## Luật đã kiểm chứng

- Base cap khóa ở `60`.
- Natural regen là `+1` mỗi `120,000` real milliseconds.
- State ở cap hoặc overflow không regen, không tích lũy ngầm và không bank elapsed time.
- External grant được phép vượt cap.
- Khi spend làm state từ `>= cap` xuống `< cap`, anchor bắt đầu lại tại timestamp spend.
- Dưới cap giữ phần thời gian lẻ qua `regenAnchorAtMs`; khi chạm cap thì bỏ elapsed dư.
- Insufficient spend và clock đi lùi không ghi save.
- Clock đi lùi trả kết quả `invalid-clock` rõ ràng.
- Save/reload cho kết quả deterministic.
- Tất cả commit Command Energy đi qua Meta Repository và giữ optimistic revision.
- Wallet vẫn chỉ có `gold` và `knb`; Command Energy là resource riêng.
- API không nhận Battle speed, nên x1/x3 không thể ảnh hưởng phép tính.

## Architecture audit

- Meta schema: giữ nguyên V3; không migration hoặc storage key mới.
- Source of truth: `MetaState.commandEnergy.current` và `regenAnchorAtMs`.
- React/Phaser/Battle Core: không sửa.
- Auto Wave, Wave deduction, Binh Phù UI, Player Level cap formula, Deployment Capacity, Shop và Gacha: không triển khai.
- Hero/combat invariants: không thay đổi.

## Verification

- `npm test`: PASS — 15 files, 96 tests.
- `npm run build`: PASS.
- `npm run preview`: PASS — HTTP 200 tại local preview.
- `git diff --check`: PASS.

Vite tiếp tục báo cảnh báo chunk lớn đã tồn tại; đây không phải regression của P12-C01 và không chặn task domain-only này.

## Rủi ro còn lại

- Player Level cap formula vẫn OPEN theo contract.
- Wave cost `1` mới là constant/domain rule; Wave runtime deduction và Auto Wave thuộc task sau.
- Chính sách chống thao túng system clock ngoài trường hợp clock đi lùi chưa thuộc phạm vi task này.
