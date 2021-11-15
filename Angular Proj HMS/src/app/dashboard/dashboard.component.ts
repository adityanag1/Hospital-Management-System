
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../Models/patient';
import { Doctor } from '../Models/doctor';
import { PatientloginService } from '../Services/patientlogin.service';
import { DoctorloginService } from '../Services/doctorlogin.service';
import { AppService } from '../Services/app.service';
import { Appoinment } from '../Models/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patient:any
  name:string=" "
  patientid!: number;
  did!: number;
  aid!:any;
  adate!: string;
  atime!: string;
  adesc!: string;
  dname!: string;
  results!: string;
  // count:number=0;
  countlist:any[]=[];
  noapp: boolean=false;
  yesapp: boolean=false;
  beforeapp:boolean=false;
  count2list!:any[];
  count3list!:any[];
  todaysDate= new Date();
  date!: string;

  constructor(public router: Router,public service2:PatientloginService,public service1:AppService,public service3:DoctorloginService) { }

  ngOnInit(): void {

    let patient=this.service2.getPatient()
    let patientdetails:Patient=patient
    
    console.log(patientdetails.patientId)
    this.patientid=patientdetails.patientId
    this.name=patientdetails.name
    console.log(this.patientid)

    let date = JSON.stringify(this.todaysDate)
    this.date = date.slice(1,11)
    console.log(date)

    this.service1.getApp().subscribe((data:Appoinment[])=>{
      console.log(data)
      if(data.length==0){
        this.noapp=true;
        this.yesapp=false;
        return;
      }
      // this.yesapp=true;
      this.count2list=data.filter(a=>a.patientId===patient.patientId);
      
      this.count3list=this.count2list.filter(a=>a.adate>=this.date);
      this.count3list=this.count3list.reverse();
      
      this.countlist=this.count2list.filter(a=>a.adate<this.date);
      this.countlist=this.countlist.reverse();

      console.log(this.count3list)
      console.log(this.countlist)
      if(this.count2list.length!=0)
      {
        this.beforeapp=true;
        this.yesapp=true;
        this.noapp=false;
      }
      else{
        this.beforeapp=false;
        this.yesapp=false;
        this.noapp=true;
      }
    })
  }
}
