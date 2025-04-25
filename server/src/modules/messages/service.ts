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
  const isUsernameValid = await isUsernameExist(body.userID);
  if (!isUsernameValid)
    throw createError('Discord username does not exist', 400);
  const sprintTitle = await isSprintCodeExist(db, body.sprintCode);
  if (!sprintTitle) throw createError('Sprint does not exist', 400);
  const gif = await getGif();
  if (!gif) throw createError('Could not retrieve GIF', 400);

  const template = await getMessageTemplate(db, Number(body.templateId));
  const message = `<@${body.userID}> ${template.replace('{sprintName}', sprintTitle)}`;

  await sendDiscordMessage(message, body.channelId, gif);

  await insertMessage(
    db,
    body.userID,
    body.sprintCode,
    Number(body.templateId),
    message,
    gif,
    body.channelId
  );
};
