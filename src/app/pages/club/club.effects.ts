import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClubActions } from './club.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ClubService } from './services/club.service';
import { EMPTY } from 'rxjs';


@Injectable()
export class ClubEffects {

  loadClub$ = createEffect(() => this.actions$.pipe(
    ofType(ClubActions.loadClub),
    mergeMap(() => this.clubService.getClub()
      .pipe(
        map(res => ClubActions.fetchedClub({ club: res.club })),
        catchError(e => EMPTY)
      ))
    )
  )


  constructor(private actions$: Actions, private clubService: ClubService) {
  }

}
