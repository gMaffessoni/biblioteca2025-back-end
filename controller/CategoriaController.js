import Categoria from "../model/CategoriaModel.js"

async function listar (request, response) {
    const respostaBanco = await Categoria.findAll();
    response.json(respostaBanco)
}

async function selecionar (request, response) {
    const id = request.params.id;
    const respostaBanco = await Categoria.findByPk(id);
    response.json(respostaBanco)
}

async function inserir (request, response) {

    const respostaBanco = await Categoria.create(request.body);
    response.json(respostaBanco)
}

async function alterar (request, response) {
    const idcategoria = request.body.idcategoria;
    const nomecategoria = request.body.nomecategoria;

    const respostaBanco = await Categoria.update({nomecategoria},{where:{idcategoria}});
    response.json(respostaBanco)
}

async function excluir (request, response) {
    const idcategoria = request.params.id;
  
    const respostaBanco = await Categoria.destroy({where:{idcategoria}});
    response.json(respostaBanco)
  }

export default {listar, selecionar, inserir, alterar, excluir}