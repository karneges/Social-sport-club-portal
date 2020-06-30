import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageActions } from './messages.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { select, Store } from '@ngrx/store';
import { UsersSelectors } from '../users/users.selectors';
import { AdaptedMessage, MessageCameFromServer } from './models/message.model';
import { of } from 'rxjs';


@Injectable()
export class MessagesEffects {
  fetchingMessages$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.loadMessagesFromUser),
    switchMap(({ userId }) => this.messagesService.getMessages(userId)),
    switchMap((messageWithCompanionId) => this.getUsersAndDispatch$(messageWithCompanionId)),
    map((r) => MessageActions.fetchedMessages(r))
  ))

  openWsMessagesSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.openWsMessageSubscription),
    switchMap(() => this.messagesService.wsMessagesSubscription()),
    switchMap((messageWithCompanionId) => this.getUsersAndDispatch$(messageWithCompanionId)),
    map(({ messages, chatCompanionId }) => MessageActions
      .receivedNewMessage({ message: messages, chatCompanionId }))
  ))

  sendNewMessage$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.sendNewMessage),
    map(({ message }) => this.messagesService.wsSendNewMessage(message))
  ), { dispatch: false })

  // Utils Method get message and return message with populated users
  getUsersAndDispatch$(messageWithCompanionId: { messages: MessageCameFromServer[], chatCompanionId: string }) {
    return of(messageWithCompanionId).pipe(
      withLatestFrom(this.store.pipe(select(UsersSelectors.users))),
      map(([{ messages, chatCompanionId }, users]) => {
        return ({ messages: AdaptedMessage.adaptedMessageFactory(messages, users), chatCompanionId })
      })
    )
  }
  constructor(private actions$: Actions, private messagesService: MessagesService, private store: Store) {
  }

}
