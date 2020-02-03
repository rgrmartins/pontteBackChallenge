import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Documento from '../app/models/Documento';
import File from '../app/models/File';
import Loan from '../app/models/Loan';

const models = [Documento, File, Loan];

class Database {
  constructor() {
    this.init();
  }

  // Conexão com o Banco Relacional através do Sequelize
  init() {
    this.connection = new Sequelize(databaseConfig);

    // Segundo Map é para rodar os associates de cada model caso tenha
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
