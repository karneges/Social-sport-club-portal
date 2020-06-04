import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'ngx-list-of-posts',
  templateUrl: './list-of-posts.component.html',
  styleUrls: ['./list-of-posts.component.scss']
})
export class ListOfPostsComponent implements OnInit {
  @Input() posts$: Observable<Post[]>
  constructor() { }

  ngOnInit(): void {
  }

}
