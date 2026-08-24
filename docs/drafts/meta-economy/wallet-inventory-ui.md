# Giao Diện Ví Tiền Tệ, Thể Lực & Hành Trang (Header HUD & Inventory UI Spec)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
* **Thanh Header HUD Thường Trực**: Luôn hiển thị trên cùng (Header Bar) ở mọi màn hình, thể hiện 2 loại Tiền tệ (Vàng, KNB) cùng Tài nguyên Thể lực (Quân Lệnh):
  * **Vàng (Gold — Currency)**: Biểu tượng thỏi vàng / đồng xu vàng.
  * **Kim Nguyên Bảo (KNB / Ingot — Currency)**: Biểu tượng đĩnh bạc/vàng quý.
  * **Quân Lệnh (Command Energy — Energy Resource)**: Biểu tượng Lệnh Bài, hiển thị `Hiện tại / Giới hạn` (ví dụ: `45 / 60` hoặc `75 / 60` khi Overflow).
* **Khu vực Dưới Trận (Bottom Player HUD Area)**:
  * Phân chia thành **2 Tab chuyển đổi linh hoạt**:
    * **Tab 1: Đội Hình**: Dùng để quản lý, chọn thẻ bài Hero, đặt Hero lên bản đồ và di chuyển vị trí Hero.
    * **Tab 2: Hành Trang**: Chứa Vũ Khí, Ngọc và các vật phẩm tiêu hao (Binh Phù, Lệnh Hiệu Triệu, Rương).

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)
* **Trạng Thái Ví (Wallet State — Codex xác nhận)**: Cung cấp snapshot số dư 2 loại tiền tệ (Vàng, KNB).
* **Trạng Thái Quân Lệnh (Command Energy State — Codex xác nhận)**: Cung cấp snapshot trạng thái thể lực Quân Lệnh (current, max, regen timer, overflow).
* **Kho Đồ (Inventory Management — Codex xác nhận)**: Cung cấp danh sách item (Vũ khí, Ngọc, Vật phẩm tiêu hao) kèm số lượng `count`.
* **Module Quản Lý Triển Khai (Placement Management — Codex xác nhận)**: Nhận lệnh đặt/di chuyển Hero từ Tab Đội Hình.
* **Module Tiến Trình Tướng & Trang Bị (Hero Progression & Equipment — Codex xác nhận)**: Tương tác trang bị Vũ Khí/Ngọc từ Tab Hành Trang sang Hero.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Chuyển đổi Tab dưới trận**:
   * Người chơi nhấp vào nút `[Đội Hình]` hoặc `[Hành Trang]` ở cạnh Bottom Bar.
   * Giao diện chuyển đổi tức thì không giật lag, không làm gián đoạn trận đánh (Real-time).
2. **Thao tác tại Tab Đội Hình**:
   * Nhấp chọn 1 thẻ tướng $\rightarrow$ Hiển thị vòng tròn tầm đánh (Range Circle) trên bản đồ $\rightarrow$ Nhấp vào ô trống hợp lệ để triển khai / Nhấp vào ô mới để di chuyển (Reposition).
   * Nhấp vào avatar tướng đang chọn $\rightarrow$ Mở `HeroDetailModal`.
3. **Thao tác tại Tab Hành Trang**:
   * Phân loại bộ lọc: `[Tất Cả]`, `[Vũ Khí]`, `[Ngọc]`, `[Tiêu Hao]`.
   * Nhấp vào vật phẩm $\rightarrow$ Hiển thị Tooltip chi tiết:
     * *Nếu là Binh Phù*: Nút `[Sử Dụng]` $\rightarrow$ Mở Popup chọn số lượng.
     * *Nếu là Trang bị (Vũ Khí/Ngọc)*: Nút `[Trang Bị]` (chọn Hero gán) hoặc `[Ghép 3->1]`.
     * *Nếu là Lệnh Hiệu Triệu*: Nút `[Sử Dụng]` $\rightarrow$ Mở Popup xác nhận tăng +1 Slot.

---

## 4. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type PlayerWalletSnapshot = {
  gold: number;
  knb: number;
};

export type CommandEnergySnapshot = {
  current: number;
  max: number;
  isOverflow: boolean;
  secondsToNextRegen: number; // 0 nếu current >= max
};

export type HeaderHUDSnapshot = {
  wallet: PlayerWalletSnapshot;
  commandEnergy: CommandEnergySnapshot;
};

export type InventoryItemType = 'weapon' | 'gem' | 'consumable' | 'special';

export type InventoryItemSlot = {
  slotId: string;
  itemId: string;
  name: string;
  type: InventoryItemType;
  level?: number; // 1-10 cho equipment thường
  count: number;
  iconId: string;
  flatBonus?: {
    atk?: number;
    range?: number;
    attackSpeed?: number;
  };
  consumableEffect?: {
    type: 'add_energy' | 'add_deployment_slot';
    value: number;
  };
};
```

---

## 5. Wireframes Dạng Văn Bản (Text-Based Wireframes)

### 5.1. Wireframe Thanh Header HUD (Header Bar)
```text
+---------------------------------------------------------------------------------------------------+
|  [AVATAR] Chủ Công Lv.12  |  [💰 Vàng] 45,200  |  [💎 KNB] 1,250  |  [📜 Quân Lệnh] 58/60 (01:15)  |
+---------------------------------------------------------------------------------------------------+
```
*(Ghi chú: Khi Overflow, ví dụ dùng Đại Binh Phù, hiển thị: `[📜 Quân Lệnh] 75/60 (Ngừng hồi)` với màu vàng/cam sáng)*

---

### 5.2. Wireframe Khu Vực Dưới Trận — Tab Đội Hình
```text
+---------------------------------------------------------------------------------------------------+
| [TAB: ĐỘI HÌNH (Active)] | [TAB: HÀNH TRANG]               | Triển khai: 4/7 Tướng | [Auto Wave: BẬT]  |
+---------------------------------------------------------------------------------------------------+
| [Quan Vũ]      | [Triệu Vân]    | [Trương Phi]   | [Hoàng Trung]  | [Gia Cát Lượng] | [ + ] Trống | 🔒  |
| Lv.35 ★★★      | Lv.32 ★★       | Lv.30 ★★       | Lv.28 ★        | Lv.25 ★         | Chọn Tướng  | Cấp |
| [Trên Sân: C3] | [Trên Sân: D4] | [Trên Sân: C5] | [Trên Sân: D6] | [Trong Tay]     |             | 15  |
+---------------------------------------------------------------------------------------------------+
```

---

### 5.3. Wireframe Khu Vực Dưới Trận — Tab Hành Trang
```text
+---------------------------------------------------------------------------------------------------+
| [TAB: ĐỘI HÌNH] | [TAB: HÀNH TRANG (Active)]   | Bộ lọc: [Tất Cả] [Vũ Khí] [Ngọc] [Tiêu Hao] (14/50) |
+---------------------------------------------------------------------------------------------------+
| [Thanh Long Đao] | [Huyết Ngọc] | [Bạch Ngọc]  | [Tiểu Binh Phù] | [Trung Binh Phù] | [Lệnh Hiệu Triệu] |
| Lv.1 (ATK+15)    | Lv.2 (ATK+25)| Lv.1 (ASPD+0.05)| x12          | x4               | x1                |
| [Ghép (2/3)]     | [Đang đeo]   | [Trang Bị]   | [Dùng]          | [Dùng]           | [Dùng]            |
+---------------------------------------------------------------------------------------------------+
```

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Không lag giật khi chuyển Tab**: Dữ liệu danh sách item trong Hành Trang cần được tối ưu React Memoization để việc bấm chuyển Tab giữa Đội Hình và Hành Trang diễn ra tức thì (< 16ms).
* **Đồng bộ hóa Item Lock**: Khi một món trang bị đang được đeo bởi Hero trên sân, trong Hành Trang phải gắn nhãn `[Đang đeo: Quan Vũ]` và không cho phép xóa/bán/ghép nếu chưa tháo.

---

## 7. Quyết Định Còn Mở (Open Decisions)
1. **Dung lượng tối đa của Hành Trang**: Hành Trang có giới hạn số ô chứa (ví dụ: 50 ô, 100 ô) hay không giới hạn?
2. **Quy tắc xếp chồng (Stacking)**: Vật phẩm tiêu hao (Binh Phù) xếp chồng tối đa 999 món/ô; Trang bị (Vũ khí/Ngọc) mỗi món chiếm 1 ô độc lập hay cho phép xếp chồng theo cùng ID và Level?
