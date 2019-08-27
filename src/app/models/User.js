import Sequelize, { Model } from 'sequelize';

// para a criptografia
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // hook sao trechos de codigos executados de forma automatica baseada em acoes
    this.addHook('beforeSave', async user => {
      // user.name = 'Diego'; // todo usuario receberia esse nome
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // retorn o modulo que acabou de ser inicializado
    return this;
  }

  // metodo para a verificacao de senha
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
