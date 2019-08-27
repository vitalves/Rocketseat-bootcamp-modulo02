import Sequelize, { Model } from 'sequelize';

class Appointments extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.DATE,
        canceled_ad: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    // retorn o modulo que acabou de ser inicializado
    return this;
  }

  static associate(models) {
    // Dois relacionamentos com a mesma tabela (exige o uso do "as:")
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointments;
