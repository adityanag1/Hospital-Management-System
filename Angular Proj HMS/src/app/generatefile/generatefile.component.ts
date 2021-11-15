import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientDetailsService } from '../Services/patientdetails.service';
import { AppService } from '../Services/app.service';
import { Appoinment } from '../Models/app';
import { PatientloginService } from '../Services/patientlogin.service';
import { Patient } from '../Models/patient';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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
  pid!:number;
  name!: string;
  age!: string;
  gender!: string;
  mobile!: string;
  emailid!: string;
  adate!: string;
  atime!: string;
  adesc!: string;
  

  constructor(public service:PatientDetailsService,private _Activatedroute:ActivatedRoute,public service1:AppService,public service3:PatientloginService) { }
  
  ngOnInit(): void {
    // console.log(this.patientid)
    this.service.patientdetailid.subscribe(a=>{
    this.aid=a.aid
    this.pid=a.patientId
    })
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
}

