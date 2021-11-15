import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Appoinment } from '../Models/app';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../Services/app.service';
import { DoctorloginService } from '../Services/doctorlogin.service';
import { Doctor } from '../Models/doctor';
import { PatientloginService } from '../Services/patientlogin.service';
import { Patient } from '../Models/patient';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../Services/email.service';

@Component({
  selector: 'app-bookappoinment',
  templateUrl: './bookappoinment.component.html',
  styleUrls: ['./bookappoinment.component.css']
})
export class BookappoinmentComponent implements OnInit {
  namelist : string[] = [];
  idlist:number[]=[];
  // trial:any[]=[];
  // name!:string
  ConForm: any;    
  did!:number;
  patientId!:any;
  // doctorId!:number;
  isRegister: boolean = false;
  patientemailid!: string;
  patientname!: string;
  data: any;
  aid!:any;
  editapp: boolean=false;
  noeditapp: boolean=false;


  constructor(private formbuilder: FormBuilder,private _Activatedroute:ActivatedRoute,public router: Router,public service1: AppService,public service2:DoctorloginService,public service3:PatientloginService,public service4: EmailService) { 
    // this._Activatedroute.paramMap.subscribe(params => { 
    //   console.log(params)
    //   // this.patientId = params.get('patientId'); 
    //   this.aid=params.get('aid');
    //   this.editapp=true;
    //   this.noeditapp=false;
    // });
  }

  ngOnInit(): void {
    this.noeditapp=true;
    this.ConForm = this.formbuilder.group({      
      adesc:['',[Validators.required]],
      adate:['',[Validators.required]],
      atime:['',[Validators.required]],
      dname:['',[Validators.required]]
   });
    let patient=this.service3.getPatient()
    console.log(patient)
    let patientdetails:Patient=patient
    console.log(patientdetails.name)
    console.log(patientdetails.patientId)
    this.patientId=patientdetails.patientId
    this.patientemailid=patientdetails.emailid
    this.patientname=patientdetails.name

    this.service2.getDr().subscribe((data:Doctor[])=>{
      for(let i=0;i<data.length;i++){
        console.log(data[i].dname)
        console.log(data[i].did)
        this.namelist.push(data[i].dname);
        this.idlist.push(data[i].did)
      }
    })
    // this.onLoad();
  }
  get adesc(){
    return this.ConForm.get("adesc");
  }
  get adate(){
    return this.ConForm.get("adate");
  }
  get atime(){
    return this.ConForm.get("atime");
  }
  get dname(){
    return this.ConForm.get("dname");
  }

  // onLoad()
  // {
  //   this._Activatedroute.paramMap.subscribe(params => { 
  //       console.log(params)
  //       // this.patientId = params.get('patientId'); 
  //       this.aid=params.get('aid');
  //       this.editapp=true;
  //       this.noeditapp=false;
  //     });
  // }
  onclick(){
    console.log(this.ConForm.value);
    this.service2.getDr().subscribe(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      for(let i=0;i<res.length;i++)
      {
        console.log('insidefor')
        if(this.ConForm.get("dname")?.value===res[i].dname)
        {
          this.did=res[i].did
          console.log(this.did)
          break
        }
      }
      console.log(this.patientId);
      console.log(this.did);

      let data={
        aid:this.aid,
        adate:this.ConForm.value.adate,
        adesc:this.ConForm.value.adesc,
        atime:this.ConForm.value.atime,
        did:this.did,
        patientId:this.patientId
      }
      
      this.service1.postApp(data).subscribe(res=>{
        console.log("inside postapp")
        console.log(res)
        this.data=this.ConForm.value
        // this.service4.email()  
        this.service4.email(this.patientemailid,this.patientname,this.ConForm.value.adate,this.ConForm.value.adesc,this.ConForm.value.atime,this.ConForm.value.dname).subscribe(res=>{
          console.log(res)
        })
        this.router.navigateByUrl('/Dashboard');
      })
    })
  }  
}
