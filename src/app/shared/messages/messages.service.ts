import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SocketIoBaseService } from '../socket-io-base.service';
import { MessageCameFromServer, NewMessageClientCreated } from './models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl = environment.API_BASE_URL + '/messages'

  constructor(private http: HttpClient, private socketIoService: SocketIoBaseService) {
  }

  getMessages(userId: string) {
    const params = { userId }
    return this.http.get<{ status: string, count: number, messages: MessageCameFromServer[] }>(this.baseUrl, { params })
  }

  wsMessagesSubscription() {
    return this.socketIoService.fromEvent<MessageCameFromServer>('newMessage')
  }

  wsSendNewMessage(message: NewMessageClientCreated) {
    return this.socketIoService.emit('newMessage', message)
  }
}
