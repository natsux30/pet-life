// src/data/produtos.js

const todosProdutos = [
  {
    id: 1,
    title: 'Brinquedo Mordedor Kong',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600',
    images: [
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600'
    ],
    description: 'Brinquedo resistente para cães que adoram morder. Ideal para aliviar o estresse e a ansiedade.',
    descricaoCompleta: 'O Brinquedo Mordedor Kong é perfeito para cães de todas as idades que precisam gastar energia e aliviar o estresse. Fabricado em borracha atóxica de alta resistência, este brinquedo suporta até as mordidas mais fortes. Pode ser recheado com petiscos para estimular a inteligência do seu pet e proporcionar horas de diversão.',
    categoria: 'caes',
    porte: 'medio',
    idade: 'adulto',
    material: 'borracha',
    finalidade: 'morder',
    comportamentosIndicados: ['Agitado', 'Ansioso', 'Destrutivo', 'Energético'],
    contraindicadoAlergias: ['Látex', 'Borracha sintética'],
    destaque: true,
    estoque: 15,
    avaliacao: 4.8,
    numAvaliacoes: 127,
    dimensoes: '8cm x 8cm x 10cm',
    pesoProduto: '200g',
    garantia: '3 meses',
    origem: 'Brasil',
    palavrasChave: ['kong', 'mordedor', 'resistente', 'cachorro', 'dentes', 'ansiedade', 'estresse']
  },
  {
    id: 2,
    title: 'Arranhador Torre Premium',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600',
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
      'https://images.unsplash.com/photo-1559190394-df5a28a322b2?w=600'
    ],
    description: 'Arranhador com 3 níveis em sisal natural. Perfeito para gatos que adoram escalar e arranhar.',
    descricaoCompleta: 'A Torre Premium é o paraíso dos gatos! Com 3 níveis de diversão, postes revestidos em sisal natural e plataformas acolchoadas, seu felino terá o espaço perfeito para arranhar, escalar e descansar. O sisal natural ajuda a manter as unhas saudáveis e protege seus móveis.',
    categoria: 'gatos',
    porte: 'pequeno',
    idade: 'adulto',
    material: 'sisal',
    finalidade: 'arranhar',
    comportamentosIndicados: ['Curioso', 'Energético', 'Territorial', 'Independente'],
    contraindicadoAlergias: [],
    destaque: true,
    estoque: 8,
    avaliacao: 4.9,
    numAvaliacoes: 89,
    dimensoes: '40cm x 40cm x 120cm',
    pesoProduto: '8kg',
    garantia: '6 meses',
    origem: 'Brasil',
    palavrasChave: ['arranhador', 'torre', 'gato', 'sisal', 'unhas', 'escalar']
  },
  {
    id: 3,
    title: 'Bola Interativa LED',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1535298941396-316d79d0e7fa?w=600',
    images: [
      'https://images.unsplash.com/photo-1535298941396-316d79d0e7fa?w=600',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600'
    ],
    description: 'Bola com guizo e luzes LED que estimula o exercício. Ideal para pets ativos e brincalhões.',
    descricaoCompleta: 'A Bola Interativa LED é o brinquedo perfeito para pets cheios de energia. Com luzes que acendem ao quicar e um guizo interno que chama a atenção, seu pet vai se exercitar por horas. Fabricada em plástico atóxico e resistente, é segura para mordidas e brincadeiras intensas.',
    categoria: 'caes',
    porte: 'pequeno',
    idade: 'filhote',
    material: 'plastico',
    finalidade: 'exercicio',
    comportamentosIndicados: ['Agitado', 'Brincalhão', 'Curioso', 'Energético'],
    contraindicadoAlergias: ['Plástico', 'Corante alimentício'],
    destaque: false,
    estoque: 30,
    avaliacao: 4.5,
    numAvaliacoes: 56,
    dimensoes: 'Diâmetro 7cm',
    pesoProduto: '150g',
    garantia: '1 mês',
    origem: 'China',
    palavrasChave: ['bola', 'led', 'luz', 'interativo', 'exercício', 'brincadeira']
  },
  {
    id: 4,
    title: 'Ratinho com Catnip',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600',
    images: [
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600',
      'https://images.unsplash.com/photo-1526948128573-703ee1aeb2a7?w=600'
    ],
    description: 'Ratinho de pelúcia com catnip orgânico. Estimula o instinto de caça dos felinos.',
    descricaoCompleta: 'O Ratinho com Catnip é irresistível para os gatos! Recheado com catnip orgânico de alta qualidade, este brinquedo estimula os instintos naturais de caça do seu felino. A pelúcia macia é perfeita para morder, chutar e carregar pela casa. Disponível em várias cores.',
    categoria: 'gatos',
    porte: 'pequeno',
    idade: 'adulto',
    material: 'pelucia',
    finalidade: 'cacar',
    comportamentosIndicados: ['Brincalhão', 'Curioso', 'Sociável', 'Tímido'],
    contraindicadoAlergias: ['Pelúcia', 'Corante alimentício'],
    destaque: false,
    estoque: 50,
    avaliacao: 4.3,
    numAvaliacoes: 34,
    dimensoes: '5cm x 3cm x 3cm',
    pesoProduto: '30g',
    garantia: 'Sem garantia',
    origem: 'Brasil',
    palavrasChave: ['ratinho', 'catnip', 'pelúcia', 'gato', 'caça', 'orgânico']
  },
  {
    id: 5,
    title: 'Osso de Nylon Defumado',
    price: 34.90,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600'
    ],
    description: 'Osso resistente para cães fortes. Ajuda a controlar a ansiedade e o comportamento destrutivo.',
    descricaoCompleta: 'O Osso de Nylon Defumado é a solução para cães que adoram roer. Fabricado em nylon de qualidade alimentícia, é seguro e durável. O sabor defumado atrai o pet e ajuda a combater o mau hálito, além de massagear as gengivas e limpar os dentes durante a mastigação.',
    categoria: 'caes',
    porte: 'grande',
    idade: 'adulto',
    material: 'nylon',
    finalidade: 'morder',
    comportamentosIndicados: ['Ansioso', 'Destrutivo', 'Dominante', 'Energético'],
    contraindicadoAlergias: ['Nylon', 'Plástico'],
    destaque: false,
    estoque: 25,
    avaliacao: 4.6,
    numAvaliacoes: 78,
    dimensoes: '15cm x 5cm x 3cm',
    pesoProduto: '250g',
    garantia: '2 meses',
    origem: 'Brasil',
    palavrasChave: ['osso', 'nylon', 'resistente', 'cachorro', 'grande', 'ansiedade']
  },
  {
    id: 6,
    title: 'Torre de Atividades',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600'
    ],
    description: 'Torre com múltiplas atividades e esconderijos. Ideal para gatos curiosos e exploradores.',
    descricaoCompleta: 'A Torre de Atividades foi projetada para estimular a inteligência do seu gato. Com esconderijos, plataformas em diferentes alturas, brinquedos pendurados e arranhadores, seu felino nunca vai ficar entediado. Ideal para apartamentos e casas com pouco espaço.',
    categoria: 'gatos',
    porte: 'medio',
    idade: 'filhote',
    material: 'madeira',
    finalidade: 'escalar',
    comportamentosIndicados: ['Curioso', 'Energético', 'Independente', 'Brincalhão'],
    contraindicadoAlergias: ['Madeira', 'Ácaros'],
    destaque: true,
    estoque: 5,
    avaliacao: 4.7,
    numAvaliacoes: 42,
    dimensoes: '60cm x 40cm x 80cm',
    pesoProduto: '12kg',
    garantia: '6 meses',
    origem: 'Brasil',
    palavrasChave: ['torre', 'atividades', 'gato', 'escalar', 'madeira', 'explorar']
  },
  {
    id: 7,
    title: 'Corda de Algodão Trançada',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600',
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600'
    ],
    description: 'Corda resistente de algodão natural. Perfeita para cães sociáveis que adoram brincar junto.',
    descricaoCompleta: 'A Corda de Algodão Trançada é o brinquedo ideal para brincadeiras de cabo de guerra. Feita com algodão 100% natural, é macia para a boca do pet mas resistente o suficiente para suportar puxões fortes. Ajuda a fortalecer a mandíbula e cria momentos de diversão entre você e seu cão.',
    categoria: 'caes',
    porte: 'grande',
    idade: 'adulto',
    material: 'algodao',
    finalidade: 'exercicio',
    comportamentosIndicados: ['Brincalhão', 'Energético', 'Sociável', 'Agitado'],
    contraindicadoAlergias: ['Algodão', 'Poeira'],
    destaque: false,
    estoque: 40,
    avaliacao: 4.4,
    numAvaliacoes: 63,
    dimensoes: '30cm de comprimento',
    pesoProduto: '300g',
    garantia: '1 mês',
    origem: 'Brasil',
    palavrasChave: ['corda', 'algodão', 'cabo', 'guerra', 'puxar', 'natural']
  },
  {
    id: 8,
    title: 'Varinha com Penas',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1559190394-df5a28a322b2?w=600',
    images: [
      'https://images.unsplash.com/photo-1559190394-df5a28a322b2?w=600',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600'
    ],
    description: 'Varinha interativa com penas. Estimula o instinto de caça de forma segura e divertida.',
    descricaoCompleta: 'A Varinha com Penas é um clássico que nunca falha! Com penas coloridas e um sino na ponta, este brinquedo desperta imediatamente o instinto de caça do seu gato. A haste flexível permite movimentos imprevisíveis que imitam o voo de um pássaro, proporcionando exercício e diversão.',
    categoria: 'gatos',
    porte: 'pequeno',
    idade: 'idoso',
    material: 'plastico',
    finalidade: 'cacar',
    comportamentosIndicados: ['Brincalhão', 'Tímido', 'Medroso', 'Sociável'],
    contraindicadoAlergias: ['Plástico', 'Penas'],
    destaque: false,
    estoque: 60,
    avaliacao: 4.6,
    numAvaliacoes: 91,
    dimensoes: '50cm de comprimento',
    pesoProduto: '50g',
    garantia: 'Sem garantia',
    origem: 'China',
    palavrasChave: ['varinha', 'penas', 'gato', 'caça', 'interativo', 'idoso']
  },
  {
    id: 9,
    title: 'Túnel para Roedores',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600',
    images: [
      'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600',
      'https://images.unsplash.com/photo-1535298941396-316d79d0e7fa?w=600'
    ],
    description: 'Túnel flexível para exploração. Ideal para roedores curiosos e que adoram se esconder.',
    descricaoCompleta: 'O Túnel para Roedores é um brinquedo versátil que pode ser modelado em diferentes formatos. Perfeito para hamsters, porquinhos-da-índia e coelhos, estimula a exploração e oferece um esconderijo seguro. Fabricado em material lavável e resistente a roeduras.',
    categoria: 'outros',
    porte: 'pequeno',
    idade: 'filhote',
    material: 'tecido',
    finalidade: 'explorar',
    comportamentosIndicados: ['Curioso', 'Tímido', 'Brincalhão', 'Medroso'],
    contraindicadoAlergias: ['Tecido sintético', 'Ácaros'],
    destaque: false,
    estoque: 20,
    avaliacao: 4.2,
    numAvaliacoes: 18,
    dimensoes: 'Diâmetro 15cm x 50cm',
    pesoProduto: '400g',
    garantia: '1 mês',
    origem: 'China',
    palavrasChave: ['túnel', 'roedores', 'hamster', 'coelho', 'explorar', 'esconderijo']
  },
  {
    id: 10,
    title: 'Bolinha com Catnip Orgânico',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb2a7?w=600',
    images: [
      'https://images.unsplash.com/photo-1526948128573-703ee1aeb2a7?w=600',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600'
    ],
    description: 'Bolinha de tecido natural com catnip orgânico. Segura e atóxica para gatos sensíveis.',
    descricaoCompleta: 'A Bolinha com Catnip Orgânico é feita com tecido 100% natural e recheada com catnip orgânico certificado. É a opção mais segura para gatos com sensibilidades ou alergias. O formato de bolinha estimula o instinto de perseguição e pode ser usada tanto para brincadeiras solo quanto interativas.',
    categoria: 'gatos',
    porte: 'pequeno',
    idade: 'idoso',
    material: 'tecido',
    finalidade: 'cacar',
    comportamentosIndicados: ['Tímido', 'Calmo', 'Medroso', 'Sociável'],
    contraindicadoAlergias: ['Pelúcia sintética'],
    destaque: false,
    estoque: 45,
    avaliacao: 4.4,
    numAvaliacoes: 29,
    dimensoes: 'Diâmetro 4cm',
    pesoProduto: '20g',
    garantia: 'Sem garantia',
    origem: 'Brasil',
    palavrasChave: ['bolinha', 'catnip', 'orgânico', 'gato', 'natural', 'atóxico']
  },
  {
    id: 11,
    title: 'Frisbee Flexível',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600',
    images: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600'
    ],
    description: 'Frisbee flexível e seguro. Ideal para cães ativos que adoram correr e buscar.',
    descricaoCompleta: 'O Frisbee Flexível foi desenvolvido especialmente para cães. Com bordas macias que não machucam a boca do pet, é perfeito para brincadeiras ao ar livre. O material flexível absorve impactos e volta ao formato original. Disponível em cores vibrantes fáceis de localizar na grama.',
    categoria: 'caes',
    porte: 'grande',
    idade: 'adulto',
    material: 'borracha',
    finalidade: 'exercicio',
    comportamentosIndicados: ['Agitado', 'Brincalhão', 'Energético', 'Protetor'],
    contraindicadoAlergias: ['Borracha', 'Látex'],
    destaque: false,
    estoque: 35,
    avaliacao: 4.7,
    numAvaliacoes: 54,
    dimensoes: 'Diâmetro 25cm',
    pesoProduto: '180g',
    garantia: '2 meses',
    origem: 'Brasil',
    palavrasChave: ['frisbee', 'disco', 'flexível', 'cachorro', 'lançar', 'correr']
  },
  {
    id: 12,
    title: 'Mordedor Dental Filhotes',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600',
    images: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600'
    ],
    description: 'Mordedor dental que massageia a gengiva. Acalma filhotes durante a dentição.',
    descricaoCompleta: 'O Mordedor Dental para Filhotes é essencial durante a fase de dentição. Com textura especial que massageia as gengivas inflamadas e alivia o desconforto, ajuda a direcionar a mastigação para um objeto apropriado, salvando seus móveis. Pode ser resfriado na geladeira para maior alívio.',
    categoria: 'caes',
    porte: 'pequeno',
    idade: 'filhote',
    material: 'borracha',
    finalidade: 'dental',
    comportamentosIndicados: ['Ansioso', 'Destrutivo', 'Agitado', 'Brincalhão'],
    contraindicadoAlergias: ['Borracha sintética', 'Corante'],
    destaque: false,
    estoque: 50,
    avaliacao: 4.8,
    numAvaliacoes: 103,
    dimensoes: '10cm x 5cm x 2cm',
    pesoProduto: '100g',
    garantia: '1 mês',
    origem: 'Brasil',
    palavrasChave: ['dental', 'filhote', 'dentes', 'gengiva', 'massagem', 'dentição']
  },
  {
    id: 13,
    title: 'Cama Antiestresse',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1541188495357-ad2dc89487f4?w=600',
    images: [
      'https://images.unsplash.com/photo-1541188495357-ad2dc89487f4?w=600',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600'
    ],
    description: 'Cama macia que reduz ansiedade. Ideal para pets medrosos ou que sofrem com fogos.',
    descricaoCompleta: 'A Cama Antiestresse foi desenvolvida com tecido que simula o toque materno, proporcionando sensação de segurança e conforto. Ideal para pets que sofrem com ansiedade de separação, medo de fogos ou trovões. O formato circular abraça o pet e ajuda a regular a temperatura corporal.',
    categoria: 'caes',
    porte: 'medio',
    idade: 'adulto',
    material: 'pelucia',
    finalidade: 'explorar',
    comportamentosIndicados: ['Ansioso', 'Medroso', 'Tímido', 'Calmo'],
    contraindicadoAlergias: ['Pelúcia', 'Ácaros', 'Poeira'],
    destaque: true,
    estoque: 10,
    avaliacao: 4.9,
    numAvaliacoes: 215,
    dimensoes: '60cm x 60cm x 20cm',
    pesoProduto: '2kg',
    garantia: '3 meses',
    origem: 'Brasil',
    palavrasChave: ['cama', 'antiestresse', 'ansiedade', 'aconchego', 'medroso', 'fogos']
  },
  {
    id: 14,
    title: 'Kit Enriquecimento Ambiental',
    price: 149.90,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600'
    ],
    description: 'Conjunto de brinquedos para estimulação mental. Ideal para pets inteligentes e curiosos.',
    descricaoCompleta: 'O Kit de Enriquecimento Ambiental inclui 5 brinquedos diferentes projetados para estimular a inteligência do seu pet. Com quebra-cabeças, labirintos de petiscos, tapete de fuçar e brinquedos interativos, seu cão ou gato vai se manter mentalmente ativo e entretido por horas.',
    categoria: 'caes',
    porte: 'medio',
    idade: 'adulto',
    material: 'plastico',
    finalidade: 'explorar',
    comportamentosIndicados: ['Curioso', 'Inteligente', 'Energético', 'Destrutivo'],
    contraindicadoAlergias: ['Plástico'],
    destaque: false,
    estoque: 12,
    avaliacao: 4.6,
    numAvaliacoes: 47,
    dimensoes: 'Caixa 30cm x 20cm x 15cm',
    pesoProduto: '1.5kg',
    garantia: '3 meses',
    origem: 'Brasil',
    palavrasChave: ['kit', 'enriquecimento', 'mental', 'inteligente', 'estimulação', 'curioso']
  }
];

// Exporta os produtos e listas auxiliares
export { todosProdutos };

export const categorias = [
  { id: 'todos', nome: 'Todos', icone: '🎾' },
  { id: 'caes', nome: 'Cães', icone: '🐕' },
  { id: 'gatos', nome: 'Gatos', icone: '🐈' },
  { id: 'outros', nome: 'Outros Pets', icone: '🐾' }
];

export const portes = [
  { id: 'todos', nome: 'Todos' },
  { id: 'pequeno', nome: '🐭 Pequeno' },
  { id: 'medio', nome: '🐕 Médio' },
  { id: 'grande', nome: '🐶 Grande' }
];

export const idades = [
  { id: 'todos', nome: 'Todas' },
  { id: 'filhote', nome: '🍼 Filhote' },
  { id: 'adulto', nome: '⭐ Adulto' },
  { id: 'idoso', nome: '🧓 Idoso' }
];

export const materiais = [
  { id: 'todos', nome: 'Todos' },
  { id: 'borracha', nome: 'Borracha' },
  { id: 'plastico', nome: 'Plástico' },
  { id: 'pelucia', nome: 'Pelúcia' },
  { id: 'sisal', nome: 'Sisal' },
  { id: 'nylon', nome: 'Nylon' },
  { id: 'algodao', nome: 'Algodão' },
  { id: 'madeira', nome: 'Madeira' },
  { id: 'tecido', nome: 'Tecido' }
];

export const finalidades = [
  { id: 'todos', nome: 'Todas' },
  { id: 'morder', nome: '🦷 Morder' },
  { id: 'arranhar', nome: '💅 Arranhar' },
  { id: 'cacar', nome: '🎯 Caçar' },
  { id: 'exercicio', nome: '🏃 Exercício' },
  { id: 'escalar', nome: '🧗 Escalar' },
  { id: 'explorar', nome: '🔍 Explorar' },
  { id: 'dental', nome: '🪥 Dental' }
];

// Função para buscar produto por ID
export function getProdutoPorId(id) {
  return todosProdutos.find(function(produto) {
    return produto.id === Number(id);
  });
}

// Função para gerar palavras-chave de sugestão
export function getTodasSugestoes() {
  const sugestoes = todosProdutos.flatMap(function(p) { 
    return p.palavrasChave; 
  });
  return [...new Set(sugestoes)];
}

// Função para recomendar produtos baseado no pet
export function recomendarProdutos(pet, limite = 2) {
  const alergiasPet = pet.alergias 
    ? pet.alergias.split(', ').map(function(a) { return a.trim().toLowerCase(); }) 
    : [];
  
  return todosProdutos
    .filter(function(produto) {
      const temAlergiaContraindicada = produto.contraindicadoAlergias.some(function(alergia) {
        return alergiasPet.includes(alergia.toLowerCase());
      });
      
      if (temAlergiaContraindicada) return false;
      
      let pontuacao = 0;
      
      if (pet.tipo === 'cachorro' && produto.categoria === 'caes') pontuacao += 3;
      if (pet.tipo === 'gato' && produto.categoria === 'gatos') pontuacao += 3;
      if (pet.porte === produto.porte) pontuacao += 2;
      if (pet.porte === 'mini' && produto.porte === 'pequeno') pontuacao += 1;
      if (pet.idade < 1 && produto.idade === 'filhote') pontuacao += 2;
      if (pet.idade >= 1 && pet.idade <= 7 && produto.idade === 'adulto') pontuacao += 2;
      if (pet.idade > 7 && produto.idade === 'idoso') pontuacao += 2;
      if (pet.comportamento && produto.comportamentosIndicados.includes(pet.comportamento)) pontuacao += 4;
      if (pet.peso < 5 && produto.porte === 'pequeno') pontuacao += 1;
      if (pet.peso >= 5 && pet.peso < 15 && produto.porte === 'medio') pontuacao += 1;
      if (pet.peso >= 15 && produto.porte === 'grande') pontuacao += 1;
      if (produto.destaque) pontuacao += 1;
      
      return pontuacao >= 2;
    })
    .sort(function(a, b) {
      let scoreA = 0, scoreB = 0;
      if (pet.comportamento && a.comportamentosIndicados.includes(pet.comportamento)) scoreA += 10;
      if (pet.comportamento && b.comportamentosIndicados.includes(pet.comportamento)) scoreB += 10;
      if (pet.tipo === 'cachorro' && a.categoria === 'caes') scoreA += 5;
      if (pet.tipo === 'gato' && a.categoria === 'gatos') scoreA += 5;
      if (pet.tipo === 'cachorro' && b.categoria === 'caes') scoreB += 5;
      if (pet.tipo === 'gato' && b.categoria === 'gatos') scoreB += 5;
      if (a.porte === pet.porte) scoreA += 3;
      if (b.porte === pet.porte) scoreB += 3;
      if (a.destaque) scoreA += 2;
      if (b.destaque) scoreB += 2;
      return scoreB - scoreA;
    })
    .slice(0, limite);
}