# MyGym 🏋️‍♀️

O **MyGym** é um projeto de site para academia desenvolvido como trabalho acadêmico.  
A proposta é apresentar uma academia fictícia com páginas institucionais, planos, serviços, contato e uma área administrativa com funcionalidades de gerenciamento.

O projeto foi desenvolvido com **HTML, CSS e JavaScript puro**, sem uso de frameworks como Bootstrap. A estilização foi feita manualmente com CSS próprio, utilizando recursos modernos como responsividade, cards, modais, animações, sombras, gradientes e efeitos visuais.

---

## 📌 Funcionalidades

### Área pública

- Página inicial com apresentação da academia
- Página de serviços
- Página de planos
- Página de contato
- Carrossel de imagens na home
- Cards de serviços e planos
- Modal com detalhes dos planos
- Formulário de solicitação de matrícula
- Seleção de modalidades adicionais
- Formulário de contato
- Layout responsivo para diferentes tamanhos de tela

### Painel administrativo

- Login simples para acesso restrito
- Dashboard com resumo de informações
- Cadastro de serviços adicionais
- Edição de serviços adicionais
- Exclusão de serviços adicionais
- Edição dos planos principais
- Visualização de solicitações de matrícula
- Alteração de status das solicitações
- Exclusão de solicitações
- Exportação das solicitações em arquivo CSV para abrir no Excel

---

## 🛠️ Tecnologias utilizadas

- **HTML5**  
  Utilizado para estruturar as páginas do projeto.

- **CSS3**  
  Utilizado para estilização, responsividade, animações, sombras, gradientes, cards, modais e efeitos visuais.

- **JavaScript**  
  Utilizado para interatividade, manipulação do DOM, carrossel, modais, formulários, CRUD e persistência local.

- **LocalStorage**  
  Utilizado para simular armazenamento de dados no navegador, como serviços adicionais, planos editados e solicitações de matrícula.

- **Google Fonts**  
  Utilizado para importar as fontes do projeto:
  - `Inter`
  - `Bebas Neue`

- **Font Awesome**  
  Utilizado para ícones nas páginas públicas e no painel administrativo.

---

## 🎨 Identidade visual

O projeto utiliza uma identidade visual inspirada no universo fitness, com:

- Fundo escuro
- Tons de laranja
- Efeitos de brilho
- Cards com aparência moderna
- Bordas arredondadas
- Gradientes
- Sombras
- Efeito de vidro/transparência
- Tipografia forte para títulos

A fonte **Bebas Neue** foi usada nos títulos para transmitir impacto e energia.  
A fonte **Inter** foi usada nos textos e formulários para melhorar a leitura.

---

## 📁 Estrutura de páginas

```text
MyGym/
│
├── index.html
├── servicos.html
├── planos.html
├── contato.html
├── login.html
├── admin.html
│
├── style.css
├── servico.css
├── planos.css
├── contato.css
├── admin.css
├── login.css
│
├── script.js
├── public.js
├── admin.js
├── login.js
│
└── img/
    ├── logo.png
    ├── gym2.jpeg
    ├── gym3.jpeg
    ├── gym4.webp
    ├── musculacao.jpg
    ├── cardio.jpg
    ├── jiu-jitsu.jpg
    └── personal.jpg
