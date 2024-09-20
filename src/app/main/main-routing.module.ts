import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './profile/about/about.component';
import { MyabonnesComponent } from './profile/myabonnes/myabonnes.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:"profile/:id", 
    children:[
    {path:'',component:AboutComponent},
    {path:'myabonnes',component:MyabonnesComponent},
    {path:'edit',component:ProfileEditComponent},
    ],component:ProfileComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
