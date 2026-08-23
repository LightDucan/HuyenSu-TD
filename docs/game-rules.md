# Game Rules V1

Tài liệu này là nguồn sự thật của gameplay MVP. Mọi thay đổi luật phải được ghi lại trước khi triển khai.

## 1. Battle

- Battle diễn ra trên một map có đường đi được định nghĩa sẵn.
- Enemy xuất hiện theo wave, đi theo fixed path và gây mất điểm thành khi đến cuối đường.
- Không có A*, block đường, tính lại đường hoặc enemy chuyển sang tấn công Hero.
- Game hỗ trợ tốc độ x1 và x3 qua một Game Clock dùng chung.
- Win khi hoàn thành toàn bộ wave; lose khi điểm thành về 0.

## 2. Hero

- Hero là tower có skin nhân vật, đứng cố định tại ô hợp lệ.
- Hero tự tìm một enemy trong range và đánh thường.
- Đòn thường luôn single-target; có thể chí mạng nhưng không gây AoE, Stun, Slow, Root hoặc MultiHit.
- HP được giữ trong data để phân loại và mở rộng sau này; MVP chưa dùng HP để Hero nhận sát thương.
- Không có DEF, mana, energy, accuracy hoặc resistance.

### Chỉ số nền

| Field | Ý nghĩa | Quy ước |
|---|---|---|
| `hp` | Máu/phân loại Hero | Không tiêu hao trong Battle MVP |
| `atk` | Sát thương cơ bản | Số dương |
| `range` | Tầm đánh | Pixel hoặc world unit, thống nhất toàn game |
| `attackSpeed` | Số đòn mỗi giây | Số dương |
| `crit` | Tỉ lệ chí mạng | 0–1 |
| `critDamage` | Hệ số sát thương chí mạng | Ví dụ `1.5` = 150% |

## 3. Kỹ năng chủ động

- Mỗi đòn thường hoàn tất tăng Attack Counter thêm 1.
- Khi đạt `skillTriggerHits`, Hero tự kích hoạt skill rồi reset counter.
- `skillTriggerHits` nằm trong Hero data; các giá trị 3, 5, 7 và 10 là quy ước cân bằng, không phải luật hard-code.
- Skill được ghép từ các effect dùng chung: Damage, AoE, Slow, Stun, Root và MultiHit.
- Không tạo một module combat riêng cho từng Hero.

## 4. Tiến hóa

```text
Thường Lv1–100
  → Trùng Sinh Lv1–100
  → Tái Sinh Lv1–100
  → Huyền Sử
```

- Huyền Sử mở bonus chỉ số vượt trội và một Passive đặc biệt.
- Passive phải chạy qua framework dùng chung, không thay thế Combat Core.
- Cooldown nâng cấp là thời gian progression, tách hoàn toàn khỏi Game Clock trong Battle.
- Người chơi có thể dùng vàng để rút ngắn cooldown khi tính năng này được triển khai.

## 5. Trang bị

- Mỗi Hero có một ô Weapon và một ô Gem.
- Cả hai chỉ được sửa `atk`, `attackSpeed` và `range` trong MVP.
- Chưa có rarity, random affix, reforge, enchant hoặc inventory RPG phức tạp.

## 6. Wave HUD

- HUD hiển thị số enemy còn lại theo loại trong wave.
- Biểu tượng kiếm là lính kiếm; biểu tượng cung là lính cung.
- Con số là số enemy chưa bị tiêu diệt hoặc chưa thoát khỏi map của wave hiện tại.

## 7. UI và runtime ownership

- Phaser sở hữu object thời gian thực, animation và update loop.
- React nhận event hoặc snapshot có kiểm soát; không cập nhật state theo từng frame.
- Combat logic không phụ thuộc sprite, animation hoặc React component.
