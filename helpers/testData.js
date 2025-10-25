const { randomUUID } = require('crypto');

function gerarEmailUnico(prefix = 'teste') {
  const timestamp = Date.now();
  const idUnico = randomUUID().slice(0, 6);
  return `${prefix}-${timestamp}-${idUnico}@exemplo.test`;
}

function gerarUsuario(opts = {}) {
  return {
    name: opts.name || `Usuário ${Date.now()}`,
    gender: opts.gender || 'male',
    email: opts.email || gerarEmailUnico('usuario'),
    status: opts.status || 'active',
  };
}

function gerarPost(userId, opts = {}) {
  if (!userId) throw new Error('O campo userId é obrigatório para gerar um post.');

  return {
    user_id: userId,
    title: opts.title || `Título do post ${Date.now()}`,
    body: opts.body || 'Corpo do post de teste.',
  };
}

function gerarComentario(postId, opts = {}) {
  if (!postId) throw new Error('O campo postId é obrigatório para gerar um comentário.');

  return {
    post_id: postId,
    name: opts.name || `Comentador ${Date.now()}`,
    email: opts.email || gerarEmailUnico('comentario'),
    body: opts.body || 'Comentário de teste.',
  };
}

module.exports = {
  gerarUsuario,
  gerarPost,
  gerarComentario,
  gerarEmailUnico,
};
