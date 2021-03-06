import { createReducer, on } from '@ngrx/store';
import { MessageActions } from './messages.actions';
import { BaseMessageEntity } from './models/message.model';
import { messagesReducerAdapter } from './utils/messages.reducer-adapter';


export const messagesFeatureKey = 'allMessages';

export interface MessageState {
  messages: BaseMessageEntity
  loadingMessage: boolean,
  wsSubscription: boolean
}

export const initialState: MessageState = {
  // @ts-ignore
  messages: {},
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
  on(MessageActions.noReadMessagesFetched, (state, action) => {
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
      messages: messagesReducerAdapter(state, action, true)
    }
  })),
  on(MessageActions.openWsMessageSubscription, ((state, action) => {
    return {
      ...state,
      wsSubscription: true
    }
  })),
  on(MessageActions.messagesWasReade, (state, action) => {
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.chatCompanionId]: { ...state.messages[action.chatCompanionId], countNoReadMessages: 0 }
      }
    }
  }),
  on(MessageActions.clearMessagesState, (state) => {
    return initialState
  })
)

