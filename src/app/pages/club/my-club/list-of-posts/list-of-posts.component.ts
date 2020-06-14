import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { Post } from '../../models/post.model';
import { ClubActions } from '../../club.actions';
import { PostEntityService } from '../../services/post-entity.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  distinctUntilChanged,
  filter,
  first,
  skip,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Params } from '@angular/router';

@Component({
  selector: 'ngx-list-of-posts',
  templateUrl: 'list-of-posts.component.html',
  styleUrls: ['list-of-posts.component.scss'],
})
export class ListOfPostsComponent implements OnInit, AfterViewInit {

  @Input() posts$: Observable<Post[]>
  scrollSubject = new Subject<boolean>()
  event: any;
  page = 0
  limit = 15
  placeholders = []

  constructor(private postEntityService: PostEntityService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.getPosts()
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
