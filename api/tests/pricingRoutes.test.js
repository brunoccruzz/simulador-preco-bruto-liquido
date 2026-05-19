import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

describe('pricingRoutes', () => {
  const app = createApp();

  it('responde health check', async () => {
    const response = await request(app).get('/PBL/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('retorna erro para valor invalido', async () => {
    const response = await request(app)
      .post('/PBL/preco-liquido')
      .send({ precoBruto: -10 });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('negativo');
  });

  it('calcula preco liquido pela API', async () => {
    const response = await request(app)
      .post('/PBL/preco-liquido')
      .send({ precoBruto: 100, quantidade: 1, descontoPercentual: 10 });

    expect(response.status).toBe(200);
    expect(response.body.totalLiquido).toBe(90);
  });
});
