import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageActions } from './messages.actions';
import { map, switchMap } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { Store } from '@ngrx/store';

@Injectable()
export class MessagesEffects {

  fetchingMessages$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.loadMessagesFromUser, MessageActions.loadNoReadMessages),
    switchMap((query) => {
      if ('userId' in query) {
        return this.messagesService.getMessages(query.userId)
      }
      return this.messagesService.getNotReadMessages()
    }),
    map((messagesEntity) => MessageActions.fetchedMessagesWithOneUser({ messagesEntity }))
  ))

  openWsMessagesSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.openWsMessageSubscription),
    switchMap(() => this.messagesService.wsMessagesSubscription()),
    map((messagesEntity) => MessageActions.receivedNewMessage({ messagesEntity }))
  ))

  sendNewMessage$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.sendNewMessage),
    map(({ messagesEntity }) => this.messagesService.wsSendNewMessage(messagesEntity))
  ), { dispatch: false })

  markMessagesAsRead = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.messagesWasReade),
    switchMap(({ chatCompanionId }) => this.messagesService.markMessagesAsRead(chatCompanionId)),
  ), { dispatch: false })

  constructor(private actions$: Actions, private messagesService: MessagesService, private store: Store) {
  }

}
