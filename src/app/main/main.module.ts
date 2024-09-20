import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowsComponent } from './follows/follows.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { PostModule } from './post/post.module';
import { SharedModule } from '../shared/shared.module';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './profile/about/about.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { MyabonnesComponent } from './profile/myabonnes/myabonnes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    FollowsComponent,
    ProfileComponent,
    AboutComponent,
    ProfileEditComponent,
    MyabonnesComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterModule,
    PostModule,
    SharedModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class MainModule {}
