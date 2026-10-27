/* KIỂM THỬ TỰ ĐỘNG (tùy chọn, cho người phát triển)
   Cần Node.js và Playwright:  npm i -D playwright && npx playwright install chromium
   Chạy:  node tools/kiem-thu/kiem-thu.js
   Kiểm tra: mọi lô kiểm thử khớp ket_qua_dung; làm hết 4 chặng cho mọi chuyên luận; không cuộn ngang ở 360–1440 px;
   không có placeholder trong ô số; không có chuỗi cấm. */
const path = require('path');
const { chromium } = require('playwright');
const URL = 'file://' + path.resolve(__dirname, '../../index.html').replace(/\\/g, '/');
const CAM = ['bao phim', '50 mg/1 ml', '25 mg/1 ml', 'BỘ Y TẾ', 'Viện Kiểm nghiệm', 'mức điểm', 'thang điểm'];
let loi = 0; const bao = (ok, msg) => { console.log((ok ? '  ✓ ' : '  ✗ ') + msg); if (!ok) loi++; };

async function lamHet(p, hsId, saiId) {
  await p.evaluate(({ hsId, saiId }) => {
    const A = PKN.app; A.setInfo({ ho_ten: 'Kiểm thử', lop: 'A0', to: '1', ma_sv: '000' }); A.nhanMau(hsId); A.render();
    for (const k of [1, 2, 3, 4]) {
      A.VIEW = k; A.render();
      for (let n = 0; n < 60; n++) {
        const it = A.CTX.stages[k].find(x => !(A.S.ans[x.id] && A.S.ans[x.id].nop)); if (!it) break;
        const fid = key => `f-${it.id}-${key}`.replace(/[^\w-]/g, '_'), sai = it.id === saiId;
        for (const f of it.fields) {
          if (f.type === 'num') document.getElementById(fid(f.key)).value = String(+(+f.ans).toFixed(f.dp ?? 2) + (sai ? 1 : 0)).replace('.', ',');
          else { const ins = [...document.querySelectorAll(`input[name="${fid(f.key)}"]`)]; const want = f.type === 'check' ? f.ans : [String(f.ans || ins[0].value)];
            ins.forEach(i => { i.checked = sai ? (i === ins.find(x => !want.includes(x.value))) : want.includes(i.value); }); }
        }
        document.querySelector(`[data-nop="${it.id}"]`).click();
      }
    }
  }, { hsId, saiId });
}

(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.evaluate(() => localStorage.clear()); await p.goto(URL);
  const ds = await p.evaluate(() => ({ hs: PKN.app.HO_SO().map(h => h.id), loi: PKN.loiNap }));
  console.log('Chuyên luận đã nạp:', ds.hs.join(', '), ds.loi.length ? '| LỖI NẠP: ' + ds.loi.join(' / ') : '');
  console.log('1. parseSo và tính lặp lại');
  bao(await p.evaluate(() => PKN.app.parseSo('0,431') === 0.431 && PKN.app.parseSo('0.431') === 0.431), 'parseSo("0,431") = parseSo("0.431")');
  console.log('2. Lô kiểm thử');
  const lots = await p.evaluate(() => PKN.app.HO_SO().flatMap(h => (h.lo_kiem_thu || []).map(l => l.ma_lo)));
  for (const ma of lots) {
    const r = await p.evaluate(ma => { const A = PKN.app, hs = A.HO_SO().find(h => h.lo_kiem_thu.some(l => l.ma_lo === ma)); A.nhanMau(hs.id, ma, ma); const rows = A.soSanhKT(A.CTX); return { n: rows.length, lech: rows.filter(x => !x.ok).map(x => `${x.name}: ${x.app} ≠ ${x.exp}`) }; }, ma);
    bao(r.n > 0 && !r.lech.length, `${ma} (${r.n} đại lượng)${r.lech.length ? ' – ' + r.lech.join('; ') : ''}`);
  }
  console.log('3. Làm hết 4 chặng (cố tình sai 1 mục ở chặng 1)');
  for (const id of ds.hs) {
    await lamHet(p, id, await p.evaluate(id => PKN.app.HO_SO().find(h => h.id === id).chang_1_tiep_nhan[1].id, id));
    const st = await p.evaluate(() => [1, 2, 3, 4].map(k => PKN.app.stageDone(k)));
    const kq = await p.evaluate(() => (document.getElementById('kq-text') || {}).value || '');
    bao(st.every(Boolean) && /1\/\d+|\d+\/\d+/.test(kq), `${id}: hoàn thành ${st.filter(Boolean).length}/4 chặng, có phiếu kết quả`);
  }
  console.log('4. Bề rộng màn hình, ô số, chuỗi cấm');
  for (const W of [360, 390, 768, 1024, 1440]) {
    await p.setViewportSize({ width: W, height: 800 });
    const r = await p.evaluate(() => {
      const A = PKN.app, out = [], txt = []; A.GV.boKhoa = true;
      for (const h of A.HO_SO()) { A.nhanMau(h.id); for (const k of [0, 1, 2, 3, 4]) { A.VIEW = k; A.render(); txt.push(document.body.innerText);
        if (document.documentElement.scrollWidth > innerWidth) out.push(`${h.id} chặng ${k}: ${document.documentElement.scrollWidth}px`);
        if (document.querySelectorAll('input.num[placeholder]').length) out.push(`${h.id} chặng ${k}: ô số có placeholder`); } }
      A.GV.boKhoa = false; return { out, txt: txt.join('\n') };
    });
    bao(!r.out.length, `${W}px ${r.out.join('; ')}`);
    if (W === 1440) CAM.forEach(w => bao(!r.txt.includes(w), `không có "${w}"`));
  }
  bao(!errs.length, 'không có lỗi JavaScript ' + errs.join(' | '));
  await b.close();
  console.log(loi ? `\nCÓ ${loi} LỖI` : '\nTẤT CẢ ĐẠT');
  process.exit(loi ? 1 : 0);
})();
