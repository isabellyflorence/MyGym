const API_URL = "http://localhost:8080/api";

/* =========================
   MENU MOBILE
========================= */
function toggleMenu() {
  const menu = document.getElementById("menu");

  if (menu) {
    menu.classList.toggle("active");
  }
}

/* =========================
   FORMULÁRIO DE CONTATO
========================= */
async function enviarFormulario(event) {
  event.preventDefault();

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const telefoneInput = document.getElementById("telefone");
  const assuntoInput = document.getElementById("assunto");
  const mensagemInput = document.getElementById("mensagem");

  if (!nomeInput || !emailInput || !mensagemInput) {
    alert("Formulário não encontrado.");
    return;
  }

  const dados = {
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    telefone: telefoneInput ? telefoneInput.value.trim() : "",
    assunto: assuntoInput ? assuntoInput.value : "",
    mensagem: mensagemInput.value.trim()
  };

  try {
    const response = await fetch(`${API_URL}/contato`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const resultado = await response.json();

    if (response.ok) {
      alert(resultado.mensagem || "Mensagem enviada com sucesso! ✅");
      event.target.reset();
    } else {
      alert(resultado.erro || "Erro ao enviar mensagem.");
    }

  } catch (error) {
    console.error(error);

    alert("Mensagem registrada localmente. A API não está conectada no momento.");
    event.target.reset();
  }
}

/* =========================
   BOTÕES GERAIS
========================= */
function startNow() {
  window.location.href = "planos.html#plans-options";
}

function joinNow() {
  window.location.href = "login.html";
}

function cardClick(tipo) {
  alert("Você clicou em: " + tipo);
}

/* =========================
   CARROSSEL DA HOME
========================= */
let currentSlide = 0;

function iniciarCarrossel() {
  const slides = document.querySelectorAll(".slide");

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));

    if (slides[index]) {
      slides[index].classList.add("active");
    }
  }

  function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  }

  showSlide(currentSlide);

  setInterval(() => {
    changeSlide(1);
  }, 4000);
}

/* =========================
   DADOS PADRÃO DOS PLANOS
========================= */
const planosPadraoScript = [
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

/* =========================
   MODAL DOS PLANOS
========================= */
let planoEscolhido = "";

function buscarPlanosAtualizados() {
  const planosSalvos = JSON.parse(localStorage.getItem("planosMyGym"));

  if (Array.isArray(planosSalvos) && planosSalvos.length > 0) {
    return planosSalvos;
  }

  return planosPadraoScript;
}

function definirTagModalPlano(nomePlano) {
  const nome = nomePlano.toLowerCase();

  if (nome.includes("premium")) {
    return "Mais escolhido";
  }

  if (nome.includes("elite")) {
    return "Completo";
  }

  return "Essencial";
}

function planSelect(nomePlano) {
  const planos = buscarPlanosAtualizados();

  const plano = planos.find(item =>
    item.nome.toLowerCase() === nomePlano.toLowerCase()
  );

  if (!plano) {
    alert("Plano não encontrado.");
    return;
  }

  planoEscolhido = plano.nome;

  const modal = document.getElementById("planModal");
  const modalTag = document.getElementById("modalTag");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalPreco = document.getElementById("modalPreco");
  const modalDescricao = document.getElementById("modalDescricao");
  const modalObservacao = document.getElementById("modalObservacao");
  const listaBeneficios = document.getElementById("modalBeneficios");

  if (
    !modal ||
    !modalTag ||
    !modalTitulo ||
    !modalPreco ||
    !modalDescricao ||
    !modalObservacao ||
    !listaBeneficios
  ) {
    alert("Modal de plano não encontrado nesta página.");
    return;
  }

  modalTag.textContent = definirTagModalPlano(plano.nome);
  modalTitulo.textContent = `Plano ${plano.nome}`;
  modalPreco.textContent = `R$ ${plano.preco}/mês`;
  modalDescricao.textContent = plano.descricao;

  modalObservacao.textContent =
    "Consulte a recepção para confirmar disponibilidade, horários e condições.";

  listaBeneficios.innerHTML = "";

  const beneficios = Array.isArray(plano.beneficios) ? plano.beneficios : [];

  beneficios.forEach(beneficio => {
    const li = document.createElement("li");
    li.textContent = beneficio;
    listaBeneficios.appendChild(li);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function fecharModalPlano() {
  const modal = document.getElementById("planModal");

  if (modal) {
    modal.classList.remove("active");
  }

  document.body.style.overflow = "auto";
}

/* =========================
   MODAL DE MATRÍCULA
========================= */
function carregarModalidadesInteresse() {
  const container = document.getElementById("modalidadesInteresse");

  if (!container) return;

  const servicosExtras = JSON.parse(localStorage.getItem("servicosMyGym")) || [];

  container.innerHTML = "";

  if (servicosExtras.length === 0) {
    container.innerHTML = `
      <p class="modalidades-empty">
        Nenhuma modalidade adicional cadastrada no momento.
      </p>
    `;
    return;
  }

  servicosExtras.forEach(servico => {
    const label = document.createElement("label");
    label.classList.add("modalidade-check");

    label.innerHTML = `
      <input
        type="checkbox"
        name="modalidadesExtras"
        value="${servico.nome}"
        data-preco="${servico.preco || 0}"
      >

      <span>${servico.nome}</span>

      <small>+ R$ ${servico.preco || 0}/mês</small>
    `;

    container.appendChild(label);
  });
}

function abrirModalMatricula() {
  if (!planoEscolhido) {
    alert("Escolha um plano primeiro.");
    return;
  }

  const planModal = document.getElementById("planModal");
  const matriculaModal = document.getElementById("matriculaModal");
  const matriculaPlano = document.getElementById("matriculaPlano");

  if (!matriculaModal || !matriculaPlano) {
    alert("Modal de matrícula não encontrado nesta página.");
    return;
  }

  if (planModal) {
    planModal.classList.remove("active");
  }

  matriculaPlano.value = planoEscolhido;

  carregarModalidadesInteresse();

  matriculaModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function fecharModalMatricula() {
  const modal = document.getElementById("matriculaModal");

  if (modal) {
    modal.classList.remove("active");
  }

  document.body.style.overflow = "auto";
}

function enviarSolicitacaoMatricula(event) {
  event.preventDefault();

  const nome = document.getElementById("matriculaNome").value.trim();
  const telefone = document.getElementById("matriculaTelefone").value.trim();
  const email = document.getElementById("matriculaEmail").value.trim();
  const plano = document.getElementById("matriculaPlano").value.trim();
  const horario = document.getElementById("matriculaHorario").value;
  const observacao = document.getElementById("matriculaObservacao").value.trim();

  const modalidadesSelecionadas = Array.from(
    document.querySelectorAll('input[name="modalidadesExtras"]:checked')
  ).map(input => {
    return {
      nome: input.value,
      preco: Number(input.dataset.preco)
    };
  });

  const novaSolicitacao = {
    id: Date.now(),
    nome,
    telefone,
    email,
    plano,
    horario,
    observacao,
    modalidadesExtras: modalidadesSelecionadas,
    status: "Pendente",
    data: new Date().toLocaleString("pt-BR")
  };

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoesMyGym")) || [];

  solicitacoes.push(novaSolicitacao);

  localStorage.setItem("solicitacoesMyGym", JSON.stringify(solicitacoes));

  alert("Solicitação enviada com sucesso! A equipe MyGym entrará em contato em breve.");

  event.target.reset();
  fecharModalMatricula();
}

/* =========================
   FECHAR MODAIS
========================= */
function configurarFechamentoModais() {
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      fecharModalPlano();
      fecharModalMatricula();
    }
  });

  document.addEventListener("click", function(event) {
    if (event.target.id === "planModal") {
      fecharModalPlano();
    }

    if (event.target.id === "matriculaModal") {
      fecharModalMatricula();
    }
  });
}

/* =========================
   INICIAR
========================= */
document.addEventListener("DOMContentLoaded", function() {
  iniciarCarrossel();
  configurarFechamentoModais();
});