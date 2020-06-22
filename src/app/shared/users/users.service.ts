import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { SocketIoService } from '../socket-io.service';
import { SocketIoBaseService } from '../socket-io-base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = `${ environment.API_BASE_URL }/users`

  constructor(private http: HttpClient, private socketService: SocketIoBaseService) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ status: string, users: User[] }>(this.baseUrl).pipe(
      map((res) => res.users)
    )
  }

  getById(id: string): Observable<User> {
    return this.http.get<{ status: string, users: User }>(`${ this.baseUrl }/id`)
      .pipe(
        map(res => res.users)
      )
  }

  userStatusSubscription() {
    return this.socketService.fromEvent<User>('userChangeOnlineStatus')
  }
}
