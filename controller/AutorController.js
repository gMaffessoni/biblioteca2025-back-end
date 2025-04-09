import Autor from "../model/AutorModel.js"

async function listar (request, response) {
    const respostaBanco = await Autor.findAll();
    response.json(respostaBanco)
}

async function selecionar (request, response) {
    const id = request.params.id;
    const respostaBanco = await Autor.findByPk(id);
    response.json(respostaBanco)
}

async function inserir (request, response) {

    const respostaBanco = await Autor.create(request.body);
    response.json(respostaBanco)
}

async function alterar (request, response) {
    const nomeautor = request.body.nomeautor;
    const nascimento = request.body.nascimento;
    const biografia = request.body.biografia;
    const nacionalidade = request.body.nacionalidade;
    const foto = request.body.foto;
    const idautor = request.params.id;

    const respostaBanco = await Autor.update({nomeautor, nascimento, biografia, nacionalidade, foto},{where:{idautor}});
    response.json(respostaBanco)
}

async function excluir (request, response) {
    const idautor = request.params.id;
  
    const respostaBanco = await Autor.destroy({where:{idautor}});
    response.json(respostaBanco)
  }

export default {listar, selecionar, inserir, alterar, excluir}