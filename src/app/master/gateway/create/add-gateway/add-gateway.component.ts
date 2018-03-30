import { GatewayService } from '../../gateway.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { } from 'googlemaps';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-gateway',
  templateUrl: './add-gateway.component.html',
  styleUrls: ['./add-gateway.component.css']
})
export class AddGatewayComponent implements OnInit, AfterViewInit {
  public gateway: any;
    public gatewayId: string;
    constructor( private gatewayService: GatewayService,
                 private route: Router,
                 private route1: ActivatedRoute) {
      this.gateway = [];
      const gatewayId = this.route1.params.subscribe(params => {
          this.gatewayId =  params['id']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
      });
      // params( 'id' );
      if ( gatewayId ) {
          this.gatewayService.getGateway( this.gatewayId).subscribe(response => {
              this.gateway = response;
          });
      }
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
  public saveGateway(event) {
      this.gatewayService.save(this.gateway).subscribe(response => {
          this.gateway = response;
          this.route.navigate(['cpanel/master/gateway/view-all']);
      });
      // this.cookieService.put('putting', 'putty');
   }
}
