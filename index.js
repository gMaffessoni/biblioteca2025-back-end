import express from "express";
import banco from "./banco.js";
import editora from "./controller/EditoraController.js";
import autor from "./controller/AutorController.js";
import categoria from "./controller/CategoriaController.js";
import usuario from "./controller/UsuarioController.js";
import livro from "./controller/LivroController.js";

try {
    await banco.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();
app.use(express.json());

app.get('/teste', (request, response)=>{
    response.send("Teste Ok.");
})

//rotas CRUD da tabela Editora
app.get("/editora", editora.listar);

app.get("/editora/:id", editora.selecionar);

app.post("/editora", editora.inserir);

app.put("/editora/:id", editora.alterar);

app.delete("/editora/:id", editora.excluir);

//rotas CRUD da tabela Autor
app.get("/autor", autor.listar);

app.get("/autor/:id", autor.selecionar);

app.post("/autor", autor.inserir);

app.put("/autor/:id", autor.alterar);

app.delete("/autor/:id", autor.excluir);

//rotas CRUD da tabela Categoria
app.get("/categoria", categoria.listar);

app.get("/categoria/:id", categoria.selecionar);

app.post("/categoria", categoria.inserir);

app.put("/categoria/:id", categoria.alterar);

app.delete("/categoria/:id", categoria.excluir);

//rotas CRUD da tabela Usuário
app.get("/usuario", usuario.listar);

app.get("/usuario/:id", usuario.selecionar);

app.post("/usuario", usuario.inserir);

app.put("/usuario/:id", usuario.alterar);

app.delete("/usuario/:id", usuario.excluir);

//rotas CRUD da tabela Livro
app.get("/livro", livro.listar);

app.get("/livro/:id", livro.selecionar);

app.post("/livro", livro.inserir);

app.put("/livro/:id", livro.alterar);

app.delete("/livro/:id", livro.excluir);


app.listen(3000, ()=>{console.log("Servidor rodando.")});

