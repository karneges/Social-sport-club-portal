import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input, OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { User } from '../../../models/user.model';
import { select, Store } from '@ngrx/store';
import { MessageState } from '../messages.reducer';
import { BaseMessageEntity, BaseMessageModel } from '../models/message.model';
import { MessagesSelectors } from '../messages.selectors';
import {
  delay,
  filter,
  first,
  map,
  switchMap,
  takeUntil,
  tap, withLatestFrom,
} from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageActions } from '../messages.actions';
import { AuthSelectors } from '../../../pages/auth/auth.selectors';

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
  messages$: Observable<BaseMessageModel[]>
  messagesEntities$: Observable<BaseMessageEntity>

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
    this.messagesEntities$ = this.store.pipe(select(MessagesSelectors.messages))
    // messages input 'userChatCompanion' change subscription
    this.messages$ = this.changeDetector.pipe(
      switchMap(() => this.messagesEntities$.pipe(
        filter(message => !!message),
        map((message) => {
          return message[this.userChatCompanion._id] ? message[this.userChatCompanion._id].messages : []
        }))
      )
    )
  }

  changeSubscription() {
    this.changeDetector.pipe(
      filter((changes) => !!changes.userChatCompanion),
      map<SimpleChanges, User>((changes) => changes.userChatCompanion.currentValue),
      withLatestFrom(this.messagesEntities$),
      switchMap((r) => this.readMarker(r)),
      filter(([currentUser, messages]) => !messages[currentUser._id]),
      map(() => this.store.dispatch(MessageActions.loadMessagesFromUser({ userId: this.userChatCompanion._id }))),
      takeUntil(this.onCloseChat),
    ).subscribe()
  }

  setHeaderPosition() {
    return this.reverseHeader ? this.chatEl.append(this.chatHeader) : this.chatEl.prepend(this.chatHeader)
  }

  sendMessage(event: { message: string, files: any[] }) {
    this.user$.pipe(
      map((user) =>
        BaseMessageModel.clientCreatedMessagesFactory(event.message, user, this.userChatCompanion._id)),
      tap(messagesEntity => this.store.dispatch(MessageActions.sendNewMessage({ messagesEntity }))),
      first()).subscribe()
  }

  readMarker<T extends [User, BaseMessageEntity]>(obs: T) {
    return of(obs).pipe(
      delay(0),
      tap(([_, message]) => {
        if (message[this.userChatCompanion?._id]?.countNoReadMessages > 0) {
          this.store.dispatch(MessageActions.messagesWasReade({ chatCompanionId: this.userChatCompanion._id }))
        }
      })
    )
  }

}
