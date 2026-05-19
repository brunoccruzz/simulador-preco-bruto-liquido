# Documento de Testes

## Testes unitarios

API:

- `api/tests/pricingService.test.js`
- Valida calculo de preco liquido.
- Valida calculo de preco bruto necessario.
- Valida calculo de lucro, margem e markup.

Web:

- `web/src/App.test.jsx`
- Valida exibicao da splash screen.
- Valida login com usuario e senha fixos.
- Valida consumo da API pelo botao de preco liquido.

## Testes funcionais

| Caso | Passos | Resultado esperado |
| --- | --- | --- |
| Login valido | Abrir o site, informar `admin` e `123456`, clicar em Acessar | Usuario entra na tela do simulador |
| Login invalido | Informar credenciais incorretas | Sistema mostra mensagem de erro |
| Preco liquido | Informar preco bruto, desconto, imposto, taxa e quantidade | Sistema retorna total liquido |
| Preco bruto | Informar liquido desejado e percentuais | Sistema retorna preco bruto necessario |
| Margem | Informar preco de venda e custo | Sistema retorna lucro, margem e markup |
| Sobre | Clicar em Sobre | Sistema mostra foto ilustrativa e responsabilidades da equipe |
| Help | Clicar em Help | Sistema mostra orientacoes de uso |

## Execucao

```bash
npm test
```
