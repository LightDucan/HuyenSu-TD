# Quân Lệnh Contract

## Luật đã khóa

- Tốn `1` Quân Lệnh để bắt đầu `1` Wave.
- Hồi tự nhiên `1` điểm mỗi `2 phút` thời gian thực.
- Cap ban đầu dự kiến `60`; công thức theo Player Level còn mở.
- Khi `current >= cap`, không hồi tự nhiên và không tích trữ thời gian hồi.
- Reward/item được phép làm `current > cap`; overflow được giữ nguyên.
- x1/x3 không ảnh hưởng hồi Quân Lệnh.
- Auto Wave chỉ tự tiêu `1` Quân Lệnh khi chuẩn bị bắt đầu Wave tiếp theo.

## Schema khái niệm

```ts
type CommandEnergyState = {
  current: number
  regenAnchorAtMs: number
}

type CommandEnergyConfig = {
  baseCap: number // dự kiến 60
  regenIntervalMs: number // 120_000
}
```

Cap là derived value từ Player Level/config, không lưu lặp trong state nếu không cần migration snapshot.

## Quy tắc materialize

1. Dùng timestamp thực, không dùng Battle GameClock.
2. Nếu `current >= cap`, đặt anchor về thời điểm kiểm tra và không grant điểm.
3. Nếu `current < cap`, grant số interval hoàn chỉnh nhưng không vượt cap; giữ phần thời gian lẻ trong anchor.
4. Item/reward cộng trực tiếp và giữ overflow. Nếu kết quả đạt/vượt cap, thời gian hồi cũ không được bank.
5. Khi spend từ overflow xuống dưới cap, chu kỳ hồi mới bắt đầu tại thời điểm spend.

Load/foreground/action đều có thể materialize cùng một hàm thuần để hỗ trợ thời gian thực khi app không active.

## Wave start contract

- Manual/Auto Wave gọi cùng `tryStartWave` application command.
- Command materialize regen, kiểm tra `current >= 1`, trừ 1 atomically rồi mới phát Battle start command.
- Nếu thiếu Quân Lệnh, Wave không bắt đầu và Auto Wave dừng/chờ; không retry dồn dập.
- Speed x1/x3 chỉ tác động sau khi Wave đã bắt đầu.
