import { Component, OnInit, AfterViewInit } from '@angular/core';
import {GatewayService} from '../../gateway.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-gateways',
  templateUrl: './view-all-gateways.component.html',
  styleUrls: ['./view-all-gateways.component.css']
})
export class ViewAllGatewaysComponent implements OnInit, AfterViewInit {
  public gateways: Array<any>;

  constructor(private gatewayService: GatewayService, private route: Router) {
    this.gatewayService.getGateways();
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
  public deleteGateway(id: string) {
      if (confirm('Are you sure!')) {
          this.gatewayService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/gateway/view-all-gateways']);
  }
}
