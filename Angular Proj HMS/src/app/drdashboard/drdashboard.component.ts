import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appoinment } from '../Models/app';
import { Doctor } from '../Models/doctor';
import { Patient } from '../Models/patient';
import { AppService } from '../Services/app.service';
import { DoctorloginService } from '../Services/doctorlogin.service';
import { PatientloginService } from '../Services/patientlogin.service';

@Component({
  selector: 'app-drdashboard',
  templateUrl: './drdashboard.component.html',
  styleUrls: ['./drdashboard.component.css']
})
export class DrdashboardComponent implements OnInit {
  did: any;
  dname!: string;
  noapp: boolean=false;
  yesapp: boolean=false;
  count2list: any[]=[];
  todaysDate= new Date();
  date!: string;
  aId!: any;
  count3list: any[]=[];
  removeapp: boolean=false;
  aidlist: any[]=[];



   
  constructor(private router:Router, private _Activatedroute:ActivatedRoute,public service2:DoctorloginService,public service1:AppService,public service3:PatientloginService) { }

  ngOnInit(): void {
    let doctor=this.service2.getDoctor()
    let doctordetails:Doctor=doctor
    this.did=doctordetails.did
    this.dname=doctordetails.dname

    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params)
      // this.patientId = params.get('patientId'); 
      this.aId=params.get('aid');
    });
    this.aidlist.push(this.aId)
    this.service1.getApp().subscribe((data:Appoinment[])=>{
    console.log('Patient data',data)
    console.log(doctor)
    if(data.length==0){
        this.noapp=true;
        this.yesapp=false;
        return;
    }
    console.log(this.todaysDate)
    let date = JSON.stringify(this.todaysDate)
    this.date = date.slice(1,11)
    console.log(date)
    // this.yesapp=true;
    
    this.count2list=data.filter(a=>a.did===doctor.did);
    this.count2list=this.count2list.filter(a=>a.adate>=this.date);
    // this.count2list=this.count2list.filter(a=>a.aId!==a.aid)
    console.log(this.aId)
    console.log(this.aidlist)
    if(this.aId!=null){
      // this.aidlist.push(this.aId)
      console.log(this.aidlist)
      // this.count2list=this.count2list.filter(a=>this.aidlist!=a.aid)
      this.removeapp=true;
      this.yesapp=false;
      this.noapp=false;
      this.count3list=this.count2list.filter(a=>this.aidlist!=a.aid)
      this.count3list=this.count3list.reverse();
      console.log(this.count3list)
      if(this.count3list.length!=0)
      {
        this.removeapp=true;
        this.noapp=false;
        this.yesapp=false;
      }
      else{
        this.yesapp=false;
        this.removeapp=false;
        this.noapp=true;
      }
    }
    else{
      this.count2list=this.count2list.reverse();
      console.log(this.count2list)
      if(this.count2list.length!=0)
        {
          this.yesapp=true;
          this.noapp=false;
        }
        else{
          this.yesapp=false;
          this.noapp=true;
        }
    }
    }) 
  }
}
