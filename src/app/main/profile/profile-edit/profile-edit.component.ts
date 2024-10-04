import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user : User =JSON.parse(localStorage.getItem('currentUser')!) ;
  formValue!: FormGroup;
  constructor(
    private authservice : UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

  this.formValue=this.formBuilder.group({
    name:[''],
    dateBirth:[''],
    Gender:['male']
  })

  this.setFormValues()
}
setFormValues() {
  if (this.user) {
    this.formValue.controls['name'].setValue(this.user.name);
    const formattedDate = this.user.dateBirth?.toString().split('T')[0];
    this.formValue.controls['dateBirth'].setValue(formattedDate);
    this.formValue.controls['gender'].setValue(this.user.gender);
  }
}
updateUser() {
    this.authservice.updateInfo(this.formValue.value)
    .subscribe((res:any)=>{

    })
  }


}
