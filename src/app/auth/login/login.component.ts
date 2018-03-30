import { AuthService } from '../auth.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService, private route: Router, private cookieService: CookieService) {}

  ngOnInit() {
  }
  ngAfterViewInit() {
    $('body').addClass('login-page');
  }
  stopDefaultSubmit() { return false; }
  submitLogin(username: string, password: string) {
    if ($('#sign_in').valid()) {
      this.authService.login(username, password).subscribe( response => {
          if ( response) {
              console.log(response);
              if ('_id' in  response) {
                  this.authService.isLoggedIn = true;
                  this.cookieService.put('loggedUser', response['_id']);
                  this.route.navigate(['cpanel']);
              }
          }
      });
      // this.cookieService.put('putting', 'putty');
    }
  }
}
