# 📘 GUIA COMPLETO - RW JOIAS LANDING PAGE

Bem-vindo ao guia oficial do projeto **RW Joias**. Este documento foi cuidadosamente reestruturado para ser um material de estudo didático, ideal para quem está aprendendo desenvolvimento web moderno com Vite e Tailwind CSS e busca uma vaga como Desenvolvedor Júnior.

---

## 📑 SUMÁRIO

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Pré-requisitos e Instalação](#2-pré-requisitos-e-instalação)
   - [2.1. Verificar Node.js](#21-verificar-nodejs)
   - [2.2. Instalar Dependências](#22-instalar-dependências)
   - [2.3. Rodar o Servidor de Desenvolvimento](#23-rodar-o-servidor-de-desenvolvimento)
3. [Estrutura do Projeto](#3-estrutura-do-projeto)
4. [Configuração do Vite](#4-configuração-do-vite)
5. [Configuração do Tailwind CSS e PostCSS](#5-configuração-do-tailwind-css-e-postcss)
   - [5.1. O Arquivo `postcss.config.js`](#51-o-arquivo-postcssconfigjs)
   - [5.2. O Arquivo `tailwind.config.js`](#52-o-arquivo-tailwindconfigjs)
   - [5.3. O CSS Organizado (`src/style.css`)](#53-o-css-organizado-srcstylecss)
6. [Guia de Cores e Design](#6-guia-de-cores-e-design)
   - [6.1. Paleta de Cores](#61-paleta-de-cores)
   - [6.2. Tipografia e Fontes](#62-tipografia-e-fontes)
   - [6.3. Hierarquia Tipográfica](#63-hierarquia-tipográfica)
   - [6.4. Boas Práticas de Acessibilidade](#64-boas-práticas-de-acessibilidade)
7. [Anatomia do Código (HTML, CSS e JS)](#7-anatomia-do-código-html-css-e-js)
   - [7.1. O HTML Limpo (`index.html`)](#71-o-html-limpo-indexhtml)
   - [7.2. O JavaScript Modular (`src/main.js`)](#72-o-javascript-modular-srcmainjs)
   - [7.3. Funções de Interatividade](#73-funções-de-interatividade)
8. [Como Editar e Personalizar](#8-como-editar-e-personalizar)
   - [8.1. Trocar Imagens](#81-trocar-imagens)
   - [8.2. Editar Textos](#82-editar-textos)
   - [8.3. Adicionar Nova Coleção](#83-adicionar-nova-coleção)
   - [8.4. Mudar Cores para Outros Negócios](#84-mudar-cores-para-outros-negócios)
9. [GitHub e Versionamento](#9-github-e-versionamento)
   - [9.1. Fluxo Básico do Git](#91-fluxo-básico-do-git)
   - [9.2. Convenção de Commits](#92-convenção-de-commits)
10. [Deploy - Colocando Online](#10-deploy---colocando-online)
    - [10.1. GitHub Pages](#101-github-pages)
    - [10.2. Netlify (Gratuito)](#102-netlify-gratuito)
    - [10.3. Vercel (Gratuito)](#103-vercel-gratuito)
11. [🛠️ Onde Errei e o Que Foi Melhorado (Análise de Erros)](#11-️-onde-errei-e-o-que-foi-melhorado-análise-de-erros)
    - [11.1. Erro de CSS (PostCSS)](#111-erro-de-css-postcss)
    - [11.2. Importação do CSS no HTML](#112-importação-do-css-no-html)
    - [11.3. Funções de Modal não Acessíveis (Scope Issue)](#113-funções-de-modal-não-acessíveis-scope-issue)
    - [11.4. Configuração Incompleta do Tailwind v4](#114-configuração-incompleta-do-tailwind-v4)
    - [11.5. Ordem dos Imports no CSS](#115-ordem-dos-imports-no-css)
    - [11.6. Melhorias Visuais Adicionais](#116-melhorias-visuais-adicionais)
12. [Próximos Passos e Ideias para Evoluir](#12-próximos-passos-e-ideias-para-evoluir)

---

## 1. VISÃO GERAL DO PROJETO

O projeto **RW Joias** é uma landing page premium desenvolvida para uma joalheria fictícia. O objetivo principal é demonstrar a construção de um site moderno e responsivo utilizando as tecnologias mais atuais do ecossistema JavaScript, com foco em performance e experiência do usuário. Este projeto serve como um excelente ponto de partida para quem busca aprimorar suas habilidades em desenvolvimento front-end.

**Principais Características:**
- **Design Premium Apple/Dribbble Style:** Paleta de cores suaves baseada em creme, champanhe e dourado, transmitindo elegância, sofisticação e exclusividade.
- **Animações e Interatividade:** Implementação de efeitos de *scroll reveal*, animações de *hover* em cards, modais expansíveis para visualização de coleções, lightbox com zoom para galeria e menu mobile funcional.
- **Responsividade:** Desenvolvido com uma abordagem *mobile-first*, garantindo que o layout e a funcionalidade se adaptem perfeitamente a qualquer tamanho de tela, desde smartphones até desktops de alta resolução.
- **Performance Otimizada:** Utilização do **Vite** como ferramenta de build, proporcionando um ambiente de desenvolvimento extremamente rápido com *Hot Module Replacement (HMR)* e builds otimizados para produção.
- **Estilização Eficiente:** Uso do **Tailwind CSS v4** para estilização rápida e consistente, permitindo a criação de designs complexos diretamente no HTML com classes utilitárias.

**Tecnologias Utilizadas:**

| Tecnologia | Versão | Função Principal |
| :--- | :--- | :--- |
| **Vite** | v8.0+ | Ferramenta de build de próxima geração e servidor de desenvolvimento local. |
| **Tailwind CSS** | v4.2+ | Framework CSS utilitário para estilização rápida e responsiva. |
| **PostCSS** | v8.5+ | Ferramenta para transformar CSS com plugins, essencial para o processamento do Tailwind. |
| **JavaScript** | Vanilla | Implementação da lógica de interatividade, como modais, menu mobile e animações de scroll. |
| **HTML5** | - | Estruturação semântica e acessível do conteúdo da página. |

---

## 2. PRÉ-REQUISITOS E INSTALAÇÃO

Para rodar este projeto localmente, estudar seu código e fazer suas próprias modificações, você precisará ter o Node.js instalado em sua máquina. O Node.js inclui o npm (Node Package Manager), que será usado para gerenciar as dependências do projeto.

### 2.1. Verificar Node.js

Abra o terminal (ou o terminal integrado do VS Code) e execute os seguintes comandos para verificar se o Node.js e o npm estão instalados:

```bash
node --version
npm --version
```

Se os comandos retornarem números de versão (ex: `v20.11.0` para Node.js e `10.2.4` para npm), você está pronto para prosseguir. Caso contrário, baixe e instale a versão LTS (Long Term Support) mais recente do [Node.js](https://nodejs.org/pt-br/download).

### 2.2. Instalar Dependências

Com o terminal aberto na pasta raiz do projeto (`rw-joias`), execute o comando abaixo para baixar e instalar todas as bibliotecas e ferramentas necessárias (Vite, Tailwind CSS, PostCSS, Autoprefixer, etc.):

```bash
npm install
```

Este comando lerá o arquivo `package.json` e instalará todas as dependências listadas em `devDependencies` na pasta `node_modules/`.

### 2.3. Rodar o Servidor de Desenvolvimento

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento local do Vite. Isso permitirá que você visualize o projeto no navegador e veja as alterações em tempo real enquanto codifica.

```bash
npm run dev
```

O terminal exibirá uma mensagem indicando que o servidor está rodando, geralmente com um link como `http://localhost:5173/rw-joias/`. Copie e cole este link no seu navegador para abrir o projeto.

> **Dica:** O Vite oferece *Hot Module Replacement (HMR)*, o que significa que a maioria das suas alterações no código (HTML, CSS, JavaScript) serão refletidas instantaneamente no navegador, sem a necessidade de recarregar a página manualmente.

---

## 3. ESTRUTURA DO PROJETO

Compreender a organização das pastas e arquivos é um passo crucial para qualquer desenvolvedor. A estrutura a seguir é padrão para projetos Vite e ajuda a manter o código organizado e escalável.

```text
rw-joias/
├── node_modules/           # Contém todas as bibliotecas e dependências instaladas pelo npm. **Não deve ser versionado no Git.**
├── public/                 # Armazena assets estáticos que são servidos diretamente, como `favicon.svg` e `icons.svg`. Imagens grandes também podem ir aqui.
├── src/                    # Contém o código-fonte principal da sua aplicação.
│   ├── main.js             # O arquivo JavaScript principal. É o ponto de entrada da aplicação, onde o CSS é importado e a lógica JS é inicializada.
│   └── style.css           # O arquivo CSS principal, onde as diretivas do Tailwind e seus estilos customizados são definidos.
├── index.html              # O arquivo HTML principal. É a única página do projeto e o ponto de entrada para o navegador.
├── package.json            # Define as informações do projeto, scripts de execução (dev, build, deploy) e lista todas as dependências.
├── postcss.config.js       # Arquivo de configuração para o PostCSS, que processa o CSS, incluindo o Tailwind CSS e o Autoprefixer.
├── tailwind.config.js      # Arquivo de configuração do Tailwind CSS, onde você personaliza o tema, cores, fontes, breakpoints, etc.
├── vite.config.js          # Arquivo de configuração do Vite, usado para definir o comportamento do servidor de desenvolvimento e do processo de build.
└── README.md               # Este documento, contendo toda a documentação do projeto.
```

---

## 4. CONFIGURAÇÃO DO VITE

O Vite é uma ferramenta de build moderna que oferece uma experiência de desenvolvimento extremamente rápida. A configuração do Vite é feita através do arquivo `vite.config.js`.

**Arquivo `vite.config.js`:**

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/rw-joias/',  // IMPORTANTE: Define o caminho base para o deploy em subdiretórios (ex: GitHub Pages)
  build: {
    outDir: 'dist',    // Pasta onde os arquivos otimizados para produção serão gerados
    assetsDir: 'assets', // Subpasta dentro de `outDir` para assets (CSS, JS, imagens)
  }
})
```

**Explicação:**
- `base: '/rw-joias/'`: Esta propriedade é crucial para projetos que serão hospedados em subdiretórios, como o GitHub Pages. Se o seu repositório se chama `rw-joias`, o site será acessível em `https://seunome.github.io/rw-joias/`. O `base` garante que todos os caminhos para seus assets (CSS, JS, imagens) sejam gerados corretamente, evitando links quebrados.
- `build.outDir: 'dist'`: Define que todos os arquivos de produção (HTML, CSS, JS otimizados) serão colocados na pasta `dist/` após o comando `npm run build`.
- `build.assetsDir: 'assets'`: Especifica que os assets (CSS, JS, imagens) dentro da pasta `dist/` serão organizados em uma subpasta chamada `assets/`.

---

## 5. CONFIGURAÇÃO DO TAILWIND CSS E POSTCSS

O Tailwind CSS é um framework utilitário que permite estilizar seu HTML diretamente com classes pré-definidas. Para que ele funcione corretamente em um projeto Vite, ele precisa ser processado pelo PostCSS.

#### CONFIGURAR TAILWIND INTELLISENSE

Para Tailwind CSS v4 ou projetos com arquivos CSS como entrada: Como o v4 é "CSS first", você deve indicar o caminho do arquivo CSS que importa o Tailwind (ex: @import "tailwindcss") nas configurações do VS Code. 

Adicione no settings.json o seguinte:

```json
"tailwindCSS.experimental.configFile": "src/style.css"   
```

### 5.1. O Arquivo `postcss.config.js`

Este arquivo diz ao PostCSS quais plugins usar para processar o seu CSS.

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Plugin oficial para Tailwind v4
    autoprefixer: {},           // Adiciona prefixos de navegadores automaticamente (ex: -webkit-, -moz-)
  },
}
```

### 5.2. O Arquivo `tailwind.config.js` (Opcional no v4)

No Tailwind v4, a maioria das configurações pode ser feita diretamente no arquivo CSS usando a diretiva `@theme`. No entanto, se você ainda usar o arquivo de configuração, ele serve para definir o conteúdo e as extensões do tema.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // No v4, prefira usar @theme no style.css
    },
  },
  plugins: [],
}
```

### 5.3. O CSS Organizado (`src/style.css`)

Este é o coração da estilização. No Tailwind v4, usamos uma abordagem mais moderna e baseada em CSS nativo.

```css
@import "tailwindcss";

/* ============================================
   🎨 THEME - CORES PREMIUM
   ============================================ */
@theme inline {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;

  /* Paleta Premium - Tons Suaves */
  --color-cream: #FAF9F6;           /* Fundo principal */
  --color-nude: #F5F0EB;            /* Secundário */
  --color-champagne: #E8E0D5;       /* Destaque */
  --color-gold: #D4AF37;            /* Dourado premium */
  --color-gold-light: #E5C56B;      /* Dourado claro */
  --color-charcoal: #2C2C2C;        /* Texto principal */
  --color-charcoal-light: #5A5A5A;  /* Texto secundário */
}

/* Regras de Ouro para o CSS com Tailwind: */

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background: var(--color-cream);
    color: var(--color-charcoal);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  /* Classes pequenas e específicas */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**O que vai em cada `@layer`?**

| Layer               | O que colocar                        | Exemplo                                               |
| :------------------ | :----------------------------------- | :---------------------------------------------------- |
| `@layer base`       | Reset CSS, estilos de elementos HTML | `body`, `html`, `h1`, scrollbar global                |
| `@layer components` | Classes reutilizáveis grandes        | `.collection-card`, `.glass-effect`                   |
| `@layer utilities`  | Classes pequenas e específicas       | `.reveal`, `.no-scrollbar`                            |

---

## 6. GUIA DE CORES E DESIGN

O design premium da RW Joias baseia-se em suavidade, elegância e uma paleta de cores inspirada no estilo Apple/Dribbble para transmitir sofisticação.

### 6.1. Paleta de Cores

| Cor | Código Hexadecimal | Uso Principal |
| :--- | :--- | :--- |
| **Creme** | `#FAF9F6` | Fundo principal da página, áreas claras. |
| **Nude** | `#F5F0EB` | Fundos secundários, backgrounds suaves. |
| **Champanhe** | `#E8E0D5` | Destaques, botões, ícones, textos importantes. |
| **Dourado** | `#D4AF37` | Botões, ícones, textos importantes. |
| **Dourado Claro** | `#E5C56B` | Hover states, gradientes, detalhes. |
| **Charcoal** | `#2C2C2C` | Texto principal (substituto do preto puro). |
| **Charcoal Light** | `#5A5A5A` | Texto secundário, descrições. |

**Como Aplicar Cores (Exemplos de Classes Tailwind):**

```html
<!-- FUNDO CREME -->
<div class="bg-cream">...</div>

<!-- TEXTO DOURADO -->
<h1 class="text-gold">Título Elegante</h1>

<!-- BOTÃO CHARCOAL COM HOVER DOURADO -->
<button class="bg-charcoal text-cream hover:bg-gold transition-all">Contato</button>

<!-- BORDA CHAMPAGNE SUTIL -->
<div class="border border-champagne/30">...</div>
```

### 6.2. Tipografia e Fontes

A escolha das fontes foi atualizada para um visual mais leve e moderno. Combinamos uma fonte serifada clássica com uma sans-serif de alta legibilidade.

**Fontes Utilizadas:**

| Fonte | Uso Principal | Característica |
| :--- | :--- | :--- |
| **Playfair Display** | Títulos, Logo | Serifada elegante, estilo clássico luxuoso. |
| **Inter** | Textos, Parágrafos | Sans-serif moderna, alta legibilidade. |

**Como Usar as Fontes (Exemplos de Classes Tailwind):**

```html
<!-- TÍTULOS PRINCIPAIS -->
<h1 class="font-serif text-5xl font-light">RW JOIAS</h1>

<!-- TEXTOS CORRIDOS -->
<p class="font-sans text-charcoal-light leading-relaxed">
  Texto descritivo aqui...
</p>
```

### 6.3. Hierarquia Tipográfica

Manter uma hierarquia clara nos textos ajuda na leitura e na compreensão do conteúdo.

```html
<!-- HERO - Título Principal -->
<h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-charcoal">
  Joias que <span class="italic text-gold">eternizam</span> momentos
</h1>

<!-- Seção - Título -->
<h2 class="font-serif text-4xl md:text-5xl font-light text-charcoal">
  Tradição e <span class="italic text-gold">Excelência</span>
</h2>

<!-- Corpo de texto -->
<p class="font-sans text-charcoal/60 text-lg leading-relaxed">
  Descrição detalhada aqui...
</p>
```

### 6.4. Boas Práticas de Acessibilidade

Um bom design também é acessível. Algumas dicas:
- **Contraste:** A combinação de Creme e Charcoal garante um contraste excelente para leitura.
- **Tamanho da Fonte:** Use unidades relativas (`rem`) para permitir o zoom do navegador.
- **Semântica HTML:** Utilize as tags HTML corretamente (`<nav>`, `<main>`, `<section>`, `<footer>`).

---

## 7. ANATOMIA DO CÓDIGO (HTML, CSS E JS)

A integração correta entre HTML, CSS e JavaScript é o que diferencia um projeto amador de um profissional.

### 7.1. O HTML Limpo (`index.html`)

No Vite, o `index.html` é o ponto de entrada. O CSS é importado via JavaScript no `main.js`.

**Estrutura Essencial:**

```html
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RW JOIAS - O Rei das Joias</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
</head>
<body class="font-sans antialiased bg-cream text-charcoal">
    <!-- Navbar, Hero, Seções... -->

    <!-- Script principal (importa o CSS internamente) -->
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 7.2. O JavaScript Modular (`src/main.js`)

O `src/main.js` gerencia os dados e a interatividade.

```javascript
import './style.css';

// Dados das Coleções
const collections = [
    { id: 'pulseira', name: 'Pulseiras', image: '...', images: [...] },
    // ...
];

// Renderização Dinâmica
function renderCollections() {
    const grid = document.getElementById('collections-grid');
    if (grid) {
        grid.innerHTML = collections.map(c => `
            <div class="collection-card reveal" data-collection-id="${c.id}">
                <img src="${c.image}" alt="${c.name}">
                <h3>${c.name}</h3>
            </div>
        `).join('');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderCollections();
    // ... outras funções
});
```

### 7.3. Funções de Interatividade

- **Galeria com Lightbox:** Permite visualizar imagens em tela cheia com zoom.
- **Modais de Coleção:** Abrem detalhes específicos de cada categoria de joia.
- **Scroll Reveal:** Animações que surgem conforme o usuário rola a página.

---

## 8. COMO EDITAR E PERSONALIZAR

### 8.1. Trocar Imagens

As imagens estão centralizadas no array `collections` dentro do `main.js`. Basta substituir as URLs das imagens.

### 8.2. Editar Textos

A maioria dos textos estáticos está diretamente no `index.html`. Procure pelas tags `<h1>`, `<h2>` e `<p>`.

### 8.3. Adicionar Nova Coleção

Adicione um novo objeto ao array `collections` no `main.js`. O sistema irá renderizar o novo card automaticamente.

### 8.4. Mudar Cores para Outros Negócios

Edite as variáveis de cor no bloco `@theme` do arquivo `src/style.css`.

---

## 9. GITHUB E VERSIONAMENTO

### 9.1. Fluxo Básico do Git

```bash
git add .
git commit -m "feat: atualiza layout para estilo premium"
git push origin main
```

### 9.2. Convenção de Commits

| Emoji | Tipo | Descrição |
| :--- | :--- | :--- |
| ✨ | feat | Nova funcionalidade |
| 💄 | style | Mudanças de estilo/CSS |
| 🐛 | fix | Correção de bug |

---

## 10. DEPLOY - COLOCANDO ONLINE

### 10.1. GitHub Pages

1. Instale o pacote: `npm install gh-pages --save-dev`
2. Adicione o script de deploy no `package.json`.
3. Execute `npm run deploy`.

### 10.2. Netlify / Vercel

Basta conectar seu repositório GitHub. O Vite será detectado automaticamente.

---

## 11. 🛠️ ONDE ERREI E O QUE FOI MELHORADO

### 11.1. Configuração Incompleta do Tailwind v4
- **Problema:** O novo padrão v4 exige importação direta no CSS e uso de `@theme`.
- **Solução:** Migramos as configurações do `tailwind.config.js` para o `style.css`.

### 11.2. Funções de Modal não Acessíveis
- **Problema:** Funções dentro de módulos JS não são globais por padrão.
- **Solução:** Expusemos as funções necessárias ao objeto `window` (ex: `window.openModal = openModal`).

### 11.3. Melhorias Visuais Adicionais
- ✨ Paleta Creme/Dourado: Mais sofisticada que o preto puro.
- 🎨 Playfair Display: Títulos mais elegantes e leves.
- 🖼️ Lightbox Apple Style: Experiência de usuário superior na galeria.

---

## 12. PRÓXIMOS PASSOS E IDEIAS PARA EVOLUIR

- **Dark Mode:** Adicionar um toggle para alternar entre o tema Creme e um tema Dark Boutique.
- **WhatsApp API:** Integrar um botão de orçamento que já envia o nome da joia selecionada.
- **Filtros Dinâmicos:** Permitir filtrar a galeria por tipo de metal (Ouro/Prata).

---

> 💎 "Cada linha de código é uma joia em construção. Continue praticando, continue aprendendo."

- **Autor:** David Gilmour - dgilmourcode
- **Projeto:** RW Joias - Landing Page Premium
- **Última Atualização:** Abril 2026
- **Stack:** Vite + Tailwind CSS v4 + Vanilla JS + FontAwesome

