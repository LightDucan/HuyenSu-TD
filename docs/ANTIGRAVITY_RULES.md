# Antigravity Worker Rules — HuyenSu-TD

## Vai trò

Antigravity là worker phụ. Không phải kiến trúc sư chính của dự án.

Mục tiêu:

- làm UI;
- làm data;
- làm asset;
- làm tài liệu;
- chuẩn bị content;
- hỗ trợ test những phần được giao.

Không tự ý thay đổi Core Architecture.

## Quy tắc bắt buộc trước mỗi Task

1. Đọc:
   - `docs/GAME_RULES.md`
   - `docs/HERO_RULES.md`
   - `docs/ARCHITECTURE.md`
   - file task hiện tại nếu có.
2. Kiểm tra `git status`.
3. Nếu thấy file đang thay đổi mà không phải do mình tạo:
   - KHÔNG sửa;
   - KHÔNG revert;
   - KHÔNG format;
   - báo ngay.
4. Chỉ làm đúng phạm vi task được giao.

## CẤM TUYỆT ĐỐI

Không được:

- xóa file;
- đổi tên file;
- di chuyển file;
- overwrite file không thuộc task;
- chạy `git reset`;
- chạy `git clean`;
- force push;
- merge branch;
- commit trực tiếp vào `main`;
- sửa lịch sử Git;
- sửa `package.json` nếu task không yêu cầu;
- cài dependency mới nếu chưa được duyệt;
- chạy formatter toàn repo;
- tự refactor Core;
- tự đổi cấu trúc folder;
- tự đổi Game Rules;
- tự thêm gameplay;
- tự thêm Backend;
- tự thêm A*;
- tự sửa CombatSystem;
- tự sửa SkillSystem;
- tự sửa GameClock;
- tự sửa BattleSimulation;
- tự sửa ProgressionSystem nếu Codex đang làm Phase 5.

Nếu cần thay đổi một trong các mục trên:  
DỪNG và hỏi trước.

## Luật kiến trúc không được thay đổi

Hero là Tower mang hình tướng.

Hero Core Stats:

- HP
- ATK
- Range
- AttackSpeed
- Crit
- CritDamage

Không có DEF.

Normal Attack:

- single-target;
- không AoE;
- không Stun;
- không Slow;
- không Root.

Skill:

- tự kích hoạt sau N đòn;
- các hiệu ứng như Damage, AoE, Slow, Stun, Root, MultiHit phải dùng hệ Skill chung;
- không tạo code combat riêng cho từng Hero.

Không tạo:

- `QuanVuSkill.ts`;
- `TrieuVanSkill.ts`;
- hoặc bất kỳ Hero-specific CombatSystem nào.

Hero tiến hóa:

- Normal Lv1–100
- Rebirth Lv1–100
- Reincarnation Lv1–100
- Legendary

Legendary mở Passive đặc biệt.

## Vùng ưu tiên của Antigravity

Được ưu tiên làm:

- `src/ui/**`
- `src/data/**`
- `src/assets/**`
- `docs/**`
- Figma
- Hero data
- Enemy data
- Wave data
- Skill data
- VFX
- Sprite
- UI mockup

Không đụng `src/core/**` trừ khi task ghi rõ.

## Git Workflow

Không làm trên `main`.

Branch phải có dạng:

`antigravity/<task-id>-<short-name>`

Ví dụ:

`antigravity/p5-a01-level-ui`

Mỗi Task:

1. tạo branch riêng;
2. chỉ sửa file cần thiết;
3. chạy test/build liên quan;
4. commit;
5. báo SHA commit;
6. DỪNG;
7. chờ Audit hoặc Merge.

## Báo cáo bắt buộc sau Task

Luôn trả:

- Task ID
- Branch
- Files created
- Files modified
- Files deleted
- Dependencies added
- Tests run
- Build result
- Commit SHA
- Notes / risks

`Files deleted` mặc định phải là `NONE`.

`Dependencies added` mặc định phải là `NONE`.

## Nếu gặp xung đột

Không tự resolve nếu xung đột nằm trong:

- Core;
- Combat;
- Skill;
- Progression;
- GameClock;
- BattleSimulation.

Dừng và báo.

## Nguyên tắc cuối

Nếu không chắc một thay đổi có nằm trong phạm vi task hay không:  
KHÔNG LÀM.

Hỏi trước.
