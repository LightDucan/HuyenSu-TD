# Quy Tắc Trang Bị & Ghép Đồ (Equipment Flat Bonus & Merging)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

### 1.1. Quy Tắc Chỉ Số Cộng Thẳng (Flat Bonus Only)
* **Equipment Thường (Vũ Khí & Ngọc)**:
  * **CHỈ CÓ BONUS CỘNG THẲNG (Flat Bonus)**:
    * `ATK +N` (ví dụ: `+15`, `+30`, `+50`)
    * `Range +N` (ví dụ: `+10`, `+20`, `+35`)
    * `AttackSpeed +N` (ví dụ: `+0.05`, `+0.10`, `+0.18`)
  * **TUYỆT ĐỐI KHÔNG DÙNG BONUS PHẦN TRĂM (%) CHO EQUIPMENT THƯỜNG**.
* **Nguyên tắc phân định %**: Chỉ số phần trăm (`% ATK`, `% Crit`, `% ASPD`) **DUY NHẤT CHỈ NẰM TRONG PASSIVE HUYỀN SỬ** của Hero.

### 1.2. Cấp Độ & Cơ Chế Ghép Đồ (Equipment Merging)
* **Cấp độ**: Equipment thường có cấp độ từ **Level 1 đến Level 10** (`Lv.1` – `Lv.10`).
* **Quy tắc Ghép 3 thành 1 (3-to-1 Merge)**:
  * Tiêu hao **3 món trang bị CÙNG ID VÀ CÙNG LEVEL** $\rightarrow$ Tạo ra **1 món trang bị cùng ID có Level cao hơn 1 bậc** ($Lv \rightarrow Lv+1$).
  * Ví dụ: 3 $\times$ *Thanh Long Đao Lv.1* $\rightarrow$ 1 $\times$ *Thanh Long Đao Lv.2*.
  * Chi phí ghép: Tiêu hao một lượng Vàng nhỏ theo cấp độ.
* **Vũ Khí Đặc Thù Hero (Hero Unique Weapon)**:
  * Các vũ khí mang tính biểu tượng riêng gắn liền với truyền thuyết của Hero (nếu có) **không tham gia nâng cấp và không được ghép**.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Equipment System (`src/domain/equipment/`)**: Quản lý schema trang bị và tính toán `StatModifier` theo các giá trị cộng thẳng.
* **Inventory Store**: Cập nhật danh sách trang bị (trừ 3 món nguyên liệu, thêm 1 món kết quả mới).
* **Stat Calculator**: Tổng hợp: $\text{FinalStat} = \text{BaseStat} + \sum \text{FlatBonus}$.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Truy cập Giao diện Ghép Đồ**:
   * Tại Tab Hành Trang $\rightarrow$ Chọn một món trang bị $\rightarrow$ Nút `[Ghép Nâng Cấp]`.
   * Hoặc tại Modal Nâng Cấp Trang Bị trong `HeroDetailModal`.
2. **Giao Diện Ghép Đồ (Equipment Merge Modal)**:
   * Hiển thị:
     * Ô chính: Món trang bị mục tiêu.
     * 3 ô nguyên liệu: Tự động gom 3 món cùng loại và cùng cấp trong kho.
     * So sánh chỉ số: Hiển thị rõ giá trị Flat Bonus trước $\rightarrow$ sau ghép.
     * Chi phí: `[Icon Vàng] Phí ghép: 300 Vàng`.
   * Nhấn `[Tiến Hành Ghép]`:
     * Core kiểm tra đủ 3 món và đủ Vàng $\rightarrow$ Trừ 3 món cũ $\rightarrow$ Sinh ra 1 món mới $Lv+1$.
     * UI phát hiệu ứng dung hợp hào quang kim loại (Forge Sparks VFX) $\rightarrow$ Cập nhật hiển thị.

---

## 4. Wireframe Văn Bản (Text-Based Wireframe)

### UI Ghép Trang Bị (3-to-1 Equipment Merge Screen)
```text
+-------------------------------------------------------------------+
|                     LÒ RÈN - DUNG HỢP TRANG BỊ                    |
+-------------------------------------------------------------------+
|                                                                   |
|               NGUYÊN LIỆU (Cần 3 món cùng loại & cấp)             |
|                                                                   |
|       +---------------+   +---------------+   +---------------+   |
|       |  [🗡️ VŨ KHÍ]   |   |  [🗡️ VŨ KHÍ]   |   |  [🗡️ VŨ KHÍ]   |   |
|       | Thanh Long Đao|   | Thanh Long Đao|   | Thanh Long Đao|   |
|       |     Lv. 1     | + |     Lv. 1     | + |     Lv. 1     |   |
|       |   (ATK +15)   |   |   (ATK +15)   |   |   (ATK +15)   |   |
|       +---------------+   +---------------+   +---------------+   |
|                                                                   |
|                                 |                                 |
|                                 V                                 |
|                                                                   |
|                          KẾT QUẢ DỰ TÍNH                          |
|                       +-------------------+                       |
|                       |   [🗡️ VŨ KHÍ MỚI]  |                       |
|                       |  Thanh Long Đao   |                       |
|                       |       Lv. 2       |                       |
|                       |     (ATK +28)     |                       |
|                       +-------------------+                       |
|                                                                   |
|   Thay đổi chỉ số:  ATK: +15  =====>  ATK: +28  (+13 Sát thương)   |
|   Tỷ lệ thành công: 100%                                          |
|   Chi phí dung hợp: [💰 Vàng] 300 Vàng                            |
|                                                                   |
+-------------------------------------------------------------------+
|             [ HỦY ]                |      [ TIẾN HÀNH GHÉP ]      |
+-------------------------------------------------------------------+
```

---

## 5. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type EquipmentTierLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type FlatStatModifier = {
  atk?: number;         // Flat addition (e.g. +15)
  range?: number;       // Flat addition (e.g. +20)
  attackSpeed?: number; // Flat addition (e.g. +0.08)
};

export type StandardEquipmentItem = {
  uid: string; // Unique instance ID
  definitionId: string; // e.g. 'eq_thanh_long_dao'
  name: string;
  type: 'weapon' | 'gem';
  level: EquipmentTierLevel;
  flatBonus: FlatStatModifier;
  isEquippedByHeroId?: string; // null nếu đang ở trong kho
};

export type MergeEquipmentRequest = {
  targetDefinitionId: string;
  currentLevel: EquipmentTierLevel; // 1-9 (Lv.10 là max)
  consumedInstanceIds: [string, string, string]; // Đúng 3 ID nguyên liệu
};
```

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Không ghép món đang được trang bị trên Hero**: Nếu 1 trong 3 món nguyên liệu đang được Hero đeo trên sân, hệ thống phải yêu cầu tháo ra trước hoặc từ chối ghép để tránh làm mất trang bị đang kích hoạt trong trận.
* **Xác thực toàn vẹn 3 ID**: Core phải kiểm tra cả 3 `consumedInstanceIds` đều tồn tại độc lập trong kho, không cho phép gửi trùng lặp 1 ID ba lần.

---

## 7. Quyết Định Còn Mở (Open Decisions)
1. **Bảng chỉ số Flat Bonus chuẩn**: Bảng giá trị cộng thẳng chi tiết cho từng loại vũ khí/ngọc từ Lv.1 đến Lv.10 (sẽ do Game Design/Codex chốt sau).
2. **Chi phí Vàng khi ghép**: Công thức tính phí Vàng theo cấp độ ghép (ví dụ: $\text{Fee} = 100 \times \text{Level}$ hay theo bảng cố định)?
