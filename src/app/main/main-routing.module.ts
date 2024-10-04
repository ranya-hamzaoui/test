import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './profile/about/about.component';
import { MyabonnesComponent } from './profile/myabonnes/myabonnes.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent , data: { code: 'All_Posts' }},
  { path: 'my-posts', component: HomeComponent ,  data: { code: 'My_Posts' }},
  { path: 'following-posts', component: HomeComponent ,  data: { code: 'Followed_Posts' }},
  { path: 'chats', component: ChatComponent},
  { path: 'notifications', component: NotificationsComponent},
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
