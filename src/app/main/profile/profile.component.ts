import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fileToUpload!:File
  urlFile = environment.baseurl + '/getImageFile'
  user!:User
  userConnect=JSON.parse(localStorage.getItem('user_connected')!)

  userId = '';
  imgFile='';
  imgFile2='';

  totalPosts : number = 0 ; 
  totalFollowers : number = 0 ; 
  totalFolloweds : number = 0 ; 
  url : string = '';
  image: string = '';

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    private userService :UserService) {
      this.userId = this.activatedRoute.snapshot.params['id']
      this.userService.setUserIdProfile(this.userId);
    }

  ngOnInit() {
      this.getProfileUser()
  }
  getProfileUser(){
    this.userService.getProfile( this.userService.getUserIdProfile()).subscribe(
      (res:any) => {
        this.user = res.data['user'];
        this.totalPosts = res.data['totalPosts']
        this.totalFolloweds = res.data['totalfolloweds']
        this.totalFollowers = res.data['totalfollowings']
      }
    )
  }
  goToAbout(id:any){
    this.router.navigateByUrl(`/profile/${id}`);
  }

  isUserConnect(){
    // return this.userId==this.userConnect._id ? true : false
    return true
  }

  isAdmin(){
    if(this.userId==this.userConnect._id && this.userConnect.role=="admin" ){
      return true
    }
    else 
    return false
  } 

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload=  event.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
  
      reader.onload = (event: any) => {
        this.imgFile = event.target.result;
      };
      this.updateImage()
    }
  }

  updateImage() {
    const formdata= new FormData()
    formdata.append('picture',this.fileToUpload)
    this.userService.updatePicture(formdata)
    .subscribe(()=>{
    })
  }


  isAbonne(){
    // return this.userConnect.abonnes.includes(this.userId) ? true : false
    return true
  }

  desAbonne(){
    // this.userService.desAbonne(this.userId).subscribe((res:any)=>{
    //   console.log('désabonneeeee', res)
    //   localStorage.setItem("user_connected",JSON.stringify(res.user[0]))
    // })
  } 

  AddAbonne(){
    // const data={
    //   id_abonne:this.userId
    // }
    // this.userService.addAbonne(data).subscribe((res:any)=>{
    //   console.log('aboneeeeeee', res)
    //   localStorage.setItem("user_connected",JSON.stringify(res.user[0]))
    // })
  }

  Traiter(){
  this.userConnect=JSON.parse(localStorage.getItem('user_connected')!)
    if(this.userConnect.abonnes.includes(this.user._id)){
          this.desAbonne()
    }
    else {
          this.AddAbonne()
    }
  }
}