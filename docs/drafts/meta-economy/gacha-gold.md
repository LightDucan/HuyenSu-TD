# Chiêu Mộ & Rương Báu Bằng Vàng (Gold Gacha & Recruitment)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
* **Mục tiêu**: Cung cấp tính năng Chiêu Mộ Tướng / Mở Rương Trang Bị bằng **Vàng in-game** (Gold), đảm bảo người chơi có thể mở rộng đội hình và trang bị thông qua nỗ lực cày cuốc (free-to-play friendly), không ép buộc nạp tiền.
* **Vật phẩm nhận được**:
  * Mảnh tướng (Hero Shards) hoặc mở khóa trực tiếp Hero mới.
  * Trang bị Vũ Khí / Ngọc ngẫu nhiên theo các bậc phẩm chất (Thường / Hiếm / Sử Thi).
  * Nguyên liệu cường hóa (Đá Cường Hóa, Sách Kinh Nghiệm).
* **Hình thức quay**:
  * Quay 1 lần (1x Pull).
  * Quay 10 lần (10x Pull) — Có ưu đãi đảm bảo ít nhất 1 vật phẩm phẩm chất Hiếm trở lên.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Gacha Domain Service / Seeded RNG**: Thực hiện việc bốc thăm ngẫu nhiên dựa trên Drop Table phía Core/Domain (không xử lý ngẫu nhiên ở UI).
* **Player Wallet**: Trừ số lượng Vàng tương ứng với số lượt quay.
* **Inventory / Hero Roster State**: Thêm các vật phẩm / Hero trúng thưởng vào kho lưu trữ của người chơi.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Màn hình Chiêu Mộ (Recruitment / Gacha Screen)**:
   * Banner rương báu chủ đề (Ví dụ: "Rương Chiêu Mộ Tướng Lĩnh Lạc Việt" hoặc "Kho Vũ Khí Đông Sơn").
   * Hiển thị nút bấm:
     * `[Chiêu Mộ 1 Lần] 1,000 Vàng`
     * `[Chiêu Mộ 10 Lần] 9,000 Vàng` *(Ưu đãi giảm 10%)*
   * Nút xem **"Tỷ Lệ & Danh Sách Vật Phẩm"** (Modal hiển thị Drop Rates minh bạch).
2. **Animation Triệu Hồi**:
   * Khi nhấn Chiêu Mộ $\rightarrow$ Phát lệnh gọi đến Core $\rightarrow$ Nhận danh sách kết quả.
   * UI phát hoạt cảnh mở rương ánh sáng / trống đồng xoay chuyển $\rightarrow$ Nút "Bỏ Qua" (Skip Animation).
3. **Màn hình Tổng Kết Kết Quả (Result Screen)**:
   * Hiển thị lưới các thẻ bài nhận được kèm khung viền màu theo phẩm chất (Xám: Thường, Xanh: Hiếm, Tím: Sử Thi, Vàng: Huyền Sử).
   * Nút: "Xác Nhận" (Đóng về màn hình chính) hoặc "Quay Tiếp 10 Lần".

---

## 4. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type GachaRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type GachaRewardItem = {
  id: string;
  type: 'hero' | 'hero_shard' | 'weapon' | 'gem' | 'material';
  name: string;
  rarity: GachaRarity;
  amount: number;
  isNew: boolean; // Đánh dấu nếu là Hero/Trang bị lần đầu sở hữu
};

export type GachaPullResult = {
  poolId: string;
  items: GachaRewardItem[];
  spentCost: { gold: number };
  newWalletBalance: { gold: number };
  pityCountCurrent: number;
};
```

* **Action Callbacks & Queries cần cung cấp**:
  * `getGachaPoolInfo(poolId: string): { name: string; cost1x: number; cost10x: number; rates: Record<GachaRarity, number> }`
  * `executeGachaPull(poolId: string, count: 1 | 10): GachaPullResult`

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Tuyệt đối cấm tạo RNG tại React UI**: Không được dùng `Math.random()` trong React component để quyết định người chơi trúng Hero nào. Toàn bộ logic bốc thăm và bảng tỷ lệ thuộc quyền quản lý của Core.
* **Xử lý trùng lặp Hero**: Khi quay trúng Hero đã sở hữu, Core phải tự động quy đổi thành Mảnh Tướng (Shards) hoặc nguyên liệu đột phá theo quy tắc định trước.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Bảng tỷ lệ rơi chuẩn (Drop Rates)**: Tỷ lệ phân bổ giữa các bậc phẩm chất là bao nhiêu (ví dụ: Common 70%, Rare 22%, Epic 7%, Legendary 1%)?
2. **Cơ chế bảo hiểm (Pity System)**: Có cơ chế "Đảm bảo nhận Epic sau mỗi 30 lần quay" hoặc "Đảm bảo nhận Legendary sau mỗi 80 lần quay" không?
3. **Phân chia bể quay (Pool Segregation)**: Tách riêng "Bể Chiêu Mộ Hero" và "Bể Rương Trang Bị", hay gom chung vào một Bể Vàng tổng hợp?
