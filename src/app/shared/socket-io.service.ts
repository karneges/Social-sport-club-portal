import { Injectable } from '@angular/core';
import { SocketIoBaseService } from './socket-io-base.service';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socketIoBaseService: SocketIoBaseService) {
  }
  // If thi
  socketAuth(authToken): Observable<boolean> {
    const connect$ = this.socketConnect()
    const authStream$: Observable<boolean> = new Observable(observer => {
      this.socketIoBaseService.emit('auth', authToken, (answer: boolean) => {
        observer.next(answer)
        // observer.complete()
      })
    })
    return connect$.pipe(
      switchMap(() => authStream$)
    )

  }

  socketConnect(): Observable<SocketIOClient.Socket> {
    return new Observable(observer => {
      const socket = this.socketIoBaseService.connect()
      if (socket.id) {
       return  observer.next(socket)
      }
      socket.on('connect', () => {
        observer.next(socket)
        // observer.complete()
      })
    })
  }

  socketDisconnect() {
    this.socketIoBaseService.disconnect(true)
  }

  getMessage() {
    return this.socketIoBaseService.fromEvent('message')
  }

  sendPrivateMessageTo(fromUserId: string, message: string) {
    this.socketIoBaseService.emit('privateMessage', { fromUserId, message })
  }
}
