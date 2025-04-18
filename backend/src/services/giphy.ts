import { GIPHY_API_URL } from '@/config';
import createError from '@/utils/createError';
import 'dotenv/config';

export const getGif = async (): Promise<void | string> => {
  if (!process.env.GIPHY_API_KEY) {
    throw createError(
      'GIPHY_API_KEY is missing from environment variables',
      400
    );
  }
  try {
    const response = await fetch(
      `${GIPHY_API_URL}?api_key=${process.env.GIPHY_API_KEY}&tag=celebration&rating=G`
    );
    if (!response.ok) {
      throw createError('Failed to fetch GIF', response.status);
    }
    const result = await response.json();
    if (result.data) {
      const gifUrl: string = result.data.images.original.url;
      return gifUrl;
    } else {
      throw createError('No GIF found in the response');
    }
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw createError(error?.message, 500);
    }
  }
};
