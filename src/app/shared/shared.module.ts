import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FilterPipe } from './pipes/filter.pipe';
@NgModule({
  declarations: [NotFoundComponent, FilterPipe],
  imports: [CommonModule, RouterModule],
  exports: [NotFoundComponent,FilterPipe],
})
export class SharedModule {}
