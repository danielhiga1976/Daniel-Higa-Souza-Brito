import { Project, Course } from './types';

export const COURSES: Course[] = [
  { id: 'med', name: 'Medicina', area: 'Saúde' },
  { id: 'dir', name: 'Direito', area: 'Humanas' },
  { id: 'eng_civ', name: 'Engenharia Civil', area: 'Exatas' },
  { id: 'eng_comp', name: 'Engenharia de Computação', area: 'Exatas' },
  { id: 'psi', name: 'Psicologia', area: 'Saúde' },
  { id: 'adm', name: 'Administração', area: 'Humanas' },
  { id: 'vet', name: 'Medicina Veterinária', area: 'Saúde' },
  { id: 'odo', name: 'Odontologia', area: 'Saúde' },
  { id: 'ped', name: 'Pedagogia', area: 'Humanas' },
  { id: 'arq', name: 'Arquitetura e Urbanismo', area: 'Exatas' },
  { id: 'enf', name: 'Enfermagem', area: 'Saúde' },
  { id: 'fis', name: 'Fisioterapia', area: 'Saúde' },
  { id: 'bio', name: 'Biomedicina', area: 'Saúde' },
  { id: 'edu_fis', name: 'Educação Física', area: 'Saúde' },
  { id: 'far', name: 'Farmácia', area: 'Saúde' },
  { id: 'agro', name: 'Agronomia', area: 'Exatas' },
];

const DEFAULT_MEETING_DATE = '2025-02-15';
const DEFAULT_START_DATE = '2025-03-01';
const DEFAULT_END_DATE = '2025-06-30';

// Helper to keep code clean
const createProject = (
  id: string,
  name: string,
  primaryCourse: string,
  professors: string[],
  summary: string,
  methodology: string = 'A metodologia será detalhada na primeira reunião com os alunos selecionados.',
  dates: Partial<Project> = {}
): Project => ({
  id,
  name,
  professors: professors.length > 0 ? professors : ['A definir'],
  summary: summary.length > 300 ? summary.substring(0, 297) + '...' : summary,
  methodology: methodology.length > 500 ? methodology.substring(0, 497) + '...' : methodology,
  meetingDate: dates.meetingDate || DEFAULT_MEETING_DATE,
  meetingTime: dates.meetingTime || '14:00',
  meetingLocation: dates.meetingLocation || 'Campus Aeroporto - A definir',
  activityStartDate: dates.activityStartDate || DEFAULT_START_DATE,
  activityEndDate: dates.activityEndDate || DEFAULT_END_DATE,
  primaryCourse,
  studentsPerGroup: 10,
  needsMonitor: false,
  city: 'Uberaba',
  status: 'submitted',
  createdAt: 1705000000000 + parseInt(id),
  ...dates
});

export const MOCK_PROJECTS: Project[] = [
  createProject(
    '1',
    'A LUDICIDADE NO COTIDIANO ESCOLAR DA EDUCAÇÃO INFANTIL',
    'Pedagogia',
    ['Cíntia Gomide Tosta'],
    'Investigar a ocorrência, as características e a percepção das brincadeiras no contexto do horário escolar da Educação Infantil, bem como introduzir e observar a interação das crianças com brincadeiras folclóricas.',
    'Mapear a presença e as características das brincadeiras espontâneas e dirigidas. Compreender a perspectiva das crianças e promover a vivência de brincadeiras folclóricas.',
    { meetingDate: '2025-05-12', activityStartDate: '2025-05-12', activityEndDate: '2025-06-13', meetingLocation: 'Escolas de Educação Infantil' }
  ),
  createProject(
    '2',
    'AMIGOS DO BEBÊ',
    'Enfermagem',
    ['Fabiana Cristina Pires Bernardinelli'],
    'Visa proporcionar aos alunos uma experiência enriquecedora ao integrar atividades acadêmicas com ações práticas no campo da saúde, focando no apoio educacional sobre o processo de amamentação.',
    'Os alunos aplicarão conhecimentos teóricos em situações reais no ambiente hospitalar, fomentando relacionamento interpessoal e comunicação eficaz sobre aleitamento.'
  ),
  createProject(
    '3',
    'AMIZADE COMPATÍVEL - UMA DOAÇÃO PARA A VIDA',
    'Medicina',
    ['Maria Theresa Cerávolo Laguna Abreu'],
    'Promover a conscientização da comunidade universitária e geral para cadastro/doação de medula óssea e de sangue, assegurando estoques em bancos de sangue.',
    'Realização de Simpósios, captação de novos doadores, manutenção de redes sociais e encaminhamento de doadores ao hemocentro.'
  ),
  createProject(
    '4',
    'ANATOMIA EM CORES',
    'Medicina',
    ['Erika Mondin Bulos'],
    'Disseminação de orientações gerais sobre Anatomia Humana para alunos do Ensino Fundamental por meio de atividades práticas, lúdicas e interativas.',
    'Atividades lúdicas em escolas para explicar o corpo humano de forma simplificada, despertando interesse pela saúde e ciência.'
  ),
  createProject(
    '5',
    'ANJO AZUL: PROTEGENDO PEQUENAS VIDAS',
    'Enfermagem',
    [],
    'Capacitar mães para agir em emergências envolvendo seus recém-nascidos, proporcionando conhecimento e confiança para enfrentar situações de risco como engasgos.',
    'Ensino de técnicas de desengasgo e reanimação cardiopulmonar neonatal (RCP) e demonstrações de prevenção de acidentes.'
  ),
  createProject(
    '6',
    'ARQUITETURA, DESIGN E COMUNIDADE',
    'Arquitetura e Urbanismo',
    ['Janaina de Melo Tosta Zandonaide'],
    'Aproximar o conhecimento acadêmico das demandas sociais, oferecendo serviços técnicos gratuitos (projetos e consultorias) para população vulnerável.',
    'Desenvolvimento de projetos arquitetônicos e consultorias para comunidades carentes e instituições filantrópicas.'
  ),
  createProject(
    '7',
    'ATENÇÃO INTEGRAL AO DIABÉTICO',
    'Medicina',
    ['Fernanda Oliveira Magalhães', 'Fernanda Regina Moraes'],
    'Contribuir para a formação de profissionais aptos a realizar promoção de saúde, prevenção, diagnóstico e tratamento do diabetes mellitus.',
    'Acompanhamento de pacientes, educação em saúde, prevenção de complicações e atendimento clínico supervisionado.'
  ),
  createProject(
    '8',
    'CAMINHOS PARA CONSENSO E DESJUDICIALIZAÇÃO PARA PEQUENAS EMPRESAS',
    'Direito',
    ['Katia Elisabet Washington Cespedes', 'Jussara Melo Pedrosa'],
    'Disseminar conhecimento sobre mediação e desjudicialização para pequenas empresas, capacitando alunos em métodos de resolução de conflitos.',
    'Capacitação em mediação e consultoria para pequenas empresas visando a resolução extrajudicial de conflitos.'
  ),
  createProject(
    '9',
    'CONSCIÊNCIA AMBIENTAL: DIREITO E CIDADANIA',
    'Direito',
    ['Ana Lúcia Aguiar'],
    'Estudo e produção de conhecimentos sobre ameaças a direitos constitucionais fundamentais e do meio ambiente no município.',
    'Identificação de ameaças ambientais, discussão de soluções junto à comunidade e registro de resultados.'
  ),
  createProject(
    '10',
    'CONEXÃO SAÚDE',
    'Enfermagem',
    ['Damiana Aparecida Trindade Monteiro'],
    'Integrar acadêmicos como comunicadores da saúde utilizando redes sociais e meios internos hospitalares para disseminar informações preventivas.',
    'Criação de conteúdo para redes sociais, murais e intranet hospitalar sobre prevenção de doenças e segurança do paciente.',
    { city: 'Uberlândia' }
  ),
  createProject(
    '11',
    'CRIANÇA FELIZ',
    'Odontologia',
    ['Giovanna Sousa Oliveira Chagas'],
    'Promover a saúde bucal e bem-estar de crianças em CEMEIs de Uberaba através de ações educativas e preventivas.',
    'Ações lúdicas de educação em saúde bucal, escovação supervisionada e diagnósticos em escolas municipais.'
  ),
  createProject(
    '12',
    'DIREITOAÇÃO',
    'Direito',
    ['Jussara Melo Pedrosa'],
    'Articular informações jurídicas, contábeis e administrativas para a comunidade através de Workshops de Empreendedorismo.',
    'Elaboração de cartilhas informativas e atendimento à comunidade durante eventos de empreendedorismo.'
  ),
  createProject(
    '13',
    'DIREITOS HUMANOS E A VIOLÊNCIA FAMILIAR',
    'Direito',
    ['Ana Lúcia Aguiar'],
    'Integração entre ensino e extensão no combate à violência familiar, alinhado aos ODS da ONU, especialmente igualdade de gênero.',
    'Estudo de conceitos de violência familiar e ações de conscientização e combate como direito fundamental.'
  ),
  createProject(
    '14',
    'DIREITOS HUMANOS E COMBATE À VIOLÊNCIA DOMÉSTICA',
    'Direito',
    [],
    'Promover impactos reais no combate à violência contra a mulher, alinhado aos Objetivos de Desenvolvimento Sustentável.',
    'Ações educativas e de suporte focadas em direitos humanos e proteção à mulher vítima de violência.'
  ),
  createProject(
    '15',
    'EDUCAÇÃO DIGITAL E COMUNIDADE',
    'Engenharia Civil',
    ['Cleyton Goulart'],
    'Capacitar estudantes e comunidade no uso de softwares profissionais (AutoCAD, Excel, Project, Inventor) para inclusão digital.',
    'Estudantes ministrarão capacitações práticas sobre os softwares para a comunidade e outros alunos.'
  ),
  createProject(
    '16',
    'EDUCAÇÃO EM CIDADANIA E RESPEITO À DIVERSIDADE',
    'Psicologia',
    ['Rosário Afonso Ribeiro Avelino'],
    'Promover espaço de estudo sobre diversidade, gênero e sexualidade, capacitando participantes para lidar com especificidades culturais.',
    'Discussões teóricas e práticas sobre diversidade e adequação de práticas profissionais em Psicologia e Direito.'
  ),
  createProject(
    '17',
    'EDUCAÇÃO EM INOVAÇÃO E EMPREENDEDORISMO I',
    'Administração',
    ['Kênia Arruda Martins da Costa'],
    'Conscientizar sobre inovação e empreendedorismo, permitindo a prototipagem e exploração de oportunidades percebidas.',
    'Aplicação de ferramentas e metodologias de inovação para análise de casos e criação de protótipos.'
  ),
  createProject(
    '18',
    'EDUCAÇÃO EM INOVAÇÃO E EMPREENDEDORISMO II',
    'Administração',
    ['Kênia Arruda Martins da Costa'],
    'Continuação do desenvolvimento de competências empreendedoras e de inovação com foco em modelagem de negócios.',
    'Oficinas práticas de modelagem e validação de ideias de negócios.'
  ),
  createProject(
    '19',
    'EDUCAÇÃO EM INOVAÇÃO E EMPREENDEDORISMO III',
    'Administração',
    ['Kênia Arruda Martins da Costa'],
    'Aprofundamento em estratégias de inovação e consolidação de projetos empreendedores.',
    'Mentoria para desenvolvimento final de projetos e planos de negócios inovadores.'
  ),
  createProject(
    '20',
    'EMPREENDENDO 50+',
    'Administração',
    ['Daniela Naves Sabino de Freitas'],
    'Promover a inserção profissional de pessoas com mais de 50 anos por meio de capacitação e aproximação com o mercado.',
    'Diagnóstico de carências, capacitação profissional e estruturação de comunidade de apoio para recolocação.'
  ),
  createProject(
    '21',
    'ENERGIA CONSCIENTE',
    'Engenharia Civil',
    ['Leandro Aureliano da Silva', 'William Gigo'],
    'Promover a conscientização e adoção de práticas de eficiência energética e fontes alternativas em escolas.',
    'Oficinas sobre energia solar, diagnósticos de consumo e implementação de protótipos demonstrativos em escolas.'
  ),
  createProject(
    '22',
    'ESCOLA CIDADÃ',
    'Pedagogia',
    ['Adriana Marques Aidar'],
    'Estabelecer integração efetiva entre Universidade e setores sociais, transferindo conhecimento acadêmico.',
    'Identificação de necessidades locais e organização de atividades extensionistas em conjunto com a comunidade.'
  ),
  createProject(
    '23',
    'ESPAÇOS NÃO FORMAIS DE EDUCAÇÃO',
    'Pedagogia',
    [],
    'Contagiar crianças e idosos com atividades significativas e prazerosas, humanizando ambientes não formais de educação.',
    'Realização de atividades lúdicas e recreativas em lares de idosos e instituições infantis.'
  ),
  createProject(
    '24',
    'EXERCITE HIPER',
    'Educação Física',
    ['Marina de Paiva Lemos', 'Izabela Aparecida dos Santos'],
    'Estimular a prática de atividade física e proporcionar prescrição de exercícios para hipertensos visando controle da pressão arterial.',
    'Prescrição supervisionada de exercícios aeróbios e resistidos para a comunidade com hipertensão.'
  ),
  createProject(
    '25',
    'EXTENSÃO DO SORRISO',
    'Odontologia',
    [],
    'Prestar atendimento em saúde bucal em nível terciário (hospitalar), com ações preventivas e terapêuticas para pacientes internados.',
    'Atuação na equipe multidisciplinar hospitalar para prevenção de infecções e melhora da qualidade de vida de pacientes.'
  ),
  createProject(
    '26',
    'EXTENSÃO RURAL E AGROPECUÁRIA',
    'Medicina Veterinária',
    ['Francisco Augusto Ricci Catalano', 'Guilherme Caetano Garcia'],
    'Melhorar índices zootécnicos e econômicos em propriedades rurais de Uberaba com foco na sustentabilidade.',
    'Assistência técnica a produtores rurais para gestão eficaz e uso consciente de recursos naturais.'
  ),
  createProject(
    '27',
    'FABTEC UNIUBE',
    'Engenharia de Computação',
    [],
    'Fábrica de Softwares utilizando metodologias de mercado para desenvolvimento, testes e manutenção de aplicativos.',
    'Desenvolvimento de softwares reais para demandas internas e externas, simulando ambiente de fábrica de software.'
  ),
  createProject(
    '28',
    'FÓRMULA DE CUIDADO',
    'Farmácia',
    ['Tatiana Aparecida Pereira'],
    'Ações de assistência farmacêutica, orientando sobre uso racional, armazenamento e descarte de medicamentos.',
    'Campanhas educativas e orientação individualizada sobre medicamentos para a comunidade acadêmica e externa.'
  ),
  createProject(
    '29',
    'FIEL CAMARADA',
    'Medicina Veterinária',
    ['Ian Martin'],
    'Conscientização sobre guarda responsável e controle populacional de cães e gatos para prevenção de zoonoses.',
    'Campanhas educativas sobre esterilização e posse responsável, além de ações de controle populacional.'
  ),
  createProject(
    '30',
    'INFORMAÇÃO QUE TRANSFORMA',
    'Enfermagem',
    ['Isabel Cristina Rezende Lopes'],
    'Abordar temas como contracepção, ISTs e drogas com jovens do ensino médio em parceria com o projeto Saúde na Escola.',
    'Oficinas e rodas de conversa em escolas estaduais sobre saúde do adolescente e prevenção de riscos.'
  ),
  createProject(
    '31',
    'INTEGRAÇÃO MULTIDISCIPLINAR EM SAÚDE E EDUCAÇÃO COMUNITÁRIA',
    'Medicina',
    ['Rosário Afonso Ribeiro Avelino'],
    'Unir alunos de diferentes cursos da saúde para ações colaborativas que atendam necessidades da comunidade local.',
    'Ações integradas de promoção de saúde e educação realizadas por equipes multidisciplinares.'
  ),
  createProject(
    '32',
    'JARDIM DE AROMAS',
    'Biomedicina',
    ['Tatiana Reis Vieira'],
    'Promover o uso de plantas medicinais e terapias complementares de forma segura e eficiente, alinhado às recomendações da OMS.',
    'Cultivo e educação sobre uso correto de plantas medicinais e aromáticas para saúde e bem-estar.'
  ),
  createProject(
    '33',
    'MADRE TERESA DE CALCUTÁ',
    'Direito',
    ['Jussara Melo Pedrosa'],
    'Atividades em casas de acolhimento feminino para recuperação de dependência química e vítimas de violência.',
    'Atividades ocupacionais, recreativas e de resgate da cidadania com mulheres institucionalizadas.'
  ),
  createProject(
    '34',
    'MOVIMENTO SAUDÁVEL',
    'Fisioterapia',
    ['Lidiana Simões Marques'],
    'Promoção da saúde e prevenção de lesões em corredores e caminhantes na pista da universidade.',
    'Avaliações físicas, orientações de alongamento e oficinas educativas semanais na pista de corrida.'
  ),
  createProject(
    '35',
    'PAJIE - PAZ, JUSTIÇA E INSTITUIÇÕES EFICAZES',
    'Direito',
    ['Fabiana Silva Borges'],
    'Desenvolver a cultura de paz e justiça, incentivando a não violência e o fortalecimento das relações comunitárias.',
    'Ações educativas para construção de ambientes harmônicos e participação cidadã (ODS 16).'
  ),
  createProject(
    '36',
    'PELE PROTEGIDA',
    'Enfermagem',
    ['Renata Maciel Cortes'],
    'Capacitar cuidadores para prevenção de lesão por pressão em pacientes acamados, melhorando a qualidade de vida.',
    'Palestras e oficinas práticas sobre mudança de decúbito e cuidados com a pele para cuidadores.'
  ),
  createProject(
    '37',
    'PLENAMENTE',
    'Psicologia',
    ['Marcela Silva Baccelli'],
    'Estimular a independência e autonomia de idosos por meio de atividades interativas, cognitivas e de lazer.',
    'Atividades de grupo focadas em fortalecimento cognitivo e emocional de idosos.'
  ),
  createProject(
    '38',
    'PLANTAR, EDUCAR E NUTRIR',
    'Agronomia',
    ['Harielly Marianne Costa Marques'],
    'Implantação de hortas escolares e comunitárias para incentivar alimentação saudável e educação ambiental.',
    'Criação e manutenção de hortas, oficinas de nutrição e educação ambiental em escolas e comunidades.'
  ),
  createProject(
    '39',
    'PREVENÇÃO E PROMOÇÃO DE SAÚDE NAS ESCOLAS',
    'Odontologia',
    ['Maria Angélica Hueb de Menezes Oliveira'],
    'Conscientizar sobre hábitos saudáveis de higiene e alimentação em escolas, envolvendo pais e professores.',
    'Atendimentos educativos, preventivos e encaminhamentos para saúde bucal e geral de escolares.'
  ),
  createProject(
    '40',
    'PROFISSIONALMENTE',
    'Psicologia',
    ['Janete Tranquila Gracioli'],
    'Orientação Profissional para estudantes do Ensino Médio, auxiliando na escolha consciente e autoconhecimento.',
    'Oficinas de autoconhecimento e informação profissional para jovens em fase de escolha de carreira.'
  ),
  createProject(
    '41',
    'PULSAÇÃO - SUPORTE BÁSICO DE VIDA',
    'Enfermagem',
    ['Carolina Zago Rodrigues Borges'],
    'Capacitar a comunidade em Suporte Básico de Vida (SBV) para agir em emergências como paradas cardiorrespiratórias.',
    'Treinamentos práticos de RCP e primeiros socorros para escolas e comunidade geral.'
  ),
  createProject(
    '42',
    'REDE DE CONHECIMENTOS',
    'Pedagogia',
    ['Helena Borges Ferreira'],
    'Estreitar laços entre universidade e comunidade através de subprojetos diversos de ensino e extensão.',
    'Oficinas, aulas e grupos de estudos aplicados às necessidades específicas das comunidades atendidas.'
  ),
  createProject(
    '43',
    'ROBÓTICA NAS ESCOLAS COMO INCLUSÃO SOCIAL',
    'Engenharia de Computação',
    ['Tiago Antônio Borba Oliveira'],
    'Aplicar o ensino de robótica e eletrônica básica em escolas de ensino médio.',
    'Estudantes ministram módulos de Arduino, eletrônica e programação para alunos da rede pública.'
  ),
  createProject(
    '44',
    'SAÚDE NA ESCOLA: MEDICAMENTOS E PRIMEIROS SOCORROS',
    'Farmácia',
    ['Katia Jacqueline Miguel Santos'],
    'Educar crianças e adolescentes sobre uso seguro de medicamentos e noções básicas de primeiros socorros.',
    'Ações educativas em escolas sobre riscos da automedicação e prevenção de acidentes.'
  ),
  createProject(
    '45',
    'SIMPAE - SERVIÇO DE INFORMAÇÕES SOBRE MEDICAMENTOS',
    'Farmácia',
    ['Katia Jacqueline Miguel Santos'],
    'Promoção do uso racional de medicamentos através de informações e esclarecimentos à comunidade acadêmica.',
    'Serviço de tira-dúvidas e campanhas informativas sobre medicamentos na universidade.'
  ),
  createProject(
    '46',
    'SORRISO QUE ACOLHE',
    'Odontologia',
    ['Giovanna Sousa Oliveira Chagas'],
    'Promover saúde bucal de idosos em lares de longa permanência com ações educativas e assistenciais.',
    'Atendimento preventivo e educativo adaptado para idosos institucionalizados.'
  ),
  createProject(
    '47',
    'SORRISO QUE SENTE',
    'Odontologia',
    ['Giovanna Sousa Oliveira Chagas'],
    'Saúde bucal para pessoas com deficiência visual, utilizando materiais acessíveis e táteis.',
    'Educação em saúde bucal adaptada com braille e instruções auditivas no Instituto dos Cegos.'
  ),
  createProject(
    '48',
    'TEAM BOTS',
    'Engenharia de Computação',
    ['Júlio Almeida Borges', 'Stefano Schwenck Borges Vale Vita'],
    'Inovação e desenvolvimento tecnológico com robótica e IA, focado em competições e soluções sustentáveis.',
    'Pesquisa e desenvolvimento de robôs e soluções de IA aplicadas.'
  ),
  createProject(
    '49',
    'THE STREET STORE',
    'Medicina',
    ['Valeska Guimarães Rezende da Cunha'],
    'Loja de rua temporária para doação de roupas e serviços para pessoas em situação de rua, promovendo dignidade.',
    'Organização de eventos de doação, oficinas e atendimento humanizado para população de rua.'
  ),
  createProject(
    '50',
    'UNIUBE CODERS',
    'Engenharia de Computação',
    ['Stéfano Schwenck Borges Vale Vita', 'Clênio Eduardo da Silva'],
    'Ensino de pensamento computacional e programação, além de fábrica de software para inovação.',
    'Aulas de programação e desenvolvimento de soluções tecnológicas para a comunidade.'
  ),
  createProject(
    '51',
    'UNIUBE PARCERIA AME',
    'Fisioterapia',
    ['Francisco Augusto Ricci Catalano'],
    'Suporte às atividades da Associação Mineira de Equoterapia para crianças com necessidades especiais.',
    'Apoio no manejo dos equinos e nas sessões de equoterapia da associação parceira.'
  ),
  createProject(
    '52',
    'VELHO AMIGO',
    'Odontologia',
    ['Sylas Scussel Junior'],
    'Promover saúde e qualidade de vida de idosos institucionalizados, com foco em saúde bucal e humanização.',
    'Visitas, atividades lúdicas e cuidados de saúde bucal em asilos.'
  ),
  createProject(
    '53',
    'VIVA LEVE',
    'Fisioterapia',
    ['Lidiana Simões Marques'],
    'Programa de cuidado e fortalecimento da coluna para tratamento e prevenção de dor crônica.',
    'Grupos de cinesioterapia, pilates e massoterapia para comunidade com dor lombar.'
  ),
  createProject(
    '54',
    'VIVER DIREITO',
    'Direito',
    ['Ana Lúcia Aguiar'],
    'Estudo e defesa de direitos humanos e fundamentais, identificando ameaças no município.',
    'Capacitação sobre direitos e atuação na defesa de interesses ameaçados na comunidade.'
  ),
  createProject(
    '55',
    'VIVER DIREITO II',
    'Direito',
    ['Ana Lúcia Aguiar'],
    'Continuação das ações de articulação entre conhecimento jurídico e transformação social.',
    'Aprofundamento nas ações de defesa de direitos constitucionais fundamentais.'
  ),
];
