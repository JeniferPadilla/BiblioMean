import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
 } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerData:any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition='end';
  verticalPosition: MatSnackBarVerticalPosition='top';
  durationInSeconds:number =2000;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
   }

   registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password||
      !this.registerData.phone
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
      this.registerData={};
    } else {
      this._userService.registerUser(this.registerData).
      subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token)
          this._router.navigate(['/saveBook'])
          this.message= 'Registro de usuario exitoso'
          this.openSnackBarSuccesfull();
        
        },
        error: (e) => {
          this.message= e.error.message
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
     panelClass:['styleSnackBarSuccesful'],
   });
  }

  openSnackBarError() {
   this._snackBar.open(this.message, 'X', {
     horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass:['styleSnackBarError'],
    });
  }

  ngOnInit(): void {
  }

}
