// ================================
// NAVEGAÇÃO
// ================================

function mostrarPagina(pagina, botao = null) {

    const paginas = document.querySelectorAll(".pagina");

    paginas.forEach(item => {
        item.classList.remove("ativa");
    });

    const selecionada = document.getElementById(pagina);

    if (selecionada) {
        selecionada.classList.add("ativa");
    }

    const nomes = {
        dashboard: "Dashboard",
        clientes: "Clientes",
        produtos: "Produtos",
        financeiro: "Financeiro",
        documentos: "Documentos",
        assistente: "Assistente CM"
    };

    document.getElementById("tituloPagina").textContent =
        nomes[pagina] || "CM TECH";


    document.querySelectorAll(".menu").forEach(menu => {
        menu.classList.remove("active");
    });


    if (botao) {
        botao.classList.add("active");
    } else {

        const botoes = document.querySelectorAll(".menu");

        botoes.forEach(item => {

            if (
                item.getAttribute("onclick") &&
                item.getAttribute("onclick").includes(`'${pagina}'`)
            ) {
                item.classList.add("active");
            }

        });

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



// ================================
// PESQUISA DE CLIENTES
// ================================

function pesquisarClientes() {

    const input =
        document.getElementById("pesquisaCliente");

    const filtro =
        input.value.toLowerCase();

    const linhas =
        document.querySelectorAll("#tabelaClientes tbody tr");

    linhas.forEach(linha => {

        const texto =
            linha.textContent.toLowerCase();

        if (texto.includes(filtro)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }

    });

}



// ================================
// MODAL
// ================================

function abrirModal(titulo) {

    document.getElementById("modalTitulo").textContent =
        titulo;

    document.getElementById("modal").classList.add("show");

}


function fecharModal() {

    document.getElementById("modal")
        .classList.remove("show");

}


function salvarDemo() {

    alert(
        "Demonstração salva com sucesso!\n\n" +
        "Em uma versão real, essas informações seriam " +
        "armazenadas no banco de dados da empresa."
    );

    fecharModal();

}



// Fecha o modal clicando fora

document.getElementById("modal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {
            fecharModal();
        }

    }
);



// ================================
// ASSISTENTE CM
// ================================

function enviarMensagem() {

    const input =
        document.getElementById("chatInput");

    const texto =
        input.value.trim();

    if (!texto) {
        return;
    }

    adicionarMensagem(texto, "user");

    input.value = "";

    setTimeout(() => {

        const resposta =
            gerarResposta(texto);

        adicionarMensagem(resposta, "ai");

    }, 600);

}



function adicionarMensagem(texto, tipo) {

    const container =
        document.getElementById("chatMessages");

    const mensagem =
        document.createElement("div");

    mensagem.className =
        `message ${tipo}`;

    mensagem.innerHTML =
        texto;

    container.appendChild(mensagem);

    container.scrollTop =
        container.scrollHeight;

}



function perguntaRapida(pergunta) {

    const input =
        document.getElementById("chatInput");

    input.value = pergunta;

    enviarMensagem();

}



// ================================
// RESPOSTAS DA DEMONSTRAÇÃO
// ================================

function gerarResposta(pergunta) {

    const texto =
        pergunta
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");


    if (
        texto.includes("cliente") &&
        (
            texto.includes("quant") ||
            texto.includes("numero") ||
            texto.includes("temos")
        )
    ) {

        return `
            Atualmente existem <strong>128 clientes</strong>
            cadastrados no sistema.
            <br><br>
            Neste mês foram adicionados
            <strong>12 novos clientes</strong>.
        `;

    }


    if (
        texto.includes("faturamento") ||
        texto.includes("faturou") ||
        texto.includes("receita")
    ) {

        return `
            O faturamento registrado neste mês é de
            <strong>R$ 8.450,00</strong>.
            <br><br>
            O resultado representa um crescimento de
            <strong>8,4%</strong> em relação ao período anterior.
        `;

    }


    if (
        texto.includes("produto") &&
        (
            texto.includes("vende") ||
            texto.includes("vendido") ||
            texto.includes("melhor")
        )
    ) {

        return `
            O produto com maior número de vendas neste período é
            o <strong>Plano Premium</strong>,
            com <strong>32 vendas</strong>.
        `;

    }


    if (
        texto.includes("estoque") ||
        texto.includes("produtos")
    ) {

        return `
            Atualmente existem
            <strong>214 produtos</strong>
            cadastrados no estoque.
            <br><br>
            18 produtos estão próximos do estoque mínimo.
        `;

    }


    if (
        texto.includes("despesa") ||
        texto.includes("gasto")
    ) {

        return `
            As despesas registradas neste mês somam
            <strong>R$ 3.120,00</strong>.
            <br><br>
            A maior categoria de despesa atualmente é
            <strong>Operacional</strong>.
        `;

    }


    if (
        texto.includes("oi") ||
        texto.includes("ola") ||
        texto.includes("olá")
    ) {

        return `
            Olá! 👋
            <br><br>
            Sou o Assistente CM.
            Como posso ajudar?
        `;

    }


    return `
        Posso analisar os dados disponíveis nesta
        demonstração.
        <br><br>
        Tente perguntar, por exemplo:
        <br>
        • Quantos clientes temos?
        <br>
        • Qual foi o faturamento?
        <br>
        • Qual produto vendeu mais?
        <br>
        • Como está o estoque?
        <br>
        • Quais são as despesas?
    `;

}