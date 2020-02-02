import { Model } from 'sequelize';

class Proposta extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Proposta, {
      foreignKey: 'proposta_id',
      as: 'proposta',
    });
    this.belongsTo(models.File, { foreignKey: 'cnh_cpf', as: 'doc_pessoal' });
    this.belongsTo(models.File, {
      foreignKey: 'comprovante_renda',
      as: 'renda',
    });
    this.belongsTo(models.File, { foreignKey: 'imagem_imovel', as: 'imovel' });
  }
}

export default Proposta;
