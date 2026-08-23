# Huyền Sử TD — Project Plan

## Mục tiêu game

Tạo vertical slice Tower Defense Tam Quốc: Hero là tower mang hình tướng, đứng cố định, tự đánh single-target và tự dùng Skill sau N đòn. Enemy đi fixed path theo wave; React phụ trách UI, Phaser phụ trách Battle Scene, domain giữ combat/progression độc lập.

## WorkTree

- Repository: `HuyenSu-TD`
- Branch hiện tại: `main`
- Worktree hiện tại: `C:\Users\PC\Documents\Codex\2026-08-23\referenced-chatgpt-conversation-this-is-an\HuyenSu-TD`
- Quy tắc worker Antigravity: [ANTIGRAVITY_RULES.md](ANTIGRAVITY_RULES.md)

## Trạng thái hiện tại

- Current Phase: **5 — Hero Progression**
- Current Codex task: **P5-A — Progression Audit (chờ Progression UI hoặc quyết định bỏ UI khỏi checkpoint)**
- Current Antigravity task: **P5-04 — UI hỗ trợ Phase 5**; phạm vi dự kiến `src/ui/**`; branch/SHA chưa được báo.
- Lần kiểm tra gần nhất: worktree sạch trước khi worker bắt đầu thay đổi.

## Phases và checkpoint

| Phase | Task ID | Nội dung | Trạng thái | Worker chính | Audit checkpoint | Commit checkpoint |
|---|---|---|---|---|---|---|
| 0 | P0 | Game rules, schema, kiến trúc, repo, task board | DONE | Codex | Audit #1 | `foundation/game-design-v1` |
| 1 | P1 | React/Vite, Phaser, Game Clock, grid, fixed path, 1 enemy | DONE | Codex | Audit #2 | `prototype/enemy-path` |
| 2 | P2 | Placement, targeting, normal attack, crit, HP/death | DONE | Codex | Audit #3 | `core/tower-defense-loop-v1` |
| 3 | P3 | Wave manager, 3 enemy, 10 wave, counter, Win/Lose | DONE | Codex | Wave Audit | `core/wave-v1` |
| 4 | P4 | Attack Counter và Skill Effects dùng chung | DONE | Codex | Audit #4 | `core/skill-system-v1` |
| 5 | P5 | Level, cooldown, Rebirth, Reincarnation, Legendary, stat calculator, local save | IN PROGRESS | Codex | Progression Audit | `hero/progression-v1` |
| 6 | P6 | Weapon/Gem modifier và save equipment | TODO | Codex | Equipment Audit | `hero/equipment-v1` |
| 7 | P7 | Hero UI | TODO | Antigravity + Codex | UI Audit | `ui/hero-v1` |
| 8 | P8 | Battle HUD kết nối dữ liệu thật | TODO | Antigravity + Codex | HUD Audit | `ui/battle-v1` |

## Quy tắc cập nhật

- Codex kiểm tra `git status` trước và sau mỗi task/commit.
- Khi có task Antigravity, cập nhật ngay `Current Antigravity task` với Task ID, branch và phạm vi file được phép sửa.
- Mỗi task hoàn tất phải cập nhật trạng thái `DONE / IN PROGRESS / TODO`, audit checkpoint và commit checkpoint tương ứng.
- Nếu xuất hiện thay đổi không rõ nguồn gốc hoặc xung đột với worker rules, dừng phần bị ảnh hưởng và báo người điều phối.
