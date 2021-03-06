import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../../models/post.model';
import { ClubActions } from '../../club.actions';
import { PostEntityService } from '../../services/post-entity.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import {
  distinctUntilChanged,
  filter,
  first,
  skip,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Params } from '@angular/router';
import { AuthSelectors } from '../../../auth/auth.selectors';

@Component({
  selector: 'ngx-list-of-posts',
  templateUrl: 'list-of-posts.component.html',
  styleUrls: ['list-of-posts.component.scss'],
})
export class ListOfPostsComponent implements OnInit, AfterViewInit {

  @Input() posts$: Observable<Post[]>
  scrollSubject = new Subject<boolean>()
  currentUser$
  event: any;
  page = 0
  limit = 15
  placeholders = []

  constructor(private postEntityService: PostEntityService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.getPosts()
    this.currentUser$ = this.store.pipe(
      select(AuthSelectors.user)
    )
  }

  ngAfterViewInit(): void {
    this.infinityScrollSubscribe()
  }


  getPosts() {
    this.posts$ = this.postEntityService.entities$
    this.store.dispatch(ClubActions.loadClub())
  }

  getNextPageQuery(): Params {
    const page = ++this.page
    const limit = this.limit
    return {
      limit: limit.toString(),
      page: page.toString()
    }
  }

  infinityScrollSubscribe() {
    return this.scrollSubject.pipe(
      distinctUntilChanged(),
      filter(v => v),
      tap(() => this.placeholders = Array(this.limit)),
      switchMap(() => this.postEntityService.getWithQuery(this.getNextPageQuery())),
      tap(() => this.placeholders = []),
      tap(() => this.scrollSubject.next(false)),
      first(r => r.length < this.limit || !r),
    ).subscribe()
  }

  onDown(e) {
    this.scrollSubject.next(true)
  }
}
