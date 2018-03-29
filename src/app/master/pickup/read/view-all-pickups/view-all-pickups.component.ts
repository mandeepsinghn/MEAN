import { Component, OnInit, AfterViewInit } from '@angular/core';
import {PickupService} from '../../pickup.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-pickups',
  templateUrl: './view-all-pickups.component.html',
  styleUrls: ['./view-all-pickups.component.css']
})
export class ViewAllPickupsComponent implements OnInit, AfterViewInit {
  public pickups: Array<any>;

  constructor(private pickupService: PickupService, private route: Router) {
    this.pickupService.getPickups();
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
  public deletePickup(id: string) {
      if (confirm('Are you sure!')) {
          this.pickupService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/pickup/view-all-pickups']);
  }
}
