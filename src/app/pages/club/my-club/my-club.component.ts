import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-club',
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.scss']
})
export class MyClubComponent implements OnInit {
  field: any;

  constructor() {
  }

  ngOnInit(): void {
    this.field = 'field';
  }

}
