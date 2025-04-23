import { Database } from '@/database';
import {
  ISprint,
  ISprintBody,
  ISprintParams,
  ISprintResult,
} from '@/modules/sprints/types';

export const createNewSprint = async (db: Database, body: ISprintBody) => {
  const newSprint = db
    .insertInto('sprint')
    .values({ code: body.code, title: body.title })
    .returning('id')
    .execute();
  return newSprint;
};

export const getAllSprints = async (
  db: Database,
  params: ISprintParams
): Promise<ISprintResult> => {
  const limit = params.limit ? Number(params.limit) : undefined;
  const offset = params.offset ? Number(params.offset) : undefined;

  const baseQuery = db.selectFrom('sprint').selectAll().orderBy('id', 'desc');

  const paginatedQuery =
    limit !== undefined && offset !== undefined
      ? baseQuery.limit(limit).offset(offset)
      : baseQuery;

  const [totalResult, items] = await Promise.all([
    db
      .selectFrom('sprint')
      .select((eb) => eb.fn.countAll().as('count'))
      .executeTakeFirst(),
    paginatedQuery.execute(),
  ]);

  return {
    total: Number(totalResult?.count || 0),
    items,
  };
};

export const updateSprintByID = async (
  db: Database,
  param: ISprintParams,
  body: ISprintBody
): Promise<boolean> => {
  const result = await db
    .updateTable('sprint')
    .set({
      code: body.code,
      title: body.title,
    })
    .where('id', '=', Number(param.id))
    .executeTakeFirst();

  return result.numUpdatedRows > 0;
};

export const deleteSprintByID = async (
  db: Database,
  params: ISprintParams
): Promise<boolean> => {
  const result = await db
    .deleteFrom('sprint')
    .where('id', '=', Number(params.id))
    .executeTakeFirst();
  return result.numDeletedRows > 0;
};
