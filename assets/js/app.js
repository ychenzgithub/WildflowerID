/**
 * Wildflower ID — renders the site from WF_DATA (data.js) and WF_CONTENT (content.js).
 * English by default; 中文 is kept for the current tab only (sessionStorage).
 */
(function () {
  'use strict';
  const D = window.WF_DATA, C = window.WF_CONTENT;
  const FL = D.flowers;
  const byId = Object.fromEntries(FL.map(f => [f.id, f]));
  const groupById = Object.fromEntries(D.groups.map(g => [g.id, g]));
  const colorById = Object.fromEntries(C.colors.map(c => [c.id, c]));
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const bi = (en, zh) => (zh ? `<span class="en">${esc(en)}</span><span class="zh">${esc(zh)}</span>` : esc(en));
  const biO = o => bi(o.en, o.zh);
  const only = (en, zh) => `<span class="en">${esc(en)}</span><span class="zh">${esc(zh)}</span>`;   // either side may be empty
  const norm = s => String(s || '').toLowerCase();
  const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const NOW = new Date().getMonth();
  const IN_BLOOM = 25;   // bloom score (0-100) that counts as "in bloom"
  function sciNote(n) {
    const m = n.match(/^(syn\.|formerly|var\.) (.+)$/);
    if (n === 'spp.') return bi('spp.', '（属内多种）');
    if (!m) return esc(n);
    const zh = { 'syn.': '异名', formerly: '旧名', 'var.': '变种' }[m[1]];
    return `<span class="en">${esc(m[1])} </span><span class="zh">${zh} </span><i>${esc(m[2])}</i>`;
  }
  const sciHtml = (f, full = true) => `<i>${esc(f.sci)}</i>${full && f.sciNote ? ` <span class="sci-note">${sciNote(f.sciNote)}</span>` : (f.sciNote === 'spp.' ? ' spp.' : '')}`;
  // Flower name: Chinese first in Chinese mode, English underneath.
  const nameHtml = f => `<span class="en">${esc(f.en)}</span><span class="zh">${esc(f.zh)}<small class="alt-name">${esc(f.en)}</small></span>`;

  // ---------------------------------------------------------------- language
  const LANG_KEY = 'wfid_lang';
  let lang = 'en';
  try { lang = sessionStorage.getItem(LANG_KEY) || 'en'; } catch (e) { /* storage unavailable */ }
  function applyLang(l) {
    lang = l;
    document.documentElement.dataset.lang = l;
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    document.title = l === 'zh' ? '野花识别 — 加州与加拿大落基山野花图鉴' : 'Wildflower ID — A Photo Guide to Wildflowers';
    $('#lang-toggle .lbl').textContent = l === 'zh' ? 'EN' : 'ZH';
    $('#lang-toggle').title = l === 'zh' ? 'Switch to English' : 'Switch to Chinese';
    document.querySelectorAll('[data-ph-en]').forEach(el => { el.placeholder = el.dataset[l === 'zh' ? 'phZh' : 'phEn']; });
    renderFamilySelect();
  }

  // ---------------------------------------------------------------- lightbox
  const lb = { el: null, items: [], i: 0 };
  function creditHtml(p) {
    const lic = p.url ? ` · <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">iNaturalist ↗</a>` : '';
    return `${bi('Photo: ', '照片：')}${esc(p.credit)}${lic}`;
  }
  function showLb() {
    const it = lb.items[lb.i];
    const img = lb.el.querySelector('img');
    // Several source photos are small: enlarge up to 2× while fitting the screen.
    const k = Math.min(2, (window.innerWidth * 0.9) / it.w, (window.innerHeight * 0.74) / it.h);
    img.style.width = Math.round(it.w * k) + 'px';
    img.style.height = Math.round(it.h * k) + 'px';
    img.src = it.src;
    img.alt = it.alt || '';
    lb.el.querySelector('.cap').innerHTML = `${it.title || ''}<small>${creditHtml(it)}</small><small>${lb.i + 1} / ${lb.items.length}</small>`;
  }
  function openLb(items, i) { lb.items = items; lb.i = i; showLb(); lb.el.classList.add('open'); }
  function stepLb(d) { lb.i = (lb.i + d + lb.items.length) % lb.items.length; showLb(); }
  const flowerPhotos = f => f.photos.map(p => ({ ...p, title: `${nameHtml(f)} · <i>${esc(f.sci)}</i>`, alt: f.en }));

  // ---------------------------------------------------------------- small pieces
  const colorDots = f => `<span class="dots">${f.colors.map(c => `<span class="dot" style="--c:${colorById[c].hex}" title="${esc(colorById[c].en)}"></span>`).join('')}</span>`;
  const statusTag = f => `<span class="status st-${f.status}">${biO(C.status[f.status])}</span>`;
  function bloomBar(f, labels) {
    const cells = f.bloom.map((v, m) => `<span class="bm${m === NOW ? ' now' : ''}" style="--a:${(v / 100).toFixed(2)}" title="${MONTHS_EN[m]}"></span>`).join('');
    const lbl = labels ? `<div class="bloom-lbl">${MONTHS_EN.map((m, i) => `<span${i === NOW ? ' class="now"' : ''}>${bi(m[0], String(i + 1))}</span>`).join('')}</div>` : '';
    return `<div class="bloom${labels ? ' big' : ''}">${cells}</div>${lbl}`;
  }
  const inBloom = (f, m = NOW) => f.bloom[m] >= IN_BLOOM;
  const monthName = m => bi(MONTHS_LONG[m], `${m + 1} 月`);

  // ---------------------------------------------------------------- hero
  function renderHero() {
    const picks = ['california-poppy', 'owls-clover', 'baby-blue-eyes', 'fireweed', 'paintbrush', 'chia', 'tidy-tips', 'bunchberry'];
    $('#mosaic').innerHTML = picks.map(id => {
      const f = byId[id];
      return `<button type="button" data-open="${f.id}" aria-label="${esc(f.en)}"><img src="${f.thumb}" alt="${esc(f.en)}" loading="eager"><span class="cap">${bi(f.en, f.zh)}</span></button>`;
    }).join('');
    const photos = FL.reduce((a, f) => a + f.photos.length, 0);
    const inat = FL.reduce((a, f) => a + f.photos.filter(p => p.url).length, 0);
    const fams = new Set(FL.map(f => f.family)).size;
    const stats = [[FL.length, 'flowers', '种花'], [photos, 'photos', '张照片'], [fams, 'plant families', '个科'], [C.lookalikes.length, 'look-alike pairs', '组易混花卉']];
    $('#stats').innerHTML = stats.map(([n, en, zh]) => `<div class="stat"><b>${n}</b><span>${bi(en, zh)}</span></div>`).join('');
    document.querySelectorAll('.n-inat').forEach(el => { el.textContent = inat; });
    document.querySelectorAll('.n-col').forEach(el => { el.textContent = photos - inat; });
    const n = FL.filter(f => inBloom(f)).length;
    $('#now-btn').innerHTML = `${only('Blooming in ', '')}${monthName(NOW)}${only('', ' 正在开的花')} <span class="pill">${n}</span>`;
  }

  // ---------------------------------------------------------------- atlas
  const atlas = { group: 'all', colors: new Set(), status: 'all', family: 'all', now: false, q: '' };
  const GROUP_TABS = [{ id: 'all', en: 'All', zh: '全部' }, ...D.groups.map(g => ({ id: g.id, en: g.en, zh: g.zh }))];
  const segHtml = (sel, cur) => GROUP_TABS.map(g => `<button type="button" data-g="${g.id}" class="${g.id === cur ? 'on' : ''}">${bi(g.en, g.zh)}</button>`).join('');
  function flowerText(f) {
    return [f.en, f.zh, f.other, f.sci, f.sciNote, f.family, f.familyZh, f.familyEn, f.desc.en, f.desc.zh, ...f.features.flatMap(x => [x.en, x.zh])].map(norm).join(' \u0001 ');
  }
  const TEXT = Object.fromEntries(FL.map(f => [f.id, flowerText(f)]));
  function atlasList() {
    const q = norm(atlas.q.trim());
    return FL.filter(f => (atlas.group === 'all' || f.group === atlas.group)
      && (!atlas.colors.size || f.colors.some(c => atlas.colors.has(c)))
      && (atlas.status === 'all' || f.status === atlas.status)
      && (atlas.family === 'all' || f.family === atlas.family)
      && (!atlas.now || inBloom(f))
      && (!q || TEXT[f.id].includes(q)));
  }
  function renderFilters() {
    $('#group-seg').innerHTML = segHtml('group', atlas.group);
    $('#color-chips').innerHTML = C.colors.map(c => `<button type="button" class="chip color${atlas.colors.has(c.id) ? ' on' : ''}" data-color="${c.id}" title="${esc(c.en)}"><span class="dot" style="--c:${c.hex}"></span>${bi(c.en, c.zh)}</button>`).join('');
    $('#status-chips').innerHTML = Object.entries(C.status).map(([k, s]) => `<button type="button" class="chip${atlas.status === k ? ' on' : ''}" data-status="${k}">${biO(s)}</button>`).join('');
    const t = $('#now-toggle');
    t.innerHTML = `<span class="sw"></span>${only('Blooming in ', '')}${monthName(NOW)}${only('', '开花')}`;
    t.classList.toggle('on', atlas.now); t.setAttribute('aria-pressed', atlas.now);
  }
  function renderFamilySelect() {
    const fams = [...new Set(FL.map(f => f.family))].sort();
    const sel = $('#family-select');
    const lbl = f => { const x = FL.find(y => y.family === f); return lang === 'zh' ? `${x.familyZh} ${f}` : `${f} (${x.familyEn.replace(' family', '')})`; };
    sel.innerHTML = `<option value="all">${lang === 'zh' ? '全部科' : 'All families'}</option>` + fams.map(f => `<option value="${f}"${atlas.family === f ? ' selected' : ''}>${esc(lbl(f))}</option>`).join('');
  }
  function card(f) {
    return `<article class="fcard" data-open="${f.id}" tabindex="0" role="button" aria-label="${esc(f.en)}">
      <div class="fimg"><img src="${f.thumb}" width="520" height="390" loading="lazy" decoding="async" alt="${esc(f.en)}">${f.warn ? `<span class="warn-badge" title="Caution">!</span>` : ''}</div>
      <div class="fbody"><h3>${nameHtml(f)}</h3><div class="sci">${sciHtml(f, false)}</div>
      <div class="meta">${statusTag(f)}<span class="fam">${bi(f.family, f.familyZh)}</span>${colorDots(f)}</div>
      ${bloomBar(f)}</div></article>`;
  }
  let atlasCurrent = FL;
  function renderAtlas() {
    renderFilters();
    const list = atlasList();
    atlasCurrent = list.length ? list : FL;
    $('#atlas').innerHTML = list.map(card).join('') || `<p class="count">${bi('No flower matches these filters.', '没有符合条件的花。')}</p>`;
    $('#atlas-count').innerHTML = bi(`${list.length} of ${FL.length} flowers`, `显示 ${list.length} / ${FL.length} 种`);
    const filtering = atlas.group !== 'all' || atlas.colors.size || atlas.status !== 'all' || atlas.family !== 'all' || atlas.now || atlas.q;
    $('#atlas-clear').classList.toggle('hidden', !filtering);
  }

  // ---------------------------------------------------------------- flower sheet
  const sheet = { id: null, list: FL, photo: 0 };
  function pairOf(f) { return C.lookalikes.filter(p => p.a === f.id || p.b === f.id); }
  function renderSheet() {
    const f = byId[sheet.id], g = groupById[f.group], p = f.photos[sheet.photo];
    const habit = D.habits[f.habit];
    const pairs = pairOf(f).map(pr => { const o = byId[pr.a === f.id ? pr.b : pr.a]; return `<a href="#pair-${pr.a}" class="mini-link" data-pair="${pr.a}">${bi('Compare with ', '对比：')}${bi(o.en, o.zh)}</a>`; }).join('');
    $('#sheet-body').innerHTML = `
      <div class="sheet-media">
        <button type="button" class="main-img" data-zoom="${sheet.photo}" aria-label="Enlarge photo"><img src="${p.src}" width="${p.w}" height="${p.h}" alt="${esc(f.en)}"></button>
        <div class="credit">${creditHtml(p)}</div>
        <div class="thumbs">${f.photos.map((q, i) => `<button type="button" data-photo="${i}" class="${i === sheet.photo ? 'on' : ''}" aria-label="Photo ${i + 1}"><img src="${q.src}" loading="lazy" alt=""></button>`).join('')}</div>
      </div>
      <div class="sheet-info">
        <div class="kicker">${g.icon} ${bi(g.en, g.zh)}</div>
        <h2 id="sheet-title">${nameHtml(f)}</h2>
        <div class="sci">${sciHtml(f)}</div>
        ${f.other ? `<div class="other">${bi('Also called', '英文别名')}: ${esc(f.other)}</div>` : ''}
        <div class="facts">
          <div><b>${bi('Family', '科')}</b>${bi(`${f.family} · ${f.familyEn}`, `${f.familyZh} ${f.family}`)}</div>
          <div><b>${bi('Growth form', '生长型')}</b>${biO(habit)}</div>
          <div><b>${bi('Status', '来源')}</b>${statusTag(f)}</div>
          <div><b>${bi('Flower colour', '花色')}</b>${colorDots(f)} ${f.colors.map(c => biO(colorById[c])).join(bi(', ', '、'))}</div>
        </div>
        <p class="desc">${biO(f.desc)}</p>
        <h4>${bi('How to recognise it', '识别要点')}</h4>
        <ul class="feat">${f.features.map(x => `<li>${biO(x)}</li>`).join('')}</ul>
        ${f.warn ? `<div class="note warn"><b>${bi('Caution', '注意')}</b>${biO(f.warn)}</div>` : ''}
        <h4>${bi('Bloom calendar', '花期')}</h4>
        ${bloomBar(f, true)}
        <p class="src-note">${biO(C.bloomSrc[f.bloomSrc])}</p>
        ${f.fix ? `<div class="note fix"><b>${bi('Correction to the original notes', '原笔记勘误')}</b>${biO(f.fix)}</div>` : ''}
        ${pairs ? `<div class="pair-links">${pairs}</div>` : ''}
        <div class="links">${f.links.map(l => `<a class="chip-link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('')}</div>
      </div>`;
    const i = sheet.list.findIndex(x => x.id === f.id);
    $('#sheet-prev').disabled = $('#sheet-next').disabled = sheet.list.length < 2 || i < 0;
  }
  let lastFocus = null;
  function openSheet(id, list) {
    sheet.id = id; sheet.photo = 0;
    sheet.list = list && list.some(f => f.id === id) ? list : FL;
    renderSheet();
    const el = $('#sheet');
    if (!el.classList.contains('open')) { lastFocus = document.activeElement; el.classList.add('open'); document.body.classList.add('noscroll'); }
    el.querySelector('.sheet-card').scrollTop = 0;
    $('#sheet-close').focus({ preventScroll: true });
  }
  function closeSheet() {
    $('#sheet').classList.remove('open'); document.body.classList.remove('noscroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function stepSheet(d) {
    const i = sheet.list.findIndex(x => x.id === sheet.id);
    if (i < 0) return;
    openSheet(sheet.list[(i + d + sheet.list.length) % sheet.list.length].id, sheet.list);
  }

  // ---------------------------------------------------------------- bloom calendar
  const cal = { group: 'all' };
  const peakOf = f => { let best = 0; f.bloom.forEach((v, m) => { if (v > f.bloom[best]) best = m; }); return best; };
  function renderCalendar() {
    $('#cal-seg').innerHTML = segHtml('cal', cal.group);
    const list = FL.filter(f => cal.group === 'all' || f.group === cal.group).sort((a, b) => peakOf(a) - peakOf(b) || b.bloom.reduce((s, v) => s + v, 0) - a.bloom.reduce((s, v) => s + v, 0));
    const head = `<div class="cal-row cal-head"><div class="cal-name"></div>${MONTHS_EN.map((m, i) => `<div class="cal-m${i === NOW ? ' now' : ''}">${bi(m, `${i + 1}月`)}</div>`).join('')}</div>`;
    $('#calendar').innerHTML = head + list.map(f => `<div class="cal-row"><button type="button" class="cal-name" data-open="${f.id}" data-list="cal">${nameHtml(f)}${f.bloomSrc === 'garden' ? `<span class="garden-mark" title="Typical garden season">*</span>` : ''}</button>${f.bloom.map((v, m) => `<div class="cal-c${m === NOW ? ' now' : ''}" style="--a:${(v / 100).toFixed(2)}"></div>`).join('')}</div>`).join('')
      + `<p class="src-note">${bi('* Typical garden bloom season.', '* 花园中的典型花期。')}</p>`;
    calList = list;
  }
  let calList = FL;

  // ---------------------------------------------------------------- look-alikes
  function renderPairs() {
    $('#pairs').innerHTML = C.lookalikes.map(p => {
      const a = byId[p.a], b = byId[p.b];
      const side = f => `<button type="button" class="pair-side" data-open="${f.id}"><img src="${f.thumb}" loading="lazy" alt="${esc(f.en)}"><span>${nameHtml(f)}</span></button>`;
      return `<article class="pair" id="pair-${p.a}">
        <h3>${bi(p.en, p.zh)}</h3>
        <div class="pair-pics">${side(a)}<span class="vs">vs</span>${side(b)}</div>
        <table class="cmp"><thead><tr><th></th><th>${bi(a.en, a.zh)}</th><th>${bi(b.en, b.zh)}</th></tr></thead>
        <tbody>${p.rows.map(r => `<tr><th>${bi(r.en, r.zh)}</th><td>${biO(r.a)}</td><td>${biO(r.b)}</td></tr>`).join('')}</tbody></table>
        <p class="tip">${biO(p.tip)}</p></article>`;
    }).join('');
  }

  // ---------------------------------------------------------------- basics: inflorescence figure, families
  function renderInflorescences() {
    const STEM = '#4f7a2c', FLW = '#c25b9b';
    const circ = (x, y, r, fill = FLW, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${extra}/>`;
    const line = (x1, y1, x2, y2, w = 2.5) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${STEM}" stroke-width="${w}" stroke-linecap="round"/>`;
    const draw = {
      solitary: () => line(60, 112, 60, 46, 3) + [0, 72, 144, 216, 288].map(a => { const r = a * Math.PI / 180; return circ(60 + 13 * Math.sin(r), 34 - 13 * Math.cos(r), 9); }).join('') + circ(60, 34, 6, '#f2c230'),
      spike: () => line(60, 112, 60, 16, 3) + [24, 38, 52, 66, 80].map((y, i) => circ(i % 2 ? 67 : 53, y, 6.5)).join('') + circ(60, 14, 4),
      raceme: () => line(60, 112, 60, 14, 3) + [26, 44, 62, 80].map((y, i) => { const x = i % 2 ? 84 : 36; return line(60, y + 8, x, y) + circ(x, y, 6.5); }).join('') + circ(60, 12, 4.5),
      panicle: () => line(60, 112, 60, 16, 3) + [[30, 26], [52, 34], [76, 42]].map(([y, len], i) => {
        const s = i % 2 ? 1 : -1, x2 = 60 + s * len;
        return line(60, y + 14, x2, y) + [0.45, 0.75, 1].map(t => { const x = 60 + s * len * t, yy = y + 14 - 14 * t; return line(x, yy, x, yy - 9, 1.6) + circ(x, yy - 11, 4); }).join('');
      }).join('') + circ(60, 13, 4.5),
      umbel: () => line(60, 112, 60, 64, 3) + [-150, -125, -100, -80, -55, -30].map(a => { const r = a * Math.PI / 180, x = 60 + 40 * Math.cos(r), y = 64 + 40 * Math.sin(r); return line(60, 64, x, y, 1.8) + circ(x, y, 6); }).join(''),
      compound: () => line(60, 112, 60, 72, 3) + [-145, -112, -90, -68, -35].map(a => {
        const r = a * Math.PI / 180, x = 60 + 30 * Math.cos(r), y = 72 + 30 * Math.sin(r);
        return line(60, 72, x, y, 1.8) + [-140, -110, -70, -40].map(b => { const q = b * Math.PI / 180, x2 = x + 12 * Math.cos(q), y2 = y + 12 * Math.sin(q); return line(x, y, x2, y2, 1) + circ(x2, y2, 2.8, '#f4f1ea', ' stroke="#8e8e8e" stroke-width="0.8"'); }).join('');
      }).join(''),
      head: () => line(60, 112, 60, 58, 3) + `<path d="M34,58 Q60,40 86,58 Z" fill="#7fa34a"/>` + [[-22, 52], [-11, 44], [0, 41], [11, 44], [22, 52], [-15, 54], [-4, 49], [7, 49], [16, 55], [-6, 56], [5, 56]].map(([dx, y]) => circ(60 + dx, y, 4.6)).join(''),
      coil: () => `<path d="M60,112 L60,62 Q60,26 88,28 Q106,32 100,50 Q95,62 82,56 Q76,52 80,46" fill="none" stroke="${STEM}" stroke-width="3" stroke-linecap="round"/>` +
        [[52, 84, 6.5], [52, 66, 6.5], [56, 46, 6], [66, 32, 5.5], [84, 22, 5], [106, 40, 4], [94, 62, 3], [86, 44, 2.5]].map(([x, y, r]) => circ(x, y, r)).join(''),
    };
    const W = 120, H = 165;
    $('#inflo-svg').innerHTML = C.inflorescences.map((t, i) => {
      const ox = (i % 4) * W, oy = Math.floor(i / 4) * H;
      return `<g transform="translate(${ox} ${oy})">${draw[t.id]()}<text x="60" y="134" text-anchor="middle" class="t"><tspan class="en">${esc(t.en)}</tspan><tspan class="zh">${esc(t.zh)}</tspan></text><text x="60" y="151" text-anchor="middle" class="ex"><tspan class="en">${esc(t.ex.en)}</tspan><tspan class="zh">${esc(t.ex.zh)}</tspan></text></g>`;
    }).join('');
  }
  function renderDaisy() {
    let rays = '';
    for (let i = 0; i < 16; i++) rays += `<ellipse cx="120" cy="72" rx="11" ry="40" transform="rotate(${i * 22.5} 120 150)"/>`;
    $('#daisy-rays').innerHTML = rays;
    let dots = '';
    for (let r = 8; r <= 28; r += 9) { const n = Math.round(2 * Math.PI * r / 9); for (let k = 0; k < n; k++) { const a = 2 * Math.PI * k / n + r; dots += `<circle cx="${(120 + r * Math.cos(a)).toFixed(1)}" cy="${(150 + r * Math.sin(a)).toFixed(1)}" r="2.6"/>`; } }
    $('#daisy-disc').innerHTML = dots + '<circle cx="120" cy="150" r="2.6"/>';
  }
  function renderFamilies() {
    $('#families').innerHTML = C.families.map(fa => {
      const fams = fa.fams || [fa.id];
      const members = FL.filter(f => fams.includes(f.family));
      const la = fa.la || fa.id;
      return `<div class="family"><h4>${members[0] ? `<img src="${members[0].thumb}" alt="" loading="lazy">` : ''}<span>${bi(fa.en, fa.zh)}<small><i>${esc(la)}</i></small></span></h4>
        <p>${biO(fa.tip)}</p><div class="members">${members.map(f => `<button type="button" class="mchip" data-open="${f.id}">${bi(f.en, f.zh)}</button>`).join('')}</div></div>`;
    }).join('');
  }

  // ---------------------------------------------------------------- places, etiquette, tools
  function renderWhere() {
    const card = (k, title, url, d) => `<a class="link-card" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span class="k">${k}</span><strong>${title}</strong><span class="d">${d}</span></a>`;
    ['ca', 'rockies'].forEach(r => {
      $('#places-' + r).innerHTML = C.places.filter(p => p.region === r).map(p => card(biO(p.when), bi(p.name, p.nameZh), p.url, bi(p.en, p.zh))).join('');
    });
    $('#etiquette').innerHTML = C.etiquette.map(e => `<li>${biO(e)}</li>`).join('');
    $('#tools').innerHTML = C.tools.map(t => card(biO(t.kind), bi(t.name, t.nameZh || t.name), t.url, bi(t.en, t.zh))).join('');
  }

  // ---------------------------------------------------------------- quiz
  const quiz = { group: 'all', cur: null, photo: null, done: false, right: 0, total: 0 };
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function newQuestion() {
    const pool = FL.filter(f => quiz.group === 'all' || f.group === quiz.group);
    let f; do { f = pick(pool); } while (pool.length > 1 && quiz.cur && f.id === quiz.cur.id);
    quiz.cur = f; quiz.photo = pick(f.photos); quiz.done = false;
    // Wrong answers: prefer the same region and similar colours so the choice is not trivial.
    const others = shuffle(pool.filter(x => x.id !== f.id));
    others.sort((x, y) => (y.colors.some(c => f.colors.includes(c)) ? 1 : 0) - (x.colors.some(c => f.colors.includes(c)) ? 1 : 0));
    const opts = shuffle([f, ...others.slice(0, 3)]);
    $('#quiz-img').src = quiz.photo.src;
    $('#quiz-credit').innerHTML = '';
    $('#quiz-options').innerHTML = opts.map(o => `<button type="button" class="qopt" data-q="${o.id}">${bi(o.en, o.zh)}</button>`).join('');
    $('#quiz-feedback').innerHTML = '';
    $('#quiz-open').classList.add('hidden');
    renderScore();
  }
  function renderScore() {
    $('#quiz-seg').innerHTML = segHtml('quiz', quiz.group);
    $('#quiz-score').innerHTML = bi(`Score: ${quiz.right} / ${quiz.total}`, `得分：${quiz.right} / ${quiz.total}`);
  }
  function answer(id) {
    if (quiz.done) return;
    quiz.done = true; quiz.total++;
    const f = quiz.cur, ok = id === f.id;
    if (ok) quiz.right++;
    document.querySelectorAll('.qopt').forEach(b => { b.disabled = true; b.classList.toggle('right', b.dataset.q === f.id); b.classList.toggle('wrong', b.dataset.q === id && !ok); });
    $('#quiz-feedback').innerHTML = (ok ? `<b class="ok">${bi('Correct!', '答对了！')}</b> ` : `<b class="no">${bi('Not quite.', '不对哦。')}</b> ${bi('It is ', '正确答案是')}${bi(f.en, f.zh)}${bi('.', '。')} `) + `<span class="hint">${biO(f.features[0])}</span>`;
    $('#quiz-open').classList.remove('hidden');
    $('#quiz-credit').innerHTML = creditHtml(quiz.photo);
    renderScore();
  }

  // ---------------------------------------------------------------- events
  function bind() {
    $('#lang-toggle').addEventListener('click', () => {
      applyLang(lang === 'zh' ? 'en' : 'zh');
      try { sessionStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
    });
    $('#atlas-search').addEventListener('input', e => { atlas.q = e.target.value; renderAtlas(); });
    $('#toolbar').addEventListener('click', e => {
      const g = e.target.closest('#group-seg button'); if (g) { atlas.group = g.dataset.g; renderAtlas(); return; }
      const c = e.target.closest('[data-color]'); if (c) { const k = c.dataset.color; atlas.colors.has(k) ? atlas.colors.delete(k) : atlas.colors.add(k); renderAtlas(); return; }
      const s = e.target.closest('[data-status]'); if (s) { atlas.status = atlas.status === s.dataset.status ? 'all' : s.dataset.status; renderAtlas(); return; }
      if (e.target.closest('#now-toggle')) { atlas.now = !atlas.now; renderAtlas(); }
    });
    $('#family-select').addEventListener('change', e => { atlas.family = e.target.value; renderAtlas(); });
    $('#atlas-clear').addEventListener('click', () => {
      Object.assign(atlas, { group: 'all', status: 'all', family: 'all', now: false, q: '' }); atlas.colors.clear();
      $('#atlas-search').value = ''; renderFamilySelect(); renderAtlas();
    });
    $('#now-btn').addEventListener('click', () => {
      Object.assign(atlas, { group: 'all', status: 'all', family: 'all', now: true, q: '' }); atlas.colors.clear();
      $('#atlas-search').value = ''; renderFamilySelect(); renderAtlas();
      $('#atlas-sec').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('#cal-seg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { cal.group = b.dataset.g; renderCalendar(); } });
    $('#quiz-seg').addEventListener('click', e => { const b = e.target.closest('button'); if (b && b.dataset.g !== quiz.group) { quiz.group = b.dataset.g; newQuestion(); } });
    $('#quiz-options').addEventListener('click', e => { const b = e.target.closest('.qopt'); if (b) answer(b.dataset.q); });
    $('#quiz-next').addEventListener('click', newQuestion);
    $('#quiz-open').addEventListener('click', () => openSheet(quiz.cur.id));

    document.addEventListener('click', e => {
      const op = e.target.closest('[data-open]');
      if (op && !e.target.closest('#sheet')) {
        const list = op.dataset.list === 'cal' ? calList : op.closest('#atlas') ? atlasCurrent : null;
        openSheet(op.dataset.open, list); return;
      }
      if (op) { openSheet(op.dataset.open); return; }
      const ph = e.target.closest('[data-photo]');
      if (ph) { sheet.photo = +ph.dataset.photo; renderSheet(); return; }
      const z = e.target.closest('[data-zoom]');
      if (z) { openLb(flowerPhotos(byId[sheet.id]), +z.dataset.zoom); return; }
      const pr = e.target.closest('[data-pair]');
      if (pr) { e.preventDefault(); closeSheet(); document.getElementById('pair-' + pr.dataset.pair).scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    document.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.fcard')) { e.preventDefault(); openSheet(e.target.dataset.open, atlasCurrent); return; }
      if (lb.el.classList.contains('open')) {
        if (e.key === 'Escape') lb.el.classList.remove('open');
        if (e.key === 'ArrowLeft') stepLb(-1);
        if (e.key === 'ArrowRight') stepLb(1);
        return;
      }
      if ($('#sheet').classList.contains('open')) {
        if (e.key === 'Escape') closeSheet();
        if (e.key === 'ArrowLeft') stepSheet(-1);
        if (e.key === 'ArrowRight') stepSheet(1);
      }
    });
    $('#sheet').addEventListener('click', e => { if (e.target.id === 'sheet') closeSheet(); });
    $('#sheet-close').addEventListener('click', closeSheet);
    $('#sheet-prev').addEventListener('click', () => stepSheet(-1));
    $('#sheet-next').addEventListener('click', () => stepSheet(1));
    lb.el = $('#lightbox');
    lb.el.addEventListener('click', e => {
      if (e.target.closest('.prev')) stepLb(-1);
      else if (e.target.closest('.next')) stepLb(1);
      else if (e.target.closest('.x') || e.target === lb.el) lb.el.classList.remove('open');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHero(); renderFamilySelect(); renderAtlas(); renderCalendar(); renderPairs();
    renderDaisy(); renderInflorescences(); renderFamilies(); renderWhere(); newQuestion();
    bind();
    applyLang(lang);
  });
})();
