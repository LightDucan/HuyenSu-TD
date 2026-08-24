# Hệ Thống Nâng Sao Danh Tướng (Star Ascension System)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

Hệ thống Nâng Sao Tướng (Star Ascension) tuân thủ chặt chẽ các nguyên tắc sau:

1. **Nguyên Liệu Nâng Sao Độc Quyền**:
   * Quá trình Nâng Sao **CHỈ SỬ DỤNG DUY NHẤT MẢNH DANH TƯỚNG** tương ứng với chính Hero đó (ví dụ: Nâng sao cho Trưng Trắc bắt buộc dùng *Mảnh Trưng Trắc*, không dùng chung cho tướng khác).
   * **Tuyệt đối không dùng Anh Hồn để Nâng Sao** (Anh Hồn được phân định riêng biệt cho hệ thống Tiến Hóa Bậc).
2. **Cấp Độ Sao (Star Tiers — LOCKED)**:
   * Tất cả tướng khi mới mở khóa khởi đầu ở **1 Sao (1★)**.
   * Tiến trình sao chính thức: **1★ $\rightarrow$ 2★ $\rightarrow$ 3★ $\rightarrow$ 4★ $\rightarrow$ 5★** (**Tuyệt đối không có 6★**).
3. **Quy Tắc Tăng Trưởng Chỉ Số (Flat Core Stat Growth Only)**:
   * Nâng sao **chỉ tăng 6 Core Stats** thông qua bảng tăng trưởng (Growth Data) cộng thẳng: **HP**, **ATK**, **Range**, **AttackSpeed**, **Crit**, **CritDamage**.
   * **Tuyệt đối không có chỉ số DEF** (tuân thủ triệt để luật dự án).
   * **Nâng sao KHÔNG tạo ra % modifier**: Mọi chỉ số nâng sao là giá trị cộng thẳng (Flat Bonus). Toàn bộ modifier phần trăm (%) chỉ dành riêng cho **Passive Huyền Sử**.
   * **Bảng chỉ số chi tiết (Exact Stat Table)** là tham số mở (**OPEN**), do Game Design & Codex phê duyệt.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)

* **Module Hồ Sơ Tướng (Hero Profile State — Codex xác nhận)**: Lưu trữ cấp sao hiện tại (`currentStars`) của từng tướng (1★ đến 5★).
* **Module Quản Lý Mảnh Tướng (Hero Shard Inventory — Codex xác nhận)**: Kiểm tra số dư và trừ `consumedShards` (`shard_hero_<heroId>`) khi thực hiện nâng sao.
* **Bộ Tính Chỉ Số Tướng (Hero Stat Calculator — Codex xác nhận)**: Tính toán lại bộ 6 chỉ số Core cộng thẳng thực tế sau khi tăng sao để áp dụng vào trận đánh.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)

1. **Truy cập Giao diện Nâng Sao**:
   * Tại `HeroDetailModal` (Xem chi tiết tướng) $\rightarrow$ Chọn Tab **[Nâng Sao]**.
2. **Hiển Thị Tiến Trình & So Sánh**:
   * Hiển thị số Sao hiện tại và Sao kế tiếp (ví dụ: `★★★☆☆ (3★)` $\rightarrow$ `★★★★☆ (4★)`).
   * Thanh tiến độ mảnh: `[Mảnh Danh Tướng: [Current] / [Required] Mảnh]`.
   * Bảng so sánh 6 chỉ số Core trước và sau khi nâng (Trước $\rightarrow$ Sau $\rightarrow$ Cộng thẳng +N).
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
|         |       (Level N)       |              [ ★ ★ ★ ★ ☆ ]  (4 Sao)                             |
|         +-----------------------+                                                                 |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   NGUYÊN LIỆU TIÊU HAO:                                                                           |
|   🧩 Mảnh Trưng Trắc: [ ====================>...... ]  [ [Current] / [Required] Mảnh ]            |
|   (Cần tích lũy đủ [Required] Mảnh để kích hoạt Sao kế tiếp)                                      |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   THAY ĐỔI 6 CHỈ SỐ CORE (CỘNG THẲNG THEO BẢNG GROWTH DATA):                                      |
|   • Máu (HP):                  [Current HP]   =====>   [New HP]   (+[Flat HP Bonus])              |
|   • Sát thương (ATK):          [Current ATK]  =====>   [New ATK]  (+[Flat ATK Bonus])             |
|   • Tầm đánh (Range):          [Current RNG]  =====>   [New RNG]  (+[Flat Range Bonus])           |
|   • Tốc đánh (ASPD):           [Current ASPD] =====>   [New ASPD] (+[Flat ASPD Bonus])           |
|   • Tỷ lệ bạo kích (Crit):     [Current Crit] =====>   [New Crit] (+[Flat Crit Bonus])           |
|   • Sát thương bạo (CritDmg):  [Current CDmg] =====>   [New CDmg] (+[Flat CritDmg Bonus])        |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|             [ TÌM THÊM MẢNH ]              |           [ ⭐ TIẾN HÀNH NÂNG SAO ]                  |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type HeroStarLevel = 1 | 2 | 3 | 4 | 5; // Chính thức 1★ đến 5★ (LOCKED)

export type StarAscensionRequirement = {
  targetStar: HeroStarLevel;
  requiredShards: number; // Mức mảnh yêu cầu (OPEN)
};

export type HeroStarState = {
  heroId: string;
  currentStar: HeroStarLevel;
  currentOwnedShards: number;
  nextStarRequiredShards: number | null; // null nếu đã đạt max sao (5★)
  isMaxStar: boolean; // currentStar === 5
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
* **Ngăn chặn vượt trần sao**: Nếu `currentStar === 5`, nút nâng sao chuyển sang trạng thái `[ĐÃ ĐẠT SAO TỐI ĐA (5★)]` và không cho phép gửi thêm request.
