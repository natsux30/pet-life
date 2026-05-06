// src/data/produtos.js

const todosProdutos = [
  {
    id: 1,
    title: "Brinquedo Mordedor Kong",
    price: 29.9,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4Li4WrqgBJkztNvnnZHwF6qPs7IuUQyZGOpVr0jOjomNtz351chYjhWJqAPuBQ5Dh0xtKhQ9T2fpEvw7Ff7RRsuRAFWmhy33wQJgv_AuJv7uAh6NyxsViRSqUTmEFROngMkw5FA&usqp=CAc",
    images: [
      "https://images.pexels.com/photos/35055371/pexels-photo-35055371.png",
      "https://images.pexels.com/photos/28667156/pexels-photo-28667156.jpeg",
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4Li4WrqgBJkztNvnnZHwF6qPs7IuUQyZGOpVr0jOjomNtz351chYjhWJqAPuBQ5Dh0xtKhQ9T2fpEvw7Ff7RRsuRAFWmhy33wQJgv_AuJv7uAh6NyxsViRSqUTmEFROngMkw5FA&usqp=CAc",
    ],
    description:
      "Brinquedo resistente para cães que adoram morder. Ideal para aliviar o estresse e a ansiedade.",
    descricaoCompleta:
      "O Brinquedo Mordedor Kong é perfeito para cães de todas as idades que precisam gastar energia e aliviar o estresse. Fabricado em borracha atóxica de alta resistência, este brinquedo suporta até as mordidas mais fortes. Pode ser recheado com petiscos para estimular a inteligência do seu pet e proporcionar horas de diversão.",
    categoria: "caes",
    porte: "medio",
    idade: "adulto",
    material: "borracha",
    finalidade: "morder",
    comportamentosIndicados: ["Agitado", "Ansioso", "Destrutivo", "Energético"],
    contraindicadoAlergias: ["Látex", "Borracha sintética"],
    destaque: true,
    estoque: 15,
    avaliacao: 4.8,
    numAvaliacoes: 127,
    dimensoes: "8cm x 8cm x 10cm",
    pesoProduto: "200g",
    garantia: "3 meses",
    origem: "Brasil",
    palavrasChave: [
      "kong",
      "mordedor",
      "resistente",
      "cachorro",
      "dentes",
      "ansiedade",
      "estresse",
    ],
  },
  {
    id: 2,
    title: "Arranhador Torre Premium",
    price: 189.9,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT124SB33LAm2CNasln5jf-sObbGsZU8HxRyUzSrrdaCtlgXXf0dSUQpfNi8KKZBWo2uM80zlxLoin49btHpyJT4stkmrzshcB2teQUp7DUjpt15LEQfNoFL7Y",
    images: [
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT124SB33LAm2CNasln5jf-sObbGsZU8HxRyUzSrrdaCtlgXXf0dSUQpfNi8KKZBWo2uM80zlxLoin49btHpyJT4stkmrzshcB2teQUp7DUjpt15LEQfNoFL7Y",
      "https://images.pexels.com/photos/15395216/pexels-photo-15395216.jpeg",
      "https://images.pexels.com/photos/28042372/pexels-photo-28042372.jpeg",
    ],
    description:
      "Arranhador em sisal natural. Perfeito para gatos que adoram escalar e arranhar.",
    descricaoCompleta:
      "A Torre Premium é o paraíso dos gatos! Com um design funcional, postes revestidos em sisal natural e uma plataforma acolchoada, seu felino terá o espaço ideal para arranhar, escalar e descansar. O sisal natural ajuda a manter as unhas saudáveis e protege seus móveis.",
    categoria: "gatos",
    porte: "pequeno",
    idade: "adulto",
    material: "sisal",
    finalidade: "arranhar",
    comportamentosIndicados: [
      "Curioso",
      "Energético",
      "Territorial",
      "Independente",
    ],
    contraindicadoAlergias: [],
    destaque: true,
    estoque: 8,
    avaliacao: 4.9,
    numAvaliacoes: 89,
    dimensoes: "40cm x 40cm x 120cm",
    pesoProduto: "8kg",
    garantia: "6 meses",
    origem: "Brasil",
    palavrasChave: ["arranhador", "torre", "gato", "sisal", "unhas", "escalar"],
  },
  {
    id: 3,
    title: "Bola Interativa LED",
    price: 45.9,
    image:
      "https://cdn.animalissimo.com.br/cache/catalog/HIMG350331-650x650.JPG",
    images: [
      "https://cdn.animalissimo.com.br/cache/catalog/HIMG350331-650x650.JPG",
      "https://images.pexels.com/photos/16010450/pexels-photo-16010450.jpeg",
      "https://images.pexels.com/photos/35382669/pexels-photo-35382669.jpeg",
    ],
    description:
      "Bola com guizo e luzes LED que estimula o exercício. Ideal para pets ativos e brincalhões.",
    descricaoCompleta:
      "A Bola Interativa LED é o brinquedo perfeito para pets cheios de energia. Com luzes que acendem ao quicar e um guizo interno que chama a atenção, seu pet vai se exercitar por horas. Fabricada em plástico atóxico e resistente, é segura para mordidas e brincadeiras intensas.",
    categoria: "caes",
    porte: "pequeno",
    idade: "filhote",
    material: "plastico",
    finalidade: "exercicio",
    comportamentosIndicados: ["Agitado", "Brincalhão", "Curioso", "Energético"],
    contraindicadoAlergias: ["Plástico", "Corante alimentício"],
    destaque: false,
    estoque: 30,
    avaliacao: 4.5,
    numAvaliacoes: 56,
    dimensoes: "Diâmetro 7cm",
    pesoProduto: "150g",
    garantia: "1 mês",
    origem: "China",
    palavrasChave: [
      "bola",
      "led",
      "luz",
      "interativo",
      "exercício",
      "brincadeira",
    ],
  },
  {
    id: 4,
    title: "Ratinho com Catnip",
    price: 15.9,
    image:
      "https://cobasi.vteximg.com.br/arquivos/ids/1065596/Pelucia-Rato-com-Catnip-Flicks-Beneficios.png?v=638696941112570000",
    images: [
      "https://cobasi.vteximg.com.br/arquivos/ids/1065596/Pelucia-Rato-com-Catnip-Flicks-Beneficios.png?v=638696941112570000",
      "https://images.pexels.com/photos/11940144/pexels-photo-11940144.jpeg",
      "https://images.pexels.com/photos/34418105/pexels-photo-34418105.jpeg",
    ],
    description:
      "Ratinho de pelúcia com catnip orgânico. Estimula o instinto de caça dos felinos.",
    descricaoCompleta:
      "O Ratinho com Catnip é irresistível para os gatos! Recheado com catnip orgânico de alta qualidade, este brinquedo estimula os instintos naturais de caça do seu felino. A pelúcia macia é perfeita para morder, chutar e carregar pela casa. Disponível em várias cores.",
    categoria: "gatos",
    porte: "pequeno",
    idade: "adulto",
    material: "pelucia",
    finalidade: "cacar",
    comportamentosIndicados: ["Brincalhão", "Curioso", "Sociável", "Tímido"],
    contraindicadoAlergias: ["Pelúcia", "Corante alimentício"],
    destaque: false,
    estoque: 50,
    avaliacao: 4.3,
    numAvaliacoes: 34,
    dimensoes: "5cm x 3cm x 3cm",
    pesoProduto: "30g",
    garantia: "Sem garantia",
    origem: "Brasil",
    palavrasChave: ["ratinho", "catnip", "pelúcia", "gato", "caça", "orgânico"],
  },
  {
    id: 5,
    title: "Osso de Nylon Defumado",
    price: 34.9,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTnCzh8neKNlOqd7vI47j3JGYsR9-cB_uQnW7N7FP6yW6hrD7HUf7jquonyR4OQtSMA9JPP1oG7gDfxs7VqSUCY7TPtSo6SRiqDdVPCVwGQS6oc8x41Zp_WkIfxnfOWuonXtm7qclEyJvg&usqp=CAc",
    images: [
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTnCzh8neKNlOqd7vI47j3JGYsR9-cB_uQnW7N7FP6yW6hrD7HUf7jquonyR4OQtSMA9JPP1oG7gDfxs7VqSUCY7TPtSo6SRiqDdVPCVwGQS6oc8x41Zp_WkIfxnfOWuonXtm7qclEyJvg&usqp=CAc",
      "https://images.pexels.com/photos/8877977/pexels-photo-8877977.png",
      "https://images.pexels.com/photos/28293418/pexels-photo-28293418.jpeg",
    ],
    description:
      "Osso resistente para cães fortes. Ajuda a controlar a ansiedade e o comportamento destrutivo.",
    descricaoCompleta:
      "O Osso de Nylon Defumado é a solução para cães que adoram roer. Fabricado em nylon de qualidade alimentícia, é seguro e durável. O sabor defumado atrai o pet e ajuda a combater o mau hálito, além de massagear as gengivas e limpar os dentes durante a mastigação.",
    categoria: "caes",
    porte: "grande",
    idade: "adulto",
    material: "nylon",
    finalidade: "morder",
    comportamentosIndicados: [
      "Ansioso",
      "Destrutivo",
      "Dominante",
      "Energético",
    ],
    contraindicadoAlergias: ["Nylon", "Plástico"],
    destaque: false,
    estoque: 25,
    avaliacao: 4.6,
    numAvaliacoes: 78,
    dimensoes: "15cm x 5cm x 3cm",
    pesoProduto: "250g",
    garantia: "2 meses",
    origem: "Brasil",
    palavrasChave: [
      "osso",
      "nylon",
      "resistente",
      "cachorro",
      "grande",
      "ansiedade",
    ],
  },
  {
    id: 6,
    title: "Torre de Atividades",
    price: 129.9,
    image:
      "https://images.pexels.com/photos/10117705/pexels-photo-10117705.jpeg",
    images: [
      "https://images.pexels.com/photos/10117705/pexels-photo-10117705.jpeg",
      "https://images.pexels.com/photos/7725617/pexels-photo-7725617.jpeg",
      "https://images.pexels.com/photos/7725966/pexels-photo-7725966.jpeg",
    ],
    description:
      "Torre com múltiplas atividades e esconderijos. Ideal para gatos curiosos e exploradores.",
    descricaoCompleta:
      "A Torre de Atividades foi projetada para estimular a inteligência do seu gato. Com esconderijos, plataformas em diferentes alturas, brinquedos pendurados e arranhadores, seu felino nunca vai ficar entediado. Ideal para apartamentos e casas com pouco espaço.",
    categoria: "gatos",
    porte: "medio",
    idade: "filhote",
    material: "madeira",
    finalidade: "escalar",
    comportamentosIndicados: [
      "Curioso",
      "Energético",
      "Independente",
      "Brincalhão",
    ],
    contraindicadoAlergias: ["Madeira", "Ácaros"],
    destaque: true,
    estoque: 5,
    avaliacao: 4.7,
    numAvaliacoes: 42,
    dimensoes: "60cm x 40cm x 80cm",
    pesoProduto: "12kg",
    garantia: "6 meses",
    origem: "Brasil",
    palavrasChave: [
      "torre",
      "atividades",
      "gato",
      "escalar",
      "madeira",
      "explorar",
    ],
  },
  {
    id: 7,
    title: "Corda de Algodão Trançada",
    price: 19.9,
    image:
      "https://images.pexels.com/photos/14534161/pexels-photo-14534161.jpeg",
    images: [
      "https://images.pexels.com/photos/14534161/pexels-photo-14534161.jpeg",
      "https://images.pexels.com/photos/36053854/pexels-photo-36053854.jpeg",
      "https://images.pexels.com/photos/18478445/pexels-photo-18478445.jpeg",
    ],
    description:
      "Corda resistente de algodão natural. Perfeita para cães sociáveis que adoram brincar junto.",
    descricaoCompleta:
      "A Corda de Algodão Trançada é o brinquedo ideal para brincadeiras de cabo de guerra. Feita com algodão 100% natural, é macia para a boca do pet mas resistente o suficiente para suportar puxões fortes. Ajuda a fortalecer a mandíbula e cria momentos de diversão entre você e seu cão.",
    categoria: "caes",
    porte: "grande",
    idade: "adulto",
    material: "algodao",
    finalidade: "exercicio",
    comportamentosIndicados: [
      "Brincalhão",
      "Energético",
      "Sociável",
      "Agitado",
    ],
    contraindicadoAlergias: ["Algodão", "Poeira"],
    destaque: false,
    estoque: 40,
    avaliacao: 4.4,
    numAvaliacoes: 63,
    dimensoes: "30cm de comprimento",
    pesoProduto: "300g",
    garantia: "1 mês",
    origem: "Brasil",
    palavrasChave: ["corda", "algodão", "cabo", "guerra", "puxar", "natural"],
  },
  {
    id: 8,
    title: "Varinha com Penas",
    price: 22.9,
    image:
      "https://images.pexels.com/photos/26612983/pexels-photo-26612983.jpeg",
    images: [
      "https://images.pexels.com/photos/26612983/pexels-photo-26612983.jpeg",
      "https://images.pexels.com/photos/7725960/pexels-photo-7725960.jpeg",
      "https://images.pexels.com/photos/10914514/pexels-photo-10914514.jpeg",
    ],
    description:
      "Varinha interativa com penas. Estimula o instinto de caça de forma segura e divertida.",
    descricaoCompleta:
      "A Varinha com Penas é um clássico que nunca falha! Com penas coloridas e um sino na ponta, este brinquedo desperta imediatamente o instinto de caça do seu gato. A haste flexível permite movimentos imprevisíveis que imitam o voo de um pássaro, proporcionando exercício e diversão.",
    categoria: "gatos",
    porte: "pequeno",
    idade: "idoso",
    material: "plastico",
    finalidade: "cacar",
    comportamentosIndicados: ["Brincalhão", "Tímido", "Medroso", "Sociável"],
    contraindicadoAlergias: ["Plástico", "Penas"],
    destaque: false,
    estoque: 60,
    avaliacao: 4.6,
    numAvaliacoes: 91,
    dimensoes: "50cm de comprimento",
    pesoProduto: "50g",
    garantia: "Sem garantia",
    origem: "China",
    palavrasChave: ["varinha", "penas", "gato", "caça", "interativo", "idoso"],
  },
  {
    id: 9,
    title: "Túnel para Roedores",
    price: 35.9,
    image: "https://down-ph.img.susercontent.com/file/ph-11134207-7rasa-maw732ko8seg24",
    images: [
      "https://down-ph.img.susercontent.com/file/ph-11134207-7rasa-maw732ko8seg24",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1YSxPOEXJx9h2BvJzrKJR6rdUAoXP8g4EGo4P0Ry2Q&s",
      "https://down-ph.img.susercontent.com/file/ph-11134207-7rasa-maw732ko8seg24",
    ],
    description:
      "Túnel flexível para exploração. Ideal para roedores curiosos e que adoram se esconder.",
    descricaoCompleta:
      "O Túnel para Roedores é um brinquedo versátil que pode ser modelado em diferentes formatos. Perfeito para hamsters, porquinhos-da-índia e coelhos, estimula a exploração e oferece um esconderijo seguro. Fabricado em material lavável e resistente a roeduras.",
    categoria: "outros",
    porte: "pequeno",
    idade: "filhote",
    material: "tecido",
    finalidade: "explorar",
    comportamentosIndicados: ["Curioso", "Tímido", "Brincalhão", "Medroso"],
    contraindicadoAlergias: ["Tecido sintético", "Ácaros"],
    destaque: false,
    estoque: 20,
    avaliacao: 4.2,
    numAvaliacoes: 18,
    dimensoes: "Diâmetro 15cm x 50cm",
    pesoProduto: "400g",
    garantia: "1 mês",
    origem: "China",
    palavrasChave: [
      "túnel",
      "roedores",
      "hamster",
      "coelho",
      "explorar",
      "esconderijo",
    ],
  },
  {
    id: 10,
    title: "Bolinha com Catnip Orgânico",
    price: 12.9,
    image: "https://images.pexels.com/photos/35576973/pexels-photo-35576973.jpeg",
    images: [
      "https://images.pexels.com/photos/35576973/pexels-photo-35576973.jpeg",
      "https://images.pexels.com/photos/20273025/pexels-photo-20273025.jpeg",
      "https://images.pexels.com/photos/30678900/pexels-photo-30678900.jpeg",
    ],
    description:
      "Bolinha de tecido natural com catnip orgânico. Segura e atóxica para gatos sensíveis.",
    descricaoCompleta:
      "A Bolinha com Catnip Orgânico é feita com tecido 100% natural e recheada com catnip orgânico certificado. É a opção mais segura para gatos com sensibilidades ou alergias. O formato de bolinha estimula o instinto de perseguição e pode ser usada tanto para brincadeiras solo quanto interativas.",
    categoria: "gatos",
    porte: "pequeno",
    idade: "idoso",
    material: "tecido",
    finalidade: "cacar",
    comportamentosIndicados: ["Tímido", "Calmo", "Medroso", "Sociável"],
    contraindicadoAlergias: ["Pelúcia sintética"],
    destaque: false,
    estoque: 45,
    avaliacao: 4.4,
    numAvaliacoes: 29,
    dimensoes: "Diâmetro 4cm",
    pesoProduto: "20g",
    garantia: "Sem garantia",
    origem: "Brasil",
    palavrasChave: [
      "bolinha",
      "catnip",
      "orgânico",
      "gato",
      "natural",
      "atóxico",
    ],
  },
  {
    id: 11,
    title: "Frisbee Flexível",
    price: 39.9,
    image: "https://images.pexels.com/photos/4459795/pexels-photo-4459795.png",
    images: [
      "https://images.pexels.com/photos/4459795/pexels-photo-4459795.png",
      "https://images.pexels.com/photos/16730620/pexels-photo-16730620.jpeg",
    ],
    description:
      "Frisbee flexível e seguro. Ideal para cães ativos que adoram correr e buscar.",
    descricaoCompleta:
      "O Frisbee Flexível foi desenvolvido especialmente para cães. Com bordas macias que não machucam a boca do pet, é perfeito para brincadeiras ao ar livre. O material flexível absorve impactos e volta ao formato original. Disponível em cores vibrantes fáceis de localizar na grama.",
    categoria: "caes",
    porte: "grande",
    idade: "adulto",
    material: "borracha",
    finalidade: "exercicio",
    comportamentosIndicados: [
      "Agitado",
      "Brincalhão",
      "Energético",
      "Protetor",
    ],
    contraindicadoAlergias: ["Borracha", "Látex"],
    destaque: false,
    estoque: 35,
    avaliacao: 4.7,
    numAvaliacoes: 54,
    dimensoes: "Diâmetro 25cm",
    pesoProduto: "180g",
    garantia: "2 meses",
    origem: "Brasil",
    palavrasChave: [
      "frisbee",
      "disco",
      "flexível",
      "cachorro",
      "lançar",
      "correr",
    ],
  },
  {
    id: 12,
    title: "Mordedor Dental Filhotes",
    price: 24.9,
    image: "https://images.pexels.com/photos/36951300/pexels-photo-36951300.jpeg",
    images: [
      "https://images.pexels.com/photos/36951300/pexels-photo-36951300.jpeg",
      "https://images.pexels.com/photos/27290257/pexels-photo-27290257.jpeg",
    ],
    description:
      "Mordedor dental que massageia a gengiva. Acalma filhotes durante a dentição.",
    descricaoCompleta:
      "O Mordedor Dental para Filhotes é essencial durante a fase de dentição. Com textura especial que massageia as gengivas inflamadas e alivia o desconforto, ajuda a direcionar a mastigação para um objeto apropriado, salvando seus móveis. Pode ser resfriado na geladeira para maior alívio.",
    categoria: "caes",
    porte: "pequeno",
    idade: "filhote",
    material: "borracha",
    finalidade: "dental",
    comportamentosIndicados: ["Ansioso", "Destrutivo", "Agitado", "Brincalhão"],
    contraindicadoAlergias: ["Borracha sintética", "Corante"],
    destaque: false,
    estoque: 50,
    avaliacao: 4.8,
    numAvaliacoes: 103,
    dimensoes: "10cm x 5cm x 2cm",
    pesoProduto: "100g",
    garantia: "1 mês",
    origem: "Brasil",
    palavrasChave: [
      "dental",
      "filhote",
      "dentes",
      "gengiva",
      "massagem",
      "dentição",
    ],
  },
  {
    id: 13,
    title: "Cama Antiestresse",
    price: 89.9,
    image: "https://images.pexels.com/photos/19027991/pexels-photo-19027991.jpeg",
    images: [
      "https://images.pexels.com/photos/19027991/pexels-photo-19027991.jpeg",
      "https://images.pexels.com/photos/14236919/pexels-photo-14236919.jpeg",
      "https://images.pexels.com/photos/16234672/pexels-photo-16234672.jpeg",
    ],
    description:
      "Cama macia que reduz ansiedade. Ideal para pets medrosos ou que sofrem com fogos.",
    descricaoCompleta:
      "A Cama Antiestresse foi desenvolvida com tecido que simula o toque materno, proporcionando sensação de segurança e conforto. Ideal para pets que sofrem com ansiedade de separação, medo de fogos ou trovões. O formato circular abraça o pet e ajuda a regular a temperatura corporal.",
    categoria: "caes",
    porte: "medio",
    idade: "adulto",
    material: "pelucia",
    finalidade: "explorar",
    comportamentosIndicados: ["Ansioso", "Medroso", "Tímido", "Calmo"],
    contraindicadoAlergias: ["Pelúcia", "Ácaros", "Poeira"],
    destaque: true,
    estoque: 10,
    avaliacao: 4.9,
    numAvaliacoes: 215,
    dimensoes: "60cm x 60cm x 20cm",
    pesoProduto: "2kg",
    garantia: "3 meses",
    origem: "Brasil",
    palavrasChave: [
      "cama",
      "antiestresse",
      "ansiedade",
      "aconchego",
      "medroso",
      "fogos",
    ],
  },
  // {
  //   id: 14,
  //   title: "Kit Enriquecimento Ambiental",
  //   price: 149.9,
  //   image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600",
  //   images: [
  //     "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600",
  //     "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600",
  //   ],
  //   description:
  //     "Conjunto de brinquedos para estimulação mental. Ideal para pets inteligentes e curiosos.",
  //   descricaoCompleta:
  //     "O Kit de Enriquecimento Ambiental inclui 5 brinquedos diferentes projetados para estimular a inteligência do seu pet. Com quebra-cabeças, labirintos de petiscos, tapete de fuçar e brinquedos interativos, seu cão ou gato vai se manter mentalmente ativo e entretido por horas.",
  //   categoria: "caes",
  //   porte: "medio",
  //   idade: "adulto",
  //   material: "plastico",
  //   finalidade: "explorar",
  //   comportamentosIndicados: [
  //     "Curioso",
  //     "Inteligente",
  //     "Energético",
  //     "Destrutivo",
  //   ],
  //   contraindicadoAlergias: ["Plástico"],
  //   destaque: false,
  //   estoque: 12,
  //   avaliacao: 4.6,
  //   numAvaliacoes: 47,
  //   dimensoes: "Caixa 30cm x 20cm x 15cm",
  //   pesoProduto: "1.5kg",
  //   garantia: "3 meses",
  //   origem: "Brasil",
  //   palavrasChave: [
  //     "kit",
  //     "enriquecimento",
  //     "mental",
  //     "inteligente",
  //     "estimulação",
  //     "curioso",
  //   ],
  // },
];

// Exporta os produtos e listas auxiliares
export { todosProdutos };

export const categorias = [
  { id: "todos", nome: "Todos", icone: "🎾" },
  { id: "caes", nome: "Cães", icone: "🐕" },
  { id: "gatos", nome: "Gatos", icone: "🐈" },
  { id: "outros", nome: "Outros Pets", icone: "🐾" },
];

export const portes = [
  { id: "todos", nome: "Todos" },
  { id: "pequeno", nome: "🐭 Pequeno" },
  { id: "medio", nome: "🐕 Médio" },
  { id: "grande", nome: "🐶 Grande" },
];

export const idades = [
  { id: "todos", nome: "Todas" },
  { id: "filhote", nome: "🍼 Filhote" },
  { id: "adulto", nome: "⭐ Adulto" },
  { id: "idoso", nome: "🧓 Idoso" },
];

export const materiais = [
  { id: "todos", nome: "Todos" },
  { id: "borracha", nome: "Borracha" },
  { id: "plastico", nome: "Plástico" },
  { id: "pelucia", nome: "Pelúcia" },
  { id: "sisal", nome: "Sisal" },
  { id: "nylon", nome: "Nylon" },
  { id: "algodao", nome: "Algodão" },
  { id: "madeira", nome: "Madeira" },
  { id: "tecido", nome: "Tecido" },
];

export const finalidades = [
  { id: "todos", nome: "Todas" },
  { id: "morder", nome: "🦷 Morder" },
  { id: "arranhar", nome: "💅 Arranhar" },
  { id: "cacar", nome: "🎯 Caçar" },
  { id: "exercicio", nome: "🏃 Exercício" },
  { id: "escalar", nome: "🧗 Escalar" },
  { id: "explorar", nome: "🔍 Explorar" },
  { id: "dental", nome: "🪥 Dental" },
];

// Função para buscar produto por ID
export function getProdutoPorId(id) {
  return todosProdutos.find(function (produto) {
    return produto.id === Number(id);
  });
}

// Função para gerar palavras-chave de sugestão
export function getTodasSugestoes() {
  const sugestoes = todosProdutos.flatMap(function (p) {
    return p.palavrasChave;
  });
  return [...new Set(sugestoes)];
}

// Função para recomendar produtos baseado no pet
export function recomendarProdutos(pet, limite = 2) {
  const alergiasPet = pet.alergias
    ? pet.alergias.split(", ").map(function (a) {
        return a.trim().toLowerCase();
      })
    : [];

  return todosProdutos
    .filter(function (produto) {
      const temAlergiaContraindicada = produto.contraindicadoAlergias.some(
        function (alergia) {
          return alergiasPet.includes(alergia.toLowerCase());
        },
      );

      if (temAlergiaContraindicada) return false;

      let pontuacao = 0;

      if (pet.tipo === "cachorro" && produto.categoria === "caes")
        pontuacao += 3;
      if (pet.tipo === "gato" && produto.categoria === "gatos") pontuacao += 3;
      if (pet.porte === produto.porte) pontuacao += 2;
      if (pet.porte === "mini" && produto.porte === "pequeno") pontuacao += 1;
      if (pet.idade < 1 && produto.idade === "filhote") pontuacao += 2;
      if (pet.idade >= 1 && pet.idade <= 7 && produto.idade === "adulto")
        pontuacao += 2;
      if (pet.idade > 7 && produto.idade === "idoso") pontuacao += 2;
      if (
        pet.comportamento &&
        produto.comportamentosIndicados.includes(pet.comportamento)
      )
        pontuacao += 4;
      if (pet.peso < 5 && produto.porte === "pequeno") pontuacao += 1;
      if (pet.peso >= 5 && pet.peso < 15 && produto.porte === "medio")
        pontuacao += 1;
      if (pet.peso >= 15 && produto.porte === "grande") pontuacao += 1;
      if (produto.destaque) pontuacao += 1;

      return pontuacao >= 2;
    })
    .sort(function (a, b) {
      let scoreA = 0,
        scoreB = 0;
      if (
        pet.comportamento &&
        a.comportamentosIndicados.includes(pet.comportamento)
      )
        scoreA += 10;
      if (
        pet.comportamento &&
        b.comportamentosIndicados.includes(pet.comportamento)
      )
        scoreB += 10;
      if (pet.tipo === "cachorro" && a.categoria === "caes") scoreA += 5;
      if (pet.tipo === "gato" && a.categoria === "gatos") scoreA += 5;
      if (pet.tipo === "cachorro" && b.categoria === "caes") scoreB += 5;
      if (pet.tipo === "gato" && b.categoria === "gatos") scoreB += 5;
      if (a.porte === pet.porte) scoreA += 3;
      if (b.porte === pet.porte) scoreB += 3;
      if (a.destaque) scoreA += 2;
      if (b.destaque) scoreB += 2;
      return scoreB - scoreA;
    })
    .slice(0, limite);
}
