import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// Rota de Upload de arquivos
routes.post('/files', upload.single('file'));

export default routes;
