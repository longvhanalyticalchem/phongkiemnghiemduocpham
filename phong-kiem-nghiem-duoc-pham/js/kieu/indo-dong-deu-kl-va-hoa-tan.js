/* KIỂU "INDO_dong_deu_KL_va_hoa_tan" – viên nén: độ đồng đều khối lượng (PL 11.3, PP1) + độ hòa tan (đánh giá từng đơn vị ≥ Q %). */
(function (P) {
  P.kieu.INDO_dong_deu_KL_va_hoa_tan = hs => {
    const c3 = hs.chang_3_thuc_nghiem, y = hs.yeu_cau, dc = c3.dung_sai_cham;
    return {
      kichBanLo: null,
      gioiThieu: 'Cân 20 viên để đánh giá độ đồng đều khối lượng, thử độ hòa tan, tự xử lý số liệu rồi kết luận từng chỉ tiêu.',
      idKetLuan: 'IN-3.3', soKetLuan: '3.3', nguonKetLuan: 'DĐVN V, chuyên luận Viên nén Indomethacin, tr. 513–514; Phụ lục 11.3; Phụ lục 11.4',
      khoi: [
        { loai: 'dong_deu_khoi_luong', cfg: Object.assign({}, c3.dong_deu_KL, { id: 'IN-3.1', so: '3.1', tieu_de: 'Độ đồng đều khối lượng (20 viên)',
          dung_sai: { KLTB_mg_tuyet_doi: dc.KLTB_mg_tuyet_doi, gioi_han_mg_tuyet_doi: dc.gioi_han_mg_tuyet_doi },
          khoa_ket_luan: 'kl', nhan_ket_luan: 'Độ đồng đều khối lượng', phieu: 'Độ đồng đều khối lượng' }) },
        { loai: 'do_hoa_tan', cfg: Object.assign({}, c3.do_hoa_tan, { id: 'IN-3.2', so: '3.2',
          A1: y.A1pct_hoa_tan, V_moi_truong: y.the_tich_moi_truong_ml, nhan_mg: hs.bien_the[0].ham_luong_mg, Q: y.Q, f: 1, buoc_song: '320 nm',
          dung_sai_phan_tram: dc.phan_tram_hoa_tan_tuyet_doi, nhac_lap_lai: 'Cần pha thêm đệm phosphat chuẩn pH 7,2 cho 6 cốc mới.',
          khoa_ket_luan: 'ht', nhan_ket_luan: 'Độ hòa tan', phieu: 'Độ hòa tan' }) }
      ]
    };
  };
})(window.PKN);
