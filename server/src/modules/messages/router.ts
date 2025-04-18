import express from 'express';
import { getMessage, postMessage } from '@/modules/messages/controller';
import { Database } from '@/database';

const messagesRouter = (db: Database) => {
  const router = express.Router();
  router.post('/', (req, res, next) => postMessage(db, req, res, next));
  router.get('/', (req, res, next) => getMessage(db, req, res, next));
  return router;
};

export default messagesRouter;
