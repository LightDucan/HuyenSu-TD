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

Casual/Regular/Active use 30/60/120 minutes per day. Wave timing is derived from configurable `wavesPerHour` (30 by default). The simulation starts with the explicit configurable starter set (currently empty), buys Chiêu Hiền Lệnh from earned KNB before recruitment, and uses `level100Readiness.daysPerStage` as a deterministic Hero-level readiness assumption only; this is not a production progression rule. Anh Hồn comes only from stage-clear rewards (no hourly phantom source). Real elapsed time is independent of x1/x3. Evolution consumes sequentially 100, then 250, then 500.

## Actual seeded matrix (seed 1)

| Scenario | Gold E/S/R | KNB E/S/R | Waves planned/started/blocked | Gacha / Recruit | Weapon/Gem max | Anh Hồn E/S |
|---|---:|---:|---:|---:|---:|---:|
| Casual 1d | 255/200/55 | 31/30/1 | 15/15/0 | 2/2 | 0/0 | 10/0 |
| Casual 7d | 1705/1700/5 | 220/220/0 | 105/105/0 | 17/17 | 2/2 | 100/0 |
| Casual 30d | 7430/7400/30 | 945/940/5 | 450/450/0 | 74/74 | 3/3 | 450/100 |
| Regular 1d | 490/400/90 | 63/60/3 | 30/30/0 | 4/4 | 1/1 | 30/0 |
| Regular 7d | 3490/3400/90 | 441/440/1 | 210/210/0 | 34/34 | 2/2 | 210/0 |
| Regular 30d | 14620/14600/20 | 1890/1890/0 | 900/900/0 | 146/146 | 4/4 | 900/100 |
| Active 1d | 1000/1000/0 | 126/120/6 | 60/60/0 | 10/10 | 2/1 | 60/0 |
| Active 7d | 6960/6900/60 | 882/880/2 | 420/420/0 | 69/69 | 3/3 | 420/0 |
| Active 30d | 29300/29300/0 | 3780/3780/0 | 1800/1800/0 | 293/293 | 5/4 | 1800/100 |

E/S/R = earned / spent / remaining. Weapon/Gem max is the highest merged level. All balances are non-negative; wallet contains only Gold and KNB.

## Safety and open decisions

Gold Gacha expected return is `20 × 40 / 100 = 8`, below the 100 Gold pull cost; Binh Phù categories remain rarest. The denominator is the actual weight sum (100). Gold-return pulls are applied in a wallet loop until Gold is below pull cost. Same seed produces the same matrix and changing seed/config changes outcomes. Open decisions remain Player EXP curve, Energy cap-by-Level, Deployment Level formula, maximum Lệnh Hiệu Triệu and individual historical Legendary Passive values.
