/* CHUYÊN LUẬN: Thuốc tiêm Pyridoxin hydroclorid (vitamin B6) 100 mg/1 ml
   Hồ sơ id "B6" – mã lô dạng B6-XXXXXX. Chặng 3 dùng kiểu "B6_dinh_luong_A1pct" (js/kieu/).
   Nội dung chuyên môn trích DĐVN V; số liệu mẫu là giả định. */
PKN.themChuyenLuan({
  "id": "B6",
  "tien_to_ma_lo": "B6",
  "ten_mau": "Thuốc tiêm Pyridoxin hydroclorid (vitamin B6)",
  "dang_bao_che": "Thuốc tiêm (dung dịch), ống 1 ml",
  "bien_the": [
    {
      "ma": "B6-100",
      "nhan": "Pyridoxin hydroclorid 100 mg/1 ml",
      "ham_luong_mg_ml": 100
    }
  ],
  "ghi_chu_bien_the": "Chế phẩm dùng trong bài: thuốc tiêm Pyridoxin hydroclorid 100 mg/1 ml (chỉ có một hàm lượng).",
  "chi_tieu_buoi_thuc_tap": [
    "Định tính A (phổ UV)",
    "Định tính C (sắt (III) clorid)",
    "Định lượng (đo quang, A (1 %, 1 cm))"
  ],
  "yeu_cau": {
    "ham_luong_min": 95.0,
    "ham_luong_max": 110.0,
    "dinh_tinh_A_lambda": 290,
    "dung_sai_lambda_nm": 2,
    "A1pct": 430
  },
  "chang_1_tiep_nhan": [
    {
      "id": "B6-T1",
      "loai": "chon_mot",
      "hoi": "Tiêu chuẩn áp dụng để kiểm nghiệm mẫu này là chuyên luận nào trong DĐVN V?",
      "lua_chon": [
        "Thuốc tiêm Pyridoxin hydroclorid",
        "Pyridoxin hydroclorid (nguyên liệu)",
        "Thuốc tiêm, thuốc tiêm truyền (Phụ lục 1.19) là đủ",
        "Viên nén Pyridoxin hydroclorid"
      ],
      "dap_an": 0,
      "giai_thich": "Mẫu là thành phẩm nên tra chuyên luận của chế phẩm. Chuyên luận này dẫn tiếp đến yêu cầu chung của Phụ lục 1.19. Chuyên luận nguyên liệu dùng cho hoạt chất, có giới hạn khác.",
      "nguon": "DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814"
    },
    {
      "id": "B6-T2",
      "loai": "chon_mot",
      "hoi": "Giới hạn hàm lượng pyridoxin hydroclorid trong thuốc tiêm theo chuyên luận là bao nhiêu so với lượng ghi trên nhãn?",
      "lua_chon": [
        "95,0 % đến 110,0 %",
        "90,0 % đến 110,0 %",
        "95,0 % đến 105,0 %",
        "98,0 % đến 101,0 %"
      ],
      "dap_an": 0,
      "giai_thich": "Chuyên luận ghi: hàm lượng C8H11NO3.HCl từ 95,0 % đến 110,0 % so với lượng ghi trên nhãn.",
      "nguon": "DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814 (tr. 813)"
    },
    {
      "id": "B6-T3",
      "loai": "chon_mot",
      "hoi": "Chế phẩm ngoài việc đáp ứng những yêu cầu riêng của chuyên luận Thuốc tiêm Pyridoxin hydroclorid thì cần đáp ứng thêm các yêu cầu ở phụ lục nào?",
      "lua_chon": [
        "Phụ lục 1.19 – Thuốc tiêm, thuốc tiêm truyền",
        "Phụ lục 1.20 – Thuốc viên nén",
        "Phụ lục 11.3 – Độ đồng đều khối lượng",
        "Phụ lục 4.1 – Quang phổ UV-Vis"
      ],
      "dap_an": 0,
      "giai_thich": "Câu mở đầu chuyên luận: chế phẩm phải đáp ứng các yêu cầu trong chuyên luận \"Thuốc tiêm, thuốc tiêm truyền\" (Phụ lục 1.19).",
      "nguon": "DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814"
    },
    {
      "id": "B6-T4",
      "loai": "chon_mot",
      "hoi": "Thuốc tiêm vitamin B6 100 mg/ml có phải thử đồng đều hàm lượng không?",
      "lua_chon": [
        "Không, vì Phụ lục 1.19 ghi yêu cầu này không áp dụng với thuốc tiêm chứa các vitamin và nguyên tố vi lượng",
        "Có, mọi thuốc tiêm đơn liều đều phải thử",
        "Có, vì hàm lượng dưới 2 %",
        "Không, vì đã thử định lượng"
      ],
      "dap_an": 0,
      "giai_thich": "Phụ lục 1.19: độ đồng đều hàm lượng chỉ áp dụng cho thuốc tiêm hỗn dịch đóng liều đơn hàm lượng nhỏ; \"Yêu cầu này không áp dụng với thuốc tiêm chứa các vitamin và nguyên tố vi lượng.\"",
      "nguon": "DĐVN V, Phụ lục 1.19, PL-26 đến PL-28"
    },
    {
      "id": "B6-T5",
      "loai": "nhap_khoang",
      "hoi": "Định tính A: phổ hấp thụ phải có cực đại ở khoảng 290 nm. Theo Phụ lục 4.1, cực đại đo được nằm trong khoảng nào thì chấp nhận? (nhập bước sóng nhỏ nhất và lớn nhất, nm)",
      "dap_an_min": 288,
      "dap_an_max": 292,
      "giai_thich": "Phụ lục 4.1: khi so vị trí cực đại hấp thụ, trị số khảo sát được có thể lệch không quá ± 2 nm → 288–292 nm.",
      "nguon": "DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814; DĐVN V, Phụ lục 4.1, PL-120"
    },
    {
      "id": "B6-T6",
      "loai": "chon_mot",
      "hoi": "Chuyên luận quy định phải trộn bao nhiêu ống để định lượng?",
      "lua_chon": [
        "5 ống, theo số đơn vị lấy ở Phụ lục 11.1 cho chế phẩm có thể tích 1 ml",
        "20 ống, theo Phụ lục 11.3",
        "10 ống, theo Phụ lục 1.19",
        "3 ống, theo chuyên luận"
      ],
      "dap_an": 0,
      "giai_thich": "Số đơn vị lấy dựa theo Phụ lục 11.1 – Giới hạn cho phép về thể tích của các thuốc dạng lỏng: \"Thuốc tiêm có thể tích nhỏ hơn hoặc bằng 3 ml: Lấy 5 đơn vị chế phẩm để thử.\" Chế phẩm có thể tích 1 ml nên lấy 5 đơn vị.",
      "nguon": "DĐVN V, Phụ lục 11.1, PL-248"
    },
    {
      "id": "B6-T7",
      "loai": "nhap_so",
      "hoi": "Nếu thử chỉ tiêu Giới hạn cho phép về thể tích (Phụ lục 11.1) cho ống 1 ml thì phải lấy bao nhiêu đơn vị? (chỉ tiêu này không làm trong buổi thực tập)",
      "dap_an": 5,
      "dung_sai_tuyet_doi": 0,
      "don_vi": "ống",
      "giai_thich": "Phụ lục 11.1: thể tích ≤ 3 ml lấy 5 đơn vị; ống ≤ 2 ml được gộp nhiều ống để đo.",
      "nguon": "DĐVN V, Phụ lục 11.1, PL-248"
    },
    {
      "id": "B6-T8",
      "loai": "chon_mot",
      "hoi": "Trong quy trình định lượng ghi \"pha loãng … thành 500,0 ml\" và \"Lấy 5,0 ml\". Dụng cụ đúng là gì?",
      "lua_chon": [
        "Bình định mức 500 ml và pipet có bầu 5 ml",
        "Ống đong 500 ml và pipet chia vạch 5 ml",
        "Cốc có mỏ 500 ml và pipet Pasteur",
        "Bình định mức 500 ml và ống đong 5 ml"
      ],
      "dap_an": 0,
      "giai_thich": "Qui định chung: thể tích ghi có chữ số 0 sau dấu phẩy phải đo chính xác bằng pipet có bầu (Qui định chung gọi là pipet chính xác), bình định mức hay buret chuẩn.",
      "nguon": "DĐVN V, Qui định chung"
    }
  ],
  "chang_2_hoa_chat": [
    {
      "id": "B6-H1",
      "ten_trong_chuyen_luan": "dung dịch acid hydrocloric 0,1 M (TT)",
      "dung_o": "Định lượng (pha loãng) và mẫu trắng",
      "tra_o": {
        "lua_chon": [
          "Phụ lục 2.1.1 – Hóa chất và thuốc thử",
          "Phụ lục 2.2 – Dung dịch chuẩn độ",
          "Phụ lục 2.3 – Dung dịch đệm",
          "Phụ lục 2.5 – Chất đối chiếu"
        ],
        "dap_an": 0,
        "giai_thich": "Tên có ký hiệu (TT) → tra Phụ lục 2.1 (Qui định chung mục 28). Mục \"Dung dịch acid hydrocloric 0,1 N\" ở Phụ lục 2.2 là dung dịch chuẩn độ, phải chuẩn hóa xác định K – không phải thứ chuyên luận yêu cầu."
      },
      "cach_pha": {
        "lua_chon": [
          "Dung dịch acid hydrocloric xM: pha loãng 85x ml acid hydrocloric (TT) với nước vừa đủ 1000 ml",
          "Pha loãng 2,4 ml acid hydrocloric (TT) với nước vừa đủ 100 ml",
          "Pha loãng 17 ml acid hydrocloric (TT) với nước vừa đủ 100 ml",
          "Lấy 8,5 ml acid hydrocloric đậm đặc pha loãng với nước vừa đủ 1000 ml, rồi chuẩn hóa bằng natri carbonat"
        ],
        "dap_an": 0,
        "giai_thich": "Dùng công thức chung \"xM\" với x = 0,1 → 8,5 ml acid đặc/1000 ml. Phương án 2 là HCl 1 %, phương án 3 là HCl loãng, phương án 4 là dung dịch chuẩn độ 0,1 N (CĐ).",
        "nguon": "DĐVN V, Phụ lục 2.1.1, mục Acid hydrocloric, PL-40; Phụ lục 2.2, PL-96"
      },
      "tinh_toan": {
        "hoi": "Cần pha {V} ml dung dịch acid hydrocloric 0,1 M. Lấy bao nhiêu ml acid hydrocloric (TT) đậm đặc?",
        "bien_V": [
          1000,
          1500,
          2000
        ],
        "dap_an_theo_V": {
          "1000": 8.5,
          "1500": 12.75,
          "2000": 17.0
        },
        "dung_sai_tuong_doi": 0.02,
        "don_vi": "ml",
        "loi_giai": "85 × 0,1 = 8,5 ml cho 1000 ml → tỷ lệ theo thể tích cần pha. Acid hydrocloric (TT): 35–38 % (kl/kl), khoảng 11,5 M, tỷ trọng khoảng 1,18 (PL-40). Rót acid vào nước trong tủ hút."
      },
      "ghi_chu": "Mỗi lần định lượng dùng 500 ml + 100 ml, làm 3 lần, cộng mẫu trắng và tráng dụng cụ → nên pha khoảng 2000 ml."
    },
    {
      "id": "B6-H2",
      "ten_trong_chuyen_luan": "dung dịch sắt (III) clorid 5 % (TT)",
      "dung_o": "Định tính C",
      "tra_o": {
        "lua_chon": [
          "Phụ lục 2.1.1 – Hóa chất và thuốc thử",
          "Phụ lục 2.2 – Dung dịch chuẩn độ",
          "Phụ lục 2.3 – Dung dịch đệm",
          "Phụ lục 2.4 – Dung dịch mẫu"
        ],
        "dap_an": 0,
        "giai_thich": "Ký hiệu (TT) → Phụ lục 2.1.1, mục xếp theo tên hóa chất gốc \"Sắt (III) clorid\" (PL-80)."
      },
      "cach_pha": {
        "lua_chon": [
          "Hòa tan 5 g sắt (III) clorid (TT) – tức FeCl3.6H2O – trong nước vừa đủ 100 ml",
          "Hòa tan 5 g FeCl3 khan trong nước vừa đủ 100 ml",
          "Hòa tan 5 g sắt (III) clorid trong 100 ml nước",
          "Pha loãng dung dịch sắt (III) clorid 20 % bốn lần bằng ethanol"
        ],
        "dap_an": 0,
        "giai_thich": "Sắt (III) clorid (TT) là FeCl3.6H2O (M = 270,30). Cân đúng dạng ngậm 6 nước; \"vừa đủ 100 ml\" khác với \"trong 100 ml nước\".",
        "nguon": "DĐVN V, Phụ lục 2.1.1, mục Sắt (III) clorid, PL-80"
      },
      "tinh_toan": {
        "hoi": "Cần pha {V} ml dung dịch sắt (III) clorid 5 %. Cân bao nhiêu gam sắt (III) clorid (TT)?",
        "bien_V": [
          20,
          25,
          50
        ],
        "dap_an_theo_V": {
          "20": 1.0,
          "25": 1.25,
          "50": 2.5
        },
        "dung_sai_tuong_doi": 0.02,
        "don_vi": "g",
        "loi_giai": "5 g/100 ml → tỷ lệ theo thể tích. Chất dễ chảy nước: cân nhanh, đậy nắp ngay. Dung dịch để lâu bị thủy phân, đục nâu thì pha lại."
      }
    },
    {
      "id": "B6-H3",
      "ten_trong_chuyen_luan": "dung dịch acid sulfuric 10 % (TT)",
      "dung_o": "Định tính C",
      "tra_o": {
        "lua_chon": [
          "Phụ lục 2.1.1 – Hóa chất và thuốc thử",
          "Phụ lục 2.2 – Dung dịch chuẩn độ",
          "Phụ lục 2.3 – Dung dịch đệm",
          "Phụ lục 2.5 – Chất đối chiếu"
        ],
        "dap_an": 0,
        "giai_thich": "Ký hiệu (TT) → Phụ lục 2.1.1, mục Acid sulfuric (PL-43, PL-44)."
      },
      "cach_pha": {
        "lua_chon": [
          "Cho từ từ 6 ml acid sulfuric (TT) vào 50 ml nước, lắc liên tục. Làm nguội, thêm nước vừa đủ 100 ml",
          "Cho 10 ml acid sulfuric (TT) vào 90 ml nước",
          "Cho 50 ml nước vào 6 ml acid sulfuric (TT), thêm nước vừa đủ 100 ml",
          "Cho cẩn thận 54 ml acid sulfuric (TT) vào đồng thể tích nước, thêm nước vừa đủ 1000 ml"
        ],
        "dap_an": 0,
        "giai_thich": "Đúng nguyên văn PL-44. Phương án 3 sai thứ tự (rót nước vào acid – nguy hiểm). Phương án 4 là dung dịch acid sulfuric 1 M (công thức xM).",
        "nguon": "DĐVN V, Phụ lục 2.1.1, mục Acid sulfuric, PL-44"
      },
      "tinh_toan": {
        "hoi": "Cần pha {V} ml dung dịch acid sulfuric 10 %. Lấy bao nhiêu ml acid sulfuric (TT)?",
        "bien_V": [
          20,
          50,
          100
        ],
        "dap_an_theo_V": {
          "20": 1.2,
          "50": 3.0,
          "100": 6.0
        },
        "dung_sai_tuong_doi": 0.02,
        "don_vi": "ml",
        "loi_giai": "6 ml/100 ml → tỷ lệ theo thể tích. Acid sulfuric (TT) khoảng 96 % (kl/kl), khối lượng riêng khoảng 1,84 g/ml (PL-43). Luôn rót acid vào nước, làm nguội rồi mới thêm nước tới vạch."
      }
    }
  ],
  "chang_3_thuc_nghiem": {
    "kieu": "B6_dinh_luong_A1pct",
    "tinh_V_lay": {
      "hoi": "Chuyên luận yêu cầu lấy chính xác một thể tích chế phẩm tương ứng khoảng 0,1 g pyridoxin hydroclorid. Với chế phẩm {nhan}, lấy bao nhiêu ml?",
      "khoi_luong_tuong_ung_mg": 100,
      "dung_sai_tuong_doi": 0.01,
      "don_vi": "ml",
      "loi_giai": "V = 100 mg ÷ 100 mg/ml = 1,0 ml. Lấy bằng pipet có bầu vì là phép định lượng."
    },
    "tinh_V_dinh_tinh": {
      "hoi": "Dung dịch A (định tính): lấy một thể tích chế phẩm tương ứng khoảng 100 mg pyridoxin hydroclorid, pha loãng với nước thành 100 ml. Lấy bao nhiêu ml chế phẩm?",
      "khoi_luong_tuong_ung_mg": 100,
      "dung_sai_tuong_doi": 0.05,
      "don_vi": "ml"
    },
    "quy_trinh_hien_thi": [
      "Lấy chính xác 1,0 ml chế phẩm bằng pipet có bầu (từ cốc đã trộn 5 ống – quy định bộ môn), pha loãng với dung dịch acid hydrocloric 0,1 M (TT) thành 500,0 ml, lắc đều.",
      "Lấy 5,0 ml dung dịch trên bằng pipet có bầu, pha loãng với dung dịch acid hydrocloric 0,1 M (TT) thành 100,0 ml, lắc đều.",
      "Đo độ hấp thụ ở cực đại khoảng 290 nm, cốc đo dày 1 cm, mẫu trắng là dung dịch acid hydrocloric 0,1 M (TT).",
      "Làm 3 lần (3 lần pha độc lập), báo cáo đủ 3 giá trị – quy định bộ môn."
    ],
    "cong_thuc": {
      "C_do_g_100ml": "A ÷ 430",
      "khoi_luong_trong_V_g": "(A ÷ 430) × (500 ÷ 5)",
      "ham_luong_mg_ml": "(A ÷ 430) × 100 × 1000 ÷ V",
      "phan_tram_nhan": "ham_luong_mg_ml ÷ nhãn × 100",
      "RSD": "SD (chia n − 1) ÷ trung bình × 100"
    },
    "dinh_tinh_C_quan_sat": {
      "dat": "Thêm 2 giọt dung dịch sắt (III) clorid 5 % vào 1 ml dung dịch A: xuất hiện màu đỏ. Thêm từng giọt dung dịch acid sulfuric 10 %: màu đỏ phai dần.",
      "khong_dat": "Thêm 2 giọt dung dịch sắt (III) clorid 5 % vào 1 ml dung dịch A: dung dịch có màu vàng nhạt của thuốc thử, không xuất hiện màu đỏ."
    },
    "sinh_so_lieu": {
      "kich_ban": [
        {
          "ma": "dat",
          "trong_so": 0.45,
          "phan_tram_that_min": 97.0,
          "phan_tram_that_max": 107.0,
          "lambda_min": 289,
          "lambda_max": 291,
          "dinh_tinh_C": "dat"
        },
        {
          "ma": "ham_luong_thap",
          "trong_so": 0.15,
          "phan_tram_that_min": 88.0,
          "phan_tram_that_max": 93.5,
          "lambda_min": 289,
          "lambda_max": 291,
          "dinh_tinh_C": "dat"
        },
        {
          "ma": "ham_luong_cao",
          "trong_so": 0.1,
          "phan_tram_that_min": 111.5,
          "phan_tram_that_max": 116.0,
          "lambda_min": 289,
          "lambda_max": 291,
          "dinh_tinh_C": "dat"
        },
        {
          "ma": "dinh_tinh_khong_dat",
          "trong_so": 0.1,
          "phan_tram_that_min": 97.0,
          "phan_tram_that_max": 105.0,
          "lambda_min": 295,
          "lambda_max": 297,
          "dinh_tinh_C": "khong_dat"
        },
        {
          "ma": "sat_bien",
          "trong_so": 0.2,
          "phan_tram_that_min": 93.8,
          "phan_tram_that_max": 96.2,
          "lambda_min": 289,
          "lambda_max": 291,
          "dinh_tinh_C": "dat",
          "ghi_chu": "3 giá trị quanh 95 %, RSD nhỏ; kết luận theo trung bình. Sinh lại nếu |trung bình − 95,0| < 0,1."
        }
      ],
      "nhieu_A_tuong_doi_SD": 0.004,
      "lam_tron_A": 3,
      "lam_tron_lambda": 1
    },
    "dung_sai_cham": {
      "ham_luong_mg_ml_tuong_doi": 0.005,
      "phan_tram_nhan_tuyet_doi": 0.3,
      "RSD_tuyet_doi": 0.05
    },
    "cong_thuc_tex": [
      {
        "ten": "Hàm lượng mỗi lần (mg/ml)",
        "tex": "C_i = \\frac{A_i}{430}\\times\\frac{500}{5}\\times\\frac{1000}{V}"
      },
      {
        "ten": "Phần trăm so với nhãn",
        "tex": "\\%_i = \\frac{C_i}{C_{\\text{nhãn}}}\\times 100"
      },
      {
        "ten": "Trung bình",
        "tex": "\\bar{x} = \\frac{\\%_1+\\%_2+\\%_3}{3}"
      },
      {
        "ten": "Độ lệch chuẩn (n = 3)",
        "tex": "SD = \\sqrt{\\frac{\\sum_{i=1}^{n}\\left(\\%_i-\\bar{x}\\right)^2}{n-1}}"
      },
      {
        "ten": "Độ lệch chuẩn tương đối",
        "tex": "RSD\\,(\\%) = \\frac{SD}{\\bar{x}}\\times 100"
      }
    ],
    "ket_luan_dinh_luong": "Kết luận chỉ tiêu Định lượng theo trung bình 3 lần (giá trị chưa làm tròn so với 95,0 và 110,0); báo cáo đủ 3 giá trị."
  },
  "chang_4_the_loi": [
    {
      "id": "B6-L1",
      "bai_lam": "Bạn A dùng nước cất thay cho dung dịch acid hydrocloric 0,1 M để pha loãng mẫu và làm mẫu trắng, vẫn tính với A (1 %, 1 cm) = 430.",
      "lua_chon": [
        "Sai, giá trị 430 chỉ đúng trong dung dịch acid hydrocloric 0,1 M",
        "Đúng, vì pyridoxin hydroclorid dễ tan trong nước",
        "Sai, nhưng chỉ sai ở mẫu trắng, còn pha loãng bằng nước được",
        "Đúng, nếu đo ở đúng 290 nm"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814",
      "loai": "chon_mot"
    },
    {
      "id": "B6-L3",
      "bai_lam": "Bạn C lấy 1 ml chế phẩm bằng pipet chia vạch 5 ml để định lượng.",
      "lua_chon": [
        "Sai, thể tích dùng cho định lượng phải lấy chính xác bằng pipet có bầu",
        "Đúng, chấp nhận được vì sau đó pha loãng tới 500,0 ml",
        "Đúng, vì chuyên luận ghi \"khoảng 0,1 g\"",
        "Đúng, nếu lấy 2 lần rồi tính trung bình"
      ],
      "dap_an": 0,
      "nguon": "DĐVN V, Qui định chung; DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814",
      "loai": "chon_mot"
    },
    {
      "id": "B6-L4",
      "bai_lam": "Ba lần định lượng cho 92,6 %; 93,3 %; 92,1 % (RSD 0,64 %). Bạn D làm thêm lần thứ tư được 96,0 % rồi chỉ báo cáo lần thứ tư.",
      "nguon": "Thực hành tốt phòng thí nghiệm (không thuộc DĐVN)",
      "loai": "tra_loi_ngan",
      "hoi": "Bạn nhận xét gì về cách làm hoặc kết luận này? Trả lời ngắn gọn.",
      "tham_khao_gv": "Sai: không được chọn kết quả; báo cáo đủ các lần đo và điều tra nguyên nhân trước khi kết luận"
    },
    {
      "id": "B6-L5",
      "bai_lam": "Lô có định lượng 101,2 % (đạt) nhưng phổ có cực đại ở 296 nm (định tính A không đúng). Bạn H kết luận chung: \"Mẫu đạt yêu cầu vì hàm lượng nằm trong giới hạn\".",
      "lua_chon": [
        "Sai, chỉ cần một chỉ tiêu không đạt thì kết luận chung là không đạt yêu cầu kiểm tra chất lượng",
        "Đúng, vì định lượng quan trọng hơn định tính",
        "Đúng, nếu định tính C vẫn đúng",
        "Sai, nên kết luận \"đạt một phần\""
      ],
      "dap_an": 0,
      "nguon": "Nguyên tắc kết luận phiếu kiểm nghiệm (quy định bộ môn)",
      "loai": "chon_mot"
    },
    {
      "id": "B6-L6",
      "bai_lam": "Ba lần định lượng cho 99,8 %; 100,4 %; 110,9 %. Bạn M bỏ lần thứ ba vì \"lệch\", báo cáo trung bình 2 lần còn lại là 100,1 % và RSD 0,42 %.",
      "nguon": "Quy định bộ môn; nguyên tắc trung thực trong kiểm nghiệm",
      "loai": "tra_loi_ngan",
      "hoi": "Bạn nhận xét gì về cách làm hoặc kết luận này? Trả lời ngắn gọn.",
      "tham_khao_gv": "Sai: chưa xác định được nguyên nhân thì không được bỏ kết quả. Phải báo cáo đủ 3 giá trị, kết luận theo trung bình 3 lần (103,7 %), ghi nhận độ lặp lại kém (RSD 6,02 %) và xem lại thao tác để tìm nguyên nhân"
    },
    {
      "id": "B6-L7",
      "bai_lam": "Ba lần định lượng cho 94,2 %; 95,6 %; 96,1 % (trung bình 95,3 %; RSD 1,03 %). Bạn N kết luận chỉ tiêu Định lượng \"Không đạt\" vì lần 1 thấp hơn 95,0 %.",
      "nguon": "Quy định bộ môn; DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814",
      "loai": "tra_loi_ngan",
      "hoi": "Bạn nhận xét gì về cách làm hoặc kết luận này? Trả lời ngắn gọn.",
      "tham_khao_gv": "Sai: kết luận theo trung bình 3 lần; 95,3 % nằm trong 95,0–110,0 % nên Đạt. Vẫn ghi đủ 3 giá trị trong báo cáo"
    },
    {
      "id": "B6-L8",
      "bai_lam": "Ba lần định lượng cho 92,5 %; 92,9 %; 92,2 % (RSD 0,38 %). Bạn P kết luận \"Đạt\" vì RSD rất nhỏ chứng tỏ kết quả chính xác.",
      "nguon": "Quy định bộ môn; nguyên tắc trung thực trong kiểm nghiệm",
      "loai": "tra_loi_ngan",
      "hoi": "Bạn nhận xét gì về cách làm hoặc kết luận này? Trả lời ngắn gọn.",
      "tham_khao_gv": "Sai: RSD chỉ phản ánh độ lặp lại (độ chụm) giữa các lần làm, không phản ánh độ đúng. Trung bình 92,5 % thấp hơn 95,0 % → Không đạt"
    },
    {
      "id": "B6-L9",
      "bai_lam": "Ba lần định lượng cho 99,8 %; 100,4 %; 110,9 % (trung bình 103,7 %; RSD 6,02 %). Bạn Q kết luận chỉ tiêu Định lượng \"Không đạt\" vì RSD lớn.",
      "nguon": "Quy định bộ môn; nguyên tắc trung thực trong kiểm nghiệm",
      "loai": "tra_loi_ngan",
      "hoi": "Bạn nhận xét gì về cách làm hoặc kết luận này? Trả lời ngắn gọn.",
      "tham_khao_gv": "Sai: chuyên luận không dùng RSD làm tiêu chí chất lượng mẫu. Kết luận theo trung bình 3 lần (103,7 % → Đạt), báo cáo đủ 3 giá trị, ghi nhận độ lặp lại kém và xem lại thao tác để tìm nguyên nhân"
    },
    {
      "id": "B6-L11",
      "bai_lam": "Ba lần định lượng cho 100,6 %; 99,9 %; 91,8 %. Trong sổ ghi chép, bạn R đã ghi ngay lúc làm: \"Lần 3: làm đổ một ít dung dịch khi chuyển vào bình định mức 500 ml\". Xử lý thế nào?",
      "nguon": "Quy định bộ môn; nguyên tắc trung thực trong kiểm nghiệm",
      "loai": "tra_loi_ngan",
      "hoi": "Bạn nhận xét gì về cách làm hoặc kết luận này? Trả lời ngắn gọn.",
      "tham_khao_gv": "Đã xác định được nguyên nhân (sai sót thao tác được ghi lại ngay lúc làm) nên được loại lần 3, ghi rõ lý do trong báo cáo và làm lại một lần đo khác"
    }
  ],
  "lo_kiem_thu": [
    {
      "ma_lo": "KT-B6-01",
      "bien_the": "B6-100",
      "V_lay_ml": 1.0,
      "lambda_max": 290.2,
      "dinh_tinh_C": "dat",
      "A": [
        0.431,
        0.428,
        0.434
      ],
      "ket_qua_dung": {
        "ham_luong_mg_ml": [
          100.23,
          99.53,
          100.93
        ],
        "phan_tram_nhan": [
          100.23,
          99.53,
          100.93
        ],
        "trung_binh": 100.23,
        "SD": 0.698,
        "RSD": 0.7,
        "ket_luan": "Đạt"
      }
    },
    {
      "ma_lo": "KT-B6-02",
      "bien_the": "B6-100",
      "V_lay_ml": 1.0,
      "lambda_max": 289.8,
      "dinh_tinh_C": "dat",
      "A": [
        0.398,
        0.401,
        0.396
      ],
      "ket_qua_dung": {
        "ham_luong_mg_ml": [
          92.56,
          93.26,
          92.09
        ],
        "phan_tram_nhan": [
          92.56,
          93.26,
          92.09
        ],
        "trung_binh": 92.64,
        "SD": 0.585,
        "RSD": 0.63,
        "ket_luan": "Không đạt (trung bình thấp hơn 95,0 %)"
      }
    },
    {
      "ma_lo": "KT-B6-03",
      "bien_the": "B6-100",
      "V_lay_ml": 1.0,
      "lambda_max": 290.4,
      "dinh_tinh_C": "dat",
      "A": [
        0.409,
        0.411,
        0.407
      ],
      "ket_qua_dung": {
        "ham_luong_mg_ml": [
          95.12,
          95.58,
          94.65
        ],
        "phan_tram_nhan": [
          95.12,
          95.58,
          94.65
        ],
        "trung_binh": 95.12,
        "SD": 0.465,
        "RSD": 0.49,
        "ket_luan": "Đạt (sát biên: trung bình ≥ 95,0 % dù lần 3 là 94,65 %)"
      }
    },
    {
      "ma_lo": "KT-B6-04",
      "bien_the": "B6-100",
      "V_lay_ml": 1.0,
      "lambda_max": 289.6,
      "dinh_tinh_C": "dat",
      "A": [
        0.428,
        0.433,
        0.457
      ],
      "ket_qua_dung": {
        "ham_luong_mg_ml": [
          99.53,
          100.7,
          106.28
        ],
        "phan_tram_nhan": [
          99.53,
          100.7,
          106.28
        ],
        "trung_binh": 102.17,
        "SD": 3.605,
        "RSD": 3.53,
        "ket_luan": "Đạt"
      }
    },
    {
      "ma_lo": "KT-B6-05",
      "bien_the": "B6-100",
      "V_lay_ml": 1.0,
      "lambda_max": 290.1,
      "dinh_tinh_C": "dat",
      "A": [
        0.431,
        0.427,
        0.478
      ],
      "ket_qua_dung": {
        "ham_luong_mg_ml": [
          100.23,
          99.3,
          111.16
        ],
        "phan_tram_nhan": [
          100.23,
          99.3,
          111.16
        ],
        "trung_binh": 103.57,
        "SD": 6.596,
        "RSD": 6.37,
        "ket_luan": "Đạt (theo trung bình 3 lần)"
      }
    }
  ],
  "the_loi_so_cau": {
    "chon_mot": 3,
    "tra_loi_ngan": 1
  }
});
