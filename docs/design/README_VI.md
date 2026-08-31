# Chuẩn Chibi V1

## Thêm một Hero Chibi mới

1. Đặt asset theo thư mục Hero và action (`idle`, `aim`, `shoot`, `ready`, `strike`, `vfx`).
2. Khai báo một mục trong `src/data/presentation/heroChibiPresentation.ts`: loại `ranged` hoặc `melee`, animation keys, frame rate, release frame, pivot và offset VFX.
3. Chạy `npm test` và `npm run build`.
4. Mở Battle preview để kiểm tra Hero giữ pivot bottom-center, chuyển state mượt và VFX tách khỏi character.

Character atlas không chứa VFX. Combat vẫn quyết định damage; animation chỉ trình bày attack release.
