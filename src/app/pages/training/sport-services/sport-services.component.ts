import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StravaAthlete } from '../../../models/user.model';
import { AuthSelectors } from '../../auth/auth.selectors';
import { TrainingActions } from '../shared/training.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-sport-services',
  templateUrl: './sport-services.component.html',
  styleUrls: ['./sport-services.component.scss']
})
export class SportServicesComponent implements OnInit {
  STRAVA_URL = environment.STRAVA_AUTH_URL
  public athlete$:Observable<StravaAthlete>
  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.athlete$ = this.store.pipe(
      select(AuthSelectors.stravaAthlete),
      tap(() => this.router.navigate(['../'],{relativeTo:this.route}))
    )
  }
  onStravaDisconnect() {
    this.store.dispatch(TrainingActions.userDisconnectStravaAccount())
  }

}
