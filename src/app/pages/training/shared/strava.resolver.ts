import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingService } from './services/training.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StravaResolver implements Resolve<any> {
  constructor(private trainingService: TrainingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if ('code' in route.queryParams) {
      return this.trainingService.addNewStravaUser(route.queryParams.code).pipe(
        tap(r => console.log(r))
      )
    }
  }

}
