import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Post } from '../../../models/post.model';
import { PostEntityService } from '../../../services/post-entity.service';
import { User } from '../../../../../models/user.model';


@Component({
  selector: 'ngx-single-post',
  templateUrl: 'single-post.component.html',
  styleUrls: ['single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Input() post: Post
  @Input() currentUser: User
  @ViewChild('paragraphElement') postParagraph: ElementRef
  @ViewChild('articlePost') postArticle: ElementRef
  showMore = false
  isEditMode = false

  constructor(private postEntityService: PostEntityService) {
  }

  ngOnInit(): void {
  }

  onShowMore() {
    this.postArticle.nativeElement.scrollTo(0, 0)
    this.showMore = !this.showMore
  }

  onLike() {
    const updatedPost = { _id: this.post._id, likes: this.post.likes + 1 }
    this.postEntityService.update(updatedPost)
  }

  onEdit() {
    this.isEditMode = !this.isEditMode
  }

  onEditPost(value: Post) {
    const updatedPost = { ...this.post, ...value }
    this.postEntityService.update(updatedPost).subscribe()
  }

  onDeletePost() {
    this.postEntityService.delete(this.post)
  }



}
