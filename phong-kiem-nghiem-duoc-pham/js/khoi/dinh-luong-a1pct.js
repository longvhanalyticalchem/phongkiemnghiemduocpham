/* KHỐI "dinh_luong_a1pct" – định lượng chế phẩm lỏng bằng đo quang dùng A (1 %, 1 cm), làm n lần.
   Quy trình: lấy V ml chế phẩm → định mức V_dinh_muc ml; hút V_hut ml → định mức V_cuoi ml; đo A.
     g trong V ml = (A / A1) × (V_cuoi / 100) × (V_dinh_muc / V_hut);  hàm lượng (mg/ml) = g × 1000 / V
   cfg: { id, so, tieu_de, mo_ta, A1, C_nhan (mg/ml), nhan_text, V_lay, pha_loang:{V_dinh_muc, V_hut, V_cuoi},
          so_lan, nhieu (SD tương đối của A), lam_tron_A, dung_sai:{ham_luong_mg_ml_tuong_doi, phan_tram_nhan_tuyet_doi, RSD_tuyet_doi},
          cong_thuc_tex:[{ten,tex}], gioi_han:[min,max], ket_luan_text, kich_ban?:[{trong_so, ma, phan_tram_that_min, phan_tram_that_max}],
          khoa_ket_luan, nhan_ket_luan, phieu, nguon }
   Kịch bản "sat_bien": sinh lại nếu |trung bình − giới hạn dưới| < 0,1. Lô kiểm thử: kt.A, kt.V_lay_ml. */
(function (P) {
  const { esc, fmt, tx, round, uni, normal, pickW, mean, sdMau, CT, CTn, solBox, H } = P.U;
  const PL = cfg => Object.assign({ V_dinh_muc: 100, V_hut: 1, V_cuoi: 100 }, cfg.pha_loang || {});
  const hamLuong = (cfg, A, V) => { const p = PL(cfg); return A / cfg.A1 * (p.V_cuoi / 100) * (p.V_dinh_muc / p.V_hut) * 1000 / V; };
  P.khoi.dinh_luong_a1pct = {
    hamLuong,
    sinh(cfg, ctx) {
      const n = cfg.so_lan || 3;
      if (ctx.kt && ctx.kt.A) return { V: ctx.kt.V_lay_ml ?? cfg.V_lay, A: ctx.kt.A.slice(), kichBan: 'lô kiểm thử' };
      const r = ctx.rng(cfg.id), kb = cfg.kich_ban ? pickW(r, cfg.kich_ban) : ctx.kb, p = PL(cfg), V = cfg.V_lay;
      const pct = uni(r, kb.phan_tram_that_min, kb.phan_tram_that_max);
      const gTrongV = cfg.C_nhan * pct / 100 * V / 1000;
      const Alt = cfg.A1 * gTrongV * (p.V_hut / p.V_dinh_muc) * (100 / p.V_cuoi);
      let A = [];
      for (let k = 0; k < 200; k++) {
        A = Array.from({ length: n }, () => round(Alt * (1 + normal(r) * cfg.nhieu), cfg.lam_tron_A ?? 3));
        if (kb.ma !== 'sat_bien') break;
        const m = mean(A.map(a => hamLuong(cfg, a, V) / cfg.C_nhan * 100));
        if (Math.abs(m - cfg.gioi_han[0]) >= 0.1) break;
      }
      return { V, A, kichBan: kb.ma };
    },
    dapAn(cfg, d) {
      const ham = d.A.map(a => hamLuong(cfg, a, d.V)), pc = ham.map(h => h / cfg.C_nhan * 100);
      const tb = mean(pc), sd = sdMau(pc), rsd = sd / tb * 100;
      return { ham, pc, tb, sd, rsd, dat: tb >= cfg.gioi_han[0] && tb <= cfg.gioi_han[1] };
    },
    muc(cfg, d, da) {
      const n = d.A.length, dc = cfg.dung_sai, p = PL(cfg), dv = cfg.don_vi_ham_luong || 'mg/ml', f = [];
      for (let i = 0; i < n; i++) {
        f.push({ key: 'hl' + i, type: 'num', label: `Lần ${i + 1} – hàm lượng`, unit: dv, ans: da.ham[i], tol: { rel: dc.ham_luong_mg_ml_tuong_doi }, dp: 2 });
        f.push({ key: 'pc' + i, type: 'num', label: `Lần ${i + 1} – % so với nhãn`, unit: '%', min: 0, max: 200, ans: da.pc[i], tol: { abs: dc.phan_tram_nhan_tuyet_doi }, dp: 2 });
      }
      f.push({ key: 'tb', type: 'num', label: 'Trung bình % so với nhãn', unit: '%', min: 0, max: 200, ans: da.tb, tol: { abs: dc.phan_tram_nhan_tuyet_doi }, dp: 2 });
      f.push({ key: 'sd', type: 'num', label: 'Độ lệch chuẩn SD', unit: '%', ans: da.sd, check: x => Math.abs(x - da.sd) <= Math.max(dc.RSD_tuyet_doi, 0.02 * da.sd) + 1e-9, dp: 3 });
      f.push({ key: 'rsd', type: 'num', label: 'RSD', unit: '%', ans: da.rsd, tol: { abs: dc.RSD_tuyet_doi }, dp: 2 });
      const tCuoi = p.V_cuoi !== 100 ? String.raw`\times\frac{${p.V_cuoi}}{100}` : '';
      return [{
        id: cfg.id, so: cfg.so, title: cfg.tieu_de, nguon: cfg.nguon, fields: f,
        layout: F => `<p>${esc(cfg.mo_ta || '')}</p><p>Tự tính hàm lượng và % so với nhãn cho từng lần, rồi tính trung bình, SD và RSD.</p>
          <div class="tbl-wrap"><table class="rt"><thead><tr><th>Lần</th><th class="r">V lấy (ml)</th><th class="r">A</th><th class="r">Hàm lượng (${esc(dv)})</th><th class="r">% so với nhãn (%)</th></tr></thead><tbody>
          ${d.A.map((a, i) => `<tr><td data-label="Lần"><b>${i + 1}</b></td><td class="r" data-label="V lấy (ml)">${fmt(d.V, 1)}</td><td class="r" data-label="A">${fmt(a, 3)}</td>
            <td class="r" data-label="Hàm lượng (${esc(dv)})">${F.cell('hl' + i)}</td><td class="r" data-label="% so với nhãn (%)">${F.cell('pc' + i)}</td></tr>`).join('')}
          </tbody></table></div>${F.field('tb')}${F.field('sd')}${F.field('rsd')}`,
        after: () => {
          let s = H('Công thức tổng quát') + (cfg.cong_thuc_tex || []).map(t => CTn(t.ten, t.tex)).join('') + H('Thay số');
          d.A.forEach((a, i) => {
            s += `<div class="ct-name">Lần ${i + 1}</div>` + CT(String.raw`C_${i + 1} = \frac{${tx(a, 3)}}{${cfg.A1}}\times\frac{${p.V_dinh_muc}}{${p.V_hut}}${tCuoi}\times\frac{1000}{${tx(d.V, 1)}} = ${tx(da.ham[i])}\ \text{${dv}}`)
              + CT(String.raw`\%_${i + 1} = \frac{${tx(da.ham[i])}}{${tx(cfg.C_nhan, cfg.C_nhan % 1 ? 1 : 0)}}\times 100 = ${tx(da.pc[i])}\ \%`);
          });
          s += `<div class="ct-name">Trung bình, SD, RSD</div>` + CT(String.raw`\bar{x} = \frac{${da.pc.map(x => tx(x)).join('+')}}{${n}} = ${tx(da.tb)}\ \%`)
            + CT(String.raw`SD = \sqrt{\frac{${da.pc.map(x => String.raw`\left(${tx(x)}-${tx(da.tb)}\right)^2`).join('+')}}{${n}-1}} = ${tx(da.sd, 3)}`)
            + CT(String.raw`RSD\,(\%) = \frac{${tx(da.sd, 3)}}{${tx(da.tb)}}\times 100 = ${tx(da.rsd)}\ \%`)
            + `<p class="small">RSD chỉ để báo cáo; phần này chấm phép tính đúng/sai.</p>`;
          return solBox(s);
        }
      }];
    },
    ketLuan(cfg, d, da, ctx) {
      const f1 = x => Number.isFinite(x) ? fmt(x, 1) : '…';
      return [{ key: cfg.khoa_ket_luan, label: cfg.nhan_ket_luan, dat: da.dat, phieu: cfg.phieu, loai: 'dinh_luong',
        giaiThich: `trung bình ${d.A.length} lần = ${fmt(da.tb)} % (yêu cầu ${fmt(cfg.gioi_han[0], 1)}–${fmt(cfg.gioi_han[1], 1)} %) → ${da.dat ? 'Đạt' : 'Không đạt'}. ${cfg.ket_luan_text || ''}`,
        phieuKQ: dat => {
          const pc = d.A.map((_, i) => ctx.sv(cfg.id, 'pc' + i)), tb = ctx.sv(cfg.id, 'tb'), rsd = ctx.sv(cfg.id, 'rsd');
          return { kq: `${dat ? 'Đạt' : 'Không đạt'} (${f1(tb)} %)`, sub: `(${pc.map(f1).join('; ')} %; RSD ${Number.isFinite(rsd) ? fmt(rsd, 2) : '…'} %)` };
        } }];
    },
    gv(cfg, d, da) {
      return `<p><b>${esc(cfg.nhan_ket_luan)}:</b> V = ${fmt(d.V, 1)} ml; A = ${d.A.map(a => fmt(a, 3)).join('; ')} → hàm lượng ${da.ham.map(x => fmt(x)).join('; ')} ${esc(cfg.don_vi_ham_luong || 'mg/ml')}; % nhãn ${da.pc.map(x => fmt(x)).join('; ')}; TB ${fmt(da.tb)} %; SD ${fmt(da.sd, 3)}; RSD ${fmt(da.rsd)} % → ${da.dat ? 'Đạt' : 'Không đạt'}.</p>`;
    },
    soSanh(cfg, d, da, kq, num, str) {
      if (!kq.ham_luong_mg_ml) return;
      kq.ham_luong_mg_ml.forEach((x, i) => num(`Hàm lượng lần ${i + 1} (mg/ml)`, da.ham[i], x));
      kq.phan_tram_nhan.forEach((x, i) => num(`% so với nhãn lần ${i + 1}`, da.pc[i], x));
      num('Trung bình (%)', da.tb, kq.trung_binh); num('SD', da.sd, kq.SD, 0.00051, 3); num('RSD (%)', da.rsd, kq.RSD);
      str('Kết luận định lượng', da.dat ? 'Đạt' : 'Không đạt', kq.ket_luan);
    }
  };
})(window.PKN);
