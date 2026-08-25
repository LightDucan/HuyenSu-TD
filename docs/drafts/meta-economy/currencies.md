# Hệ Thống Tiền Tệ Meta (Currencies & Wallet Management)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
Hệ thống Kinh Tế Meta quy chuẩn **đúng 2 loại tiền tệ (Currencies)** chính thuộc ví người chơi (Player Wallet):
1. **Vàng (Gold)**:
   * *Bản chất*: Tiền tệ phổ thông chính kiếm được thông qua việc tiêu diệt quái, vượt Wave, hoàn thành màn chơi hoặc trúng thưởng Gacha.
   * *Mục đích sử dụng*: Chi trả phí quay Gacha Gold, phí ghép trang bị (Equipment Merging — nếu có phí), nâng cấp công trình ngoài trận.
2. **Kim Nguyên Bảo (KNB / Ingot)**:
   * *Bản chất*: Tiền tệ quý giá (Premium Ingot).
   * *Nguồn thu cố định (LOCKED Sources)*:
     * Tự động tích lũy **mỗi 1 phút chơi Game** (in-game playtime).
     * Phần thưởng **hoàn thành ải** (màn chơi / stage clear).
     * Ngoài ra có thể có thêm quà thành tựu, quà mốc cốt truyện hoặc sự kiện đặc biệt (nếu có).
   * *Mục đích sử dụng*: Mua các vật phẩm đặc biệt trong kỳ trân các (Lệnh Hiệu Triệu, gói Binh Phù cao cấp, Skin danh tướng).

> [!NOTE]
> **Phân định rõ ràng Tiền Tệ vs Thể Lực**:
> - **Quân Lệnh (Command Energy)** là **Tài nguyên Thể lực (Energy Resource)** có cơ chế hồi phục tự nhiên và chu kỳ riêng biệt (chi tiết tại [command-energy.md](command-energy.md)), **không thuộc hệ Currency và không nằm trong Player Wallet**.
> - Thanh Header HUD trên cùng của game vẫn hiển thị đồng thời cả 2 loại tiền tệ (Vàng, KNB) và tài nguyên Quân Lệnh (`current / max`) để người chơi dễ theo dõi.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)
* **Module Quản Lý Ví (Wallet Management — Codex xác nhận)**: Quản lý số dư 2 loại tiền tệ (Vàng, KNB) và thực hiện các giao dịch trừ/cộng nguyên tử (atomic balance mutations).
* **Cơ Chế Kết Toán Trận Đánh (Battle Settlement Bridge — Codex xác nhận)**: Nhận kết quả từ trận đánh sau mỗi Wave/Màn để cộng Vàng/KNB thưởng vào ví.
* **Gacha & Merging Modules (Codex xác nhận)**: Kiểm tra `hasEnoughCurrency(cost)` trước khi kích hoạt logic quay thưởng hoặc ghép đồ.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Hiển thị số dư thời gian thực**:
   * Thanh Header HUD trên cùng luôn cập nhật ngay khi có biến động tài chính.
   * Hiệu ứng chữ số nhảy mượt mà (Floating Numbers VFX: `+500 💰` hoặc `-1,000 💰`).
2. **Kiểm tra và cảnh báo giao dịch**:
   * Khi người chơi thực hiện thao tác tốn phí (ví dụ: Quay 10 lần Gacha tốn lượng Vàng theo cấu hình):
     * *Đủ tiền*: Nút bấm sáng rõ $\rightarrow$ Trừ tiền $\rightarrow$ Thực hiện hành động.
     * *Thiếu tiền*: Số tiền hiển thị màu đỏ nhấp nháy $\rightarrow$ Khi bấm vào hiện Toast thông báo: *"Không đủ Vàng để thực hiện thao tác!"*.

---

## 4. UI Projection Contract

*Đây là projection phục vụ UI, không phải persistence schema. Nguồn sự thật chính thức là `WalletState.balances` trong `src/domain/meta/MetaState.ts`; adapter/selector được phép trải phẳng hai số dư để render.*

```ts
export type CurrencyType = 'gold' | 'knb';

export type PlayerWalletData = {
  gold: number;
  knb: number;
};

export type WalletTransactionRequest = {
  currency: CurrencyType;
  amount: number; // Số dương để cộng, số âm để trừ
  source: 'wave_clear' | 'stage_reward' | 'playtime_knb' | 'gacha_spend' | 'gacha_gain' | 'equipment_merge' | 'item_use';
};

export type WalletTransactionResult = {
  success: boolean;
  currency: CurrencyType;
  previousBalance: number;
  newBalance: number;
  errorMessage?: string;
};
```

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Tuyệt đối phân định Meta Wallet vs In-run Battle**: Vàng và KNB thuộc quyền quản lý của Meta State. Trong suốt quá trình Wave đang chạy trong Phaser Scene, tài nguyên nhận được từ quái được gom vào bộ đệm kết toán (Settlement Buffer) và chỉ cộng dồn chính thức vào Wallet khi Wave/Màn kết thúc thành công.
* **Ràng buộc an toàn số học**: Không cho phép số dư âm (`balance >= 0`). Mọi giao dịch trừ tiền phải được Core xác thực atomic trước khi trả kết quả cho UI.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Giới hạn số dư Vàng tối đa (Gold Cap)**: Có đặt giới hạn Vàng tối đa (ví dụ: 99,999,999 Vàng) hay không giới hạn?
2. **Nguồn thu nhàn rỗi (Offline Idle Rewards)**: Có tính năng Doanh trại tự sản sinh một lượng nhỏ Vàng theo thời gian offline không?
