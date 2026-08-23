# Huyền Sử TD — Project Plan

## Mục tiêu game

Tạo vertical slice Tower Defense Tam Quốc: Hero là tower mang hình tướng, đứng cố định, tự đánh single-target và tự dùng Skill sau N đòn. Enemy đi fixed path theo wave; React phụ trách UI, Phaser phụ trách Battle Scene, domain giữ combat/progression độc lập.

## WorkTree

- Repository: `HuyenSu-TD`
- Branch hiện tại: `codex/p9-c02-multi-hero-placement`
- Worktree hiện tại: `C:\Users\PC\Documents\Codex\2026-08-23\referenced-chatgpt-conversation-this-is-an\HuyenSu-TD`
- Quy tắc worker Antigravity: [ANTIGRAVITY_RULES.md](ANTIGRAVITY_RULES.md)

## Trạng thái hiện tại

- Current Phase: **9 — MVP Vertical Slice**
- Current Codex task: **DONE: P9-C02 — Multi-Hero Placement & Runtime Reposition**.
- Current Antigravity task: **NONE — P9-A02 đã bàn giao và audit đạt; đang chờ task tiếp theo**.
- Lần kiểm tra gần nhất: P9-C02 đạt — triển khai đồng thời 5/5 Hero, reposition từng Hero giữa Wave, collision thu hồi Hero cũ về Deck, giữ skill charge khi di chuyển, x1/x3 ổn định, cooldown upgrade tắt qua feature flag, hoàn tất 10 Wave với 43 hạ/0 thoát; 34/34 tests, production build và preview đạt.

## Phases và checkpoint

| Phase | Task ID | Nội dung | Trạng thái | Worker chính | Audit checkpoint | Commit checkpoint |
|---|---|---|---|---|---|---|
| 0 | P0 | Game rules, schema, kiến trúc, repo, task board | DONE | Codex | Audit #1 | `foundation/game-design-v1` |
| 1 | P1 | React/Vite, Phaser, Game Clock, grid, fixed path, 1 enemy | DONE | Codex | Audit #2 | `prototype/enemy-path` |
| 2 | P2 | Placement, targeting, normal attack, crit, HP/death | DONE | Codex | Audit #3 | `core/tower-defense-loop-v1` |
| 3 | P3 | Wave manager, 3 enemy, 10 wave, counter, Win/Lose | DONE | Codex | Wave Audit | `core/wave-v1` |
| 4 | P4 | Attack Counter và Skill Effects dùng chung | DONE | Codex | Audit #4 | `core/skill-system-v1` |
| 5 | P5 | Level, cooldown, Rebirth, Reincarnation, Legendary, stat calculator, local save | DONE | Codex + Antigravity UI | Progression Audit | `hero/progression-v1` |
| 6 | P6 | Weapon/Gem modifier và save equipment | DONE | Codex | Equipment Audit | `hero/equipment-v1` |
| 7 | P7 | Hero UI | DONE | Antigravity + Codex | UI Audit | `ui/hero-v1` |
| 8 | P8 | Battle HUD kết nối dữ liệu thật | DONE | Antigravity + Codex | HUD Audit | `ui/battle-v1` |
| 9 | P9 | Vertical slice: 5 Hero, 3 Enemy, 10 Wave, 5–8 Skill, local save, x1/x3, Win/Lose | DONE | Codex + Antigravity content | Full Audit #5 — PASS | `v0.1.0-playable` |

## Phase 9 task tracker

| Task ID | Nội dung | Trạng thái | Worker chính | Audit checkpoint | Commit checkpoint |
|---|---|---|---|---|---|
| P9-01 | Tích hợp lựa chọn 5 Hero data-driven vào Bridge, HUD, Hero Detail và Battle Scene | DONE | Codex | 28/28 tests, build và UI interaction audit | `217a122` |
| P9-A01 | Chuẩn bị 5 Hero, 3 Enemy, 10 Wave, Skill combinations và asset checklist | DONE | Antigravity + Codex audit | Content/data contract audit | `cd43096` |
| P9-A02 | Bộ placeholder 5 portrait, 10 Hero sprite và 5 skill VFX | DONE | Antigravity + Codex audit | PNG/baseline audit, 28/28 tests và build | `169a88d`, `ef6bd59` |
| P9-02 | Audit toàn bộ MVP Vertical Slice và xác nhận playable checkpoint | DONE | Codex | Full Audit #5: 5 Hero, 10 Wave, x1/x3, HUD, architecture, test/build | `v0.1.0-playable` |
| P9-C02 | Multi-Hero Placement, runtime reposition và cấu hình upgrade cooldown | DONE | Codex | 5 Hero/reposition/skill/x1-x3/10 Wave/cooldown/test/build/preview — PASS | Chờ audit/merge |

## Quy tắc cập nhật

- Codex kiểm tra `git status` trước và sau mỗi task/commit.
- Khi có task Antigravity, cập nhật ngay `Current Antigravity task` với Task ID, branch và phạm vi file được phép sửa.
- Mỗi task hoàn tất phải cập nhật trạng thái `DONE / IN PROGRESS / TODO`, audit checkpoint và commit checkpoint tương ứng.
- Nếu xuất hiện thay đổi không rõ nguồn gốc hoặc xung đột với worker rules, dừng phần bị ảnh hưởng và báo người điều phối.
