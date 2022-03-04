import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router'; //esta importacion hace referencia al app.routing.module
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService, private _router:Router){} // cuanto se importa el router es por ue se hara una redireccion de pagina

  canActivate(): boolean {
    if (!this._userService.loggedIn()) { //se verifica si la funcionn tiene algo
      this._router.navigate(['login']); // si no tiene token lo lleva al login
     return false                       // y retorna un false
    } else {
      return true                       // si hay un true le dara acceso a la pagina
    }
   }

}
