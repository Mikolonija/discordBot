import { Database } from '@/database';
import createError from '@/utils/createError';
import {
  IMessageParams,
  IMessage,
  IMessageResult,
} from '@/modules/messages/types';

export const insertMessage = async (
  db: Database,
  username: string,
  sprintCode: string,
  templateId: number,
  message: string,
  giphy: string,
  channelId: string
) => {
  const result = await db
    .insertInto('message')
    .values({
      username,
      sprintCode,
      templateId,
      message,
      giphy,
      channelId,
      createdAt: new Date().toISOString(),
    })
    .execute();
  return result;
};

export const getMessageTemplate = async (
  db: Database,
  templateId: number
): Promise<string> => {
  const template = await db
    .selectFrom('template')
    .select('text')
    .where('id', '=', templateId)
    .limit(1)
    .executeTakeFirst();
  if (!template?.text) {
    throw createError('Template not found', 400);
  } else {
    return template.text;
  }
};

export const getMessages = async (
  db: Database,
  params: IMessageParams
): Promise<IMessageResult> => {
  const limit = params.limit ? Number(params.limit) : undefined;
  const offset = params.offset ? Number(params.offset) : undefined;
  const baseQuery = db
    .selectFrom('message')
    .selectAll()
    .where('username', 'like', `${params.username ?? ''}%`)
    .where('sprintCode', 'like', `${params.sprintCode ?? ''}%`)
    .orderBy('createdAt', 'desc');

  const paginatedQuery =
    limit !== undefined && offset !== undefined
      ? baseQuery.limit(limit).offset(offset)
      : baseQuery;

  const [totalResult, items] = await Promise.all([
    db
      .selectFrom('message')
      .select((eb) => eb.fn.countAll().as('count'))
      .where('username', 'like', `${params.username ?? ''}%`)
      .where('sprintCode', 'like', `${params.sprintCode ?? ''}%`)
      .executeTakeFirst(),
    paginatedQuery.execute(),
  ]);

  return {
    total: Number(totalResult?.count || 0),
    items,
  };
};

export const isSprintCodeExist = async (
  db: Database,
  sprintCode: string
): Promise<string | false> => {
  const result = await db
    .selectFrom('sprint')
    .select('title')
    .where('code', '=', sprintCode)
    .limit(1)
    .execute();
  return result.length > 0 ? result[0].title : false;
};

export const deleteMessageByID = async (
  db: Database,
  id: number
): Promise<boolean> => {
  const result = await db
    .deleteFrom('message')
    .where('id', '=', id)
    .executeTakeFirstOrThrow();
  return result.numDeletedRows > 0;
};
