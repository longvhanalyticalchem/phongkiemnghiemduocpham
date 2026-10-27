# Đưa lên GitHub và Vercel

## 1. Tạo kho trên GitHub (không cần dòng lệnh)
1. Đăng nhập https://github.com → nút **New** (tạo repository).
2. Đặt tên, ví dụ `phong-kiem-nghiem-duoc-pham`. Chọn **Public** (nếu cần cho người chấm xem) hoặc **Private** (rồi mời người chấm vào mục Settings → Collaborators). Không tích "Add a README" (dự án đã có sẵn).
3. Ở trang kho vừa tạo, bấm **uploading an existing file**, kéo **toàn bộ nội dung bên trong** thư mục `phong-kiem-nghiem-duoc-pham` (gồm `index.html`, các thư mục `assets`, `data`, `docs`, `js`, `tools`…) vào trình duyệt → **Commit changes**.
   - Kéo cả thư mục con được; GitHub giữ nguyên cấu trúc.
   - Không kéo thư mục `dist` (bản một file, đã được bỏ qua trong `.gitignore`).

Cách khác: dùng **GitHub Desktop** → File → Add local repository → chọn thư mục dự án → Publish repository.

## 2. Triển khai lên Vercel
1. Đăng nhập https://vercel.com bằng tài khoản GitHub.
2. **Add New… → Project** → chọn kho `phong-kiem-nghiem-duoc-pham` → **Import**.
3. Framework Preset: **Other**. Build Command và Output Directory: **để trống**. Bấm **Deploy**.
4. Sau khoảng 1 phút có đường link dạng `https://phong-kiem-nghiem-duoc-pham.vercel.app`.

Mỗi lần cập nhật (ví dụ thêm chuyên luận) chỉ cần tải file mới lên GitHub; Vercel tự triển khai lại.

## 3. Cài như ứng dụng
Mở link Vercel:
- **Điện thoại Android (Chrome)**: menu ⋮ → *Cài đặt ứng dụng* / *Thêm vào màn hình chính*.
- **iPhone (Safari)**: nút Chia sẻ → *Thêm vào MH chính*.
- **Máy tính (Chrome/Edge)**: biểu tượng cài đặt ở cuối thanh địa chỉ.

Ứng dụng mở toàn màn hình như app, có biểu tượng riêng, và dùng được khi mất mạng sau lần mở đầu tiên.

## 4. Minh chứng nộp
- Link kho GitHub (lịch sử commit thể hiện quá trình phát triển).
- Link Vercel đang chạy.
- Ảnh chụp màn hình: trang chọn mẫu, một chặng có lời giải, phiếu kiểm nghiệm, ứng dụng đã cài trên điện thoại.
