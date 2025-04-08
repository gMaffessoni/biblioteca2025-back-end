import express from "express";
import banco from "./banco.js";
import editora from "./controller/EditoraController.js";

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

app.listen(3000, ()=>{console.log("Servidor rodando.")});