# Hệ Thống Chiêu Hiền Các & Chiêu Mộ Danh Tướng (Hero Recruitment System)

## 1. Yêu Cầu Đã Khóa (Locked Rules)

Hệ thống Chiêu Mộ Danh Tướng (Chiêu Hiền Các) tuân thủ chặt chẽ các quy định đã được chốt:

1. **Bản Chất Chiêu Hiền Lệnh**:
   * **Chiêu Hiền Lệnh là Vật Phẩm (Item)** được lưu trữ và quản lý trong **Hành Trang (Inventory)**, mã ID: `item_chieu_hien_lenh`.
   * **Tuyệt đối không phải Currency**; không tạo thêm loại tiền tệ thứ 3 trong hệ thống Ví (Wallet chỉ có Vàng & Kim Nguyên Bảo).
2. **Quy Tắc Xử Lý Hero Mới vs Hero Trùng (Recruitment Resolution)**:
   * **Trường hợp 1: Hero Mới (Chưa sở hữu trong Profile/Deck)**:
     * Hệ thống thực hiện **Mở Khóa Tướng (Unlock Hero)**.
     * Tướng chuyển sang trạng thái khả dụng (`unlocked: true`, Cấp 1, 1★, Bậc Phổ Thông), người chơi có thể ngay lập tức chọn vào Đội Hình xuất trận.
   * **Trường hợp 2: Hero Trùng (Đã sở hữu trước đó)**:
     * Hệ thống **tự động chuyển đổi thành Mảnh Danh Tướng** của chính Hero đó (ví dụ: quay ra Trưng Trắc lần 2 $\rightarrow$ nhận trực tiếp $N$ *Mảnh Trưng Trắc*).
     * Mảnh Danh Tướng được chuyển thẳng vào Hành Trang / Kho Mảnh để phục vụ tính năng Nâng Sao.
3. **Nguồn Tiếp Nhận Hero Ngoài Chiêu Mộ**:
   * Người chơi nhận được các Hero định danh cốt truyện thông qua:
     * **Phần thưởng Vượt Ải Lần Đầu (First Clear Reward)**.
     * **Phần thưởng Hoàn Thành Chương (Chapter Completion Reward)**.
4. **Không Tự Ý Chốt Thông Số (Open Constraints)**:
   * Tỷ lệ xuất hiện (Drop Rates), số lượng Mảnh quy đổi từ Tướng trùng, chi phí quy đổi KNB (nếu có), và số lượt bảo hiểm (Pity) là **OPEN**, chờ Game Design & Codex cấu hình.

---

## 2. Dependencies (Phụ Thuộc Hệ Thống — Codex xác nhận)

* **Module Quản Lý Hồ Sơ Tướng (Hero Profile / Roster Management — Codex xác nhận)**: Kiểm tra trạng thái đã sở hữu (`isHeroUnlocked(heroId)`) và mở khóa tướng mới.
* **Module Kho Đồ & Mảnh Tướng (Inventory & Shard Store — Codex xác nhận)**: Quản lý số lượng Chiêu Hiền Lệnh và số lượng Mảnh Danh Tướng của từng Hero (`hero_shards_<heroId>`).
* **Bộ Xử Lý Chiêu Mộ (Hero Recruitment Resolver — Codex xác nhận)**: Xử lý thuật toán bốc thăm ngẫu nhiên (Seeded RNG) từ Bể Tướng trên Domain Core.

---

## 3. UI Flow (Luồng Giao Diện Người Dùng)

1. **Truy cập Chiêu Hiền Các**:
   * Từ Main Menu $\rightarrow$ Nhấp vào biểu tượng **[Chiêu Hiền Các]** $\rightarrow$ Màn hình sảnh chiêu mộ hiển thị banner danh tướng đang xuất hiện.
2. **Thực hiện Chiêu Mộ**:
   * Nút **[Chiêu Mộ 1 Lần]**: Tiêu hao 1 Chiêu Hiền Lệnh (hoặc KNB tương ứng nếu cho phép).
   * Nút **[Chiêu Mộ 10 Lần]**: Tiêu hao 10 Chiêu Hiền Lệnh (thực hiện chiêu mộ hàng loạt; cơ chế pity/guarantee là tham số mở, do Game Design & Codex quyết định).
   * Khi nhấp nút:
     * *Đủ lệnh bài*: Khóa nút $\rightarrow$ Gửi request lên Core $\rightarrow$ Phát hoạt cảnh Lệnh Bài Hoàng Kim khai mở.
     * *Thiếu lệnh bài*: Mở Modal thông báo thiếu Chiêu Hiền Lệnh kèm nút dẫn tới nguồn nhận hoặc đổi bằng KNB.
3. **Hiển thị Kết Quả**:
   * **Khi nhận Hero Mới**: Màn hình lóe sáng rực rỡ, hiển thị Splash Art tướng toàn màn hình, danh hiệu, câu thoại xuất trận và nhãn **[TƯỚNG MỚI ĐÃ MỞ KHÓA]**.
   * **Khi nhận Hero Trùng**: Thẻ bài tướng xuất hiện, sau đó phát hiệu ứng phân rã thành các tia sáng vàng (Shard Transformation VFX) và hiển thị bảng thông báo: **[ĐÃ SỞ HỮU — QUY ĐỔI THÀNH +N MẢNH DANH TƯỚNG]**.

---

## 4. Wireframes Dạng Văn Bản (Text-Based Wireframes)

### 4.1. Màn Chiêu Hiền Các (Recruitment Main Screen)

```text
+---------------------------------------------------------------------------------------------------+
|  [VỀ TRANG CHỦ]      CHIÊU HIỀN CÁC - THU THẬP DANH TƯỚNG        | [📜 Chiêu Hiền Lệnh]: [Current] |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|     +---------------------------------------------------------------------------------------+     |
|     |                                                                                       |     |
|     |                      [ BANNER NGHỆ THUẬT DANH TƯỚNG ĐẠI VIỆT ]                        |     |
|     |                                                                                       |     |
|     |     "Hùng tâm quật khởi, triệu tập anh hùng bốn phương bảo vệ non sông Đất Việt"      |     |
|     |                                                                                       |     |
|     |      Danh sách xuất hiện:                                                             |     |
|     |      • Trưng Trắc                                                                     |     |
|     |      • Trưng Nhị                                                                      |     |
|     |      • Lê Chân                                                                        |     |
|     |                                                                                       |     |
|     +---------------------------------------------------------------------------------------+     |
|                                                                                                   |
|     Tiến trình bảo hiểm (Pity): [Pity theo config nếu được duyệt]                                 |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|                                                                                                   |
|         [ 📜 CHIÊU MỘ 1 LẦN ]                       [ 📜📜 CHIÊU MỘ 10 LẦN ]                      |
|         (Tiêu hao: 1 Chiêu Hiền Lệnh)               (Tiêu hao: 10 Chiêu Hiền Lệnh)                |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

---

### 4.2. Kết Quả Chiêu Mộ — Hero Mới (New Hero Unlock Screen)

```text
+---------------------------------------------------------------------------------------------------+
|                                   🎉 CHÚC MỪNG CHỦ CÔNG! 🎉                                       |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|                                     [ HÀO QUANG RỰC RỠ ]                                          |
|                                                                                                   |
|                                   +-----------------------+                                       |
|                                   |                       |                                       |
|                                   |    [ SPLASH ART ]     |                                       |
|                                   |      TRƯNG TRẮC       |                                       |
|                                   |                       |                                       |
|                                   +-----------------------+                                       |
|                                                                                                   |
|                                 ✨ TƯỚNG MỚI ĐÃ MỞ KHÓA ✨                                         |
|                                    Tên: Trưng Trắc (1★)                                           |
|                                                                                                   |
|             "Một xin rửa sạch nước thù, hai xin đem lại nghiệp xưa họ Hùng!"                      |
|                                                                                                   |
|   Chỉ số cơ bản khởi đầu 1★:                                                                      |
|   • [6 Core Stats (HP, ATK, Range, ASPD, Crit, CritDmg) hiển thị theo Hero Data đã duyệt]         |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|             [ CHIÊU MỘ TIẾP ]              |              [ VÀO ĐỘI HÌNH ]                        |
+---------------------------------------------------------------------------------------------------+
```

---

### 4.3. Kết Quả Chiêu Mộ — Hero Trùng (Duplicate Hero Conversion Screen)

```text
+---------------------------------------------------------------------------------------------------+
|                                   KẾT QUẢ CHIÊU HIỀN CÁC                                          |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|                             +-----------------------------------+                                 |
|                             |        [ THẺ TƯỚNG TRƯNG NHỊ ]    |                                 |
|                             |           (ĐÃ SỞ HỮU TRƯỚC)       |                                 |
|                             +-----------------------------------+                                 |
|                                               |                                                   |
|                                               |  (Chuyển đổi hào quang)                           |
|                                               V                                                   |
|                             +-----------------------------------+                                 |
|                             |   🧩 [ICON MẢNH TRƯNG NHỊ]        |                                 |
|                             |        NHẬN ĐƯỢC: + [N MẢNH]      |                                 |
|                             +-----------------------------------+                                 |
|                                                                                                   |
|                  Thông báo: Danh tướng này đã có trong Đội Hình của bạn.                          |
|             Hệ thống tự động quy đổi thành Mảnh Danh Tướng dùng để NÂNG SAO!                     |
|                                                                                                   |
|             Tiến trình Mảnh Trưng Nhị hiện tại: [Current] / [Required] Mảnh                       |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|             [ CHIÊU MỘ TIẾP ]              |              [ XEM TƯỚNG NÂNG SAO ]                  |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. Mô Tả Data Contract Đề Xuất (Codex xác nhận)

*(Mô tả định hướng cấu trúc dữ liệu — Codex xác nhận và quyết định schema runtime chính thức)*

```ts
export type RecruitmentPullType = 1 | 10;

export type SingleRecruitResult =
  | {
      isDuplicate: false;
      heroId: string;
      heroName: string;
      initialStars: 1;
    }
  | {
      isDuplicate: true;
      heroId: string;
      heroName: string;
      shardItemId: `shard_hero_${string}`; // e.g. 'shard_hero_trung_nhi'
      shardsConvertedCount: number; // Định mức [N Mảnh] quy đổi theo cấu hình Core
      newTotalShards: number;
    };

export type RecruitmentBatchResponse = {
  success: boolean;
  pullCount: RecruitmentPullType;
  consumedItem: {
    itemId: 'item_chieu_hien_lenh';
    count: number;
  };
  remainingDecrees: number;
  results: SingleRecruitResult[];
  pityCounter?: number; // Tùy chọn nếu hệ thống Pity được duyệt
};
```

---

## 6. Rủi Ro & Ràng Buộc Kỹ Thuật (Risks & Constraints)

* **Tuyệt đối không sinh kết quả ngẫu nhiên tại Client**: React component chỉ gửi `onRecruitRequest(count: 1 | 10)` và render chính xác mảng `results` do Domain Core trả về.
* **Bảo toàn dữ liệu khi mở 10 lần liên tiếp**: Nếu trong 10 lượt quay ra 1 tướng mới và ngay sau đó lại ra tiếp tướng đó ở lượt tiếp theo, Core phải xử lý lượt đầu là `Unlock Hero` và lượt sau là `Convert to Shards`.
