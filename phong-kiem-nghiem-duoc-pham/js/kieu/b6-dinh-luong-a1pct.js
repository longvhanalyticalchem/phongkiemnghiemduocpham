/* KIỂU "B6_dinh_luong_A1pct" – chuyển mục chang_3_thuc_nghiem của hồ sơ thuốc tiêm vitamin B6 thành các khối thử.
   Trả về: { kichBanLo, gioiThieu, idKetLuan, soKetLuan, nguonKetLuan, khoi:[{loai, cfg}] } */
(function (P) {
  P.kieu.B6_dinh_luong_A1pct = hs => {
    const c3 = hs.chang_3_thuc_nghiem, bt = hs.bien_the[0], nhan = bt.ham_luong_mg_ml, y = hs.yeu_cau, ss = c3.sinh_so_lieu;
    const nguon = 'DĐVN V, chuyên luận Thuốc tiêm Pyridoxin hydroclorid, tr. 813–814';
    return {
      kichBanLo: ss.kich_ban,
      gioiThieu: 'Tính thể tích lấy, làm định tính A, C và định lượng 3 lần trên mẫu của lô; tự xử lý số liệu rồi kết luận từng chỉ tiêu.',
      idKetLuan: 'B6-3.4', soKetLuan: '3.4', nguonKetLuan: nguon + '; mẫu phiếu kiểm nghiệm của bộ môn',
      khoi: [
        { loai: 'the_tich_lay', cfg: { id: 'B6-3.1', so: '3.1', tieu_de: 'Tính thể tích chế phẩm cần lấy', C_nhan: nhan, nhan_text: bt.nhan, nguon,
          quy_trinh: c3.quy_trinh_hien_thi, qdc: 'QDC-chinh-xac',
          cau: [
            { key: 'Vdl', nhan_o: 'Thể tích chế phẩm lấy để định lượng', tieu_de_loi_giai: 'Định lượng', hoi: c3.tinh_V_lay.hoi, m_mg: c3.tinh_V_lay.khoi_luong_tuong_ung_mg, dung_sai_tuong_doi: c3.tinh_V_lay.dung_sai_tuong_doi, don_vi: c3.tinh_V_lay.don_vi, loi_giai: c3.tinh_V_lay.loi_giai },
            { key: 'Vdt', nhan_o: 'Thể tích chế phẩm lấy để pha dung dịch A', tieu_de_loi_giai: 'Dung dịch A (định tính)', hoi: c3.tinh_V_dinh_tinh.hoi, m_mg: c3.tinh_V_dinh_tinh.khoi_luong_tuong_ung_mg, dung_sai_tuong_doi: c3.tinh_V_dinh_tinh.dung_sai_tuong_doi, don_vi: c3.tinh_V_dinh_tinh.don_vi }] } },
        { loai: 'dinh_tinh_pho_uv', cfg: { id: 'B6-3.2A', so: '3.2A', tieu_de: 'Định tính A – phổ hấp thụ tử ngoại',
          mo_ta: 'Phổ của dung dịch thử (pha loãng dung dịch A bằng dung dịch acid hydrocloric 0,1 M) đo trong khoảng 240–340 nm:',
          lambda_yc: y.dinh_tinh_A_lambda, dung_sai_nm: y.dung_sai_lambda_nm, khoang: [240, 340], lam_tron: ss.lam_tron_lambda,
          khoa_ket_luan: 'dtA', nhan_ket_luan: 'Định tính A', phieu: 'Định tính', nguon: nguon + '; Phụ lục 4.1, PL-120' } },
        { loai: 'dinh_tinh_quan_sat', cfg: { id: 'B6-3.2C', so: '3.2C', tieu_de: 'Định tính C – phản ứng với dung dịch sắt (III) clorid',
          quan_sat: c3.dinh_tinh_C_quan_sat, mau: { dat: '#b8322a', khong_dat: '#f1df98' },
          giai_thich: 'Phản ứng đúng của pyridoxin: xuất hiện màu đỏ với dung dịch sắt (III) clorid và màu đỏ phai dần khi thêm acid sulfuric 10 %.',
          tom_tat_dat: 'có màu đỏ, phai dần khi thêm acid', tom_tat_khong_dat: 'không xuất hiện màu đỏ',
          khoa_ket_luan: 'dtC', nhan_ket_luan: 'Định tính C', phieu: 'Định tính', nguon } },
        { loai: 'dinh_luong_a1pct', cfg: { id: 'B6-3.3', so: '3.3', tieu_de: 'Định lượng – xử lý số liệu 3 lần đo',
          mo_ta: `Mỗi lần: lấy chính xác ${P.U.fmt(c3.tinh_V_lay.khoi_luong_tuong_ung_mg / nhan, 1)} ml chế phẩm → 500,0 ml; lấy 5,0 ml → 100,0 ml (dung dịch acid hydrocloric 0,1 M); đo A ở cực đại khoảng 290 nm, cốc đo 1 cm. A (1 %, 1 cm) của pyridoxin hydroclorid = ${y.A1pct}. Nhãn: ${bt.nhan}.`,
          A1: y.A1pct, C_nhan: nhan, don_vi_ham_luong: 'mg/ml', V_lay: c3.tinh_V_lay.khoi_luong_tuong_ung_mg / nhan,
          pha_loang: { V_dinh_muc: 500, V_hut: 5, V_cuoi: 100 }, so_lan: 3, nhieu: ss.nhieu_A_tuong_doi_SD, lam_tron_A: ss.lam_tron_A,
          dung_sai: c3.dung_sai_cham, cong_thuc_tex: c3.cong_thuc_tex, gioi_han: [y.ham_luong_min, y.ham_luong_max], ket_luan_text: c3.ket_luan_dinh_luong,
          khoa_ket_luan: 'dl', nhan_ket_luan: 'Định lượng', phieu: 'Định lượng', nguon } }
      ]
    };
  };
})(window.PKN);
