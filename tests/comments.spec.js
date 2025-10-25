const { test, expect } = require('@playwright/test');
const { apiClient } = require('../helpers/apiClient');
const { gerarUsuario, gerarPost, gerarComentario } = require('../helpers/testData');

test.describe('CRUD /comments', () => {
  let client;

  test.beforeEach(async ({ request }) => {
    client = apiClient(request);
  });

  test('deve criar, ler, atualizar e deletar um comentário', async () => {
    const usuario = gerarUsuario({ gender: 'female' });
    let res = await client.post('/public/v2/users', usuario);
    expect(res.status()).toBe(201);
    const usuarioCriado = await res.json();
    const userId = usuarioCriado.id;

    const postPayload = gerarPost(userId);
    res = await client.post('/public/v2/posts', postPayload);
    expect(res.status()).toBe(201);
    const postCriado = await res.json();
    const postId = postCriado.id;

    const comentarioPayload = gerarComentario(postId);
    res = await client.post('/public/v2/comments', comentarioPayload);
    expect(res.status()).toBe(201);
    const comentarioCriado = await res.json();
    expect(comentarioCriado).toHaveProperty('id');

    res = await client.get(`/public/v2/comments/${comentarioCriado.id}`);
    expect(res.status()).toBe(200);
    const comentarioLido = await res.json();
    expect(comentarioLido.post_id).toBe(postId);

    const novoCorpo = 'Comentário atualizado via teste.';
    res = await client.put(`/public/v2/comments/${comentarioCriado.id}`, { body: novoCorpo });
    expect(res.status()).toBe(200);
    const comentarioAtualizado = await res.json();
    expect(comentarioAtualizado.body).toBe(novoCorpo);

    res = await client.delete(`/public/v2/comments/${comentarioCriado.id}`);
    expect(res.status()).toBe(204);

    res = await client.get(`/public/v2/comments/${comentarioCriado.id}`);
    expect(res.status()).toBe(404);

    await client.delete(`/public/v2/posts/${postId}`);
    await client.delete(`/public/v2/users/${userId}`);
  });
});
