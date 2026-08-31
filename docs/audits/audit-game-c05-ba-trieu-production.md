# GAME-C05 — Bà Triệu Production Chapter Foundation Audit

## Source and scope

- Historical source pack: `antigravity/vs-ba-trieu-c01-history` @ `5f5c79eaf2947a2061da66557409cd4fe2221afe`.
- Production order is deterministic: Hai Bà Trưng (40–43) then Bà Triệu (248).
- No 12 Sứ Quân, Lý Nam Đế, new combat mechanic, backend, schema migration, or final visual asset was introduced.

## Production content

- Chapter ID: `chapter-ba-trieu-248`.
- Stages: `bt-01-tu-nghia-nui-nua`, `bt-02-cong-pha-thanh-ap`, `bt-03-ben-song-ma`, `bt-04-lap-luy-bo-dien`, `bt-05-dai-chien-bo-dien`, `bt-06-khuc-ca-nui-tung`.
- Each stage stores its historical-confidence boundary and historically safe outcome. The final stage is framed as a Last Stand preserving the resistance legacy; it does not kill Lục Dận or rewrite the suppression of 248.
- Eastern Wu content uses the existing enemy and wave architecture. The final elite is an unnamed field commander, not Lục Dận, so ordinary enemy death semantics cannot contradict his survival.

## Unlock and UI

- `prerequisiteStageId` is an optional generic Chapter contract. Bà Triệu references the final HBT production stage; catalogs without prerequisites retain independent behavior.
- Locked Chapters and their stages cannot be selected as safe playable stages.
- Campaign UI renders both Chapters and maps status to `Chưa mở`, `Sẵn sàng`, `Đang tiến hành`, or `Đã hoàn thành`.

## Hero and asset boundary

- Provenance is explicit: Bà Triệu is historical core; Triệu Quốc Đạt and Đinh Bôi are conditional T3/local traditions.
- GAME-C05 does not promote these candidates into the starter/recruitment roster because that would require a separate audited roster/save/asset integration. Existing HBT Heroes are temporary playable placeholders for structural battle validation.
- Existing safe fallback rendering is retained. Final Bà Triệu portraits, idle/attack sprites, and VFX remain production debt; no artwork was generated.

## Verification

- `npm test`: PASS — 33 test files, 219 tests.
- `npm run build`: PASS.
- `git diff --check`: PASS.
- Manual browser smoke: not performed; no manual PASS is claimed.
