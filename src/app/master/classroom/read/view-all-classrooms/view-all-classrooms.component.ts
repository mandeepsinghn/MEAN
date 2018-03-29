import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ClassroomService} from '../../classroom.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-classrooms',
  templateUrl: './view-all-classrooms.component.html',
  styleUrls: ['./view-all-classrooms.component.css']
})
export class ViewAllClassroomsComponent implements OnInit, AfterViewInit {
  public classrooms: Array<any>;

  constructor(private classroomService: ClassroomService, private route: Router) {
    this.classroomService.getClassrooms();
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
  public deleteClassroom(id: string) {
      if (confirm('Are you sure!')) {
          this.classroomService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/classroom/view-all-classrooms']);
  }
}
