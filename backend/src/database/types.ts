import type { Generated } from 'kysely';

export interface Sprint {
  id: Generated<number>;
  code: string;
  title: string;
}

export interface Template {
  id: Generated<number>;
  text: string;
}

export interface Message {
  id: Generated<number>;
  username: string;
  sprintCode: string;
  templateId: number;
  message: string;
  giphy: string;
  channelId: string;
  createdAt: Generated<string>;
}

export interface DB {
  sprint: Sprint;
  template: Template;
  message: Message;
}
