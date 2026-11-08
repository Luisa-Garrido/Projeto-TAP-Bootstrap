'use strict';

const livros = {
  jardim: { titulo: 'O jardim das pequenas coisas', autor: 'Clara Fontes', preco: 'R$ 49,90', descricao: 'Ao voltar à casa da infância, Elisa encontra um jardim abandonado e um caderno de sua avó. Entre sementes e memórias, ela descobre que recomeçar também pode ser um gesto pequeno. Uma ficção sobre pertencimento, amizade e os encontros que florescem sem aviso.' },
  cidade: { titulo: 'A cidade depois da chuva', autor: 'Tomás Valença', preco: 'R$ 54,90', descricao: 'Uma tempestade faz os caminhos de Laura e André se cruzarem em uma livraria de bairro. Nas semanas seguintes, bilhetes escondidos entre livros revelam uma cidade que nenhum dos dois conhecia. Um romance sobre acaso, escolhas e coragem para mudar.' },
  tempo: { titulo: 'O tempo de dentro', autor: 'Helena Duarte', preco: 'R$ 39,90', descricao: 'Um café que esfria, uma conversa de janela, uma caminhada sem destino. Nestas crônicas, Helena Duarte transforma cenas comuns em convites para perceber o presente. Um livro para ler aos poucos e revisitar quando o mundo parecer apressado.' }
};

const modal = document.querySelector('#livroModal');
let livroSelecionado;
modal.addEventListener('show.bs.modal', (evento) => {
  livroSelecionado = livros[evento.relatedTarget?.dataset.livro];
  if (!livroSelecionado) return;
  document.querySelector('#modalTitulo').textContent = livroSelecionado.titulo;
  document.querySelector('#modalAutor').textContent = livroSelecionado.autor;
  document.querySelector('#modalDescricao').textContent = livroSelecionado.descricao;
  document.querySelector('#modalPreco').textContent = livroSelecionado.preco;
});

document.querySelector('#interesseLivro').addEventListener('click', () => {
  if (!livroSelecionado) return;
  document.querySelector('#assunto').value = 'livro';
  document.querySelector('#mensagem').value = `Olá! Gostaria de saber mais sobre o livro "${livroSelecionado.titulo}".`;
  document.querySelector('#formStatus').classList.add('d-none');
  modal.addEventListener('hidden.bs.modal', () => {
    document.querySelector('#contato').scrollIntoView({ block: 'start' });
    document.querySelector('#nome').focus({ preventScroll: true });
  }, { once: true });
  bootstrap.Modal.getInstance(modal).hide();
});

const formulario = document.querySelector('#contatoForm');
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const status = document.querySelector('#formStatus');
  status.textContent = 'Mensagem validada com sucesso! Este envio é apenas demonstrativo; nenhum dado foi transmitido ou armazenado.';
  status.classList.remove('d-none');
  formulario.reset();
  status.focus();
});
formulario.addEventListener('input', () => document.querySelector('#formStatus').classList.add('d-none'));

const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
document.querySelector('#busca').addEventListener('input', (evento) => {
  const termo = normalizar(evento.target.value.trim());
  let quantidade = 0;
  document.querySelectorAll('#catalogo tbody tr').forEach((linha) => {
    const corresponde = normalizar(`${linha.cells[0].textContent} ${linha.cells[1].textContent}`).includes(termo);
    linha.hidden = !corresponde;
    if (corresponde) quantidade++;
  });
  document.querySelector('#resultadoBusca').textContent = quantidade === 0 ? 'Nenhum livro encontrado. Tente outro título ou autor.' : `${quantidade} ${quantidade === 1 ? 'livro encontrado' : 'livros encontrados'}.`;
});

document.querySelectorAll('#menuPrincipal a').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('#menuPrincipal');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});
