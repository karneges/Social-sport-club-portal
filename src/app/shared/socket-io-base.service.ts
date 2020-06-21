import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import * as io from 'socket.io-client';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketIoBaseService {
  subscribersCounter: Record<string, number> = {};
  eventObservables$: Record<string, Observable<any>> = {};
  ioSocket: SocketIOClient.Socket;
  url = environment.API_BASE_URL_SOCKET;

  constructor() {
    // this.ioSocket = io(url, { autoConnect: false, query })
  }

  of(namespace: string) {
    this.ioSocket.off(namespace);
  }

  on(eventName: string, callback: Function) {
    this.ioSocket.on(eventName, callback);
  }

  once(eventName: string, callback: Function) {
    this.ioSocket.once(eventName, callback);
  }

  connect(token): Observable<SocketIOClient.Socket> {
    this.ioSocket = io(this.url, {
      autoConnect: false,
      query: {
        token
      }
    })
    return new Observable(observer => {
      const socket = this.ioSocket.connect()
      this.ioSocket.on('connect', () => {
        observer.next(socket)
      })
      return observer.unsubscribe
    })

  }

  disconnect(close?: any) {
    return this.ioSocket.disconnect.apply(this.ioSocket, arguments);
  }

  emit(eventName: string, data?: any, callback?: Function) {
    return this.ioSocket.emit.apply(this.ioSocket, arguments);
  }

  removeListener(eventName: string, callback?: Function) {
    return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
  }

  removeAllListeners(eventName?: string) {
    return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
  }

  fromEvent<T>(eventName: string): Observable<T> {
    if (!this.subscribersCounter[eventName]) {
      this.subscribersCounter[eventName] = 0;
    }
    this.subscribersCounter[eventName]++;

    if (!this.eventObservables$[eventName]) {
      this.eventObservables$[eventName] = new Observable((observer: any) => {
        const listener = (data: T) => {
          observer.next(data);
        };
        this.ioSocket.on(eventName, listener);
        return () => {
          this.subscribersCounter[eventName]--;
          if (this.subscribersCounter[eventName] === 0) {
            this.ioSocket.removeListener(eventName, listener);
            this.eventObservables$[eventName] = undefined;
          }
        };
      });
    }
    return this.eventObservables$[eventName].pipe(share())
  }

  fromOneTimeEvent<T>(eventName: string): Promise<T> {
    return new Promise<T>(resolve => this.once(eventName, resolve));
  }
}
