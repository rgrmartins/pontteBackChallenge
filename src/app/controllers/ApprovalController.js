import * as Yup from 'yup';
import Loan from '../models/Loan';

class ApprovalController {
  async update(req, res) {
    const schema = Yup.object().shape({
      status_proposta: Yup.string().required(),
    });

    // Agora comparar o req.body com o schema pra ver se passa nas validações
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'É obrigatório enviar o status da proposta (APROVADA ou REPROVADA).',
      });
    }

    const { proposta_id } = req.query;
    const loan = await Loan.findByPk(proposta_id);

    if (!loan || loan.status_proposta !== null) {
      res
        .status(400)
        .json({ error: 'Proposta já finalizada, não pode ser editada' });
    }

    if (loan.step_proposta !== 'UPLOAD') {
      res.status(400).json({
        error:
          'Para finalizar uma proposta, é necessário cumprir as etapas de criação e upload dos documentos',
      });
    }

    const response = await loan.update({
      step_proposta: 'APROVACAO',
      status_proposta: req.body.status_proposta,
    });

    return res.json(response);
  }
}

export default new ApprovalController();
