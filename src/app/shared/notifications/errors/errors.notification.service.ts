import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthSelectors } from '../../../pages/auth/auth.selectors';
import { filter, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorsNotificationService {

  constructor(private store: Store, private toastr: ToastrService) {
  }

  public authErrorNotificationSubscription() {
    this.store.pipe(
      select(AuthSelectors.authErrors),
      filter((e) => !!e),
      // @ts-ignore
      tap((e) => this.toastr.error(e.error))
    ).subscribe()
  }
}
