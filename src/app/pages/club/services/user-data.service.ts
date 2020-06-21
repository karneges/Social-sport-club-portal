import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Event } from '../../../models/event.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Params } from '@angular/router';
import { User } from '../../../models/user.model';


@Injectable()
export class UserDataService extends DefaultDataService<User> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Users', http, httpUrlGenerator);
  }

  getAll(): Observable<User[]> {
    return this.http.get<{ status: string, users: User[] }>(`${ environment.API_BASE_URL }/users`).pipe(
      map((res) => res.users)
    )
  }

  getWithQuery(params: Params): Observable<User[]> {
    return this.http.get<{ status: string, users: User[] }>
    (`${ environment.API_BASE_URL }/users`, { params })
      .pipe(
        map(res => res.users)
      )
  }
}
