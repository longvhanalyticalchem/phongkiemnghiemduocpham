#!/usr/bin/env python3
"""Đóng gói toàn bộ dự án thành MỘT file HTML (dùng offline, gửi qua Zalo/email, nhúng vào Canva…).
Chạy từ thư mục gốc dự án:   python tools/dong-goi-mot-file.py
Kết quả: dist/phong-kiem-nghiem-duoc-pham.html
Bản một file không có chế độ "cài như ứng dụng" (PWA); mọi chức năng khác giữ nguyên."""
import base64, mimetypes, pathlib, re

GOC = pathlib.Path(__file__).resolve().parent.parent
mimetypes.add_type('font/woff2', '.woff2'); mimetypes.add_type('image/webp', '.webp')

def data_uri(p: pathlib.Path) -> str:
    mt = mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
    return f'data:{mt};base64,' + base64.b64encode(p.read_bytes()).decode()

def css_inline(p: pathlib.Path) -> str:
    css = p.read_text(encoding='utf-8')
    return re.sub(r"url\((['\"]?)([^)'\"]+)\1\)", lambda m: m.group(0) if m.group(2).startswith('data:') else f"url({data_uri((p.parent / m.group(2)).resolve())})", css)

html = (GOC / 'index.html').read_text(encoding='utf-8')
# ảnh và biểu tượng trước, rồi CSS, cuối cùng mới chèn script (để không đụng vào mã bên trong thư viện)
html = re.sub(r'(<img[^>]+src=")([^"]+)(")', lambda m: m.group(1) + data_uri(GOC / m.group(2)) + m.group(3), html)
html = re.sub(r'<link rel="(icon|apple-touch-icon)"([^>]*?)href="([^"]+)">', lambda m: f'<link rel="{m.group(1)}"{m.group(2)}href="{data_uri(GOC / m.group(3))}">', html)
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', lambda m: '<style>\n' + css_inline(GOC / m.group(1)) + '\n</style>', html)
html = re.sub(r'<script src="([^"]+)"></script>', lambda m: '<script>\n' + (GOC / m.group(1)).read_text(encoding='utf-8').replace('</script', '<\\/script') + '\n</script>', html)
html = re.sub(r'<link rel="manifest"[^>]*>\n?', '', html)
out = GOC / 'dist' / 'phong-kiem-nghiem-duoc-pham.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f'Đã tạo {out} ({out.stat().st_size // 1024} KB)')
