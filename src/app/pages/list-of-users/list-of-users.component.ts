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
  users$: Observable<User[]>
  currentChatUserId: User
  @ViewChild('chatWrapper') chatWrapper: ElementRef
  @ViewChild(CdkDrag) cdkDrag
  @ViewChildren('userContainer') userContainer: QueryList<ElementRef>;
  chatOffset: string;
  isChatOpen: boolean
  dragPosition: any;

  constructor(private store: Store<UsersState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers())
    this.users$ = this.store.pipe(select(UsersSelectors.users))
  }

  ngAfterViewInit(): void {

  }

  setCurrentChatUser(e: HTMLDivElement, user: User) {
    this.cdkDrag.reset()
    this.isChatOpen = true
    this.currentChatUserId = user
    const { top: wrapperTop } = this.chatWrapper.nativeElement.getBoundingClientRect()
    const { top: currentElementTop } = e.getBoundingClientRect()
    const difference = currentElementTop - wrapperTop
    this.chatOffset = `${ difference }px`
  }
}








