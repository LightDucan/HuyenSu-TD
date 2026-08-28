# Audit FAST-04 — Economy Simulation & Balance V1

## Status

**DONE — waiting Integration Audit.**

Balance V1 is centralized in `src/data/economy/balanceV1.ts`; the simulation is deterministic, mathematical, non-UI, and never writes browser storage. Scenarios are model assumptions (30/60/120 minutes per day), not historical analytics.

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

## Simulation

`simulateMatrix()` covers Casual/Regular/Active × 1/7/30 days and reports Gold, KNB, waves, gacha pulls, recruitment pulls, duplicate shards, star progress and Anh Hồn. All outputs are safe non-negative integers and same seed/config produces identical results.
