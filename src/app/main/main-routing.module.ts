import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
