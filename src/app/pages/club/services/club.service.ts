import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Club } from '../models/club.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) { }

  getClub () {
    return this.http.get<{ status: string, club: Club }>(`${environment.API_BASE_URL}/clubs/5ed53ce833e49cd344961800`);
  }
  getClubPosts () {
    return this.http.get<{ status: string, posts: Post[] }>(`${environment.API_BASE_URL}/clubs/5ed53ce833e49cd344961800`);
  }
}
