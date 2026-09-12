// 1. Banco de Perguntas 
const perguntas = [
    "Você costuma iniciar conversas com facilidade em um ambiente cheio de pessoas desconhecidas.",
    "Você prefere planejar suas viagens nos mínimos detalhes em vez de decidir as coisas de improviso.",
    "Você frequentemente se perde em seus pensamentos e esquece do ambiente ao seu redor.",
    "Você se sente mais energizado após passar um tempo sozinho do que após uma festa.",
    "Em uma discussão, a verdade deve ser mais importante do que a sensibilidade das pessoas.",
    "Você raramente se sente inseguro em situações novas ou desafiadoras.",
    "Você evita conflitos e prefere manter a paz, mesmo que isso signifique não expressar sua opinião.",
    "Você gosta de experimentar coisas novas e se sente entediado com a rotina.",
    "Você prefere seguir regras e procedimentos estabelecidos do que improvisar.",
    "Você se sente mais confortável em ambientes estruturados e organizados do que em ambientes caóticos.",
    "Você tende a tomar decisões com base em lógica e análise, em vez de emoções."
];

// 2. Variáveis de Controle
let indiceAtual = 0;
// Cria um array vazio para guardar a resposta de cada pergunta
const respostas = new Array(perguntas.length).fill(null);

// 3. Referências do HTML
const tituloPergunta = document.querySelector('.pergunta-card h2');
const radios = document.querySelectorAll('input[type="radio"]');
const btnProximo = document.querySelector('.btn-proximo');
const btnVoltar = document.querySelector('.btn-voltar');
const barraProgresso = document.querySelector('.progresso-barra');
const textoProgresso = document.querySelector('.progresso-texto');

// 4. Função que desenha a pergunta na tela
function carregarPergunta(indice) {
    // Troca o texto da pergunta
    tituloPergunta.textContent = perguntas[indice];
    
    // Atualiza as bolinhas
    radios.forEach(radio => {
        // Renomeia o grupo de botões para não dar conflito
        radio.name = `p${indice}`; 
        
        // Se o usuário já respondeu essa antes (ao voltar), marca a bolinha salva
        if (respostas[indice] !== null && radio.value === respostas[indice]) {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });

    // Atualiza a Barra de Progresso
    const porcentagem = Math.round((indice / perguntas.length) * 100);
    barraProgresso.style.width = `${porcentagem}%`;
    textoProgresso.textContent = `${porcentagem}% concluído`;

    // Esconde o botão voltar na primeira pergunta
    btnVoltar.style.visibility = indice === 0 ? "hidden" : "visible";
    
    // Muda o texto do botão final
    btnProximo.textContent = indice === perguntas.length - 1 ? "Finalizar Teste" : "Próximo";
}

// 5. Salvar resposta quando o usuário clica numa bolinha
radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        respostas[indiceAtual] = e.target.value;
    });
});

// 6. Botão Próximo
btnProximo.addEventListener('click', () => {
    // Trava se não respondeu
    if (respostas[indiceAtual] === null) {
        alert("Por favor, selecione uma opção para continuar.");
        return;
    }

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        carregarPergunta(indiceAtual);
        // ... dentro do botão próximo, quando chegar na última pergunta:
   // ... dentro do botão próximo, quando chegar na última pergunta:
    } else {
    barraProgresso.style.width = "100%";
    textoProgresso.textContent = "100% concluído";
    
    // Calcula o MBTI
    const mbtiCalculado = calcularMBTI(respostas);
    
    // Exibe o resultado e adiciona o botão para voltar ao index.html
    tituloPergunta.innerHTML = `
        Teste Concluído!<br>
        <span style="color: #33a474; font-size: 3rem; display: block; margin-top: 15px; margin-bottom: 30px;">
            ${mbtiCalculado}
        </span>
        <button onclick="window.location.href='index.html'" style="background-color: #333; color: #fff; padding: 12px 24px; border-radius: 25px; border: none; font-size: 1rem; font-weight: bold; cursor: pointer;">
            Pesquisar minha personalidade
        </button>
    `;
    
    // Esconde as bolinhas e a barra de navegação antiga
    document.querySelector('.opcoes-escala').style.display = "none";
    document.querySelector('.botoes-navegacao').style.display = "none";
}
}
);

// 7. Botão Voltar
btnVoltar.addEventListener('click', () => {
    if (indiceAtual > 0) {
        indiceAtual--;
        carregarPergunta(indiceAtual);
    }
});

// 8. Inicia o teste carregando a primeira pergunta
carregarPergunta(indiceAtual);

function calcularMBTI(respostas) {
    let ei = 0, sn = 0, tf = 0, jp = 0;

    // Converte as respostas de texto ('-1', '2') para números
    const notas = respostas.map(Number);

    // Mapeamento das 6 perguntas de exemplo para as 4 dimensões
    ei += notas[0]; // P1: Iniciar conversas (Extroversão + / Introversão -)
    jp += notas[1]; // P2: Planejar viagens (Julgamento + / Percepção -)
    sn -= notas[2]; // P3: Perder-se em pensamentos (Sensação + / Intuição -) -> Invertido
    ei -= notas[3]; // P4: Energizado sozinho (Introversão) -> Invertido no eixo
    tf += notas[4]; // P5: Verdade em discussões (Pensamento + / Sentimento -)
    ei += notas[5]; // P6: Segurança (Atribuído a extroversão/assertividade aqui)

    // Se o saldo final for maior ou igual a zero, ganha a primeira letra. Se for negativo, a segunda.
    const letra1 = ei >= 0 ? "E" : "I";
    const letra2 = sn >= 0 ? "S" : "N";
    const letra3 = tf >= 0 ? "T" : "F";
    const letra4 = jp >= 0 ? "J" : "P";

    return letra1 + letra2 + letra3 + letra4;
}