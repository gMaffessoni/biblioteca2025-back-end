import Emprestimo from "../model/EmprestimoModel.js";
import Livro from "../model/LivroModel.js";
import Usuario from "../model/UsuarioModel.js";
import moment from "moment";

async function listar (request, response) {
    const respostaBanco = await Emprestimo.findAll();
    response.json(respostaBanco)
}

async function selecionar (request, response) {
    const id = request.params.id;
    const respostaBanco = await Emprestimo.findByPk(id);
    response.json(respostaBanco)
}

async function emprestar (request, response) {
    //Lendo os parametros
    const idlivro = request.body.idlivro;
    const idusuario = request.body.idusuario;

    //Verifica se existe o parametro idlivro
    if (!idlivro){
        response.status(422).send("O parâmetro idlivro é obrigatório.");
    }
    
    //Verifica se existe o parametro idusuario
    if (!idusuario){
        response.status(422).send("O parâmetro idusuario é obrigatório.");
    }

    //Verifica se o livro existe
    const livroBanco = await Livro.findByPk(idlivro);
    if (!livroBanco){
        response.status(404).send("Livro não encontrado.");
    }

    //Verifica se o usuario existe
    const usuarioBanco = await Usuario.findByPk(idusuario);
    if (!usuarioBanco){
        response.status(404).send("Usuário não encontrado.");
    }

    //Verifica se o livro está inativo
    if (!livroBanco.ativo){
        response.status(422).send("Esse livro está inativo.");
    }


    //Verifica se o livro está emprestado
    if (livroBanco.emprestado){
        response.status(422).send("Não é possível realizar o empréstimo, livro já está emprestado.");
    }

    //Verifica se o usuário tem um emprestimo pendente
    //Falta fazer

    //Setando data de emprestimo e data de vencimento
    const emprestimo = moment().format("YYYY-MM-DD");
    const vencimento = moment().add(15, "days").format("YYYY-MM-DD");


    //Inserindo o emprestimo no banco
    const respostaBanco = await Emprestimo.create({idlivro, idusuario, emprestimo, vencimento});

    //Alterando o campo emprestado do livro para true
    const emprestado = true;
    await Livro.update({emprestado},{where:{idlivro}});
    response.json(respostaBanco)
}

async function devolver (request, response) {
    const idemprestimo = request.params.id;
    const devolucao = moment().format("YYYY-MM-DD");
    const observacao = request.body.observacao;

    if (!idemprestimo){
        return response.status(404).send("Código de empréstimo inválido.");
    }

    // Busca o empréstimo no banco
    const emprestimoBanco = await Emprestimo.findByPk(idemprestimo);

    if (!emprestimoBanco) {
        return response.status(404).send("Empréstimo não encontrado.");
    }

    // Busca o livro relacionado ao empréstimo
    const livroBanco = await Livro.findByPk(emprestimoBanco.idlivro);

    if (!livroBanco) {
        return response.status(404).send("Livro não encontrado.");
    }

    // Verifica se o livro está emprestado   
    if (!livroBanco.emprestado){
        return response.status(422).send("Não é possível devolver esse livro, pois ele não está emprestado.");
    }

    // Edita o empréstimo preenchendo a data de devolução e observação
    await Emprestimo.update({ devolucao, observacao },{where:{idemprestimo}});

    // Atualiza o status do livro para "não emprestado"
    await Livro.update({ emprestado: false },{where:{idlivro: livroBanco.idlivro}});

    response.send("Livro devolvido com sucesso.");
}


export default {listar, selecionar, emprestar, devolver}