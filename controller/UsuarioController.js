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

  async function senha (request, response) {
      const idusuario = request.params.id;
      const senha = request.body.senha;
  
      if (!idusuario){
          return response.status(404).send("Código de usuário inválido.");
      }
  
      if (senha.length < 6){
          return response.status(404).send("Senha precisa ter no mínimo 6 caracteres.");
      }
  
      if (senha.length > 20){
          return response.status(404).send("Senha precisa ter no máximo 20 caracteres.");
      }
  
      await Usuario.update({senha},{where:{idusuario}});
  
      const usuarioBanco = await Usuario.findByPk(idusuario);
      response.json(usuarioBanco)
  
  }

export default {listar, selecionar, inserir, alterar, excluir, senha}