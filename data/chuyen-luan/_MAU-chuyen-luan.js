/* ===========================================================================
   FILE MẪU – sao chép file này để thêm chuyên luận mới. File này KHÔNG được nạp.
   Các bước (chi tiết trong docs/THEM-CHUYEN-LUAN.md):
     1. Sao chép thành tên mới, ví dụ  data/chuyen-luan/vitamin-c-vien-nen.js
     2. Điền nội dung theo DĐVN V (chỉ sửa phần giá trị, giữ nguyên tên trường).
     3. Thêm 1 dòng vào index.html, mục 5:
          <script src="data/chuyen-luan/vitamin-c-vien-nen.js"></script>
     4. Mở index.html → Giảng viên → kiểm tra không có báo lỗi nạp, chạy thử một lô.
   Mọi chữ "…" là chỗ cần điền. Có thể xóa các mục không dùng (ví dụ chang_2_hoa_chat: []).
   =========================================================================== */
PKN.themChuyenLuan({
  "id": "VITC",                       // mã hồ sơ, viết liền, không trùng hồ sơ khác
  "tien_to_ma_lo": "VC",              // mã lô sinh ra sẽ có dạng VC-XXXXXX
  "ten_mau": "Viên nén Vitamin C …",
  "dang_bao_che": "Viên nén",
  "bien_the": [{ "ma": "VITC-…", "nhan": "Acid ascorbic … mg", "ham_luong_mg": 0 }],
  "ghi_chu_bien_the": "…",
  "chi_tieu_buoi_thuc_tap": ["…", "…"],

  /* CHẶNG 1 – câu hỏi tra cứu. loai: "chon_mot" | "chon_nhieu" | "nhap_so" | "nhap_khoang" */
  "chang_1_tiep_nhan": [
    { "id": "VC-T1", "loai": "chon_mot", "hoi": "…?", "lua_chon": ["đáp án đúng", "…", "…", "…"], "dap_an": 0, "giai_thich": "…", "nguon": "DĐVN V, …" },
    { "id": "VC-T2", "loai": "chon_nhieu", "hoi": "…", "lua_chon": ["…", "…", "…"], "dap_an": [0, 2], "giai_thich": "…", "nguon": "…" },
    /* Câu cho khối lượng trung bình ngẫu nhiên, hỏi giới hạn % chênh lệch (giống Indomethacin):
    { "id": "VC-T4", "loai": "chon_mot_theo_kltb", "hoi": "Viên nén có khối lượng trung bình {kltb} mg. …?", "kltb_mg": [60, 80, 150, 250, 320],
      "lua_chon_phan_tram": [10, 7.5, 5, 15], "bang_gioi_han": [ …như khối dong_deu_khoi_luong… ], "giai_thich": "…", "nguon": "…" }, */
    { "id": "VC-T3", "loai": "nhap_so", "hoi": "…", "dap_an": 20, "dung_sai_tuyet_doi": 0, "don_vi": "viên", "giai_thich": "…", "nguon": "…" }
  ],

  /* CHẶNG 2 – thuốc thử: tra ở đâu → cách pha → tính lượng theo V (chọn ngẫu nhiên trong bien_V) */
  "chang_2_hoa_chat": [
    {
      "id": "VC-H1", "ten_trong_chuyen_luan": "… (TT)", "dung_o": "…",
      "tra_o": { "lua_chon": ["…", "…", "…", "…"], "dap_an": 0, "giai_thich": "…" },
      "cach_pha": { "lua_chon": ["…", "…", "…", "…"], "dap_an": 0, "giai_thich": "…", "nguon": "…" },
      "tinh_toan": { "hoi": "Cần pha {V} ml … Cân bao nhiêu gam …?", "bien_V": [100, 200, 500],
        "dap_an_theo_V": { "100": 1.0, "200": 2.0, "500": 5.0 }, "dung_sai_tuong_doi": 0.02, "don_vi": "g", "loi_giai": "…" },
      "ghi_chu": "…"
    }
  ],

  /* CHẶNG 3 – ghép các khối thử có sẵn trong js/khoi/ (đọc mô tả cấu hình ở đầu mỗi file khối).
     Khối hiện có: the_tich_lay, dinh_tinh_pho_uv, dinh_tinh_quan_sat, dinh_luong_a1pct, dong_deu_khoi_luong, do_hoa_tan.
     Cần phép thử chưa có (ví dụ chuẩn độ iod, HPLC, đồng đều khối lượng nang) → viết thêm một file khối mới. */
  "chang_3_thuc_nghiem": {
    "kieu": "ghep_khoi",
    "gioi_thieu": "…",
    "so_ket_luan": "3.3",
    "nguon_ket_luan": "DĐVN V, chuyên luận …",
    "kich_ban_lo": null,
    "khoi": [
      { "loai": "dong_deu_khoi_luong", "id": "VC-3.1", "so": "3.1", "tieu_de": "Độ đồng đều khối lượng (20 viên)",
        "so_don_vi": 20, "bang_gioi_han": [{ "kltb_toi_da_mg": 80, "phan_tram": 10 }, { "kltb_duoi_mg": 250, "phan_tram": 7.5 }, { "kltb_tu_mg": 250, "phan_tram": 5 }],
        "sinh_so_lieu": { "nhom_KLTB": [{ "ma": "…", "kltb_min": 0, "kltb_max": 0, "trong_so": 1 }], "SD_tuong_doi": 0.015, "lam_tron_mg": 1,
          "kich_ban": [{ "ma": "dat", "trong_so": 0.5 }, { "ma": "dat_bien_2_vien", "trong_so": 0.15 }, { "ma": "khong_dat_3_vien", "trong_so": 0.2 }, { "ma": "khong_dat_gap_doi", "trong_so": 0.15 }] },
        "dung_sai": { "KLTB_mg_tuyet_doi": 0.1, "gioi_han_mg_tuyet_doi": 0.2 }, "cong_thuc_tex": [], "nguon": "DĐVN V, Phụ lục 11.3",
        "khoa_ket_luan": "kl", "nhan_ket_luan": "Độ đồng đều khối lượng", "phieu": "Độ đồng đều khối lượng" }
    ]
  },

  /* CHẶNG 4 – thẻ "Thám tử sai số".
     loai "chon_mot": trắc nghiệm có chấm. Phương án viết thống nhất dạng "Đúng, …" / "Sai, …" (không dùng dấu ":"), để đáp án đúng không lộ qua dấu câu.
     loai "tra_loi_ngan": câu hỏi mở, không chấm, chỉ ghi nhận câu trả lời (tham_khao_gv chỉ hiện ở chế độ giảng viên). */
  "chang_4_the_loi": [
    { "id": "VC-L1", "loai": "chon_mot", "bai_lam": "…", "lua_chon": ["Sai, …", "Đúng, …", "Đúng, …", "Sai, …"], "dap_an": 0, "nguon": "…" },
    { "id": "VC-L2", "loai": "tra_loi_ngan", "bai_lam": "…", "hoi": "Bạn nhận xét gì về cách làm hoặc kết luận này? Trả lời ngắn gọn.", "tham_khao_gv": "…", "nguon": "…" }
  ],
  /* Số thẻ hiện cho mỗi lô (chọn ngẫu nhiên theo mã lô). XÓA dòng này ở bản demo đầu để hiện toàn bộ ngân hàng cho giảng viên rà soát. */
  "the_loi_so_cau": { "chon_mot": 3, "tra_loi_ngan": 1 },

  /* Các dòng trên phiếu kiểm nghiệm: "ten" phải trùng với "phieu" của các khối ở chặng 3.
     Không cần dấu chấm cuối câu (app tự thêm). Phần kết luận phiếu là điền chỗ trống, dùng chung cho mọi chuyên luận (data/chung.js → ket_luan_dien). */
  "phieu_chi_tieu": [
    { "ten": "Độ đồng đều khối lượng", "yeu_cau": "Khối lượng trung bình viên ± {gioi_han} %" }
  ],

  /* Lô kiểm thử cho giảng viên (tùy chọn): số liệu cố định + kết quả đúng để đối chiếu */
  "lo_kiem_thu": []
});
