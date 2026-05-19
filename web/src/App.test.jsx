import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App.jsx';

describe('App', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('exibe login depois da splash screen', async () => {
    render(<App />);

    expect(screen.getByText('Simulador de Preco')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Entrar' }, { timeout: 1500 })).toBeInTheDocument();
  });

  it('autentica com usuario e senha fixos', async () => {
    render(<App />);
    const user = userEvent.setup();

    await screen.findByRole('heading', { name: 'Entrar' }, { timeout: 1500 });
    await user.type(screen.getByLabelText('Usuario'), 'admin');
    await user.type(screen.getByLabelText('Senha'), '123456');
    await user.click(screen.getByRole('button', { name: 'Acessar' }));

    expect(screen.getByRole('heading', { name: 'Simulador financeiro de venda' })).toBeInTheDocument();
  });

  it('consome a API ao calcular preco liquido', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ totalLiquido: 90 })
    });

    render(<App />);
    const user = userEvent.setup();

    await screen.findByRole('heading', { name: 'Entrar' }, { timeout: 1500 });
    await user.type(screen.getByLabelText('Usuario'), 'admin');
    await user.type(screen.getByLabelText('Senha'), '123456');
    await user.click(screen.getByRole('button', { name: 'Acessar' }));
    await user.click(screen.getByRole('button', { name: 'Preco liquido' }));

    await waitFor(() => expect(screen.getByText('R$ 90,00')).toBeInTheDocument());
  });
});
