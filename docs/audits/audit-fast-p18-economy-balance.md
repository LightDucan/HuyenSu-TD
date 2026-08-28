# Audit FAST-04 — Economy Simulation & Balance V1

## Status

**DONE — waiting Integration Audit.**

Balance V1 is centralized in `src/data/economy/balanceV1.ts`; the simulation is deterministic, seeded, mathematical, non-UI, and never writes browser storage. Scenarios are model assumptions (30/60/120 minutes per day), not historical analytics.

## Locked Balance V1

| Area | Values |
|---|---|
| Command Energy | cap 60; 1 per 120s; wave cost 1; Binh Phù +1/+5/+10 |
| Gold | kill 2; stage clear 100; gacha cost 100; Gold return 20 |
| Gacha weights | Gold 40; weapon 28; gem 24; Tiểu 4; Trung 2.5; Đại 1.5; pity OFF |
| KNB Shop | Chiêu Hiền Lệnh 10 KNB; Lệnh Hiệu Triệu 25 KNB |
| Recruitment | 1/10 decrees; equal prototype pool weights; duplicate 10 shards |
| Stars | shard costs 10/25/50/100; maximum 5★ |
| Evolution | Anh Hồn 100/250/500 for Rebirth/Reincarnation/Legendary |
| Equipment | Lv1–10; merge 3 identical same-level instances |

## Safety checks

- Gacha expected Gold return = `20 × 40 / 120 = 6.67`, below 100 pull cost.
- Wallet remains exactly Gold + KNB; no DEF, no Hero rarity, no 6★.
- No x3 multiplier is present in the simulation; Command Energy and Active Play use real-time model constants.
- Open: Player EXP curve, level-based Energy/Deployment formulas, maximum Lệnh Hiệu Triệu, individual Legendary passive content.

## Simulation snapshot (Balance Model Assumptions)

| Scenario / days | Gold earned / spent / remaining | KNB earned / spent / remaining | Waves | Gacha / Recruitment pulls |
|---|---:|---:|---:|---:|
| Casual 1 / 7 / 30d | 150/100/50 · 1,450/1,200/250 · 6,450/5,400/1,050 | 30/30/0 · 210/210/0 · 900/900/0 | 15 · 105 · 450 | 1/3 · 12/21 · 64/90 |
| Regular 1 / 7 / 30d | 360/300/60 · 2,520/2,500/20 · 10,080/10,000/80 | 60/60/0 · 420/420/0 · 1,800/1,800/0 | 30 · 210 · 900 | 3/6 · 25/42 · 100/180 |
| Active 1 / 7 / 30d | 720/700/20 · 5,040/5,000/40 · 20,160/20,100/60 | 120/120/0 · 840/840/0 · 3,600/3,600/0 | 60 · 420 · 1,800 | 7/12 · 50/84 · 201/360 |

Values are generated from the deterministic model; stochastic gacha/recruitment outcomes affect equipment, duplicate shards and star progress for the supplied seed.

## Simulation

`simulateMatrix()` covers Casual/Regular/Active × 1/7/30 days and reports Gold, KNB, waves, gacha pulls, recruitment pulls, duplicate shards, star progress and Anh Hồn. All outputs are safe non-negative integers and same seed/config produces identical results.
