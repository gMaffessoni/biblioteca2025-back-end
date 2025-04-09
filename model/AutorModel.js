import { DataTypes } from "sequelize";
import banco from "../banco.js"

//mapeamento da model Autor
export default banco.define(
    'autor',
    {
      idautor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomeautor: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      biografia: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      nacionalidade: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      foto: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }
  );