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
  submitLogin() {
    if ($('#sign_in').valid()) {
      this.authService.login('username', 'password', this);
      // this.cookieService.put('putting', 'putty');
    }
  }
  public successRedirect() {
      this.authService.isLoggedIn=true;
      this.route.navigate(['cpanel']);
  }

}
