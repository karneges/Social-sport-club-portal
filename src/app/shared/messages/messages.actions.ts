import { createAction, props } from '@ngrx/store';
import { MessageCameFromServerAndAdapt, NewMessageClientCreated } from './models/message.model';


const fetchedMessages = createAction(
  '[Dashboard] message fetched',
  props<{ messages: MessageCameFromServerAndAdapt[], chatCompanionId: string }>()
)
const loadMessagesFromUser = createAction(
  '[Dashboard] message fetching',
  props<{ userId: string }>()
)
const receivedNewMessage = createAction(
  '[Dashboard] received a new message',
  props<{ message: MessageCameFromServerAndAdapt, chatCompanionId: string}>()
)
const sendNewMessage = createAction(
  '[Dashboard] send a new message',
  props<{ message: NewMessageClientCreated , chatCompanionId: string}>()
)
const openWsMessageSubscription = createAction(
  '[Dashboard] Open Ws Message Subscription'
)

export const MessageActions = {
  fetchedMessages,
  loadMessagesFromUser,
  receivedNewMessage,
  sendNewMessage,
  openWsMessageSubscription
}
