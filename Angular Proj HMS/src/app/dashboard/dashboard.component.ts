
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../Models/patient';
import { Doctor } from '../Models/doctor';
import { PatientloginService } from '../Services/patientlogin.service';
import { DoctorloginService } from '../Services/doctorlogin.service';
import { AppService } from '../Services/app.service';
import { Appoinment } from '../Models/app';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../Services/email.service';
import { FileService } from '../Services/file.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

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
  flipcard:boolean=false;
  print:boolean=false;
  ConForm: any;
  namelist: any[]=[];
  data: any;
  patientemailid!: string;
  patientname!: string;
  filelist:any[]=[];
  editapp: any[]=[];
  // cdate!: string;

  constructor(public service6:FileService ,public service5:EmailService ,public service4:DoctorloginService, private formbuilder: FormBuilder,public router: Router,public service2:PatientloginService,public service1:AppService,public service3:DoctorloginService) {
    // this.service1.getAppById(this.aid).subscribe(res=>{
    //   console.log(res)
    //   this.adate=res.adate
    // })
  }

  ngOnInit(): void {

    let patient=this.service2.getPatient()
    let patientdetails:Patient=patient
    
    console.log(patientdetails.patientId)
    this.patientid=patientdetails.patientId
    this.name=patientdetails.name
    this.patientname=patientdetails.name
    this.patientemailid=patientdetails.emailid
    console.log(this.patientid)

    let date = JSON.stringify(this.todaysDate)
    this.date = date.slice(1,11)
    console.log(date)

    this.service4.getDr().subscribe((data:Doctor[])=>{
      for(let i=0;i<data.length;i++){
        console.log(data[i].dname)
        console.log(data[i].did)
        this.namelist.push(data[i].dname);
        // this.idlist.push(data[i].did)
      }
    })

    this.service1.getApp().subscribe((data:Appoinment[])=>{
      console.log(data)
      if(data.length==0){
        this.noapp=true;
        this.yesapp=false;
        return;
      }
      // this.yesapp=true;
      this.count2list=data.filter(a=>a.patientId===patient.patientId);
      
      this.count3list=this.count2list.filter(a=>a.adate>this.date);
      // this.count3list=this.count3list.reverse();
      
      this.countlist=this.count2list.filter(a=>a.adate<=this.date);
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

  EditApp(aid:number){
    console.log(aid)
    console.log(this.count3list.filter(a=>a.aid==aid))
    this.editapp=this.count3list.filter(a=>a.aid==aid)
    // if(this.count3list==this.count3list.filter(a=>a.aid===aid)){
    this.flipcard=true;
    this.yesapp=false;
    console.log(this.editapp)
    console.log(aid)
    // }
    this.ConForm = this.formbuilder.group({      
      desc:['',[Validators.required]],
      tdate:['',[Validators.required]],
      time:['',[Validators.required]],
      tname:['',[Validators.required]]
   });
console.log(this.ConForm.value)
  }
  get desc(){
    return this.ConForm.get("desc");
  }
  get tdate(){
    return this.ConForm.get("tdate");
  }
  get time(){
    return this.ConForm.get("time");
  }
  get tname(){
    return this.ConForm.get("tname");
  }

  SaveChange(aid:number){
    this.flipcard=false;
    this.yesapp=true;
    this.aid=aid
    console.log(this.ConForm.value)
    console.log(this.editapp)
    this.service4.getDr().subscribe(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      for(let i=0;i<res.length;i++)
      {
        console.log('insidefor')
        if(this.ConForm.get("tname")?.value===res[i].dname)
        {
          this.did=res[i].did
          console.log(this.did)
          break
        }
      }
      console.log('patientid',this.patientid);
      console.log('doctorid',this.did);
      console.log('appid',this.aid)

      let data={
        aid:this.aid,
        adate:this.ConForm.value.tdate,
        adesc:this.ConForm.value.desc,
        atime:this.ConForm.value.time,
        did:this.did,
        patientId:this.patientid
      }
      
      this.service1.putApp(this.aid,data).subscribe(res=>{
        console.log("inside postapp")
        console.log(res)
        this.data=this.ConForm.value
        // this.service4.email()  
        this.service5.email(this.patientemailid,this.patientname,this.adate,this.adesc,this.atime,this.ConForm.value.tname).subscribe(res=>{
          console.log(res)
        })
        location.reload();
        this.router.navigateByUrl('/Dashboard');
      })
    })
  }
  cancel1(){
    this.print=false;
    this.beforeapp=true;
    // location.reload();
  }
  cancel(){
    this.flipcard=false;
    this.yesapp=true;
    // location.reload();
  }
  GetFile(aid:number){
    this.aid=aid
    console.log(this.aid)
    this.service6.getFiles().subscribe(res=>{
      console.log(res)
      this.filelist=res.filter(a=>a.aid==this.aid);
      console.log('Generated file',this.filelist)
      this.print=true;
      this.beforeapp=false;
      if(this.filelist.length==0){
        this.beforeapp=true;
        this.print=false;
        return
      } 
    }) 
  }
  
  public convetToPDF()
  {
    console.log(this.filelist)
    const data = document.getElementById('printfile');
    html2canvas(data!).then(canvas => {
    // Few necessary setting options
    var imgWidth = 500;
    var pageHeight = 500;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 5;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
    pdf.save(this.name+' file.pdf'); // Generated PDF
    location.reload();
    });
  }
}
