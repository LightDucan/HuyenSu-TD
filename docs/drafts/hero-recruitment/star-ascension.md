# Hệ Thống Nâng Sao Danh Tướng (Star Ascension System)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

Hệ thống Nâng Sao Tướng (Star Ascension) tuân thủ chặt chẽ các nguyên tắc sau:

1. **Nguyên Liệu Nâng Sao Độc Quyền**:
   * Quá trình Nâng Sao **CHỈ SỬ DỤNG DUY NHẤT MẢNH DANH TƯỚNG** tương ứng với chính Hero đó (ví dụ: Nâng sao cho Trưng Trắc bắt buộc dùng *Mảnh Trưng Trắc*, không dùng chung cho tướng khác).
   * **Tuyệt đối không dùng Anh Hồn để Nâng Sao** (Anh Hồn được phân định riêng biệt cho hệ thống Tiến Hóa Bậc).
2. **Cấp Độ Sao (Star Tiers)**:
   * Tất cả tướng khi mới mở khóa khởi đầu ở **1 Sao (1★)**.
   * Tiến trình sao tăng dần: **1★ $\rightarrow$ 2★ $\rightarrow$ 3★ $\rightarrow$ 4★ $\rightarrow$ 5★ $\rightarrow$ 6★** (mức trần tối đa do cấu hình mở quyết định).
3. **Quy Tắc Tăng Trưởng Chỉ Số (Stat Growth Rules)**:
   * Mỗi cấp Sao tăng trực tiếp các chỉ số cơ bản của Hero: **HP**, **ATK**, **Range**, **AttackSpeed**, **Crit**, **CritDamage**.
   * **Tuyệt đối không có chỉ số DEF** (tuân thủ triệt để luật dự án).
   * **Không thay đổi cơ chế Combat hay Skill Core**: Nâng sao khuếch đại sức mạnh nền tảng của Hero, không tạo ra logic chiến đấu riêng biệt hay can thiệp vào bộ đếm đòn đánh của Skill Framework.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)

* **Module Hồ Sơ Tướng (Hero Profile State — Codex xác nhận)**: Lưu trữ cấp sao hiện tại (`currentStars`) của từng tướng.
* **Module Quản Lý Mảnh Tướng (Hero Shard Inventory — Codex xác nhận)**: Kiểm tra số dư và trừ `consumedShards` khi thực hiện nâng sao.
* **Bộ Tính Chỉ Số Tướng (Hero Stat Calculator — Codex xác nhận)**: Tính toán lại bộ chỉ số thực tế sau khi tăng sao để áp dụng vào trận đánh.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)

1. **Truy cập Giao diện Nâng Sao**:
   * Tại `HeroDetailModal` (Xem chi tiết tướng) $\rightarrow$ Chọn Tab **[Nâng Sao]**.
2. **Hiển Thị Tiến Trình & So Sánh**:
   * Hiển thị số Sao hiện tại và Sao kế tiếp (ví dụ: `★★★☆☆ (3★)` $\rightarrow$ `★★★★☆ (4★)`).
   * Thanh tiến độ mảnh: `[Mảnh Trưng Trắc: 45 / 50]`.
   * Bảng so sánh chỉ số trước và sau khi nâng (Trước $\rightarrow$ Sau $\rightarrow$ Tăng thêm).
3. **Thao tác Nâng Sao**:
   * *Đủ mảnh*: Nút `[Tiến Hành Nâng Sao]` phát sáng vàng $\rightarrow$ Nhấp vào $\rightarrow$ Khóa nút $\rightarrow$ Trừ mảnh $\rightarrow$ Phát hiệu ứng chấn động ánh sao (Star Burst VFX) $\rightarrow$ Cập nhật hiển thị sao mới.
   * *Thiếu mảnh*: Nút hiển thị màu xám `[Chưa Đủ Mảnh Danh Tướng]` $\rightarrow$ Nhấp vào mở Modal gợi ý: *"Nhận thêm mảnh qua Chiêu Hiền Các hoặc Cửa Hàng!"*.

---

## 4. Wireframe Văn Bản (Text-Based Wireframe)

### Giao Diện Nâng Sao Danh Tướng (Star Ascension Screen)

```text
+---------------------------------------------------------------------------------------------------+
|  [ < QUAY LẠI ]                 NÂNG SAO DANH TƯỚNG - TRƯNG TRẮC                                  |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|         +-----------------------+              TIẾN TRÌNH SAO HIỆN TẠI:                           |
|         |                       |              [ ★ ★ ★ ☆ ☆ ]  (3 Sao)                             |
|         |    [ AVATAR TƯỚNG ]   |                                                                 |
|         |      TRƯNG TRẮC       |              MỤC TIÊU TIẾP THEO:                                |
|         |        Lv. 60         |              [ ★ ★ ★ ★ ☆ ]  (4 Sao)                             |
|         +-----------------------+                                                                 |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   NGUYÊN LIỆU TIÊU HAO:                                                                           |
|   🧩 Mảnh Trưng Trắc: [ ====================>...... ]  [ 75 / 100 Mảnh ]                          |
|   (Còn thiếu 25 Mảnh để kích hoạt 4 Sao)                                                          |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   THAY ĐỔI CHỈ SỐ KHI LÊN 4 SAO:                                                                  |
|   • Máu (HP):          2,400  =====>  3,100  (+700 HP)                                            |
|   • Sát thương (ATK):    210  =====>    280  (+70 Sát thương)                                     |
|   • Tầm đánh (Range):    190  =====>    200  (+10 Khoảng cách)                                    |
|   • Tốc đánh (ASPD):    1.10  =====>   1.15  (+0.05 đòn/s)                                        |
|   • Tỷ lệ bạo kích:       8%  =====>    10%  (+2% Bạo kích)                                       |
|   • Sát thương bạo:     160%  =====>   175%  (+15% Sát thương bạo)                                |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|             [ TÌM THÊM MẢNH ]              |           [ ⭐ TIẾN HÀNH NÂNG SAO ]                  |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type HeroStarLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type StarAscensionRequirement = {
  targetStar: HeroStarLevel;
  requiredShards: number;
};

export type HeroStarState = {
  heroId: string;
  currentStar: HeroStarLevel;
  currentOwnedShards: number;
  nextStarRequiredShards: number | null; // null nếu đã đạt max sao (6★)
  isMaxStar: boolean;
};

export type StarAscensionRequest = {
  heroId: string;
  targetStar: HeroStarLevel;
};

export type StarAscensionResult = {
  success: boolean;
  heroId: string;
  newStar: HeroStarLevel;
  remainingShards: number;
  newBaseStats: {
    hp: number;
    atk: number;
    range: number;
    attackSpeed: number;
    crit: number;
    critDamage: number;
  };
  errorMessage?: string;
};
```

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)

* **Xác thực trừ đúng ID mảnh**: Core phải kiểm tra `consumedShardItemId === 'shard_hero_' + heroId` để tránh việc dùng nhầm mảnh tướng A nâng cho tướng B.
* **Ngăn chặn vượt trần sao**: Nếu `currentStar === 6`, nút nâng sao chuyển sang trạng thái `[ĐÃ ĐẠT SAO TỐI ĐA]` và không cho phép gửi thêm request.
