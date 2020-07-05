import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { User, UserWithCountMessages } from '../../models/user.model';
import { combineLatest, Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { UsersState } from '../../shared/users/users.reducer';
import { UsersSelectors } from '../../shared/users/users.selectors';
import { UserActions } from '../../shared/users/users.actions';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { BaseMessageEntity, BaseMessageModel } from '../../shared/messages/models/message.model';
import { MessagesSelectors } from '../../shared/messages/messages.selectors';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AuthSelectors } from '../auth/auth.selectors';
import { id } from '@swimlane/ngx-charts';
import { MessagesNotificationService } from '../../shared/notifications/messages.notification.service';

@Component({
  selector: 'ngx-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit, AfterViewInit {
  @ViewChild('chatWrapper') chatWrapper: ElementRef
  @ViewChild(CdkDrag) cdkDragEl: CdkDrag<HTMLDivElement>
  @ViewChildren('userContainer') userContainer: QueryList<ElementRef<HTMLDivElement>>
  users$: Observable<User[]>
  usersWithCountMessages$: Observable<UserWithCountMessages[]>
  messages$: Observable<BaseMessageEntity>
  currentChatUserIdSetter$ = new Subject<string>()
  currentChatUser: User
  chatOffset: string;
  isChatOpen: boolean;
  reverseChatHeader: boolean;

  constructor(private store: Store<UsersState>, private messagesNotificationService: MessagesNotificationService) {

  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers())
    this.users$ = this.store.pipe(select(UsersSelectors.users))
    this.messages$ = this.store.pipe(select(MessagesSelectors.messages))
    this.computeUserWithCountMessages()
    this.currentChatUserSubscription()
    this.messageNotificationSubscription()
  }

  ngAfterViewInit(): void {

  }

  computeUserWithCountMessages() {
    const messages$ = this.store.pipe(select(MessagesSelectors.messages))
    this.usersWithCountMessages$ = combineLatest([this.users$, messages$]).pipe(
      map<[User[], BaseMessageEntity], UserWithCountMessages[]>(([users, messages]) => {
        return users.map(user => {
          return {
            ...user,
            noReadMessagesCount: messages[user._id]?.countNoReadMessages
          }
        })
      })
    )
  }

  messageNotificationSubscription() {
    this.messagesNotificationService.getNotificationSubscription().pipe(
      tap(({ currentUserId }) => this.setCurrentUser(currentUserId)
      )).subscribe()
  }

  setCurrentUser(userId: string) {
    this.currentChatUserIdSetter$.next(userId)
  }

  currentChatUserSubscription() {
    const currentUser$ = this.currentChatUserIdSetter$
    combineLatest([this.users$, currentUser$]).pipe(
      tap(([users, currentUserId]) => {
        console.log('start')
        // find currentUser index from users array then get native element and current user
        const idx = users.findIndex((user) => user._id === currentUserId)
        const el: HTMLDivElement = Array.from(this.userContainer)[idx].nativeElement
        // Reset position of drag element
        this.cdkDragEl.reset()
        // Turn On flag openChat and set currentUser
        this.isChatOpen = true
        this.currentChatUser = users[idx]
        // find top difference between current list item and chat wrapper and set css 'top' property
        const { top: wrapperTop } = this.chatWrapper.nativeElement.getBoundingClientRect()
        const { top: currentElementTop } = el.getBoundingClientRect()
        const difference = currentElementTop - wrapperTop
        this.reverseChatHeader = difference > 360
        // if chat reversed need subtract chat height
        const CHAT_HEIGHT = 399
        this.chatOffset = `${ this.reverseChatHeader ? difference - CHAT_HEIGHT : difference }px`
        console.log('end')
      })
    ).subscribe()
  }


}








