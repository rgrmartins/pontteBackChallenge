import Sequelize, { Model } from 'sequelize';

class Loan extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        valor_emprestimo: Sequelize.INTEGER,
        renda_mensal: Sequelize.INTEGER,
        data_nascimento: Sequelize.DATE,
        estado_civil: Sequelize.STRING,
        endereco: Sequelize.STRING,
        status_proposta: {
          type: Sequelize.ENUM,
          values: ['APROVADA', 'REPROVADA'],
          defaultValue: null,
        },
        step_proposta: {
          type: Sequelize.ENUM,
          values: ['CRIACAO', 'UPLOAD', 'APROVACAO'],
          defaultValue: 'CRIACAO',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Loan;
