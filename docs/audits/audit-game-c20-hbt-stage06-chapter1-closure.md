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

## Evidence

Capture method: **NEW REAL BROWSER SCREENSHOT** from the running production preview. All files are genuine PNG binaries with signature `89504e470d0a1a0a`.

- `docs/audits/evidence/game-c20/01-stage06-available.png` — Stage 06 selected and available.
- `docs/audits/evidence/game-c20/02-stage06-runtime.png` — active Stage 06 Wave 1 runtime with deployed HBT Heroes.
- `docs/audits/evidence/game-c20/03-stage06-victory.png` — Wave 28/28 Victory, 652 defeated / 0 escaped.
- `docs/audits/evidence/game-c20/04-chapter1-complete-chapter2-ready.png` — Chapter I complete, Bà Triệu ready.
- `docs/audits/evidence/game-c20/05-post-reload-persistence.png` — post-reload campaign state retained.

## Result

GAME-C20 is **READY FOR AUDIT**. No Stage 01–05 redesign, reward change, save migration, new boss, or Chapter II implementation was added. Hero Asset Production remains SUSPENDED.
