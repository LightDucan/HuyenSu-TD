# Audit P9-C03 — Refresh Placed Hero Runtime Stats

## Kết luận

**PASS — sẵn sàng để audit độc lập; chưa merge `main`.**

Hero đang được đặt nhận lại Progression và Equipment mới ngay qua một command dùng chung của `BattleBridge`. React chỉ lưu dữ liệu và phát `heroId`; BattleScene tiếp tục giữ ownership của runtime/combat truth.

## Kiến trúc đã kiểm tra

- `BattleBridge.refreshPlacedHeroStats(heroId)` phát command dùng chung và hỗ trợ hủy đăng ký listener.
- App dùng cùng hai action lưu-and-refresh cho Upgrade/Advance Stage và Equip/Unequip.
- BattleScene xử lý Hero chưa đặt bằng no-op, không đọc save và không phát sinh lỗi.
- Với Hero đã đặt, BattleScene đọc Progression + Equipment mới nhất và dùng `calculateHeroLoadoutStats` hiện có.
- Runtime được cập nhật tại chỗ: stats của Hero, stats của `CombatController` và bán kính range visual.
- Không tạo lại `CombatController`; attack cooldown, `AttackCounter`/skill charge, position và trạng thái battle được giữ nguyên.
- Không có Hero-specific combat code, A*, dependency mới, roster change hoặc file deletion.
- Upgrade cooldown mặc định vẫn disabled; implementation enabled mode và tests cũ được giữ nguyên.

## Test matrix

| Hạng mục | Kết quả | Bằng chứng |
|---|---|---|
| Refresh ATK đổi damage đòn kế tiếp | PASS | Unit test `CombatController` |
| Refresh Range đổi khả năng bắt mục tiêu | PASS | Unit test `CombatController` |
| AttackSpeed mới áp dụng từ chu kỳ kế tiếp | PASS | Unit test giữ chu kỳ hiện tại 1000 ms, chu kỳ sau 500 ms |
| Attack cooldown không reset | PASS | Unit test không cho đánh ở 999 ms sau refresh |
| Skill charge không reset | PASS | Unit test giữ charge 1/3 qua refresh |
| Hero chưa đặt refresh an toàn | PASS | Unit test không gọi calculator; preview nâng cấp Triệu Vân khi chưa đặt không có console error |
| Upgrade/Advance phát đúng `heroId` | PASS | Unit test persistence/refresh port |
| Equip/Unequip phát đúng `heroId` | PASS | Unit test persistence/refresh port; preview lắp/gỡ Weapon và Gem |
| Reposition sau refresh | PASS | Preview nâng cấp Hoàng Trung rồi di chuyển trong Wave |
| Đặt đồng thời 5 Hero | PASS | Preview hiển thị 5/5 Hero |
| x1/x3 | PASS | Trận bắt đầu x1, chuyển x3 active và tiếp tục ổn định |
| 10 Wave | PASS | Preview thắng Wave 10, 43 hạ, 0 thoát, thành HP 10 |
| Cooldown mặc định disabled | PASS | Feature flag hiện tại + test enabled/disabled hiện có; UI không hiển thị/chặn cooldown |
| `npm test` | PASS | 10 files, 43/43 tests |
| `npm run build` | PASS | TypeScript + Vite production build |
| `npm run preview` | PASS | Vite preview tại `127.0.0.1:4173`, audit interaction hoàn tất |
| `git diff --check` | PASS | Không có whitespace error |

## Files và phạm vi

### Created

- `src/game/runtime/PlacedHeroRuntimeStats.ts`
- `src/ui/HeroRuntimeRefreshActions.ts`
- `tests/unit/runtimeStatsRefresh.test.ts`
- `docs/audits/audit-p9-c03-runtime-stats.md`

### Modified

- `src/domain/combat/CombatController.ts`
- `src/game/bridge/BattleBridge.ts`
- `src/game/scenes/BattleScene.ts`
- `src/ui/App.tsx`
- `tests/unit/combat.test.ts`
- `docs/PROJECT_PLAN.md`

### Deleted / dependencies

- Files deleted: **NONE**
- Dependencies added: **NONE**

## Risks

- HP được tính lại và lưu trong runtime stats nhưng vẫn chỉ phục vụ hiển thị/contract, đúng scope hiện tại; enemy chưa đánh Hero.
- Vite tiếp tục cảnh báo bundle JavaScript lớn hơn 500 kB do Phaser/bundle hiện tại. Đây là warning có sẵn, không làm build fail và không thuộc scope P9-C03.
- Audit preview xác minh hành vi UI/runtime và không có console error; các giá trị nội bộ cooldown/skill charge được khóa bằng unit tests deterministic.
