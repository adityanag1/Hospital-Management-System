import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PatientloginService } from '../Services/patientlogin.service';
import { Patient } from '../Models/patient';
import { RegisterpatientService } from '../Services/registerpatient.service';
import { AdminloginService } from '../Services/adminlogin.service';
import { NotificationService } from '../Services/notification.service';
import { DoctorloginService } from '../Services/doctorlogin.service';
import { DoctorregisterService } from '../Services/doctorregister.service';


@Component({
  selector: 'app-dr-registration',
  templateUrl: './dr-registration.component.html',
  styleUrls: ['./dr-registration.component.css']
})

export class DrRegistrationComponent implements OnInit {

  ConForm: any;    
  isRegister: boolean = false;
  constructor(private formbuilder: FormBuilder,public router: Router,public service:DoctorregisterService,public getuser:DoctorloginService,private notifyService : NotificationService) { }    
  ngOnInit() {
    console.log("inside init function");
    this.ConForm = this.formbuilder.group({      
      dname:['',[Validators.required]],
      dexp:['',[Validators.required, Validators.pattern('^(?:[0-9]|[1-9][0-9]|60)$')]],
      dspecalization:['',[Validators.required]],
      dage:['',[Validators.required, Validators.pattern('^(?:[0-9]|[1-9][0-9]|60)$')]],
      dgender:['',[Validators.required]],
      demaildid:['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      dmobile: ['',[Validators.required, Validators.pattern('^([7-9]{1}[0-9]{9})$')]],
      dstate: ['',[Validators.required]],
      dcity: ['',[Validators.required]],
      dpassword: ['',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      password2:['',[Validators.required,accNumbercompare]]
   });
  } 
  showToasterSuccess() {
    this.notifyService.showSuccess("Doctor Registered Successfully !!","Doc can login to their account")
  }
  showToasterError() {
    this.notifyService.showError("This user already exists", "")
  }
  toaster(error: any){
    this.notifyService.showError(error, "")
  }
     
    get dname(){
      return this.ConForm.get("dname");
    }
    get dexp(){
      return this.ConForm.get("dexp");
    }
    get dspecalization(){
      return this.ConForm.get("dspecialization");
    }
    get dage()
    {
      return this.ConForm.get("dage");
    }
    get dgender()
    {
      return this.ConForm.get("dgender");
    }
    get dmobile(){
      return this.ConForm.get("dmobile");
    }
    get demaildid(){
      return this.ConForm.get("demaildid");
    } 
    get dcity(){
      return this.ConForm.get("dcity");
    }
    get dstate(){
      return this.ConForm.get("dstate");
    }
    get dpassword(){
      return this.ConForm.get("dpassword");
    }
    get password2(){
      return this.ConForm.get("password2");
    } 

    onclick():void{  
      this.getuser.getbyemail(this.ConForm.value.demaildid).subscribe(res=>{
        if (res!=undefined){
          this.showToasterError()
          console.log(res);
        }
     });
      console.log(this.ConForm.value);
      this.service.create(this.ConForm.value).subscribe(res =>{
        console.log('User created!');
        console.log(res);
        console.log(JSON.stringify(res));
        this.showToasterSuccess()
        this.router.navigate(['/AdminHome']);

      // }, error => {
      //   this.toaster("Try again");
      });
    } 
}
export function accNumbercompare(control:AbstractControl):any{
  let controlvalue:string=control.value;
  let comparevalue:string=control.root.get("dpassword")?.value;
  if(!(controlvalue==comparevalue))
  {
    return {'errors':true}
  }
}
