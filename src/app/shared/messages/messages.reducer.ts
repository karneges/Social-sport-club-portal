import { createReducer, on } from '@ngrx/store';
import { Message } from './models/message.model';
import { MessageActions } from './messages.actions';


export const messagesFeatureKey = 'messages';

export interface MessageState {
  messages: Message[],
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
  on(MessageActions.loadMessage, ((state, action) => {
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

