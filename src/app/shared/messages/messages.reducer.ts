import { createReducer, on } from '@ngrx/store';
import { MessageActions } from './messages.actions';
import { MessageCameFromServerAndAdapt } from './models/message.model';


export const messagesFeatureKey = 'messages';

export interface MessageState {
  messages: {
    [key: string]: MessageCameFromServerAndAdapt[]
  }
  loadingMessage: boolean,
  wsSubscription: boolean
}

export const initialState: MessageState = {
  // @ts-ignore
  messages: [],
  loadingMessage: undefined,
  wsSubscription: undefined
};


export const reducer = createReducer(
  initialState,
  on(MessageActions.fetchedMessages, (state, action) => {
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.chatCompanionId]: action.messages
      },
      loadingMessage: false
    }
  }),
  on(MessageActions.loadMessagesFromUser, ((state, action) => {
    return {
      ...state,
      loadingMessage: true
    }
  })),
  on(MessageActions.receivedNewMessage, ((state, action) => {
    const newCurrentUserMessageState = state.messages[action.chatCompanionId]
      // @ts-ignore
      ? [...state.messages[action.chatCompanionId], action.message]
      : [action.message]
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.chatCompanionId]: newCurrentUserMessageState
        }
      }
    })
  ),
  on(MessageActions.sendNewMessage, ((state, action) => {
    const { message: { text }, sender } = action.message
    const newCurrentUserMessageState = state.messages[action.chatCompanionId]
      // @ts-ignore
      ? [...state.messages[action.chatCompanionId], { text, sender }]
      : [{ text, sender }]
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.chatCompanionId]: newCurrentUserMessageState
      }
    }
  })),
  on(MessageActions.openWsMessageSubscription, ((state, action) => {
    return {
      ...state,
      wsSubscription: true
    }
  }))
)

