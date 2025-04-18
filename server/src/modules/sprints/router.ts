import express from 'express';
import { Database } from '@/database';
import {
  updateSprint,
  deleteSprint,
  postSprint,
  getSprint,
} from '@/modules/sprints/controller';

const sprintsRouter = (db: Database) => {
  const router = express.Router();
  router.post('/', (req, res, next) => postSprint(db, req, res, next));
  router.get('/', (_, res, next) => getSprint(db, res, next));
  router.patch('/:id', (req, res, next) => updateSprint(db, req, res, next));
  router.delete('/:id', (req, res, next) => deleteSprint(db, req, res, next));
  return router;
};

export default sprintsRouter;
