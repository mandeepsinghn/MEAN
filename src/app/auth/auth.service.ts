import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public isLoggedIn: any;
  constructor() {
  this.isLoggedIn = false;
   }

}
