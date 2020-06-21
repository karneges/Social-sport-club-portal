import { Component, OnInit } from '@angular/core';
import { UserEntityService } from '../club/services/user-entity.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {
  users$: Observable<User[]>
  constructor(private userEntityService: UserEntityService) {
  }

  ngOnInit(): void {
    this.users$ = this.userEntityService.entities$
    this.userEntityService.getAll()
  }

}







