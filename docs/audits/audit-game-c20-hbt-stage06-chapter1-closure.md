# GAME-C20 — Hai Bà Trưng Stage 06 + Chapter I Closure Audit

## Scope

GAME-C20 adds the canonical sixth Hai Bà Trưng stage, `hbt-chapter-closure-stage-06`, and closes Chapter I without changing existing Stage 01–05 gameplay, economy or save schema.

## Automated verification

- Chapter I now contains six ordered stages: Stage 01 → Stage 02 → Stage 03 → Stage 04 → Stage 05 → Stage 06.
- Stage 06 identity: **Giữ Lửa Mê Linh**, 43 CE campaign closure, map `map-hbt-closure-rampart`, 28 waves.
- Stage 06 schedules **652 Han enemies** across sword infantry, crossbow soldiers and armored guards; no boss or commander group is introduced.
- Stage 06 uses the `CLOSURE SYNTHESIS` historical layer, ordinary clear rewards only, and has no `firstClearReward`.
- Stage 01–05 regression totals remain **292 / 324 / 385 / 395 / 494** with existing timing assertions intact.
- Stage 05 completion unlocks Stage 06 while Chapter II remains locked; Stage 06 completion unlocks `chapter-ba-trieu-248`.
- Campaign completion persistence, replay idempotency and first-completion timestamps survive JSON save/reload in the production campaign tests.
- Automated result: **PASS — 44 test files / 296 tests**.
- Build: **PASS** (`npm run build`).
- Diff check: **PASS** (`git diff --check`).

## Runtime QA

Production preview was exercised through the player-facing Campaign flow using the existing legitimate HBT save (Stage 01–05 completed; no save editing or progression bypass).

- Stage 06 appeared as **Sẵn sàng** while Chapter II remained **Chưa mở**.
- Stage 06 pre-battle narrative appeared before entry; completed replay does not require the intro.
- Three HBT Heroes (Trưng Trắc, Trưng Nhị, Lê Chân) were deployed, Wave 1 was started, x3 and Auto Wave were enabled, and the battle advanced through all 28 waves.
- Genuine result: **Wave 28 / 28, 652 defeated, 0 escaped, Victory**; city HP remained intact.
- After victory, Campaign showed Chapter I **Đã hoàn thành** and Bà Triệu **Sẵn sàng**.
- Browser reload preserved Chapter I completion and Chapter II readiness.
- Browser console errors/warnings observed during this run: **none**.

### GAME-C20-FIX1 focused controls

- x1 active runtime: **PASS** — Wave 1 was visibly running with deployed HBT Heroes.
- x1 → x3 transition: **PASS** — speed switched during the active wave and the battle continued.
- Auto Wave: **PASS** — enabled during combat; subsequent waves continued normally.
- Existing normal attack presentation: **PASS** — HBT Hero attack/crit presentation and enemy HP updates were visible.
- Existing HBT Active Skill VFX: **PASS** — a genuine blue HBT skill effect was captured during live x3/Auto combat.
- Console: **PASS** — no error or warning entries attributable to C20/C20-FIX1.

## Evidence

Capture method: **NEW REAL BROWSER SCREENSHOT** from the running production preview. All files are genuine PNG binaries with signature `89504e470d0a1a0a`.

- `docs/audits/evidence/game-c20/01-stage06-available.png` — Stage 06 selected and available.
- `docs/audits/evidence/game-c20/02-stage06-runtime.png` — active Stage 06 Wave 1 runtime with deployed HBT Heroes.
- `docs/audits/evidence/game-c20/03-stage06-victory.png` — Wave 28/28 Victory, 652 defeated / 0 escaped.
- `docs/audits/evidence/game-c20/04-chapter1-complete-chapter2-ready.png` — Chapter I complete, Bà Triệu ready.
- `docs/audits/evidence/game-c20/05-post-reload-persistence.png` — post-reload campaign state retained.
- `docs/audits/evidence/game-c20/06-fix1-x1-runtime.png` — fresh Wave 1 active at x1 with HBT Heroes and live attack/VFX presentation.
- `docs/audits/evidence/game-c20/07-fix1-x3-auto-skill.png` — fresh live combat at x3 with Auto Wave ON and visible HBT Active Skill VFX.

## Result

GAME-C20-FIX1 is **READY FOR AUDIT**. No production source, Stage 06 design, reward, save migration, balance, combat math or asset changes were needed. Hero Asset Production remains SUSPENDED.
