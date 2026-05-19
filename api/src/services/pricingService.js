const CASAS_DECIMAIS = 2;

export function calcularPrecoLiquido({
  precoBruto,
  quantidade = 1,
  descontoPercentual = 0,
  impostoPercentual = 0,
  taxaFixa = 0
}) {
  const totalBruto = precoBruto * quantidade;
  const desconto = percentual(totalBruto, descontoPercentual);
  const baseComDesconto = totalBruto - desconto;
  const impostos = percentual(baseComDesconto, impostoPercentual);
  const taxas = taxaFixa * quantidade;
  const totalLiquido = baseComDesconto - impostos - taxas;

  return arredondarResultado({
    precoBruto,
    quantidade,
    totalBruto,
    desconto,
    impostos,
    taxas,
    totalLiquido,
    precoLiquidoUnitario: totalLiquido / quantidade
  });
}

export function calcularPrecoBrutoNecessario({
  precoLiquidoDesejado,
  quantidade = 1,
  descontoPercentual = 0,
  impostoPercentual = 0,
  taxaFixa = 0
}) {
  const fatorDesconto = 1 - descontoPercentual / 100;
  const fatorImposto = 1 - impostoPercentual / 100;
  const fatorLiquido = fatorDesconto * fatorImposto;

  if (fatorLiquido <= 0) {
    const error = new Error('A soma dos percentuais inviabiliza o calculo do preco bruto.');
    error.statusCode = 400;
    throw error;
  }

  const totalLiquidoDesejado = precoLiquidoDesejado * quantidade;
  const taxas = taxaFixa * quantidade;
  const totalBrutoNecessario = (totalLiquidoDesejado + taxas) / fatorLiquido;

  return arredondarResultado({
    precoLiquidoDesejado,
    quantidade,
    taxas,
    totalLiquidoDesejado,
    totalBrutoNecessario,
    precoBrutoUnitarioNecessario: totalBrutoNecessario / quantidade
  });
}

export function calcularLucroMargem({
  precoVenda,
  custoUnitario,
  quantidade = 1,
  descontoPercentual = 0,
  impostoPercentual = 0,
  taxaFixa = 0
}) {
  const venda = calcularPrecoLiquido({
    precoBruto: precoVenda,
    quantidade,
    descontoPercentual,
    impostoPercentual,
    taxaFixa
  });
  const custoTotal = custoUnitario * quantidade;
  const lucro = venda.totalLiquido - custoTotal;
  const margemPercentual = venda.totalLiquido === 0 ? 0 : (lucro / venda.totalLiquido) * 100;
  const markupPercentual = custoTotal === 0 ? 0 : (lucro / custoTotal) * 100;

  return arredondarResultado({
    ...venda,
    custoUnitario,
    custoTotal,
    lucro,
    margemPercentual,
    markupPercentual
  });
}

function percentual(valor, taxa) {
  return valor * (taxa / 100);
}

function arredondarResultado(resultado) {
  return Object.fromEntries(
    Object.entries(resultado).map(([chave, valor]) => [
      chave,
      typeof valor === 'number' ? Number(valor.toFixed(CASAS_DECIMAIS)) : valor
    ])
  );
}
