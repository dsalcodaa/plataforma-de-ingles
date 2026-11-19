// Leitura — estratégias para entender textos reais (inglês instrumental). Combina com a aba Textos.
(function (X) {
  const { intro, demo, choose, read, order, type, fix, lesson, module } = X;

  X.level('Leitura', 'Estratégias de leitura', [
    // ───────────────────────── Inferência contextual
    module('inferencia', 'Inferência contextual', 'Cognatos e significado pelo contexto', [
      lesson('le1', 'Entender sem dicionário', 'Cognatos, falsos cognatos e contexto', ['important', 'information', 'actually', 'pretend', 'push', 'library', 'eventually', 'realize'], [
        intro('Você abre uma notícia em inglês e não conhece todas as palavras.', 'Inferência contextual',
          'Você não precisa saber todas as palavras. Use três pistas: palavras parecidas com o português (cognatos), o assunto do texto e as palavras ao redor.',
          [['Cognatos ajudam', 'The government/s | announced/v | important/c | changes./c']],
          ['Cognatos: important, information, problem, hospital, technology', 'Falsos cognatos: actually (na verdade), pretend (fingir), push (empurrar), library (biblioteca), eventually (finalmente), realize (perceber), parents (pais)', 'Estratégia: leia a frase inteira antes de travar numa palavra. Pergunte: é ação, coisa ou característica? É positivo ou negativo?']),
        read('noticias', 'The new hospital has modern equipment and offers free consultations to the population.', 'Quais palavras você reconhece por serem parecidas com o português?', ['hospital, modern, consultations, population', 'has, offers, free, the', 'new, and, to, the'], { 'has, offers, free, the': 'Essas não se parecem com o português. Cognatos: hospital, modern, consultations, population.', 'new, and, to, the': 'Essas são palavras gramaticais, não cognatos.' }),
        choose('estudos', '"Actually" significa:', ['na verdade', 'atualmente', 'atual', 'ativamente'], { atualmente: 'Falso cognato! Atualmente = currently, nowadays.', atual: 'Atual = current.', ativamente: 'Ativamente = actively.' }),
        choose('cidade', '"Push" na porta significa:', ['empurre', 'puxe', 'pare'], { puxe: 'Falso cognato! Puxe = pull.', pare: 'Pare = stop.' }),
        choose('estudos', '"I went to the library to borrow a book." Library é:', ['biblioteca', 'livraria', 'loja de discos'], { livraria: 'Falso cognato! Livraria = bookstore. "Borrow" (pegar emprestado) confirma: biblioteca.', 'loja de discos': 'O contexto (borrow a book) indica biblioteca.' }),
        read('saude', 'After running for two hours, Mark was exhausted. He sat on the floor and couldn\'t move.', 'Pelo contexto, "exhausted" significa:', ['muito cansado', 'muito feliz', 'com fome'], { 'muito feliz': 'Correu duas horas e não conseguia se mexer: cansado.', 'com fome': 'O contexto (não conseguia se mexer) indica cansaço.' }),
        read('noticias', 'The storm damaged hundreds of houses. Many families lost their roofs and furniture.', 'Pelo contexto, "damaged" significa:', ['danificou', 'construiu', 'visitou'], { construiu: 'Famílias perderam telhados: o sentido é negativo, danificou.', visitou: 'O contexto é de destruição: danificou.' }),
        read('trabalho', 'At first, she didn\'t like the job. Eventually, after a few months, she started to enjoy it.', '"Eventually" aqui significa:', ['finalmente, com o tempo', 'eventualmente, às vezes', 'nunca'], { 'eventualmente, às vezes': 'Falso cognato! Eventually = no fim, com o tempo. "Às vezes" = sometimes.', nunca: 'Ela começou a gostar: com o tempo.' }),
        read('ciencia', 'Scientists realized that the results were wrong, so they repeated the experiment.', '"Realized" significa:', ['perceberam', 'realizaram', 'esqueceram'], { realizaram: 'Falso cognato! Realize = perceber. Realizar = carry out.', esqueceram: 'Eles repetiram o experimento porque perceberam o erro.' }),
        type('estudos', 'Falso cognato: "My parents live in Recife."', 'Escreva em português o que significa "parents".', 'pais', ['^(os )?(meus )?pais$'], [['parentes', 'Falso cognato! Parents = pais. Parentes = relatives.']], 'parents = pais (pai e mãe).', { stage: 3 }),
      ]),
    ]),

    // ───────────────────────── Palavras-chave e repetidas
    module('palavras-chave', 'Palavras-chave e repetidas', 'Achar o assunto e a informação', [
      lesson('le2', 'Do que fala o texto?', 'Palavras-chave, repetidas, skimming e scanning', ['skimming', 'scanning', 'keyword', 'title', 'main idea'], [
        intro('Você precisa descobrir rápido do que trata um artigo.', 'Palavras-chave e palavras repetidas',
          'As palavras que se repetem e as palavras importantes (substantivos, números, nomes) mostram o assunto. Você não precisa ler tudo palavra por palavra.',
          [],
          ['Skimming: passe os olhos no título, no começo de cada parágrafo e nas palavras repetidas para pegar a ideia geral', 'Scanning: procure só uma informação específica (data, número, nome), sem ler o resto', 'Palavras repetidas e seus sinônimos (car, vehicle, automobile) indicam o tema central']),
        read('tecnologia', 'Electric cars are becoming popular. Electric cars are cheaper to maintain, and many cities now offer free charging for electric vehicles.', 'Qual é o assunto do texto? (pelas palavras repetidas)', ['carros elétricos', 'cidades', 'manutenção de casas'], { cidades: '"cities" aparece uma vez; "electric cars/vehicles" se repete.', 'manutenção de casas': 'O texto não fala de casas.' }),
        read('noticias', 'The festival will take place on June 15th in Central Park. Tickets cost $20 and are available online.', 'Scanning: quanto custa o ingresso?', ['20 dólares', '15 dólares', 'É grátis'], { '15 dólares': '15 é o dia (June 15th). Preço: $20.', 'É grátis': 'O texto diz $20.' }),
        read('noticias', 'The festival will take place on June 15th in Central Park. Tickets cost $20 and are available online.', 'Scanning: onde será o festival?', ['no Central Park', 'online', 'em junho'], { online: 'Online é onde se compram os ingressos.', 'em junho': 'Isso é quando, não onde.' }),
        read('saude', 'Sleep is essential for health. People who sleep less than six hours have more problems with memory. Doctors recommend seven to nine hours of sleep.', 'Qual palavra-chave se repete e indica o tema?', ['sleep', 'doctors', 'memory'], { doctors: 'Aparece uma vez. "Sleep" aparece três vezes.', memory: 'É um detalhe. O tema é sleep.' }),
        read('saude', 'Sleep is essential for health. People who sleep less than six hours have more problems with memory. Doctors recommend seven to nine hours of sleep.', 'Quantas horas os médicos recomendam?', ['7 a 9 horas', 'menos de 6 horas', '6 horas'], { 'menos de 6 horas': 'Isso é o que causa problemas.', '6 horas': 'A recomendação é seven to nine.' }),
        read('ciencia', 'Bees are disappearing. Without bees, many plants cannot reproduce, and food production could fall dramatically.', 'Qual é a ideia principal?', ['O sumiço das abelhas ameaça a produção de alimentos.', 'As abelhas produzem muito mel.', 'As plantas não precisam de abelhas.'], { 'As abelhas produzem muito mel.': 'O texto não fala de mel.', 'As plantas não precisam de abelhas.': 'O texto diz o contrário.' }),
        choose('estudos', 'Para achar rapidamente uma data num texto longo, você faz:', ['scanning', 'skimming', 'tradução palavra por palavra'], { skimming: 'Skimming é para a ideia geral. Informação específica: scanning.', 'tradução palavra por palavra': 'É lento e desnecessário. Use scanning.' }),
        type('tecnologia', 'Smartphones changed how we communicate. Today, most people use smartphones to send messages, watch videos and pay bills.', 'Escreva em inglês a palavra-chave repetida.', 'smartphones', ['^smartphones?$'], [['^people$', '"people" aparece uma vez. A palavra repetida é smartphones.']], 'smartphones', { stage: 3, passage: 'Smartphones changed how we communicate. Today, most people use smartphones to send messages, watch videos and pay bills.' }),
      ]),
    ]),

    // ───────────────────────── Grupos nominais
    module('grupos-nominais', 'Grupos nominais', 'Ler da direita para a esquerda', [
      lesson('le3', 'Ler de trás para frente', 'Núcleo e modificadores', ['noun phrase', 'head', 'data center', 'climate change', 'public health system'], [
        intro('Você trava em expressões como "the new public health policy".', 'Grupos nominais (noun phrases)',
          'Em inglês, as palavras que descrevem vêm antes, e a palavra principal (núcleo) fica no final. Para traduzir, comece pelo fim.',
          [['Núcleo no fim', 'the new public health/c | policy/s']],
          ['the new public health policy = a nova política de saúde pública', 'climate change = mudança do clima (change é o núcleo)', 'a three-year research project = um projeto de pesquisa de três anos', 'Palavras com hífen funcionam como um adjetivo só: a well-known actor = um ator bem conhecido']),
        choose('ciencia', 'Em "climate change", qual é o núcleo?', ['change', 'climate'], { climate: 'O núcleo é a última palavra: change (mudança… do clima).' }),
        choose('noticias', '"A new government plan" significa:', ['um novo plano do governo', 'um novo governo planejado', 'um governo de novos planos'], { 'um novo governo planejado': 'O núcleo é plan (plano).', 'um governo de novos planos': 'Comece pelo fim: plano… do governo… novo.' }),
        choose('saude', '"The public health system" é:', ['o sistema de saúde pública', 'a saúde do sistema público', 'o público do sistema de saúde'], { 'a saúde do sistema público': 'Núcleo no fim: system.', 'o público do sistema de saúde': 'Núcleo no fim: system.' }),
        choose('tecnologia', '"Data center security" significa:', ['segurança de centros de dados', 'centro de dados de segurança', 'dados do centro de segurança'], { 'centro de dados de segurança': 'Núcleo: security (segurança).', 'dados do centro de segurança': 'Núcleo: security.' }),
        read('trabalho', 'The company launched a two-year employee training program.', '"A two-year employee training program" é:', ['um programa de treinamento de funcionários de dois anos', 'dois anos de funcionários em treinamento', 'um funcionário de dois anos no programa'], { 'dois anos de funcionários em treinamento': 'Núcleo: program.', 'um funcionário de dois anos no programa': 'Núcleo: program.' }),
        read('ciencia', 'Researchers found high levels of plastic pollution in ocean water samples.', '"Ocean water samples" significa:', ['amostras de água do oceano', 'oceano de amostras de água', 'água do oceano de amostra'], { 'oceano de amostras de água': 'Núcleo no fim: samples.', 'água do oceano de amostra': 'Núcleo: samples (amostras).' }),
        order('cidade', 'Monte em inglês: "estação de trem da cidade"', 'the city train station', ['of'], [['\\bof\\b', 'Grupo nominal não usa "of": os modificadores vêm antes do núcleo.']]),
        type('noticias', 'Traduza o grupo nominal: "energy prices"', 'Escreva em português.', 'preços de energia', ['^(os )?precos? (da|de) energia$'], [['^energia', 'Comece pelo núcleo (prices): preços de energia.']], 'Núcleo no fim: prices → preços de energia.', { stage: 3 }),
      ]),
    ]),

    // ───────────────────────── Referência pronominal
    module('referencia', 'Referência pronominal', 'A quem se refere it, they, this, which?', [
      lesson('le4', 'Quem é "it"?', 'it, they, this, which, who, them', ['it', 'they', 'them', 'this', 'these', 'which', 'who', 'its', 'their'], [
        intro('Num texto, você encontra "it" e não sabe a que ele se refere.', 'Referência pronominal',
          'Textos evitam repetir palavras usando pronomes. Para entender, volte no texto e encontre a palavra que o pronome substitui.',
          [['It retoma algo', 'The museum/s | reopened./v | It/s | was/v | closed/c | for two years./t']],
          ['it / its → uma coisa (singular) · they / them / their → várias coisas ou pessoas', 'this / that → uma ideia ou frase anterior inteira', 'who → pessoa · which → coisa · where → lugar', 'Dica: o pronome concorda em número com a palavra que ele retoma.']),
        read('noticias', 'The museum reopened yesterday. It was closed for two years.', 'Na segunda frase, "It" se refere a:', ['the museum', 'yesterday', 'two years'], { yesterday: '"It" retoma algo que estava fechado: o museu.', 'two years': '"two years" é plural e não estava fechado.' }),
        read('saude', 'Doctors say children need more exercise. They should play outside every day.', '"They" se refere a:', ['children', 'doctors', 'exercise'], { doctors: 'Quem deve brincar lá fora são as crianças.', exercise: '"exercise" é singular; "they" é plural.' }),
        read('tecnologia', 'The company fired 200 workers. This surprised the market.', '"This" se refere a:', ['a demissão de 200 funcionários', 'a empresa', 'o mercado'], { 'a empresa': '"This" retoma a ideia inteira: a demissão.', 'o mercado': 'O mercado foi surpreendido; "this" é o que surpreendeu.' }),
        read('ciencia', 'Bees produce honey, which is used in many medicines.', '"Which" se refere a:', ['honey', 'bees', 'medicines'], { bees: '"which" vem logo depois de honey e retoma honey.', medicines: 'É o mel que é usado em remédios.' }),
        read('trabalho', 'Maria hired two engineers who had worked in Germany. She trusts them completely.', '"Them" se refere a:', ['two engineers', 'Maria', 'Germany'], { Maria: '"She" é Maria; "them" (plural) são os engenheiros.', Germany: '"them" é plural e pessoas: os engenheiros.' }),
        read('cidade', 'The city built a new park. Its trees were brought from the Amazon.', '"Its" (de quem são as árvores) se refere a:', ['the park', 'the city', 'the Amazon'], { 'the city': 'As árvores são do parque, a coisa mais próxima e lógica.', 'the Amazon': 'As árvores vieram da Amazônia; pertencem ao parque.' }),
        choose('estudos', 'Qual pronome retoma uma pessoa?', ['who', 'which', 'where'], { which: '"which" retoma coisas.', where: '"where" retoma lugares.' }),
        type('noticias', 'Leia: "Brazil exports coffee. It is one of the largest producers in the world."', 'Escreva em inglês a palavra a que "It" se refere.', 'Brazil', ['^brazil$'], [['^coffee$', 'O café não é produtor. Quem é um dos maiores produtores: Brazil.']], 'It = Brazil.', { stage: 3, passage: 'Brazil exports coffee. It is one of the largest producers in the world.' }),
      ]),
    ]),

    // ───────────────────────── Afixos
    module('afixos', 'Prefixos e sufixos', 'Descobrir a palavra pela forma', [
      lesson('le5', 'Pedaços de palavras', 'Prefixos, sufixos e terminações -ed/-ing no texto', ['un-', 're-', 'dis-', '-tion', '-ness', '-ly', '-er', '-ful', '-less', '-ed', '-ing'], [
        intro('Você encontra "unbelievable" e "carelessness" num texto.', 'Prefixos e sufixos',
          'Muitas palavras são feitas de uma base mais pedaços. Reconhecer os pedaços mostra o sentido e a classe da palavra.',
          [],
          ['Prefixos: un-, in-, dis- (negação: unhappy, impossible, dislike) · re- (de novo: rewrite) · pre- (antes) · over- (demais)', 'Sufixos de substantivo: -tion, -ment, -ness, -ity, -er/-or (quem faz: teacher)', 'Sufixos de adjetivo: -ful (cheio de), -less (sem), -able (que pode), -ous · Advérbio: -ly', '-ed no texto: passado (they worked), particípio/passiva (was built) ou adjetivo (bored)', '-ing no texto: ação em andamento (is growing), substantivo (Smoking is bad) ou adjetivo (boring)']),
        choose('estudos', '"Unhappy" significa:', ['infeliz', 'muito feliz', 'feliz de novo'], { 'muito feliz': 'un- nega: infeliz.', 'feliz de novo': 'un- nega; re- é "de novo".' }),
        choose('trabalho', '"Rewrite the report" significa:', ['reescrever o relatório', 'não escrever o relatório', 'escrever muito'], { 'não escrever o relatório': 're- = de novo.', 'escrever muito': 're- = de novo.' }),
        choose('saude', '"A careless driver" é um motorista:', ['descuidado', 'cuidadoso', 'que dirige muito'], { cuidadoso: '-less = sem: sem cuidado.', 'que dirige muito': '-less = sem.' }),
        choose('trabalho', 'Em "The manager signed the agreement", "agreement" é:', ['substantivo (acordo)', 'verbo (concordar)', 'advérbio'], { 'verbo (concordar)': 'agree é o verbo; -ment forma substantivo.', advérbio: '-ment forma substantivo.' }),
        read('noticias', 'The bridge was built in 1920 and is still used by thousands of drivers every day.', 'Em "was built", o -t/-ed indica:', ['voz passiva (foi construída)', 'ação acontecendo agora', 'um adjetivo de sentimento'], { 'ação acontecendo agora': 'was + particípio = passiva no passado.', 'um adjetivo de sentimento': 'Aqui é passiva: foi construída.' }),
        read('saude', 'Smoking is one of the main causes of cancer.', 'Em "Smoking is…", a forma -ing funciona como:', ['substantivo (o ato de fumar)', 'ação em andamento', 'adjetivo'], { 'ação em andamento': 'Não há am/is/are antes: é o sujeito da frase.', adjetivo: 'É o sujeito: o ato de fumar.' }),
        read('ciencia', 'The population of the city is growing quickly.', 'Em "is growing", a forma -ing indica:', ['ação em andamento', 'substantivo', 'passado'], { substantivo: 'is + -ing = contínuo.', passado: 'is + -ing = presente contínuo.' }),
        type('estudos', 'kind (gentil) + -ness', 'Escreva a palavra formada (em inglês).', 'kindness', ['^kindness$'], [['^kindly$', '-ly forma advérbio. Com -ness: kindness (gentileza).']], 'kindness = gentileza.', { stage: 3 }),
      ]),
    ]),

    // ───────────────────────── Marcadores discursivos
    module('marcadores', 'Marcadores discursivos', 'however, therefore, moreover…', [
      lesson('le6', 'O caminho do texto', 'Conectores que organizam o texto', ['however', 'therefore', 'moreover', 'in addition', 'although', 'for example', 'on the other hand', 'as a result', 'finally', 'in conclusion'], [
        intro('Você lê um artigo de opinião e quer seguir o raciocínio do autor.', 'Marcadores discursivos',
          'São palavras que mostram a relação entre as ideias: contraste, adição, causa, consequência, exemplo, conclusão. Eles são o mapa do texto.',
          [['Contraste', 'The plan/s | is/v | cheap./c | However,/c | it/s | is/v | risky./c']],
          ['Contraste: however, but, although, on the other hand, nevertheless', 'Adição: moreover, in addition, also, furthermore', 'Consequência: therefore, so, as a result, consequently', 'Exemplo: for example, for instance, such as · Conclusão: in conclusion, finally, to sum up']),
        demo(['noticias', 'Prices/s | went up./v | As a result,/c | sales/s | fell./v', 'Os preços subiram. Como resultado, as vendas caíram.'], ['saude', 'Exercise/s | improves/v | your mood./c | Moreover,/c | it/s | helps/v | you/c | sleep./c', 'O exercício melhora o humor. Além disso, ajuda a dormir.']),
        read('noticias', 'The new law will reduce pollution. However, it will increase the price of gas.', '"However" indica:', ['contraste', 'adição', 'exemplo'], { adição: 'As ideias se opõem (bom x ruim): contraste.', exemplo: 'Não é exemplo: contraste.' }),
        read('trabalho', 'The project was delayed. Therefore, the company lost the contract.', '"Therefore" indica:', ['consequência', 'contraste', 'tempo'], { contraste: 'Perder o contrato é resultado do atraso: consequência.', tempo: 'Indica consequência (portanto).' }),
        read('saude', 'Walking is good for the heart. Moreover, it reduces stress.', '"Moreover" indica:', ['adição de um argumento', 'contraste', 'conclusão'], { contraste: 'Os dois argumentos são positivos: adição.', conclusão: 'Moreover = além disso.' }),
        read('tecnologia', 'Some apps, such as WhatsApp and Telegram, use encryption.', '"Such as" introduz:', ['exemplos', 'uma conclusão', 'um contraste'], { 'uma conclusão': 'Such as = como, por exemplo.', 'um contraste': 'Such as = como, por exemplo.' }),
        read('noticias', 'Although the team played well, they lost the game.', 'Qual a relação entre as duas partes?', ['contraste (embora…)', 'causa', 'adição'], { causa: 'Jogaram bem MAS perderam: contraste.', adição: 'Ideias opostas: contraste.' }),
        choose('estudos', 'Complete: The hotel was expensive. ___, the service was excellent.', ['On the other hand', 'Therefore', 'For example'], { Therefore: 'Caro x excelente = contraste.', 'For example': 'Não é exemplo; é contraste.' }),
        choose('trabalho', 'Complete: Sales grew 30%. ___, we hired ten new people.', ['As a result', 'However', 'Although'], { However: 'Contratar é consequência do crescimento.', Although: 'Consequência: As a result.' }),
        type('estudos', 'O texto apresenta um argumento a favor e depois um contra.', 'Escreva em inglês um marcador de contraste para ligar as ideias.', 'However', ['^(however|but|nevertheless|on the other hand|although|nonetheless|yet)$'], [['^(therefore|moreover|so)$', 'Esse não é de contraste. Ex.: however.']], 'However / On the other hand / Nevertheless.', { stage: 3 }),
      ]),
    ]),
  ]);
})(window.CX);
