# Task Board

Trạng thái: `DONE`, `NEXT`, `BACKLOG`, `BLOCKED`.

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
| P2-01 | Hero data mẫu | Gemini Pro | Hero Designer | NEXT |
| P2-02 | Hero placement | Codex | Architect Skill | BACKLOG |
| P2-03 | Tile validation | Codex | — | BACKLOG |
| P2-04 | Range circle | Gemini Pro | Phaser | BACKLOG |
| P2-05 | Target selection | Codex | Auditor | BACKLOG |
| P2-06 | Normal Attack | Codex | Architect Skill | BACKLOG |
| P2-07 | Crit + Damage | Codex | Auditor | BACKLOG |
| P2-08 | Enemy HP + Death | Codex | — | BACKLOG |
| P2-09 | Attack animation hook | Codex | Phaser | BACKLOG |
| P2-10 | Object pooling | Codex | Auditor | BACKLOG |
| P2-11 | Combat tests | Codex | Auditor | BACKLOG |
| P2-A3 | Audit #3 | Codex Auditor | Architect Skill | BACKLOG |
