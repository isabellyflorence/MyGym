// =========================
// PROTEÇÃO DO ADMIN
// =========================
if (sessionStorage.getItem("adminLogado") !== "true") {
  window.location.href = "login.html";
}

// =========================
// DADOS PADRÃO
// =========================
const TOTAL_SERVICOS_FIXOS = 4;

const servicosPadrao = [
  {
    id: 1,
    nome: "Boxe",
    descricao: "Aulas focadas em resistência, força, agilidade e condicionamento físico.",
    icone: "fa-solid fa-hand-fist",
    imagem: "img/boxe.jpg",
    preco: 49
  },
  {
    id: 2,
    nome: "Natação",
    descricao: "Atividade completa para melhorar respiração, resistência e fortalecimento muscular.",
    icone: "fa-solid fa-person-swimming",
    imagem: "img/natacao.jpg",
    preco: 69
  },
  {
    id: 3,
    nome: "Aula de Dança",
    descricao: "Aulas dinâmicas para gasto calórico, coordenação e diversão durante o treino.",
    icone: "fa-solid fa-music",
    imagem: "img/danca.jpg",
    preco: 39
  }
];

const planosPadrao = [
  {
    id: 1,
    nome: "Básico",
    preco: 59,
    descricao: "Ideal para quem quer começar com musculação.",
    beneficios: [
      "Acesso à musculação",
      "Uso dos equipamentos",
      "Treino livre"
    ]
  },
  {
    id: 2,
    nome: "Premium",
    preco: 99,
    descricao: "Para quem quer musculação e cardio.",
    beneficios: [
      "Acesso à musculação",
      "Área de cardio completa",
      "Aulas em grupo"
    ]
  },
  {
    id: 3,
    nome: "Elite",
    preco: 149,
    descricao: "Para quem quer todos os serviços.",
    beneficios: [
      "Todos os serviços inclusos",
      "Jiu-Jitsu",
      "Personal Trainer"
    ]
  }
];

// =========================
// LOCALSTORAGE
// =========================
function carregarDados() {
  if (!localStorage.getItem("servicosMyGym")) {
    salvarServicos(servicosPadrao);
  }

  if (!localStorage.getItem("planosMyGym")) {
    salvarPlanos(planosPadrao);
  }

  normalizarServicos();
}

function buscarServicos() {
  return JSON.parse(localStorage.getItem("servicosMyGym")) || [];
}

function salvarServicos(servicos) {
  localStorage.setItem("servicosMyGym", JSON.stringify(servicos));
}

function buscarPlanos() {
  return JSON.parse(localStorage.getItem("planosMyGym")) || [];
}

function salvarPlanos(planos) {
  localStorage.setItem("planosMyGym", JSON.stringify(planos));
}

function buscarSolicitacoes() {
  return JSON.parse(localStorage.getItem("solicitacoesMyGym")) || [];
}

function salvarSolicitacoes(solicitacoes) {
  localStorage.setItem("solicitacoesMyGym", JSON.stringify(solicitacoes));
}

// Garante compatibilidade com serviços antigos salvos sem todos os campos.
function normalizarServicos() {
  const servicos = buscarServicos();

  const servicosAtualizados = servicos.map(servico => ({
    id: servico.id || Date.now(),
    nome: servico.nome || "Serviço adicional",
    descricao: servico.descricao || "Descrição não informada.",
    icone: servico.icone || "fa-solid fa-dumbbell",
    imagem: servico.imagem || "img/gym2.jpeg",
    preco: servico.preco || 0
  }));

  salvarServicos(servicosAtualizados);
}

// =========================
// UTILITÁRIOS
// =========================
function converterImagemParaBase64(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => resolve(leitor.result);
    leitor.onerror = () => reject("Erro ao carregar imagem.");

    leitor.readAsDataURL(arquivo);
  });
}

function imagemTexto(imagem) {
  if (!imagem) return "Sem imagem cadastrada";

  if (imagem.startsWith("data:image")) {
    return "Imagem anexada";
  }

  return imagem;
}

function limparFormularioServico() {
  document.getElementById("formServico")?.reset();

  const id = document.getElementById("servicoId");
  const imagem = document.getElementById("servicoImagem");

  if (id) id.value = "";
  if (imagem) imagem.value = "";
}

function limparFormularioPlano() {
  document.getElementById("formPlano")?.reset();

  const id = document.getElementById("planoId");

  if (id) id.value = "";
}

// =========================
// SERVIÇOS ADICIONAIS
// =========================
function renderizarServicos() {
  const lista = document.getElementById("listaServicos");
  const total = document.getElementById("totalServicos");

  if (!lista) return;

  const servicos = buscarServicos();

  if (total) {
    total.textContent = TOTAL_SERVICOS_FIXOS + servicos.length;
  }

  lista.innerHTML = "";

  servicos.forEach(servico => {
    const item = document.createElement("div");
    item.classList.add("admin-item");

    item.innerHTML = `
      <div class="admin-item-info">
        <h3>
          <i class="${servico.icone || "fa-solid fa-dumbbell"}"></i>
          ${servico.nome}
        </h3>

        <p>${servico.descricao}</p>

        <small>Valor adicional: R$ ${servico.preco}/mês</small>
        <small>Ícone: ${servico.icone || "fa-solid fa-dumbbell"}</small>
        <small>Imagem: ${imagemTexto(servico.imagem)}</small>
      </div>

      <div class="admin-actions">
        <button onclick="editarServico(${servico.id})" title="Editar">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button class="delete" onclick="excluirServico(${servico.id})" title="Excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    lista.appendChild(item);
  });
}

document.getElementById("formServico")?.addEventListener("submit", async function(event) {
  event.preventDefault();

  const id = document.getElementById("servicoId").value;
  const nome = document.getElementById("servicoNome").value.trim();
  const preco = Number(document.getElementById("servicoPreco").value);
  const descricao = document.getElementById("servicoDescricao").value.trim();
  const icone = document.getElementById("servicoIcone").value.trim();

  const inputArquivo = document.getElementById("servicoImagemArquivo");
  let imagem = document.getElementById("servicoImagem").value;

  if (inputArquivo.files.length > 0) {
    imagem = await converterImagemParaBase64(inputArquivo.files[0]);
  }

  if (!imagem) {
    imagem = "img/gym2.jpeg";
  }

  let servicos = buscarServicos();

  if (id) {
    servicos = servicos.map(servico => {
      if (servico.id === Number(id)) {
        return {
          id: Number(id),
          nome,
          preco,
          descricao,
          icone,
          imagem
        };
      }

      return servico;
    });
  } else {
    servicos.push({
      id: Date.now(),
      nome,
      preco,
      descricao,
      icone,
      imagem
    });
  }

  salvarServicos(servicos);
  renderizarServicos();
  limparFormularioServico();
});

function editarServico(id) {
  const servico = buscarServicos().find(item => item.id === id);

  if (!servico) return;

  document.getElementById("servicoId").value = servico.id;
  document.getElementById("servicoNome").value = servico.nome;
  document.getElementById("servicoPreco").value = servico.preco;
  document.getElementById("servicoDescricao").value = servico.descricao;
  document.getElementById("servicoIcone").value = servico.icone;
  document.getElementById("servicoImagem").value = servico.imagem;
  document.getElementById("servicoImagemArquivo").value = "";

  window.location.href = "#servicos";
}

function excluirServico(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este serviço adicional?");

  if (!confirmar) return;

  const servicos = buscarServicos().filter(servico => servico.id !== id);

  salvarServicos(servicos);
  renderizarServicos();
}

// =========================
// PLANOS FIXOS
// =========================
function renderizarPlanos() {
  const lista = document.getElementById("listaPlanos");
  const total = document.getElementById("totalPlanos");

  if (!lista) return;

  const planos = buscarPlanos();

  if (total) {
    total.textContent = planos.length;
  }

  lista.innerHTML = "";

  planos.forEach(plano => {
    const item = document.createElement("div");
    item.classList.add("admin-item");

    item.innerHTML = `
      <div class="admin-item-info">
        <h3>${plano.nome} - R$ ${plano.preco}/mês</h3>

        <p>${plano.descricao}</p>

        <small>
          Benefícios: ${plano.beneficios.join(" • ")}
        </small>
      </div>

      <div class="admin-actions">
        <button onclick="editarPlano(${plano.id})" title="Editar plano">
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>
    `;

    lista.appendChild(item);
  });
}

document.getElementById("formPlano")?.addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("planoId").value;

  if (!id) {
    alert("Escolha um plano para editar primeiro.");
    return;
  }

  const nome = document.getElementById("planoNome").value.trim();
  const preco = Number(document.getElementById("planoPreco").value);
  const descricao = document.getElementById("planoDescricao").value.trim();
  const beneficiosTexto = document.getElementById("planoBeneficios").value.trim();

  const beneficios = beneficiosTexto
    .split("\n")
    .map(item => item.trim())
    .filter(item => item !== "");

  const planos = buscarPlanos().map(plano => {
    if (plano.id === Number(id)) {
      return {
        id: Number(id),
        nome,
        preco,
        descricao,
        beneficios
      };
    }

    return plano;
  });

  salvarPlanos(planos);
  renderizarPlanos();
  limparFormularioPlano();

  alert("Plano atualizado com sucesso!");
});

function editarPlano(id) {
  const plano = buscarPlanos().find(item => item.id === id);

  if (!plano) return;

  document.getElementById("planoId").value = plano.id;
  document.getElementById("planoNome").value = plano.nome;
  document.getElementById("planoPreco").value = plano.preco;
  document.getElementById("planoDescricao").value = plano.descricao;
  document.getElementById("planoBeneficios").value = plano.beneficios.join("\n");

  window.location.href = "#planos";
}

// =========================
// SOLICITAÇÕES DE MATRÍCULA
// =========================
function renderizarSolicitacoes() {
  const lista = document.getElementById("listaSolicitacoes");
  const total = document.getElementById("totalSolicitacoes");

  if (!lista) return;

  const solicitacoes = buscarSolicitacoes();

  if (total) {
    total.textContent = solicitacoes.length;
  }

  lista.innerHTML = "";

  if (solicitacoes.length === 0) {
    lista.innerHTML = `
      <div class="admin-item">
        <div class="admin-item-info">
          <h3>Nenhuma solicitação recebida</h3>
          <p>Quando alguém escolher um plano, a solicitação aparecerá aqui.</p>
        </div>
      </div>
    `;
    return;
  }

  solicitacoes.forEach(solicitacao => {
    const item = document.createElement("div");
    item.classList.add("admin-item");

    const modalidadesTexto =
      solicitacao.modalidadesExtras && solicitacao.modalidadesExtras.length > 0
        ? solicitacao.modalidadesExtras
            .map(modalidade => `${modalidade.nome} (+R$ ${modalidade.preco}/mês)`)
            .join(" • ")
        : "Nenhuma modalidade adicional selecionada";

    item.innerHTML = `
      <div class="admin-item-info">
        <h3>
          <i class="fa-solid fa-user"></i>
          ${solicitacao.nome}
        </h3>

        <p>
          <strong>Plano:</strong> ${solicitacao.plano}<br>
          <strong>Modalidades extras:</strong> ${modalidadesTexto}<br>
          <strong>Telefone:</strong> ${solicitacao.telefone}<br>
          <strong>Email:</strong> ${solicitacao.email}<br>
          <strong>Melhor horário:</strong> ${solicitacao.horario}<br>
          <strong>Data:</strong> ${solicitacao.data}
        </p>

        <small>Status: ${solicitacao.status}</small>

        ${
          solicitacao.observacao
            ? `<small>Observação: ${solicitacao.observacao}</small>`
            : ""
        }
      </div>

      <div class="admin-actions">
        <button onclick="alterarStatusSolicitacao(${solicitacao.id})" title="Alterar status">
          <i class="fa-solid fa-check"></i>
        </button>

        <button class="delete" onclick="excluirSolicitacao(${solicitacao.id})" title="Excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    lista.appendChild(item);
  });
}

function alterarStatusSolicitacao(id) {
  const solicitacoes = buscarSolicitacoes();

  const solicitacoesAtualizadas = solicitacoes.map(solicitacao => {
    if (solicitacao.id === id) {
      let novoStatus = "Pendente";

      if (solicitacao.status === "Pendente") {
        novoStatus = "Contatado";
      } else if (solicitacao.status === "Contatado") {
        novoStatus = "Matriculado";
      }

      return {
        ...solicitacao,
        status: novoStatus
      };
    }

    return solicitacao;
  });

  salvarSolicitacoes(solicitacoesAtualizadas);
  renderizarSolicitacoes();
}

function excluirSolicitacao(id) {
  const confirmar = confirm("Tem certeza que deseja excluir esta solicitação?");

  if (!confirmar) return;

  const solicitacoes = buscarSolicitacoes().filter(solicitacao => solicitacao.id !== id);

  salvarSolicitacoes(solicitacoes);
  renderizarSolicitacoes();
}

// =========================
// EXPORTAR SOLICITAÇÕES
// =========================
function exportarSolicitacoesExcel() {
  const solicitacoes = buscarSolicitacoes();

  if (solicitacoes.length === 0) {
    alert("Não há solicitações para exportar.");
    return;
  }

  const cabecalho = [
    "Nome",
    "Telefone",
    "Email",
    "Plano",
    "Modalidades Extras",
    "Melhor Horário",
    "Observação",
    "Status",
    "Data"
  ];

  const linhas = solicitacoes.map(solicitacao => {
    const modalidadesTexto =
      solicitacao.modalidadesExtras && solicitacao.modalidadesExtras.length > 0
        ? solicitacao.modalidadesExtras
            .map(modalidade => `${modalidade.nome} (+R$ ${modalidade.preco}/mês)`)
            .join(" | ")
        : "Nenhuma";

    return [
      solicitacao.nome || "",
      solicitacao.telefone || "",
      solicitacao.email || "",
      solicitacao.plano || "",
      modalidadesTexto,
      solicitacao.horario || "",
      solicitacao.observacao || "",
      solicitacao.status || "",
      solicitacao.data || ""
    ];
  });

  const conteudoCSV = [
    cabecalho,
    ...linhas
  ]
    .map(linha =>
      linha
        .map(campo => `"${String(campo).replace(/"/g, '""')}"`)
        .join(";")
    )
    .join("\n");

  const arquivo = new Blob(["\uFEFF" + conteudoCSV], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(arquivo);

  const link = document.createElement("a");
  link.href = url;
  link.download = "solicitacoes-matricula-mygym.csv";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// =========================
// SAIR DO ADMIN
// =========================
function sairAdmin() {
  sessionStorage.removeItem("adminLogado");
  window.location.href = "login.html";
}

// =========================
// INICIAR PAINEL
// =========================
carregarDados();
renderizarServicos();
renderizarPlanos();
renderizarSolicitacoes();