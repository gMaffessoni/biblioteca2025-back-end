import Editora from "../model/EditoraModel.js"

async function listar (request, response) {
    const respostaBanco = await Editora.findAll();
    response.json(respostaBanco)
}

async function selecionar (request, response) {
    const id = request.params.id;
    const respostaBanco = await Editora.findByPk(id);
    response.json(respostaBanco)
}

async function inserir (request, response) {
    //const nomeeditora = request.body.nomeeditora;
    //const cnpj = request.body.cnpj;
    //const endereco = request.body.endereco;

    const respostaBanco = await Editora.create(request.body);
    response.json(respostaBanco)
}

async function alterar (request, response) {
    const nomeeditora = request.body.nomeeditora;
    const cnpj = request.body.cnpj;
    const endereco = request.body.endereco;
    const ideditora = request.params.id;

    const respostaBanco = await Editora.update({nomeeditora, cnpj, endereco},{where:{ideditora}});
    response.json(respostaBanco)
}

async function excluir (request, response) {
    const ideditora = request.params.id;
  
    const respostaBanco = await Editora.destroy({where:{ideditora}});
    response.json(respostaBanco)
  }

export default {listar, selecionar, inserir, alterar, excluir}