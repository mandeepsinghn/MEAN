import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AuthService {

  public isLoggedIn: any;
  public loggedId: any;
  constructor(private http: HttpClient, private cookieService: CookieService) {
      const isLogged = this.cookieService.get('loggedUser');
      if (isLogged) {
          this.isLoggedIn = true;
          this.loggedId = isLogged;
      } else {
          this.isLoggedIn = false;
          this.loggedId = false;
      }
   }
   public login(username: String, password: String, loginComp: LoginComponent) {
      this.http.post('/api/users/login.json', {
          responseType: 'json',
          username: username,
          password: password
       }).subscribe(function (data) {
           loginComp.successRedirect(data);
       });
   }

}
