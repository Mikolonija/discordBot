export interface IMessageBody {
  username: string;
  sprintCode: string;
  channelId: string;
  templateId: string;
}

export interface IMessageParams {
  username: string | undefined;
  sprintCode: string | undefined;
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
