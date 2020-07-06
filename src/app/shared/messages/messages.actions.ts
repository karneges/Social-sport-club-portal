import { createAction, props } from '@ngrx/store';
import {
  BaseMessageEntity,
  BaseMessageModel
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
const messagesWasReade = createAction(
  '[Chat Component] message was reade',
  props<{ chatCompanionId: string }>()
)
const openWsMessageSubscription = createAction(
  '[Dashboard] Open Ws Message Subscription'
)

export const MessageActions = {
  fetchedMessagesWithOneUser,
  loadNoReadMessages,
  noReadMessagesFetched,
  messagesWasReade,
  loadMessagesFromUser,
  receivedNewMessage,
  sendNewMessage,
  openWsMessageSubscription
}
