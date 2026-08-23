# Huyền Sử TD

Huyền Sử TD là game tower defense chủ đề Tam Quốc. Mỗi Hero là một trụ đứng yên có hình dáng tướng; sự đa dạng đến từ chỉ số, kỹ năng ghép từ hiệu ứng dùng chung, tiến hóa và Passive Huyền Sử.

## Trạng thái

Dự án đã hoàn thành **Phase 3 — Wave**. Battle có 10 wave, ba loại enemy, spawn theo group, bộ đếm theo loại và điều kiện Win/Lose.

## Luật cốt lõi

- React + TypeScript phụ trách giao diện ứng dụng; Phaser phụ trách Battle Scene thời gian thực.
- Enemy đi theo đường cố định; không dùng A* hoặc thay đổi đường trong trận.
- Hero là trụ đứng yên. Enemy không tấn công Hero trong MVP.
- Đòn đánh thường luôn đơn mục tiêu. AoE và khống chế chỉ xuất hiện trong kỹ năng.
- Hero tự dùng kỹ năng sau `skillTriggerHits` đòn đánh.
- Không có DEF. Chỉ số nền gồm HP, ATK, Range, AttackSpeed, Crit và CritDamage.
- MVP dùng local save; chưa có backend, tài khoản, database hoặc leaderboard.

Chi tiết đầy đủ: [Game Rules](docs/game-rules.md).

## Tài liệu dự án

- [Game Rules V1](docs/game-rules.md)
- [Kiến trúc V1](docs/architecture.md)
- [Data Schema V1](docs/data-schema.md)
- [MVP và giới hạn phạm vi](docs/mvp-scope.md)
- [Task Board](docs/task-board.md)
- [Audit #1](docs/audits/audit-01-foundation.md)
- [Audit #2](docs/audits/audit-02-technical-prototype.md)
- [Audit #3](docs/audits/audit-03-tower-defense-core.md)
- [Wave Audit](docs/audits/audit-04-wave.md)

## Checkpoint

| Phase | Kết quả | Audit | Checkpoint |
|---|---|---|---|
| 0 | Luật, schema, kiến trúc, task board | Audit #1 | `foundation/game-design-v1` |
| 1 | Một enemy đi hết fixed path | Audit #2 | `prototype/enemy-path` |
| 2 | Hero đặt được, tự đánh và giết enemy | Audit #3 | `core/tower-defense-loop-v1` |
| 4 | Attack Counter + Skill Effects dùng chung | Audit #4 | `core/skill-system-v1` |
| 9 | Vertical slice chơi được | Full Audit #5 | tag `v0.1.0-playable` |

## Bước tiếp theo

Tiếp theo là Phase 4: Attack Counter và Skill Effects ghép được để Hero tự dùng skill sau số đòn đã định.
