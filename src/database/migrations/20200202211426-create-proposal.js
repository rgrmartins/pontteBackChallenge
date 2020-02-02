module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('propostas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_emprestimo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      renda_mensal: {
        type: Sequelize.INTEGER,
      },
      data_nascimento: {
        type: Sequelize.DATE,
      },
      estado_civil: {
        type: Sequelize.STRING,
      },
      endereco: {
        type: Sequelize.STRING,
      },
      status_proposta: {
        type: Sequelize.ENUM('APROVADA', 'REPROVADA'),
        defaultValue: null,
      },
      step_proposta: {
        type: Sequelize.ENUM('CRIACAO', 'UPLOAD', 'APROVACAO'),
        allowNull: false,
        defaultValue: 'CRIACAO',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('propostas');
  },
};
