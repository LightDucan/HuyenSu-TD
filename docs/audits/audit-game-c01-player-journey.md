# GAME-C01 — Player Journey Shell / Meta Hub Integration

## Verification

| Flow | Result | Observed |
|---|---|---|
| Fresh boot → Đại Doanh | PASS | No Phaser canvas is mounted; Wallet, Quân Lệnh, Hero roster, Inventory and Economy panels render. |
| Đại Doanh → Chinh Chiến | PASS | Campaign screen exposes Chương I — Huyết Chiến Lãng Bạc from existing map/wave data. |
| Chinh Chiến → Battle | PASS | One Battle canvas mounts; HBT Hero selector and Combat HUD C03 are present. |
| Battle placement/combat | PASS | Trưng Trắc placed, Wave started, x3 + Auto Wave advanced the prototype through 10 waves. |
| Battle → Result | PASS | Result screen displayed `THẤT BẠI`, Wave 10/10, defeated/escaped counts and read-only Wallet. |
| Result → Retry | PASS | Retry produced exactly one canvas and a fresh battle session; no duplicate canvas/listener observed. |
| Result → Đại Doanh | PASS | Canvas count returned to zero; Đại Doanh rendered with persisted Wallet/Meta values. |
| Console health | PASS | No browser error logs during smoke. |

Evidence: [city](evidence/game-c01/city.png), [campaign](evidence/game-c01/campaign.png), [battle waiting](evidence/game-c01/battle-waiting.png), [battle running](evidence/game-c01/battle-running.png), [result](evidence/game-c01/result-lose.png).

## Boundaries preserved

- Battle mounts only while the root screen is `battle`; cleanup destroys Phaser and unsubscribes BattleBridge listeners.
- Existing Meta, Wallet, Command Energy, Equipment, progression and reward runtimes remain the source of truth.
- EconomyPanel is available in Đại Doanh only; it is not reintroduced into the combat Inventory tab.
- Result is read-only and does not grant rewards. Retry transitions to a new BattleScene run.
- No save schema, combat math, wave balance, production assets or new dependencies changed.

## Automated checks

- `npm test`: PASS — 28 test files / 203 tests.
- `npm run build`: PASS.
- `git diff --check`: PASS.

Known isolated debt: equipment stat feedback remains governed by the existing Equipment V2 integration and was not redesigned in GAME-C01.
