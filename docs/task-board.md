# Task Board

Trạng thái: `DONE`, `NEXT`, `BACKLOG`, `DEFERRED`, `BLOCKED`.

## Phase 0 — Khóa thiết kế

| ID | Task | Worker chính | Hỗ trợ | Trạng thái |
|---|---|---|---|---|
| P0-01 | Game Rules V1 | Gemini Pro | Architect Skill | DONE |
| P0-02 | Hero/Skill Schema | Codex | Architect Skill | DONE |
| P0-03 | Enemy/Wave/Map Schema | Codex | Architect Skill | DONE |
| P0-04 | Chốt cấu trúc folder | Codex | Architect Skill | DONE |
| P0-05 | Tạo và kết nối GitHub repo | User + Codex | GitHub | DONE |
| P0-06 | README + Task Board | Codex | GitHub | DONE |
| P0-A1 | Audit #1 | Codex Auditor | Architect Skill | DONE |

## Phase 1 — Technical Prototype

| ID | Task | Worker chính | Hỗ trợ | Trạng thái |
|---|---|---|---|---|
| P1-01 | React + TypeScript + Vite | Codex | — | DONE |
| P1-02 | Phaser integration | Codex | — | DONE |
| P1-03 | React–Phaser Bridge | Codex | Architect Skill | DONE |
| P1-04 | Game Clock x1/x3-ready | Codex | Auditor | DONE |
| P1-05 | Battle Scene | Codex | Phaser | DONE |
| P1-06 | Map background prototype | Gemini Pro | Asset tools | DONE |
| P1-07 | Grid 12×10 | Codex | — | DONE |
| P1-08 | Fixed Path | Codex | Architect Skill | DONE |
| P1-09 | Enemy spawn | Codex | — | DONE |
| P1-10 | Enemy movement | Codex | — | DONE |
| P1-11 | Responsive 1024×768 | Gemini Pro | Figma | DONE |
| P1-A2 | Audit #2 | Codex Auditor | Architect Skill | DONE |

## Checkpoint sau Phase 1

Prototype đạt khi một enemy xuất hiện, đi hết fixed path và Battle Scene không khiến React render theo từng frame. Sau Audit #2 mới tạo checkpoint `prototype/enemy-path`.

## Phase 2 — Tower Defense Core

| ID | Task | Worker chính | Hỗ trợ | Trạng thái |
|---|---|---|---|---|
| P2-01 | Hero data mẫu | Gemini Pro | Hero Designer | DONE |
| P2-02 | Hero placement | Codex | Architect Skill | DONE |
| P2-03 | Tile validation | Codex | — | DONE |
| P2-04 | Range circle | Gemini Pro | Phaser | DONE |
| P2-05 | Target selection | Codex | Auditor | DONE |
| P2-06 | Normal Attack | Codex | Architect Skill | DONE |
| P2-07 | Crit + Damage | Codex | Auditor | DONE |
| P2-08 | Enemy HP + Death | Codex | — | DONE |
| P2-09 | Attack animation hook | Codex | Phaser | DONE |
| P2-10 | Object pooling | Codex | Auditor | DEFERRED |
| P2-11 | Combat tests | Codex | Auditor | DONE |
| P2-A3 | Audit #3 | Codex Auditor | Architect Skill | DONE |

Object pooling được hoãn có chủ đích: Phase 2 hiện chỉ có một enemy và không tạo projectile object. Pool sẽ được thêm khi Wave/VFX tạo object lặp lại; thêm ngay lúc này không tạo lợi ích đo được.

## Phase 3 — Wave

| ID | Task | Worker chính | Hỗ trợ | Trạng thái |
|---|---|---|---|---|
| P3-01 | Wave Manager | Codex | Architect Skill | DONE |
| P3-02 | Spawn groups | Codex | Auditor | DONE |
| P3-03 | Counter enemy theo loại | Gemini Pro | React UI | DONE |
| P3-04 | Ba enemy mẫu | Gemini Pro | Data Contract | DONE |
| P3-05 | 10 wave test | Codex | Auditor | DONE |
| P3-06 | Win/Lose | Codex | React UI | DONE |
| P3-A | Wave Audit | Codex Auditor | Architect Skill | DONE |

## Phase 4 — Hero Skill

| ID | Task | Worker chính | Hỗ trợ | Trạng thái |
|---|---|---|---|---|
| P4-01 | Attack Counter | Codex | Architect Skill | DONE |
| P4-02 | Trigger 3/5/7/10 data-driven | Codex | Auditor | DONE |
| P4-03 | Skill Effect framework | Codex | Architect Skill | DONE |
| P4-04 | Damage/AoE/Slow/Stun/Root/MultiHit | Codex | Auditor | DONE |
| P4-05 | Skill data templates | Gemini Pro | Hero Designer | DONE |
| P4-A4 | Audit #4 | Codex Auditor | Architect Skill | DONE |

## Phase 5 — Hero Progression

| ID | Task | Worker chính | Hỗ trợ | Trạng thái |
|---|---|---|---|---|
| P5-01 | Level 1–100 + cooldown | Codex | Architect Skill | DONE |
| P5-02 | Trùng Sinh / Tái Sinh / Huyền Sử state | Codex | Auditor | DONE |
| P5-03 | Stat calculator | Codex | Auditor | DONE |
| P5-04 | Progression UI | Antigravity | UI task riêng | BACKLOG |
| P5-05 | Local save progression | Codex | Auditor | BACKLOG |
| P5-A | Progression Audit | Codex Auditor | Architect Skill | BACKLOG |
