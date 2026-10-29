/* DỮ LIỆU CHUNG cho mọi chuyên luận: thông tin sinh viên, trích Qui định chung DĐVN V, mẫu phiếu kiểm nghiệm.
   Phiên bản nội dung: 2026-10-27c. Sửa nội dung chuyên môn ở đây sẽ áp dụng cho mọi hồ sơ. */
PKN.dangKyDuLieuChung({
  "phien_ban": "2026-10-27c",
  "ten_app": "Phòng kiểm nghiệm ảo – Thực tập Kiểm nghiệm Dược phẩm",
  "bai": "Kiểm nghiệm thuốc tiêm vitamin B6 và viên nén Indomethacin 25 mg",
  "lop_ap_dung": [
    "A0 – Bài 2",
    "MQ – Bài 5",
    "NOP – Bài 3"
  ],
  "tai_lieu_goc": "Dược điển Việt Nam V (DĐVN V). Số trang ghi theo trang in trong sách; trang Phụ lục ghi dạng PL-xx.",
  "thong_tin_sinh_vien": {
    "ghi_chu": "Tiêu đề khối hiển thị là \"Thông tin kiểm nghiệm viên\". Bắt buộc nhập đủ 4 trường trước khi nhận mẫu.",
    "truong": [
      {
        "id": "ho_ten",
        "nhan": "Họ tên",
        "kieu": "text",
        "bat_buoc": true
      },
      {
        "id": "lop",
        "nhan": "Lớp",
        "kieu": "text",
        "bat_buoc": true
      },
      {
        "id": "to",
        "nhan": "Tổ",
        "kieu": "chon",
        "lua_chon": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12
        ],
        "bat_buoc": true
      },
      {
        "id": "ma_sv",
        "nhan": "Mã sinh viên",
        "kieu": "text",
        "bat_buoc": true
      }
    ],
    "tieu_de": "Thông tin kiểm nghiệm viên"
  },
  "quy_dinh_chung_trich": [
    {
      "id": "QDC-chinh-xac",
      "noi_dung": "Thể tích ghi có chữ số 0 hoặc tận cùng bằng 0 sau dấu phẩy (ví dụ 10,0 ml hoặc 0,50 ml) phải đong, đo chính xác bằng pipet có bầu (Qui định chung gọi là pipet chính xác), bình định mức hay buret chuẩn.",
      "nguon": "DĐVN V, Qui định chung"
    },
    {
      "id": "QDC-can-chinh-xac",
      "noi_dung": "Cân chính xác: sai số của phép cân không quá 0,1 %. Cân khoảng: lượng cân không lệch quá ± 10 % so với lượng ghi.",
      "nguon": "DĐVN V, Qui định chung"
    },
    {
      "id": "QDC-phan-tram",
      "noi_dung": "Nồng độ % không chú thích là % (kl/tt).",
      "nguon": "DĐVN V, Qui định chung"
    },
    {
      "id": "QDC-28",
      "noi_dung": "Tên thuốc thử, dung dịch đệm có chữ (TT) thì tra ở Phụ lục 2.1 (thuốc thử), 2.3 (đệm), 2.4 (dung dịch mẫu); có chữ (CĐ) thì tra ở Phụ lục 2.2 (dung dịch chuẩn độ).",
      "nguon": "DĐVN V, Qui định chung mục 28, tr. xlviii"
    }
  ],
  "phieu_kiem_nghiem_mau": {
    "nguon": "Mẫu phiếu kiểm nghiệm trong giáo trình của bộ môn (tr. 33)",
    "ghi_chu": "Mỗi mẫu một phiếu. Trong học phần thực tập chỉ ghi các chỉ tiêu đã thực hành, không ghi đủ mọi chỉ tiêu của chuyên luận.",
    "tieu_de_trai": [
      "TRƯỜNG ĐẠI HỌC DƯỢC HÀ NỘI",
      "Khoa Hóa phân tích & Kiểm nghiệm thuốc",
      "13-15 Lê Thánh Tông, Cửa Nam, Hà Nội"
    ],
    "tieu_de_phai": [
      "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
      "Độc lập - Tự do - Hạnh phúc"
    ],
    "mac_dinh": {
      "nguoi_noi_gui_mau": "Bộ môn (mẫu thực tập)",
      "yeu_cau_kiem_nghiem": "Kiểm nghiệm các chỉ tiêu theo nội dung thực tập",
      "tinh_trang_mau": "Mẫu còn nguyên niêm phong, nhãn rõ ràng"
    },
    "ten_phieu": "PHIẾU KIỂM NGHIỆM",
    "dong_thong_tin": [
      {
        "nhan": "Mẫu kiểm nghiệm",
        "lay_tu": "ten_mau + nhãn biến thể"
      },
      {
        "nhan": "Nơi sản xuất",
        "lay_tu": "nơi sản xuất giả định của lô"
      },
      {
        "nhan": "Số lô, hạn dùng",
        "lay_tu": "số lô, HD của lô"
      },
      {
        "nhan": "Số đăng ký",
        "lay_tu": "số đăng ký giả định của lô"
      },
      {
        "nhan": "Người và nơi gửi mẫu",
        "lay_tu": "mac_dinh.nguoi_noi_gui_mau"
      },
      {
        "nhan": "Yêu cầu kiểm nghiệm (ghi rõ nội dung, số, ngày, tháng, năm của công văn hay giấy tờ kèm theo)",
        "lay_tu": "mac_dinh.yeu_cau_kiem_nghiem"
      },
      {
        "nhan": "Ngày tháng năm nhận mẫu",
        "lay_tu": "ngày nhận mẫu"
      },
      {
        "nhan": "Số đăng ký KN",
        "lay_tu": "mã lô ảo"
      },
      {
        "nhan": "Người nhận mẫu",
        "lay_tu": "Họ tên – Mã sinh viên (Lớp …, Tổ …) từ thong_tin_sinh_vien"
      },
      {
        "nhan": "Thử theo",
        "lay_tu": "cố định: Dược điển Việt Nam V"
      },
      {
        "nhan": "Tình trạng mẫu khi nhận và mở niêm phong để kiểm nghiệm",
        "lay_tu": "mac_dinh.tinh_trang_mau"
      }
    ],
    "bang": {
      "cot": [
        "STT",
        "Yêu cầu",
        "Kết quả"
      ],
      "dinh_dang_yeu_cau": "Tên chỉ tiêu: nội dung yêu cầu",
      "dinh_dang_ket_qua": "Định tính ghi \"Đúng\"/\"Không đúng\"; định lượng ghi \"Đạt (giá trị trung bình)\" hoặc \"Không đạt (giá trị trung bình)\"; chỉ tiêu khác ghi \"Đạt (giá trị)\" hoặc \"Không đạt (giá trị)\". Cột Yêu cầu có dấu chấm cuối câu."
    },
    "chi_tieu_theo_ho_so": {
      "B6": [
        {
          "ten": "Định tính",
          "yeu_cau": "Chế phẩm phải cho các phản ứng định tính A, C của pyridoxin hydroclorid (phổ hấp thụ tử ngoại có cực đại ở khoảng 290 nm; phản ứng với dung dịch sắt (III) clorid)",
          "ket_qua": "\"Đúng\" khi cả A và C đạt; ngược lại \"Không đúng\""
        },
        {
          "ten": "Định lượng",
          "yeu_cau": "Hàm lượng pyridoxin hydroclorid (C8H11NO3.HCl) từ 95,0 % đến 110,0 % so với lượng ghi trên nhãn (100 mg/ml)",
          "ket_qua": "\"Đạt (xx,x %)\" hoặc \"Không đạt (xx,x %)\" – giá trị trung bình các lần định lượng sinh viên tính"
        }
      ],
      "INDO": [
        {
          "ten": "Độ đồng đều khối lượng",
          "yeu_cau": "Khối lượng trung bình viên ± {gioi_han} %",
          "ket_qua": "\"Đạt\"/\"Không đạt\" (kèm KLTB sinh viên tính)"
        },
        {
          "ten": "Độ hòa tan",
          "yeu_cau": "Không ít hơn 70 % (Q) indomethacin (C19H16ClNO4) so với lượng ghi trên nhãn được hòa tan trong 45 phút",
          "ket_qua": "\"Đạt (xx,x – yy,y %)\" – khoảng % của lần thử dùng để kết luận"
        }
      ]
    },
    "quy_tac_ket_luan": "Chỉ cần MỘT chỉ tiêu không đạt (kể cả định tính \"Không đúng\") thì kết luận chung là KHÔNG ĐẠT yêu cầu kiểm tra chất lượng. Chỉ kết luận ĐẠT khi tất cả chỉ tiêu đã kiểm đều đạt. Không có kết luận \"đạt một phần\".",
    "ket_luan_mau": {
      "dat": "Mẫu thử này đạt yêu cầu kiểm tra chất lượng theo tiêu chuẩn Dược điển Việt Nam V về các chỉ tiêu đã kiểm nghiệm.",
      "khong_dat": "Mẫu thử này không đạt yêu cầu kiểm tra chất lượng theo tiêu chuẩn Dược điển Việt Nam V (chỉ tiêu không đạt: {danh_sach})."
    },
    "chan_phieu": [
      "Hà Nội, ngày … tháng … năm …",
      "Thủ trưởng cơ quan",
      "(Ký và đóng dấu)"
    ],
    "quy_tac_ket_luan_hien_thi": "Không hiện quy tắc này trước khi sinh viên nộp kết luận; chỉ dùng để chấm và hiện trong phần giải thích sau khi nộp.",
    "ket_luan_dien": {
      "cau": "Mẫu thử này {ket_qua} yêu cầu kiểm tra chất lượng theo tiêu chuẩn Dược điển Việt Nam V về {chi_tieu}.",
      "them_khong_dat": " Chỉ tiêu không đạt: {chi_tieu_khong_dat}.",
      "huong_dan": "Điền vào chỗ trống: kết quả (Đạt hoặc Không đạt), tên các chỉ tiêu đã kiểm nghiệm; nếu không đạt, ghi tên chỉ tiêu không đạt.",
      "tu_noi": [
        "và",
        "cả",
        "các",
        "chỉ tiêu",
        "gồm",
        "về"
      ]
    },
    "quy_tac_ket_luan_dien": "Ô kết quả phải khớp bảng kết quả (chỉ cần một chỉ tiêu không đạt hoặc định tính \"Không đúng\" thì ghi \"Không đạt\"). Ô tên chỉ tiêu phải ghi đúng và đủ các chỉ tiêu đã kiểm nghiệm; nếu không đạt, ô chỉ tiêu không đạt phải ghi đúng và đủ các chỉ tiêu không đạt. Thiếu, thừa hoặc sai tên chỉ tiêu thì không tính điểm."
  },
  "nhan_giao_dien": {
    "khoi_thong_tin": "Thông tin kiểm nghiệm viên",
    "danh_sach_chi_tieu": "Chỉ tiêu kiểm nghiệm:"
  },
  "hien_thi_cong_thuc": "Công thức (cong_thuc, cong_thuc_tex) chỉ hiện trong phần \"Lời giải\" sau khi sinh viên đã nộp mục tương ứng; không hiện trước khi nộp."
});
