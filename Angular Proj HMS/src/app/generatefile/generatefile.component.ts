import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientDetailsService } from '../Services/patientdetails.service';
import { AppService } from '../Services/app.service';
import { Appoinment } from '../Models/app';
import { PatientloginService } from '../Services/patientlogin.service';
import { Patient } from '../Models/patient';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, Validators } from '@angular/forms';
import { DoctorloginService } from '../Services/doctorlogin.service';
import { Doctor } from '../Models/doctor';
import { FileService } from '../Services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generatefile',
  templateUrl: './generatefile.component.html',
  styleUrls: ['./generatefile.component.css']
})
export class GeneratefileComponent implements OnInit {
  patientId!: any;
  aId!:any;
  // patientid:number=+this.patientId;
  aid!:number;
  isRegister: boolean = false;
  pid!:number;
  name!: string;
  age!: string;
  gender!: string;
  mobile!: string;
  emailid!: string;
  adate!: string;
  atime!: string;
  adesc!: string;
  ConForm: any;    
  did!: number;
  fid!:any ;
  data:any;


  

  constructor(public service5:FileService ,public service4:DoctorloginService,private formbuilder: FormBuilder,public service:PatientDetailsService,public service2:FileService, private _Activatedroute:ActivatedRoute,public service1:AppService,public service3:PatientloginService) { }
  
  ngOnInit(): void {

    let doctor=this.service4.getDoctor()
    let doctordetails:Doctor=doctor
    this.did=doctordetails.did
    // this.dname=doctordetails.dname
    // console.log(this.patientid)
    this.service.patientdetailid.subscribe(a=>{
    console.log(a)
    this.aid=a.aid
    this.pid=a.patientId  
    });
    // this.service.patientdetailid.subscribe(a=>{
    // this.aid=a.aid
    // this.pid=a.patientId
    // })
    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params)
      this.patientId = params.get('patientId'); 
      this.aId=params.get('aid');
    });
    this.service1.getAppById(this.aId).subscribe((data:Appoinment)=>{
      console.log(data)
      this.adate=data.adate
      this.atime=data.atime
      this.adesc=data.adesc
    })
    this.service3.getUser(this.patientId).subscribe((data: Patient) => {
      // console.log("User Data");
      console.log(data.name);
      console.log(data);
      this.name = data.name;
      this.age=data.age;
      this.gender=data.gender
      this.mobile=data.mobile
      this.emailid=data.emailid
    });
    this.ConForm = this.formbuilder.group({      
      height:['',[Validators.required]],
      weight:['',[Validators.required]],
      bp:['',[Validators.required]],
      heartrate:['',[Validators.required]],
      medicinepres:['',[Validators.required]],
      bill:['',[Validators.required]]
   });
  }
  get height(){
    return this.ConForm.get("height");
  }
  get weight(){
    return this.ConForm.get("weight");
  }
  get bp(){
    return this.ConForm.get("bp");
  }
  get heartrate(){
    return this.ConForm.get("heartrate");
  }
  get medicinepres(){
    return this.ConForm.get("medicinepres");
  }
  get bill(){
    return this.ConForm.get("bil");
  }




  public convetToPDF()
  {
    const data = document.getElementById('MyDIv');
    html2canvas(data!).then(canvas => {
    // Few necessary setting options
    var imgWidth = 210;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 5;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
    pdf.save(this.name+' file.pdf'); // Generated PDF
    });
  }

  onclick(){
    console.log(this.ConForm.value)
    console.log(this.patientId);
    console.log(this.aId);
    console.log(this.did)

      let data={
        fid:this.fid,
        height:this.ConForm.value.height,
        weight:this.ConForm.value.weight,
        bp:this.ConForm.value.bp,
        heartrate:this.ConForm.value.heartrate,
        medicinepres:this.ConForm.value.medicinepres,
        bill:this.ConForm.value.bill,
        patientId:this.patientId,
        did:this.did,
        aid:this.aId
      }
      console.log(data)
      this.service5.postFilet(data).subscribe(res=>{
        console.log("inside generatefile")
        console.log(res)
        // this.data=this.ConForm.value
        // this.service4.email()  
        // this.service4.email(this.patientemailid,this.patientname,this.ConForm.value.adate,this.ConForm.value.adesc,this.ConForm.value.atime,this.ConForm.value.dname).subscribe(res=>{
        //   console.log(res)
        // })
        // this.router.navigateByUrl('/DrDashboard');
      })
    }
}

