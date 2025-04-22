import { Database } from '@/database';
import createError from '@/utils/createError';
import { IMessageParams, IMessage } from '@/modules/messages/types';

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
): Promise<IMessage[]> => {
  let query = db
    .selectFrom('message')
    .select([
      'id',
      'username',
      'sprintCode',
      'templateId',
      'message',
      'giphy',
      'channelId',
      'createdAt',
    ])
    .orderBy('createdAt', 'desc');
  if (params.username) {
    query = query.where('username', 'like', `${params.username}%`);
  }
  if (params.sprintCode) {
    query = query.where('sprintCode', 'like', `${params.sprintCode}%`);
  }
  return await query.execute();
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
