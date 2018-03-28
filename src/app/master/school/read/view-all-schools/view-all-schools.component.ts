import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../school.service';

@Component({
  selector: 'app-view-all-schools',
  templateUrl: './view-all-schools.component.html',
  styleUrls: ['./view-all-schools.component.css']
})
export class ViewAllSchoolsComponent implements OnInit {
  public schools: Array<any>;
  constructor(private schoolService: SchoolService) {
    this.schoolService.getSchools();
  }

  ngOnInit() {
  }
}
