'use strict';
/* ==========================================================================
   KHUNG CHUNG – không gian tên PKN và các tiện ích dùng chung
   Thứ tự nạp (index.html): katex → js/core → js/khoi → js/kieu → data → js/app.js
   ========================================================================== */
window.PKN = window.PKN || {};
(function (P) {
  P.hoSo = [];          // các chuyên luận đã nạp (data/chuyen-luan/*.js)
  P.khoi = {};          // các khối thử của chặng 3 (js/khoi/*.js)
  P.kieu = {};          // bộ chuyển hồ sơ → danh sách khối (js/kieu/*.js)
  P.chung = null;       // dữ liệu chung (data/chung.js)
  P.loiNap = [];        // lỗi khi nạp chuyên luận (không làm hỏng các chuyên luận khác)

  P.dangKyDuLieuChung = o => { P.chung = o; };
  P.themChuyenLuan = o => {
    if (!o || !o.id) { P.loiNap.push('Một file chuyên luận thiếu "id".'); return; }
    if (P.hoSo.some(h => h.id === o.id)) { P.loiNap.push(`Trùng id hồ sơ "${o.id}" – bỏ qua file nạp sau.`); return; }
    P.hoSo.push(o);
  };

  const U = P.U = {};
  U.$ = (s, r = document) => r.querySelector(s);
  U.$$ = (s, r = document) => [...r.querySelectorAll(s)];
  U.esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- lưu trữ cục bộ (bọc try/catch) ---------- */
  U.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { } }
  };

  /* ---------- số: parseSo, dinhDangSo ---------- */
  U.parseSo = function (s) {
    if (s == null) return NaN;
    let t = String(s).trim().replace(/\s+/g, '');
    if (!t) return NaN;
    if (t.includes(',') && t.includes('.')) return NaN;
    t = t.replace(',', '.');
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
    return Number(t);
  };
  U.fmt = U.dinhDangSo = (x, d = 2) => Number.isFinite(x) ? x.toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false }) : '—';
  U.tx = (x, d = 2) => U.fmt(x, d).replace(',', '{,}');              // số viết trong TeX
  U.dpOf = x => { const s = String(x); return s.includes('.') ? s.split('.')[1].length : 0; };
  U.round = (x, d) => Math.round((x + Number.EPSILON * Math.sign(x)) * 10 ** d) / 10 ** d;
  U.mean = a => a.reduce((s, x) => s + x, 0) / a.length;
  U.sdMau = a => { const m = U.mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); };

  /* ---------- bộ sinh số có seed (mulberry32) ---------- */
  U.hashStr = s => { let h = 2166136261 >>> 0; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; };
  U.mulberry32 = a => function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  U.rngFrom = key => U.mulberry32(U.hashStr(key));
  U.uni = (r, a, b) => a + (b - a) * r();
  U.normal = r => { let u = 0; while (u === 0) u = r(); const v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  U.pickW = (r, arr) => { const tot = arr.reduce((s, x) => s + x.trong_so, 0); let x = r() * tot; for (const a of arr) { x -= a.trong_so; if (x < 0) return a; } return arr[arr.length - 1]; };
  U.shuffled = (r, n) => { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- ngày ---------- */
  U.todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  U.parseISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  U.fmtDate = d => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  U.addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  U.addMonths = (d, n) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; };

  /* ---------- công thức (KaTeX → MathML) và khung lời giải ---------- */
  U.CT = tex => {
    try { if (window.katex) return `<div class="ct">${katex.renderToString(tex, { displayMode: true, throwOnError: false, output: 'mathml' })}</div>`; } catch (e) { }
    return `<div class="ct ct-fallback">${U.esc(tex)}</div>`;
  };
  U.CTn = (name, tex) => `<div class="ct-name">${U.esc(name)}</div>${U.CT(tex)}`;
  U.solBox = (inner, open = true) => `<details class="sol" ${open ? 'open' : ''}><summary>Lời giải</summary><div class="sol-body">${inner}</div></details>`;
  U.H = t => `<h5 class="sol-h">${t}</h5>`;
  U.nguonHTML = n => n ? `<p class="src"><b>Nguồn:</b> ${U.esc(n)}</p>` : '';
  U.giaiThichHTML = t => t ? `<p class="giaiThich">${U.esc(t)}</p>` : '';
  U.qdcHTML = id => { const q = (P.chung.quy_dinh_chung_trich || []).find(x => x.id === id); return q ? `<div class="fb info"><b>Trích Qui định chung:</b> ${U.esc(q.noi_dung)} <span class="small">(${U.esc(q.nguon)})</span></div>` : ''; };

  /* ---------- hằng dùng chung cho các mục ---------- */
  U.LET = 'ABCDEFGH';
  U.DAT_KD = [{ v: 'dat', t: 'Đạt' }, { v: 'kd', t: 'Không đạt' }];
  U.unitOf = s => { const m = String(s).match(/\(([^()]+)\)\s*$/); return m ? m[1] : ''; };
  U.stripUnit = s => String(s).replace(/\s*\([^()]+\)\s*$/, '');
  U.ketQuaChu = dat => dat ? 'Đạt' : 'Không đạt';
})(window.PKN);
