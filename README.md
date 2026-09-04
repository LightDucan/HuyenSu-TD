# Huyền Sử TD — Tower Defense Việt Sử

Huyền Sử TD là game tower defense Việt Sử. Vertical slice hiện tại dùng nội dung Hai Bà Trưng để kiểm thử hành trình người chơi; roster Tam Quốc cũ chỉ là prototype test và sẽ được migrate theo roadmap.

## Trạng thái

Dự án đã hoàn thành Phase 0–18, gồm vertical slice chiến đấu, Meta Foundation, Reward Economy, Quân Lệnh, Deployment, Equipment V2, Gacha/Shop, Hero Recruitment và Economy Simulation. Bản hiện tại là **Huyền Sử TD v0.1.0 — Release Candidate**.

Player journey V1:

`ĐẠI DOANH → CHINH CHIẾN → CHƯƠNG I — HUYẾT CHIẾN LÃNG BẠC → BATTLE → KẾT QUẢ`

Đại Doanh là nơi truy cập Wallet, Quân Lệnh, Hero, Equipment, Gacha, Shop, vật phẩm tiêu hao, Chiêu Mộ và Tăng Sao. Battle vẫn giữ Combat HUD V1 đã khóa.

## Luật cốt lõi

- React + TypeScript phụ trách giao diện ứng dụng; Phaser phụ trách Battle Scene thời gian thực.
- Enemy đi theo đường cố định; không dùng A* hoặc thay đổi đường trong trận.
- Hero là trụ đứng yên. Enemy không tấn công Hero trong MVP.
- Đòn đánh thường luôn đơn mục tiêu. AoE và khống chế chỉ xuất hiện trong kỹ năng.
- Hero tự dùng kỹ năng sau `skillTriggerHits` đòn đánh.
- Không có DEF. Chỉ số nền gồm HP, ATK, Range, AttackSpeed, Crit và CritDamage.
- MVP dùng local save; chưa có backend, tài khoản, database hoặc leaderboard.

Chi tiết đầy đủ: [Game Rules](docs/game-rules.md).

## Chạy dự án

Yêu cầu: Node.js LTS và pnpm 11+.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Các lệnh kiểm tra và preview production:

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm preview
```

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
- [Project Plan](docs/PROJECT_PLAN.md)

## Checkpoint

| Phase | Kết quả | Audit | Checkpoint |
|---|---|---|---|
| 0 | Luật, schema, kiến trúc, task board | Audit #1 | `foundation/game-design-v1` |
| 1 | Một enemy đi hết fixed path | Audit #2 | `prototype/enemy-path` |
| 2 | Hero đặt được, tự đánh và giết enemy | Audit #3 | `core/tower-defense-loop-v1` |
| 4 | Attack Counter + Skill Effects dùng chung | Audit #4 | `core/skill-system-v1` |
| 9 | Vertical slice chơi được | Full Audit #5 | tag `v0.1.0-playable` |
| 10–18 | Meta Foundation, Reward Economy, Quân Lệnh, Deployment, Equipment, Gacha, Recruitment, Balance | Integration audits | các checkpoint `meta/*` và `main` |
| GAME-C01 | Player Journey Shell, Đại Doanh, Chinh Chiến, Kết Quả | Player Journey audit | `codex/game-c01-player-journey-shell` |

## Bước tiếp theo

Bản release candidate chờ Release Gate R3. Không cần debug save hoặc chỉnh LocalStorage để chơi.
