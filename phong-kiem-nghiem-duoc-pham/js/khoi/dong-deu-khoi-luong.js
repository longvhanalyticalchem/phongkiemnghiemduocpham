/* KHỐI "dong_deu_khoi_luong" – Phụ lục 11.3, Phương pháp 1 (cân riêng từng đơn vị, so với KLTB).
   cfg = mục "dong_deu_KL" của chuyên luận + { id, so, tieu_de, dung_sai:{KLTB_mg_tuyet_doi, gioi_han_mg_tuyet_doi},
          khoa_ket_luan, nhan_ket_luan, phieu }
   Dùng: so_don_vi, bang_gioi_han, sinh_so_lieu{nhom_KLTB, SD_tuong_doi, kich_ban, lam_tron_mg}, cong_thuc_tex, nguon, ghi_chu_bo_mon.
   Lô kiểm thử: kt.khoi_luong_mg. Phiếu: yêu cầu có {gioi_han} được thay bằng % sinh viên đã chọn. */
(function (P) {
  const { esc, fmt, tx, round, uni, normal, pickW, shuffled, mean, CT, CTn, solBox, H, nguonHTML } = P.U;
  function gioiHanPhanTram(kltb, bang) {
    for (const g of bang) {
      if (g.kltb_toi_da_mg != null && kltb <= g.kltb_toi_da_mg) return g.phan_tram;
      if (g.kltb_duoi_mg != null && kltb < g.kltb_duoi_mg) return g.phan_tram;
      if (g.kltb_tu_mg != null && kltb >= g.kltb_tu_mg) return g.phan_tram;
    }
    return bang[bang.length - 1].phan_tram;
  }
  function danhGiaKL(m, bang) {
    const kltb = mean(m), p = gioiHanPhanTram(kltb, bang);
    const lo = kltb * (1 - p / 100), hi = kltb * (1 + p / 100), lo2 = kltb * (1 - 2 * p / 100), hi2 = kltb * (1 + 2 * p / 100);
    const loai = m.map(x => (x < lo2 || x > hi2) ? 2 : (x < lo || x > hi) ? 1 : 0);
    const ngoai = loai.filter(t => t > 0).length, gapDoi = loai.filter(t => t === 2).length;
    return { kltb, p, lo, hi, lo2, hi2, loai, ngoai, gapDoi, dat: ngoai <= 2 && gapDoi === 0 };
  }
  function genKL(r, ss, bang, n) {
    const kb = pickW(r, ss.kich_ban), nh = pickW(r, ss.nhom_KLTB);
    const ok = c => kb.ma === 'dat' ? c.ngoai === 0 : kb.ma === 'dat_bien_2_vien' ? (c.ngoai === 2 && c.gapDoi === 0)
      : kb.ma === 'khong_dat_3_vien' ? (c.ngoai === 3 && c.gapDoi === 0) : c.gapDoi >= 1;
    let m = [];
    for (let k = 0; k < 200; k++) {
      const base = uni(r, nh.kltb_min, nh.kltb_max), p = gioiHanPhanTram(base, bang);
      m = Array.from({ length: n }, () => base * (1 + Math.max(-2.5, Math.min(2.5, normal(r))) * ss.SD_tuong_doi));
      const idx = shuffled(r, n), lech = u => base * (1 + (r() < 0.5 ? -1 : 1) * u / 100);
      if (kb.ma === 'dat_bien_2_vien') idx.slice(0, 2).forEach(i => { m[i] = lech(uni(r, p + 0.9, 2 * p - 1.5)); });
      if (kb.ma === 'khong_dat_3_vien') idx.slice(0, 3).forEach(i => { m[i] = lech(uni(r, p + 0.9, 2 * p - 1.5)); });
      if (kb.ma === 'khong_dat_gap_doi') { m[idx[0]] = lech(uni(r, 2 * p + 1, 2 * p + 4)); if (r() < 0.5) m[idx[1]] = lech(uni(r, p + 0.9, 2 * p - 1.5)); }
      m = m.map(x => round(x, ss.lam_tron_mg));
      if (ok(danhGiaKL(m, bang))) break;
    }
    return { kichBan: kb.ma, m };
  }
  P.khoi.dong_deu_khoi_luong = {
    gioiHanPhanTram, danhGiaKL,
    sinh(cfg, ctx) {
      if (ctx.kt && ctx.kt.khoi_luong_mg) return { m: ctx.kt.khoi_luong_mg.slice(), kichBan: 'lô kiểm thử' };
      return genKL(ctx.rng(cfg.id), cfg.sinh_so_lieu, cfg.bang_gioi_han, cfg.so_don_vi || 20);
    },
    dapAn(cfg, d) { return danhGiaKL(d.m, cfg.bang_gioi_han); },
    muc(cfg, d, kl) {
      const dc = cfg.dung_sai, lt = cfg.sinh_so_lieu.lam_tron_mg, n = d.m.length;
      const table = hl => {
        const g = 5, groups = [];
        for (let s = 0; s < n; s += g) groups.push(d.m.slice(s, s + g).map((x, k) => ({ i: s + k, x })));
        return `<div class="kl-grid">${groups.map(gr => `<table><thead><tr><th>STT</th><th class="r">Khối lượng (mg)</th></tr></thead><tbody>${gr.map(o => `<tr class="${hl ? (kl.loai[o.i] === 2 ? 'row-gap' : kl.loai[o.i] === 1 ? 'row-vuot' : '') : ''}"><td>${o.i + 1}</td><td class="r">${fmt(o.x, lt)}</td></tr>`).join('')}</tbody></table>`).join('')}</div>`;
      };
      return [{
        id: cfg.id, so: cfg.so, title: cfg.tieu_de || `Độ đồng đều khối lượng (${n} viên)`, nguon: cfg.nguon,
        fields: [
          { key: 'kltb', type: 'num', label: 'Khối lượng trung bình', unit: 'mg', ans: kl.kltb, tol: { abs: dc.KLTB_mg_tuyet_doi }, dp: 2 },
          { key: 'p', type: 'num', label: 'Giới hạn chênh lệch áp dụng', unit: '%', min: 0, max: 100, ans: kl.p, tol: { abs: 1e-9 }, dp: 1 },
          { key: 'lo', type: 'num', label: 'Khối lượng nhỏ nhất cho phép', unit: 'mg', ans: kl.lo, tol: { abs: dc.gioi_han_mg_tuyet_doi }, dp: 2 },
          { key: 'hi', type: 'num', label: 'Khối lượng lớn nhất cho phép', unit: 'mg', ans: kl.hi, tol: { abs: dc.gioi_han_mg_tuyet_doi }, dp: 2 },
          { key: 'ngoai', type: 'num', label: 'Số viên ngoài giới hạn', unit: 'viên', int: true, min: 0, max: n, ans: kl.ngoai, tol: { abs: 0 }, dp: 0 },
          { key: 'gap', type: 'num', label: 'Số viên vượt gấp đôi giới hạn', unit: 'viên', int: true, min: 0, max: n, ans: kl.gapDoi, tol: { abs: 0 }, dp: 0 },
          { key: 'kl', type: 'radio', label: `Kết luận ${(cfg.nhan_ket_luan || 'độ đồng đều khối lượng').toLowerCase()}`, inline: true, opts: P.U.DAT_KD, ans: kl.dat ? 'dat' : 'kd' }],
        layout: (F, nop) => `<p>Khối lượng ${n} viên cân riêng biệt (cân phân tích):</p>${table(nop)}
          ${nop ? `<div class="legend-row"><span><i style="background:#fff4c2"></i>Ngoài giới hạn</span><span><i style="background:#ffd9d4;border-color:#e99"></i>Vượt gấp đôi giới hạn</span></div>` : ''}
          ${['kltb', 'p', 'lo', 'hi', 'ngoai', 'gap', 'kl'].map(k => F.field(k)).join('')}`,
        after: () => {
          let s = H('Công thức tổng quát') + (cfg.cong_thuc_tex || []).map(t => CTn(t.ten, t.tex)).join('') + H('Thay số');
          s += CT(String.raw`\overline{m} = \frac{${tx(d.m.reduce((a, b) => a + b, 0), lt)}}{${n}} = ${tx(kl.kltb)}\ \text{mg}`);
          s += `<p>KLTB = ${fmt(kl.kltb)} mg → theo Bảng 11.3.1, giới hạn p = ± ${fmt(kl.p, 1)} %.</p>`;
          s += CT(String.raw`m_{\min} = ${tx(kl.kltb)}\times\left(1-\frac{${tx(kl.p, 1)}}{100}\right) = ${tx(kl.lo)}\ \text{mg}`)
            + CT(String.raw`m_{\max} = ${tx(kl.kltb)}\times\left(1+\frac{${tx(kl.p, 1)}}{100}\right) = ${tx(kl.hi)}\ \text{mg}`)
            + CT(String.raw`m_{\min,2p} = ${tx(kl.kltb)}\times\left(1-\frac{2\times ${tx(kl.p, 1)}}{100}\right) = ${tx(kl.lo2)}\ \text{mg}`)
            + CT(String.raw`m_{\max,2p} = ${tx(kl.kltb)}\times\left(1+\frac{2\times ${tx(kl.p, 1)}}{100}\right) = ${tx(kl.hi2)}\ \text{mg}`);
          const vuot = kl.loai.map((t, i) => t ? `viên ${i + 1} (${fmt(d.m[i], lt)} mg${t === 2 ? ', vượt gấp đôi' : ''})` : null).filter(Boolean);
          s += `<p>Số viên ngoài giới hạn: <b>${kl.ngoai}</b>${vuot.length ? ' – ' + vuot.join('; ') : ''}. Số viên vượt gấp đôi giới hạn: <b>${kl.gapDoi}</b>.</p>`
            + `<p>Tiêu chí (Phương pháp 1): không quá 2 đơn vị ngoài giới hạn và không đơn vị nào vượt gấp đôi giới hạn → <b>${kl.dat ? 'Đạt' : 'Không đạt'}</b>.</p>`;
          return solBox(s) + nguonHTML(cfg.nguon) + (cfg.ghi_chu_bo_mon ? `<div class="fb info"><b>Quy định bộ môn:</b> ${esc(cfg.ghi_chu_bo_mon)}</div>` : '');
        }
      }];
    },
    ketLuan(cfg, d, kl, ctx) {
      return [{ key: cfg.khoa_ket_luan, label: cfg.nhan_ket_luan, dat: kl.dat, phieu: cfg.phieu, loai: 'chi_tieu',
        giaiThich: `${kl.ngoai} viên ngoài giới hạn, ${kl.gapDoi} viên vượt gấp đôi → ${kl.dat ? 'Đạt' : 'Không đạt'}.`,
        phieuYC: yc => { const p = ctx.sv(cfg.id, 'p'); return yc.replace('{gioi_han}', Number.isFinite(p) ? fmt(p, p % 1 ? 1 : 0) : '…'); },
        phieuKQ: dat => { const k = ctx.sv(cfg.id, 'kltb'); return { kq: `${dat ? 'Đạt' : 'Không đạt'} (KLTB ${Number.isFinite(k) ? fmt(k, 2) : '…'} mg)` }; } }];
    },
    gv(cfg, d, kl) {
      return `<p><b>Khối lượng ${d.m.length} viên (mg):</b> ${d.m.map(x => fmt(x, 1)).join('; ')}</p><p><b>Đáp án:</b> KLTB ${fmt(kl.kltb)} mg; ± ${fmt(kl.p, 1)} %; ${fmt(kl.lo)}–${fmt(kl.hi)} mg; gấp đôi ${fmt(kl.lo2)}–${fmt(kl.hi2)} mg; ngoài giới hạn ${kl.ngoai}; vượt gấp đôi ${kl.gapDoi} → ${kl.dat ? 'Đạt' : 'Không đạt'}.</p>`;
    },
    soSanh(cfg, d, kl, kq, num, str) {
      if (kq.KLTB == null) return;
      num('KLTB (mg)', kl.kltb, kq.KLTB); num('Giới hạn (%)', kl.p, kq.gioi_han_phan_tram, 1e-9, 1);
      if (kq.min != null) num('Khối lượng nhỏ nhất (mg)', kl.lo, kq.min); if (kq.max != null) num('Khối lượng lớn nhất (mg)', kl.hi, kq.max);
      if (kq.min_gap_doi != null) num('Giới hạn gấp đôi dưới (mg)', kl.lo2, kq.min_gap_doi); if (kq.max_gap_doi != null) num('Giới hạn gấp đôi trên (mg)', kl.hi2, kq.max_gap_doi);
      num('Số viên ngoài giới hạn', kl.ngoai, kq.so_vuot, 0, 0); num('Số viên vượt gấp đôi', kl.gapDoi, kq.so_gap_doi, 0, 0);
      str('Kết luận độ đồng đều khối lượng', kl.dat ? 'Đạt' : 'Không đạt', kq.ket_luan);
    }
  };
})(window.PKN);
