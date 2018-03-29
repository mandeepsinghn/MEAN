import { Component, OnInit, AfterViewInit } from '@angular/core';
import {IdcardService} from '../../idcard.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-view-all-idcards',
  templateUrl: './view-all-idcards.component.html',
  styleUrls: ['./view-all-idcards.component.css']
})
export class ViewAllIdcardsComponent implements OnInit, AfterViewInit {
  public idcards: Array<any>;

  constructor(private idcardService: IdcardService, private route: Router) {
    this.idcardService.getIdcards();
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
  public deleteIdcard(id: string) {
      if (confirm('Are you sure!')) {
          this.idcardService.delete( id, this);
      }
  }
  public listRedirect() {
     this.route.navigate(['cpanel/master/idcard/view-all-idcards']);
  }
}
