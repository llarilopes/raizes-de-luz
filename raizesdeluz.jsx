import React, { useState, useEffect, useMemo } from "react";
import {
  Flame, Moon, Sun, Sparkles, BookOpen, Feather, Heart, Droplet, ScrollText,
  Star, Shuffle, ChevronRight, Bookmark, BookmarkCheck, X, Info,
} from "lucide-react";

/* ---------------------------------------------------------
   AVISO FIXO — usado em todo conteúdo sensível
--------------------------------------------------------- */
const AVISO = "Isso é uma introdução cultural e educativa. As formas certas de reza, oferenda e banho variam de terreiro para terreiro. Para orientação espiritual de verdade, procure uma casa de Umbanda e converse com um pai ou uma mãe de santo.";

/* ---------------------------------------------------------
   LINHAS DE TRABALHO
--------------------------------------------------------- */
/* ---------------------------------------------------------
   FALANGES NOMEADAS (entidades conhecidas de Exu e Pombagira)
--------------------------------------------------------- */
const FALANGES = {
  exu: [
    { nome: "Exu Tranca-Ruas", texto: "O mais popular entre os Exus. Guardião das encruzilhadas, é procurado para fechar os caminhos de quem quer fazer mal e abrir os seus próprios caminhos." },
    { nome: "Exu Marabô", texto: "Conhecido pela sabedoria e pela habilidade de lidar com situações complexas. Trabalha comunicação, decisões importantes e clareza mental." },
    { nome: "Exu Tiriri", texto: "Rápido, ágil e extremamente honesto. É procurado quando é preciso uma resposta ou solução rápida para um problema urgente." },
    { nome: "Exu Veludo", texto: "Tem uma energia mais serena e elegante entre os Exus, atuando com diplomacia na resolução de conflitos, tanto espirituais quanto do dia a dia." },
    { nome: "Exu Caveira", texto: "Ligado ao mundo dos que já partiram, trabalha limpezas espirituais profundas e proteção contra energias pesadas e demandas antigas." },
    { nome: "Exu Sete Encruzilhadas", texto: "Guardião de várias encruzilhadas ao mesmo tempo, atua em diferentes áreas da vida de quem o procura, ajudando quem está perdido ou em dúvida sobre qual caminho seguir." },
  ],
  pombagira: [
    { nome: "Maria Padilha", texto: "Uma das Pombagiras mais conhecidas e respeitadas, também chamada de rainha da encruzilhada. Atua principalmente em amor, proteção e abertura de caminhos, e é procurada por quem precisa de força para recomeçar depois de uma decepção." },
    { nome: "Pombagira Sete Saias", texto: "Carrega a força de sete energias diferentes dentro de si, entre elas amor, prosperidade e proteção. Representa a mulher que já enfrentou injustiça e se reergueu ainda mais forte." },
    { nome: "Pombagira Rosa Caveira", texto: "Ligada à proteção espiritual e ao mundo dos que já partiram. Trabalha limpando energias pesadas e protegendo quem está sob ataque espiritual." },
    { nome: "Pombagira Cigana", texto: "Traz a energia de liberdade e prosperidade dos Ciganos combinada à força da Pombagira. É procurada para questões de sorte, dinheiro e independência." },
    { nome: "Pombagira Maria Quitéria", texto: "Atua na linha da justiça, ajudando a reverter injustiças amorosas e defendendo quem foi traído ou humilhado dentro de um relacionamento." },
    { nome: "Pombagira Dama da Noite", texto: "Trabalha revelando o que está escondido, trazendo clareza sobre segredos e sonhos que ainda não foram compreendidos." },
  ],
};

const LINHAS = [
  {
    id: "caboclo", nome: "Caboclos", subtitulo: "Força, coragem e a sabedoria da mata",
    cor: "Verde e marrom", dia: "Quinta feira", elemento: "Terra e mata", saudacao: "Okê, Caboclo!",
    texto: "Os Caboclos são espíritos ligados à força da natureza e à bravura dos povos originários. Eles chegam com passos firmes, fala direta e uma energia que não foge de nenhuma dificuldade. Trabalham a cura pelas plantas, a proteção e o incentivo para agir com coragem diante da vida. Quem recebe essa energia costuma sentir uma vontade enorme de seguir em frente, sem medo do que vier.",
    icon: "arco",
  },
  {
    id: "pretovelho", nome: "Pretos Velhos", subtitulo: "Sabedoria, paciência e acolhimento",
    cor: "Branco", dia: "Segunda feira", elemento: "Terra", saudacao: "Adorei as Almas, Vovô e Vovó!",
    texto: "Os Pretos Velhos são espíritos ancestrais que viveram a dor da escravidão e voltaram como guias de amor e paciência. Falam pouco e com calma, muitas vezes fumando um cachimbo enquanto escutam sem julgar. Trazem conselhos simples que carregam décadas de vivência, e um colo espiritual para quem está cansado. É comum sentir um alívio profundo quando essa energia se aproxima.",
    icon: "cachimbo",
  },
  {
    id: "crianca", nome: "Crianças e Erês", subtitulo: "Pureza, alegria e o olhar sem medo",
    cor: "Rosa, azul claro e branco", dia: "Datas de Cosme e Damião", elemento: "Ar e água", saudacao: "Ó Cosme, ó Damião!",
    texto: "As Crianças e os Erês são espíritos que retornam com a pureza e a alegria de quem ainda não carrega os pesos da vida adulta. Eles brincam, riem alto e adoram doces e balões, mas por trás da brincadeira trazem uma limpeza emocional profunda. Ficar perto dessa energia ensina a rir de novo das próprias dificuldades e a soltar um pouco do controle.",
    icon: "flor",
  },
  {
    id: "exu", nome: "Exus", subtitulo: "Abertura de caminhos e proteção nas encruzilhadas",
    cor: "Preto e vermelho", dia: "Segunda feira", elemento: "Fogo e terra", saudacao: "Laroyê, Exu!",
    texto: "Os Exus são guardiões dos caminhos e das encruzilhadas da vida, trabalhando para abrir portas que pareciam fechadas e afastar o que quer atrapalhar. Têm fama de brincalhões e diretos, sem papas na língua, mas cumprem um papel sério de proteção dentro da Umbanda. É importante lembrar que Exu não é uma figura do mal. Ele é um trabalhador espiritual respeitado, que atua sob a ordem dos Orixás maiores.",
    icon: "encruzilhada",
  },
  {
    id: "pombagira", nome: "Pombagiras", subtitulo: "Força feminina, autoestima e assuntos do coração",
    cor: "Vermelho e rosa", dia: "Segunda feira", elemento: "Fogo", saudacao: "Laroyê, Pombagira!",
    texto: "As Pombagiras chegam com presença marcante, elegância e uma força feminina que não pede desculpas por existir. Trabalham questões de amor, autoestima e libertação de relações que já fizeram mal demais. Muitas mulheres se sentem representadas por essa energia, porque ela fala sem rodeios sobre desejo, dor e o direito de se colocar em primeiro lugar.",
    icon: "leque",
  },
  {
    id: "boiadeiro", nome: "Boiadeiros", subtitulo: "Força rústica, trabalho e proteção do campo",
    cor: "Marrom e laranja", dia: "Sábado", elemento: "Terra", saudacao: "Ê, Boiadeiro!",
    texto: "Os Boiadeiros carregam a força de quem lida com o trabalho duro da terra e do gado. Chegam com simplicidade, bom humor e uma energia protetora que ajuda a colocar ordem naquilo que está fora de controle na vida da pessoa. São conhecidos por resolver questões de trabalho e por trazer disposição para recomeçar depois de um período parado.",
    icon: "laco",
  },
  {
    id: "cigano", nome: "Ciganos", subtitulo: "Liberdade, prosperidade e jogo de cintura",
    cor: "Cores vivas, dourado e vermelho", dia: "Quarta feira", elemento: "Ar e fogo", saudacao: "Ó, Cigano da Jurema!",
    texto: "Os Ciganos trazem a energia de quem não se apega a um lugar só e sabe se adaptar a qualquer situação da vida. São ligados à prosperidade, à sedução saudável e à leitura de baralho, e adoram música, dança e boa conversa. Quando essa energia se aproxima, é comum sentir vontade de arriscar algo novo e confiar mais na própria sorte.",
    icon: "moeda",
  },
];

/* ---------------------------------------------------------
   OS 9 ORIXÁS
--------------------------------------------------------- */
const ORIXAS = [
  { nome: "Oxalá", dominio: "Pai maior, criação e paz", cor: "Branco", dia: "Sexta feira", elemento: "Ar e luz", texto: "Oxalá é considerado o Orixá maior, ligado à criação da vida e à paz interior. Sua energia pede calma, fé e recolhimento, como um pai que observa tudo com serenidade.", icon: "cajado" },
  { nome: "Ogum", dominio: "Trabalho, luta justa e caminhos abertos pelo esforço", cor: "Azul escuro ou vermelho", dia: "Terça feira", elemento: "Metal e ferro", texto: "Ogum é o Orixá do trabalho e da luta justa, o ferreiro que abre caminhos com força e determinação. Sua energia ajuda a vencer obstáculos concretos da vida material.", icon: "espada" },
  { nome: "Oxóssi", dominio: "Caça, abundância e conexão com a natureza", cor: "Verde", dia: "Quinta feira", elemento: "Mata", texto: "Oxóssi é o caçador que nunca deixa faltar o sustento de casa. Representa provisão, foco e a sabedoria de quem observa a mata antes de agir.", icon: "arco" },
  { nome: "Xangô", dominio: "Justiça, verdade e ordem", cor: "Marrom e branco", dia: "Quarta feira", elemento: "Pedra e trovão", texto: "Xangô é o Orixá da justiça, aquele que pesa as ações de cada um com seu machado duplo. Sua energia pede honestidade e coragem para assumir a verdade, mesmo quando ela é difícil.", icon: "machado" },
  { nome: "Iemanjá", dominio: "Maternidade, mar e acolhimento", cor: "Azul claro e branco", dia: "Sábado", elemento: "Mar", texto: "Iemanjá é a mãe de todos, rainha do mar, ligada ao acolhimento, à fertilidade e à emoção que se move em ondas. Sua energia acalma e cura feridas antigas.", icon: "concha" },
  { nome: "Oxum", dominio: "Amor, beleza e águas doces", cor: "Amarelo e dourado", dia: "Sábado", elemento: "Rios e cachoeiras", texto: "Oxum é a senhora do amor, da beleza e da riqueza que flui como as águas dos rios. Representa autoestima, sedução saudável e a doçura de cuidar de si.", icon: "espelho" },
  { nome: "Iansã", dominio: "Tempestades, transformação e coragem", cor: "Amarelo ou vermelho", dia: "Quarta feira", elemento: "Vento e raio", texto: "Iansã é a senhora dos raios e das tempestades, guerreira que enfrenta até os espíritos mais difíceis sem medo. Sua energia traz coragem para atravessar mudanças bruscas da vida.", icon: "raio" },
  { nome: "Obaluaiê", dominio: "Cura, doenças e transformação pela terra", cor: "Preto e branco, ou roxo", dia: "Segunda feira", elemento: "Terra", texto: "Obaluaiê, também chamado Omolu, é o Orixá da cura e da transformação, aquele que conhece de perto a dor do corpo e por isso sabe curar de verdade. Sua energia pede humildade diante do processo de cura.", icon: "palha" },
  { nome: "Nanã", dominio: "Sabedoria ancestral e os ciclos da vida", cor: "Lilás e branco", dia: "Segunda feira", elemento: "Lama e águas paradas", texto: "Nanã é a mais velha entre os Orixás, guardiã da sabedoria ancestral e dos ciclos entre a vida e a morte. Sua energia pede respeito pelo tempo das coisas e pela experiência de quem já viveu muito.", icon: "vassoura" },
];

/* ---------------------------------------------------------
   GLOSSÁRIO
--------------------------------------------------------- */
const GLOSSARIO = [
  { termo: "Terreiro", def: "A casa espiritual onde os trabalhos de Umbanda acontecem, também chamada de tenda ou centro." },
  { termo: "Gira", def: "O encontro ritual onde as entidades incorporam e atendem o público." },
  { termo: "Incorporação", def: "O momento em que uma entidade se manifesta através do corpo de um médium preparado para isso." },
  { termo: "Pemba", def: "Um giz colorido usado para riscar pontos sagrados no chão, cada cor ligada a um Orixá." },
  { termo: "Ponto riscado", def: "Um desenho simbólico feito com pemba, que representa a assinatura energética de uma entidade." },
  { termo: "Ponto cantado", def: "Uma canção ritual que chama, saúda ou trabalha com uma entidade específica durante a gira." },
  { termo: "Passe", def: "Uma limpeza energética feita com as mãos, retirando cargas pesadas do corpo da pessoa." },
  { termo: "Guia", def: "Um colar de contas coloridas usado como proteção, ligado a um Orixá específico." },
  { termo: "Firmeza", def: "Um objeto ou oferenda colocado em um local específico para fixar uma energia ou um pedido." },
  { termo: "Médium", def: "A pessoa que serve de canal para a incorporação das entidades." },
];

/* ---------------------------------------------------------
   OFERENDAS
--------------------------------------------------------- */
const OFERENDAS_INTRO = "Uma oferenda não é um suborno espiritual, é uma troca. Você oferece algo de coração, com gratidão ou com um pedido sincero, e entrega aquilo à natureza ou à entidade que representa aquela força. Cada entidade costuma ter elementos e locais tradicionalmente associados a ela, mas isso varia bastante de terreiro para terreiro.";
const OFERENDAS_LISTA = [
  { entidade: "Oxóssi", elementos: "Frutas, mel e folhas verdes", local: "Na mata, ou ao pé de uma árvore" },
  { entidade: "Iemanjá", elementos: "Flores brancas, perfume e sabão", local: "No mar, à beira das ondas" },
  { entidade: "Oxum", elementos: "Flores amarelas, mel e um espelho pequeno", local: "Em um rio ou cachoeira" },
  { entidade: "Ogum", elementos: "Arroz, feijão e um pedaço de aço", local: "Em estrada de terra, com respeito ao local" },
  { entidade: "Exu", elementos: "Cachaça, fumo e farofa", local: "Na encruzilhada, ao entardecer" },
  { entidade: "Pombagira", elementos: "Rosas vermelhas, perfume doce e espumante ou vinho tinto", local: "Na encruzilhada ou em local aberto, à noite" },
  { entidade: "Pretos Velhos", elementos: "Café, fumo de cachimbo e velas brancas", local: "Dentro de casa ou no terreiro" },
  { entidade: "Boiadeiro", elementos: "Pinga, milho e fumo", local: "Em terreno aberto, de terra" },
];
const OFERENDAS_ECO = "Um cuidado que vale para qualquer oferenda: nunca deixe plástico, vidro ou isopor no ambiente. Use sempre materiais biodegradáveis, e sempre que possível recolha depois o que a natureza não for consumir. Respeitar o lugar é parte do próprio ato de fé.";

/* ---------------------------------------------------------
   BANHOS ENERGÉTICOS
--------------------------------------------------------- */
const BANHOS = [
  { nome: "Descarrego", intencao: "Limpar energias pesadas acumuladas", ervas: "Arruda, guiné e espada de são jorge", modo: "Do pescoço para baixo, de preferência à noite, antes de dormir", cuidado: "Evite se estiver com feridas abertas na pele. Se estiver gestante, converse antes com alguém experiente." },
  { nome: "Abertura de caminhos", intencao: "Desbloquear situações travadas", ervas: "Alecrim, louro e arruda", modo: "Pela manhã, indo em direção à porta de saída de casa", cuidado: "É um banho de erva, não de higiene. Não misture com sabão." },
  { nome: "Amor próprio", intencao: "Fortalecer a autoestima e atrair afeto saudável", ervas: "Rosa branca, canela e camomila", modo: "À noite, com calma, pensando em si mesma com carinho", cuidado: "Teste a reação na pele antes, se você tiver pele sensível." },
  { nome: "Proteção", intencao: "Criar um escudo energético ao seu redor", ervas: "Arruda, comigo ninguém pode e alecrim", modo: "Antes de sair para compromissos importantes", cuidado: "Comigo ninguém pode é tóxico se ingerido. Mantenha longe de crianças e nunca use por dentro." },
  { nome: "Fortalecimento espiritual", intencao: "Renovar a energia e a conexão espiritual", ervas: "Manjericão, alfazema e arruda", modo: "Em dia de sol, deixando secar naturalmente no corpo", cuidado: "Não substitui tratamento médico para questões de saúde." },
];

/* ---------------------------------------------------------
   PRECES (textos originais)
--------------------------------------------------------- */
const PRECES = [
  { titulo: "Proteção", texto: "Peço proteção para os meus passos de hoje. Que eu seja guiada com sabedoria pelos caminhos que ainda não conheço, e que a luz que me acompanha afaste de mim tudo que possa me fazer mal. Que eu tenha discernimento para reconhecer o bem, e força para me afastar do que não é para mim." },
  { titulo: "Cura", texto: "Peço cura para o meu corpo e para o meu coração. Que a dor que carrego hoje encontre alívio, e que eu tenha paciência com o meu próprio tempo de cicatrizar. Agradeço por cada pequeno passo em direção à minha própria paz." },
  { titulo: "Gratidão", texto: "Agradeço por tudo que tenho hoje, mesmo o que ainda não entendo por completo. Agradeço pelas pessoas que caminham comigo, e pelas que já se foram mas deixaram ensinamento. Que eu nunca esqueça de agradecer também nos dias difíceis." },
  { titulo: "Abertura de caminho", texto: "Peço que os caminhos fechados se abram no tempo certo. Que eu tenha paciência para esperar o que ainda não chegou, e coragem para caminhar quando a porta finalmente se abrir. Que nada me detenha além do que for realmente necessário para o meu bem." },
  { titulo: "Força", texto: "Peço força para continuar mesmo quando estou cansada por dentro. Que eu lembre da minha própria história e de tudo que já superei até aqui. Que essa força venha acompanhada de calma, não de desespero." },
];

/* ---------------------------------------------------------
   QUIZ DE AFINIDADE
--------------------------------------------------------- */
const QUIZ = [
  { q: "Quando você está triste, o que mais te acalma?", opts: [
    { t: "Ficar em silêncio na natureza", l: "caboclo" }, { t: "Conversar com alguém mais velho e sábio", l: "pretovelho" },
    { t: "Rir e brincar de algo simples, sem peso", l: "crianca" }, { t: "Resolver o problema logo, sem enrolar", l: "exu" },
    { t: "Me arrumar, sair e mudar de ares", l: "cigano" },
  ]},
  { q: "O que mais te define quando você precisa agir?", opts: [
    { t: "Coragem para encarar de frente", l: "caboclo" }, { t: "Calma e paciência, mesmo sob pressão", l: "pretovelho" },
    { t: "Espontaneidade, ajo pelo instinto", l: "crianca" }, { t: "Estratégia, sempre acho um jeito", l: "exu" },
    { t: "Charme e jogo de cintura", l: "pombagira" },
  ]},
  { q: "Qual desses ambientes te dá mais paz?", opts: [
    { t: "Mata, campo aberto", l: "caboclo" }, { t: "Uma casa simples e acolhedora", l: "pretovelho" },
    { t: "Um lugar de festa ou brincadeira", l: "crianca" }, { t: "A estrada, sempre em movimento", l: "boiadeiro" },
    { t: "Um lugar novo que você nunca visitou", l: "cigano" },
  ]},
  { q: "Como as pessoas costumam te ver?", opts: [
    { t: "Forte e direta", l: "caboclo" }, { t: "Sábia e paciente", l: "pretovelho" },
    { t: "Leve e divertida", l: "crianca" }, { t: "Confiante e marcante", l: "pombagira" },
    { t: "Trabalhadora e de confiança", l: "boiadeiro" },
  ]},
  { q: "No amor, você é mais do tipo que...", opts: [
    { t: "Protege e defende quem ama", l: "caboclo" }, { t: "Aconselha com carinho", l: "pretovelho" },
    { t: "Vive o momento, sem cobrar tanto", l: "crianca" }, { t: "Não aceita ser desrespeitada, ponto final", l: "pombagira" },
    { t: "Gosta de liberdade mesmo dentro da relação", l: "cigano" },
  ]},
  { q: "No trabalho, o que mais te motiva?", opts: [
    { t: "Superar desafios difíceis", l: "caboclo" }, { t: "Ajudar e orientar outras pessoas", l: "pretovelho" },
    { t: "Fazer algo criativo e leve", l: "crianca" }, { t: "Ganhar de verdade com o próprio esforço", l: "boiadeiro" },
    { t: "Ter liberdade para criar meu próprio caminho", l: "cigano" },
  ]},
  { q: "Se você pudesse escolher uma força agora, seria...", opts: [
    { t: "Coragem para enfrentar qualquer coisa", l: "caboclo" }, { t: "Sabedoria para entender tudo com calma", l: "pretovelho" },
    { t: "Nunca perder a alegria de viver", l: "crianca" }, { t: "Abrir qualquer porta fechada", l: "exu" },
    { t: "Atrair sorte e prosperidade", l: "cigano" },
  ]},
];

function calcularResultado(respostas) {
  const contagem = {};
  respostas.forEach((l) => { contagem[l] = (contagem[l] || 0) + 1; });
  const ordenado = Object.entries(contagem).sort((a, b) => b[1] - a[1]);
  return ordenado[0] ? ordenado[0][0] : "caboclo";
}

/* ---------------------------------------------------------
   BARALHO CIGANO (36 cartas)
--------------------------------------------------------- */
const CIGANO_DECK = [
  { n: 1, nome: "Cavaleiro", kw: "novidade, notícia rápida, chegada", texto: "Uma notícia ou uma pessoa nova está chegando rápido na sua vida, trazendo movimento para a situação que você perguntou.", acao: "Fique atenta às notícias que chegarem nos próximos dias, e não hesite em responder rápido.", v: 1 },
  { n: 2, nome: "Trevo", kw: "sorte pequena, oportunidade rápida", texto: "Aparece uma chance de sorte, mas costuma ser passageira. Vale aproveitar rápido, sem deixar escapar.", acao: "Aproveite a oportunidade que aparecer, mesmo pequena, sem esperar o momento perfeito.", v: 1 },
  { n: 3, nome: "Navio", kw: "viagem, distância, mudança", texto: "Fala de uma jornada, física ou emocional, algo que tira você do lugar em que está agora.", acao: "Se puder, dê o primeiro passo em direção a essa mudança ou viagem que está no ar.", v: 0 },
  { n: 4, nome: "Casa", kw: "família, lar, segurança", texto: "Representa a base, a família ou o ambiente doméstico, e como você se sente dentro desse espaço.", acao: "Cuide da sua base, do seu lar ou da sua família antes de olhar para fora.", v: 1 },
  { n: 5, nome: "Árvore", kw: "saúde, raízes, crescimento lento", texto: "Fala de algo que cresce com o tempo, incluindo a saúde do corpo e as raízes profundas de uma situação.", acao: "Tenha paciência com esse processo, ele cresce com o tempo e não pode ser apressado.", v: 0 },
  { n: 6, nome: "Nuvens", kw: "confusão, dúvida, instabilidade", texto: "Mostra um momento de confusão ou incerteza, onde ainda não está tudo claro.", acao: "Espere a poeira baixar antes de tomar qualquer decisão importante.", v: -1 },
  { n: 7, nome: "Cobra", kw: "complicação, sedução, cuidado", texto: "Aponta para algo enrolado, que pode complicar mais do que parece à primeira vista, ou uma pessoa que merece atenção redobrada.", acao: "Redobre a atenção com essa pessoa ou situação, e não entregue confiança demais tão rápido.", v: -1 },
  { n: 8, nome: "Caixão", kw: "fim de ciclo, transformação", texto: "Marca o fim de algo que precisa mesmo terminar, para abrir espaço para o que vem depois.", acao: "Aceite que algo precisa terminar, e comece a soltar antes que isso te canse ainda mais.", v: -1 },
  { n: 9, nome: "Buquê", kw: "presente, gentileza, convite", texto: "Traz uma energia de gentileza e reconhecimento, como um presente ou um convite bem-vindo.", acao: "Receba esse gesto de bom coração, e permita-se aproveitar esse momento gentil.", v: 1 },
  { n: 10, nome: "Foice", kw: "corte, decisão rápida", texto: "Indica uma decisão que precisa ser tomada rápido, cortando o que já não serve mais.", acao: "Tome a decisão que está evitando, cortando de vez o que já não serve.", v: -1 },
  { n: 11, nome: "Chicote", kw: "repetição, conflito, discussão", texto: "Fala de uma situação que se repete, geralmente um conflito ou uma discussão que volta várias vezes.", acao: "Quebre esse ciclo de repetição conversando de um jeito diferente do que já tentou antes.", v: -1 },
  { n: 12, nome: "Pássaros", kw: "conversa, fofoca, nervosismo", texto: "Representa conversas, trocas de mensagens, e às vezes uma certa ansiedade no ar.", acao: "Cuide bem das suas palavras agora, e desconfie de fofoca ou informação não confirmada.", v: 0 },
  { n: 13, nome: "Criança", kw: "início, inocência, algo pequeno", texto: "Mostra um começo simples e puro, ou alguém jovem envolvido na situação.", acao: "Dê o primeiro passo, mesmo pequeno, sem tentar resolver tudo de uma vez.", v: 1 },
  { n: 14, nome: "Raposa", kw: "astúcia, cuidado no trabalho", texto: "Pede atenção redobrada, especialmente no trabalho, porque alguém pode estar sendo mais estratégico do que parece.", acao: "Fique mais atenta no ambiente de trabalho, e não revele todos os seus planos ainda.", v: -1 },
  { n: 15, nome: "Urso", kw: "força, proteção, ciúme", texto: "Fala de uma figura forte e protetora, mas que também pode carregar ciúme ou possessividade.", acao: "Reconheça quem está te protegendo de verdade, mas fique de olho no ciúme em excesso.", v: 0 },
  { n: 16, nome: "Estrela", kw: "esperança, clareza, guia", texto: "Traz esperança e um caminho mais claro se abrindo, como uma luz guiando a próxima etapa.", acao: "Confie e siga na direção dessa esperança, ela está te mostrando o caminho certo.", v: 1 },
  { n: 17, nome: "Cegonha", kw: "mudança, novo começo", texto: "Anuncia uma mudança importante chegando, muitas vezes ligada a recomeços e novidades grandes.", acao: "Prepare-se para essa mudança chegando, ela pede flexibilidade da sua parte.", v: 1 },
  { n: 18, nome: "Cachorro", kw: "amizade, lealdade", texto: "Representa alguém leal e de confiança do seu lado, ou o valor de cuidar dessa amizade.", acao: "Valorize quem está do seu lado com lealdade, e seja leal de volta.", v: 1 },
  { n: 19, nome: "Torre", kw: "isolamento, burocracia, solidão", texto: "Fala de um momento mais solitário, ou de algo ligado a instituições, como trabalho formal ou papelada.", acao: "Aceite um tempo mais sozinha agora, e resolva a parte burocrática com calma.", v: -1 },
  { n: 20, nome: "Jardim", kw: "vida social, evento público", texto: "Aponta para encontros sociais, festas ou situações que envolvem várias pessoas ao mesmo tempo.", acao: "Aproveite os encontros sociais que estão surgindo, eles podem trazer boas oportunidades.", v: 1 },
  { n: 21, nome: "Montanha", kw: "obstáculo, bloqueio", texto: "Mostra um obstáculo real no caminho, algo que exige esforço extra para ser superado.", acao: "Não desista diante do obstáculo, ele exige esforço, mas não é impossível de superar.", v: -1 },
  { n: 22, nome: "Caminhos", kw: "escolha, decisão importante", texto: "Indica que existe mais de um caminho possível, e uma escolha importante precisa ser feita.", acao: "Escolha um caminho com convicção, ficar no meio das duas opções é o que mais cansa.", v: 0 },
  { n: 23, nome: "Ratos", kw: "desgaste, perda lenta, estresse", texto: "Fala de algo se desgastando pouco a pouco, como um estresse constante ou uma perda de energia lenta.", acao: "Identifique o que está te desgastando pouco a pouco, e corte isso antes que piore.", v: -1 },
  { n: 24, nome: "Coração", kw: "amor, sentimento verdadeiro", texto: "Representa o amor de verdade, o sentimento genuíno que está por trás da sua pergunta.", acao: "Escute o que o seu próprio sentimento está dizendo, sem medo de assumir o que sente.", v: 1 },
  { n: 25, nome: "Anel", kw: "compromisso, contrato, união", texto: "Fala de compromisso, seja em um relacionamento, uma parceria ou um contrato importante.", acao: "Pense bem antes de assumir esse compromisso, mas não tenha medo dele se for de coração.", v: 1 },
  { n: 26, nome: "Livro", kw: "segredo, conhecimento a descobrir", texto: "Indica que existe algo ainda não revelado, um segredo ou um conhecimento que falta ser descoberto.", acao: "Busque a informação que está faltando antes de tirar qualquer conclusão.", v: 0 },
  { n: 27, nome: "Carta", kw: "mensagem, notícia, comunicação", texto: "Fala de uma mensagem importante chegando, ou da necessidade de comunicar algo com mais clareza.", acao: "Envie ou espere essa mensagem importante, e seja clara ao se comunicar.", v: 0 },
  { n: 28, nome: "Homem", kw: "figura masculina", texto: "Representa uma figura masculina importante dentro da situação que você perguntou.", acao: "Preste atenção no papel dessa figura masculina dentro da situação.", v: 0 },
  { n: 29, nome: "Mulher", kw: "figura feminina", texto: "Representa uma figura feminina importante dentro da situação que você perguntou.", acao: "Preste atenção no papel dessa figura feminina dentro da situação.", v: 0 },
  { n: 30, nome: "Lírio", kw: "paz, maturidade, harmonia familiar", texto: "Traz paz e maturidade emocional, muitas vezes ligada à harmonia dentro da família.", acao: "Busque a maturidade emocional para trazer paz para dentro de casa.", v: 1 },
  { n: 31, nome: "Sol", kw: "sucesso, vitalidade, clareza", texto: "É uma das cartas mais positivas do baralho, trazendo sucesso, energia boa e clareza sobre o momento.", acao: "Aproveite esse momento de sucesso e clareza, é hora de agir com confiança.", v: 1 },
  { n: 32, nome: "Lua", kw: "emoção, reconhecimento, intuição", texto: "Fala de emoções intensas e também de reconhecimento, como um esforço que está sendo notado.", acao: "Reconheça o esforço que já fez até aqui, ele está sendo notado.", v: 0 },
  { n: 33, nome: "Chave", kw: "solução, resposta certa", texto: "Indica que a solução está próxima, uma resposta certa que resolve o que estava travado.", acao: "A solução está próxima, continue no caminho que já está seguindo.", v: 1 },
  { n: 34, nome: "Peixes", kw: "dinheiro, abundância, fluxo", texto: "Fala diretamente de dinheiro e abundância, um fluxo financeiro se movendo na sua direção ou precisando de atenção.", acao: "Cuide bem do seu dinheiro agora, tanto para guardar quanto para deixar entrar.", v: 1 },
  { n: 35, nome: "Âncora", kw: "estabilidade, segurança no trabalho", texto: "Representa estabilidade, principalmente no trabalho, algo firme onde você pode se apoiar.", acao: "Busque estabilidade, principalmente no trabalho, antes de arriscar algo novo.", v: 1 },
  { n: 36, nome: "Cruz", kw: "destino, fardo, algo inevitável", texto: "Fala de algo que parece destino, um fardo ou uma situação que precisa ser aceita e atravessada com fé.", acao: "Aceite esse momento com fé, e atravesse com a calma de quem sabe que vai passar.", v: -1 },
];

const CATEGORIAS_CIGANO = [
  { id: "amor", label: "Amor", abertura: "sobre o seu coração" },
  { id: "dinheiro", label: "Dinheiro", abertura: "sobre a sua vida financeira" },
  { id: "familia", label: "Família", abertura: "sobre a sua família" },
  { id: "vida", label: "Vida", abertura: "sobre esse momento da sua vida" },
];

function embaralharCigano() {
  const d = [...CIGANO_DECK];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d.slice(0, 3);
}

const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const dropPeriod = (s) => s.replace(/\.\s*$/, "");

function respostaDireta(situacao, conselho, tendencia) {
  const score = tendencia.v * 2 + conselho.v * 1 + situacao.v * 0.5;
  if (score >= 1.5) return "Sim. Pelo que as cartas mostram juntas, o caminho está favorável para o que você perguntou.";
  if (score <= -1.5) return "Não é o que as cartas indicam agora. Ainda existe um obstáculo real no caminho.";
  return "Ainda não está definido. As cartas mostram que vai depender diretamente da atitude que você tomar a partir de agora.";
}

function buildCiganoReading(categoria, pergunta, cartas) {
  const [situacao, conselho, tendencia] = cartas;
  const hasQuestion = pergunta && pergunta.trim().length > 0;

  const intro = hasQuestion
    ? `Você me perguntou: "${pergunta.trim()}". Vou olhar isso pelo baralho cigano, pensando ${categoria.abertura}.`
    : `Vamos olhar pelo baralho cigano, pensando ${categoria.abertura}.`;

  const p1 = `Na carta da Situação, apareceu ${situacao.nome}. ${situacao.texto} Isso me mostra bem o momento em que você está agora, ligado a ${situacao.kw}.`;
  const p2 = `Já na carta do Conselho, veio ${conselho.nome}. ${conselho.texto} O baralho está dizendo que o melhor caminho agora é prestar atenção nisso e agir com cuidado, sem se apressar, ligado a ${conselho.kw}.`;
  const p3 = `E fechando a tiragem, na carta da Tendência, surge ${tendencia.nome}. ${tendencia.texto} Então tudo aponta para um caminho relacionado a ${tendencia.kw}, se as coisas seguirem como estão agora.`;

  const conclusao = `Juntando as três cartas, ${situacao.nome} mostra onde você está agora, ${conselho.nome} aponta o que fazer com isso, e ${tendencia.nome} mostra para onde essa energia tende a ir se você seguir esse conselho. É esse conjunto, e não uma carta isolada, que forma a resposta completa para o que você perguntou.`;

  const resposta = respostaDireta(situacao, conselho, tendencia);

  const direcao = [
    `O que eu sugiro para agora: ${lowerFirst(conselho.acao)}`,
    `E olhando para onde isso tende a chegar: ${lowerFirst(tendencia.acao)}`,
  ];

  const nota = "O baralho cigano costuma ser lido em conjunto, uma carta ajudando a explicar a outra, e por isso normalmente não se usa carta invertida como no tarô.";

  return { intro, corpo: [p1, p2, p3], conclusao, resposta, direcao, nota };
}

function ciganoReadingToText(r) {
  return [r.intro, "Resposta direta:", r.resposta, r.corpo.join(" "), r.conclusao, "O que fazer agora:", r.direcao.join(" "), r.nota].filter(Boolean).join(" ");
}

/* ---------------------------------------------------------
   ENSINAMENTOS DO DIA
--------------------------------------------------------- */
const ENSINAMENTOS = [
  "Humildade não é se diminuir. É saber a hora de escutar antes de falar.",
  "Toda encruzilhada tem mais de um caminho. Você só precisa escolher um e começar a andar.",
  "A calma de um Preto Velho não é fraqueza. É a força de quem já viveu o suficiente para não ter pressa.",
  "Antes de pedir abertura de caminhos, olhe se você mesma não está carregando peso que já podia ter soltado.",
  "A alegria de uma criança não ignora a dor do mundo. Ela só escolhe não morar nela.",
  "Proteção de verdade começa dentro de casa, com os pensamentos que você deixa entrar.",
  "Um rio não briga com a pedra no caminho. Ele contorna, com paciência, e segue.",
  "Gratidão dita nos dias fáceis é bonita. Gratidão dita nos dias difíceis é que transforma.",
  "A força de um Boiadeiro está em nunca soltar a rédea, mesmo quando o caminho é longo.",
  "Nem toda tempestade vem para destruir. Algumas vêm só para limpar o que já estava pesado demais.",
  "Fé não é ausência de medo. É continuar caminhando mesmo com ele do seu lado.",
  "Cuide da sua palavra como cuida do seu corpo. As duas carregam a sua energia para onde você vai.",
  "A sabedoria mais simples costuma vir de quem menos fala.",
  "Você não precisa entender todo o caminho para dar o próximo passo.",
];
function ensinamentoDoDia() {
  const dia = Math.floor(Date.now() / 86400000);
  return ENSINAMENTOS[dia % ENSINAMENTOS.length];
}


function SacredIcon({ type }) {
  const shapes = {
    arco: <><path d="M30 15 Q55 50 30 85" /><line x1="30" y1="15" x2="30" y2="85" /><line x1="30" y1="50" x2="80" y2="50" /></>,
    cachimbo: <><path d="M25 60 Q25 40 45 40 L70 40" /><rect x="65" y="28" width="18" height="24" rx="2" /><line x1="20" y1="65" x2="30" y2="55" /></>,
    flor: <><circle cx="50" cy="50" r="8" /><circle cx="50" cy="30" r="9" /><circle cx="50" cy="70" r="9" /><circle cx="30" cy="50" r="9" /><circle cx="70" cy="50" r="9" /></>,
    encruzilhada: <><line x1="20" y1="20" x2="80" y2="80" /><line x1="80" y1="20" x2="20" y2="80" /><circle cx="50" cy="50" r="6" /></>,
    leque: <><path d="M50 80 L20 30 M50 80 L35 20 M50 80 L50 15 M50 80 L65 20 M50 80 L80 30" /><path d="M20 30 Q50 10 80 30" /></>,
    laco: <><path d="M20 70 Q20 30 55 30 Q85 30 80 55 Q76 72 55 62" /></>,
    moeda: <><circle cx="50" cy="50" r="26" /><circle cx="50" cy="50" r="14" /></>,
    cajado: <><line x1="50" y1="10" x2="50" y2="88" /><circle cx="50" cy="14" r="8" /></>,
    espada: <><line x1="50" y1="10" x2="50" y2="70" /><line x1="35" y1="25" x2="65" y2="25" /><rect x="42" y="70" width="16" height="16" /></>,
    machado: <><line x1="50" y1="15" x2="50" y2="85" /><path d="M50 15 Q30 15 30 35 Q30 45 50 40" /><path d="M50 15 Q70 15 70 35 Q70 45 50 40" /></>,
    concha: <><path d="M20 60 Q50 20 80 60 Q65 80 50 60 Q35 80 20 60 Z" /></>,
    espelho: <><circle cx="50" cy="42" r="24" /><line x1="50" y1="66" x2="50" y2="88" /><line x1="38" y1="88" x2="62" y2="88" /></>,
    raio: <><polyline points="55,10 35,50 55,50 40,90 70,45 52,45 62,10" /></>,
    palha: <><line x1="50" y1="20" x2="30" y2="85" /><line x1="50" y1="20" x2="42" y2="88" /><line x1="50" y1="20" x2="50" y2="88" /><line x1="50" y1="20" x2="58" y2="88" /><line x1="50" y1="20" x2="70" y2="85" /></>,
    vassoura: <><line x1="50" y1="10" x2="50" y2="55" /><line x1="30" y1="88" x2="45" y2="55" /><line x1="40" y1="88" x2="48" y2="55" /><line x1="50" y1="88" x2="50" y2="55" /><line x1="60" y1="88" x2="52" y2="55" /><line x1="70" y1="88" x2="55" y2="55" /></>,
  };
  return <svg className="sicon" viewBox="0 0 100 100">{shapes[type] || <circle cx="50" cy="50" r="20" />}</svg>;
}

function Aviso() {
  return (
    <div className="aviso">
      <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
      <span>{AVISO}</span>
    </div>
  );
}

/* ---------------------------------------------------------
   COMPONENTE RAIZ
--------------------------------------------------------- */
export default function RaizesDeLuz() {
  const [aba, setAba] = useState("inicio");
  const [favoritos, setFavoritos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("raizes-favoritos", false);
        if (res && res.value) setFavoritos(JSON.parse(res.value));
      } catch (e) { /* sem favoritos ainda */ }
      setLoaded(true);
    })();
  }, []);

  const salvarFavoritos = async (next) => {
    setFavoritos(next);
    try { await window.storage.set("raizes-favoritos", JSON.stringify(next), false); } catch (e) {}
  };

  const toggleFavorito = (key) => {
    const existe = favoritos.includes(key);
    salvarFavoritos(existe ? favoritos.filter((f) => f !== key) : [...favoritos, key]);
  };

  if (!loaded) return null;

  return (
    <div className="rroot">
      <GlobalStyle />
      <div className="rhead">
        <h1>Raízes de Luz</h1>
        <p>estudos e consultas do universo da Umbanda</p>
      </div>
      <div className="rdivider"><span className="rline" /><Flame size={14} /><span className="rline r" /></div>

      <div className="rnav">
        <button className={aba === "inicio" ? "active" : ""} onClick={() => setAba("inicio")}><Sun size={13} /> Início</button>
        <button className={aba === "estudos" ? "active" : ""} onClick={() => setAba("estudos")}><BookOpen size={13} /> Estudos</button>
        <button className={aba === "vivencia" ? "active" : ""} onClick={() => setAba("vivencia")}><Droplet size={13} /> Vivência</button>
        <button className={aba === "afinidade" ? "active" : ""} onClick={() => setAba("afinidade")}><Star size={13} /> Afinidade</button>
        <button className={aba === "cigano" ? "active" : ""} onClick={() => setAba("cigano")}><Shuffle size={13} /> Cigano</button>
      </div>

      {aba === "inicio" && <Inicio favoritos={favoritos} onIrPara={setAba} />}
      {aba === "estudos" && <Estudos favoritos={favoritos} toggleFavorito={toggleFavorito} />}
      {aba === "vivencia" && <Vivencia />}
      {aba === "afinidade" && <Afinidade favoritos={favoritos} toggleFavorito={toggleFavorito} />}
      {aba === "cigano" && <Cigano />}
    </div>
  );
}

function Inicio({ favoritos, onIrPara }) {
  const ensinamento = useMemo(() => ensinamentoDoDia(), []);
  const itensFavoritos = favoritos
    .map((key) => {
      const [tipo, nome] = key.split(":");
      if (tipo === "linha") return LINHAS.find((l) => l.id === nome);
      if (tipo === "orixa") return ORIXAS.find((o) => o.nome === nome);
      return null;
    })
    .filter(Boolean);

  return (
    <>
      <div className="rpanel destaque">
        <label className="rfield-label"><Feather size={12} style={{ verticalAlign: "-2px" }} /> Ensinamento do dia</label>
        <p className="ensinamento">"{ensinamento}"</p>
      </div>

      <div className="atalhos">
        <button className="atalho" onClick={() => onIrPara("estudos")}><BookOpen size={20} /><span>Estudar as linhas e os Orixás</span></button>
        <button className="atalho" onClick={() => onIrPara("afinidade")}><Star size={20} /><span>Descobrir minha afinidade</span></button>
        <button className="atalho" onClick={() => onIrPara("cigano")}><Shuffle size={20} /><span>Fazer uma consulta cigana</span></button>
        <button className="atalho" onClick={() => onIrPara("vivencia")}><Droplet size={20} /><span>Ver banhos, preces e oferendas</span></button>
      </div>

      {itensFavoritos.length > 0 && (
        <div className="rpanel">
          <label className="rfield-label"><BookmarkCheck size={12} style={{ verticalAlign: "-2px" }} /> Seus favoritos</label>
          <div className="fav-lista">
            {itensFavoritos.map((item, i) => (
              <div className="fav-item" key={i}>
                <SacredIcon type={item.icon} />
                <span>{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Aviso />
    </>
  );
}

/* ---------------------------------------------------------
   VIVÊNCIA
--------------------------------------------------------- */
function Vivencia() {
  const [sub, setSub] = useState("oferendas");

  return (
    <>
      <div className="subnav">
        <button className={sub === "oferendas" ? "active" : ""} onClick={() => setSub("oferendas")}>Oferendas</button>
        <button className={sub === "banhos" ? "active" : ""} onClick={() => setSub("banhos")}>Banhos</button>
        <button className={sub === "preces" ? "active" : ""} onClick={() => setSub("preces")}>Preces</button>
      </div>

      {sub === "oferendas" && (
        <div className="rpanel">
          <p className="paragrafo">{OFERENDAS_INTRO}</p>
          {OFERENDAS_LISTA.map((o, i) => (
            <div className="oferenda-item" key={i}>
              <b>{o.entidade}</b>
              <span><b className="mini">Elementos</b> {o.elementos}</span>
              <span><b className="mini">Local</b> {o.local}</span>
            </div>
          ))}
          <p className="paragrafo eco"><Droplet size={13} style={{ verticalAlign: "-2px", marginRight: 5 }} />{OFERENDAS_ECO}</p>
          <Aviso />
        </div>
      )}

      {sub === "banhos" && (
        <div className="grid-cards">
          {BANHOS.map((b, i) => (
            <div className="banho-card" key={i}>
              <div className="banho-nome"><Droplet size={15} /> {b.nome}</div>
              <p className="paragrafo">{b.intencao}</p>
              <span><b className="mini">Ervas</b> {b.ervas}</span>
              <span><b className="mini">Como usar</b> {b.modo}</span>
              <span className="cuidado"><b className="mini">Cuidado</b> {b.cuidado}</span>
            </div>
          ))}
          <Aviso />
        </div>
      )}

      {sub === "preces" && (
        <div className="rpanel">
          {PRECES.map((p, i) => (
            <div className="prece-item" key={i}>
              <label className="rfield-label">{p.titulo}</label>
              <p className="paragrafo prece-texto">{p.texto}</p>
            </div>
          ))}
          <Aviso />
        </div>
      )}
    </>
  );
}


function Estudos({ favoritos, toggleFavorito }) {
  const [sub, setSub] = useState("linhas");
  const [aberto, setAberto] = useState(null);

  return (
    <>
      <div className="subnav">
        <button className={sub === "linhas" ? "active" : ""} onClick={() => { setSub("linhas"); setAberto(null); }}>Linhas de Trabalho</button>
        <button className={sub === "orixas" ? "active" : ""} onClick={() => { setSub("orixas"); setAberto(null); }}>Os 9 Orixás</button>
        <button className={sub === "glossario" ? "active" : ""} onClick={() => { setSub("glossario"); setAberto(null); }}>Glossário</button>
      </div>

      {sub === "linhas" && (
        <div className="grid-cards">
          {LINHAS.map((l) => {
            const key = `linha:${l.id}`;
            const isFav = favoritos.includes(key);
            const isOpen = aberto === l.id;
            return (
              <div className={"entidade-card" + (isOpen ? " open" : "")} key={l.id}>
                <div className="entidade-head" onClick={() => setAberto(isOpen ? null : l.id)}>
                  <SacredIcon type={l.icon} />
                  <div>
                    <div className="entidade-nome">{l.nome}</div>
                    <div className="entidade-sub">{l.subtitulo}</div>
                  </div>
                  <button className="fav-btn" onClick={(e) => { e.stopPropagation(); toggleFavorito(key); }}>
                    {isFav ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                </div>
                {isOpen && (
                  <div className="entidade-body">
                    <p>{l.texto}</p>
                    <div className="tags-info">
                      <span><b>Saudação</b> {l.saudacao}</span>
                      <span><b>Cor</b> {l.cor}</span>
                      <span><b>Dia</b> {l.dia}</span>
                      <span><b>Elemento</b> {l.elemento}</span>
                    </div>
                    {FALANGES[l.id] && (
                      <div className="falanges">
                        <label className="rfield-label" style={{ marginTop: 14 }}>Entidades conhecidas dessa linha</label>
                        {FALANGES[l.id].map((f, fi) => (
                          <div className="falange-item" key={fi}>
                            <b>{f.nome}</b>
                            <span>{f.texto}</span>
                          </div>
                        ))}
                        <p className="paragrafo eco" style={{ marginTop: 10 }}>Existem muitas outras entidades além dessas, e os nomes e histórias variam de terreiro para terreiro. Esta é só uma introdução.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <Aviso />
        </div>
      )}

      {sub === "orixas" && (
        <div className="grid-cards">
          {ORIXAS.map((o) => {
            const key = `orixa:${o.nome}`;
            const isFav = favoritos.includes(key);
            const isOpen = aberto === o.nome;
            return (
              <div className={"entidade-card" + (isOpen ? " open" : "")} key={o.nome}>
                <div className="entidade-head" onClick={() => setAberto(isOpen ? null : o.nome)}>
                  <SacredIcon type={o.icon} />
                  <div>
                    <div className="entidade-nome">{o.nome}</div>
                    <div className="entidade-sub">{o.dominio}</div>
                  </div>
                  <button className="fav-btn" onClick={(e) => { e.stopPropagation(); toggleFavorito(key); }}>
                    {isFav ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                </div>
                {isOpen && (
                  <div className="entidade-body">
                    <p>{o.texto}</p>
                    <div className="tags-info">
                      <span><b>Cor</b> {o.cor}</span>
                      <span><b>Dia</b> {o.dia}</span>
                      <span><b>Elemento</b> {o.elemento}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {sub === "glossario" && (
        <div className="rpanel">
          {GLOSSARIO.map((g, i) => (
            <div className="glossario-item" key={i}>
              <b>{g.termo}</b>
              <span>{g.def}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------
   AFINIDADE (quiz)
--------------------------------------------------------- */
function Afinidade({ favoritos, toggleFavorito }) {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [resultado, setResultado] = useState(null);

  const escolher = (linha) => {
    const next = [...respostas, linha];
    if (passo + 1 < QUIZ.length) {
      setRespostas(next);
      setPasso(passo + 1);
    } else {
      setResultado(calcularResultado(next));
    }
  };

  const recomecar = () => { setPasso(0); setRespostas([]); setResultado(null); };

  if (resultado) {
    const linha = LINHAS.find((l) => l.id === resultado);
    const key = `linha:${linha.id}`;
    const isFav = favoritos.includes(key);
    return (
      <div className="rpanel resultado">
        <label className="rfield-label">Sua afinidade de hoje</label>
        <div className="resultado-icon"><SacredIcon type={linha.icon} /></div>
        <h3>{linha.nome}</h3>
        <p className="paragrafo">{linha.subtitulo}</p>
        <p className="paragrafo">{linha.texto}</p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <button className="rbtn ghost" onClick={() => toggleFavorito(key)}>
            {isFav ? <BookmarkCheck size={14} /> : <Bookmark size={14} />} {isFav ? "Salvo nos favoritos" : "Salvar nos favoritos"}
          </button>
          <button className="rbtn primary" onClick={recomecar}>Refazer o quiz</button>
        </div>
        <Aviso />
      </div>
    );
  }

  const questao = QUIZ[passo];
  return (
    <div className="rpanel">
      <label className="rfield-label">Pergunta {passo + 1} de {QUIZ.length}</label>
      <p className="quiz-pergunta">{questao.q}</p>
      <div className="quiz-opts">
        {questao.opts.map((o, i) => (
          <button key={i} className="quiz-opt" onClick={() => escolher(o.l)}>{o.t}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CIGANO (consultas)
--------------------------------------------------------- */
function Cigano() {
  const [categoriaId, setCategoriaId] = useState("vida");
  const [pergunta, setPergunta] = useState("");
  const [cartas, setCartas] = useState(null);
  const [revelado, setRevelado] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("raizes-cigano-historico", false);
        if (res && res.value) setHistorico(JSON.parse(res.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  const salvarHistorico = async (entry) => {
    const next = [entry, ...historico].slice(0, 20);
    setHistorico(next);
    try { await window.storage.set("raizes-cigano-historico", JSON.stringify(next), false); } catch (e) {}
  };

  const categoria = CATEGORIAS_CIGANO.find((c) => c.id === categoriaId);

  const consultar = () => {
    const novasCartas = embaralharCigano();
    setCartas(novasCartas);
    setRevelado(0);
    salvarHistorico({
      data: new Date().toLocaleString("pt-BR"),
      categoria: categoria.label,
      pergunta: pergunta || "sem pergunta registrada",
      cartas: novasCartas.map((c) => c.nome),
    });
  };

  const revelarProxima = () => setRevelado((r) => Math.min(r + 1, 3));

  const leitura = useMemo(() => {
    if (!cartas || revelado < 3) return null;
    return buildCiganoReading(categoria, pergunta, cartas);
  }, [cartas, revelado, categoria, pergunta]);

  const posicoes = ["Situação", "Conselho", "Tendência"];

  if (!loaded) return null;

  return (
    <>
      <div className="rpanel">
        <label className="rfield-label">Sobre o que você quer consultar?</label>
        <div className="chips-r">
          {CATEGORIAS_CIGANO.map((c) => (
            <button key={c.id} className={"chip-r" + (categoriaId === c.id ? " active" : "")} onClick={() => setCategoriaId(c.id)}>{c.label}</button>
          ))}
        </div>

        <label className="rfield-label" style={{ marginTop: 14 }}>Sua pergunta (opcional)</label>
        <input className="rinput" value={pergunta} onChange={(e) => setPergunta(e.target.value)} placeholder="O que você quer perguntar ao baralho?" />

        <div className="actions" style={{ marginTop: 14 }}>
          <button className="rbtn primary" onClick={consultar}><Shuffle size={14} /> Embaralhar e consultar</button>
        </div>
      </div>

      {cartas && (
        <>
          <div className="cigano-spread">
            {cartas.map((c, i) => (
              <div className="cigano-slot" key={c.n}>
                <div className="rpos-label">{posicoes[i]}</div>
                <div className="cigano-card" onClick={() => i === revelado && revelarProxima()}>
                  {i < revelado ? (
                    <div className="cigano-front">
                      <span className="cigano-num">{c.n}</span>
                      <span className="cigano-nome">{c.nome}</span>
                    </div>
                  ) : (
                    <div className="cigano-back"><Moon size={20} /></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {leitura && (
            <div className="rsynthesis">
              <div className="resposta-direta">
                <span className="rtag">Resposta direta</span>
                <p>{leitura.resposta}</p>
              </div>
              <p>"{leitura.intro}"</p>
              {leitura.corpo.map((p, i) => <p key={i}>{p}</p>)}
              <p>{leitura.conclusao}</p>
              <div className="rdirecao-box">
                <span className="rtag">O que fazer agora</span>
                <ul>
                  {leitura.direcao.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
              <p className="nota">{leitura.nota}</p>
            </div>
          )}
        </>
      )}

      {historico.length > 0 && (
        <div className="rpanel" style={{ marginTop: 24 }}>
          <label className="rfield-label"><BookOpen size={12} style={{ verticalAlign: "-2px" }} /> Consultas anteriores</label>
          {historico.map((h, i) => (
            <div className="hist-item" key={i}>
              <span><b>{h.categoria}</b> · {h.pergunta}</span>
              <span>{h.data}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------
   ESTILO GLOBAL
--------------------------------------------------------- */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
      :root {
        --void: #0b120e; --ink: #141f18; --ink2: #1c2b21;
        --gold: #7fa384; --gold-dim: #4f6b55; --parchment: #dde5d6; --mist: #8b9a89;
        --ember: #9a6a45; --leaf: #5b7a4a; --roxo: #8f7fc7; --roxo-dim: #5a5088;
        --terra: #a67c52; --agua: #6f9aa8;
      }
      * { box-sizing: border-box; }
      .rroot { min-height:100vh; background: radial-gradient(ellipse at 50% -10%, #182018 0%, var(--void) 55%); color:var(--parchment); font-family:'EB Garamond', serif; padding:24px 16px 60px; position:relative; }
      .rhead { text-align:center; margin-bottom:14px; }
      .rhead h1 { font-family:'Cinzel',serif; font-weight:700; letter-spacing:.1em; font-size:26px; color:var(--gold); margin:0 0 6px; }
      .rhead p { color:var(--mist); font-style:italic; margin:0; font-size:14px; }
      .rdivider { display:flex; align-items:center; justify-content:center; gap:10px; margin:14px 0 20px; color:var(--gold-dim); }
      .rline { height:1px; width:60px; background:linear-gradient(90deg, transparent, var(--gold-dim)); }
      .rline.r { background:linear-gradient(90deg, var(--gold-dim), transparent); }

      .rnav { display:flex; justify-content:center; gap:8px; margin-bottom:24px; flex-wrap:wrap; }
      .rnav button { font-family:'Cinzel',serif; font-size:11.5px; letter-spacing:.04em; background:transparent; border:1px solid var(--gold-dim); color:var(--mist); padding:8px 13px; border-radius:20px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; }
      .rnav button.active { color:var(--void); background:var(--gold); border-color:var(--gold); }

      .subnav { display:flex; justify-content:center; gap:8px; margin-bottom:18px; flex-wrap:wrap; max-width:720px; margin-left:auto; margin-right:auto; }
      .subnav button { font-family:'Cinzel',serif; font-size:11px; letter-spacing:.03em; background:transparent; border:1px solid var(--gold-dim); color:var(--mist); padding:7px 12px; border-radius:3px; cursor:pointer; }
      .subnav button.active { background:rgba(212,162,78,.15); color:var(--gold); border-color:var(--gold); }

      .rpanel { max-width:720px; margin:0 auto 20px; background:var(--ink); border:1px solid var(--gold-dim); border-radius:3px; padding:22px; }
      .rpanel.destaque { border-color:var(--gold); background:linear-gradient(180deg, rgba(212,162,78,.08), var(--ink)); }
      label.rfield-label { font-family:'Cinzel',serif; font-size:11px; letter-spacing:.07em; color:var(--mist); display:block; margin-bottom:8px; }
      .ensinamento { font-style:italic; font-size:16px; line-height:1.6; color:var(--parchment); margin:0; }
      .paragrafo { font-size:14.5px; line-height:1.65; color:var(--parchment); margin:0 0 10px; }
      .paragrafo.eco { font-size:13px; color:var(--mist); font-style:italic; border-top:1px solid var(--gold-dim); padding-top:12px; margin-top:6px; }

      .rinput { width:100%; background:var(--ink2); border:1px solid var(--gold-dim); color:var(--parchment); font-family:'EB Garamond', serif; font-size:15px; padding:10px 12px; border-radius:2px; }

      .actions { display:flex; gap:10px; margin-top:8px; flex-wrap:wrap; }
      .rbtn { font-family:'Cinzel',serif; font-size:12px; letter-spacing:.05em; padding:10px 18px; border-radius:20px; cursor:pointer; display:inline-flex; align-items:center; gap:7px; border:1px solid var(--gold); }
      .rbtn.primary { background:var(--gold); color:var(--void); }
      .rbtn.ghost { background:transparent; color:var(--gold); }

      .atalhos { max-width:720px; margin:0 auto 20px; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .atalho { background:var(--ink); border:1px solid var(--gold-dim); border-radius:3px; padding:16px 10px; color:var(--parchment); display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center; font-size:12.5px; cursor:pointer; }
      .atalho svg { color:var(--gold); }

      .fav-lista { display:flex; flex-wrap:wrap; gap:10px; }
      .fav-item { display:flex; align-items:center; gap:6px; background:var(--ink2); border:1px solid var(--gold-dim); border-radius:20px; padding:6px 12px; font-size:12.5px; }
      .fav-item svg.sicon { width:16px; height:16px; }

      .grid-cards { max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:12px; }
      .entidade-card { background:var(--ink); border:1px solid var(--gold-dim); border-radius:3px; overflow:hidden; }
      .entidade-card.open { border-color:var(--gold); }
      .entidade-head { display:flex; align-items:center; gap:14px; padding:14px 16px; cursor:pointer; }
      .entidade-nome { font-family:'Cinzel',serif; font-size:14px; color:var(--parchment); }
      .entidade-sub { font-size:12.5px; color:var(--mist); font-style:italic; }
      .fav-btn { margin-left:auto; background:transparent; border:none; color:var(--gold); cursor:pointer; flex-shrink:0; }
      .entidade-body { padding:0 16px 16px; border-top:1px solid var(--gold-dim); }
      .entidade-body p { font-size:14px; line-height:1.6; color:var(--parchment); margin:12px 0; }
      .tags-info { display:flex; flex-wrap:wrap; gap:8px; }
      .tags-info span { font-size:12px; background:var(--ink2); border-radius:12px; padding:5px 10px; color:var(--mist); }
      .tags-info b { color:var(--gold); font-family:'Cinzel',serif; font-size:10px; letter-spacing:.04em; margin-right:4px; }
      .falange-item { padding:8px 0; border-bottom:1px solid #24301f; }
      .falange-item b { display:block; font-family:'Cinzel',serif; color:var(--gold); font-size:12.5px; margin-bottom:2px; }
      .falange-item span { font-size:13.5px; color:var(--parchment); line-height:1.5; }

      .sicon { width:36px; height:36px; flex-shrink:0; }
      .sicon path, .sicon circle, .sicon line, .sicon polygon, .sicon polyline, .sicon rect, .sicon ellipse { stroke:var(--gold); stroke-width:2.6; fill:none; stroke-linecap:round; stroke-linejoin:round; }

      .glossario-item { padding:10px 0; border-bottom:1px solid #2c2416; }
      .glossario-item b { font-family:'Cinzel',serif; color:var(--gold); font-size:13px; display:block; margin-bottom:3px; }
      .glossario-item span { font-size:14px; color:var(--parchment); line-height:1.5; }

      .oferenda-item { padding:10px 0; border-bottom:1px solid #2c2416; display:flex; flex-direction:column; gap:3px; }
      .oferenda-item b { font-family:'Cinzel',serif; color:var(--terra); font-size:13px; }
      .oferenda-item span { font-size:13.5px; color:var(--parchment); }
      .mini { font-family:'Cinzel',serif; font-size:10px; letter-spacing:.04em; color:var(--mist); margin-right:5px; }

      .banho-card { background:var(--ink); border:1px solid var(--gold-dim); border-radius:3px; padding:16px; display:flex; flex-direction:column; gap:6px; }
      .banho-nome { font-family:'Cinzel',serif; color:var(--terra); font-size:14px; display:flex; align-items:center; gap:6px; }
      .banho-card span { font-size:13.5px; color:var(--parchment); }
      .banho-card .cuidado { color:var(--ember); font-size:13px; }

      .prece-item { margin-bottom:18px; }
      .prece-texto { font-style:italic; }

      .aviso { display:flex; gap:8px; font-size:12px; color:var(--mist); background:rgba(212,162,78,.06); border:1px solid var(--gold-dim); border-radius:3px; padding:10px 12px; margin-top:14px; line-height:1.5; }
      .aviso svg { color:var(--gold); }

      .quiz-pergunta { font-size:17px; color:var(--parchment); margin:0 0 16px; font-family:'Cinzel',serif; font-weight:400; }
      .quiz-opts { display:flex; flex-direction:column; gap:8px; }
      .quiz-opt { text-align:left; background:var(--ink2); border:1px solid var(--gold-dim); color:var(--parchment); padding:12px 14px; border-radius:3px; cursor:pointer; font-family:'EB Garamond', serif; font-size:14.5px; }
      .quiz-opt:hover { border-color:var(--gold); }

      .resultado { text-align:center; }
      .resultado-icon { display:flex; justify-content:center; margin:8px 0; }
      .resultado-icon .sicon { width:56px; height:56px; }
      .resultado h3 { font-family:'Cinzel',serif; color:var(--roxo); font-size:20px; margin:6px 0; }

      .chips-r { display:flex; gap:8px; flex-wrap:wrap; }
      .chip-r { font-family:'Cinzel',serif; font-size:12px; padding:8px 14px; border:1px solid var(--gold-dim); border-radius:20px; background:transparent; color:var(--mist); cursor:pointer; }
      .chip-r.active { background:var(--agua); color:var(--void); border-color:var(--agua); }

      .cigano-spread { display:flex; gap:16px; justify-content:center; margin:22px auto; max-width:720px; flex-wrap:wrap; }
      .cigano-slot { text-align:center; }
      .rpos-label { font-family:'Cinzel',serif; font-size:10.5px; letter-spacing:.06em; color:var(--mist); text-transform:uppercase; margin-bottom:8px; }
      .cigano-card { width:100px; height:150px; border:1px solid var(--gold-dim); border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      .cigano-back { color:var(--gold-dim); animation: rflicker 2.4s ease-in-out infinite; }
      @keyframes rflicker { 0%,100%{ opacity:.5; } 50%{ opacity:1; } }
      .cigano-front { display:flex; flex-direction:column; align-items:center; gap:8px; padding:8px; }
      .cigano-num { font-family:'Cinzel',serif; color:var(--agua); font-size:20px; }
      .cigano-nome { font-family:'Cinzel',serif; color:var(--parchment); font-size:12px; text-align:center; }

      .rsynthesis { max-width:720px; margin:20px auto 0; font-style:italic; color:var(--parchment); border-top:1px solid var(--gold-dim); padding-top:14px; font-size:15px; line-height:1.65; }
      .rsynthesis p { margin:0 0 10px; }
      .rsynthesis .nota { font-size:12.5px; color:var(--mist); font-style:italic; }
      .resposta-direta { background:rgba(122,111,168,.12); border:1px solid var(--roxo-dim); border-radius:3px; padding:12px 14px; margin-bottom:16px; font-style:normal; }
      .resposta-direta .rtag { display:block; font-family:'Cinzel',serif; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--roxo); margin-bottom:6px; }
      .resposta-direta p { color:var(--parchment); font-size:15px; margin:0; font-weight:600; }
      .rdirecao-box { background:rgba(127,163,132,.1); border:1px solid var(--gold-dim); border-radius:3px; padding:12px 14px; margin:14px 0; font-style:normal; }
      .rdirecao-box .rtag { display:block; font-family:'Cinzel',serif; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--gold); margin-bottom:8px; }
      .rdirecao-box ul { margin:0; padding-left:18px; }
      .rdirecao-box li { margin-bottom:6px; font-size:14.5px; color:var(--parchment); }
      .rdirecao-box li:last-child { margin-bottom:0; }

      .hist-item { display:flex; justify-content:space-between; font-size:12.5px; color:var(--mist); padding:8px 0; border-bottom:1px solid #2c2416; gap:10px; }
      .hist-item b { color:var(--gold); }

      @media (max-width: 420px) { .atalhos { grid-template-columns: 1fr; } }
    `}</style>
  );
}
