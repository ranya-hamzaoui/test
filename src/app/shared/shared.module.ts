import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FilterPipe } from './pipes/filter.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
@NgModule({
  declarations: [NotFoundComponent, LoadingSpinnerComponent,FilterPipe, PaginationComponent],
  imports: [CommonModule, RouterModule],
  exports: [NotFoundComponent,LoadingSpinnerComponent,FilterPipe,PaginationComponent],
})
export class SharedModule {}