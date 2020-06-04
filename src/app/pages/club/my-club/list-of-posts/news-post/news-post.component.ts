import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';


@Component({
  selector: 'ngx-news-post',
  templateUrl: 'news-post.component.html',
})
export class NewsPostComponent {

  @Input() post: Post
}
