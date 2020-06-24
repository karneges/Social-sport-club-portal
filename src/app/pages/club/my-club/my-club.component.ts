import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClubService } from '../services/club.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Observable, Subscription } from 'rxjs';
import { Club } from '../models/club.model';
import { ClubSelectors } from '../club.selectors';
import { Post } from '../models/post.model';
import { Event } from '../../../models/event.model';
import { EventEntityService } from '../services/event-entity.service';
import { User } from '../../../models/user.model';
import { AuthSelectors } from '../../auth/auth.selectors';
import { SocketIoBaseService } from '../../../shared/socket-io-base.service';
import { SocketIoService } from '../../../shared/socket-io.service';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { log } from 'util';

@Component({
  selector: 'ngx-my-club',
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.scss']
})
export class MyClubComponent implements OnInit {
  club$: Observable<Club>
  posts$: Observable<Post[]>
  events$: Observable<Event[]>
  currentUser$: Observable<User>

  constructor(private clubService: ClubService,
              private store: Store<AppState>,
              private eventDataService: EventEntityService,
              private socketService: SocketIoService) {
  }

  ngOnInit(): void {
    this.club$ = this.store.pipe(
      select(ClubSelectors.club)
    )
    this.eventDataService.getAll()
    this.events$ = this.eventDataService.entities$
    this.currentUser$ = this.store.pipe(
      select(AuthSelectors.user)
    )
  }

}
