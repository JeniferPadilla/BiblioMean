import { Component, OnInit } from '@angular/core';
import { ListBookService } from '../../services/list-book.service';


@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})

export class ListBookComponent implements OnInit {

  book:any;
  message: string = '';
  cantBook=1;

  constructor(
    private _listBook: ListBookService,
    ) {
    }

    ListBook(){
      this._listBook.listBook().subscribe({

        next: (v) => {
           this.book = v.books
          // console.log(v);
        },
      })

    }

  ngOnInit(): void {
    this.ListBook();
  }

}
