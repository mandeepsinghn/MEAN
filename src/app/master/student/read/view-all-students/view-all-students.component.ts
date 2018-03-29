import { Component, OnInit, AfterViewInit } from '@angular/core';
import {StudentService} from '../../student.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-students',
  templateUrl: './view-all-students.component.html',
  styleUrls: ['./view-all-students.component.css']
})
export class ViewAllStudentsComponent implements OnInit, AfterViewInit {
  public students: Array<any>;

  constructor(private studentService: StudentService, private route: Router) {
    this.studentService.getStudents();
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
  public deleteStudent(id: string) {
      if (confirm('Are you sure!')) {
          this.studentService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/student/view-all-students']);
  }
}
