import { Component, Input, OnInit } from '@angular/core';
import { PostEntityService } from '../../services/post-entity.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'ngx-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @Input() currentUser: User
  editorIsHide = true
  constructor(private postEntityService: PostEntityService) {
  }

  onSubmitPost(formValue) {
    const addPostValues = {...formValue, author: this.currentUser._id}
    this.postEntityService.add(addPostValues).subscribe(res => {
      this.changeEditorMode()
    })
  }

  ngOnInit(): void {
  }

  changeEditorMode() {
    this.editorIsHide = !this.editorIsHide
  }

}
