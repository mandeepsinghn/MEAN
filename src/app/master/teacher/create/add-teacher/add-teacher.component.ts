import { TeacherService } from '../../teacher.service';
import {Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef, NgModule} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;


export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@NgModule({
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
})
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class AddTeacherComponent implements OnInit, AfterViewInit {
  public teacher: any;
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public teacherId: string;
    @ViewChild('search')
        public searchElementRef: ElementRef;
    constructor( private teacherService: TeacherService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private route: Router, private route1: ActivatedRoute) {
      this.teacher = [];
      const teacherId = this.route1.params.subscribe(params => {
          this.teacherId =  params['id']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
      });
      // params( 'id' );
      if ( teacherId ) {
          this.teacherService.getTeacher( this.teacherId, this);
      }
  }

  ngOnInit() {
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      // create search FormControl
      this.teacher.searchControl = new FormControl();

      // set current position
      this.setCurrentPosition();

      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: ['address'],
              componentRestrictions: {country: 'in'}
          });
          autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                  // get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                  // verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  // set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();
                  this.teacher.address = place.formatted_address;
                  this.teacher.latitude = place.geometry.location.lat();
                  this.teacher.longitude = place.geometry.location.lng();
                  this.zoom = 12;
              });
          });
      });
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
            this.teacher = data;
        }
    }
  public saveTeacher(event) {
      this.teacherService.save(this.teacher, this);
      // this.cookieService.put('putting', 'putty');
   }
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.teacher.latitude = position.coords.latitude;
                this.teacher.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
    public successredirect() {
        this.route.navigate(['cpanel/master/teacher/view-all-teachers']);
    }
}