import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TrainingService } from '../services/training.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthSelectors } from '../../../auth/auth.selectors';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StravaAthleteResolver implements Resolve<any> {
  constructor(private trainingService: TrainingService, private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(AuthSelectors.user),
      first((user => !!user))
    )
  }

}
