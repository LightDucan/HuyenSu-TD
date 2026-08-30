# GAME-C03 — Campaign Progression Foundation Audit

Implemented Meta V6 campaign progress with ordered stage unlock derivation, idempotent completion persistence, and campaign runtime subscription to the existing stage-victory bridge event.

- Meta V5 → V6 migration is deterministic and initializes empty campaign progress.
- Stage completion is persisted through `LocalMetaRepository`; rewards remain independent.
- Campaign selectors cover locked, available, completed, replay, and chapter-complete states.
- Campaign UI guards locked stages and zero playable-hero intersections.
- Test-only three-stage fixture validates A → B → C progression.
- Automated suite: 31 files / 209 tests PASS.
- Canonical Meta V6 validation is strict; V5 is accepted only by `validateMetaSaveV5` before deterministic migration.
- Campaign progress entries validate exact keys and non-negative timestamps; runtime resolves stage victories across multiple Chapters with one listener.
- Build and diff-check PASS.
- Manual Result → City → Campaign → Battle → Retry and seeded Equip/Unequip remain QA debt from GAME-C02; no false PASS claimed.
