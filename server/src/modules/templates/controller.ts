import { NextFunction, Request, Response } from 'express';
import { Database } from '@/database';
import {
  createNewTemplate,
  deleteTemplateByID,
  getAllTemplates,
  updateTemplateByID,
} from '@/modules/templates/repository';
import createError from '@/utils/createError';
import createSuccess, { SuccessResponse } from '@/utils/createSuccess';
import { ITemplateBody, ITemplateParams } from '@/modules/templates/types';

export const postTemplate = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { text }: ITemplateBody = req.body;
  if (!text) throw createError('Missing required field text', 400);
  if (text.length > 300)
    throw createError('Text is too long, max length is 300', 400);

  try {
    const result = await createNewTemplate(db, req.body);
    const successResponse: SuccessResponse = createSuccess(
      'Template created successfully',
      result
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

export const getTemplate = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const params: ITemplateParams = {
    limit: req.query.limit?.toString(),
    offset: req.query.offset?.toString(),
  };
  try {
    const result = await getAllTemplates(db, params);
    const successResponse: SuccessResponse = createSuccess(
      'Templates get successfully',
      result
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const params: ITemplateParams = {
    id: req.params.id,
  };

  if (!params.id || isNaN(Number(params.id)))
    throw createError('Invalid or missing template ID', 400);

  try {
    const isDeleted = await deleteTemplateByID(db, params);
    if (!isDeleted) {
      throw createError('Template not found', 400);
    }
    const successResponse: SuccessResponse = createSuccess(
      'Template deleted successfully'
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

export const updateTemplate = async (
  db: Database,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { text }: ITemplateBody = req.body;
    if (!text) throw createError('Missing required field text', 400);
    if (text.length > 300)
      throw createError('Text is too long, max length is 300', 400);
    const params: ITemplateParams = {
      id: req.params.id,
    };

    if (!params.id || isNaN(Number(params.id))) {
      throw createError('Invalid or missing template ID', 400);
    }

    const idUpdated = await updateTemplateByID(db, params, req.body);

    if (!idUpdated) {
      throw createError('Template not found', 400);
    }
    const successResponse: SuccessResponse = createSuccess(
      'Template updated successfully'
    );
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};
