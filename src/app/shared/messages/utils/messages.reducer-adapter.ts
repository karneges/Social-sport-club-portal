import { MessageState } from '../messages.reducer';
import { BaseMessageEntity } from '../models/message.model';

export const messagesReducerAdapter = (state: MessageState, action: { messagesEntity: BaseMessageEntity }) => {
  const intersectedKeys: string[] = Object.keys(action.messagesEntity).filter(key => key in state.messages)
  let messages = { ...state.messages }
  if (intersectedKeys.length > 0) {
    intersectedKeys.forEach(key => messages[key] = [...messages[key], ...action.messagesEntity[key]])
  } else {
    messages = { ...messages, ...action.messagesEntity }
  }
  return messages
}
