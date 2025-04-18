import { NextFunction, Request, Response } from 'express';
import { sendCongratulatoryMessage } from '@/modules/messages/service';
import { Database } from '@/database';
import { getMessages } from '@/modules/messages/repository';
import createError from '@/utils/createError';
import createSuccess, { SuccessResponse } from '@/utils/createSuccess';
import { IMessageBody, IMessageParams } from '@/modules/messages/types';

export const postMessage = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, sprintCode, channelId, templateId }: IMessageBody =
      req.body;
    if (!username) throw createError('Missing required field username ', 400);
    if (!sprintCode)
      throw createError('Missing required fields sprintCode', 400);
    if (!channelId) throw createError('Missing required fields channelId', 400);
    if (!templateId)
      throw createError('Missing required fields templateId', 400);

    await sendCongratulatoryMessage(db, req.body);
    const successResponse: SuccessResponse = createSuccess(
      'Message sent successfully'
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const params: IMessageParams = {
      username: req.query.username?.toString(),
      sprintCode: req.query.sprintCode?.toString(),
    };
    const result = await getMessages(db, params);
    const successResponse: SuccessResponse = createSuccess(
      'Message get successfully',
      result
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};
