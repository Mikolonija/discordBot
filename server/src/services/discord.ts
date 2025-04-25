import createError from '@/utils/createError';
import {
  Client,
  GatewayIntentBits,
  TextChannel,
  EmbedBuilder,
} from 'discord.js';
import 'dotenv/config';

let client: Client;

export const initializeDiscordService = () => {
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  });
  if (!process.env.DISCORD_BOT_TOKEN) {
    throw createError(
      'DISCORD_BOT_TOKEN is missing from environment variables',
      400
    );
  }
  client.login(process.env.DISCORD_BOT_TOKEN);
  client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
  });
};

export const sendDiscordMessage = async (
  message: string,
  channelId: string,
  gif: string
) => {
  if (!client.isReady()) {
    throw createError('Discord client is not ready', 400);
  }
  try {
    const channel = await client.channels.fetch(channelId);
    if (!(channel instanceof TextChannel)) {
      throw createError('Invalid channel type', 400);
    }
    const embeds = [new EmbedBuilder().setImage(gif)];
    await channel.send({ content: message, embeds });
  } catch (err: any) {
    throw createError(err?.message || 'Failed to send message', 400);
  }
};

export const isUsernameExist = async (userId: string): Promise<boolean> => {
  if (!process.env.DISCORD_SERVER_ID) {
    throw createError(
      'DISCORD_SERVER_ID is missing from environment variables',
      400
    );
  }
  try {
    const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID);
    const members = await guild.members.fetch();
    return members.has(userId);
  } catch {
    return false;
  }
};
