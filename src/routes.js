import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import LoanController from './app/controllers/LoanController';
import DocumentoController from './app/controllers/DocumentoController';

const routes = new Router();
const upload = multer(multerConfig);

// Rota de Criação de uma Proposta
routes.post('/propostas', LoanController.store);

// Rota para Listar todas as propostas criadas
routes.get('/propostas', LoanController.index);

// Rota para referenciar imagens a proposta
routes.post('/documentos', DocumentoController.store);

// Rota de Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

// Rota de teste para arquivos salvos
routes.get('/files', FileController.index);

export default routes;
