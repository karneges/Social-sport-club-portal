import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SocketIoBaseService } from '../socket-io-base.service';
import { Message } from './models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseUrl = environment.API_BASE_URL + '/messages'

  constructor(private http: HttpClient, private socketIoService: SocketIoBaseService) {
  }

  getMessages(userId: string) {
    const params = { userId }
    return this.http.get<{ status: string, count: number, messages: Messag }>(this.baseUrl, { params })
  }
  wsMessagesSubscription() {
    return this.socketIoService.fromEvent<Message>('newMessage')
  }
}
