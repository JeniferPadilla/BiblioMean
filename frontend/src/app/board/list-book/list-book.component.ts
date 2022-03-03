import { Component, OnInit } from '@angular/core';
import { ListBookService } from '../../services/list-book.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})

export class ListBookComponent implements OnInit {

  book:any;
  cantBook=0;
  message: string = '';

  constructor(
    private _listBook: ListBookService,
    private _router: Router,
    ) {
    }

    ListBook(){
      this._listBook.listBook().subscribe({

        next: (v) => {
          localStorage.setItem('token', v.token)
          this._router.navigate(['/saveBook'])
          this.message= 'Registro de usuario exitoso'
          // console.log(v);
        },
      })

    }

  ngOnInit(): void {

  }

}
