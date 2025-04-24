import { describe, it, expect } from 'vitest';
import { initializeDiscordService } from '@/services/discord';

describe('Discord Service Tests', () => {
  it('should throw an error if DISCORD_BOT_TOKEN is missing', () => {
    const originalToken = process.env.DISCORD_BOT_TOKEN;
    delete process.env.DISCORD_BOT_TOKEN;

    expect(() => initializeDiscordService()).toThrow(
      'DISCORD_BOT_TOKEN is missing'
    );

    process.env.DISCORD_BOT_TOKEN = originalToken;
  });
});
