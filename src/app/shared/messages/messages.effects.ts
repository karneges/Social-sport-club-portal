import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageActions } from './messages.actions';
import { first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { select, Store } from '@ngrx/store';
import { MessageCameFromServer } from './models/message.model';
import { of } from 'rxjs';
import { AuthSelectors } from '../../pages/auth/auth.selectors';


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
  // fetchingNotReadMessages$ = createEffect(() => this.actions$.pipe(
  //   ofType(MessageActions.loadNoReadMessages),
  //   switchMap(() => this.messagesService.getNotReadMessages()),
  //   switchMap((messageWithCompanionId) => this.getAdaptedMessages$(messageWithCompanionId)),
  //   map((r) => MessageActions.fetchedMessages(r))
  // ))

  openWsMessagesSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.openWsMessageSubscription),
    switchMap(() => this.messagesService.wsMessagesSubscription()),
    map((messagesEntity) => MessageActions.receivedNewMessage({ messagesEntity }))
  ))

  sendNewMessage$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.sendNewMessage),
    map(({ messagesEntity }) => this.messagesService.wsSendNewMessage(messagesEntity))
  ), { dispatch: false })

  getAdaptedMessagesWithManyCompanions$(messageWithCompanionId: { messages: MessageCameFromServer[], chatCompanionId: string[] }) {
    return of(messageWithCompanionId).pipe(
      withLatestFrom(this.store.pipe(select(AuthSelectors.user), first())),
      map(([{ messages, chatCompanionId }, authUser]) => {
        messages.map(message => ({ ...message, }))
      })
    )
  }

  constructor(private actions$: Actions, private messagesService: MessagesService, private store: Store) {
  }

}
