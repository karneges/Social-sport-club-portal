import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Event } from '../../../models/event.model';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Params } from '@angular/router';


@Injectable()
export class EventDataService extends DefaultDataService<Event> {
  clubId = '5ed53ce833e49cd344961800'

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Event', http, httpUrlGenerator);
  }

  getAll(): Observable<Event[]> {
    return this.http.get<{ status: string, events: Event[] }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/events`).pipe(
      map((res) => res.events)
    )
  }

  add(post: Event): Observable<Event> {
    return this.http.post<{ message: string, events: Event }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/events`, post).pipe(
      tap(res => {
      }),
      map(res => res.events)
    )
  }

  update(update: Update<Event>): Observable<Event> {
    return this.http
      .put<{ message: string, events: Event }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/events/${ update.id }`, update.changes)
      .pipe(
        map(res => res.events)
      )
  }

  delete(key: number | string): Observable<number | string> {
    return this.http.delete<{ message: string }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/posts/${ key }`)
      .pipe(
        map(res => res.message)
      )
  }

  getWithQuery(params: Params): Observable<Event[]> {
    return this.http.get<{ status: string, events: Event[] }>
    (`${ environment.API_BASE_URL }/clubs/${ this.clubId }/events`, { params })
      .pipe(
        map(res => res.events)
      )
  }


}
