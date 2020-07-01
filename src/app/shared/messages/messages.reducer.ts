import { createReducer, on } from '@ngrx/store';
import { MessageActions } from './messages.actions';
import { BaseMessageEntity } from './models/message.model';
import { messagesReducerAdapter } from './utils/messages.reducer-adapter';


export const messagesFeatureKey = 'messages';

export interface MessageState {
  messages: BaseMessageEntity
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
  on(MessageActions.fetchedMessagesWithOneUser, (state, action) => {
    return {
      ...state,
      messages: messagesReducerAdapter(state, action),
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
        messages: messagesReducerAdapter(state, action)
      }
    })
  ),
  on(MessageActions.sendNewMessage, ((state, action) => {
    return {
      ...state,
      messages: messagesReducerAdapter(state, action)
    }
  })),
  on(MessageActions.openWsMessageSubscription, ((state, action) => {
    return {
      ...state,
      wsSubscription: true
    }
  }))
)

