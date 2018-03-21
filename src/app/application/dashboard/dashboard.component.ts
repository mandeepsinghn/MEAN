import {Component, OnInit, AfterViewInit} from '@angular/core';
declare var $: any, Waves: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.setFirstTimeEvents();
  }
  setFirstTimeEvents() {
    setTimeout(function() {
      $('.page-loader-wrapper').fadeOut();
    }, 50);

    $('body').removeClass('login-page').removeClass('ls-closed');
    $.each($('.menu-toggle.toggled'), function(i, val) {
      $(val).next().slideToggle(0);
    });

    // When page load
    //    $.each($('.menu .list li.active'), function(i, val) {
    //      $(val).find('a:eq(0)').addClass('toggled').next().show();
    //    });
    //
    //    Waves.attach('.menu .list a', ['waves-block']);
    //    Waves.init();
    $.AdminBSB.browser.activate();
    $.AdminBSB.leftSideBar.activate();
    $.AdminBSB.rightSideBar.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();

    if ($('.navbar-right .dropdown-menu .body .slimScrollDiv').size() === 0) {
      $('.navbar-right .dropdown-menu .body .menu').slimscroll({
        height: '254px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
      });
    }
  }

}
