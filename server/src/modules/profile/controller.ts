import { Response, NextFunction } from 'express';
import { DISCORD_USER_API_URL } from '@/config';
import 'dotenv/config';
import createError from '@/utils/createError';
import { IProfile } from '@/modules/profile/types';

export const getUserInfo = async (
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = process.env.DISCORD_USER_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!userId || !botToken) {
      throw createError('Missing Discord environment variables', 500);
    }

    const response = await fetch(`${DISCORD_USER_API_URL}/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw createError('Failed to get user info', 400);

    const userData: IProfile = await response.json();
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
