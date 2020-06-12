import { Component, OnInit } from '@angular/core';
import { ClubService } from '../services/club.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { ClubActions } from '../club.actions';
import { Observable } from 'rxjs';
import { Club } from '../models/club.model';
import { ClubSelectors } from '../club.selectors';
import { tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostEntityService } from '../services/post-entity.service';

@Component({
  selector: 'ngx-my-club',
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.scss']
})
export class MyClubComponent implements OnInit {
  club$: Observable<Club>
  posts$: Observable<Post[]>

  constructor(private clubService: ClubService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.club$ = this.store.pipe(
      select(ClubSelectors.club)
    )
  }

}
