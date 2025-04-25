export interface IMessage {
  id: number;
  userID: string;
  sprintCode: string;
  templateId: string;
  message: string;
  gif: string;
  channelId: string;
  createdAt: string;
}

export interface IMessageBody {
  userID?: string;
  sprintCode: string;
  channelId: string;
  templateId: string;
}

export interface IMessageSendValues {
  channelId: string;
  sprintCode: string;
  templateId: string;
}

export const messageSendDefaultValues: IMessageSendValues = {
  channelId: '',
  sprintCode: '',
  templateId: '',
};
export interface IMessageResult {
  total: number;
  items: IMessage[];
}
