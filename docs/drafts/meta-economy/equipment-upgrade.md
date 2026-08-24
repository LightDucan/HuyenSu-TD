# Nâng Cấp Trang Bị (Equipment Upgrade & Refinement)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
* **Phân loại trang bị**: Vũ Khí (Weapon) và Ngọc (Gem) theo chuẩn Phase 6 của Codex.
* **Chỉ số gia tăng**: Cường hóa trang bị gia tăng trực tiếp các giá trị bonus thuần túy:
  * Vũ Khí: Tăng `atk`, `attackSpeed`, hoặc `range`.
  * Ngọc: Tăng `crit`, `critDamage`, `atk`, v.v.
* **Quy tắc không có DEF**: Không có chỉ số phòng thủ (DEF) trên bất kỳ trang bị nào.
* **Chi phí cường hóa**: Tiêu hao Vàng (Gold) tăng dần theo cấp độ cường hóa của món đồ; có thể yêu cầu thêm Đá Cường Hóa (Enhance Stones) ở các mốc cao.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Equipment Core (`src/domain/equipment/`)**: Quản lý trang bị gắn trên từng Hero và tính toán `StatModifier`.
* **Stat Calculator (`src/domain/progression/`)**: Tổng hợp Base Stat của Hero + Bonus Trang bị $\rightarrow$ Final Stat.
* **Wallet State**: Trừ Vàng khi người chơi xác nhận nâng cấp.
* **HeroDetailModal / EquipmentModal**: Giao diện hiển thị chỉ số và nút tương tác.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Trong HeroDetailModal (Tab Trang Bị)**:
   * Nhấp vào ô Vũ Khí hoặc Ngọc đã trang bị $\rightarrow$ Mở rộng khung Chi Tiết Trang Bị.
2. **Hiển thị thông số nâng cấp**:
   * Cấp trang bị hiện tại: `Lv. 5 / 20`
   * Bảng so sánh chỉ số:
     * ATK: `+25` $\rightarrow$ `+32` *(Màu xanh lá biểu thị tăng trưởng)*
     * Tốc đánh: `+0.05` $\rightarrow$ `+0.07`
   * Chi phí nâng cấp: `[Icon Vàng] 800 Vàng`
3. **Thao tác**:
   * Nhấn nút **"Cường Hóa"**:
     * Phát callback `onUpgradeEquipmentRequest(heroId, slotType)`.
     * Core xác thực đủ Vàng $\rightarrow$ Trừ Vàng $\rightarrow$ Tăng cấp trang bị $\rightarrow$ Cập nhật `HeroProgressionState`.
     * UI phát hiệu ứng ánh sáng lấp lánh (Sparkle VFX) và cập nhật chỉ số mới.

---

## 4. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type EquipmentItemData = {
  id: string;
  name: string;
  type: 'weapon' | 'gem';
  level: number;
  maxLevel: number;
  currentBonus: {
    atk?: number;
    attackSpeed?: number;
    range?: number;
    crit?: number;
    critDamage?: number;
  };
  nextLevelBonus?: {
    atk?: number;
    attackSpeed?: number;
    range?: number;
    crit?: number;
    critDamage?: number;
  };
  upgradeCost: {
    gold: number;
    materialId?: string;
    materialCount?: number;
  };
};
```

* **Action Callbacks cần cung cấp**:
  * `onUpgradeEquipment(heroId: string, slot: 'weapon' | 'gem'): { success: boolean; updatedEquipment: EquipmentItemData; error?: string }`
  * `onUnequipItem(heroId: string, slot: 'weapon' | 'gem'): void`

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Ràng buộc tuyệt đối**: UI **KHÔNG ĐƯỢC TỰ TÍNH** chỉ số sau nâng cấp (`nextLevelBonus = currentBonus + 5`). Mọi giá trị phải được cung cấp sẵn từ Stat Calculator của Core.
* **Không lưu state ảo ở React**: Dữ liệu trang bị phải đồng bộ vào `HeroProgressionState` và lưu trữ bền vững qua hệ thống Save/Load của Domain.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Tỷ lệ thành công**: Cường hóa trang bị là 100% thành công, hay có tỷ lệ thất bại (và có bị rớt cấp khi thất bại không)?
2. **Cấp tối đa của trang bị**: Cấp tối đa của Vũ khí/Ngọc bị chặn bởi Cấp độ Hero (ví dụ: Vũ khí không được vượt quá cấp Hero hiện tại) hay nâng cấp độc lập hoàn toàn?
3. **Tính năng Tách / Tẩy luyện (Dismantle / Reforge)**: Có cho phép phân tách trang bị cũ để thu hồi lại 70-80% Vàng đã nâng cấp không?
