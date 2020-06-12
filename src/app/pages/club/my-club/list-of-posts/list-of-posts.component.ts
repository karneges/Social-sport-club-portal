import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ClubActions } from '../../club.actions';
import { PostEntityService } from '../../services/post-entity.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';

@Component({
  selector: 'ngx-list-of-posts',
  templateUrl: 'list-of-posts.component.html',
  styleUrls: ['list-of-posts.component.scss'],
})
export class ListOfPostsComponent implements OnInit {

  @Input() posts$: Observable<Post[]>
  defaultQueryConfig = {
    page: 1,
    limit: 10
  }

  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };


  constructor(private postEntityService: PostEntityService, private store: Store<AppState>) {
  }

  // loadNext(cardData) {
  //   this.loadNextPage.emit()
  // }

  getPosts() {
    this.posts$ = this.postEntityService.entities$
    this.store.dispatch(ClubActions.loadClub())
    this.postEntityService.getAll()
  }


  loadNext(cardData) {
    console.log('load')
    // if (cardData.loading) {
    //   return
    // }

    // cardData.loading = true;
    // cardData.placeholders = new Array(this.pageSize);
    // this.newsService.load(cardData.pageToLoadNext, this.pageSize)
    //   .subscribe(nextNews => {
    //     cardData.placeholders = [];
    //     cardData.news.push(...nextNews);
    //     cardData.loading = false;
    //     cardData.pageToLoadNext++;
    //   });
  }

  ngOnInit(): void {
    this.getPosts()
  }

}
