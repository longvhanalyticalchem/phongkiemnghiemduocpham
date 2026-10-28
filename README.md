# Phòng kiểm nghiệm dược phẩm

Ứng dụng web phục vụ học phần **Thực tập Kiểm nghiệm Dược phẩm** – Khoa Hóa phân tích và Kiểm nghiệm thuốc, Trường Đại học Dược Hà Nội.

Sinh viên đóng vai kiểm nghiệm viên và đi qua 4 chặng của một quy trình kiểm nghiệm theo **Dược điển Việt Nam V**:

| Chặng | Nội dung |
|---|---|
| 0. Chọn mẫu | Nhập thông tin kiểm nghiệm viên, chọn chuyên luận, nhận mẫu (mỗi lần nhận sinh một mã lô với số liệu riêng) |
| 1. Tra cứu DĐVN V | Tra chuyên luận, phụ lục, giới hạn, số đơn vị thử |
| 2. Pha hóa chất | Tra nơi ghi thuốc thử, chọn cách pha đúng, tính lượng hóa chất thực tế cần lấy |
| 3. Thực nghiệm | Nhận số liệu đo của lô, tự xử lý số liệu, kết luận từng chỉ tiêu |
| 4. Phiếu kiểm nghiệm | Soi lỗi bài làm mẫu (thám tử sai số), lập và in phiếu kiểm nghiệm, nhận phiếu kết quả luyện tập |

Chuyên luận hiện có:
- Thuốc tiêm Pyridoxin hydroclorid (vitamin B6) 100 mg/1 ml – định tính A, C; định lượng đo quang A (1 %, 1 cm)
- Viên nén Indomethacin 25 mg – độ đồng đều khối lượng; độ hòa tan

Đặc điểm:
- Chạy hoàn toàn trên trình duyệt, **không cần máy chủ, không gọi dịch vụ AI, không cần đăng nhập**, không gửi dữ liệu đi đâu (tiến độ lưu trong trình duyệt).
- Mỗi mục nộp xong mới hiện đúng/sai, giải thích, nguồn DĐVN và lời giải có công thức.
- Cùng một mã lô luôn sinh lại đúng cùng số liệu → giảng viên tra được đáp án của từng sinh viên.
- Chế độ giảng viên (nút "Giảng viên" cuối trang, PIN mặc định `2026`): xem đáp án theo mã lô, nạp lô kiểm thử để đối chiếu, bật/tắt xáo thứ tự lựa chọn.
- Dùng tốt trên điện thoại; khi chạy trên web (Vercel) có thể **cài như ứng dụng** và dùng khi mất mạng.

## Chạy thử trên máy

Bấm đúp `index.html` là chạy, không cần cài gì.

Cần một file duy nhất để gửi đi hoặc dùng offline: chạy `python tools/dong-goi-mot-file.py` → được `dist/phong-kiem-nghiem-duoc-pham.html`.

## Cấu trúc thư mục

```
index.html                     Trang chính; danh sách các file được nạp (mục 1–6)
manifest.webmanifest, sw.js    Cài như ứng dụng (PWA) và dùng offline
assets/                        CSS, font Montserrat, logo, thư viện KaTeX
js/core/khung.js               Tiện ích dùng chung: số, sinh số có seed, công thức, lưu trữ
js/khoi/                       KHỐI THỬ của chặng 3 – mỗi file một kiểu phép thử, dùng lại cho nhiều chuyên luận
js/kieu/                       Ghép hồ sơ với các khối thử (ghep-khoi.js dành cho chuyên luận mới)
js/app.js                      Giao diện, chấm điểm, phiếu kiểm nghiệm, chế độ giảng viên
data/chung.js                  Dữ liệu chung: thông tin sinh viên, Qui định chung, mẫu phiếu kiểm nghiệm
data/chuyen-luan/              MỖI CHUYÊN LUẬN MỘT FILE (_MAU-chuyen-luan.js là file mẫu)
docs/                          Hướng dẫn thêm chuyên luận, đưa lên GitHub/Vercel
tools/                         Đóng gói một file; kiểm thử tự động
```

## Thêm chuyên luận mới

Xem [docs/THEM-CHUYEN-LUAN.md](docs/THEM-CHUYEN-LUAN.md). Tóm tắt:
1. Sao chép `data/chuyen-luan/_MAU-chuyen-luan.js` thành file mới, điền nội dung.
2. Thêm một dòng `<script src="data/chuyen-luan/ten-file.js"></script>` vào `index.html` (mục 5).
3. Nếu chặng 3 cần phép thử chưa có khối (ví dụ chuẩn độ, HPLC, đồng đều khối lượng nang), viết thêm một file trong `js/khoi/`.

Các chuyên luận có sẵn không bị ảnh hưởng. Nếu một file chuyên luận mới bị lỗi, ứng dụng bỏ qua file đó, các chuyên luận khác vẫn chạy và lỗi được báo trong chế độ giảng viên.

## Đưa lên GitHub và Vercel

Xem [docs/DUA-LEN-GITHUB-VERCEL.md](docs/DUA-LEN-GITHUB-VERCEL.md). Đây là trang tĩnh: Vercel chọn "Other", không cần lệnh build.

## Lưu ý về đáp án

Đây là công cụ **luyện tập**. Mọi phép chấm chạy trên trình duyệt nên đáp án nằm trong mã nguồn; PIN giảng viên chỉ là khóa giao diện để sinh viên không vô tình mở đáp án, không phải bảo mật. Không dùng ứng dụng này cho bài kiểm tra tính điểm chính thức.

Đổi PIN: tính SHA-256 của PIN mới (ví dụ trên Windows PowerShell:
`[BitConverter]::ToString([Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes("PIN_MOI"))).Replace("-","").ToLower()`)
rồi thay chuỗi `PIN_HASH` trong `js/app.js`.

## Nội dung chuyên môn, bản quyền và giấy phép

- Nội dung chuyên môn trích từ Dược điển Việt Nam V; số liệu mẫu, nơi sản xuất, số đăng ký là **giả định**. Các nội dung ghi "quy định bộ môn" không thuộc DĐVN.
- Logo Trường Đại học Dược Hà Nội và logo Khoa thuộc quyền sở hữu của Trường/Khoa, chỉ dùng trong học liệu này.
- Thư viện và font của bên thứ ba: xem [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) (KaTeX – MIT; Montserrat – SIL OFL 1.1).
- Mã nguồn ứng dụng: © 2026 Khoa Hóa phân tích và Kiểm nghiệm thuốc, Trường Đại học Dược Hà Nội.
