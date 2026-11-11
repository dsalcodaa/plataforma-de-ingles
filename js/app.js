(function () {
  'use strict';
  const C = window.CONTENT, L = window.Logic;
  const KEY = 'encaixe:v1';
  const root = document.getElementById('app');
  const GRADED = new Set(['build', 'choose', 'order', 'type', 'transform', 'fix', 'dialog']);
  const STAGES = { 1: 'Construir', 2: 'Recuperar', 3: 'Automatizar' };
  const XP = { 1: 10, 2: 12, 3: 15 };
  const STATUS = { nova: 'Nova', aprendendo: 'Aprendendo', consolidando: 'Consolidando', dominada: 'Dominada' };

  // ── Índice do conteúdo. A resposta correta é sempre a primeira opção no banco de conteúdo.
  const LESSONS = [], META = {};
  for (const lv of C.levels) for (const m of lv.modules || []) for (const les of m.lessons || []) {
    les.level = lv.id; les.module = m;
    LESSONS.push(les);
    les.steps.forEach((st, i) => {
      st.id = st.id || les.id + '-' + i;
      st.stage = st.stage || 1;
      if (st.options && st.answer == null) st.answer = st.options[0];
      if (st.words && st.answer == null) st.answer = st.words.join(' ');
      (st.steps || []).forEach(s => { if (s.answer == null) s.answer = s.options[0]; });
      (st.turns || []).forEach(t => { if (t.options && t.answer == null) t.answer = t.options[0]; });
      if (GRADED.has(st.type)) META[st.id] = { lesson: les, structure: les.structure, type: st.type, context: st.context || 'rotina', step: st };
    });
  }

  // ── Estado (localStorage)
  // shortcut: progresso só neste navegador; migrar para Supabase quando houver login e sincronização.
  let S = load();
  let P = null; // sessão em andamento (lição ou revisão)
  let tab = 'trilha';

  function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* armazenamento cheio ou bloqueado */ } }
  function fresh(name, goal) { return { profile: { name, goal }, xp: 0, days: {}, cards: {}, lessons: {}, errors: [], ach: {}, recalled: 0, fast: 0 }; }
  const today = () => L.dateKey(Date.now());
  function addXP(n) { S.xp += n; S.days[today()] = (S.days[today()] || 0) + n; }

  // ── Utilidades de DOM
  function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    for (const k in props || {}) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'svg') e.innerHTML = v; // só ícones internos
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat(3)) if (c != null && c !== false && c !== '') e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  function mount(node) { root.replaceChildren(node); window.scrollTo(0, 0); }
  function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
  const fmtS = ms => (ms / 1000).toFixed(1).replace('.', ',') + ' s';
  const pct = x => Math.round(x * 100) + '%';

  const ICONS = {
    flame: '<path d="M12 3s5 4.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 2 1.3 3 2.5 3 0-3-1-5.5 0-8z"/>',
    path: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/>',
    repeat: '<path d="M4 11a8 8 0 0 1 14-4.5L20 8.5M20 4v4.5h-4.5M20 13a8 8 0 0 1-14 4.5L4 15.5M4 20v-4.5h4.5"/>',
    chart: '<path d="M5 20V11M12 20V5M19 20v-6M3 20h18"/>',
    speaker: '<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    lock: '<rect x="5.5" y="11" width="13" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/>',
  };
  const icon = (n, cls) => h('span', { class: 'ico ' + (cls || ''), 'aria-hidden': 'true', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>` });

  // ── Voz (Web Speech API, sem dependência)
  let voice = null;
  function pickVoice() { const vs = speechSynthesis.getVoices(); voice = vs.find(v => v.lang === C.language.tts) || vs.find(v => v.lang.startsWith(C.language.code)) || null; }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, queue) {
    if (!('speechSynthesis' in window) || !text) return;
    if (!queue) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = C.language.tts; u.rate = 0.95; if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }
  const sayBtn = text => h('button', { class: 'say', type: 'button', 'aria-label': 'Ouvir: ' + text, title: 'Ouvir', onclick: () => speak(text) }, icon('speaker'));
  const joinParts = parts => parts.map(p => p[0]).join(' ');

  // ── Derivados
  function dueCards() { const now = Date.now(); return Object.values(S.cards).filter(c => META[c.id] && c.due <= now); }
  function structureStats() {
    return Object.keys(C.structures).map(sid => {
      const cards = Object.values(S.cards).filter(c => META[c.id] && META[c.id].structure === sid);
      return Object.assign({ id: sid, name: C.structures[sid].name, level: C.structures[sid].level }, L.mastery(cards, META));
    });
  }
  function lessonState(les) {
    if (S.lessons[les.id]) return 'done';
    const list = les.module.lessons, i = list.indexOf(les);
    return i === 0 || S.lessons[list[i - 1].id] ? 'open' : 'locked';
  }

  const ACH = [
    { id: 'first', name: 'Primeira estrutura', desc: 'Concluiu a primeira lição.', test: () => Object.keys(S.lessons).length >= 1 },
    { id: 'module', name: 'Módulo completo', desc: 'Concluiu o módulo Simple Past.', test: () => LESSONS.filter(l => l.module.id === 'simple-past').every(l => S.lessons[l.id]) },
    { id: 'streak3', name: 'Ritmo', desc: '3 dias seguidos de treino.', test: () => L.streak(S.days, Date.now()) >= 3 },
    { id: 'recall10', name: 'Memória de longo prazo', desc: '10 acertos em revisões após 1 dia ou mais.', test: () => S.recalled >= 10 },
    { id: 'fast10', name: 'Resposta natural', desc: '10 respostas corretas em menos de 6 s no estágio Automatizar.', test: () => S.fast >= 10 },
    { id: 'master', name: 'Domínio real', desc: 'Uma estrutura dominada de verdade.', test: () => structureStats().some(s => s.status === 'dominada') },
  ];
  function checkAchievements() {
    const got = [];
    for (const a of ACH) if (!S.ach[a.id] && a.test()) { S.ach[a.id] = Date.now(); got.push(a); }
    return got;
  }

  // ── Telas principais
  function render() {
    if (!S) return renderOnboarding();
    if (P) return renderPlayer();
    mount(shell(tab === 'progresso' ? progressView() : tab === 'revisar' ? reviewView() : pathView()));
  }
  function go(t) { tab = t; render(); }

  const brand = () => h('div', { class: 'brand' }, h('span', { class: 'brand-mark', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), 'encaixe');

  function renderOnboarding() {
    let goal = 30;
    const name = h('input', { class: 'input', id: 'name', placeholder: 'Como podemos te chamar?', autocomplete: 'given-name', maxlength: 30 });
    const goals = [[20, 'Leve', '~5 min'], [30, 'Regular', '~10 min'], [60, 'Intenso', '~20 min']];
    const grid = h('div', { class: 'goal-grid', role: 'radiogroup', 'aria-label': 'Meta diária' },
      goals.map(([v, l, d]) => h('button', {
        class: 'goal' + (v === goal ? ' on' : ''), type: 'button', role: 'radio', 'aria-checked': String(v === goal),
        onclick: e => { goal = v; for (const b of grid.children) { const on = b === e.currentTarget; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); } },
      }, h('strong', {}, l), h('span', {}, `${v} XP · ${d}`))));
    const start = () => { S = fresh(name.value.trim() || 'Estudante', goal); save(); go('trilha'); };
    mount(h('main', { class: 'onb' },
      brand(),
      h('h1', {}, 'Pare de traduzir.', h('br'), 'Comece a montar.'),
      h('p', { class: 'lead' }, 'Você aprende uma estrutura, monta frases peça por peça e treina até responder em inglês sem pensar em português.'),
      h('div', { class: 'onb-demo', 'aria-hidden': 'true' },
        h('span', { class: 'w r-subject' }, 'I'), h('span', { class: 'w r-verb' }, 'went'), h('span', { class: 'w r-comp' }, 'to the beach'), h('span', { class: 'slot' }, '?')),
      h('label', { class: 'label', for: 'name' }, 'Seu nome'), name,
      h('p', { class: 'label' }, 'Meta diária'), grid,
      h('div', { class: 'foot static' }, h('button', { class: 'btn primary', type: 'button', onclick: start }, 'Começar'))));
    name.focus();
  }

  function shell(content) {
    const due = dueCards().length, tx = S.days[today()] || 0, goal = S.profile.goal;
    const tabBtn = (id, label, ic, badge) => h('button', { class: 'tab' + (tab === id ? ' on' : ''), type: 'button', 'aria-current': tab === id ? 'page' : null, onclick: () => go(id) },
      icon(ic), h('span', {}, label), badge ? h('b', { class: 'badge', 'aria-label': badge + ' pendentes' }, String(badge)) : null);
    return h('div', { class: 'shell' },
      h('header', { class: 'top' }, brand(),
        h('div', { class: 'top-stats' },
          h('span', { class: 'pill', title: 'Dias seguidos' }, icon('flame', 'flame'), String(L.streak(S.days, Date.now()))),
          ring(tx, goal))),
      h('main', { class: 'content' }, content),
      h('nav', { class: 'tabs', 'aria-label': 'Navegação' }, tabBtn('trilha', 'Trilha', 'path'), tabBtn('revisar', 'Revisar', 'repeat', due), tabBtn('progresso', 'Progresso', 'chart')));
  }

  function ring(v, goal) {
    const r = 15, c = 2 * Math.PI * r, f = Math.min(1, v / goal);
    return h('span', { class: 'ring', title: `Meta diária: ${v}/${goal} XP`, role: 'img', 'aria-label': `Meta diária: ${v} de ${goal} XP`,
      svg: `<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="${r}" class="ring-bg"/><circle cx="18" cy="18" r="${r}" class="ring-fg" stroke-dasharray="${c * f} ${c}"/></svg><b>${v}</b>` });
  }

  function pathView() {
    const due = dueCards().length;
    const stats = Object.fromEntries(structureStats().map(s => [s.id, s]));
    return h('div', {},
      h('h1', { class: 'hello' }, `Olá, ${S.profile.name}.`),
      due ? h('button', { class: 'card cta', type: 'button', onclick: () => startReview(false) },
        icon('repeat'), h('div', {}, h('strong', {}, `${due} ${due === 1 ? 'item' : 'itens'} para revisar`), h('span', {}, 'Revisar agora fixa o que você aprendeu.'))) : null,
      C.levels.map(lv => lv.modules
        ? h('section', { class: 'level' },
            h('h2', { class: 'level-h' }, h('span', { class: 'cefr' }, lv.id), lv.title),
            lv.modules.filter(m => m.lessons).map(m => h('div', { class: 'module' },
              h('div', { class: 'module-h' }, h('h3', {}, m.title), h('span', {}, m.subtitle)),
              h('ol', { class: 'nodes' }, m.lessons.map((les, i) => {
                const st = lessonState(les), ms = stats[les.structure];
                return h('li', {}, h('button', {
                  class: 'node ' + st, type: 'button', disabled: st === 'locked',
                  onclick: () => startLesson(les),
                }, h('span', { class: 'node-n' }, st === 'done' ? icon('check') : st === 'locked' ? icon('lock') : String(i + 1)),
                  h('span', { class: 'node-t' }, h('strong', {}, les.title), h('span', {}, les.subtitle)),
                  st === 'done' ? h('span', { class: 'chip s-' + ms.status }, STATUS[ms.status]) : st === 'open' ? h('span', { class: 'chip go' }, 'Começar') : null));
              })))),
            h('div', { class: 'soon' }, h('p', { class: 'label' }, 'Próximos módulos'),
              h('ul', { class: 'soon-list' }, lv.modules.filter(m => m.soon).map(m => h('li', {}, m.title)))))
        : h('details', { class: 'level locked-level' },
            h('summary', {}, h('span', { class: 'cefr' }, lv.id), lv.title, h('span', { class: 'muted' }, 'em breve')),
            h('ul', { class: 'soon-list' }, lv.topics.map(t => h('li', {}, t))))));
  }

  function reviewView() {
    const due = dueCards(), all = Object.values(S.cards).filter(c => META[c.id]);
    const next = all.filter(c => c.due > Date.now()).sort((a, b) => a.due - b.due)[0];
    const rel = t => { const d = Math.round((t - Date.now()) / L.DAY); return d <= 0 ? 'hoje' : d === 1 ? 'amanhã' : `em ${d} dias`; };
    return h('div', {},
      h('h1', { class: 'hello' }, 'Revisão espaçada'),
      h('p', { class: 'lead' }, 'Cada exercício volta no momento em que você está quase esquecendo. Acertar depois de um intervalo é o que mostra que a estrutura ficou.'),
      h('div', { class: 'card big-num' },
        h('strong', {}, String(due.length)), h('span', {}, due.length === 1 ? 'item pronto para revisar' : 'itens prontos para revisar'),
        due.length ? h('button', { class: 'btn primary', type: 'button', onclick: () => startReview(false) }, 'Revisar agora')
          : h('p', { class: 'muted' }, all.length ? `Nada pendente. Próxima revisão ${next ? rel(next.due) : 'em breve'}.` : 'Conclua uma lição para começar a revisar.')),
      all.length ? h('div', { class: 'card' },
        h('h3', {}, 'Treinar pontos fracos'),
        h('p', { class: 'muted' }, 'Os exercícios em que você mais errou, fora do calendário de revisão.'),
        h('button', { class: 'btn', type: 'button', onclick: () => startReview(true) }, 'Treinar agora')) : null);
  }

  function progressView() {
    const st = structureStats();
    const hist = Object.values(S.cards).filter(c => META[c.id]).flatMap(c => c.hist);
    const acc = hist.length ? hist.filter(x => x.ok).length / hist.length : 0;
    const okMs = hist.filter(x => x.ok).map(x => x.ms);
    const avg = okMs.length ? okMs.reduce((a, b) => a + b, 0) / okMs.length : 0;
    const later = hist.filter(x => x.iv >= 1);
    const retention = later.length ? later.filter(x => x.ok).length / later.length : null;
    const real = st.length ? Math.round(st.reduce((a, s) => a + s.score, 0) / st.length) : 0;
    const vocab = [...new Set(LESSONS.filter(l => S.lessons[l.id]).flatMap(l => l.vocab || []))];

    // tempo médio de acerto por dia
    const byDay = {};
    for (const x of hist) if (x.ok) (byDay[L.dateKey(x.t)] = byDay[L.dateKey(x.t)] || []).push(x.ms);
    const series = Object.keys(byDay).sort().slice(-14).map(k => byDay[k].reduce((a, b) => a + b, 0) / byDay[k].length);

    // confusões recorrentes
    const conf = {};
    for (const e of S.errors) if (e.g && e.e) { const k = `${e.g} → ${e.e}`; conf[k] = (conf[k] || 0) + 1; }
    const topConf = Object.entries(conf).sort((a, b) => b[1] - a[1]).slice(0, 6);

    // CEFR: média do domínio dos módulos do nível
    const cefr = C.levels.map(lv => {
      const mods = lv.modules || lv.topics;
      let sum = 0;
      for (const m of lv.modules || []) if (m.lessons) {
        const sids = [...new Set(m.lessons.map(l => l.structure))];
        sum += sids.reduce((a, sid) => a + st.find(s => s.id === sid).score, 0) / sids.length / 100;
      }
      return { id: lv.id, v: sum / mods.length };
    });

    const tile = (v, l, sub) => h('div', { class: 'tile-stat' }, h('strong', {}, v), h('span', {}, l), sub ? h('small', {}, sub) : null);
    return h('div', {},
      h('h1', { class: 'hello' }, 'Seu progresso'),
      h('div', { class: 'card mastery-hero' },
        h('div', { class: 'gauge', style: `--v:${real}` }, h('strong', {}, String(real)), h('span', {}, 'de 100')),
        h('div', {}, h('h3', {}, 'Índice de domínio real'),
          h('p', { class: 'muted' }, 'Conta precisão recente, variedade de exercícios, contextos diferentes e se você ainda acerta depois de dias. Concluir lição sozinho não sobe esse número.'))),
      h('div', { class: 'stats-grid' },
        tile(pct(acc), 'Precisão', `${hist.length} respostas`),
        tile(avg ? fmtS(avg) : '—', 'Tempo médio de acerto', 'menor = mais automático'),
        tile(retention == null ? '—' : pct(retention), 'Retenção após intervalo', retention == null ? 'aparece nas revisões dos próximos dias' : `${later.length} revisões`),
        tile(String(vocab.length), 'Palavras e blocos', 'das lições concluídas')),
      series.length > 1 ? h('div', { class: 'card' }, h('h3', {}, 'Velocidade de resposta'), sparkline(series), h('p', { class: 'muted' }, 'Tempo médio de acerto por dia. A curva descendo indica automatização.')) : null,
      h('div', { class: 'card' }, h('h3', {}, 'Estruturas'),
        h('ul', { class: 'struct-list' }, st.map(s => h('li', {},
          h('div', { class: 'struct-h' }, h('strong', {}, s.name), h('span', { class: 'chip s-' + s.status }, STATUS[s.status])),
          h('div', { class: 'bar' }, h('i', { style: `width:${s.score}%` })),
          h('small', { class: 'muted' }, s.attempts ? `${pct(s.acc)} recente · ${s.types}/3 tipos de exercício · ${s.contexts}/2 contextos · ${s.retained ? 'retida após intervalo' : 'ainda sem revisão espaçada'}` : 'Ainda não praticada'))))),
      h('div', { class: 'card' }, h('h3', {}, 'Evolução por nível (CEFR)'),
        h('ul', { class: 'cefr-list' }, cefr.map(c => h('li', {}, h('span', { class: 'cefr' }, c.id), h('div', { class: 'bar' }, h('i', { style: `width:${Math.round(c.v * 100)}%` })), h('small', {}, pct(c.v)))))),
      h('div', { class: 'card' }, h('h3', {}, 'Confusões recorrentes'),
        topConf.length ? h('ul', { class: 'conf' }, topConf.map(([k, n]) => h('li', {}, h('code', {}, k), h('span', { class: 'muted' }, `${n}×`))))
          : h('p', { class: 'muted' }, 'Nenhuma ainda. Quando você trocar uma palavra pela outra, ela aparece aqui.')),
      vocab.length ? h('div', { class: 'card' }, h('h3', {}, 'Vocabulário em blocos'), h('div', { class: 'vocab' }, vocab.map(v => h('span', { class: 'v' }, v)))) : null,
      h('div', { class: 'card' }, h('h3', {}, 'Conquistas'),
        h('ul', { class: 'ach' }, ACH.map(a => h('li', { class: S.ach[a.id] ? 'on' : '' }, h('strong', {}, a.name), h('span', {}, a.desc))))),
      h('p', { class: 'muted center' }, `${S.xp} XP no total`));
  }

  function sparkline(vals) {
    const w = 300, hh = 64, max = Math.max(...vals), min = Math.min(...vals), span = max - min || 1;
    const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${6 + (1 - (v - min) / span) * (hh - 12)}`).join(' ');
    return h('div', { class: 'spark', role: 'img', 'aria-label': `De ${fmtS(vals[0])} para ${fmtS(vals[vals.length - 1])}`,
      svg: `<svg viewBox="0 0 ${w} ${hh}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>` },
      h('div', { class: 'spark-l' }, h('span', {}, fmtS(vals[0])), h('span', {}, fmtS(vals[vals.length - 1]))));
  }

  // ── Sessões
  function newSession(mode, title, queue, lesson) {
    return { mode, title, lesson, queue, i: 0, xp: 0, graded: 0, okFirst: 0, ms: [], wrong: [], seen: new Set(), retried: new Set() };
  }
  function startLesson(les) { P = newSession('lesson', les.title, les.steps.slice(), les); render(); }
  function startReview(weak) {
    const cards = weak
      ? Object.values(S.cards).filter(c => META[c.id]).sort((a, b) => (b.lapses - a.lapses) || (a.ease - b.ease)).slice(0, 8)
      : dueCards().sort((a, b) => a.due - b.due).slice(0, 12);
    if (!cards.length) return;
    P = newSession('review', weak ? 'Pontos fracos' : 'Revisão', shuffle(cards.map(c => META[c.id].step)));
    render();
  }

  function grade(step, res, ms) {
    if (!GRADED.has(step.type)) return;
    const id = step.id, first = !P.seen.has(id);
    P.seen.add(id);
    const card = S.cards[id] || L.newCard(id), before = card.interval;
    S.cards[id] = L.schedule(card, res.ok, ms, Date.now());
    if (res.ok) {
      let xp = XP[step.stage];
      if (before >= 1) { xp += 5; S.recalled++; } // recuperar depois de dias vale mais
      if (step.stage === 3 && ms < 6000) S.fast++;
      addXP(xp); P.xp += xp; P.ms.push(ms);
    } else {
      const pairs = res.pairs || [L.confusion(res.given, res.model)].filter(Boolean);
      for (const [g, e] of pairs.length ? pairs : [[null, null]]) S.errors.push({ id, s: META[id].structure, g, e, t: Date.now() });
      S.errors = S.errors.slice(-300);
      P.wrong.push({ step, res });
      if (!P.retried.has(id)) { P.retried.add(id); P.queue.push(step); } // volta no fim da sessão
    }
    if (first) { P.graded++; if (res.ok) P.okFirst++; }
    save();
  }

  function renderPlayer() {
    const step = P.queue[P.i];
    if (!step) return finishSession();
    const t0 = performance.now();
    const btn = h('button', { class: 'btn primary', type: 'button', disabled: true }, 'Verificar');
    const foot = h('footer', { class: 'foot' }, h('div', { class: 'foot-in' }, btn));
    let finished = false;
    const ctx = {
      ready(v) { if (!finished) btn.disabled = !v; },
      done(res) {
        if (finished) return;
        finished = true;
        const ms = Math.round(performance.now() - t0);
        grade(step, res, ms);
        feedback(foot, step, res);
      },
    };
    const ex = EX[step.type](step, ctx);
    if (!ex.check) {
      btn.textContent = 'Continuar'; btn.disabled = false; btn.onclick = next;
      if (ex.self) btn.hidden = true;
    } else btn.onclick = () => ctx.done(ex.check());

    const progress = Math.min(1, P.i / P.queue.length);
    mount(h('div', { class: 'player' },
      h('header', { class: 'p-top' },
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Sair da sessão', onclick: () => { P = null; if ('speechSynthesis' in window) speechSynthesis.cancel(); render(); } }, icon('close')),
        h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(progress * 100) }, h('i', { style: `width:${progress * 100}%` })),
        h('span', { class: 'p-xp' }, `${P.xp} XP`)),
      h('main', { class: 'p-main' }, ex.node),
      foot));
    if (ex.focus) ex.focus.focus();
    if (ex.start) ex.start();
  }
  function next() { P.i++; render(); }

  function feedback(foot, step, res) {
    const model = res.model || step.model || step.answer;
    const cont = h('button', { class: 'btn primary', type: 'button', onclick: next }, 'Continuar');
    foot.className = 'foot ' + (res.ok ? 'ok' : 'bad');
    foot.replaceChildren(h('div', { class: 'foot-in' },
      h('div', { class: 'fb', role: 'status', 'aria-live': 'assertive' },
        h('strong', {}, res.ok ? pick(['Isso!', 'Encaixou.', 'Perfeito.', 'Natural.']) : res.partial ? 'Você chegou lá.' : 'Quase.'),
        !res.ok && res.why ? h('p', {}, res.why) : null,
        model ? h('p', { class: 'model' }, res.ok ? '' : 'Resposta: ', h('span', { lang: 'en' }, model), sayBtn(model)) : null,
        !res.ok ? h('small', {}, 'Ela volta no fim da sessão e na sua revisão.') : null),
      cont));
    if (res.ok && model && step.type !== 'build' && step.type !== 'dialog') speak(model);
    cont.focus();
  }
  const pick = a => a[Math.floor(Math.random() * a.length)];

  function finishSession() {
    const s = P;
    let bonus = 0;
    if (s.mode === 'lesson' && !S.lessons[s.lesson.id]) { S.lessons[s.lesson.id] = { t: Date.now() }; bonus = 20; addXP(20); }
    const got = checkAchievements();
    save();
    P = null;
    const avg = s.ms.length ? s.ms.reduce((a, b) => a + b, 0) / s.ms.length : 0;
    const wrongs = [...new Map(s.wrong.map(w => [w.step.id, w])).values()];
    mount(h('div', { class: 'player done' },
      h('main', { class: 'p-main summary' },
        h('p', { class: 'kicker' }, s.mode === 'lesson' ? 'Lição concluída' : 'Sessão concluída'),
        h('h1', {}, s.title),
        h('div', { class: 'stats-grid' },
          h('div', { class: 'tile-stat' }, h('strong', {}, `+${s.xp + bonus}`), h('span', {}, 'XP')),
          h('div', { class: 'tile-stat' }, h('strong', {}, s.graded ? pct(s.okFirst / s.graded) : '—'), h('span', {}, 'acertos de primeira')),
          h('div', { class: 'tile-stat' }, h('strong', {}, avg ? fmtS(avg) : '—'), h('span', {}, 'tempo médio'))),
        got.map(a => h('div', { class: 'card ach-new' }, h('strong', {}, 'Conquista: ' + a.name), h('span', {}, a.desc))),
        wrongs.length ? h('div', { class: 'card' }, h('h3', {}, 'Para revisar'),
          h('ul', { class: 'wrong-list' }, wrongs.map(w => h('li', {},
            h('span', { lang: 'en' }, w.res.model || w.step.model || w.step.answer),
            w.res.why ? h('small', { class: 'muted' }, w.res.why) : null))),
          h('p', { class: 'muted' }, 'Esses itens voltam em 10 minutos na aba Revisar.'))
          : h('p', { class: 'lead' }, s.mode === 'lesson' ? 'Sem erros. A primeira revisão fica para amanhã — é ela que transforma acerto em memória.' : 'Tudo recuperado. Os próximos intervalos ficam mais longos.')),
      h('footer', { class: 'foot static' }, h('div', { class: 'foot-in' }, h('button', { class: 'btn primary', type: 'button', onclick: () => go(s.mode === 'lesson' ? 'trilha' : 'revisar') }, 'Continuar')))));
  }

  // ── Exercícios. Cada um devolve { node, check?, self?, focus?, start? }.
  function head(st, title) {
    return h('div', { class: 'ex-head' },
      h('p', { class: 'kicker' }, h('span', { class: 'stage st-' + st.stage }, STAGES[st.stage]), st.context ? ' · ' + C.contexts[st.context] : ''),
      st.q ? h('p', { class: 'q', lang: 'en' }, st.q, sayBtn(st.q)) : null,
      h('h2', {}, title || st.prompt));
  }

  const EX = {};

  EX.intro = st => ({
    node: h('section', { class: 'ex intro' },
      h('p', { class: 'situation' }, st.situation),
      h('h2', {}, st.title),
      h('p', { class: 'lead' }, st.text),
      st.patterns.map(p => h('div', { class: 'pattern' },
        p.label ? h('span', { class: 'label' }, p.label) : null,
        h('div', { class: 'pattern-row', lang: 'en' }, p.parts.map(([t, r]) => h('span', { class: 'blk r-' + r }, h('small', { lang: 'pt-BR' }, C.roles[r]), t)), sayBtn(joinParts(p.parts))))),
      h('ul', { class: 'tips' }, (st.tips || []).map(t => h('li', {}, t)))),
  });

  EX.demo = st => ({
    node: h('section', { class: 'ex' },
      h('p', { class: 'kicker' }, 'Demonstração'),
      h('h2', {}, 'A mesma estrutura, situações diferentes'),
      h('ul', { class: 'demo' }, st.items.map(it => h('li', {},
        h('span', { class: 'ctx' }, C.contexts[it.context]),
        h('div', { class: 'sent', lang: 'en' }, it.parts.map(([t, r]) => h('span', { class: 'w r-' + r }, t)), sayBtn(joinParts(it.parts))),
        h('p', { class: 'pt' }, it.pt))))),
  });

  // Construção incremental: a frase cresce na tela a cada escolha.
  EX.build = (st, ctx) => {
    let k = 0;
    const pairs = [];
    const line = h('div', { class: 'line', lang: 'en', 'aria-live': 'polite' });
    const ask = h('p', { class: 'ask' });
    const opts = h('div', { class: 'opts' });
    const why = h('p', { class: 'why', role: 'status' });
    const pt = h('p', { class: 'pt' });
    function draw() {
      const old = line.querySelector('.slot'); if (old) old.remove();
      why.textContent = '';
      if (k >= st.steps.length) {
        const s = st.steps.map(x => x.answer).join(' ');
        ask.textContent = 'Frase completa';
        pt.textContent = st.pt || '';
        opts.replaceChildren(sayBtn(s));
        speak(s);
        ctx.done({ ok: pairs.length === 0, partial: pairs.length > 0, model: s, pairs, why: pairs.length ? 'Você montou a frase com ajustes. Ela volta para treino.' : '' });
        return;
      }
      line.append(h('span', { class: 'slot' }, '?'));
      const sp = st.steps[k];
      ask.replaceChildren(h('span', { class: 'ask-n' }, String(k + 1)), sp.ask);
      opts.replaceChildren(...shuffle(sp.options).map(o => h('button', { class: 'tile', type: 'button', lang: 'en', onclick: e => choose(o, e.currentTarget) }, o)));
    }
    function choose(o, b) {
      const sp = st.steps[k];
      if (o === sp.answer) {
        line.querySelector('.slot').remove();
        line.append(h('span', { class: 'w pop r-' + sp.role }, o));
        k++; draw();
      } else {
        pairs.push([L.normalize(o).split(' ')[0], L.normalize(sp.answer).split(' ')[0]]);
        b.classList.add('wrong'); b.disabled = true;
        why.textContent = (sp.why || {})[o] || 'Essa peça não encaixa aqui. Tente outra.';
      }
    }
    draw();
    return { self: true, node: h('section', { class: 'ex' }, head(st), line, ask, opts, why, pt) };
  };

  EX.choose = (st, ctx) => {
    let sel = null;
    const opts = h('div', { class: 'opts col', role: 'radiogroup' }, shuffle(st.options).map(o => h('button', {
      class: 'tile wide', type: 'button', role: 'radio', 'aria-checked': 'false', lang: 'en',
      onclick: e => { sel = o; for (const b of opts.children) { const on = b === e.currentTarget; b.classList.toggle('sel', on); b.setAttribute('aria-checked', String(on)); } ctx.ready(true); },
    }, o)));
    return {
      node: h('section', { class: 'ex' }, head(st), opts),
      check() {
        for (const b of opts.children) { b.disabled = true; if (b.textContent === st.answer) b.classList.add('right'); else if (b.textContent === sel) b.classList.add('wrong'); }
        return Object.assign({ given: sel, model: st.answer }, L.check(st, sel));
      },
    };
  };

  EX.order = (st, ctx) => {
    const placed = [];
    const words = shuffle(st.words.concat(st.extra || [])).map((w, i) => ({ w, i }));
    const line = h('div', { class: 'line drop', lang: 'en' });
    const bank = h('div', { class: 'opts', lang: 'en' });
    function draw() {
      line.replaceChildren(...(placed.length ? placed.map(x => h('button', { class: 'tile in', type: 'button', 'aria-label': 'Remover ' + x.w, onclick: () => { placed.splice(placed.indexOf(x), 1); draw(); } }, x.w))
        : [h('span', { class: 'hint', lang: 'pt-BR' }, 'Toque nas palavras para montar a frase')]));
      bank.replaceChildren(...words.map(x => h('button', { class: 'tile', type: 'button', disabled: placed.includes(x), onclick: () => { placed.push(x); draw(); } }, x.w)));
      ctx.ready(placed.length > 0);
    }
    draw();
    return {
      node: h('section', { class: 'ex' }, head(st), line, bank),
      check() { const g = placed.map(x => x.w).join(' '); for (const b of bank.children) b.disabled = true; for (const b of line.children) b.disabled = true; return Object.assign({ given: g, model: st.answer }, L.check(st, g)); },
    };
  };

  // Resposta escrita: serve para resposta rápida, transformação e correção.
  EX.type = EX.transform = EX.fix = (st, ctx) => {
    const input = h('textarea', { class: 'input big', rows: 2, lang: 'en', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'sentences', 'aria-label': 'Sua resposta em inglês', placeholder: 'Escreva em inglês…' });
    if (st.type === 'fix') input.value = st.source;
    const upd = () => ctx.ready(input.value.trim().length > 0);
    input.addEventListener('input', upd); upd();
    const extra = [];
    const src = st.source ? h('div', { class: 'source', lang: 'en' }, h('span', {}, st.source), sayBtn(st.source)) : null;
    if (st.bank && st.stage < 3) {
      extra.push(h('div', { class: 'opts bank', lang: 'en' }, st.bank.map(w => h('button', { class: 'tile sm', type: 'button', onclick: () => { input.value = (input.value.trim() + ' ' + w).trim(); upd(); input.focus(); } }, w))));
    } else if (st.stage < 3 && st.type !== 'fix') {
      const hint = h('p', { class: 'muted' });
      extra.push(h('button', { class: 'link', type: 'button', onclick: e => { hint.textContent = 'Comece com: ' + (st.model || st.accept[0]).split(' ').slice(0, 2).join(' ') + '…'; e.currentTarget.remove(); } }, 'Ver dica'), hint);
    }
    let timer = null, start = null;
    const clock = h('p', { class: 'clock', 'aria-hidden': 'true' });
    if (st.stage === 3) {
      const best = ((S.cards[st.id] || {}).hist || []).filter(x => x.ok).map(x => x.ms);
      const bestTxt = best.length ? ' · seu melhor: ' + fmtS(Math.min(...best)) : '';
      clock.append(icon('clock'), h('span', {}, '0,0 s' + bestTxt));
      start = () => { const t = performance.now(); timer = setInterval(() => { if (!clock.isConnected) return clearInterval(timer); clock.lastChild.textContent = fmtS(performance.now() - t) + bestTxt; }, 100); };
    }
    return {
      node: h('section', { class: 'ex' }, head(st), src, input, extra,
        st.stage === 3 ? h('div', { class: 'speed-note' }, clock, h('small', {}, 'Sem pressa: o tempo só mede a sua evolução.')) : null),
      focus: input,
      start,
      check() { clearInterval(timer); input.readOnly = true; return Object.assign({ given: input.value, model: st.model || st.accept[0] }, L.check(st, input.value)); },
    };
  };

  EX.dialog = (st, ctx) => {
    let k = 0;
    const pairs = [];
    const chat = h('div', { class: 'chat', lang: 'en', 'aria-live': 'polite' });
    const opts = h('div', { class: 'opts col', lang: 'en' });
    const why = h('p', { class: 'why', role: 'status' });
    let last = '';
    function run() {
      while (k < st.turns.length && st.turns[k].who === 'bot') {
        const t = st.turns[k++];
        chat.append(h('div', { class: 'bubble bot pop' }, h('span', {}, t.text, sayBtn(t.text)), t.pt ? h('small', { lang: 'pt-BR' }, t.pt) : null));
        speak(t.text, true);
      }
      if (k >= st.turns.length) {
        opts.replaceChildren();
        ctx.done({ ok: pairs.length === 0, partial: pairs.length > 0, pairs, model: last, why: pairs.length ? 'Diálogo concluído com ajustes. Ele volta para treino.' : '' });
        return;
      }
      const t = st.turns[k];
      opts.replaceChildren(...shuffle(t.options).map(o => h('button', { class: 'tile wide', type: 'button', onclick: e => {
        if (o === t.answer) { chat.append(h('div', { class: 'bubble me pop' }, o)); why.textContent = ''; last = o; k++; run(); }
        else { const c = L.confusion(o, t.answer); if (c) pairs.push(c); else pairs.push([null, null]); e.currentTarget.classList.add('wrong'); e.currentTarget.disabled = true; why.textContent = (t.why || {})[o] || 'Repare no tempo verbal.'; }
      } }, o)));
    }
    run();
    return { self: true, node: h('section', { class: 'ex' }, head(st, 'Converse usando o passado'), chat, opts, why) };
  };

  // Enter confirma ou continua (exceto quando o foco está num botão, que já reage ao Enter).
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SUMMARY') return;
    const b = document.querySelector('.foot .btn.primary:not([disabled]):not([hidden])');
    if (b) { e.preventDefault(); b.click(); }
  });

  render();
})();
