import { FRONT_END_URL } from './src/config';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: FRONT_END_URL,
    supportFile: false,
  },
});
