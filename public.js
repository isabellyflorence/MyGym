// =========================
// DADOS PADRÃO - PUBLIC
// =========================
const servicosPadraoPublico = [
  {
    id: 1,
    nome: "Musculação",
    descricao: "Treinos completos para ganho de massa e força.",
    icone: "fa-solid fa-dumbbell",
    imagem: "img/musculação.jpg"
  },
  {
    id: 2,
    nome: "Cardio",
    descricao: "Exercícios para melhorar resistência e queimar gordura.",
    icone: "fa-solid fa-heart-pulse",
    imagem: "img/cardio.jpeg"
  },
  {
    id: 3,
    nome: "Jiu-Jitsu",
    descricao: "Melhora resistência e condicionamento físico.",
    icone: "fa-solid fa-user-ninja",
    imagem: "img/jiu-jitsu.jpg"
  },
  {
    id: 4,
    nome: "Personal Trainer",
    descricao: "Acompanhamento individual para melhores resultados.",
    icone: "fa-solid fa-clipboard-list",
    imagem: "img/personal.jpg"
  }
];

const planosPadraoPublico = [
  {
    id: 1,
    nome: "Básico",
    preco: 59,
    descricao: "Ideal para quem quer começar com musculação.",
    beneficios: [
      "Acesso à musculação",
      "Uso dos equipamentos",
      "Treino livre",
      "Ambiente climatizado",
      "Ideal para iniciantes"
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
      "Aulas em grupo",
      "Horários flexíveis",
      "Melhor custo-benefício"
    ]
  },
  {
    id: 3,
    nome: "Elite",
    preco: 149,
    descricao: "Para quem quer todos os serviços.",
    beneficios: [
      "Todos os serviços inclusos",
      "Musculação + cardio",
      "Jiu-Jitsu",
      "Personal Trainer",
      "Acompanhamento individual"
    ]
  }
];

// =========================
// BUSCAR DADOS DO LOCALSTORAGE
// =========================
function buscarServicosPublicos() {
  return JSON.parse(localStorage.getItem("servicosMyGym")) || servicosPadraoPublico;
}

function buscarPlanosPublicos() {
  return JSON.parse(localStorage.getItem("planosMyGym")) || planosPadraoPublico;
}

function buscarServicosExtras() {
  return JSON.parse(localStorage.getItem("servicosMyGym")) || [];
}

// =========================
// SERVIÇOS EXTRAS
// =========================
function renderizarServicosExtras() {
  const container = document.getElementById("servicosExtras");

  if (!container) return;

  const servicos = buscarServicosExtras();

  container.innerHTML = "";

  if (servicos.length === 0) {
    container.innerHTML = `
      <p style="color: rgba(255,255,255,0.55); text-align: center; grid-column: 1 / -1;">
        Nenhum serviço adicional cadastrado no momento.
      </p>
    `;
    return;
  }

  servicos.forEach(servico => {
    const card = document.createElement("div");
    card.classList.add("extra-service-card");

    card.innerHTML = `
      <div class="extra-service-img">
        <img src="${servico.imagem || "img/gym2.jpeg"}" alt="${servico.nome}">
      </div>

      <div class="extra-service-content">
        <i class="${servico.icone || "fa-solid fa-dumbbell"}"></i>

        <h3>${servico.nome}</h3>

        <p>${servico.descricao}</p>

        <span class="extra-service-price">
          + R$ ${servico.preco || 0}/mês
        </span>
      </div>
    `;

    container.appendChild(card);
  });
}

// =========================
// SERVIÇOS NA HOME
// =========================
function renderizarServicosHome() {
  const container = document.getElementById("servicosHome");

  if (!container) return;

  container.innerHTML = "";

  servicosPadraoPublico.forEach(servico => {
    const card = document.createElement("div");
    card.classList.add("service-card");

    card.innerHTML = `
      <h2>${servico.nome}</h2>
      <p>${servico.descricao}</p>
    `;

    container.appendChild(card);
  });
}

// =========================
// SERVIÇOS NA PÁGINA SERVIÇOS
// =========================
function renderizarServicosPagina() {
  const container = document.getElementById("servicosPagina");

  if (!container) return;

  container.innerHTML = "";

  servicosPadraoPublico.forEach((servico, index) => {
    const card = document.createElement("article");
    card.classList.add("service-large-card");

    if (index % 2 !== 0) {
      card.classList.add("reverse");
    }

    const beneficios = [
      "Equipamentos modernos e variados",
      "Treinos para iniciantes e avançados",
      "Foco em evolução e condicionamento",
      "Ambiente seguro e organizado"
    ];

    const beneficiosHTML = beneficios
      .map(beneficio => `<li>${beneficio}</li>`)
      .join("");

    card.innerHTML = `
      <div class="service-image">
        <img src="${servico.imagem || "img/gym2.jpeg"}" alt="${servico.nome}">
      </div>

      <div class="service-content">
        <div class="service-icon">
          <i class="${servico.icone}"></i>
        </div>

        <h3>${servico.nome}</h3>

        <p>${servico.descricao}</p>

        <ul>
          ${beneficiosHTML}
        </ul>

        <a href="planos.html" class="service-link">
          Ver plano ideal
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// =========================
// PLANOS NA HOME
// =========================
function renderizarPlanosHome() {
  const container = document.getElementById("planosHome");

  if (!container) return;

  const planos = buscarPlanosPublicos();

  container.innerHTML = "";

  planos.forEach(plano => {
    const card = document.createElement("div");
    card.classList.add("plan-card");

    if (plano.nome.toLowerCase().includes("premium")) {
      card.classList.add("destaque");
    }

    card.innerHTML = `
      <h2>${plano.nome}</h2>
      <p class="price">R$ ${plano.preco}/mês</p>
      <p>${plano.descricao}</p>

      <button onclick="planSelect('${plano.nome}')">
        Escolher
      </button>
    `;

    container.appendChild(card);
  });
}

// =========================
// FUNÇÕES AUXILIARES DOS PLANOS
// =========================
function definirBadgePlano(nomePlano) {
  const nome = nomePlano.toLowerCase();

  if (nome.includes("premium")) {
    return "Melhor custo-benefício";
  }

  if (nome.includes("elite")) {
    return "Completo";
  }

  return "Essencial";
}

function verificarPlanoDestaque(nomePlano) {
  return nomePlano.toLowerCase().includes("premium");
}

// =========================
// PLANOS NA PÁGINA PLANOS
// Mostra só 4 benefícios no card.
// O modal mostra todos.
// =========================
function renderizarPlanosPagina() {
  const container = document.getElementById("planosPagina");

  if (!container) return;

  const planos = buscarPlanosPublicos();

  container.innerHTML = "";

  planos.forEach(plano => {
    const card = document.createElement("article");
    card.classList.add("pricing-card");

    const ehDestaque = verificarPlanoDestaque(plano.nome);

    if (ehDestaque) {
      card.classList.add("featured");
    }

    const beneficios = Array.isArray(plano.beneficios) ? plano.beneficios : [];
    const beneficiosVisiveis = beneficios.slice(0, 4);

    const beneficiosHTML = beneficiosVisiveis
      .map(beneficio => `<li>${beneficio}</li>`)
      .join("");

    const temMaisBeneficios = beneficios.length > 4;

    card.innerHTML = `
      ${ehDestaque ? '<div class="popular-tag">Mais escolhido</div>' : ""}

      <div class="pricing-top">
        <span class="plan-badge">
          ${definirBadgePlano(plano.nome)}
        </span>

        <h3>${plano.nome}</h3>

        <p>${plano.descricao}</p>
      </div>

      <div class="pricing-price">
        <span>R$</span>
        <strong>${plano.preco}</strong>
        <small>/mês</small>
      </div>

      <ul class="pricing-list">
        ${beneficiosHTML}

        ${
          temMaisBeneficios
            ? '<li class="more-benefits">E muito mais...</li>'
            : ""
        }
      </ul>

      <button onclick="planSelect('${plano.nome}')">
        Escolher ${plano.nome}
      </button>
    `;

    container.appendChild(card);
  });
}

// =========================
// INICIAR RENDERIZAÇÃO
// =========================
document.addEventListener("DOMContentLoaded", function () {
  renderizarServicosExtras();
  renderizarServicosHome();
  renderizarServicosPagina();
  renderizarPlanosHome();
  renderizarPlanosPagina();
});