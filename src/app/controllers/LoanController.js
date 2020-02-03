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
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Salvando no Banco e retornando o objeto no jSON
    const response = await Loan.create(req.body);

    return res.json(response);
  }

  async index(req, res) {
    // const { page = 1 } = req.query;

    const response = await Loan.findAll();

    return res.json(response);
  }
}

export default new PropostaController();
