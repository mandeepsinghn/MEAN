import { Component, OnInit, AfterViewInit } from '@angular/core';
import {RouteService} from '../../route.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-routes',
  templateUrl: './view-all-routes.component.html',
  styleUrls: ['./view-all-routes.component.css']
})
export class ViewAllRoutesComponent implements OnInit, AfterViewInit {
  public routes: Array<any>;

  constructor(private routeService: RouteService, private route: Router) {
    this.routeService.getRoutes();
  }

  ngOnInit() {
  }
    ngAfterViewInit() {
        /*$('.js-exportable').DataTable({
            dom: 'Bfrtip',
            responsive: true,
            buttons: [
                'pdf'
            ]
        });*/
    }
  public deleteRoute(id: string) {
      if (confirm('Are you sure!')) {
          this.routeService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/route/view-all-routes']);
  }
}
