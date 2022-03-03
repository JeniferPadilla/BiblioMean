import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListBookService {
  
  private env: string;

  constructor(private _http:HttpClient) {
    this.env=environment.APP_URL;
   }
   listBook(){
    return this._http.get<any>
    (this.env + 'books/listBook');
   }
}
