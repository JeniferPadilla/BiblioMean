import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;


  constructor(
    //el constructor se encarga de ejecutar lo que esta adentro antes de que el compo aparezca,ejecuta antes de que salga ej el formulario.
    private _userService: UserService, // se recomienda que las variables sean private y con _ asi guion bajo
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginData = {}; //es un objeto tipo json vacio,luego al ingrsar los datos se llena
  }
  
  login() {
    if (
      !this.loginData.email ||
      !this.loginData.password
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
    } else {
      this._userService.login(this.loginData)
      .subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/listBook']);
        },
        error: (e) => {
          this.message= e.error.message
          this.openSnackBarError();
        },
      });
    }
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
