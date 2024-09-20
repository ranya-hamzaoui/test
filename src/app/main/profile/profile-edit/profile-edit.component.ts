import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user : any =JSON.parse(localStorage.getItem('user_connected')!)
  formValue!: FormGroup;
  userObj : any ={
    _id:'',
    email:'',
    image:'',
    imageCover:'',
    password:'',
    name:'',
    Gender:''
  };
  constructor(
    private authservice : AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    console.log()
    console.log("this.user._id"+this.user._id)
    
  this.formValue=this.formBuilder.group({
    name:'',
    dateBirth:'',
    Gender:''
  })

    this.formValue.controls['name'].setValue(this.user.name);
    this.formValue.controls['dateBirth'].setValue(this.user.dateBirth);
    this.formValue.controls['Gender'].setValue(this.user.Gender);
}

updateUser() {
    this.userObj._id=this.user._id;
    this.userObj.name=this.user.name;
    // this.userObj.dateBirth=this.user.dateBirth;
    this.userObj.Gender=this.user.Gender;
    this.userObj._id=this.user._id;
    this.userObj.email=this.user.email;
    this.userObj.password=this.user.password;
    this.userObj.imageCover=this.user.imageCover;
    this.userObj.image=this.user.image;
    
    this.userObj.name=this.formValue.value.name;
    // this.userObj.dateBirth=this.formValue.value.dateBirth;
    this.userObj.Gender=this.formValue.value.Gender;

    // this.authservice.update(this.userObj._id,this.userObj)
    // .subscribe((res:any)=>{
    //   console.log('data', this.userObj) 
    //   localStorage.setItem("user_connected",JSON.stringify(res.user[0]))
    //   console.log(res)
    //   Swal.fire('updated with success','success')
    // })
  }


  updatePassword() {
    this.userObj._id=this.user._id;
    this.userObj.name=this.user.name;
    this.userObj.Gender=this.user.Gender;
    this.userObj._id=this.user._id;
    this.userObj.email=this.user.email;
    this.userObj.password=this.user.password;
    this.userObj.imageCover=this.user.imageCover;

    this.formValue.controls['name'].setValue(this.user.name);
    this.formValue.controls['dateBirth'].setValue(this.user.dateBirth);
    this.formValue.controls['Gender'].setValue(this.user.Gender);


    this.userObj.name=this.formValue.value.name;
    this.userObj.Gender=this.formValue.value.Gender;

    // this.authservice.update(this.userObj._id,this.userObj)
    // .subscribe(res=>{
    //   console.log(res)
    // })
  }

  



}
