# Huyền Sử TD — Project Plan

## Mục tiêu game

Tạo vertical slice Tower Defense Tam Quốc: Hero là tower mang hình tướng, đứng cố định, tự đánh single-target và tự dùng Skill sau N đòn. Enemy đi fixed path theo wave; React phụ trách UI, Phaser phụ trách Battle Scene, domain giữ combat/progression độc lập.

## WorkTree

- Repository: `HuyenSu-TD`
- Branch hiện tại: `main`
- Worktree hiện tại: `C:\Users\PC\Documents\Codex\2026-08-23\referenced-chatgpt-conversation-this-is-an\HuyenSu-TD`
- Quy tắc worker Antigravity: [ANTIGRAVITY_RULES.md](ANTIGRAVITY_RULES.md)

## Trạng thái hiện tại

- Current Phase: **9 — MVP Vertical Slice**
- Current Codex task: **P9-01 — Tích hợp MVP content vào luồng chơi và chuẩn bị Full Audit #5**.
- Current Antigravity task: **NONE** — P8-A01 Battle HUD và P9-A01 MVP Content Preparation đã audit và merge.
- Lần kiểm tra gần nhất: P8/P9 đạt 27/27 tests, production build và UI interaction audit; không có dependency mới.

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
| 9 | P9 | Vertical slice: 5 Hero, 3 Enemy, 10 Wave, 5–8 Skill, local save, x1/x3, Win/Lose | IN PROGRESS | Codex + Antigravity content | Full Audit #5 | `v0.1.0-playable` |

## Quy tắc cập nhật

- Codex kiểm tra `git status` trước và sau mỗi task/commit.
- Khi có task Antigravity, cập nhật ngay `Current Antigravity task` với Task ID, branch và phạm vi file được phép sửa.
- Mỗi task hoàn tất phải cập nhật trạng thái `DONE / IN PROGRESS / TODO`, audit checkpoint và commit checkpoint tương ứng.
- Nếu xuất hiện thay đổi không rõ nguồn gốc hoặc xung đột với worker rules, dừng phần bị ảnh hưởng và báo người điều phối.
