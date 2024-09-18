import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
@NgModule({
  declarations: [NotFoundComponent, LoadingComponent],
  imports: [CommonModule, RouterModule],
  exports: [NotFoundComponent],
})
export class SharedModule {}
