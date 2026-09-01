# Bà Triệu — Stage 03 player progression

Stage 03 is the third playable production gate in the Bà Triệu chapter. The ordered path is:

`Hai Bà Trưng completion → Tụ Nghĩa Núi Nưa → Công Phá Thành Ấp → Bến Sông Mã → Stage 04 prototype`

`bt-03-ben-song-ma` is locked until `bt-02-cong-pha-thanh-ap` is completed. After that completion it is available; completing it makes Stage 04 available. A completed Stage 03 remains replayable. The campaign selector uses the shared `selectStageProgress` domain function, so no stage-specific unlock logic is duplicated in UI.

The production roster is Bà Triệu, Triệu Quốc Đạt and Đinh Bôi. Existing HBT roster and generic Wu enemy visual fallback behavior are unchanged. Stage 03 uses ordinary completion rewards only: **24 Gold / 1 KNB / 10 Anh Hồn**. There is no Stage 03 first-clear bonus, no recruitment change and no additional economy or meta-system behavior.

The pre-battle narrative is shown for an incomplete run and skipped for a completed replay by the existing shared campaign flow. Wave beats are data-driven at 1/8/15/22 and do not introduce a separate VN subsystem.
