import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TrainingSelectors } from '../../shared/training.selectors';
import { filter, first, map, tap } from 'rxjs/operators';
import { TrainingActions } from '../../shared/training.actions';
import { UsersSelectors } from '../../../../shared/users/users.selectors';
import { User } from '../../../../models/user.model';
import { StravaActivitiesByTrainingValuesDayRange } from '../../shared/models/starava.models';

@Component({
  selector: 'ngx-training-user-fetures-list',
  templateUrl: './training-user-features-list.component.html',
  styleUrls: ['./training-user-features-list.component.scss']
})
export class TrainingUserFeaturesListComponent implements OnInit {
  users$: Observable<User[]>
  activitiesBySportTypesDayRangeUsersData$: Observable<boolean>

  public featureUserListName = 'Features'

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(UsersSelectors.users))
    this.activitiesBySportTypesDayRangeUsersData$ = this.store.pipe(
      select(TrainingSelectors.activitiesBySportTypesDaysRange),
      map(activities => activities.usersData.length > 0)
    )
  }

  isUserComparable(userId: string): Observable<boolean> {
    return this.store.pipe(
      select(TrainingSelectors.activitiesBySportTypesDaysRange),
      map(activities => !!activities.comparableUsers.find(userIdOfUserIds => userIdOfUserIds === userId)),
    )
  }

  addOrDeleteComparableUser(userId: string, addUser: boolean) {
    this.activitiesBySportTypesDayRangeUsersData$.pipe(
      filter((userData) => userData),
      tap(() => {
        if (addUser) {
          this.store.dispatch(TrainingActions.addNewComparableUser({ userId }))
        } else {
          this.store.dispatch(TrainingActions.removeComparableUser({ userId }))
        }
      }),
      first()
    ).subscribe()


  }

  getTooltipConfig(userName: string): Observable<{ text: string, hasStat: boolean }> {
    return this.activitiesBySportTypesDayRangeUsersData$.pipe(
      map(usersData => {
        if (!usersData) {
          return { text: 'Please Fill Start Date ,End Date and Pick Types', hasStat: false }
        } else {
          return { text: `Click here to compare your statistics with ${ userName }`, hasStat: true }
        }
      })
    )
  }

}
