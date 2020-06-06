import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'ngx-list-of-posts',
  templateUrl: 'list-of-posts.component.html',
  styleUrls: ['list-of-posts.component.scss'],
})
export class ListOfPostsComponent implements OnInit {

  @Input() posts$: Observable<Post[]>
  @Output() loadNextPage = new EventEmitter()
  showMore = false

  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };

  constructor() {
  }

  loadNext(cardData) {
    this.loadNextPage.emit()
  }

  ngOnInit(): void {
  }

}
