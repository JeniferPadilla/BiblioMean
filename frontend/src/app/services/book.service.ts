import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
   }
   
  saveBook(book: any) {
    return this._http.post<any>
    (this.env + 'books/registerBook', book);
  }
}
