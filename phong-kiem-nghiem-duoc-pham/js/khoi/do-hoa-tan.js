/* KHỐI "do_hoa_tan" – độ hòa tan đánh giá từng đơn vị ≥ Q % (chuyên luận + Phụ lục 11.4, PL-257), có thể thử lặp lại 1 lần.
   m (mg) = (A / A1) × (V / 100) × 1000 × f;   % = m / nhãn × 100
   cfg = mục "do_hoa_tan" của chuyên luận + { id, so, tieu_de, A1, V_moi_truong, nhan_mg, Q, f, buoc_song,
          dung_sai_phan_tram, nhac_lap_lai, khoa_ket_luan, nhan_ket_luan, phieu }
   Dùng: dieu_kien, quy_tac_danh_gia, nguon, ghi_chu_bo_mon, sinh_so_lieu{kich_ban:[{ma, trong_so, mu, sd}]}, cong_thuc_tex.
   Lô kiểm thử: kt.A_lan_1, kt.A_lan_2. */
(function (P) {
  const { esc, fmt, tx, round, uni, normal, pickW, CT, CTn, solBox, H, nguonHTML } = P.U;
  const N = 6;
  const mg = (cfg, A) => A / cfg.A1 * cfg.V_moi_truong / 100 * 1000 * (cfg.f || 1);
  const pct = (cfg, A) => mg(cfg, A) / cfg.nhan_mg * 100;
  const AtuPct = (cfg, p) => round(cfg.A1 * (p * cfg.nhan_mg / 100) / (10 * cfg.V_moi_truong) / (cfg.f || 1), 3);
  /* lần 1: tất cả ≥ Q → Đạt; đúng 1 đơn vị < Q → thử lặp lại; ≥ 2 → Không đạt. Lần 2: cả 6 ≥ Q → Đạt, ngược lại Không đạt.
     So sánh bằng % chưa làm tròn. */
  function danhGiaHoaTan(lan1, lan2, Q) {
    const n1 = lan1.filter(x => x < Q).length, q1 = n1 === 0 ? 'dat' : n1 === 1 ? 'lap' : 'kd';
    if (q1 !== 'lap' || !lan2) return { n1, q1, n2: null, q2: null };
    const n2 = lan2.filter(x => x < Q).length;
    return { n1, q1, n2, q2: n2 === 0 ? 'dat' : 'kd' };
  }
  function genHT(cfg, r) {
    const kb = pickW(r, cfg.sinh_so_lieu.kich_ban), Q = cfg.Q;
    const ok = (n1, n2) => kb.ma === 'dat_lan_1' ? n1 === 0 : kb.ma === 'dat_lan_2' ? (n1 === 1 && n2 === 0) : kb.ma === 'khong_dat_lan_1' ? n1 >= 2 : (n1 === 1 && n2 >= 1);
    const dem = A => A.map(a => pct(cfg, a)).filter(x => x < Q).length;
    for (let k = 0; k < 400; k++) {
      const A = Array.from({ length: 2 * N }, () => AtuPct(cfg, Math.max(50, Math.min(105, kb.mu + normal(r) * kb.sd))));
      if (ok(dem(A.slice(0, N)), dem(A.slice(N)))) return { kichBan: kb.ma, A1: A.slice(0, N), A2: A.slice(N) };
    }
    const A = Array.from({ length: 2 * N }, () => AtuPct(cfg, uni(r, Q + 4, Q + 22))), low = () => AtuPct(cfg, uni(r, Q - 8, Q - 1));
    if (kb.ma !== 'dat_lan_1') A[Math.floor(r() * N)] = low();
    if (kb.ma === 'khong_dat_lan_1') { const i = A.findIndex(a => pct(cfg, a) >= Q); A[i] = low(); }
    if (kb.ma === 'khong_dat_lan_2') A[N + Math.floor(r() * N)] = low();
    return { kichBan: kb.ma, A1: A.slice(0, N), A2: A.slice(N) };
  }
  P.khoi.do_hoa_tan = {
    danhGiaHoaTan,
    sinh(cfg, ctx) {
      if (ctx.kt && ctx.kt.A_lan_1) return { A1: ctx.kt.A_lan_1.slice(), A2: ctx.kt.A_lan_2 ? ctx.kt.A_lan_2.slice() : null, kichBan: 'lô kiểm thử' };
      return genHT(cfg, ctx.rng(cfg.id));
    },
    dapAn(cfg, d) {
      const pc1 = d.A1.map(a => pct(cfg, a)), pc2 = d.A2 ? d.A2.map(a => pct(cfg, a)) : null;
      const dg = danhGiaHoaTan(pc1, pc2, cfg.Q), canLan2 = dg.q1 === 'lap';
      return { pc1, pc2, dg, canLan2, dat: dg.q1 === 'dat' || (canLan2 && dg.q2 === 'dat') };
    },
    muc(cfg, d, da) {
      const Q = cfg.Q, bs = cfg.buoc_song ? ` (${cfg.buoc_song})` : '';
      const QD1 = [{ v: 'dat', t: `Đạt (tất cả ≥ ${Q} %)` }, { v: 'lap', t: 'Thử lặp lại với 6 đơn vị khác' }, { v: 'kd', t: 'Không đạt' }];
      const QD1t = { dat: `Đạt (tất cả ≥ ${Q} %)`, lap: 'Thử lặp lại với 6 đơn vị khác', kd: 'Không đạt' };
      const cups = (lan, pcs) => pcs.map((p, k) => ({ key: 'p' + k, type: 'num', label: `Cốc ${lan === 1 ? k + 1 : k + N + 1}`, unit: '%', min: 0, max: 200, ans: p, tol: { abs: cfg.dung_sai_phan_tram }, dp: 2 }));
      const table = (F, lan, A) => `<div class="tbl-wrap"><table class="rt"><thead><tr><th>Cốc</th><th class="r">A${esc(bs)}</th><th class="r">% hòa tan so với nhãn (%)</th></tr></thead><tbody>
        ${A.map((a, k) => `<tr><td data-label="Cốc"><b>${lan === 1 ? k + 1 : k + N + 1}</b></td><td class="r" data-label="A${esc(bs)}">${fmt(a, 3)}</td><td class="r" data-label="% hòa tan (%)">${F.cell('p' + k)}</td></tr>`).join('')}</tbody></table></div>`;
      const sol = (lan, A, pcs) => {
        let s = H('Công thức tổng quát') + (cfg.cong_thuc_tex || []).map(t => CTn(t.ten, t.tex)).join('') + `<p class="small">f = hệ số pha loãng dịch lọc; ở bài này f = ${cfg.f || 1}.</p>` + H('Thay số');
        A.forEach((a, k) => {
          s += `<div class="ct-name">Cốc ${lan === 1 ? k + 1 : k + N + 1}</div>` + CT(String.raw`m = \frac{${tx(a, 3)}}{${cfg.A1}}\times\frac{${cfg.V_moi_truong}}{100}\times 1000\times ${cfg.f || 1} = ${tx(mg(cfg, a), 3)}\ \text{mg}`)
            + CT(String.raw`\% = \frac{${tx(mg(cfg, a), 3)}}{${cfg.nhan_mg}}\times 100 = ${tx(pcs[k])}\ \%`);
        });
        return s;
      };
      const qt = cfg.quy_tac_danh_gia || {};
      const nhac = cfg.nhac_lap_lai || 'Cần chuẩn bị thêm môi trường hòa tan cho 6 cốc mới.';
      const items = [{
        id: cfg.id + 'a', so: cfg.so, title: 'Độ hòa tan – lần thử 1 (6 đơn vị)', nguon: cfg.nguon,
        fields: [...cups(1, da.pc1), { key: 'n70', type: 'num', label: `Số đơn vị có % hòa tan < ${Q} %`, unit: 'đơn vị', int: true, min: 0, max: N, ans: da.dg.n1, tol: { abs: 0 }, dp: 0 },
          { key: 'qd', type: 'radio', label: 'Quyết định sau lần thử 1', opts: QD1, ans: da.dg.q1 }],
        layout: F => `${cfg.dieu_kien ? `<div class="fb info"><b>Điều kiện thử:</b> ${esc(cfg.dieu_kien)}</div>` : ''}${cfg.ghi_chu_bo_mon ? `<p class="small">${esc(cfg.ghi_chu_bo_mon)}</p>` : ''}
          <p>Độ hấp thụ đo được của 6 cốc (lần thử 1). Tính % hoạt chất hòa tan so với lượng ghi trên nhãn (${cfg.nhan_mg} mg) cho từng cốc.</p>${table(F, 1, d.A1)}${F.field('n70')}${F.field('qd')}`,
        after: () => `<div class="fb info">Lần thử 1: ${da.dg.n1} đơn vị < ${Q} % → <b>${QD1t[da.dg.q1]}</b>.${da.canLan2 ? `<br><b>${esc(nhac)}</b>` : ''}</div>`
          + solBox(sol(1, d.A1, da.pc1) + (qt.lan_1 ? H('Quy tắc đánh giá') + `<p>${esc(qt.lan_1)}</p>` : '') + (qt.trich_nguyen_van ? `<blockquote class="bailam">${esc(qt.trich_nguyen_van)}</blockquote>` : '')) + nguonHTML(cfg.nguon)
      }];
      if (da.canLan2) items.push({
        id: cfg.id + 'b', so: cfg.so + 'b', title: 'Độ hòa tan – lần thử lặp lại (6 đơn vị khác)', nguon: cfg.nguon,
        fields: [...cups(2, da.pc2), { key: 'n70', type: 'num', label: `Số đơn vị có % hòa tan < ${Q} %`, unit: 'đơn vị', int: true, min: 0, max: N, ans: da.dg.n2, tol: { abs: 0 }, dp: 0 },
          { key: 'qd', type: 'radio', label: 'Quyết định sau lần thử lặp lại', inline: true, opts: P.U.DAT_KD, ans: da.dg.q2 }],
        layout: F => `<div class="fb warn">Lần thử 1 có đúng 1 đơn vị dưới ${Q} %, nên thử lặp lại với 6 đơn vị khác. ${esc(nhac)}</div>
          <p>Độ hấp thụ đo được của 6 cốc mới (cốc ${N + 1}–${2 * N}):</p>${table(F, 2, d.A2)}${F.field('n70')}${F.field('qd')}`,
        after: () => `<div class="fb info">Lần thử lặp lại: ${da.dg.n2} đơn vị < ${Q} % → <b>${da.dg.q2 === 'dat' ? 'Đạt' : 'Không đạt'}</b>. ${esc(qt.lan_2 || '')}</div>`
          + solBox(sol(2, d.A2, da.pc2) + (qt.trich_nguyen_van ? `<blockquote class="bailam">${esc(qt.trich_nguyen_van)}</blockquote>` : '')) + nguonHTML(cfg.nguon)
      });
      return items;
    },
    ketLuan(cfg, d, da, ctx) {
      return [{ key: cfg.khoa_ket_luan, label: cfg.nhan_ket_luan, dat: da.dat, phieu: cfg.phieu, loai: 'chi_tieu',
        giaiThich: `${da.canLan2 ? `lần 1 có 1 đơn vị < ${cfg.Q} %, lần lặp lại có ${da.dg.n2} đơn vị < ${cfg.Q} %` : `lần 1 có ${da.dg.n1} đơn vị < ${cfg.Q} %`} → ${da.dat ? 'Đạt' : 'Không đạt'}.`,
        phieuKQ: dat => {
          const id = da.canLan2 ? cfg.id + 'b' : cfg.id + 'a';
          const pcs = Array.from({ length: N }, (_, k) => ctx.sv(id, 'p' + k)).filter(Number.isFinite);
          return { kq: `${dat ? 'Đạt' : 'Không đạt'} (${pcs.length ? `${fmt(Math.min(...pcs), 1)} – ${fmt(Math.max(...pcs), 1)} %` : '…'})` };
        } }];
    },
    gv(cfg, d, da) {
      const q = { dat: 'Đạt', lap: 'Thử lặp lại', kd: 'Không đạt' };
      return `<p><b>Hòa tan lần 1:</b> A ${d.A1.map(a => fmt(a, 3)).join('; ')} → % ${da.pc1.map(x => fmt(x)).join('; ')}; ${da.dg.n1} đơn vị < ${cfg.Q} % → ${q[da.dg.q1]}.</p>`
        + (da.canLan2 ? `<p><b>Hòa tan lần 2:</b> A ${d.A2.map(a => fmt(a, 3)).join('; ')} → % ${da.pc2.map(x => fmt(x)).join('; ')}; ${da.dg.n2} đơn vị < ${cfg.Q} % → ${da.dg.q2 === 'dat' ? 'Đạt' : 'Không đạt'}.</p>` : '')
        + (cfg.ghi_chu_GV ? `<p class="small">${esc(cfg.ghi_chu_GV)}</p>` : '');
    },
    soSanh(cfg, d, da, kq, num, str) {
      if (!kq.phan_tram_lan_1) return;
      kq.phan_tram_lan_1.forEach((x, i) => num(`Lần 1 – cốc ${i + 1} (%)`, da.pc1[i], x));
      num(`Số đơn vị < ${cfg.Q} % (lần 1)`, da.dg.n1, kq.so_duoi_70_lan_1, 0, 0);
      if (kq.quyet_dinh_lan_1) str('Quyết định lần 1', da.dg.q1 === 'lap' ? 'Thử lặp lại với 6 đơn vị khác' : da.dg.q1 === 'dat' ? 'Đạt' : 'Không đạt', kq.quyet_dinh_lan_1);
      if (kq.phan_tram_lan_2) { kq.phan_tram_lan_2.forEach((x, i) => num(`Lần 2 – cốc ${i + N + 1} (%)`, da.pc2[i], x)); num(`Số đơn vị < ${cfg.Q} % (lần 2)`, da.dg.n2, kq.so_duoi_70_lan_2, 0, 0); }
      str('Kết luận độ hòa tan', da.dat ? 'Đạt' : 'Không đạt', kq.ket_luan);
    }
  };
})(window.PKN);
