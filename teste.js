// 1. Banco de Perguntas 
// Cada pergunta informa qual eixo do MBTI ela afeta e se é direta (1) ou invertida (-1)
const perguntas = [
    { texto: "Você tem facilidade em se apresentar para pessoas que não conhece.", eixo: "ei", sinal: 1 },
    { texto: "Você prefere planejar suas viagens nos mínimos detalhes em vez de decidir as coisas de improviso.", eixo: "jp", sinal: 1 },
    { texto: "Você costuma ser o centro das atenções em uma festa ou roda de amigos.", eixo: "ei", sinal: 1 },
    { texto: "Você frequentemente se perde em seus pensamentos e esquece do ambiente ao seu redor.", eixo: "sn", sinal: -1 },
    { texto: "Você prefere ler um livro ou assistir a um filme em casa a ir a um evento social.", eixo: "ei", sinal: -1 },
    { texto: "Você prefere instruções passo a passo bem definidas ao invés de liberdade criativa total.", eixo: "sn", sinal: 1 },
    { texto: "Você, em uma discussão, acredita que a verdade deve ser mais importante do que a sensibilidade das pessoas.", eixo: "tf", sinal: 1 },
    { texto: "Você prefere conversas profundas com uma única pessoa do que interagir com um grupo grande.", eixo: "ei", sinal: -1 },
    { texto: "Você evita conflitos e prefere manter a paz, mesmo que isso signifique não expressar sua opinião.", eixo: "tf", sinal: -1 },
    { texto: "Você gosta de experimentar coisas novas e se sente entediado com a rotina.", eixo: "jp", sinal: -1 }, 
    { texto: "Você frequentemente se pega questionando o porquê das coisas existirem da forma que são.", eixo: "sn", sinal: -1 },
    { texto: "Você costuma procrastinar tarefas e resolver as coisas apenas quando o prazo está muito próximo.", eixo: "jp", sinal: -1 },
    { texto: "Você costuma se magoar facilmente quando recebe uma crítica construtiva muito direta.", eixo: "tf", sinal: -1 },
    { texto: "Você é muito observador e costuma notar pequenas mudanças físicas no ambiente ou nas pessoas.", eixo: "sn", sinal: 1 },
    { texto: "Você se sente mais confortável em ambientes estruturados e organizados do que em ambientes caóticos.", eixo: "jp", sinal: 1 },
    { texto: "Você tende a tomar decisões com base em lógica e análise, em vez de emoções.", eixo: "tf", sinal: 1 }
];

// 2. Variáveis de Controle
let indiceAtual = 0;
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
    // ATENÇÃO: Agora puxamos .texto da nossa nova lista de objetos
    tituloPergunta.textContent = perguntas[indice].texto;
    
    // Atualiza as bolinhas
    radios.forEach(radio => {
        radio.name = `p${indice}`; 
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

    btnVoltar.style.visibility = indice === 0 ? "hidden" : "visible";
    btnProximo.textContent = indice === perguntas.length - 1 ? "Finalizar Teste" : "Próximo";
}

// 5. Salvar resposta
radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        respostas[indiceAtual] = e.target.value;
    });
});

// 6. Botão Próximo e Finalização
btnProximo.addEventListener('click', () => {
    if (respostas[indiceAtual] === null) {
        alert("Por favor, selecione uma opção para continuar.");
        return;
    }

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        carregarPergunta(indiceAtual);
    } else {
        barraProgresso.style.width = "100%";
        textoProgresso.textContent = "100% concluído";
        
        const mbtiCalculado = calcularMBTI(respostas);
        
        tituloPergunta.innerHTML = `
            Teste Concluído!<br>
            <span style="color: #33a474; font-size: 3rem; display: block; margin-top: 15px; margin-bottom: 30px;">
                ${mbtiCalculado}
            </span>
            <button onclick="window.location.href='index.html?perfil=${mbtiCalculado}'" style="background-color: #333; color: #fff; padding: 12px 24px; border-radius: 25px; border: none; font-size: 1rem; font-weight: bold; cursor: pointer;">
                Pesquisar minha personalidade
            </button>
        `;
        
        document.querySelector('.opcoes-escala').style.display = "none";
        document.querySelector('.botoes-navegacao').style.display = "none";
    }
});

// 7. Botão Voltar
btnVoltar.addEventListener('click', () => {
    if (indiceAtual > 0) {
        indiceAtual--;
        carregarPergunta(indiceAtual);
    }
});

// 8. Inicia o teste
carregarPergunta(indiceAtual);

// 9. NOVO CÁLCULO INTELIGENTE
function calcularMBTI(respostas) {
    let eixos = { ei: 0, sn: 0, tf: 0, jp: 0 };
    const notas = respostas.map(Number);

    // O código agora passa por todas as respostas automaticamente, não importa se são 10 ou 100 perguntas
    for (let i = 0; i < perguntas.length; i++) {
        let eixoAtual = perguntas[i].eixo;
        let sinalAtual = perguntas[i].sinal;
        
        // Multiplica a nota da bolinha pelo sinal da pergunta e soma no eixo correto
        eixos[eixoAtual] += (notas[i] * sinalAtual);
    }

    // Define a letra final com base no saldo de cada eixo
    const letra1 = eixos.ei >= 0 ? "E" : "I";
    const letra2 = eixos.sn >= 0 ? "S" : "N";
    const letra3 = eixos.tf >= 0 ? "T" : "F";
    const letra4 = eixos.jp >= 0 ? "J" : "P";

    return letra1 + letra2 + letra3 + letra4;
}
const btnTema = document.getElementById('btn-tema');

// Verifica se o usuário já havia escolhido o modo escuro antes
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark-mode');
    btnTema.textContent = '☀️'; // Muda o ícone para o sol
}

btnTema.addEventListener('click', () => {
    // Liga/Desliga a classe dark-mode no body
    document.body.classList.toggle('dark-mode');
    
    // Se o modo escuro estiver ativado, salva no navegador e muda o ícone
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('tema', 'escuro');
        btnTema.textContent = '☀️';
    } else {
        localStorage.setItem('tema', 'claro');
        btnTema.textContent = '🌙'; // Muda o ícone para a lua
    }
});
