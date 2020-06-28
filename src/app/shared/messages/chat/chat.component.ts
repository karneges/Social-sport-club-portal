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
import { select, Store } from '@ngrx/store';
import { MessageState } from '../messages.reducer';
import { MessageCameFromServerAndAdapt } from '../models/message.model';
import { Messageslectors } from '../messages.selectors';
import { first, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageActions } from '../messages.actions';
import { prepareMessage } from '../utils/prepareMessage';
import { AuthSelectors } from '../../../pages/auth/auth.selectors';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @Input('user') userChatCompanion: User
  @Input() reverseHeader: boolean
  @ViewChild('chatRef') chat
  @Output() onCloseChat = new EventEmitter()

  @HostBinding('style.top')
  get top() {
    return this.reverseHeader ? `-399px` : 0
  }

  user$: Observable<User>

  messages$: Observable<MessageCameFromServerAndAdapt[]>

  constructor(private hostElement: ElementRef, private store: Store<MessageState>) {
  }

  ngOnInit(): void {
    this.messages$ = this.store.pipe(
      select(Messageslectors.messages),
      map((messages) => messages[this.userChatCompanion._id]))

    this.user$ = this.store.pipe(
      select(AuthSelectors.user)
    )
    this.store.dispatch(MessageActions.loadMessagesFromUser({ userId: this.userChatCompanion._id }))
  }


  // sendMessage(event: { message: string, files: any[] }, replay: boolean) {
  //   const files = !event.files ? [] : event.files.map((file) => {
  //     return {
  //       url: file.src,
  //       type: file.type,
  //       icon: 'file-text-outline',
  //     };
  //   });
  //   this.store.dispatch(MessageActions.sendNewMessage())
  // }

  sendMessage(event: { message: string, files: any[] }, replay: boolean) {
    this.user$.pipe(
      map((user) =>
        prepareMessage(event.message, user._id, this.userChatCompanion._id)),
      tap(message => this.store.dispatch(MessageActions.sendNewMessage({
        message,
        chatCompanionId: this.userChatCompanion._id
      }))),
      first()).subscribe()

  }


  ngAfterViewInit(): void {
    if (this.reverseHeader) {
      const header = this.hostElement.nativeElement.querySelector('.header')
      const chat = this.hostElement.nativeElement.querySelector('nb-chat')
      chat.append(header)
    }

  }

}
