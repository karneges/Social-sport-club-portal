import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { UsersState } from '../../shared/users/users.reducer';
import { UsersSelectors } from '../../shared/users/users.selectors';
import { UserActions } from '../../shared/users/users.actions';

@Component({
  selector: 'ngx-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]>
  currentChatUserId: string

  constructor(private store: Store<UsersState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers())
    this.store.dispatch(UserActions.userStatusChangedWSSubscription())
    this.users$ = this.store.pipe(select(UsersSelectors.users))
  }

  ngAfterViewInit(): void {

  }

  setCurrentChatUser(id: string) {
    this.currentChatUserId = id
  }
}







