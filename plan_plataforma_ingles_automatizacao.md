# Plan Mode --- Plataforma de Aprendizagem de Inglês por Automatização Cognitiva

## Visão geral

A proposta é desenvolver uma plataforma de aprendizagem de inglês
inspirada na experiência gamificada do Duolingo, mas com uma abordagem
pedagógica diferente: treinar o usuário para reconhecer estruturas
gramaticais e produzir respostas em inglês de maneira rápida, intuitiva
e natural.

O objetivo não é apenas ensinar regras, vocabulário e traduções. É
desenvolver a capacidade de pensar e responder em inglês sem precisar
construir mentalmente toda a frase em português antes de traduzi-la.

**Princípio fundamental:**

> Aprender uma estrutura → reconhecer seu funcionamento → aplicá-la em
> situações reais → construir respostas progressivamente → automatizar
> sua utilização.

A metodologia combina:

-   Microaprendizagem: lições curtas e progressivas.
-   Active Recall: recuperar ativamente o conhecimento.
-   Chunking: aprender blocos de linguagem que fazem sentido juntos.
-   Repetição espaçada: revisitar estruturas em intervalos estratégicos.
-   Produção incremental: construir frases palavra por palavra ou por
    blocos.
-   Automatização: reduzir gradualmente o tempo necessário para formular
    respostas.

------------------------------------------------------------------------

# Prompt para o Claude --- Plan Mode

> **IMPORTANTE:** Estamos em Plan Mode. Não implemente nada ainda.
> Primeiro, analise a proposta, avalie a arquitetura existente do
> projeto (se houver) e elabore um plano técnico, pedagógico e funcional
> completo. Não escreva código antes da aprovação do planejamento.

## 1. Visão do produto

Quero desenvolver uma plataforma de aprendizagem de inglês inspirada na
experiência gamificada do Duolingo, mas com uma proposta pedagógica
significativamente diferente.

O objetivo é desenvolver uma plataforma que ensine inglês por meio da
construção progressiva de respostas, treinando o cérebro para reconhecer
padrões gramaticais e produzir frases de maneira rápida, intuitiva e
natural.

A proposta não é simplesmente ensinar regras gramaticais, vocabulário e
traduções.

Queremos desenvolver a capacidade de o usuário pensar e responder em
inglês sem precisar construir mentalmente toda a frase em português
antes de traduzi-la.

O princípio fundamental é:

**Aprender uma estrutura → reconhecer seu funcionamento → aplicá-la em
situações reais → construir respostas progressivamente → automatizar sua
utilização.**

A plataforma deve ser extremamente simples, intuitiva, visualmente
agradável e acessível até para pessoas que tenham muita dificuldade com
gramática.

## 2. Conceito pedagógico central

A principal mecânica será a construção incremental de frases.

O usuário aprende uma estrutura gramatical e imediatamente começa a
utilizá-la em uma situação cotidiana.

### Exemplo: Simple Past

Primeiro, a plataforma apresenta uma explicação simples:

**Simple Past --- Passado simples**

Utilizamos o Simple Past para falar de acontecimentos que já
aconteceram.

Estrutura:

`Subject + Verb (past) + Complement`

Exemplo:

`I watched a movie yesterday.`

Em vez de apenas apresentar a frase completa, a plataforma começa um
exercício de construção progressiva.

### Exemplo de experiência interativa

Situação apresentada:

"Você está contando para um amigo o que fez ontem."

**1. Quem realizou a ação?**

`I`

**2. O que você fez?**

O usuário recebe opções:

-   watched
-   watch
-   watching
-   watches

Seleciona: `watched`.

**3. O que você assistiu?**

`a movie`

**4. Quando aconteceu?**

`yesterday`

Resultado:

`I watched a movie yesterday.`

A frase é construída progressivamente, e o usuário entende
intuitivamente como cada elemento participa da estrutura.

### Evolução da mecânica

Depois de compreender a estrutura, a plataforma aumenta gradualmente a
dificuldade:

1.  **Nível 1 --- Escolha:** selecionar entre alternativas.
2.  **Nível 2 --- Completar:** identificar a próxima palavra.
3.  **Nível 3 --- Construção:** montar a frase sem alternativas.
4.  **Nível 4 --- Aplicação:** responder a uma pergunta utilizando a
    estrutura.
5.  **Nível 5 --- Resposta rápida:** responder a uma situação cotidiana.
6.  **Nível 6 --- Conversação:** utilizar a estrutura em um diálogo
    contextualizado.

A ideia é criar um gatilho de reconhecimento: ao encontrar uma situação,
o cérebro começa a recuperar automaticamente a estrutura adequada.

## 3. Metodologia: construção incremental

Essa será a principal identidade da plataforma.

Quero que o usuário tenha a sensação de estar montando uma frase
naturalmente, quase como completar uma sequência lógica.

Exemplo:

**Pergunta:**

`What did you do last weekend?`

A plataforma apresenta:

`I → ?`

O usuário escolhe:

`went`

Aparece:

`I went → ?`

O usuário escolhe:

`to the beach`

Aparece:

`I went to the beach → ?`

O usuário escolhe:

`with my friends.`

Resultado:

`I went to the beach with my friends.`

O exercício deve ser visualmente dinâmico, com a frase sendo formada na
tela conforme o usuário responde.

### Mecânicas possíveis

-   Construção palavra por palavra.
-   Construção por blocos de palavras.
-   Completar lacunas.
-   Identificar a próxima palavra.
-   Organizar palavras embaralhadas.
-   Responder perguntas contextualizadas.
-   Transformar frases afirmativas em negativas.
-   Transformar frases em perguntas.
-   Corrigir frases incorretas.
-   Responder situações sem alternativas.
-   Participar de diálogos com respostas rápidas.

Não quero que todos os exercícios sejam iguais. A plataforma deve
alternar as mecânicas para evitar monotonia.

## 4. Ensino de toda a gramática inglesa

A metodologia deve ser aplicável a todo o sistema gramatical do inglês.

Desenvolva uma matriz curricular completa e organizada por níveis de
dificuldade.

Considere inicialmente os níveis A1, A2, B1, B2, C1 e C2 do CEFR.

### A1 --- Fundamentos

-   Verb to be.
-   Subject pronouns.
-   Object pronouns.
-   Possessive adjectives.
-   Articles.
-   Plural nouns.
-   Simple Present.
-   Present Continuous.
-   Simple Past introdutório.
-   There is / There are.
-   Demonstratives.
-   Prepositions of place.
-   Can / Can't.
-   Imperatives.
-   Basic question formation.

### A2 --- Construção de frases

-   Simple Past completo.
-   Past Continuous.
-   Future with Going To.
-   Will.
-   Present Perfect introdutório.
-   Comparatives.
-   Superlatives.
-   Countable and uncountable nouns.
-   Some / Any / Much / Many.
-   Should / Must / Have to.
-   Adverbs of frequency.
-   Prepositions of time.
-   Infinitive and Gerund.
-   First Conditional.
-   Basic modal verbs.

### B1 --- Comunicação intermediária

-   Present Perfect.
-   Present Perfect Continuous.
-   Past Perfect.
-   Used to.
-   Would.
-   Second Conditional.
-   Passive Voice.
-   Reported Speech.
-   Relative Clauses.
-   Modal verbs of deduction.
-   Phrasal verbs.
-   Question tags.
-   Gerunds and infinitives.
-   Future Continuous.
-   Future Perfect.

### B2 --- Fluência estrutural

-   Third Conditional.
-   Mixed Conditionals.
-   Advanced Passive Voice.
-   Advanced Reported Speech.
-   Causative structures.
-   Modal verbs in the past.
-   Inversion.
-   Advanced relative clauses.
-   Participle clauses.
-   Complex sentence structures.
-   Linking words.
-   Advanced discourse markers.

### C1 e C2 --- Domínio avançado

-   Advanced inversion.
-   Subjunctive structures.
-   Advanced conditionals.
-   Ellipsis.
-   Cleft sentences.
-   Nominalization.
-   Complex clause structures.
-   Nuances de modal verbs.
-   Advanced discourse structures.
-   Idiomatic expressions.
-   Register and tone.
-   Natural spoken English.

Essa lista é uma base inicial. Avalie a organização curricular,
identifique lacunas e proponha uma progressão pedagogicamente coerente.

Não ensine gramática apenas por classificação. Cada conteúdo deve estar
associado a situações em que o usuário realmente utilizaria aquela
estrutura.

## 5. Estrutura padrão de uma lição

Toda lição deve seguir uma sequência consistente:

### Etapa 1 --- Descoberta

Apresentar uma situação cotidiana que contextualize a estrutura.

Exemplo: contar o que aconteceu ontem.

### Etapa 2 --- Explicação simplificada

Explicar a regra de maneira curta, clara e visual.

Evitar textos acadêmicos, termos técnicos desnecessários e explicações
excessivamente longas.

### Etapa 3 --- Demonstração

Apresentar exemplos contextualizados e mostrar como a estrutura funciona
em frases reais.

### Etapa 4 --- Construção guiada

O usuário começa a montar frases palavra por palavra.

### Etapa 5 --- Reconhecimento

Apresentar diferentes frases e pedir que o usuário identifique a
estrutura correta.

### Etapa 6 --- Transformação

Pedir para transformar frases afirmativas em negativas, interrogativas e
outras formas.

### Etapa 7 --- Resposta rápida

Apresentar perguntas e situações nas quais o usuário precisa responder
utilizando a estrutura aprendida.

### Etapa 8 --- Aplicação contextualizada

Criar um pequeno diálogo no qual o usuário precisa utilizar naturalmente
o conteúdo.

### Etapa 9 --- Revisão

Identificar os erros e programar a revisão da estrutura.

## 6. Treinamento de respostas rápidas

Quero que essa seja uma das principais características do produto.

A plataforma precisa treinar o reconhecimento de perguntas e a produção
de respostas.

Exemplo:

`What did you eat yesterday?`

O usuário precisa responder:

`I ate pizza.`

A experiência deve evoluir:

-   Inicialmente, o usuário tem tempo livre.
-   Depois, aparecem sugestões de palavras.
-   Posteriormente, o usuário precisa responder sem sugestões.
-   Finalmente, são introduzidos desafios de resposta rápida.

É importante não confundir velocidade com aprendizagem.

O sistema deve priorizar precisão e compreensão antes de cobrar
velocidade.

O tempo de resposta deve ser utilizado como indicador de evolução
individual, e não como punição.

## 7. Contextualização no cotidiano

Os exemplos devem representar situações que as pessoas realmente
vivenciam.

Criar categorias de contexto:

-   Rotina diária.
-   Trabalho.
-   Estudos.
-   Viagens.
-   Restaurantes.
-   Compras.
-   Família.
-   Amigos.
-   Relacionamentos.
-   Tecnologia.
-   Transporte.
-   Saúde e bem-estar.
-   Conversas informais.
-   Reuniões profissionais.
-   Situações inesperadas.

Uma mesma estrutura gramatical deve aparecer em diferentes contextos.

Exemplo: Simple Past.

No trabalho:

`I finished the report yesterday.`

Em uma viagem:

`I visited London last year.`

Com amigos:

`We watched a movie last night.`

Na rotina:

`I woke up at seven.`

O objetivo é fazer o usuário compreender que a estrutura gramatical é
reutilizável em inúmeras situações.

## 8. Sistema de revisão inteligente

Implementar uma lógica de repetição espaçada.

O sistema deve identificar:

-   Estruturas que o usuário domina.
-   Estruturas que apresenta dificuldade.
-   Erros recorrentes.
-   Palavras que confunde.
-   Tempo médio de resposta.
-   Taxa de acertos.
-   Capacidade de aplicar a estrutura em novos contextos.

Uma estrutura não deve ser considerada dominada apenas porque o usuário
acertou uma questão.

Ela precisa ser recuperada corretamente em diferentes exercícios e
situações, inclusive após um intervalo de tempo.

Avalie algoritmos de repetição espaçada, como FSRS ou uma implementação
simplificada baseada em intervalos adaptativos.

## 9. Gamificação

Quero aproveitar os elementos positivos do Duolingo:

-   XP.
-   Sequência diária.
-   Metas diárias.
-   Progressão por níveis.
-   Desbloqueio de conteúdos.
-   Conquistas.
-   Ranking opcional.
-   Indicadores de progresso.
-   Desafios diários.

Mas a gamificação deve estar subordinada à aprendizagem.

Não quero uma plataforma em que o usuário apenas acumule pontos
respondendo exercícios mecanicamente.

A recompensa principal deve estar associada à evolução real da
capacidade de compreender e produzir inglês.

## 10. Experiência visual e interface

A interface deve ser extremamente intuitiva.

Referências de experiência:

-   Duolingo: simplicidade e progressão.
-   Brilliant: aprendizagem interativa.
-   Elevate: exercícios cognitivos.
-   Quizlet: revisão e memorização.

Não quero copiar a identidade visual dessas plataformas.

Quero uma identidade própria, moderna, minimalista, sofisticada e
amigável.

Diretrizes:

-   Interface limpa.
-   Poucas informações por tela.
-   Tipografia de fácil leitura.
-   Hierarquia visual clara.
-   Animações suaves.
-   Feedback imediato.
-   Excelente experiência mobile.
-   Responsividade completa.
-   Modo escuro, se fizer sentido.
-   Pouca dependência de textos extensos.

A construção da frase deve ser o principal elemento visual da
experiência de aprendizagem.

## 11. Inteligência artificial

Avalie como incorporar IA ao produto sem torná-lo dependente de geração
dinâmica para todas as atividades.

Quero estudar a possibilidade de:

1.  Gerar novos exemplos contextualizados.
2.  Criar diálogos personalizados.
3.  Identificar padrões de erros.
4.  Explicar por que determinada resposta está incorreta.
5.  Adaptar a dificuldade ao nível do usuário.
6.  Simular conversas cotidianas.
7.  Identificar dificuldades gramaticais recorrentes.
8.  Criar exercícios a partir dos assuntos de interesse do usuário.

A IA deve complementar um banco estruturado de conteúdos pedagógicos.

As regras gramaticais, respostas esperadas e exercícios fundamentais
precisam ter validação e controle de qualidade.

Não permitir que a IA ensine estruturas incorretas ou apresente
explicações contraditórias.

## 12. Arquitetura de conteúdo

Proponha uma estrutura de dados que permita cadastrar e organizar:

-   Níveis.
-   Módulos.
-   Unidades.
-   Lições.
-   Estruturas gramaticais.
-   Regras.
-   Exemplos.
-   Contextos.
-   Exercícios.
-   Alternativas.
-   Respostas corretas.
-   Explicações.
-   Variações de respostas aceitas.
-   Critérios de dificuldade.
-   Revisões.
-   Desempenho individual.

A arquitetura deve permitir adicionar novos conteúdos sem precisar
modificar a aplicação inteira.

Considere que futuramente poderemos adicionar outras línguas, como
espanhol, francês e alemão.

## 13. Métricas de aprendizagem

Criar um painel que mostre a evolução do usuário.

Indicadores sugeridos:

-   Estruturas gramaticais aprendidas.
-   Estruturas dominadas.
-   Precisão nas respostas.
-   Tempo médio de resposta.
-   Taxa de recuperação após intervalos.
-   Erros recorrentes.
-   Vocabulário adquirido.
-   Evolução por nível CEFR.
-   Desempenho por categoria gramatical.

Quero um indicador visual de domínio real do inglês, não apenas uma
porcentagem de lições concluídas.

## 14. MVP --- Primeira versão

Não quero começar tentando construir tudo.

Proponha um MVP que permita validar a metodologia.

Sugestão inicial:

-   Cadastro e autenticação.
-   Perfil do estudante.
-   Diagnóstico inicial.
-   Progressão A1.
-   Módulos gramaticais estruturados.
-   Sistema de construção incremental de frases.
-   Exercícios de respostas rápidas.
-   Feedback imediato.
-   Revisão espaçada.
-   XP e progressão.
-   Dashboard de aprendizagem.

Criar pelo menos um módulo completo de Simple Past para servir como
demonstração da metodologia.

Esse módulo deve conter exemplos, explicações, diferentes tipos de
exercícios, níveis de dificuldade e situações cotidianas.

Depois, avaliar como replicar a metodologia para as demais estruturas.

## 15. O que espero do planejamento

Antes de implementar, quero que você produza um documento de
planejamento contendo:

1.  Análise da proposta e diferenciais do produto.
2.  Definição da metodologia pedagógica.
3.  Jornada completa do usuário.
4.  Arquitetura de navegação.
5.  Estrutura curricular CEFR.
6.  Mecânicas de exercícios.
7.  Exemplificação visual e funcional de uma lição de Simple Past.
8.  Sistema de progressão e revisão.
9.  Arquitetura técnica recomendada.
10. Modelo de dados.
11. Estratégia de integração com IA.
12. Estratégia de gamificação.
13. Indicadores de aprendizagem.
14. Escopo do MVP.
15. Roadmap de desenvolvimento por fases.
16. Riscos técnicos e pedagógicos.
17. Critérios de validação do produto.

Para cada decisão técnica, explique a justificativa.

Se o projeto já possuir uma estrutura de código, analise-a antes de
recomendar alterações. Preserve o que estiver funcionando e evite
reconstruir desnecessariamente componentes existentes.

## 16. Diretriz mais importante

Não perca de vista a essência do projeto:

**Não queremos ensinar o usuário a decorar frases em inglês. Queremos
ensiná-lo a construir frases naturalmente, reconhecer padrões
gramaticais e responder sem precisar traduzir mentalmente cada
palavra.**

O usuário deve sair de uma lição sabendo utilizar uma estrutura em
situações diferentes, não apenas acertar as perguntas daquela lição.

A experiência ideal é que ele comece precisando pensar em cada palavra
e, com o treinamento, passe a reconhecer a estrutura e produzir a
resposta quase automaticamente.

Quero construir uma plataforma que transforme o aprendizado de gramática
em treinamento prático de comunicação.

**Primeiro apresente o planejamento completo. Não implemente até que eu
aprove a proposta.**

------------------------------------------------------------------------

# Recomendação estratégica: três estágios de aprendizagem

Uma mecânica especialmente importante é treinar o mesmo conteúdo em três
velocidades e três níveis de autonomia.

## 1. Construção --- Aprender

`I → went → home`

O usuário constrói a frase com orientação e alternativas.

Objetivo: compreender a estrutura e a ordem dos elementos.

## 2. Recuperação --- Consolidar

Pergunta:

`What did you do yesterday?`

Resposta:

`I went home.`

O usuário precisa recuperar a estrutura sem receber a resposta pronta.

Objetivo: fortalecer a recuperação ativa do conhecimento.

## 3. Automatização --- Responder

Pergunta:

`Where did you go yesterday?`

Resposta:

`I went home.`

O usuário responde espontaneamente, com menor tempo de elaboração e sem
alternativas.

Objetivo: desenvolver agilidade e naturalidade na produção da língua.

**Importante:** a velocidade deve ser introduzida gradualmente.
Primeiro, o usuário precisa demonstrar compreensão e precisão; depois, a
plataforma pode trabalhar a rapidez da resposta.

# Um diferencial adicional: chunks e collocations

Não limitar os exercícios à gramática isolada. Ensinar também
combinações naturais de palavras (*collocations*) e blocos de linguagem
(*chunks*).

Por exemplo, ensinar:

`I made a decision.`

Em vez de apenas decorar o significado isolado de `make` e `decision`.

Isso ajuda a plataforma a ensinar não apenas inglês gramaticalmente
correto, mas inglês que as pessoas realmente falam.

# Posicionamento do produto

A plataforma deve ser posicionada como um ambiente de **treinamento de
fluência e automatização linguística**, e não simplesmente como mais um
aplicativo de ensino de inglês.

Sua proposta de valor é transformar o aprendizado de gramática em
prática de comunicação: o usuário aprende uma estrutura, constrói
frases, recupera o conhecimento e passa a utilizá-lo em situações
variadas.
