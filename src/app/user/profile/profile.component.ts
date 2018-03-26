import { UserService } from '../user.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  // user: Array;
  constructor(private userService: UserService, private cookieService: CookieService) {
  }

  ngOnInit() {
      const isLogged = this.cookieService.get('loggedUser');
      const user = this.userService.getLoggedUserData( isLogged, this );
      console.log(user);
      // this.user = user;
  }
  ngAfterViewInit() {
        $('#form_validation').validate({
            rules: {
                'checkbox': {
                    required: true
                },
                'gender': {
                    required: true
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });
    }
    public setData( data ) {
        if ( data ) {
            return data;
        }
        return false;
    }
}
