import { Component, OnInit, AfterViewInit } from '@angular/core';
import {UserService} from '../../../user/user.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit, AfterViewInit {
  public userInfo: any;
  constructor(private userService: UserService) {
    this.userService.getLoggedUserData();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
      //console.log(this);
  }
}
