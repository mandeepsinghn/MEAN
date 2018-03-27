import { UserService } from '../user.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  public user: Array<any>;
    public userInfo: Array<any>;
  constructor(private userService: UserService, private cookieService: CookieService, private route: Router) {
      const isLogged = this.cookieService.get('loggedUser');
      this.userService.getLoggedUserData( isLogged, this );
  }

  ngOnInit() {
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
            console.log(data);
            this.user = data;
            this.userInfo = data.userInfo;
            return data;
        }
        return false;
    }
    public saveProfile(event) {
        console.log(this.user);
        this.userService.updateUserData( this.user, this.userInfo, this );
    }
    public updateData(data) {
        if ( data ) {
            console.log(data);
            this.route.navigate(['cpanel/user/profile']);
        }
        return false;
    }
}
