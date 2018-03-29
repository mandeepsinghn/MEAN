import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SubjectService} from '../../subject.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-subjects',
  templateUrl: './view-all-subjects.component.html',
  styleUrls: ['./view-all-subjects.component.css']
})
export class ViewAllSubjectsComponent implements OnInit, AfterViewInit {
  public subjects: Array<any>;

  constructor(private subjectService: SubjectService, private route: Router) {
    this.subjectService.getSubjects();
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
  public deleteSubject(id: string) {
      if (confirm('Are you sure!')) {
          this.subjectService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/subject/view-all-subjects']);
  }
}
