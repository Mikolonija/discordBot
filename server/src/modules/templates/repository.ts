import { Database } from '@/database';
import {
  ITemplate,
  ITemplateBody,
  ITemplateParams,
  ITemplateResult,
} from '@/modules/templates/types';

export const createNewTemplate = async (db: Database, body: ITemplateBody) => {
  const newTemplate = db
    .insertInto('template')
    .values({ text: body.text })
    .returning('id')
    .execute();
  return newTemplate;
};

export const getAllTemplates = async (
  db: Database,
  params: ITemplateParams
): Promise<ITemplateResult> => {
  const limit = params.limit ? Number(params.limit) : undefined;
  const offset = params.offset ? Number(params.offset) : undefined;
  const baseQuery = db.selectFrom('template').selectAll().orderBy('id', 'desc');
  const paginatedQuery =
    limit !== undefined && offset !== undefined
      ? baseQuery.limit(limit).offset(offset)
      : baseQuery;

  const [totalResult, items] = await Promise.all([
    db
      .selectFrom('template')
      .select((eb) => eb.fn.countAll().as('count'))
      .executeTakeFirst(),
    paginatedQuery.execute(),
  ]);
  return {
    total: Number(totalResult?.count || 0),
    items,
  };
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
