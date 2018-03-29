import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TeacherService} from '../../teacher.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-teachers',
  templateUrl: './view-all-teachers.component.html',
  styleUrls: ['./view-all-teachers.component.css']
})
export class ViewAllTeachersComponent implements OnInit, AfterViewInit {
  public teachers: Array<any>;

  constructor(private teacherService: TeacherService, private route: Router) {
    this.teacherService.getTeachers();
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
  public deleteTeacher(id: string) {
      if (confirm('Are you sure!')) {
          this.teacherService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/teacher/view-all-teachers']);
  }
}
