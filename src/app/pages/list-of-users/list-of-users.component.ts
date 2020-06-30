import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { UsersState } from '../../shared/users/users.reducer';
import { UsersSelectors } from '../../shared/users/users.selectors';
import { UserActions } from '../../shared/users/users.actions';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ngx-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit, AfterViewInit {
  @ViewChild('chatWrapper') chatWrapper: ElementRef
  @ViewChild(CdkDrag) cdkDragEl: CdkDrag<HTMLDivElement>
  users$: Observable<User[]>
  currentChatUser: User
  chatOffset: string;
  isChatOpen: boolean;
  reverseChatHeader: boolean;

  constructor(private store: Store<UsersState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers())
    this.users$ = this.store.pipe(select(UsersSelectors.users))
  }

  ngAfterViewInit(): void {

  }

  setCurrentChatUser(el: HTMLDivElement, user: User) {
    // Reset position of drag element
    this.cdkDragEl.reset()
    // Turn On flag openChat and set currentUser
    this.isChatOpen = true
    this.currentChatUser = user
    // find top difference between current list item and chat wrapper and set css 'top' property
    const { top: wrapperTop } = this.chatWrapper.nativeElement.getBoundingClientRect()
    const { top: currentElementTop } = el.getBoundingClientRect()
    const difference = currentElementTop - wrapperTop
    this.reverseChatHeader = difference > 360
    // if chat reversed need subtract chat height
    const CHAT_HEIGHT = 399
    this.chatOffset = `${ this.reverseChatHeader ? difference - CHAT_HEIGHT : difference }px`
  }
}








