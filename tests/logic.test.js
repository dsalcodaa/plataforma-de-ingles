// Rodar: node --test tests/logic.test.js tests/reader.test.js
const test = require('node:test');
const assert = require('node:assert');
const L = require('../js/logic.js');

test('toda lição tem quadro-resumo bem formado', () => {
  const C = loadContent();
  for (const l of C.levels.flatMap(lv => lv.modules.flatMap(m => m.lessons))) {
    const intro = l.steps.find(s => s.type === 'intro');
    assert.ok(intro && intro.tables && intro.tables.length, `${l.id}: sem tabela`);
    for (const t of intro.tables) for (const r of t.rows) assert.equal(r.length, t.head.length, `${l.id}: linha com colunas erradas em "${t.title}"`);
  }
});

test('normalize expande contrações e remove pontuação', () => {
  assert.strictEqual(L.normalize("I Didn’t go!"), 'i did not go');
  assert.strictEqual(L.normalize('  Did   they go to Rome? '), 'did they go to rome');
});

test('check: aceitas, padrões, armadilhas', () => {
  const ex = { accept: ["We didn't buy a new TV."], patterns: ['^we never bought'], traps: [{ pattern: 'did not bought', why: 'base' }] };
  assert.ok(L.check(ex, 'we did not buy a new tv').ok);
  assert.ok(L.check(ex, 'We never bought it').ok);
  assert.deepStrictEqual(L.check(ex, "We didn't bought a TV"), { ok: false, why: 'base' });
  assert.strictEqual(L.check({ answer: 'ate', why: { eat: 'presente' } }, 'eat').why, 'presente');
});

test('confusion acha a palavra trocada', () => {
  assert.deepStrictEqual(L.confusion('I eat pizza', 'I ate pizza.'), ['eat', 'ate']);
  assert.strictEqual(L.confusion('I ate pizza', 'I ate pizza'), null);
});

test('schedule: acerto aumenta intervalo, erro volta em 10 min', () => {
  const now = 1e12;
  let c = L.schedule(L.newCard('x'), true, 5000, now);
  assert.strictEqual(c.interval, 1);
  c = L.schedule(c, true, 5000, now + L.DAY);
  assert.ok(c.interval >= 2);
  const w = L.schedule(c, false, 5000, now + 3 * L.DAY);
  assert.strictEqual(w.interval, 0);
  assert.strictEqual(w.due, now + 3 * L.DAY + 10 * 60e3);
  assert.strictEqual(w.hist.length, 3);
});

test('mastery: só "dominada" com tipos, contextos e retenção', () => {
  const meta = { a: { type: 'choose', context: 'rotina' }, b: { type: 'type', context: 'trabalho' }, c: { type: 'build', context: 'rotina' } };
  const hist = iv => [{ t: 1, ok: true, ms: 3000, iv }];
  const fresh = ['a', 'b', 'c'].map(id => ({ id, hist: hist(0) }));
  assert.strictEqual(L.mastery(fresh, meta).status, 'aprendendo');
  const later = ['a', 'b', 'c'].map(id => ({ id, hist: hist(0).concat({ t: 2, ok: true, ms: 2000, iv: 1 }) }));
  assert.strictEqual(L.mastery(later, meta).status, 'dominada');
  assert.strictEqual(L.mastery([], meta).status, 'nova');
});

test('streak conta dias seguidos e tolera hoje vazio', () => {
  const now = new Date(2026, 10, 10, 12).getTime();
  const days = { '2026-11-09': 10, '2026-11-08': 5, '2026-11-06': 5 };
  assert.strictEqual(L.streak(days, now), 2);
  days['2026-11-10'] = 3;
  assert.strictEqual(L.streak(days, now), 3);
});

// Cada exercício do conteúdo precisa aceitar a própria resposta-modelo e rejeitar o erro previsto.
test('conteúdo: respostas-modelo passam na própria correção', () => {
  const C = loadContent();
  const ids = new Set();
  for (const lv of C.levels) for (const m of lv.modules || []) for (const les of m.lessons || []) {
    assert.ok(!ids.has(les.id), `lição repetida: ${les.id}`); ids.add(les.id);
    assert.ok(C.structures[les.structure], `${les.id}: estrutura sem nome`);
    const ctxs = new Set(les.steps.map(s => s.context).filter(Boolean));
    for (const c of ctxs) assert.ok(C.contexts[c], `${les.id}: contexto desconhecido ${c}`);
    for (const st of les.steps) checkStep(les, st);
  }
});

// Carrega o conteúdo na mesma ordem do index.html.
function loadContent() {
  const fs = require('fs'), path = require('path');
  global.window = {};
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  for (const [, src] of html.matchAll(/<script src="(js\/content[^"]*)"/g)) {
    const f = path.join(__dirname, '..', src);
    delete require.cache[require.resolve(f)]; // cada chamada recarrega do zero
    require(f);
  }
  return global.window.CONTENT;
}

function checkStep(les, st) {
  const P = (parts, where) => parts.forEach(([t, r]) => assert.ok(t && ['subject', 'verb', 'aux', 'comp', 'time'].includes(r), `${les.id}: parte inválida em ${where}: ${t}/${r}`));
  if (st.type === 'intro') st.patterns.forEach(p => P(p.parts, 'intro'));
  if (st.type === 'demo') st.items.forEach(it => P(it.parts, 'demo'));
  if (st.type === 'build') st.steps.forEach(sp => { assert.ok(sp.role, `${les.id}: build sem função`); for (const k in sp.why) assert.ok(sp.options.includes(k), `${les.id}: why sem opção "${k}"`); assert.strictEqual(new Set(sp.options).size, sp.options.length, `${les.id}: opção repetida`); });
  if (st.type === 'choose') { for (const k in st.why || {}) assert.ok(st.options.includes(k), `${les.id}: why sem opção "${k}"`); assert.strictEqual(new Set(st.options).size, st.options.length, `${les.id}: opção repetida ${st.prompt}`); }
  if (st.type === 'dialog') st.turns.filter(t => t.who === 'me').forEach(t => { for (const k in t.why) assert.ok(t.options.includes(k), `${les.id}: why sem opção "${k}"`); });
  {
    if (['type', 'transform', 'fix'].includes(st.type)) {
      assert.ok(L.check(st, st.model).ok, `${les.id}: modelo rejeitado "${st.model}"`);
      if (st.type === 'fix') assert.ok(!L.check(st, st.source).ok, `${les.id}: frase errada aceita "${st.source}"`);
    }
    if (st.type === 'order') assert.ok(L.check(Object.assign({ answer: st.words.join(' ') }, st), st.words.join(' ')).ok);
    for (const t of st.traps || []) assert.ok(!new RegExp(t.pattern).test(L.normalize(st.model || st.words.join(' '))), `${les.id}: armadilha pega o modelo ${t.pattern}`);
  }
}
