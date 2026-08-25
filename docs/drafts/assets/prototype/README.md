# Prototype Asset QA & Gallery Overview (Tam Quốc Prototype Pack)

> [!IMPORTANT]
> **Tài liệu bàn giao kiểm toán Asset Prototype (`ASSET-A01`)**:
> - Báo cáo tổng thể về 20 asset PNG prototype hiện có trong `src/assets/**` (5 Portrait, 5 Idle, 5 Attack, 5 Skill VFX).
> - **READ-ONLY**: Toàn bộ asset gốc trong `src/assets/**` được giữ nguyên vẹn 100%, không đổi tên, không xóa, không sửa.
> - Cung cấp tài liệu thẩm định kỹ thuật (QA manifest), phòng tranh trực quan (asset gallery), và tài liệu đặc tả bàn giao cho Codex triển khai tính năng hiển thị runtime (`VIS-C01`).

---

## 1. Danh Mục Tài Liệu

| Tài Liệu | Nội Dung Trọng Tâm |
|---|---|
| [asset-gallery.md](asset-gallery.md) | Phòng trưng bày toàn bộ 20 asset sử dụng đường dẫn tương đối (Markdown relative image links) để xem trực tiếp trên Preview. |
| [asset-qa-manifest.md](asset-qa-manifest.md) | Bảng kiểm toán thông số kỹ thuật chi tiết: Kích thước, RGBA, độ trong suốt Alpha, Baseline Y=112, Bounding Box, cùng danh mục các tiêu chí cần kiểm tra thị giác (`[NEEDS VISUAL CHECK]`). |
| [runtime-integration-handoff.md](runtime-integration-handoff.md) | Đặc tả bàn giao tích hợp Runtime cho Codex (`VIS-C01`): Quy trình 5 bước `Preload` $\rightarrow$ `Texture Mapping by HeroId/SkillId` $\rightarrow$ `Idle/Attack` $\rightarrow$ `VFX Overlay` $\rightarrow$ `Portrait HUD`. Mọi kiến trúc và tham số do Codex quyết định (`[OPEN / CONFIG]`). |

---

## 2. Tóm Tắt Hiện Trạng Runtime (Current State)

```mermaid
graph LR
    subgraph HIỆN TRẠNG (CURRENT)
        A1["Asset PNG (20 files)<br>Đã có trong <code>src/assets/</code>"]
        R1["Hero Runtime Rendering<br>Đang vẽ hình tròn / text placeholder"]
        H1["HUD & Selection<br>Đang dùng text placeholder"]
        A1 -.->|Chưa kết nối| R1
        A1 -.->|Chưa kết nối| H1
    end

    subgraph CONTRACT HANDOFF (VIS-C01)
        A1 -->|Preload| L["Asset Preload"]
        L -->|Map by heroId/skillId| SP["Sprite Rendering (Idle/Attack)"]
        L -->|VFX Overlay| FX["Skill VFX Player"]
        L -->|Portrait Binding| HUD["HUD & Selection"]
    end
```

* **Trạng thái Engine hiện tại**:
  * Hero trên bàn cờ đang được hiển thị bằng hình vẽ hình học cơ bản (Circle/Box) kèm ký hiệu text.
  * HUD chọn tướng và thanh thông tin nhân vật đang dùng nhãn text placeholder.
  * Toàn bộ 20 asset PNG đã sẵn sàng, chuẩn hóa kích thước $128 \times 128$ và baseline $Y=112$, sẵn sàng để Codex kết nối vào hệ thống render ở Task tiếp theo.
