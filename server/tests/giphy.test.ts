import { getGif } from '@/services/giphy';

describe('Giphy Integration Test', () => {
  it('check does return gif URL', async () => {
    const gifUrl = await getGif();
    expect(typeof gifUrl).toBe('string');
  });

  it('should throw an error when API key is missing', async () => {
    const originalApiKey = process.env.GIPHY_API_KEY;
    delete process.env.GIPHY_API_KEY;
    await expect(getGif()).rejects.toThrow('GIPHY_API_KEY is missing');
    process.env.GIPHY_API_KEY = originalApiKey;
  });

  it('should return a URL that is accessible (status 200)', async () => {
    const gifUrl = await getGif();
    expect(typeof gifUrl).toBe('string');
    const res = await fetch(gifUrl as string);
    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
  });
});
