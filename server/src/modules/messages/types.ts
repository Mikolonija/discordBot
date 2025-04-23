export interface IMessageBody {
  username: string;
  sprintCode: string;
  channelId: string;
  templateId: string;
}

export interface IMessageParams {
  username?: string;
  sprintCode?: string;
  limit?: string;
  offset?: string;
}

export interface IMessagePath {
  id: string;
}

export interface IMessage {
  id: number;
  username: string;
  sprintCode: string;
  templateId: number;
  message: string;
  giphy: string;
  channelId: string;
  createdAt: string;
}
export interface IMessageResult {
  total: number;
  items: IMessage[];
}
