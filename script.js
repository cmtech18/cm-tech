/* =====================================================
   CM TECH - SISTEMA DE GESTÃO
   ===================================================== */


/* =====================================================
   NAVEGAÇÃO
   ===================================================== */

const botoesMenu = document.querySelectorAll(".menu-item");
const paginas = document.querySelectorAll(".pagina");


botoesMenu.forEach(botao => {

    botao.addEventListener("click", () => {

        const paginaSelecionada = botao.dataset.pagina;


        botoesMenu.forEach(item => {
            item.classList.remove("ativo");
        });


        botao.classList.add("ativo");


        paginas.forEach(pagina => {
            pagina.classList.remove("ativa");
        });


        const pagina = document.getElementById(
            paginaSelecionada
        );


        if (pagina) {
            pagina.classList.add("ativa");
        }

    });

});



/* =====================================================
   CLIENTES
   ===================================================== */

const CHAVE_CLIENTES = "cmtech_clientes";


let clientes = JSON.parse(
    localStorage.getItem(CHAVE_CLIENTES)
) || [

    {
        id: 1,
        nome: "Carlos Silva",
        telefone: "(85) 99999-1111",
        email: "carlos@email.com"
    },

    {
        id: 2,
        nome: "Mariana Santos",
        telefone: "(85) 98888-2222",
        email: "mariana@email.com"
    },

    {
        id: 3,
        nome: "João Oliveira",
        telefone: "(85) 97777-3333",
        email: "joao@email.com"
    },

    {
        id: 4,
        nome: "Ana Costa",
        telefone: "(85) 96666-4444",
        email: "ana@email.com"
    }

];


let clienteEditandoId = null;



function salvarClientes() {

    localStorage.setItem(
        CHAVE_CLIENTES,
        JSON.stringify(clientes)
    );

}



function renderizarClientes(lista = clientes) {

    const corpo = document.getElementById(
        "corpoTabelaClientes"
    );


    if (!corpo) return;


    corpo.innerHTML = "";


    if (lista.length === 0) {

        corpo.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    Nenhum cliente encontrado.
                </td>
            </tr>
        `;

        return;
    }


    lista.forEach(cliente => {

        const linha = document.createElement("tr");


        linha.innerHTML = `

            <td>
                <strong>
                    ${escaparHTML(cliente.nome)}
                </strong>
            </td>

            <td>
                ${escaparHTML(cliente.telefone)}
            </td>

            <td>
                ${escaparHTML(cliente.email)}
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="botao-editar"
                        onclick="editarCliente(${cliente.id})"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        class="botao-apagar-cliente"
                        onclick="apagarCliente(${cliente.id})"
                    >
                        🗑️ Excluir
                    </button>

                </div>

            </td>

        `;


        corpo.appendChild(linha);

    });

}



function atualizarTotalClientes() {

    const elemento = document.getElementById(
        "totalClientes"
    );


    if (elemento) {
        elemento.textContent = clientes.length;
    }

}



const campoPesquisaCliente = document.getElementById(
    "pesquisaCliente"
);


if (campoPesquisaCliente) {

    campoPesquisaCliente.addEventListener(
        "input",
        () => {

            const termo = campoPesquisaCliente.value
                .toLowerCase()
                .trim();


            const resultado = clientes.filter(cliente =>

                cliente.nome
                    .toLowerCase()
                    .includes(termo)

                ||

                cliente.telefone
                    .toLowerCase()
                    .includes(termo)

                ||

                cliente.email
                    .toLowerCase()
                    .includes(termo)

            );


            renderizarClientes(resultado);

        }
    );

}



/* Abrir cliente novo */

function novoCliente() {

    clienteEditandoId = null;


    document.getElementById(
        "tituloModalCliente"
    ).textContent = "Novo cliente";


    document.getElementById(
        "nomeCliente"
    ).value = "";


    document.getElementById(
        "telefoneCliente"
    ).value = "";


    document.getElementById(
        "emailCliente"
    ).value = "";


    abrirModal("modalCliente");

}



/* Editar cliente */

function editarCliente(id) {

    const cliente = clientes.find(
        item => item.id === id
    );


    if (!cliente) return;


    clienteEditandoId = id;


    document.getElementById(
        "tituloModalCliente"
    ).textContent = "Editar cliente";


    document.getElementById(
        "nomeCliente"
    ).value = cliente.nome;


    document.getElementById(
        "telefoneCliente"
    ).value = cliente.telefone;


    document.getElementById(
        "emailCliente"
    ).value = cliente.email;


    abrirModal("modalCliente");

}



/* Salvar cliente */

const formCliente = document.getElementById(
    "formCliente"
);


if (formCliente) {

    formCliente.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nome = document.getElementById(
                "nomeCliente"
            ).value.trim();


            const telefone = document.getElementById(
                "telefoneCliente"
            ).value.trim();


            const email = document.getElementById(
                "emailCliente"
            ).value.trim();



            if (clienteEditandoId !== null) {

                const cliente = clientes.find(
                    item => item.id === clienteEditandoId
                );


                if (cliente) {

                    cliente.nome = nome;
                    cliente.telefone = telefone;
                    cliente.email = email;

                }


                mostrarAviso(
                    "Cliente atualizado com sucesso!"
                );

            } else {

                clientes.push({

                    id: Date.now(),

                    nome: nome,

                    telefone: telefone,

                    email: email

                });


                mostrarAviso(
                    "Cliente cadastrado com sucesso!"
                );

            }


            salvarClientes();

            renderizarClientes();

            atualizarTotalClientes();

            fecharModal("modalCliente");

            formCliente.reset();

            clienteEditandoId = null;

        }
    );

}



/* Excluir cliente */

function apagarCliente(id) {

    const cliente = clientes.find(
        item => item.id === id
    );


    if (!cliente) return;


    const confirmar = confirm(
        `Deseja realmente excluir o cliente "${cliente.nome}"?`
    );


    if (!confirmar) return;


    clientes = clientes.filter(
        item => item.id !== id
    );


    salvarClientes();

    renderizarClientes();

    atualizarTotalClientes();


    mostrarAviso(
        "Cliente excluído com sucesso!"
    );

}



/* =====================================================
   PRODUTOS
   ===================================================== */

const CHAVE_PRODUTOS = "cmtech_produtos";


let produtos = JSON.parse(
    localStorage.getItem(CHAVE_PRODUTOS)
) || [

    {
        id: 1,
        codigo: "PROD001",
        nome: "Produto Premium",
        categoria: "Categoria A",
        custo: 80,
        preco: 149.90,
        estoque: 25,
        estoqueMinimo: 10
    },

    {
        id: 2,
        codigo: "PROD002",
        nome: "Produto Básico",
        categoria: "Categoria B",
        custo: 40,
        preco: 79.90,
        estoque: 42,
        estoqueMinimo: 10
    },

    {
        id: 3,
        codigo: "PROD003",
        nome: "Produto Especial",
        categoria: "Categoria A",
        custo: 120,
        preco: 219.90,
        estoque: 8,
        estoqueMinimo: 10
    }

];


let produtoEditandoId = null;



/* Salvar produtos */

function salvarProdutos() {

    localStorage.setItem(
        CHAVE_PRODUTOS,
        JSON.stringify(produtos)
    );

}



/* Formatar dinheiro */

function formatarPreco(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}



/* Status do estoque */

function obterStatusEstoque(produto) {

    const estoque = Number(produto.estoque);

    const minimo = Number(
        produto.estoqueMinimo
    );


    if (estoque === 0) {

        return {
            texto: "Sem estoque",
            classe: "produto-estoque-zerado"
        };

    }


    if (estoque <= minimo) {

        return {
            texto: `Baixo (${estoque})`,
            classe: "produto-estoque-baixo"
        };

    }


    return {
        texto: `Normal (${estoque})`,
        classe: "produto-estoque-normal"
    };

}



/* Renderizar produtos */

function renderizarProdutos(lista = produtos) {

    const corpo = document.getElementById(
        "corpoTabelaProdutos"
    );


    if (!corpo) return;


    corpo.innerHTML = "";


    if (lista.length === 0) {

        corpo.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        atualizarResumoProdutos();

        return;
    }


    lista.forEach(produto => {

        const linha = document.createElement("tr");


        const status = obterStatusEstoque(
            produto
        );


        linha.innerHTML = `

            <td>
                ${escaparHTML(produto.codigo)}
            </td>

            <td>
                <strong>
                    ${escaparHTML(produto.nome)}
                </strong>
            </td>

            <td>
                ${escaparHTML(produto.categoria)}
            </td>

            <td class="custo">
                ${formatarPreco(produto.custo)}
            </td>

            <td class="preco">
                ${formatarPreco(produto.preco)}
            </td>

            <td class="${status.classe}">
                ${status.texto}
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="botao-editar"
                        onclick="editarProduto(${produto.id})"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        class="botao-apagar-produto"
                        onclick="apagarProduto(${produto.id})"
                    >
                        🗑️ Excluir
                    </button>

                </div>

            </td>

        `;


        corpo.appendChild(linha);

    });


    atualizarResumoProdutos();

}



/* Resumo dos produtos */

function atualizarResumoProdutos() {

    const quantidadeProdutos =
        document.getElementById(
            "quantidadeProdutos"
        );


    const totalEstoqueProdutos =
        document.getElementById(
            "totalEstoqueProdutos"
        );


    const produtosEstoqueBaixo =
        document.getElementById(
            "produtosEstoqueBaixo"
        );


    const produtosSemEstoque =
        document.getElementById(
            "produtosSemEstoque"
        );


    const valorCustoEstoque =
        document.getElementById(
            "valorCustoEstoque"
        );


    const valorVendaEstoque =
        document.getElementById(
            "valorVendaEstoque"
        );


    const lucroEstoque =
        document.getElementById(
            "lucroEstoque"
        );



    const quantidade =
        produtos.length;


    const unidades =
        produtos.reduce(
            (total, produto) =>
                total + Number(produto.estoque),
            0
        );


    const baixos =
        produtos.filter(produto =>
            Number(produto.estoque) > 0 &&
            Number(produto.estoque) <=
            Number(produto.estoqueMinimo)
        ).length;


    const zerados =
        produtos.filter(produto =>
            Number(produto.estoque) === 0
        ).length;


    const custoTotal =
        produtos.reduce(
            (total, produto) =>
                total +
                (
                    Number(produto.custo) *
                    Number(produto.estoque)
                ),
            0
        );


    const vendaTotal =
        produtos.reduce(
            (total, produto) =>
                total +
                (
                    Number(produto.preco) *
                    Number(produto.estoque)
                ),
            0
        );


    const lucroTotal =
        vendaTotal - custoTotal;



    if (quantidadeProdutos) {

        quantidadeProdutos.textContent =
            quantidade;

    }


    if (totalEstoqueProdutos) {

        totalEstoqueProdutos.textContent =
            unidades;

    }


    if (produtosEstoqueBaixo) {

        produtosEstoqueBaixo.textContent =
            baixos;

    }


    if (produtosSemEstoque) {

        produtosSemEstoque.textContent =
            zerados;

    }


    if (valorCustoEstoque) {

        valorCustoEstoque.textContent =
            formatarPreco(custoTotal);

    }


    if (valorVendaEstoque) {

        valorVendaEstoque.textContent =
            formatarPreco(vendaTotal);

    }


    if (lucroEstoque) {

        lucroEstoque.textContent =
            formatarPreco(lucroTotal);

    }


    atualizarTotalEstoqueDashboard();

}



/* Estoque no Dashboard */

function atualizarTotalEstoqueDashboard() {

    const elemento =
        document.getElementById(
            "totalEstoque"
        );


    if (!elemento) return;


    const total =
        produtos.reduce(
            (soma, produto) =>
                soma + Number(produto.estoque),
            0
        );


    elemento.textContent = total;

}



/* Pesquisa */

const campoPesquisaProduto =
    document.getElementById(
        "pesquisaProduto"
    );


const filtroEstoque =
    document.getElementById(
        "filtroEstoque"
    );



function filtrarProdutos() {

    const termo =
        campoPesquisaProduto
            ? campoPesquisaProduto.value
                .toLowerCase()
                .trim()
            : "";


    const filtro =
        filtroEstoque
            ? filtroEstoque.value
            : "todos";


    const resultado =
        produtos.filter(produto => {


            const correspondePesquisa =

                produto.nome
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.codigo
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.categoria
                    .toLowerCase()
                    .includes(termo);



            let correspondeEstoque = true;


            if (filtro === "normal") {

                correspondeEstoque =
                    Number(produto.estoque) >
                    Number(produto.estoqueMinimo);

            }


            if (filtro === "baixo") {

                correspondeEstoque =
                    Number(produto.estoque) > 0 &&
                    Number(produto.estoque) <=
                    Number(produto.estoqueMinimo);

            }


            if (filtro === "zerado") {

                correspondeEstoque =
                    Number(produto.estoque) === 0;

            }


            return (
                correspondePesquisa &&
                correspondeEstoque
            );

        });


    renderizarProdutos(resultado);

}



if (campoPesquisaProduto) {

    campoPesquisaProduto.addEventListener(
        "input",
        filtrarProdutos
    );

}


if (filtroEstoque) {

    filtroEstoque.addEventListener(
        "change",
        filtrarProdutos
    );

}



/* Novo produto */

function novoProduto() {

    produtoEditandoId = null;


    document.getElementById(
        "tituloModalProduto"
    ).textContent = "Novo produto";


    document.getElementById(
        "botaoSalvarProduto"
    ).textContent = "Salvar produto";


    document.getElementById(
        "codigoProduto"
    ).value = "";


    document.getElementById(
        "nomeProduto"
    ).value = "";


    document.getElementById(
        "categoriaProduto"
    ).value = "";


    document.getElementById(
        "custoProduto"
    ).value = "";


    document.getElementById(
        "precoProduto"
    ).value = "";


    document.getElementById(
        "estoqueProduto"
    ).value = "";


    document.getElementById(
        "estoqueMinimoProduto"
    ).value = "";


    abrirModal("modalProduto");

}



/* Editar produto */

function editarProduto(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) return;


    produtoEditandoId = id;


    document.getElementById(
        "tituloModalProduto"
    ).textContent = "Editar produto";


    document.getElementById(
        "botaoSalvarProduto"
    ).textContent = "Salvar alterações";


    document.getElementById(
        "codigoProduto"
    ).value = produto.codigo;


    document.getElementById(
        "nomeProduto"
    ).value = produto.nome;


    document.getElementById(
        "categoriaProduto"
    ).value = produto.categoria;


    document.getElementById(
        "custoProduto"
    ).value = produto.custo;


    document.getElementById(
        "precoProduto"
    ).value = produto.preco;


    document.getElementById(
        "estoqueProduto"
    ).value = produto.estoque;


    document.getElementById(
        "estoqueMinimoProduto"
    ).value =
        produto.estoqueMinimo;


    abrirModal("modalProduto");

}



/* Salvar produto */

const formProduto =
    document.getElementById(
        "formProduto"
    );


if (formProduto) {

    formProduto.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const codigo =
                document.getElementById(
                    "codigoProduto"
                ).value.trim();


            const nome =
                document.getElementById(
                    "nomeProduto"
                ).value.trim();


            const categoria =
                document.getElementById(
                    "categoriaProduto"
                ).value.trim();


            const custo =
                Number(
                    document.getElementById(
                        "custoProduto"
                    ).value
                );


            const preco =
                Number(
                    document.getElementById(
                        "precoProduto"
                    ).value
                );


            const estoque =
                Number(
                    document.getElementById(
                        "estoqueProduto"
                    ).value
                );


            const estoqueMinimo =
                Number(
                    document.getElementById(
                        "estoqueMinimoProduto"
                    ).value
                );



            /* Verificar código duplicado */

            const codigoDuplicado =
                produtos.some(produto =>

                    produto.codigo
                        .toLowerCase() ===
                    codigo.toLowerCase()

                    &&

                    produto.id !==
                    produtoEditandoId

                );


            if (codigoDuplicado) {

                mostrarAviso(
                    "Já existe um produto com esse código."
                );

                return;

            }



            /* EDITAR */

            if (produtoEditandoId !== null) {

                const produto =
                    produtos.find(
                        item =>
                            item.id ===
                            produtoEditandoId
                    );


                if (produto) {

                    produto.codigo =
                        codigo;

                    produto.nome =
                        nome;

                    produto.categoria =
                        categoria;

                    produto.custo =
                        custo;

                    produto.preco =
                        preco;

                    produto.estoque =
                        estoque;

                    produto.estoqueMinimo =
                        estoqueMinimo;

                }


                mostrarAviso(
                    "Produto atualizado com sucesso!"
                );

            }


            /* NOVO */

            else {

                produtos.push({

                    id: Date.now(),

                    codigo: codigo,

                    nome: nome,

                    categoria: categoria,

                    custo: custo,

                    preco: preco,

                    estoque: estoque,

                    estoqueMinimo:
                        estoqueMinimo

                });


                mostrarAviso(
                    "Produto cadastrado com sucesso!"
                );

            }



            salvarProdutos();

            renderizarProdutos();

            atualizarResumoProdutos();

            fecharModal("modalProduto");

            formProduto.reset();

            produtoEditandoId = null;

        }
    );

}



/* Excluir produto */

function apagarProduto(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja realmente excluir o produto "${produto.nome}"?`
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(
            item => item.id !== id
        );


    salvarProdutos();

    renderizarProdutos();

    atualizarResumoProdutos();


    mostrarAviso(
        "Produto excluído com sucesso!"
    );

}



/* =====================================================
   ASSISTENTE CM
   ===================================================== */

function perguntarAssistente(pergunta) {

    const resposta =
        document.getElementById(
            "respostaAssistente"
        );


    if (!resposta) return;


    const texto =
        pergunta
            .toLowerCase()
            .trim();



    if (
        texto.includes("cliente") &&
        texto.includes("quantos")
    ) {

        resposta.innerHTML = `
            👥 Atualmente existem
            <strong>${clientes.length} clientes</strong>
            cadastrados no sistema.
        `;

        return;

    }



    if (texto.includes("faturamento")) {

        resposta.innerHTML = `
            💰 O faturamento atual da demonstração
            é de <strong>R$ 8.450,00</strong>.
        `;

        return;

    }



    if (texto.includes("estoque")) {

        const total =
            produtos.reduce(
                (soma, produto) =>
                    soma +
                    Number(produto.estoque),
                0
            );


        const baixos =
            produtos.filter(produto =>
                Number(produto.estoque) > 0 &&
                Number(produto.estoque) <=
                Number(produto.estoqueMinimo)
            ).length;


        resposta.innerHTML = `
            📦 Existem
            <strong>${total} unidades</strong>
            em estoque.

            <br><br>

            ⚠️ Atualmente existem
            <strong>${baixos} produtos com estoque baixo.</strong>
        `;

        return;

    }



    if (texto.includes("despesas")) {

        resposta.innerHTML = `
            📉 As despesas atuais da demonstração
            são de <strong>R$ 3.120,00</strong>.
        `;

        return;

    }



    resposta.innerHTML = `
        🤖 Ainda estou aprendendo a responder
        essa pergunta.
    `;

}



/* =====================================================
   MODAIS
   ===================================================== */

function abrirModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.add(
            "aberto"
        );

    }

}



function fecharModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove(
            "aberto"
        );

    }

}



/* Fechar clicando fora */

window.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "aberto"
            );

        }

    }
);



/* =====================================================
   AVISOS
   ===================================================== */

function mostrarAviso(mensagem) {

    const aviso =
        document.getElementById(
            "aviso"
        );


    if (!aviso) return;


    aviso.textContent =
        mensagem;


    aviso.classList.add(
        "mostrar"
    );


    setTimeout(
        () => {

            aviso.classList.remove(
                "mostrar"
            );

        },
        3000
    );

}



/* =====================================================
   SEGURANÇA
   ===================================================== */

function escaparHTML(texto) {

    return String(texto)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

salvarClientes();

salvarProdutos();

renderizarClientes();

renderizarProdutos();

atualizarTotalClientes();

atualizarResumoProdutos();