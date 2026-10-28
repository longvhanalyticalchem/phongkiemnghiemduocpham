/* KHỐI "dinh_tinh_pho_uv" – định tính bằng vị trí cực đại hấp thụ (phổ minh họa).
   cfg: { id, so, tieu_de, mo_ta, lambda_yc, dung_sai_nm, khoang:[min,max], lam_tron,
          kich_ban?:[{trong_so, lambda_min, lambda_max}]  (nếu không có, dùng kịch bản lô ctx.kb),
          khoa_ket_luan, nhan_ket_luan, phieu (tên dòng trên phiếu), nguon }
   Lô kiểm thử: dùng kt.lambda_max nếu có. */
(function (P) {
  const { esc, fmt, round, uni, pickW } = P.U;
  function phoSVG(lmax, k0, k1) {
    const L = 56, R = 580, T = 24, B = 214, W = k1 - k0, x = l => L + (R - L) * (l - k0) / W;
    const f = l => 0.9 * Math.exp(-((l - lmax) ** 2) / (2 * 13 ** 2)) + 0.6 * Math.exp(-(l - k0) / 8) + 0.03;
    const y = a => B - (B - T) * a / 1.05;
    let d = ''; for (let l = k0; l <= k1 + 0.01; l += 0.5) d += (d ? 'L' : 'M') + x(l).toFixed(1) + ' ' + y(f(l)).toFixed(1);
    const step = W > 150 ? 50 : 20;
    let ticks = ''; for (let l = Math.ceil(k0 / step) * step; l <= k1; l += step) ticks += `<line x1="${x(l)}" y1="${B}" x2="${x(l)}" y2="${B + 5}" stroke="#476c55"/><text x="${x(l)}" y="${B + 22}" text-anchor="middle" font-size="14" fill="#55705f">${l}</text>`;
    return `<svg class="spec" viewBox="0 0 600 262" role="img" aria-label="Phổ hấp thụ minh họa, cực đại ${fmt(lmax, 1)} nm">
      <rect x="${L}" y="${T}" width="${R - L}" height="${B - T}" fill="#fbfdfb"/>${ticks}
      <line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="#476c55" stroke-width="1.5"/><line x1="${L}" y1="${T}" x2="${L}" y2="${B}" stroke="#476c55" stroke-width="1.5"/>
      <text x="${L - 10}" y="${T + 6}" text-anchor="end" font-size="15" fill="#55705f" font-weight="700">A</text>
      <text x="${R}" y="${B + 42}" text-anchor="end" font-size="14" fill="#55705f" font-weight="700">Bước sóng λ (nm)</text>
      <line x1="${x(lmax)}" y1="${T}" x2="${x(lmax)}" y2="${B}" stroke="#c0841a" stroke-dasharray="5 5"/>
      <path d="${d}" fill="none" stroke="#12733f" stroke-width="3" stroke-linejoin="round"/>
      <text x="${x(lmax) + 8}" y="${T + 16}" font-size="14" fill="#8a5a00" font-weight="700">${fmt(lmax, 1)} nm</text>
      <text x="${L + 8}" y="${B + 42}" font-size="13" fill="#8a5a00" font-style="italic">Phổ minh họa, không phải phổ thật</text></svg>`;
  }
  P.khoi.dinh_tinh_pho_uv = {
    sinh(cfg, ctx) {
      if (ctx.kt && ctx.kt.lambda_max != null) return { lambda: ctx.kt.lambda_max, kichBan: 'lô kiểm thử' };
      const r = ctx.rng(cfg.id), kb = cfg.kich_ban ? pickW(r, cfg.kich_ban) : ctx.kb;
      return { lambda: round(uni(r, kb.lambda_min, kb.lambda_max), cfg.lam_tron ?? 1), kichBan: kb.ma };
    },
    dapAn(cfg, d) { return { dat: Math.abs(d.lambda - cfg.lambda_yc) <= cfg.dung_sai_nm }; },
    muc(cfg, d, da) {
      const k = cfg.khoang || [cfg.lambda_yc - 50, cfg.lambda_yc + 50];
      return [{
        id: cfg.id, so: cfg.so, title: cfg.tieu_de, nguon: cfg.nguon,
        head: () => `${cfg.mo_ta ? `<p>${esc(cfg.mo_ta)}</p>` : ''}${phoSVG(d.lambda, k[0], k[1])}<div class="readout">Cực đại đo được: ${fmt(d.lambda, 1)} nm</div>`,
        fields: [{ key: 'kq', type: 'radio', label: `Kết quả ${(cfg.nhan_ket_luan || 'định tính').toLowerCase()}`, inline: true, opts: P.U.DAT_KD, ans: da.dat ? 'dat' : 'kd' }],
        after: () => `<div class="fb info">Cực đại đo được ${fmt(d.lambda, 1)} nm; yêu cầu cực đại ở khoảng ${cfg.lambda_yc} nm, chấp nhận sai lệch ± ${cfg.dung_sai_nm} nm (từ ${cfg.lambda_yc - cfg.dung_sai_nm} đến ${cfg.lambda_yc + cfg.dung_sai_nm} nm) → <b>${da.dat ? 'Đạt' : 'Không đạt'}</b>.</div>`
      }];
    },
    ketLuan(cfg, d, da) {
      return [{ key: cfg.khoa_ket_luan, label: cfg.nhan_ket_luan, dat: da.dat, phieu: cfg.phieu, loai: 'dinh_tinh',
        giaiThich: `cực đại ${fmt(d.lambda, 1)} nm → ${da.dat ? 'Đạt' : 'Không đạt'}.` }];
    },
    gv(cfg, d, da) { return `<p><b>${esc(cfg.nhan_ket_luan)}:</b> λmax = ${fmt(d.lambda, 1)} nm → ${da.dat ? 'Đạt' : 'Không đạt'}.</p>`; }
  };
})(window.PKN);
