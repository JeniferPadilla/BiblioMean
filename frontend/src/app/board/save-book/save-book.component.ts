import { Component, OnInit } from '@angular/core';
import { BookService} from '../../services/book.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css'],
})
export class SaveBookComponent implements OnInit {

  registerBookData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _bookService: BookService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerBookData = {};
  }

  saveBook() {
    if (
      !this.registerBookData.title ||
      !this.registerBookData.author ||
      !this.registerBookData.editorial ||
      !this.registerBookData.category ||
      !this.registerBookData.description ||
      !this.registerBookData.quantity ||
      !this.registerBookData.deliveryDate
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
      this.registerBookData = {};
    } else {
      this._bookService.saveBook(this.registerBookData).subscribe({
        next: (v) => {
          
          this._router.navigate(['/listBook']);
          this.message = 'Registro exitoso del libro';
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
    }
  }
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarSuccesful'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarError'],
    });
  }

  ngOnInit(): void {}
}
