import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  public isLoggedIn: any;

  constructor(private http: HttpClient) {
        this.isLoggedIn = false;
        this.http.get('/api/users.json', {
            responseType: 'json'
        }).subscribe(function (data) {
            console.log(data);
        });
   }

}
