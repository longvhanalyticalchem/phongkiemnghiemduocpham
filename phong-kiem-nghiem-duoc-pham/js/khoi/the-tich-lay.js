/* KHỐI "the_tich_lay" – tính thể tích chế phẩm lỏng cần lấy theo lượng hoạt chất tương ứng.
   cfg: { id, so, tieu_de, C_nhan (mg/ml), nhan_text, nguon, quy_trinh:[...], qdc,
          cau:[{ key, nhan_o, hoi ({nhan} được thay bằng nhan_text), m_mg, dung_sai_tuong_doi, don_vi, loi_giai, tieu_de_loi_giai }] } */
(function (P) {
  const { esc, CT, tx, solBox, H, qdcHTML } = P.U;
  P.khoi.the_tich_lay = {
    muc(cfg) {
      const fields = cfg.cau.map(c => ({ key: c.key, type: 'num', label: c.nhan_o, unit: c.don_vi || 'ml', ans: c.m_mg / cfg.C_nhan, tol: { rel: c.dung_sai_tuong_doi }, dp: 1 }));
      return [{
        id: cfg.id, so: cfg.so, title: cfg.tieu_de || 'Tính thể tích chế phẩm cần lấy', nguon: cfg.nguon, fields,
        layout: F => cfg.cau.map((c, i) => `<p ${i ? 'style="margin-top:16px"' : ''}>${esc(String(c.hoi).replace('{nhan}', cfg.nhan_text || ''))}</p>${F.field(c.key)}`).join(''),
        after: () => solBox(cfg.cau.map((c, i) => H(esc(c.tieu_de_loi_giai || c.nhan_o))
          + (i === 0 ? CT(String.raw`V = \frac{m_{\text{tương ứng}}}{C_{\text{nhãn}}}`) : '')
          + CT(String.raw`V = \frac{${c.m_mg}\ \text{mg}}{${tx(cfg.C_nhan, cfg.C_nhan % 1 ? 1 : 0)}\ \text{mg/ml}} = ${tx(c.m_mg / cfg.C_nhan, 1)}\ \text{ml}`)
          + (c.loi_giai ? `<p>${esc(c.loi_giai)}</p>` : '')).join('')
          + (cfg.quy_trinh && cfg.quy_trinh.length ? H('Quy trình') + `<ol class="qlist">${cfg.quy_trinh.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''))
          + (cfg.qdc ? qdcHTML(cfg.qdc) : '')
      }];
    },
    gv(cfg) { return `<p><b>${esc(cfg.tieu_de || 'Thể tích lấy')}:</b> ${cfg.cau.map(c => `${esc(c.nhan_o)} = ${P.U.fmt(c.m_mg / cfg.C_nhan, 1)} ml`).join('; ')}.</p>`; }
  };
})(window.PKN);
