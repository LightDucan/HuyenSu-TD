# GAME-C07-MANUAL-03 — Full-run time-budget completion

Valid baseline: `antigravity/vis-c07-enemy-walk-assets` @ `01b7dd23`.

| Flow | Status | Evidence |
|---|---|---|
| Fresh City / HBT roster | PASS | City rendered with 3 HBT Heroes and Command Energy 60. |
| Pre-battle | PASS | Intro card and `BẮT ĐẦU TRẬN` displayed before Battle. |
| Coordinate Canvas placement | PASS | Canvas bounds inspected; coordinate click placed Trưng Trắc, HUD showed `1 / 7`. |
| Terrain / path | PASS | Marsh/water/mud/reed decorations and readable path visible. |
| Wave 1 / real enemy sprites | PASS | Real sword walk sprites visible; no primitive fallback observed. |
| x3 / Auto Wave | PASS | Controls changed to x3 and `AUTO WAVE: ON`; Wave advanced to 2. |
| Full 24 waves | PASS | One continuous preview session reached `Đợt 24 / 24`; victory screen reported 289 defeated and 3 escaped. |
| Victory lifecycle | PASS | `CHIẾN THẮNG` rendered with `VỀ ĐẠI DOANH` and `CHƠI LẠI`. |
| Live wallet after victory | PASS | Victory screen showed Gold 482 / KNB 60; Đại Doanh reflected the same values without reload. |
| Persistence / reload | PASS | Reload returned to Đại Doanh with Gold 482 / KNB 60 and retained completed campaign state. |
| Completed replay skips intro | PASS | Completed Chapter I remained completed; `VÀO TRẬN` entered Battle directly with no pre-battle card. |
| Wave 6/12/18/24 beats | BLOCKED | Not captured as discrete overlays during this time-budget run. |
| Crossbow / armored / boss sprite evidence | BLOCKED | Full-run result was observed, but individual sprite frames were not captured separately. |
| Equip lock / merge interaction | BLOCKED | Not exercised in this smoke session. |
| First-clear package delta | BLOCKED | Victory/reward lifecycle passed, but the first-clear 100 Gold / 50 KNB / 100 Anh Hồn delta was not isolated in the UI evidence. |
| Bà Triệu regression | PASS | Campaign screen still listed Bà Triệu as `Sẵn sàng` after HBT completion; no production-content mutation observed. |
| Console errors / warnings | PASS | Browser diagnostics returned no error or warning entries after the full run. |

Automated baseline verification: 37 test files / 240 tests PASS; build PASS; diff-check PASS. The same preview build was used for the interactive run.

Evidence: `docs/audits/evidence/game-c07-manual-02/08-victory.png` and `09-city-after-clear.png`.

Final gates: CODE/RUNTIME PASS; ASSET PARTIAL (real sheets are present; individual crossbow/armored/boss frames were not separately captured); MANUAL PARTIAL (full 24-wave victory, persistence and replay passed, while beat/equipment/isolated first-clear checks remain blocked). No FULL PRODUCTION PASS claimed.
