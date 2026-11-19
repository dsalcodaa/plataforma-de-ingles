// Rodar com: node --test tests/logic.test.js tests/reader.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');

const g = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/vendor/compromise.js'), 'utf8'), { globalThis: g, self: g });
const R = require('../js/reader.js')(g.nlp);

const sentences = (body, kind) => R.analyze(body, kind).paras.flat(2);
const tok = (s, text) => s.tokens.find(t => t.text === text);
const explain = (body, word) => { const s = sentences(body, 'frase')[0]; return R.explainWord(tok(s, word), s); };

test('música mantém linhas e estrofes', () => {
  const a = R.analyze('Line one here\nLine two here\n\nNew verse now', 'musica');
  assert.strictEqual(a.paras.length, 2);
  assert.strictEqual(a.paras[0].length, 2);
  assert.strictEqual(a.words, 9);
});

test('artigo junta linhas do mesmo parágrafo', () => {
  const a = R.analyze('The cat sat\non the mat.', 'artigo');
  assert.strictEqual(a.paras[0].length, 1);
});

test('contração vira um token só e é explicada', () => {
  const x = explain("She didn't call me.", "didn't");
  assert.strictEqual(x.cls, 'Verbo auxiliar');
  assert.match(x.lines.join(' '), /did not/);
  const y = explain("I'm happy.", "I'm");
  assert.strictEqual(y.cls, 'Pronome + verbo');
  assert.match(y.lines.join(' '), /significa eu/);
});

test('passado irregular mostra a forma base', () => {
  const x = explain('Yesterday I went to the market.', 'went');
  assert.strictEqual(x.lemma, 'go');
  assert.strictEqual(x.key, 'go');
  assert.match(x.lines[0], /irregular/);
});

test('phrasal verb é reconhecido', () => {
  const x = explain("She didn't give up.", 'give');
  assert.strictEqual(x.lookup, 'give up');
});

test('gírias de música', () => {
  const s = sentences("I'm gonna miss you 'cause I'm lovin' it", 'musica')[0];
  assert.strictEqual(R.explainWord(tok(s, 'gonna'), s).lookup, 'going to');
  assert.strictEqual(R.explainWord(tok(s, "'cause"), s).lookup, 'because');
  assert.strictEqual(R.explainWord(tok(s, 'lovin'), s).lemma, 'loving');
});

test('tempo verbal e tipo da frase', () => {
  const [a] = sentences('The book was written by her.', 'frase');
  assert.strictEqual(R.explainSentence(a).tenses[0].name, 'Voz passiva no passado');
  const [b] = sentences('Does she like coffee?', 'frase');
  assert.strictEqual(R.explainSentence(b).kind, 'Pergunta');
  assert.strictEqual(tok(b, 'Does').role, 'aux');
  assert.strictEqual(tok(b, 'she').role, 'subject');
});

test('funções na frase', () => {
  const [s] = sentences('I walked to the park yesterday.', 'frase');
  assert.deepStrictEqual(s.tokens.map(t => t.role), ['subject', 'verb', 'comp', 'comp', 'comp', 'time']);
});

test('toda palavra tem explicação sem quebrar', () => {
  const body = "Oh, baby, I've been thinking 'bout the best days of my life.\nWe should've known better than that!\nWhy don't you come home tonight?";
  for (const s of sentences(body, 'musica')) {
    for (const t of s.tokens) { const x = R.explainWord(t, s); assert.ok(x.lines.length && x.key, t.text); }
    assert.ok(R.explainSentence(s).kind);
  }
});
