// Dados fictícios da demonstração. As datas são relativas ao momento em que a
// demo é aberta pela primeira vez, para o feed sempre parecer recente.
export type AccessLevel = "ADMIN" | "USER";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  description: string | null;
  picture: string | null;
  access_level: AccessLevel;
  createdAt: string;
  deletedAt: string | null;
};

export type DemoAstronomer = {
  id: string;
  name: string;
  picture: string | null;
  description: string;
  birthday: string;
};

export type DemoPost = {
  id: string;
  title: string;
  description: string;
  is_accepted: boolean;
  picture: string | null;
  post_type: string;
  userId: string;
  rejection_reason: string | null;
  rejectedAt: string | null;
  createdAt: string;
};

export type DemoComment = {
  id: string;
  description: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string | null;
};

export type DemoHistory = {
  id: string;
  title: string;
  description: string;
  picture: string | null;
  userId: string;
  createdAt: string;
};

export type DemoDb = {
  version: number;
  users: DemoUser[];
  astronomers: DemoAstronomer[];
  favorites: { userId: string; astronomerId: string }[];
  posts: DemoPost[];
  comments: DemoComment[];
  likes: { userId: string; postId: string; createdAt: string }[];
  history: DemoHistory[];
};

export const DEMO_DB_VERSION = 1;

export const createSeed = (now = Date.now()): DemoDb => {
  const ago = (days: number, hours = 0) =>
    new Date(now - (days * 24 + hours) * 3600_000).toISOString();

  const users: DemoUser[] = [
    { id: "u-admin", name: "Admin Astro", email: "admin@astromaniaka.com", description: "Administrador da plataforma.", picture: null, access_level: "ADMIN", createdAt: ago(60), deletedAt: null },
    { id: "u-karol", name: "Karoline Rezende", email: "karol@astromaniaka.com", description: "Apaixonada por nebulosas e café.", picture: null, access_level: "USER", createdAt: ago(45), deletedAt: null },
    { id: "u-lucas", name: "Lucas Andrade", email: "lucas@astromaniaka.com", description: 'Astrofotógrafo amador, telescópio Dobsoniano 8".', picture: null, access_level: "USER", createdAt: ago(40), deletedAt: null },
    { id: "u-marina", name: "Marina Costa", email: "marina@astromaniaka.com", description: "Estudante de física, curiosa sobre buracos negros.", picture: null, access_level: "USER", createdAt: ago(30), deletedAt: null },
    { id: "u-pedro", name: "Pedro Lima", email: "pedro@astromaniaka.com", description: "Caçador de meteoros nas madrugadas.", picture: null, access_level: "USER", createdAt: ago(20), deletedAt: null },
    { id: "u-julia", name: "Julia Martins", email: "julia@astromaniaka.com", description: "Professora de ciências e divulgadora científica.", picture: null, access_level: "USER", createdAt: ago(10), deletedAt: null },
  ];

  const astronomers: DemoAstronomer[] = [
    { id: "a-galileu", name: "Galileu Galilei", picture: null, description: "Pai da astronomia observacional; descobriu as luas galileanas de Júpiter.", birthday: "1564-02-15T12:00:00.000Z" },
    { id: "a-kepler", name: "Johannes Kepler", picture: null, description: "Formulou as três leis do movimento planetário.", birthday: "1571-12-27T12:00:00.000Z" },
    { id: "a-copernico", name: "Nicolau Copérnico", picture: null, description: "Propôs o modelo heliocêntrico do Sistema Solar.", birthday: "1473-02-19T12:00:00.000Z" },
    { id: "a-hubble", name: "Edwin Hubble", picture: null, description: "Demonstrou a existência de outras galáxias e a expansão do universo.", birthday: "1889-11-20T12:00:00.000Z" },
    { id: "a-sagan", name: "Carl Sagan", picture: null, description: 'Astrônomo e divulgador científico, autor de "Cosmos".', birthday: "1934-11-09T12:00:00.000Z" },
    { id: "a-rubin", name: "Vera Rubin", picture: null, description: "Forneceu evidências observacionais da matéria escura.", birthday: "1928-07-23T12:00:00.000Z" },
    { id: "a-leavitt", name: "Henrietta Leavitt", picture: null, description: "Descobriu a relação período-luminosidade das estrelas Cefeidas.", birthday: "1868-07-04T12:00:00.000Z" },
    { id: "a-hawking", name: "Stephen Hawking", picture: null, description: "Físico teórico conhecido pelos estudos sobre buracos negros e a radiação Hawking.", birthday: "1942-01-08T12:00:00.000Z" },
  ];

  const favorites = [
    ["u-karol", "a-sagan"], ["u-karol", "a-rubin"],
    ["u-lucas", "a-galileu"], ["u-lucas", "a-hubble"],
    ["u-marina", "a-hawking"], ["u-marina", "a-rubin"],
    ["u-pedro", "a-kepler"],
    ["u-julia", "a-sagan"], ["u-julia", "a-leavitt"],
  ].map(([userId, astronomerId]) => ({ userId, astronomerId }));

  const post = (
    id: string, userId: string, post_type: string, title: string, description: string,
    createdAt: string, status: "ok" | "pending" | "rejected" = "ok", reason: string | null = null
  ): DemoPost => ({
    id, userId, post_type, title, description, createdAt, picture: null,
    is_accepted: status === "ok",
    rejection_reason: status === "rejected" ? reason : null,
    rejectedAt: status === "rejected" ? ago(0, 20) : null,
  });

  const posts: DemoPost[] = [
    post("p-webb", "u-karol", "NOTICIA", "James Webb revela novas galáxias primordiais", "O telescópio identificou galáxias formadas apenas 300 milhões de anos após o Big Bang.", ago(9)),
    post("p-saturno", "u-lucas", "FOTOGRAFIA", "Minha primeira foto de Saturno", "Capturei os anéis de Saturno ontem à noite com o Dobsoniano. Céu limpo em SP!", ago(8)),
    post("p-venus", "u-marina", "CURIOSITY", "Você sabia?", "Um dia em Vênus dura mais que um ano em Vênus: 243 dias terrestres contra 225.", ago(7)),
    post("p-geminidas", "u-pedro", "EVENTO", "Chuva de meteoros Gemínidas", "Pico previsto para 13 e 14 de dezembro. Melhor horário: depois da meia-noite.", ago(6)),
    post("p-dicas", "u-julia", "DICAS", "Dicas para observar sem telescópio", "Use um app de carta celeste, fuja da poluição luminosa e deixe os olhos adaptarem por 20 minutos.", ago(5)),
    post("p-telescopio", "u-karol", "PERGUNTA", "Qual telescópio para iniciante?", 'Estou pensando entre um refrator 70mm e um Dobsoniano 6". O que vocês recomendam?', ago(4)),
    post("p-clube", "u-lucas", "POST", "Clube de astronomia no bairro", "Começamos encontros mensais no parque para observação coletiva. Todos são bem-vindos!", ago(3)),
    post("p-eclipse", "u-marina", "EVENTO", "Eclipse lunar total", "Próximo eclipse lunar total visível no Brasil — preparem as câmeras!", ago(2)),
    // Posts extras para a paginação do feed aparecer
    post("p-iss", "u-pedro", "DICAS", "Como ver a Estação Espacial a olho nu", "Ela passa como um ponto brilhante e rápido, sem piscar. Apps de rastreamento avisam o horário exato.", ago(12)),
    post("p-andromeda", "u-julia", "CURIOSITY", "Andrômeda está vindo em nossa direção", "Daqui a uns 4,5 bilhões de anos ela deve se fundir com a Via Láctea. Calma, ainda dá tempo de tomar um café.", ago(13)),
    post("p-lua", "u-lucas", "FOTOGRAFIA", "Cratera Tycho no quarto crescente", "Foto feita com celular na ocular de 25mm. O segredo é travar o foco e a exposição.", ago(15)),
    post("p-marte", "u-marina", "NOTICIA", "Rover encontra novas rochas sedimentares em Marte", "As camadas sugerem que o local já teve água corrente por longos períodos.", ago(17)),
    post("p-binoculo", "u-karol", "PERGUNTA", "Binóculo 10x50 vale a pena?", "Queria algo leve para levar em viagens. Alguém usa para observar a Via Láctea?", ago(19)),
    post("p-planetario", "u-julia", "EVENTO", "Sessão gratuita no planetário", "No sábado às 16h tem sessão sobre constelações indígenas brasileiras. Bora?", ago(21)),
    // Fila de moderação
    post("p-orion", "u-pedro", "FOTOGRAFIA", "Nebulosa de Órion no quintal", "Consegui fotografar M42 com uma DSLR e tripé, 30 exposições empilhadas.", ago(1), "pending"),
    post("p-plutao", "u-julia", "OUTRO", "Plutão deveria voltar a ser planeta?", "Vamos debater: os critérios da IAU de 2006 ainda fazem sentido?", ago(0, 12), "pending"),
    post("p-starlink", "u-lucas", "NOTICIA", "Starlink atrapalhando a astrofotografia", "Cada vez mais rastros de satélites nas minhas fotos de longa exposição.", ago(0, 2), "pending"),
    post("p-venda", "u-karol", "OUTRO", "Vendo telescópio barato", "Interessados chamem no privado.", ago(1, 4), "rejected",
      "Anúncios de venda não são permitidos no feed. Que tal compartilhar uma dica de observação?"),
  ];

  const comment = (id: string, userId: string, postId: string, description: string, createdAt: string): DemoComment =>
    ({ id, userId, postId, description, createdAt, updatedAt: null });

  const comments: DemoComment[] = [
    comment("c1", "u-lucas", "p-webb", "Que incrível! O Webb não para de surpreender.", ago(8, 20)),
    comment("c2", "u-marina", "p-webb", "Será que vão achar galáxias ainda mais antigas?", ago(8, 10)),
    comment("c3", "u-karol", "p-saturno", "Ficou linda! Qual ocular você usou?", ago(7, 22)),
    comment("c4", "u-lucas", "p-saturno", "Uma de 10mm com barlow 2x.", ago(7, 20)),
    comment("c5", "u-julia", "p-venus", "Não fazia ideia disso! Vênus é muito estranho.", ago(6, 12)),
    comment("c6", "u-karol", "p-geminidas", "Vou acampar na serra pra ver!", ago(5, 18)),
    comment("c7", "u-lucas", "p-telescopio", 'Dobsoniano 6" sem dúvida, melhor custo-benefício.', ago(3, 20)),
    comment("c8", "u-pedro", "p-telescopio", "Concordo com o Lucas, abertura é tudo.", ago(3, 15)),
    comment("c9", "u-marina", "p-clube", "Qual parque? Quero participar!", ago(2, 10)),
    comment("c10", "u-julia", "p-eclipse", "Já separei o tripé.", ago(1, 5)),
    comment("c11", "u-karol", "p-iss", "Vi ontem! Passou bem em cima de casa.", ago(11, 6)),
    comment("c12", "u-marina", "p-lua", "Dá para ver os raios da cratera direitinho.", ago(14, 3)),
  ];

  const likes = [
    ["u-lucas", "p-webb"], ["u-marina", "p-webb"], ["u-pedro", "p-webb"],
    ["u-karol", "p-saturno"], ["u-julia", "p-saturno"],
    ["u-karol", "p-venus"], ["u-lucas", "p-geminidas"],
    ["u-marina", "p-dicas"], ["u-pedro", "p-dicas"],
    ["u-lucas", "p-telescopio"], ["u-julia", "p-eclipse"],
    ["u-karol", "p-lua"], ["u-pedro", "p-lua"], ["u-julia", "p-lua"],
    ["u-karol", "p-andromeda"], ["u-lucas", "p-planetario"],
  ].map(([userId, postId]) => ({ userId, postId, createdAt: ago(1) }));

  const history: DemoHistory[] = [
    { id: "h-apollo", title: "Apollo 11 pousa na Lua", description: "Em 20 de julho de 1969, Neil Armstrong e Buzz Aldrin se tornaram os primeiros humanos a pisar na Lua.", picture: null, userId: "u-admin", createdAt: ago(50) },
    { id: "h-sputnik", title: "Lançamento do Sputnik 1", description: "Em 4 de outubro de 1957, a URSS colocou em órbita o primeiro satélite artificial da história.", picture: null, userId: "u-admin", createdAt: ago(49) },
    { id: "h-gagarin", title: "Yuri Gagarin no espaço", description: "Em 12 de abril de 1961, Gagarin se tornou o primeiro ser humano a orbitar a Terra.", picture: null, userId: "u-admin", createdAt: ago(48) },
    { id: "h-hubble", title: "Telescópio Hubble é lançado", description: "Em 24 de abril de 1990, o Hubble foi levado ao espaço pelo ônibus espacial Discovery.", picture: null, userId: "u-admin", createdAt: ago(47) },
    { id: "h-buraco", title: "Primeira imagem de um buraco negro", description: "Em 2019, o Event Horizon Telescope revelou a imagem do buraco negro supermassivo de M87.", picture: null, userId: "u-admin", createdAt: ago(46) },
  ];

  return { version: DEMO_DB_VERSION, users, astronomers, favorites, posts, comments, likes, history };
};
