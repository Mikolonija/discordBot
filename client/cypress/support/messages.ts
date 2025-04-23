const createMessage = (
  id: number,
  username: string,
  sprintCode: string,
  templateId: string,
  channelId: string,
  createdAt = '2025-04-14T12:00:00Z',
) => ({
  id,
  username,
  sprintCode,
  templateId,
  channelId,
  createdAt,
});

export const fakeMessagesEmpty = {
  success: true,
  message: '',
  data: { total: 0, items: [{}] },
};

export const fakeMessagesSearchResult = {
  success: true,
  message: '',
  data: {
    total: 1,
    items: [createMessage(2, 'tester2', 'test2', 'template-1232', 'channel-abc2')],
  },
};

export const fakeMessagesMultiple = {
  success: true,
  message: '',
  data: [
    createMessage(1, 'tester', 'test', 'template-123', 'channel-abc'),
    createMessage(2, 'tester2', 'test2', 'template-1232', 'channel-abc2'),
  ],
};
