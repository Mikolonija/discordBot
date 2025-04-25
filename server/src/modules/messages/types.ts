export interface IMessageBody {
  userID: string;
  sprintCode: string;
  channelId: string;
  templateId: string;
}

export interface IMessageParams {
  userID?: string;
  sprintCode?: string;
  limit?: string;
  offset?: string;
}

export interface IMessagePath {
  id: string;
}

export interface IMessage {
  id: number;
  userID: string;
  sprintCode: string;
  templateId: number;
  message: string;
  gif: string;
  channelId: string;
  createdAt: string;
}
export interface IMessageResult {
  total: number;
  items: IMessage[];
}
