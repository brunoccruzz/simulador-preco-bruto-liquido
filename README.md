# Simulador de Preco Bruto e Liquido

Projeto academico de Gerencia de Configuracao, Entrega e Integracao Continua.

## Tema

Simulador de preco bruto e liquido para vendas. A aplicacao calcula:

- preco liquido a partir do preco bruto;
- preco bruto necessario para chegar a um liquido desejado;
- margem e lucro estimado a partir do custo.

## Tecnologias

- API: Node.js, Express e Vitest
- Web: React, Vite e Vitest
- CI/CD: GitHub Actions

## Como executar

```bash
npm install
npm run dev:api
npm run dev:web
```

Credenciais fixas do login:

- Usuario: `admin`
- Senha: `123456`

## Endpoint base da equipe

`/PBL`

Caso exista outra equipe com o mesmo tema, altere o prefixo para `/PBL2` em `api/src/routes/pricingRoutes.js`.

## Comandos uteis

```bash
npm test
npm run build
```

## Deploy na Vercel

Use a raiz do repositorio como projeto da Vercel. O arquivo `vercel.json` da raiz publica o app React em `web/dist` e envia as chamadas `/PBL` para a API Express serverless em `api/api/index.js`.

Em producao, o app usa `/PBL` automaticamente. Para apontar para outra API, configure `VITE_API_URL`.
