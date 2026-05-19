import { Router } from 'express';
import {
  calcularLucroMargem,
  calcularPrecoBrutoNecessario,
  calcularPrecoLiquido
} from '../services/pricingService.js';
import { validarNumero } from '../utils/validation.js';

export const pricingRouter = Router();

// Rota de saúde para verificar se o serviço está funcionando
pricingRouter.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'preco-bruto-liquido' });
});

// Rota para calcular o preço líquido a partir do preço bruto
pricingRouter.post('/preco-liquido', (request, response, next) => {
  try {
    const entrada = normalizarEntrada(request.body, {
      precoBruto: true,
      quantidade: false,
      descontoPercentual: false,
      impostoPercentual: false,
      taxaFixa: false
    });

    response.json(calcularPrecoLiquido(entrada));
  } catch (error) {
    next(error);
  }
});

// Rota para calcular o preço bruto necessário para atingir um preço líquido desejado
pricingRouter.post('/preco-bruto', (request, response, next) => {
  try {
    const entrada = normalizarEntrada(request.body, {
      precoLiquidoDesejado: true,
      quantidade: false,
      descontoPercentual: false,
      impostoPercentual: false,
      taxaFixa: false
    });

    response.json(calcularPrecoBrutoNecessario(entrada));
  } catch (error) {
    next(error);
  }
});

// Rota para calcular a margem de lucro a partir do preço de venda e custo unitário
pricingRouter.post('/margem', (request, response, next) => {
  try {
    const entrada = normalizarEntrada(request.body, {
      precoVenda: true,
      custoUnitario: true,
      quantidade: false,
      descontoPercentual: false,
      impostoPercentual: false,
      taxaFixa: false
    });

    response.json(calcularLucroMargem(entrada));
  } catch (error) {
    next(error);
  }
});

// Função para normalizar e validar a entrada dos dados
function normalizarEntrada(body, campos) {
  return Object.entries(campos).reduce((acc, [campo, obrigatorio]) => {
    const valorPadrao = campo === 'quantidade' ? 1 : 0;
    acc[campo] = validarNumero(campo, body[campo] ?? valorPadrao, { obrigatorio });
    return acc;
  }, {});
}
