import { Database } from '@/database';
import { ISprint, ISprintBody, ISprintParams } from '@/modules/sprints/types';

export const createNewSprint = async (db: Database, body: ISprintBody) => {
  const newSprint = db
    .insertInto('sprint')
    .values({ code: body.code, title: body.title })
    .returning('id')
    .execute();
  return newSprint;
};

export const getAllSprints = async (db: Database): Promise<ISprint[]> => {
  const sprints = await db
    .selectFrom('sprint')
    .selectAll()
    .orderBy('id', 'desc')
    .execute();

  return sprints;
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
