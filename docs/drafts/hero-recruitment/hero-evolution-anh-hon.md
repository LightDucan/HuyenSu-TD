# Hệ Thống Tiến Hóa Bậc & Anh Hồn (Hero Evolution & Soul Awakening Spec)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

Hệ thống Tiến Hóa Bậc của Danh Tướng tuân thủ nghiêm ngặt quy chuẩn kiến trúc đã được chốt:

1. **4 Tầng Tiến Hóa Danh Tướng (Evolution Tiers)**:
   * **Bậc 1: Phổ Thông (Normal)**: Giới hạn cấp độ từ `Lv.1` đến `Lv.100`.
   * **Bậc 2: Trùng Sinh (Rebirth)**: Giới hạn cấp độ từ `Lv.1` đến `Lv.100` (đòi hỏi đạt Normal Lv.100 để kích hoạt).
   * **Bậc 3: Tái Sinh (Reincarnation)**: Giới hạn cấp độ từ `Lv.1` đến `Lv.100` (đòi hỏi đạt Rebirth Lv.100 để kích hoạt).
   * **Bậc 4: Huyền Sử (Legendary)**: Đỉnh cao sức mạnh truyền thuyết (đòi hỏi đạt Reincarnation Lv.100 để kích hoạt).
2. **Khai Mở Nội Tại Đặc Biệt (Legendary Passive Awakening)**:
   * Khi đạt tới tầng **Huyền Sử (Legendary)**, Hero sẽ chính thức **mở khóa Kỹ Năng Bị Động Đặc Quyền (Legendary Passive)** mang đậm bản sắc lịch sử của danh tướng đó (ví dụ: Passive tăng sát thương toàn đội, khuếch đại hiệu ứng khống chế).
3. **Nguyên Liệu Tiến Hóa Độc Quyền — Anh Hồn (Hero Souls)**:
   * **Anh Hồn (Hero Souls)** là vật phẩm tinh hoa chuyên biệt được sử dụng **DUY NHẤT CHO CÁC MỐC TIẾN HÓA BẬC (Trùng Sinh / Tái Sinh / Huyền Sử)**.
   * **Phân định rạch ròi**:
     * **Mảnh Danh Tướng (Hero Shards)**: Chỉ dùng cho **Nâng Sao (1★ $\rightarrow$ 6★)**.
     * **Anh Hồn (Hero Souls)**: Chỉ dùng cho **Tiến Hóa Bậc (Normal $\rightarrow$ Rebirth $\rightarrow$ Reincarnation $\rightarrow$ Legendary)**.
4. **Không Thêm Chỉ Số DEF**:
   * Tiến hóa bậc gia tăng mạnh mẽ các chỉ số cơ bản: **HP**, **ATK**, **Range**, **AttackSpeed**, **Crit**, **CritDamage**. Tuyệt đối **không có chỉ số DEF**.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)

* **Module Tiến Trình Tướng (Hero Progression Domain — Codex xác nhận)**: Quản lý tầng tiến hóa (`evolutionTier: 'normal' | 'rebirth' | 'reincarnation' | 'legendary'`) và cấp độ hiện tại của tướng.
* **Module Quản Lý Kho Anh Hồn (Soul Essence Inventory — Codex xác nhận)**: Lưu trữ và trừ số lượng Anh Hồn khi thực hiện nghi thức tiến hóa.
* **Khung Quản Lý Kỹ Năng (Skill & Passive Framework — Codex xác nhận)**: Kích hoạt trạng thái mở khóa của Passive Huyền Sử khi tướng đạt cấp Legendary.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)

1. **Truy cập Giao Diện Tiến Hóa**:
   * Tại `HeroDetailModal` $\rightarrow$ Chọn Tab **[Tiến Hóa / Anh Hồn]**.
2. **Kiểm Tra Điều Kiện**:
   * *Điều kiện Cấp độ*: Tướng phải đạt tối đa `Lv.100` của bậc hiện tại.
   * *Điều kiện Vật phẩm*: Đủ số lượng **Anh Hồn** theo yêu cầu của bậc tiếp theo.
3. **Thực Hiện Nghi Thức Tiến Hóa**:
   * Người chơi nhấn nút **[Kích Hoạt Trùng Sinh / Tái Sinh / Khai Mở Huyền Sử]**.
   * Hệ thống kiểm tra toàn vẹn $\rightarrow$ Trừ Anh Hồn $\rightarrow$ Nâng bậc tiến hóa $\rightarrow$ Đưa Level về `Lv.1` của bậc mới (giữ nguyên Sao và mở khóa hệ số tăng trưởng mới).
   * Phát hiệu ứng hoạt cảnh Phượng Hoàng / Rồng Thiêng thăng hoa (Ascension Awakening VFX).
   * Nếu thăng hoa lên bậc **Huyền Sử**: Xuất hiện thông báo đặc biệt: **[🎉 ĐÃ KHAI MỞ NỘI TẠI HUYỀN SỬ!]**.

---

## 4. Wireframe Văn Bản (Text-Based Wireframe)

### Giao Diện Tiến Hóa Bậc & Anh Hồn (Hero Evolution Screen)

```text
+---------------------------------------------------------------------------------------------------+
|  [ < QUAY LẠI ]            TIẾN HÓA DANH TƯỚNG & KHAI MỞ HUYỀN SỬ - TRƯNG TRẮC                    |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|   LỘ TRÌNH TIẾN HÓA BẬC DANH TƯỚNG:                                                               |
|                                                                                                   |
|     [ 1. PHỔ THÔNG ]   ====>   [ 2. TRÙNG SINH ]   ====>   [ 3. TÁI SINH ]   ====>   [ 4. HUYỀN SỬ ] |
|      (Đã Hoàn Thành)            (Đang Ở Bậc Này)             (Mục Tiêu Tới)          (Mở Passive Ải) |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   TRẠNG THÁI HIỆN TẠI:                                                                            |
|   • Cấp hiện tại:       Trùng Sinh Lv. 100 / 100  [ ĐÃ ĐẠT CẤP TỐI ĐA ]                          |
|   • Cấp Sao:            4★                                                                        |
|                                                                                                   |
|   ĐIỀU KIỆN TIẾN HÓA LÊN BẬC [ 3. TÁI SINH ]:                                                     |
|   1. Cấp độ tối đa:     [ V ] Đã đạt Trùng Sinh Lv. 100                                           |
|   2. Tiêu hao vật phẩm:                                                                           |
|      🔥 Anh Hồn Trưng Trắc: [ ====================>...... ]  [ 40 / 50 Hồn ]                       |
|      (Còn thiếu 10 Anh Hồn Trưng Trắc)                                                            |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   LỢI ÍCH KHI ĐẠT BẬC TÁI SINH:                                                                   |
|   • Mở khóa giới hạn Level: Tái Sinh Lv. 1 – 100 với hệ số chỉ số cơ bản x1.5                    |
|   • Tiến gần hơn tới mốc BẬC 4 - HUYỀN SỬ:                                                        |
|     "Mở khóa Passive [Hịch Truyền Non Sông]: Tăng 20% sát thương đòn đánh toàn đội hình"          |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|             [ TÌM KIẾM ANH HỒN ]           |      [ 🔥 KÍCH HOẠT TIẾN HÓA TÁI SINH ]              |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type HeroEvolutionTier = 'normal' | 'rebirth' | 'reincarnation' | 'legendary';

export type EvolutionTierConfig = {
  tier: HeroEvolutionTier;
  name: string; // 'Phổ Thông' | 'Trùng Sinh' | 'Tái Sinh' | 'Huyền Sử'
  maxLevel: 100;
  requiredHeroSouls: number; // Số lượng Anh Hồn cần để thăng lên bậc kế tiếp
  unlocksLegendaryPassive: boolean; // true khi tier === 'legendary'
};

export type HeroEvolutionState = {
  heroId: string;
  currentTier: HeroEvolutionTier;
  currentLevel: number; // 1-100
  isMaxLevelInTier: boolean; // currentLevel === 100
  ownedHeroSouls: number;
  nextTierRequiredSouls: number | null;
  isLegendaryUnlocked: boolean;
};

export type HeroAscensionRequest = {
  heroId: string;
  targetTier: HeroEvolutionTier;
};

export type HeroAscensionResult = {
  success: boolean;
  heroId: string;
  newTier: HeroEvolutionTier;
  newLevel: 1;
  remainingHeroSouls: number;
  isLegendaryPassiveUnlocked: boolean;
  errorMessage?: string;
};
```

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)

* **Xác thực Lv.100 trước khi thăng bậc**: Core phải chặn mọi request thăng bậc nếu `currentLevel < 100`.
* **Không nhầm lẫn giữa Mảnh Tướng và Anh Hồn**: Core phải phân tách 2 schema item hoàn toàn riêng biệt trong Inventory (`shard_hero_<id>` vs `soul_hero_<id>`).
