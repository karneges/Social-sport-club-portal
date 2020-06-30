import { MessageState } from '../messages.reducer';
import { MessageCameFromServerAndAdapt, NewMessageClientCreated } from '../models/message.model';

interface MessageFromServer {
  message: MessageCameFromServerAndAdapt[],
  chatCompanionId: string
}

interface MessageFromClient {
  message: NewMessageClientCreated,
  chatCompanionId: string
}

interface MessagesReducerAdapterOutput {
  [key: string]: MessageCameFromServerAndAdapt[]
}

export const messagesReducerAdapter = (state: MessageState,
                                       action: MessageFromServer | MessageFromClient): MessagesReducerAdapterOutput => {
  let newMessage: MessageCameFromServerAndAdapt[]
  if (action.message instanceof NewMessageClientCreated) {
    const { message: { text }, sender } = action.message
    newMessage = [{ text, sender }]
  } else {
    newMessage = action.message
  }
  if (state.messages[action.chatCompanionId]) {
    return {
      ...state.messages,
      [action.chatCompanionId]: [...state.messages[action.chatCompanionId], ...newMessage]
    }
  }
  return {
    ...state.messages,
    [action.chatCompanionId]: newMessage
  }
}
