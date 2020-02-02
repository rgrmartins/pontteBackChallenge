import * as Yup from 'yup';
import Documento from '../models/Documento';

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
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Salvando no Banco e retornando o objeto no jSON
    const response = await Documento.create(req.body);

    return res.json({ response });
  }
}

export default new DocumentoController();
