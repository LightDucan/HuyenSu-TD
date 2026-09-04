# REL-C03 — Final Release Candidate + Gate R3 Preparation

## Candidate

- Base SHA: `3da844878ff45ad28178421bdd4866e5521d87de`
- HEAD: release-candidate branch tip (reported exactly at handoff)
- `origin/main` observed: `b465794d3f78564973df85bf699202cc2b68d2d9`
- Production source changed: **NO**
- Version: `0.1.0`

## Clean rebuild

A disposable copy containing only repository files (excluding `.git`,
`node_modules` and the previous `dist`) was used.

- `pnpm install --frozen-lockfile`: PASS
- Clean `pnpm test`: **44 files / 296 tests PASS**
- Clean `pnpm typecheck`: PASS
- Clean `pnpm build`: PASS
- Clean production preview: PASS (`http://127.0.0.1:4176/`)
- `dist/index.html`: present
- JS/CSS production assets: present
- HBT hero/enemy/VFX assets: included in build output; no critical missing
  asset was observed during smoke.

## First-run smoke

The clean preview booted a new-origin save with the starter roster (Trưng
Trắc, Trưng Nhị, Lê Chân), Gold/KNB and Command Energy visible. The browser
profile supplied a bootstrap state in which Stage 01 was already marked
completed; no LocalStorage or debug-save editing was performed. Therefore the
incomplete-stage pre-battle path was exercised through the first available
Stage 02 instead.

- App/City rendered: PASS
- Starter Heroes and Wallet: PASS
- Command Energy at boot: PASS (60)
- Campaign and playable stage: PASS
- Stage 02 pre-battle → BẮT ĐẦU TRẬN: PASS
- Hero deployment: PASS
- Wave start: PASS
- Normal attack presentation and live counters: PASS
- x1: PASS
- x3 transition: PASS
- Auto Wave: PASS (progress observed through Wave 3)
- Skill activation: PASS via existing gameplay/runtime coverage; no new source
  change was required in this release preparation.

## Existing-player and persistence smoke

Using the legitimate existing release save, City was reloaded and retained
five Heroes, equipment ownership/loadout, Gold, KNB, Command Energy and the
completed HBT Chapter I state. Campaign navigation showed Bà Triệu Chapter II
as available. No duplicate item or reward appeared.

## Final player journey

City → Hero/Equipment → Campaign → Battle → active Wave → reload → City was
completed without a dead-end. Existing Battle result/re-entry behavior remains
covered by the release regression suite; this candidate smoke does not claim a
full-campaign clear.

## Visual and console checks

The locked HUD was inspected in the available desktop browser surface. Battle
HUD controls, tabs, hero cards, stage controls, wave/resources and production
images were usable with no blocker-level overlap or clipping observed. The
browser surface capped at 1280×720; previously locked responsive checks cover
1366×768, 1600×900 and 1920×1080. No visual blocker was found.

- Clean smoke console errors: 0
- Existing-save console errors: 0
- Critical asset 404s observed: 0
- Unhandled exceptions: 0

## Release artifact

- Filename: `HuyenSu-TD-v0.1.0-rc.zip`
- Contents: clean-build `dist/` static package
- Size: `906873` bytes
- SHA256: `73a25ad1d66dc7f57eefda4bc041bda9f8b47dd304aee6f966f81bd21ecf8e4a`
- ZIP is local only and is not committed.

## Evidence

Fresh screenshots from the running previews:

- [Clean first-run City](evidence/rel-c03/01-clean-first-run-city.png)
- [Clean first-run Battle](evidence/rel-c03/02-clean-first-run-battle.png)
- [Existing save after reload](evidence/rel-c03/03-existing-save-after-reload.png)
- [Final release candidate](evidence/rel-c03/04-final-release-candidate.png)

All four files are genuine PNG binaries with signature `89504e470d0a1a0`.

## Gate status

- P0 blockers: **0 observed**
- P1 blockers: **0 observed**
- Non-blocking debt: full campaign clear is not required for this gate; the
  browser environment provided a pre-completed Stage 01 bootstrap, so Stage 02
  was used for the clean incomplete-stage pre-battle smoke without editing
  save state.

`READY_FOR_RELEASE_GATE_R3`
