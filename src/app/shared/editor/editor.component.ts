import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../pages/club/models/post.model';
import { Blur, QuillEditorComponent } from 'ngx-quill';
import { $e } from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'ngx-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @Input() initialValue: Post
  @Input() clearForm
  @Output() submitForm = new EventEmitter()
  @Output() onBlur = new EventEmitter()
  @ViewChild('editor') editor: QuillEditorComponent
  postForm: FormGroup

  constructor(private fb: FormBuilder) {
  }


  ngOnInit(): void {
    if (this.initialValue) {
      this.createUpdatePostForm()
    } else {
      this.createNewPostForm()
    }
  }

  createNewPostForm() {
    this.postForm = this.fb.group({
      content: ['', [Validators.required]],
      author: ['5ed53f58700e1a97755dcee6']
    })
  }

  createUpdatePostForm() {
    this.postForm = this.fb.group({
      content: [this.initialValue.content, [Validators.required]],
      author: ['5ed53f58700e1a97755dcee6'],
    })
  }

  onSubmitPost() {
    if (this.postForm.invalid) {
      return
    }
    this.submitForm.emit(this.postForm.value)
    this.postForm.reset()
  }

  onBlurEmit($event: Blur) {
    this.onBlur.emit()
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.editor.quillEditor.root.focus(), 150)
  }
}
