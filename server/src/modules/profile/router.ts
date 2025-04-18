import express from 'express';
import { getUserInfo } from '@/modules/profile/controller';

const userRouter = () => {
  const router = express.Router();
  router.get('/', (_, res, next) => getUserInfo(res, next));
  return router;
};

export default userRouter;
