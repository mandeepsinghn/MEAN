import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginComponent} from './login/login.component';

@Injectable()
export class AuthService {

  public isLoggedIn: any;

  constructor(private http: HttpClient) {
        this.isLoggedIn = false;
   }
   public login(username: String, password: String, loginComp: LoginComponent) {
      this.http.get('/api/users.json', {
           responseType: 'json'
       }).subscribe(function (data) {
           loginComp.successRedirect();
       });
   }

}
