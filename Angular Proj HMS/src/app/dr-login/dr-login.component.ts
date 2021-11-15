import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from '../Models/doctor';
import { DoctorloginService } from '../Services/doctorlogin.service';
import { NotificationService } from '../Services/notification.service';
import { DoctorregisterService } from '../Services/doctorregister.service';

@Component({
  selector: 'app-dr-login',
  templateUrl: './dr-login.component.html',
  styleUrls: ['./dr-login.component.css']
})
export class DrLoginComponent implements OnInit {
  ConForm: FormGroup;
  
  constructor(public router: Router,public service:DoctorloginService,private notifyService : NotificationService) { 
    this.ConForm = new FormGroup({
      
      demaildid:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      dpassword: new FormControl('', Validators.compose([
	 	  Validators.minLength(5),
	 	 
	])),  
   });
  }
  get dpassword(){
    return this.ConForm.get("dpassword");
  }
  get demaildid(){
    return this.ConForm.get("demaildid");
  }

  ngOnInit(): void {
  }
  showToasterSuccess() {
    this.notifyService.showSuccess("Logged In Successfully !!", "")
  }

  showToasterError() {
    this.notifyService.showError("Incorrect User Login !!", "")
  }

  onclick():void{
    console.log(this.ConForm.get("dpassword")?.value);
    console.log(this.ConForm.get("demaildid")?.value);
    console.log("hello");

    this.service.Login(this.ConForm.value).subscribe(res => {
    
      console.log('logged in')
      console.log(res);
      console.log(JSON.stringify(res.did));
  
      if (JSON.stringify(res).includes("Success")){
        this.showToasterSuccess()
        this.service.getbyemail(this.ConForm.get("demaildid")?.value).subscribe((data: Doctor)=>{
          
          console.log(data);
          console.log(data.dname)
          console.log(data.did)
          let doctor:Doctor=data
          console.log(doctor)

          sessionStorage.setItem('doctor', JSON.stringify(doctor)); // localStorage.setItem('id', noOfClicks);
          // sessionStorage.setItem('userDetails', JSON.stringify(userDetails));   // if it's object
          console.log("Login doctorid")
          console.log(doctor.did);
          this.router.navigateByUrl('/DrDashboard');
      })
      }
      else if(JSON.stringify(res).includes("Invalid")) {
        this.showToasterError();
        this.router.navigate(['/DrLogin'])
      }
    });
  }
  }