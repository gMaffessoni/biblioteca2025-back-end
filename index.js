import express from "express";
import { Sequelize, DataTypes } from "sequelize";


//configuração da conexão com o banco de dados
const sequelize = new Sequelize('biblioteca2025', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect:'postgres', 
    define: {
        timestamps: false,
        freezeTableName: true
    }
  });

  //mapeamento da model Editora
  const Editora = sequelize.define(
    'editora',
    {
      ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomeeditora: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      endereco: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }
  );
  

try {
    await sequelize.authenticate();
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
app.get("/editora", async(request, response)=>{
    const respostaBanco = await Editora.findAll();
    response.json(respostaBanco)
});

app.get("/editora/:id", async(request, response)=>{
    const id = request.params.id;
    const respostaBanco = await Editora.findByPk(id);
    response.json(respostaBanco)
});

app.post("/editora", async(request, response)=>{
    //const nomeeditora = request.body.nomeeditora;
    //const cnpj = request.body.cnpj;
    //const endereco = request.body.endereco;

    const respostaBanco = await Editora.create(request.body);
    response.json(respostaBanco)
});

app.put("/editora/:id", async(request, response)=>{
    const nomeeditora = request.body.nomeeditora;
    const cnpj = request.body.cnpj;
    const endereco = request.body.endereco;
    const ideditora = request.params.id;

    const respostaBanco = await Editora.update({nomeeditora, cnpj, endereco},{where:{ideditora}});
    response.json(respostaBanco)
});

app.delete("/editora/:id", async(request, response)=>{
  const ideditora = request.params.id;

  const respostaBanco = await Editora.destroy({where:{ideditora}});
  response.json(respostaBanco)
});

app.listen(3000, ()=>{console.log("Servidor rodando.")});