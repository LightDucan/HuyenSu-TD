# Audit FAST-06 — Final Economy Balance V1

## Status

**DONE — waiting FINAL Integration Audit.** Phase 17 final audit is PASS; Phase 18 is complete pending integration audit.

`src/data/economy/balanceV1.ts` is the sole Balance V1 source. Runtime gacha, shop, reward, recruitment and Equipment V2 configurations derive their numeric values from it. The simulation is seeded, deterministic for a seed, and never writes save state.

## Locked V1 values

- Command Energy cap 60, regen 1/120000 ms, wave cost 1; Binh Phù +1/+5/+10; overflow/no banking.
- Enemy-specific Gold rewards; stage clear Gold + KNB + configurable Anh Hồn; active play KNB every 60000 ms.
- Gold Gacha cost 100, weighted pool Gold/Weapon/Gem/Tiểu/Trung/Đại Binh Phù, Gold return 20, pity OFF and no 10x guarantee.
- KNB shop: Chiêu Hiền Lệnh 10, Lệnh Hiệu Triệu 25. Recruitment weights and duplicate shards are config-driven.
- Star costs 10/25/50/100, max 5★, six flat stat growth fields only. Evolution costs 100/250/500 Anh Hồn.
- Equipment tables are flat ATK/Range/AttackSpeed only, Lv1–10, merged 3-to-1 per definition and level; Binh Phù is never equipment.

## Model assumptions

Casual/Regular/Active use 30/60/120 minutes per day. The simulation starts with the explicit configurable starter set (currently empty), buys Chiêu Hiền Lệnh from earned KNB before recruitment, and uses a deterministic Hero-level readiness assumption for evolution only; this is not a production progression rule. Real elapsed time is independent of x1/x3.

## Actual seeded matrix (seed 1)

| Scenario | Gold E/S/R | KNB E/S/R | Waves | Gacha / Recruit | Weapon/Gem max | Anh Hồn E/S |
|---|---:|---:|---:|---:|---:|---:|
| Casual 1d | 260/200/60 | 31/30/1 | 15 | 2/3 | 0/0 | 10/0 |
| Casual 7d | 1740/1600/140 | 220/220/0 | 105 | 16/22 | 2/2 | 103/0 |
| Casual 30d | 7560/6900/660 | 945/940/5 | 450 | 69/94 | 3/3 | 465/300 |
| Regular 1d | 500/400/100 | 63/60/3 | 30 | 4/6 | 1/1 | 31/0 |
| Regular 7d | 3540/3200/340 | 441/440/1 | 210 | 32/44 | 2/2 | 217/0 |
| Regular 30d | 14860/13800/1060 | 1890/1890/0 | 900 | 138/189 | 4/4 | 930/300 |
| Active 1d | 1020/900/120 | 126/120/6 | 60 | 9/12 | 1/1 | 62/0 |
| Active 7d | 7060/6400/660 | 882/880/2 | 420 | 64/88 | 3/3 | 434/0 |
| Active 30d | 29820/27600/2220 | 3780/3780/0 | 1800 | 276/378 | 5/4 | 1860/300 |

E/S/R = earned / spent / remaining. Weapon/Gem max is the highest merged level. All balances are non-negative; wallet contains only Gold and KNB.

## Safety and open decisions

Gold Gacha expected return is `20 × 40 / 120 = 6.67`, below the 100 Gold pull cost; Binh Phù categories remain rarest. Same seed produces the same matrix and changing seed/config changes outcomes. Open decisions remain Player EXP curve, Energy cap-by-Level, Deployment Level formula, maximum Lệnh Hiệu Triệu and individual historical Legendary Passive values.
