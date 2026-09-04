# GAME-C19 — Hai Bà Trưng Stage 04 + Stage 05 Audit

## Scope

GAME-C19 extends Chapter I from three to five playable production stages. Stage 04 and Stage 05 are data-driven HBT stage packs; Stage 06 is not registered. Existing Stage 01–03 content remains unchanged.

## Automated verification

- Chapter I contains exactly five stages in order: Stage 01 → Stage 02 → Stage 03 → Stage 04 → Stage 05.
- Stage 04: `hbt-thuy-bo-stage-04`, `map-thuy-bo-crossing`, 22 waves / 395 scheduled enemies, three Han non-boss enemy types.
- Stage 05: `hbt-cam-khe-stage-05`, `map-cam-khe-last-line`, 26 waves / 494 scheduled enemies, three Han non-boss enemy types.
- Stage 04 and Stage 05 have no boss groups and no `firstClearReward`.
- Stage 03 remains 24 waves / 385 enemies with Wave 04 delays `[0, 1050]`.
- Ordered unlock, save/reload persistence, replay idempotency and temporary Chapter II prerequisite `hbt-cam-khe-stage-05` are covered.
- Campaign catalog validation returns no errors.
- Stage 04 save/reload: **PASS**; replay with a later timestamp preserves completion and `firstCompletedAtMs`.
- Stage 05 save/reload: **PASS**; replay with a later timestamp preserves completion and `firstCompletedAtMs`; Chapter II remains available.
- Stage 04 and Stage 05 replay idempotency: **PASS**; `completeStage` returns unchanged progress for completed stages.
- Exact timing regression assertions: **PASS** — Stage 04 W04 `[0, 1000]`, W05 `[0, 1000, 1550]`; Stage 05 W04 `[0, 950]`, W05 `[0, 950, 1500]`; representative spawn intervals remain S/C/A = 800/925/1200 and 775/900/1150.

Test result: **PASS — 44 test files / 296 tests**.
Build result: **PASS**.
Diff check: **PASS**.

## Manual runtime QA

Status: **PASS**.

Using the normal Campaign flow and the legitimate HBT formation (Trưng Trắc, Trưng Nhị, Lê Chân):

- Stage 04 pre-battle narrative displayed; x3 and Auto Wave were enabled; Wave 22/22 reached; Victory result recorded **395 defeated / 0 escaped**.
- Stage 05 became available after Stage 04; pre-battle narrative displayed; x3 and Auto Wave were enabled; Wave 26/26 reached; Victory result recorded **494 defeated / 0 escaped**.
- After Stage 05, Campaign showed Chapter II as **Sẵn sàng** at the temporary C19 frontier.
- Browser reload preserved the wallet and the completed Stage 01–05 campaign state.
- A focused follow-up run verified x1 start and x1 → x3 switching, Auto Wave progression, and a visible HBT active-skill VFX during Stage 04. The captured frame shows Wave 04/22 with HBT heroes, an active enemy and the skill effect rendered on the battlefield; browser console had no warning/error entries.

No debug save editing, direct battle injection, balance changes or asset changes were used.

## Visual evidence

Capture method: **NEW REAL BROWSER SCREENSHOT** from the running production preview during the current C19 QA run. All evidence files are genuine PNG binaries with signature `89504e470d0a1a0a`.

- `docs/audits/evidence/game-c19/01-chapter1-five-stages.png`
- `docs/audits/evidence/game-c19/02-stage04-runtime.png`
- `docs/audits/evidence/game-c19/03-stage04-victory.png`
- `docs/audits/evidence/game-c19/04-stage05-runtime.png`
- `docs/audits/evidence/game-c19/05-stage05-victory.png`
- `docs/audits/evidence/game-c19/06-fix1-runtime-qa.png`

Hero Asset Production remains **SUSPENDED**; no new mandatory assets were introduced.

The follow-up evidence is a **NEW REAL BROWSER SCREENSHOT** captured from the running production preview during the FIX1 QA run. It is a genuine PNG binary with signature `89504e470d0a1a0a` and shows the Stage 04 runtime with a visible HBT skill effect.

## Result

GAME-C19-FIX1 is **READY FOR AUDIT**. No Stage 06, Hero asset, economy, combat-math or save-schema scope was added; production source changes remain zero.
