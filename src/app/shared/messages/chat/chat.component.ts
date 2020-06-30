import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  Input, OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { User } from '../../../models/user.model';
import { select, Store } from '@ngrx/store';
import { MessageState } from '../messages.reducer';
import { MessageCameFromServerAndAdapt, NewMessageClientCreated } from '../models/message.model';
import { Messageslectors } from '../messages.selectors';
import {
  distinct,
  filter,
  finalize,
  first,
  map,
  pluck,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { MessageActions } from '../messages.actions';
import { AuthSelectors } from '../../../pages/auth/auth.selectors';
import { log } from 'util';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  @Input('user') userChatCompanion: User
  @Input() reverseHeader: boolean
  @ViewChild('chatRef') chat
  @Output() onCloseChat = new EventEmitter()

  private chatHeader: HTMLElement
  private chatEl: HTMLElement
  private changeDetector = new BehaviorSubject<SimpleChanges>(null)
  user$: Observable<User>
  messages$: Observable<MessageCameFromServerAndAdapt[]>

  constructor(private hostElement: ElementRef, private store: Store<MessageState>, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.initialStoreSubscriptions()
    this.changeSubscription()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetector.next(changes)
  }

  ngAfterViewInit(): void {
    // get dom elements from <nb-chat></nb-chat>
    this.chatHeader = this.hostElement.nativeElement.querySelector('.header')
    this.chatEl = this.hostElement.nativeElement.querySelector('nb-chat')
  }

  ngAfterViewChecked(): void {
    this.setHeaderPosition()
  }

  initialStoreSubscriptions() {
    // Auth user store subscription
    this.user$ = this.store.pipe(select(AuthSelectors.user))
    // messages input 'userChatCompanion' change subscription
    this.messages$ = this.changeDetector.pipe(
      switchMap(() => this.store.pipe(
        select(Messageslectors.messages),
        withLatestFrom(this.user$),
        map(([messages]) => messages[this.userChatCompanion._id])),
      )
    )
  }

  changeSubscription() {
    this.changeDetector.pipe(
      filter((changes) => !!changes.userChatCompanion),
      map<SimpleChanges, User>((changes) => changes.userChatCompanion.currentValue),
      distinct(user => user._id),
      withLatestFrom(this.store.pipe(select(Messageslectors.messages))),
      filter(([user, messages]) => !messages[user._id]),
      map(() => this.store
        .dispatch(MessageActions.loadMessagesFromUser({ userId: this.userChatCompanion._id }))),
      takeUntil(this.onCloseChat)
    ).subscribe()
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
  setHeaderPosition() {
    return this.reverseHeader ? this.chatEl.append(this.chatHeader) : this.chatEl.prepend(this.chatHeader)
  }

  sendMessage(event: { message: string, files: any[] }, replay: boolean) {
    this.user$.pipe(
      map((user) =>
        new NewMessageClientCreated(event.message, user, this.userChatCompanion._id)),
      tap(message => this.store.dispatch(MessageActions.sendNewMessage({
        message,
        chatCompanionId: this.userChatCompanion._id
      }))),
      first()).subscribe()
  }

}
