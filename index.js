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

app.listen(3000, ()=>{console.log("Servidor rodando.")});
