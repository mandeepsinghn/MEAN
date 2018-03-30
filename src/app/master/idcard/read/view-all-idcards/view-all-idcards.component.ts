import { Component, OnInit, AfterViewInit } from '@angular/core';
import {IdcardService} from '../../idcard.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-view-all-idcards',
  templateUrl: './view-all-idcards.component.html',
  styleUrls: ['./view-all-idcards.component.css']
})
export class ViewAllIdcardsComponent implements OnInit, AfterViewInit {
  public idcards: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
  constructor(private idcardService: IdcardService, private route: Router) {
    this.idcardService.getIdcards(this.pageIndex, this.pageSize).subscribe(response => {
        this.idcards = response['data'];
        this.pages = Math.ceil(response['total'] / this.pageSize);
    });
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
    public setPageData(event: PageEvent) {
        console.log( event );
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.idcardService.getIdcards(this.pageIndex, this.pageSize).subscribe(response => {
            this.idcards = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
  public deleteIdcard(id: string) {
      if (confirm('Are you sure!')) {
          this.idcardService.delete( id).subscribe(response => {
              this.idcards = response['data'];
              this.pages = Math.ceil(response['total'] / this.pageSize);
              this.route.navigate(['cpanel/master/idcard/view-all']);
          });
      }
  }
}
