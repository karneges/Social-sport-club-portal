import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SocketIoBaseService } from '../socket-io-base.service';
import {
  BaseMessageEntity,
  MessageCameFromServerAndAdapt, MessageResponseWithOneCompanion, MessageResponseWithSomeCompanion,
} from './models/message.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl = environment.API_BASE_URL + '/messages'

  constructor(private http: HttpClient, private socketIoService: SocketIoBaseService) {
  }

  getMessages(chatCompanionId: string): Observable<BaseMessageEntity> {
    return this.http.get<MessageResponseWithOneCompanion>(`${ this.baseUrl }/${ chatCompanionId }`)
      .pipe(map(({ messages }) => messages))
  }

  getNotReadMessages(): Observable<BaseMessageEntity> {
    return this.http.get<MessageResponseWithOneCompanion>(`${ this.baseUrl }/noread`)
      .pipe(map(({ messages }) => messages))
  }

  wsMessagesSubscription(): Observable<BaseMessageEntity> {
    return this.socketIoService.fromEvent<BaseMessageEntity>('newMessage')
  }

  wsSendNewMessage(message: BaseMessageEntity) {
    let request = {}
    Object.values(message).forEach(val => request = { ...val[0], sender: val[0].sender._id })
    return this.socketIoService.emit('newMessage', request)
  }

  wsMessagesWasReade(message: MessageCameFromServerAndAdapt) {
    return this.socketIoService.emit('messageReade', message._id)
  }
}
