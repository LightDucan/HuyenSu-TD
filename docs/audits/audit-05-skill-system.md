# Audit #4 — Skill System

Ngày audit: 2026-08-23  
Kết quả: **PASS**

- [x] Attack Counter reset đúng sau `skillTriggerHits`; mốc là Hero data.
- [x] Normal attack vẫn single-target, còn Skill mới có AoE/khống chế.
- [x] Damage, AoE, Slow, Stun, Root và MultiHit nằm trong một Skill Effect contract.
- [x] Slow và immobilize được áp dụng trong movement runtime.
- [x] Quan Vũ dùng data `AoE + Damage`, không có module skill riêng.
- [x] 13/13 test pass, production build pass.
- [x] Combat/Skill domain không phụ thuộc React hoặc Phaser.

Checkpoint được phép tạo: `core/skill-system-v1`.
