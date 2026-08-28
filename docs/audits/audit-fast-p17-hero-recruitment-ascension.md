# Audit FAST-03 — Hero Recruitment & Ascension

## Status

**DONE — waiting Integration Audit.**

Phase 17 introduces a Meta-owned Hero collection boundary while preserving the existing Meta V4 save chain. The V4→V5 migration is deterministic, imports the legacy `huyen-su-td/progression-v1` roster in sorted order, and leaves invalid legacy data untouched.

## Locked behavior

- `item_chieu_hien_lenh` is an inventory item; recruit 1/10 consumes exactly 1/10.
- New Hero starts Normal Lv1, 1★. Duplicates become `shard_hero_<heroId>` sequentially within a 10x batch.
- Stars are capped at 5★ and consume only the matching Hero shard. Star growth is flat across the six core stats; no DEF or percentage star modifiers.
- Evolution uses shared `anh-hon`, requires Lv100, resets the level to 1, preserves stars/equipment, and follows Normal → Rebirth → Reincarnation → Legendary.
- Legendary passive resolution is shared and data-driven; Hero-specific combat files are not introduced.

## Prototype / non-final configuration

Recruitment weights, duplicate quantity (10 shards), star costs (10/25/50/100), flat stat growth, evolution costs (100/250/500 Anh Hồn), and passive content are prototype values owned by Phase 18 for final balance.

## Verification

- Phase 17 targeted tests: PASS. Final full suite: 21 files / 151 tests, build and diff-check PASS; production preview is verified at the final checkpoint.
- No dependency or artwork changes. Existing P12–P16 and fixed-path combat boundaries remain unchanged.
