import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostEntityService } from '../../../services/post-entity.service';


@Component({
  selector: 'ngx-single-post',
  templateUrl: 'news-post.component.html',
  styleUrls: ['news-post.component.scss']
})
export class NewsPostComponent {
  @Input() post: Post
  @ViewChild('paragraphElement') postParagraph: ElementRef
  @ViewChild('articlePost') postArticle: ElementRef
  showMore = false
  isEditMode = false

  constructor(private postEntityService: PostEntityService) {
  }

  onShowMore() {
    this.postArticle.nativeElement.scrollTo(0, 0)
    this.showMore = !this.showMore
  }

  onLike() {
    const updatedPost = { _id: this.post._id, likes: this.post.likes + 1}
    this.postEntityService.update(updatedPost)
  }

  onEdit() {
    this.isEditMode = !this.isEditMode
  }

  onEditPost(value: Post) {
    const updatedPost = {...this.post, ...value}
    this.postEntityService.update(updatedPost).subscribe()
  }
  onDeletePost() {
    this.postEntityService.delete(this.post)
  }
}
