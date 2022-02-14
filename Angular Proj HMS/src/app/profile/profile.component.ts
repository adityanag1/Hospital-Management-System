import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../Models/patient';
import { PatientloginService } from '../Services/patientlogin.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name! :string;
  age! :string;
  agee!:string;
  gender! :string;
  mobile!:string;
  emailid!:string;
  city!:string;
  state!:string;
  password!:string;
  patient:any
  patientid!: number;
  showprofile:boolean=false;
  editprofile:boolean=false;
ConForm: any;

  constructor(private formbuilder: FormBuilder,public router: Router,public service3:PatientloginService) { 
    let patient=this.service3.getPatient()
    let patientdetails:Patient=patient
    this.name=patientdetails.name
    this.age=patientdetails.age
    this.gender=patientdetails.gender
    this.mobile=patientdetails.mobile
    this.emailid=patientdetails.emailid
    this.city=patientdetails.city
    this.state=patientdetails.state
  }

  ngOnInit(): void {

    let patient=this.service3.getPatient()
    let patientdetails:Patient=patient
    this.showprofile=true;
    console.log(patientdetails.patientId)
    this.patientid=patientdetails.patientId
    console.log(this.patientid)
    
    
    this.service3.getUser(this.patientid).subscribe((data: Patient) => {
      // console.log("User Data");
      console.log(data.name);
      console.log(data);
      this.name = data.name;
      this.age=data.age;
      this.gender=data.gender
      this.mobile=data.mobile
      this.emailid=data.emailid
      this.city=data.city
      this.state=data.state
    });
  }
  Edit(){
    console.log('dashboard');
    this.showprofile=false;
    this.editprofile=true;
    this.ConForm = this.formbuilder.group({      
      pname:['',[Validators.required]],
      page:['',[Validators.required, Validators.pattern('^(?:[0-9]|[1-9][0-9]|60)$')]],
      pgender:['',[Validators.required]],
      pemailid:['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      pmobile: ['',[Validators.required, Validators.pattern('^([7-9]{1}[0-9]{9})$')]],
      pstate: ['',[Validators.required]],
      pcity: ['',[Validators.required]],
   });
   console.log(this.ConForm.value)
  }
  get pname(){
      return this.ConForm.get("pname");
    }
    get page()
    {
      return this.ConForm.get("page");
    }
    get pgender()
    {
      return this.ConForm.get("pgender");
    }
    get pmobile(){
      return this.ConForm.get("pmobile");
    }
    get pemailid(){
      return this.ConForm.get("pemailid");
    } 
    get pcity(){
      return this.ConForm.get("pcity");
    }
    get pstate(){
      return this.ConForm.get("pstate");
    }

    saveedit(){
      let patient=this.service3.getPatient()
      let patientdetails:Patient=patient
      this.agee=patientdetails.age
      console.log(this.agee)
      console.log(this.ConForm.value)
      let data={
        patientId:this.patientid,
        name:this.ConForm.value.pname,
        age:this.ConForm.value.page,
        gender:this.ConForm.value.pgender,
        mobile:this.ConForm.value.pmobile,
        emailid:this.ConForm.value.pemailid,
        city:this.ConForm.value.pcity,
        state:this.ConForm.value.pstate,
        password:patientdetails.password
      }
      console.log(data)

      this.service3.putPatient(this.patientid,data).subscribe(res=>{
        console.log("inside postapp")
        console.log(res)
        // this.data=this.ConForm.value
        location.reload();
        this.router.navigateByUrl('/Profile');
      })
    }
    cancel(){
    location.reload();
  }
}