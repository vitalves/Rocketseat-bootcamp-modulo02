/*
 * PROXIMO:
 ********** Agendamento de serviço
 ********** Agendamento de serviço
 ********** Agendamento de serviço
 ********** Agendamento de serviço
 ********** Agendamento de serviço
 ********** Agendamento de serviço
 ********** Agendamento de serviço
 */

/* AQUIVO QUE faz a conexao com o DB e correga os Models */
import Sequelize from 'sequelize';

// importa os Models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointments';

// importa as configuracoes do DB
import databaseConfig from '../config/database';

// Array com os models da aplicacao
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz a conexao com o bd e carrega os models
    this.connection = new Sequelize(databaseConfig);

    // percorre o array e acessa os metodos (init)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
