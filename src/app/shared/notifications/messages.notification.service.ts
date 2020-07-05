import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationModel } from './notification.model';

@Injectable({ providedIn: 'root' })
export class MessagesNotificationService {
  notificationSubject = new Subject<{ type: NotificationModel, currentUserId: string }>()

  constructor() {
  }

  onMessageNotificationClick(userId: string) {
    this.notificationSubject.next({ type: NotificationModel.NEW_MESSAGE, currentUserId: userId })
  }

  getNotificationSubscription() {
    return this.notificationSubject.asObservable()
  }
}
