import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Params } from '@angular/router';


@Injectable()
export class PostDataService extends DefaultDataService<Post> {
  clubId = '5ed53ce833e49cd344961800'

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Posts', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<{ status: string, posts: Post[] }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/posts`).pipe(
      map((res) => res.posts)
    )
  }

  add(post: Post): Observable<Post> {
    return this.http.post<{ message: string, post: Post }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/posts`, post).pipe(
      tap(res => {
      }),
      map(res => res.post)
    )
  }

  update(update: Update<Post>): Observable<Post> {
    return this.http
      .put<{ message: string, post: Post }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/posts/${ update.id }`, update.changes)
      .pipe(
        map(res => res.post)
      )
  }

  delete(key: number | string): Observable<number | string> {
    return this.http.delete<{ message: string }>(`${ environment.API_BASE_URL }/clubs/${ this.clubId }/posts/${ key }`)
      .pipe(
        map(res => res.message)
      )
  }

  getWithQuery(params: Params): Observable<Post[]> {
    return this.http.get<{ status: string, posts: Post[] }>
    (`${ environment.API_BASE_URL }/clubs/${ this.clubId }/posts`, { params })
      .pipe(
        map(res => res.posts)
      )
  }


}
