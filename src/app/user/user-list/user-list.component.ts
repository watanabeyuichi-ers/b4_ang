import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];


  constructor(
    private service: UserService
  ) { }

  ngOnInit(): void {
    // this.users = [
    //   { id: 1, name: 'Yamada', email: 'yamada@example.com' },
    //   { id: 2, name: 'Suzuki', email: 'suzuki@example.com' },
    //   { id: 3, name: 'Tanaka', email: 'tanaka@example.com' },
    // ];
    // this.users = this.service.getUsers();
    this.service.getUsers().subscribe(res => {
      this.users = res;
    });
  }

}
