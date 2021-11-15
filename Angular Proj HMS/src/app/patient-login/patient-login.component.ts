import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../Models/patient';
import { PatientloginService } from '../Services/patientlogin.service';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {
  ConForm: FormGroup;
  patientid:any
  name: string = "";

  public static userid: number;
  // public static patientid:number;

  constructor(public router: Router,public service:PatientloginService,private notifyService : NotificationService) { 
    this.ConForm = new FormGroup({
      
      emailid:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      
      password: new FormControl('', Validators.compose([
	 	  Validators.minLength(5),
	 	 
	])),  
   });
  }
  
  get password(){
    return this.ConForm.get("password");
  }
  get email(){
    return this.ConForm.get("email");
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
  
    console.log(this.ConForm.get("password")?.value);
    console.log(this.ConForm.get("emailid")?.value);
    console.log("hello");

    this.service.Login(this.ConForm.value).subscribe(res => {
    
      console.log('logged in')
      console.log(res);
      console.log(JSON.stringify(res.patientId));
      this.patientid=res.patientId

      
      if (JSON.stringify(res).includes("Success")){
        this.showToasterSuccess()
        // this.router.navigate(['/Dashboard']);


        this.service.getbyemail(this.ConForm.get("emailid")?.value).subscribe((data: Patient)=>{
          
          console.log(data);
          console.log(data.name)
          console.log(data.patientId)
          let patient:Patient=data
          console.log(patient)

          // this.patientid = data.patientId;
          // PatientLoginComponent.userid = this.patientid;
          // console.log(PatientLoginComponent.userid)
        
          
          // sessionStorage.setItem('patientid', String(this.patientid));
          // console.log("Login patientid")
          // console.log(this.patientid);
          sessionStorage.setItem('patient', JSON.stringify(patient)); // localStorage.setItem('id', noOfClicks);
          // sessionStorage.setItem('userDetails', JSON.stringify(userDetails));   // if it's object
          console.log("Login patientid")
          console.log(patient.patientId);
          this.router.navigateByUrl('/Dashboard');
      })
      }
      else if(JSON.stringify(res).includes("Invalid")) {
        this.showToasterError();
        this.router.navigate(['/PatientLogin'])
      }
    });
  }
  }