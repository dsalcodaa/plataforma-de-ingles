// Leitura analisada: divide textos (artigos, frases, letras de música), marca a função de cada palavra
// e gera explicações gramaticais em português. Tudo local, com a biblioteca compromise (js/vendor).
// Funciona no navegador (window.Reader) e no Node (require('./reader.js')(nlp)) para os testes.
(function (root) {
  'use strict';

  function make(nlp) {
    // ── Tabelas de explicação
    const INFORMAL = {
      gonna: ['going to', 'Forma informal de “going to” (vou, vai). Muito comum em músicas e na fala.'],
      wanna: ['want to', 'Forma informal de “want to” (quero, quer).'],
      gotta: ['have got to', 'Forma informal de “have got to” (tenho que).'],
      "ain't": ['am not / is not / have not', 'Negação informal que substitui am not, is not, are not, have not ou has not. Comum em músicas, mas evitada no inglês formal.'],
      "'cause": ['because', 'Forma curta de “because” (porque).'],
      cuz: ['because', 'Forma curta de “because” (porque).'],
      cos: ['because', 'Forma curta de “because” (porque).'],
      ya: ['you', 'Forma falada de “you” (você).'],
      "'em": ['them', 'Forma falada de “them” (eles, elas, os, as).'],
      kinda: ['kind of', 'Forma informal de “kind of” (meio, tipo).'],
      sorta: ['sort of', 'Forma informal de “sort of” (meio, mais ou menos).'],
      outta: ['out of', 'Forma informal de “out of” (para fora de).'],
      gimme: ['give me', 'Forma informal de “give me” (me dá).'],
      lemme: ['let me', 'Forma informal de “let me” (deixa eu).'],
      dunno: ["don't know", 'Forma informal de “don’t know” (não sei).'],
      "y'all": ['you all', 'Forma informal de “you all” (vocês), típica do sul dos EUA.'],
      tryna: ['trying to', 'Forma informal de “trying to” (tentando).'],
      "'til": ['until', 'Forma curta de “until” (até).'],
      till: ['until', 'Forma curta de “until” (até).'],
      "c'mon": ['come on', 'Forma falada de “come on” (vamos, qual é).'],
      "'bout": ['about', 'Forma curta de “about” (sobre, a respeito de).'],
    };
    const GDROP = /^[a-z]+in'$/; // lovin', nothin': o g final cai na fala

    const BE = {
      am: 'Verbo to be no presente, usado só com “I”.',
      is: 'Verbo to be no presente, com he, she, it ou um sujeito no singular.',
      are: 'Verbo to be no presente, com you, we, they ou um sujeito no plural.',
      was: 'Verbo to be no passado, com I, he, she, it ou singular.',
      were: 'Verbo to be no passado, com you, we, they ou plural.',
      be: 'Verbo to be na forma base, usada depois de will, can, to e outros modais.',
      been: 'Particípio do verbo to be, usado depois de have, has ou had (have been).',
      being: 'Verbo to be na forma -ing.',
    };
    const BE_FORMS = new Set(Object.keys(BE).concat(["'m", "'re", "'s"]));

    const MODAL = {
      can: 'poder, conseguir. Indica habilidade, permissão ou possibilidade.',
      could: 'podia, poderia, conseguiu. É o passado de can e também serve para pedidos educados e possibilidades.',
      will: 'marca o futuro: decisão na hora, promessa ou previsão.',
      would: 'equivale ao “-ria” do português (eu iria, eu faria). Também serve para pedidos educados.',
      shall: 'futuro formal ou sugestão (Shall we go? = Vamos?).',
      should: 'deveria. Indica conselho ou recomendação.',
      must: 'deve, precisa. Indica obrigação forte ou certeza.',
      may: 'pode, talvez. Indica permissão formal ou possibilidade.',
      might: 'talvez, poderia. Indica possibilidade mais fraca que may.',
    };

    const PRON = {
      i: ['eu', 'sujeito'], you: ['você, vocês (também “te”, “lhe”)', 'sujeito ou objeto'], he: ['ele', 'sujeito'], she: ['ela', 'sujeito'],
      it: ['ele, ela (coisa, animal ou ideia); às vezes não se traduz (It is cold = Está frio)', 'sujeito ou objeto'], we: ['nós', 'sujeito'], they: ['eles, elas', 'sujeito'],
      me: ['me, mim', 'objeto'], him: ['o, ele, lhe', 'objeto'], us: ['nos, nós', 'objeto'], them: ['os, as, eles, elas', 'objeto'],
      my: ['meu, minha', 'possessivo'], your: ['seu, sua, teu, tua', 'possessivo'], his: ['dele (também “o dele”)', 'possessivo'], its: ['dele, dela (coisa ou animal)', 'possessivo'],
      our: ['nosso, nossa', 'possessivo'], their: ['deles, delas', 'possessivo'],
      mine: ['o meu, a minha', 'possessivo sozinho'], yours: ['o seu, a sua', 'possessivo sozinho'], hers: ['o dela', 'possessivo sozinho'], ours: ['o nosso', 'possessivo sozinho'], theirs: ['o deles', 'possessivo sozinho'],
      myself: ['eu mesmo, me', 'reflexivo'], yourself: ['você mesmo, se', 'reflexivo'], himself: ['ele mesmo, se', 'reflexivo'], herself: ['ela mesma, se', 'reflexivo'],
      itself: ['ele mesmo, se', 'reflexivo'], ourselves: ['nós mesmos, nos', 'reflexivo'], themselves: ['eles mesmos, se', 'reflexivo'],
      someone: ['alguém', 'indefinido'], somebody: ['alguém', 'indefinido'], everyone: ['todo mundo', 'indefinido'], everybody: ['todo mundo', 'indefinido'],
      nobody: ['ninguém', 'indefinido'], anyone: ['qualquer um, alguém (em perguntas)', 'indefinido'], something: ['alguma coisa', 'indefinido'],
      everything: ['tudo', 'indefinido'], nothing: ['nada', 'indefinido'], anything: ['qualquer coisa, nada (em negativas)', 'indefinido'],
    };
    const PRON_ROLE = {
      sujeito: 'Pronome sujeito: indica quem faz a ação e vem antes do verbo. Em inglês ele quase nunca pode ser omitido.',
      objeto: 'Pronome objeto: recebe a ação e vem depois do verbo ou da preposição (help me, with them).',
      'sujeito ou objeto': 'Pronome que tem a mesma forma como sujeito e como objeto.',
      possessivo: 'Pronome possessivo: vem antes do substantivo e concorda com o dono, não com a coisa (her car = o carro dela).',
      'possessivo sozinho': 'Possessivo que substitui o substantivo (This is mine = Isto é meu).',
      reflexivo: 'Pronome reflexivo: a ação volta para o próprio sujeito, ou reforça “por conta própria”.',
      indefinido: 'Pronome indefinido: fala de pessoas ou coisas sem especificar. Concorda com o verbo no singular (Everybody knows).',
    };

    const DET = {
      the: 'Artigo definido (o, a, os, as). Indica algo específico, que os dois lados já sabem qual é. Não muda no plural.',
      a: 'Artigo indefinido (um, uma). Vem antes de palavra com som de consoante e só no singular.',
      an: 'Artigo indefinido (um, uma) antes de palavra com som de vogal (an apple, an hour).',
      this: 'Demonstrativo: este, esta, isto (perto, singular).', that: 'Demonstrativo: esse, aquele, aquilo (longe, singular). Também pode ser “que”.',
      these: 'Demonstrativo: estes, estas (perto, plural).', those: 'Demonstrativo: esses, aqueles (longe, plural).',
      some: 'Algum, alguns, um pouco de. Usado em frases afirmativas e em ofertas.', any: 'Algum, nenhum, qualquer. Usado em perguntas e negativas.',
      every: 'Cada, todo (every day = todo dia). O substantivo fica no singular.', each: 'Cada (um separadamente).',
      all: 'Todo, todos, tudo.', no: 'Nenhum, nenhuma (no time = nenhum tempo).', many: 'Muitos (para coisas contáveis).',
      much: 'Muito (para coisas incontáveis, comum em perguntas e negativas).', another: 'Outro, mais um.', other: 'Outro, outros.',
    };

    const PREP = {
      in: 'em, dentro de. Para lugares fechados, cidades, países, meses, anos e partes do dia (in the morning).',
      on: 'em, sobre. Para superfícies, dias da semana e datas (on Monday).',
      at: 'em, no, na. Para pontos exatos: horas, endereços e lugares específicos (at 9, at home).',
      to: 'para, a, até. Indica direção ou destino. Antes de verbo, forma o infinitivo (to go = ir).',
      for: 'para, por. Indica finalidade, benefício ou duração (for two years).',
      from: 'de, desde. Indica origem ou ponto de partida.', with: 'com.', without: 'sem.',
      of: 'de. Indica posse, parte ou conteúdo (a cup of coffee).', about: 'sobre, a respeito de; também “cerca de”.',
      by: 'por, perto de, até (prazo). Na voz passiva indica quem fez a ação.', into: 'para dentro de.',
      onto: 'para cima de.', over: 'sobre, por cima de; também “acabado” (It’s over).', under: 'embaixo de, sob.',
      through: 'através de, por dentro de.', between: 'entre (dois).', among: 'entre (vários).', since: 'desde. Marca o ponto de início, muito usado com o present perfect.',
      until: 'até (momento).', during: 'durante.', after: 'depois de.', before: 'antes de.', like: 'como, igual a.',
      near: 'perto de.', behind: 'atrás de.', around: 'em volta de, por aí; também “cerca de”.', across: 'do outro lado de, através.',
      up: 'para cima.', down: 'para baixo; também “ao longo de” (down the street).', off: 'fora de, desligado.', out: 'para fora.',
      than: 'do que. Usado em comparações (bigger than = maior do que).', against: 'contra.', inside: 'dentro de.', outside: 'fora de.',
    };

    const CONJ = {
      and: 'e.', but: 'mas.', or: 'ou.', so: 'então, por isso.', because: 'porque (explica a causa).', if: 'se. Abre uma condição.',
      when: 'quando.', while: 'enquanto.', that: 'que. Liga uma ideia a outra (I know that…).', although: 'embora.', though: 'embora; no fim da frase, “mas”.',
      as: 'como, enquanto, já que.', unless: 'a menos que.', until: 'até que.', whether: 'se (entre opções).', than: 'do que (comparação).',
      before: 'antes que, antes de.', after: 'depois que.', once: 'assim que.', since: 'desde que, já que.',
    };
    const QW = {
      what: 'o que, qual.', where: 'onde.', when: 'quando.', why: 'por que.', who: 'quem.', whom: 'quem (formal, objeto).',
      how: 'como. Com adjetivo: how old (quantos anos), how much (quanto).', which: 'qual (entre opções).', whose: 'de quem.',
    };
    const NEG = {
      not: 'não. Vem depois do verbo auxiliar ou do to be.', "n't": 'não (forma contraída de not).', never: 'nunca. Já é negativo: não se usa junto com not.',
      no: 'não, nenhum.', nothing: 'nada.', nobody: 'ninguém.', none: 'nenhum.', nowhere: 'lugar nenhum.',
    };
    const FREQ = {
      always: 'sempre', usually: 'geralmente', often: 'frequentemente', sometimes: 'às vezes', rarely: 'raramente', seldom: 'raramente', ever: 'alguma vez, já',
      just: 'acabou de, só', already: 'já', yet: 'ainda (em negativas), já (em perguntas)', still: 'ainda', again: 'de novo', too: 'também; demais', very: 'muito', really: 'muito, realmente',
    };
    const TIME = {
      yesterday: 'ontem', today: 'hoje', tomorrow: 'amanhã', tonight: 'hoje à noite', now: 'agora', ago: 'atrás. Vem depois do período (two days ago = dois dias atrás)',
      soon: 'em breve', later: 'mais tarde', lately: 'ultimamente', recently: 'recentemente', forever: 'para sempre', then: 'então, depois, naquela época',
      morning: 'manhã', afternoon: 'tarde', evening: 'fim de tarde, noite', night: 'noite', weekend: 'fim de semana', day: 'dia', week: 'semana', month: 'mês', year: 'ano',
      monday: 'segunda-feira', tuesday: 'terça-feira', wednesday: 'quarta-feira', thursday: 'quinta-feira', friday: 'sexta-feira', saturday: 'sábado', sunday: 'domingo',
    };
    const TIME_WORDS = new Set(['yesterday', 'today', 'tomorrow', 'tonight', 'now', 'ago', 'morning', 'afternoon', 'evening', 'night', 'weekend', 'week', 'month', 'year', 'day', 'days', 'years', 'weeks', 'months', 'hours', 'minutes', 'soon', 'later', 'lately', 'recently', 'forever', 'always', 'usually', 'often', 'sometimes', 'already', 'yet', 'then', 'once', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
    const TIME_LEAD = new Set(['at', 'in', 'on', 'last', 'next', 'every', 'this', 'that', 'the', 'all', 'one', 'two', 'three', 'a']);

    const TENSES = {
      'simple-present': ['Presente simples', 'sujeito + verbo (he/she/it + -s)', 'Rotinas, fatos e verdades gerais.'],
      'auxiliary-present': ['Presente simples com do/does', 'do/does (+ not) + verbo base', 'Negativas e perguntas no presente: o do/does carrega o tempo e o verbo fica na forma base.'],
      'simple-past': ['Passado simples', 'verbo no passado (-ed ou irregular)', 'Ação terminada num momento do passado.'],
      'auxiliary-past': ['Passado simples com did', 'did (+ not) + verbo base', 'Negativas e perguntas no passado: o did já marca o passado, então o verbo fica na forma base.'],
      'simple-future': ['Futuro com will', 'will + verbo base', 'Decisões na hora, promessas e previsões.'],
      'auxiliary-future': ['Futuro com going to', 'am/is/are + going to + verbo base', 'Planos e intenções já decididos. “Gonna” é a forma falada de going to.'],
      'present-progressive': ['Presente contínuo', 'am/is/are + verbo-ing', 'Algo acontecendo agora ou um plano próximo.'],
      'past-progressive': ['Passado contínuo', 'was/were + verbo-ing', 'Ação em andamento no passado, muitas vezes interrompida por outra.'],
      'future-progressive': ['Futuro contínuo', 'will be + verbo-ing', 'Ação que estará em andamento no futuro.'],
      'present-perfect': ['Present perfect', 'have/has + particípio', 'Passado sem momento definido, experiências ou algo que começou antes e vem até agora.'],
      'past-perfect': ['Past perfect', 'had + particípio', 'Um passado que aconteceu antes de outro passado.'],
      'future-perfect': ['Futuro perfeito', 'will have + particípio', 'Algo que já terá acontecido até um momento futuro.'],
      'present-perfect-progressive': ['Present perfect contínuo', 'have/has been + verbo-ing', 'Ação que começou no passado e continua até agora, com foco na duração.'],
      'past-perfect-progressive': ['Past perfect contínuo', 'had been + verbo-ing', 'Ação que vinha acontecendo antes de outro momento do passado.'],
      'future-perfect-progressive': ['Futuro perfeito contínuo', 'will have been + verbo-ing', 'Duração de uma ação até um ponto do futuro.'],
      'passive-present': ['Voz passiva no presente', 'am/is/are (ou has been) + particípio', 'O foco vai para quem recebe a ação, não para quem faz.'],
      'passive-past': ['Voz passiva no passado', 'was/were + particípio', 'O foco vai para quem recebeu a ação. Quem fez aparece depois de “by”, se aparecer.'],
      'passive-future': ['Voz passiva no futuro', 'will be + particípio', 'O foco vai para quem vai receber a ação.'],
      'modal-infinitive': ['Verbo modal', 'modal + verbo base', 'O modal muda o sentido (poder, dever, poderia) e o verbo seguinte fica sem to e sem -s.'],
      'modal-past': ['Modal no passado', 'modal + have + particípio', 'Possibilidade, dedução ou arrependimento sobre o passado (could have won = poderia ter ganhado).'],
      imperative: ['Imperativo', 'verbo base, sem sujeito (Don’t + verbo para proibir)', 'Ordens, pedidos, conselhos e instruções.'],
    };

    // ── Montagem
    const clean = s => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/^["“”(]+|["“”).,!?;:]+$/g, '');
    const has = (t, tag) => t.tags.includes(tag);
    const isVerbish = t => has(t, 'Verb') || has(t, 'Modal') || has(t, 'Auxiliary') || has(t, 'Copula');

    function segment(body, kind) {
      const blocks = String(body || '').replace(/\r/g, '').split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
      return blocks.map(b => kind === 'artigo' ? [b.replace(/\s*\n\s*/g, ' ')] : b.split('\n').map(l => l.trim()).filter(Boolean));
    }

    function buildSentence(json, verbs) {
      const toks = [];
      for (const t of json.terms) {
        if (t.text === '' && toks.length) { const p = toks[toks.length - 1]; p.parts.push(t); p.post = t.post || p.post; continue; }
        toks.push({ text: t.text, pre: t.pre || '', post: t.post || '', normal: clean(t.normal || t.text), tags: t.tags.slice(), parts: [t] });
      }
      toks.forEach((t, i) => {
        t.i = i;
        // tags só da primeira parte (em "I'm", o "I"); a negação vale para o token inteiro
        t.neg = t.parts.some(p => p.tags.includes('Negative'));
        if (t.parts.length > 1 && t.parts.some(p => p.implicit)) t.expand = t.parts.map(p => (p.implicit || p.normal).toLowerCase()).join(' ');
        const raw = t.text.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z']/g, '');
        t.inf = INFORMAL[raw] ? raw : INFORMAL[t.normal] && !/^(cause|em|til|till|cos)$/.test(t.normal) ? t.normal : /in$/.test(t.normal) && /^['’]/.test(t.post) ? 'gdrop' : null;
        if (t.inf === "'cause" || t.inf === 'cuz' || t.inf === 'cos') t.tags = t.tags.concat('Conjunction');
        if (t.inf === 'gdrop' && !t.tags.includes('Verb')) t.tags = t.tags.concat('Verb', 'Gerund');
        // do/does/did seguido de verbo base é auxiliar (Does she like…?)
        if (/^(do|does|did)$/.test(t.parts[0].implicit || t.normal) && !t.tags.includes('Auxiliary') && toks.slice(i + 1, i + 4).some(x => x.tags.includes('Infinitive'))) t.tags = t.tags.concat('Auxiliary');
        t.contr = t.parts.length > 1 && t.tags.includes('Pronoun');
      });
      // phrasal verbs: verbo marcado + partícula seguinte
      toks.forEach((t, i) => {
        if (has(t, 'PhrasalVerb') && !has(t, 'Particle')) {
          const p = toks.slice(i + 1, i + 3).find(x => has(x, 'Particle'));
          if (p) t.phrasal = p.phrasal = lemmaOf(t) + ' ' + p.normal;
        }
      });
      const sent = { text: json.text, tokens: toks, verbs, question: /\?\s*["”']?$/.test(json.text.trim()) };
      assignRoles(sent);
      return sent;
    }

    function assignRoles(sent) {
      const toks = sent.tokens;
      let seen = false, subj = false;
      const CLAUSE = new Set(['and', 'but', 'or', 'because', "'cause", 'cuz', 'when', 'if', 'so', 'while', 'although', 'though', 'until', 'unless', 'that', 'since']);
      toks.forEach((t, i) => {
        const prev = toks[i - 1];
        if (prev && /,\s*$/.test(prev.post) && has(t, 'Pronoun') && seen) { seen = false; subj = false; } // vírgula + novo sujeito
        if ((has(t, 'Conjunction') || CLAUSE.has(t.normal)) && !has(t, 'Preposition') && t.normal !== 'than') { t.role = ''; seen = false; subj = false; return; }
        if (has(t, 'Date') || TIME_WORDS.has(t.normal)) { t.role = 'time'; for (let k = i - 1; k >= 0 && toks[k].role !== 'time' && TIME_LEAD.has(toks[k].normal); k--) toks[k].role = 'time'; return; }
        if (t.contr) { t.role = 'subject'; subj = true; if (!toks.slice(i + 1, i + 3).some(x => has(x, 'Gerund') || has(x, 'Passive') || has(x, 'Auxiliary') || x.inf)) seen = true; return; }
        if (has(t, 'Negative') && !isVerbish(t)) { t.role = 'aux'; return; }
        if (isVerbish(t)) {
          const aux = has(t, 'Modal') || has(t, 'Auxiliary') || (has(t, 'Copula') && toks.slice(i + 1, i + 3).some(x => has(x, 'Gerund') || has(x, 'Passive')));
          t.role = aux && !has(t, 'Particle') ? 'aux' : 'verb';
          if (!aux && (!sent.question || subj)) seen = true;
          return;
        }
        if (seen) { t.role = 'comp'; return; }
        if (has(t, 'Pronoun') || has(t, 'Noun') || has(t, 'Determiner') || has(t, 'Adjective') || has(t, 'Value')) { t.role = has(t, 'QuestionWord') ? 'comp' : 'subject'; if (!has(t, 'QuestionWord')) subj = true; return; }
        t.role = has(t, 'QuestionWord') ? 'comp' : '';
      });
    }

    function analyze(body, kind) {
      const paras = segment(body, kind).map(lines => lines.map(line => {
        const doc = nlp(line), list = doc.sentences(), json = list.json({ terms: { tags: true, normal: true, implicit: true } });
        return json.map((s, i) => buildSentence(s, list.eq(i).verbs().json().map(v => ({ text: v.text.replace(/[.,!?;:]+$/, ''), form: v.verb && v.verb.grammar && v.verb.grammar.form, inf: v.verb && v.verb.infinitive }))));
      }));
      let words = 0;
      for (const p of paras) for (const l of p) for (const s of l) words += s.tokens.length;
      return { paras, words };
    }

    // ── Formas das palavras
    const memo = {};
    function lemmaOf(t) {
      const w = t.normal;
      if (t.inf && t.inf !== 'gdrop') return INFORMAL[t.inf][0];
      if (t.inf === 'gdrop') return w.replace(/in'?$/, 'ing');
      if (isVerbish(t) && !has(t, 'Modal')) {
        const k = 'v:' + w;
        if (!(k in memo)) { const v = nlp(w).verbs().json()[0]; memo[k] = (v && v.verb && v.verb.infinitive) || w; }
        return memo[k];
      }
      if (has(t, 'Plural')) {
        const k = 'n:' + w;
        if (!(k in memo)) { const d = nlp(w); d.tag('Plural'); memo[k] = d.nouns().toSingular().text().toLowerCase() || w; }
        return memo[k];
      }
      return w.replace(/'s$/, '');
    }
    function conjugate(inf) {
      const k = 'c:' + inf;
      if (!(k in memo)) memo[k] = nlp(inf).verbs().conjugate()[0] || {};
      return memo[k];
    }
    const irregular = (inf, past) => !!past && (!/ed$/.test(past) || /^(fed|led|bled|bred|fled|shed|sped|wed)$/.test(past)) && past !== inf + 'd';

    // Chave do vocabulário e texto que vai para o tradutor.
    function lookupOf(t) {
      if (t.phrasal) return t.phrasal;
      if (t.inf && t.inf !== 'gdrop') return INFORMAL[t.inf][0];
      return lemmaOf(t);
    }

    // ── Explicação da palavra
    function classOf(t) {
      const w = t.normal;
      if (t.inf === 'gdrop') return 'Verbo';
      if (t.inf) return 'Inglês informal';
      if (t.contr) return 'Pronome + verbo';
      if (has(t, 'Particle')) return 'Partícula de phrasal verb';
      if (QW[w] && (has(t, 'QuestionWord') || t.i === 0)) return 'Palavra interrogativa';
      if (has(t, 'Negative') && !isVerbish(t)) return 'Negação';
      if (has(t, 'Modal')) return 'Verbo modal';
      if (has(t, 'Copula')) return 'Verbo to be';
      if (has(t, 'Auxiliary')) return 'Verbo auxiliar';
      if (has(t, 'Verb')) return 'Verbo';
      if (has(t, 'Pronoun') || PRON[w]) return 'Pronome';
      if (w === 'a' || w === 'an' || w === 'the') return 'Artigo';
      if (has(t, 'Determiner')) return 'Determinante';
      if (has(t, 'Preposition')) return 'Preposição';
      if (has(t, 'Conjunction')) return 'Conjunção';
      if (has(t, 'Adjective')) return 'Adjetivo';
      if (has(t, 'Adverb')) return 'Advérbio';
      if (has(t, 'Value') && !has(t, 'Date')) return 'Número';
      if (has(t, 'Date') || TIME[w]) return 'Expressão de tempo';
      if (has(t, 'Expression')) return 'Interjeição';
      if (has(t, 'ProperNoun')) return 'Nome próprio';
      if (has(t, 'Noun')) return 'Substantivo';
      return 'Palavra';
    }

    function explainWord(t, sent) {
      const w = t.normal, toks = sent.tokens, prev = toks[t.i - 1], next = toks[t.i + 1];
      const pw = prev ? prev.normal : '';
      const cls = classOf(t), lines = [], forms = [];
      const lemma = lemmaOf(t);

      if (t.inf === 'gdrop') lines.push(`Forma falada de “${lemma}”: na fala e nas músicas o “g” final do -ing costuma cair.`);
      else if (t.inf) lines.push(INFORMAL[t.inf][1] + ' Evite em textos formais.');
      else if (t.expand && t.expand !== w) lines.push(`Contração de “${t.expand}”.`);

      if (cls === 'Pronome + verbo') {
        const pr = (t.parts[0].implicit || t.parts[0].normal).toLowerCase(), vb = (t.parts[1].implicit || t.parts[1].normal).toLowerCase();
        if (PRON[pr]) lines.push(`“${pr === 'i' ? 'I' : pr}” significa ${PRON[pr][0]}: é o sujeito.`);
        if (BE[vb]) lines.push(`“${vb}”: ${BE[vb].charAt(0).toLowerCase() + BE[vb].slice(1)}`);
        else if (/^(have|has)$/.test(vb)) lines.push(`“${vb}” aqui é auxiliar do present perfect (I've done) ou significa ter (I've got).`);
        else if (vb === 'had' || vb === 'would') lines.push('“’d” pode ser had ou would: se depois vier um particípio, é had; se vier verbo base, é would.');
        else if (vb === 'will') lines.push('“’ll” = will: marca o futuro.');
        else if (vb === 'us') lines.push('“Let’s” = let us: convite (vamos…).');
        if (t.neg) lines.push('A negação deixa a frase negativa.');
      } else if (cls === 'Expressão de tempo') {
        if (TIME[w]) lines.push(`Significa ${TIME[w]}.`);
        lines.push('Indica quando a ação acontece. Costuma ficar no fim da frase, ou no começo para dar destaque.');
      } else if (cls === 'Palavra interrogativa') lines.push(`Significa ${QW[w]} Abre a pergunta; depois dela vem o auxiliar (do, did, is, can…) e então o sujeito.`);
      else if (cls === 'Negação') lines.push(`Significa ${NEG[w] || 'não.'}`);
      else if (cls === 'Verbo modal') {
        const m = MODAL[t.parts[0].implicit || w] || MODAL[w.replace("'ll", 'will').replace("'d", 'would')];
        if (m) lines.push(`Significa ${m}`);
        lines.push('Depois de um modal o verbo vem na forma base: sem “to” e sem -s (she can swim).');
      } else if (cls === 'Verbo to be') {
        const base = t.parts.map(p => p.implicit || p.normal).find(x => BE[x]) || w;
        lines.push(BE[base] || 'Verbo to be.');
        if (has(t, 'Passive')) lines.push('Aqui ajuda a formar a voz passiva junto com o particípio que vem depois.');
        else if (toks.slice(t.i + 1, t.i + 3).some(x => has(x, 'Gerund'))) lines.push('Aqui é auxiliar do tempo contínuo: to be + verbo-ing.');
        else lines.push('Significa ser ou estar, conforme o contexto.');
        if (t.neg) lines.push('A negação entra logo depois do to be (is not, was not).');
      } else if (cls === 'Verbo auxiliar') {
        const a = t.parts.map(p => p.implicit || p.normal)[0];
        if (/^(do|does|did)$/.test(a)) lines.push(`“${a}” é auxiliar: serve para perguntas e negativas${a === 'did' ? ' no passado' : a === 'does' ? ' com he, she e it' : ''}. O verbo principal que vem depois fica na forma base. Sozinho não tem tradução.`);
        else if (/^(have|has|had)$/.test(a)) lines.push(`“${a}” é auxiliar do perfect: ${a} + particípio. Aqui não significa “ter”.`);
        else if (/^(will|shall)$/.test(a)) lines.push('Marca o futuro: will + verbo base.');
        else if (/^(going|to)$/.test(a) || /gonna/.test(w)) lines.push('Faz parte do futuro com going to: be + going to + verbo base.');
        else if (BE[a]) lines.push(BE[a] + ' Aqui funciona como auxiliar.');
        else lines.push('Verbo auxiliar: ajuda o verbo principal a formar o tempo, a pergunta ou a negação.');
        if (t.neg) lines.push('Com “not” junto, deixa a frase negativa.');
      } else if (cls === 'Verbo' || cls === 'Partícula de phrasal verb') {
        if (t.phrasal) lines.push(`Faz parte do phrasal verb “${t.phrasal}”: verbo + partícula. O significado do conjunto costuma ser diferente do verbo sozinho.`);
        if (cls === 'Verbo') {
          const c = conjugate(lemma);
          const perfect = toks.slice(Math.max(0, t.i - 3), t.i).some(x => /^(have|has|had|'ve|'d)$/.test(x.normal) || x.parts.some(p => /^(have|has|had)$/.test(p.implicit || '')));
          if (has(t, 'Passive') || (has(t, 'Participle') && !has(t, 'Adjective')) || (has(t, 'PastTense') && perfect)) {
            lines.push(`Particípio de “${lemma}”. É a forma usada depois de have/has/had (perfect) e na voz passiva.`);
          } else if (has(t, 'PastTense')) {
            lines.push(irregular(lemma, c.PastTense || w)
              ? `Passado irregular de “${lemma}”: não segue a regra do -ed e precisa ser memorizado.`
              : `Passado regular de “${lemma}”: verbo + -ed. É igual para todas as pessoas.`);
          } else if (has(t, 'Gerund') || t.inf === 'gdrop') {
            const beBefore = toks.slice(Math.max(0, t.i - 3), t.i).some(x => BE_FORMS.has(x.normal) || x.parts.some(p => BE[p.implicit || '']));
            if (beBefore) lines.push('Forma -ing: junto com o to be forma o tempo contínuo (ação em andamento).');
            else if (prev && has(prev, 'Preposition')) lines.push('Forma -ing depois de preposição: em inglês o verbo que vem depois de preposição leva -ing (thanks for coming).');
            else lines.push('Forma -ing usada como substantivo ou depois de verbos como like, love, stop e enjoy (I love dancing).');
          } else if (prev && has(prev, 'Modal')) lines.push('Forma base porque vem depois de um modal.');
          else if (prev && prev.inf) lines.push(`Forma base depois de “${prev.text}”, que já inclui o “to”.`);
          else if (pw === 'to' || (prev && prev.parts.some(p => p.implicit === 'to'))) lines.push('Infinitivo com to: to + verbo base (to go = ir).');
          else if (toks.slice(Math.max(0, t.i - 3), t.i).some(x => x.parts.some(p => /^(do|does|did)$/.test(p.implicit || p.normal)))) lines.push('Forma base: depois de do, does ou did o verbo não muda, porque o auxiliar já carrega o tempo.');
          else if (has(t, 'Imperative')) lines.push('Imperativo: verbo na forma base, sem sujeito, para ordem, pedido ou instrução.');
          else if (/s$/.test(w) && w !== lemma) lines.push('Presente com -s: sujeito he, she, it ou singular pede -s no verbo.');
          else lines.push('Presente simples, na forma base.');
          if (c.Infinitive) {
            forms.push(['Base', c.Infinitive], ['Passado', c.PastTense], ['Particípio', c.Participle || c.PastTense], ['-ing', c.Gerund]);
          }
        } else lines.push(`A partícula “${w}” muda o sentido do verbo “${t.phrasal ? t.phrasal.split(' ')[0] : pw}”.`);
      } else if (cls === 'Pronome' && w === 'her') {
        const poss = has(t, 'Possessive') && next && (has(next, 'Noun') || has(next, 'Adjective'));
        lines.push(poss ? 'Aqui significa dela: possessivo antes do substantivo (her dreams = os sonhos dela).' : 'Aqui significa a, ela, lhe: pronome objeto, depois do verbo ou da preposição (I saw her = eu a vi).');
      } else if (cls === 'Pronome') {
        const p = PRON[w] || PRON[(t.parts[0].implicit || '').toLowerCase()];
        if (p) { lines.push(`Significa ${p[0]}.`); lines.push(PRON_ROLE[p[1]]); }
        else lines.push('Pronome: substitui um nome já conhecido.');
      } else if (cls === 'Artigo' || cls === 'Determinante') {
        lines.push(DET[w] || 'Determinante: vem antes do substantivo e diz qual ou quanto.');
      } else if (cls === 'Preposição') {
        lines.push(PREP[w] ? 'Significa ' + PREP[w] : 'Preposição: liga palavras indicando lugar, tempo, direção ou relação.');
        if (next && has(next, 'Gerund')) lines.push('Depois de preposição, o verbo vai com -ing.');
      } else if (cls === 'Conjunção') {
        lines.push(CONJ[w] ? `Significa ${CONJ[w]} Liga duas partes da frase.` : 'Conjunção: liga palavras ou partes da frase.');
        if (w === 'if') lines.push('Frases com if mostram uma condição e um resultado. Depois de if, para falar do futuro, usa-se o presente (If it rains, …).');
      } else if (cls === 'Adjetivo') {
        const a = (nlp(w).adjectives().json()[0] || {}).adjective || {};
        if (/^(best|worst|most|least)$/.test(w) || has(t, 'Superlative')) lines.push('Superlativo: o mais (the best = o melhor). Costuma vir com “the”.');
        else if (has(t, 'Comparative') || /^(better|worse|more|less)$/.test(w) || (/er$/.test(w) && next && next.normal === 'than')) lines.push('Comparativo: compara duas coisas. Palavras curtas ganham -er (bigger), longas usam “more” (more beautiful). Depois vem “than” (do que).');
        else if (/est$/.test(w) && pw === 'the') lines.push('Superlativo: o mais (the biggest = o maior). Costuma vir com “the”.');
        else lines.push('Adjetivo: descreve o substantivo e vem antes dele (a big house). Em inglês nunca vai para o plural.');
        if (prev && has(prev, 'Copula')) lines.push('Aqui vem depois do to be, descrevendo o sujeito.');
        if (a.comparative && a.superlative && !/(er|est)$/.test(w) && !/^(best|worst|most|least|better|worse|more|less)$/.test(w) && a.comparative !== w) forms.push(['Comparativo', a.comparative], ['Superlativo', a.superlative]);
      } else if (cls === 'Advérbio') {
        if (FREQ[w]) lines.push(`Significa ${FREQ[w]}.`);
        if (/^(always|usually|often|sometimes|rarely|seldom|never|ever)$/.test(w)) lines.push('Advérbio de frequência: vem antes do verbo principal e depois do to be (I always run, she is always late).');
        else if (/ly$/.test(w)) lines.push('Advérbio de modo: adjetivo + -ly (quick → quickly). Diz como a ação acontece.');
        else lines.push('Advérbio: modifica o verbo, o adjetivo ou a frase inteira.');
      } else if (cls === 'Número') lines.push('Número.');
      else if (cls === 'Interjeição') lines.push('Interjeição ou expressão de fala (oh, yeah, hey). Muito comum em músicas.');
      else if (cls === 'Nome próprio') lines.push('Nome próprio: pessoa, lugar ou marca. Sempre com letra maiúscula.');
      else if (cls === 'Substantivo') {
        if (has(t, 'Possessive') || /'s$/.test(w)) lines.push(`O 's indica posse: “${t.text}” = de ${lemma} (John’s car = o carro do John).`);
        if (has(t, 'Plural')) lines.push(`Substantivo no plural. Singular: “${lemma}”.` + (lemma + 's' !== w && lemma + 'es' !== w && lemma.replace(/y$/, 'ies') !== w ? ' Plural irregular.' : ''));
        else if (!has(t, 'Possessive')) lines.push('Substantivo no singular.' + (pw === 'a' || pw === 'an' ? ' Com “a/an”, é contável e indefinido.' : ''));
      }
      if (!lines.length) lines.push('Sem explicação automática para esta palavra.');
      return { cls, lines, forms: forms.filter(f => f[1]), lemma, lookup: lookupOf(t), key: lookupOf(t).toLowerCase() };
    }

    // ── Explicação da frase
    function explainSentence(sent) {
      const toks = sent.tokens;
      const neg = toks.some(t => t.neg || t.inf === "ain't");
      const imp = sent.verbs.some(v => v.form === 'imperative');
      const kind = sent.question ? (neg ? 'Pergunta negativa' : 'Pergunta') : imp ? (neg ? 'Imperativo negativo (proibição)' : 'Imperativo (ordem ou pedido)') : neg ? 'Negativa' : 'Afirmativa';
      const seen = new Set(), tenses = [];
      for (const v of sent.verbs) {
        if (/ain't/i.test(v.text)) { tenses.push({ name: 'Negativa informal com ain’t', formula: 'ain’t + …', use: INFORMAL["ain't"][1], chunk: v.text }); continue; }
        const T = TENSES[v.form];
        if (!T || seen.has(v.form)) continue;
        seen.add(v.form);
        tenses.push({ name: T[0], formula: T[1], use: T[2], chunk: v.text });
      }
      const notes = [];
      for (const t of toks) {
        if (t.inf === 'gdrop') notes.push(`“${t.text}” = ${lemmaOf(t)} (o g final cai na fala).`);
        else if (t.inf) notes.push(`“${t.text}” = ${INFORMAL[t.inf][0]} (informal).`);
        else if (t.expand && t.expand !== t.normal) notes.push(`“${t.text}” = ${t.expand}.`);
      }
      const ph = [...new Set(toks.filter(t => t.phrasal).map(t => t.phrasal))];
      if (ph.length) notes.push(`Phrasal verb: ${ph.join(', ')}. Verbo + partícula com significado próprio.`);
      if (toks.some(t => t.normal === 'if')) notes.push('Frase condicional: “if” apresenta a condição; a outra parte é o resultado.');
      if (toks.some(t => t.normal === 'than')) notes.push('Comparação com “than” (do que).');
      return { kind, tenses, notes: [...new Set(notes)] };
    }

    return { analyze, explainWord, explainSentence, segment, lemmaOf, keyOf: t => lookupOf(t).toLowerCase() };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = make;
  else root.Reader = make(root.nlp);
})(this);
