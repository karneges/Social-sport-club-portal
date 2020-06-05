import { Component, Input, OnInit } from '@angular/core';
import { Club } from '../../models/club.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-banner-of-club',
  templateUrl: './banner-of-club.component.html',
  styleUrls: ['./banner-of-club.component.scss']
})
export class BannerOfClubComponent implements OnInit {
  @Input() club$: Observable<Club>
  constructor() { }

  ngOnInit(): void {
  }

}
