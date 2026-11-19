// B2 — Fluência estrutural: hipóteses no passado, arrependimento, causativo, desejos, orações reduzidas, conectores avançados.
(function (X) {
  const { intro, demo, build, choose, read, order, type, transform, fix, dialog, lesson, module } = X;

  X.level('B2', 'Fluência estrutural', [
    // ───────────────────────── Third e Mixed Conditionals
    module('third-conditional', 'Third e Mixed Conditionals', 'Se eu tivesse feito…', [
      lesson('c31', 'Se eu tivesse estudado', 'If + had done, would have done', ['would have', 'could have', 'if I had known', 'mixed conditional'], [
        intro('Você pensa em como as coisas teriam sido diferentes.', 'Third Conditional',
          'Para imaginar um passado diferente do que aconteceu: if + past perfect, would have + particípio.',
          [['Passado imaginário', 'If/c | I/s | had/a | studied,/v | I/s | would/a | have/a | passed./v']],
          ['If I had known, I would have helped. (eu não sabia, então não ajudei)', 'could have / might have no resultado: If we had left earlier, we could have caught the train.', 'Mixed: passado → presente: If I had taken that job, I would be rich now.', 'Contração na fala: I\'d have / I would\'ve.']),
        demo(['estudos', 'If/c | she/s | had/a | studied,/v | she/s | would/a | have/a | passed./v', 'Se ela tivesse estudado, teria passado.'], ['viagem', 'If/c | we/s | had/a | left/v | earlier,/t | we/s | would/a | have/a | caught/v | the flight./c', 'Se tivéssemos saído mais cedo, teríamos pegado o voo.'],
          ['amigos', 'If/c | you/s | had/a | told/v | me,/c | I/s | could/a | have/a | helped./v', 'Se você tivesse me contado, eu poderia ter ajudado.'], ['trabalho', 'If/c | I/s | had/a | accepted/v | that job,/c | I/s | would/a | live/v | in London/c | now./t', 'Se eu tivesse aceitado aquele emprego, moraria em Londres agora.']),
        build('estudos', 'Why did you fail the test?', 'Diga: se eu tivesse estudado, teria passado.', 'Se eu tivesse estudado, teria passado.', [
          ['Condição', 'c', ['If I had studied,', 'If I studied,', 'If I would have studied,'], { 'If I studied,': 'Passado imaginário: had studied.', 'If I would have studied,': 'Sem would depois de if.' }],
          ['Quem?', 's', ['I', 'I will'], { 'I will': 'Resultado imaginário: would have.' }],
          ['Resultado', 'a', ['would have', 'would', 'will have'], { would: 'Passado: would have.', 'will have': 'Imaginário: would have.' }],
          ['Particípio', 'v', ['passed.', 'pass.', 'passing.'], { 'pass.': 'Depois de would have: particípio.', 'passing.': 'Particípio: passed.' }],
        ]),
        choose('viagem', 'Complete: If it hadn\'t rained, we ___ to the beach.', ['would have gone', 'would go', 'had gone', 'will go'], { 'would go': 'Passado: would have gone.', 'had gone': 'No resultado: would have gone.', 'will go': 'Passado imaginário: would have gone.' }),
        choose('trabalho', 'Complete: If I ___ about the meeting, I would have come.', ['had known', 'knew', 'would have known', 'have known'], { knew: 'Passado imaginário: had known.', 'would have known': 'Sem would depois de if.', 'have known': 'had known.' }),
        choose('amigos', 'Mixed: If I had saved money, I ___ a car now.', ['would have', 'would have had', 'will have'], { 'would have had': '"now" → resultado no presente: would have.', 'will have': 'Imaginário: would have.' }),
        transform('saude', 'I didn\'t wear a coat, so I got sick.', 'Reescreva com third conditional.', "If I had worn a coat, I wouldn't have gotten sick.", ['^if i had worn a coat i would not have (gotten|got) sick$', '^i would not have (gotten|got) sick if i had worn a coat$'], [['if i would have', 'Sem would depois de if.'], ['had wore', 'Particípio: worn.']], "If I had worn a coat, I wouldn't have gotten sick."),
        fix('estudos', 'If I would have known, I would have told you.', 'If I had known, I would have told you.', [['if i would have', 'Depois de if: had known.']]),
        type('amigos', 'What would you have done differently in your life?', 'Responda com "If I had…, I would have…".', 'If I had studied more, I would have become a doctor.', ['^if i had [a-z]+( [a-z0-9 ]+)? i would have [a-z]+( [a-z0-9 ]+)?$', '^i would have [a-z]+( [a-z0-9 ]+)? if i had [a-z]+( [a-z0-9 ]+)?$'], [['if i would', 'Sem would depois de if.']], 'If I had + particípio, I would have + particípio.', { stage: 3 }),
        dialog('viagem', 'Viagem frustrada', ['bot', 'Did you get to see the Northern Lights?', 'Conseguiu ver a aurora boreal?'],
          ['me', ["No. If we had stayed one more day, we would have seen them.", 'No. If we stayed one more day, we would see them.', 'No. If we would have stayed, we saw them.'], { 'No. If we stayed one more day, we would see them.': 'Passado: had stayed / would have seen.', 'No. If we would have stayed, we saw them.': 'If we had stayed, we would have seen.' }],
          ['bot', 'What a shame!', 'Que pena!'],
          ['me', ["Yes. If I had known, I would have changed the flight.", 'Yes. If I knew, I changed the flight.', 'Yes. If I had know, I would changed.'], { 'Yes. If I knew, I changed the flight.': 'If I had known, I would have changed.', 'Yes. If I had know, I would changed.': 'had known / would have changed.' }],
          ['bot', 'Next time!', 'Na próxima!']),
      ]),
    ]),

    // ───────────────────────── Modais no passado
    module('modais-passado', 'Verbos modais no passado', 'should have, could have, must have', [
      lesson('md4', 'Eu deveria ter ido', 'Modal + have + particípio', ['should have', "shouldn't have", 'could have', 'must have', "can't have", 'might have'], [
        intro('Você se arrepende de uma decisão e faz suposições sobre o passado.', 'Modais no passado',
          'Modal + have + particípio fala do passado: arrependimento, crítica, possibilidade e dedução.',
          [['Arrependimento', 'I/s | should/a | have/a | called/v | her./c'], ['Dedução', 'He/s | must/a | have/a | forgotten./v']],
          ['should have = deveria ter (não fez) · shouldn\'t have = não deveria ter (fez)', 'could have = poderia ter (era possível e não aconteceu)', 'must have = deve ter (quase certeza) · can\'t have = não pode ter', 'might have = talvez tenha · Na fala: should\'ve, could\'ve, must\'ve.']),
        demo(['trabalho', 'You/s | should/a | have/a | told/v | me/c | earlier./t', 'Você deveria ter me contado antes.'], ['amigos', 'She/s | must/a | have/a | missed/v | the bus./c', 'Ela deve ter perdido o ônibus.'],
          ['saude', 'I/s | shouldn\'t/a | have/a | eaten/v | so much./c', 'Eu não deveria ter comido tanto.'], ['viagem', 'We/s | could/a | have/a | taken/v | a taxi./c', 'Poderíamos ter pegado um táxi.']),
        choose('saude', 'Arrependimento: "I feel sick. I ___ eaten that fish."', ["shouldn't have", "mustn't have", "couldn't have"], { "mustn't have": 'Arrependimento: shouldn\'t have.', "couldn't have": 'Arrependimento: shouldn\'t have.' }),
        choose('amigos', 'Dedução: "The ground is wet. It ___ rained."', ['must have', 'should have', "can't have"], { 'should have': 'Dedução: must have.', "can't have": 'Chão molhado: deve ter chovido (must have).' }),
        choose('trabalho', 'Dedução negativa: "He ___ stolen the money. He was with me all day."', ["can't have", 'must have', "shouldn't have"], { 'must have': 'Estava comigo: impossível. can\'t have.', "shouldn't have": 'Dedução: can\'t have.' }),
        transform('estudos', 'It was a mistake not to study.', 'Diga que você deveria ter estudado.', 'I should have studied.', ['^i should have studied( more| harder)?$'], [['should studied', 'should + have + particípio.'], ['should have study\\b', 'Particípio: studied.']], 'I should have studied.'),
        fix('viagem', 'We should have took the earlier train.', 'We should have taken the earlier train.', [['have took', 'Particípio de take: taken.']]),
        type('amigos', 'Your friend forgot your birthday. What do you think happened?', 'Deduza com "must have" ou "might have".', 'He must have been busy.', ['^(he|she) (must|might|may|could) have [a-z]+( [a-z0-9 ]+)?$'], [['must (be|forgot|forget)\\b', 'Passado: must have + particípio.']], 'He must have + particípio.', { stage: 3 }),
        dialog('trabalho', 'Prazo perdido', ['bot', 'The client is angry. We missed the deadline.', 'O cliente está bravo. Perdemos o prazo.'],
          ['me', ['We should have asked for more time.', 'We should asked for more time.', 'We must have ask for more time.'], { 'We should asked for more time.': 'should have asked.', 'We must have ask for more time.': 'Arrependimento: should have asked.' }],
          ['bot', 'And where is Mark? He didn\'t come.', 'E o Mark? Ele não veio.'],
          ['me', ["He might have gotten stuck in traffic.", 'He might got stuck in traffic.', 'He can have gotten stuck.'], { 'He might got stuck in traffic.': 'might have gotten.', 'He can have gotten stuck.': 'Possibilidade no passado: might have.' }],
          ['bot', 'Let\'s call him.', 'Vamos ligar para ele.']),
      ]),
    ]),

    // ───────────────────────── Causativo e passiva avançada
    module('causativo', 'Causativo e passiva avançada', 'have something done', [
      lesson('cs1', 'Mandei cortar o cabelo', 'have/get something done e passivas com modais', ['have it done', 'get it fixed', 'had my hair cut', 'is said to', 'needs to be done'], [
        intro('Você conta que um profissional fez um serviço para você.', 'Causativo',
          'Quando outra pessoa faz algo para você, use have (ou get) + objeto + particípio.',
          [['Serviço', 'I/s | had/v | my car/c | repaired./v']],
          ['I cut my hair = eu mesmo cortei · I had my hair cut = alguém cortou para mim', 'get é mais informal: I got my phone fixed.', 'Passivas avançadas: It must be done today. It is said that… / He is said to be rich.', 'needs + particípio: The car needs to be washed.']),
        demo(['rotina', 'I/s | had/v | my hair/c | cut/v | yesterday./t', 'Cortei o cabelo ontem (no salão).'], ['tecnologia', "I'm/s | getting/v | my phone/c | fixed./v", 'Estou mandando consertar meu celular.'],
          ['cidade', 'The building/s | is/a | being/a | painted./v', 'O prédio está sendo pintado.'], ['noticias', 'The mayor/s | is/v | said/v | to be/c | very ill./c', 'Dizem que o prefeito está muito doente.']),
        choose('rotina', 'Você foi ao salão: "I ___ yesterday."', ['had my nails done', 'did my nails', 'had done my nails'], { 'did my nails': 'Isso significa que você mesmo fez.', 'had done my nails': 'Ordem: had + objeto + particípio.' }),
        choose('tecnologia', 'Complete: My laptop is broken. I need to ___.', ['get it repaired', 'get repaired it', 'repair it get'], { 'get repaired it': 'Ordem: get + it + repaired.', 'repair it get': 'Ordem: get it repaired.' }),
        choose('trabalho', 'Complete: This report must ___ by Friday.', ['be finished', 'finished', 'be finish', 'finish'], { finished: 'Passiva com modal: must be finished.', 'be finish': 'Particípio: finished.', finish: 'O relatório não termina sozinho: be finished.' }),
        read('noticias', 'The suspect is believed to have left the country.', 'O que a frase diz?', ['Acredita-se que o suspeito deixou o país.', 'O suspeito acredita que vai deixar o país.', 'O suspeito foi preso no país.'], { 'O suspeito acredita que vai deixar o país.': '"is believed" = acredita-se (passiva).', 'O suspeito foi preso no país.': 'O texto diz que ele teria saído do país.' }),
        transform('cidade', 'A mechanic changed my tires.', 'Use o causativo com "had".', 'I had my tires changed.', ['^i had my (tires|tyres) changed( by a mechanic)?$'], [['had changed my', 'Ordem: had + my tires + changed.']], 'I had my tires changed.'),
        fix('rotina', 'I had cut my hair at the salon.', 'I had my hair cut at the salon.', [['had cut my hair', 'Causativo: had + my hair + cut.']]),
        type('cidade', 'Your house needs painting. What will you do?', 'Responda com causativo (have/get it painted).', "I'll have it painted.", ['^i will (have|get) (it|my house|the house) painted( [a-z0-9 ]+)?$', '^i am going to (have|get) (it|my house|the house) painted( [a-z0-9 ]+)?$'], [['paint it', 'Alguém vai pintar para você: have it painted.']], "I'll have it painted.", { stage: 3 }),
        dialog('amigos', 'Visual novo', ['bot', 'You look different! New glasses?', 'Você está diferente! Óculos novos?'],
          ['me', ['Yes, and I had my hair dyed.', 'Yes, and I dyed my hair by someone.', 'Yes, and I had dyed my hair at the salon.'], { 'Yes, and I dyed my hair by someone.': 'Causativo: I had my hair dyed.', 'Yes, and I had dyed my hair at the salon.': 'Ordem: had my hair dyed.' }],
          ['bot', 'It looks great. Where did you get it done?', 'Ficou ótimo. Onde você fez?'],
          ['me', ['At a salon near my office.', 'In a salon near of my office.', 'At salon near office.'], { 'In a salon near of my office.': 'near (sem of).', 'At salon near office.': 'Artigos: at a salon near my office.' }],
          ['bot', 'I need to go there!', 'Preciso ir lá!']),
      ]),
    ]),

    // ───────────────────────── Wish
    module('wish', 'Wish e If only', 'Quem me dera', [
      lesson('ws1', 'Quem me dera…', 'wish + passado, past perfect, would', ['I wish', 'If only', 'I wish I had', 'I wish you would', "I'd rather"], [
        intro('Você fala de desejos e arrependimentos.', 'Wish',
          'Wish fala de situações diferentes da realidade. O tempo verbal "volta" um passo, como no second e third conditional.',
          [['Presente', 'I/s | wish/v | I/s | had/v | more time./c'], ['Passado', 'I/s | wish/v | I/s | had/a | studied/v | harder./c']],
          ['Desejo sobre o presente: wish + passado (I wish I lived near the beach)', 'Arrependimento: wish + past perfect (I wish I hadn\'t said that)', 'Irritação/quer que alguém mude: wish + would (I wish you would stop)', 'If only = mais forte: If only I knew!']),
        demo(['cidade', 'I/s | wish/v | I/s | lived/v | by the sea./c', 'Quem me dera morar na praia.'], ['amigos', 'I/s | wish/v | I/s | hadn\'t/a | said/v | that./c', 'Queria não ter dito aquilo.'],
          ['familia', 'I/s | wish/v | you/s | would/a | call/v | more often./t', 'Queria que você ligasse mais vezes.'], ['estudos', 'If only/c | I/s | spoke/v | Spanish!/c', 'Se ao menos eu falasse espanhol!']),
        choose('trabalho', 'Complete: I wish I ___ a better salary.', ['had', 'have', 'will have'], { have: 'Desejo sobre o presente: passado (had).', 'will have': 'wish + passado: had.' }),
        choose('amigos', 'Arrependimento: "I wish I ___ to the party. It was great!"', ['had gone', 'went', 'go'], { went: 'Arrependimento do passado: had gone.', go: 'Passado: had gone.' }),
        choose('familia', 'Irritação: "I wish he ___ making so much noise."', ['would stop', 'stops', 'stopped'], { stops: 'Querer que alguém mude: would stop.', stopped: 'Para comportamento irritante: would stop.' }),
        transform('estudos', "I don't speak French. (você queria falar)", 'Reescreva com "I wish".', 'I wish I spoke French.', ['^i wish i (spoke|could speak) french$'], [['wish i speak\\b', 'Presente → passado: spoke.']], 'I wish I spoke French.'),
        fix('saude', 'I wish I didn\'t eat so much last night.', "I wish I hadn't eaten so much last night.", [['did not eat', 'Arrependimento do passado: hadn\'t eaten.']]),
        type('rotina', 'Is there anything you wish were different in your life?', 'Responda com "I wish I…".', 'I wish I had more free time.', ['^i wish i (had|was|were|could|lived|knew|spoke|did|did not|had not|would) [a-z0-9 ]+$'], [['^i wish i (have|am|can|live|know) ', 'Presente → passado: had, were, could, lived, knew.']], 'I wish I + passado.', { stage: 3 }),
        dialog('amigos', 'Desabafo', ['bot', 'You look sad. What\'s wrong?', 'Você parece triste. O que houve?'],
          ['me', ["I wish I hadn't quit my job.", "I wish I didn't quit my job.", "I wish I don't quit my job."], { "I wish I didn't quit my job.": 'Arrependimento: hadn\'t quit.', "I wish I don't quit my job.": 'Passado: hadn\'t quit.' }],
          ['bot', 'Why? You hated it!', 'Por quê? Você odiava!'],
          ['me', ['I know, but I wish I had some money now.', 'I know, but I wish I have some money now.', 'I know, but I wish I would have money now.'], { 'I know, but I wish I have some money now.': 'Presente: wish + had.', 'I know, but I wish I would have money now.': 'wish + had.' }],
          ['bot', 'Something better will come.', 'Algo melhor vai aparecer.']),
      ]),
    ]),

    // ───────────────────────── Participle clauses
    module('participle-clauses', 'Orações reduzidas', 'Having finished…, Built in 1900…', [
      lesson('pc3', 'Frases mais enxutas', 'Participle clauses', ['having finished', 'built in', 'located in', 'feeling tired', 'after leaving', 'before going'], [
        intro('Você lê textos formais cheios de frases que começam com -ing ou particípio.', 'Orações com particípio',
          'Uma oração pode ser reduzida a um particípio quando o sujeito é o mesmo. Isso deixa o texto mais curto e formal.',
          [['Ativa (-ing)', 'Feeling/v | tired,/c | she/s | went/v | to bed./c'], ['Passiva (particípio)', 'Built/v | in 1900,/t | the house/s | is/v | beautiful./c']],
          ['Because she felt tired → Feeling tired, …', 'The house, which was built in 1900, … → Built in 1900, the house…', 'Ação anterior: Having finished the work, he left.', 'Depois de preposição: After leaving, before going, without saying.']),
        demo(['viagem', 'Located/v | in the center,/c | the hotel/s | is/v | very convenient./c', 'Localizado no centro, o hotel é muito prático.'], ['trabalho', 'Having/a | finished/v | the report,/c | she/s | went/v | home./c', 'Tendo terminado o relatório, ela foi para casa.'],
          ['rotina', 'After/c | having/v | lunch,/c | we/s | took/v | a walk./c', 'Depois de almoçar, demos uma caminhada.'], ['noticias', 'Written/v | in 1890,/t | the book/s | is/v | still popular./c', 'Escrito em 1890, o livro ainda é popular.']),
        read('noticias', 'Founded in 1950, the company now employs 10,000 people.', '"Founded in 1950" significa:', ['A empresa foi fundada em 1950.', 'A empresa vai ser fundada em 1950.', 'As pessoas fundaram 10 mil empresas.'], { 'A empresa vai ser fundada em 1950.': 'Particípio aqui é passivo e passado: foi fundada.', 'As pessoas fundaram 10 mil empresas.': 'O sujeito é a empresa.' }),
        read('trabalho', 'Not knowing what to say, he stayed silent.', 'Por que ele ficou em silêncio?', ['Porque não sabia o que dizer.', 'Porque sabia demais.', 'Porque estava doente.'], { 'Porque sabia demais.': '"Not knowing" = como não sabia.', 'Porque estava doente.': 'O texto dá a causa: não sabia o que dizer.' }),
        choose('rotina', 'Reduza: "After I finished dinner, I watched TV."', ['After finishing dinner, I watched TV.', 'After finished dinner, I watched TV.', 'After to finish dinner, I watched TV.'], { 'After finished dinner, I watched TV.': 'Depois de preposição: -ing.', 'After to finish dinner, I watched TV.': 'Depois de preposição: -ing.' }),
        choose('cidade', 'Reduza: "The bridge, which was designed by an Italian, is famous."', ['Designed by an Italian, the bridge is famous.', 'Designing by an Italian, the bridge is famous.', 'Having design by an Italian, the bridge is famous.'], { 'Designing by an Italian, the bridge is famous.': 'A ponte foi projetada (passiva): Designed.', 'Having design by an Italian, the bridge is famous.': 'Passiva: Designed.' }),
        transform('trabalho', 'Because I didn\'t have time, I skipped lunch.', 'Reduza começando com "Not having".', 'Not having time, I skipped lunch.', ['^not having (any |enough )?time i skipped lunch$'], [['^not have', 'Use -ing: Not having time.']], 'Not having time, I skipped lunch.'),
        fix('viagem', 'Arriving at the hotel, the room was ready.', 'Arriving at the hotel, we found the room ready.', [['hotel the room was', 'Quem chegou foi "we", não o quarto. O sujeito precisa ser o mesmo.']], ['^arriving at the hotel (we|i) found (that )?the room (was )?ready$', '^when (we|i) arrived at the hotel the room was ready$']),
        type('estudos', 'Reduza: "Before I go to bed, I read a little."', 'Comece com "Before".', 'Before going to bed, I read a little.', ['^before going to bed i read( a little| a bit)?$'], [['^before go to', 'Depois de preposição: going.'], ['^before to go', 'Depois de preposição: going.']], 'Before going to bed, I read a little.', { stage: 3 }),
      ]),
    ]),

    // ───────────────────────── Conectores avançados
    module('conectores-b2', 'Conectores e marcadores avançados', 'despite, whereas, unless, provided that', [
      lesson('mk1', 'Apesar de, enquanto, desde que', 'Conectores de contraste e condição', ['despite', 'in spite of', 'although', 'even though', 'whereas', 'unless', 'provided that', 'as long as', 'nevertheless', 'furthermore', 'consequently'], [
        intro('Você escreve um e-mail formal e quer argumentar bem.', 'Conectores avançados',
          'Cada conector tem uma estrutura própria: alguns pedem uma frase com verbo, outros um substantivo ou -ing.',
          [['Frase', 'Although/c | it/s | rained,/v | we/s | went out./v'], ['Substantivo', 'Despite/c | the rain,/c | we/s | went out./v']],
          ['although / even though + frase (sujeito + verbo)', 'despite / in spite of + substantivo ou -ing (despite being tired)', 'whereas / while = enquanto (comparação de contraste): I like tea, whereas she likes coffee.', 'unless = a menos que · provided that / as long as = desde que', 'Formais no início da frase: Nevertheless, Furthermore, Consequently.']),
        demo(['trabalho', 'Despite/c | the crisis,/c | sales/s | grew./v', 'Apesar da crise, as vendas cresceram.'], ['familia', 'My brother/s | loves/v | sports,/c | whereas/c | I/s | prefer/v | books./c', 'Meu irmão ama esportes, enquanto eu prefiro livros.'],
          ['viagem', 'You/s | can/a | go/v | as long as/c | you/s | call/v | me./c', 'Você pode ir desde que me ligue.'], ['saude', 'Even though/c | he/s | was/v | sick,/c | he/s | worked./v', 'Mesmo doente, ele trabalhou.']),
        choose('trabalho', 'Complete: ___ being tired, she finished the project.', ['Despite', 'Although', 'Even though'], { Although: '"Although" pede sujeito + verbo. Com -ing: Despite.', 'Even though': 'Pede frase completa. Com -ing: Despite.' }),
        choose('viagem', 'Complete: ___ the weather was bad, the flight left on time.', ['Although', 'Despite', 'In spite of'], { Despite: 'Despite + substantivo/-ing. Com frase: Although.', 'In spite of': 'In spite of + substantivo. Com frase: Although.' }),
        choose('trabalho', 'Complete: You won\'t get the bonus ___ you reach the target.', ['unless', 'provided', 'whereas'], { provided: 'Sentido: a menos que (unless).', whereas: '"whereas" compara; aqui é condição negativa: unless.' }),
        choose('estudos', 'Complete: The report was late. ___, the client accepted it.', ['Nevertheless', 'Furthermore', 'Consequently'], { Furthermore: 'Contraste (atrasou, mas aceitou): Nevertheless.', Consequently: 'Não é consequência; é contraste.' }),
        read('noticias', 'The company reduced costs. Consequently, profits rose by 15%.', '"Consequently" indica que:', ['o lucro subiu por causa do corte de custos', 'o lucro subiu apesar do corte de custos', 'o corte de custos veio depois do lucro'], { 'o lucro subiu apesar do corte de custos': 'Consequently = consequentemente (causa e efeito).', 'o corte de custos veio depois do lucro': 'Consequently indica resultado.' }),
        transform('saude', 'It was raining. We went for a run.', 'Junte com "despite".', 'Despite the rain, we went for a run.', ['^despite (the rain|it raining|the fact that it was raining) we went for a run$', '^we went for a run despite (the rain|it raining|the fact that it was raining)$'], [['despite it was', 'Despite + substantivo: despite the rain.']], 'Despite the rain, we went for a run.'),
        fix('trabalho', 'Despite he was late, he got the job.', 'Although he was late, he got the job.', [['^despite he was', 'Despite não vai com frase. Use Although (ou Despite being late).']], ['^(although|even though|though) he was late he got the job$', '^despite being late he got the job$']),
        type('estudos', 'Compare: você gosta de cidade; sua irmã gosta de campo.', 'Use "whereas".', 'I like the city, whereas my sister likes the countryside.', ['^i (like|love|prefer) (the )?city whereas my sister (likes|loves|prefers) (the )?countryside$', '^whereas i (like|love|prefer) (the )?city my sister (likes|loves|prefers) (the )?countryside$'], [['my sister like\\b', 'My sister → likes.']], 'I like the city, whereas my sister likes the countryside.', { stage: 3 }),
      ]),
    ]),
  ]);
})(window.CX);
