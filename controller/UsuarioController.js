import Usuario from "../model/UsuarioModel.js"

async function listar (request, response) {
    const respostaBanco = await Usuario.findAll();
    response.json(respostaBanco)
}

async function selecionar (request, response) {
    const id = request.params.id;
    const respostaBanco = await Usuario.findByPk(id);
    response.json(respostaBanco)
}

async function inserir (request, response) {

    const respostaBanco = await Usuario.create(request.body);
    response.json(respostaBanco)
}

async function alterar (request, response) {
    const nome = request.body.nome;
    const cpf = request.body.cpf;
    const email = request.body.email;
    const telefone = request.body.telefone;
    const nascimento = request.body.nascimento;
    const senha = request.params.senha;
    const idusuario = request.params.id

    const respostaBanco = await Usuario.update({nome, cpf, email, telefone, nascimento, senha},{where:{idusuario}});
    response.json(respostaBanco)
}

async function excluir (request, response) {
    const idusuario = request.params.id;
  
    const respostaBanco = await Usuario.destroy({where:{idusuario}});
    response.json(respostaBanco)
  }

export default {listar, selecionar, inserir, alterar, excluir}