/* KHỐI "dinh_tinh_quan_sat" – định tính bằng phản ứng màu/tủa: hiện mô tả quan sát, sinh viên kết luận.
   cfg: { id, so, tieu_de, quan_sat:{dat, khong_dat}, mau:{dat, khong_dat} (màu ống nghiệm minh họa),
          giai_thich (phản ứng đúng là gì), kich_ban?:[{trong_so, ma, dinh_tinh_C}], truong_kich_ban ('dinh_tinh_C'),
          khoa_ket_luan, nhan_ket_luan, phieu, nguon }
   Kết quả lấy từ kt.<truong_kich_ban> (lô kiểm thử) → kịch bản riêng → kịch bản lô ctx.kb → mặc định "dat". */
(function (P) {
  const { esc, pickW } = P.U;
  const ong = mau => `<svg width="64" height="150" viewBox="0 0 64 150" aria-hidden="true"><rect x="12" y="4" width="40" height="8" rx="3" fill="#cfd8d3"/>
    <path d="M16 12 V120 a16 16 0 0 0 32 0 V12" fill="#ffffff" stroke="#7f98a6" stroke-width="2"/>
    <path d="M18 70 V120 a14 14 0 0 0 28 0 V70 Z" fill="${mau}" opacity=".9"/><path d="M22 18 V118" stroke="#fff" stroke-width="3" opacity=".7"/></svg>`;
  P.khoi.dinh_tinh_quan_sat = {
    sinh(cfg, ctx) {
      const tr = cfg.truong_kich_ban || 'dinh_tinh_C';
      if (ctx.kt && ctx.kt[tr] != null) return { kq: ctx.kt[tr], kichBan: 'lô kiểm thử' };
      if (cfg.kich_ban) { const kb = pickW(ctx.rng(cfg.id), cfg.kich_ban); return { kq: kb[tr] || 'dat', kichBan: kb.ma }; }
      return { kq: (ctx.kb && ctx.kb[tr]) || 'dat', kichBan: ctx.kb && ctx.kb.ma };
    },
    dapAn(cfg, d) { return { dat: d.kq === 'dat' }; },
    muc(cfg, d, da) {
      const mau = cfg.mau || { dat: '#b8322a', khong_dat: '#f1df98' };
      return [{
        id: cfg.id, so: cfg.so, title: cfg.tieu_de, nguon: cfg.nguon,
        head: () => `<div class="obs">${ong(da.dat ? mau.dat : mau.khong_dat)}<div><p class="eyebrow">Quan sát</p><p>${esc(da.dat ? cfg.quan_sat.dat : cfg.quan_sat.khong_dat)}</p></div></div>`,
        fields: [{ key: 'kq', type: 'radio', label: `Kết quả ${(cfg.nhan_ket_luan || 'định tính').toLowerCase()}`, inline: true, opts: P.U.DAT_KD, ans: da.dat ? 'dat' : 'kd' }],
        after: () => `<div class="fb info">${cfg.giai_thich ? esc(cfg.giai_thich) + ' ' : ''}Quan sát của lô: ${da.dat ? 'đúng như mô tả' : 'không đúng như mô tả'} → <b>${da.dat ? 'Đạt' : 'Không đạt'}</b>.</div>`
      }];
    },
    ketLuan(cfg, d, da) {
      return [{ key: cfg.khoa_ket_luan, label: cfg.nhan_ket_luan, dat: da.dat, phieu: cfg.phieu, loai: 'dinh_tinh',
        giaiThich: da.dat ? (cfg.tom_tat_dat || 'phản ứng đúng như mô tả') + ' → Đạt.' : (cfg.tom_tat_khong_dat || 'không cho phản ứng đúng') + ' → Không đạt.' }];
    },
    gv(cfg, d, da) { return `<p><b>${esc(cfg.nhan_ket_luan)}:</b> ${da.dat ? 'đạt' : 'không đạt'}.</p>`; }
  };
})(window.PKN);
