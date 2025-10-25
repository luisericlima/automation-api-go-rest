const { test, expect } = require('@playwright/test');
const { apiClient } = require('../helpers/apiClient');
const { gerarUsuario } = require('../helpers/testData');

test.describe('CRUD /users', () => {
  let client;

  test.beforeEach(async ({ request }) => {
    client = apiClient(request);
  });

  test('deve criar, ler, atualizar e deletar um usuário', async () => {
    const usuario = gerarUsuario();

    let res = await client.post('/public/v2/users', usuario);
    expect(res.status()).toBe(201);
    const criado = await res.json();
    expect(criado).toHaveProperty('id');

    res = await client.get(`/public/v2/users/${criado.id}`);
    expect(res.status()).toBe(200);
    const lido = await res.json();
    expect(lido.email).toBe(usuario.email);

    const novoNome = `Atualizado ${Date.now()}`;
    res = await client.put(`/public/v2/users/${criado.id}`, { name: novoNome });
    expect(res.status()).toBe(200);
    const atualizado = await res.json();
    expect(atualizado.name).toBe(novoNome);

    res = await client.delete(`/public/v2/users/${criado.id}`);
    expect(res.status()).toBe(204);

    res = await client.get(`/public/v2/users/${criado.id}`);
    expect(res.status()).toBe(404);
  });
});
