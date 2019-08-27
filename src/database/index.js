/* AQUIVO QUE faz a conexao com o DB e correga os Models */
import Sequelize from 'sequelize';

// importa os Models
import User from '../app/models/User';

// importa as configuracoes do DB
import databaseConfig from '../config/database';

// Array com os models da aplicacao
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz a conexao com o bd e carrega os models
    this.connection = new Sequelize(databaseConfig);

    // percorre o array e acessa os metodos (init)
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
