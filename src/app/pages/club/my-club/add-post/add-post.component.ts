import { Component, OnInit, ViewChild } from '@angular/core';
import { NbChatFormComponent } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostDataService } from '../../services/post-data.service';
import { PostEntityService } from '../../services/post-entity.service';

@Component({
  selector: 'ngx-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  editorIsHide = true

  constructor(private postEntityService: PostEntityService) {
  }

  onSubmitPost(formValue) {
    this.postEntityService.add(formValue).subscribe(res => {
      this.changeEditorMode()
    })
  }

  ngOnInit(): void {
  }

  changeEditorMode() {
    this.editorIsHide = !this.editorIsHide
  }

}
