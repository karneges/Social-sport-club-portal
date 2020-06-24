import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @Input() user: User
  @Input() reverseHeader: boolean
  @ViewChild('chatRef') chat
  @Output() onCloseChat = new EventEmitter()

  @HostBinding('style.top')
  get top() {
    return this.reverseHeader ? `-399px` : 0
  }

  constructor(private hostElement: ElementRef) {
  }

  ngOnInit(): void {
  }


  messages: any[] = [];

  sendMessage(event: any, userName: string, avatar: string, reply: boolean) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: reply,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: userName,
        avatar: avatar,
      },
    });
  }


  ngAfterViewInit(): void {
    if (this.reverseHeader) {
      const header = this.hostElement.nativeElement.querySelector('.header')
      const chat = this.hostElement.nativeElement.querySelector('nb-chat')
      chat.append(header)
    }

  }

}
