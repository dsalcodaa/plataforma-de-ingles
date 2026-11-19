// C1 — Domínio avançado: ênfase, formalidade, economia e tom.
(function (X) {
  const { intro, demo, choose, read, order, type, transform, fix, dialog, lesson, module } = X;

  X.level('C1', 'Domínio avançado', [
    // ───────────────────────── Inversão
    module('inversao', 'Inversão', 'Never have I…, Not only…', [
      lesson('iv1', 'Nunca eu tinha visto', 'Inversão para ênfase', ['never have I', 'not only … but also', 'rarely', 'hardly … when', 'no sooner … than', 'under no circumstances', 'should you'], [
        intro('Você quer dar ênfase num discurso ou texto formal.', 'Inversão',
          'Depois de certas expressões negativas ou restritivas no início da frase, o auxiliar vem antes do sujeito, como numa pergunta.',
          [['Ênfase', 'Never/t | have/a | I/s | seen/v | such a view./c']],
          ['Never/Rarely/Seldom + auxiliar + sujeito: Rarely do we see this.', 'Not only + auxiliar + sujeito …, but also: Not only did she win, but she also broke the record.', 'Hardly had I arrived when… · No sooner had I sat down than…', 'Condicional formal sem if: Should you need help, call me. Had I known, I would have come.']),
        demo(['viagem', 'Never/t | have/a | I/s | seen/v | such a beautiful place./c', 'Nunca vi um lugar tão bonito.'], ['trabalho', 'Not only/c | did/a | he/s | arrive/v | late,/t | but he also forgot the slides./c', 'Ele não só chegou atrasado como esqueceu os slides.'],
          ['noticias', 'Rarely/t | do/a | we/s | see/v | such results./c', 'Raramente vemos resultados assim.'], ['trabalho', 'Should/a | you/s | have/v | any questions,/c | contact us./c', 'Caso tenha dúvidas, entre em contato.']),
        choose('viagem', 'Complete: Never ___ such a delicious meal.', ['have I eaten', 'I have eaten', 'I ate', 'did I ate'], { 'I have eaten': 'Depois de Never no início: inversão (have I eaten).', 'I ate': 'Inversão: have I eaten.', 'did I ate': 'did + forma base; aqui: have I eaten.' }),
        choose('trabalho', 'Complete: Not only ___ the project on time, but she also cut costs.', ['did she finish', 'she finished', 'she did finish'], { 'she finished': 'Inversão: did she finish.', 'she did finish': 'Auxiliar antes do sujeito: did she finish.' }),
        choose('rotina', 'Complete: Hardly had I closed my eyes ___ the phone rang.', ['when', 'than', 'then'], { than: '"than" é com no sooner. Hardly … when.', then: 'Hardly … when.' }),
        choose('trabalho', 'Forma formal de "If you need anything, let me know":', ['Should you need anything, let me know.', 'Should need you anything, let me know.', 'You should need anything, let me know.'], { 'Should need you anything, let me know.': 'Ordem: Should + you + need.', 'You should need anything, let me know.': 'Isso significa "você deveria precisar". Inversão: Should you need…' }),
        transform('viagem', 'I have never felt so tired.', 'Reescreva começando com "Never".', 'Never have I felt so tired.', ['^never have i felt so tired$'], [['^never i have', 'Inversão: Never have I…']], 'Never have I felt so tired.'),
        fix('estudos', 'Rarely I have seen such talent.', 'Rarely have I seen such talent.', [['^rarely i have', 'Inversão: Rarely have I seen.']]),
        type('trabalho', 'Escreva de forma formal: "If I had known, I would have come."', 'Comece com "Had I…".', 'Had I known, I would have come.', ['^had i known i would have come$'], [['^had i know\\b', 'Particípio: known.'], ['^if had i', 'Sem if na inversão: Had I known…']], 'Had I known, I would have come.', { stage: 3 }),
      ]),
    ]),

    // ───────────────────────── Cleft sentences
    module('cleft', 'Cleft sentences', 'Foi ele que…, O que eu preciso é…', [
      lesson('cl1', 'O que eu preciso é…', 'It is … that / What … is', ["It was … who", "It's … that", 'What I need is', 'All I want is', 'The reason why'], [
        intro('Você quer destacar a informação mais importante da frase.', 'Cleft sentences — frases de ênfase',
          'Você divide a frase em duas para pôr o foco numa parte: "It was John who…" ou "What I need is…".',
          [['It + be + foco', 'It/s | was/v | John/c | who/c | called./v'], ['What + …', 'What/c | I/s | need/v | is/v | a holiday./c']],
          ['Normal: John called. Ênfase: It was John who called (foi o John que ligou).', 'What I love about my job is the people.', 'All I want is some sleep (tudo o que eu quero é…).', 'The reason why I left is that… · The thing is (that)…']),
        demo(['trabalho', "It's/s | the deadline/c | that/c | worries/v | me./c", 'É o prazo que me preocupa.'], ['saude', 'What/c | you/s | need/v | is/v | rest./c', 'O que você precisa é descansar.'],
          ['amigos', 'It/s | was/v | in Paris/c | that/c | we/s | met./v', 'Foi em Paris que nos conhecemos.'], ['rotina', 'All/c | I/s | want/v | is/v | a coffee./c', 'Tudo o que eu quero é um café.']),
        choose('trabalho', 'Ênfase em "Maria": Maria found the error.', ['It was Maria who found the error.', 'It was Maria found the error who.', 'Maria was who found it the error.'], { 'It was Maria found the error who.': 'Ordem: It was Maria who found…', 'Maria was who found it the error.': 'Estrutura: It was Maria who…' }),
        choose('saude', 'Complete: ___ I need is a long holiday.', ['What', 'That', 'Which'], { That: 'Cleft com o que: What I need is…', Which: 'What I need is…' }),
        choose('amigos', 'Complete: It was in 2015 ___ I moved to Canada.', ['that', 'which', 'what'], { which: 'Cleft com it: It was … that.', what: 'It was … that.' }),
        transform('compras', 'I love the color of this car.', 'Reescreva começando com "What I love about this car is…".', 'What I love about this car is the color.', ['^what i love about this car is (the|its) colou?r$'], [['^what i love is', 'Inclua "about this car".']], 'What I love about this car is the color.'),
        fix('trabalho', 'Was the manager who approved it.', 'It was the manager who approved it.', [['^was the manager', 'Falta o sujeito: It was…']], ['^it was the manager (who|that) approved it$']),
        type('rotina', 'Você está exausto. Diga que tudo o que quer é dormir.', 'Comece com "All I want…".', 'All I want is to sleep.', ['^all i want (is|to do is) (to )?sleep$'], [['^all i want is sleeping', 'Mais natural: All I want is to sleep.']], 'All I want is to sleep.', { stage: 3 }),
        dialog('trabalho', 'Reunião tensa', ['bot', 'Is the budget the problem?', 'O problema é o orçamento?'],
          ['me', ["No, what worries me is the deadline.", 'No, that worries me is the deadline.', 'No, what worry me is the deadline.'], { 'No, that worries me is the deadline.': 'What worries me is…', 'No, what worry me is the deadline.': 'what → worries.' }],
          ['bot', 'Who set that deadline?', 'Quem definiu esse prazo?'],
          ['me', ['It was the client who set it.', 'It was the client which set it.', 'Was the client set it.'], { 'It was the client which set it.': 'Pessoa: who.', 'Was the client set it.': 'It was the client who set it.' }],
          ['bot', 'Then let\'s talk to them.', 'Então vamos falar com eles.']),
      ]),
    ]),

    // ───────────────────────── Subjuntivo e formalidade
    module('subjuntivo', 'Subjuntivo e estruturas formais', 'I suggest he go, It\'s time we left', [
      lesson('sj1', 'Sugiro que ele vá', 'Subjuntivo, it\'s time, would rather', ['suggest that', 'recommend that', 'it is essential that', "it's time", "I'd rather you", 'as if'], [
        intro('Você escreve uma recomendação formal no trabalho.', 'Subjuntivo e estruturas especiais',
          'Depois de verbos como suggest, recommend, insist e de expressões como it is essential that, usa-se o verbo na forma base para todos (sem -s, sem tempo).',
          [['Subjuntivo', 'I/s | suggest/v | that/c | he/s | take/v | a break./c']],
          ['The doctor recommended that she rest (não "rests").', "It's (high) time we left = já passou da hora de irmos (passado com sentido presente).", "I'd rather you didn't smoke here = prefiro que você não fume.", 'as if / as though + passado: He talks as if he were the boss.']),
        demo(['trabalho', 'It/s | is/v | essential/c | that/c | everyone/s | be/v | on time./c', 'É essencial que todos sejam pontuais.'], ['saude', 'The doctor/s | insisted/v | that/c | he/s | stop/v | smoking./c', 'O médico insistiu que ele parasse de fumar.'],
          ['familia', "It's/s | time/c | you/s | went/v | to bed./c", 'Já está na hora de você ir dormir.'], ['amigos', "I'd/s | rather/a | you/s | stayed./v", 'Prefiro que você fique.']),
        choose('trabalho', 'Complete: I suggest that she ___ the contract carefully.', ['read', 'reads', 'will read', 'to read'], { reads: 'Subjuntivo: forma base para todos (read).', 'will read': 'Subjuntivo: read.', 'to read': 'Sem to: that she read.' }),
        choose('familia', 'Complete: It\'s time we ___ home.', ['went', 'go', 'will go'], { go: "Depois de it's time: passado (went).", 'will go': "It's time + passado: went." }),
        choose('amigos', "Complete: I'd rather you ___ tell anyone.", ["didn't", "don't", "won't"], { "don't": "I'd rather you + passado: didn't.", "won't": "I'd rather you + passado: didn't." }),
        read('trabalho', 'It is recommended that all employees complete the training before March.', 'O que o texto diz?', ['Recomenda-se que todos os funcionários façam o treinamento antes de março.', 'Todos os funcionários já fizeram o treinamento.', 'O treinamento é opcional depois de março.'], { 'Todos os funcionários já fizeram o treinamento.': 'É uma recomendação, não um fato.', 'O treinamento é opcional depois de março.': 'O prazo é antes de março.' }),
        transform('saude', 'The doctor said: "You must rest."', 'Reescreva: "The doctor recommended that I…".', 'The doctor recommended that I rest.', ['^the doctor recommended that i (should )?rest$'], [['that i rested', 'Subjuntivo: forma base (rest).'], ['that i rests', 'Forma base: rest.']], 'The doctor recommended that I rest.'),
        fix('trabalho', 'He insisted that she comes to the meeting.', 'He insisted that she come to the meeting.', [['she comes', 'Subjuntivo: forma base (come).']], ['^he insisted that she (should )?come to the meeting$']),
        type('amigos', 'Seu amigo está há horas no videogame.', 'Diga que já está na hora de ele estudar ("It\'s time you…").', "It's time you studied.", ['^it is (high |about )?time you studied$', '^it is (high |about )?time (for you )?to study$'], [['time you study\\b', "It's time + passado: studied."]], "It's time you studied.", { stage: 3 }),
      ]),
    ]),

    // ───────────────────────── Elipse e substituição
    module('elipse', 'Elipse e substituição', 'So do I, I think so, one/ones', [
      lesson('el1', 'Eu também, acho que sim', 'Evitar repetições', ['so do I', 'neither do I', 'I think so', "I don't think so", 'I hope not', 'one', 'ones', 'do so'], [
        intro('Você quer soar natural, sem repetir frases inteiras.', 'Elipse e substituição',
          'Falantes nativos evitam repetir: usam auxiliares, so/not e one/ones no lugar das palavras já ditas.',
          [['Concordar', 'I/s | love/v | jazz./c | So/c | do/a | I./s']],
          ['Afirmativa: So do I / So am I / So can I (eu também)', 'Negativa: Neither do I / Me neither (eu também não)', 'I think so · I hope so · I\'m afraid not · I don\'t think so', 'one/ones: I don\'t like the red shirt. I prefer the blue one.', 'Auxiliar sozinho: She can swim, but I can\'t.']),
        demo(['amigos', "I'm/s | tired./c | So/c | am/a | I./s", 'Estou cansado. Eu também.'], ['restaurante', "I/s | don't/a | eat/v | meat./c | Neither/c | do/a | I./s", 'Não como carne. Nem eu.'],
          ['compras', 'Which/c | shoes?/c | The black ones./c', 'Quais sapatos? Os pretos.'], ['viagem', 'Will/a | it/s | rain?/v | I/s | hope/v | not./c', 'Vai chover? Espero que não.']),
        choose('amigos', '"I love pizza." — Concordar:', ['So do I.', 'So am I.', 'Neither do I.', 'So I do.'], { 'So am I.': 'love (presente simples) → do: So do I.', 'Neither do I.': 'Neither é para negativas.', 'So I do.': 'Ordem: So do I.' }),
        choose('trabalho', '"I can\'t come tomorrow." — "Eu também não":', ['Neither can I.', 'So can I.', 'Neither do I.', "Me can't too."], { 'So can I.': 'Negativa → Neither can I.', 'Neither do I.': 'Auxiliar da frase: can.', "Me can't too.": 'Neither can I / Me neither.' }),
        choose('viagem', '"Is the museum open on Monday?" — "Acho que não":', ["I don't think so.", 'I think not so.', "I don't think it."], { 'I think not so.': "Natural: I don't think so.", "I don't think it.": "Use so: I don't think so." }),
        choose('compras', 'Complete: These glasses are too big. Do you have smaller ___?', ['ones', 'one', 'them'], { one: 'Glasses é plural: ones.', them: 'Para outros itens do mesmo tipo: ones.' }),
        transform('amigos', 'A: "I was late." B: "I was late too."', 'Reescreva a resposta de B com "So…".', 'So was I.', ['^so was i$'], [['^so i was', 'Ordem: So was I.'], ['^so did i', 'Auxiliar da frase: was.']], 'So was I.'),
        fix('restaurante', "So don't I.", 'Neither do I.', [['^so do not i', 'Concordar com negativa: Neither do I.']], ['^(neither do i|me neither|nor do i)$'], { prompt: 'Seu amigo disse "I don\'t like olives." Corrija a sua resposta.' }),
        type('amigos', 'Your friend says: "I\'ve never been to Japan." You haven\'t either.', 'Responda concordando.', 'Neither have I.', ['^(neither|nor) have i$', '^me neither$'], [['^so have i', 'Frase negativa → Neither have I.'], ['^neither do i', 'Auxiliar da frase: have.']], 'Neither have I.', { stage: 3 }),
        dialog('amigos', 'Gostos em comum', ['bot', 'I hate waking up early.', 'Odeio acordar cedo.'],
          ['me', ['So do I. Especially on Mondays.', 'So am I. Especially on Mondays.', 'Neither do I.'], { 'So am I. Especially on Mondays.': 'hate → do: So do I.', 'Neither do I.': 'A frase é afirmativa: So do I.' }],
          ['bot', "I can't function without coffee.", 'Não funciono sem café.'],
          ['me', ['Neither can I!', 'So can I!', 'Neither do I!'], { 'So can I!': 'Negativa: Neither can I.', 'Neither do I!': 'Auxiliar: can.' }],
          ['bot', 'We\'re a perfect team.', 'Somos uma equipe perfeita.']),
      ]),
    ]),

    // ───────────────────────── Nominalização e registro
    module('registro', 'Nominalização, registro e tom', 'Formal, informal e cauteloso', [
      lesson('nm1', 'Do falado ao formal', 'Nominalização e registro', ['decision', 'improvement', 'reduction', 'implementation', 'regarding', 'in order to', 'request', 'assistance'], [
        intro('Você precisa transformar uma mensagem casual num e-mail formal.', 'Nominalização e registro',
          'Textos formais transformam verbos em substantivos (nominalização) e trocam palavras do dia a dia por equivalentes mais formais.',
          [['Informal', 'We/s | decided/v | to cut/v | costs./c'], ['Formal', 'The decision/s | to reduce costs/c | was/a | made./v']],
          ['decide → decision · improve → improvement · reduce → reduction · analyze → analysis', 'get → receive/obtain · ask for → request · help → assistance · about → regarding · buy → purchase', 'Informal: Hi / Thanks / Can you…? · Formal: Dear… / I would appreciate it if you could… / Kind regards']),
        demo(['trabalho', 'The implementation/s | of the system/c | took/v | six months./t', 'A implementação do sistema levou seis meses.'], ['trabalho', 'I/s | would/a | appreciate/v | your assistance./c', 'Agradeceria a sua ajuda.']),
        choose('trabalho', 'Forma nominal de "improve":', ['improvement', 'improving', 'improvation'], { improving: 'Isso é o -ing. Substantivo: improvement.', improvation: 'Não existe. Use improvement.' }),
        choose('trabalho', 'Versão formal de "Can you help me?":', ['I would appreciate your assistance.', 'Help me, please.', 'Gimme a hand?'], { 'Help me, please.': 'Ainda é direto/informal.', 'Gimme a hand?': 'Muito informal.' }),
        choose('trabalho', 'Versão formal de "about your email":', ['regarding your email', 'on your email stuff', 'kinda about your email'], { 'on your email stuff': 'Informal.', 'kinda about your email': 'Informal.' }),
        read('noticias', 'The reduction in interest rates led to an increase in consumer spending.', 'O que aconteceu?', ['Os juros caíram e o consumo aumentou.', 'Os juros subiram e o consumo caiu.', 'O consumo caiu por causa dos juros.'], { 'Os juros subiram e o consumo caiu.': 'reduction = redução; increase = aumento.', 'O consumo caiu por causa dos juros.': 'increase in spending = aumento do consumo.' }),
        transform('trabalho', 'We will analyze the data.', 'Nominalize: "The analysis of …".', 'The analysis of the data will be done.', ['^the analysis of the data will be (done|carried out|conducted|completed)$'], [['analyze of', 'Substantivo: analysis.']], 'The analysis of the data will be done.'),
        fix('trabalho', 'Dear Sir, I wanna know about the job.', 'Dear Sir, I would like to inquire about the position.', [['wanna', 'Em e-mail formal: I would like to.']], ['^dear sir i would like to (inquire|enquire|ask|know) about the (job|position|vacancy)$']),
        type('trabalho', 'Transforme "Thanks a lot!" num fechamento formal de e-mail.', 'Escreva um fechamento formal.', 'Kind regards', ['^(kind|best|warm) regards$', '^(yours )?sincerely$', '^yours faithfully$', '^thank you for your (time|attention|assistance)$'], [['^(thanks|cheers|bye)', 'Muito informal. Ex.: Kind regards.']], 'Kind regards / Sincerely.', { stage: 3 }),
      ]),
      lesson('rg1', 'Dizer com cautela', 'Hedging: suavizar afirmações', ['it seems that', 'tend to', 'may', 'arguably', 'to some extent', 'it appears', 'likely', 'somewhat'], [
        intro('Você escreve uma opinião sem parecer arrogante ou absoluto.', 'Hedging — linguagem cautelosa',
          'Em textos acadêmicos e profissionais, evita-se afirmar tudo como certeza. Expressões de cautela suavizam a frase.',
          [['Absoluto', 'This method/s | is/v | the best./c'], ['Cauteloso', 'This method/s | may/a | be/v | more effective./c']],
          ['It seems that / It appears that (parece que)', 'tend to (costuma) · is likely to (provavelmente vai)', 'may / might / could · to some extent (em certa medida) · arguably (pode-se dizer que)', 'Suavizar críticas: That might not be the best option. / I\'m not sure that\'s quite right.']),
        demo(['ciencia', 'The results/s | suggest/v | that/c | the drug/s | may/a | work./v', 'Os resultados sugerem que o remédio pode funcionar.'], ['trabalho', 'People/s | tend/v | to work/c | better/c | in the morning./t', 'As pessoas tendem a trabalhar melhor de manhã.']),
        choose('ciencia', 'Qual frase é mais cautelosa?', ['The data suggest that sleep may improve memory.', 'Sleep improves memory. Period.', 'Sleep always improves memory.'], { 'Sleep improves memory. Period.': 'Afirmação absoluta.', 'Sleep always improves memory.': '"always" é absoluto.' }),
        choose('trabalho', 'Crítica suave ao plano do chefe:', ['That might not be the best approach.', 'That plan is stupid.', 'That is wrong.'], { 'That plan is stupid.': 'Agressivo.', 'That is wrong.': 'Direto demais.' }),
        choose('noticias', 'Complete: Young people ___ to spend more time online.', ['tend', 'are tend', 'tends'], { 'are tend': 'tend é verbo: young people tend to.', tends: 'People é plural: tend.' }),
        read('ciencia', 'It appears that the new treatment is, to some extent, more effective than the old one.', 'O autor afirma que o novo tratamento…', ['parece ser um pouco mais eficaz, com ressalvas', 'é com certeza muito mais eficaz', 'não funciona'], { 'é com certeza muito mais eficaz': '"It appears" e "to some extent" mostram cautela.', 'não funciona': 'O texto diz que parece mais eficaz.' }),
        transform('ciencia', 'Coffee causes insomnia.', 'Suavize com "may".', 'Coffee may cause insomnia.', ['^coffee (may|might|can|could) cause insomnia$'], [['may causes', 'Depois de may: forma base (cause).']], 'Coffee may cause insomnia.'),
        fix('trabalho', 'Remote work is always better.', 'Remote work tends to be better for many people.', [['is always better$', 'Muito absoluto. Suavize: tends to be, may be.']], ['^remote work (tends to|may|might|can|could|is likely to|seems to) be better( for many people| for some people)?$', '^it seems that remote work is better( for many people)?$']),
        type('trabalho', 'Dê sua opinião sobre trabalho remoto, com cautela.', 'Use "It seems that…" ou "may".', 'It seems that remote work may increase productivity.', ['^it (seems|appears) (that )?[a-z0-9 ]+$', '^remote work (may|might|could|tends to|is likely to) [a-z0-9 ]+$', '^[a-z ]+ (may|might|could|tends? to|is likely to) [a-z0-9 ]+$'], [['always|never|definitely|certainly', 'Evite palavras absolutas.']], 'It seems that… / … may …', { stage: 3 }),
      ]),
    ]),
  ]);
})(window.CX);
