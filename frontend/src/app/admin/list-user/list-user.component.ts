import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  user:any;
  message: string = '';
  cantUser=1;
  constructor(private _listUser: UserService,) { }

  listUser(){
    this._listUser.listUser().subscribe({

      next: (v) => {
        this.user = v.users
        //console.log(v);
      },
    })

  }
  ngOnInit(): void {
    this.listUser();
  }

}
