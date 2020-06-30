import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SocketIoBaseService } from '../socket-io-base.service';
import { MessageCameFromServer, MessageCameFromServerAndAdapt, NewMessageClientCreated } from './models/message.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl = environment.API_BASE_URL + '/messages'

  constructor(private http: HttpClient, private socketIoService: SocketIoBaseService) {
  }

  getMessages(chatCompanionId: string): Observable<{ messages: MessageCameFromServer[], chatCompanionId: string }> {
    return this.http.get<{ status: string, count: number, messages: MessageCameFromServer[] }>(`${ this.baseUrl }/${ chatCompanionId }`)
      .pipe(map(({ messages }) => ({ messages, chatCompanionId })))
  }

  wsMessagesSubscription(): Observable<{ messages: MessageCameFromServer[], chatCompanionId: string }> {
    return this.socketIoService.fromEvent<MessageCameFromServer>('newMessage').pipe(
      map((res) => ({ messages: [res], chatCompanionId: res.sender })
      )
    )
  }

  wsSendNewMessage(message: NewMessageClientCreated) {
    const messageWithoutFullSender = { ...message, sender: message.sender._id }
    return this.socketIoService.emit('newMessage', messageWithoutFullSender)
  }
  wsMessageWasReade(message: MessageCameFromServerAndAdapt) {
    return this.socketIoService.emit('messageReade', message._id)
  }
}
