import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SchoolService} from '../../school.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-schools',
  templateUrl: './view-all-schools.component.html',
  styleUrls: ['./view-all-schools.component.css']
})
export class ViewAllSchoolsComponent implements OnInit, AfterViewInit {
  public schools: Array<any>;

  constructor(private schoolService: SchoolService, private route: Router) {
    this.schoolService.getSchools();
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
  public deleteSchool(id: string) {
      if (confirm('Are you sure!')) {
          this.schoolService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/school/view-all']);
  }
}
