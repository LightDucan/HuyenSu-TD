# Audit FAST-03 — Hero Recruitment & Ascension

## Status

**DONE — waiting FINAL audit.**

Canonical production schema is **Meta V5**. `LocalMetaRepository` is the sole writable Meta repository for Reward, Economy, Equipment, Command Energy, Deployment and Hero transactions. `LocalHeroMetaRepository` is only a thin delegating compatibility adapter and has no storage writer.

Repository startup supports V1→V2→V3→V4→V5, V2→V3→V4→V5, V3→V4→V5 and V4→V5. The legacy `huyen-su-td/progression-v1` key is read only during V4→V5 migration. Invalid legacy input leaves both raw saves untouched; a persisted V5 save is loaded directly on subsequent startup so import cannot duplicate.

## Locked behavior

- `item_chieu_hien_lenh` is an inventory item; recruit 1/10 consumes exactly 1/10.
- New Hero starts Normal Lv1, 1★. Duplicates become `shard_hero_<heroId>` sequentially within a 10x batch.
- Stars are capped at 5★ and consume only the matching Hero shard. Star growth is flat across the six core stats; no DEF or percentage star modifiers.
- Evolution uses shared `anh-hon`, requires Lv100, resets the level to 1, preserves stars/equipment, and follows Normal → Rebirth → Reincarnation → Legendary.
- Legendary passive resolution is shared and data-driven; Hero-specific combat files are not introduced.
- Production App and BattleScene derive owned Heroes, progression, stars and passive inputs from the V5 snapshot. Legacy progression storage is migration-only.
- Level, recruit 1/10, grant, star and evolution use `HeroMetaRuntime` → `LocalMetaRepository` with optimistic revision, timestamp and persistent idempotency receipts.
- There is no free evolution production path: Lv100 plus required Anh Hồn is validated and consumed atomically before the next stage starts at Lv1.

## Prototype / non-final configuration

Recruitment weights, duplicate quantity (10 shards), star costs (10/25/50/100), flat stat growth, evolution costs (100/250/500 Anh Hồn), and passive content are prototype values owned by Phase 18 for final balance.

## Verification

- Phase 17 targeted tests: PASS, including canonical V5 load/save/migration, malformed collection rejection, legacy safety, runtime publish/refresh, ownership, recruit/star/evolution, timestamp/idempotency, six-stat star growth, Legendary passive and automated legacy-API source gate.
- Full suite: 23 files / 164 tests PASS; production build PASS; preview HTTP 200; diff-check PASS at the final checkpoint.
- No dependency or artwork changes. Existing P12–P16 and fixed-path combat boundaries remain unchanged.
