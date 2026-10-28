/* CHUYÊN LUẬN: Viên nén Indomethacin 25 mg
   Hồ sơ id "INDO" – mã lô dạng IN-XXXXXX. Chặng 3 dùng kiểu "INDO_dong_deu_KL_va_hoa_tan" (js/kieu/).
   Nội dung chuyên môn trích DĐVN V; số liệu mẫu là giả định. */
PKN.themChuyenLuan({
  "id": "INDO",
  "tien_to_ma_lo": "IN",
  "ten_mau": "Viên nén Indomethacin 25 mg",
  "dang_bao_che": "Viên nén",
  "bien_the": [
    {
      "ma": "INDO-25",
      "nhan": "Indomethacin 25 mg",
      "ham_luong_mg": 25
    }
  ],
  "chi_tieu_buoi_thuc_tap": [
    "Độ đồng đều khối lượng",
    "Độ hòa tan"
  ],
  "yeu_cau": {
    "ham_luong_min": 90.0,
    "ham_luong_max": 110.0,
    "Q": 70,
    "A1pct_hoa_tan": 196,
    "A1pct_dinh_luong": 193,
    "the_tich_moi_truong_ml": 900
  },
  "chang_1_tiep_nhan": [
    {
      "id": "IN-T1",
      "loai": "chon_mot",
      "hoi": "Chuyên luận Viên nén Indomethacin yêu cầu chế phẩm đáp ứng thêm yêu cầu chung nào?",
      "lua_chon": [
        "Chuyên luận \"Thuốc viên nén\" (Phụ lục 1.20)",
        "Phụ lục 1.19 – Thuốc tiêm",
        "Phụ lục 1.13 – Thuốc nang",
        "Không cần yêu cầu chung"
      ],
      "dap_an": 0,
      "giai_thich": "Chuyên luận Viên nén Indomethacin dẫn tới chuyên luận chung \"Thuốc viên nén\" (Phụ lục 1.20): chế phẩm phải đáp ứng các yêu cầu chung ở đó và các yêu cầu riêng của chuyên luận.",
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514"
    },
    {
      "id": "IN-T2",
      "loai": "chon_mot",
      "hoi": "Vì sao buổi thực tập không thử độ rã của viên indomethacin?",
      "lua_chon": [
        "Phụ lục 1.20: viên đã thử độ hòa tan với tất cả dược chất thì không phải thử độ rã",
        "Vì viên nén indomethacin không có yêu cầu độ rã",
        "Vì indomethacin không tan trong nước",
        "Vì độ rã chỉ áp dụng cho viên nang"
      ],
      "dap_an": 0,
      "giai_thich": "Phụ lục 1.20: \"Viên nén và viên bao đã thử độ hòa tan với tất cả các dược chất có trong thành phần thì không phải thử độ rã.\"",
      "nguon": "DĐVN V, Phụ lục 1.20, PL-28 đến PL-30"
    },
    {
      "id": "IN-T3",
      "loai": "chon_mot",
      "hoi": "Độ đồng đều khối lượng của viên nén indomethacin làm theo phương pháp nào, lấy bao nhiêu đơn vị?",
      "lua_chon": [
        "Phương pháp 1 – cân riêng biệt 20 đơn vị lấy ngẫu nhiên",
        "Phương pháp 2 – 20 đơn vị, trừ khối lượng vỏ",
        "Phương pháp 1 – 10 đơn vị",
        "Phương pháp 4 – 5 đơn vị"
      ],
      "dap_an": 0,
      "giai_thich": "Phụ lục 11.3, Phương pháp 1 áp dụng cho viên nén: cân riêng biệt 20 đơn vị lấy ngẫu nhiên, tính khối lượng trung bình.",
      "nguon": "DĐVN V, Phụ lục 11.3, PL-249"
    },
    {
      "id": "IN-T4",
      "loai": "chon_mot",
      "hoi": "Tiêu chí đánh giá độ đồng đều khối lượng (Phương pháp 1) là gì?",
      "lua_chon": [
        "Không quá 2 đơn vị nằm ngoài giới hạn chênh lệch và không đơn vị nào vượt gấp đôi giới hạn",
        "Tất cả 20 đơn vị phải nằm trong giới hạn",
        "Không quá 1 đơn vị ngoài giới hạn",
        "Trung bình nằm trong ± giới hạn là đạt"
      ],
      "dap_an": 0,
      "giai_thich": "Nguyên văn Phụ lục 11.3: \"Không được có quá hai đơn vị có khối lượng nằm ngoài giới hạn chênh lệch so với khối lượng trung bình quy định trong Bảng 11.3.1 và không được có đơn vị nào có khối lượng vượt gấp đôi giới hạn đó.\"",
      "nguon": "DĐVN V, Phụ lục 11.3, PL-249"
    },
    {
      "id": "IN-T5",
      "loai": "chon_mot",
      "hoi": "Giới hạn % chênh lệch (Bảng 11.3.1) được tra theo đại lượng nào?",
      "lua_chon": [
        "Khối lượng trung bình của cả viên",
        "Hàm lượng hoạt chất ghi nhãn (25 mg)",
        "Khối lượng viên nặng nhất",
        "Khối lượng sau khi loại vỏ bao"
      ],
      "dap_an": 0,
      "giai_thich": "Bảng 11.3.1 – Viên nén; viên bao phim: KLTB ≤ 80 mg → 10 %; > 80 mg và < 250 mg → 7,5 %; ≥ 250 mg → 5 %. Tra theo khối lượng trung bình viên, không theo 25 mg hoạt chất.",
      "nguon": "DĐVN V, Phụ lục 11.3, Bảng 11.3.1, PL-250"
    },
    {
      "id": "IN-T6",
      "loai": "chon_mot",
      "hoi": "Môi trường hòa tan theo chuyên luận là gì?",
      "lua_chon": [
        "900 ml đệm phosphat chuẩn pH 7,2 (TT)",
        "900 ml dung dịch đệm phosphat pH 7,2",
        "900 ml nước cất",
        "900 ml dung dịch muối đệm pH 7,2"
      ],
      "dap_an": 0,
      "giai_thich": "Chuyên luận ghi đúng tên \"đệm phosphat chuẩn pH 7,2 (TT)\". Chú ý: mục \"Dung dịch đệm phosphat pH 7,2\" trong Phụ lục 2.3 lại dẫn sang đệm citro-phosphat – là dung dịch khác.",
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514; DĐVN V, Phụ lục 2.3, PL-104, PL-107, PL-108"
    },
    {
      "id": "IN-T7",
      "loai": "chon_nhieu",
      "hoi": "Chọn tất cả điều kiện đúng của phép thử độ hòa tan viên indomethacin:",
      "lua_chon": [
        "Thiết bị kiểu cánh khuấy",
        "Tốc độ 50 r/min",
        "Thời gian 45 min",
        "Nhiệt độ (37 ± 0,5) °C",
        "Thiết bị kiểu giỏ quay",
        "Tốc độ 100 r/min",
        "Thời gian 30 min"
      ],
      "dap_an": [
        0,
        1,
        2,
        3
      ],
      "giai_thich": "Chuyên luận: kiểu cánh khuấy, 900 ml đệm phosphat chuẩn pH 7,2, 50 r/min, 45 min. Phụ lục 11.4: nhiệt độ (37 ± 0,5) °C.",
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514; DĐVN V, Phụ lục 11.4"
    },
    {
      "id": "IN-T8",
      "loai": "chon_mot",
      "hoi": "Tính lượng indomethacin đã hòa tan theo A (1 %, 1 cm) bằng bao nhiêu?",
      "lua_chon": [
        "196 ở 320 nm",
        "193 ở 320 nm",
        "430 ở 290 nm",
        "196 ở 290 nm"
      ],
      "dap_an": 0,
      "giai_thich": "Độ hòa tan dùng 196 (đo trong môi trường hòa tan). Giá trị 193 dùng cho phép Định lượng (đo trong hỗn hợp methanol – đệm). Dùng nhầm 193 làm kết quả cao giả khoảng 1,6 %.",
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514"
    },
    {
      "id": "IN-T9",
      "loai": "chon_mot",
      "hoi": "Phép thử độ hòa tan viên indomethacin lấy bao nhiêu đơn vị và đánh giá thế nào?",
      "lua_chon": [
        "6 đơn vị; lượng hòa tan từ mỗi đơn vị không thấp hơn 70 % so với nhãn. Nếu có 1 đơn vị không đạt thì lặp lại với 6 đơn vị khác, lần này cả 6 đơn vị đều phải đạt",
        "6 đơn vị; lượng hòa tan trung bình của 6 đơn vị không thấp hơn 70 % là đạt",
        "6 đơn vị; nếu có đơn vị không đạt thì được thử lại nhiều lần đến khi đạt",
        "20 đơn vị lấy từ phép thử đồng đều khối lượng; mỗi đơn vị không thấp hơn 70 %"
      ],
      "dap_an": 0,
      "giai_thich": "Chuyên luận: không ít hơn 70 % lượng indomethacin so với lượng ghi trên nhãn được hòa tan trong 45 min. Phụ lục 11.4 (PL-257): \"Lấy 6 đơn vị thử, lượng dược chất hòa tan từ mỗi đơn vị so với lượng ghi trên nhãn không được thấp hơn 70 %. Nếu có 1 đơn vị không đạt yêu cầu thì lặp lại phép thử với 6 đơn vị khác, lần này cả 6 đơn vị đều phải đạt. … Không được phép thử lại.\"",
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514; DĐVN V, Phụ lục 11.4, PL-257"
    },
    {
      "id": "IN-T11",
      "loai": "chon_mot",
      "hoi": "Ở lần thử đầu có 2 đơn vị hòa tan dưới 70 %. Kết luận thế nào?",
      "lua_chon": [
        "Không đạt – chỉ được thử lặp lại khi có đúng 1 đơn vị không đạt",
        "Thử lặp lại với 6 đơn vị khác",
        "Thử lặp lại với 12 đơn vị khác",
        "Tính trung bình 6 đơn vị; nếu ≥ 70 % thì đạt"
      ],
      "dap_an": 0,
      "giai_thich": "PL-257 chỉ cho lặp lại khi \"có 1 đơn vị không đạt yêu cầu\". Từ 2 đơn vị trở lên không đạt thì mẫu không đạt; \"Không được phép thử lại.\"",
      "nguon": "DĐVN V, Phụ lục 11.4, PL-257"
    },
    {
      "id": "IN-T10",
      "loai": "chon_nhieu",
      "hoi": "Chuẩn bị môi trường hòa tan theo Phụ lục 11.4 cần lưu ý những gì? (chọn tất cả ý đúng)",
      "lua_chon": [
        "Điều chỉnh pH trong khoảng pH quy định ± 0,05",
        "Loại khí trước khi dùng",
        "Đong thể tích ở 20 °C đến 25 °C",
        "Cân bằng nhiệt độ (37 ± 0,5) °C trước khi cho viên",
        "Dùng nước cất thay đệm nếu thiếu đệm",
        "Lọc dịch hòa tan và dùng ngay 20 ml dịch lọc đầu"
      ],
      "dap_an": [
        0,
        1,
        2,
        3
      ],
      "giai_thich": "Phụ lục 11.4: đệm điều chỉnh pH ± 0,05; loại khí (ví dụ làm ấm khoảng 41 °C, lọc chân không màng 0,45 µm); đong thể tích ở 20–25 °C; cân bằng nhiệt độ trước khi cho viên. Chuyên luận yêu cầu bỏ 20 ml dịch lọc đầu.",
      "nguon": "DĐVN V, Phụ lục 11.4, PL-254, PL-257; DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514"
    }
  ],
  "chang_2_hoa_chat": [
    {
      "id": "IN-H1",
      "ten_trong_chuyen_luan": "đệm phosphat chuẩn pH 7,2 (TT)",
      "dung_o": "Môi trường hòa tan, mẫu trắng, pha loãng dịch lọc",
      "tra_o": {
        "lua_chon": [
          "Phụ lục 2.3 – Các dung dịch đệm, mục (Các) Đệm phosphat chuẩn",
          "Phụ lục 2.3 – mục Dung dịch đệm phosphat pH 7,2",
          "Phụ lục 2.3 – mục Dung dịch muối đệm pH 7,2",
          "Phụ lục 2.2 – Dung dịch chuẩn độ"
        ],
        "dap_an": 0,
        "giai_thich": "Tên trong chuyên luận có chữ \"chuẩn\" → mục (Các) Đệm phosphat chuẩn (PL-108). Mục \"Dung dịch đệm phosphat pH 7,2\" (PL-104) ghi \"Xem đệm citro-phosphat pH 7,2\" – đó là dung dịch khác (PL-107)."
      },
      "cach_pha": {
        "lua_chon": [
          "Trộn 50 ml dung dịch kali dihydrophosphat 0,2 M (TT) với 35,00 ml dung dịch natri hydroxyd 0,2 N (CĐ), thêm nước vừa đủ 200 ml",
          "Trộn 87 ml dung dịch dinatri hydrophosphat 7,15 % (TT) với 13 ml dung dịch acid citric 2,1 % (TT)",
          "Hòa tan 8 g natri clorid, 0,2 g kali clorid, 0,1 g calci clorid khan, 0,1 g magnesi clorid, 3,18 g dinatri hydrophosphat và 0,2 g kali dihydrophosphat trong nước vừa đủ 1000 ml",
          "Hòa tan 3,40 g kali dihydrophosphat và 3,55 g dinatri hydrophosphat khan trong nước vừa đủ 1000 ml"
        ],
        "dap_an": 0,
        "giai_thich": "Phương án 1: Bảng 2.3, dòng pH 7,2 (PL-108). Phương án 2: đệm citro-phosphat pH 7,2 (PL-107). Phương án 3: dung dịch muối đệm pH 7,2 (PL-105). Phương án 4: đệm phosphat chuẩn 0,025 M (PL-107). Các dung dịch đệm được pha trong nước không có carbon dioxyd (TT) (PL-101).",
        "nguon": "DĐVN V, Phụ lục 2.3, PL-101, PL-105, PL-107, PL-108"
      },
      "tinh_toan": {
        "hoi": "Cần {V} ml đệm phosphat chuẩn pH 7,2. Cần bao nhiêu ml dung dịch kali dihydrophosphat 0,2 M và bao nhiêu ml dung dịch natri hydroxyd 0,2 N?",
        "bien_V": [
          6000,
          8000,
          12000
        ],
        "dap_an_theo_V": {
          "6000": [
            1500,
            1050
          ],
          "8000": [
            2000,
            1400
          ],
          "12000": [
            3000,
            2100
          ]
        },
        "nhan_dap_an": [
          "KH2PO4 0,2 M (ml)",
          "NaOH 0,2 N (ml)"
        ],
        "dung_sai_tuong_doi": 0.01,
        "loi_giai": "Công thức gốc 200 ml: 50 ml KH2PO4 0,2 M + 35,00 ml NaOH 0,2 N → nhân hệ số V/200. Lần thử đầu cần 6 cốc × 900 ml = 5400 ml, cộng phần tráng và pha loãng → khoảng 6000 ml. Nếu phải thử lặp lại với 6 đơn vị khác thì cần thêm khoảng 6000 ml nữa."
      },
      "ghi_chu": "Kiểm tra pH sau khi pha, điều chỉnh trong khoảng 7,2 ± 0,05 (Phụ lục 11.4)."
    },
    {
      "id": "IN-H2",
      "ten_trong_chuyen_luan": "dung dịch kali dihydrophosphat 0,2 M (TT) (nguyên liệu pha đệm)",
      "dung_o": "Pha đệm phosphat chuẩn pH 7,2",
      "tra_o": {
        "lua_chon": [
          "Phụ lục 2.1.1, mục Kali dihydrophosphat (TT) (KH2PO4 = 136,09, PL-64) và định nghĩa nồng độ mol ở Phụ lục 2.2 – Quy định chung (PL-95)",
          "Phụ lục 2.3, mục Đệm phosphat 0,2 M pH 7,5 (PL-108)",
          "Phụ lục 2.2 – mục Dung dịch kali dihydrophosphat 0,2 N",
          "Phụ lục 2.4 – Dung dịch mẫu"
        ],
        "dap_an": 0,
        "giai_thich": "Phụ lục 2.1.1 có hóa chất Kali dihydrophosphat (TT), KH2PO4 = 136,09 (PL-64), nhưng không có mục riêng cho dung dịch 0,2 M. Phụ lục 2.2 – Quy định chung định nghĩa: \"Nồng độ mol (M): Số mol của chất tan trong 1000 ml dung dịch\" → 0,2 × 136,09 = 27,22 g trong nước vừa đủ 1000 ml. Chú ý: \"Đệm phosphat 0,2 M pH 7,5\" (PL-108) cũng hòa tan 27,22 g KH2PO4 nhưng chỉnh pH bằng KOH 30 % – đó là dung dịch đệm khác."
      },
      "cach_pha": {
        "lua_chon": [
          "Hòa tan 27,22 g kali dihydrophosphat (TT) trong nước không có carbon dioxyd (TT) vừa đủ 1000 ml",
          "Hòa tan 27,22 g kali dihydrophosphat (TT) trong 930 ml nước, chỉnh pH đến 7,5 bằng dung dịch kali hydroxyd 30 % (TT) và thêm nước vừa đủ 1000 ml",
          "Hòa tan 27,22 g kali dihydrophosphat trong 1000 ml nước",
          "Hòa tan 13,61 g kali dihydrophosphat trong nước vừa đủ 1000 ml"
        ],
        "dap_an": 0,
        "giai_thich": "0,2 mol × 136,09 g/mol = 27,22 g, hòa tan và thêm nước vừa đủ 1000 ml (khác với \"trong 1000 ml nước\"). Phương án 2 là Đệm phosphat 0,2 M pH 7,5 (PL-108). Các dung dịch đệm được pha trong nước không có carbon dioxyd (TT) (PL-101).",
        "nguon": "DĐVN V, Phụ lục 2.1.1, PL-64; Phụ lục 2.2 – Quy định chung, PL-95; Phụ lục 2.3, PL-101, PL-108"
      },
      "tinh_toan": {
        "hoi": "Cần {V} ml dung dịch kali dihydrophosphat 0,2 M. Cân bao nhiêu gam KH2PO4?",
        "bien_V": [
          1500,
          2000,
          3000
        ],
        "dap_an_theo_V": {
          "1500": 40.83,
          "2000": 54.44,
          "3000": 81.65
        },
        "dung_sai_tuong_doi": 0.01,
        "don_vi": "g",
        "loi_giai": "m = 0,2 × 136,09 × V/1000."
      }
    },
    {
      "id": "IN-H3",
      "ten_trong_chuyen_luan": "dung dịch natri hydroxyd 0,2 N (CĐ) (nguyên liệu pha đệm)",
      "dung_o": "Pha đệm phosphat chuẩn pH 7,2",
      "tra_o": {
        "lua_chon": [
          "Phụ lục 2.2 – Quy định chung: pha loãng chính xác dung dịch chuẩn độ đậm đặc hơn (NaOH 1 N (CĐ)) bằng nước không có carbon dioxyd",
          "Phụ lục 2.2 – mục Dung dịch natri hydroxyd 0,2 N",
          "Phụ lục 2.1.1 – mục Dung dịch natri hydroxyd 2 %",
          "Phụ lục 2.3 – Dung dịch đệm"
        ],
        "dap_an": 0,
        "giai_thich": "Phụ lục 2.2 không có mục riêng NaOH 0,2 N; PL-101 ghi \"Dung dịch natri hydroxyd 0,2 N: Pha như mô tả trong dung dịch chuẩn độ.\" Quy định chung Phụ lục 2.2: dung dịch loãng hơn được điều chế bằng cách pha loãng chính xác dung dịch đậm đặc hơn với nước không có carbon dioxyd (TT); hệ số K giữ nguyên K của dung dịch gốc."
      },
      "cach_pha": {
        "lua_chon": [
          "Pha loãng chính xác dung dịch natri hydroxyd 1 N (CĐ) 5 lần bằng nước không có carbon dioxyd (TT); K bằng K của dung dịch 1 N",
          "Cân 8,0 g natri hydroxyd hòa tan trong nước vừa đủ 1000 ml, dùng ngay",
          "Pha loãng dung dịch natri hydroxyd 2 % (TT) 2,5 lần",
          "Hòa tan 8,5 g natri hydroxyd trong nước vừa đủ 100 ml"
        ],
        "dap_an": 0,
        "giai_thich": "Dung dịch NaOH 1 N (CĐ) (PL-99, PL-100): hòa tan 45,0 g natri hydroxyd (TT) trong 50 ml nước, đậy nút cao su, để yên qua đêm, gạn phần trong, pha loãng với nước không có carbon dioxyd (TT) vừa đủ 1000 ml; chuẩn độ bằng dung dịch acid hydrocloric 1 N (CĐ). Phương án 2 không phải dung dịch chuẩn độ (NaOH hút ẩm, lẫn carbonat). Phương án 4 là dung dịch natri hydroxyd loãng (TT).",
        "nguon": "DĐVN V, Phụ lục 2.2, PL-95 đến PL-100; Phụ lục 2.3, PL-101"
      },
      "tinh_toan": {
        "hoi": "Cần {V} ml dung dịch natri hydroxyd 0,2 N. Lấy chính xác bao nhiêu ml dung dịch natri hydroxyd 1 N (CĐ)?",
        "bien_V": [
          1000,
          1050,
          1400
        ],
        "dap_an_theo_V": {
          "1000": 200.0,
          "1050": 210.0,
          "1400": 280.0
        },
        "dung_sai_tuong_doi": 0.005,
        "don_vi": "ml",
        "loi_giai": "V(1 N) = V × 0,2 ÷ 1. Pha loãng bằng nước không có carbon dioxyd (TT): đun sôi nước 10 min, làm nguội đến 20 °C, tránh CO2 không khí (PL-76)."
      }
    }
  ],
  "chang_3_thuc_nghiem": {
    "kieu": "INDO_dong_deu_KL_va_hoa_tan",
    "dong_deu_KL": {
      "so_don_vi": 20,
      "bang_gioi_han": [
        {
          "kltb_toi_da_mg": 80,
          "bao_gom_bien": true,
          "phan_tram": 10
        },
        {
          "kltb_duoi_mg": 250,
          "phan_tram": 7.5
        },
        {
          "kltb_tu_mg": 250,
          "phan_tram": 5
        }
      ],
      "nguon": "DĐVN V, Phụ lục 11.3, Phương pháp 1 và Bảng 11.3.1, PL-249–PL-250",
      "sv_phai_nhap": [
        "Khối lượng trung bình (mg)",
        "Giới hạn % chênh lệch áp dụng",
        "Khối lượng nhỏ nhất và lớn nhất cho phép (mg)",
        "Số viên nằm ngoài giới hạn",
        "Số viên vượt gấp đôi giới hạn",
        "Kết luận Đạt/Không đạt"
      ],
      "sinh_so_lieu": {
        "nhom_KLTB": [
          {
            "ma": "vien_25mg",
            "kltb_min": 100,
            "kltb_max": 230,
            "trong_so": 1.0
          }
        ],
        "SD_tuong_doi": 0.015,
        "kich_ban": [
          {
            "ma": "dat",
            "trong_so": 0.5
          },
          {
            "ma": "dat_bien_2_vien",
            "trong_so": 0.15,
            "mo_ta": "đúng 2 viên ngoài giới hạn, không viên nào gấp đôi → vẫn Đạt"
          },
          {
            "ma": "khong_dat_3_vien",
            "trong_so": 0.2
          },
          {
            "ma": "khong_dat_gap_doi",
            "trong_so": 0.15
          }
        ],
        "lam_tron_mg": 1,
        "ghi_chu": "Chỉ một loại viên nén indomethacin 25 mg; khối lượng trung bình viên giả định trong 100–230 mg (giới hạn ± 7,5 %)."
      },
      "ghi_chu_bo_mon": "Ở lớp, 6 viên thử độ hòa tan lấy từ chính 20 viên đã cân.",
      "cong_thuc_tex": [
        {
          "ten": "Khối lượng trung bình",
          "tex": "\\overline{m} = \\frac{\\sum_{i=1}^{20} m_i}{20}"
        },
        {
          "ten": "Giới hạn dưới",
          "tex": "m_{\\min} = \\overline{m}\\times\\left(1-\\frac{p}{100}\\right)"
        },
        {
          "ten": "Giới hạn trên",
          "tex": "m_{\\max} = \\overline{m}\\times\\left(1+\\frac{p}{100}\\right)"
        },
        {
          "ten": "Giới hạn gấp đôi (dưới)",
          "tex": "m_{\\min,2p} = \\overline{m}\\times\\left(1-\\frac{2p}{100}\\right)"
        },
        {
          "ten": "Giới hạn gấp đôi (trên)",
          "tex": "m_{\\max,2p} = \\overline{m}\\times\\left(1+\\frac{2p}{100}\\right)"
        }
      ]
    },
    "do_hoa_tan": {
      "dieu_kien": "Kiểu cánh khuấy; 900 ml đệm phosphat chuẩn pH 7,2 (TT); 50 r/min; 45 min; (37 ± 0,5) °C; lọc, bỏ 20 ml dịch lọc đầu; đo ở 320 nm, mẫu trắng là môi trường hòa tan; A (1 %, 1 cm) = 196.",
      "cong_thuc": {
        "mg_hoa_tan": "(A ÷ 196) × 900 ÷ 100 × 1000 × f  (f = hệ số pha loãng dịch lọc, mặc định 1)",
        "phan_tram_nhan": "mg_hoa_tan ÷ 25 × 100"
      },
      "quy_tac_danh_gia": {
        "gioi_han_moi_don_vi": 70,
        "lan_1": "Thử 6 đơn vị. Tất cả ≥ 70 % → Đạt. Đúng 1 đơn vị < 70 % → lặp lại với 6 đơn vị khác. Từ 2 đơn vị < 70 % trở lên → Không đạt.",
        "lan_2": "Thử 6 đơn vị khác. Cả 6 đơn vị ≥ 70 % → Đạt. Có đơn vị < 70 % → Không đạt. Không được phép thử lại.",
        "trich_nguyen_van": "Lấy 6 đơn vị thử, lượng dược chất hòa tan từ mỗi đơn vị so với lượng ghi trên nhãn không được thấp hơn 70 %. Nếu có 1 đơn vị không đạt yêu cầu thì lặp lại phép thử với 6 đơn vị khác, lần này cả 6 đơn vị đều phải đạt. … Không được phép thử lại."
      },
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514 (Yêu cầu: Không ít hơn 70 % (Q) lượng indomethacin so với lượng ghi trên nhãn được hòa tan trong 45 min); DĐVN V, Phụ lục 11.4, mục \"Một số quy định đối với phép thử độ hòa tan của viên nén và nang\", PL-257",
      "ghi_chu_GV": "Theo quyết định của bộ môn: đánh giá theo yêu cầu của chuyên luận và đoạn PL-257 (mỗi đơn vị ≥ 70 %), không dùng Bảng 11.4.1 (S1/S2/S3).",
      "ghi_chu_bo_mon": "Ở lớp, 6 viên của lần thử đầu lấy từ 20 viên đã cân; nếu phải thử lặp lại thì lấy 6 viên khác trong số còn lại.",
      "sv_phai_nhap": [
        "% hòa tan từng cốc",
        "Số đơn vị < 70 %",
        "Quyết định: Đạt / Thử lặp lại với 6 đơn vị khác / Không đạt"
      ],
      "sinh_so_lieu": {
        "kich_ban": [
          {
            "ma": "dat_lan_1",
            "trong_so": 0.45,
            "mu": 85,
            "sd": 4
          },
          {
            "ma": "dat_lan_2",
            "trong_so": 0.2,
            "mu": 80,
            "sd": 5
          },
          {
            "ma": "khong_dat_lan_1",
            "trong_so": 0.2,
            "mu": 70,
            "sd": 4
          },
          {
            "ma": "khong_dat_lan_2",
            "trong_so": 0.15,
            "mu": 76,
            "sd": 4
          }
        ],
        "cach_sinh": "Sinh % hòa tan cho 12 cốc (lần 1: cốc 1–6; lần 2: cốc 7–12) theo phân phối chuẩn (mu, sd), cắt trong 50–105 %. Đổi % ra A = (% × 25 ÷ 100) ÷ 9000 × 196, làm tròn 3 chữ số thập phân; tính lại % từ A đã làm tròn rồi kiểm tra kịch bản, sinh lại nếu chưa đúng: dat_lan_1 – lần 1 không có cốc < 70 %; dat_lan_2 – lần 1 đúng 1 cốc < 70 %, lần 2 không có cốc < 70 %; khong_dat_lan_1 – lần 1 có từ 2 cốc < 70 %; khong_dat_lan_2 – lần 1 đúng 1 cốc < 70 %, lần 2 có ít nhất 1 cốc < 70 %. Chỉ hiện cho SV các cốc của lần đang thử."
      },
      "cong_thuc_tex": [
        {
          "ten": "Lượng indomethacin hòa tan (mg)",
          "tex": "m = \\frac{A}{196}\\times\\frac{900}{100}\\times 1000\\times f"
        },
        {
          "ten": "Phần trăm so với nhãn",
          "tex": "\\% = \\frac{m}{25}\\times 100"
        }
      ]
    },
    "dung_sai_cham": {
      "KLTB_mg_tuyet_doi": 0.1,
      "gioi_han_mg_tuyet_doi": 0.2,
      "phan_tram_hoa_tan_tuyet_doi": 0.3,
      "trung_binh_tuyet_doi": 0.3
    }
  },
  "chang_4_the_loi": [
    {
      "id": "IN-L1",
      "bai_lam": "Bạn A chuẩn bị môi trường bằng \"dung dịch đệm phosphat pH 7,2\" theo mục ở PL-104 (dẫn sang đệm citro-phosphat).",
      "lua_chon": [
        "Sai môi trường: chuyên luận yêu cầu đệm phosphat chuẩn pH 7,2 (PL-108) – kết quả không có giá trị",
        "Đúng vì cùng pH 7,2",
        "Chấp nhận được nếu kiểm tra pH đúng 7,2",
        "Chỉ ảnh hưởng mẫu trắng"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, Phụ lục 2.3; DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514"
    },
    {
      "id": "IN-L2",
      "bai_lam": "Bạn B không loại khí môi trường hòa tan; nhiều bọt khí bám trên bề mặt viên. Kết quả % hòa tan có xu hướng thế nào?",
      "lua_chon": [
        "Thấp giả",
        "Cao giả",
        "Không ảnh hưởng",
        "Không đoán được chiều"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, Phụ lục 11.4 (yêu cầu loại khí, loại bọt khí khỏi bề mặt mẫu thử)"
    },
    {
      "id": "IN-L3",
      "bai_lam": "Bạn C tính % hòa tan với A (1 %, 1 cm) = 193.",
      "lua_chon": [
        "Sai hằng số: 193 dùng cho Định lượng; độ hòa tan dùng 196 → kết quả cao giả khoảng 1,6 %",
        "Đúng, hai giá trị dùng thay thế nhau được",
        "Thấp giả khoảng 1,6 %",
        "Không ảnh hưởng vì sai số nhỏ"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514"
    },
    {
      "id": "IN-L4",
      "bai_lam": "Bạn D tra giới hạn đồng đều khối lượng theo 25 mg (hàm lượng hoạt chất) nên áp dụng ± 10 %.",
      "lua_chon": [
        "Sai: tra theo khối lượng trung bình của cả viên",
        "Đúng vì 25 mg ≤ 80 mg",
        "Đúng vì là viên nén không bao",
        "Chỉ sai khi viên nặng hơn 250 mg"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, Phụ lục 11.3, Bảng 11.3.1"
    },
    {
      "id": "IN-L5",
      "bai_lam": "Ở lần thử đầu có một cốc 67,8 %, các cốc còn lại trên 79 %. Bạn E kết luận \"Không đạt\" và dừng phép thử.",
      "lua_chon": [
        "Sai: có đúng 1 đơn vị không đạt thì phải lặp lại phép thử với 6 đơn vị khác",
        "Đúng vì có đơn vị dưới 70 %",
        "Đúng nếu trung bình dưới 80 %",
        "Chỉ cần thử lại riêng cốc không đạt"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, Phụ lục 11.4, PL-257"
    },
    {
      "id": "IN-L8",
      "bai_lam": "Độ đồng đều khối lượng đạt, độ hòa tan không đạt. Bạn K ghi kết luận: \"Mẫu đạt độ đồng đều khối lượng, không đạt độ hòa tan → mẫu đạt một phần\".",
      "lua_chon": [
        "Sai: một chỉ tiêu không đạt thì kết luận chung là mẫu không đạt yêu cầu kiểm tra chất lượng (ghi rõ chỉ tiêu không đạt)",
        "Đúng, phải ghi đủ cả hai",
        "Đúng vì độ đồng đều khối lượng đạt",
        "Chỉ cần ghi kết luận của chỉ tiêu cuối cùng"
      ],
      "dap_an": 0,
      "nguon": "Nguyên tắc kết luận phiếu kiểm nghiệm (quy định bộ môn)"
    },
    {
      "id": "IN-L7",
      "bai_lam": "Ở lần thử lặp lại (6 đơn vị khác) có một cốc 69,6 %. Bạn G đề nghị thử thêm lần thứ ba.",
      "lua_chon": [
        "Sai: lần lặp lại cả 6 đơn vị đều phải đạt và không được phép thử lại → mẫu Không đạt",
        "Đúng, vì 69,6 % làm tròn thành 70 %",
        "Đúng, được thử thêm 12 đơn vị",
        "Lấy trung bình 12 đơn vị để kết luận"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, Phụ lục 11.4, PL-257"
    },
    {
      "id": "IN-L6",
      "bai_lam": "Bạn F lọc dịch hòa tan và dùng ngay phần dịch lọc đầu tiên để đo.",
      "lua_chon": [
        "Sai: chuyên luận yêu cầu bỏ 20 ml dịch lọc đầu (màng lọc có thể hấp phụ dược chất) → nguy cơ thấp giả",
        "Đúng nếu lọc nhanh",
        "Đúng vì dịch lọc đầu đậm đặc nhất",
        "Chỉ ảnh hưởng khi pha loãng"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514"
    }
  ],
  "lo_kiem_thu": [
    {
      "ma_lo": "KT-IN-01",
      "khoi_luong_mg": [
        152.1,
        149.8,
        151.3,
        148.6,
        150.4,
        153.0,
        147.9,
        150.7,
        149.2,
        151.8,
        150.1,
        148.3,
        152.6,
        149.5,
        150.9,
        151.2,
        148.8,
        150.3,
        149.9,
        151.5
      ],
      "ket_qua_dung": {
        "KLTB": 150.4,
        "gioi_han_phan_tram": 7.5,
        "min": 139.12,
        "max": 161.67,
        "min_gap_doi": 127.84,
        "max_gap_doi": 172.95,
        "so_vuot": 0,
        "so_gap_doi": 0,
        "ket_luan": "Đạt"
      }
    },
    {
      "ma_lo": "KT-IN-02",
      "khoi_luong_mg": [
        150.2,
        149.1,
        163.8,
        150.8,
        148.7,
        151.1,
        137.0,
        150.4,
        149.6,
        151.9,
        150.0,
        162.9,
        149.3,
        150.6,
        148.9,
        151.4,
        150.2,
        149.7,
        150.8,
        149.5
      ],
      "ket_qua_dung": {
        "KLTB": 150.79,
        "gioi_han_phan_tram": 7.5,
        "min": 139.49,
        "max": 162.1,
        "so_vuot": 3,
        "so_gap_doi": 0,
        "ket_luan": "Không đạt (3 viên ngoài giới hạn)"
      }
    },
    {
      "ma_lo": "KT-IN-03",
      "khoi_luong_mg": [
        150.2,
        149.1,
        162.6,
        150.8,
        148.7,
        151.1,
        138.4,
        150.4,
        149.6,
        151.9,
        150.0,
        149.9,
        149.3,
        150.6,
        148.9,
        151.4,
        150.2,
        149.7,
        150.8,
        149.5
      ],
      "ket_qua_dung": {
        "KLTB": 150.16,
        "gioi_han_phan_tram": 7.5,
        "min": 138.89,
        "max": 161.42,
        "so_vuot": 2,
        "so_gap_doi": 0,
        "ket_luan": "Đạt (đúng 2 viên ngoài giới hạn, không viên nào gấp đôi)"
      }
    },
    {
      "ma_lo": "KT-IN-04",
      "khoi_luong_mg": [
        150.2,
        149.1,
        174.9,
        150.8,
        148.7,
        151.1,
        149.4,
        150.4,
        149.6,
        151.9,
        150.0,
        149.9,
        149.3,
        150.6,
        148.9,
        151.4,
        150.2,
        149.7,
        150.8,
        149.5
      ],
      "ket_qua_dung": {
        "KLTB": 151.32,
        "gioi_han_phan_tram": 7.5,
        "max_gap_doi": 174.02,
        "so_vuot": 1,
        "so_gap_doi": 1,
        "ket_luan": "Không đạt (1 viên vượt gấp đôi giới hạn)"
      }
    },
    {
      "ma_lo": "KT-IN-05-hoa-tan",
      "A_lan_1": [
        0.471,
        0.488,
        0.402,
        0.465,
        0.479,
        0.483
      ],
      "ket_qua_dung": {
        "phan_tram_lan_1": [
          86.51,
          89.63,
          73.84,
          85.41,
          87.98,
          88.71
        ],
        "so_duoi_70_lan_1": 0,
        "ket_luan": "Đạt ở lần thử đầu (73,84 % vẫn ≥ 70 %)"
      }
    },
    {
      "ma_lo": "KT-IN-06-hoa-tan",
      "A_lan_1": [
        0.458,
        0.433,
        0.369,
        0.451,
        0.469,
        0.438
      ],
      "A_lan_2": [
        0.443,
        0.429,
        0.457,
        0.417,
        0.456,
        0.44
      ],
      "ket_qua_dung": {
        "phan_tram_lan_1": [
          84.12,
          79.53,
          67.78,
          82.84,
          86.14,
          80.45
        ],
        "so_duoi_70_lan_1": 1,
        "quyet_dinh_lan_1": "Thử lặp lại với 6 đơn vị khác",
        "phan_tram_lan_2": [
          81.37,
          78.8,
          83.94,
          76.59,
          83.76,
          80.82
        ],
        "so_duoi_70_lan_2": 0,
        "ket_luan": "Đạt ở lần thử lặp lại"
      }
    },
    {
      "ma_lo": "KT-IN-07-hoa-tan",
      "A_lan_1": [
        0.394,
        0.371,
        0.408,
        0.364,
        0.391,
        0.404
      ],
      "ket_qua_dung": {
        "phan_tram_lan_1": [
          72.37,
          68.14,
          74.94,
          66.86,
          71.82,
          74.2
        ],
        "so_duoi_70_lan_1": 2,
        "ket_luan": "Không đạt (2 đơn vị < 70 % ở lần đầu, không được thử lặp lại)"
      }
    },
    {
      "ma_lo": "KT-IN-08-hoa-tan",
      "A_lan_1": [
        0.425,
        0.377,
        0.438,
        0.423,
        0.447,
        0.432
      ],
      "A_lan_2": [
        0.415,
        0.407,
        0.379,
        0.435,
        0.442,
        0.422
      ],
      "ket_qua_dung": {
        "phan_tram_lan_1": [
          78.06,
          69.24,
          80.45,
          77.69,
          82.1,
          79.35
        ],
        "so_duoi_70_lan_1": 1,
        "quyet_dinh_lan_1": "Thử lặp lại với 6 đơn vị khác",
        "phan_tram_lan_2": [
          76.22,
          74.76,
          69.61,
          79.9,
          81.18,
          77.51
        ],
        "so_duoi_70_lan_2": 1,
        "ket_luan": "Không đạt (lần lặp lại có 1 đơn vị < 70 %; không được thử lại)"
      }
    }
  ],
  "ghi_chu_bien_the": "Chế phẩm dùng trong bài: viên nén indomethacin 25 mg (chỉ có một loại)."
});
