import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Pager } from 'src/app/core/models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pager !: Pager ;
  @Output() pageChange = new EventEmitter<number>();

  setpage(page: number) {
    if (page !== this.pager.currentPage) {
      this.pager.currentPage = page;
      this.pageChange.emit(page); 
    }
  }
}
