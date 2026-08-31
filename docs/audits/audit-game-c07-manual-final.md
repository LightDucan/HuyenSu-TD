# GAME-C07-MANUAL-02

Valid baseline: `antigravity/vis-c07-enemy-walk-assets` @ `01b7dd23`.

| Flow | Status | Evidence |
|---|---|---|
| Fresh City / HBT roster | PASS | City rendered with 3 HBT Heroes and Command Energy 60. |
| Pre-battle | PASS | Intro card and `BẮT ĐẦU TRẬN` displayed before Battle. |
| Coordinate Canvas placement | PASS | Canvas bounds inspected; coordinate click placed Trưng Trắc, HUD showed `1 / 7`. |
| Terrain / path | PASS | Marsh/water/mud/reed decorations and readable path visible. |
| Wave 1 / real enemy sprites | PASS | Real sword walk sprites visible; no primitive fallback observed. |
| x3 / Auto Wave | PASS | Controls changed to x3 and `AUTO WAVE: ON`; Wave advanced to 2. |
| Full 24 waves | BLOCKED | Smoke session stopped before full completion due time budget. |
| Wave 6/12/18/24 beats | BLOCKED | Not reached in this session. |
| Victory/reward/persistence/replay | BLOCKED | Not reached in this session. |

Baseline automated verification: 37 test files / 240 tests PASS; build PASS; diff-check PASS.

Final gates: CODE/RUNTIME PASS, ASSET PARTIAL (real sheets present and consumed for observed enemy), MANUAL PARTIAL/BLOCKED. No FULL PRODUCTION PASS claimed.
