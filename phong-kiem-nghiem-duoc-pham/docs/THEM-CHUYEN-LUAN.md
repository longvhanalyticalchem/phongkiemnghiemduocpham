# Thêm chuyên luận mới

Nguyên tắc: **mỗi chuyên luận là một file dữ liệu riêng** trong `data/chuyen-luan/`. Thêm file mới không đụng tới các file đã có.

## Bước 1 – Tạo file dữ liệu
Sao chép `data/chuyen-luan/_MAU-chuyen-luan.js` và đổi tên (chữ thường, không dấu, nối bằng gạch ngang), ví dụ:
- `vitamin-c-vien-nen.js`
- `paracetamol-nang.js`
- `aciclovir-kem.js`

Điền nội dung theo DĐVN V. Quy ước:
- `id` không trùng hồ sơ khác; `tien_to_ma_lo` là 2–3 chữ in hoa (mã lô sinh ra có dạng `VC-XXXXXX`).
- Số thập phân trong dữ liệu viết bằng **dấu chấm** (`8.5`), giao diện tự hiện dấu phẩy.
- Chữ trong ngoặc kép; giữa các mục có dấu phẩy. Sai cú pháp thì hồ sơ đó không nạp được và chế độ giảng viên sẽ báo.

## Bước 2 – Khai báo trong `index.html`
Thêm một dòng ở mục 5, trước dòng `js/app.js`:
```html
<script src="data/chuyen-luan/vitamin-c-vien-nen.js"></script>
```

## Bước 3 – Chặng 3: ghép khối thử
Đặt `"kieu": "ghep_khoi"` và liệt kê các khối trong `"khoi": [ … ]`. Mỗi khối có `loai`, `id`, `so` và cấu hình riêng (mô tả đầy đủ ở đầu từng file trong `js/khoi/`).

| Khối (`loai`) | Dùng cho | Đã dùng ở |
|---|---|---|
| `the_tich_lay` | Tính thể tích chế phẩm lỏng tương ứng lượng hoạt chất | B6 |
| `dinh_tinh_pho_uv` | Định tính bằng cực đại hấp thụ (có phổ minh họa) | B6 – định tính A |
| `dinh_tinh_quan_sat` | Định tính bằng phản ứng màu/tủa (mô tả quan sát) | B6 – định tính C |
| `dinh_luong_a1pct` | Định lượng đo quang theo A (1 %, 1 cm), n lần, TB/SD/RSD | B6 |
| `dong_deu_khoi_luong` | Độ đồng đều khối lượng, Phụ lục 11.3 – Phương pháp 1 | Indomethacin |
| `do_hoa_tan` | Độ hòa tan, đánh giá từng đơn vị ≥ Q %, có thử lặp lại | Indomethacin |

Mọi khối có `ketLuan` sẽ tự xuất hiện trong mục "Đánh giá và kết luận" cuối chặng 3 và trên phiếu kiểm nghiệm (dòng phiếu có tên trùng trường `phieu` của khối).

### Khi cần phép thử chưa có khối
Ví dụ dự kiến:
- Vitamin C: định lượng bằng **chuẩn độ** (iod/2,6-dicloroindophenol) → khối mới `dinh_luong_chuan_do`.
- Nang paracetamol: **đồng đều khối lượng nang** (trừ vỏ, Phương pháp 2) → khối mới `dong_deu_khoi_luong_nang`; định lượng UV theo bột thuốc → khối mới hoặc mở rộng `dinh_luong_a1pct`.
- Kem aciclovir: định lượng theo khối lượng chế phẩm cân → khối mới.

Cách thêm khối: tạo `js/khoi/ten-khoi.js` theo mẫu các khối có sẵn (các hàm `sinh`, `dapAn`, `muc`, `ketLuan`, `gv`, `soSanh`), rồi thêm một dòng `<script>` ở mục 3 của `index.html`. Các khối cũ không bị sửa nên các chuyên luận cũ không bị ảnh hưởng.

## Bước 4 – Kiểm tra
1. Mở `index.html`, chọn chuyên luận mới, làm thử một lượt.
2. Bấm **Giảng viên** (PIN 2026): không có khung đỏ "Chuyên luận chưa nạp được"; nhập mã lô vừa nhận để xem đáp án.
3. Nên khai báo vài `lo_kiem_thu` (số liệu cố định + `ket_qua_dung` tính tay) rồi dùng "Nạp lô kiểm thử" để đối chiếu.
4. (Tùy chọn, cho người phát triển) `node tools/kiem-thu/kiem-thu.js` chạy toàn bộ kiểm thử tự động cho mọi chuyên luận.
