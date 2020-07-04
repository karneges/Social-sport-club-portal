import { createAction, props } from '@ngrx/store';
import {
  BaseMessageEntity,
  MessageCameFromServerAndAdapt,
  NewMessageClientCreated
} from './models/message.model';


const fetchedMessagesWithOneUser = createAction(
  '[Dashboard] message fetched',
  props<{ messagesEntity: BaseMessageEntity }>()
)
const loadMessagesFromUser = createAction(
  '[Dashboard] message fetching',
  props<{ userId: string }>()
)
const loadNoReadMessages = createAction(
  '[List Of User Component] Unread Message fetching'
)
const noReadMessagesFetched = createAction(
  '[List Of User Component] Unread Message fetched',
  props<{ messagesEntity: BaseMessageEntity }>()
)
const receivedNewMessage = createAction(
  '[Dashboard] received a new message',
  props<{ messagesEntity: BaseMessageEntity }>()
)
const sendNewMessage = createAction(
  '[Dashboard] send a new message',
  props<{ messagesEntity: BaseMessageEntity }>()
)
const messageWasReade = createAction(
  '[Chat Component] message was reade',
  props<{ message: NewMessageClientCreated, chatCompanionId: string }>()
)
const openWsMessageSubscription = createAction(
  '[Dashboard] Open Ws Message Subscription'
)

export const MessageActions = {
  fetchedMessagesWithOneUser,
  loadNoReadMessages,
  noReadMessagesFetched,
  messageWasReade,
  loadMessagesFromUser,
  receivedNewMessage,
  sendNewMessage,
  openWsMessageSubscription
}
