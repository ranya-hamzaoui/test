import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowsComponent } from './follows/follows.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { PostModule } from './post/post.module';
import { SharedModule } from '../shared/shared.module';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [HomeComponent, NavComponent, FollowsComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterModule,
    PostModule,
    SharedModule,
    MainRoutingModule,
  ],
})
export class MainModule {}
