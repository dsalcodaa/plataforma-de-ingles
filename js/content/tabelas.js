// Quadros-resumo das explicações. Cada lição recebe tabelas na sua primeira tela de explicação (intro).
// Formato: tab(título, [cabeçalho], [[linha], …], nota?). Use **texto** para destacar a forma que o aluno deve memorizar.
(function (C) {
  const tab = (title, head, rows, note) => ({ title, head, rows, note });

  const T = {
    // ═════════════ A1
    tb1: [tab('Verb to be — quem usa am, is ou are', ['Pessoa', 'To be', 'Contração', 'Tradução'], [
      ['I', '**am**', "I'm", 'eu sou / estou'],
      ['You', '**are**', "you're", 'você é / está'],
      ['He', '**is**', "he's", 'ele é / está'],
      ['She', '**is**', "she's", 'ela é / está'],
      ['It', '**is**', "it's", 'ele/ela é (coisa, animal)'],
      ['We', '**are**', "we're", 'nós somos / estamos'],
      ['You', '**are**', "you're", 'vocês são / estão'],
      ['They', '**are**', "they're", 'eles/elas são / estão'],
    ], 'Resumo: I → am · he, she, it → is · todos os outros → are.')],
    tb2: [tab('Negativa e pergunta com to be', ['Afirmativa', 'Negativa', 'Pergunta', 'Resposta curta'], [
      ["I'm tired.", "I'm **not** tired.", '**Am I** tired?', 'Yes, I am. / No, I\'m not.'],
      ["She's tired.", "She **isn't** tired.", '**Is she** tired?', "Yes, she is. / No, she isn't."],
      ["They're tired.", "They **aren't** tired.", '**Are they** tired?', "Yes, they are. / No, they aren't."],
    ], 'Para negar, coloque not depois do to be. Para perguntar, troque a ordem: o to be vem antes da pessoa.')],
    pr1: [tab('Os pronomes lado a lado', ['Sujeito (quem faz)', 'Objeto (quem recebe)', 'Possessivo + coisa', 'Possessivo sozinho', 'Tradução'], [
      ['**I**', 'me', 'my book', 'mine', 'eu · me · meu'],
      ['**you**', 'you', 'your book', 'yours', 'você · te · seu'],
      ['**he**', 'him', 'his book', 'his', 'ele · o/lhe · dele'],
      ['**she**', 'her', 'her book', 'hers', 'ela · a/lhe · dela'],
      ['**it**', 'it', 'its color', '—', 'ele/ela (coisa) · dele/dela'],
      ['**we**', 'us', 'our book', 'ours', 'nós · nos · nosso'],
      ['**they**', 'them', 'their book', 'theirs', 'eles · os/lhes · deles'],
    ], 'Leia cada linha da esquerda para a direita. Linha do she: **She** calls **her** mom. This is **her** book. The book is **hers**.'),
    tab('Onde cada um entra na frase', ['Posição', 'Exemplo'], [
      ['Antes do verbo', '**She** calls.'],
      ['Depois do verbo ou da preposição', 'I call **her**. · with **him**'],
      ['Antes de um substantivo', '**her** car'],
      ['No fim, sem substantivo', 'The car is **hers**.'],
    ])],
    ar1: [tab('Artigos', ['Artigo', 'Quando usar', 'Exemplo'], [
      ['**a**', 'um/uma + som de consoante', 'a car, a university (som "iu")'],
      ['**an**', 'um/uma + som de vogal', 'an apple, an hour (h mudo)'],
      ['**the**', 'o/a/os/as — algo específico', 'the car (aquele carro)'],
      ['—', 'falar em geral, no plural', 'I like dogs. (cachorros em geral)'],
    ]), tab('Plural', ['Regra', 'Singular → plural'], [
      ['Regra geral: + **s**', 'book → books'],
      ['-s, -sh, -ch, -x, -o: + **es**', 'bus → buses, watch → watches'],
      ['consoante + y: y → **ies**', 'city → cities'],
      ['Irregulares', 'man → **men**, woman → **women**, child → **children**, person → **people**, foot → **feet**'],
    ])],
    th1: [tab('There to be = haver / ter (existir)', ['', 'Singular', 'Plural'], [
      ['Afirmativa', 'There **is** a bank.', 'There **are** two banks.'],
      ['Negativa', "There **isn't** a bank.", "There **aren't** any banks."],
      ['Pergunta', '**Is there** a bank?', '**Are there** any banks?'],
      ['Passado', 'There **was** a bank.', 'There **were** banks.'],
    ], 'Em português dizemos "tem um banco"; em inglês, nunca "it has": use there is.')],
    dm1: [tab('Demonstrativos', ['', 'Perto (aqui)', 'Longe (lá)'], [
      ['Singular', '**this** — este/esta/isto', '**that** — aquele/aquela/aquilo'],
      ['Plural', '**these** — estes/estas', '**those** — aqueles/aquelas'],
    ])],
    spr1: [tab('Simple Present — afirmativa', ['Pessoa', 'Verbo', 'Exemplo'], [
      ['I / you / we / they', 'forma base', 'I **work**. They **live** here.'],
      ['he / she / it', 'forma base **+ s**', 'She **works**. He **lives** here.'],
    ]), tab('Como colocar o -s', ['Terminação', 'Regra', 'Exemplo'], [
      ['geral', '+ s', 'work → work**s**'],
      ['-s, -sh, -ch, -x, -o', '+ es', 'watch → watch**es**, go → go**es**, do → do**es**'],
      ['consoante + y', 'y → ies', 'study → stud**ies**'],
      ['irregular', 'have → has', 'She **has** a car.'],
    ])],
    spr2: [tab('Simple Present — negativa e pergunta', ['Pessoa', 'Negativa', 'Pergunta', 'Resposta curta'], [
      ['I / you / we / they', "I **don't** like coffee.", '**Do** you like coffee?', "Yes, I do. / No, I don't."],
      ['he / she / it', "She **doesn't** like coffee.", '**Does** she like coffee?', "Yes, she does. / No, she doesn't."],
    ], 'O -s vai para o does: She doesn\'t like (sem -s no like). Does she like? (sem -s).')],
    fr1: [tab('Advérbios de frequência', ['Advérbio', '%', 'Tradução'], [
      ['**always**', '100%', 'sempre'], ['**usually**', '80%', 'geralmente'], ['**often**', '60%', 'frequentemente'],
      ['**sometimes**', '40%', 'às vezes'], ['**rarely**', '10%', 'raramente'], ['**never**', '0%', 'nunca'],
    ], 'Posição: antes do verbo (I always walk) e depois do to be (I am always late).'),
    tab('Preposições de tempo', ['Preposição', 'Com', 'Exemplo'], [
      ['**at**', 'horas e momentos', 'at 7, at night, at noon'],
      ['**on**', 'dias e datas', 'on Monday, on May 5th'],
      ['**in**', 'meses, anos, partes do dia', 'in May, in 2024, in the morning'],
    ])],
    pc1: [tab('Present Continuous = to be + verbo-ing', ['Pessoa', 'To be', 'Verbo + ing', 'Tradução'], [
      ['I', '**am**', 'working', 'estou trabalhando'],
      ['he / she / it', '**is**', 'working', 'está trabalhando'],
      ['you / we / they', '**are**', 'working', 'estão trabalhando'],
    ], 'Negativa: I\'m not working. Pergunta: Are you working?'),
    tab('Como formar o -ing', ['Regra', 'Exemplo'], [
      ['geral: + ing', 'read → read**ing**'], ['termina em -e: tira o e', 'make → mak**ing**'],
      ['consoante-vogal-consoante (sílaba forte): dobra', 'run → ru**nn**ing, sit → si**tt**ing'], ['-ie → y', 'lie → l**y**ing'],
    ])],
    pc2: [tab('Simple Present x Present Continuous', ['', 'Simple Present', 'Present Continuous'], [
      ['Uso', 'rotina, fatos, sempre', 'agora, temporário, hoje'],
      ['Palavras-guia', 'every day, usually, always', 'now, today, this week, at the moment'],
      ['Exemplo', 'I **work** from home.', "I'**m working** at the office today."],
    ], 'Verbos de estado (like, know, want, need) quase nunca vão para o -ing.')],
    lw1: [tab('Linking words básicas', ['Palavra', 'Função', 'Exemplo'], [
      ['**and**', 'somar', 'I read and write.'], ['**but**', 'contrastar', "It's cheap but good."],
      ['**or**', 'alternativa', 'Tea or coffee?'], ['**because**', 'causa (porque)', "I'm tired because I worked."],
      ['**so**', 'consequência (então)', 'I was tired, so I slept.'], ['**then**', 'sequência (depois)', 'I ate, then I left.'],
    ])],
    cn1: [tab('Can = poder / saber fazer', ['', 'Forma', 'Exemplo'], [
      ['Afirmativa', 'can + verbo', 'I **can** swim.'], ['Negativa', "can't / cannot + verbo", "She **can't** drive."],
      ['Pergunta', 'Can + pessoa + verbo?', '**Can** you help me?'],
    ], 'Igual para todas as pessoas: he can (nunca "cans"), e sem to depois: can swim.')],
    im1: [tab('Imperativo', ['', 'Forma', 'Exemplo'], [
      ['Ordem / instrução', 'verbo base', '**Open** the door.'], ['Proibição', "Don't + verbo", "**Don't** touch."],
      ['Convite', "Let's + verbo", "**Let's** go!"], ['Educado', 'Please + verbo', '**Please** sit down.'],
    ])],
    wh1: [tab('Palavras interrogativas', ['Palavra', 'Pergunta sobre', 'Exemplo'], [
      ['**What**', 'o quê / qual', 'What is your name?'], ['**Where**', 'onde', 'Where do you live?'],
      ['**When**', 'quando', 'When is the party?'], ['**Who**', 'quem', 'Who is she?'],
      ['**Why**', 'por quê', 'Why are you sad?'], ['**How**', 'como', 'How are you?'],
      ['**How much / many**', 'quanto / quantos', 'How much is it? How many kids?'], ['**How old**', 'idade', 'How old are you?'],
    ]), tab('A ordem da pergunta', ['Palavra', 'Auxiliar', 'Pessoa', 'Verbo / resto'], [
      ['Where', '**do**', 'you', 'work?'], ['What', '**does**', 'she', 'do?'], ['Where', '**are**', 'you', 'from?'], ['When', '**did**', 'they', 'arrive?'],
    ])],
    pl1: [tab('Preposições de lugar', ['Preposição', 'Significado', 'Exemplo'], [
      ['**in**', 'dentro', 'in the box'], ['**on**', 'em cima (encostado)', 'on the table'], ['**under**', 'embaixo', 'under the bed'],
      ['**next to**', 'ao lado', 'next to the bank'], ['**between**', 'entre (dois)', 'between A and B'], ['**in front of**', 'na frente', 'in front of the school'],
      ['**behind**', 'atrás', 'behind the door'], ['**at**', 'num ponto/endereço', 'at home, at work, at the bus stop'],
    ])],
    ps1: [tab("Possessivo 's", ['Dono', 'Forma', 'Exemplo'], [
      ['uma pessoa', "nome + **'s**", "John**'s** car (o carro do João)"], ['plural com s', "**s'**", "my parents**'** house"],
      ['plural irregular', "**'s**", "the children**'s** toys"], ['coisas', '**of**', 'the door **of** the car'],
    ], "Em português invertemos: o carro do João = John's car (o dono vem primeiro).")],
    sp1: [tab('Simple Past — verbos regulares', ['Regra', 'Exemplo'], [
      ['+ **ed** (todas as pessoas)', 'work → work**ed**'], ['termina em -e: + **d**', 'live → live**d**'],
      ['consoante + y → **ied**', 'study → stud**ied**'], ['dobra a consoante', 'stop → sto**pp**ed'],
    ], 'A forma é igual para todos: I worked, she worked, they worked.')],
    sp2: [tab('Irregulares mais usados', ['Base', 'Passado', 'Tradução'], [
      ['go', '**went**', 'ir'], ['have', '**had**', 'ter'], ['do', '**did**', 'fazer'], ['make', '**made**', 'fazer, criar'],
      ['get', '**got**', 'conseguir, pegar'], ['see', '**saw**', 'ver'], ['come', '**came**', 'vir'], ['take', '**took**', 'pegar, levar'],
      ['eat', '**ate**', 'comer'], ['buy', '**bought**', 'comprar'], ['say', '**said**', 'dizer'], ['be', '**was / were**', 'ser, estar'],
    ])],
    sp3: [tab('Passado — negativa e pergunta', ['', 'Forma', 'Exemplo'], [
      ['Afirmativa', 'verbo no passado', 'She **went** home.'], ['Negativa', "didn't + verbo base", "She **didn't go** home."],
      ['Pergunta', 'Did + pessoa + verbo base?', '**Did** she **go** home?'], ['Resposta curta', 'Yes, … did / No, … didn\'t', "Yes, she did. / No, she didn't."],
    ], 'O did já mostra o passado: o verbo volta à forma base (didn\'t went ✗ → didn\'t go ✓).')],

    // ═════════════ A2
    pcn1: [tab('Past Continuous = was/were + -ing', ['Pessoa', 'To be no passado', 'Exemplo'], [
      ['I / he / she / it', '**was**', 'I was sleeping.'], ['you / we / they', '**were**', 'They were working.'],
    ]), tab('When x while', ['Palavra', 'Usa com', 'Exemplo'], [
      ['**while**', 'a ação longa (-ing)', 'While I was cooking, …'], ['**when**', 'a ação curta (passado simples)', '… when the phone rang.'],
    ])],
    fu1: [tab('Will', ['', 'Forma', 'Exemplo'], [
      ['Afirmativa', 'will + verbo', 'I **will** help. (I\'ll)'], ['Negativa', "won't + verbo", "It **won't** rain."], ['Pergunta', 'Will + pessoa + verbo?', '**Will** you come?'],
    ], 'Use para decisões na hora, promessas, ofertas e previsões (opinião).')],
    fu2: [tab('Os três futuros', ['Forma', 'Uso', 'Exemplo'], [
      ['**will** + verbo', 'decisão agora, promessa, opinião', "I'll call you later."],
      ['**am/is/are going to** + verbo', 'plano já decidido, evidência', "I'm going to travel. Look, it's going to rain!"],
      ['**present continuous**', 'compromisso marcado', "I'm meeting Ana at 6."],
    ])],
    vu1: [tab('Make x Do', ['MAKE (criar, produzir)', 'DO (tarefas, atividades)'], [
      ['make a cake', 'do homework'], ['make a decision', 'do the dishes'], ['make a mistake', 'do exercise'],
      ['make money', 'do your best'], ['make a call', 'do business'], ['make friends', 'do a favor'],
    ])],
    vu2: [tab('Get, take, have', ['Verbo', 'Sentidos', 'Exemplos'], [
      ['**get**', 'receber, conseguir, ficar, chegar', 'get an email · get tired · get home'],
      ['**take**', 'pegar, levar, demorar', 'take a bus · take a photo · it takes 2 hours'],
      ['**have**', 'ter, comer/beber, fazer', 'have lunch · have a shower · have fun'],
    ])],
    aa1: [tab('Adjetivo x advérbio', ['', 'Adjetivo (descreve coisa/pessoa)', 'Advérbio (descreve a ação)'], [
      ['Regra', 'antes do substantivo / depois do to be', 'adjetivo + **ly**'], ['quick', 'a quick car', 'drive quick**ly**'],
      ['careful', 'a careful driver', 'drive careful**ly**'], ['easy', 'an easy test', 'pass eas**ily**'],
      ['good', 'a good singer', 'sing **well**'], ['fast / hard', 'a fast car', 'run **fast** · work **hard**'],
    ], 'O adjetivo nunca vai para o plural: two big houses (não "bigs").')],
    gr1: [tab('Comparativo', ['Adjetivo', 'Regra', 'Exemplo'], [
      ['1 sílaba', '+ **er** + than', 'cheap → cheap**er** than'], ['termina em -y', 'y → **ier**', 'easy → eas**ier** than'],
      ['consoante-vogal-consoante', 'dobra + er', 'big → bi**gg**er'], ['2+ sílabas', '**more** + adj. + than', '**more** expensive than'],
      ['irregular', '—', 'good → **better**, bad → **worse**, far → **further**'],
    ]), tab('Igualdade e inferioridade', ['Forma', 'Exemplo'], [
      ['**as** + adj. + **as** (tão … quanto)', 'as tall as my brother'], ['**not as** + adj. + **as**', 'not as cold as yesterday'], ['**less** + adj. + than', 'less expensive than'],
    ])],
    gr2: [tab('Superlativo', ['Adjetivo', 'Comparativo', 'Superlativo'], [
      ['cheap', 'cheaper', '**the cheapest**'], ['easy', 'easier', '**the easiest**'], ['big', 'bigger', '**the biggest**'],
      ['expensive', 'more expensive', '**the most expensive**'], ['good', 'better', '**the best**'], ['bad', 'worse', '**the worst**'],
    ], 'O superlativo sempre leva the: the best, the most beautiful.')],
    ct1: [tab('Quantidades', ['', 'Contável (dá para contar)', 'Incontável'], [
      ['Exemplos', 'apples, people, books', 'water, money, time, information'], ['Muito (pergunta/negativa)', '**many**', '**much**'],
      ['Muito (afirmativa)', '**a lot of**', '**a lot of**'], ['Pouco (mas algum)', '**a few**', '**a little**'],
      ['Quanto(s)?', '**How many** apples?', '**How much** water?'],
    ]), tab('Some x any', ['Palavra', 'Uso', 'Exemplo'], [
      ['**some**', 'afirmativa e oferta', 'I have some money. Would you like some tea?'], ['**any**', 'negativa e pergunta', "I don't have any money. Do you have any?"],
    ])],
    md1: [tab('Conselho e obrigação', ['Modal', 'Força', 'Exemplo'], [
      ['**should**', 'conselho (deveria)', 'You should rest.'], ['**must**', 'obrigação forte / regra pessoal', 'You must wear a seatbelt.'],
      ['**have to**', 'obrigação externa (tem que)', 'I have to work tomorrow.'], ["**mustn't**", 'proibição (não pode)', "You mustn't smoke here."],
      ["**don't have to**", 'não é necessário', "You don't have to come."],
    ], "Cuidado: mustn't = proibido; don't have to = não precisa.")],
    md2: [tab('Possibilidade e permissão', ['Modal', 'Significado', 'Exemplo'], [
      ['**may**', 'talvez (formal) / permissão formal', 'It may rain. May I come in?'], ['**might**', 'talvez (menos certeza)', 'I might go.'],
      ['**could**', 'poderia / talvez / pedido educado', 'Could you help me?'], ['**can**', 'pode (permissão informal)', 'Can I sit here?'],
    ], 'Todos os modais: sem -s, sem to, verbo na forma base.')],
    pp1: [tab('Present Perfect — experiências', ['', 'Forma', 'Exemplo'], [
      ['I / you / we / they', '**have** + particípio', "I've been to Chile."], ['he / she / it', '**has** + particípio', "She's seen that movie."],
      ['Negativa', "haven't / hasn't", "I haven't tried it."], ['Pergunta', 'Have/Has + pessoa + particípio?', 'Have you ever been to Japan?'],
    ]), tab('Particípios comuns', ['Base', 'Passado', 'Particípio'], [
      ['be', 'was/were', '**been**'], ['go', 'went', '**gone**'], ['see', 'saw', '**seen**'], ['eat', 'ate', '**eaten**'], ['do', 'did', '**done**'], ['work', 'worked', '**worked**'],
    ])],
    ei1: [tab('-ed x -ing', ['-ed: como a pessoa se sente', '-ing: o que causa o sentimento'], [
      ['I am **bored**. (entediado)', 'The movie is **boring**. (entediante)'], ['She is **interested**.', 'The book is **interesting**.'],
      ["I'm **tired**.", 'The trip was **tiring**.'], ["We're **excited**.", 'The news is **exciting**.'],
    ])],
    ig1: [tab('Verbo + to ou + -ing', ['Verbo + to + verbo', 'Verbo + -ing'], [
      ['want **to** go', 'enjoy go**ing**'], ['need **to** study', 'finish study**ing**'], ['decide **to** buy', 'avoid buy**ing**'],
      ['hope **to** see', 'mind wait**ing**'], ['plan **to** travel', 'keep try**ing**'], ['would like **to** try', 'like / love / hate (os dois)'],
    ], 'Depois de preposição, sempre -ing: good at cooking, before leaving.')],
    c11: [tab('First Conditional (possibilidade real)', ['Condição', 'Resultado'], [
      ['If + **presente**', '**will** + verbo'], ['If it **rains**,', "I'**ll stay** home."], ['If you **study**,', 'you **will pass**.'],
    ], 'Depois de if, nunca will: If it will rain ✗.')],

    // ═════════════ Leitura
    le1: [tab('Cognatos e falsos cognatos', ['Palavra', 'Parece…', 'Significa de verdade'], [
      ['actually', 'atualmente', '**na verdade**'], ['pretend', 'pretender', '**fingir**'], ['push', 'puxar', '**empurrar**'],
      ['library', 'livraria', '**biblioteca**'], ['realize', 'realizar', '**perceber**'], ['parents', 'parentes', '**pais**'],
      ['information, important, university', 'informação…', '**cognatos verdadeiros** (= português)'],
    ])],
    le2: [tab('Estratégias de leitura', ['Estratégia', 'Para quê', 'Como'], [
      ['**Skimming**', 'ideia geral', 'título, primeira frase de cada parágrafo, palavras repetidas'],
      ['**Scanning**', 'achar um dado', 'procure números, nomes, datas'],
      ['**Palavras-chave**', 'o assunto', 'substantivos que aparecem várias vezes'],
    ])],
    le3: [tab('Grupos nominais: leia de trás para frente', ['Inglês', 'Núcleo (último)', 'Português'], [
      ['city **train station**', 'station', 'estação de trem da cidade'], ['energy **prices**', 'prices', 'preços da energia'],
      ['new **car** factory', 'factory', 'nova fábrica de carros'], ['public health **system**', 'system', 'sistema de saúde pública'],
    ], 'O último substantivo é o principal; os anteriores descrevem.')],
    le4: [tab('Referência pronominal', ['Palavra', 'Se refere a', 'Exemplo'], [
      ['**it / its**', 'uma coisa (singular)', 'The app is new. **It** is free.'], ['**they / them / their**', 'várias coisas ou pessoas', 'Students… **They**…'],
      ['**this / that**', 'a ideia anterior', '… **This** shows that…'], ['**which**', 'coisa (que)', 'a law **which**…'], ['**who**', 'pessoa (que)', 'a doctor **who**…'],
    ])],
    le5: [tab('Prefixos e sufixos', ['Pedaço', 'Sentido', 'Exemplo'], [
      ['un-, in-, im-, dis-', 'não, contrário', 'unhappy, impossible, dislike'], ['re-', 'de novo', 'rewrite'], ['pre- / post-', 'antes / depois', 'pre-war, post-war'],
      ['-er / -or', 'quem faz', 'teacher, actor'], ['-tion / -ment / -ness', 'substantivo', 'education, payment, happiness'],
      ['-ful / -less', 'cheio de / sem', 'useful, useless'], ['-ly', 'advérbio (-mente)', 'quickly'],
    ])],
    le6: [tab('Marcadores discursivos', ['Função', 'Palavras'], [
      ['Adição', 'and, also, moreover, in addition, furthermore'], ['Contraste', 'but, however, although, on the other hand'],
      ['Causa', 'because, since, due to'], ['Consequência', 'so, therefore, as a result, thus'],
      ['Exemplo', 'for example, for instance, such as'], ['Sequência', 'first, then, finally'], ['Conclusão', 'in conclusion, to sum up'],
    ])],

    // ═════════════ B1
    pp2: [tab('Present Perfect x Simple Past', ['', 'Present Perfect', 'Simple Past'], [
      ['Tempo', 'não terminado / até agora', 'terminado'], ['Palavras-guia', 'for, since, already, yet, just, ever, never', 'yesterday, last week, ago, in 2010'],
      ['Exemplo', "I've lived here **for** 5 years.", 'I lived there **in** 2010.'],
    ]), tab('For x since', ['Palavra', 'Usa com', 'Exemplos'], [
      ['**for**', 'período (quanto tempo)', 'for 2 years, for a week, for ages'], ['**since**', 'ponto inicial (desde quando)', 'since 2019, since Monday, since I was a kid'],
    ])],
    pp3: [tab('Present Perfect Continuous', ['Pessoa', 'Forma', 'Exemplo'], [
      ['I / you / we / they', '**have been** + -ing', "I've been waiting for an hour."], ['he / she / it', '**has been** + -ing', "It's been raining all day."],
    ], 'Foco na duração ou no efeito visível. Verbos de estado (know, like) ficam no present perfect simples.')],
    ppf1: [tab('Linha do tempo do Past Perfect', ['1º (antes)', '2º (depois)'], [
      ['the train **had left**', 'when I arrived'], ['she **had finished**', 'before the meeting'], ['I **had never seen** snow', 'before that trip'],
    ], 'Forma: had + particípio, igual para todas as pessoas (I\'d, she\'d…).')],
    ut1: [tab('Used to e parecidos', ['Forma', 'Significado', 'Exemplo'], [
      ['**used to** + verbo', 'costumava (não faz mais)', 'I used to smoke.'], ["**didn't use to**", 'não costumava', "I didn't use to like it."],
      ['**would** + verbo', 'hábito repetido no passado (ações)', 'We would play outside.'], ['**be used to** + -ing', 'estar acostumado', "I'm used to waking up early."],
      ['**get used to** + -ing', 'acostumar-se', "I'm getting used to it."],
    ])],
    md3: [tab('Grau de certeza (presente)', ['Certeza', 'Modal', 'Exemplo'], [
      ['~100% sim', '**must**', 'He must be tired.'], ['talvez', '**might / may / could**', 'She might be at home.'], ['~100% não', "**can't**", "That can't be true."],
    ], "Não use mustn't para deduzir: mustn't = proibição.")],
    c21: [tab('Second Conditional (imaginário)', ['Condição', 'Resultado'], [
      ['If + **passado**', '**would** + verbo'], ['If I **had** money,', 'I **would travel**.'], ['If I **were** you,', 'I **would accept**.'],
    ], 'Com to be use were para todos. Depois de if, nunca would.'),
    tab('Os condicionais lado a lado', ['Tipo', 'If…', 'Resultado', 'Situação'], [
      ['Zero', 'presente', 'presente', 'sempre verdade'], ['First', 'presente', 'will', 'possível'], ['Second', 'passado', 'would', 'imaginário'], ['Third', 'had + particípio', 'would have + particípio', 'passado que não aconteceu'],
    ])],
    pv1: [tab('Voz passiva em cada tempo', ['Tempo', 'Forma', 'Exemplo'], [
      ['Presente', 'is / are + particípio', 'English **is spoken** here.'], ['Passado', 'was / were + particípio', 'It **was built** in 1920.'],
      ['Present perfect', 'has / have been + particípio', 'It **has been sold**.'], ['Futuro', 'will be + particípio', 'It **will be sent**.'],
      ['Contínuo', 'is being + particípio', 'It **is being repaired**.'], ['Modal', 'can / must be + particípio', 'It **must be done**.'],
    ], 'Quem fez, se for importante, vem depois de by.')],
    rs1: [tab('Reported Speech: o tempo "volta" um passo', ['Ele disse (direto)', 'Ele disse que… (indireto)'], [
      ['"I **am** tired."', 'He said he **was** tired.'], ['"I **work** here."', 'He said he **worked** there.'], ['"I **will** help."', 'He said he **would** help.'],
      ['"I **can** come."', 'He said he **could** come.'], ['"I **did** it." / "I **have done** it."', 'He said he **had done** it.'],
    ]), tab('Say x tell', ['Verbo', 'Estrutura', 'Exemplo'], [
      ['**say**', 'say (that) …', 'She said (that) she was busy.'], ['**tell**', 'tell + pessoa + (that)…', 'She told **me** she was busy.'], ['**tell**', 'tell + pessoa + to + verbo', 'She told me **to wait**.'],
    ])],
    rc1: [tab('Pronomes relativos', ['Palavra', 'Para', 'Exemplo'], [
      ['**who**', 'pessoas', 'the man **who** called'], ['**which**', 'coisas', 'the book **which** I read'], ['**that**', 'pessoas ou coisas (sem vírgula)', 'the car **that** I bought'],
      ['**where**', 'lugares', 'the city **where** I live'], ['**whose**', 'posse (cujo)', 'the girl **whose** dog…'], ['**when**', 'tempo', 'the day **when** we met'],
    ])],
    ph1: [tab('Phrasal verbs essenciais', ['Phrasal verb', 'Significado', 'Exemplo'], [
      ['give up', 'desistir', "Don't give up."], ['look for', 'procurar', "I'm looking for my keys."], ['look after', 'cuidar de', 'She looks after her mom.'],
      ['find out', 'descobrir', 'I found out the truth.'], ['turn on / off', 'ligar / desligar', 'Turn it off.'], ['pick up', 'buscar, pegar', "I'll pick you up."],
      ['run out of', 'ficar sem', 'We ran out of milk.'], ['put off', 'adiar', 'They put off the meeting.'], ['get along with', 'se dar bem com', 'I get along with him.'],
    ])],
    qt1: [tab('Question tags', ['Frase', 'Tag'], [
      ["It's hot,", "**isn't it?**"], ["You aren't busy,", '**are you?**'], ['You like jazz,', "**don't you?**"], ['She works here,', "**doesn't she?**"],
      ['He went home,', "**didn't he?**"], ['They can swim,', "**can't they?**"], ["You've finished,", "**haven't you?**"], ["I'm late,", "**aren't I?**"],
    ], 'Afirmativa → tag negativa. Negativa → tag positiva. Repita o auxiliar da frase.')],
    fc1: [tab('Futuros avançados', ['Tempo', 'Forma', 'Uso', 'Exemplo'], [
      ['Future continuous', '**will be** + -ing', 'em andamento num momento futuro', "At 8 I'll be having dinner."],
      ['Future perfect', '**will have** + particípio', 'concluído até um prazo', "By Friday I'll have finished."],
    ])],

    // ═════════════ B2
    c31: [tab('Third e Mixed Conditional', ['Tipo', 'If…', 'Resultado', 'Exemplo'], [
      ['Third', 'had + particípio', 'would have + particípio', 'If I had studied, I would have passed.'],
      ['Mixed (passado → presente)', 'had + particípio', 'would + verbo', 'If I had taken the job, I would be rich now.'],
    ])],
    md4: [tab('Modais no passado (modal + have + particípio)', ['Forma', 'Significado', 'Exemplo'], [
      ['**should have**', 'deveria ter (não fez)', 'I should have called.'], ["**shouldn't have**", 'não deveria ter (fez)', "I shouldn't have eaten so much."],
      ['**could have**', 'poderia ter', 'We could have won.'], ['**must have**', 'deve ter (quase certeza)', 'She must have forgotten.'],
      ['**might have**', 'talvez tenha', 'He might have left.'], ["**can't have**", 'não pode ter', "He can't have stolen it."],
    ])],
    cs1: [tab('Causativo', ['Forma', 'Quem faz', 'Exemplo'], [
      ['I cut my hair.', 'eu mesmo', 'Cortei meu cabelo (sozinho).'], ['I **had** my hair **cut**.', 'outra pessoa', 'Cortei o cabelo (no salão).'],
      ['I **got** my phone **fixed**.', 'outra pessoa (informal)', 'Mandei consertar o celular.'],
    ], 'Ordem: have/get + objeto + particípio.')],
    ws1: [tab('Wish', ['Sobre', 'Forma', 'Exemplo'], [
      ['Presente', 'wish + **passado**', 'I wish I **had** more time.'], ['Passado (arrependimento)', 'wish + **had + particípio**', "I wish I **hadn't said** that."],
      ['Irritação com alguém', 'wish + **would**', 'I wish you **would** stop.'],
    ])],
    pc3: [tab('Orações reduzidas', ['Frase completa', 'Reduzida'], [
      ['Because she felt tired, she…', '**Feeling** tired, she…'], ['The house, which was built in 1900, …', '**Built** in 1900, the house…'],
      ['After he finished the work, he…', '**Having finished** the work, he…'], ['After I left, …', 'After **leaving**, …'],
    ], 'Só funciona quando o sujeito das duas partes é o mesmo.')],
    mk1: [tab('Conectores avançados', ['Conector', 'Depois vem', 'Exemplo'], [
      ['although / even though', 'frase (sujeito + verbo)', 'Although it rained, we went.'], ['despite / in spite of', 'substantivo ou -ing', 'Despite the rain / Despite being tired'],
      ['whereas / while', 'frase (comparação)', 'I like tea, whereas she likes coffee.'], ['unless', 'frase (a menos que)', "You won't pass unless you study."],
      ['provided that / as long as', 'frase (desde que)', 'You can go as long as you call.'], ['however / nevertheless', 'nova frase (no entanto)', '…. However, …'],
    ])],

    // ═════════════ C1
    iv1: [tab('Inversão', ['Normal', 'Com inversão (ênfase)'], [
      ['I have never seen…', '**Never have I** seen…'], ['We rarely see…', '**Rarely do we** see…'], ['She not only won…', '**Not only did she** win…'],
      ['If you need help…', '**Should you** need help…'], ['If I had known…', '**Had I** known…'],
    ])],
    cl1: [tab('Cleft sentences', ['Normal', 'Com ênfase'], [
      ['John called.', '**It was** John **who** called.'], ['I need a holiday.', '**What** I need **is** a holiday.'],
      ['We met in Paris.', '**It was** in Paris **that** we met.'], ['I just want sleep.', '**All** I want **is** to sleep.'],
    ])],
    sj1: [tab('Estruturas formais', ['Estrutura', 'Verbo depois', 'Exemplo'], [
      ['suggest / recommend / insist that', 'forma base (sem -s)', 'I suggest that he **go**.'], ['It is essential that', 'forma base', 'It is essential that she **be** on time.'],
      ["It's time", 'passado', "It's time we **left**."], ["I'd rather + pessoa", 'passado', "I'd rather you **stayed**."], ['as if / as though', 'passado', 'He acts as if he **were** the boss.'],
    ])],
    el1: [tab('Eu também / Eu também não', ['Frase', 'Eu também', 'Eu também não'], [
      ["I'm tired.", '**So am I.**', '—'], ['I love pizza.', '**So do I.**', '—'], ['I went.', '**So did I.**', '—'],
      ["I can't swim.", '—', '**Neither can I.**'], ["I don't smoke.", '—', '**Neither do I.**'], ["I haven't been there.", '—', '**Neither have I.**'],
    ], 'Use o mesmo auxiliar da frase. Informal: Me too / Me neither.')],
    nm1: [tab('Informal → formal', ['Informal', 'Formal'], [
      ['get', 'receive / obtain'], ['ask for', 'request'], ['help', 'assistance'], ['buy', 'purchase'], ['about', 'regarding'], ['Can you…?', 'I would appreciate it if you could…'], ['Thanks!', 'Kind regards'],
    ]), tab('Nominalização', ['Verbo', 'Substantivo'], [
      ['decide', '**decision**'], ['improve', '**improvement**'], ['reduce', '**reduction**'], ['analyze', '**analysis**'], ['implement', '**implementation**'],
    ])],
    rg1: [tab('Hedging — suavizar', ['Absoluto', 'Cauteloso'], [
      ['This is the best method.', 'This **may be** a more effective method.'], ['People work better in the morning.', 'People **tend to** work better in the morning.'],
      ['The drug works.', 'The results **suggest that** the drug **might** work.'], ['That is wrong.', "I'm **not sure** that's quite right."],
    ])],
  };

  // Liga as tabelas à primeira tela de explicação de cada lição.
  const lessons = new Map(C.levels.flatMap(lv => lv.modules.flatMap(m => m.lessons)).map(l => [l.id, l]));
  for (const [id, tables] of Object.entries(T)) {
    const les = lessons.get(id);
    if (!les) throw new Error('tabelas.js: lição desconhecida ' + id);
    const intro = les.steps.find(s => s.type === 'intro');
    if (!intro) throw new Error('tabelas.js: lição sem explicação ' + id);
    intro.tables = tables;
  }
})(window.CONTENT);
