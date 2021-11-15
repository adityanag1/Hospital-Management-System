import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminloginService } from '../Services/adminlogin.service';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})

export class AdminloginComponent implements OnInit {

  ConForm: FormGroup;
  
  constructor(public service: AdminloginService,public router: Router,private notifyService : NotificationService) { 

    this.ConForm = new FormGroup({
      loginid:new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required]),  
   });
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("Logged In Successfully !!", "")
  }

  showToasterError() {
    this.notifyService.showError("Incorrect User Login !!", "")
  }

  get password() {
    return this.ConForm.get("password");
  }
  get loginid(){
    return this.ConForm.get("loginid");
  }

  ngOnInit(): void {
  }
  onclick():void{
    console.log(this.ConForm.get("password")?.value);
    console.log(this.ConForm.get("loginid")?.value);
    console.log(this.ConForm.value);

    this.service.Login(this.ConForm.value).subscribe(res => {
      console.log('Logged in')
      console.log(res)
      console.log(JSON.stringify(res));
      if (JSON.stringify(res).includes("Success")) {
        this.showToasterSuccess()
        this.router.navigate(['/AdminHome']);
      } 
      else if(JSON.stringify(res).includes("Invalid")) {
        this.showToasterError();
        this.router.navigate(['/AdminLogin'])
      }
    });
  }
}
