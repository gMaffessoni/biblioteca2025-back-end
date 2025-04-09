import Livro from "../model/LivroModel.js"

async function listar (request, response) {
    const respostaBanco = await Livro.findAll();
    response.json(respostaBanco)
}

async function selecionar (request, response) {
    const id = request.params.id;
    const respostaBanco = await Livro.findByPk(id);
    response.json(respostaBanco)
}

async function inserir (request, response) {

    const respostaBanco = await Livro.create(request.body);
    response.json(respostaBanco)
}

async function alterar (request, response) {
    const titulo = request.body.titulo;
    const edicao = request.body.edicao;
    const paginas = request.body.paginas;
    const publicacao = request.body.publicacao;
    const foto = request.body.foto;
    const resumo = request.params.resumo;
    const ativo = request.params.ativo;
    const condicaofisica = request.params.condicaofisica;
    const emprestado = request.params.emprestado;
    const idlivro = request.params.id;
    const ideditora = request.params.ideditora;
    const idcategoria = request.params.idcategoria;

    const respostaBanco = await Autor.update({titulo, edicao, paginas, publicacao, foto, resumo, ativo, condicaofisica, emprestado, ideditora, idcategoria},{where:{idlivro}});
    response.json(respostaBanco)
}

async function excluir (request, response) {
    const idlivro = request.params.id;
  
    const respostaBanco = await Livro.destroy({where:{idlivro}});
    response.json(respostaBanco)
  }

export default {listar, selecionar, inserir, alterar, excluir}