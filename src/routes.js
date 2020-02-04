import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import LoanController from './app/controllers/LoanController';
import DocumentoController from './app/controllers/DocumentoController';
import ApprovalController from './app/controllers/ApprovalController';

const routes = new Router();
const upload = multer(multerConfig);

// Rota de Criação de uma Proposta
routes.post('/propostas', LoanController.store);

// Rota para Listar todas as propostas criadas
routes.get('/propostas', LoanController.index);

// Rota para Update de Proposta desde que seja permitido
routes.put('/propostas', LoanController.update);

// Rota para referenciar imagens a proposta
routes.post('/documentos', DocumentoController.store);

// Rota para Listar os documentos e as propostas referentes
routes.get('/documentos', DocumentoController.index);

// Rota de Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

// Rota para aprovação ou reprovação de uma proposta de emprestimo
routes.put('/aprovacao', ApprovalController.update);

// Rota de teste para arquivos salvos
routes.get('/files', FileController.index);

export default routes;
