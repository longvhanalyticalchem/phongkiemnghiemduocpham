/* KIỂU "ghep_khoi" – dành cho CHUYÊN LUẬN MỚI: khai báo trực tiếp danh sách khối thử trong file dữ liệu, không cần viết code.
   chang_3_thuc_nghiem: {
     kieu: "ghep_khoi",
     gioi_thieu: "…",                 // dòng giới thiệu đầu chặng 3
     kich_ban_lo: [ … ] | null,       // kịch bản dùng chung cho các khối (tuỳ chọn)
     so_ket_luan: "3.4", nguon_ket_luan: "…",
     khoi: [ { loai: "dinh_luong_a1pct", id: "VC-3.1", so: "3.1", … cấu hình của khối … }, … ]
   }
   Xem docs/THEM-CHUYEN-LUAN.md và mô tả cấu hình ở đầu mỗi file js/khoi/*.js. */
(function (P) {
  P.kieu.ghep_khoi = hs => {
    const c3 = hs.chang_3_thuc_nghiem;
    return {
      kichBanLo: c3.kich_ban_lo || null,
      gioiThieu: c3.gioi_thieu || '',
      idKetLuan: hs.id + '-ket-luan', soKetLuan: c3.so_ket_luan, nguonKetLuan: c3.nguon_ket_luan || '',
      khoi: (c3.khoi || []).map(k => ({ loai: k.loai, cfg: k }))
    };
  };
})(window.PKN);
