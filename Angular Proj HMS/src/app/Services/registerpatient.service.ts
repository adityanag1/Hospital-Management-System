import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient';

@Injectable({
  providedIn: 'root'
})
export class RegisterpatientService {

  private ApiUrl="http://localhost:63503/api/Patients";
 
  private Apiurl="http://localhost:63503/api/Patients";
 

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  create(patient: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(this.ApiUrl, JSON.stringify(patient), this.httpOptions)
  }
  put(id:number){
    let url=this.Apiurl+"?id="+id
    return this.httpClient.put(url,this.httpOptions)
  }   
}