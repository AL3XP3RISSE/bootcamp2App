# PersonalitySeek  Web
## Autor
Alex Machado Generoso Perissê — Matrícula 22610844
## Descrição
Um WebSite de busca para pesquisar informações sobre a personalidade MBTI(Myers-Briggs Type Indicator) do usuário, em que este tenha feito o teste disponibilizado em primeiro lugar e possa buscar por uma definição resumida e objetiva com os principais traços. Um site de autodescoberta. 
## API utilizada
- PersonalityAPI — https://personality.fyi/api/v1
- Endpoint consumido: `/api/v1/types/{infp}`
## Funcionalidades
- Teste de Personalidade 
- Busca por código MBTI para acessar a descrição (botão ou tecla Enter).
- Exibição de código MBTI, o tipo e o nome da personalidade MBTI, descrição e principais traços.
- Mensagens amigáveis para busca sem resultado e falha de conexão.
- Salvar nos favoritos.
- Permite histórico de buscas.
## SideQuests
- SQ01 Explicação: O .dockerignore lista arquivos que o Docker não deve enviar ao construir a imagem. Portanto, excluí-los deixa a imagem menor, pois ela carrega só o que o site precisa, e o build mais rápido, porque o Docker envia menos arquivos no início do processo e o cache é aproveitado melhor.
- SQ04 Explicação: "Se eu tivesse 100 containers, como gerenciaria?" Subir dois containers à mão, com docker run em portas diferentes, é simples, mas com 100 containers esse método deixa de funcionar: seria preciso decidir em qual máquina cada um roda, reiniciar os que caírem, distribuir o acesso entre eles e atualizar a versão sem derrubar o serviço. Esse é o papel de um orquestrador como o Kubernetes. Ele organiza as máquinas em um cluster, formado por vários nós (máquinas) e um plano de controle que toma as decisões. A menor unidade que ele gerencia é o pod, que agrupa um ou mais containers que compartilham rede e armazenamento. Em vez de iniciar containers um a um, eu declaro quantas réplicas do pod quero, e o Kubernetes mantém esse número: se um pod falha, cria outro, e se a demanda cresce, o número de réplicas pode ser aumentado. 
## Como executar localmente
1. Clone: `git clone https://github.com/AL3XP3RISSE/bootcamp2App.git`
2. Abra o arquivo `index.html` no navegador
## Persistência
- Banco de Dados: Supabase.
- Estrutura da Tabela 'favoritos': id (pk), criado_em, code, nome, titulo, descricao, tracos.
- O que é salvo: Código MBTI, Nome da Personalidade MBTI e os Traços.
## Links
- **Aplicação no ar (GitHub Pages):** https://al3xp3risse.github.io/bootcamp2App/
- **Repositório GitHub:** https://github.com/AL3XP3RISSE/bootcamp2App
- **Repositório DockerHub:** https://hub.docker.com/r/alexperisse/personalityseek
## Link docker run
```bash
docker run -d -p 8080:80 alexperisse/personalityseek:1.1
```
