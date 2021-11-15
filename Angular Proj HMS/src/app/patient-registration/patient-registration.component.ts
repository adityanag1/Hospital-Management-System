
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PatientloginService } from '../Services/patientlogin.service';
import { Patient } from '../Models/patient';
import { RegisterpatientService } from '../Services/registerpatient.service';
import { AdminloginService } from '../Services/adminlogin.service';
import { NotificationService } from '../Services/notification.service';


@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  ConForm: any;    
  isRegister: boolean = false;
  constructor(private formbuilder: FormBuilder,public router: Router,public service:RegisterpatientService,public getuser:PatientloginService,private notifyService : NotificationService) { }    
  ngOnInit() {    
    console.log("inside init function");
    this.ConForm = this.formbuilder.group({      
      name:['',[Validators.required]],
      age:['',[Validators.required, Validators.pattern('^(?:[0-9]|[1-9][0-9]|60)$')]],
      gender:['',[Validators.required]],
      emailid:['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['',[Validators.required, Validators.pattern('^([7-9]{1}[0-9]{9})$')]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      password2:['',[Validators.required,accNumbercompare]]
   });    
  } 
  showToasterSuccess() {
    this.notifyService.showSuccess("Registered Successfully !!", "Now login to your account")
  }
  showToasterError() {
    this.notifyService.showError("This user already exists", "")
  }
  toaster(error: any){
    this.notifyService.showError(error, "")
  }
     
    get name(){
      return this.ConForm.get("name");
    }
    get age()
    {
      return this.ConForm.get("age");
    }
    get gender()
    {
      return this.ConForm.get("gender");
    }
    get mobile(){
      return this.ConForm.get("mobile");
    }
    get emailid(){
      return this.ConForm.get("emailid");
    } 
    get city(){
      return this.ConForm.get("city");
    }
    get state(){
      return this.ConForm.get("state");
    }
    get password(){
      return this.ConForm.get("password");
    }
    get password2(){
      return this.ConForm.get("password2");
    } 


    onclick():void{

      this.getuser.getbyemail(this.ConForm.value.emailid).subscribe(res=>{
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
        this.router.navigate(['/PatientLogin']);
      }, error => {
        this.toaster("Try again");
      });
    }
} 
export function accNumbercompare(control:AbstractControl):any{
  let controlvalue:string=control.value;
  let comparevalue:string=control.root.get("password")?.value;
  if(!(controlvalue==comparevalue))
  {
    return {'errors':true}
  }
}