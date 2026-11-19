// Regras puras (sem DOM): correção de respostas, repetição espaçada, domínio e sequência.
// Funciona no navegador (window.Logic) e no Node (require) para os testes.
(function (root) {
  'use strict';

  const DAY = 864e5;

  const CONTRACTIONS = [
    [/\bdidn'?t\b/g, 'did not'],
    [/\bdon'?t\b/g, 'do not'],
    [/\bdoesn'?t\b/g, 'does not'],
    [/\bwasn'?t\b/g, 'was not'],
    [/\bweren'?t\b/g, 'were not'],
    [/\bcan'?t\b/g, 'cannot'],
    [/\bi'm\b/g, 'i am'],
    [/\bwon'?t\b/g, 'will not'],
    [/\bshan't\b/g, 'shall not'],
    [/\b(is|are|has|have|had|should|could|would|must|need)n'?t\b/g, '$1 not'],
    [/\b(you|we|they|who|what)'re\b/g, '$1 are'],
    [/\b(i|you|we|they|who|could|should|would|might|must)'ve\b/g, '$1 have'],
    [/\b(i|you|he|she|it|we|they|that|there|who)'ll\b/g, '$1 will'],
    [/\b(he|she|it|that|there|what|where|who|here|how)'s\b/g, '$1 is'],
    [/\blet's\b/g, 'let us'],
  ];

  // Minúsculas, contrações expandidas, sem pontuação: "I didn't go." -> "i did not go"
  function normalize(s) {
    // sem acentos: respostas em português (leitura) comparam "preços" = "precos"
    let t = String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘`´]/g, "'");
    for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep);
    return t
      .replace(/\bcan not\b/g, 'cannot')
      .replace(/[^a-z0-9' ]+/g, ' ')
      .replace(/'/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Ordem: respostas aceitas -> padrões aceitos -> armadilhas (erros previstos com explicação).
  function check(ex, input) {
    const n = normalize(input);
    if (!n) return { ok: false, why: 'Escreva uma resposta.' };
    const accepted = [].concat(ex.answer == null ? [] : ex.answer, ex.accept || []).map(normalize);
    if (accepted.includes(n)) return { ok: true };
    for (const p of ex.patterns || []) if (new RegExp(p).test(n)) return { ok: true };
    for (const t of ex.traps || []) if (new RegExp(t.pattern).test(n)) return { ok: false, why: t.why };
    if (ex.why) for (const k in ex.why) if (normalize(k) === n) return { ok: false, why: ex.why[k] };
    return { ok: false, why: ex.explain || '' };
  }

  // Primeira palavra diferente entre resposta dada e esperada: "i eat pizza" x "i ate pizza" -> ["eat","ate"]
  function confusion(given, expected) {
    const g = normalize(given).split(' '), e = normalize(expected).split(' ');
    for (let i = 0; i < Math.max(g.length, e.length); i++) {
      if (g[i] !== e[i]) return g[i] && e[i] ? [g[i], e[i]] : null;
    }
    return null;
  }

  function newCard(id) {
    return { id, ease: 2.3, interval: 0, due: 0, reps: 0, lapses: 0, hist: [] };
  }

  // Intervalos adaptativos (família SM-2, mais simples que FSRS).
  // shortcut: sem modelo de memória do FSRS; trocar por FSRS quando houver dados reais de uso.
  function schedule(card, ok, ms, now) {
    const c = Object.assign({}, card, { hist: card.hist.slice(-29) });
    c.hist.push({ t: now, ok: !!ok, ms: ms, iv: card.interval });
    if (ok) {
      c.reps++;
      if (ms < 6000) c.ease += 0.1;
      else if (ms > 15000) c.ease -= 0.05;
      c.ease = Math.min(3, Math.max(1.3, c.ease));
      c.interval = card.interval < 1 ? 1 : Math.max(card.interval + 1, Math.round(card.interval * c.ease));
      c.due = now + c.interval * DAY;
    } else {
      c.lapses++;
      c.ease = Math.max(1.3, c.ease - 0.2);
      c.interval = 0;
      c.due = now + 10 * 60e3;
    }
    return c;
  }

  // Domínio real: precisão recente + variedade de exercícios + contextos + retenção após intervalo.
  function mastery(cards, meta) {
    const all = [];
    const types = new Set(), contexts = new Set();
    let retained = false;
    for (const c of cards) {
      const m = meta[c.id] || {};
      for (const h of c.hist) {
        all.push(h);
        if (h.ok) {
          types.add(m.type);
          contexts.add(m.context);
          if (h.iv >= 1) retained = true;
        }
      }
    }
    all.sort((a, b) => a.t - b.t);
    const recent = all.slice(-10);
    const acc = recent.length ? recent.filter(h => h.ok).length / recent.length : 0;
    const okMs = all.filter(h => h.ok).map(h => h.ms);
    const avgMs = okMs.length ? okMs.reduce((a, b) => a + b, 0) / okMs.length : 0;
    const score = Math.round(100 * (
      0.35 * acc * Math.min(1, all.length / 8) +
      0.2 * Math.min(1, types.size / 3) +
      0.15 * Math.min(1, contexts.size / 2) +
      0.3 * (retained ? 1 : 0)
    ));
    let status = 'nova';
    if (all.length) status = 'aprendendo';
    if (retained) status = 'consolidando';
    if (retained && types.size >= 3 && contexts.size >= 2 && acc >= 0.8) status = 'dominada';
    return { score, status, acc, attempts: all.length, types: types.size, contexts: contexts.size, retained, avgMs };
  }

  function dateKey(t) {
    const d = new Date(t);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  // Dias seguidos com atividade; hoje sem atividade ainda não quebra a sequência.
  function streak(days, now) {
    const d = new Date(now);
    if (!days[dateKey(d)]) d.setDate(d.getDate() - 1);
    let n = 0;
    while (days[dateKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  const api = { normalize, check, confusion, newCard, schedule, mastery, dateKey, streak, DAY };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Logic = api;
})(this);
