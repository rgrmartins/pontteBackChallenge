import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

const models = [];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // Conexão com o Banco Relacional através do Sequelize
  init() {
    this.connection = new Sequelize(databaseConfig);

    // Segundo Map é para rodar os associates de cada model caso tenha
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // Conexão com o banco Não Relacional através do Mongoose, usado neste caso para Notificações
  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
