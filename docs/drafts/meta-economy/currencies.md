# Hệ Thống Tiền Tệ Meta (Currencies & Wallet Management)

## 1. Yêu Cầu Đã Duyệt (Approved Requirements)
Hệ thống Kinh tế Meta sử dụng 3 loại tài nguyên/tiền tệ chính:
1. **Vàng (Gold)**:
   * *Mục đích*: Tiền tệ phổ thông chính trong game. Dùng để nâng cấp Hero Level (nếu có chi phí vàng), cường hóa Trang bị (Vũ khí/Ngọc), và mở rương Chiêu Mộ (Gold Gacha).
   * *Nguồn thu*: Thưởng vượt Wave, thưởng hoàn thành trận đấu, bán trang bị thừa.
2. **Lương Thực / Lúa (Food)**:
   * *Mục đích*: Tài nguyên duy trì quân đội, phát triển doanh trại hoặc chi trả chi phí hậu cần viễn chinh.
   * *Nguồn thu*: Thu hoạch định kỳ từ doanh trại, thưởng chiến dịch.
3. **Bảo Thạch / Ngọc (Gems / Premium Currency)** *(Tùy chọn mở rộng)*:
   * *Mục đích*: Tài nguyên quý hiếm dùng cho các tính năng đặc biệt (mua Skin, reset nhanh tiến trình, chiêu mộ cao cấp).
   * *Nguồn thu*: Thưởng thành tựu lần đầu vượt ải, quà mốc sự kiện.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống)
* **Wallet State Service**: Quản lý số dư và tính nguyên tử (atomic transactions) khi cộng/trừ tiền tệ.
* **End-Game Settlement**: Nhận kết quả từ Battle Scene và tính toán phần thưởng Vàng/Lương thực theo số lượng quái tiêu diệt.
* **Shop & Upgrade Systems**: Kiểm tra điều kiện đủ tiền trước khi thực hiện các hành động nâng cấp hoặc chiêu mộ.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)
1. **Header Bar thường trực**:
   * Hiển thị ở góc trên màn hình:
     * `[Icon Vàng] 12,450`
     * `[Icon Lương Thực] 850`
     * `[Icon Bảo Thạch] 120` (nếu kích hoạt)
2. **Luồng Giao Dịch**:
   * Khi người chơi nhấn nút có tính phí (ví dụ: "Cường Hóa: 500 Vàng"):
     * *Nếu đủ tiền*: Hiển thị số tiền màu trắng/xanh $\rightarrow$ Bấm nút $\rightarrow$ Hiệu ứng trừ tiền mượt mà $\rightarrow$ Số dư mới cập nhật.
     * *Nếu thiếu tiền*: Hiển thị số tiền màu đỏ $\rightarrow$ Bấm nút $\rightarrow$ Hiển thị Toast cảnh báo: *"Không đủ Vàng để thực hiện giao dịch!"*.

---

## 4. Dữ Liệu Cần Từ Codex (Data Contract from Codex)

```ts
export type PlayerWalletState = {
  gold: number;
  food: number;
  gems: number;
  limits?: {
    maxGold?: number;
    maxFood?: number;
  };
};

export type CurrencyTransaction = {
  type: 'gold' | 'food' | 'gems';
  amount: number; // Dương: cộng tiền, Âm: trừ tiền
  reason: 'battle_reward' | 'equipment_upgrade' | 'gacha_pull' | 'hero_advance' | 'cheat_debug';
};
```

* **Action Callbacks & Queries cần cung cấp**:
  * `canAfford(cost: { gold?: number; food?: number; gems?: number }): boolean`
  * `executeTransaction(tx: CurrencyTransaction): { success: boolean; newBalance: PlayerWalletState; error?: string }`
  * `getWalletSnapshot(): PlayerWalletState`

---

## 5. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)
* **Rủi ro phân mảnh kinh tế In-run vs Out-of-run**: Tuyệt đối không nhầm lẫn giữa Vàng trong trận (nếu có cơ chế thả quái rơi tiền tạm thời) và Ví tiền Meta ngoài trận. Mọi phần thưởng từ Battle chỉ được ghi nhận vào Wallet sau khi trận đấu kết thúc hoàn toàn (Victory / Defeat Settlement).
* **Ràng buộc UI**: UI không được phép can thiệp trực tiếp vào biến số dư `wallet.gold -= 500`. UI chỉ phát lệnh `onUpgradeRequest()` kèm chi phí, việc trừ tiền do Core xử lý.

---

## 6. Quyết Định Còn Mở (Open Decisions)
1. **Giới hạn tích lũy tối đa (Currency Caps)**: Vàng và Lương thực có bị giới hạn lưu trữ tối đa theo Cấp người chơi hay không?
2. **Tỷ lệ quy đổi và nguồn thu nhàn rỗi (Idle Farm)**: Có tính năng Doanh trại tự động sản xuất Lúa/Vàng theo thời gian thực (Offline Idle Income) không?
3. **Mức độ phụ thuộc vào Gems**: Bản V1 có cần kích hoạt loại tiền Premium Gems ngay từ đầu hay chỉ tập trung hoàn toàn vào nền kinh tế Vàng (Gold-only Economy)?
