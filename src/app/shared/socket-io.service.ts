import { Injectable } from '@angular/core';
import { SocketIoBaseService } from './socket-io-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socketIoBaseService: SocketIoBaseService) {
  }

  socketAuth(authToken) {
    return new Observable(observer => {
      this.socketIoBaseService.emit('auth', authToken, (answer) => {
        console.log(answer)
      })
    })

  }

  socketConnect() {
    return this.socketIoBaseService.connect()
  }

  getMessage() {
    return this.socketIoBaseService.fromEvent('message')
  }

  sendPrivateMessageTo(fromUserId: string, message: string) {
    this.socketIoBaseService.emit('privateMessage', { fromUserId, message })
  }
}
