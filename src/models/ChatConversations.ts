export type ChatConversationItem = {
  id: string,
  name: string,
  lastMessage: {
    message: string,
    self: boolean,
    time: string,
  },
}
