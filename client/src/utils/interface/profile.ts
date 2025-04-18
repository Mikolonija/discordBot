export interface IProfile {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: string | null;
  global_name: string;
  avatar_decoration_data: any | null;
  collectibles: any | null;
  banner_color: string | null;
  clan: string | null;
  primary_guild: string | null;
}
