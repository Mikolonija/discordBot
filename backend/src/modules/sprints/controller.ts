import { NextFunction, Request, Response } from 'express';
import { Database } from '@/database';
import {
  createNewSprint,
  deleteSprintByID,
  getAllSprints,
  updateSprintByID,
} from '@/modules/sprints/repository';
import createSuccess, { SuccessResponse } from '@/utils/createSuccess';
import createError from '@/utils/createError';
import { ISprintBody, ISprintParams } from '@/modules/sprints/types';

export const postSprint = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { code, title }: ISprintBody = req.body;
  if (!code) throw createError('Missing required fields code', 400);
  if (!title) throw createError('Missing required fields title', 400);
  if (title.length > 130)
    throw createError('Title its to long max length 130', 400);
  if (code.length > 20)
    throw createError('Code its to long max length 20', 400);
  try {
    const result = await createNewSprint(db, req.body);
    const successResponse: SuccessResponse = createSuccess(
      'Sprint created successfully',
      result
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

export const getSprint = async (
  db: Database,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getAllSprints(db);
    const successResponse: SuccessResponse = createSuccess(
      'Sprint get successfully',
      result
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

export const updateSprint = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { code, title }: ISprintBody = req.body;
    if (!code) throw createError('Missing required fields code', 400);
    if (!title) throw createError('Missing required fields title', 400);
    if (title.length > 130)
      throw createError('Title its to long max length 130', 400);
    if (code.length > 20)
      throw createError('Code its to long max length 20', 400);
    const params: ISprintParams = {
      id: req.params.id,
    };
    if (!params.id || isNaN(Number(params.id)))
      throw createError('Invalid or missing sprint ID', 400);

    const result = await updateSprintByID(db, params, req.body);
    if (!result) throw createError('Sprint not found', 404);

    const successResponse: SuccessResponse = createSuccess(
      'Sprint updated successfully'
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

export const deleteSprint = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const params: ISprintParams = {
    id: req.params.id,
  };

  if (!params.id || isNaN(Number(params.id))) {
    throw createError('Invalid or missing sprint ID', 400);
  }

  try {
    const isDeleted = await deleteSprintByID(db, params);
    if (!isDeleted) throw createError('Sprint not found', 404);
    const successResponse: SuccessResponse = createSuccess(
      'Sprint deleted successfully'
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};
