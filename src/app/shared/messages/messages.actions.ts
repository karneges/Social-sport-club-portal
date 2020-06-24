import { createAction, props } from '@ngrx/store';
import { Message } from './models/message.model';


const fetchedMessages = createAction(
  '[Dashboard] message fetched',
  props<{ messages: Message[] }>()
)
const loadMessage = createAction(
  '[Dashboard] message fetching'
)
const receivedNewMessage = createAction(
  '[Dashboard] received a new message',
  props<{ message: Message }>()
)
const sendNewMessage = createAction(
  '[Dashboard] send a new message',
  props<{ message: Message }>()
)
const openWsMessageSubscription = createAction(
  '[Dashboard] Open Ws Message Subscription'
)

export const MessageActions = {
  fetchedMessages,
  loadMessage,
  receivedNewMessage,
  sendNewMessage,
  openWsMessageSubscription
}
