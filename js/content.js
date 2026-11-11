// Banco de conteúdo pedagógico. A aplicação só lê estes dados: novas lições, níveis ou idiomas
// entram aqui sem mudar o código.
// Convenção: em options, a resposta correta é SEMPRE a primeira (a tela embaralha).
// patterns/traps são regex aplicadas à resposta normalizada (minúsculas, sem pontuação, "didn't" -> "did not").
window.CONTENT = {
  language: { code: 'en', name: 'Inglês', tts: 'en-US' },

  roles: { subject: 'Quem', verb: 'Ação', aux: 'Auxiliar', comp: 'Complemento', time: 'Quando' },

  contexts: {
    rotina: 'Rotina', trabalho: 'Trabalho', estudos: 'Estudos', viagem: 'Viagem',
    restaurante: 'Restaurante', compras: 'Compras', familia: 'Família', amigos: 'Amigos',
  },

  structures: {
    'sp-regular': { name: 'Simple Past — verbos regulares', level: 'A1' },
    'sp-irregular': { name: 'Simple Past — verbos irregulares', level: 'A1' },
    'sp-neg-q': { name: 'Simple Past — negativa e pergunta', level: 'A1' },
  },

  levels: [
    {
      id: 'A1', title: 'Fundamentos',
      modules: [
        {
          id: 'simple-past', title: 'Simple Past', subtitle: 'Contar o que aconteceu',
          lessons: [
            // ───────────────────────────── Lição 1
            {
              id: 'sp1', structure: 'sp-regular', title: 'O que você fez ontem?', subtitle: 'Verbos regulares (-ed)',
              vocab: ['watched', 'played', 'worked', 'cooked', 'visited', 'finished', 'studied', 'called', 'yesterday', 'last night', 'last year'],
              steps: [
                {
                  type: 'intro',
                  situation: 'Você está contando para um amigo o que fez ontem.',
                  title: 'Simple Past — passado simples',
                  text: 'Usamos para falar de algo que já aconteceu e terminou. Nos verbos regulares, basta somar -ed.',
                  patterns: [{ parts: [['I', 'subject'], ['watched', 'verb'], ['a movie', 'comp'], ['yesterday.', 'time']] }],
                  tips: [
                    'watch → watched · play → played · work → worked',
                    'study → studied (consoante + y vira -ied)',
                    'A forma é igual para todos: I, you, she, we, they watched.',
                  ],
                },
                {
                  type: 'demo',
                  items: [
                    { context: 'trabalho', parts: [['I', 'subject'], ['finished', 'verb'], ['the report', 'comp'], ['yesterday.', 'time']], pt: 'Terminei o relatório ontem.' },
                    { context: 'viagem', parts: [['I', 'subject'], ['visited', 'verb'], ['London', 'comp'], ['last year.', 'time']], pt: 'Visitei Londres no ano passado.' },
                    { context: 'amigos', parts: [['We', 'subject'], ['watched', 'verb'], ['a movie', 'comp'], ['last night.', 'time']], pt: 'Assistimos a um filme ontem à noite.' },
                    { context: 'familia', parts: [['She', 'subject'], ['called', 'verb'], ['her mother', 'comp'], ['on Sunday.', 'time']], pt: 'Ela ligou para a mãe no domingo.' },
                  ],
                },
                {
                  type: 'build', context: 'amigos',
                  q: 'What did you do yesterday?', prompt: 'Conte para seu amigo o que você fez ontem.',
                  pt: 'Eu assisti a um filme ontem.',
                  steps: [
                    { ask: 'Quem realizou a ação?', role: 'subject', options: ['I', 'Me', 'My'],
                      why: { Me: '"Me" é objeto (a mim). Quem faz a ação é "I".', My: '"My" é possessivo (meu/minha).' } },
                    { ask: 'O que você fez?', role: 'verb', options: ['watched', 'watch', 'watching', 'watches'],
                      why: { watch: '"watch" é presente. Para ontem: watched.', watching: '"watching" indica ação em andamento, não concluída.', watches: '"watches" é presente com he/she/it.' } },
                    { ask: 'O que você assistiu?', role: 'comp', options: ['a movie', 'a movies', 'movie a'],
                      why: { 'a movies': '"a" acompanha uma coisa só: a movie.', 'movie a': 'O artigo vem antes: a movie.' } },
                    { ask: 'Quando aconteceu?', role: 'time', options: ['yesterday.', 'tomorrow.', 'now.'],
                      why: { 'tomorrow.': '"tomorrow" é amanhã — não combina com passado.', 'now.': '"now" é agora; a ação já terminou.' } },
                  ],
                },
                {
                  type: 'build', context: 'rotina',
                  q: 'What did you do last night?', prompt: 'Diga que você cozinhou macarrão ontem à noite.',
                  pt: 'Eu cozinhei macarrão ontem à noite.',
                  steps: [
                    { ask: 'Quem?', role: 'subject', options: ['I', 'Me'], why: { Me: 'Quem faz a ação é "I".' } },
                    { ask: 'O que você fez?', role: 'verb', options: ['cooked', 'cook', 'cooks'],
                      why: { cook: '"cook" é presente. Ontem à noite: cooked.', cooks: '"cooks" é presente com he/she/it.' } },
                    { ask: 'O quê?', role: 'comp', options: ['pasta', 'a pastas'], why: { 'a pastas': '"pasta" não leva "a" nem plural aqui.' } },
                    { ask: 'Quando?', role: 'time', options: ['last night.', 'next night.'], why: { 'next night.': '"next" é próximo. Passado: last night.' } },
                  ],
                },
                {
                  type: 'choose', context: 'trabalho',
                  prompt: 'Qual frase está no Simple Past?',
                  options: ['I worked late yesterday.', 'I work late yesterday.', 'I working late yesterday.', 'I am work late yesterday.'],
                  why: {
                    'I work late yesterday.': '"work" é presente; "yesterday" pede worked.',
                    'I working late yesterday.': 'Sem auxiliar, "working" não forma frase. Passado simples: worked.',
                    'I am work late yesterday.': '"am" é presente e não se usa com verbo base. Basta: I worked.',
                  },
                },
                {
                  type: 'choose', context: 'estudos',
                  prompt: 'Complete: She ___ English last night.',
                  options: ['studied', 'studyed', 'studies', 'study'],
                  why: {
                    studyed: 'Consoante + y: troca o y por -ied → studied.',
                    studies: '"studies" é presente (she studies). Last night pede passado.',
                    study: '"study" é a forma base, sem passado.',
                  },
                },
                {
                  type: 'order', context: 'viagem', stage: 2,
                  prompt: 'Monte a frase: "Eu visitei Londres no ano passado."',
                  words: ['I', 'visited', 'London', 'last', 'year.'], extra: ['visit', 'next'],
                  traps: [{ pattern: '\\bvisit\\b', why: 'Passado: visited.' }, { pattern: '\\bnext\\b', why: '"next year" é ano que vem. Passado: last year.' }],
                },
                {
                  type: 'type', context: 'amigos', stage: 2,
                  q: 'What did you do last weekend?', prompt: 'Responda que você jogou futebol.',
                  bank: ['I', 'played', 'play', 'soccer', 'last', 'weekend'],
                  model: 'I played soccer last weekend.',
                  patterns: ['^i played (soccer|football)( last weekend)?$'],
                  traps: [{ pattern: '^i play\\b', why: '"play" é presente. Fim de semana passado: played.' }],
                  explain: 'Estrutura: I + played + soccer (+ last weekend).',
                },
                {
                  type: 'fix', context: 'trabalho', stage: 2,
                  prompt: 'Corrija a frase.', source: 'I call my boss yesterday.',
                  accept: ['I called my boss yesterday.'], model: 'I called my boss yesterday.',
                  traps: [{ pattern: '^i call my', why: '"yesterday" pede passado: call → called.' }],
                },
                {
                  type: 'type', context: 'rotina', stage: 3,
                  q: 'What did you watch last night?', prompt: 'Responda com o que você assistiu.',
                  model: 'I watched a movie.',
                  patterns: ['^(i|we) watched [a-z0-9 ]+$'],
                  traps: [
                    { pattern: '^(i|we) watch\\b', why: 'Use o passado: watched.' },
                    { pattern: '^(i|we) (was|were) watching', why: 'Correto em inglês, mas aqui o treino é o Simple Past: I watched…' },
                  ],
                  explain: 'Comece com "I watched" + o que você viu.',
                },
                {
                  type: 'type', context: 'trabalho', stage: 3,
                  q: 'What time did you finish work yesterday?', prompt: 'Diga a hora em que terminou.',
                  model: 'I finished work at six.',
                  patterns: ['^i finished( work)?( at| around)? [a-z0-9 ]+$'],
                  traps: [{ pattern: '^i finish\\b', why: 'Ontem → passado: finished.' }],
                  explain: 'Comece com "I finished (work) at…".',
                },
                {
                  type: 'dialog', context: 'amigos', stage: 3,
                  turns: [
                    { who: 'bot', text: 'Hey! How was your weekend?', pt: 'Ei! Como foi seu fim de semana?' },
                    { who: 'me', options: ['It was great! I visited my grandparents.', 'It is great! I visit my grandparents.', 'It was great! I visiting my grandparents.'],
                      why: { 'It is great! I visit my grandparents.': 'O fim de semana já passou: was / visited.', 'It was great! I visiting my grandparents.': 'Ação concluída: visited.' } },
                    { who: 'bot', text: 'Nice! What did you do there?', pt: 'Legal! O que vocês fizeram lá?' },
                    { who: 'me', options: ['We cooked lunch and talked a lot.', 'We cook lunch and talk a lot.', 'We cooking lunch.'],
                      why: { 'We cook lunch and talk a lot.': 'Isso é presente. No passado: cooked, talked.', 'We cooking lunch.': 'Passado simples: cooked.' } },
                    { who: 'bot', text: 'Sounds perfect!', pt: 'Parece perfeito!' },
                  ],
                },
              ],
            },

            // ───────────────────────────── Lição 2
            {
              id: 'sp2', structure: 'sp-irregular', title: 'Verbos do dia a dia', subtitle: 'Verbos irregulares e blocos naturais',
              vocab: ['went', 'ate', 'had', 'saw', 'made', 'took', 'got', 'bought', 'woke up', 'made a decision', 'took a shower', 'had lunch'],
              steps: [
                {
                  type: 'intro',
                  situation: 'Um colega pergunta como foi a sua manhã.',
                  title: 'Verbos irregulares',
                  text: 'Os verbos mais usados do inglês não ganham -ed: eles mudam de forma. A boa notícia: a frase continua com a mesma estrutura.',
                  patterns: [{ parts: [['I', 'subject'], ['went', 'verb'], ['to the gym', 'comp'], ['this morning.', 'time']] }],
                  tips: [
                    'go → went · eat → ate · have → had · see → saw',
                    'make → made · take → took · get → got · buy → bought',
                    'Aprenda em blocos: had lunch, took a shower, made a decision, got home.',
                  ],
                },
                {
                  type: 'demo',
                  items: [
                    { context: 'rotina', parts: [['I', 'subject'], ['woke up', 'verb'], ['at seven.', 'time']], pt: 'Acordei às sete.' },
                    { context: 'familia', parts: [['We', 'subject'], ['had', 'verb'], ['dinner together', 'comp'], ['last night.', 'time']], pt: 'Jantamos juntos ontem à noite.' },
                    { context: 'trabalho', parts: [['I', 'subject'], ['made', 'verb'], ['a decision', 'comp'], ['this morning.', 'time']], pt: 'Tomei uma decisão hoje de manhã.' },
                    { context: 'compras', parts: [['She', 'subject'], ['bought', 'verb'], ['a new phone', 'comp'], ['yesterday.', 'time']], pt: 'Ela comprou um celular novo ontem.' },
                  ],
                },
                {
                  type: 'build', context: 'viagem',
                  q: 'What did you do last weekend?', prompt: 'Conte que você foi à praia com seus amigos.',
                  pt: 'Eu fui à praia com meus amigos.',
                  steps: [
                    { ask: 'Quem?', role: 'subject', options: ['I', 'My'], why: { My: '"My" é possessivo. Quem faz a ação: I.' } },
                    { ask: 'O que você fez?', role: 'verb', options: ['went', 'goed', 'go', 'going'],
                      why: { goed: '"go" é irregular: o passado é went.', go: '"go" é presente. Passado: went.', going: '"going" indica ação em andamento.' } },
                    { ask: 'Para onde?', role: 'comp', options: ['to the beach', 'in the beach', 'the beach to'],
                      why: { 'in the beach': 'Com movimento (go), use to: went to the beach.', 'the beach to': '"to" vem antes do lugar.' } },
                    { ask: 'Com quem?', role: 'comp', options: ['with my friends.', 'with I friends.'], why: { 'with I friends.': 'Posse: my friends.' } },
                  ],
                },
                {
                  type: 'build', context: 'trabalho',
                  q: 'What happened in the meeting?', prompt: 'Diga que você tomou uma decisão hoje de manhã.',
                  pt: 'Eu tomei uma decisão hoje de manhã.',
                  steps: [
                    { ask: 'Quem?', role: 'subject', options: ['I', 'Me'], why: { Me: 'Quem faz a ação: I.' } },
                    { ask: 'O que você fez?', role: 'verb', options: ['made', 'did', 'maked', 'took'],
                      why: { did: 'Em inglês, decisão se "faz" com make: made a decision.', maked: '"make" é irregular: made.', took: '"take a decision" existe, mas o natural é make a decision.' } },
                    { ask: 'O quê?', role: 'comp', options: ['a decision', 'a decide'], why: { 'a decide': '"decide" é verbo. O substantivo é decision.' } },
                    { ask: 'Quando?', role: 'time', options: ['this morning.', 'next morning.'], why: { 'next morning.': 'Passado: this morning (hoje de manhã).' } },
                  ],
                },
                {
                  type: 'choose', context: 'restaurante',
                  prompt: 'Complete: We ___ pizza last night.',
                  options: ['ate', 'eated', 'eat', 'eaten'],
                  why: {
                    eated: '"eat" é irregular: ate.',
                    eat: '"eat" é presente. Last night pede ate.',
                    eaten: '"eaten" é particípio (usado com have). No passado simples: ate.',
                  },
                },
                {
                  type: 'choose', context: 'rotina',
                  prompt: 'Como se diz "tomei banho" de forma natural?',
                  options: ['I took a shower.', 'I made a shower.', 'I did a shower.', 'I taked a shower.'],
                  why: {
                    'I made a shower.': 'O bloco natural é take a shower → took a shower.',
                    'I did a shower.': 'O bloco natural é take a shower → took a shower.',
                    'I taked a shower.': '"take" é irregular: took.',
                  },
                },
                {
                  type: 'order', context: 'compras', stage: 2,
                  prompt: 'Monte a frase: "Ela comprou um celular novo ontem."',
                  words: ['She', 'bought', 'a', 'new', 'phone', 'yesterday.'], extra: ['buyed', 'buys'],
                  traps: [{ pattern: '\\bbuyed\\b', why: '"buy" é irregular: bought.' }, { pattern: '\\bbuys\\b', why: '"buys" é presente. Passado: bought.' }],
                },
                {
                  type: 'type', context: 'restaurante', stage: 2,
                  q: 'What did you eat yesterday?', prompt: 'Diga o que você comeu.',
                  bank: ['I', 'ate', 'eat', 'pizza', 'rice', 'salad'],
                  model: 'I ate pizza.',
                  patterns: ['^i ate [a-z0-9 ]+$'],
                  traps: [
                    { pattern: '^i eat\\b', why: '"eat" é presente. Ontem: ate.' },
                    { pattern: '\\beated\\b', why: '"eat" é irregular: ate.' },
                    { pattern: '^i eaten\\b', why: '"eaten" precisa de have. No passado simples: I ate.' },
                  ],
                  explain: 'Comece com "I ate" + a comida.',
                },
                {
                  type: 'fix', context: 'viagem', stage: 2,
                  prompt: 'Corrija a frase.', source: 'I goed to Paris last year.',
                  accept: ['I went to Paris last year.'], model: 'I went to Paris last year.',
                  traps: [{ pattern: '\\bgoed\\b', why: '"go" é irregular: went.' }, { pattern: '^i go to', why: 'Last year pede passado: went.' }],
                },
                {
                  type: 'type', context: 'rotina', stage: 3,
                  q: 'What time did you wake up today?', prompt: 'Diga a hora em que acordou.',
                  model: 'I woke up at seven.',
                  patterns: ['^i (woke|got) up( at| around)? [a-z0-9 ]+$'],
                  traps: [
                    { pattern: '^i wake up', why: 'Passado de wake up: woke up.' },
                    { pattern: '\\bwaked\\b', why: '"wake" é irregular: woke.' },
                  ],
                  explain: 'Comece com "I woke up at…".',
                },
                {
                  type: 'type', context: 'familia', stage: 3,
                  q: 'What did you have for dinner last night?', prompt: 'Diga o que você jantou.',
                  model: 'I had pasta for dinner.',
                  patterns: ['^(i|we) had [a-z0-9 ]+$'],
                  traps: [
                    { pattern: '^(i|we) have\\b', why: '"have" é presente. Ontem à noite: had.' },
                    { pattern: '\\bhaved\\b', why: '"have" é irregular: had.' },
                  ],
                  explain: 'Comece com "I had" + a comida.',
                },
                {
                  type: 'dialog', context: 'trabalho', stage: 3,
                  turns: [
                    { who: 'bot', text: 'Morning! You look tired. What happened?', pt: 'Bom dia! Você parece cansado. O que houve?' },
                    { who: 'me', options: ['I woke up at five and took the bus.', 'I wake up at five and take the bus.', 'I waked up at five and taked the bus.'],
                      why: { 'I wake up at five and take the bus.': 'Isso é presente. Hoje cedo já passou: woke up, took.', 'I waked up at five and taked the bus.': 'Irregulares: wake → woke, take → took.' } },
                    { who: 'bot', text: 'Wow, early! Did you have breakfast?', pt: 'Nossa, cedo! Você tomou café da manhã?' },
                    { who: 'me', options: ['Yes, I had coffee and bread.', 'Yes, I have coffee yesterday.', 'Yes, I haved coffee.'],
                      why: { 'Yes, I have coffee yesterday.': 'Passado de have: had.', 'Yes, I haved coffee.': '"have" é irregular: had.' } },
                    { who: 'bot', text: 'Good. Let\'s get to work!', pt: 'Ótimo. Vamos trabalhar!' },
                  ],
                },
              ],
            },

            // ───────────────────────────── Lição 3
            {
              id: 'sp3', structure: 'sp-neg-q', title: 'Negar e perguntar', subtitle: 'did · didn\'t · respostas curtas',
              vocab: ["didn't", 'did', 'Did you…?', 'Yes, I did.', "No, I didn't.", 'Where did you go?'],
              steps: [
                {
                  type: 'intro',
                  situation: 'Você precisa dizer que NÃO fez algo — e perguntar o que alguém fez.',
                  title: 'O passado vai para o "did"',
                  text: 'Na negativa e na pergunta, quem carrega o passado é did. O verbo principal volta para a forma base.',
                  patterns: [
                    { label: 'Negativa', parts: [['I', 'subject'], ["didn't", 'aux'], ['watch', 'verb'], ['the game.', 'comp']] },
                    { label: 'Pergunta', parts: [['Did', 'aux'], ['you', 'subject'], ['watch', 'verb'], ['the game?', 'comp']] },
                  ],
                  tips: [
                    "I watched → I didn't watch",
                    'She went → Did she go?',
                    "Resposta curta: Yes, I did. / No, I didn't.",
                  ],
                },
                {
                  type: 'demo',
                  items: [
                    { context: 'trabalho', parts: [['I', 'subject'], ["didn't", 'aux'], ['finish', 'verb'], ['the report.', 'comp']], pt: 'Não terminei o relatório.' },
                    { context: 'amigos', parts: [['Did', 'aux'], ['you', 'subject'], ['see', 'verb'], ['Ana', 'comp'], ['yesterday?', 'time']], pt: 'Você viu a Ana ontem?' },
                    { context: 'compras', parts: [['We', 'subject'], ["didn't", 'aux'], ['buy', 'verb'], ['anything.', 'comp']], pt: 'Não compramos nada.' },
                    { context: 'viagem', parts: [['Did', 'aux'], ['they', 'subject'], ['go', 'verb'], ['to Rome?', 'comp']], pt: 'Eles foram a Roma?' },
                  ],
                },
                {
                  type: 'build', context: 'rotina',
                  q: 'Did you have breakfast today?', prompt: 'Diga que você não tomou café da manhã hoje.',
                  pt: 'Eu não tomei café da manhã hoje.',
                  steps: [
                    { ask: 'Quem?', role: 'subject', options: ['I', 'Me'], why: { Me: 'Quem faz a ação: I.' } },
                    { ask: 'Negando no passado…', role: 'aux', options: ["didn't", "don't", "wasn't"],
                      why: { "don't": '"don\'t" é presente. No passado: didn\'t.', "wasn't": '"wasn\'t" é do verbo to be. Com outros verbos: didn\'t.' } },
                    { ask: 'Qual forma do verbo?', role: 'verb', options: ['have', 'had', 'having'],
                      why: { had: 'Depois de didn\'t, o verbo volta à forma base: didn\'t have.', having: 'Depois de didn\'t: forma base (have).' } },
                    { ask: 'O quê?', role: 'comp', options: ['breakfast', 'a breakfasts'], why: { 'a breakfasts': 'Sem artigo: have breakfast.' } },
                    { ask: 'Quando?', role: 'time', options: ['today.', 'tomorrow.'], why: { 'tomorrow.': 'Amanhã ainda não aconteceu.' } },
                  ],
                },
                {
                  type: 'build', context: 'amigos',
                  q: '', prompt: 'Pergunte se seu amigo viu o jogo ontem.',
                  pt: 'Você viu o jogo ontem?',
                  steps: [
                    { ask: 'Pergunta no passado começa com…', role: 'aux', options: ['Did', 'Do', 'Was'],
                      why: { Do: '"Do" é presente. Passado: Did.', Was: '"Was" é do verbo to be. Com "see": Did.' } },
                    { ask: 'Para quem é a pergunta?', role: 'subject', options: ['you', 'your'], why: { your: '"your" é possessivo. Sujeito: you.' } },
                    { ask: 'Qual forma do verbo?', role: 'verb', options: ['see', 'saw', 'seeing'],
                      why: { saw: 'O "Did" já marca o passado: Did you see…?', seeing: 'Depois de Did: forma base (see).' } },
                    { ask: 'O que e quando?', role: 'comp', options: ['the game yesterday?', 'yesterday the game?'], why: { 'yesterday the game?': 'O tempo vem no final: the game yesterday?' } },
                  ],
                },
                {
                  type: 'choose', context: 'estudos',
                  prompt: 'Qual frase está correta?',
                  options: ["She didn't study for the test.", "She didn't studied for the test.", 'She not studied for the test.', "She doesn't studied for the test."],
                  why: {
                    "She didn't studied for the test.": 'Depois de didn\'t, forma base: study.',
                    'She not studied for the test.': 'Negativa precisa do auxiliar: didn\'t study.',
                    "She doesn't studied for the test.": '"doesn\'t" é presente. Passado: didn\'t study.',
                  },
                },
                {
                  type: 'choose', context: 'trabalho',
                  prompt: '"Did you send the email?" — resposta curta positiva:',
                  options: ['Yes, I did.', 'Yes, I sent.', 'Yes, I do.', "Yes, I didn't."],
                  why: {
                    'Yes, I sent.': 'Resposta curta repete o auxiliar: Yes, I did.',
                    'Yes, I do.': '"do" é presente. A pergunta foi com Did.',
                    "Yes, I didn't.": '"Yes" com "didn\'t" se contradiz.',
                  },
                },
                {
                  type: 'transform', context: 'compras', stage: 2,
                  prompt: 'Transforme em negativa.', source: 'We bought a new TV.',
                  bank: ['We', "didn't", 'buy', 'bought', 'a', 'new', 'TV'],
                  accept: ["We didn't buy a new TV."], model: "We didn't buy a new TV.",
                  traps: [
                    { pattern: 'did not bought', why: 'Depois de didn\'t, forma base: buy.' },
                    { pattern: '^we not\\b', why: 'Negativa precisa do auxiliar: didn\'t.' },
                    { pattern: '^we do not', why: '"don\'t" é presente. Passado: didn\'t.' },
                  ],
                },
                {
                  type: 'transform', context: 'viagem', stage: 2,
                  prompt: 'Transforme em pergunta.', source: 'They went to Rome.',
                  accept: ['Did they go to Rome?'], model: 'Did they go to Rome?',
                  traps: [
                    { pattern: 'did they went', why: 'Depois de Did, forma base: go.' },
                    { pattern: '^they went', why: 'A pergunta começa com Did: Did they go…?' },
                    { pattern: '^do they', why: '"Do" é presente. Passado: Did.' },
                  ],
                },
                {
                  type: 'order', context: 'familia', stage: 2,
                  prompt: 'Monte a pergunta: "Você ligou para sua mãe ontem?"',
                  words: ['Did', 'you', 'call', 'your', 'mother', 'yesterday?'], extra: ['called', 'Do'],
                  traps: [{ pattern: '\\bcalled\\b', why: 'Depois de Did, forma base: call.' }, { pattern: '^do\\b', why: '"Do" é presente. Passado: Did.' }],
                },
                {
                  type: 'fix', context: 'trabalho', stage: 2,
                  prompt: 'Corrija a frase.', source: "I didn't went to the meeting.",
                  accept: ["I didn't go to the meeting."], model: "I didn't go to the meeting.",
                  traps: [{ pattern: 'did not went', why: 'Depois de didn\'t, forma base: go.' }],
                },
                {
                  type: 'type', context: 'rotina', stage: 3,
                  q: 'Did you go out last night?', prompt: 'Responda com uma resposta curta.',
                  model: "No, I didn't.",
                  patterns: ['^(yes i did|no i did not)( [a-z0-9 ]+)?$', '^yes i went out( [a-z0-9 ]+)?$', '^no i stayed( at)? home$'],
                  traps: [
                    { pattern: '^(yes|no) i (do|do not)\\b', why: 'A pergunta foi no passado: Yes, I did. / No, I didn\'t.' },
                    { pattern: 'did not went', why: 'Depois de didn\'t, forma base: go.' },
                  ],
                  explain: "Resposta curta: Yes, I did. / No, I didn't.",
                },
                {
                  type: 'type', context: 'amigos', stage: 3,
                  q: 'I traveled last month.', prompt: 'Seu amigo disse isso. Pergunte para onde ele foi.',
                  model: 'Where did you go?',
                  patterns: ['^where did you (go|travel)( to)?$'],
                  traps: [
                    { pattern: '^where you (went|go)', why: 'Pergunta no passado: Where + did + you + go?' },
                    { pattern: 'did you (went|traveled)', why: 'Depois de did, forma base: go / travel.' },
                  ],
                  explain: 'Where + did + you + go?',
                },
                {
                  type: 'dialog', context: 'restaurante', stage: 3,
                  turns: [
                    { who: 'bot', text: 'Did you like the restaurant?', pt: 'Você gostou do restaurante?' },
                    { who: 'me', options: ['Yes, I did! The food was amazing.', 'Yes, I liked! The food was amazing.', 'Yes, I do! The food is amazing.'],
                      why: { 'Yes, I liked! The food was amazing.': 'Resposta curta repete o auxiliar: Yes, I did.', 'Yes, I do! The food is amazing.': 'A pergunta foi no passado: Yes, I did.' } },
                    { who: 'bot', text: 'Did you try the dessert?', pt: 'Você provou a sobremesa?' },
                    { who: 'me', options: ["No, I didn't. I was full.", "No, I didn't tried it.", "No, I don't. I was full."],
                      why: { "No, I didn't tried it.": 'Depois de didn\'t, forma base: try.', "No, I don't. I was full.": 'Passado: No, I didn\'t.' } },
                    { who: 'bot', text: 'Next time, then!', pt: 'Fica para a próxima!' },
                  ],
                },
              ],
            },
          ],
        },
        { title: 'Verb to be', soon: true },
        { title: 'Pronomes (I, me, my)', soon: true },
        { title: 'Artigos e plural', soon: true },
        { title: 'Simple Present', soon: true },
        { title: 'Present Continuous', soon: true },
        { title: 'There is / There are', soon: true },
        { title: 'This, that, these, those', soon: true },
        { title: 'Preposições de lugar', soon: true },
        { title: 'Can / Can\'t', soon: true },
        { title: 'Imperativo', soon: true },
        { title: 'Perguntas básicas', soon: true },
        { title: 'Números, datas e horas', soon: true },
        { title: 'Possessivo \'s', soon: true },
      ],
    },
    { id: 'A2', title: 'Construção de frases', topics: ['Simple Past completo', 'Past Continuous', 'Going to', 'Will', 'Present Perfect (intro)', 'Comparativos e superlativos', 'Contáveis e incontáveis', 'Some / Any / Much / Many', 'Should / Must / Have to', 'Advérbios de frequência', 'Preposições de tempo', 'Infinitivo e gerúndio', 'First Conditional'] },
    { id: 'B1', title: 'Comunicação intermediária', topics: ['Present Perfect', 'Present Perfect Continuous', 'Past Perfect', 'Used to / Would', 'Second Conditional', 'Passive Voice', 'Reported Speech', 'Relative Clauses', 'Modais de dedução', 'Phrasal verbs', 'Question tags', 'Future Continuous e Future Perfect'] },
    { id: 'B2', title: 'Fluência estrutural', topics: ['Third e Mixed Conditionals', 'Passiva avançada', 'Reported Speech avançado', 'Causativo (have something done)', 'Modais no passado', 'Inversão', 'Participle clauses', 'Conectores e marcadores de discurso'] },
    { id: 'C1', title: 'Domínio avançado', topics: ['Inversão avançada', 'Subjuntivo', 'Elipse', 'Cleft sentences', 'Nominalização', 'Nuances dos modais', 'Registro e tom', 'Expressões idiomáticas', 'Inglês falado natural'] },
  ],
};
