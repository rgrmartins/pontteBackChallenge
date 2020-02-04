import * as Yup from 'yup';
import Documento from '../models/Documento';
import Loan from '../models/Loan';

class DocumentoController {
  async store(req, res) {
    // Etapa de validações das entradas
    const schema = Yup.object().shape({
      proposta_id: Yup.number()
        .integer()
        .positive()
        .required(),
      cnh_cpf: Yup.number()
        .integer()
        .positive()
        .required(),
      comprovante_renda: Yup.number()
        .integer()
        .positive(),
      imagem_imovel: Yup.number()
        .integer()
        .positive(),
    });

    // Agora comparar o req.body com o schema pra ver se passa nas validações
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Por favor faça uploads das imagens corretamente.' });
    }

    const { proposta_id } = req.body;

    const proposta = await Loan.findByPk(proposta_id);

    if (!proposta || proposta.status_proposta !== null) {
      return res
        .status(400)
        .json({ error: 'Proposta não encontrada ou Finalizada' });
    }

    const documento = await Documento.findOne({
      where: { proposta_id },
    });

    // Uma forma de criar um upload ou caso ja tenha atualizar as imagens
    if (documento) {
      documento.update({
        cnh_cpf: req.body.cnh_cpf,
        comprovante_renda: req.body.comprovante_renda,
        imagem_imovel: req.body.imagem_imovel,
      });
      return res.json(documento);
    }

    // Salvando no Banco e retornando o objeto no jSON
    const response = await Documento.create(req.body);
    await proposta.update({ step_proposta: 'UPLOAD' });
    return res.json(response);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    // Paginação com 20 propostas por vez
    const response = await Documento.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(response);
  }
}

export default new DocumentoController();
