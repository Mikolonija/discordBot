import { NextFunction, Request, Response } from 'express';
import { sendCongratulatoryMessage } from '@/modules/messages/service';
import { Database } from '@/database';
import { deleteMessageByID, getMessages } from '@/modules/messages/repository';
import createError from '@/utils/createError';
import createSuccess, { SuccessResponse } from '@/utils/createSuccess';
import {
  IMessageBody,
  IMessageParams,
  IMessagePath,
} from '@/modules/messages/types';

export const postMessage = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userID, sprintCode, channelId, templateId }: IMessageBody =
      req.body;
    if (!userID) throw createError('Missing required field userID ', 400);
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
      userID: req.query.userID?.toString(),
      sprintCode: req.query.sprintCode?.toString(),
      limit: req.query.limit?.toString(),
      offset: req.query.offset?.toString(),
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

export const deleteMessage = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const params: IMessagePath = {
    id: req.params.id,
  };

  if (!params.id || isNaN(Number(params.id))) {
    throw createError('Invalid or missing sprint ID', 400);
  }
  try {
    const isDeleted = await deleteMessageByID(db, Number(params.id));
    if (!isDeleted) throw createError('Sprint not found', 404);
    const successResponse: SuccessResponse = createSuccess(
      'Message deleted successfully'
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};
