# GAME-C04 — Multi-Chapter Campaign Catalog & Navigation Audit

## Scope

Implemented a generic, data-driven campaign catalog boundary without adding historical content. Production exposes only the existing Hai Ba Trung chapter; a two-chapter fixture is used exclusively by unit tests.

## Results

- Catalog resolves chapter/stage IDs and rejects duplicate or empty IDs.
- Safe selection honors the selected playable stage, then the first playable AVAILABLE stage, then the first playable COMPLETED stage; it returns `undefined` when no owned hero can play.
- Meta validation is canonical at V6. `campaignProgress` has exact-key and entry validation; V5 remains an explicit migration boundary and V4 migration is deterministic and lossless on failure.
- App and campaign runtime consume the catalog and retain stage completion/replay behavior, while reward and campaign runtime paths remain integrated through the existing bridge.
- No new production chapter, stage, roster, save schema, economy, or combat logic was introduced.

## Verification

- `npm test`: PASS — 32 test files, 213 tests.
- `npm run build`: PASS.
- `npm run preview`: PASS — Vite preview served on an available local port (4174 because 4173 was already occupied).
- `git diff --check`: PASS.

Manual browser journey smoke was not repeated in this task; the existing QA-C01A environment-blocked debt remains documented and is not claimed as a new manual PASS.
