import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Patient } from '../Models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
//   private ApiUrl="http://localhost:63503/patientLogin";
  
  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
    patientdetailid:Subject<{patientId:number,aid:number}>=new Subject<{patientId:number,aid:number}>();
    setpatientdetailid(pdid:{patientId:number,aid:number}){
        this.patientdetailid.next(pdid);
    }
}