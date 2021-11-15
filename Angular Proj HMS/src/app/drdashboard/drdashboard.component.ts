import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

   
  constructor(private router:Router,public service2:DoctorloginService,public service1:AppService,public service3:PatientloginService) { }

  ngOnInit(): void {
    let doctor=this.service2.getDoctor()
    let doctordetails:Doctor=doctor
    this.did=doctordetails.did
    this.dname=doctordetails.dname

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
    // console.log(this.count1list.length)
    // for(let i=0;i<this.count1list.length;i++)
    // {
    //   // console.log(this.count1list[i].adate)
    //   // console.log(this.date)
    //   if(this.count1list[i].adate>=this.date)
    //   {
    //     this.count2list.push(data[i])
    //     console.log(this.count2list)
    //   }
    //   else if(this.count1list[i].adate<this.date){
    //     continue;
    //   }
    // }
    })
    // this.service1.getApp().subscribe((data:Appoinment[])=>{
    //   console.log(data)
    //   if(data.length==0){
    //     this.noapp=true;
    //     this.yesapp=false;
    //   }
    //   else if(this.countlist.includes(this.did))
    //   {
    //     this.noapp=false;
    //     this.yesapp=true;
    //     for(let i=0;i<data.length;i++){
    //       if(doctordetails.did==data[i].did)
    //       {
    //       console.log("insideif")
    //       this.count2list.push(data[i])
    //       console.log(this.count2list)
    //       }
    //     }
    //     console.log(this.count2list.length)
    //     for(let i=0;i<this.count2list.length;i++){
    //       console.log(this.count2list)
    //       
    //       console.log(this.count2list[i].adate)
        
    //       if(this.count2list[i].adate==this.date)
    //       {
    //         console.log(this.count2list[i].adate)
            
    //         this.service3.getUser(this.count2list[i].patientId).subscribe((data: Patient) => {
    //         this.pnlist.push(data.name)
    //         console.log(this.pnlist)
    //         })
    //       }
    //     }
    //   }
    //   else{
    //     this.noapp=true;
    //     this.yesapp=false;
    //   } 
    // })
  }
  
}
