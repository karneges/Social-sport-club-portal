import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationModel } from '../notification.model';
import { Actions, ofType } from '@ngrx/effects';
import { MessageActions } from '../../messages/messages.actions';
import { switchMap, tap } from 'rxjs/operators';
import { BaseMessageEntity } from '../../messages/models/message.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class MessagesNotificationService {
  notificationSubject = new Subject<{ type: NotificationModel, currentUserId: string }>()

  constructor(private actions$: Actions, private toastr: ToastrService) {
  }

  private onMessageNotificationClick(userId: string) {
    this.notificationSubject.next({ type: NotificationModel.NEW_MESSAGE, currentUserId: userId })
  }

  getNotificationSubscription() {
    return this.notificationSubject.asObservable()
  }

  messageNotificationSubscription() {
    this.actions$.pipe(
      ofType(MessageActions.receivedNewMessage),
      switchMap(({ messagesEntity }) => {
          const { message: { text }, sender } = BaseMessageEntity.convertOneMessageEntityToObject(messagesEntity)
          return this.toastr.info(text, `from ${ sender.name }`, { timeOut: 3000 }).onTap.pipe(
            tap(() => this.onMessageNotificationClick(sender._id))
          )
        }
      )
    ).subscribe()
  }
}
