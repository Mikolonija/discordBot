import { Database } from '@/database';
import {
  ITemplate,
  ITemplateBody,
  ITemplateParams,
} from '@/modules/templates/types';

export const createNewTemplate = async (db: Database, body: ITemplateBody) => {
  const newTemplate = db
    .insertInto('template')
    .values({ text: body.text })
    .returning('id')
    .execute();
  return newTemplate;
};

export const getAllTemplates = async (db: Database): Promise<ITemplate[]> => {
  const templates = await db
    .selectFrom('template')
    .selectAll()
    .orderBy('id', 'desc')
    .execute();
  return templates;
};

export const updateTemplateByID = async (
  db: Database,
  params: ITemplateParams,
  body: ITemplateBody
): Promise<boolean> => {
  const result = await db
    .updateTable('template')
    .set({
      text: body.text,
    })
    .where('id', '=', Number(params.id))
    .executeTakeFirst();
  return result.numUpdatedRows > 0;
};

export const deleteTemplateByID = async (
  db: Database,
  params: ITemplateParams
): Promise<boolean> => {
  const result = await db
    .deleteFrom('template')
    .where('id', '=', Number(params.id))
    .executeTakeFirst();
  return result.numDeletedRows > 0;
};
