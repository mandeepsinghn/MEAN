import { Component, OnInit, AfterViewInit } from '@angular/core';
import {GatewayService} from '../../gateway.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-view-all-gateways',
  templateUrl: './view-all-gateways.component.html',
  styleUrls: ['./view-all-gateways.component.css']
})
export class ViewAllGatewaysComponent implements OnInit, AfterViewInit {
  public gateways: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
  constructor(private gatewayService: GatewayService, private route: Router) {
    this.gatewayService.getGateways(this.pageIndex, this.pageSize).subscribe(response => {
        this.gateways = response['data'];
        this.pages = Math.ceil(response['total'] / this.pageSize);
    });
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
    public setPageData(event: PageEvent) {
        console.log( event );
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.gatewayService.getGateways(this.pageIndex, this.pageSize).subscribe(response => {
            this.gateways = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public deleteGateway(id: string) {
      if (confirm('Are you sure!')) {
          this.gatewayService.delete( id).subscribe(response => {
              this.gateways = response['data'];
              this.pages = Math.ceil(response['total'] / this.pageSize);
              this.route.navigate(['cpanel/master/gateway/view-all']);
          });
      }
    }
}
