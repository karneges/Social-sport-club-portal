import { createReducer, on } from '@ngrx/store';
import { MessageActions } from './messages.actions';
import { MessageCameFromServer } from './models/message.model';


export const messagesFeatureKey = 'messages';

export interface MessageState {
  messages: MessageCameFromServer[],
  loadingMessage: boolean,
  wsSubscription: boolean
}

export const initialState: MessageState = {
  messages: undefined,
  loadingMessage: undefined,
  wsSubscription: undefined
};


export const reducer = createReducer(
  initialState,
  on(MessageActions.fetchedMessages, (state, action) => {
    return {
      ...state,
      message: action.messages,
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
      return {
        ...state,
        message: [...state.messages, action.message]
      }
    })
  ),
  on(MessageActions.sendNewMessage, ((state, action) => {
    return {
      ...state,
      message: [...state.messages, action.message]
    }
  })),
  on(MessageActions.openWsMessageSubscription, ((state, action) => {
    return {
      ...state,
      wsSubscription: true
    }
  }))
)

