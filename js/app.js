/* ==========================================================================
   PHÒNG KIỂM NGHIỆM DƯỢC PHẨM – giao diện chính
   Không gọi dịch vụ AI nào. Nội dung chuyên môn lấy từ data/ (nạp sẵn qua thẻ <script>).
   ========================================================================== */
(function (P) {
  'use strict';
  const U = P.U, { $, $$, esc, store, parseSo, fmt, dpOf, rngFrom, shuffled, pickW, uni, todayISO, parseISO, fmtDate, addDays, addMonths,
    giaiThichHTML, nguonHTML, qdcHTML, solBox, LET, DAT_KD, unitOf, stripUnit } = U;
  const C = () => P.chung;
  const STAGE_NAMES = ['Chọn mẫu', 'Chặng 1: Tra cứu DĐVN V', 'Chặng 2: Pha hóa chất', 'Chặng 3: Thực nghiệm', 'Chặng 4: Phiếu kiểm nghiệm'];
  const CHUNG_OPTS = [{ v: 'dat', t: 'Mẫu đạt yêu cầu chất lượng về các chỉ tiêu đã kiểm nghiệm' }, { v: 'kd', t: 'Mẫu không đạt yêu cầu chất lượng' }];
  const K = { info: 'pkn-info', sess: 'pkn-session', xao: 'pkn-xao' };

  /* ---------- hồ sơ và mã lô ---------- */
  let HO_SO = [];                     // chỉ các hồ sơ hợp lệ
  const HS = id => HO_SO.find(h => h.id === id);
  const tienTo = hs => hs.tien_to_ma_lo || hs.id;
  const CODE_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  function newMaLo(hs) { let c = ''; for (let i = 0; i < 6; i++) c += CODE_ABC[Math.floor(Math.random() * 32)]; return tienTo(hs) + '-' + c; }
  function hoSoTuMa(ma) {
    for (const hs of HO_SO) { if ((hs.lo_kiem_thu || []).some(l => l.ma_lo === ma)) return hs.id; }
    for (const hs of HO_SO) { if (ma.startsWith(tienTo(hs) + '-')) return hs.id; }
    return null;
  }

  function genMeta(ma, ngayISO) {
    const r = rngFrom(ma + '|meta'), nhan = parseISO(ngayISO);
    const nsx = addDays(nhan, -Math.floor(uni(r, 45, 330))), hd = addMonths(nsx, 36);
    const noiSX = ['Công ty Dược phẩm X', 'Công ty Dược phẩm Y', 'Công ty Dược phẩm Z'][Math.floor(r() * 3)];
    const soLo = String(nsx.getMonth() + 1).padStart(2, '0') + String(nsx.getFullYear()).slice(2) + String(Math.floor(uni(r, 10, 99)));
    const sdk = 'VD-' + String(Math.floor(uni(r, 10000, 99999))) + '-' + String(Math.floor(uni(r, 19, 26)));
    return { ngayNhan: fmtDate(nhan), nsx: fmtDate(nsx), hd: fmtDate(hd), noiSX, soLo, sdk };
  }

  /* ---------- xáo thứ tự lựa chọn ---------- */
  const xaoOn = () => store.get(K.xao, true) !== false;
  const permFor = (ctx, key, n) => xaoOn() ? shuffled(rngFrom(ctx.sess.ma + '|perm|' + key), n) : [...Array(n).keys()];

  /* ==========================================================================
     NGỮ CẢNH LÔ
     ========================================================================== */
  function buildCtx(sess) {
    const hs = HS(sess.hs) || P.hoSo.find(h => h.id === sess.hs);
    const kt = sess.kt ? (hs.lo_kiem_thu || []).find(l => l.ma_lo === sess.kt) : null;
    const kieu = P.kieu[hs.chang_3_thuc_nghiem && hs.chang_3_thuc_nghiem.kieu];
    if (!kieu) throw new Error(`Chưa có kiểu chặng 3 "${hs.chang_3_thuc_nghiem && hs.chang_3_thuc_nghiem.kieu}" (thư mục js/kieu/).`);
    const plan = kieu(hs);
    const ctx = { sess, hs, kt, plan, meta: genMeta(sess.ma, sess.ngay), rng: key => rngFrom(sess.ma + '|' + key), sv: svValFor(sess) };
    ctx.kb = (!kt && plan.kichBanLo) ? pickW(rngFrom(sess.ma + '|kich-ban-lo'), plan.kichBanLo) : null;
    ctx.khoi = plan.khoi.map(k => {
      const B = P.khoi[k.loai]; if (!B) throw new Error(`Chưa có khối thử "${k.loai}" (thư mục js/khoi/).`);
      const data = B.sinh ? B.sinh(k.cfg, ctx) : {};
      const da = B.dapAn ? B.dapAn(k.cfg, data, ctx) : {};
      return { B, cfg: k.cfg, data, da };
    });
    ctx.ketLuan = ctx.khoi.flatMap(x => x.B.ketLuan ? x.B.ketLuan(x.cfg, x.data, x.da, ctx) : []);
    ctx.chungDat = ctx.ketLuan.every(e => e.dat);
    ctx.stages = buildStages(ctx);
    return ctx;
  }
  function svValFor(sess) { return (id, key) => { const r = sess.ans && sess.ans[id]; return r && r.vals ? r.vals[key] : undefined; }; }

  /* ==========================================================================
     MỤC CHẶNG 1, 2, 4 (theo dữ liệu)
     ========================================================================== */
  function itemC1(ctx, q, i) {
    const it = { id: q.id, so: '1.' + (i + 1), title: q.hoi, nguon: q.nguon };
    if (q.loai === 'chon_mot' || q.loai === 'chon_nhieu') {
      const opts = permFor(ctx, q.id, q.lua_chon.length).map(k => ({ v: String(k), t: q.lua_chon[k] }));
      it.fields = [q.loai === 'chon_mot' ? { key: 'chon', type: 'radio', label: 'đáp án', opts, ans: String(q.dap_an) }
        : { key: 'chon', type: 'check', label: 'đáp án', opts, ans: q.dap_an.map(String), note: 'Chọn tất cả phương án đúng.' }];
    } else if (q.loai === 'chon_mot_theo_kltb') {
      /* Cho khối lượng trung bình ngẫu nhiên theo mã lô, hỏi giới hạn % chênh lệch theo bảng giới hạn */
      const kltb = q.kltb_mg[Math.floor(rngFrom(ctx.sess.ma + '|' + q.id)() * q.kltb_mg.length)];
      const p = P.khoi.dong_deu_khoi_luong.gioiHanPhanTram(kltb, q.bang_gioi_han);
      it.title = q.hoi.replace('{kltb}', fmt(kltb, kltb % 1 ? 1 : 0));
      const opts = permFor(ctx, q.id, q.lua_chon_phan_tram.length).map(k => ({ v: String(k), t: `± ${fmt(q.lua_chon_phan_tram[k], q.lua_chon_phan_tram[k] % 1 ? 1 : 0)} %` }));
      it.fields = [{ key: 'chon', type: 'radio', label: 'đáp án', opts, ans: String(q.lua_chon_phan_tram.indexOf(p)) }];
    } else if (q.loai === 'nhap_so') {
      it.fields = [{ key: 'x', type: 'num', label: 'Đáp án', unit: q.don_vi, int: q.dung_sai_tuyet_doi === 0 && Number.isInteger(q.dap_an), ans: q.dap_an, tol: { abs: q.dung_sai_tuyet_doi }, dp: dpOf(q.dap_an) }];
    } else if (q.loai === 'nhap_khoang') {
      const u = q.don_vi || (/nm/.test(q.hoi) ? 'nm' : '');
      it.fields = [{ key: 'min', type: 'num', label: 'Giá trị nhỏ nhất', unit: u, ans: q.dap_an_min, tol: { abs: q.dung_sai_tuyet_doi || 0 }, dp: dpOf(q.dap_an_min) },
        { key: 'max', type: 'num', label: 'Giá trị lớn nhất', unit: u, ans: q.dap_an_max, tol: { abs: q.dung_sai_tuyet_doi || 0 }, dp: dpOf(q.dap_an_max) }];
    } else it.fields = [];
    it.after = () => giaiThichHTML(q.giai_thich) + nguonHTML(q.nguon);
    return it;
  }
  function itemsC2(ctx, h, j, n) {
    const grp = `<div class="grp"><p class="eyebrow">Thuốc thử ${j + 1}/${n}</p><h3>${esc(h.ten_trong_chuyen_luan)}</h3><p><b>Dùng ở:</b> ${esc(h.dung_o)}</p></div>`;
    const pa = permFor(ctx, h.id + '-a', h.tra_o.lua_chon.length), pb = permFor(ctx, h.id + '-b', h.cach_pha.lua_chon.length);
    const tt = h.tinh_toan, bv = tt.bien_V, V = bv[Math.floor(rngFrom(ctx.sess.ma + '|' + h.id + '|V')() * bv.length)];
    const ans = tt.dap_an_theo_V[String(V)], hoi = tt.hoi.replace(/\{V\}/g, fmt(V, 0));
    const fields = Array.isArray(ans)
      ? ans.map((a, k) => ({ key: 'x' + k, type: 'num', label: stripUnit(tt.nhan_dap_an[k]), unit: unitOf(tt.nhan_dap_an[k]) || tt.don_vi || '', ans: a, tol: { rel: tt.dung_sai_tuong_doi }, dp: dpOf(a) }))
      : [{ key: 'x0', type: 'num', label: 'Lượng cần lấy', unit: tt.don_vi, ans, tol: { rel: tt.dung_sai_tuong_doi }, dp: Math.max(dpOf(ans), 1) }];
    return [
      { id: h.id + '-a', so: `2.${j + 1}a`, title: 'Tra ở đâu?', group: grp, nguon: '',
        head: () => `<p>Tên trong chuyên luận: <b>${esc(h.ten_trong_chuyen_luan)}</b>. Cách pha của thuốc thử này được ghi ở đâu trong DĐVN V?</p>`,
        fields: [{ key: 'chon', type: 'radio', label: 'đáp án', opts: pa.map(k => ({ v: String(k), t: h.tra_o.lua_chon[k] })), ans: String(h.tra_o.dap_an) }],
        after: () => giaiThichHTML(h.tra_o.giai_thich) + qdcHTML('QDC-28') },
      { id: h.id + '-b', so: `2.${j + 1}b`, title: 'Cách pha theo DĐVN', nguon: h.cach_pha.nguon,
        head: () => `<p>Chọn cách pha <b>${esc(h.ten_trong_chuyen_luan)}</b> đúng theo DĐVN V.</p>`,
        fields: [{ key: 'chon', type: 'radio', label: 'đáp án', opts: pb.map(k => ({ v: String(k), t: h.cach_pha.lua_chon[k] })), ans: String(h.cach_pha.dap_an) }],
        after: () => giaiThichHTML(h.cach_pha.giai_thich) + nguonHTML(h.cach_pha.nguon) },
      { id: h.id + '-c', so: `2.${j + 1}c`, title: 'Tính lượng hóa chất thực tế cần lấy', nguon: h.cach_pha.nguon,
        head: () => `<p>${esc(hoi)}</p>`, fields, V,
        after: () => solBox(`<p>${esc(tt.loi_giai)}</p><p><b>Đáp án với V = ${fmt(V, 0)} ml:</b> ${fields.map(f => `${f.label === 'Lượng cần lấy' ? '' : esc(f.label) + ': '}${fmt(f.ans, f.dp)} ${esc(f.unit)}`).join('; ')}</p>`)
          + (h.ghi_chu ? `<div class="fb info"><b>Ghi chú:</b> ${esc(h.ghi_chu)}</div>` : '') }
    ];
  }
  /* Thám tử sai số: thẻ "chon_mot" (trắc nghiệm, có chấm) hoặc "tra_loi_ngan" (câu hỏi mở, chỉ ghi nhận câu trả lời). */
  function itemThe(ctx, c, i, n) {
    const head = () => `<div class="bailam"><p class="eyebrow" style="color:#8a5a00">Bài làm cần soi lỗi</p><p>${esc(c.bai_lam)}</p></div>`;
    const base = { id: c.id, so: `4.1.${i + 1}`, title: `Thám tử sai số – thẻ ${i + 1}/${n}`, nguon: c.nguon };
    if (c.loai === 'tra_loi_ngan') return Object.assign(base, { khongCham: true,
      head: () => head() + `<p>${esc(c.hoi || 'Bạn nhận xét gì về cách làm hoặc kết luận này?')}</p>`,
      fields: [{ key: 'tl', type: 'text', label: 'Câu trả lời của bạn', ans: c.tham_khao_gv || '', khongCham: true }],
      after: () => `<div class="fb info">Đã ghi nhận câu trả lời. Đây là câu hỏi mở, không chấm đúng/sai; câu trả lời được đưa vào phiếu kết quả luyện tập để giảng viên xem.</div>` });
    const perm = permFor(ctx, c.id, c.lua_chon.length);
    return Object.assign(base, {
      head: () => head() + `<p>${esc(c.hoi || 'Nhận định nào đúng?')}</p>`,
      fields: [{ key: 'chon', type: 'radio', label: 'nhận định', opts: perm.map(k => ({ v: String(k), t: c.lua_chon[k] })), ans: String(c.dap_an) }],
      after: () => giaiThichHTML(c.giai_thich) + nguonHTML(c.nguon) });
  }
  /* Rút gọn bộ thẻ theo the_loi_so_cau (ví dụ 3 trắc nghiệm + 1 trả lời ngắn), chọn ngẫu nhiên theo mã lô.
     Hồ sơ chưa khai báo the_loi_so_cau thì hiện toàn bộ ngân hàng (dùng cho bản demo để rà soát). */
  function chonThe(ctx, all) {
    const cfg = ctx.hs.the_loi_so_cau;
    if (!cfg) return all;
    const r = rngFrom(ctx.sess.ma + '|the-loi'), lay = (ds, n) => shuffled(r, ds.length).slice(0, Math.min(n || 0, ds.length)).sort((a, b) => a - b).map(k => ds[k]);
    return [...lay(all.filter(c => c.loai !== 'tra_loi_ngan'), cfg.chon_mot), ...lay(all.filter(c => c.loai === 'tra_loi_ngan'), cfg.tra_loi_ngan)];
  }
  function itemKetLuan(ctx) {
    const E = ctx.ketLuan, plan = ctx.plan;
    if (!E.length) return null;
    return { id: plan.idKetLuan, so: plan.soKetLuan, title: 'Đánh giá và kết luận chất lượng từng chỉ tiêu', nguon: plan.nguonKetLuan,
      fields: [...E.map(e => ({ key: e.key, type: 'radio', label: e.label, inline: true, opts: DAT_KD, ans: e.dat ? 'dat' : 'kd' })),
        { key: 'chung', type: 'radio', label: 'Kết luận chung', opts: CHUNG_OPTS, ans: ctx.chungDat ? 'dat' : 'kd' }],
      after: () => `<div class="fb info">${E.map(e => `<p><b>${esc(e.label)}:</b> ${esc(e.giaiThich)}</p>`).join('')}<p><b>Quy tắc kết luận:</b> ${esc(C().phieu_kiem_nghiem_mau.quy_tac_ket_luan)}</p></div>` };
  }
  function buildStages(ctx) {
    const hs = ctx.hs, st = [[]];
    st[1] = (hs.chang_1_tiep_nhan || []).map((q, i) => itemC1(ctx, q, i));
    st[2] = []; (hs.chang_2_hoa_chat || []).forEach((h, j, a) => st[2].push(...itemsC2(ctx, h, j, a.length)));
    st[3] = ctx.khoi.flatMap(x => x.B.muc(x.cfg, x.data, x.da, ctx));
    const kl = itemKetLuan(ctx); if (kl) st[3].push(kl);
    st[3].forEach((it, i) => { if (!it.so) it.so = '3.' + (i + 1); });
    st[4] = chonThe(ctx, hs.chang_4_the_loi || []).map((c, i, a) => itemThe(ctx, c, i, a.length));
    st[4].push(itemPhieu(ctx));
    return st;
  }

  /* ==========================================================================
     CHẤM
     ========================================================================== */
  function fieldOK(f, v) {
    if (v == null) return false;
    if (f.type === 'num') {
      if (!Number.isFinite(v)) return false;
      if (f.check) return f.check(v);
      if (f.tol && f.tol.rel != null) return Math.abs(v - f.ans) <= f.tol.rel * Math.abs(f.ans) + 1e-9;
      return Math.abs(v - f.ans) <= ((f.tol && f.tol.abs) || 0) + 1e-9;
    }
    if (f.type === 'radio') return String(v) === String(f.ans);
    if (f.type === 'check') return [...v].map(String).sort().join('|') === [...f.ans].map(String).sort().join('|');
    if (f.type === 'text') return true;
    return false;
  }
  /* Ô có khongCham (SD, RSD, câu trả lời ngắn): vẫn tính và hiện giá trị đúng để đối chiếu, nhưng không ảnh hưởng đúng/sai của mục */
  function gradeItem(it, vals) {
    if (it.grade) return it.grade(vals);
    const marks = {}; let ok = true;
    for (const f of it.fields) { marks[f.key] = fieldOK(f, vals[f.key]); if (!f.khongCham) ok = ok && marks[f.key]; }
    return { ok, marks };
  }
  function ansText(f) {
    if (f.type === 'text') return f.ans || '';
    if (f.type === 'num') return `${fmt(f.ans, f.dp ?? 2)}${f.unit ? ' ' + f.unit : ''}`;
    if (f.type === 'radio') { const k = f.opts.findIndex(o => o.v === String(f.ans)), o = f.opts[k]; return o ? (f.opts.length > 2 && !f.inline ? `${LET[k]}. ${o.t}` : o.t) : ''; }
    if (f.type === 'check') return f.opts.map((o, k) => f.ans.includes(o.v) ? LET[k] + '. ' + o.t : null).filter(Boolean).join('; ');
    return '';
  }

  /* ==========================================================================
     TRẠNG THÁI
     ========================================================================== */
  let S = store.get(K.sess, null);           // {hs, ma, ngay, kt, ans:{}, view, pk:{}}
  let INFO = store.get(K.info, { ho_ten: '', lop: '', to: '', ma_sv: '' });
  let VIEW = 0, CTX = null, FLASH = null;
  const GV = { open: false, unlocked: false, boKhoa: false, msg: '' };
  let EDIT_INFO = !(INFO.ho_ten && INFO.lop && INFO.to && INFO.ma_sv);
  const saveS = () => { if (S) { S.view = VIEW; store.set(K.sess, S); } };
  const rec = id => (S && S.ans[id]) || null;
  const nop = id => !!(rec(id) && rec(id).nop);
  const svVal = (id, key) => { const r = rec(id); return r && r.vals ? r.vals[key] : undefined; };
  function ensureCtx() {
    if (S && !HS(S.hs)) { S = null; store.del(K.sess); }
    try { CTX = S ? buildCtx(S) : null; } catch (e) { console.error(e); S = null; CTX = null; store.del(K.sess); }
    return CTX;
  }
  const stageDone = k => !!(CTX && CTX.stages[k] && CTX.stages[k].length && CTX.stages[k].every(it => nop(it.id)));
  function stageUnlocked(k) {
    if (k === 0) return true;
    if (!S) return false;
    if (GV.boKhoa) return true;
    for (let j = 1; j < k; j++) if (!stageDone(j)) return false;
    return true;
  }
  function visibleItems(k) {
    const items = CTX.stages[k], out = [];
    for (let i = 0; i < items.length; i++) { if (i === 0 || nop(items[i - 1].id) || GV.boKhoa) out.push(items[i]); else break; }
    return out;
  }

  /* ==========================================================================
     VẼ Ô NHẬP VÀ MỤC
     ========================================================================== */
  const fidOf = (id, k) => `f-${id}-${k}`.replace(/[^\w-]/g, '_');
  const mkHTML = ok => ok ? '<span class="mk ok" aria-label="đúng">✓</span>' : '<span class="mk bad" aria-label="sai">✗</span>';
  function makeF(it, vals, isNop, res) {
    const fid = k => fidOf(it.id, k), byKey = k => it.fields.find(f => f.key === k);
    const numInput = (f, lbl) => `<input id="${fid(f.key)}" class="num" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" ${lbl ? `aria-label="${esc(lbl)}"` : ''} value="${esc(vals['_raw_' + f.key] ?? '')}" ${isNop ? 'disabled' : ''}>`;
    const after = f => !isNop ? '' : f.khongCham
      ? `<span class="ans ans-ref">Không chấm. Giá trị tính đúng: ${esc(ansText(f))}</span>`
      : mkHTML(res.marks[f.key]) + (res.marks[f.key] ? '' : `<span class="ans">Đáp án đúng: ${esc(ansText(f))}</span>`);
    const txt = f => esc(vals[f.key] ?? '');
    return {
      /* ô điền chữ ngắn nằm trong câu (dùng ở phần kết luận phiếu kiểm nghiệm) */
      blank(k) { const f = byKey(k), lock = isNop && !(f.editableAfter && f.editableAfter()); return `<input type="text" class="blank" id="${fid(k)}" data-blank="${esc(k)}" aria-label="${esc(f.label)}" autocomplete="off" value="${txt(f)}" ${lock ? 'disabled' : ''}>`; },
      cell(k) { const f = byKey(k); return `<div class="cell">${numInput(f, f.label + (f.unit ? ' (' + f.unit + ')' : ''))}${after(f)}</div><div class="nf-err" id="${fid(k)}-err"></div>`; },
      field(k) {
        const f = byKey(k);
        if (f.type === 'text') return `<div class="nf"><label for="${fid(k)}">${esc(f.label)}</label><textarea id="${fid(k)}" class="tl" rows="3" ${isNop ? 'disabled' : ''}>${txt(f)}</textarea><div class="nf-err" id="${fid(k)}-err"></div></div>`;
        if (f.type === 'num') return `<div class="nf"><label for="${fid(k)}">${esc(f.label)}</label><div class="nf-row">${numInput(f)}${f.unit ? `<span class="unit">${esc(f.unit)}</span>` : ''}${after(f)}</div>
          ${isNop ? '' : `<div class="nf-hint">${f.int ? 'Nhập số nguyên' : 'Chấp nhận cả dấu phẩy và dấu chấm thập phân'}</div>`}<div class="nf-err" id="${fid(k)}-err"></div></div>`;
        const multi = f.type === 'check', name = fid(k), val = vals[k], locked = isNop && !(f.editableAfter && f.editableAfter());
        const optsHTML = f.opts.map((o, j) => {
          const checked = multi ? (Array.isArray(val) && val.includes(o.v)) : String(val) === o.v;
          let cls = '', mark = '';
          if (isNop && !f.noMark) {
            const isAns = multi ? f.ans.includes(o.v) : String(f.ans) === o.v;
            if (isAns) { cls = 'is-ans'; mark = checked ? mkHTML(true) : '<span class="mk ok small">đáp án</span>'; }
            else if (checked) { cls = 'is-wrong'; mark = mkHTML(false); }
          }
          const pre = f.opts.length > 2 && !f.inline ? `<b>${LET[j]}.</b> ` : '';
          return `<label class="opt ${cls}"><input type="${multi ? 'checkbox' : 'radio'}" name="${name}" value="${esc(o.v)}" ${checked ? 'checked' : ''} ${locked ? 'disabled' : ''}><span>${pre}${esc(o.t)}</span>${mark}</label>`;
        }).join('');
        const showLbl = f.label && !f.hideLabel && f.label !== 'đáp án' && f.label !== 'nhận định';
        return `<fieldset class="nf" style="border:0;padding:0;margin:12px 0"><legend class="fl ${showLbl ? '' : 'sr-only'}">${esc(showLbl ? f.label : 'Chọn ' + f.label)}</legend>${f.note ? `<p class="small">${esc(f.note)}</p>` : ''}
          <div class="opts ${f.inline ? 'inline-opts' : ''}" id="${name}">${optsHTML}</div><div class="nf-err" id="${name}-err"></div></fieldset>`;
      }
    };
  }
  function renderItem(it) {
    const r = rec(it.id), isNop = !!(r && r.nop), vals = (r && r.vals) || {};
    const res = isNop ? gradeItem(it, vals) : null, F = makeF(it, vals, isNop, res);
    const body = (it.head ? it.head(isNop, vals, res) : '') + (it.layout ? it.layout(F, isNop, vals, res) : it.fields.map(f => F.field(f.key)).join(''));
    const fl = FLASH && FLASH.id === it.id ? FLASH : null;
    const badge = !isNop ? '' : it.khongCham ? '<span class="badge info">Đã ghi nhận</span>' : `<span class="badge ${res.ok ? 'ok' : 'bad'}">${res.ok ? '✓ Đúng' : '✗ Chưa đúng'}</span>`;
    return `${it.group || ''}<article class="item ${isNop ? 'is-done' : ''}" id="it-${esc(it.id)}">
      <header class="item-h"><span class="item-so">Mục ${esc(it.so)}</span><h3>${esc(it.title)}</h3>${badge}</header>
      <div class="item-b">${body}</div>
      <div class="item-f">${isNop ? '' : `<div class="actions"><button type="button" class="primary" data-nop="${esc(it.id)}">Nộp</button></div>`}
        <div class="nop-msg ${fl ? fl.cls : ''}" id="msg-${esc(it.id)}" role="status" aria-live="polite">${fl ? fl.html : ''}</div></div>
      ${isNop && it.after ? `<div class="after">${it.after(vals, res)}</div>` : ''}</article>`;
  }
  function collect(it) {
    const vals = {}, miss = [], bad = [];
    for (const f of it.fields) {
      const fid = fidOf(it.id, f.key), errEl = document.getElementById(fid + '-err');
      if (errEl) errEl.textContent = '';
      if (f.type === 'num') {
        const el = document.getElementById(fid); if (!el) continue;
        el.classList.remove('invalid');
        const raw = el.value.trim();
        if (!raw) { miss.push(f.label); el.classList.add('invalid'); if (errEl) errEl.textContent = 'Chưa nhập.'; continue; }
        const x = parseSo(raw); let msg = '';
        if (!Number.isFinite(x)) msg = 'Không phải số hợp lệ.';
        else if (f.int && !Number.isInteger(x)) msg = `Phải là số nguyên${f.min != null ? ` từ ${f.min} đến ${f.max}` : ''}.`;
        else if (f.min != null && (x < f.min || x > f.max)) msg = `Phải nằm trong khoảng ${f.min} – ${f.max}.`;
        if (msg) { bad.push(`${f.label}: ${msg.toLowerCase().replace(/\.$/, '')}`); el.classList.add('invalid'); if (errEl) errEl.textContent = msg; continue; }
        vals[f.key] = x; vals['_raw_' + f.key] = raw;
      } else if (f.type === 'text' || f.type === 'blank') {
        const el = document.getElementById(fid); if (!el) continue;
        el.classList.remove('invalid');
        const v = el.value.trim().replace(/\s+/g, ' ');
        const req = f.batBuoc ? f.batBuoc(it.fields.reduce((o, g) => { const e = document.getElementById(fidOf(it.id, g.key)); o[g.key] = e ? e.value.trim() : ''; return o; }, {})) : true;
        if (!v && req) { miss.push(f.label); el.classList.add('invalid'); if (errEl) errEl.textContent = 'Chưa nhập.'; continue; }
        vals[f.key] = v;
      } else {
        const box = document.getElementById(fid); if (box) box.classList.remove('invalid');
        const checked = $$(`input[name="${fid}"]:checked`).map(e => e.value);
        if (!checked.length) { miss.push(f.label === 'đáp án' || f.label === 'nhận định' ? 'chưa chọn ' + f.label : f.label); if (box) box.classList.add('invalid'); if (errEl) errEl.textContent = 'Vui lòng chọn.'; continue; }
        vals[f.key] = f.type === 'check' ? checked : checked[0];
      }
    }
    return { vals, miss, bad };
  }
  function submitItem(id) {
    const k = VIEW, it = CTX.stages[k].find(x => x.id === id);
    if (!it || nop(id)) return;
    const { vals, miss, bad } = collect(it), msg = document.getElementById('msg-' + it.id);
    if (miss.length || bad.length) {
      const parts = [];
      if (miss.length) parts.push(`Còn ${miss.length} ô chưa nhập: ${miss.join(', ')}.`);
      if (bad.length) parts.push(`Ô chưa hợp lệ – ${bad.join('; ')}.`);
      msg.className = 'nop-msg bad'; msg.textContent = 'Chưa nộp được. ' + parts.join(' ');
      return;
    }
    S.ans[id] = { nop: true, vals, t: Date.now() };
    if (it.onSubmit) it.onSubmit(vals);
    saveS(); ensureCtx();
    const items = CTX.stages[k], idx = items.findIndex(x => x.id === id), next = items[idx + 1];
    FLASH = { id, cls: 'ok', html: next ? `Đã nộp mục ${esc(it.so)} ✓ – kéo xuống để làm mục ${esc(next.so)}`
      : (k < 4 ? `Đã nộp mục ${esc(it.so)} ✓ – ${esc(STAGE_NAMES[k])} đã hoàn thành. Kéo xuống để sang chặng tiếp theo.` : `Đã nộp mục ${esc(it.so)} ✓`) };
    render();
    const target = next ? document.getElementById('it-' + next.id) : document.getElementById('stage-end');
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  /* ==========================================================================
     PHIẾU KIỂM NGHIỆM (4.2)
     ========================================================================== */
  const chamCau = t => { t = String(t || '').trim(); return !t || /[.!?…]$/.test(t) ? t : t + '.'; };   // dấu chấm cuối câu ở cột Yêu cầu
  function phieuRows(ctx) {
    const pk = C().phieu_kiem_nghiem_mau;
    const def = ctx.hs.phieu_chi_tieu || (pk.chi_tieu_theo_ho_so || {})[ctx.hs.id] || [];
    return def.map(row => {
      const E = ctx.ketLuan.filter(e => e.phieu === row.ten);
      const chon = E.map(e => ctx.sv(ctx.plan.idKetLuan, e.key) === 'dat');
      const dat = E.map(e => e.dat);
      if (!E.length) return { ten: row.ten, yc: chamCau(row.yeu_cau), kq: '…', khong: false, khongDung: false };
      if (E.every(e => e.loai === 'dinh_tinh')) { const dung = chon.every(Boolean); return { ten: row.ten, yc: chamCau(row.yeu_cau), kq: dung ? 'Đúng' : 'Không đúng', khong: !dung, khongDung: !dat.every(Boolean) }; }
      const e = E[0], d0 = chon[0], p = e.phieuKQ ? e.phieuKQ(d0) : { kq: d0 ? 'Đạt' : 'Không đạt' };
      return { ten: row.ten, yc: chamCau(e.phieuYC ? e.phieuYC(row.yeu_cau) : row.yeu_cau), kq: p.kq, sub: p.sub, khong: !d0, khongDung: !dat[0] };
    });
  }
  function tenMauPhieu(hs) {
    const bt = hs.bien_the && hs.bien_the[0];
    if (!bt) return hs.ten_mau;
    const m = String(bt.nhan).match(/\d+(?:[.,]\d+)?\s*(?:mg|g|%|IU|UI)/i);
    return m && hs.ten_mau.includes(m[0]) ? hs.ten_mau : `${hs.ten_mau}, ${bt.nhan}`;
  }
  function phieuLines(ctx) {
    const pk = C().phieu_kiem_nghiem_mau, m = ctx.meta;
    const vals = [tenMauPhieu(ctx.hs), m.noiSX, `Số lô ${m.soLo} – HD ${m.hd}`, m.sdk, pk.mac_dinh.nguoi_noi_gui_mau, pk.mac_dinh.yeu_cau_kiem_nghiem, m.ngayNhan, ctx.sess.ma,
      `${INFO.ho_ten} – ${INFO.ma_sv} (Lớp ${INFO.lop}, Tổ ${INFO.to})`, 'Dược điển Việt Nam V', pk.mac_dinh.tinh_trang_mau];
    const ed = (S && S.pk && S.pk.lines) || {};
    return pk.dong_thong_tin.map((l, i) => { const fixed = l.nhan === 'Thử theo'; return { nhan: l.nhan, val: fixed ? vals[i] : (ed[i] ?? vals[i]), fixed }; });
  }

  /* ---------- Kết luận điền vào chỗ trống ---------- */
  const boDau = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  const chuanHoa = t => ' ' + boDau(t).replace(/[,;.:&+/()\-–]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  const laKhongDat = t => /^khong\s*dat\b/.test(boDau(t).trim());
  const laDat = t => /^dat\b\.?$/.test(boDau(t).trim().replace(/\.$/, ''));
  /* Kiểm tra ô tên chỉ tiêu: phải có đủ các tên cần có và không có gì khác ngoài từ nối. Trả về {thieu:[], thua:''}. */
  function soKhopChiTieu(text, ten) {
    let t = chuanHoa(text); const thieu = [];
    ten.forEach(n => {
      const v = [chuanHoa(n).trim(), chuanHoa(n).trim().replace(/^do /, '')].filter((x, i, a) => x && a.indexOf(x) === i);
      let co = false; v.forEach(x => { const re = new RegExp(' ' + x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' ', 'g'); if (re.test(t)) { co = true; t = t.replace(re, ' '); } });
      if (!co) thieu.push(n);
    });
    const tuNoi = ((C().phieu_kiem_nghiem_mau.ket_luan_dien || {}).tu_noi || ['và', 'cả', 'các', 'chỉ tiêu', 'gồm', 'về']).map(x => chuanHoa(x).trim());
    tuNoi.sort((a, b) => b.length - a.length).forEach(x => { t = t.replace(new RegExp(' ' + x + '(?= )', 'g'), ' '); });
    t = t.replace(/ [a-e](?= )/g, ' ').trim();
    return { thieu, thua: t };
  }
  function chamKetLuan(ctx, v) {
    const rows = phieuRows(ctx), coKhong = rows.some(r => r.khong), tatCa = rows.map(r => r.ten), khongDat = rows.filter(r => r.khong).map(r => r.ten);
    const loi = [];
    const kqOK = coKhong ? laKhongDat(v.kq) : laDat(v.kq);
    if (!kqOK) loi.push(`Ô kết quả phải là "${coKhong ? 'Không đạt' : 'Đạt'}" theo bảng kết quả ở trên.`);
    const a = soKhopChiTieu(v.ct, tatCa), ctOK = !a.thieu.length && !a.thua;
    if (a.thieu.length) loi.push(`Ô tên chỉ tiêu còn thiếu: ${a.thieu.map(x => x.toLowerCase()).join(', ')}.`);
    if (a.thua) loi.push(`Ô tên chỉ tiêu có nội dung không phải chỉ tiêu đã kiểm nghiệm: "${v.ct}".`);
    let ctkdOK = true;
    if (coKhong) {
      const b2 = soKhopChiTieu(v.ctkd, khongDat); ctkdOK = !!String(v.ctkd || '').trim() && !b2.thieu.length && !b2.thua;
      if (!String(v.ctkd || '').trim()) loi.push('Chưa ghi chỉ tiêu không đạt.');
      else { if (b2.thieu.length) loi.push(`Ô chỉ tiêu không đạt còn thiếu: ${b2.thieu.map(x => x.toLowerCase()).join(', ')}.`); if (b2.thua) loi.push(`Ô chỉ tiêu không đạt ghi chỉ tiêu không đúng: "${v.ctkd}".`); }
    }
    return { ok: kqOK && ctOK && ctkdOK, marks: { kq: kqOK, ct: ctOK, ctkd: ctkdOK }, loi };
  }
  function cauKetLuan(v) {          // câu kết luận hoàn chỉnh để in / sao chép
    const kd = C().phieu_kiem_nghiem_mau.ket_luan_dien;
    const kq = String(v.kq || '…').trim().toLowerCase();
    let s = kd.cau.replace('{ket_qua}', kq).replace('{chi_tieu}', String(v.ct || '…').trim().replace(/\.$/, ''));
    if (laKhongDat(v.kq)) s += kd.them_khong_dat.replace('{chi_tieu_khong_dat}', String(v.ctkd || '…').trim().replace(/\.$/, ''));
    return s;
  }
  function phieuHTML(ctx, editable, kl, F) {
    const pk = C().phieu_kiem_nghiem_mau, rows = phieuRows(ctx), lines = phieuLines(ctx), kd = pk.ket_luan_dien;
    let klHTML;
    if (editable) {
      const [p1, rest] = kd.cau.split('{ket_qua}'), [p2, p3] = rest.split('{chi_tieu}'), [q1, q2] = kd.them_khong_dat.split('{chi_tieu_khong_dat}');
      const anKd = !laKhongDat(kl.kq);
      klHTML = `<div class="ph-kl"><p class="ph-kl-cau"><span class="lb">Kết luận:</span> ${esc(p1)}${F.blank('kq')}${esc(p2)}${F.blank('ct')}${esc(p3)}<span id="pk-ctkd" ${anKd ? 'class="hidden"' : ''}>${esc(q1)}${F.blank('ctkd')}${esc(q2)}</span></p>
        <p class="small no-print">${esc(kd.huong_dan)}</p><div class="nf-err" id="${fidOf('PKN', 'kq')}-err"></div><div class="nf-err" id="${fidOf('PKN', 'ct')}-err"></div><div class="nf-err" id="${fidOf('PKN', 'ctkd')}-err"></div></div>`;
    } else klHTML = `<p class="ph-kl"><b><i>Kết luận: ${esc(cauKetLuan(kl))}</i></b></p>`;
    return `<div class="phieu" ${editable ? 'id="phieu"' : ''}>
      <div class="ph-head"><div><p class="t1">${esc(pk.tieu_de_trai[0])}</p><p class="t2">${esc(pk.tieu_de_trai[1])}</p><p>${esc(pk.tieu_de_trai[2])}</p><div class="ph-dash"></div></div>
        <div><p class="t1">${esc(pk.tieu_de_phai[0])}</p><p class="t2">${esc(pk.tieu_de_phai[1])}</p><div class="ph-dash"></div></div></div>
      <div class="ph-title">${esc(pk.ten_phieu)}</div>
      ${lines.map((l, i) => editable ? `<div class="ph-line"><span class="lb">${esc(l.nhan)}:</span><input type="text" data-pkline="${i}" value="${esc(l.val)}" ${l.fixed ? 'readonly' : ''} aria-label="${esc(l.nhan)}"></div>` : `<p class="ph-line">${esc(l.nhan)}: ${esc(l.val)}</p>`).join('')}
      <table class="ph-table"><thead><tr>${pk.bang.cot.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>
        ${rows.map((r, i) => `<tr><td class="c">${i + 1}</td><td><b>${esc(r.ten)}:</b> ${esc(r.yc)}</td><td>${esc(r.kq)}${r.sub ? `<span class="ph-sub">${esc(r.sub)}</span>` : ''}</td></tr>`).join('')}
      </tbody></table>${klHTML}
      <div class="ph-foot">${pk.chan_phieu.map((c, i) => `<p class="f${i + 1}">${esc(c)}</p>`).join('')}</div></div>`;
  }
  function itemPhieu(ctx) {
    const pk = C().phieu_kiem_nghiem_mau;
    const sau = () => true;
    return { id: 'PKN', so: '4.2', title: 'Phiếu kiểm nghiệm', nguon: pk.nguon,
      fields: [
        { key: 'kq', type: 'blank', label: 'Kết quả (Đạt hoặc Không đạt)', editableAfter: sau },
        { key: 'ct', type: 'blank', label: 'Tên các chỉ tiêu đã kiểm nghiệm', editableAfter: sau },
        { key: 'ctkd', type: 'blank', label: 'Chỉ tiêu không đạt', editableAfter: sau, batBuoc: v => laKhongDat(v.kq) }],
      grade: vals => { const g = chamKetLuan(ctx, vals), r = ctx.sess.ans.PKN; return { ok: r && r.firstOk != null ? r.firstOk : g.ok, marks: g.marks, now: g }; },
      onSubmit: vals => { S.ans.PKN.firstOk = chamKetLuan(ctx, vals).ok; },
      layout: (F, isNop, vals) => `<p>Phiếu tự điền từ lô mẫu và từ kết quả, kết luận <b>bạn đã nhập</b> ở Chặng 3. Có thể sửa các dòng thông tin trước khi in. Điền phần kết luận ở cuối phiếu rồi bấm Nộp.</p>${phieuHTML(ctx, true, vals, F)}`,
      after: vals => {
        const g = chamKetLuan(ctx, vals), r = rec('PKN');
        return (g.ok ? `<div class="fb ok">Kết luận phù hợp với bảng kết quả ✓${r && r.firstOk === false ? ' (đã sửa sau khi nộp; điểm tính theo lần nộp đầu)' : ''}</div>`
          : `<div class="fb bad"><b>Kết luận chưa phù hợp với bảng kết quả. Xem lại.</b><ul class="qlist">${g.loi.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${esc(pk.quy_tac_ket_luan)}<br>Sửa các ô ở phần kết luận rồi bấm ra ngoài ô; nút In sẽ mở khi kết luận phù hợp.</div>`)
          + `<p class="small">${esc(pk.quy_tac_ket_luan_dien || pk.quy_tac_ket_luan)}</p>`
          + `<div class="actions"><button type="button" class="primary" id="btn-in" ${g.ok ? '' : 'disabled'}>In / Lưu PDF</button><button type="button" id="btn-copy-phieu" ${g.ok ? '' : 'disabled'}>Sao chép văn bản</button><span class="small" id="copy-msg"></span></div>`
          + nguonHTML(pk.nguon);
      } };
  }
  function inPhieu() {
    let root = document.getElementById('print-root');
    if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.append(root); }
    root.innerHTML = phieuHTML(CTX, false, (rec('PKN') || {}).vals || {});
    window.print();
  }
  function phieuText(ctx) {
    const pk = C().phieu_kiem_nghiem_mau, rows = phieuRows(ctx);
    const out = [pk.tieu_de_trai[0] + '  |  ' + pk.tieu_de_phai[0], pk.tieu_de_trai[1] + '  |  ' + pk.tieu_de_phai[1], pk.tieu_de_trai[2], '', pk.ten_phieu, ''];
    phieuLines(ctx).forEach(l => out.push(`${l.nhan}: ${l.val}`));
    out.push('', pk.bang.cot.join(' | '));
    rows.forEach((r, i) => out.push(`${i + 1} | ${r.ten}: ${r.yc} | ${r.kq}${r.sub ? ' ' + r.sub : ''}`));
    out.push('', 'Kết luận: ' + cauKetLuan((rec('PKN') || {}).vals || {}), '', ...pk.chan_phieu);
    return out.join('\r\n');
  }

  /* ==========================================================================
     PHIẾU KẾT QUẢ LUYỆN TẬP (4.3)
     ========================================================================== */
  function ketQuaLuyenTap() {
    return [1, 2, 3, 4].map(k => {
      const items = CTX.stages[k]; let dung = 0; const sai = [];
      const coCham = items.filter(it => !it.khongCham);
      coCham.forEach(it => { const r = rec(it.id); if (!r || !r.nop) return; if (gradeItem(it, r.vals).ok) dung++; else sai.push(it); });
      const traLoi = items.filter(it => it.khongCham).map(it => ({ it, tl: svVal(it.id, 'tl') || '' }));
      return { k, dung, tong: coCham.length, sai, traLoi };
    });
  }
  function ketQuaText() {
    const per = ketQuaLuyenTap(), m = CTX.meta;
    const L = ['PHIẾU KẾT QUẢ LUYỆN TẬP – PHÒNG KIỂM NGHIỆM DƯỢC PHẨM', `Họ tên: ${INFO.ho_ten} | Lớp: ${INFO.lop} | Tổ: ${INFO.to} | Mã sinh viên: ${INFO.ma_sv}`,
      `Mẫu: ${CTX.hs.ten_mau} | Mã lô: ${S.ma}${S.kt ? ' (lô kiểm thử)' : ''} | Ngày nhận mẫu: ${m.ngayNhan}`, `Thời gian: ${new Date().toLocaleString('vi-VN')}`, ''];
    per.forEach(p => L.push(`${STAGE_NAMES[p.k]}: ${p.dung}/${p.tong} mục đúng`));
    const sai = per.flatMap(p => p.sai);
    L.push('', sai.length ? 'Các mục cần ôn lại:' : 'Không có mục sai.');
    sai.forEach(it => L.push(`- Mục ${it.so}: ${it.title.length > 90 ? it.title.slice(0, 88) + '…' : it.title}${it.nguon ? ' – Nguồn: ' + it.nguon : ''}`));
    const tl = per.flatMap(p => p.traLoi);
    if (tl.length) { L.push('', 'Câu trả lời ngắn (không chấm điểm):'); tl.forEach(x => L.push(`- Mục ${x.it.so}: ${x.tl || '(chưa trả lời)'}`)); }
    return L.join('\r\n');
  }
  function ketQuaHTML() {
    const per = ketQuaLuyenTap(), sai = per.flatMap(p => p.sai);
    return `<section class="panel" id="ket-qua"><p class="eyebrow">Mục 4.3</p><h2>Phiếu kết quả luyện tập</h2>
      <dl class="kv"><dt>Họ tên</dt><dd>${esc(INFO.ho_ten)}</dd><dt>Lớp</dt><dd>${esc(INFO.lop)}</dd><dt>Tổ</dt><dd>${esc(INFO.to)}</dd><dt>Mã sinh viên</dt><dd>${esc(INFO.ma_sv)}</dd><dt>Mã lô</dt><dd>${esc(S.ma)}</dd><dt>Thời gian</dt><dd>${esc(new Date().toLocaleString('vi-VN'))}</dd></dl>
      <div class="tbl-wrap"><table class="score-tbl"><thead><tr><th>Chặng</th><th class="r">Số mục đúng / tổng</th></tr></thead><tbody>
      ${per.map(p => `<tr><td>${esc(STAGE_NAMES[p.k])}</td><td class="r"><b>${p.dung}/${p.tong}</b></td></tr>`).join('')}</tbody></table></div>
      <h3 style="margin-top:16px">Các mục cần ôn lại</h3>
      ${sai.length ? `<ul class="qlist">${sai.map(it => `<li><b>Mục ${esc(it.so)}</b> – ${esc(it.title)}${it.nguon ? `<br><span class="small">Nguồn: ${esc(it.nguon)}</span>` : ''}</li>`).join('')}</ul>` : '<p>Không có mục sai.</p>'}
      ${per.some(p => p.traLoi.length) ? `<h3 style="margin-top:16px">Câu trả lời ngắn (không chấm điểm)</h3><ul class="qlist">${per.flatMap(p => p.traLoi).map(x => `<li><b>Mục ${esc(x.it.so)}</b>: ${esc(x.tl || '(chưa trả lời)')}</li>`).join('')}</ul>` : ''}
      <textarea class="result-text" id="kq-text" rows="8" readonly>${esc(ketQuaText())}</textarea>
      <div class="actions"><button type="button" class="primary" id="btn-copy-kq">Sao chép kết quả</button><button type="button" id="btn-mau-moi">Nhận mẫu mới</button><span class="small" id="kq-msg"></span></div></section>`;
  }

  /* ==========================================================================
     MÀN HÌNH 0 – CHỌN MẪU
     ========================================================================== */
  let CHON_HS = null, MAU_MOI_XAC_NHAN = false;
  function infoFormHTML() {
    const ti = C().thong_tin_sinh_vien, f = id => ti.truong.find(t => t.id === id);
    const ph = { ho_ten: 'Nguyễn Văn A', lop: 'A0', ma_sv: '2201xxx' };
    if (!EDIT_INFO) return `<div class="info-card"><span><b>Họ tên:</b> ${esc(INFO.ho_ten)}</span><span><b>Lớp:</b> ${esc(INFO.lop)}</span><span><b>Tổ:</b> ${esc(INFO.to)}</span><span><b>Mã sinh viên:</b> ${esc(INFO.ma_sv)}</span>
      <button type="button" id="btn-sua-info" style="margin-left:auto">Sửa thông tin</button></div>`;
    const txt = id => `<div class="fld"><label for="i-${id}">${esc(f(id).nhan)}</label><input type="text" id="i-${id}" value="${esc(INFO[id])}" placeholder="${esc(ph[id])}" autocomplete="off"><span class="err" id="e-${id}"></span></div>`;
    return `<div class="grid4">${txt('ho_ten')}${txt('lop')}
      <div class="fld"><label for="i-to">${esc(f('to').nhan)}</label><select id="i-to"><option value="">— Chọn tổ —</option>${f('to').lua_chon.map(n => `<option value="${n}" ${String(INFO.to) === String(n) ? 'selected' : ''}>Tổ ${n}</option>`).join('')}</select><span class="err" id="e-to"></span></div>
      ${txt('ma_sv')}</div>${S ? '<div class="actions"><button type="button" id="btn-luu-info" class="primary">Lưu thông tin</button></div>' : ''}`;
  }
  function readInfo(showErr) {
    if (!EDIT_INFO) return true;
    const names = { ho_ten: 'họ tên', lop: 'lớp', to: 'tổ', ma_sv: 'mã sinh viên' }; let ok = true;
    ['ho_ten', 'lop', 'to', 'ma_sv'].forEach(id => {
      const el = document.getElementById('i-' + id); if (!el) return;
      const v = el.value.trim(); INFO[id] = v; const bad = !v; ok = ok && !bad;
      if (showErr) { el.classList.toggle('invalid', bad); document.getElementById('e-' + id).textContent = bad ? (id === 'to' ? 'Vui lòng chọn tổ' : 'Vui lòng nhập ' + names[id]) : ''; }
    });
    store.set(K.info, INFO);
    return ok;
  }
  function stage0HTML() {
    const ti = C().thong_tin_sinh_vien, nh = C().nhan_giao_dien || {};
    let h = `<section class="panel"><p class="eyebrow">Bước đầu</p><h2>${esc(nh.khoi_thong_tin || ti.tieu_de)}</h2>${infoFormHTML()}</section>`;
    if (S) {
      const m = CTX.meta, hs = CTX.hs;
      h += `<section class="panel"><p class="eyebrow">Đã nhận mẫu</p><h2>Phiếu nhận mẫu</h2>
        <dl class="kv"><dt>Tên mẫu</dt><dd>${esc(hs.ten_mau)}</dd><dt>Nhãn</dt><dd>${esc(hs.bien_the[0].nhan)} · ${esc(hs.dang_bao_che)}</dd><dt>Nơi sản xuất</dt><dd>${esc(m.noiSX)}</dd>
        <dt>Số lô</dt><dd>${esc(m.soLo)}</dd><dt>Ngày sản xuất</dt><dd>${esc(m.nsx)}</dd><dt>Hạn dùng</dt><dd>${esc(m.hd)}</dd><dt>Số đăng ký</dt><dd>${esc(m.sdk)}</dd>
        <dt>Mã lô</dt><dd><b>${esc(S.ma)}</b>${S.kt ? ' <span class="small">(lô kiểm thử của giảng viên)</span>' : ''}</dd><dt>Ngày nhận mẫu</dt><dd>${esc(m.ngayNhan)}</dd></dl>
        <p class="note-gia-dinh">Mẫu và số liệu là giả định, dùng cho học tập.</p>
        <div class="actions"><button type="button" class="primary" data-go="1">Vào Chặng 1</button><button type="button" id="btn-mau-moi0">${MAU_MOI_XAC_NHAN ? 'Bấm lần nữa để bỏ lô này và nhận mẫu mới' : 'Nhận mẫu mới'}</button></div></section>`;
    } else {
      if (!CHON_HS || !HS(CHON_HS)) CHON_HS = HO_SO[0] && HO_SO[0].id;
      h += `<section class="panel"><p class="eyebrow">Tiếp nhận</p><h2>Chọn chuyên luận kiểm nghiệm</h2><div class="hs-cards" role="radiogroup" aria-label="Chọn mẫu">
        ${HO_SO.map(hs => `<label class="hs-card ${CHON_HS === hs.id ? 'on' : ''}"><input type="radio" name="chon-hs" value="${esc(hs.id)}" ${CHON_HS === hs.id ? 'checked' : ''}><div><h3>${esc(hs.ten_mau)}</h3>
          <p>${esc(hs.dang_bao_che)}</p><p class="small"><b>${esc(nh.danh_sach_chi_tieu || 'Chỉ tiêu kiểm nghiệm:')}</b> ${esc((hs.chi_tieu_buoi_thuc_tap || []).join('; '))}</p></div></label>`).join('')}
        </div><div class="actions"><button type="button" class="primary" id="btn-nhan-mau" ${HO_SO.length ? '' : 'disabled'}>Nhận mẫu</button><span class="err" id="nhan-err"></span></div></section>`;
    }
    return h;
  }
  function nhanMau(hsId, ma, kt) {
    S = { hs: hsId, ma: ma || newMaLo(HS(hsId)), ngay: todayISO(), kt: kt || null, ans: {}, view: 0, pk: {} };
    VIEW = 0; ensureCtx(); saveS();
  }

  /* ==========================================================================
     CHẾ ĐỘ GIẢNG VIÊN (khóa giao diện; PIN lưu dạng băm SHA-256)
     ========================================================================== */
  function sha256hex(str) {
    const Kc = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    const bytes = new TextEncoder().encode(str), len = bytes.length, nb = ((len + 9 + 63) >> 6) << 6, m = new Uint8Array(nb);
    m.set(bytes); m[len] = 0x80; const bl = len * 8; m[nb - 4] = bl >>> 24; m[nb - 3] = bl >>> 16 & 255; m[nb - 2] = bl >>> 8 & 255; m[nb - 1] = bl & 255;
    let Hh = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const w = new Uint32Array(64), rotr = (x, n) => x >>> n | x << 32 - n;
    for (let o = 0; o < nb; o += 64) {
      for (let i = 0; i < 16; i++) w[i] = m[o + 4 * i] << 24 | m[o + 4 * i + 1] << 16 | m[o + 4 * i + 2] << 8 | m[o + 4 * i + 3];
      for (let i = 16; i < 64; i++) { const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ w[i - 15] >>> 3, s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ w[i - 2] >>> 10; w[i] = w[i - 16] + s0 + w[i - 7] + s1 | 0; }
      let [a, b, c, d, e, f, g, h] = Hh;
      for (let i = 0; i < 64; i++) {
        const t1 = h + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + (e & f ^ ~e & g) + Kc[i] + w[i] | 0, t2 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + (a & b ^ a & c ^ b & c) | 0;
        h = g; g = f; f = e; e = d + t1 | 0; d = c; c = b; b = a; a = t1 + t2 | 0;
      }
      Hh = [Hh[0] + a | 0, Hh[1] + b | 0, Hh[2] + c | 0, Hh[3] + d | 0, Hh[4] + e | 0, Hh[5] + f | 0, Hh[6] + g | 0, Hh[7] + h | 0];
    }
    return Hh.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
  }
  /* PIN mặc định "2026". Đổi PIN: thay chuỗi dưới bằng SHA-256 của PIN mới (xem README). */
  const PIN_HASH = '158a323a7ba44870f23d96f1516dd70aa48e9a72db4ebb026b0a89e212a208ab';
  function soSanhKT(ctx) {
    const kq = ctx.kt.ket_qua_dung, rows = [];
    const num = (name, app, exp, tol = 0.0051, d = 2) => rows.push({ name, app: fmt(app, d), exp: fmt(exp, d), ok: Math.abs(app - exp) <= tol });
    const str = (name, app, exp) => rows.push({ name, app, exp, ok: String(exp).startsWith(app) });
    ctx.khoi.forEach(x => { if (x.B.soSanh) x.B.soSanh(x.cfg, x.data, x.da, kq, num, str); });
    return rows;
  }
  function soSanhHTML(ctx) {
    const rows = soSanhKT(ctx), lech = rows.filter(r => !r.ok).length;
    return `<h4>So sánh với kết quả đúng của lô ${esc(ctx.kt.ma_lo)}</h4><p style="font-weight:700;color:${lech ? 'var(--bad)' : 'var(--ok)'}">${lech ? `Có ${lech} chỗ lệch (tô đỏ).` : 'Khớp toàn bộ ✓'}</p>
      <div class="tbl-wrap"><table class="gv-tbl"><thead><tr><th>Đại lượng</th><th class="r">App tính</th><th class="r">ket_qua_dung</th><th></th></tr></thead><tbody>
      ${rows.map(r => `<tr class="${r.ok ? '' : 'lech'}"><td>${esc(r.name)}</td><td class="r">${esc(r.app)}</td><td class="r">${esc(r.exp)}</td><td>${r.ok ? '✓' : '✗'}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function gvLotHTML(ma) {
    const hsId = hoSoTuMa(ma);
    if (!hsId) return `<div class="fb bad">Mã lô không hợp lệ. Dạng đúng: ${HO_SO.map(h => tienTo(h) + '-XXXXXX').join(', ')} hoặc mã lô kiểm thử (KT-…).</div>`;
    const hs = HS(hsId), kt = (hs.lo_kiem_thu || []).find(l => l.ma_lo === ma);
    const ctx = buildCtx({ hs: hsId, ma, ngay: (S && S.ma === ma) ? S.ngay : todayISO(), kt: kt ? kt.ma_lo : null, ans: {} }), m = ctx.meta;
    const kb = [ctx.kb && ctx.kb.ma, ...ctx.khoi.map(x => x.data && x.data.kichBan)].filter(Boolean);
    let h = `<h4>Lô ${esc(ma)} – ${esc(hs.ten_mau)}</h4><dl class="kv"><dt>Nơi sản xuất</dt><dd>${esc(m.noiSX)}</dd><dt>Số lô / NSX / HD</dt><dd>${esc(m.soLo)} / ${esc(m.nsx)} / ${esc(m.hd)}</dd><dt>Số đăng ký</dt><dd>${esc(m.sdk)}</dd>
      <dt>Kịch bản (chỉ giảng viên thấy)</dt><dd>${esc([...new Set(kb)].join('; '))}</dd></dl><p class="small">Ngày NSX/HD tính theo ngày nhận mẫu ${esc(m.ngayNhan)}.</p>`;
    h += ctx.khoi.map(x => x.B.gv ? x.B.gv(x.cfg, x.data, x.da, ctx) : '').join('');
    h += `<p><b>Kết luận:</b> ${ctx.ketLuan.map(e => `${esc(e.label)} ${e.dat ? 'Đạt' : 'Không đạt'}`).join('; ')}; chung ${ctx.chungDat ? 'Đạt' : 'Không đạt'}.</p>`;
    h += `<details class="sol"><summary>Đáp án mọi mục (theo thứ tự lựa chọn hiện tại)</summary><div class="sol-body">`;
    [1, 2, 3, 4].forEach(k => {
      h += `<h5 class="sol-h">${esc(STAGE_NAMES[k])}</h5><ol class="qlist">`;
      ctx.stages[k].forEach(it => { if (it.id === 'PKN') return; h += `<li><b>Mục ${esc(it.so)}</b> ${esc(it.title.length > 110 ? it.title.slice(0, 108) + '…' : it.title)}${it.V ? ` (V = ${fmt(it.V, 0)} ml)` : ''}: ${it.fields.map(f => (it.fields.length > 1 ? esc(f.label) + ' = ' : '') + esc(ansText(f))).join('; ')}</li>`; });
      h += '</ol>';
    });
    h += '</div></details>';
    if (kt) h += soSanhHTML(ctx);
    return h;
  }
  function gvHTML() {
    if (!GV.open) return '';
    const head = btns => `<div class="actions" style="justify-content:space-between;margin:0 0 8px"><h2 style="margin:0">Chế độ giảng viên</h2><div class="actions" style="margin:0">${btns}<button type="button" id="gv-close">Đóng</button></div></div>`;
    if (!GV.unlocked) return `<section class="panel" id="gv-panel">${head('')}<p class="small">Đây chỉ là khóa giao diện để sinh viên không vô tình mở đáp án, không phải bảo mật thật.</p>
      <form id="gv-login" class="actions" style="align-items:flex-end"><div style="display:flex;flex-direction:column;gap:6px"><label for="gv-pin"><b>PIN</b></label><input id="gv-pin" type="password" inputmode="numeric" autocomplete="off" style="width:12ch"></div><button class="primary" type="submit">Mở khóa</button><span class="err" id="gv-err"></span></form></section>`;
    const opt = HO_SO.map(hs => `<optgroup label="${esc(hs.ten_mau)}">${(hs.lo_kiem_thu || []).map(l => `<option value="${esc(l.ma_lo)}">${esc(l.ma_lo)} – ${esc(l.ket_qua_dung.ket_luan)}</option>`).join('')}</optgroup>`).join('');
    const loi = P.loiNap.length ? `<div class="fb bad"><b>Chuyên luận chưa nạp được (đã bỏ qua, các chuyên luận khác vẫn chạy):</b><ul class="qlist">${P.loiNap.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
    return `<section class="panel" id="gv-panel">${head('<button type="button" id="gv-lock">Khóa lại</button>')}
      <div class="fb info" style="margin-top:0">Đây chỉ là khóa giao diện (PIN băm SHA-256), không phải bảo mật thật. Đã nạp ${HO_SO.length} chuyên luận · dữ liệu chung phiên bản ${esc(C().phien_ban || '')}.</div>${loi}
      <div class="actions"><label class="opt" style="flex:0 1 auto"><input type="checkbox" id="gv-xao" ${xaoOn() ? 'checked' : ''}><span>Xáo thứ tự lựa chọn</span></label>
        <label class="opt" style="flex:0 1 auto"><input type="checkbox" id="gv-bokhoa" ${GV.boKhoa ? 'checked' : ''}><span>Mở mọi chặng, mọi mục (chỉ để kiểm thử)</span></label></div>
      <h3 style="margin-top:18px">Xem số liệu và đáp án theo mã lô</h3>
      <div class="actions" style="align-items:flex-end"><div style="display:flex;flex-direction:column;gap:6px"><label for="gv-ma"><b>Mã lô</b></label><input id="gv-ma" type="text" autocomplete="off" style="width:18ch;text-transform:uppercase" value="${esc(S ? S.ma : '')}"></div><button type="button" class="primary" id="gv-xem">Xem</button></div>
      <div id="gv-lot"></div>
      <h3 style="margin-top:18px">Nạp lô kiểm thử</h3>
      <p class="small">Thay số liệu ngẫu nhiên của chặng 3 bằng số liệu cố định của lô kiểm thử (bắt đầu một phiên mới cho hồ sơ tương ứng).</p>
      <div class="actions" style="align-items:flex-end"><select id="gv-kt" style="max-width:100%">${opt}</select><button type="button" class="primary" id="gv-nap">Nạp lô kiểm thử</button></div>
      ${GV.msg ? `<div class="fb ok">${GV.msg}</div>` : ''}${S && S.kt && CTX ? `<div id="gv-ss">${soSanhHTML(CTX)}</div>` : ''}</section>`;
  }

  /* ==========================================================================
     VẼ TOÀN TRANG
     ========================================================================== */
  function navHTML() {
    const label = VIEW === 0 ? 'Chọn mẫu' : `Chặng ${VIEW}/4: ${STAGE_NAMES[VIEW].split(': ')[1]}`;
    return `<nav class="vnav" id="vnav" aria-label="Các chặng"><button type="button" class="vnav-toggle" id="vnav-toggle" aria-expanded="false" aria-controls="vlist">☰ ${esc(label)} <span aria-hidden="true">▾</span></button>
      <ol class="vlist" id="vlist">${STAGE_NAMES.map((n, k) => {
        const un = stageUnlocked(k), done = k === 0 ? !!S : (S && stageDone(k));
        return `<li><button type="button" class="vtab ${VIEW === k ? 'cur' : ''} ${done ? 'done' : ''} ${un ? '' : 'locked'}" data-go="${k}" ${un ? '' : 'aria-disabled="true"'} ${VIEW === k ? 'aria-current="step"' : ''}>
          <span class="vnum">${k}</span><span class="vtxt">${esc(n)}</span><span class="vst" aria-label="${done ? 'đã nộp' : un ? '' : 'chưa mở'}">${done ? '✓' : un ? '' : '🔒'}</span></button></li>`;
      }).join('')}</ol><p class="vside-note">${S ? `Mã lô <b>${esc(S.ma)}</b>` : 'Chưa nhận mẫu'}</p></nav>`;
  }
  const STAGE_INTRO = {
    1: 'Tra chuyên luận và phụ lục DĐVN V để trả lời. Mỗi mục nộp xong mới mở mục tiếp theo; đáp án và giải thích chỉ hiện sau khi nộp.',
    2: 'Phòng thí nghiệm không chuẩn bị sẵn hóa chất. Với mỗi thuốc thử: tra ở đâu, chọn cách pha theo DĐVN V, rồi tính lượng hóa chất thực tế cần lấy.',
    4: 'Soi lỗi các bài làm mẫu, sau đó lập phiếu kiểm nghiệm từ chính kết quả bạn đã nhập.'
  };
  function stageHTML(k) {
    const items = visibleItems(k), all = CTX.stages[k];
    const intro = k === 3 ? (CTX.plan.gioiThieu || 'Làm các phép thử trên mẫu của lô, tự xử lý số liệu rồi kết luận từng chỉ tiêu.') : STAGE_INTRO[k];
    let h = `<div class="sumbar"><b>${esc(INFO.ho_ten || '—')}</b> · Lớp ${esc(INFO.lop || '—')} · Tổ ${esc(INFO.to || '—')} · Mã SV ${esc(INFO.ma_sv || '—')} · Mã lô <b>${esc(S.ma)}</b></div>
      <section class="panel"><p class="eyebrow">${esc(CTX.hs.ten_mau)}</p><h2>${esc(STAGE_NAMES[k])}</h2><p>${esc(intro)}</p>
      <p class="small">Đã nộp ${all.filter(it => nop(it.id)).length}/${all.length} mục.${S.kt ? ' Đang dùng lô kiểm thử ' + esc(S.kt) + '.' : ''}</p></section>`;
    h += items.map(renderItem).join('');
    if (stageDone(k)) {
      if (k < 4) h += `<div class="stage-end" id="stage-end"><p><b>${esc(STAGE_NAMES[k])} đã hoàn thành ✓</b></p><button type="button" class="primary" data-go="${k + 1}">Sang ${esc(STAGE_NAMES[k + 1])}</button></div>`;
      else h += `<div id="stage-end"></div>` + ketQuaHTML();
    }
    return h;
  }
  function render() {
    ensureCtx();
    if (!S) VIEW = 0;
    if (VIEW > 0 && !stageUnlocked(VIEW)) VIEW = 0;
    $('#app').innerHTML = `<div class="layout">${navHTML()}<div class="content" id="content">${gvHTML()}${VIEW === 0 ? stage0HTML() : stageHTML(VIEW)}</div></div>`;
    FLASH = null;
    bind();
  }
  function go(k) {
    if (!stageUnlocked(k)) return;
    VIEW = k; saveS(); render();
    const c = $('#content'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ==========================================================================
     SỰ KIỆN
     ========================================================================== */
  function copyText(text, msgEl) {
    const done = ok => { if (msgEl) { msgEl.textContent = ok ? 'Đã sao chép ✓' : 'Hãy chọn và sao chép thủ công.'; setTimeout(() => { msgEl.textContent = ''; }, 2500); } };
    const fallback = () => { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.append(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) { } ta.remove(); done(ok); };
    try { if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(() => done(true), fallback); else fallback(); } catch (e) { fallback(); }
  }
  const on = (sel, ev, fn) => { const el = $(sel); if (el) el.addEventListener(ev, fn); };
  function bind() {
    $$('[data-go]').forEach(b => b.addEventListener('click', () => { const k = +b.dataset.go; if (!stageUnlocked(k)) return; if (k > 0 && !readInfo(VIEW === 0)) return; if (k > 0) EDIT_INFO = false; go(k); }));
    $$('[data-nop]').forEach(b => b.addEventListener('click', () => submitItem(b.dataset.nop)));
    on('#vnav-toggle', 'click', () => { const o = $('#vnav').classList.toggle('open'); $('#vnav-toggle').setAttribute('aria-expanded', String(o)); });
    $$('input[name="chon-hs"]').forEach(r => r.addEventListener('change', () => { CHON_HS = r.value; $$('.hs-card').forEach(c => c.classList.toggle('on', c.querySelector('input').checked)); }));
    ['ho_ten', 'lop', 'ma_sv'].forEach(id => on('#i-' + id, 'input', e => { INFO[id] = e.target.value.trim(); store.set(K.info, INFO); e.target.classList.remove('invalid'); $('#e-' + id).textContent = ''; }));
    on('#i-to', 'change', e => { INFO.to = e.target.value; store.set(K.info, INFO); e.target.classList.remove('invalid'); $('#e-to').textContent = ''; });
    on('#btn-nhan-mau', 'click', () => {
      if (!readInfo(true)) { $('#nhan-err').textContent = 'Vui lòng nhập đủ 4 thông tin kiểm nghiệm viên.'; return; }
      EDIT_INFO = false; nhanMau(CHON_HS); render();
    });
    on('#btn-sua-info', 'click', () => { EDIT_INFO = true; render(); });
    on('#btn-luu-info', 'click', () => { if (readInfo(true)) { EDIT_INFO = false; if (S && S.pk && S.pk.lines) { delete S.pk.lines[8]; saveS(); } render(); } });
    on('#btn-mau-moi0', 'click', () => { if (!MAU_MOI_XAC_NHAN) { MAU_MOI_XAC_NHAN = true; render(); return; } MAU_MOI_XAC_NHAN = false; S = null; store.del(K.sess); VIEW = 0; render(); });
    $$('[data-pkline]').forEach(el => el.addEventListener('input', () => { S.pk = S.pk || {}; S.pk.lines = S.pk.lines || {}; S.pk.lines[el.dataset.pkline] = el.value; saveS(); }));
    $$('input.blank[data-blank]').forEach(el => {
      el.addEventListener('input', () => { if (el.dataset.blank === 'kq') { const sp = $('#pk-ctkd'); if (sp) sp.classList.toggle('hidden', !laKhongDat(el.value)); } });
      el.addEventListener('change', () => { if (!nop('PKN')) return; S.ans.PKN.vals[el.dataset.blank] = el.value.trim().replace(/\s+/g, ' '); saveS(); const y = window.scrollY; render(); window.scrollTo(0, y); });
    });
    on('#btn-in', 'click', inPhieu);
    on('#btn-copy-phieu', 'click', () => copyText(phieuText(CTX), $('#copy-msg')));
    on('#btn-copy-kq', 'click', () => copyText(ketQuaText(), $('#kq-msg')));
    on('#btn-mau-moi', 'click', () => { S = null; store.del(K.sess); VIEW = 0; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    on('#gv-close', 'click', () => { GV.open = false; render(); });
    on('#gv-login', 'submit', e => { e.preventDefault(); if (sha256hex($('#gv-pin').value.trim()) === PIN_HASH) { GV.unlocked = true; render(); } else $('#gv-err').textContent = 'PIN chưa đúng.'; });
    on('#gv-lock', 'click', () => { GV.unlocked = false; GV.boKhoa = false; render(); });
    on('#gv-xao', 'change', e => { store.set(K.xao, e.target.checked); render(); });
    on('#gv-bokhoa', 'change', e => { GV.boKhoa = e.target.checked; render(); });
    on('#gv-xem', 'click', () => { const ma = $('#gv-ma').value.trim().toUpperCase(); try { $('#gv-lot').innerHTML = gvLotHTML(ma); } catch (e) { $('#gv-lot').innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; } });
    on('#gv-nap', 'click', () => {
      const ma = $('#gv-kt').value, hsId = hoSoTuMa(ma);
      if (!(INFO.ho_ten && INFO.lop && INFO.to && INFO.ma_sv)) { INFO = { ho_ten: INFO.ho_ten || 'Giảng viên kiểm thử', lop: INFO.lop || 'GV', to: INFO.to || '1', ma_sv: INFO.ma_sv || 'GV' }; store.set(K.info, INFO); EDIT_INFO = false; }
      nhanMau(hsId, ma, ma); GV.msg = `Đã nạp lô ${esc(ma)}. Số liệu chặng 3 lấy từ lô kiểm thử.`;
      VIEW = GV.boKhoa ? 3 : 1; saveS(); render(); GV.msg = '';
    });
  }

  /* ==========================================================================
     KHỞI ĐỘNG: kiểm tra từng chuyên luận – lỗi ở một file không làm hỏng các file khác
     ========================================================================== */
  function kiemTraHoSo() {
    HO_SO = [];
    for (const hs of P.hoSo) {
      try {
        HO_SO.push(hs);
        const ma = (hs.tien_to_ma_lo || hs.id) + '-KIEMTRA';
        const ctx = buildCtx({ hs: hs.id, ma, ngay: todayISO(), kt: null, ans: {} });
        if (!ctx.stages[1].length && !ctx.stages[3].length) throw new Error('chưa có mục nào');
      } catch (e) {
        HO_SO.pop();
        P.loiNap.push(`Hồ sơ "${hs.id}" (${hs.ten_mau || 'không tên'}): ${e.message}`);
        console.error('Không nạp được hồ sơ', hs.id, e);
      }
    }
  }
  function khoiDong() {
    if (!P.chung) { $('#app').innerHTML = '<div class="fb bad">Không tìm thấy data/chung.js.</div>'; return; }
    kiemTraHoSo();
    VIEW = S ? (S.view ?? 1) : 0;
    document.getElementById('teacher-open').addEventListener('click', () => { GV.open = true; render(); const p = $('#gv-panel'); if (p) p.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    window.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target && e.target.classList && e.target.classList.contains('num')) { const it = e.target.closest('.item'), b = it && it.querySelector('[data-nop]'); if (b) b.click(); } });
    render();
    // cài như ứng dụng (PWA) – chỉ khi chạy qua http(s), ví dụ trên Vercel
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => { });
  }
  // dùng cho kiểm thử tự động (tools/kiem-thu)
  P.app = { get S() { return S; }, get CTX() { return CTX; }, get VIEW() { return VIEW; }, set VIEW(v) { VIEW = v; }, GV, render, go, nhanMau, stageDone, soSanhKT, inPhieu,
    phieuRows: () => phieuRows(CTX), chamKetLuan: v => chamKetLuan(CTX, v), setInfo(i) { INFO = i; store.set(K.info, INFO); EDIT_INFO = false; }, saveS, HO_SO: () => HO_SO, parseSo, sha256hex };
  khoiDong();
})(window.PKN);
