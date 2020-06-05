import { Component, OnInit, ViewChild } from '@angular/core';
import { NbChatFormComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @ViewChild('chatForm') chatForm: NbChatFormComponent
  constructor() { }

  ngOnInit(): void {

  }

}
