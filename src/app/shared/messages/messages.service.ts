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

  getMessages(chatCompanionId: string): Observable<{ messages: MessageCameFromServerAndAdapt[], chatCompanionId: string }> {
    return this.http.get<{ status: string, count: number, messages: MessageCameFromServer[] }>(`${ this.baseUrl }/${ chatCompanionId }`)
      .pipe(
        map((res) => {
          const messages = res.messages.map(({ message, sender }) => ({
            text: message.text,
            time: message.time,
            sender
          }))
          return { messages, chatCompanionId }
        })
      )
  }

  wsMessagesSubscription(): Observable<{ message: MessageCameFromServerAndAdapt, chatCompanionId: string }> {
    return this.socketIoService.fromEvent<MessageCameFromServer>('newMessage').pipe(
      map(({ message, sender }) => {
        return {
          message: {
            text: message.text,
            time: message.time,
            sender
          },
          chatCompanionId: sender
        }
      })
    )
  }

  wsSendNewMessage(message: NewMessageClientCreated) {
    return this.socketIoService.emit('newMessage', message)
  }
}
