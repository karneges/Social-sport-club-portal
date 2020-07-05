import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SocketIoBaseService } from '../socket-io-base.service';
import {
  BaseMessageEntity,
  MessageCameFromServerAndAdapt,
  MessageResponseWithOneCompanion,
  MessageResponseWithSomeCompanion,
  NewMessageClientCreated,
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
    return this.socketIoService.emit('newMessage', NewMessageClientCreated.getRequestModel(message))
  }

  wsMessagesWasReade(message: MessageCameFromServerAndAdapt) {
    return this.socketIoService.emit('messageReade', message._id)
  }
}
