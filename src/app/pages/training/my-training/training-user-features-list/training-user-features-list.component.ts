import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TrainingSelectors } from '../../shared/training.selectors';
import { map } from 'rxjs/operators';
import { TrainingActions } from '../../shared/training.actions';
import { UsersSelectors } from '../../../../shared/users/users.selectors';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'ngx-training-user-fetures-list',
  templateUrl: './training-user-features-list.component.html',
  styleUrls: ['./training-user-features-list.component.scss']
})
export class TrainingUserFeaturesListComponent implements OnInit {
  users$: Observable<User[]>
  public featureUserListName = 'Features'

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(UsersSelectors.users))
  }

  isUserComparable(userId: string): Observable<boolean> {
    return this.store.pipe(
      select(TrainingSelectors.activitiesBySportTypesDaysRange),
      map(activities => !!activities.comparableUsers.find(userIdOfUserIds => userIdOfUserIds === userId)),
    )
  }

  addOrDeleteComparableUser(userId: string, addUser: boolean) {
    if (addUser) {
      this.store.dispatch(TrainingActions.addNewComparableUser({ userId }))
    } else {
      this.store.dispatch(TrainingActions.removeComparableUser({ userId }))
    }

  }

}
