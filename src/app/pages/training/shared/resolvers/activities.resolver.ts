import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { TrainingActions } from '../training.actions';
import { TrainingSelectors } from '../training.selectors';

@Injectable({ providedIn: 'root' })
export class ActivitiesResolver implements Resolve<any> {
  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.store.dispatch(TrainingActions.loadDataForMainBanner())
    return this.store.pipe(
      select(TrainingSelectors.bannerStatistics),
      first(),
    )
  }

}
