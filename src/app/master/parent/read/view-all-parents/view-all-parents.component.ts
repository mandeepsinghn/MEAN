import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ParentService} from '../../parent.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-parents',
  templateUrl: './view-all-parents.component.html',
  styleUrls: ['./view-all-parents.component.css']
})
export class ViewAllParentsComponent implements OnInit, AfterViewInit {
  public parents: Array<any>;

  constructor(private parentService: ParentService, private route: Router) {
    this.parentService.getParents();
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
  public deleteParent(id: string) {
      if (confirm('Are you sure!')) {
          this.parentService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/parent/view-all-parents']);
  }
}
