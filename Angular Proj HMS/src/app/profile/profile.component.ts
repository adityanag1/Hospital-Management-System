import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../Models/patient';
import { PatientloginService } from '../Services/patientlogin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name! :string;
  age! :string;
  gender! :string;
  mobile!:string;
  emailid!:string;
  city!:string;
  state!:string;
  password!:string;
  patient:any
  patientid!: number;

  constructor(public router: Router,public service3:PatientloginService) { }

  ngOnInit(): void {

    let patient=this.service3.getPatient()
    let patientdetails:Patient=patient
    
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
    this.router.navigate(['/EditProfile']);
  };
}
