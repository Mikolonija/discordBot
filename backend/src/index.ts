import 'dotenv/config';
import createApp from '@/app';
import { initializeDiscordService } from '@/services/discord';
import { BACK_END_URL, PORT } from '@/config';
import createError from '@/utils/createError';
import { connectToDatabase } from './database';

if (!process.env.DATABASE_URL) {
  throw createError('Provide DATABASE_URL in your environment variables.');
}
const database = connectToDatabase(process.env.DATABASE_URL);
initializeDiscordService();
export const app = createApp(database);
app.listen(PORT, () => {
  console.log(BACK_END_URL);
});
