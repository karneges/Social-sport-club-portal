import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { mockUsers } from '../../../utils/mock/users';

@Component({
  selector: 'ngx-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {
  users: User[] = mockUsers

  constructor() {
  }

  ngOnInit(): void {
  }

}







