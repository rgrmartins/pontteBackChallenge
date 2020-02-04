import * as Yup from 'yup';
import Loan from '../models/Loan';

class PropostaController {
  async store(req, res) {
    // Etapa de validações das entradas
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cpf: Yup.string().required(),
      valor_emprestimo: Yup.number()
        .integer()
        .positive()
        .required(),
      renda_mensal: Yup.number()
        .integer()
        .positive(),
      data_nascimento: Yup.date(),
      estado_civil: Yup.string(),
      endereco: Yup.string(),
    });

    // Agora comparar o req.body com o schema pra ver se passa nas validações
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Para dar continuidade é necessário enviar todos os documentos obrigatórios.',
      });
    }

    // Uma forma de salvar neste momento somente o necessário e não dados futuros
    const {
      nome,
      email,
      cpf,
      valor_emprestimo,
      renda_mensal,
      data_nascimento,
      estado_civil,
      endereco,
    } = req.body;

    // Salvando no Banco e retornando o objeto no jSON
    const response = await Loan.create({
      nome,
      email,
      cpf,
      valor_emprestimo,
      renda_mensal,
      data_nascimento,
      estado_civil,
      endereco,
    });

    return res.json(response);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    // Paginação com 20 propostas por vez
    const response = await Loan.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(response);
  }

  async update(req, res) {
    // Etapa de validações das entradas
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      cpf: Yup.string(),
      valor_emprestimo: Yup.number()
        .integer()
        .positive(),
      renda_mensal: Yup.number()
        .integer()
        .positive(),
      data_nascimento: Yup.date(),
      estado_civil: Yup.string(),
      endereco: Yup.string(),
    });

    // Agora comparar o req.body com o schema pra ver se passa nas validações
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro ao validar entradas.',
      });
    }

    const { id } = req.query;
    const loan = await Loan.findByPk(id);

    if (!loan || loan.status_proposta !== null) {
      res
        .status(400)
        .json({ error: 'Proposta já finalizada, não pode ser editada' });
    }

    await loan.update(req.body);

    return res.json(loan);
  }
}

export default new PropostaController();
