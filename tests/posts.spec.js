const { test, expect } = require('@playwright/test');
const { apiClient } = require('../helpers/apiClient');
const { gerarUsuario, gerarPost } = require('../helpers/testData');

test.describe('CRUD /posts', () => {
  let client;

  test.beforeEach(async ({ request }) => {
    client = apiClient(request);
  });

  test('deve criar, ler, atualizar e deletar um post', async () => {
    const usuario = gerarUsuario();
    let res = await client.post('/public/v2/users', usuario);
    expect(res.status()).toBe(201);
    const usuarioCriado = await res.json();
    const userId = usuarioCriado.id;

    const postPayload = gerarPost(userId);
    res = await client.post('/public/v2/posts', postPayload);
    expect(res.status()).toBe(201);
    const postCriado = await res.json();
    expect(postCriado).toHaveProperty('id');

    res = await client.get(`/public/v2/posts/${postCriado.id}`);
    expect(res.status()).toBe(200);
    const postLido = await res.json();
    expect(postLido.user_id).toBe(userId);

    const novoTitulo = `Novo título ${Date.now()}`;
    res = await client.put(`/public/v2/posts/${postCriado.id}`, { title: novoTitulo });
    expect(res.status()).toBe(200);
    const postAtualizado = await res.json();
    expect(postAtualizado.title).toBe(novoTitulo);

    res = await client.delete(`/public/v2/posts/${postCriado.id}`);
    expect(res.status()).toBe(204);

    res = await client.get(`/public/v2/posts/${postCriado.id}`);
    expect(res.status()).toBe(404);

    await client.delete(`/public/v2/users/${userId}`);
  });
});
