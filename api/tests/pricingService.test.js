import { describe, expect, it } from 'vitest';
import {
  calcularLucroMargem,
  calcularPrecoBrutoNecessario,
  calcularPrecoLiquido
} from '../src/services/pricingService.js';

describe('pricingService', () => {
  it('calcula preco liquido a partir do bruto', () => {
    const resultado = calcularPrecoLiquido({
      precoBruto: 100,
      quantidade: 2,
      descontoPercentual: 10,
      impostoPercentual: 5,
      taxaFixa: 2
    });

    expect(resultado.totalBruto).toBe(200);
    expect(resultado.desconto).toBe(20);
    expect(resultado.impostos).toBe(9);
    expect(resultado.taxas).toBe(4);
    expect(resultado.totalLiquido).toBe(167);
  });

  it('calcula preco bruto necessario para um liquido desejado', () => {
    const resultado = calcularPrecoBrutoNecessario({
      precoLiquidoDesejado: 85,
      quantidade: 1,
      descontoPercentual: 10,
      impostoPercentual: 5,
      taxaFixa: 0
    });

    expect(resultado.precoBrutoUnitarioNecessario).toBe(99.42);
  });

  it('calcula lucro, margem e markup', () => {
    const resultado = calcularLucroMargem({
      precoVenda: 120,
      custoUnitario: 70,
      quantidade: 1,
      descontoPercentual: 0,
      impostoPercentual: 10,
      taxaFixa: 3
    });

    expect(resultado.totalLiquido).toBe(105);
    expect(resultado.lucro).toBe(35);
    expect(resultado.margemPercentual).toBe(33.33);
    expect(resultado.markupPercentual).toBe(50);
  });
});
