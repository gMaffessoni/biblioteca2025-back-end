import Funcionario from "../model/FuncionarioModel.js"

async function listar (request, response) {
    const respostaBanco = await Funcionario.findAll();
    response.json(respostaBanco)
}

async function selecionar (request, response) {
    const id = request.params.id;
    const respostaBanco = await Funcionario.findByPk(id);
    response.json(respostaBanco)
}

async function inserir (request, response) {

    const nomefuncionario =  request.body.nomefuncionario;
    const email =  request.body.email;
    const salario =  request.body.salario;
    const contratacao =  request.body.contratacao;

    //Validando campos obrigatórios para a criação do funcionario

    if (!nomefuncionario){
        return response.status(404).send("O campo nomefuncionario é obrigatório.");
    }

    if (!email){
        return response.status(404).send("O campo email é obrigatório.");
    }

    if (!salario){
        return response.status(404).send("O campo salario é obrigatório.");
    }

    if (!contratacao){
        return response.status(404).send("O campo contratacao é obrigatório.");
    }


    //Criando o funcionario
    const respostaBanco = await Funcionario.create(request.body);
    response.json(respostaBanco)
}

async function alterar (request, response) {
    const nomefuncionario = request.body.nomefuncionario;
    const cpf = request.body.cpf;
    const email = request.body.email;
    const telefone = request.body.telefone;
    const nascimento = request.body.nascimento;
    const salario = request.body.salario;
    const contratacao = request.body.contratacao;
    const idfuncionario = request.params.id;

     //Validando campos obrigatórios para a alteração do funcionario

     if (!nomefuncionario){
        return response.status(404).send("O campo nomefuncionario é obrigatório.");
    }

    if (!email){
        return response.status(404).send("O campo email é obrigatório.");
    }

    if (!salario){
        return response.status(404).send("O campo salario é obrigatório.");
    }

    if (!contratacao){
        return response.status(404).send("O campo contratacao é obrigatório.");
    }

    await Funcionario.update({nomefuncionario, cpf, email, telefone, nascimento, salario, contratacao},{where:{idfuncionario}});
}

async function demitir (request, response) {
    const idfuncionario = request.params.id;
    const demissao = request.body.demissao;

    if (!idfuncionario){
        return response.status(404).send("Código de usuário inválido.");
    }

    if (!Funcionario.ativo){
        return response.status(404).send("Esse funcionário já está inativo.");
    }

    await Funcionario.update({ativo: false, demissao},{where:{idfuncionario}});

    const funcionarioBanco = await Funcionario.findByPk(idfuncionario);
    response.json(funcionarioBanco)

}

async function senha (request, response) {
    const idfuncionario = request.params.id;
    const senha = request.body.senha;

    if (!idfuncionario){
        return response.status(404).send("Código de usuário inválido.");
    }

    if (senha.length < 6){
        return response.status(404).send("Senha precisa ter no mínimo 6 caracteres.");
    }

    if (senha.length > 20){
        return response.status(404).send("Senha precisa ter no máximo 20 caracteres.");
    }

    await Funcionario.update({senha, token: null},{where:{idfuncionario}});

    const funcionarioBanco = await Funcionario.findByPk(idfuncionario);
    response.json(funcionarioBanco)

}

export default {listar, selecionar, inserir, alterar, demitir, senha}