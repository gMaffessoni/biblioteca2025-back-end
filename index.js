import express from "express";

const app = express();
app.use(express.json());

app.get('/teste', (request, response)=>{
    response.send("Teste Ok.");
})

app.listen(3000, ()=>{console.log("Servidor rodando.")});
