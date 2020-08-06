import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component, ContentChild,
  ElementRef, Input, OnChanges, OnDestroy,
  OnInit,
  QueryList, SimpleChange,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { User, UserWithCountMessages } from '../../models/user.model';
import { combineLatest, Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { UsersState } from '../../shared/users/users.reducer';
import { UsersSelectors } from '../../shared/users/users.selectors';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { BaseMessageEntity } from '../../shared/messages/models/message.model';
import { MessagesSelectors } from '../../shared/messages/messages.selectors';
import { first, map, tap } from 'rxjs/operators';
import { AuthSelectors } from '../auth/auth.selectors';
import { MessagesNotificationService } from '../../shared/notifications/messages/messages.notification.service';
import { SubSink } from 'subsink';
import { TrainingActions } from '../training/shared/training.actions';
import { TrainingSelectors } from '../training/shared/training.selectors';

import { TrainingUserFeaturesListComponent } from '../training/my-training/training-user-features-list/training-user-features-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit, AfterContentChecked, OnDestroy{

  @ViewChild('chatWrapper') chatWrapper: ElementRef
  @ViewChild(CdkDrag) cdkDragEl: CdkDrag<HTMLDivElement>
  @ViewChildren('userContainer') userContainer: QueryList<ElementRef<HTMLDivElement>>
  @ContentChild(TrainingUserFeaturesListComponent) trainingUserFeaturesList: TrainingUserFeaturesListComponent
  users$: Observable<User[]>
  authUser$: Observable<User>
  usersWithCountMessages$: Observable<UserWithCountMessages[]>
  messages$: Observable<BaseMessageEntity>
  nameOfFeatureList: string
  currentChatUserIdSetter$ = new Subject<string>()
  currentChatUser: User
  chatOffset: string;
  isChatOpen: boolean;
  reverseChatHeader: boolean;
  private subs = new SubSink()

  constructor(private store: Store<UsersState>,
              private messagesNotificationService: MessagesNotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {

    this.users$ = this.store.pipe(select(UsersSelectors.users))
    this.messages$ = this.store.pipe(select(MessagesSelectors.messages))
    this.authUser$ = this.store.pipe(select(AuthSelectors.user))
    this.computeUserWithCountMessages()
    this.currentChatUserSubscription()
    this.messageNotificationSubscription()
  }


  ngAfterContentChecked(): void {
    this.nameOfFeatureList = this.trainingUserFeaturesList?.featureUserListName
  }

  computeUserWithCountMessages() {
    const messages$ = this.store.pipe(select(MessagesSelectors.messages))
    this.usersWithCountMessages$ = combineLatest([this.users$, messages$, this.authUser$]).pipe(
      map<[User[], BaseMessageEntity, User], UserWithCountMessages[]>(([users, messages, authUser]) => {
        return users
          .map(user => {
            return {
              ...user,
              noReadMessagesCount: messages[user._id]?.countNoReadMessages
            }
          })
      })
    )
  }

  messageNotificationSubscription() {
    this.subs.sink = this.messagesNotificationService.getNotificationSubscription().pipe(
      tap(({ currentUserId }) => this.setCurrentUser(currentUserId)
      )).subscribe()
  }

  setCurrentUser(userId: string) {
    this.currentChatUserIdSetter$.next(userId)
  }

  currentChatUserSubscription() {
    const currentUser$ = this.currentChatUserIdSetter$
    this.subs.sink = combineLatest([this.users$, currentUser$]).pipe(
      tap(([users, currentUserId]) => {
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
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}








