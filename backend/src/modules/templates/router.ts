import express from 'express';
import { Database } from '@/database';
import {
  deleteTemplate,
  getTemplate,
  postTemplate,
  updateTemplate,
} from '@/modules/templates/controller';

const templatesRouter = (db: Database) => {
  const router = express.Router();
  router.post('/', (req, res, next) => postTemplate(db, req, res, next));
  router.get('/', (_, res, next) => getTemplate(db, res, next));
  router.patch('/:id', (req, res, next) => updateTemplate(db, req, res, next));
  router.delete('/:id', (req, res, next) => deleteTemplate(db, req, res, next));
  return router;
};

export default templatesRouter;
