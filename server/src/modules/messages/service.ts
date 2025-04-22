import { getGif } from '@/services/giphy';
import {
  getMessageTemplate,
  insertMessage,
  isSprintCodeExist,
} from '@/modules/messages/repository';
import { Database } from '@/database';
import { isUsernameExist, sendDiscordMessage } from '@/services/discord';
import createError from '@/utils/createError';
import { IMessageBody } from '@/modules/messages/types';

export const sendCongratulatoryMessage = async (
  db: Database,
  body: IMessageBody
) => {
  const isUsernameValid = await isUsernameExist(body.username);
  if (!isUsernameValid)
    throw createError('Discord username does not exist', 400);
  const sprintTitle = await isSprintCodeExist(db, body.sprintCode);
  if (!sprintTitle) throw createError('Sprint does not exist', 400);
  const giphy = await getGif();
  if (!giphy) throw createError('Could not retrieve GIF', 400);
  const template = await getMessageTemplate(
    db,
    body.templateId ? Number(body.templateId) : 1
  );
  const message = `${body.username} ${template.replace('{sprintName}', sprintTitle)}`;
  await sendDiscordMessage(message, body.channelId, giphy);
  await insertMessage(
    db,
    body.username,
    body.sprintCode,
    body.templateId ? Number(body.templateId) : 1,
    message,
    giphy,
    body.channelId
  );
};
