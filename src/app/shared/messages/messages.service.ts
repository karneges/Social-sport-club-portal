import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SocketIoBaseService } from '../socket-io-base.service';
import {
  BaseMessageEntity,
  MessageResponse,
  BaseMessageModel,
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
    return this.http.get<MessageResponse>(`${ this.baseUrl }/${ chatCompanionId }`)
      .pipe(map(({ messages }) => messages))
  }

  getNotReadMessages(): Observable<BaseMessageEntity> {
    return this.http.get<MessageResponse>(`${ this.baseUrl }/noread`)
      .pipe(map(({ messages }) => messages))
  }
  markMessagesAsRead(chatCompanionId: string): Observable<{success: string}> {
    return this.http.get<{success: string}>(`${ this.baseUrl }/markasread/${chatCompanionId}`)
  }

  wsMessagesSubscription(): Observable<BaseMessageEntity> {
    return this.socketIoService.fromEvent<BaseMessageEntity>('newMessage')
  }

  wsSendNewMessage(message: BaseMessageEntity) {
    return this.socketIoService.emit('newMessage', BaseMessageModel.getRequestModel(message))
  }

  wsMessagesWasReade(message: any) {
    return this.socketIoService.emit('messageReade', message._id)
  }
}
