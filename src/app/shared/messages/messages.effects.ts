import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageActions } from './messages.actions';
import { map, switchMap } from 'rxjs/operators';
import { MessagesService } from './messages.service';


@Injectable()
export class MessagesEffects {
  fetchingMessages$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.loadMessagesFromUser),
    switchMap(({ userId }) => this.messagesService.getMessages(userId)),
    map(messages => MessageActions.fetchedMessages(messages))
  ))

  openWsMessagesSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.openWsMessageSubscription),
    switchMap(() => this.messagesService.wsMessagesSubscription()),
    map((message) => MessageActions.receivedNewMessage(message))
  ))

  sendNewMessage$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.sendNewMessage),
    map(({ message }) => this.messagesService.wsSendNewMessage(message))
  ), { dispatch: false })

  constructor(private actions$: Actions, private messagesService: MessagesService) {
  }

}
