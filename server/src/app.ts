import express from 'express';
import messagesRouter from '@/modules/messages/router';
import { Database } from '@/database';
import templatesRouter from '@/modules/templates/router';
import sprintsRouter from '@/modules/sprints/router';
import { errorHandler } from '@/middleware/errorHandler';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from '@/modules/profile/router';
import { FRONT_END_URL } from '@/config';

const createApp = (db: Database) => {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: FRONT_END_URL }));
  app.use(express.json());
  app.use('/messages', messagesRouter(db));
  app.use('/templates', templatesRouter(db));
  app.use('/sprints', sprintsRouter(db));
  app.use('/profile', userRouter());
  app.use(errorHandler);

  return app;
};

export default createApp;
