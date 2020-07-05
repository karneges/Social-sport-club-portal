import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from './messages.reducer';


const selectMessageState = createFeatureSelector<MessageState>('allMessages')

const messages = createSelector(
  selectMessageState,
  (messageState) => messageState.messages
)

const isMessageLoading = createSelector(
  selectMessageState,
  (messageState) => messageState.loadingMessage
)


export const Messageslectors = {
  messages,
  isMessageLoading
}
