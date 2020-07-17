import {Injectable} from '@angular/core';
import {Params, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class NavigateService {
  constructor(private router: Router) {
  }

  navigateByQueryParams(queryParams: Params) {
    const currentUrl = this.router.routerState.snapshot.url.split('?')[0]
    this.router.navigate([currentUrl], {queryParams})
  }
}
