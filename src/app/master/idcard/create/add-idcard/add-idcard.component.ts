import { IdcardService } from '../../idcard.service';
import {Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef, NgModule} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-add-idcard',
  templateUrl: './add-idcard.component.html',
  styleUrls: ['./add-idcard.component.css']
})
export class AddIdcardComponent implements OnInit, AfterViewInit {
  public idcard: any;
    public idcardId: string;
    constructor( private idcardService: IdcardService,
                 private route: Router,
                 private route1: ActivatedRoute) {
      this.idcard = [];
      const idcardId = this.route1.params.subscribe(params => {
          this.idcardId =  params['id']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
      });
      // params( 'id' );
      if ( idcardId ) {
          this.idcardService.getIdcard( this.idcardId).subscribe(response => {
              this.idcard = response;
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
    public setData( data ) {
        if ( data ) {
            // console.log(data);
            this.idcard = data;
        }
    }
  public saveIdcard(event) {
      this.idcardService.save(this.idcard).subscribe(response => {
          this.idcard = response;
          this.route.navigate(['cpanel/master/idcard/view-all']);
      });
      // this.cookieService.put('putting', 'putty');
   }
}
