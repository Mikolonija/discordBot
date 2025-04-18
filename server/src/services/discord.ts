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
  giphy?: string
) => {
  try {
    if (!client.isReady()) {
      throw createError('Discord client is not ready', 400);
    }
    const channel = await client.channels.fetch(channelId);
    if (!channel) throw createError('Channel not found', 400);

    if (channel instanceof TextChannel) {
      const embed = giphy ? new EmbedBuilder().setImage(giphy) : undefined;
      await channel.send({
        content: message,
        embeds: embed ? [embed] : [],
      });
    } else {
      throw createError('The channel is not a valid', 400);
    }
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw createError(error?.message as string, 400);
    }
  }
};

export const isUsernameExist = async (username: string): Promise<boolean> => {
  if (!process.env.DISCORD_SERVER_ID) {
    throw createError(
      'DISCORD_SERVER_ID is missing from environment variables',
      400
    );
  }
  try {
    const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID);
    if (!guild) {
      return false;
    }
    const members = await guild.members.fetch();
    const matchingMembers = members.filter(
      (member) => member.user.username.toLowerCase() === username.toLowerCase()
    );
    if (matchingMembers.size === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
