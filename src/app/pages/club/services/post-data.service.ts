import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable()
export class PostDataService extends DefaultDataService<Post> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Posts', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<{ status: string, posts: Post[] }>(`${ environment.API_BASE_URL }/clubs/5ed53ce833e49cd344961800/posts`).pipe(
      map((res) => res.posts)
    )
  }

}
