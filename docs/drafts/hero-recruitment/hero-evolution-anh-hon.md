# Hệ Thống Tiến Hóa Bậc & Anh Hồn (Hero Evolution & Soul Awakening Spec)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

Hệ thống Tiến Hóa Bậc của Danh Tướng tuân thủ nghiêm ngặt quy chuẩn kiến trúc đã được chốt:

1. **4 Tầng Tiến Hóa Danh Tướng (Evolution Tiers)**:
   * **Bậc 1: Phổ Thông (Normal)**: Giới hạn cấp độ từ `Lv.1` đến `Lv.100`.
   * **Bậc 2: Trùng Sinh (Rebirth)**: Giới hạn cấp độ từ `Lv.1` đến `Lv.100` (đòi hỏi đạt Normal Lv.100 để kích hoạt).
   * **Bậc 3: Tái Sinh (Reincarnation)**: Giới hạn cấp độ từ `Lv.1` đến `Lv.100` (đòi hỏi đạt Rebirth Lv.100 để kích hoạt).
   * **Bậc 4: Huyền Sử (Legendary)**: Đỉnh cao sức mạnh truyền thuyết (đòi hỏi đạt Reincarnation Lv.100 để kích hoạt).
2. **Khai Mở Nội Tại Đặc Biệt (Legendary Passive Awakening)**:
   * Khi đạt tới tầng **Huyền Sử (Legendary)**, Hero sẽ chính thức **mở khóa Kỹ Năng Bị Động Đặc Quyền (Legendary Passive) qua shared passive system**.
   * Toàn bộ **modifier phần trăm (%)** của hệ thống tướng **chỉ dành riêng cho Passive Huyền Sử**.
3. **Nguyên Liệu Tiến Hóa — Anh Hồn (Shared Material)**:
   * **Anh Hồn (`anh-hon`)** là vật phẩm tài nguyên **DÙNG CHUNG CHO TOÀN BỘ HERO**, được sử dụng **DUY NHẤT CHO CÁC MỐC TIẾN HÓA BẬC (Trùng Sinh / Tái Sinh / Huyền Sử)**.
   * **Tuyệt đối không phân tách Anh Hồn theo từng tướng** (không dùng *Anh Hồn Trưng Trắc* hay `soul_hero_<id>`).
   * **Phân định rạch ròi**:
     * **Mảnh Danh Tướng (`shard_hero_<heroId>`)**: Material riêng của từng Hero, chỉ dùng cho **Nâng Sao (1★ $\rightarrow$ 5★)**.
     * **Anh Hồn (`anh-hon`)**: Material dùng chung cho toàn bộ Hero, chỉ dùng cho **Tiến Hóa Bậc (Normal $\rightarrow$ Rebirth $\rightarrow$ Reincarnation $\rightarrow$ Legendary)**.
4. **Không Thêm Chỉ Số DEF**:
   * Tiến hóa bậc gia tăng mạnh mẽ 6 chỉ số cơ bản: **HP**, **ATK**, **Range**, **AttackSpeed**, **Crit**, **CritDamage**. Tuyệt đối **không có chỉ số DEF**.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)

* **Module Tiến Trình Tướng (Hero Progression Domain — Codex xác nhận)**: Quản lý tầng tiến hóa (`evolutionTier: 'normal' | 'rebirth' | 'reincarnation' | 'legendary'`) và cấp độ hiện tại của tướng.
* **Module Quản Lý Kho Anh Hồn (Shared Soul Inventory — Codex xác nhận)**: Lưu trữ và trừ số lượng Anh Hồn dùng chung (`anh-hon`) khi thực hiện nghi thức tiến hóa.
* **Khung Quản Lý Kỹ Năng (Skill & Passive Framework — Codex xác nhận)**: Kích hoạt trạng thái mở khóa của Passive Huyền Sử qua shared passive system khi tướng đạt cấp Legendary.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)

1. **Truy cập Giao Diện Tiến Hóa**:
   * Tại `HeroDetailModal` $\rightarrow$ Chọn Tab **[Tiến Hóa / Anh Hồn]**.
2. **Kiểm Tra Điều Kiện**:
   * *Điều kiện Cấp độ*: Tướng phải đạt tối đa `Lv.100` của bậc hiện tại.
   * *Điều kiện Vật phẩm*: Đủ số lượng **Anh Hồn** (`anh-hon`) theo yêu cầu của bậc tiếp theo.
3. **Thực Hiện Nghi Thức Tiến Hóa**:
   * Người chơi nhấn nút **[Kích Hoạt Trùng Sinh / Tái Sinh / Khai Mở Huyền Sử]**.
   * Hệ thống kiểm tra toàn vẹn $\rightarrow$ Trừ Anh Hồn $\rightarrow$ Nâng bậc tiến hóa $\rightarrow$ Đưa Level về `Lv.1` của bậc mới (giữ nguyên Sao và áp dụng bảng tăng trưởng của bậc mới).
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
|   • Cấp hiện tại:       Trùng Sinh [Lv. 100 / 100 - ĐÃ ĐẠT CẤP TỐI ĐA]                            |
|   • Cấp Sao:            [Current Stars]★                                                          |
|                                                                                                   |
|   ĐIỀU KIỆN TIẾN HÓA LÊN BẬC [ 3. TÁI SINH ]:                                                     |
|   1. Cấp độ tối đa:     [ V ] Đã đạt Trùng Sinh Lv. 100                                           |
|   2. Tiêu hao vật phẩm:                                                                           |
|      🔥 Anh Hồn (Chung):  [ ====================>...... ]  [ [Current] / [Required] Anh Hồn ]     |
|      (Cần tích lũy đủ [Required] Anh Hồn để kích hoạt bậc kế tiếp)                                |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|   LỢI ÍCH KHI ĐẠT BẬC TÁI SINH:                                                                   |
|   • Mở khóa giới hạn Level: Tái Sinh Lv. 1 – 100 với hệ số chỉ số cơ bản tăng trưởng mới          |
|   • Tiến gần hơn tới mốc BẬC 4 - HUYỀN SỬ:                                                        |
|     "Mở khóa Passive Huyền Sử qua shared passive system"                                          |
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
  requiredAnhHon: number; // Số lượng Anh Hồn (material chung) cần để thăng lên bậc kế tiếp
  unlocksLegendaryPassive: boolean; // true khi tier === 'legendary'
};

export type HeroEvolutionState = {
  heroId: string;
  currentTier: HeroEvolutionTier;
  currentLevel: number; // 1-100
  isMaxLevelInTier: boolean; // currentLevel === 100
  ownedAnhHon: number; // Số lượng Anh Hồn chung trong tài khoản
  nextTierRequiredAnhHon: number | null;
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
  remainingAnhHon: number;
  isLegendaryPassiveUnlocked: boolean;
  errorMessage?: string;
};
```

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)

* **Xác thực Lv.100 trước khi thăng bậc**: Core phải chặn mọi request thăng bậc nếu `currentLevel < 100`.
* **Phân định rạch ròi Mảnh Tướng và Anh Hồn**: Core lưu trữ Mảnh Danh Tướng theo từng Hero (`shard_hero_<heroId>`) và Anh Hồn là vật phẩm chung (`anh-hon`). Tuyệt đối không dùng chéo nguyên liệu.
