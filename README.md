# 🚀 Catálogo de Produtos Pro - Versão Final (Unidade 4)

Este repositório contém a entrega final do Catálogo de Produtos desenvolvido para a disciplina de **Análise e Desenvolvimento de Sistemas**. O projeto evoluiu de uma lista estática para uma aplicação React funcional que simula a interação com uma API e mantém os dados salvos no navegador.

## 🛠️ Implementações da Unidade 4
Nesta última etapa, foram aplicados conceitos avançados de React para tornar o catálogo dinâmico e persistente:

* **Comunicação Assíncrona:** Substituição dos dados locais por um consumo via `fetch` a partir de um arquivo `produtos.json`, simulando uma API externa.
* **Hooks de Efeito e Estado:** * `useEffect`: Utilizado para disparar a busca de dados assim que a aplicação carrega.
    * `useState`: Gerenciamento da lista de produtos, estados de carregamento e filtros.
* **Async/Await:** Implementação de funções assíncronas para lidar com promessas de forma limpa e moderna.
* **Manipulação de Inventário:**
    * **Cadastro:** Inclusão de novos produtos via formulário com evento `onSubmit`.
    * **Exclusão:** Remoção de produtos em tempo real com evento `onClick`.
* **Cálculo Dinâmico:** Atualização automática do valor total do inventário utilizando o método `reduce`.

## 🌟 Desafio Extra (Implementado)
Para garantir que os dados não sejam perdidos ao recarregar a página (F5), implementei a persistência utilizando a **LocalStorage API**. Isso permite que qualquer produto adicionado ou removido pela interface seja lembrado pelo navegador.

## 💻 Tecnologias Utilizadas
* **React 18** (Vite)
* **JavaScript (ES6+)**
* **CSS Grid & Flexbox**
* **LocalStorage API**

## 🔧 Como Executar o Projeto
1.  Clone o repositório.
2.  Instale as dependências: `npm install`
3.  Inicie o ambiente de desenvolvimento: `npm run dev`
4.  Certifique-se de que o arquivo `produtos.json` está na pasta `public` para o funcionamento do fetch.

---
**Desenvolvido por:** Jaciana Regina  
**Curso:** Análise e Desenvolvimento de Sistemas - Unyleya (2026)