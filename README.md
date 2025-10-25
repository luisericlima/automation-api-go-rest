## 🧪 Playwright API Tests – GoRest

Automação de testes de API usando **Playwright** e **GoRest API**.  

---

## 🚀 Tecnologias utilizadas
- [Node.js](https://nodejs.org/)
- [Playwright Test](https://playwright.dev/docs/test-api-testing)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [GoRest API](https://gorest.co.in/)

---

## 📂 Estrutura do projeto

```
.
├── .github/
│ └── workflows/
│ └── pipeline.yml # Pipeline CI/CD do GitHub Actions
│
├── helpers/
│   ├── apiClient.js        # Cliente HTTP com autenticação
│   └── testData.js         # Geração de dados dinâmicos para testes
│
├── tests/
│   ├── users.spec.js       # Testes CRUD de usuários
│   ├── posts.spec.js       # Testes CRUD de posts
│   └── comments.spec.js    # Testes CRUD de comentários
│
├── playwright.config.js     # Configuração do Playwright
├── package.json
├── .env                     # Variáveis de ambiente (não versionado)
└── .gitignore
```
---

## ⚙️ Configuração inicial

1️⃣ Clonar o repositório
```
git clone https://github.com/seuusuario/playwright-gorest-tests.git
cd playwright-gorest-tests
```
2️⃣ Instalar dependências
```
npm install
```
3️⃣ Criar o arquivo .env
```
GOREST_TOKEN=token_aqui
```
🔐 O token pode ser gerado em:
https://gorest.co.in/my-account/access-tokens

---
## 🧩 Executando os testes

Rodar todos os testes:

```
npx playwright test
```
Rodar um teste único:

```
npx playwright test tests/users.spec.js
```
Exibir o relatório HTML:

```
npx playwright show-report
```
