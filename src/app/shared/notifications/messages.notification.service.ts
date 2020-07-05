import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationModel } from './notification.model';

@Injectable({providedIn: 'root'})
export class MessagesNotificationService {
  notificationSubject = new Subject<NotificationModel>()
  constructor() {
  }
  onMessageNotificationClick() {

  }
}
