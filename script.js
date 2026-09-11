// URL base da API[cite: 1]
const URL_BASE = "https://personality.fyi/api/v1";

//Traduções dos tipos de personalidade para português
const traducoes = {
    "intj": {
        img: "https://via.placeholder.com/140",
        code: "INTJ-A/INTJ-T",
        nome: "Analista",
        titulo: "Arquiteto",
        descricao: " As pessoas com o tipo de personalidade INTJ (Arquiteto) são intelectualmente curiosas, com uma sede profunda de conhecimento. Geralmente, valorizam a inteligência criativa, a racionalidade direta e o autodesenvolvimento. Elas trabalham de forma consistente para ampliar suas habilidades intelectuais e costumam ser movidas por um forte desejo de dominar qualquer assunto que consideram interessante.",
        tracos: ["Independente", "Estratégico", "Decisivo", "Planejador"] 
    },
    "intp": {
        code: "INTP-A/INTP-T",
        nome: "Analista",
        titulo: "Lógico",
        descricao: "Os indivíduos com o tipo de personalidade INTP (Lógico) se orgulham de ter perspectivas únicas e grandes habilidades intelectuais. Eles querem desvendar os mistérios do universo, o que talvez explique por que alguns dos filósofos e cientistas mais influentes ao longo da história eram INTPs. Em geral, preferem ficar sozinhos, pois se perdem facilmente em seus próprios pensamentos quando estão à vontade. Também são bastante criativos e não têm medo de revelar suas ideias originais ou de se destacar da multidão.",
        tracos: ["Analítico", "Curioso", "Preciso", "Objetivo"]    
    },
    "entj": {
        code: "ENTJ-A/ENTJ-T",
        nome: "Analista",
        titulo: "Comandante",
        descricao: "Indivíduos com o tipo de personalidade ENTJ (Comandante) são líderes natos. Com o dom do carisma e da confiança, eles exercem autoridade de forma a reunir multidões em torno de um objetivo comum. No entanto, também se destacam por um frequente nível rigoroso de racionalidade, canalizando motivação, determinação e agilidade mental para alcançar qualquer meta estabelecida. Mesmo que sua intensidade possa desagradar alguns, os ENTJs se orgulham da forte ética de trabalho e do impressionante nível de autodisciplina que possuem.",
        tracos: ["Líder", "Estratégico", "Determinado", "Eficiente"]
    },
    "entp":{
        code: "ENTP-A/ENTP-T",
        nome: "Analista",
        titulo: "Inovador",
        descricao: "Inteligentes e audaciosas, as pessoas com o tipo de personalidade ENTP (Inovador) não têm medo de discordar dos padrões estabelecidos. Na verdade, elas não têm medo de se opor a praticamente nada ou ninguém. Poucas coisas as estimulam mais do que um pouco de debate, e, se o assunto for controverso, melhor ainda. No entanto, seria um equívoco pensar que os ENTPs são desagradáveis ou mal-intencionados. Em vez disso, as pessoas com esse tipo de personalidade são muito curiosas, informadas e dotadas de um senso de humor lúdico, podendo ser incrivelmente divertidas. Elas simplesmente têm uma ideia de diversão excêntrica e contrária, que costuma envolver uma dose saudável de debate acalorado.",
        tracos: ["Criativo", "Inovador", "Adaptável", "Persuasivo"]
    } ,
    "infj": {
        code: "INFJ-A/INFJ-T",
        nome: "Diplomata",
        titulo: "Apoiador",
        descricao: "Idealistas e firmes em seus princípios, as pessoas com o tipo de personalidade INFJ (Apoiador) não se contentam em levar uma vida sem grandes desafios, elas querem fazer a diferença com suas ações. Empáticas, para elas o sucesso não vem de dinheiro ou status, mas de buscar realização pessoal, ajudar os outros e contribuir para mudanças positivas no mundo. Apesar de terem grandes objetivos e ambições, os INFJs estão longe de ser sonhadores passivos. Pessoas com esse tipo de personalidade valorizam a integridade e raramente ficam satisfeitas até fazerem o que acreditam ser correto. Honradas até a alma, elas vivem com uma compreensão clara dos seus valores e buscam jamais perder de vista o que é realmente importante, mas não segundo os outros ou a sociedade, e sim de acordo com a própria sabedoria e intuição.",
        tracos: ["Visionário", "Empático", "Determinado", "Reservado"]
    },
    "infp": {
        code: "INFP-A/INFP-T",
        nome: "Diplomata",
        titulo: "Mediador",
        descricao: "Mesmo que pareçam quietas ou modestas, as pessoas com o tipo de personalidade INFP (Mediador) têm uma vida interior ativa e apaixonada. Criativas e imaginativas, elas se perdem alegremente em seus pensamentos, inventando todo tipo de histórias e conversas em suas mentes. Conhecidos pela sensibilidade, os INFPs podem ter respostas emocionais muito intensas à música, arte, natureza e às pessoas ao seu redor. Eles são conhecidos por serem extremamente sentimentais e nostálgicos, frequentemente guardando lembranças e recordações especiais que iluminam seus dias e enchem seu coração de alegria. Idealistas e empáticos, os INFPs buscam relacionamentos profundos e cheios de alma, além de terem um forte desejo de ajudar o próximo. Devido à natureza acelerada e competitiva da sociedade, podem às vezes se sentir solitários ou invisíveis, perdidos em um mundo que parece não valorizar as características que os tornam únicos. Ainda assim, é exatamente por sua intensa sensibilidade e profunda criatividade que os INFPs possuem um potencial singular para estabelecer conexões autênticas e promover transformações positivas.",
        tracos: ["Idealista", "Criativo", "Empático", "Autentico"]
    },
    "enfj": {
        code: "ENFJ-A/ENFJ-T",
        nome: "Diplomata",
        titulo: "Protagonista",
        descricao: "Pessoas com o tipo de personalidade ENFJ (Protagonista) sentem que devem servir a um propósito maior na vida. Atenciosas e idealistas, elas se esforçam para impactar positivamente os outros e o mundo ao seu redor. Raramente deixam passar uma oportunidade de fazer a coisa certa, mesmo quando enfrentam dificuldades no caminho. Os ENFJs são líderes natos, o que explica por que muitos com esse tipo de personalidade acabam se tornando políticos, treinadores e professores renomados. Com paixão e carisma, eles inspiram os outros não só no trabalho, mas em todas as áreas da vida, incluindo relacionamentos. Poucas coisas são tão gratificantes para os ENFJs do que ajudar alguém especial a alcançar todo o seu potencial..",
        tracos: ["Carismático", "Caloroso", "Organizado", "Inspirador"]
    },
    "enfp": {
        code: "ENFP-A/ENFP-T",
        nome: "Diplomata",
        titulo: "Ativista",
        descricao: "Indivíduos com o tipo de personalidade ENFP (Ativista) são verdadeiros espíritos livres: extrovertidos e com uma mente tão aberta quanto o coração. Eles encaram a vida com entusiasmo e otimismo, destacando-se em qualquer multidão. Mas, mesmo sendo a alma da festa, não se limitam a buscar diversão. Eles são profundos, movidos por um desejo intenso de estabelecer conexões emocionais significativas com os outros.",
        tracos: ["Entusiasta", "Criativo", "Encantador", "Espontâneo"]
    },
    "istj": {
        code: "ISTJ-A/ISTJ-T",
        nome: "Sentinela",
        titulo: "Prático",
        descricao: "As pessoas com o tipo de personalidade ISTJ (Prático) dizem o que realmente pensam e, quando se comprometem a fazer algo, cumprem o que foi prometido. Com uma natureza responsável e confiável, não é surpresa que também costumem ter um profundo respeito pela estrutura e tradição, sendo muitas vezes atraídas por organizações, locais de trabalho e ambientes educacionais que estabelecem hierarquias e expectativas claras. Mesmo que os ISTJs possam não necessariamente buscar destaque ou atenção, eles fazem muito mais do que a sua parte para o bom funcionamento da sociedade. No contexto familiar e social, costumam ser respeitados pela confiabilidade, abordagem pragmática e habilidade de manter uma postura realista e lógica, mesmo nos momentos de maior estresse.",
        tracos: ["Confiável", "Metódico", "Persistente", "Minucioso"]
    },
    "isfj": {
        code: "ISFJ-A/ISFJ-T",
        nome: "Sentinela",
        titulo: "Defensor",
        descricao: "De maneira humilde e discreta, as pessoas com o tipo de personalidade ISFJ (Defensor) são verdadeiros pilares da sociedade. Trabalhadoras e dedicadas, demonstram um profundo senso de responsabilidade para com o próximo. Além disso, os INFJs são aqueles que cumprem prazos, lembram aniversários e ocasiões especiais, mantêm tradições e oferecem cuidado e apoio a quem é especial. No entanto, raramente buscam reconhecimento por suas ações, preferindo operar nos bastidores. Esse tipo de personalidade se destaca pela competência e proatividade, contando com muitos talentos versáteis. Mesmo sensíveis e atenciosos, os ISFJs também possuem uma grande capacidade analítica e uma atenção aos detalhes. Apesar de serem reservados, surpreendem com suas habilidades interpessoais bem desenvolvidas e relacionamentos sólidos. Eles são muito mais do que a soma de suas qualidades, as quais brilham até mesmo nas situações mais comuns do dia a dia.",
        tracos: ["Cuidadoso", "Leal", "Observador", "Firme"]
    },
    "estj": {
        code: "ESTJ-A/ESTJ-T",
        nome: "Sentinela",
        titulo: "Executivo",
        descricao: "As pessoas com o tipo de personalidade ESTJ (Executivo) representam a tradição e a ordem, usando sua noção do que é certo, errado e socialmente aceitável para fortalecer laços familiares e comunitários. Ao abraçar valores como honestidade e dedicação, os ESTJs se destacam pela capacidade de orientar, criar planos e colocá-los em prática de forma diligente e eficiente. Eles assumem com alegria a liderança em caminhos difíceis, e continuarão firmes mesmo diante do estresse.",
        tracos: ["Decisisvo", "Organizado", "Responsável", "Transparente"]
    },
    "esfj": {
        code: "ESFJ-A/ESFJ-T",
        nome: "Sentinela",
        titulo: "Cônsul",
        descricao: "Para as pessoas com o tipo de personalidade ESFJ (Cônsul), a vida é melhor quando compartilhada. Esses indivíduos sociais são os pilares de diversas comunidades, acolhendo amigos, familiares e vizinhos não apenas em suas casas, mas também em seus corações. Isso não significa que sejam santos nem que gostem de todo mundo. De fato, é provável que sejam mais próximos de quem têm os mesmos valores e opiniões. Ainda assim, independentemente das crenças dos outros, os ESFJs acreditam no poder da hospitalidade e das boas maneiras, e costumam sentir que têm uma obrigação para com aqueles que os cercam. Generosos e confiáveis, eles frequentemente assumem a responsabilidade, seja grande ou pequena, de manter a família e a comunidade unida.",
        tracos: ["Entusiasta", "Empático", "Leal", "Prático"]
    },
    "istp": {
        code: "ISTP-A/ISTP-T",
        nome: "Explorador",
        titulo: "Virtuoso",
        descricao: "Pessoas com o tipo de personalidade ISTP (Virtuoso) adoram explorar com as próprias mãos e olhos, tocando e observando o mundo ao redor com uma impressionante diligência, uma curiosidade natural e uma boa dose de ceticismo. Elas têm um talento nato para criar, passando de um projeto para outro, construindo tanto o útil quanto o supérfluo por diversão, aprendendo com o ambiente conforme avançam. Não há nada mais satisfatório do que colocar a mão na massa, desmontando objetos para montá-los de novo, aprimorando-os um pouco mais.",
        tracos: ["Calmo", "Eficiente", "Proativo", "Engenhoso"]
    },
    "isfp": {
        code: "ISFP-A/ISFP-T",
        nome: "Explorador",
        titulo: "Aventureiro",
        descricao: "Indivíduos com o tipo de personalidade ISFP (Aventureiro) são verdadeiros artistas, mas não necessariamente da forma convencional. Para esse tipo de personalidade, a vida em si é uma tela para autoexpressão. Desde o que vestem até como passam o tempo livre, eles se comportam de maneiras que demonstram claramente quem são como pessoas únicas. Com uma natureza aventureira e talento para apreciar os momentos simples, os ISFPs talvez estejam entre as pessoas mais interessantes que você pode conhecer. Movidos por um forte senso de justiça e uma atitude mente-aberta, os ISFPs encaram a vida com um otimismo contagiante. Eles gostam de incentivar as pessoas ao redor a correr atrás do que realmente as inspira e seguem seus próprios interesses com a mesma intensidade e liberdade. A ironia é que, por serem discretos e humildes, raramente se dão conta do quanto são extraordinários.",
        tracos: ["Criativo", "Gentil", "Mente Aberta", "Presente"]
    },
    "estp": {
        code: "ESTP-A/ESTP-T",   
        nome: "Explorador",
        titulo: "Empreendedor", 
        descricao: "Pessoas com o tipo de personalidade ESTP (Empreendedor) são vibrantes, transbordando entusiasmo e espontaneidade. Geralmente competitivas, elas acreditam que essa mentalidade é essencial para alcançar o sucesso na vida. Movidas pela ação, quase não desperdiçam tempo pensando no passado. Na verdade, elas são ótimas em manter a atenção voltada para o presente, tanto que raramente se preocupam com o relógio ao longo do dia. Teorias, conceitos abstratos e discussões extensas sobre problemas globais e suas implicações não prendem a atenção dos ESTPs por muito tempo. Eles mantêm a conversa animada, com uma boa dose de inteligência, mas preferem falar sobre o que está acontecendo de fato, ou melhor ainda, simplesmente sair e agir. Enquanto outros estão indo, eles já estão voltando, corrigindo os erros à medida que avançam, em vez de ficarem parados e preparando soluções para possíveis imprevistos.",
        tracos: ["Audacioso", "Energético", "Pragmático", "Observador"]
    },
    "esfp": {
        code: "ESFP-A/ESFP-T",
        nome: "Explorador",
        titulo: "Animador",
        descricao: "Se existe alguém capaz de começar a cantar e dançar de forma espontânea, é o ESFP (Animador). As pessoas com esse tipo de personalidade se deixam levar pela emoção do momento e querem que todos também se sintam assim. Quando se trata de animar alguém, nenhum outro tipo de personalidade investe tanto tempo e energia, e nenhum outro faz isso de forma tão irresistível.",
        tracos: ["Divertido", "Espontâneo", "Caloroso", "Generoso"]
    }
};

// Referências aos elementos da página
const campoBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("botao-buscar");
const areaResultado = document.getElementById("resultado");

// ---------- Função principal: consulta a API e monta o cartão ----------
async function buscarPersonalidade(termo) {
    areaResultado.innerHTML = "<p>Carregando...</p>"; // feedback imediato
    
    try {
        // 1) Requisição assíncrona 
        const resposta = await fetch(`${URL_BASE}/types/${termo}`);
        
        // 2) Verifica se a API encontrou o resultado (404)
        if (!resposta.ok) throw new Error("nao-encontrado");
        
        // 3) Converte a resposta DEPOIS da requisição dar certo
        const dados = await resposta.json();
        console.log(dados); // Para depuração, pode ser removido depois
        const termoBuscado = termo.toLowerCase(); 

        // 4) Usa o nome correto do dicionário (traducoes)
        const traduzido = traducoes[termoBuscado];

        // 5) Extrai dados 
        const imagem = dados.image || "https://via.placeholder.com/140"; // imagem padrão se não houver
        const mbti = traduzido ? traduzido.code : (dados.code || termo.toUpperCase());
        const nome = traduzido ? traduzido.nome : (dados.name || termo.toUpperCase());
        const titulo = traduzido ? traduzido.titulo : (dados.title || "Título desconhecido");
        const descricao = traduzido ? traduzido.descricao : (dados.cognitive || "Descrição indisponível.");
        
        // 6) Adiciona o processamento da variável "tracos" que estava faltando
        const listaTracos = traduzido && traduzido.tracos ? traduzido.tracos : (dados.traits || []);
        const tracos = listaTracos.map(t => `<span class="traco">${t}</span>`).join(" · ");
            
        // 7) Monta o HTML
        areaResultado.innerHTML = `
            <article class="cartao">
                <img src="${imagem}" alt="Imagem de ${mbti}">
                <h1>${mbti}</h1>
                <h2>${nome} — ${titulo}</h2>
                <p>${descricao}</p>
                <div class="tracos-container">
                    <b>Principais traços:</b> ${tracos}
                </div>
            </article>`;
    } catch (erro) {
        areaResultado.innerHTML = "<p>Erro ao buscar personalidade.</p>";
    }
}

// ---------- Eventos: clique no botão e tecla Enter ----------
function dispararBusca() {
    const termo = campoBusca.value.toLowerCase().trim();
    if (termo) buscarPersonalidade(termo); // Chamada corrigida para o novo nome da função
}

botaoBuscar.addEventListener("click", dispararBusca);
campoBusca.addEventListener("keydown", (e) => {
    if (e.key === "Enter") dispararBusca();
});